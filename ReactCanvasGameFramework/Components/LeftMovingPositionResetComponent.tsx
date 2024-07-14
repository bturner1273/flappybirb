import CanvasSprite2D from '../CanvasSprite2D';
import CanvasSprite2DComponent from '../CanvasSprite2DComponent';

export class LeftMovingPositionResetComponent extends CanvasSprite2DComponent {
    individualImageWidth: number;
    static key = 'LeftMovingPositionResetComponent';
    constructor(individualImageWidth: number) {
        super(LeftMovingPositionResetComponent.key);
        this.individualImageWidth = individualImageWidth;
    }
    update(sprite: CanvasSprite2D): void {
        if (sprite.position.x < -this.individualImageWidth) {
            sprite.position.x = 0;
        }
    }
}
