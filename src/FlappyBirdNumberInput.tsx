import React from 'react';
import FlappyBirdGame from './FlappyBirdGame';

export interface IFlappyBirdNumberInputProps {
    name?: string;
    value?: number;
}

export const FlappyBirdNumberInput: React.FC<IFlappyBirdNumberInputProps> = ({
    name,
    value
}: IFlappyBirdNumberInputProps) => {
    return (
        <>
            <input type='hidden' name={name} value={value}></input>
            <FlappyBirdGame />
        </>
    );
};
