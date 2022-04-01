import CanvasSprite2D from "../CanvasSprite2D";
import CanvasSprite2DComponent from "../CanvasSprite2DComponent";

export default class OffscreenCullComponent extends CanvasSprite2DComponent {
    canvasRef: HTMLCanvasElement;
    constructor(canvasRef: HTMLCanvasElement) {
        super(OffscreenCullComponent.constructor.name);
        this.canvasRef = canvasRef;
    }
    update(sprite: CanvasSprite2D): void {
        throw new Error("Method not implemented.");
    }
}