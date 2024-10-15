import { PhysicsEngine } from "./utility/Physics";

export class GameEngine{
  constructor(width, height){
    this.gameObjects = [];
    this.width = width;
    this.height = height;
    this.physicsObjects = [];
    this.physicsEngine = new PhysicsEngine({
      width,
      height
    });

  }

  update(context){
    this.physicsUpdate();
    this.frameUpdate();
    this.render(context);
  }

  frameUpdate(){
    this.gameObjects.forEach((go) => {

      go.update();
    });
  }

  physicsUpdate(){
    this.physicsEngine.update();
  }

  render(context){
    context.clearRect(0,0,this.width, this.height);
    context.fillStyle = "#00002F";
    context.fillRect(0,0,this.width, this.height);
    //context.fillRect(0,0,this.width, this.height);
    this.gameObjects.forEach((go) => {
      go.render(context);
    });
  }

  addGameObject(obj){
    if(typeof(obj) == "GameObject"){
      this.gameObjects.push(obj);
      this.sortGameObjects();
    }
  }

  addGameObjects(objs = []){
    objs.forEach((o) => {
      this.gameObjects.push(o);
      this.physicsEngine.addGameObject(o);
    })
    this.sortGameObjects();
  }



  sortGameObjects(){
    this.gameObjects = this.gameObjects.sort((a, b) => {
      if(a.renderPriority < b.renderPriority) return 1;
      else if(a.renderPriority > b.renderPriority) return -1;
      return 0;
    });
  }

}
