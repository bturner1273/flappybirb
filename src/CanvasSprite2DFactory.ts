import CanvasSprite2DBuilder from "./CanvasSprite2DBuilder";
import { Point2D } from "./Physics";

export default abstract class CanvasSprite2DFactory {
    builder: CanvasSprite2DBuilder;
    constructor(builder: CanvasSprite2DBuilder) {
        this.builder = builder;
    }
    abstract spawn(position?: Point2D): void;
}