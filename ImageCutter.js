
class ImageCutter {
    constructor(src) {
        this.src = src;
        this.domImage = null;
        this.virtualCanvas = null;
    }

    init() {
        return new Promise((resolve, reject) => {
            this.domImage = document.createElement('img');
            this.domImage.crossOrigin = 'anonymous';
            this.domImage.onload = () => {
                resolve();
            };

            this.domImage.onerror = () => {
                reject();
            };

            this.domImage.src = this.src;
        });
    }

    cut(width, height, x = 0, y = 0) {
        if (!this.domImage) return null;

        if (!this.virtualCanvas) {
            this.virtualCanvas = document.createElement('canvas');
            this.virtualCanvas.width = width;
            this.virtualCanvas.height = height;
        }

        const context = this.virtualCanvas.getContext('2d');
        context.drawImage(this.domImage, x, y);

        // Save canvas as an image so we can use it in future use.
        return this.virtualCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    }

    cutAll(width, height) {
        if (!this.domImage) {
            throw new Error('Image is not loaded, please call init():Promise first.');
        }

        const imageWidth = this.domImage.width;
        const imageHeight = this.domImage.height;

        // First calculate how many lines we have vertical & horizontal
        const amountOfLinesVertical = imageHeight / height;
        const amountOfLinesHorizontal = imageWidth / width;

        let currentYPosition = 0;
        let currentXPosition = 0;

        const cuttedImages = [];

        // First loop throught all the horizontal lines so we can start there.
        for (let verticalIndex = 1; verticalIndex < amountOfLinesVertical; verticalIndex += 1) {

            // Second loop through all the horizontal lines.
            for (let horizontalIndex = 1; horizontalIndex < amountOfLinesHorizontal; horizontalIndex++) {
                const image = this.cut(width, height, currentXPosition, currentYPosition);
                cuttedImages.push(image);

                currentXPosition -= width;
            }

            currentXPosition = 0;
            currentYPosition -= height;
        }

        return cuttedImages;
    }
}

export default ImageCutter;
