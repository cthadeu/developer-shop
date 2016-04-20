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
    key: "610906014be3939500af",
    secret: "b0dc8c55a3397d1e4aa762106e38b0f45323374e"
});

module.exports = github;