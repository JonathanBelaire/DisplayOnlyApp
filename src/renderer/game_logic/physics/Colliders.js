
import { Box } from "../game_objects/GameObjects";
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

  static distanceBetweenColliders(collider1, collider2){
    return collider1.position.distance(collider2.position);;
  }

  static overlapBoxes(gameObject1, gameObject2){
    var collider1, collider2;

    collider1 = gameObject1.collider;
    collider2 = gameObject2.collider;

    var distanceBetweenColliders = Collider.distanceBetweenColliders(collider1, collider2);


    if(distanceBetweenColliders <= (collider1.halfWidth + collider2.halfWidth) || distanceBetweenColliders <= (collider1.halfHeight + collider2.halfHeight))
    {
      var positionA = collider1.position;
      var positionB = collider2.position;

      var direction = positionA.subtract(positionB);

      var midPoint = direction.multiply((0.5));
      return new Collision(gameObject1, gameObject2, midPoint);
    }
    return null;
  }

  static overlapCircles(gameObject1, gameObject2){

    var collider1, collider2;

    collider1 = gameObject1.collider;
    collider2 = gameObject2.collider;

    var distanceBetweenColliders = Collider.distanceBetweenColliders(collider1, collider2);

    if(distanceBetweenColliders <= (collider1.radius + collider2.radius)){
      var positionA = collider1.position;
      var positionB = collider2.position;

      var direction = positionA.subtract(positionB);

      var midPoint = direction.multiply(collider1.radius/(distanceBetweenColliders))

      return new Collision(gameObject1, gameObject2, midPoint);

    }

    return null;
  }

  static overlapBoxAndCircle(gameObject1, gameObject2){

    var boxCollider, circleCollider;

    var box, circle;
    if(gameObject1 instanceof Box){
      box = gameObject1;
      circle = gameObject2;
    }
    else{
      box = gameObject2;
      circle = gameObject1;
    }






    boxCollider = box.collider;
    circleCollider = circle.collider;

    var distanceBetweenColliders = Collider.distanceBetweenColliders(boxCollider, circleCollider);



    var boxPos = box.getPosition();
    var circlePos = circle.getPosition();

    var xDistance = Math.abs(boxPos.x - circlePos.x);
    var yDistance = Math.abs(boxPos.y - circlePos.y);


    if(xDistance <= (boxCollider.halfWidth + circleCollider.radius) && yDistance <= (boxCollider.halfHeight + circleCollider.radius) && distanceBetweenColliders <= (circleCollider.radius + boxCollider.diagnal)){
      var positionA = boxCollider.position;
      var positionB = circleCollider.position;

      var direction = positionA.subtract(positionB);

      var midPoint = direction.multiply((0.5));
      return new Collision(gameObject1, gameObject2, midPoint);
    }
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
    this.halfWidth = width*0.5;
    this.halfHeight = height*0.5;
    this.diagnal = Math.sqrt(Math.pow(this.halfHeight, 2), Math.pow(this.halfWidth,2));
    this.updatePosition(gameObject.getPosition());

  }

  updatePosition(position){
    super.updatePosition(position);
    this.boundary = {
      topLeft: new Vector2(position.x - this.halfWidth, position.y - this.halfHeight),
      bottomLeft: new Vector2(position.x - this.halfWidth, position.y + this.halfHeight),
      topRight: new Vector2(position.x + this.halfWidth, position.y - this.halfHeight),
      bottomRight: new Vector2(position.x + this.halfWidth, position.y + this.halfHeight),
    }

  }

  overlap(gameObject){
    super.overlap(gameObject);
    var collision = null;

    var collider = gameObject.collider;

    var colliderPosition = gameObject.transform.position;
    var distanceBetweenColliders = this.position.distance(colliderPosition);


    if(collision == null){

      if(collider instanceof BoxCollider){
        collision = Collider.overlapBoxes(this.gameObject, gameObject);
      }
      else if(collider instanceof CircleCollider){
        collision = Collider.overlapBoxAndCircle(this.gameObject, gameObject);
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


    if(collider instanceof BoxCollider){
      collision = Collider.overlapBoxAndCircle(this.gameObject, gameObject);
    }
    else if(collider instanceof CircleCollider){

     collision = Collider.overlapCircles(this.gameObject, gameObject);
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
