const {Router} = require('express');
const dashboardRouter = Router();
const dashboardController = require('../controllers/dashboardController');
const authenticateTokenBrowser = require('../middleware/authenticateTokenBrowser');

dashboardRouter.get('/',authenticateTokenBrowser,dashboardController.index);
dashboardRouter.get('/login',dashboardController.login);
dashboardRouter.get('/post/create',authenticateTokenBrowser,dashboardController.createPost);
dashboardRouter.post('/post/save',authenticateTokenBrowser,dashboardController.savePost);

module.exports = dashboardRouter;