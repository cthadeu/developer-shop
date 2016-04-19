/** @jsx React.DOM */
var React = require('react');
var CartItem = require("./CartItem.react");
var Checkout = require("./Checkout.react");

module.exports = Cart = React.createClass({
    getInitialState: function() {
        $.subscribe('hour.increased', this.countTotal);
        $.subscribe('cart.added', this.addItem);

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
        $.post("/cupom/check", {cupom:event.target.value}, function(data){
            console.log(data);
            if (data != null) {
                this.setState({discountValue: data, discountInfo:"- $"+data});
                var newTotal = this.state.total - data;
                this.setState({total:newTotal});
                this.forceUpdate();
            }
        }.bind(this));
    },

    addItem: function(e, item){
        $.post("/cart", item, function(data){
            this.setState({items:data.session.items});
            this.countTotal();
            this.changeCheckoutButtonState();
            this.forceUpdate();
        }.bind(this));
    },


    changeCheckoutButtonState: function(){
        if (this.state.items.length > 0) {
            this.setState({btnCheckoutDisabledState:false});
        }
    },

    doCheckout: function(){
        $.post("/checkout", JSON.stringify(this.state.items), function(data){
           React.renderComponent(<Checkout items={data.session.items}  />, document.getElementById("react-container"));
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
                            <input type="text" className="form-control"  placeholder="Cupom" onChange={this.checkCupom} />
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