const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    
    const token = req.cookies.token  ;
    if (!token) {
        return res.status(401).send({
            auth: false,
            message: 'No token provided.'
        });
    } else {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log(err)
                return res.status(500).send({
                    auth: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                // if everything good, save to request for use in other routes
                req.token = decoded;
                next();
            }

        })
    }
}