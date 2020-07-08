class ChatEngine{
    constructor(chatBoxId, userEmail, userName){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.userName=userName;

        this.socket = io.connect('http://localhost:5000');

        if (this.userEmail){
            this.connectionHandler();
        }

    }


    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');


            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            });

            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data);
            })


        });

        // CHANGE :: send a message on clicking the send message button
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();
            console.log(" I M HEREr in click function");

            if (msg != ''){
                console.log(" HERE OIN  send mess")
                self.socket.emit('send_message', {
                    message: msg,
                    name:self.userName,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }
        });

        self.socket.on('receieve_message', function(data){
            console.log('message received', data.message);


            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_email == self.userEmail){
                messageType = 'self-message';
            }
            if (data.user_email !== self.userEmail){
            newMessage.append($('<sub>', {
                'html': data.name
            }));
            newMessage.append($('<br>'));        
        }

            newMessage.append($('<span>', {
                'html': data.message
            }));
           
        

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })
    }
}


// class chatEngine
// {
//     constructor(chatBoxId, userEmail)
//     {
        
//         this.chatBoxId=$(`#${chatBoxId}`);
//         this.userEmail=userEmail;
//         console.log("EMAIL", this.userEmail);
//         this.socket=io.connect('http://localhost:5000');
//         console.log(io);
//         if(this.userEmail)
//         {
//             this.connectionHandler();
//         }
//     }
//     connectionHandler()
//     {
//         let self=this;
       
//         this.socket.on('connect', function()
//         {

//             console.log("COnnections established using Sockets!!");
//             self.socket.emit('join_room',
//             {
//                 userEmail: self.userEmail,
//                 chatroom: 'codeial'
//             });
//             self.socket.on('user_joined', function(data)
//             {
//                 console.log("A User Joined", data);
//             })
//         });
//         console.log(" I AM HERE");
      

//     }
    
// }
// $('send-message').click(function () {
//     console.log(" IN SEDNINF Message"); 
//     let msg= $('chat-message-input').val();
//     if(msg!='')
//     {
//         self.socket.emit('send_message',
//         {
//             message : msg,
//             userEmail: self.userEmail,
//             chatroom: 'codeial'
//         });
//     }
//  });
//  self.socket.on('receive_message',function(data)
//  {
//      console.log('Message Recieved',data);
//      let newMessage= $('<li>');
//      let messageType='other-message';
//         if(data.userEmail == self.userEmail)
//         {
//             messageType='self-message'
//         }            
//         newMessage.append($('<span>',
//         {
//             'html':data.message
//         }));
//         newMessage.append($('<sub>',
//         {
//             'html':data.userEmail
//         }));
//         newMessage.addClass(messageType);
//         $('#chat-message-list').append(newMessage);
//  })