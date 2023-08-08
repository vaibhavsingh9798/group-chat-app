const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const userauthonticate = require('./middleware/auth')

const sequelize = require('./util/database')
const userRoutes = require('./routes/users')
const messageRoutes = require('./routes/messages')
const groupRoutes = require('./routes/group')

const Group = require('./models/group')
const User = require('./models/users')
const Message = require('./models/messages')
const UserGroup = require('./models/usergroup')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors({origin:'*'}))



app.use('/user',userRoutes)
app.use(userauthonticate.authonticate)
app.use('/message',messageRoutes)
app.use('/group',groupRoutes)

app.get('/',(req,res)=>{
    res.send('Home Page')
})

User.belongsToMany(Group,{through: 'UserGroup'})
Group.belongsToMany(User,{through: 'UserGroup'})

// msg group 1 m
Group.hasMany(Message)
Message.belongsTo(Group)

// user msg 1 m 

 User.hasMany(Message,{foreginKey:'userId'}) //
 Message.belongsTo(User)


sequelize.sync() //{force:true}
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server started on port ${process.env.PORT}`)
    })
})
.catch(err => console.log(err))
