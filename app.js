const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http')
const socketIO = require('socket.io')
const multer = require('multer')
require('dotenv').config()

const userauthonticate = require('./middleware/auth')

const sequelize = require('./util/database')
const userRoutes = require('./routes/users')
const messageRoutes = require('./routes/messages')
const groupRoutes = require('./routes/group')
const groupFileRoutes = require('./routes/file')

const Group = require('./models/group')
const User = require('./models/users')
const Message = require('./models/messages')
const UserGroup = require('./models/usergroup')
const GroupFile = require('./models/groupFiles')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)
const upload = multer()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors({origin:'*'}))

app.use('/user',userRoutes)
app.use(userauthonticate.authonticate)
app.use('/message',messageRoutes)
app.use('/group',groupRoutes)
app.use('/file',upload.single('myFile'),groupFileRoutes)

app.get('/',(req,res)=>{
    res.send('Home Page')
})

User.belongsToMany(Group,{through: UserGroup})
Group.belongsToMany(User,{through: UserGroup})

// msg group 1 m
Group.hasMany(Message)
Message.belongsTo(Group)

// user msg 1 m 

 User.hasMany(Message,{foreginKey:'userId'}) //
 Message.belongsTo(User)

Group.hasMany(GroupFile)

sequelize.sync() //{force:true}
.then(()=>{
    server.listen(process.env.PORT,()=>{
        console.log(`server started on port ${process.env.PORT}`)
    })
    io.on('connection',(socket) => {
        console.log('user connected');

        socket.on('joinRoom', (groupId) => {
            console.log('joining room:', groupId);
            socket.join(groupId);
        });
        
        socket.on('message', (msg) => {

            console.log('groupId :', msg.groupId);
            console.log('Received message:', msg.message);
            io.to(msg.groupId).emit('receivedMsg', msg);
        });
        
        socket.on('disconnect',()=>{
            console.log('user disconnected');
        });
    })

})
.catch(err => console.log(err))


