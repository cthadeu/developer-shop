function Cart(session) {
    this.session = session
    this.discount = 0;
    this.email = "";
}

Cart.prototype.addDeveloper = function(dev) {
    var items = [];
    if (this.session.items) {
        items = this.session.items;
    }
    var hasItem = false;

    items.forEach(function(key, item){
        if (key.id == dev.id)
            hasItem = true;
    });

    if (!hasItem)
        items.push(dev);

    this.session.items = items;
}

Cart.prototype.remove = function(dev) {
    var items = [];
    if (this.session.items) {
        items = this.session.items;
    }

    items.forEach(function(key, item){
        if (key.id == dev.id)
            items.splice(item);
    });
}

Cart.prototype.total = function() {
    return this.items.length;
}

module.exports = Cart;