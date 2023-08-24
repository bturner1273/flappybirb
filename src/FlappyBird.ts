import CanvasSprite2DBuilder from "../ReactCanvasGameFramework/CanvasSprite2DBuilder";
import CanvasSprite2DFrameAnimation from "../ReactCanvasGameFramework/CanvasSprite2DFrameAnimation";
import { imageLoad } from "../ReactCanvasGameFramework/ImageHelpers";
import MathUtils from "../ReactCanvasGameFramework/MathUtils";
import Constants from "./Constants";
import flappy1ImageSrc from '../images/flappy_1.png';
import flappy2ImageSrc from '../images/flappy_2.png';
import flappy3ImageSrc from '../images/flappy_3.png';

const flappyBird = new CanvasSprite2DBuilder()
    .at({ x: 20, y: 200 })
    .withTag('flappyBird')
    .withGravity()
    .withHitBox({
        offset: {
            x: Constants.FLAPPY_WIDTH - Constants.PIPE_SPEED,
            y: 0
        },
        height: Constants.FLAPPY_HEIGHT,
        width: 3
    })
    // .withCustomControlHooks(flappy => {
    //     document.addEventListener('keydown', (e: KeyboardEvent) => {
    //         if (e.code === 'Space' || e.code === 'ArrowUp') {
    //             flappy.vy = Constants.FLAP_FORCE;
    //         }
    //     });
    // })
    .withRotation(flappy =>
        MathUtils.rangeMap(flappy.vy, Constants.FLAP_FORCE, 20, -60, 60)
    )
    .withAnimation(
        _ =>
            new CanvasSprite2DFrameAnimation([
                {
                    isActiveAnimation: () => true,
                    images: imageLoad(
                        flappy1ImageSrc,
                        flappy2ImageSrc,
                        flappy3ImageSrc
                    ),
                    duration: 300
                }
            ])
    )
    .canCollideWith(['pipeSet'])
    .onCollision((flappy, collisionEvent) => {
        if (collisionEvent.otherSprite.tag === 'pipeSet') {
            if (collisionEvent.otherSpriteHitBoxKey === 'topPipeHitBox') {
            } else if (collisionEvent.otherSpriteHitBoxKey === 'goalHitBox') {
            } else if (collisionEvent.otherSpriteHitBoxKey === 'bottomPipeHitBox') {
            }
        }
    })
    .build();

export default flappyBird;