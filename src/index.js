(function() {
window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
});

window.onload = function() {
    'use strict';
    var body = '';
    var url = '';
    var comment = '';

    var storage = browser.storage.sync.get('button');
    storage.then((ret) => {
        document.getElementById('comment').value = ret.button;
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

document.getElementById('button1').onclick = function() {
    var input = document.getElementById('comment').value;
    browser.storage.sync.set({
        button: 'a=b'
    });
}
//document.addEventListener('DOMContentLoaded', restoreOptions);
})();

