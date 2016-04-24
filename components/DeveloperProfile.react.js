/** @jsx React.DOM */
var React = require('react');
var Cart = require("./Cart.react");

module.exports = DeveloperProfile = React.createClass({
    getInitialState: function() {
        return {
            developer:{},
            skills:  "Loading..."
        };
    },

    componentDidMount: function () {
        $.get("/developer/"+this.props.developerLogin, function(result){
            if (this.isMounted()) {
                this.setState({developer: result});
                $.get("/developer/"+this.props.developerLogin+"/skills", function(result) {
                    this.setState({skills: result.join(", ")});
                }.bind(this));
            }
        }.bind(this));
    },

    openDetail: function(){
        React.renderComponent(
            <DeveloperDetail developer={this.state.developer} />,
            document.getElementById("developer-detail")
        )
    },

    addToCartClick: function(){
        $.publish('cart.added', this.state.developer);
        $("#react-container").ScrollTo();
    },

    render: function () {
        return (
             <div className='col-sm-6 col-md-4' >
                 <div className="thumbnail">
                     <img src={this.state.developer.photo} alt={this.state.developer.name}  />
                     <div className="caption text-center">
                         <h4><strong>{this.state.developer.name}</strong></h4>
                            <p className="skills-list">{this.state.skills}</p>
                            <div className="btn-group" role="group" >
                                <button type="button" className="btn btn-default"><strong className="text-info">$ {this.state.developer.price} / h</strong></button>
                                <button type="button" className="btn btn-primary" onClick={this.addToCartClick}>Buy <span className="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span></button>
                            </div>
                     </div>
                 </div>
            </div>
        )
    }
});