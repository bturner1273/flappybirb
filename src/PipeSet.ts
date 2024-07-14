import CanvasSprite2D from '../ReactCanvasGameFramework/CanvasSprite2D';
import CanvasSprite2DComponent from '../ReactCanvasGameFramework/CanvasSprite2DComponent';
import { imageLoad } from '../ReactCanvasGameFramework/ImageHelpers';
import { HitBox2D } from '../ReactCanvasGameFramework/Physics';
import Constants from './Constants';
import topPipeImageSrc from '../images/top_pipe.png';
import bottomPipeImageSrc from '../images/bottom_pipe.png';
import CanvasSprite2DBuilder from '../ReactCanvasGameFramework/CanvasSprite2DBuilder';
import MathUtils from '../ReactCanvasGameFramework/MathUtils';

const getRandomPipeHeight = () => MathUtils.getRandomNumber(-40, 65);

class PipePositionResetComponent extends CanvasSprite2DComponent {
    constructor() {
        super('PipePositionResetComponent');
    }
    update(sprite: CanvasSprite2D): void {
        if (sprite.position.x < -400 - Constants.PIPE_WIDTH) {
            sprite.position.x = 400;
            sprite.position.y = getRandomPipeHeight();
        }
    }
}

const x = 400;
const y = getRandomPipeHeight();
const topPipeHitBoxPosition = {
    x: x,
    y: y - Constants.PIPE_Y_OFFSET
};
const goalHitBoxPosition = {
    x: x,
    y: y + 75
};
const bottomPipeHitBoxPosition = {
    x: x,
    y: y + Constants.PIPE_Y_OFFSET
};
const pipeSet = new CanvasSprite2DBuilder()
    .withTag('pipeSet')
    .at({ x: x, y: y })
    .withXVelocity(-3)
    .withCompositeImage([
        {
            image: imageLoad(topPipeImageSrc)[0],
            x: x,
            y: y + Constants.PIPE_Y_OFFSET
        },
        {
            image: imageLoad(bottomPipeImageSrc)[0],
            x: x,
            y: y - Constants.PIPE_Y_OFFSET
        }
    ])
    .withCompositeHitBox(
        new Map<string, HitBox2D>([
            [
                'topPipeHitBox',
                {
                    offset: topPipeHitBoxPosition,
                    height: Constants.PIPE_HEIGHT,
                    width: Constants.PIPE_WIDTH
                }
            ],
            [
                'goalHitBox',
                {
                    offset: goalHitBoxPosition,
                    height: Constants.GOAL_HEIGHT,
                    width: 3
                }
            ],
            [
                'bottomPipeHitBox',
                {
                    offset: bottomPipeHitBoxPosition,
                    height: Constants.PIPE_HEIGHT,
                    width: Constants.PIPE_WIDTH
                }
            ]
        ])
    )
    .addComponent(new PipePositionResetComponent())
    .build();
export default pipeSet;
