import React, { useEffect, useRef } from 'react';
import CanvasSprite2D from './CanvasSprite2D';
import Physics, { HitBox2D } from './Physics';

interface ICanvasGameProps {
    sprites: Array<CanvasSprite2D>;
    debug?: boolean;
    canvasWidth?: number;
    canvasHeight?: number;
    fps?: number;
}

const CanvasGame: React.FC<ICanvasGameProps> = (
    {
        sprites,
        debug = false,
        canvasWidth = 400,
        canvasHeight = 400,
        fps = 60
    }: ICanvasGameProps
): JSX.Element => {
    const canvasRef: React.MutableRefObject<HTMLCanvasElement> = useRef(null);

    const drawSpriteHitBox = (s: CanvasSprite2D, context: CanvasRenderingContext2D): void => {
        const drawSpriteHitBoxHelper = (
            {
                offset,
                height,
                width,
                drawColor
            }: HitBox2D 
        ) => {
            drawColor = drawColor ?? 'red';
            context.strokeStyle = drawColor;
            context.strokeRect(
                s.position.x + (offset?.x ?? 0),
                s.position.y + (offset?.y ?? 0),
                width,
                height
            );
        };

        if (s.hitBox) {
            drawSpriteHitBoxHelper(s.hitBox);
        } else if (s.compositeHitBox) {
            for (let key of Array.from(s.compositeHitBox.keys())) {
                drawSpriteHitBoxHelper(s.compositeHitBox.get(key));
            }
        }
    };

    useEffect(() => {
        const context = canvasRef.current.getContext('2d');

        let prevFrameMs = 0;
        let currentMs: number;
        const fpsInterval = 1000 / fps;
        const spritesClone = [...sprites];

        canvasRef.current.addEventListener('keydown', e => sprites.forEach(s => s.onKeyDown?.(e.key, s)))
        canvasRef.current.addEventListener('keyup', e => sprites.forEach(s => s.onKeyUp?.(e.key, s)))

        const gameLoop = () => {
            requestAnimationFrame(gameLoop);
            //remove all culled sprites and run updates
            spritesClone.reduce((acc, cur, i) => {
                if (cur.shouldCull) {
                    acc.push(i)
                }
                return acc;
            }, []).forEach(i => sprites.splice(i, 1))
            //physics
            spritesClone.forEach(s => {
                s.update();
                if (s.collidableTags) {
                    spritesClone.forEach(_s => {
                        if (s !== _s && s.collidableTags.includes(_s.tag)) {
                            const collisionResult = Physics.colliding(s, _s);
                            if (collisionResult.collisionDetected) {
                                s._collisionDetected(collisionResult);
                            }
                        }
                    });
                }
            })
            //draw
            currentMs = Date.now();
            const elapsed = currentMs - prevFrameMs;
            if (elapsed >= fpsInterval) {
                prevFrameMs = currentMs - (elapsed % fpsInterval);
                context.clearRect(
                    0,
                    0,
                    canvasRef.current.width,
                    canvasRef.current.height
                );
                spritesClone.forEach(s => {
                    if (debug) {
                        drawSpriteHitBox(s, context);
                    }
                    s.draw(context);
                });
            }
        };
        gameLoop();
    });

    return (
        <canvas
            ref={canvasRef}
            height={canvasHeight}
            width={canvasWidth}
        />
    );
};
export default CanvasGame;
