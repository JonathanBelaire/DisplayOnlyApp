class GameManager{
  constructor(props){
    this.gameObjects = [];

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
    this.gameObjects.forEach(go => {
      go.render(ctx);
    })
  }
}
