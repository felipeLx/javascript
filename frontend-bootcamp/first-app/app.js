function sayHello(name) {
    console.log('hello ' + name); //global object
}

sayHello('Felipe');

//others global object
setTimeout();
clearTimeout();
setInterval();
clearInterval(); 

window.console.log(); //all method globals have window for default

// node we don't have window, we use GLOBAL
global.setTimeout();