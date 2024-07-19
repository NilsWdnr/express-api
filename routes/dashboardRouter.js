const {Router} = require('express');
const dashboardRouter = Router();
const dashboardController = require('../controllers/dashboardController');

dashboardRouter.get('/',dashboardController.index);
dashboardRouter.get('/post/create',dashboardController.createPost);
dashboardRouter.post('/post/save',dashboardController.savePost);

module.exports = dashboardRouter;