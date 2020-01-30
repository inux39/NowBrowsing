let Authorize = function(domain) {
this.domain = domain;
this.redirect = browser.identity.getRedirectURL();
this.appName = "Now Browsing";
this.appURL = "https://github.com/inux39/NowBrowsing";
this.scopes = ["read", "write"];
this.endpoint = {
    token: "/oauth/token",
    revoke: "/oauth/revoke",
    registApp: "/api/v1/apps"
};

this.authentication = function(cred) {
    const url = "https://" + domain + this.endpoint.token;
    const app = {
        client_id: cred.client_id,
        client_secret: cred.client_secret,
        redirect_uri: this.redirect,
        grant_type: "client_credentials",
    };
    return browser.identity.launchWebAuthFlow({
        interactive: true,
        url: "https://" + domain + "?" + encodeURIObject(app),
    });
};

this.registApp = function() {
    const url = "https://" + domain + this.endpoint.registApp;
    const app = {
        client_name: this.appName,
        redirect_uris: this.redirect,
        scopes: this.scopes.join(" "),
        website: this.appURL
    };
    return postData(url, app);
};

this.validate = function(redirectURL) {

};

this.authorize = function(cred) {
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

