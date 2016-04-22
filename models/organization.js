var github = require("./github")
var Developer = require("./developer");

function Organization(name) {
    this.name = name;
}

Organization.prototype.listMembers = function(callback) {
    github.orgs.getMembers({org:"vtex"}, function(err, res){
        var items = []
        res.forEach(function(key){
            items.push(new Developer(key.id, key.login, key.avatar_url));
        });
        callback(items);
    })
}

module.exports = Organization;