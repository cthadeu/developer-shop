var github = require("./github");
var q = require("q");

function Developer(id, login, photo) {
    this.id = id;
    this.login = login;
    this.photo = photo;
    this.name = "";
    this.price = 0;
    this.profile = "";
    this.baseHour = 1;
}

Developer.prototype.findByUsername = function(username, callback) {
    github.user.getFrom({user:username}, function(err, res){
        var dev = new Developer(res.id, res.login, res.avatar_url);
        dev.name = res.name;
        dev.price = parseFloat(res.followers);
        callback(dev);
    });
}

Developer.prototype.findRepositoriesByUsername = function(username, callback) {
    github.repos.getFromUser({user: username}, function(err, res){
       callback(res);
    });
}

Developer.prototype.getDeveloperSkills = function(username, callback){
    this.findRepositoriesByUsername(username, function(data){
        var skills = [];
        q.when(data.forEach(function(repo){
            if (skills.indexOf(repo.language) < 0 && repo.language != null) {
                skills.push(repo.language);
            }
        }), callback(skills));
    });
}

module.exports = Developer;