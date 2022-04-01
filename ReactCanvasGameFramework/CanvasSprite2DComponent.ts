import CanvasSprite2D from "./CanvasSprite2D";
export default abstract class CanvasSprite2DComponent {
    key: string;
    constructor(key?: string) {
        if (key) {
            this.key = key;
        }
        else {
            this.key = this.constructor.name;
        }
    }
    abstract update(sprite: CanvasSprite2D): void;
}