/** @jsx React.DOM */
var React = require('react');
var CartItem = require("./CartItem.react");
var Popover = require("./Popover.react");

module.exports = Cart = React.createClass({
    getInitialState: function() {

        $.subscribe('hour.increased', this.countTotal);
        $.subscribe('cart.added', this.addItem);

        return {
            total:0,
            items:[]
        };
    },

    countTotal: function(){
        var total = 0;
        this.state.items.forEach(function(item, index){
            total += item.price * item.baseHour;
        });
        this.setState({total:total});
    },

    addItem: function(e, item){
        this.state.items.push(item);
        this.countTotal();
        this.forceUpdate();
    },

    doCheckout: function(){

    },

    render: function () {
        return (
            <div className="list-group">
                <a href="#" className="list-group-item active">
                    Cart
                    <span className="badge ">{this.state.items.length}</span>
                </a>
                {this.state.items.map(function(dev){
                    return(<CartItem dev={dev} />)
                })}
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-sm-6">
                            <button className="btn btn-danger" onClick={this.doCheckout}>Checkout</button>
                        </div>
                        <div className="col-sm-6">
                            <h4 className="pull-right">Total: ${this.state.total}</h4>
                        </div>
                    </div>
                </li>
            </div>
        )
    }
});