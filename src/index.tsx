import React from 'react';
import { createRoot } from 'react-dom/client';
import {
    FlappyBirdNumberInput,
    IFlappyBirdNumberInputProps
} from './FlappyBirdNumberInput';

const render = (props?: IFlappyBirdNumberInputProps) => {
    const root = createRoot(document.getElementById('root'));
    root.render(<FlappyBirdNumberInput {...props} />);
};
render();
//Webpack HMR
//@ts-ignore
if (module.hot) {
    //@ts-ignore
    module.hot.accept('./FlappyBirdNumberInput.tsx', render);
}
