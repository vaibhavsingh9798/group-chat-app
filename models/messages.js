const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Message = sequelize.define('message',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
       type:Sequelize.STRING,
       allowNull:false,
    },
    text:{
        type:Sequelize.STRING,
        allowNull:false,
        
    },
  
});

module.exports = Message
