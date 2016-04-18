/** @jsx React.DOM */
var React = require('react');
var CartItem = require("./CartItem.react");
var Popover = require("./Popover.react");

module.exports = Cart = React.createClass({
    getInitialState: function() {
        return {
            visible:true
        };
    },

    componentDidMount: function () {
        $.get("/cart-state", function(data){
            if (this.isMounted()) {
                console.log("DADOS SESSAO");
                console.log(data);
                this.setState({items:data.session.items});
                this.updateItems(data.session.items);
            }
        }.bind(this));
    },

    updateItems: function(items){
        React.renderComponent(
            <CartItem devs={items} />,
            document.getElementById("citems")
        );
    },

    handleClick: function(e){
        e.preventDefault();
        this.setState({visible: !this.state.visible});
    },


    render: function () {
        var items = [];
        if (this.props.items != null) {
            items = this.props.items;
        } else if (this.state.items != null) {
            items = this.state.items;
        }

        return (
                <a href="#" className="btn btn-block btn-danger" >
                    Cart {items.length}
                </a>

        )
    }
});