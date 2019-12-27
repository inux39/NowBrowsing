'use strict';
(function() {
//window.addEventListener('beforeunload', function (e) {
//    e.preventDefault();
//});

window.onload = function() {
    /*
    var storage = browser.storage.sync.get("button");
    storage.then((ret) => {
        document.getElementById("share_text").value = ret.button;
    });
    */
    browser.tabs.query({currentWindow: true, active: true})
    .then((tabs) => {
        var textarea = document.getElementById("share_text");
        var title = tabs[0].title;
        var url = tabs[0].url;
        textarea.innerHTML = title + "\n" + url + "\n";
        refresh_char_counter();

        // TODO:
        // local storageから取得
        // 同じURLでの保存がないか確認
        // あったら復元、なければそのまま。
        // そして保存   * ここで保存したものは、投稿ボタン押したときに消す
        var draft = new Array();
        var current = {
            title: title,
            url: url,
            text: textarea.value
        };
        draft.push(current);
        console.log(draft);
        /*
        console.log(current);
        var saveObject = new Object();
        console.log(saveObject);
        */
    });

}

document.getElementById("settings_button").addEventListener("click", function() {
    window.open("settings.html", "_blank");
    window.close();
});

document.getElementById("share_text").addEventListener("keyup", refresh_char_counter);

/*
document.querySelector("share_button").addEventListener("onclick", function(e) {
    var input = document.getElementById("share_text").value;
    browser.storage.sync.set({
        button: "a=b"
    });
    e.preventDefault();
});
*/
/*
document.getElementById('button1').onclick = function() {
    var input = document.getElementById('comment').value;
    browser.storage.sync.set({
        button: 'a=b'
    });
}
*/
//document.addEventListener('DOMContentLoaded', restoreOptions);
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
})();

