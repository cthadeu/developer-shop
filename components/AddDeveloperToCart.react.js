/** @jsx React.DOM */
var React = require('react');

module.exports = AddDeveloperToCart = React.createClass({
    getInitialState: function() {
        return {};
    },

    componentDidMount: function () {
        console.log(this.props.developer);
        $.post("/cart", this.props.developer, function(data) {
            console.log(data);
        }.bind(this));
    },

    render: function () {
        //TODO:render cart component
        return (
            <div>

            </div>
        )
    }
});