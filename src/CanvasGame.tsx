import React, { useEffect, useRef } from 'react';
import CanvasSprite2D from './CanvasSprite2D';
import CanvasSprite2DBuilder from './CanvasSprite2DBuilder';
import CanvasSprite2DFrameAnimation from './CanvasSprite2DFrameAnimation';
import Constants from './Constants';
import MathUtils from './MathUtils';

//test
import flappy1ImageSrc from '../images/flappy_1.png';
import flappy2ImageSrc from '../images/flappy_2.png';
import flappy3ImageSrc from '../images/flappy_3.png';

interface ICanvasGameProps {
    sprites: Array<CanvasSprite2D>;
    debug?: boolean;
    canvasWidth?: number;
    canvasHeight?: number;
}

const CanvasGame: React.FC = (): JSX.Element => {
    const canvasRef: React.MutableRefObject<HTMLCanvasElement> = useRef(null);
    let context: CanvasRenderingContext2D;
    const debug = true;

    const drawSpriteHitBox = (s: CanvasSprite2D): void => {
        if (s.hitBox) {
            const { offset, height, width, drawColor } = s.hitBox;
            context.strokeStyle = drawColor ?? 'red';
            context.strokeRect(
                s.position.x + (offset?.x ?? 0),
                s.position.y + (offset?.y ?? 0),
                width,
                height
            );
        } else if (s.compositeHitBox) {
            for (let key of Array.from(s.compositeHitBox.keys())) {
                const { offset, height, width, drawColor } =
                    s.compositeHitBox.get(key);
                context.strokeStyle = drawColor ?? 'red';
                context.strokeRect(
                    s.position.x + (offset?.x ?? 0),
                    s.position.y + (offset?.y ?? 0),
                    width,
                    height
                );
            }
        }
    };

    useEffect(() => {
        context = canvasRef.current.getContext('2d');
        let flappy1Image = new Image();
        flappy1Image.src = flappy1ImageSrc;
        let flappy2Image = new Image();
        flappy2Image.src = flappy2ImageSrc;
        let flappy3Image = new Image();
        flappy3Image.src = flappy3ImageSrc;
        const sprites: Array<CanvasSprite2D> = [
            new CanvasSprite2DBuilder(canvasRef.current)
                .at({ x: 0, y: 200 })
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
                .withRotation(
                    sprite =>
                        -MathUtils.rangeMap(
                            sprite.vy,
                            Constants.FLAP_FORCE,
                            20,
                            60,
                            -60
                        )
                )
                .withAnimation(
                    new CanvasSprite2DFrameAnimation([
                        {
                            isActiveAnimation: () => true,
                            images: [flappy1Image, flappy2Image, flappy3Image],
                            duration: 300
                        }
                    ])
                )
                .build()
        ];
        const gameLoop = () => {
            context.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
            );
            sprites.forEach(s => {
                s.update();
                //check for collisions if this sprite has a hitbox/composite hitbox
                if (debug) {
                    drawSpriteHitBox(s);
                }
                s.draw();
            });
            requestAnimationFrame(gameLoop);
        };
        gameLoop();
    });

    return (
        <div>
            <canvas ref={canvasRef} height={400} width={400}></canvas>
        </div>
    );
};
export default CanvasGame;
