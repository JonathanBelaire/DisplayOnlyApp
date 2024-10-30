import { Vector2 } from "../physics/Physics";

export class UIContext{
  elementsToDraw = [];
  constructor(params) {

  }

  draw(context){
    if( context instanceof CanvasRenderingContext2D){
      this.elementsToDraw.forEach((val, i) => {

      })
    }
  }

  drawText(context, screenPosition){
    if(screenPosition instanceof Vector2 && context instanceof CanvasRenderingContext2D){

    }
  }

  drawImage(context, screenPosition){
    if(screenPosition instanceof Vector2 && context instanceof CanvasRenderingContext2D){

    }
  }
}

export class UIElement{
  screenPosition;
  alignment;
  strokeColor;
  fillColor;


  constructor(params) {
    this.screenPosition = params.screenPosition;
    this.alignment = params.alignment;
    this.strokeColor = params.strokeColor;
    this.fillColor = params.fillColor;
  }

  draw(context){
    if(context instanceof CanvasRenderingContext2D){
      context.strokeStyle = this.strokeColor;
      context.fillStyle = this.fillColor;


    }

  }
}

export class UIText extends UIElement{
  text;
  font;
  align = "center";
  direction = "ltr";
  baseline = "middle";
  constructor(params) {
    super(params);
    this.text = params.text;
    this.font = params.font;
  }

  draw(context){
    super.draw(context);
    if(context instanceof CanvasRenderingContext2D){
      context.font = this.font;
      context.textAlign = this.align;
      context.direction = this.direction;
      context.textBaseline = this.baseline;

      context.fillText(this.text, this.screenPosition.x, this.screenPosition.y);
      context.strokeText(this.text, this.screenPosition.x, this.screenPosition.y);
    }
  }
}

export class UIImage extends UIElement{
  image;
  constructor(params) {
    super(params);
    this.image = params.image;
  }

  draw(context){
    super.draw(context);
    if(context instanceof CanvasRenderingContext2D){
      context.drawImage(this.image, this.screenPosition.x, this.screenPosition.y);
    }
  }
}

export class UIContainer extends UIElement{
  width;
  height;
  radius;
  constructor(params) {
    super(params);
    this.width = params.width;
    this.height = params.height;

    this.radius = params.radius;
  }

  draw(context){
    super.draw(context);
    if(context instanceof CanvasRenderingContext2D){
      context.beginPath();
      context.roundRect(this.screenPosition.x, this.screenPosition.y, this.width, this.height, this.radius);
      context.closePath();

    }
  }
}

export class UIButton extends UIContainer{
  text;
  clickCallback = () => {}
  constructor(params) {
    super(params);
    this.text = params.text;
    if(typeof(params.clickCallback) == "function"){
      this.clickCallback = params.clickCallback
    }
  }

  draw(context){
    super.draw(context);
    if(context instanceof CanvasRenderingContext2D){

    }
  }

  onClick(){
    this.clickCallback();

  }
}
