import { Vector2 } from "../../physics/Physics";
import { UIText } from "../../rendering/UI";
import { HelperFunctions } from "../../utility/HelperFunctions";
import { BaseState } from "../States";

export class PregameState extends BaseState{
  secondsBeforeStart = 2;
  startTime;
  firstFrame = true;
  readyText;
  constructor(params) {
    super(params);

    this.startTime = Date.now();
    this.endTime = this.startTime + (this.secondsBeforeStart * 1000);

  }

  initialize(gameManager){
    super.initialize(gameManager);
    this.readyText = new UIText({
      text: "Ready?",
      font: "48px serif",
      strokeColor: "white",
      fillColor: "white",
      screenPosition: new Vector2(gameManager.width*0.5, gameManager.height* 0.5 - 100)
    })
    gameManager.gameEngine.addUIElement(this.readyText);
    gameManager.reset();

  }

  update(gameManager){
    super.update(gameManager);

    //gameManager.renderObstacles();
    if(Date.now() > this.endTime){
      return new PlayingState();
    }

    return this;

  }

  dispose(gameManager){
    gameManager.gameEngine.removeUIElement(this.readyText);
  }


}

export class PlayingState extends BaseState{
  frame = 0;
  scoreText;
  constructor(params) {
    super(params);

  }

  initialize(gameManager){
    super.initialize(gameManager);

    this.scoreText = new UIText({
      text: "0",
      font: "bold 48px serif",
      strokeColor: "black",
      fillColor: "white",
      screenPosition: new Vector2(gameManager.width*0.5, 30)
    })

    gameManager.gameEngine.addUIElement(this.scoreText);

    gameManager.onStart();
  }

  update(gameManager){
    super.update(gameManager);

    if(gameManager.playerTapped){
      gameManager.player.onJump();
    }

    gameManager.refreshObstacles();

    if(gameManager.playerCollided){
      return new GameOverState();
    }

    if(this.frame % 10 == 0){
      gameManager.player.color = HelperFunctions.getRandomColor();
    }

    this.scoreText.text = gameManager.score + "";


    this.frame++;

    return this;
  }

  dispose(gameManager){
    super.dispose(gameManager);
    gameManager.gameEngine.removeUIElement(this.scoreText);
  }
}

export class GameOverState extends BaseState{
  gameOverText;
  restartText;
  constructor(params) {
    super(params);
  }

  initialize(gameManager){
    super.initialize(gameManager);

    this.gameOverText = new UIText({
      text: "GAME OVER",
      font: "bold 68px serif",
      strokeColor: "red",
      fillColor: "black",
      screenPosition: new Vector2(gameManager.width*0.5, gameManager.height*0.5 - 50)
    });

    this.restartText = new UIText({
      text: "Tap to try again!",
      font: "30px serif",
      strokeColor: "red",
      fillColor: "black",
      screenPosition: new Vector2(gameManager.width*0.5, gameManager.height*0.5 + 50 )
    });

    gameManager.gameEngine.addUIElement(this.gameOverText);
    gameManager.gameEngine.addUIElement(this.restartText);

    gameManager.onGameOver();

  }

  update(gameManager){
    super.update(gameManager);

    this.restartText.strokeColor = HelperFunctions.getRandomColor();
    this.gameOverText.strokeColor = HelperFunctions.getRandomColor();

    if(gameManager.playerTapped){
      return new PregameState();
    }

    return this;
  }

  dispose(gameManager){
    super.dispose(gameManager);
    gameManager.gameEngine.removeUIElement(this.gameOverText);
    gameManager.gameEngine.removeUIElement(this.restartText);
  }
}
