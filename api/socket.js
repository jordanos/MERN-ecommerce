const io =require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000",
    },
});
let users=[];
const addUser=(userId,socketId)=>{

    !users.some(user=>user.userId===userId) &&
    users.push({userId,socketId})
}
const removeUser =(socketID)=>{
    users=users.filter(user=>user.socketId!==socketID)
}


const getUser=(userId)=>{
    return users.find(user=>user.userId==userId)
}
io.on("connection",(socket)=>{
    
    console.log('a user connected')
    socket.on ("adduser",userId=>{
        addUser(userId,socket.id)
        io.emit("getUsers",users);
    });
    ///////////send and get message
    socket.on("sendMessage",({senderId,receiverId,text})=>{
        const user=getUser(receiverId)
        console.log(user,{senderId,receiverId,text})
        io.to(user?.socketId).emit("getMessage",{
            senderId,
            text,

        })
    })



    socket.on ("disconnect",()=>{
    console.log("user disconnected")
       removeUser(socket.id)
       io.emit("getUsers",users);
    });
    
})