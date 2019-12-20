(function() {
var ss = 0;
function test() {
    var child = document.createElement('li');
    child.setAttribute('id', 'child' + ss);
    child.setAttribute('class', 'account_item');

    var account_selected = document.createElement('input');
    account_selected.setAttribute('type', 'checkbox');
    account_selected.setAttribute('class', 'account_selected');
    account_selected.setAttribute('value', 'true');
    child.appendChild(account_selected);

    var user_icon = document.createElement('img');
    user_icon.setAttribute('class', 'user_icon');
    user_icon.setAttribute('alt', "user's icon");
    user_icon.setAttribute('src', 'img/a.png');
    child.appendChild(user_icon);

    var usernames = document.createElement('div');
    usernames.setAttribute('class', 'usernames');
    var user_name = document.createElement('span');
    user_name.setAttribute('class', 'user_name');
    user_name.innerText = 'inux' + ss;
    usernames.appendChild(user_name);
    var user_id = document.createElement('span');
    user_id.setAttribute('class', 'user_id');
    user_id.innerText = '@inux39';
    usernames.appendChild(user_id);
    usernames.appendChild(document.createElement('br'));
    var user_host = document.createElement('span');
    user_host.setAttribute('class', 'user_host');
    user_host.innerText = '@don.inux39.me';
    usernames.appendChild(user_host);

    child.appendChild(usernames);
    ss += 1;

    var o = document.getElementsByClassName('account_items');
    o[0].appendChild(child);
}

window.onload = function() {
    test();
}

document.getElementById('button_add').onclick = function() {
    test();
}

document.getElementById('button_remove').onclick = function() {
    var check = document.getElementsByClassName('account_selected');
    var items = document.getElementsByClassName('account_items');
    for(var i = check.length - 1; i >= 0; i--) {
        if(check[i].checked) {
            items[0].removeChild(check[i].parentNode);
        }
    }
}
}());

