const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const sequelize = require('./util/database')
const userRoutes = require('./routes/users')
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/user',userRoutes)

app.get('/',(req,res)=>{
    res.send('Home Page')
})

sequelize.sync()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server started on port ${process.env.PORT}`)
    })
})
.catch(err => console.log(err))
