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
        $.publish('hour.increased', this.props.dev);
    },

    render: function () {

        return (
            <div>
                <li className="list-group-item">
                    <div className="media">
                        <div className="media-left">
                            <a href="#">
                                <img className="media-object" src={this.props.dev.photo} alt={this.props.dev.name} width="50"/>
                            </a>
                        </div>
                        <div className="media-body">
                            <h4 className="media-heading">{this.props.dev.name}</h4>
                            <input type="text" size="2" className="form-control col-md-1"  onChange={this.changeHourValue} value={this.props.dev.baseHour}/> hour(s)
                        </div>
                        <div className="media-right">
                            <h4 className="text-success">${this.state.unity_price}</h4>
                        </div>
                    </div>
                </li>
            </div>
        )
    }

});