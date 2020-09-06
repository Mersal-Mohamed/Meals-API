const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//user subscribe
 exports.createUser = async (req, res) => {

    User.find({
            email: req.body.email,
        })
        .then((result) => {
            if (result.length < 1) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).send({
                            message: err.message,
                        });
                    } else {
                        const user = new User({
                            username: req.body.username,
                            email: req.body.email,
                            password: hash,
                        });
                        user
                            .save()
                            .then((result) => {
                                res.status(201).send({
                                    message: "User Created Succefully",
                                    id: result._id
                                });
                            })
                            .catch((err) => {
                                res.status(500).send({
                                    message: err.message,
                                });
                            });
                    }
                });
            } else {
                res.status(406).send({
                    message: "User Already Creeated please use another email",
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message,
            });
        });
};

// user log in
exports.logIn = (req, res) => {
    User.findOne({
            email: req.body.email,
        })
        .then((user) => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                    .then((result) => {
                        if (result) {
                            const token = jwt.sign({
                                    email: user.email,
                                    username: user.username
                                },
                                process.env.JWT_SECRET_KEY, {
                                    expiresIn: "1d"
                                });
                            res.cookie('token', token, {
                                maxAge: 60 * 60 * 60,
                                // You can't access these tokens in the client's javascript
                                httpOnly: true,
                                // Forces to use https in production
                                secure: true,
                                sameSite: "none"
                            });
                            res.status(200).send({
                                message: "logged in successfully"
                            })
                        } else {
                            res.status(500).send({
                                message: "wrong password please try again",
                            });
                        }
                    });
            } else {
                res.status(404).json({
                    message: "user not found",
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message,
            });
        });
};

//delete user 
exports.deleteUser = (req, res) => {
    User.findByIdAndDelete({
            _id: req.params.userId
        })
        .then(done => {
            if (done) {
                res.status(200).send({
                    message: "User Removed Succefully"
                })
            } else {
                res.status(404).send({
                    message: "User not found"
                })
            }
        }).catch((err) => {
            res.status(500).send({
                message: err.message,
            });
        })
}

//Update User
exports.updateUser = (req, res) => {

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            res.status(500).send({
                message: err.message,
            });
        } else {

            const newUser = {
                username: req.body.username,
                email: req.body.email,
                password: hash,
            };

            User.findByIdAndUpdate({
                    _id: req.params.userId
                }, {
                    $set: {
                        username: newUser.username,
                        password: newUser.password,
                        email: newUser.email
                    }
                }, {
                    useFindAndModify: false
                })
                .then(result => {
                    res.status(200).send({
                        message: "Updated succefully",
                        newUser
                    })
                }).catch(err => {
                    res.status(500).send({
                        message: err.message,
                    });
                })

        }
    });

}


//Log out user

exports.logOut = (req, res) => {

    res.clearCookie("token");
    res.end()
}