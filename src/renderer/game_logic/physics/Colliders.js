
import { Vector2 } from "./Physics";
export class Collider{
  constructor(gameObject){
    this.gameObject = gameObject;
    this.position = gameObject.transform.position;
    this.rotation = gameObject.transform.rotation;
  }

  overlap(col){
    return null;
  }

  updatePosition(position){
    this.position = new Vector2(position.x, position.y);
  }
}

export class BoxCollider extends Collider{
  constructor(gameObject, width, height){
    super(gameObject);
    this.width = width;
    this.height = height;
    this.halfWidth = width/2.0;
    this.updatePosition(gameObject.getPosition());

  }

  updatePosition(position){
    super.updatePosition(position);
    this.boundary = {
      topLeft: new Vector2(position.x - this.halfWidth, position.y - this.halfWidth),
      bottomLeft: new Vector2(position.x - this.halfWidth, position.y + this.halfWidth),
      topRight: new Vector2(position.x + this.halfWidth, position.y - this.halfWidth),
      bottomRight: new Vector2(position.x + this.halfWidth, position.y + this.halfWidth),
    }
  }

  overlap(collider){
    super.overlap(collider);
    var collision = null;
    if(collision == null){
      var colliderType = typeof(collider);
      if(colliderType == "BoxCollider"){

      }
      else if(colliderType == "CircleCollider"){

      }
    }
    return collision;
  }



}

export class CapsuleCollider extends Collider
{
  bottomCollider = null;
  topCollider = null;
  middleCollider = null;
  constructor(gameObject, length, width){
    this.bottomCollider = new CircleCollider(gameObject, width * 0.5);
    this.topCollider = new CircleCollider(gameObject, width * 0.5);
    this.middleCollider = new BoxCollider(gameObject, width, length - width );

  }
}
export class CircleCollider extends Collider{
  constructor(gameObject, radius){
    super(gameObject);
    this.radius = radius;
  }

  overlap(gameObject){
    var collider = gameObject.getCollider();
    var collision = null;
    var colliderType = typeof(collider);

    //var colliderBoundary = gameObject;

    var colliderRadius = gameObject.radius;
    var colliderPosition = gameObject.transform.position;

    //TODO add checks for geometry type

    var distanceBetweenColliders = this.position.distance(colliderPosition);
    if(distanceBetweenColliders <= (colliderRadius + this.radius)){
      var positionA = this.position;
      var positionB = collider.position;

      var direction = positionA.subtract(positionB);

      var midPoint = direction.multiply(this.radius/(distanceBetweenColliders))

      collision = new Collision(this.gameObject, collider.gameObject, midPoint);
    }
    return collision;

  }

  updatePosition(position){
    super.updatePosition(position);
  }


}

export class Collision{
  constructor(gameObject1, gameObject2, midPoint){
    this.gameObject1 = gameObject1;
    this.gameObject2 = gameObject2;
    this.midPoint = midPoint;
    this.right = gameObject1.transform.position.x < gameObject2.transform.position.x;
    this.left = gameObject1.transform.position.x > gameObject2.transform.position.x;
    this.top = gameObject1.transform.position.y > gameObject2.transform.position.y;
    this.bottom = gameObject1.transform.position.y < gameObject2.transform.position.y;
  }

}
