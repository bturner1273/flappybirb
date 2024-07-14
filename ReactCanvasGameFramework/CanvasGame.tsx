import React, { KeyboardEventHandler, useEffect, useRef } from 'react';
import CanvasSprite2D from './CanvasSprite2D';
import Physics, { HitBox2D } from './Physics';

export interface ICanvasGameProps
    extends React.DetailedHTMLProps<
        React.CanvasHTMLAttributes<HTMLCanvasElement>,
        HTMLCanvasElement
    > {
    sprites: Array<CanvasSprite2D>;
    debug?: boolean;
    fps?: number;
    onGameOver?: (ctx: ICanvasGameContext) => void;
}

export interface ICanvasGameContext {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    sprites: Array<CanvasSprite2D>;
    running: boolean;
    stopGameLoop: () => void;
    addSprite: (s: CanvasSprite2D) => void;
    removeSprite: (s: CanvasSprite2D) => void;
}

const drawSpriteHitBoxHelper = (
    s: CanvasSprite2D,
    context: CanvasRenderingContext2D,
    { offset, height, width, drawColor }: HitBox2D
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
const drawSpriteHitBox = (
    s: CanvasSprite2D,
    context: CanvasRenderingContext2D
): void => {
    if (s.hitBox) {
        drawSpriteHitBoxHelper(s, context, s.hitBox);
    } else if (s.compositeHitBox) {
        for (let key of Array.from(s.compositeHitBox.keys())) {
            drawSpriteHitBoxHelper(s, context, s.compositeHitBox.get(key));
        }
    }
};

const CanvasGame: React.FC<ICanvasGameProps> = ({
    sprites: initialSprites,
    debug = false,
    fps = 60,
    onGameOver,
    ...canvasProps
}: ICanvasGameProps): JSX.Element => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const running = useRef(true);
    const sprites = useRef(initialSprites);

    const onKeyDown: KeyboardEventHandler<HTMLCanvasElement> = e =>
        sprites.current.forEach(s => s.onKeyDown?.(e.key, s));
    const onKeyUp: KeyboardEventHandler<HTMLCanvasElement> = e =>
        sprites.current.forEach(s => s.onKeyUp?.(e.key, s));
    const addSprite = (s: CanvasSprite2D) => sprites.current.push(s);
    const removeSprite = (s: CanvasSprite2D) => {
        const index = sprites.current.indexOf(s);
        if (index > -1) {
            sprites.current.splice(index, 1);
        }
    };
    const getGameContext = (): ICanvasGameContext => ({
        canvasRef,
        sprites: sprites.current,
        running: running.current,
        stopGameLoop,
        addSprite,
        removeSprite
    });
    const stopGameLoop = () => {
        running.current = false;
        onGameOver?.(getGameContext());
    };

    useEffect(() => {
        const context = canvasRef.current.getContext('2d');
        let prevFrameMs = 0;
        let currentMs: number;
        const fpsInterval = 1000 / fps;
        const spritesClone = [...sprites.current];
        let animationFrameId: number;

        const gameLoop = () => {
            if (!running.current) {
                cancelAnimationFrame(animationFrameId);
                return;
            }
            animationFrameId = requestAnimationFrame(gameLoop);
            //remove all culled sprites and run updates
            spritesClone
                .reduce((acc, cur, i) => {
                    if (cur.shouldCull) {
                        acc.push(i);
                    }
                    return acc;
                }, [])
                .forEach(i => sprites.current.splice(i, 1));
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
            });
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
                spritesClone
                    .filter(s => !s.hidden)
                    .sort((s1, s2) => s1.zIndex - s2.zIndex)
                    .forEach(s => {
                        if (debug) {
                            drawSpriteHitBox(s, context);
                        }
                        s.draw(context);
                        s.showing = true;
                    });
            }
            //update game contexts
            const ctx = getGameContext();
            spritesClone.forEach(s => (s.gameContext = ctx));
        };
        gameLoop();
    }, [running.current, sprites.current]);

    return (
        <canvas
            {...canvasProps}
            ref={canvasRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
        />
    );
};
export default CanvasGame;
