var Organization = require("./models/organization")

module.exports = {

    index: function(req, res) {
        var org = new Organization();
        org.listMembers();

        res.render("home", {});
    },
}
