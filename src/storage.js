function read_from_sync(e, option) {
}

function save_to_sync(e, option) {

}

function read_from_local(e, option) {

}

function save_to_local(e, option) {

}

function clear_all() {
    const confirmed = window.confirm('全ての情報を削除します');
    if(confirmed) {
        browser.storage.sync.clear();
        browser.storage.local.clear();
    }
}

