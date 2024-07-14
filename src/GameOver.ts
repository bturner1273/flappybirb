import gameOverSrc from '../images/game_over.png';
import CanvasSprite2D from '../ReactCanvasGameFramework/CanvasSprite2D';
import CanvasSprite2DBuilder from '../ReactCanvasGameFramework/CanvasSprite2DBuilder';
import CanvasSprite2DComponent from '../ReactCanvasGameFramework/CanvasSprite2DComponent';
import { MutateHiddenComponent } from '../ReactCanvasGameFramework/Components/MutateHiddenComponent';
import { imageLoad } from '../ReactCanvasGameFramework/ImageHelpers';

export class StopGameLoopOnShowComponent extends CanvasSprite2DComponent {
    constructor() {
        super('StopGameLoopOnShowComponent');
    }
    update(sprite: CanvasSprite2D): void {
        if (sprite.showing) {
            sprite.gameContext?.stopGameLoop();
        }
    }
}

const gameOverImage = imageLoad(gameOverSrc)[0];
const gameOver = new CanvasSprite2DBuilder()
    .at({ x: 200 - gameOverImage.width / 2, y: 200 - gameOverImage.height / 2 })
    .withTag('gameOver')
    .withZIndex(3)
    .withImage(gameOverImage)
    .addComponent(new MutateHiddenComponent())
    .addComponent(new StopGameLoopOnShowComponent())
    .build();
export default gameOver;
