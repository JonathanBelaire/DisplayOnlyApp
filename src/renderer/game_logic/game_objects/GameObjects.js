import { EventListener } from "../events/EventListener";
import { StateMachine, GameStates, StateEnum, States } from "../states/States";
import { PhysicsEngine, Vector2 } from "../physics/Physics";
import { Collider, CircleCollider, BoxCollider } from "../physics/Colliders";

export class GameObject{

  onInput = () => {};

  mass = 1;
  appliedForce = new Vector2();
  appliedImpulse = new Vector2();
  active = true;
  renderPriority;
  bounce = 0.9;
  drag;
  img;
  color;
  strokeColor;
  velocity = new Vector2(0,0);
  physicsEnabled = true;
  transform = {
    position: new Vector2(0, 0),
    rotation: 0,
    size: new Vector2(1, 1)
  };

  lockX = false;
  lockY = false;


  collider;
  stateMachine;
  gravityEnabled = true;

  inputListener;
  velocityChange = new Vector2(0,0);
  ignoreBoundaries = false;
  collisionsEnabled = true;

  constructor(props){
    var self = this;
    this.id = Math.random().toString(16).slice(2);
    this.renderPriority = props.renderPriority;
    this.bounce = props.bounce;
    this.img = props.img;

    this.physicsEnabled = props.physicsEnabled;
    this.collisionsEnabled = props.collisionsEnabled;
    this.gravityEnabled = props.gravityEnabled;

    this.drag = 0.6;
    this.color = props.color;
    this.strokeColor = props.strokeColor;
    this.velocity = new Vector2(Math.random()*10 - 5, Math.random()*10 - 5);
    this.transform = {
      position: new Vector2(props.position.x, props.position.y),
      rotation: props.rotation,
      size: props.size ? props.size : new Vector2(1, 1)
    };
    this.deltaTime = 0;

    this.collider = new Collider(this);
    this.stateMachine = new StateMachine({
      gameObject :self,
      startingState : props.startingState
    });

  }

  addImpulse(vector){
    this.appliedImpulse = this.appliedImpulse.add(vector);
  }

  addForce(vector){
    if(this.appliedForce == null){
      this.appliedForce = Vector2.zero.multiply(1);
    }
    this.appliedForce = this.appliedForce.add(vector);
  }



  applyForce(physicsEngine){
    let vX = this.velocity.x;
    let vY = this.velocity.y;

    vX = vX + this.appliedForce.x * physicsEngine.deltaTime + this.appliedImpulse.x * physicsEngine.deltaTime * physicsEngine.impulseModifier;
    vY = vY + this.appliedForce.y * physicsEngine.deltaTime + this.appliedImpulse.y * physicsEngine.deltaTime * physicsEngine.impulseModifier;

    this.velocity = new Vector2(vX, vY);
    this.velocity = this.velocity.add(this.velocityChange);

    this.appliedForce = new Vector2();
    this.appliedImpulse = new Vector2();
    this.velocityChange = new Vector2();
  }



  getPosition(){
    return this.transform.position;
  }

  setPosition(position){
    this.transform.position = position;
    this.collider.updatePosition(this.transform.position);
  }

  setInputListener(func){
    var self = this;
    this.onInput = () => {
      func(self);
    }
  }
  onCollision(physicsEngine, collisions){

  }

  detectCollisions(physicsEngine){
    var self = this;
    var collisions = physicsEngine.getCollisionsForGameObject(this);

    if(collisions.length > 0){
      collisions.forEach((co) => {
        var directionX = (this.transform.position.x - co.gameObject2.transform.position.x);
        var directionY = (this.transform.position.y - co.gameObject2.transform.position.y);

        var velocityA = this.velocity;
        var velocityB = co.gameObject2.velocity;

        var relativeVelocity = velocityB.subtract(velocityA);

        var midPoint = co.midPoint;
        var unitVelocity = relativeVelocity.unit();

        var massFactor =  (co.gameObject2.mass/(this.mass +co.gameObject2.mass));
        var bounceVelocity = midPoint.unit().multiply( this.velocity.magnitude() * massFactor );

        this.addVelocityChange(bounceVelocity);
      });
    }
    return collisions;
  }

  addDrag(){
    var dragVector = (new Vector2(-this.velocity.x, -this.velocity.y)).unit();

    this.addForce(dragVector.multiply(this.drag));
  }

  addVelocityChange(vector){
    this.velocityChange = this.velocityChange.add(vector);
  }


  physicsUpdate(physicsEngine){
    //this.applyForce(physicsEngine);
    if(!this.ignoreBoundaries){

      this.checkForBoundaries(physicsEngine);
    }

    var positionX, positionY;
    if(this.lockX){
      positionX = this.getPosition().x;
    }else{
      positionX = this.transform.position.x + (this.velocity.x * physicsEngine.simulationSpeed * physicsEngine.deltaTime);
    }

    if(this.lockY){
      positionY = this.getPosition().y;
    }
    else{
      positionY = this.transform.position.y + (this.velocity.y * physicsEngine.simulationSpeed * physicsEngine.deltaTime);

    }


    this.setPosition( new Vector2 (positionX, positionY));



  }

  checkForBoundaries(physicsEngine){
    if((this.transform.position.x > physicsEngine.boundary.right && this.velocity.x > 0) || (this.transform.position.x < physicsEngine.boundary.left && this.velocity.x < 0 )){
      //this.velocity.x = -this.velocity.x;
      this.addVelocityChange(new Vector2(-this.velocity.x * this.bounce, 0));

    }


    if(this.transform.position.y >= physicsEngine.boundary.bottom && this.velocity.y > 0){
      //this.velocity.y = -this.velocity.y;
      this.addVelocityChange(new Vector2(0, -this.velocity.y * this.bounce));
    }

  }

  collide(gameObject){
    //detect if param go collides with this and return collision object with reference to both objects
    return this.collider.overlap(gameObject);
  }

  getCollider(){
    return this.collider;
  }

  update(){
    //this.stateMachine.update();
  }

  render(ctx){
    // if(this.active){
    //   ctx.fillRect(this.transform.position.x, this.transform.position.y, this.size.x, this.size.y);
    // }

  }
}

export class Circle extends GameObject{
  constructor(props){
    super(props);
    this.radius = props.radius;
    this.collider = new CircleCollider(this, this.radius);
    this.mass = this.radius;
    // this.stateMachine = new StateMachine({
    //   gameObject: this,
    //   startingState: States.getState(StateEnum.Alive)
    // })
  }

  physicsUpdate(physicsEngine){
    super.physicsUpdate(physicsEngine);
  }

  setRadius(radius){
    this.collider.radius = radius;
    this.radius = radius;

  }

  update(){
    super.update();
  }
  getCollider(){
    return super.getCollider();
  }

  checkForBoundaries(physicsEngine){
    if(this.transform.position.x + this.radius > physicsEngine.boundary.right && this.velocity.x > 0 ){
      this.velocity.x = -this.velocity.x;

    }
    if(this.transform.position.x - this.radius < physicsEngine.boundary.left && this.velocity.x < 0){
      this.velocity.x = -this.velocity.x;
    }

    if(this.transform.position.y + this.radius >= physicsEngine.boundary.bottom && this.velocity.y > 0){
      this.velocity.y = -this.velocity.y;
    }

  }

  render(ctx){
    super.render(ctx);
    if(this.active){

      ctx.beginPath();

      ctx.fillStyle = this.color;
      ctx.strokeStyle = this.strokeColor;
      ctx.arc(this.transform.position.x, this.transform.position.y, this.radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
    }
  }
}

export class Box extends GameObject{
  constructor(params) {
    super(params);
    this.collider = new BoxCollider(this, params.width, params.height);
    this.width = params.width;
    this.height = params.height;
  }

  render(ctx){
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.strokeColor;

    ctx.strokeRect(this.collider.boundary.topLeft.x, this.collider.boundary.topLeft.y, this.width, this.height);
    ctx.fillRect(this.collider.boundary.topLeft.x, this.collider.boundary.topLeft.y, this.width, this.height);
  }
}

export class Ball extends Circle{

  constructor(props){
    super(props);
    this.bounce = props.bounce;
    this.friction = props.friction;
  }

}

export class PhysicsObject extends GameObject{
  update()
  {
    super.update();
  }

}

