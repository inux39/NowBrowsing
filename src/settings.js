(function() {
window.addEventListener("load", function() {
    browser.storage.local.get("core_options").then((core) => {
        var core = core.core_options;
        if(core.head) {
            document.getElementById("head_text").value = core.head;
        }
        document.getElementById("head_enabled").checked = core.head_enabled;
    });
});

window.addEventListener("beforeunload", function() {
    var core = new Object();
    var head = document.getElementById("head_text").value;
    var head_enabled = document.getElementById("head_enabled").checked;

    core.head_enabled = head_enabled;
    if(head) {
        core.head = head;
    }

    browser.storage.local.set({
        core_options: core
     });
});

document.getElementById("button_clear_all").addEventListener("click", function() {
    clear_all();
    document.getElementById("head_text").value = "";
    document.getElementById("head_enabled").checked = false;
});
document.getElementById("button_add").addEventListener("click", function() {
});
document.getElementById("button_remove").addEventListener("click", function() {
    var check = document.getElementsByClassName("account_selected");
    var items = document.getElementById("account_items");
    var confirmed = window.confirm("Realy ok?");
    // 削除するアカウントのリスト
    // できればこれを警告で出したい
    var list = [];

    /*
    // リストをとる
    for(var i = check.length - 1; i >= 0; i--) {
        if(check[i].checked) {
        lsit.append(i);
        }
    }

    // リストから削除する
    items.removeChild(check[i].parentNode);
    */
});

function get_sync() {

}

function set_sync() {

}

function modal_open() {
    var mask = document.getElementById("modal_overlay");
    var modal = document.getElementById("modal");
    mask.classList.remove("modal_hidden");
    modal.classList.remove("modal_hidden");
}

function modal_close() {
    var mask = document.getElementById("modal_overlay");
    var modal = document.getElementById("modal");
    var confirmed = window.confirm("Realy ok?");
    if(confirmed) {
        mask.classList.add("modal_hidden");
        modal.classList.add("modal_hidden");
    }
}

// Modal
document.getElementById("button_add").addEventListener("click", modal_open);
document.getElementById("auth_cancel").addEventListener("click", modal_close);
document.getElementById("modal_overlay").addEventListener("click", modal_close);

// debug
var ss = 0;

function build_accountlist() {
    var frame = document.createElement("li");
    frame.setAttribute("class", "account_item");

    var account_selected = document.createElement("input");
    account_selected.setAttribute("type", "checkbox");
    account_selected.setAttribute("class", "account_selected");
    frame.appendChild(account_selected);

    var user_icon = document.createElement("img");
    user_icon.setAttribute("class", "user_icon");
    user_icon.setAttribute("alt", "user's icon");
    frame.appendChild(user_icon);

    var usernames = document.createElement("div");
    usernames.setAttribute("class", "usernames");
    var user_name = document.createElement("span");
    user_name.setAttribute("class", "user_name");
    usernames.appendChild(user_name);
    var user_id = document.createElement("span");
    user_id.setAttribute("class", "user_id");
    usernames.appendChild(user_id);
    usernames.appendChild(document.createElement("br"));
    var host = document.createElement("span");
    host.setAttribute("class", "host");
    usernames.appendChild(host);
    frame.appendChild(usernames);

    var refresh_button = document.createElement("input");
    refresh_button.setAttribute("class", "refresh_button");
    refresh_button.setAttribute("type", "image");
    refresh_button.setAttribute("src", "img/reload.svg");
    refresh_button.setAttribute("aria-label", "Refresh account profiles");
    frame.appendChild(refresh_button);

    return frame
}

function test() {
    var child = build_accountlist();
    child.getElementsByClassName("user_name")[0].innerText = "inux39";
    var o = document.getElementById("account_list");
    o.appendChild(child);
}

}());

