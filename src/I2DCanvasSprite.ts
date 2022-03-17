import { HitBox2D, Point2D } from "./Physics";
export default interface I2DCanvasSprite {
    canvas: HTMLCanvasElement;
    position: Point2D;
    vx?: number;
    vy?: number;
    hitBox?: HitBox2D;
    update(): void;
    draw(): void;
}