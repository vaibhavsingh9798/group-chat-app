const express = require('express')
const route = express.Router()
const groupController = require('../controllers/group')

route.post('/create',groupController.createGroup) 

route.get('/all',groupController.getGroup)

route.get('/members/:groupId',groupController.getGroupMember)

route.post('/makeadmin',groupController.makeAdmin)

route.post('/dismissadmin',groupController.dismissAdmin)

route.post('/removemember',groupController.removeMember) 

route.post('/remove/:groupId')

module.exports = route;