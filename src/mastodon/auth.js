(function(){
const redirect = browser.identity.getRedirectURL();
const appName = "Now Browsing";
const appURL = "https://github.com/inux39/NowBrowsing";
const scopes = ["read", "write"];
const auth_uri = `/oauth/authorize/\
?client_id=${client_id}\
&scope=${encodeURIComponent(scopes.join('+'))}\
&redirect_uri=${encodeURIComponent(redirect)}\
&response_type=code`;
const token_uri = "/oauth/token";
const revoke_uri = "/oauth/revoke";

})();

