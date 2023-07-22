const EventEmitter = require('events')

class Sender extends EventEmitter {
    send(eventName, message) {
        
        // log eventName
        console.log(`eventName is: ${eventName}`);

        // log meessage
        console.log(message);
        
        this.emit(eventName, message);
    }
}

module.exports = Sender;