import React from 'react';
import CanvasGame from '../ReactCanvasGameFramework/CanvasGame';
import PipeSetFactory from './PipeSetFactory';
import flappyBird from './FlappyBird';

const sprites = [];
export const pipeFactory = new PipeSetFactory(sprites);
sprites.push(flappyBird, pipeFactory.build());
pipeFactory.spawnAfterMs(950);
pipeFactory.spawnAfterMs(1900);

const FlappyBirdGame: React.FC = () => {
    return <CanvasGame sprites={sprites} debug={true}></CanvasGame>;
};

export default FlappyBirdGame;
