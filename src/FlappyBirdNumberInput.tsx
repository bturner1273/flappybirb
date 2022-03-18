import React from 'react';
import ReactDOM from 'react-dom';
import CanvasGame from './CanvasGame';

export interface IFlappyBirdNumberInputProps {
    name?: string;
    value?: number;
}

export const FlappyBirdNumberInput: React.FC<IFlappyBirdNumberInputProps> = ({
    name,
    value
}: IFlappyBirdNumberInputProps): JSX.Element => {
    return (
        <div>
            <input type='hidden' name={name} value={value}></input>
            <CanvasGame></CanvasGame>
        </div>
    );
};

const render = (parentId: string, props: IFlappyBirdNumberInputProps) =>
    ReactDOM.render(
        <FlappyBirdNumberInput {...props}></FlappyBirdNumberInput>,
        document.getElementById(parentId)
    );
export default render;
