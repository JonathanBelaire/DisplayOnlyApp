import { PhysicsEngine, Vector2 } from "./utility/Physics";

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
    this.initialized = false;

  }

  update(context){
    var self = this;

    this.processInput(context.canvas);
    this.physicsUpdate();
    this.frameUpdate();
    this.render(context);
  }

  processInput(canvas){
    var self = this;
    if(!this.initialized){
      console.log({canvas});
      canvas.addEventListener('click', function(event) {
        console.log({event});
        self.clickPosition = new Vector2(event.offsetX, event.offsetY);

      }, false);
      this.initialized = true;
    }
    if(this.clickPosition != null){
      console.log(this.clickPosition);
      this.physicsEngine.raycast(self.clickPosition);
      this.clickPosition = null;
    }



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
      o.setInputListener((go) => {
        go.setRadius( go.radius + 2);
      })
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
