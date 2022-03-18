import Constants from "./Constants";
import I2DCanvasSprite from "./I2DCanvasSprite";

export type Point2D = {
    x: number;
    y: number;
}

export type HitBox2D = {
    anchor: Point2D;
    height: number;
    width: number;
    drawColor?: string;
}

export type CompositeHitBox2D = {
    hitBoxes: Map<string, HitBox2D>
}

export type SpriteCollisionResult2D = {
    collisionDetected: boolean;
    spriteHitBoxKey?: string;
    otherSpriteHitBoxKey?: string;
}

export default class Physics {
    static gravity = (e: I2DCanvasSprite): void => {
        if (e.vy === null || typeof e.vy === 'undefined') console.error('[Physics::gravity]: cannot call gravity on I2DCanvasEntity that does not have vy');
        e.position.y += e.vy;
        e.vy += Constants.G;
    }

    private static collidingHelper = (spriteHitBox: HitBox2D, otherSpriteCompositeHitBox: CompositeHitBox2D, shouldSetSpriteHitBoxKey: boolean = false): SpriteCollisionResult2D => {
        const result: SpriteCollisionResult2D = {
            collisionDetected: false
        };
        for (let key of Array.from(otherSpriteCompositeHitBox.hitBoxes.keys())) {
            if (this.hitBoxColliding(spriteHitBox, otherSpriteCompositeHitBox.hitBoxes.get(key))) {
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

    static colliding = (sprite: I2DCanvasSprite, otherSprite: I2DCanvasSprite): SpriteCollisionResult2D => {
        let result: SpriteCollisionResult2D = {
            collisionDetected: false
        };
        if (sprite.hitBox && otherSprite.hitBox) {
            result.collisionDetected = this.hitBoxColliding(sprite.hitBox, otherSprite.hitBox); 
        }
        else if (sprite.hitBox && otherSprite.compositeHitBox) {
            result = this.collidingHelper(sprite.hitBox, otherSprite.compositeHitBox);
        }
        else if (sprite.compositeHitBox && otherSprite.hitBox) {
            result = this.collidingHelper(otherSprite.hitBox, sprite.compositeHitBox, true);
        }
        else if (sprite.compositeHitBox && otherSprite.compositeHitBox) {
            for (let spriteKey of Array.from(sprite.compositeHitBox.hitBoxes.keys())) {
                for (let otherSpriteKey of Array.from(otherSprite.compositeHitBox.hitBoxes.keys())) {
                    if (this.hitBoxColliding(sprite.compositeHitBox.hitBoxes.get(spriteKey), otherSprite.compositeHitBox.hitBoxes.get(otherSpriteKey))) {
                        result = {
                            collisionDetected: true,
                            spriteHitBoxKey: spriteKey,
                            otherSpriteHitBoxKey: otherSpriteKey
                        }
                        break;
                    }
                }
            }
        }
        return result;
    }
    
    static hitBoxColliding = (hitBox: HitBox2D, otherHitBox: HitBox2D): boolean => {
        if (hitBox.anchor.x < otherHitBox.anchor.x + otherHitBox.width &&
            hitBox.anchor.x + hitBox.width > otherHitBox.anchor.x &&
            hitBox.anchor.y < otherHitBox.anchor.y + otherHitBox.height &&
            hitBox.anchor.y + hitBox.height > otherHitBox.anchor.y) { 
            return true;
        }
        return false;
    }
}