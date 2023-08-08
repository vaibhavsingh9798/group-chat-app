const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const UserGroup = sequelize.define('usergroup',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    userId:{
        type:Sequelize.INTEGER
    },
    groupId:{
        type:Sequelize.INTEGER
    }
})

module.exports = UserGroup