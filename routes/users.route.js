const userController = require('../controllers/users.controller');
const userValidate = require("../middleware/validateUser");
const verifyToken = require('../middleware/verifytoken');
const express = require('express');
const router = express.Router();

    //user api 
    router.post('/signup', userValidate.validateSignUP , userController.createUser)
    router.post('/login', userController.logIn)
    router.delete('/:userId', verifyToken,userController.deleteUser)
    router.patch('/:userId', verifyToken,userController.updateUser)
    router.all('/logout',verifyToken, userController.logOut)


module.exports = router;
