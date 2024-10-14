import { useEffect, createRef, useState } from 'react';
import { GameManager } from'../game_logic/GameManager';
import { GameObject, PhysicsObject, Circle } from'../game_logic/game_objects/GameObjects';
import React from 'react';


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
    console.log(this.canvasRef);
    this.setState({
      frame: this.frame + 1
    });
  }

  refreshCanvas(){
    this.state.canvas = this.canvasRef.current;
    this.state.context = this.state.canvas.getContext('2d');
    console.log(this.context);
  }

  initializeGameEngine(props){
    var gameObjectData = {
      renderPriority: 1
    };

    const state = {
      color: "#ffc600",
      width: 400,
      height: 400,
      brushRadius: 10,
      lazyRadius: 12
    };


    const colors = ["#010101", "#015701", "#610101", "#820101", "#A30101", "#CCCF01"];

    let gameObjects = [];
    let i = 0;

    while(i < 10){
      var strokeColor = colors[getRandomInt(colors.length)];
      var color = colors[getRandomInt(colors.length)];
      var position = {
        x: getRandomInt(500)+50,
        y: getRandomInt(500)+50
      };

      var radius = getRandomInt(70) + 20;

      gameObjects.push(new Circle({
        ...gameObjectData,
        strokeColor,
        color,
        radius,
        position
      }));

      i++;
    }

    let gameManager =  new GameManager({gameObjects});
    gameManager.initialize();

    console.log({gameManager});

    this.state = {
      gameManager: gameManager,
      frame: 0,
      context: null
    };

  }


  render(){
    if(this.state.gameManager && this.state.context != null){
      this.state.gameManager.update();
      this.state.gameManager.render(this.state.context);
    }

    return (
      <div {...this.props}>
        <canvas ref={this.canvasRef} width={this.props.width} height={this.props.height}/>
      </div>

    );
  }

}

export default CanvasView;
