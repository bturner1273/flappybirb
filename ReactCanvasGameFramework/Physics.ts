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

export type SpriteCollisionEvent2D = {
    hitBoxKey?: string;
    otherSpriteHitBoxKey?: string;
    otherSprite: CanvasSprite2D;
}

type InternalSpriteCollisionEvent2D = SpriteCollisionEvent2D & {
    collisionDetected: boolean;
}

export const addPositions = (position: Point2D, offset: Point2D): Point2D => {
    return { x: position.x + offset.x, y: position.y + offset.y };
}

const defaultOffset: Point2D = {x: 0, y: 0};

const G = 0.5;

export default class Physics {
    static gravity = (e: CanvasSprite2D, g?: number): void => {
        if (e.vy === null || typeof e.vy === 'undefined') console.error('[Physics::gravity]: cannot call gravity on I2DCanvasEntity that does not have vy');
        e.position.y += e.vy;
        e.vy += g ?? G;
    }

    private static collidingHelper = (sprite: CanvasSprite2D, otherSprite: CanvasSprite2D, shouldSetHitBoxKey: boolean = false): InternalSpriteCollisionEvent2D => {
        const result: InternalSpriteCollisionEvent2D = {
            collisionDetected: false,
            otherSprite: otherSprite
        };
        for (let key of Array.from(otherSprite.compositeHitBox.keys())) {
            let otherSpriteHitBox = otherSprite.compositeHitBox.get(key);
            if (
                    this.rectangleCollision(
                        addPositions(sprite.position, sprite.hitBox.offset ?? defaultOffset), 
                        sprite.hitBox, 
                        addPositions(otherSprite.position, otherSpriteHitBox.offset ?? defaultOffset), 
                        otherSpriteHitBox
                    )
                ) {
                result.collisionDetected = true;
                if (shouldSetHitBoxKey) { 
                    result.hitBoxKey = key;
                }
                else {
                    result.otherSpriteHitBoxKey = key;
                }
                break;
            }
        }
        return result;
    }

    //not using correct hitbox positions, need to consider offsets lol
    static colliding = (sprite: CanvasSprite2D, otherSprite: CanvasSprite2D): InternalSpriteCollisionEvent2D => {
        let result: InternalSpriteCollisionEvent2D = {
            collisionDetected: false,
            otherSprite: otherSprite
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
                            hitBoxKey: spriteKey,
                            otherSpriteHitBoxKey: otherSpriteKey,
                            otherSprite: otherSprite
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