var express = require('express'),
    exphbs = require('express-handlebars'),
    http = require('http'),
    mongoose = require('mongoose'),
    routes = require('./routes');
    // config = require('./config'),
    // streamHandler = require('./utils/streamHandler');

var app = express();
var port = process.env.PORT || 8080

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine","handlebars");

app.get("/", routes.index);


var server = http.createServer(app).listen(port, function() {
    console.log('Listening on ' + port);
});
