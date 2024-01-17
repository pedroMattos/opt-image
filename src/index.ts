import { type GenerateResizedImage } from "./types/generateResizedImage.type";
import CreateStyle from "./utils/CreateStyle";

class Optimizer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const imageUrl = this.getAttribute('image-url');
    const customHeight = this.getAttribute('height');
    const customResolutions = this.getAttribute('resolutions');

    if (!imageUrl) throw new Error("Image url cannot be undefined or null.");
    

    const picture = document.createElement('picture');
    const styleSheet = new CreateStyle();

    const resolutions = customResolutions ? Optimizer._getResolutions(customResolutions) : [320, 480, 800]
    let actualIndex = 0;
    for (const resolution of resolutions) {
      this._generateResizedImage({
        url: imageUrl as string,
        width: resolution,
        height: Number(customHeight)
      }).then((img) => {

        Optimizer._renderPicture(img, picture, resolution)

        if (actualIndex === resolutions.length ) picture.appendChild(img);
        actualIndex++
      });
    }

    const sheet = styleSheet.addStyle('img { width: 100%; object-fit: cover; }');
    this.shadowRoot!.adoptedStyleSheets = [sheet];
    this.shadowRoot!.appendChild(picture);
  }

  private _generateResizedImage({ url, width, height }: GenerateResizedImage): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const canvas2DContext = canvas.getContext('2d');

        if (!canvas2DContext) {
          reject(new Error("Canvas 2D context is not supported."))
          return
        }

        const aspectRatio = img.height / img.width;
        const calculatedHeight = height || Math.round(width * aspectRatio);

        canvas.width = width;
        canvas.height = calculatedHeight;

        try {
          canvas2DContext!.drawImage(img, 0, 0, width, calculatedHeight);
  
          const resizedImg = document.createElement('img');
          resizedImg.src = canvas.toDataURL('image/webp');
          resizedImg.alt = `${width}x${calculatedHeight}`;
  
          resolve(resizedImg);
        } catch (error) {
          reject(new Error("Error drawing image on canvas."))
        }
      }

      img.onerror = () => {
        reject(new Error("Error loading image."))
      }
  
      img.onabort = () => {
        reject(new Error("Image loading aborted."))
      }

      img.src = `${url}?width=${width}`;
    });
  }

  private static _renderPicture(image: HTMLImageElement, picture: HTMLPictureElement, resolution: number): void {
    const source = document.createElement('source');
    source.setAttribute('srcset', image.src);
    source.setAttribute('media', `(max-width: ${resolution}px)`);

    picture.appendChild(source);
  }

  private static _getResolutions(resolutions: string | number[] | string[]): number[] {
    if (typeof resolutions === 'string') {
      const resolutionStrings = resolutions.split(',').map(str => str.trim())

      const validResolutions = resolutionStrings.map(Number)
        .filter(validResolution)

      if (validResolutions.length !== resolutionStrings.length) throw new Error("Resolutions has invalid values.");
      
      return validResolutions
    }

    if (!resolutions.length) throw new Error("Resolutions cannot be empty, try provide your custom resolutions like this: '100,200,300'");
    
    return resolutions.map((resolution: string | number) => {
      const number = typeof resolution === 'number' ? resolution : Number(resolution)
      
      if (!validResolution(number)) throw new Error("Resolutions has invalid values.");
      
      return number
    })
  }

}

function validResolution(resolution: number) {
  return typeof resolution === 'number' && !isNaN(resolution) && isFinite(resolution) && resolution !== 0
}

(() => {
  customElements.define('opt-image', Optimizer);
})()