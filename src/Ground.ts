import CanvasSprite2DBuilder from '../ReactCanvasGameFramework/CanvasSprite2DBuilder';
import { LeftMovingPositionResetComponent } from '../ReactCanvasGameFramework/Components/LeftMovingPositionResetComponent';
import { loadImage } from '../ReactCanvasGameFramework/ImageHelpers';
import groundImageSrc from '../images/ground.png';
import Constants from './Constants';

export default async function getGround() {
    const image = await loadImage(groundImageSrc);
    return new CanvasSprite2DBuilder()
        .at({ x: 0, y: Constants.CANVAS_HEIGHT - image.height })
        .withTag(Constants.GROUND_TAG)
        .withZIndex(Constants.GROUND_Z)
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
            }
        ])
        .withHitBox({
            offset: { x: 0, y: 0 },
            height: image.height,
            width: image.width * 2
        })
        .withXVelocity(Constants.PIPE_VELOCITY_X)
        .addComponent(new LeftMovingPositionResetComponent(image.width))
        .build();
}
