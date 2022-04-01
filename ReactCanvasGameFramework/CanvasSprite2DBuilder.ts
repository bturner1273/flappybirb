import CanvasSprite2D, { CanvasImageSourceWithOffset, RotationFunction } from "./CanvasSprite2D";
import CanvasSprite2DComponent from "./CanvasSprite2DComponent";
import CanvasSprite2DFrameAnimation from "./CanvasSprite2DFrameAnimation";
import { CompositeHitBox2D, HitBox2D, Point2D, SpriteCollisionEvent2D } from "./Physics";

export default class CanvasSprite2DBuilder {
    private sprite: CanvasSprite2D;
    constructor() {
        this.sprite = new CanvasSprite2D();
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

    withAnimation = (func: (sprite: CanvasSprite2D) => CanvasSprite2DFrameAnimation) => {
        if (this.sprite.image || this.sprite.compositeImage) throw new Error("Cannot add animation to sprite with pre-existing image/composite image");
        this.sprite.animation = func(this.sprite);
        return this;
    }

    withGravity = (gravitationConstant?: number) => {
        this.sprite.hasGravity = true;
        this.sprite.gravitationConstant = gravitationConstant;
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

    addComponent = (component: CanvasSprite2DComponent) => {
        if (this.sprite.components) {
            this.sprite.components.push(component);
        }
        else {
            this.sprite.components = [component];
        }
        return this;
    }

    canCollideWith = (collidableTags: Array<string>) => {
        this.sprite.collidableTags = collidableTags;
        return this;
    }

    onCollision = (handler: (sprite: CanvasSprite2D, collisionEvent: SpriteCollisionEvent2D) => void) => {
        this.sprite.collisionHandler = handler;
        return this;
    }

    build = (): CanvasSprite2D => {
        let returnSprite = this.sprite;
        this.sprite = new CanvasSprite2D();
        this.sprite.shouldCull = false;
        return returnSprite;
    } 
}