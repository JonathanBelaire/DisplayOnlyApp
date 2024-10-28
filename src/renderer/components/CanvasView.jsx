import { useEffect, createRef, useState } from 'react';
import { GameObject, PhysicsObject, Circle, Ball } from'../game_logic/game_objects/GameObjects';
import React from 'react';
import { GameEngine } from '../game_logic/GameEngine';
import { Vector2 } from '../game_logic/physics/Physics';
import { BouncyBalls, FlappyOnly } from '../game_logic/gameplay/GameplayManager';


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
    this.state.game.update()
    this.setState({
      frame: this.frame + 1
    });
  }

  refreshCanvas(){
    this.state.canvas = this.canvasRef.current;
    this.state.context = this.state.canvas.getContext('2d');
    this.state.game.setRenderContext(this.state.context);

  }

  initializeGameEngine(props){
    var game = new FlappyOnly( {width:props.width, height:props.height});

    this.state = {
      game: game,
      frame: 0,
      context: null
    };

  }


  render(){
    return (
      <div {...this.props}>
        <canvas ref={this.canvasRef} width={this.props.width} height={this.props.height}/>
      </div>

    );
  }

}

export default CanvasView;

