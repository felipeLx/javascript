function log(message) {
  console.log(message);
};

var message = "Hello World";

log(message);

//two ways do declare a variable
var number1 = 1;
let number2 = 1;

function doSomething() {
  for(var i = 0; i<5; i++) {
    console.log(i);
  }
  console.log('Finally: ' + i);
}

doSomething();

// after the comiplation, js will chage variable to var
let count = 5;
count = 'a';

//typescript you can define the type of the variable
let a: number;
let b: boolean;
let c: string;
let d: any;
let e: number [] = [1, 2, 3];
let f: any[] = [1, true, 'a', false];

const ColorRed = 0;
const ColorGreen = 1;
const ColorBlue = 2;

// typescript into a container (enum)
enum Color { Red = 0, Green = 1, Blue = 2, Purple = 3};
let backGroundColor = Color.Blue;

let myMessage;
myMessage = 'abc';
let endWithC = (<string>myMessage).endsWith('c');
let otherWay = (myMessage as string).endsWith('c');
// tell typescript compiler that this messsage variable is actually a string
// that is: type assertions
console.log(endWithC, otherWay);

let logMe = function(otherMessage) {
  console.log(otherMessage);
}

// this expression in typescript: arrow function
let doLog = (otherMessage) => console.log(otherMessage);

// inline annotation: verbose to avoid
let drawPoint = (point: { x: number, y: number}) => {
  //
}

drawPoint({
  x: 1,
  y:2
})

// typescript Interface
interface Point {
  x: number,
  y: number,
}

// typescript Class
class PointX {
  x: number;
  y: number;

  drawMe() {
    console.log('X: ' + this.x + ', Y: ' + this.y);
  }

  getDistance(another: Point) {
    //
  }
}

let drawPoint2 = (point: Point) => {
  //
}
//pointX is a object, instance of a class as a metaphor think
let pointX = new PointX();
pointX.x = 1;
pointX.y = 2;
// when call this drawMe method this point object was undefined
// an object of a custom type we need to explictly allocate memory
pointX.drawMe();

// we cannot move these two functions inside our interface
let getDistance = (pointA: Point, pointB: Point) => {
  // ...
}

class PointWithConstructor {
// to avoid that have some change in the variable we can define Private
  private j: number;
  private k: number;

// constructor(j?: number, k?: number) : ? that make the variable optionals
  constructor(j: number, k: number) {
    this.j = j;
    this.k = k;
  }

  function() {
    var sum = this.j + this.k;
    return sum;
  }
}

let pointWithConstructor = new PointWithConstructor(2, 5);
console.log(pointWithConstructor.function());

// typescript constructor feature
class OtherPoint {
  constructor(private l?: number, private p?: number) {
  }

  otherDraw() {
    console.log('X: ' + this.l + ', Y: ' + this.p);
  }
// option to access variable that are private
  getX() {
    return this.l;
  }

  setX(value) {
    if(value < 0) {
      throw new Error('value should be more than zero');
    } else{
      this.l = value;
    }
  }
}

let otherPoint = new OtherPoint(1,2);
otherPoint.otherDraw();
let xL = otherPoint.getX();
otherPoint.setX(10);
otherPoint.otherDraw();

import{ PointMe } from './point';
let pointMe = new PointMe();
pointMe.draw();
