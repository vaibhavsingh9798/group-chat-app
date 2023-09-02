const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const groupFile = sequelize.define('groupfile',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true   
    },
    url:{
        type:Sequelize.STRING
    }
})
              
module.exports = groupFile