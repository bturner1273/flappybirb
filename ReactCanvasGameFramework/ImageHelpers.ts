//TODO: the canvas game should take a {[key: string]: string} map
//of image name to image src. This way, the game can load all images
//at the beginning and sprites can reference the images/composite images/animations
//by name. This ensures we don't have a race condition to start the canvas
//game before images load.

//NOTE: the below is also wrong as we need to handle the async nature
//of image by doing something like:
// const loadImage = (src: string): Promise<HTMLImageElement> => {
//     return new Promise((resolve, reject) => {
//         const image = new Image();
//         image.src = src;
//         image.onload = () => resolve(image);
//         image.onerror = reject;
//     });
// };
// const loadImages = (...srcs: string[]): Promise<HTMLImageElement[]> => {
//     return Promise.all(srcs.map(loadImage));
// };

export const imageLoad = (...srcs: string[]): HTMLImageElement[] => {
    return srcs.map(src => {
        const image = new Image();
        image.src = src;
        return image;
    });
};
