'use strict';
(function() {
document.addEventListener('DOMContentLoaded', init);
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
    var draft = new Array();

    browser.storage.local.get("draft")
    .then((o) => {
        draft = o;
        for(var i = draft.length; i > 5; i--) {
            draft.shift();
            console.log(draft);
        }
    });

    browser.tabs.query({currentWindow: true, active: true})
    .then((tabs) => {
        var title = tabs[0].title;
        var url = tabs[0].url;
        text.innerHTML = title + "\n" + url + "\n";
        refresh_char_counter();

        for(var o in draft) {
            if(o.url === url) {
                text.innerHTML = o.text;
            }
        }
        var current = {
            title: title,
            url: url,
            text: text.value
        };
        draft.push(current);
    });

    console.log(draft);
    browser.storage.local.set({
        draft: draft
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

