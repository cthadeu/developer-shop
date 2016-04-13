/** @jsx React.DOM */
var React = require('react');

var initialState = JSON.parse(document.getElementById("initialState").innerHTML);

React.renderComponent(
    <Developers />,
    document.getElementById('react-app')
);
