/** @jsx React.DOM */
var React = require('react');
var CartItem = require("./CartItem.react");
var Checkout = require("./Checkout.react");

module.exports = Cart = React.createClass({
    getInitialState: function() {

        $.subscribe('hour.increased', this.countTotal);
        $.subscribe('cart.added', this.addItem);
        $.subscribe("cart.removed", this.removeItem);

        return {
            total:0,        
            items:[],
            btnCheckoutDisabledState:true
        };
    },

    componentDidMount: function(){
        $.get("/cart", function(data){
           if (data.session.items != null) {
               this.setState({items:data.session.items});        
               this.countTotal();
               this.changeCheckoutButtonState();
               this.forceUpdate();
           }
        }.bind(this));
    },

    countTotal: function(){
        var total = 0;
        this.state.items.forEach(function(item, index){
            total += item.price * item.baseHour;
        });
        this.setState({total:total});
    },
    
    checkCupom: function(event) {
        $.ajax({
            type: "POST",
            url: "/cupom/check",
            data: {cupom:event.target.value},
            success: function(data){
                this.setState({
                    discountValue: parseFloat(data.discount),
                    discountInfo:"- $"+parseFloat(data.discount),
                    total:this.state.total - parseFloat(data.discount)
                });
            }.bind(this),
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(textStatus);
                this.countTotal();
                this.setState({
                    discountValue:0,
                    discountInfo:""
                });
            }.bind(this)
        });
    },

    updateCart: function(data){
        this.setState({items:data.session.items});
        this.countTotal();
        this.forceUpdate();
        this.changeCheckoutButtonState();
    },

    addItem: function(e, item){
        $.post("/cart", item, function(data){
            this.updateCart(data);
        }.bind(this));
    },

    removeItem: function(e, item) {
        $.post("/cart/remove", item, function(data){
            this.updateCart(data);
        }.bind(this));
    },

    changeCheckoutButtonState: function(){
        this.setState({btnCheckoutDisabledState:(this.state.items.length == 0)});
    },

    doCheckout: function(){
        $.post("/checkout", function(data){
           React.renderComponent(<Checkout items={data.session.items}  discount={data.session.discount} total={this.state.total} />, document.getElementById("react-container"));
        }.bind(this));
    },

    render: function () {

        return (
            <div className="list-group">
                <a href="#" className="list-group-item disabled">
                    Your Cart
                    <span className="badge ">{this.state.items.length}</span>
                </a>
                {this.state.items.map(function(dev){
                    return(<CartItem dev={dev} edit={true} />)
                })}
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-sm-6">
                            <input type="text" className="form-control" disabled={this.state.btnCheckoutDisabledState}  placeholder="Cupom" onChange={this.checkCupom} />
                        </div>
                        <div className="col-sm-6">
                            <h4 className="text-danger pull-right">{this.state.discountInfo}</h4>
                        </div>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-sm-6 btn-group">
                            <button className="btn btn-success" disabled={this.state.btnCheckoutDisabledState} onClick={this.doCheckout}>Checkout</button>
                        </div>
                        <div className="col-sm-6">        
                            <h4 className="pull-right text-info">
                                Total: $ {this.state.total}
                            </h4>
                        </div>
                    </div>
                </li>
            </div>
        )
    }
});