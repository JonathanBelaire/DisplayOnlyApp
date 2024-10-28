import { Collider } from "./Colliders";
import { Vector2 } from "./Physics";

export class PhysicsBody{
  transform = {
    position: new Vector2(),
    rotation: 0.0,
  },
  collider = new Collider();
  gravityEnabled = false,

  parent = null;
  constructor(params){
    this.parent = (typeof params.parent === 'undefined' || params.parent == this) ? null : params.parent;
    this.gravityEnabled = (typeof params.gravityEnabled === 'undefined') ? false : params.gravityEnabled
  }

  setPosition(position){
    this.transform.position = position;
  }

  setRotation(angle){
    this.transform.rotation = angle;
  }

  addForce(vector){
    this.force.add(vector);
  }

  applyGravity(gravity){
    if(this.gravityEnabled){
      this.addForce(new Vector2(0.0, gravity));

    }
  }


}
