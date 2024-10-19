export class EventListener{
  callback;
  constructor(callback){
    this.callback = callback
  }

  update(data){
    this.callback(data);
  }
}

//Add specific event listerer classes below
