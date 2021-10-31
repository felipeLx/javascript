const EventEmitter = require('events');
// const emitter = new EventEmitter();

// var x=; //error
var url = 'http://mylogger.io/log';

class Logger extends EventEmitter {
    log(message) {
    // send an HTTP request
    console.log(message);
    }

}

//export like a object
// module.exports.logObject = logObject;

//export just the function
module.exports = Logger;

// module.exports.endPoint = url;