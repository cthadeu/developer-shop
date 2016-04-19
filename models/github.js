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

module.exports = github;