var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');
var asyncLib = require('async');

//constantes
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PSWD_REGEX = /^(?=.*\d).{4,12}$/;

module.exports = {
    register: function(req, res){
        // params
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;

        if(email == null || username == null || password == null){
            return res.status(400).json({'error': 'missing parameters'});
        }

        //Verify
        if(username.length < 3 && username.length > 14){
            return res.status(400).json({'error':'wrong username (must be length 3 - 14)'})
        }

        if(!EMAIL_REGEX.test(email)){
            return res.status(400).json({'error':'This is not an email address'})
        }

        if(!PSWD_REGEX.test(password)){
            return res.status(400).json({'error':'Password must have 4-12 chracters (min 1 digit, 1 letter)'})
        }

        asyncLib.waterfall([
            function (done){
                models.User.findOne({
                    attributes: ['email'],
                    where: { email: email }
                })
                .then(function(userFound){
                    done(null, userFound);
                }).catch(function(err){
                    return res.status(500).json({'error': 'unable to verify user'});
                })
            },
            function(userFound, done){
                if(!userFound){
                    bcrypt.hash(password, 5, function(err, bcryptedPsw){
                        done(null, userFound, bcryptedPsw);
                    });
                } else {
                    return res.status(409).json({'error':'User already exist'});
                }
            },
            function(userFound, bcryptedPsw, done){
                var newUser = models.User.create({
                    email: email,
                    username: username,
                    password: bcryptedPsw,
                    isAdmin: 0
                })
                .then(function(newUser){
                    done(newUser);
                }).catch(function(err){
                    return res.status(500).json({'error':'cannot add user before last : '+ err});
                })
            }
        ], function(newUser){
            if(newUser){
                return res.status(201).json({'userId' : newUser.id });
            } else {
                return res.status(500).json({'error':'cannot add user'});
            }
        })
        
    },
    login: function(req, res){
        // Params
        var email = req.body.email;
        var password = req.body.password;

        if(email == null || password == null){            
            return res.status(400).json({'error':'missing parameters'});
        }

        asyncLib.waterfall([
            function(done){
                console.log(email + ' ' + password);
                models.User.findOne({
                    where: { email: email }
                })
                .then(function(userFound){
                    
                    done(null, userFound);
                })
                .catch(function(err){
                    return res.status(500).json({'error':'unable to verify user + ' + err});
                });
            },
            function(userFound, done){
                if(userFound){
                    bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt){
                        done(null, userFound, resBycrypt);
                    });
                } else {
                    return res.status(404).json({'error':'user not exist'});
                }
            },
            function(userFound, resBycrypt, done){
                if(resBycrypt){
                    done(userFound);
                } else {
                    return res.status(403).json({'error':'invalid password'});
                }
            }
        ], function(userFound){
            if(userFound){
                console.log('Userfound.id = ' + userFound.id);
                return res.status(201).json({
                    'token': jwtUtils.generateTokenForUser(userFound),
                    'user': userFound.id,
                    'isAdmin': userFound.isAdmin
                });
            } else {
                console.log('Error');
                return res.status(500).json({ 'error': 'cannot log on user' });
            }
        })
    },
    getUserProfile: function(req, res){
        var headerAuth = req.headers['authorization'];
        console.log(headerAuth);
        var userId = jwtUtils.getUserId(headerAuth);
        
        if(userId < 0)
            return res.status(400).json({'error':'User not logged'})

        models.User.findOne({
            attributes : ['id', 'email', 'username', 'isAdmin'],
            where : { id: userId }
        }).then(function(user){
            if(user){
                return res.status(201).json(user);
            } else {
                return res.status(404).json({'error':'user not found'});
            }
        }).catch(function(err){
            return res.status(500).json({'error':'cannot fetch user'});
        });
    },
    updateUserProfile: function(req, res){
       var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        var username = req.body.username;
       
        asyncLib.waterfall([
            function(done){
                
                models.User.findOne({
                    attributes: ['id', 'username'],
                    where: {id: userId}
                }).then(function(userFound){
                    done(null, userFound);
                    console.log('function 1 done ' + userFound.id);
                }).catch(function(err){
                    return res.status(500).json({'error':'unable to verify user'});
                });
            }, function(userFound, done){
                if(userFound){
                    console.log('function 2');
                    userFound.update({
                        username: (username ? username: userFound.username)
                    }).then(function(userFound){
                        userFound = userFound.username;
                        console.log('function 2 then '+ userFound);
                        done(userFound);
                    }).catch(function(err){
                        console.log(err);
                        res.status(500).json({'error':'cant update user'});
                    });
                } else {
                    res.status(404).json({'error':'User not found'});
                }
            }], 
            function(userFound){
                console.log('function 3 then '+ userFound);
                if(userFound){
                    return res.status(201).json(userFound);
                } else {
                    return res.status(500).json({'error':'cannot update user profile'});
                }
            }
        );
    },
    all: function(req, res){
        models.User.findAll({
            attributes: ['id', 'email', 'username']
        }).then(function(users){
            return res.status(201).json(users);
        }).catch(function(err){
            return res.status(500).json({'error':'cannot view users : ' + err });
        })
    },
    getUserLikes: function(req, res){
        var headerAuth = req.headers['authorization'];
        console.log(headerAuth);
        var userId = jwtUtils.getUserId(headerAuth);

        if(userId < 0)
            return res.status(400).json({'error':'User not logged'})
        
        console.log(userId)
        models.Likes.findAll({
            where : {
                userId : userId,
                liked: 1
            }
        }).then(function(likes){
            return res.status(201).json(likes)
        }).catch(function(err){
            return res.status(500).json({'error':'cannot get likes'});
        })
    },
    like: function(req, res) {
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var linkId = req.body.trackId
        if(userId < 0)
            return res.status(400).json({'error':'User not logged'})

        var isLiked = models.Likes.findOne({
            attributes: ['LinkId','UserId'],
            where: { UserId: userId, LinkId: linkId }
        })

        if (isLiked) {

        } else {
            models.Likes.create({
                UserId: 1,
                LinkId: 1
            })
            .then(function(like){
                return res.status(201).json(like)
            }).catch(function(err){
                return res.status(500).json({'error':'cannot add user before last : '+ err});
            })
        }
          
    }
}