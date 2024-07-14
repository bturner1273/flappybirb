import CanvasSprite2DBuilder from '../ReactCanvasGameFramework/CanvasSprite2DBuilder';
import CanvasSprite2DFrameAnimation from '../ReactCanvasGameFramework/CanvasSprite2DFrameAnimation';
import { imageLoad } from '../ReactCanvasGameFramework/ImageHelpers';
import MathUtils from '../ReactCanvasGameFramework/MathUtils';
import Constants from './Constants';
import flappy1ImageSrc from '../images/flappy_1.png';
import flappy2ImageSrc from '../images/flappy_2.png';
import flappy3ImageSrc from '../images/flappy_3.png';
import { MutateHiddenComponent } from '../ReactCanvasGameFramework/Components/MutateHiddenComponent';
import { ScoreTrackingComponent } from './Score';

const flappyBird = new CanvasSprite2DBuilder()
    .at({ x: 20, y: 200 })
    .withTag('flappyBird')
    .withZIndex(2)
    .withGravity(0.2)
    .withHitBox({
        offset: {
            x: Constants.FLAPPY_WIDTH - Constants.PIPE_SPEED,
            y: 0
        },
        height: Constants.FLAPPY_HEIGHT,
        width: 3
    })
    .onKeyDown((key, flappy) => {
        if (key === ' ' || key === 'ArrowUp') {
            flappy.vy = Constants.FLAP_FORCE;
        }
    })
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
    .canCollideWith(['pipeSet', 'ground'])
    .onCollision((flappy, collisionEvent) => {
        if (
            ((collisionEvent.otherSprite.tag === 'pipeSet' &&
                (collisionEvent.otherSpriteHitBoxKey === 'topPipeHitBox' ||
                    collisionEvent.otherSpriteHitBoxKey ===
                        'bottomPipeHitBox')) ||
                collisionEvent.otherSprite.tag === 'ground') &&
            flappy.gameContext
        ) {
            const gameOver = flappy.gameContext.sprites.find(
                sprite => sprite.tag === 'gameOver'
            );
            const gameOverHiddenMutator = gameOver?.components.find(
                component => component.key === 'MutateHiddenComponent'
            ) as MutateHiddenComponent;
            gameOverHiddenMutator?.setHidden(false);
        } else if (
            collisionEvent.otherSprite.tag === 'pipeSet' &&
            collisionEvent.otherSpriteHitBoxKey === 'goalHitBox'
        ) {
            const score = flappy.gameContext?.sprites.find(
                sprite => sprite.tag === 'score'
            );
            const scoreComponent = score?.components.find(
                component => component.key === 'ScoreTrackingComponent'
            ) as ScoreTrackingComponent;
            scoreComponent?.increment();
        }
    })
    .build();

export default flappyBird;
