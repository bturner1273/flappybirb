import React from 'react';
import { createRoot } from 'react-dom/client';
import FlappyBirdGame from './FlappyBirdGame';

const render = () => {
    const root = createRoot(document.getElementById('root'));
    root.render(<FlappyBirdGame />);
};
render();
//Webpack HMR
//@ts-ignore
if (module.hot) {
    //@ts-ignore
    module.hot.accept('./FlappyBirdGame.tsx', render);
}
