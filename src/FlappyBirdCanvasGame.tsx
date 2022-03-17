import React, { useEffect, useRef, useState } from 'react';
import BackgroundImage from '../images/background.png';
import BottomPipeImage from '../images/bottom_pipe.png';
import TopPipeImage from '../images/top_pipe.png';
import GameOverImage from '../images/game_over.png';
import GroundImage from '../images/ground.png';
import FlappyBird from './FlappyBird';
import PipeSet from './PipeSet';
import I2DCanvasSprite from './I2DCanvasSprite';

const FlappyBirdCanvasGame: React.FC = (): JSX.Element => {
    const canvasRef: React.MutableRefObject<HTMLCanvasElement> = useRef(null);
    let flappyBird: FlappyBird;
    let context: CanvasRenderingContext2D;
    const debug = true;

    useEffect(() => {
        context = canvasRef.current.getContext('2d');
        context.strokeStyle = 'red';
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
                if (s.hitBox && debug) {
                    const { anchor, height, width } = s.hitBox;
                    context.strokeRect(anchor.x, anchor.y, width, height);
                }

                s.update();
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
export default FlappyBirdCanvasGame;
