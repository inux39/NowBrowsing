'use strict';
(function() {
window.addEventListener('load', init);
//window.addEventListener('beforeunload', init);
document.getElementById("share_text").addEventListener("keyup", refresh_char_counter);
document.getElementById("settings_button").addEventListener("click", function() {
    window.open("settings.html", "_blank");
    window.close();
});

/*
document.querySelector("share_button").addEventListener("onclick", function(e) {
    var input = document.getElementById("share_text").value;
    browser.storage.sync.set({
        button: "a=b"
    });
    e.preventDefault();
});
*/

function init() {
    var text = document.getElementById("share_text");
    var tabs = browser.tabs.query({currentWindow: true, active: true});
    var draft = browser.storage.local.get("draft");
    browser.storage.local.get().then((storage) => {
        console.log(storage);
    });

    Promise.all([tabs, draft]).then((values) => {
        var draft = new Array();
        if(values[1].draft) {
            draft = values[1].draft;
        };
        for(var i = draft.length; i > 5; i--) {
            draft.shift();
        }
        var tabs = values[0];
        var title = tabs[0].title;
        var url = tabs[0].url;
        text.innerHTML = title + "\n" + url + "\n";
        for(var i = 0; i < draft.length; i++) {
            if(draft[i].url === url) {
                text.innerHTML = draft[i].text;
            }
        }
        var current = {
            title: title,
            url: url,
            text: text.value
        };
        refresh_char_counter();
    });
}

function refresh_char_counter() {
    var target = document.getElementById("share_text").value;
    var url = url_regex(target);
    var count = target.length - url.length;
    document.getElementById("char_counter").innerText = count;
}

function url_regex(s) {
    var regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    var url = s.match(regex);
    if(!url) {
        return "";
    } else {
        return url[0];
    }
}

function save_local(e, target) {

}
})();

