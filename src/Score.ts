import CanvasSprite2D from '../ReactCanvasGameFramework/CanvasSprite2D';
import CanvasSprite2DBuilder from '../ReactCanvasGameFramework/CanvasSprite2DBuilder';
import CanvasSprite2DComponent from '../ReactCanvasGameFramework/CanvasSprite2DComponent';
import Constants from './Constants';

export class ScoreTrackingComponent extends CanvasSprite2DComponent {
    score: number;
    static key = 'ScoreTrackingComponent';
    constructor() {
        super(ScoreTrackingComponent.key);
        this.score = 0;
    }
    increment() {
        this.score++;
    }
    update(sprite: CanvasSprite2D): void {
        sprite.textDisplayConfiguration.text = this.score.toString();
    }
}

const scoreTrackingComponent = new ScoreTrackingComponent();
const score = new CanvasSprite2DBuilder()
    .at({ x: 360, y: 25 })
    .withTag(Constants.SCORE_TAG)
    .withZIndex(Constants.SCORE_Z)
    .addComponent(scoreTrackingComponent)
    .withTextDisplayConfiguration({
        text: scoreTrackingComponent.score.toString(),
        font: 'Arial',
        color: 'white',
        fontSize: 24
    })
    .build();
export default score;
