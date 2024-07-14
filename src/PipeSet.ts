import CanvasSprite2D from '../ReactCanvasGameFramework/CanvasSprite2D';
import CanvasSprite2DComponent from '../ReactCanvasGameFramework/CanvasSprite2DComponent';
import { loadImages } from '../ReactCanvasGameFramework/ImageHelpers';
import { HitBox2D } from '../ReactCanvasGameFramework/Physics';
import Constants from './Constants';
import topPipeImageSrc from '../images/top_pipe.png';
import bottomPipeImageSrc from '../images/bottom_pipe.png';
import CanvasSprite2DBuilder from '../ReactCanvasGameFramework/CanvasSprite2DBuilder';
import MathUtils from '../ReactCanvasGameFramework/MathUtils';

const getRandomPipeHeight = () => MathUtils.getRandomNumber(-35, 75);
class PipePositionResetComponent extends CanvasSprite2DComponent {
    static key = 'PipePositionResetComponent';
    constructor() {
        super(PipePositionResetComponent.key);
    }
    update(sprite: CanvasSprite2D): void {
        if (
            sprite.position.x <
            -Constants.CANVAS_WIDTH - Constants.PIPE_WIDTH
        ) {
            sprite.position.x = Constants.CANVAS_WIDTH;
            sprite.position.y = getRandomPipeHeight();
        }
    }
}

const x = Constants.CANVAS_WIDTH;
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

export default async function getPipeSet() {
    const [topPipeImage, bottomPipeImage] = await loadImages(
        topPipeImageSrc,
        bottomPipeImageSrc
    );
    return new CanvasSprite2DBuilder()
        .at({ x, y })
        .withTag(Constants.PIPE_TAG)
        .withZIndex(Constants.PIPE_Z)
        .withXVelocity(Constants.PIPE_VELOCITY_X)
        .withCompositeImage([
            {
                image: topPipeImage,
                x: x,
                y: y + Constants.PIPE_Y_OFFSET
            },
            {
                image: bottomPipeImage,
                x: x,
                y: y - Constants.PIPE_Y_OFFSET
            }
        ])
        .withCompositeHitBox(
            new Map<string, HitBox2D>([
                [
                    Constants.TOP_PIPE_HITBOX_KEY,
                    {
                        offset: topPipeHitBoxPosition,
                        height: Constants.PIPE_HEIGHT,
                        width: Constants.PIPE_WIDTH
                    }
                ],
                [
                    Constants.GOAL_HITBOX_KEY,
                    {
                        offset: goalHitBoxPosition,
                        height: Constants.GOAL_HEIGHT,
                        width: 3
                    }
                ],
                [
                    Constants.BOTTOM_PIPE_HITBOX_KEY,
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
}
