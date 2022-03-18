import CanvasSprite2DFrameAnimation from "./CanvasSprite2DFrameAnimation";
import IUpdateEveryFrame from "./IUpdateEveryFrame";
import Physics, { CompositeHitBox2D, HitBox2D, Point2D } from "./Physics";

export type RotationFunction = (sprite: CanvasSprite2D) => number;
export type CanvasImageSourceWithOffset = {
    image: CanvasImageSource;
    x?: number;
    y?: number;
}

export default class CanvasSprite2D implements IUpdateEveryFrame {
    tag: string;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    position: Point2D = {x: 0, y: 0};
    image?: CanvasImageSource;
    compositeImage?: Array<CanvasImageSourceWithOffset>;
    animation?: CanvasSprite2DFrameAnimation;
    vx?: number;
    vy?: number;
    hitBox?: HitBox2D;
    compositeHitBox?: CompositeHitBox2D;
    rotation?: RotationFunction;
    onBeforeUpdate?: (sprite: CanvasSprite2D) => void;
    onAfterUpdate?: (sprite: CanvasSprite2D) => void;
    hasGravity: boolean = false;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
    }

    update = () => {
        this.onBeforeUpdate?.(this);
        //update sprite position
        if (this.hasGravity) {
            Physics.gravity(this);
        }
        else if (!this.hasGravity && this.vy) {
            this.position.y += this.vy;
        }
        if (this.vx) {
            this.position.x += this.vx;
        }

        //handle animation/regular image display
        if (this.animation) { 
            this.animation.update();
        }
        this.onAfterUpdate?.(this);
    };

    draw = () => {
        const _drawHelper = () => {
            if (this.animation) {
                this.context.drawImage(this.animation.getView(), this.position.x, this.position.y);
            }
            else if (this.image) {
                this.context.drawImage(this.image, this.position.x, this.position.y);
            }
            else if (this.compositeImage) {
                this.compositeImage.forEach(img => {
                    this.context.drawImage(img.image, this.position.x + (img.x ?? 0), this.position.y + (img.y ?? 0));
                });
            }
        }

        if (this.rotation) {
            this.context.save();
            this.context.translate(this.position.x, this.position.y);
            this.context.rotate(this.rotation(this) * (Math.PI / 180.0))
            this.context.translate(-this.position.x, -this.position.y);
            _drawHelper();
            this.context.restore();
        }
        else {
            _drawHelper();
        }
    };
}