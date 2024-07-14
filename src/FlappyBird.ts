import CanvasSprite2DBuilder from '../ReactCanvasGameFramework/CanvasSprite2DBuilder';
import CanvasSprite2DFrameAnimation from '../ReactCanvasGameFramework/CanvasSprite2DFrameAnimation';
import { loadImages } from '../ReactCanvasGameFramework/ImageHelpers';
import MathUtils from '../ReactCanvasGameFramework/MathUtils';
import Constants from './Constants';
import flappy1ImageSrc from '../images/flappy_1.png';
import flappy2ImageSrc from '../images/flappy_2.png';
import flappy3ImageSrc from '../images/flappy_3.png';
import { MutateHiddenComponent } from '../ReactCanvasGameFramework/Components/MutateHiddenComponent';
import { ScoreTrackingComponent } from './Score';

export default async function getFlappyBird() {
    const images = await loadImages(
        flappy1ImageSrc,
        flappy2ImageSrc,
        flappy3ImageSrc
    );
    return new CanvasSprite2DBuilder()
        .at({ x: 20, y: Constants.CANVAS_HEIGHT / 2 })
        .withTag(Constants.FLAPPY_TAG)
        .withZIndex(Constants.FLAPPY_Z)
        .withGravity(0.2)
        .withHitBox({
            offset: {
                x: Constants.FLAPPY_WIDTH - 5,
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
                        images,
                        duration: 300
                    }
                ])
        )
        .canCollideWith([Constants.PIPE_TAG, Constants.GROUND_TAG])
        .onCollision((flappy, collisionEvent) => {
            if (
                ((collisionEvent.otherSprite.tag === Constants.PIPE_TAG &&
                    (collisionEvent.otherSpriteHitBoxKey ===
                        Constants.TOP_PIPE_HITBOX_KEY ||
                        collisionEvent.otherSpriteHitBoxKey ===
                            Constants.BOTTOM_PIPE_HITBOX_KEY)) ||
                    collisionEvent.otherSprite.tag === Constants.GROUND_TAG) &&
                flappy.gameContext
            ) {
                const gameOver = flappy.gameContext.sprites.find(
                    sprite => sprite.tag === Constants.GAME_OVER_TAG
                );
                const gameOverHiddenMutator =
                    gameOver?.getComponentByKey<MutateHiddenComponent>(
                        MutateHiddenComponent.key
                    );
                gameOverHiddenMutator?.setHidden(false);
            } else if (
                collisionEvent.otherSprite.tag === Constants.PIPE_TAG &&
                collisionEvent.otherSpriteHitBoxKey ===
                    Constants.GOAL_HITBOX_KEY
            ) {
                const score = flappy.gameContext?.sprites.find(
                    sprite => sprite.tag === Constants.SCORE_TAG
                );
                const scoreComponent =
                    score?.getComponentByKey<ScoreTrackingComponent>(
                        ScoreTrackingComponent.key
                    );
                scoreComponent?.increment();
            }
        })
        .build();
}
