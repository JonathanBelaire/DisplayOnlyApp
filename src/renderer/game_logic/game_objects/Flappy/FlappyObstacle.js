import { Vector2 } from "../../physics/Physics";
import { HelperFunctions } from "../../utility/HelperFunctions";
import { Box, GameObject } from "../GameObjects";

export class FlappyObstacle extends Box{
  constructor(params) {
    super(params);

    this.width = params.width;
    this.canvasWidth = params.canvasWidth;
    this.canvasHeight = params.canvasHeight;
    this.verticalSpacing = params.verticalSpacing;
    this.gravityEnabled = false;
    this.physicsEnabled = true;
    this.active = true;
    this.renderPriority = 1;
    this.color = HelperFunctions.getRandomColor();
    this.strokeColor = HelperFunctions.getRandomColor();
    this.ignoreBoundaries = true;
    this.velocity = params.velocity;


    this.lockY = true;

  }

  detectCollisions(physicsEngine){

  }

  physicsUpdate(physicsEngine){
    super.physicsUpdate(physicsEngine);
    console.log(this.velocity);
  }

  render(ctx){
    super.render(ctx);
    var centerPosition = this.getPosition();
    var xPos = centerPosition.x - (this.width* 0.5);

    var offset =  (this.verticalSpacing * 0.5);


    var height1 = centerPosition.y - offset;
    var height2 = this.canvasHeight - centerPosition.y - offset;

    var topLeft1 = new Vector2(xPos, 0);
    var topLeft2 = new Vector2(xPos, centerPosition.y + offset);

    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.strokeColor;


    ctx.strokeRect(topLeft1.x, topLeft1.y, this.width, height1);
    ctx.strokeRect(topLeft2.x, topLeft2.y, this.width, height2);
    ctx.fillRect(topLeft1.x, topLeft1.y, this.width, height1);
    ctx.fillRect(topLeft2.x, topLeft2.y, this.width, height2);

  }
}
