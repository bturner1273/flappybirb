import React from 'react';
import CanvasGame from '../ReactCanvasGameFramework/CanvasGame';
import getPipeSet from './PipeSet';
import getFlappyBird from './FlappyBird';
import getParallaxBackground from './ParallaxBackground';
import getGround from './Ground';
import getGameOver from './GameOver';
import score from './Score';
import Constants from './Constants';

const sprites = [
    await getParallaxBackground(),
    await getGround(),
    await getFlappyBird(),
    await getPipeSet(),
    await getGameOver(),
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
