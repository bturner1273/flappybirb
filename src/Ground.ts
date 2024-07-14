import CanvasSprite2DBuilder from '../ReactCanvasGameFramework/CanvasSprite2DBuilder';
import { LeftMovingPositionResetComponent } from '../ReactCanvasGameFramework/Components/LeftMovingPositionResetComponent';
import { imageLoad } from '../ReactCanvasGameFramework/ImageHelpers';
import groundImageSrc from '../images/ground.png';
const groundImage = imageLoad(groundImageSrc)[0];
const ground = new CanvasSprite2DBuilder()
    .at({ x: 0, y: 400 - groundImage.height })
    .withTag('ground')
    .withZIndex(1)
    .withCompositeImage([
        {
            image: groundImage,
            x: 0,
            y: 0
        },
        {
            image: groundImage,
            x: groundImage.width - 1,
            y: 0
        }
    ])
    .withHitBox({
        offset: { x: 0, y: 0 },
        height: groundImage.height,
        width: groundImage.width * 2
    })
    .withXVelocity(-3)
    .addComponent(new LeftMovingPositionResetComponent(groundImage.width))
    .build();
export default ground;
