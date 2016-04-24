/** @jsx React.DOM */
var React = require('react');

module.exports = CartItem = React.createClass({
    getInitialState: function () {
        return {
            unity_price: 0
        };
    },

    componentDidMount: function(){
        this.setState({unity_price:this.props.dev.price});
    },

    changeHourValue: function (event) {
        this.props.dev.baseHour = event.target.value;
        $.post("/cart/update", {dev: JSON.stringify(this.props.dev)}, function(data){
            $.publish('hour.increased');
            this.forceUpdate();
        }.bind(this));
    },

    remove: function(event){
        $.publish("cart.removed", this.props.dev);
    },

    render: function () {

        var hourInputText = (this.props.edit) ? (<div className="input-group" >
                                                    <input type="number" className="qtHour" min="1" step="1"
                                                           onChange={this.changeHourValue}
                                                           value={this.props.dev.baseHour} /> hour</div>)
                                               : (<h5>Hours: {this.props.dev.baseHour}</h5>);

        var removeBtn = (this.props.edit) ? (<button className="btn btn-xs btn-danger"
                                                     onClick={this.remove}><span className="glyphicon glyphicon-remove"></span></button>) : "";


        return (
                <li className="list-group-item">
                    <div className="media">
                        <div className="media-left">
                            <a href="#">
                                <img className="media-object" src={this.props.dev.photo} alt={this.props.dev.name} width="50"/>
                            </a>
                        </div>
                        <div className="media-body">
                            <h4 className="media-heading">{this.props.dev.name}</h4>
                            {hourInputText}
                        </div>
                        <div className="media-right">
                            <h4 className="text-info">${this.props.dev.price * this.props.dev.baseHour}</h4>
                            {removeBtn}
                        </div>
                    </div>
                </li>
        )
    }

});