import CanvasSprite2D from "./CanvasSprite2D";
export default abstract class CanvasSprite2DComponent {
    key: string;
    constructor(key: string) {
        this.key = key;
    }
    abstract update(sprite: CanvasSprite2D): void;
}