import React from 'react';
import CanvasGame from '../ReactCanvasGameFramework/CanvasGame';
import pipeSet from './PipeSet';
import flappyBird from './FlappyBird';
import parallaxBackground from './ParallaxBackground';
import ground from './Ground';
import gameOver from './GameOver';
import score from './Score';
import Constants from './Constants';

const sprites = [
    parallaxBackground,
    ground,
    flappyBird,
    pipeSet,
    gameOver,
    score
];
export default function FlappyBirdGame() {
    return (
        <CanvasGame
            sprites={sprites}
            height={Constants.CANVAS_HEIGHT}
            width={Constants.CANVAS_WIDTH}
            style={{
                border: '2px solid black',
                borderRadius: '5px',
                outline: 'none'
            }}
        />
    );
}
