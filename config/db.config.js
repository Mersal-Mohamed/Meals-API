const mongoose = require("mongoose");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@meals.q8f6h.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("connected successfully to database")
    })
    .catch(err => {
        console.log(err);
    })
