/** @jsx React.DOM */
var React = require('react');

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

    openModal: function() {
        this.state.isModalOpen = true;
    },

    closeModal: function() {
        this.state.isModalOpen = false;
    }


    render: function () {
        return (
             <div className='col-md-2 dev-item wow fadeIn'>
                <img src={this.state.developer.photo} className="img-responsive img-circle" />
                {this.state.developer.name}
                 <p>${this.state.developer.price}</p>
                 <button className="btn btn-success">Add to Cart</button>
            </div>
        )
    }
});