import Constants from "./Constants";
import CanvasSprite2D from "./CanvasSprite2D";

export type Point2D = {
    x: number;
    y: number;
}

export type HitBox2D = {
    offset?: Point2D;
    height: number;
    width: number;
    drawColor?: string;
}

export type CompositeHitBox2D = Map<string, HitBox2D>;

export type SpriteCollisionResult2D = {
    collisionDetected: boolean;
    spriteTag: string;
    spriteHitBoxKey?: string;
    otherSpriteTag: string;
    otherSpriteHitBoxKey?: string;
}

export default class Physics {
    static gravity = (e: CanvasSprite2D): void => {
        if (e.vy === null || typeof e.vy === 'undefined') console.error('[Physics::gravity]: cannot call gravity on I2DCanvasEntity that does not have vy');
        e.position.y += e.vy;
        e.vy += Constants.G;
    }

    private static collidingHelper = (sprite: CanvasSprite2D, otherSprite: CanvasSprite2D, shouldSetSpriteHitBoxKey: boolean = false): SpriteCollisionResult2D => {
        const result: SpriteCollisionResult2D = {
            collisionDetected: false,
            spriteTag: shouldSetSpriteHitBoxKey ? otherSprite.tag : sprite.tag,
            otherSpriteTag: shouldSetSpriteHitBoxKey ? sprite.tag : otherSprite.tag
        };
        for (let key of Array.from(otherSprite.compositeHitBox.keys())) {
            if (this.rectangleCollision(sprite.position, sprite.hitBox, otherSprite.position, otherSprite.compositeHitBox.get(key))) {
                result.collisionDetected = true;
                if (shouldSetSpriteHitBoxKey) { 
                    result.spriteHitBoxKey = key;
                }
                else {
                    result.otherSpriteHitBoxKey = key;
                }
                break;
            }
        }
        return result;
    }

    static colliding = (sprite: CanvasSprite2D, otherSprite: CanvasSprite2D): SpriteCollisionResult2D => {
        let result: SpriteCollisionResult2D = {
            collisionDetected: false,
            spriteTag: sprite.tag,
            otherSpriteTag: otherSprite.tag
        };
        if (sprite.hitBox && otherSprite.hitBox) {
            result.collisionDetected = this.rectangleCollision(sprite.position, sprite.hitBox, otherSprite.position, otherSprite.hitBox); 
        }
        else if (sprite.hitBox && otherSprite.compositeHitBox) {
            result = this.collidingHelper(sprite, otherSprite);
        }
        else if (sprite.compositeHitBox && otherSprite.hitBox) {
            result = this.collidingHelper(otherSprite, sprite, true);
        }
        else if (sprite.compositeHitBox && otherSprite.compositeHitBox) {
            for (let spriteKey of Array.from(sprite.compositeHitBox.keys())) {
                for (let otherSpriteKey of Array.from(otherSprite.compositeHitBox.keys())) {
                    if (this.rectangleCollision(sprite.position, sprite.compositeHitBox.get(spriteKey), otherSprite.position, otherSprite.compositeHitBox.get(otherSpriteKey))) {
                        result = {
                            collisionDetected: true,
                            spriteTag: sprite.tag,
                            spriteHitBoxKey: spriteKey,
                            otherSpriteTag: otherSprite.tag,
                            otherSpriteHitBoxKey: otherSpriteKey
                        }
                        break;
                    }
                }
            }
        }
        return result;
    }
    
    static rectangleCollision = (hitBoxPos: Point2D, hitBox: HitBox2D, otherHitBoxPos: Point2D, otherHitBox: HitBox2D): boolean => {
        if (hitBoxPos.x < otherHitBoxPos.x + otherHitBox.width &&
            hitBoxPos.x + hitBox.width > otherHitBoxPos.x &&
            hitBoxPos.y < otherHitBoxPos.y + otherHitBox.height &&
            hitBoxPos.y + hitBox.height > otherHitBoxPos.y) { 
            return true;
        }
        return false;
    }
}