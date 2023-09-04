const express = require('express')
const route = express.Router()
const groupController = require('../controllers/group')
const userauthentication = require('../middleware/auth')

route.post('/create',userauthentication.authonticate,groupController.createGroup) 

route.get('/all',userauthentication.authonticate,groupController.getGroup)

route.get('/members/:groupId',userauthentication.authonticate,groupController.getGroupMember)

route.post('/makeadmin',userauthentication.authonticate,groupController.makeAdmin)

route.post('/dismissadmin',userauthentication.authonticate,groupController.dismissAdmin)

route.post('/removemember',userauthentication.authonticate,groupController.removeMember) 

module.exports = route;