function Cart(session) {
    this.session = session;
    this.discount = (session.discount == undefined) ? 0 : session.discount;
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
    this.session.items = items;
}

Cart.prototype.addDiscount = function(value){
    this.discount = value;
    this.session.discount = value;
}

Cart.prototype.getTotal = function() {
    var items = [];
    var total = 0;
    if (this.session.items) {
        items = this.session.items;
    }
    items.forEach(function(key, item){
        total += key.price;
    });
    return total - parseFloat(this.session.discount);
}

Cart.prototype.updateItem = function(dev){
    var items = [];
    if (this.session.items != undefined) {
        items = this.session.items;
    }
    for (var i = 0; i < items.length; i++) {
        if (parseInt(items[i].id) === parseInt(dev.id)) {
            items[i] = dev;
            items[i].price = items[i].price * dev.baseHour;
        }
    }
    this.session.items = items;
}

module.exports = Cart;