class GameObject{
  constructor(props){
    this.renderPriority = props.renderPriority;
    this.img = props.img;
    this.position = props.position;
    this.updateFunction = props.updateFunction;
  }

  update(){
    if(self.updateFunction && typeof(self.updateFunction) == "function"){

    }
  }

  render(ctx){
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}

class PhysicsObject extends GameObject{
  update(){
    super.update();
  }

  render(ctx){
    super.render(ctx);
  }
}





const State = {

}

