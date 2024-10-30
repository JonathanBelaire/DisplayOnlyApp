

export class BaseState{
  constructor(props){
  }

  initialize(gameObject){

  }

  //returns next state
  update(gameObject){
    return this;
  }

  dispose(gameObject){

  }

}

export class AliveState extends BaseState{

  constructor(props){
    super(props);

    this.health = 100;
  }

  update(gameObject){
    super.update(gameObject);
    return this;

  }

}

export class DeadState extends BaseState{
  constructor(props){
    super(props);
  }

  update(gameObject){
    super.update(gameObject);

    // if(gameObject.health > 0){
    //   return States.getState(StateEnum.Alive);
    // }

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
  currentState = null;
  nextState = null;
  initialized = false;
  constructor(props){
    this.currentState = props.startingState;
    this.nextState = props.startingState;
  }



  update(obj){
    if(!this.initialized){
      this.currentState.initialize(obj);
      this.initialized = true;
    }

    if(this.currentState != null && this.nextState != null){
      if(this.currentState != this.nextState){
        this.currentState.dispose(obj);
        this.nextState.initialize(obj);
      }
      this.currentState = this.nextState;

      this.nextState = this.currentState.update(obj)

    }
  }
}
