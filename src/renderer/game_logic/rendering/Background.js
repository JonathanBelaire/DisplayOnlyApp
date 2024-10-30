import { Vector2 } from "../physics/Physics";

export class BackgroundElement{
  screenPosition = new Vector2();
  color;
  constructor(params) {
    this.screenPosition = params.screenPosition;
    this.color = params.color;
    this.width = params.width;
    this.height = params.height;

  }

  render(context){
    if(context instanceof CanvasRenderingContext2D){
      context.strokeStyle = this.color;
      context.fillStyle = this.color;
      context.fillRect(this.screenPosition.x, this.screenPosition.y, this.width, this.height);
      context.strokeRect(this.screenPosition.x, this.screenPosition.y, this.width, this.height);
    }

  }
}

export class ImageBackgroundElement extends BackgroundElement{
  image;
  constructor(params) {
    super(params);

    this.image = params.image;

  }

  render(context){
    super.render(context);

    if(context instanceof CanvasRenderingContext2D){


    }

  }
}
