/** @jsx React.DOM */
var React = require('react');

module.exports = DeveloperDetail = React.createClass({
    getInitialState: function() {
       return {}
    },

    render: function () {
        console.log(this.props.developer)
        return (
            <div className="row">
                <div className="col-md-4">
                    <img src={this.props.developer.photo} className="img-circle" />
                </div>
                <div className="col-md-7">
                    <h3>{this.props.developer.name}</h3>
                </div>
            </div>
        )
    }
});