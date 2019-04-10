//server
const express = require("express");
const app = express();
const PORT = process.env.PORT || 49156;

//middlewares
const path = require("path")
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

//db
const mongoose = require("mongoose");

//session and cookie
const session = require('express-session');
const cookieParser = require("cookie-parser")
const mongoStore = require("connect-mongo")(session)
const passport = require("passport");


//db connection
// const url = "mongodb://root:qwertyuiop09@ds115762.mlab.com:15762/erp"

// mongoose.connect(url, { useNewUrlParser: true }, function(error){
//     if(error) console.error("DB Error====>",error);
//     else console.log(`MongoDB connected to url: ${url}`);
// })
const sqlConnection = require("./connection/sqlConnection");
const model = require("./models");

//morgan middleware
app.use(morgan("dev"));
app.use(cors());

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist/ERP')));
app.use(express.static(path.join(__dirname, '/public')));

//session and flash middleware
// app.use(cookieParser());
// app.use(session({
//     resave: true,
//     saveUninitialized: true,
//     secret: "qwertyuiop09",
//     store: new mongoStore({url: url, autoReconnect: true}),
//     cookie: {
//         expires: 600000
//     }
// }));


//global variables
// app.use((req, res, next) => {
//     if (req.cookies.user_id && !req.session.user) {
//         res.clearCookie('user_id');        
//     }
//     next();
// });

//Routes
const admin = require("./routes/admin");
const employee = require("./routes/employee")

app.use("/admin", admin);
app.use("/employee", employee);

sqlConnection();
model.model_index();

//server connection
app.listen(PORT, function(){
    console.log(`Server started at PORT: ${PORT}`);
});
