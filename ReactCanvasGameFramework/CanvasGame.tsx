import React, { useEffect, useRef } from 'react';
import CanvasSprite2D from './CanvasSprite2D';
import Physics, { HitBox2D } from './Physics';

interface ICanvasGameProps {
    sprites: Array<CanvasSprite2D>;
    debug?: boolean;
    canvasWidth?: number;
    canvasHeight?: number;
}

const CanvasGame: React.FC<ICanvasGameProps> = (
    props: ICanvasGameProps
): JSX.Element => {
    const canvasRef: React.MutableRefObject<HTMLCanvasElement> = useRef(null);
    let context: CanvasRenderingContext2D;
    let sprites: Array<CanvasSprite2D> = props.sprites;
    const debug = props.debug ?? false;

    const drawSpriteHitBox = (s: CanvasSprite2D): void => {
        const drawSpriteHitBoxHelper = ({
            offset,
            height,
            width,
            drawColor
        }: HitBox2D) => {
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
        context = canvasRef.current.getContext('2d');
        const gameLoop = () => {
            context.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
            );

            //remove all culled sprites
            sprites = sprites.filter(s => s.shouldCull === false);

            sprites.forEach(s => {
                s.update();
                if (s.collidableTags) {
                    sprites.forEach(_s => {
                        if (s !== _s && s.collidableTags.includes(_s.tag)) {
                            const collisionResult = Physics.colliding(s, _s);
                            if (collisionResult.collisionDetected) {
                                s._collisionDetected(collisionResult);
                            }
                        }
                    });
                }
                if (debug) {
                    drawSpriteHitBox(s);
                }
                s.draw(context);
            });
            requestAnimationFrame(gameLoop);
        };
        gameLoop();
    });

    return (
        <div>
            <canvas
                ref={canvasRef}
                height={props.canvasHeight ?? 400}
                width={props.canvasWidth ?? 400}
            ></canvas>
        </div>
    );
};
export default CanvasGame;
