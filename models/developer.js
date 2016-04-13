var github = require("./github")

function Developer(id, login, photo) {
    this.id = id;
    this.login = login;
    this.photo = photo;
    this.name = "";
    this.price = 0;
    this.profile = "";
}

Developer.prototype.findByUsername = function(username, callback) {
    github.user.getFrom({user:username}, function(err, res){
        var dev = new Developer(res.id, res.login, res.avatar_url);
        dev.name = res.name;
        dev.price = parseFloat(res.followers);
        callback(dev);
    });
}


module.exports = Developer;