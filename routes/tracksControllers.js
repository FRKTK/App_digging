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

        asyncLib.waterfall([
            function(done){
                models.User.findOne({
                    attributes: ['id'],
                    where: { id: userId }
                })
                .then(function(userFound){
                    done(null, userFound);
                })
                .catch(function(err){
                    console.log(err)
                    return res.status(500).json({'error':'unable to verify user'});
                })
            },
            function(userFound, done){
                if(userFound){
                    var verifLink = parseYoutube(req.body.link);
                    var link = verifLink.id
                    var userId = userFound.id;
                    
                    if(verifLink.isOk == true){
                        models.Link.create({
                            link: link,
                            UserId: userId
                        }).then(function(newLink){
                            done(newLink);
                        }).catch(function(err){
                            console.log('error ' + err)
                        });
                    }else{
                        return res.status(403).json({'error':'not a youtube link'})
                    }
                }else{
                    return res.status(404).json({'error':'user not found '});
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
        console.log('----- FIELDS -----');
        console.log(fields)

        models.Link.findAll({
            // order: [(order != null) ? order.split(':') : ['title', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.User,
                attributes: [ 'username' ]
            }],
            where: { visible: 1 }
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
                // Problème à ce niveau, n'arrive pas à verifier LinkId (le rajoute à la field list alors qu'il y est pas)
                console.log('-----------------')
                console.log(req.params)
                models.Link.findOne({
                    attributes: ['id'],
                    where: { id: trackId }
                })
                .then(function(trackFound){
                    done(null, trackFound);
                })
                .catch(function(err){
                    console.log(err)
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
                        return res.status(500).json({ 'error': 'unable to verify is user already liked' + err});
                    });
                }else{
                    res.status(404).json({ 'error': 'user not exist' });
                }
            },
            function(trackFound, userFound, userAlreadyLikeFound, done){
                if(!userAlreadyLikeFound){
                    models.Likes.create({
                        LinkId: trackFound.id,
                        UserId: userFound.id,
                        liked: 1
                    })
                    .then(function(trackLiked){
                        done(trackLiked);
                    })
                    .catch(function(err){
                        return res.status(500).json({ 'error': 'unable to set user reaction' + err});
                    });
                }else if(userAlreadyLikeFound){
                    console.log(userAlreadyLikeFound.liked)
                    console.log('end stop')
                    if(userAlreadyLikeFound.liked == true){
                        //set liked to 0
                        userAlreadyLikeFound.update({
                            liked: 0,
                            where : {
                                LinkId: trackFound.id,
                                UserId: userFound.id
                            }
                        })
                        .then(function(trackUnLiked){
                            done(trackUnLiked);
                        })
                        .catch(function(err){
                            return res.status(500).json({ 'error': 'unable to set user reaction liked 0 ' + err});
                        });
                    }else{
                        //set liked to 1
                        userAlreadyLikeFound.update({
                            liked: 1,
                            where : {
                                LinkId: trackFound.id,
                                UserId: userFound.id
                            }
                        })
                        .then(function(trackUnLiked){
                            done(trackUnLiked);
                        })
                        .catch(function(err){
                            return res.status(500).json({ 'error': 'unable to set user reaction liked 1' + err});
                        });
                    }
                    
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
    unlike: function(req, res){},
    tag: function(req, res){
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        var trackId = parseInt(req.params.trackId)
        var tags = req.body.tags

        if(trackId < 0){
            return res.status(400).json({'error':'invalid parameters trackId'})
        }

        asyncLib.waterfall([
            function(done){
                models.User.findOne({
                    attributes: ['id'],
                    where: { id: userId }
                })
                .then(function(userFound){
                    done(null, userFound)
                })
                .catch(function(err){
                    return res.status(500).json({'error': 'unable to find user'})
                })
            },
            function(userFound, done){
                models.Link.findOne({
                    attributes: ['id'],
                    where: { id: trackId }
                })
                .then(function(trackFound){
                    done(null, userFound, trackFound);
                })
                .catch(function(err){
                    return res.status(500).json({ 'error': 'unable to verify track ' });
                });
            },
            function(userFound, trackFound, done){
                models.Tags.findOne({
                    attributes: ['linkId'],
                    where: { linkId: trackId }
                })
                .then(function(tagFound){
                    done(null, userFound, trackFound, tagFound);
                })
                .catch(function(err){
                    return res.status(500).json({ 'error': 'unable to verify track ' });
                });
            },
            function(userFound, trackFound, tagFound, done){
                if(!tagFound){
                    var newTags = models.Tags.create({
                        linkId: trackId,
                        tagName: tags
                    })
                    .then(function(newTags){
                        done(newTags);
                    })
                    .catch(function(err){
                        return res.status(500).json({ 'error': 'unable to add tags : ' + err  });
                    });
                }else{
                    return res.status(500).json({ 'error': 'Song already tagged'});
                }
                    
            }
        ], function(newTags) {
            if (newTags) {
                return res.status(201).json({
                    'tag Id ' : newTags.id,
                    'tags' : newTags.tagName
                });
            } else {
                return res.status(500).json({ 'error': 'cannot add tag' });
            }
          })
    },
    getTags: function(req, res){
        var trackId = parseInt(req.params.trackId)

        if(trackId <= 0){
            return res.status(400).json({'error':'invalid parameters trackId'})
        }

        asyncLib.waterfall([
            function(done){
                models.Link.findOne({
                    attributes: ['id'],
                    where: { id: trackId }
                })
                .then(function(trackFound){
                    done(null, trackFound);
                })
                .catch(function(err){
                    console.log(err)
                    return res.status(500).json({ 'error': 'unable to verify track' });
                });
            },
            function(trackFound, done){
                if(trackFound){
                    models.Tags.findOne({
                        attributes: ['id', 'linkId','tagName'],
                        where: {
                            linkId: trackId,
                        }
                    })
                    .then(function(tagsFound){
                        done(tagsFound);
                    })
                    .catch(function(err){
                        return res.status(500).json({ 'error': 'unable to verify is already tagged' + err});
                    });
                }else{
                    res.status(404).json({ 'error': 'user not exist' });
                }
            },
        ], function(tagsFound) {
            if (tagsFound) {
                return res.status(201).json(tagsFound);
            } else {
                return res.status(500).json({ 'error': 'cannot get tags' });
            }
          })
    },

}