import { StateMachine, GameStates, StateEnum, States } from "../states/States";
import { CircleCollider, PhysicsEngine, Vector2, Collider } from "../utility/Physics";

export class GameObject{
  constructor(props){
    var self = this;
    this.id = Math.random().toString(16).slice(2);
    this.active = true;
    this.renderPriority = props.renderPriority;
    this.img = props.img;
    this.color = props.color;
    this.strokeColor = props.strokeColor;
    this.velocity = new Vector2(Math.random()*10 - 5, 0.4);
    this.transform = {
      position: new Vector2(props.position.x, props.position.y),
      rotation: props.rotation,
      size: props.size ? props.size : new Vector2(1, 1)
    };

    this.lastFrameTimestamp = null;
    this.collider = new Collider(this);
    this.stateMachine = new StateMachine({
      gameObject :self,
      startingState : props.startingState
    });

  }

  getPosition(){
    return this.transform.position;
  }

  physicsUpdate(physicsEngine){
    var timestamp = Date.now();
    if(this.lastFrameTimestamp == null){
      this.lastFrameTimestamp = timestamp - 17.0;
    }

    let deltaTime = (timestamp - this.lastFrameTimestamp) * 0.001;


    var collisions = physicsEngine.getCollisionsForGameObject(this);


    if(collisions.length > 0){
      collisions.forEach((co) => {
        //apply impact based on velocity of each object (account for mass later)
        var velocitySumX = co.gameObject2.velocity.x + this.velocity.x;
        var velocitySumY = co.gameObject2.velocity.y + this.velocity.y;

        var velocityDiffX = Math.abs(co.gameObject2.velocity.x - this.velocity.x);
        var velocityDiffY = Math.abs(co.gameObject2.velocity.y - this.velocity.y);

        var directionX = this.transform.position.x - co.gameObject2.transform.position.x;
        var directionY = this.transform.position.y - co.gameObject2.transform.position.y;



        var bounceDirection = (new Vector2(directionX, directionY)).unit();
        var speed = this.velocity.magnitude();

        this.velocity = bounceDirection.multiply(speed);

      });
    }

    this.checkForBoundaries(physicsEngine);

    if(Math.abs(physicsEngine.gravity) > 0){
      this.velocity.y += physicsEngine.gravity * deltaTime;
    }


    var positionX = this.transform.position.x + (this.velocity.x * physicsEngine.simulationSpeed * deltaTime);
    var positionY = this.transform.position.y + (this.velocity.y * physicsEngine.simulationSpeed * deltaTime);

    this.transform.position = new Vector2 (positionX, positionY);

    this.collider.updatePosition(this.transform.position);

    this.lastFrameTimestamp = timestamp;
  }

  checkForBoundaries(physicsEngine){
    if(this.transform.position.x > physicsEngine.boundary.right && this.velocity.x > 0 ){
      this.velocity.x = -this.velocity.x;

    }
    if(this.transform.position.x < physicsEngine.boundary.left && this.velocity.x < 0){
      this.velocity.x = -this.velocity.x;
    }

    if(this.transform.position.y >= physicsEngine.boundary.bottom && this.velocity.y > 0){
      this.velocity.y = -this.velocity.y;
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
    this.stateMachine.update();
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
    this.stateMachine = new StateMachine({
      gameObject: this,
      startingState: States.getState(StateEnum.Alive)
    })
  }

  physicsUpdate(physicsEngine){
    super.physicsUpdate(physicsEngine);
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

  collide(gameObject){
    return super.collide(gameObject)
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

export class PhysicsObject extends GameObject{
  update(){
    super.update();
  }

}

