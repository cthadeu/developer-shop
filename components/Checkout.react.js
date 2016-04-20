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
        var discount;
        if (this.props.items != undefined) {
            items = this.props.items;
        }
        if (this.props.discount != undefined) {
            discount = (<li className="list-group-item">
                <div className="row">
                    <div className="col-sm-6 ">
                        <h4 className="text-danger">Discount</h4>
                    </div>
                    <div className="col-sm-6">
                        <h4 className="text-danger pull-right">- ${this.props.discount}</h4>
                    </div>
                </div>
            </li>);
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
                    <ul className="list-group">
                        {items.map(function(dev){
                            return(<CartItem dev={dev} edit={false} />)
                        })}
                        {discount}
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-sm-6 btn-group">
                                </div>
                                <div className="col-sm-6">
                                    <h4 className="pull-right text-info">
                                        Total: $ {this.props.total}
                                    </h4>
                                </div>
                            </div>
                        </li>
                    </ul>

                </div>

            </div>
        )
    }
});