import { useEffect, createRef, useState } from 'react';
import { GameManager } from'../game_logic/GameManager';
import { GameObject, PhysicsObject, Circle } from'../game_logic/game_objects/GameObjects';
import React from 'react';
import { GameEngine } from '../game_logic/GameEngine';
import { Vector2 } from '../game_logic/utility/Physics';


function getRandomNumber(max) {
  return Math.abs(Math.random() * max) * 1.0;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


class CanvasView extends React.Component {

  constructor(props){
    super(props);
    this.canvasRef = React.createRef();
    this.initializeGameEngine(props);
  }


  componentDidMount() {
    this.refreshCanvas();
    this.timerID = setInterval(
      () => this.tick(),
      17
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick(){
    this.state.gameEngine.update(this.state.context)
    this.setState({
      frame: this.frame + 1
    });
  }

  refreshCanvas(){
    this.state.canvas = this.canvasRef.current;
    this.state.context = this.state.canvas.getContext('2d');

  }

  initializeGameEngine(props){
    var gameObjectData = {
      renderPriority: 1
    };

    var gameEngine = new GameEngine( props.width, props.height);


    const colors = ["#010101", "#015701", "#610101", "#820101", "#A30101", "#CCCF01"];

    let gameObjects = [];
    let i = 0;

    while(i < 10){
      var strokeColor = colors[getRandomInt(colors.length)];
      var color = colors[getRandomInt(colors.length)];
      var position = new Vector2(getRandomNumber(props.width)+10.0,getRandomNumber(props.height)-20.0);

      var radius = getRandomNumber(40) + 20;

      gameObjects.push(new Circle({
        ...gameObjectData,
        strokeColor,
        color,
        radius,
        position
      }));
      i++;
    }
    gameEngine.addGameObjects(gameObjects);

    this.state = {
      gameEngine: gameEngine,
      frame: 0,
      context: null
    };

  }


  render(){
    if(this.state.gameManager && this.state.context != null){
      this.state.gameEngine.update();
      this.state.gameEngine.render(this.state.context);
    }

    return (
      <div {...this.props}>
        <canvas ref={this.canvasRef} width={this.props.width} height={this.props.height}/>
      </div>

    );
  }

}

export default CanvasView;
