/** @jsx React.DOM */
var React = require('react');

module.exports = CartItem = React.createClass({
    getInitialState: function () {
        return {
            unity_price:this.props.dev.price
        };
    },

    changeHourValue: function (event) {
        this.props.dev.baseHour = event.target.value;
        this.setState({unity_price: this.props.dev.baseHour * this.props.dev.price});
        $.post("/cart/update", {dev: JSON.stringify(this.props.dev)}, function(data){
            $.publish('hour.increased');
        }.bind(this));

    },

    render: function () {

        var hourInputText;

        if (this.props.edit) {
            hourInputText = (<div className="input-group" >
                                <input type="number" className="qtHour"  onChange={this.changeHourValue} value={this.props.dev.baseHour} /> hour
                            </div>);
        } else {
            hourInputText = (<h5>Hours: {this.props.dev.baseHour}</h5>)
        }

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
                            <h4 className="text-info">${this.state.unity_price}</h4>
                        </div>
                    </div>
                </li>
        )
    }

});