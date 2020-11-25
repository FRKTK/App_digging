var express = require('express');
var userController = require('./routes/userController');
var tracksController = require('./routes/tracksControllers');

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
    //Tracks routes
    apiRouter.route('/track/add/').post(tracksController.add);
    apiRouter.route('/track/').get(tracksController.all);
    apiRouter.route('/track/:trackId/like/').post(tracksController.like);
    //App routes
    return apiRouter;
})();
