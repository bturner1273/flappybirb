import CanvasSprite2D from '../ReactCanvasGameFramework/CanvasSprite2D';
import CanvasSprite2DComponent from '../ReactCanvasGameFramework/CanvasSprite2DComponent';

export class ScoreTrackingComponent extends CanvasSprite2DComponent {
    score: number;
    constructor() {
        super('ScoreTrackingComponent');
        this.score = 0;
    }
    increment() {
        this.score++;
    }
    update(sprite: CanvasSprite2D): void {
        sprite.textDisplayConfiguration.text = this.score.toString();
    }
}

export default class Score extends CanvasSprite2D {
    score: number;
    scoreTrackingComponent: ScoreTrackingComponent;
    constructor() {
        super();
        this.tag = 'score';
        this.position = { x: 360, y: 25 };
        this.scoreTrackingComponent = new ScoreTrackingComponent();
        this.components = [this.scoreTrackingComponent];
        this.textDisplayConfiguration = {
            text: this.scoreTrackingComponent.score.toString(),
            font: 'Arial',
            color: 'white',
            fontSize: 24
        };
    }
}
