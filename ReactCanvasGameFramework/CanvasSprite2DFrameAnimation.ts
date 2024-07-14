import IUpdateEveryFrame from './IUpdateEveryFrame';

interface IFrameAnimation {
    images: Array<CanvasImageSource>;
    duration: number;
}

interface IConditionalFrameAnimation extends IFrameAnimation {
    isActiveAnimation: () => boolean;
}

export default class CanvasSprite2DFrameAnimation implements IUpdateEveryFrame {
    animations: Array<IConditionalFrameAnimation>;
    animationIntervalMs: number;
    previousAnimationUpdateMs: number;
    currentAnimationFrameIndex: number;

    activeFrameAnimationCondition: IConditionalFrameAnimation;
    previousActiveFrameAnimationCondition: IConditionalFrameAnimation;

    constructor(animations: Array<IConditionalFrameAnimation>) {
        this.animations = animations;
        this.currentAnimationFrameIndex = 0;
        this.previousAnimationUpdateMs = Date.now();
        this.activeFrameAnimationCondition = null;
    }

    update = () => {
        for (let animationCondition of this.animations) {
            if (
                animationCondition.isActiveAnimation() &&
                animationCondition !==
                    this.previousActiveFrameAnimationCondition
            ) {
                this.animationIntervalMs =
                    animationCondition.duration /
                    animationCondition.images.length;
                this.currentAnimationFrameIndex = 0;
                this.previousActiveFrameAnimationCondition =
                    this.activeFrameAnimationCondition;
                this.activeFrameAnimationCondition = animationCondition;
                break;
            }
        }

        if (
            Date.now() - this.previousAnimationUpdateMs >=
            this.animationIntervalMs
        ) {
            this.currentAnimationFrameIndex =
                this.currentAnimationFrameIndex <
                this.activeFrameAnimationCondition.images.length - 1
                    ? this.currentAnimationFrameIndex + 1
                    : 0;
            this.previousAnimationUpdateMs = Date.now();
        }
    };

    getView = (): CanvasImageSource =>
        this.activeFrameAnimationCondition.images[
            this.currentAnimationFrameIndex
        ];
}
