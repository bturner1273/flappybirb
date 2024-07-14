import React from 'react';
import CanvasGame from '../ReactCanvasGameFramework/CanvasGame';
import pipeSet from './PipeSet';
import flappyBird from './FlappyBird';
import parallaxBackground from './ParallaxBackground';
import ground from './Ground';
import gameOver from './GameOver';
import Score from './Score';

const sprites = [];
const score = new Score();
sprites.push(parallaxBackground, ground, flappyBird, pipeSet, gameOver, score);

const FlappyBirdGame: React.FC = () => (
    <CanvasGame sprites={sprites} debug={false} fps={60} />
);
export default FlappyBirdGame;
