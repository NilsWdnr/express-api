const {Router} = require("express");
const userRouter = Router();
const userController = require('../controllers/userController');
const authenticateTokenAPI = require('../middleware/authenticateTokenAPI');

userRouter.get('/get/all',authenticateTokenAPI,userController.getUsers);
userRouter.get('/get/:id',authenticateTokenAPI,userController.getUser);
userRouter.post('/add',authenticateTokenAPI,userController.createUser);
userRouter.post('/login',userController.loginUser);
userRouter.put('/update/:id',authenticateTokenAPI,userController.updateUser);
userRouter.delete('/delete/:id',authenticateTokenAPI,userController.deleteUser);

module.exports = userRouter;