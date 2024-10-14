export class GameObject{
  constructor(props){
    this.renderPriority = props.renderPriority;
    this.img = props.img;
    this.position = props.position;
    this.updateFunction = props.updateFunction;
    this.color = props.color;
    this.strokeColor = props.strokeColor;
    this.position = props.position;
  }

  update(){
    if(self.updateFunction && typeof(self.updateFunction) == "function"){
      console.log("base update called on game object");
    }
  }

  render(ctx){
    ctx.strokeStyle = this.strokeColor;
    ctx.fillStyle = this.color;

  }
}

export class Circle extends GameObject{
  constructor(props){
    super(props);
    this.radius = props.radius;
  }
  update(){
    super.update();
  }

  render(ctx){
    super.render(ctx);
    ctx.beginPath();
    //ctx.style = this.color;
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
}

export class PhysicsObject extends GameObject{
  update(){
    super.update();
  }

  render(ctx){
    super.render(ctx);
  }
}

