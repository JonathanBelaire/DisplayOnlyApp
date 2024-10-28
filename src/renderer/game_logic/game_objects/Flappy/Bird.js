import { CircleCollider } from "../../physics/Colliders";
import { Vector2 } from "../../physics/Physics";
import { Ball, Circle, GameObject } from "../GameObjects";

export class Bird extends Ball{
  jumpSpeed;
  constructor(params) {
    super(params);
    this.color = "#AAAAAA";
    this.strokeColor = "#FFFFFF";
    this.gravityEnabled = true;
    this.jumpSpeed = params.jumpSpeed;
    this.active = true;
    this.bounce = 0.03,
    this.renderPriority = 1,
    this.friction = 1,
    this.radius = 40;
    this.physicsEnabled = true;
    this.lockX = true;
  }

  onJump()
  {
    this.addImpulse(new Vector2(0,  -this.jumpSpeed));
  }

  update(){
    super.update();
  }

}
