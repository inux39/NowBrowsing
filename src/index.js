'use strict';
(function() {
//window.addEventListener('beforeunload', function (e) {
//    e.preventDefault();
//});

window.onload = function() {
    var body = '';
    var url = '';
    var comment = '';

    var storage = browser.storage.sync.get('button');
    storage.then((ret) => {
        document.getElementById('share_text').value = ret.button;
    });

    /*
    browser.tabs.query({currentWindow: true, active: true})
        .then((tabs) => {
            body = tabs[0].title;
            url = tabs[0].url;
        })
        .catch(clear);
    */
}

document.querySelector("share_button").addEventListener('onclick', function(e) {
    var input = document.getElementById('share_text').value;
    browser.storage.sync.set({
        button: 'a=b'
    });
    e.preventDefault();
});
/*
document.getElementById('button1').onclick = function() {
    var input = document.getElementById('comment').value;
    browser.storage.sync.set({
        button: 'a=b'
    });
}
*/
//document.addEventListener('DOMContentLoaded', restoreOptions);
})();

