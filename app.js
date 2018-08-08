var express = require("express");
var app = express();
var PORT = process.env.PORT || 8000;

var path = require("path")
var morgan = require("morgan");
var bodyParser = require("body-parser");

var mongoose = require("mongoose");

const session = require('express-session');
const cookieParser = require("cookie-parser")
const mongoStore = require("connect-mongo")(session)
const passport = require("passport");

var url = "mongodb://root:qwertyuiop09@ds115762.mlab.com:15762/erp"

mongoose.connect(url, { useNewUrlParser: true }, function(error){
    if(error) console.error("DB Error====>",error)
    else console.log(`MongoDB connected`)
})

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist/ERP')));


//session and flash middleware
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "qwertyuiop09",
    store: new mongoStore({url: url, autoReconnect: true})
}))

app.use(passport.initialize());
app.use(passport.session());

//global variables
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
})

var api = require("./routes/api")

app.use(api)

app.get("*", (req, res, callback) => {
    res.sendFile(path.join(__dirname, "dist/ERP/index.html"))
})

app.listen(PORT, function(){
    console.log(`Server started at PORT: ${PORT}`);
})