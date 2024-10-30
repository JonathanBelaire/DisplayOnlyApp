import { Vector2 } from "../../physics/Physics";
import { HelperFunctions } from "../../utility/HelperFunctions";
import { Box, GameObject } from "../GameObjects";

export class FlappyObstacle extends Box{
  constructor(params) {
    super(params);

    this.active = true;
    this.playerPassed = false;
    this.renderPriority = 2;
    this.color = HelperFunctions.getRandomColor();
    this.strokeColor = HelperFunctions.getRandomColor();
    this.ignoreBoundaries = true;
    this.velocity = params.velocity;

  }

  detectCollisions(physicsEngine){
    super.detectCollisions(physicsEngine);
  }



  physicsUpdate(physicsEngine){
    super.physicsUpdate(physicsEngine);

  }


  render(ctx){
    super.render(ctx);
  }
}
