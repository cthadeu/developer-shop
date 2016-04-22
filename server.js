var express = require('express'),
    exphbs = require('express-handlebars'),
    http = require('http'),
    mongoose = require('mongoose'),
    routes = require('./routes'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    microdb = require('nodejs-microdb');
   // config = require('./config'),

var app = express();
var port = process.env.PORT || 8080;
var urlencodedParser = bodyParser.urlencoded({ extended: false })



app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine","handlebars");
app.use(session({
    secret: 'Xask04klsddwkDslRoqwPerkiwepfjlcvnagjpasdçjargpajD'
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", routes.index);
app.get("/developer", routes.developers);
app.get("/developer/:username", routes.developerByUsername);
app.get("/cart", routes.cartFromSession);
app.post("/cart", routes.addDeveloperToCart);
app.post("/cart/update", routes.increaseHourFromDeveloper);
app.post("/cart/remove", routes.removeDeveloperFromCart);
app.post("/checkout", routes.checkout);
app.post("/cupom/check", routes.checkCupom);
app.use("/", express.static(__dirname + "/public/"));

var server = http.createServer(app).listen(port, function() {
    console.log('Listening on ' + port);
});

module.exports = server;