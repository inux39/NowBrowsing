var Authorize = function(domain) {
this.domain = domain;
this.redirect = browser.identity.getRedirectURL();
this.appName = "Now Browsing";
this.appURL = "https://github.com/inux39/NowBrowsing";
this.scopes = ["read", "write"];
this.endpoint = {
    token: "/oauth/token",
    revoke: "/oauth/revoke"
};

this.authentication = function() {
    const auth_uri = domain + `/oauth/authorize/\
    ?client_id=${client_id}\
    client_secret=${client_secret}\
    redirect_uri=${redirect}\
    grant_type=`;
};

this.createApp = function() {
    const request = new XMLHttpRequest();
    const url = domain + "/oauth/v1/apps"
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
};

this.validate = function(redirectURL) {

};

this.authorize = function() {
    return browser.identity.launchWebAuthFlow({
        interactive: true,
        url: domain + auth_uri
    });
};

this.getAccessToken = function() {
    return authorize();
};
//&scope=${encodeURIComponent(scopes.join('+'))}\
//&redirect_uri=${encodeURIComponent(redirect)}\
//&response_type=code;
};

