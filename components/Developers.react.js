/** @jsx React.DOM */
var React = require('react');
var DeveloperProfile = require("./DeveloperProfile.react")

module.exports = DevelopersAvaiable = React.createClass({
    getInitialState: function() {
      return {items:[]};
    },

    componentDidMount: function () {
        $.get(this.props.source, function(result){
            if (this.isMounted()) {
                this.setState({items: result});
            }
        }.bind(this));
    },

    render: function () {
        var source = this.props.source;
        return (
            <div>
                {this.state.items.map(function(dev){
                    return <DeveloperProfile developerLogin={dev.login} source={source} />
                })}
            </div>
        )
    }
});