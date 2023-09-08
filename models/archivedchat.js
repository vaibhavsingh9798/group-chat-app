const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const ArchivedChat = sequelize.define('archivedchat',{
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
    mediaUrl:{
        type : Sequelize.STRING 
    } 

})

module.exports = ArchivedChat