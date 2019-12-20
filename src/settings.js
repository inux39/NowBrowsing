(function() {
var ss = 0;

function build_accountlist() {
    var frame = document.createElement('li');
    frame.setAttribute('class', 'account_item');

    var account_selected = document.createElement('input');
    account_selected.setAttribute('type', 'checkbox');
    account_selected.setAttribute('class', 'account_selected');
    frame.appendChild(account_selected);

    var user_icon = document.createElement('img');
    user_icon.setAttribute('class', 'user_icon');
    user_icon.setAttribute('alt', "user's icon");
    frame.appendChild(user_icon);

    var usernames = document.createElement('div');
    usernames.setAttribute('class', 'usernames');
    var user_name = document.createElement('span');
    user_name.setAttribute('class', 'user_name');
    usernames.appendChild(user_name);
    var user_id = document.createElement('span');
    user_id.setAttribute('class', 'user_id');
    usernames.appendChild(user_id);
    usernames.appendChild(document.createElement('br'));
    var host = document.createElement('span');
    host.setAttribute('class', 'host');
    usernames.appendChild(host);
    frame.appendChild(usernames);

    var refresh_button = document.createElement('input');
    refresh_button.setAttribute('class', 'refresh_button');
    refresh_button.setAttribute('type', 'image');
    refresh_button.setAttribute('src', 'img/reload.svg');
    refresh_button.setAttribute('aria-label', 'Refresh account profiles');
    frame.appendChild(refresh_button);

    return frame
}

function test() {
    var child = build_accountlist();
    child.getElementsByClassName('user_name')[0].innerText = "inux39";
    var o = document.getElementById('account_list');
    o.appendChild(child);
}

window.onload = function() {
    test();
}

document.getElementById('button_add').onclick = function() {
    test();
}

document.getElementById('button_remove').onclick = function() {
    var check = document.getElementsByClassName('account_selected');
    var items = document.getElementById('account_items');
    var confirmed = window.confirm('Realy ok?');
    // 削除するアカウントのリスト
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
}
}());

