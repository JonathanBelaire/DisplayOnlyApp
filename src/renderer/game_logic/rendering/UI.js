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
  text;
  image;
  constructor(params) {

  }

  draw(context){

  }
}
