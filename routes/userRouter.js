const {Router} = require("express");
const userRouter = Router();
const userController = require('../controllers/userController');

//routes nicht case sensitive
// nach alternativen suchen statt alle routes hier
userRouter.get('/get/all',userController.getUsers);
userRouter.get('/get/:id',userController.getUser);
userRouter.post('/add',userController.createUser);
userRouter.post('/login',userController.loginUser);
userRouter.put('/update/:id',userController.updateUser);
userRouter.delete('/delete/:id',userController.deleteUser);

module.exports = userRouter;