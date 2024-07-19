const {Router} = require('express');
const postsRouter = Router();
const postsController = require('../controllers/postsController');
const authenticateTokenAPI = require('../middleware/authenticateTokenAPI');

postsRouter.get('/get/all',postsController.getAllPosts);
postsRouter.get('/get/:id',postsController.getPost);
postsRouter.get('/author/:id',postsController.getByAuthor);
postsRouter.post('/add',authenticateTokenAPI,postsController.createPost);
postsRouter.put('/update/:id',authenticateTokenAPI,postsController.updatePost);
postsRouter.delete('/delete/:id',authenticateTokenAPI,postsController.deletePost);

module.exports = postsRouter;