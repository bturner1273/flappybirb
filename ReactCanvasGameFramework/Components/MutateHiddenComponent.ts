import CanvasSprite2D from '../CanvasSprite2D';
import CanvasSprite2DComponent from '../CanvasSprite2DComponent';

export class MutateHiddenComponent extends CanvasSprite2DComponent {
    hidden: boolean;
    static key = 'MutateHiddenComponent';
    constructor(initialHiddenState = true) {
        super(MutateHiddenComponent.key);
        this.hidden = initialHiddenState;
    }
    setHidden(hidden: boolean) {
        this.hidden = hidden;
    }
    update(sprite: CanvasSprite2D): void {
        sprite.hidden = this.hidden;
    }
}
