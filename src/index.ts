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

    const resolutions = customResolutions ? customResolutions.split(',').map(Number) : [320, 480, 800];
    let i = 0;
    for (const resolution of resolutions) {
      this.generateResizedImage({
        url: imageUrl as string,
        width: resolution,
        height: Number(customHeight)
      }).then((img) => {
        const source = document.createElement('source');
        source.setAttribute('srcset', img.src);
        source.setAttribute('media', `(max-width: ${resolution}px)`);

        picture.appendChild(source);

        if (i === resolutions.length - 1) picture.appendChild(img);
        i++;
      });
    }

    const sheet = styleSheet.addStyle('img { width: 100%; object-fit: cover; }');
    this.shadowRoot!.adoptedStyleSheets = [sheet];
    this.shadowRoot!.appendChild(picture);
  }

  generateResizedImage({ url, width, height }: GenerateResizedImage): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const aspectRatio = img.height / img.width;
        const calculatedHeight = height || Math.round(width * aspectRatio);

        canvas.width = width;
        canvas.height = calculatedHeight;

        ctx!.drawImage(img, 0, 0, width, calculatedHeight);

        const resizedImg = document.createElement('img');
        resizedImg.src = canvas.toDataURL('image/jpeg');
        resizedImg.alt = `Imagem redimensionada para ${width}x${calculatedHeight}`;

        resolve(resizedImg);
      };

      img.src = `${url}?width=${width}`;
    });
  }
}

customElements.define('opt-image', Optimizer);
