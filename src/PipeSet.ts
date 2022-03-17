import Constants from "./Constants";
import topPipeImageSrc from "../images/top_pipe.png";
import bottomPipeImageSrc from "../images/bottom_pipe.png";
import I2DCanvasSprite from "./I2DCanvasSprite";
import { HitBox2D, Point2D } from "./Physics";

export default class PipeSet implements I2DCanvasSprite {
    readonly canvas: HTMLCanvasElement;
    readonly context: CanvasRenderingContext2D;
    position: Point2D;
    vx: number;
    hitBox: HitBox2D;
    private readonly topPipeImage: HTMLImageElement; 
    private readonly bottomPipeImage: HTMLImageElement;

    constructor(canvas: HTMLCanvasElement, y: number) {
        this.canvas = canvas;
        this.context =  canvas.getContext('2d');
        this.position = {
            x: 450,
            y: y
        };
        this.vx = Constants.PIPE_SPEED
        this.topPipeImage = new Image();
        this.topPipeImage.src = topPipeImageSrc;
        this.bottomPipeImage = new Image();
        this.bottomPipeImage.src = bottomPipeImageSrc;
        this.hitBox = {
            anchor: {x: this.position.x, y: 200},
            height: 380,
            width: 300
        }
    }
    
    update = () => {
        this.position.x -= this.vx;
    }

    draw = () => {
        this.context.drawImage(this.topPipeImage, this.position.x, this.position.y + 190);
        this.context.drawImage(this.bottomPipeImage, this.position.x, this.position.y - 190);
    }
}