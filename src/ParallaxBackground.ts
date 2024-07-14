import CanvasSprite2DBuilder from '../ReactCanvasGameFramework/CanvasSprite2DBuilder';
import { LeftMovingPositionResetComponent } from '../ReactCanvasGameFramework/Components/LeftMovingPositionResetComponent';
import { loadImage } from '../ReactCanvasGameFramework/ImageHelpers';
import backgroundImageSrc from '../images/background.png';
import Constants from './Constants';

export default async function getParallaxBackground() {
    const image = await loadImage(backgroundImageSrc);
    return new CanvasSprite2DBuilder()
        .at({ x: 0, y: 0 })
        .withTag(Constants.BACKGROUND_TAG)
        .withZIndex(Constants.BACKGROUND_Z)
        .withCompositeImage([
            {
                image,
                x: 0,
                y: 0
            },
            {
                image,
                x: image.width - 1,
                y: 0
            },
            {
                image,
                x: (image.width - 1) * 2
            },
            {
                image,
                x: (image.width - 1) * 3
            }
        ])
        .withXVelocity(-0.15)
        .addComponent(new LeftMovingPositionResetComponent(image.width))
        .build();
}
