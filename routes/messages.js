const express = require('express')
const messageController = require('../controllers/messages')
const userauthonticate = require('../middleware/auth')
const router = express.Router()

router.post('/',userauthonticate.authonticate,messageController.postMessage)

router.get('/:groupId',userauthonticate.authonticate,messageController.getMessage)

module.exports = router;