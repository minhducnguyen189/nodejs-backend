const EVENT_NAME = 'messageLogged';

const Sender = require('./event-sender')
const sender = new Sender();

sender.on(EVENT_NAME, (arg) => {
    console.log('Listener called', arg);
});

sender.send(EVENT_NAME, {name: 'John', age: 50});