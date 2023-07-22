const EventEmitter = require('events');
const emitter = new EventEmitter();

//Register a listener for receiving argument object
emitter.on('messageLogged', (arg) => { 
    console.log('Listener called!', arg);
});

// Raise an event with an argument object
emitter.emit('messageLogged', {name: 'John', age: 50});

