import CanvasSprite2D, { CanvasImageSourceWithOffset, RotationFunction } from "./CanvasSprite2D";
import CanvasSprite2DFrameAnimation from "./CanvasSprite2DFrameAnimation";
import { CompositeHitBox2D, HitBox2D, Point2D } from "./Physics";

export default class CanvasSprite2DBuilder {
    private sprite: CanvasSprite2D;
    constructor(canvas) {
        this.sprite = new CanvasSprite2D(canvas);
    }

    at = (position: Point2D) => {
        this.sprite.position = position;
        return this;
    }
    
    withCustomControlHooks = (controlHooks: (sprite: CanvasSprite2D) => void) => {
        controlHooks(this.sprite);
        return this;
    } 

    withImage = (image: CanvasImageSource) => {
        if (this.sprite.animation || this.sprite.compositeImage) throw new Error("Cannot add image to sprite with pre-existing animation/composite image");
        this.sprite.image = image;
        return this;
    }

    withCompositeImage = (compositeImage: Array<CanvasImageSourceWithOffset>) => {
        if (this.sprite.animation || this.sprite.image) throw new Error("Cannot add composite image to sprite with pre-existing animation/image");
        this.sprite.compositeImage = compositeImage;
        return this;
    }

    withAnimation = (animation: CanvasSprite2DFrameAnimation) => {
        if (this.sprite.image || this.sprite.compositeImage) throw new Error("Cannot add animation to sprite with pre-existing image/composite image");
        this.sprite.animation = animation;
        return this;
    }

    withGravity = () => {
        this.sprite.hasGravity = true;
        this.sprite.vy = 0;
        return this;
    } 

    withYVelocity = (vy: number) => {
        this.sprite.vy = vy;
        return this;
    }
    
    withXVelocity = (vx: number) => {
        this.sprite.vx = vx;
        return this;
    }

    withHitBox = (hitBox: HitBox2D) => {
        if (this.sprite.compositeHitBox) throw new Error("Cannot add hitBox to sprite with pre-existing composite hitBox");
        this.sprite.hitBox = hitBox; 
        return this;
    }

    withCompositeHitBox = (compositeHitBox: CompositeHitBox2D) => {
        if (this.sprite.hitBox) throw new Error("Cannot add composite hitBox to sprite with pre-existing hitBox");
        this.sprite.compositeHitBox = compositeHitBox;
        return this;
    }

    withRotation = (rotation: RotationFunction) => {
        this.sprite.rotation = rotation;
        return this;
    }

    onBeforeUpdate = (func: (sprite: CanvasSprite2D) => void) => {
        this.sprite.onBeforeUpdate = func;
        return this;
    }

    onAfterUpdate = (func: (sprite: CanvasSprite2D) => void) => {
        this.sprite.onAfterUpdate = func;
        return this;
    }

    withTag = (tag: string) => {
        this.sprite.tag = tag;
        return this;
    }

    build = (): CanvasSprite2D => this.sprite;
}