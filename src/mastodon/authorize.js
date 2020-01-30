let Authorize = function(domain) {
this.domain = "https://" + domain;
this.redirect = browser.identity.getRedirectURL();
this.appName = "Now Browsing";
this.appURL = "https://github.com/inux39/NowBrowsing";
this.scopes = ["read", "write"];
this.endpoint = {
    authorize: "/oauth/authorize",
    token: "/oauth/token",
    revoke: "/oauth/revoke",
    registApp: "/api/v1/apps"
};
this.credentials;

this.authorize = function() {
    const url = this.domain + this.endpoint.authorize;
    const param = {
        force_login: false,
        response_type: "code",
        client_id: this.credentials.client_id,
        redirect_uri: this.redirect,
        scope: this.scopes.join(" "),
    };

    return browser.identity.launchWebAuthFlow({
        interactive: true,
        url: this.domain + this.endpoint.authorize + "?" + encodeURIObject(param),
    }).then(r => {
        let url = new URL(r);
        let params = new URLSearchParams(url.search);
        return params.get("code");
    });
//    return postData(url, param);
}

this.authentication = function() {
    const url = this.domain + this.endpoint.token;
    const app = {
        client_id: this.credentials.client_id,
        client_secret: this.credentials.client_secret,
        redirect_uri: this.redirect,
        grant_type: "client_credentials",
    };
    console.log(this.domain + "?" + encodeURIObject(app));
    return browser.identity.launchWebAuthFlow({
        interactive: true,
        url: this.domain + this.endpoint.token + "?" + encodeURIObject(app),
    });
};

this.registApp = function() {
    const url = this.domain + this.endpoint.registApp;
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

this.getAccessToken = function() {
    return authorize();
};

//&scope=${encodeURIComponent(scopes.join('+'))}\
//&redirect_uri=${encodeURIComponent(redirect)}\
//&response_type=code;
};

