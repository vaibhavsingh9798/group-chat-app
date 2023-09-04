const express = require('express')
const fileController = require('../controllers/file')
const userauthentication = require('../middleware/auth')
const router = express.Router()


router.post('/:groupId',userauthentication.authonticate,fileController.storeFile)

module.exports = router;

