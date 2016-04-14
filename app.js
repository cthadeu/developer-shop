/** @jsx React.DOM */
var React = require('react');
var DevelopersAvaiable = require("./components/Developers.react");

var element = document.getElementById('react-app');

React.renderComponent(
    <DevelopersAvaiable source='/developer' />, element
);
