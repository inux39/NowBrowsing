function read_from_sync(e, option) {
}

function save_to_sync(e, option) {

}

function read_from_local(e, option) {

}

function save_to_local(e, option) {

}

function clear_all() {
    var confirmed = window.confirm('All configuration will wipe.\nOK?');
    if(confirmed) {
        browser.storage.sync.clear();
        browser.storage.local.clear();
    }
}

