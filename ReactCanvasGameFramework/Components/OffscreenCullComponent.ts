import CanvasSprite2D from '../CanvasSprite2D';
import CanvasSprite2DComponent from '../CanvasSprite2DComponent';

export default class OffscreenCullComponent extends CanvasSprite2DComponent {
    canvasRef: HTMLCanvasElement;
    static key = 'OffscreenCullComponent';
    constructor(canvasRef: HTMLCanvasElement) {
        super(OffscreenCullComponent.key);
        this.canvasRef = canvasRef;
    }
    update(sprite: CanvasSprite2D): void {
        throw new Error('Method not implemented.');
    }
}
