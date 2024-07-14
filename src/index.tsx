import React from 'react';
import ReactDOM from 'react-dom';
import {
    FlappyBirdNumberInput,
    IFlappyBirdNumberInputProps
} from './FlappyBirdNumberInput';

const render = (props?: IFlappyBirdNumberInputProps) =>
    ReactDOM.render(
        <FlappyBirdNumberInput {...props} />,
        document.getElementsByTagName('body')[0]
    );
render();
//Webpack HMR
//@ts-ignore
if (module.hot) {
    //@ts-ignore
    module.hot.accept('./FlappyBirdNumberInput.tsx', render);
}
