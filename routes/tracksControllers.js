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
    add: function(req, res){
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        var link = req.body.link;
        console.log('Link : ' + link);
        if(link == null){            
            return res.status(400).json({'error':'missing parameters'});
        }

        console.log('----- Add link -----')
        console.log('userId : ' + userId    )
        console.log('--------------------')
        asyncLib.waterfall([
            function(done){
                models.User.findOne({
                    attributes: ['id'],
                    where: { id: userId }
                })
                .then(function(userFound){
                    console.log('Link : ' + link);
                    done(null, userFound);
                })
                .catch(function(err){
                    console.log(err)
                    return res.status(500).json({'error':'unable to verify user'});
                })
            },
            function(userFound, done){
                console.log('----- Parse link -----')
                console.table(parseYoutube(req.body.link));
                if(userFound){
                    var verifLink = parseYoutube(req.body.link);
                    var link = verifLink.id
                    var userId = userFound.id;
                    
                    if(verifLink.isOk == true){
                        models.Link.create({
                            link: link,
                            UserId: userId
                        }).then(function(newLink){
                            console.log('then2');
                            done(newLink);
                        }).catch(function(err){
                            console.log('error ' + err)
                        });
                    }else{
                        return res.status(403).json({'error':'not a youtube link'})
                    }
                }else{
                    return res.status(404).json({'error':'user not found + ' + err});
                }
            }
        ], function(newLink){
            if(newLink){
                return res.status(201).json(newLink);
            }else{
                return res.status(500).json({'error':'cannot add link'});
            }
        })
    },
    all: function(req, res){
        var fields = req.query.fields;
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var order = req.query.order;


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
              res.status(200).json(links);
            } else {
              res.status(404).json({ "error": "no links found" });
            }
          }).catch(function(err) {
            console.log(err);
            res.status(500).json({ "error": "invalid fields" });
          });
    },
    del: function(req, res){},
    report: function(req, res){},
    like: function(req, res){
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        var trackId = parseInt(req.params.trackId)

        if(trackId <= 0){
            return res.status(400).json({'error':'invalid parameters trackId'})
        }

        asyncLib.waterfall([
            function(done){
                models.Link.findOne({
                    where: { id: trackId }
                })
                .then(function(trackFound){
                    done(null, trackFound);
                })
                .catch(function(err){
                    return res.status(500).json({ 'error': 'unable to verify track' });
                });
            },
            function(trackFound, done){
                if(trackFound){
                    models.User.findOne({
                        where: { id: userId }
                    })
                    .then(function(userFound){
                        done(null, trackFound, userFound);
                    })
                    .catch(function(err){
                        return res.status(500).json({ 'error': 'unable to verify user' });
                    });
                }else{
                    return res.status(404).json({ 'error': 'track already liked' });
                }
            },
            function(trackFound, userFound, done){
                if(userFound){
                    models.Likes.findOne({
                        where: {
                            userId: userId,
                            linkId: trackId,
                        }
                    })
                    .then(function(userAlreadyLikeFound){
                        done(null, trackFound, userFound, userAlreadyLikeFound);
                    })
                    .catch(function(err){
                        return res.status(500).json({ 'error': 'unable to verify is user already liked' });
                    });
                }else{
                    res.status(404).json({ 'error': 'user not exist' });
                }
            },
            function(trackFound, userFound, userAlreadyLikeFound, done){
                if(!userAlreadyLikeFound){
                    models.Likes.create({
                        LinkId: trackFound.id,
                        UserId: userFound.id
                    })
                    .then(function(trackLiked){
                        done(trackLiked);
                    })
                    .catch(function(err){
                        console.log(err)
                        return res.status(500).json({ 'error': 'unable to set user reaction' });
                    });
                }else if(userAlreadyLikeFound){
                    models.Likes.destroy({
                        where : {
                            LinkId: trackFound.id,
                            UserId: userFound.id
                        }
                    })
                    .then(function(trackUnLiked){
                        done(trackUnLiked);
                    })
                    .catch(function(err){
                        return res.status(500).json({ 'error': 'unable to set user reaction' });
                    });
                }
            }
        ], function(trackLiked, trackUnLiked) {
            if (trackLiked) {
                return res.status(201).json(trackLiked);
            } else if (trackUnLiked){
                return res.status(201).json(trackUnLiked);
            } else {
                return res.status(500).json({ 'error': 'cannot update message' });
            }
          })
    },
    unlike: function(req, res){}
}