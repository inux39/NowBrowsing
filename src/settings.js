(function() {
window.addEventListener("load", function() {
    browser.storage.local.get("core_options").then((core) => {
        const core_ops = core.core_options;
        if(core_ops.head) {
            document.getElementById("head_text").value = core_ops.head;
        }
        document.getElementById("head_enabled").checked = core_ops.head_enabled;
    });
});

window.addEventListener("beforeunload", function() {
    const core = new Object();
    const head = document.getElementById("head_text").value;
    const head_enabled = document.getElementById("head_enabled").checked;

    core.head_enabled = head_enabled;
    if(head) {
        core.head = head;
    }

    browser.storage.local.set({
        core_options: core
     });
});

// Modalを開く
document.getElementById("button_add").addEventListener("click", modal_open);

document.getElementById("button_clear_all").addEventListener("click", function() {
    clear_all();
    document.getElementById("head_text").value = "Now Browsing";
    document.getElementById("head_enabled").checked = false;
});

document.getElementById("button_remove").addEventListener("click", function() {
    const check = document.getElementsByClassName("account_selected");
    const items = document.getElementById("account_items");
    const confirmed = window.confirm("Realy ok?");
    // 削除するアカウントのリスト
    // できればこれを警告で出したい
    const list = [];

    /*
    // リストをとる
    for(const i = check.length - 1; i >= 0; i--) {
        if(check[i].checked) {
        lsit.append(i);
        }
    }

    // リストから削除する
    items.removeChild(check[i].parentNode);
    */
});


/*
    Modal
*/
function modal_open() {
    const mask = document.getElementById("modal_overlay");
    const modal = document.getElementById("modal");
    mask.classList.remove("modal_hidden");
    modal.classList.remove("modal_hidden");
}

function modal_close() {
    const mask = document.getElementById("modal_overlay");
    const modal = document.getElementById("modal");
    mask.classList.add("modal_hidden");
    modal.classList.add("modal_hidden");
}

function take_confirm_closing_modal() {
    const confirmed = window.confirm("このページから離れますか？");
    if(confirmed) {
        modal_close();
    }
}

// "Ok"
document.getElementById("open_auth_page").addEventListener("click", function() {
/*
Mastodon以外のサービスを追加したとき、ここにそれ別の処理をかかないといけない
*/

/*
    - アカウント認証
    - 認証したのを使ってアカウント情報を読む
    - 保存されているアカウントリストを読む
    - アカウントリストに追加し、保存する
*/
    const mastodon = new Authorize("don.inux39.me");
    mastodon.registApp();
    modal_close();
});

// "Cancel"
document.getElementById("auth_cancel").addEventListener("click", take_confirm_closing_modal);

// Modalのオーバーレイ部分(暗転部分)
document.getElementById("modal_overlay").addEventListener("click", take_confirm_closing_modal);

/*
    debug
*/
const ss = 0;
function build_accountlist() {
    const frame = document.createElement("li");
    frame.setAttribute("class", "account_item");

    const account_selected = document.createElement("input");
    account_selected.setAttribute("type", "checkbox");
    account_selected.setAttribute("class", "account_selected");
    frame.appendChild(account_selected);

    const user_icon = document.createElement("img");
    user_icon.setAttribute("class", "user_icon");
    user_icon.setAttribute("alt", "user's icon");
    frame.appendChild(user_icon);

    const usernames = document.createElement("div");
    usernames.setAttribute("class", "usernames");
    const user_name = document.createElement("span");
    user_name.setAttribute("class", "user_name");
    usernames.appendChild(user_name);
    const user_id = document.createElement("span");
    user_id.setAttribute("class", "user_id");
    usernames.appendChild(user_id);
    usernames.appendChild(document.createElement("br"));
    const host = document.createElement("span");
    host.setAttribute("class", "host");
    usernames.appendChild(host);
    frame.appendChild(usernames);

    const refresh_button = document.createElement("input");
    refresh_button.setAttribute("class", "refresh_button");
    refresh_button.setAttribute("type", "image");
    refresh_button.setAttribute("src", "img/reload.svg");
    refresh_button.setAttribute("aria-label", "Refresh account profiles");
    frame.appendChild(refresh_button);

    return frame
}

function test() {
    const child = build_accountlist();
    child.getElementsByClassName("user_name")[0].innerText = "inux39";
    const o = document.getElementById("account_list");
    o.appendChild(child);
}
}());

