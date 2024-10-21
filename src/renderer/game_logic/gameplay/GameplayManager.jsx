import { GameEngine } from "../GameEngine";
import { HelperFunctions } from "../utility/HelperFunctions";
import { Ball } from "../game_objects/GameObjects";
import { Vector2 } from "../utility/Physics";


export class GameplayManager{
  gameEngine = null;
  gameObjects = [];
  stateMachine = null;
  constructor(config) {
    this.gameEngine = new GameEngine(config.width, config.height);
    this.stateMachine = null
  }

  update(context){
    this.gameEngine.update(context);
  }
}


export class FlappyOnly extends GameplayManager{
  constructor(config) {
    super(config);
  }

  update(context){
    super.update(context);
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
