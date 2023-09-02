const express = require('express')
const fileController = require('../controllers/file')
const router = express.Router()


router.post('/:groupId',fileController.storeFile)

module.exports = router;

