var GitHubApi = require("github");

var github = new GitHubApi({
    version: "3.0.0",
    debug: true,
    protocol: "https",
    host: "api.github.com",
    pathPrefix: "/",
    timeout: 5000,
    headers: {
        "user-agent": "DeveloperShop"
    }
});

github.authenticate({
    type: "basic",
    username: "cthadeu",
    password: "ctfg2005"
});

module.exports = github;