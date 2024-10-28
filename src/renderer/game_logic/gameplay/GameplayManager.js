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
    this.gameEngine = new GameEngine(config.width, config.height);

    this.renderContext = config.renderContext;
    this.width = config.width;
    this.height = config.height;
  }

  setRenderContext(context){
    this.renderContext = context;
  }

  update(context){
    this.gameEngine.update(context);
  }
}


export class FlappyOnly extends GameplayManager{
  player = null;
  obstacles = [];
  xAnchor = 0;
  playerTapped = false;
  playerCollided = false;

  gameSettings = {
    verticalSpacing: 200,
    horizontalSpacing: 500,
    obstacleWidth: 70,
    obstacleSpeed : 100,
    verticalPadding: 50
  }



  constructor(config) {
    super(config);

    this.stateMachine = new StateMachine({
      startingState: new PregameState()
    });

    this.xAnchor = config.width * 0.5;
    this.renderContext = config.renderContext;
    this.numberOfObstacles = Math.floor(config.width/(this.gameSettings.obstacleWidth + this.gameSettings.horizontalSpacing)) + 1;




    this.gameEngine.setGravity(300);
    this.gameEngine.setPhysicsSpeed(5);

    this.reset();



    this.refreshObstacles();
  }

  update(){
    this.playerTapped = this.gameEngine.clicked;
    this.stateMachine.update(this);


    super.update(this.renderContext);
  }

  refreshObstacles(){
    this.gameEngine.removeGameObjects(this.obstacles);
    this.obstacles = this.obstacles.filter((o) => {
      return o.getPosition().x > -20;
    })

    if(this.obstacles.length < this.numberOfObstacles){
      var i = this.obstacles.length;
      while(i < this.numberOfObstacles){
        var position = new Vector2();
        if(i == 0){
          position = new Vector2(this.width+this.gameSettings.obstacleWidth, this.getRandomHeight());
        }
        else{
          var prev = this.obstacles[i -1];
          position = new Vector2(prev.getPosition().x + this.gameSettings.horizontalSpacing + this.gameSettings.obstacleWidth, this.getRandomHeight());

        }

        var obstacle = new FlappyObstacle({
          position: position,
          width: this.gameSettings.obstacleWidth,
          canvasWidth:this.width,
          canvasHeight: this.height,
          verticalSpacing: this.gameSettings.verticalSpacing

        });

        this.obstacles.push(obstacle);
        i++;
      }
    }

    this.gameEngine.addGameObjects(this.obstacles);

  }

  getRandomHeight(){
    return (Math.random() * (this.height -this.gameSettings.verticalPadding)) +  this.gameSettings.verticalPadding;
  }

  updateObstacles(){
    this.obstacles.forEach((o) => {
      var pos = o.getPosition();
      var newPos = new Vector2(pos.x - (this.gameSettings.obstacleSpeed * this.gameEngine.deltaTime()), pos.y);
      o.setPosition(newPos);
    });
  }

  renderObstacles(){
    this.obstacles.forEach((o) => {
      o.render(this.renderContext);
    });

  }

  reset(){
    //this.gameEngine = new GameEngine(this.width, this.height);

    this.gameEngine.removeGameObjects(this.obstacles);
    if(this.player != null){
      this.gameEngine.removeGameObject(this.player);
    }
    this.obstacles = [];
    var player  = new Bird({
      gravityEnabled: true,
      position: new Vector2(this.width*0.5, this.height*0.5),
      velocity: new Vector2(),
      jumpSpeed: 10
    });

    this.player = player;

    this.gameEngine.addGameObjects([player]);

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
