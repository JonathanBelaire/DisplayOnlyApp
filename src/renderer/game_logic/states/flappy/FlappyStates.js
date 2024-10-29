import { Vector2 } from "../../physics/Physics";
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

  update(gameManager){
    super.update(gameManager);


    if(this.firstFrame){
      gameManager.reset();
      gameManager.player.gravityEnabled = false;
      gameManager.player.lockY = true;

    }

    //gameManager.renderObstacles();
    if(Date.now() > this.endTime){
      return new PlayingState();
    }

    this.firstFrame = false;
    return this;

  }
}

export class PlayingState extends BaseState{
  firstFrame = true;
  constructor(params) {
    super(params);

  }

  update(gameManager){
    super.update(gameManager);

    if(this.firstFrame){
      gameManager.reset();
      gameManager.player.gravityEnabled = true;
      gameManager.player.lockY = false;
    }

    if(gameManager.playerTapped){
      gameManager.player.onJump();
    }

    gameManager.refreshObstacles();
    gameManager.updateObstacles();

    if(gameManager.playerCollided){
      return new GameOverState();
    }

    this.firstFrame = false;


    return this;
  }
}

export class GameOverState extends BaseState{
  constructor(params) {
    super(params);
  }

  update(gameManager){
    super.update(gameManager);

    console.log("GAME OVER");

    //gameManager.renderObstacles();

    if(gameManager.playerTapped){
      return new PregameState();
    }

    return this;
  }
}
