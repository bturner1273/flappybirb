import CanvasSprite2DComponent from "./CanvasSprite2DComponent";
import CanvasSprite2DFrameAnimation from "./CanvasSprite2DFrameAnimation";
import Constants from "./Constants";
import IUpdateEveryFrame from "./IUpdateEveryFrame";
import Physics, { CompositeHitBox2D, HitBox2D, Point2D, SpriteCollisionResult2D } from "./Physics";

export type RotationFunction = (sprite: CanvasSprite2D) => number;
export type CanvasImageSourceWithOffset = {
    image: any;
    x?: number;
    y?: number;
}

export default class CanvasSprite2D implements IUpdateEveryFrame {
    tag: string;
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
    gravitationConstant?: number;
    components?: Array<CanvasSprite2DComponent>;
    collidableTags?: Array<string>;
    collisionHandler?: (collisionEvent: SpriteCollisionResult2D) => void;
    shouldCull: boolean = false;

    _collisionDetected = (collisionEvent: SpriteCollisionResult2D) => {
        this.collisionHandler?.(collisionEvent);
    }

    update = () => {
        this.onBeforeUpdate?.(this);
        
        //handle custom components
        if (this.components) {
            this.components.forEach(component => {
                component.update(this);
            })
        }

        //update sprite position
        if (this.hasGravity) {
            Physics.gravity(this, this.gravitationConstant);
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

    draw = (context: CanvasRenderingContext2D) => {
        const _drawHelper = () => {
            if (this.animation) {
                context.drawImage(this.animation.getView(), this.position.x, this.position.y);
            }
            else if (this.image) {
                context.drawImage(this.image, this.position.x, this.position.y);
            }
            else if (this.compositeImage) {
                this.compositeImage.forEach(img => {
                    context.drawImage(img.image, this.position.x + (img.x ?? 0), this.position.y + (img.y ?? 0));
                });
            }
        }

        if (this.rotation) {
            context.save();
            context.translate(this.position.x, this.position.y);
            context.rotate(this.rotation(this) * (Math.PI / 180.0))
            context.translate(-this.position.x, -this.position.y);
            _drawHelper();
            context.restore();
        }
        else {
            _drawHelper();
        }
    };

    kill = () => this.shouldCull = true;
}