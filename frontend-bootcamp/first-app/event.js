const EventEmitter = require('events');
// const emitter = new EventEmitter();


//maing a noise, produce signalls
// raise an event
// emitter.emit('messageLogged', {id: 1, url: 'https://'});

// raise: logging (data: message)

const Logger = require('./logger');
const logger = new Logger();

// register a listener
logger.on('messageLogged', (arg) => {
    console.log('Listener called', arg);
});

logger.log('message');