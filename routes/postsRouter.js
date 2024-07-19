const {Router} = require('express');
const postsRouter = Router();
const postsController = require('../controllers/postsController');
const authenticateToken = require('../middleware/authenticateToken');

postsRouter.get('/get/all',postsController.getAllPosts);
postsRouter.get('/get/:id',postsController.getPost);
postsRouter.get('/author/:id',postsController.getByAuthor);
postsRouter.post('/add',authenticateToken,postsController.createPost);
postsRouter.put('/update/:id',authenticateToken,postsController.updatePost);
postsRouter.delete('/delete/:id',authenticateToken,postsController.deletePost);

module.exports = postsRouter;