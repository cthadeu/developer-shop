function Cart(session) {
    this.session = session
}

Cart.prototype.addDeveloper = function(dev) {
    var items = [];
    if (this.session.items) {
        items = this.session.items;
    }
    items.push(dev);
    this.session.items = items;
}

Cart.prototype.total = function() {
    return this.items.length;
}

module.exports = Cart;