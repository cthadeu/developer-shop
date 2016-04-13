var http = require("http");
var request = require("request");

function Organization() {
    this.name = "";
    this.id = 0;
    this.members = [];
}
//http://api.github.com/orgs/vtex/members

Organization.prototype.listMembers = function() {
    var url = "https://api.github.com/orgs/vtex/members";
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        } else {
            console.log(error);
        }
    });
}

module.exports = Organization;