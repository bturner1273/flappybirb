import Constants from "./Constants";
import topPipeImageSrc from "../images/top_pipe.png";
import bottomPipeImageSrc from "../images/bottom_pipe.png";
import I2DCanvasSprite from "./I2DCanvasSprite";
import { CompositeHitBox2D, HitBox2D, Point2D } from "./Physics";

export default class PipeSet implements I2DCanvasSprite {
    readonly canvas: HTMLCanvasElement;
    readonly context: CanvasRenderingContext2D;
    position: Point2D;
    topPipeHitBoxPosition: Point2D;
    goalHitBoxPosition: Point2D;
    bottomPipeHitBoxPosition: Point2D;
    vx: number;
    compositeHitBox: CompositeHitBox2D;
    private readonly topPipeImage: HTMLImageElement; 
    private readonly bottomPipeImage: HTMLImageElement;

    constructor(canvas: HTMLCanvasElement, y: number) {
        this.canvas = canvas;
        this.context =  canvas.getContext('2d');
        this.position = {
            x: canvas.width + 50,
            y: y
        };
        this.vx = Constants.PIPE_SPEED;
        this.topPipeImage = new Image();
        this.topPipeImage.src = topPipeImageSrc;
        this.bottomPipeImage = new Image();
        this.bottomPipeImage.src = bottomPipeImageSrc;


        this.topPipeHitBoxPosition = {
            x: this.position.x,
            y: this.position.y - Constants.PIPE_Y_OFFSET
        };
        this.goalHitBoxPosition = {
            x: this.position.x,
            y: this.position.y + 75
        };
        this.bottomPipeHitBoxPosition = {
            x: this.position.x,
            y: this.position.y + Constants.PIPE_Y_OFFSET
        }


        this.compositeHitBox = {
            hitBoxes: new Map([
                ['topPipeHitBox', {
                    anchor: this.topPipeHitBoxPosition,
                    height: Constants.PIPE_HEIGHT,
                    width: Constants.PIPE_SPEED,
                    drawColor: 'blue'
                }],
                ['goalHitBox', {
                    anchor: this.goalHitBoxPosition,
                    height: (this.position.y + Constants.PIPE_Y_OFFSET) - (this.position.y - Constants.PIPE_Y_OFFSET),
                    width: Constants.PIPE_SPEED
                }],
                ['bottomPipeHitBox', {
                    anchor: this.bottomPipeHitBoxPosition,
                    height: Constants.PIPE_HEIGHT,
                    width: Constants.PIPE_SPEED,
                    drawColor: 'black'
                }]
            ])
        }

    }
    
    update = () => {
        this.position.x -= this.vx;
        this.topPipeHitBoxPosition.x -= this.vx;
        this.goalHitBoxPosition.x -= this.vx;
        this.bottomPipeHitBoxPosition.x -= this.vx;
    }

    draw = () => {
        this.context.drawImage(this.topPipeImage, this.position.x, this.position.y + Constants.PIPE_Y_OFFSET);
        this.context.drawImage(this.bottomPipeImage, this.position.x, this.position.y - Constants.PIPE_Y_OFFSET);
    }
}