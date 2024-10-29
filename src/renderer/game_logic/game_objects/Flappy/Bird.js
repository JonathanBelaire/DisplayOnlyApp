import { CircleCollider } from "../../physics/Colliders";
import { Vector2 } from "../../physics/Physics";
import { Ball, Circle, GameObject } from "../GameObjects";

export class Bird extends Ball{
  jumpSpeed;
  constructor(params) {
    super(params);
    this.color = "#AAAAAA";
    this.strokeColor = "#FFFFFF";

    this.jumpSpeed = params.jumpSpeed;
    this.active = true;
    this.bounce = 0.9,
    this.renderPriority = 1,
    this.friction = 1,
    this.lockX = true;
  }

  onJump()
  {
    var newVel = new Vector2();

    this.addVelocityChange(new Vector2(0,  -this.velocity.y - this.jumpSpeed));
  }

  update(){
    super.update();
  }

}
