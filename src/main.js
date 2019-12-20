(function() {
window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
});

window.onload = function() {
    'use strict';
    var body = '';
    var url = '';
    var comment = '';
    /*
    browser.tabs.query({currentWindow: true, active: true})
        .then((tabs) => {
            body = tabs[0].title;
            url = tabs[0].url;
        })
        .catch(clear);
    */
}
//document.addEventListener('DOMContentLoaded', restoreOptions);
})();

