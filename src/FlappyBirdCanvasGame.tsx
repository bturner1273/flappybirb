import React, { useEffect, useRef, useState } from 'react';
import BackgroundImage from '../images/background.png';
import BottomPipeImage from '../images/bottom_pipe.png';
import TopPipeImage from '../images/top_pipe.png';
import GameOverImage from '../images/game_over.png';
import GroundImage from '../images/ground.png';
import FlappyBird from './FlappyBird';
import PipeSet from './PipeSet';
import I2DCanvasSprite from './I2DCanvasSprite';
import Physics, { SpriteCollisionResult2D } from './Physics';

const FlappyBirdCanvasGame: React.FC = (): JSX.Element => {
    const canvasRef: React.MutableRefObject<HTMLCanvasElement> = useRef(null);
    let flappyBird: FlappyBird;
    let context: CanvasRenderingContext2D;
    const debug = true;

    const drawSpriteHitBox = (s: I2DCanvasSprite): void => {
        if (s.hitBox) {
            const { anchor, height, width, drawColor } = s.hitBox;

            context.strokeStyle = drawColor ?? 'red';
            context.strokeRect(anchor.x, anchor.y, width, height);
        } else if (s.compositeHitBox) {
            for (let key of Array.from(s.compositeHitBox.hitBoxes.keys())) {
                const { anchor, height, width, drawColor } =
                    s.compositeHitBox.hitBoxes.get(key);
                context.strokeStyle = drawColor ?? 'red';
                context.strokeRect(anchor.x, anchor.y, width, height);
            }
        }
    };

    useEffect(() => {
        context = canvasRef.current.getContext('2d');
        flappyBird = new FlappyBird(canvasRef.current);
        let pipeSet = new PipeSet(canvasRef.current, 100);
        const sprites: Array<I2DCanvasSprite> = [flappyBird, pipeSet];

        const gameLoop = () => {
            context.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
            );
            sprites.forEach(s => {
                s.update();
                if (debug) {
                    drawSpriteHitBox(s);
                }
                s.draw();
            });

            const collisionResult: SpriteCollisionResult2D = Physics.colliding(
                flappyBird,
                pipeSet
            );
            if (collisionResult.collisionDetected) {
                console.log(collisionResult);
            }

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
export default FlappyBirdCanvasGame;
