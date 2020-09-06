const mealsController = require('../controllers/meals.controller')
const verifyToken = require('../middleware/verifytoken')
const upload = require('../middleware/uploadPhotos')

const express = require('express');
const router = express.Router();
    //meals api 
    router.post('/', upload.single("mealImage"), mealsController.createMeal)
    router.get('/' , verifyToken ,mealsController.findAllMeals)
    router.delete('/:mealId', verifyToken,mealsController.deleteMeal)
    router.patch('/:mealId',verifyToken, mealsController.updateMeal)


module.exports = router