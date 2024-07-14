import CanvasSprite2D from '../ReactCanvasGameFramework/CanvasSprite2D';
import CanvasSprite2DBuilder from '../ReactCanvasGameFramework/CanvasSprite2DBuilder';
import CanvasSprite2DComponent from '../ReactCanvasGameFramework/CanvasSprite2DComponent';
import { LeftMovingPositionResetComponent } from '../ReactCanvasGameFramework/Components/LeftMovingPositionResetComponent';
import { imageLoad } from '../ReactCanvasGameFramework/ImageHelpers';
import backgroundImageSrc from '../images/background.png';
import Constants from './Constants';

const backgroundImage = imageLoad(backgroundImageSrc)[0];
const parallaxBackground = new CanvasSprite2DBuilder()
    .at({ x: 0, y: 0 })
    .withTag(Constants.BACKGROUND_TAG)
    .withZIndex(Constants.BACKGROUND_Z)
    .withCompositeImage([
        {
            image: backgroundImage,
            x: 0,
            y: 0
        },
        {
            image: backgroundImage,
            x: backgroundImage.width - 1,
            y: 0
        },
        {
            image: backgroundImage,
            x: (backgroundImage.width - 1) * 2
        },
        {
            image: backgroundImage,
            x: (backgroundImage.width - 1) * 3
        }
    ])
    .withXVelocity(-0.15)
    .addComponent(new LeftMovingPositionResetComponent(backgroundImage.width))
    .build();
export default parallaxBackground;
