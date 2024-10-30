import { GameEngine } from "../GameEngine";
import { HelperFunctions } from "../utility/HelperFunctions";
import { Ball } from "../game_objects/GameObjects";
import { Vector2 } from "../physics/Physics";
import { Bird } from "../game_objects/Flappy/Bird";
import { StateMachine } from "../states/States";
import { FlappyObstacle } from "../game_objects/Flappy/FlappyObstacle";
import { PregameState } from "../states/flappy/FlappyStates";


export class GameplayManager{
  gameEngine = null;
  gameObjects = [];
  stateMachine = null;
  renderContext = null;
  constructor(config) {
    this.gameEngine = new GameEngine(config.width, config.height, config.renderContext);

    this.renderContext = config.renderContext;
    this.width = config.width;
    this.height = config.height;
  }

  setRenderContext(context){
    this.renderContext = context;
    this.gameEngine.context = context;
  }

  update(context){
    this.gameEngine.update();
  }
}


export class FlappyOnly extends GameplayManager{
  player = null;
  obstacles = [];
  xAnchor = 0;
  playerTapped = false;
  playerCollided = false;
  obstacleVelocity = new Vector2();
  uiElements = [];
  score = 0;

  gameSettings = {
    jumpSpeed: 120,
    verticalSpacing: 250,
    horizontalSpacing: 500,
    obstacleWidth: 70,
    obstacleSpeed : 70.0,
    verticalPadding: 100
  }



  constructor(config) {
    super(config);

    this.stateMachine = new StateMachine({
      startingState: new PregameState()
    });

    this.xAnchor = config.width * 0.5;
    this.renderContext = config.renderContext;
    this.numberOfObstacles = Math.floor(config.width/(this.gameSettings.obstacleWidth + this.gameSettings.horizontalSpacing)) + 2;


    this.canvasHeight = config.height;
    this.canvasWidth = config.width;
    this.gameEngine.setGravity(300);
    this.gameEngine.setPhysicsSpeed(5);

    this.obstacleVelocity = new Vector2(-this.gameSettings.obstacleSpeed, 0);

    this.reset();

  }

  update(){
    this.playerTapped = this.gameEngine.clicked;
    var collisions = this.gameEngine.physicsEngine.getCollisionsForGameObject(this.player).filter((o) => {
      return o.gameObject2 instanceof FlappyObstacle;
    });

    var playerCollided = collisions.length > 0;

    this.playerCollided = playerCollided;
    if(!playerCollided){
      this.checkForScoreUpdate();
    }

    this.stateMachine.update(this);
    super.update();

  }

  checkForScoreUpdate(){
    var self = this;
    for(var i = 0; i < this.obstacles.length; i += 2)
    {
      var o = this.obstacles[i];
      if(!o.playerPassed && o.getPosition().x < this.player.getPosition().x){
        self.score++;
        o.playerPassed = true;
      }
    }
  }

  generateNewObstacle(centerPosition){
    var offset =  (this.gameSettings.verticalSpacing * 0.5);

    var height1 = centerPosition.y - offset;
    var height2 =  (this.canvasHeight - centerPosition.y) - offset;

    var pos1 = new Vector2(centerPosition.x, height1 * 0.5);
    var pos2 = new Vector2(centerPosition.x, centerPosition.y + offset + height2 * 0.5);

    var obstacle1 = new FlappyObstacle({
      position: pos1,
      width: this.gameSettings.obstacleWidth,
      height: height1,
      physicsEnabled: true,
      gravityEnabled:false,
      collisionsEnabled: true,
      velocity: this.obstacleVelocity,

    });

    var obstacle2 = new FlappyObstacle({
      position: pos2,
      width: this.gameSettings.obstacleWidth,
      height: height2,
      physicsEnabled: true,
      gravityEnabled:false,
      collisionsEnabled: true,
      velocity: this.obstacleVelocity,
    });


    this.obstacles.push(obstacle1);
    this.obstacles.push(obstacle2);
    this.gameEngine.addGameObject(obstacle1);
    this.gameEngine.addGameObject(obstacle2);

  }

  refreshObstacles(){
    var self = this;

    //var allObstacles = this.obstacles;
    var obstaclesToRemove = this.obstacles.filter((o) =>
      o.getPosition().x < -20
    );

    var obstacleIdsToRemove = obstaclesToRemove.map((o) => o.id);

    this.obstacles = this.obstacles.filter((o) => !obstacleIdsToRemove.includes(o.id));

    obstaclesToRemove.forEach((o) => {
      self.gameEngine.removeGameObject(o);
    })


    if(this.obstacles.length < this.numberOfObstacles * 2){

      var i = this.obstacles.length;
      while(i < this.numberOfObstacles * 2){
        var position = new Vector2();
        if(i < 2){
          position = new Vector2(this.canvasWidth+this.gameSettings.obstacleWidth, this.getRandomHeight());
        }
        else{
          var prev = this.obstacles[i - 1];
          position = new Vector2(prev.getPosition().x + this.gameSettings.horizontalSpacing + this.gameSettings.obstacleWidth*0.5, this.getRandomHeight());

        }


        this.generateNewObstacle(position);

        i += 2;
      }
    }



  }

  getRandomHeight(){
    return (Math.random() * (this.height -this.gameSettings.verticalPadding - this.gameSettings.verticalSpacing)) +  this.gameSettings.verticalPadding + this.gameSettings.verticalSpacing;
  }

  updateObstacles(){
    // this.obstacles.forEach((o) => {
    //   // var pos = o.getPosition();
    //   // var newPos = new Vector2(pos.x - (this.gameSettings.obstacleSpeed * this.gameEngine.deltaTime()), pos.y);
    //   // o.setPosition(newPos);
    // });
  }

  onStart(){
    var self = this;
    this.player.gravityEnabled = true;
    this.player.physicsEnabled = true;
    this.player.collisionsEnabled = true;
    this.player.lockY = false;
    this.obstacles.forEach((o) => {
      o.physicsEnabled = true;
      o.collisionsEnabled = true;
      o.gravityEnabled = false;
      o.velocity = new Vector2(-self.gameSettings.obstacleSpeed, 0);

    });
  }

  onGameOver(){
    this.obstacles.forEach((o) => {
      o.physicsEnabled = true;
      //o.gravityEnabled = true;

      o.velocity = new Vector2();

      o.color = "black";
    });

    this.player.color = "red";
    this.player.lockY = true;
    this.player.physicsEnabled = false;
    this.player.collisionsEnabled = false;
  }

  renderObstacles(){
    this.obstacles.forEach((o) => {
      o.render(this.renderContext);
    });

  }

  reset(){
    if(this.obstacles.length > 0){

      this.gameEngine.removeGameObjects(this.obstacles);
    }
    if(this.player != null){
      this.gameEngine.removeGameObject(this.player);
    }
    this.score = 0;
    this.obstacles = [];
    var player  = new Bird({
      gravityEnabled: false,
      physicsEnabled: false,
      renderPriority: 10,
      radius: 35,
      collisionsEnabled: true,
      position: new Vector2(this.width*0.5, this.height*0.5),
      velocity: new Vector2(),
      jumpSpeed: this.gameSettings.jumpSpeed
    });


    this.player = player;
    this.player.gravityEnabled = false;

    this.player.lockY = true;

    this.gameEngine.addGameObject(player);

  }


}

export class BouncyBalls extends GameplayManager{
  constructor(config) {
    super(config);


    let gameObjects = [];
    let i = 0;

    var numberOfBalls = 10

    while(i < numberOfBalls){

      var strokeColor = HelperFunctions.getRandomColor();
      var color = HelperFunctions.getRandomColor();

      var position = new Vector2(HelperFunctions.getRandomNumber(config.width)+10.0,HelperFunctions.getRandomNumber(config.height)-20.0);

      var radius = HelperFunctions.getRandomNumber(40) + 20;
      var gameObject = new Ball({
        renderPriority: 1,
        strokeColor,
        bounce: 0.88,
        friction: 1,
        color,
        radius,
        position,
        gravityEnabled: true
      });

      gameObject.setInputListener((go) => {
        go.setRadius( go.radius + 2);
      })
      this.gameObjects.push(gameObject);

      i++;
    }
    this.gameEngine.addGameObjects(this.gameObjects);
  }

  update(context){
    super.update(context);
  }


}
