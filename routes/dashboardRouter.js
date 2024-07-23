const {Router} = require('express');
const dashboardRouter = Router();
const dashboardController = require('../controllers/dashboardController');
const authenticateTokenBrowser = require('../middleware/authenticateTokenBrowser');

dashboardRouter.get('/login',dashboardController.login);
dashboardRouter.get('/',authenticateTokenBrowser,dashboardController.index);
dashboardRouter.get('/post/create',authenticateTokenBrowser,dashboardController.createPost);

dashboardRouter.post('/login/validate',dashboardController.validateLogin);
dashboardRouter.post('/post/save',authenticateTokenBrowser,dashboardController.savePost);

module.exports = dashboardRouter;