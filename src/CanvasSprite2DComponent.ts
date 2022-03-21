import CanvasSprite2D from "./CanvasSprite2D";
export default abstract class CanvasSprite2DComponent {
    abstract update(sprite: CanvasSprite2D): void;
}