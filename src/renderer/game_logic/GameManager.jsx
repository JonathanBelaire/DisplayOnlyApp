// import {GameObject, PhysicsObject} from './game_objects/GameObjects';
// import { GameEngine } from './GameEngine';
// import {BaseState} from './states/States';
// import { PhysicsEngine } from './utility/Physics';


// export class GameManager{
//   constructor(props){
//     this.gameObjects = props.gameObjects;

//     //this.gameEngine = new GameEngine();


//   }

//   initialize(){

//   }

//   physicsUpdate(){
//     this.physicsEngine.update();
//   }

//   update(){
//     this.gameObjects.forEach(go => {
//       go.update();
//     })
//   }

//   render(ctx){
//     ctx.fillStyle = "black";
//     ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//     this.gameObjects.forEach(go => {
//       go.render(ctx);
//     });
//     console.log(this.gameObjects);
//   }
// }
