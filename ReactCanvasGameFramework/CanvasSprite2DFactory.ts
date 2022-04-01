import CanvasSprite2D from "./CanvasSprite2D";
import CanvasSprite2DBuilder from "./CanvasSprite2DBuilder";
import { Point2D } from "./Physics";

export default abstract class CanvasSprite2DFactory {
    builder: CanvasSprite2DBuilder;
    spritesReference: Array<CanvasSprite2D>
    constructor(spritesReference: Array<CanvasSprite2D>) {
        this.spritesReference = spritesReference;
        this.builder = new CanvasSprite2DBuilder();
    }
    abstract build: () => CanvasSprite2D;
    spawn = (position?: Point2D) => {
        let sprite = this.build();
        if (position) {
            sprite.position.x = position.x;
            sprite.position.y = position.y;
        }
        this.spritesReference.push(sprite);
    }
    spawnAfterMs = (ms: number) => {
        setTimeout(this.spawn, ms);
    }
}