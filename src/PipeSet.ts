import Constants from "./Constants";
import topPipeImageSrc from "../images/top_pipe.png";
import bottomPipeImageSrc from "../images/bottom_pipe.png";
import I2DCanvasSprite from "./I2DCanvasSprite";
import { HitBox2D, Point2D } from "./Physics";

export default class PipeSet implements I2DCanvasSprite {
    readonly canvas: HTMLCanvasElement;
    readonly context: CanvasRenderingContext2D;
    position: Point2D;
    hitBoxPosition: Point2D;
    vx: number;
    hitBox: HitBox2D;
    private readonly topPipeImage: HTMLImageElement; 
    private readonly bottomPipeImage: HTMLImageElement;

    constructor(canvas: HTMLCanvasElement, y: number) {
        this.canvas = canvas;
        this.context =  canvas.getContext('2d');
        this.position = {
            x: 200,
            y: y
        };
        this.vx = /*Constants.PIPE_SPEED*/0;
        this.topPipeImage = new Image();
        this.topPipeImage.src = topPipeImageSrc;
        this.bottomPipeImage = new Image();
        this.bottomPipeImage.src = bottomPipeImageSrc;
        this.hitBoxPosition = {
            x: this.position.x,
            y: this.position.y + 75
        };
        this.hitBox = {
            anchor: this.hitBoxPosition,
            height: 115,
            width: this.topPipeImage.width
        }
    }
    
    update = () => {
        this.position.x -= this.vx;
        this.hitBoxPosition.x -= this.vx;
    }

    draw = () => {
        this.context.drawImage(this.topPipeImage, this.position.x, this.position.y + 190);
        this.context.drawImage(this.bottomPipeImage, this.position.x, this.position.y - 190);
    }
}