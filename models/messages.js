const Sequelize = require('sequelize')
const sequelize = require('../util/database')

let Message = sequelize.define('message',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    text:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    senderId:{
        type:Sequelize.INTEGER,
        
    },
    reciverId:{
        type:Sequelize.INTEGER,
    }
})

module.exports = Message;