function Cart(session) {
    this.session = session;
    this.discount = (session.discount != undefined) ? session.discount : 0;
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
    var items = this.getItems();
    for (var i = 0; i < items.length; i++) {
        if (parseInt(items[i].id) === parseInt(dev.id)) {
            items.splice(i, 1);
        }
    }
    this.session.items = items;
}

Cart.prototype.addDiscount = function(value){
    this.discount = value;
    this.session.discount = value;
}


Cart.prototype.updateItem = function(dev){
    var items = this.getItems();
    for (var i = 0; i < items.length; i++) {
        if (parseInt(items[i].id) === parseInt(dev.id)) {
            items[i] = dev;
            items[i].price = items[i].price * dev.baseHour;
        }
    }
    this.session.items = items;
}

Cart.prototype.getItems = function(){
    var items = [];
    if (this.session.items != undefined) {
        items = this.session.items;
    }
    return items;
}

module.exports = Cart;