/** @jsx React.DOM */
var React = require('react');
var DeveloperDetail = require("./DeveloperDetail.react");
var AddDeveloperToCart = require("./AddDeveloperToCart.react");

module.exports = DeveloperProfile = React.createClass({
    getInitialState: function() {
        return {
            developer:{},
            isModalOpen: false
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

    addToCartClick: function(){
        $.post("/cart", this.state.developer, function(data) {
            console.log(data);
        }.bind(this));
    },

    render: function () {
        return (
             <div className='col-md-2 dev-item wow fadeIn' >
                <img src={this.state.developer.photo} className="img-responsive img-circle"  onClick={this.handleClick} />
                {this.state.developer.name}
                 <p>${this.state.developer.price}</p>
                 <button className="btn btn-success" type="button" onClick={this.addToCartClick}>Add to Cart</button>
            </div>
        )
    }
});