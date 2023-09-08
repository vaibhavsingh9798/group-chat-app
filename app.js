const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
 const cron = require('node-cron')
const multer = require('multer')
const path = require('path')

const sequelize = require('./util/database')
const userRoutes = require('./routes/users')
const messageRoutes = require('./routes/messages')
const groupRoutes = require('./routes/group')
const groupFileRoutes = require('./routes/file')

const Group = require('./models/group')
const User = require('./models/users')
const Message = require('./models/messages')
const UserGroup = require('./models/usergroup')
const ArchivedChat = require('./models/archivedchat')

const cornShedule =  require('./services/removeoldchats')

const app = express()
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
    res.sendFile(path.join(__dirname,`public/${req.url}`))
})

User.belongsToMany(Group,{through: UserGroup})
Group.belongsToMany(User,{through: UserGroup})

Group.hasMany(Message)
Message.belongsTo(Group)

 User.hasMany(Message,{foreginKey:'userId'}) 
 Message.belongsTo(User)

sequelize.sync() //{force:true}
.then(()=>{
    app.listen(process.env.PORT)
})
.catch(err => console.error(err))

cornShedule();





