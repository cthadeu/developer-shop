var Organization = require("./models/organization");
var Developer = require("./models/developer");
var JSX = require('node-jsx').install();
var React = require('react');
var Cart = require("./models/cart");


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

    checkout: function(req, res) {
        cart = new Cart(req.session);
        req.session.destroy(function(err) {
            console.log(err);
        });
        res.send(cart);
    },

    checkCupom: function(req, res) {
        cart = new Cart(req.session);
        if (req.body.cupom == "SHIPIT") {
            cart.addDiscount(10);
            res.send({discount:cart.discount});
        } else {
            res.sendStatus(400);
        }
    },

    cartFromSession: function(req, res) {
        cart = new Cart(req.session);
        res.send(cart);
    },

    increaseHourFromDeveloper: function(req, res) {
        cart = new Cart(req.session);
        cart.updateItem(JSON.parse(req.body.dev));
        console.log(cart.session.items);
        res.send(cart);
    }

}
