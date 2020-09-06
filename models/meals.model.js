const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealSchema  = new Schema({
    mealName:{
        type: String,
        required: true
    },
    mealCategory:{
        type: String,
        required: true
    },
    mealArea:{
        type: String,
        required: true
    },
    mealInstructions:{
        type: String,
        required: true
    },
    mealIngredients:{
        type: Array,
        required: true
    },
    mealImage:{
        type: String,
        required: true
    },
    mealYoutube:{
        type: String,
        required: true
    },
    //mealSource: String // we can add in the future ان شاء الله 
})

module.exports = mongoose.model('Meal', mealSchema)