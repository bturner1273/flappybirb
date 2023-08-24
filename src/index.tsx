import React from "react";
import ReactDOM from "react-dom";
import { FlappyBirdNumberInput, IFlappyBirdNumberInputProps } from "./FlappyBirdNumberInput";

const render = (props?: IFlappyBirdNumberInputProps) =>
    ReactDOM.render(
        <FlappyBirdNumberInput {...props} />,
        document.getElementsByTagName('body')[0]
    );
render();
//Webpack HMR
//eslint-disable-next-line
//@ts-ignore
//eslint-disable-next-line no-undef
if (module.hot) {
    //eslint-disable-next-line
    //@ts-ignore
    //eslint-disable-next-line no-undef
    module.hot.accept('./FlappyBirdNumberInput.tsx', render);
}