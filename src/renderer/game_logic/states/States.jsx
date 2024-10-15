

export class BaseState{
  constructor(props){
  }

  //returns next state
  update(gameObject){
    return this;
  }

}

export class AliveState extends BaseState{

  constructor(props){
    super(props);

    this.health = 100;
  }

  update(gameObject){
    super.update(gameObject);

    //gameObject.update();
    //gameObject.draw();

    if(gameObject.health < 1){
      gameObject.active = false;
      return States.getState(StateEnum.Dead);
    }
    return this;

  }

}

export class DeadState extends BaseState{
  constructor(props){
    super(props);
  }

  update(gameObject){
    super.update(gameObject);

    if(gameObject.health > 0){
      return States.getState(StateEnum.Alive);
    }

    return this;
  }


}

export const StateEnum = {
  Base: 0,
  Alive : 1,
  Dead: 2
}

export const States = {
  getState: (state) => {
    switch(state){
      case(StateEnum.Alive):
        return new AliveState();
        break;
      case(StateEnum.Dead):
        return new DeadState();
        break;
      default:
        return new BaseState();

    }
  }
}



export class StateMachine {

  constructor(props){
    this.gameObject = props.gameObject;
    this.currentState = props.startingState;
    this.nextState = null;
  }

  update(){
    this.nextState = this.currentState.update(this.gameObject);
    this.currentState = this.nextState;

  }

}
