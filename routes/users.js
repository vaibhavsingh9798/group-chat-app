const express = require('express')
const userController = require('../controllers/users')
const router = express.Router();

router.post('/signup',userController.createUser)

module.exports = router;
