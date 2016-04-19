/** @jsx React.DOM */
var React = require('react');
var CartItem = require("./CartItem.react");

module.exports = Checkout = React.createClass({
    getInitialState: function() {
        return {
            total:0
        };
    },

    render: function () {
        var items = [];
        if (this.props.items != undefined) {
            items = this.props.items;
        }
        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3 text-center">
                    <h1 className="text-success">Success</h1>
                    <h3 className="text-muted">Your order has been submitted</h3>
                </div>
                <hr />
                <div className="col-md-6 col-md-offset-3">
                    <h4>Order Resume</h4>
                    <div className="list-group">
                        {items.map(function(dev){
                            return(<CartItem dev={dev} edit={false} />)
                        })}
                    </div>
                </div>

            </div>
        )
    }
});