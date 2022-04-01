import CanvasSprite2D from "../CanvasSprite2D";
import CanvasSprite2DComponent from "../CanvasSprite2DComponent";

export default class CullAfterDurationComponent extends CanvasSprite2DComponent {
    startMs: number;
    durationMs: number;
    constructor(durationMs: number) {
        super(CullAfterDurationComponent.constructor.name);
        this.startMs = Date.now();
        this.durationMs = durationMs;
    }
    update(sprite: CanvasSprite2D): void {
        if (sprite.shouldCull) return;
        if (Date.now() - this.startMs >= this.durationMs) {
            sprite.shouldCull = true;
        }
    }
}