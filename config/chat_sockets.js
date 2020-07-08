
module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });
        socket.on('join_room',function(data)
        {
            console.log("Joining Request Reieved",data.userEmail);
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined',data);
        });
        socket.on('send_message',function(data)
        {
            console.log(" HERER  in the socket file of send messae",data);
            io.in(data.chatroom).emit('receieve_message',data);
        })
    });


}







// module.exports.chatSockets = function (socketServer) {
//   console.log(" I AM herere  i n sockets");
//   let io = require('socket.io')(socketServer);
//   console.log(io);  
//   io.sockets.on("connection", function (socket) {
//     console.log("Connected Succesfullt", socket.id);
//   });
// };
// // module.exports.hello = function () {
// //   console.log(" I AM IN HELLO FUNCTIN");
// // };
