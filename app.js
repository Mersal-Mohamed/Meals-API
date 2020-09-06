const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const logger = require("morgan");
const path = require('path')
const cors = require('cors');
const cookieParser = require('cookie-parser');
//to deal with process.env file
require('dotenv').config()

const exphbs  = require('express-handlebars');

//connecting to database
const db = require('./config/db.config')

//middle wares
app.use(logger("dev"));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


//Enable All CORS Requests 
app.use((req, res, next) => {
    let origin = req.headers.origin
    res.header("Access-Control-Allow-Origin", origin);
    res.header('Access-Control-Allow-Credentials', true);

    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Auhtorization",
    );
    if (req.method === "OPTIONS") {
        res.header("Acces-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({
           x : req.headers
        });
    }
    res.locals.origin = origin
    next();
});
app.use(cors({
    origin: true
}));


app.use(cookieParser());

// define routes 
const mealsRoutes = require("./routes/meals.route")
app.use("/meals", mealsRoutes)

const usersRoute = require('./routes/users.route')
app.use("/users", usersRoute)


//start server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
