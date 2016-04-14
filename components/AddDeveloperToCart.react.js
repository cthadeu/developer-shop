/** @jsx React.DOM */
var React = require('react');

module.exports = AddDeveloperToCart = React.createClass({
    getInitialState: function() {
        return {};
    },

    componentDidMount: function () {
        console.log(this.props.developer);
        var me = this;
        $.post("/cart", me.props.developer, function(data) {});
    },

    render: function () {
        //TODO:render cart component
        return (
            <div>

            </div>
        )
    }
});