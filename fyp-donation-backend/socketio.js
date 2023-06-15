// socketio.js

const socketio = require('socket.io');
const http = require('http');
let io;
let connectionsMap = new Map();

function init(server) {
    return new Promise((resolve,reject)=>{
        try {
            io = socketio(server,{
                cors: {
                    origin: "*",
                    methods: ["GET", "POST"],
                  }
            });
            io.on('connection', (socket) => {
                const user_id = socket.handshake.query.user_id;
                console.log(`Socket connected: user_id=${user_id}`);
        
                connectionsMap.set(user_id, socket);
                socket.on('disconnect', () => {
                    console.log(`Socket disconnected: user_id=${user_id}`);
        
                    // Remove the socket object from the map
                    connectionsMap.delete(user_id);
                });
        
            });
        
            server.listen(process.env.PORT,"0.0.0.0", (d) => {
                console.log(d);
                console.log('socket server running on port '+process.env.PORT);
            });
        } catch (error) {
            reject(error);
        }
    })
   
}


function getIO() {
    if (!io) {
      throw new Error('Socket.IO not initialized');
    }
    return io;
  }
  


function sendMessage(user_id,message) {  
    try {
        const socket=connectionsMap.get(user_id);
        if(socket){

            socket.emit("new_message",message);
        }
    } catch (error) {
        
    }
}



module.exports = { init, getIO,sendMessage };