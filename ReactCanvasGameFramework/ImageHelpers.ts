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