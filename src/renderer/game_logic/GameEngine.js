import { PhysicsEngine, Vector2 } from "./physics/Physics";

export class GameEngine{
  uiDrawer = null;
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

  update(context, callback = () => {}){
    var self = this;

    this.processInput(context.canvas);
    callback();
    this.physicsUpdate();
    this.frameUpdate();
    this.render(context);

  }

  processInput(canvas){
    var self = this;
    if(!this.initialized){
      canvas.addEventListener('click', function(event) {
        self.clickPosition = new Vector2(event.offsetX, event.offsetY);
        self.clicked = true;

      }, false);
      this.initialized = true;
    }
    if(this.clickPosition != null){

      this.physicsEngine.raycast(self.clickPosition);
      this.clickPosition = null;
      this.clicked = false;
    }


  }

  setGravity(g){
    this.physicsEngine.gravity = g;
  }

  setPhysicsSpeed(s){
    this.physicsEngine.simulationSpeed = s;
  }

  deltaTime(){
    return this.physicsEngine.deltaTime;
  }



  beforeRender(){

  }

  afterRender(){

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
    this.gameObjects.forEach((go) => {
      go.render(context);
    });
  }

  addGameObject(obj){
    if(typeof(obj) == "GameObject"){
      this.gameObjects.push(obj);
      this.sortGameObjects();
    }
    this.physicsEngine.addGameObject(obj);
  }

  addGameObjects(objs = []){
    objs.forEach((o) => {
      this.gameObjects.push(o);

      this.physicsEngine.addGameObject(o);
    })
    this.sortGameObjects();
  }

  removeGameObject(o){
    this.physicsEngine.removeGameObject(o);
    this.gameObjects = this.gameObjects.filter((go) => {
      return go.id != o.id;
    })
  }

  removeGameObjects(objects){
    this.physicsEngine.removeGameObjects(objects);
    var ids = objects.map((v) => {
      return v.id;
    })
    this.gameObjects = this.gameObjects.filter((go) => {
      return !ids.includes(go.id);
    })
  }



  sortGameObjects(){
    this.gameObjects = this.gameObjects.sort((a, b) => {
      if(a.renderPriority < b.renderPriority) return 1;
      else if(a.renderPriority > b.renderPriority) return -1;
      return 0;
    });
  }

}
