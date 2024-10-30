import { GameObject } from "./game_objects/GameObjects";
import { PhysicsEngine, Vector2 } from "./physics/Physics";

export class GameEngine{

  constructor(width, height, context){
    this.gameObjects = [];
    this.width = width;
    this.height = height;
    this.physicsObjects = [];

    this.uiElements = [];

    this.context = context;

    this.physicsEngine = new PhysicsEngine({
      width,
      height
    });


    this.initialized = false;

  }

  update(){
    var self = this;

    this.processInput(this.context.canvas);
    this.physicsUpdate();
    this.frameUpdate();
    this.beforeRender(this.context);
    this.render(this.context);
    this.afterRender(this.context);

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



  beforeRender(context){
    //TODO call listeners to render background

  }

  afterRender(context){
    this.uiElements.forEach((ui) => {
      ui.draw(context);
    })

    if(this.clickPosition != null){
      this.physicsEngine.raycast(this.clickPosition);
      this.clickPosition = null;
      this.clicked = false;
    }

    //TODO render ui



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

  addUIElement(el){
    this.uiElements.push(el);
  }

  removeUIElement(el){
    var index = this.uiElements.indexOf(el);

    this.uiElements.splice(index,1);
  }

  addGameObject(obj){
    if(obj instanceof GameObject){
      this.gameObjects.push(obj);
      this.sortGameObjects();
      this.physicsEngine.addGameObject(obj);
    }
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
      if(a.renderPriority < b.renderPriority) return -1;
      else if(a.renderPriority > b.renderPriority) return 1;
      return 0;
    });
  }

}
