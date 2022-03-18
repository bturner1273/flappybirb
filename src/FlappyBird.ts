import flappy1ImageSrc from '../images/flappy_1.png';
import flappy2ImageSrc from '../images/flappy_2.png';
import flappy3ImageSrc from '../images/flappy_3.png';
import Constants from './Constants';
import CanvasSprite2D from './CanvasSprite2D';
import MathUtils from './MathUtils';
import Physics, { HitBox2D, Point2D } from './Physics';

/*export default class FlappyBird implements CanvasSprite2D {
    readonly canvas: HTMLCanvasElement;
    readonly context: CanvasRenderingContext2D;
    position: Point2D;
    vy: number;
    hitBox: HitBox2D;
    hitBoxPosition: Point2D;
    private previousAnimationUpdate: number;
    private readonly flapAnimationIntervalMs = 50;
    private readonly flapAnimationFrames: Array<HTMLImageElement>;
    private currentAnimationFrameIndex: number;
    hasGravity: boolean = true;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        
        this.position = {
            x: canvas.width / 5, 
            y: canvas.height / 2
        };
        this.vy = 0; 

        let flappy1Image = new Image();
        flappy1Image.src = flappy1ImageSrc;
        let flappy2Image = new Image();
        flappy2Image.src = flappy2ImageSrc;
        let flappy3Image = new Image();
        flappy3Image.src = flappy3ImageSrc;
        this.flapAnimationFrames = [flappy1Image, flappy2Image, flappy3Image];
        this.currentAnimationFrameIndex = 0;
        this.previousAnimationUpdate = Date.now();
        
        this.hitBoxPosition = {
            x: this.position.x + Constants.FLAPPY_WIDTH - Constants.PIPE_SPEED,
            y: this.position.y
        }
        this.hitBox = {
            offset: this.hitBoxPosition,
            height: Constants.FLAPPY_HEIGHT,
            width: 3
        }

        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                this.vy = Constants.FLAP_FORCE;
            }
        });
    }

    update = () => {
        Physics.gravity(this);
        this.hitBoxPosition.y = this.position.y;

        //handle animation
        if (
            Date.now() - this.previousAnimationUpdate >
            this.flapAnimationIntervalMs
        ) {
            this.currentAnimationFrameIndex = 
                this.currentAnimationFrameIndex <
                this.flapAnimationFrames.length - 1
                    ? this.currentAnimationFrameIndex + 1
                    : 0;
            this.previousAnimationUpdate = Date.now();
        }
    };

    draw = () => {
        this.context.save();
        this.context.translate(this.position.x, this.position.y);
        this.context.rotate(-MathUtils.rangeMap(this.vy, Constants.FLAP_FORCE, 20, 60, -60)*Math.PI/180.0);
        this.context.translate(-this.position.x, -this.position.y);
        this.context.drawImage(
            this.flapAnimationFrames[this.currentAnimationFrameIndex], 
            this.position.x,
            this.position.y
        );
        this.context.restore();
    }
}*/