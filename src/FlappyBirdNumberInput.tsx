import React from "react";
import ReactDOM from "react-dom";
import FlappyBirdCanvasGame from "./FlappyBirdCanvasGame";

export interface IFlappyBirdNumberInputProps {
  name?: string;
  value?: number;
}

export const FlappyBirdNumberInput: React.FC<IFlappyBirdNumberInputProps> = ({
  name,
  value,
}: IFlappyBirdNumberInputProps): JSX.Element => {
  return (
    <div>
      <input type="hidden" name={name} value={value}></input>
      <FlappyBirdCanvasGame></FlappyBirdCanvasGame>
    </div>
  );
};

const render = (parentId: string, props: IFlappyBirdNumberInputProps) =>
  ReactDOM.render(
    <FlappyBirdNumberInput {...props}></FlappyBirdNumberInput>,
    document.getElementById(parentId)
  );
export default render;
