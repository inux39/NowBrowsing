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
    const input = document.getElementById("share_text").value;
    browser.storage.sync.set({
        button: "a=b"
    });
    e.preventDefault();
});
*/

function init() {
    const text = document.getElementById("share_text");
    const tabs = browser.tabs.query({currentWindow: true, active: true});
    const draft = browser.storage.local.get("draft");
    browser.storage.local.get().then((storage) => {
        console.log(storage);
    });

    Promise.all([tabs, draft]).then((values) => {
        let draft = new Array();
        if(values[1].draft) {
            draft = values[1].draft;
        };
        for(let i = draft.length; i > 5; i--) {
            draft.shift();
        }
        const tabs = values[0];
        const title = tabs[0].title;
        const url = tabs[0].url;
        text.innerHTML = title + "\n" + url + "\n";
        for(let i = 0; i < draft.length; i++) {
            if(draft[i].url === url) {
                text.innerHTML = draft[i].text;
            }
        }
        const current = {
            title: title,
            url: url,
            text: text.value
        };
        refresh_char_counter();
    });
}

function refresh_char_counter() {
    const target = document.getElementById("share_text").value;
    const url = url_regex(target);
    const count = target.length - url.length;
    document.getElementById("char_counter").innerText = count;
}

function url_regex(s) {
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const url = s.match(regex);
    if(!url) {
        return "";
    } else {
        return url[0];
    }
}

function save_local(e, target) {

}
})();

