import gameOverSrc from '../images/game_over.png';
import CanvasSprite2D from '../ReactCanvasGameFramework/CanvasSprite2D';
import CanvasSprite2DBuilder from '../ReactCanvasGameFramework/CanvasSprite2DBuilder';
import CanvasSprite2DComponent from '../ReactCanvasGameFramework/CanvasSprite2DComponent';
import { MutateHiddenComponent } from '../ReactCanvasGameFramework/Components/MutateHiddenComponent';
import { loadImage } from '../ReactCanvasGameFramework/ImageHelpers';
import Constants from './Constants';

export class StopGameLoopOnShowComponent extends CanvasSprite2DComponent {
    static key = 'StopGameLoopOnShowComponent';
    constructor() {
        super(StopGameLoopOnShowComponent.key);
    }
    update(sprite: CanvasSprite2D): void {
        if (sprite.showing) {
            sprite.gameContext?.stopGameLoop();
        }
    }
}

export default async function getGameOver() {
    const image = await loadImage(gameOverSrc);
    return new CanvasSprite2DBuilder()
        .at({
            x: Constants.CANVAS_WIDTH / 2 - image.width / 2,
            y: Constants.CANVAS_HEIGHT / 2 - image.height / 2
        })
        .withTag(Constants.GAME_OVER_TAG)
        .withZIndex(Constants.GAME_OVER_Z)
        .withImage(image)
        .addComponent(new MutateHiddenComponent())
        .addComponent(new StopGameLoopOnShowComponent())
        .build();
}
