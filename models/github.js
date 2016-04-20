var GitHubApi = require("github");

var github = new GitHubApi({
    version: "3.0.0",
    debug: false,
    protocol: "https",
    host: "api.github.com",
    pathPrefix: "/",
    timeout: 5000,
    headers: {
        "user-agent": "DeveloperShop"
    }
});

github.authenticate({
    type: "oauth",
    token:"2b04c55754709179fe6bad099293b68e65120793"
});

module.exports = github;