/** @jsx React.DOM */
var React = require('react');
var DeveloperDetail = require("./DeveloperDetail.react");
var Cart = require("./Cart.react");

module.exports = DeveloperProfile = React.createClass({
    getInitialState: function() {
        return {
            developer:{},
        };
    },

    componentDidMount: function () {
        $.get("/developer/"+this.props.developerLogin, function(result){
            if (this.isMounted()) {
                this.setState({developer: result});
            }
        }.bind(this));
    },

    handleClick: function(){
        React.renderComponent(
            <DeveloperDetail developer={this.state.developer} />,
            document.getElementById("developer-detail")
        )
    },

    updateCart: function(items) {
        console.log("recarregando carrinho");
        React.renderComponent(<Cart items={items} />, document.getElementById("cart-items"));
    },

    addToCartClick: function(){
        $.post("/cart", this.state.developer, function(data) {
            this.updateCart(data.session.items);
        }.bind(this));
    },

    render: function () {
        return (
             <div className='col-sm-6 col-md-4' >
                 <div className="thumbnail">
                     <img src={this.state.developer.photo} alt={this.state.developer.name}/>
                     <div className="caption">
                         <h3>{this.state.developer.name}</h3>
                         <p>${this.state.developer.price}</p>
                         <button className="btn btn-success" type="button" onClick={this.addToCartClick}>Add to Cart</button>
                     </div>
                 </div>
            </div>
        )
    }
});