export const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = src;
        image.onload = () => resolve(image);
        image.onerror = reject;
    });
};
export const loadImages = (...srcs: string[]): Promise<HTMLImageElement[]> => {
    return Promise.all(srcs.map(loadImage));
};
