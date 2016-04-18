var Organization = require("./models/organization");
var Developer = require("./models/developer");
var JSX = require('node-jsx').install();
var React = require('react');
var Cart = require("./models/cart");

var sess;

module.exports = {
    index: function(req, res) {
        res.render("home",{});
    },

    developers: function (req, res) {
        var org = new Organization("vtex");
        org.listMembers(function (data) {
            res.send(data);
        })
    },

    developerByUsername: function(req, res) {
        var dev = new Developer();
        dev.findByUsername(req.param("username"), function(data){
           res.send(data);
        });
    },

    addDeveloperToCart: function(req, res) {
        cart = new Cart(req.session);
        cart.addDeveloper(req.body);
        res.send(cart);
    },

    cartFromSession: function(req, res) {
        cart = new Cart(req.session);
        console.log("RECARREGANDO CARRINHO");
        console.log(cart);
        res.send(cart);
    }


}
