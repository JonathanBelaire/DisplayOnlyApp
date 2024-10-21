
export class HelperFunctions{

  static getRandomNumber(max) {
    return Math.abs(Math.random() * max) * 1.0;
  }

  static getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  static getRandomColor(){
    var colorInt = Math.floor(Math.random() * 16777215);
    return "#"+colorInt.toString(16);
  }
}
