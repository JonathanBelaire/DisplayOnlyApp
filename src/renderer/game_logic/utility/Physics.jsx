import { Circle } from "../game_objects/GameObjects";

export class Vector2 {
  constructor(x, y){

    this.x = x;
    this.y = y;
  }

  static zero = new Vector2(0,0);

  multiply(value){
    return new Vector2(this.x * value, this.y * value);
  }

  substract(vector){
    return new Vector2(this.x - vector.x, this.y - vector.y)
  }

  multiplyVector(vector){

    return new Vector2(this.x * vector.x, this.y * vector.y);
  }

  dotProduct(vector){
    return (this.x * vector.x) + (this.y * vector.y);
  }

  crossProduct(vector){
    var magA = this.magnitude();
    var magB = vector.magnitude();

    var angle = Math.acos(this.dotProduct(vector)/(this.magnitude() * vector.magnitude));

    return magA * magB * Math.sin(angle);
  }

  distance(vector){
    return Math.sqrt(Math.pow((this.x - vector.x), 2)+ Math.pow((this.y - vector.y),2));
  }

  subtract(vector){
    return this.add(new Vector2(-vector.x, -vector.y));
  }


  add(vector){
    return new Vector2(this.x + vector.x, this.y + vector.y);
  }

  magnitude(){
    return Math.sqrt(Math.pow((this.x), 2)+ Math.pow((this.y),2));
  }

  unit(){
    var result = new Vector2(this.x/this.magnitude(), this.y/this.magnitude());

    return result;
  }
}

export class PhysicsEngine {
  constructor(props){
    this.gameObjects = [];
    this.boundary = {
      top: 0.0,
      bottom: props.height,
      right: props.width,
      left: 0.0
    };
    this.deltaTime = null;
    this.collisions = [];
    this.gravity = 90;
    this.simulationSpeed = 8;
    this.raycastCircle = new Circle(
      {
        color: "black",
        strokeColor: "black",
        position: new Vector2(0,0),
        radius: 1
      }
    );
    this.raycastCircle.active = false;
    this.bounceThreshold = 0.01;

  }

  update(){
    var self = this;
    if(this.lastTimestamp == null){
      this.lastTimestamp = Date.now() - 17;
    }
    this.deltaTime = (Date.now() - this.lastTimestamp) * .001;
    this.detectCollisions();

    this.gameObjects.forEach((go) =>{
      self.applyGravity(go);

      go.physicsUpdate(self);
    });

    this.lastTimestamp = Date.now();
  }

  applyGravity(obj){
    if(obj.gravityEnabled){
      obj.addForce(new Vector2(0, this.gravity));
    }
  }

  addGameObject(obj){
    this.gameObjects.push(obj);
  }

  addGameObjects(objs = []){
    objs.forEach((o) => {
      this.gameObjects.push(o);
    })
  }

  raycast(vector){
    this.raycastCircle.setPosition(vector);
    var objects = []
    this.gameObjects.forEach((go) => {
      if(go.collide(this.raycastCircle) ){
        objects.push(go);
        go.onInput();
      }
    });

    return objects;
  }


  detectCollisions(){
    var self = this;
    this.collisions = [];
    var i = 0;
    var j = 1;

    for(var i = 0; i < this.gameObjects.length; i++){
      for(var j = 0; j < this.gameObjects.length; j++){
        if(i != j){
          var gameObject1 = this.gameObjects[i];
          var gameObject2 = this.gameObjects[j];

          var collision = gameObject1.collide(gameObject2);
          if(collision != null){
            this.collisions.push(collision);
          }
        }
      }
    }
    this.gameObjects.forEach((go) => {
      go.detectCollisions(self);
    })
  }

  getCollisionsForGameObject(gameObject){
    var collidingObjects = []
    this.collisions.forEach((c) => {
      if(c.gameObject1.id == gameObject.id ){
        collidingObjects.push(c);
      }
    });

    return collidingObjects;
  }

}

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
