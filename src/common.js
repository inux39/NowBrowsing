function encodeURIObject(data) {
    const pairs = [];
    for(var name in data) {
        const n = encodeURIComponent(name);
        const d = encodeURIComponent(data[name]);
        pairs.push(n + "=" + d);
    }
    return pairs.join("&").replace(/%20/g, "+");
}

function bodyFormData(data) {
    const bd = new FormData();
    for(var name in data) {
        bd.append(name, data[name]);
    }
    return bd;
}

function postData(url, data) {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data),
    }).then(r => r.json());
}

/*
class StorageObjects {
}

class CoreOptions {
}

class Accounts {

}

class Favicons {

}

class UserIcons {

}

var core_options = {
    head_string: String,    // ヘッダーに使う文字
    head_enabled: Boolean   // ヘッダー付与するかどうか
}

var accounts = {
    full_id: String,        // フルID(@hogehoge@hogehoge.com)
    display_name: String,   // アカウントに設定された名前。なければない
    post_range: String,     // 使うかどうかはわからないけど、一応
    credentials: {          // 認証情報
        client_id: String,
        client_secret: String,
        token: String
    }
}

var favicon = {
    address: String,        // サーバーのアドレス。これを元に利用する。
    favicon: Object         // ファビコンそのもの
}

var user_icon = {
    full_id: String,        // ユーザーID。ユニークなはず。
    icon: Object
}
*/

