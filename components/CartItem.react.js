/** @jsx React.DOM */
var React = require('react');

module.exports = CartItem = React.createClass({
    getInitialState: function() {
        return {};
    },


    render: function () {
        var items  = [];

        if(this.props.devs != null) {
            items = this.props.devs
        }
        
        if (items.length == 0) {
            return (<div>Nenhum item encontrado</div>);
        } else {
            return (
                <div>
                    {items.map(function(dev){
                        return (<div>{dev.name}</div>)
                    })}
                </div>
            )
        }

    }
});