import {GameObject, PhysicsObject} from './game_objects/GameObjects';
import {BaseState} from './states/States';


export class GameManager{
  constructor(props){
    this.gameObjects = props.gameObjects;

  }

  initialize(){
    this.gameObjects = this.gameObjects.sort((a, b) => {
      if(a.renderPriority < b.renderPriority) return 1;
      else if(a.renderPriority > b.renderPriority) return -1;
      return 0;
    });
  }

  update(){
    this.gameObjects.forEach(go => {
      go.update();
    })
  }

  render(ctx){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.gameObjects.forEach(go => {
      go.render(ctx);
    });
    console.log(this.gameObjects);
  }
}
