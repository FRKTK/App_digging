var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');
var asyncLib = require('async');


function parseYoutube(link) {
    var reg = /(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
    var found = link.match(reg);
    console.log('----- Found regex -----')
    console.log(found)
    if (found.indexOf('youtu.be') > -1 || found.indexOf('youtube.com')) {
        var type = 'youtube';
        var videoId = found[6];
        var goodLink = true; 
    }else{
        var goodLink = false;
    }
    return {
        isOk: goodLink,
        type: type,
        id: videoId
    };
}

module.exports = {
    getTracks: function(req, res){
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        var fields = req.query.fields;
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var order = req.query.order;

        asyncLib.waterfall([
            function(done){
                // Vérification si user est Admin
                console.log('admin/tracks ' + userId)
                models.User.findOne({
                    attributes: ['id', 'isAdmin'],
                    where: { id: userId }
                })
                .then((userFound) => done(userFound))
                .catch((err) => res.status(500).json({ 'error': 'unable to verify user - error : ' + err }));
            },
        ], function(userFound){
            console.log(userFound.isAdmin)
                if(userFound){
                    var isAdmin = userFound.isAdmin
                    console.log(isAdmin)
                    if(isAdmin == true){
                        models.Link.findAll({
                            // order: [(order != null) ? order.split(':') : ['title', 'ASC']],
                            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
                            limit: (!isNaN(limit)) ? limit : null,
                            offset: (!isNaN(offset)) ? offset : null,
                            include: [{
                                model: models.User,
                                attributes: [ 'username' ]
                            }]
                        }).then(function(links) {
                            if (links) {
                              return res.status(200).json(links);
                            } else {
                              res.status(404).json({ "error": "no links found" });
                            }
                          }).catch(function(err) {
                              console.log('----- ERROR ----')
                            console.log(err);
                            res.status(500).json({ "error": "invalid fields" });
                          });
                    }else{
                        return res.status(500).json({'error': 'User is not admin'})
                    }
                }
            }
        )
        
    },
    getUsers: function(req, res){
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        asyncLib.waterfall([
            function(done){
                // Vérification si user est Admin
                models.User.findOne({
                    attributes: ['id', 'isAdmin'],
                    where: { id: userId }
                })
                .then((userFound) => done(userFound))
                .catch((err) => res.status(500).json({ 'error': 'unable to verify user - error : ' + err }));
            },
        ], function(userFound){
                if(userFound){
                    var isAdmin = userFound.isAdmin
                    if(isAdmin == true){
                        models.User.findAll({
                            // order: [(order != null) ? order.split(':') : ['title', 'ASC']],
                        attributes: ['id', 'email', 'username', 'isAdmin', 'createdAt', 'updatedAt', 'deleted']
                        }).then(function(users) {
                            if (users) {
                              return res.status(200).json(users);
                            } else {
                              res.status(404).json({ "error": "no links found" });
                            }
                          }).catch(function(err) {
                              console.log('----- ERROR ----')
                            console.log(err);
                            res.status(500).json({ "error": "invalid fields" });
                          });
                    }else{
                        return res.status(500).json({'error': 'User is not admin'})
                    }
                }
            }
        )
    },
    delTracks: function(req,res){
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var trackId = parseInt(req.params.trackId)
        
        asyncLib.waterfall([
            function(done){
                // Vérification si user est Admin
                models.User.findOne({
                    attributes: ['id', 'isAdmin'],
                    where: { id: userId }
                })
                .then((userFound) => done(null, userFound))
                .catch((err) => res.status(500).json({ 'error': 'unable to verify user - error : ' + err }));
            },
            function(userFound, done){
                if(userFound){
                    var isAdmin = userFound.isAdmin
                    if(isAdmin == true){
                        models.Link.findOne({
                            where: { id: trackId },
                        }).then(function(trackFound) {
                            if (trackFound) {
                                console.log('----- TRACKFOUND -----')
                                console.log(trackFound)
                                done(null, trackFound);
                            } else {
                              res.status(404).json({ "error": "no link found" });
                            }
                          }).catch(function(err) {
                              console.log('----- ERROR ----')
                            console.log(err);
                            res.status(500).json({ "error": "invalid fields" });
                          });
                    }else{
                        return res.status(500).json({'error': 'User is not admin' + err })
                    }
                }
            },
            function(trackFound, done){
                console.log('into trackfound')
                trackFound.update({
                    where: { id: trackId },
                    visible: 0
                }).then((linkDeleted) => 
                    done(linkDeleted)
                )
                .catch((err) => 
                res.status(500).json({ "error": "cannot delete track" + err})
                )
            }],
            function(linkDeleted){
                if(linkDeleted){
                    return res.status(201).json({'success': 'TrackId ' + trackId + ' deleted' })
                }else{
                    return res.status(500).json({ "error": "cannot delete track" })
                }
            }
        )
    },
    visibleTracks: function(req,res){
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var trackId = parseInt(req.params.trackId)
        
        asyncLib.waterfall([
            function(done){
                // Vérification si user est Admin
                models.User.findOne({
                    attributes: ['id', 'isAdmin'],
                    where: { id: userId }
                })
                .then((userFound) => done(null, userFound))
                .catch((err) => res.status(500).json({ 'error': 'unable to verify user - error : ' + err }));
            },
            function(userFound, done){
                if(userFound){
                    var isAdmin = userFound.isAdmin
                    if(isAdmin == true){
                        models.Link.findOne({
                            where: { id: trackId },
                        }).then(function(trackFound) {
                            if (trackFound) {
                                console.log('----- TRACKFOUND -----')
                                console.log(trackFound)
                                done(null, trackFound);
                            } else {
                              res.status(404).json({ "error": "no link found" });
                            }
                          }).catch(function(err) {
                              console.log('----- ERROR ----')
                            console.log(err);
                            res.status(500).json({ "error": "invalid fields" });
                          });
                    }else{
                        return res.status(500).json({'error': 'User is not admin' + err })
                    }
                }
            },
            function(trackFound, done){
                console.log('into trackfound')
                trackFound.update({
                    where: { id: trackId },
                    visible: 1
                }).then((linkDeleted) => 
                    done(linkDeleted)
                )
                .catch((err) => 
                res.status(500).json({ "error": "cannot delete track" + err})
                )
            }],
            function(linkDeleted){
                if(linkDeleted){
                    return res.status(201).json({'success': 'TrackId ' + trackId + ' deleted' })
                }else{
                    return res.status(500).json({ "error": "cannot delete track" })
                }
            }
        )
    },
    delUsers: function(req, res){
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var userIdToDelete = parseInt(req.params.userId)
        
        asyncLib.waterfall([
            function(done){
                // Vérification si user est Admin
                models.User.findOne({
                    attributes: ['id', 'isAdmin'],
                    where: { id: userId }
                })
                .then((userFound) => done(null, userFound))
                .catch((err) => res.status(500).json({ 'error': 'unable to verify user : ' + err }));
            },
            function(userFound, done){
                if(userFound){
                    var isAdmin = userFound.isAdmin
                    if(isAdmin == true){
                        models.User.findOne({
                            where: { id: userIdToDelete },
                        }).then(function(deleteUserFound) {
                            if (deleteUserFound) {
                              done(null, deleteUserFound);
                            } else {
                              res.status(404).json({ "error": "no link found" });
                            }
                          }).catch(function(err) {
                              console.log('----- ERROR ----')
                            console.log(err);
                            res.status(500).json({ "error": "invalid fields" });
                          });
                    }else{
                        return res.status(500).json({'error': 'User is not admin'})
                    }
                }
            },
            function(deleteUserFound, done){
                deleteUserFound.update({
                    where: { id: userIdToDelete },
                    deleted: 1
                }).then((userDeleted) => done(userDeleted))
                .catch((err) => res.status(500).json({ "error": "cannot delete user" }))
            }],
            function(userDeleted){
                if(userDeleted){
                    return res.status(201).json({'success': 'UserId ' + userIdToDelete + ' deleted' })
                }else{
                    return res.status(500).json({ "error": "cannot delete track" })
                }
            }
        )
    },
    activeUsers: function(req, res){
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var userIdToActive = parseInt(req.params.userId)
        
        asyncLib.waterfall([
            function(done){
                // Vérification si user est Admin
                models.User.findOne({
                    attributes: ['id', 'isAdmin'],
                    where: { id: userId }
                })
                .then((userFound) => done(null, userFound))
                .catch((err) => res.status(500).json({ 'error': 'unable to verify user : ' + err }));
            },
            function(userFound, done){
                if(userFound){
                    var isAdmin = userFound.isAdmin
                    if(isAdmin == true){
                        models.User.findOne({
                            where: { id: userIdToActive },
                        }).then(function(deleteUserFound) {
                            if (deleteUserFound) {
                              done(null, deleteUserFound);
                            } else {
                              res.status(404).json({ "error": "no link found" });
                            }
                          }).catch(function(err) {
                              console.log('----- ERROR ----')
                            console.log(err);
                            res.status(500).json({ "error": "invalid fields" });
                          });
                    }else{
                        return res.status(500).json({'error': 'User is not admin'})
                    }
                }
            },
            function(deleteUserFound, done){
                deleteUserFound.update({
                    where: { id: userIdToActive },
                    deleted: 0
                }).then((userActivated) => done(userActivated))
                .catch((err) => res.status(500).json({ "error": "cannot delete user" }))
            }],
            function(userActivated){
                if(userActivated){
                    return res.status(201).json({'success': 'UserId ' + userIdToActive + ' deleted' })
                }else{
                    return res.status(500).json({ "error": "cannot delete track" })
                }
            }
        )
    },
    userInfo: function(req, res){
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var userInfoId = parseInt(req.params.userId)

        asyncLib.waterfall([
            function(done){
                // Vérification si user est Admin
                models.User.findOne({
                    attributes: ['id', 'isAdmin'],
                    where: { id: userId }
                })
                .then((userFound) => done(null, userFound))
                .catch((err) => res.status(500).json({ 'error': 'unable to verify user - error : ' + err }));
            },
            function(userFound, done){
                if(userFound){
                    var isAdmin = userFound.isAdmin
                    if(isAdmin == true){
                        models.User.findOne({
                            attributes: [ 'id', 'username', 'email','isAdmin', 'createdAt', 'updatedAt', 'deleted'],
                            where: { id: userInfoId },
                            include: [
                                {
                                    model: models.Likes,
                                    where: { userId: userInfoId },
                                    required: false
                                },
                                {
                                    model: models.Link,
                                    required: false,
                                    where: { userId: userInfoId },
                                    // include: [
                                    //     {
                                    //         model: models.Tags,
                                    //         where: { linkId: models.Link.id},
                                    //         required: false,
                                    //         right: true
                                    //     }
                                    // ]
                                }
                            ]
                        }).then(function(userInfoFound) {
                            if (userInfoFound) {
                                done(userInfoFound);
                            } else {
                                console.log('ERROR 404')
                              res.status(404).json({ "error": "no user found" });
                            }
                          }).catch(function(err) {
                              console.log('----- ERROR ----')
                            console.log(err);
                            res.status(500).json({ "error": "invalid fields" });
                          });
                    }else{
                        return res.status(500).json({'error': 'User is not admin'})
                    }
                }
            }],
            function(userInfoFound){
                if(userInfoFound){
                    return res.status(201).json({ userInfoFound })
                }else{
                    return res.status(500).json({ "error": "cannot delete track" })
                }
            }
        )
    },
    getAllReported: function(req, res){
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        asyncLib.waterfall([
            function(done){
                models.User.findOne({
                    attributes: ['id', 'isAdmin'],
                    where: { id: userId }
                })
                .then((userFound) => done(userFound))
                .catch((err) => res.status(500).json({ 'error': 'unable to verify user - error : ' + err }));
            },
        ], function(userFound){
                if(userFound){
                    var isAdmin = userFound.isAdmin
                    console.log(isAdmin)
                    if(isAdmin == true){
                        models.Report.findAll({
                            attributes: ['id', 'userId', 'linkId', 'message', 'treated', 'createdAt'],
                        }).then(function(links) {
                            if (links) {
                              return res.status(200).json(links);
                            } else {
                              res.status(404).json({ "error": "no links found" });
                            }
                          }).catch(function(err) {
                              console.log(err)
                            res.status(500).json({ "error": "invalid fields" });
                          });
                    }else{
                        return res.status(500).json({'error': 'User is not admin'})
                    }
                }
            }
        )
    },
    treatReport: function(req, res){
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        var reportId = parseInt(req.params.reportId)

        asyncLib.waterfall([
            function(done){
                models.User.findOne({
                    attributes: ['id', 'isAdmin'],
                    where: { id: userId }
                })
                .then((userFound) => done(null, userFound))
                .catch((err) => res.status(500).json({ 'error': 'unable to verify user - error : ' + err }));
            },
            function(userFound, done){
                if(userFound){
                    var isAdmin = userFound.isAdmin
                    if(isAdmin == true){
                        console.log(reportId)
                        models.Report.findOne({
                            where: { id: reportId }
                        })
                        .then((reportFound) => done(null, reportFound))
                        .catch((err) => console.log('----- ERROR -----', err))
                    }else{
                        return res.status(500).json({'error': 'User is not admin'})
                    }
                }
            },
            function(reportFound, done){
                if(reportFound){
                    reportFound.update({
                        where: { id: reportId },
                        treated: 1,
                    })
                    .then((treated) => done(treated))
                    .catch((err) => console.log('----- ERROR -----', err))
                }else{
                    return res.status(500).json({'error': 'Cannot be treated'})
                }
            }
        ], function(treated){
                if(treated){
                    return res.status(201).json({ 'treated': treated })
                } else {
                    return res.status(500).json({ "error": "cannot treat track" })
                }
            }
        )
    }
    
}