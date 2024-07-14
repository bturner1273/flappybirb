//NOTE: the canvas game should take a list of images to preload
export const imageLoad = (...srcs: string[]): HTMLImageElement[] => {
    return srcs.map(src => {
        const image = new Image();
        image.src = src;
        return image;
    });
};
