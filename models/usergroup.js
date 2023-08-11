const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const UserGroup = sequelize.define('usergroup',{
    userId:{
        type:Sequelize.INTEGER
    },
    groupId:{
        type:Sequelize.INTEGER
    },
    isAdmin:{
        type:Sequelize.BOOLEAN
    }
})

module.exports = UserGroup