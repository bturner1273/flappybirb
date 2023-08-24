import React from 'react';
import CanvasGame from '../ReactCanvasGameFramework/CanvasGame';
import PipeSetFactory from './PipeSetFactory';
import flappyBird from './FlappyBird';

const sprites = [];

//TODO: this factory usage is weird, maybe accept factories
//separately in ICanvasGameProps and give factories interval functions?
export const pipeFactory = new PipeSetFactory(sprites);
sprites.push(flappyBird, pipeFactory.build());
pipeFactory.spawnAfterMs(950);
pipeFactory.spawnAfterMs(1900);

const FlappyBirdGame: React.FC = () => <CanvasGame sprites={sprites} debug={true} fps={60} />;
export default FlappyBirdGame;
   