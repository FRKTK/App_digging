var express = require('express');
var userController = require('./routes/userController');
var tracksController = require('./routes/tracksControllers');
const adminControllers = require('./routes/adminControllers');

//router

exports.router = (function() {
    var apiRouter = express.Router();    

    //users routes
    apiRouter.route('/user/register/').post(userController.register);
    apiRouter.route('/user/login/').post(userController.login);
    apiRouter.route('/user/me/').get(userController.getUserProfile);
    apiRouter.route('/users/all/').get(userController.all);
    apiRouter.route('/user/updateMe/').put(userController.updateUserProfile);
    apiRouter.route('/user/getLikes/').get(userController.getUserLikes);
    apiRouter.route('/user/:trackId/isLike').get(userController.like);
    //Tracks routes
    apiRouter.route('/track/add/').post(tracksController.add);
    apiRouter.route('/track/').get(tracksController.all);
    apiRouter.route('/track/:trackId/like/').post(tracksController.like);
    apiRouter.route('/track/:trackId/tag/').post(tracksController.tag);
    apiRouter.route('/track/:trackId/tags').get(tracksController.getTags);
    apiRouter.route('/track/:trackId/report').post(tracksController.report);
    //Admins routes
    apiRouter.route('/admin/tracks').get(adminControllers.getTracks);
    apiRouter.route('/admin/users').get(adminControllers.getUsers);
    apiRouter.route('/admin/tracks/delete/:trackId').put(adminControllers.delTracks);
    apiRouter.route('/admin/tracks/visible/:trackId').put(adminControllers.visibleTracks);
    apiRouter.route('/admin/users/delete/:userId').put(adminControllers.delUsers);
    apiRouter.route('/admin/users/info/:userId').get(adminControllers.userInfo);
    //App routes
    return apiRouter;
})();
