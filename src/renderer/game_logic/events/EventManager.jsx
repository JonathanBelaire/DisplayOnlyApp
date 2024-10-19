import { EventListener } from "./EventListener";

export class EventManager{
  observers = [];
  constructor(props){

  }

  notifyAllObservers(data){
    this.observers.forEach((s) => {
      s.update(data);
    })
  }

  addObserver(observer){
    if(observer instanceof EventListener){
      this.observers.push(observer);
    }
  }

  removeObserver(observer){
    this.observers = this.observers.filter((o) => {return observer != o});
  }
}
