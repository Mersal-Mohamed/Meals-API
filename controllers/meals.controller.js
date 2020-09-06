const Meal = require('../models/meals.model');
const path = require("path")
const url = require('url')
//add meal
exports.createMeal = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'you should send meal'
        })
    }

    let meal = new Meal({
        mealName: req.body.mealName,
        mealCategory: req.body.mealCategory,
        mealArea: req.body.mealArea,
        mealInstructions: req.body.mealInstructions,
        mealIngredients: req.body.mealIngredients.split("/"),
        mealImage: req.protocol + "://" + req.get('host')  + "/" + req.file.path.replace(/\\/g, "/").substring(7),
        mealYoutube: req.body.mealYoutube,
        mealSource: req.body.mealSource
    })

    meal.save()
        .then(meal => {
            res.status(200).json({
                message: "Meal Added succefully",
                meal
            })
        })
        .catch(err => {
            res.status(500).send({
                error: err.message
            })
        })

}



// Update Meal
exports.updateMeal = (req, res) => {

    Meal.findByIdAndUpdate({
            _id: req.params.mealId
        },{
            $set: {
                mealName: req.body.mealName,
                mealCategory: req.body.mealCategory,
                mealArea: req.body.mealArea,
                mealInstructions: req.body.mealInstructions,
                mealIngredients: req.body.mealIngredients,
                mealImage: req.body.mealImage,
                mealYoutube: req.body.mealYoutube,
                mealSource: req.body.mealSource
            }
        },
        {
            useFindAndModify: false 
        }

        )
        .then(result => {
            res.status(200).send({
                message: "Meal Updated succefully",
                
            })
        }).catch(err => {
            res.status(500).send({
                message: err.message,
            });
        })
}

// get all meals 
exports.findAllMeals = (req, res) => {
    Meal.find({}, {
            __v: 0
        })
        .then(meals => {
            res.status(200).send({meals})
        }).catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}

// Delete Meal 
exports.deleteMeal = (req, res) => {
    Meal.findByIdAndDelete({
            _id: req.params.mealId
        })
        .then(() => {
            res.status(200).send({
                message: " Meal Deleted Succefully"
            })
        })
        .catch(err => {
            res.status(500), send({
                message: err.message
            })
        })
}

