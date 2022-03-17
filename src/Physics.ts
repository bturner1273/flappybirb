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
}

export default class Physics {
    static gravity = (e: I2DCanvasSprite): void => {
        if (e.vy === null || typeof e.vy === 'undefined') console.error('[Physics::gravity]: cannot call gravity on I2DCanvasEntity that does not have vy');
        e.position.y += e.vy;
        e.vy += Constants.G;
    }

    static colliding = (sprite: I2DCanvasSprite, otherSprite: I2DCanvasSprite): boolean => {
        if (sprite.hitBox && otherSprite.hitBox) {
            return this.hitBoxColliding(sprite.hitBox, otherSprite.hitBox);
        }
        return false;
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