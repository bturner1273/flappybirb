
//NOTE: the canvas game should take a list of images to preload instead of this ghetto 
//function that doesn't really do much

export const imageLoad = (...imageSourceArr: Array<any>) => {
    const imageLoadHelper = (imageSource: any) => {
        const image = new Image();
        image.src = imageSource;
        return image;
    };
    if (Array.isArray(imageSourceArr)) {
        return imageSourceArr.map(imageSource =>
            imageLoadHelper(imageSource)
        );
    }
    return [imageLoadHelper(imageSourceArr)];
};