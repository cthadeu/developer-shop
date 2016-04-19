/** @jsx React.DOM */
var React = require('react');
var DevelopersAvaiable = require("./components/Developers.react");
var Cart = require("./components/Cart.react");

var element = document.getElementById('developers-painel');

React.renderComponent(<DevelopersAvaiable source='/developer' />, element);
React.renderComponent(<Cart  />, document.getElementById("cart-items"));
