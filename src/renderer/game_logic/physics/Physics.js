import { Circle } from "../game_objects/GameObjects";
import { Collider, Collision } from "./Colliders";

export class Vector2 {
  x = 0.0;
  y = 0.0;

  constructor(x = 0.0, y = 0.0){

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
    this.simulationSpeed = 1;
    this.impulseModifier = 17*6;
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

  setGravity(g){
    this.gravity = g;
  }

  update(){
    var self = this;
    if(this.lastTimestamp == null){
      this.lastTimestamp = Date.now() - 17;
    }
    this.deltaTime = (Date.now() - this.lastTimestamp) * .001;
    this.detectCollisions();

    this.gameObjects.forEach((go) =>{


      if(go.gravityEnabled){

        self.applyGravity(go);
      }

      if(go.physicsEnabled){
        go.applyForce(self);

        go.physicsUpdate(self);
      }
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

  removeGameObject(o){
    this.gameObjects = this.gameObjects.filter((go) => {
      return go.id != o.id;
    })
  }

  removeGameObjects(objects){
    var ids = objects.map((v) => {
      return v.id;
    })
    this.gameObjects = this.gameObjects.filter((go) => {
      return !ids.includes(go.id);
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

    if(this.gameObjects.length > 1){


      for(var i = 0; i < this.gameObjects.length; i++){
        for(var j = 0; j < this.gameObjects.length; j++){
          if(i != j){
            var gameObject1 = this.gameObjects[i];
            var gameObject2 = this.gameObjects[j];

            if(gameObject1.collisionsEnabled && gameObject2.collisionsEnabled){
              var collision = gameObject1.collide(gameObject2);
              if(collision != null){
                this.collisions.push(collision);
              }
            }
          }
        }
      }
    }

    // this.gameObjects.forEach((go) => {
    //   if(go.collisionsEnabled){
    //     go.detectCollisions(self);
    //   }
    // })
  }

  hasCollisionOccurred(){
    return this.collisions.length > 0;
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

