var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');
var asyncLib = require('async');

function parseYoutube(link) {
    reg = /(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/;
    var found = link.match(reg)
    if (link.indexOf('youtu') > -1) {
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
    //TODO: Vérification si c'est un lien en youtube ou youtu.be. Séparer le lien pour en récupérer le videoID + MAJ BDD pour inclure cet objet
}

module.exports = {
    add: function(req, res){
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        var link = req.body.link;

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
                    return res.status(500).json({'error':'unable to verify user + ' + err});
                })
            },
            function(userFound, done){
                if(userFound){
                    var verifLink = parseYoutube(link);
                    if(verifLink.isOk == true){
                        var userId = userFound;
                        models.Link.create({
                            link: verifLink.id,
                            UserId: userFound.id
                        }).then(function(newLink){
                            console.log('then2');
                            done(newLink);
                        }).catch(function(err){
                            console.log(err)
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
    like: function(req, res){},
    unlike: function(req, res){}
}