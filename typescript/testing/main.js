function log(message) {
    console.log(message);
}
;
var message = "Hello World";
log(message);
//two ways do declare a variable
var number1 = 1;
var number2 = 1;
function doSomething() {
    for (var i = 0; i < 5; i++) {
        console.log(i);
    }
    console.log('Finally: ' + i);
}
doSomething();
// after the comiplation, js will chage variable to var
var count = 5;
count = 'a';
//typescript you can define the type of the variable
var a;
var b;
var c;
var d;
var e = [1, 2, 3];
var f = [1, true, 'a', false];
var ColorRed = 0;
var ColorGreen = 1;
var ColorBlue = 2;
// typescript into a container (enum)
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
    Color[Color["Purple"] = 3] = "Purple";
})(Color || (Color = {}));
;
var backGroundColor = Color.Blue;
var myMessage;
myMessage = 'abc';
var endWithC = myMessage.endsWith('c');
var otherWay = myMessage.endsWith('c');
// tell typescript compiler that this messsage variable is actually a string
// that is: type assertions
console.log(endWithC, otherWay);
var logMe = function (otherMessage) {
    console.log(otherMessage);
};
// this expression in typescript: arrow function
var doLog = function (otherMessage) { return console.log(otherMessage); };
// inline annotation: verbose to avoid
var drawPoint = function (point) {
    //
};
drawPoint({
    x: 1,
    y: 2
});
// typescript Class
var PointX = /** @class */ (function () {
    function PointX() {
    }
    PointX.prototype.drawMe = function () {
        console.log('X: ' + this.x + ', Y: ' + this.y);
    };
    PointX.prototype.getDistance = function (another) {
        //
    };
    return PointX;
}());
var drawPoint2 = function (point) {
    //
};
//pointX is a object, instance of a class as a metaphor think
var pointX = new PointX();
pointX.x = 1;
pointX.y = 2;
// when call this drawMe method this point object was undefined
// an object of a custom type we need to explictly allocate memory
pointX.drawMe();
// we cannot move these two functions inside our interface
var getDistance = function (pointA, pointB) {
    // ...
};
var PointWithConstructor = /** @class */ (function () {
    // constructor(j?: number, k?: number) : ? that make the variable optionals
    function PointWithConstructor(j, k) {
        this.j = j;
        this.k = k;
    }
    PointWithConstructor.prototype["function"] = function () {
        var sum = this.j + this.k;
        return sum;
    };
    return PointWithConstructor;
}());
var pointWithConstructor = new PointWithConstructor(2, 5);
console.log(pointWithConstructor["function"]());
// typescript constructor feature
var OtherPoint = /** @class */ (function () {
    function OtherPoint(l, p) {
        this.l = l;
        this.p = p;
    }
    OtherPoint.prototype.otherDraw = function () {
        console.log('X: ' + this.l + ', Y: ' + this.p);
    };
    // option to access variable that are private
    OtherPoint.prototype.getX = function () {
        return this.l;
    };
    OtherPoint.prototype.setX = function (value) {
        if (value < 0) {
            throw new Error('value should be more than zero');
        }
        else {
            this.l = value;
        }
    };
    return OtherPoint;
}());
var otherPoint = new OtherPoint(1, 2);
otherPoint.otherDraw();
var xL = otherPoint.getX();
otherPoint.setX(10);
otherPoint.otherDraw();
