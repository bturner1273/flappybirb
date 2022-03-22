import CanvasSprite2DBuilder from './CanvasSprite2DBuilder';
import CanvasSprite2DFrameAnimation from './CanvasSprite2DFrameAnimation';
import Constants from './Constants';
import { imageLoad } from './ImageHelpers';
import MathUtils from './MathUtils';
import flappy1ImageSrc from '../images/flappy_1.png';
import flappy2ImageSrc from '../images/flappy_2.png';
import flappy3ImageSrc from '../images/flappy_3.png';
import topPipeImageSrc from '../images/top_pipe.png';
import bottomPipeImageSrc from '../images/bottom_pipe.png';
import React from 'react';
import CanvasGame from './CanvasGame';
import { HitBox2D } from './Physics';
import CanvasSprite2DFactory from './CanvasSprite2DFactory';
import CanvasSprite2DComponent from './CanvasSprite2DComponent';
import CanvasSprite2D from './CanvasSprite2D';

const spriteBuilder = new CanvasSprite2DBuilder();

const flappyBirdSprite = spriteBuilder
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
    .withCustomControlHooks(flappy => {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                flappy.vy = Constants.FLAP_FORCE;
            }
        });
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
    .canCollideWith(['pipeSet'])
    .onCollision((flappy, collisionEvent) => {
        if (collisionEvent.otherSprite.tag === 'pipeSet') {
            if (collisionEvent.otherSpriteHitBoxKey === 'topPipeHitBox') {
            } else if (collisionEvent.otherSpriteHitBoxKey === 'goalHitBox') {
            } else if (collisionEvent.otherSpriteHitBoxKey === 'bottomPipe') {
            }
        }
        console.log(collisionEvent);
    })
    .build();

const getRandomPipeHeight = () => -25 + Math.random() * 115;

class PipePositionResetComponent extends CanvasSprite2DComponent {
    update(sprite: CanvasSprite2D): void {
        if (sprite.position.x < -400 - Constants.PIPE_WIDTH) {
            sprite.position.x = 400;
            sprite.position.y = getRandomPipeHeight();
        }
    }
}

class PipeSetFactory extends CanvasSprite2DFactory {
    spawnAfterMs = (durationMs: number, sprites: Array<CanvasSprite2D>) =>
        setTimeout(() => sprites.push(this.spawn()), durationMs);

    spawn = () => {
        const x = 400;
        const y = getRandomPipeHeight();
        const topPipeHitBoxPosition = {
            x: x,
            y: y - Constants.PIPE_Y_OFFSET
        };
        const goalHitBoxPosition = {
            x: x,
            y: y + 75
        };
        const bottomPipeHitBoxPosition = {
            x: x,
            y: y + Constants.PIPE_Y_OFFSET
        };
        return spriteBuilder
            .withTag('pipeSet')
            .at({ x: x, y: y })
            .withXVelocity(-5)
            .withCompositeImage([
                {
                    image: imageLoad(topPipeImageSrc)[0],
                    x: x,
                    y: y + Constants.PIPE_Y_OFFSET
                },
                {
                    image: imageLoad(bottomPipeImageSrc)[0],
                    x: x,
                    y: y - Constants.PIPE_Y_OFFSET
                }
            ])
            .withCompositeHitBox(
                new Map<string, HitBox2D>([
                    [
                        'topPipeHitBox',
                        {
                            offset: topPipeHitBoxPosition,
                            height: Constants.PIPE_HEIGHT,
                            width: Constants.PIPE_WIDTH
                        }
                    ],
                    [
                        'goalHitBox',
                        {
                            offset: goalHitBoxPosition,
                            height: Constants.GOAL_HEIGHT,
                            width: 3
                        }
                    ],
                    [
                        'bottomPipeHitBox',
                        {
                            offset: bottomPipeHitBoxPosition,
                            height: Constants.PIPE_HEIGHT,
                            width: Constants.PIPE_WIDTH
                        }
                    ]
                ])
            )
            .addComponent(new PipePositionResetComponent())
            .build();
    };
}

const pipeFactory = new PipeSetFactory(spriteBuilder);
const sprites = [flappyBirdSprite];
pipeFactory.spawnAfterMs(0, sprites);
pipeFactory.spawnAfterMs(950, sprites);
pipeFactory.spawnAfterMs(1900, sprites);

const FlappyBirdGame: React.FC = () => {
    return <CanvasGame sprites={sprites} debug={true}></CanvasGame>;
};

export default FlappyBirdGame;
