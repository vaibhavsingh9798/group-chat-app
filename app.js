const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http')
const socketIO = require('socket.io')
const multer = require('multer')
const path = require('path')
require('dotenv').config()

const sequelize = require('./util/database')
const userRoutes = require('./routes/users')
const messageRoutes = require('./routes/messages')
const groupRoutes = require('./routes/group')
const groupFileRoutes = require('./routes/file')

const Group = require('./models/group')
const User = require('./models/users')
const Message = require('./models/messages')
const UserGroup = require('./models/usergroup')


const app = express()
const server = http.createServer(app)
const io = socketIO(server)
const upload = multer()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors({origin:'*'}))
app.use(express.static('public'))

app.use('/user',userRoutes)
app.use('/message',messageRoutes)
app.use('/group',groupRoutes)
app.use('/file',upload.single('myFile'),groupFileRoutes)

app.use((req,res)=>{
    console.log(req.url)
    console.log(path.join(__dirname,`public/${req.url}`))
    res.sendFile(path.join(__dirname,`public/${req.url}`))
})

User.belongsToMany(Group,{through: UserGroup})
Group.belongsToMany(User,{through: UserGroup})

Group.hasMany(Message)
Message.belongsTo(Group)

 User.hasMany(Message,{foreginKey:'userId'}) //
 Message.belongsTo(User)



sequelize.sync() //{force:true}
.then(()=>{
    server.listen(process.env.PORT,()=>{
        console.log(`server started on port ${process.env.PORT}`)
    })
     
    // io.on('connection',(socket) => {
    //     console.log('user connected');

    //     socket.on('joinRoom', (groupId) => {
    //         console.log('joining room:', groupId);
    //         socket.join(groupId);
    //     });
        

    //     socket.on('message', (msg) => {

    //         console.log('groupId :', msg.groupId);
    //         console.log('Received message:', msg.message);
    //         io.to(msg.groupId).emit('receivedMsg', msg);
    //     });
        
    //     socket.on('disconnect',()=>{
    //         console.log('user disconnected');
    //     });
    // })

})
.catch(err => console.log(err))


