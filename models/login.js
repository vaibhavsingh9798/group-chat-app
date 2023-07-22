const Sequelize = require('sequelize')
const sequelize = require('../util/database')

let Login = sequelize.define('login',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false,
    }
})

module.exports = Login 
