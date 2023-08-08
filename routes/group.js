const express = require('express')
const route = express.Router()
const groupController = require('../controllers/group')

route.post('/create',groupController.createGroup) 

route.get('/all',groupController.getGroup)

module.exports = route;