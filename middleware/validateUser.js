const Joi = require("joi")


//Sign up validation
const signUpSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    username: Joi.string()
        .alphanum()
        .min(3)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        .max(30)
        .required(),
        password: Joi.string().min(7).max(30).required() ,  
        confirmedPassword: Joi.string().required().valid(Joi.ref('password'))
    })


exports.validateSignUP = (req,res, next) => {
    let  value = signUpSchema.validate(req.body)
    
     if(value.error) {
         res.status(422).json({
             status: 'error',
             message: value.error.details[0].message,
          });
     } else {
         next()
     }
}

