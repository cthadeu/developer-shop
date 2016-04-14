var express = require('express'),
    exphbs = require('express-handlebars'),
    http = require('http'),
    mongoose = require('mongoose'),
    routes = require('./routes'),
    bodyParser = require('body-parser');
    // config = require('./config'),
    // streamHandler = require('./utils/streamHandler');

var app = express();
var port = process.env.PORT || 8080;
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine","handlebars");

app.get("/", routes.index);
app.get("/developer", routes.developers);
app.get("/developer/:username", routes.developerByUsername);
app.use("/", urlencodedParser, express.static(__dirname + "/public/"));

app.post("/cart", routes.addDeveloperToCart);

var server = http.createServer(app).listen(port, function() {
    console.log('Listening on ' + port);
});
