import { type GenerateResizedImage } from "./types/generateResizedImage.type";
import CreateStyle from "./utils/CreateStyle";
import getResolutions from "./utils/GetResolutions";

class Optimizer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const imageUrl = this.getAttribute('image-url');
    const customResolutions = this.getAttribute('resolutions');

    if (!imageUrl) throw new Error("Image url cannot be undefined or null.");
    

    const picture = document.createElement('picture');
    const styleSheet = new CreateStyle();

    const resolutions = customResolutions ? getResolutions(customResolutions) : [320, 480, 800]
    let actualIndex = 0;
    for (const resolution of resolutions) {
      this._generateResizedImage({
        url: imageUrl as string,
        width: resolution,
      }).then((img) => {

        Optimizer._renderPicture(img, picture, resolution)

        if (actualIndex === resolutions.length -1) picture.appendChild(img);
        actualIndex++
      });
    }

    const sheet = styleSheet.addStyle('img { width: 100%; height: 100%; object-fit: cover; }');
    this.shadowRoot!.adoptedStyleSheets = [sheet];
    this.shadowRoot!.appendChild(picture);
  }

  private _generateResizedImage({ url, width }: GenerateResizedImage): Promise<HTMLImageElement> {
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
        const calculatedHeight =  Math.round(width * aspectRatio);

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
}

(() => {
  customElements.define('opt-image', Optimizer);
})()