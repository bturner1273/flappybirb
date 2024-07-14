import CanvasSprite2D from './CanvasSprite2D';
import IUpdateEveryFrame from './IUpdateEveryFrame';
export default abstract class CanvasSprite2DComponent
    implements IUpdateEveryFrame
{
    key: string;
    constructor(key: string) {
        this.key = key;
    }
    abstract update(sprite: CanvasSprite2D): void;
}
