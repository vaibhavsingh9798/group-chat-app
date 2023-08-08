const express = require('express')
const userController = require('../controllers/users')
const router = express.Router();
const userauthonticate = require('../middleware/auth')

router.post('/signup',userController.createUser)


router.post('/login',userController.loginUser)

router.get('/loginUser',userauthonticate.authonticate,userController.allLoginUser)

router.get('/all',userController.allUser)


module.exports = router;
