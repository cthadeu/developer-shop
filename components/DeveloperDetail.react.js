/** @jsx React.DOM */
var React = require('react');

module.exports = DeveloperDetail = React.createClass({
    getInitialState: function() {
       return {
           modalID: "modalDeveloperDetail_" + this.props.developer.id
       }
    },

    componentDidMount: function(){
        if (this.isMounted()) {
            alert(this.state.modalID);
            $("#" + this.state.modalID).modal("toggle");
        }
    },

    close: function() {
        $("#"+this.state.modalID).modal("toggle");
        $("#"+this.state.modalID).on("hide.bs.modal", function(e) {
            $("#"+this.state.modalID).remove();
        });
    },

    addToCartClick: function(){
        $.publish('cart.added', this.state.developer);
        $("#react-container").ScrollTo();
    },

    render: function () {
        console.log(this.props.developer);
        return (
            <div className="modal fade" id={this.state.modalID} tabIndex="-1" role="dialog" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div className="modal-body">
                            <div className="media">
                                <div className="media-left">
                                    <a href="#">
                                        <img src={this.props.developer.photo} className="media-object"  width="100" />
                                    </a>
                                </div>
                                <div className="media-body">
                                    <h4 className="media-heading">{this.props.developer.name}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" onClick={this.close}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.addToCartClick}>Buy <span className="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});