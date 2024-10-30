import { Vector2 } from "../../physics/Physics";
import { BackgroundElement } from "../../rendering/Background";
import { UIText } from "../../rendering/UI";
import { HelperFunctions } from "../../utility/HelperFunctions";
import { BaseState } from "../States";

export class PregameState extends BaseState{
  secondsBeforeStart = 2;
  startTime;
  readyText;
  background;
  constructor(params) {
    super(params);

    this.startTime = Date.now();
    this.endTime = this.startTime + (this.secondsBeforeStart * 1000);

  }

  initialize(gameManager){
    super.initialize(gameManager);
    this.background = new BackgroundElement({
      color: "#010101",
      screenPosition: new Vector2(),
      width: gameManager.width,
      height: gameManager.height
    })
    this.readyText = new UIText({
      text: "Ready?",
      font: "48px serif",
      strokeColor: "white",
      fillColor: "white",
      screenPosition: new Vector2(gameManager.width*0.5, gameManager.height* 0.5 - 100)
    })
    gameManager.gameEngine.addUIElement(this.readyText);
    gameManager.gameEngine.addBackgroundElement(this.background);
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
    gameManager.gameEngine.removeBackgroundElement(this.background);
  }


}

export class PlayingState extends BaseState{
  scoreText;
  score = 0;
  constructor(params) {
    super(params);

  }

  initialize(gameManager){
    super.initialize(gameManager);

    this.background = new BackgroundElement({
      color: "#010101",
      screenPosition: new Vector2(),
      width: gameManager.width,
      height: gameManager.height
    })

    this.scoreText = new UIText({
      text: "0",
      font: "bold 48px serif",
      strokeColor: "black",
      fillColor: "white",
      screenPosition: new Vector2(gameManager.width*0.5, 50)
    })

    gameManager.gameEngine.addUIElement(this.scoreText);
    gameManager.gameEngine.addBackgroundElement(this.background);

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

    if(this.score != gameManager.score){
      this.background.color = HelperFunctions.getRandomColor();
      this.score = gameManager.score;
    }

    this.scoreText.text = gameManager.score + "";


    this.frame++;

    return this;
  }

  dispose(gameManager){
    super.dispose(gameManager);
    gameManager.gameEngine.removeUIElement(this.scoreText);
    gameManager.gameEngine.removeBackgroundElement(this.background);
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

    this.background = new BackgroundElement({
      color: "black",
      screenPosition: new Vector2(),
      width: gameManager.width,
      height: gameManager.height
    })

    this.gameOverText = new UIText({
      text: "GAME OVER",
      font: "bold 68px serif",
      strokeColor: "red",
      fillColor: "black",
      screenPosition: new Vector2(gameManager.width*0.5, gameManager.height*0.5 - 80)
    });

    this.restartText = new UIText({
      text: "Tap to try again!",
      font: "32px serif",
      strokeColor: "red",
      fillColor: "black",
      screenPosition: new Vector2(gameManager.width*0.5, gameManager.height*0.5 + 80 )
    });

    this.scoreText = new UIText({
      text: "SCORE: " + gameManager.score,
      font: "50px serif",
      strokeColor: "black",
      fillColor: "white",
      screenPosition: new Vector2(gameManager.width*0.5, gameManager.height*0.5)
    });


    gameManager.gameEngine.addUIElement(this.gameOverText);
    gameManager.gameEngine.addUIElement(this.restartText);
    gameManager.gameEngine.addUIElement(this.scoreText);
    gameManager.gameEngine.addBackgroundElement(this.background);

    gameManager.onGameOver();

  }

  update(gameManager){
    super.update(gameManager);

    if(this.frame % 5 == 0){
      this.restartText.strokeColor = HelperFunctions.getRandomColor();
      this.gameOverText.strokeColor = HelperFunctions.getRandomColor();

    }

    if(gameManager.playerTapped && this.frame > 30){
      return new PregameState();
    }

    return this;
  }

  dispose(gameManager){
    super.dispose(gameManager);
    gameManager.gameEngine.removeUIElement(this.gameOverText);
    gameManager.gameEngine.removeUIElement(this.restartText);
    gameManager.gameEngine.removeUIElement(this.scoreText);
    gameManager.gameEngine.removeBackgroundElement(this.background);
  }
}
