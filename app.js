const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const sequelize = require('./util/database')
const userRoutes = require('./routes/users')
const messageRoutes = require('./routes/messages')
// const User = require('./models/users')
 const Message = require('./models/messages')
const Login = require('./models/login')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(cors({origin:'*'}))


app.use('/user',userRoutes)
app.use('/message',messageRoutes)

app.get('/',(req,res)=>{
    res.send('Home Page')
})

// User.hasMany(Message)
// Message.belongsTo(User)

const cleanupAndClose = async () => {
    console.log('Performing cleanup before closing the app...');
    try {
      await Login.destroy({ truncate: true });
      await Message.destroy({truncate: true})
    } catch (err) {
      console.error('Error during cleanup:', err);
    } finally {
      process.exit(0); // Exit the app gracefully
    }
  };

// Listen for the termination events
process.on('SIGINT', cleanupAndClose);
process.on('SIGTERM', cleanupAndClose);

sequelize.sync() //{force:true}
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server started on port ${process.env.PORT}`)
    })
})
.catch(err => console.log(err))
