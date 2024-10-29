import { Vector2 } from "../../physics/Physics";
import { HelperFunctions } from "../../utility/HelperFunctions";
import { BaseState } from "../States";

export class PregameState extends BaseState{
  secondsBeforeStart = 2;
  startTime;
  firstFrame = true;
  constructor(params) {
    super(params);

    this.startTime = Date.now();
    this.endTime = this.startTime + (this.secondsBeforeStart * 1000);

  }

  initialize(gameManager){
    super.initialize(gameManager);
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
}

export class PlayingState extends BaseState{
  frame = 0;
  constructor(params) {
    super(params);

  }

  initialize(gameManager){
    super.initialize(gameManager);

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

    this.frame++;

    return this;
  }
}

export class GameOverState extends BaseState{
  constructor(params) {
    super(params);
  }

  initialize(gameManager){
    super.initialize(gameManager);

    console.log("GAME OVER");
    gameManager.onGameOver();

  }

  update(gameManager){
    super.update(gameManager);



    if(gameManager.playerTapped){
      return new PregameState();
    }

    return this;
  }
}
