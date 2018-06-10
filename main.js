(function() {
var head = "Now Browsing";
var body = "";
var text = "";

window.onload = function() {
	browser.tabs.query({currentWindow: true, active: true})
		.then((tabs) => {
			body = tabs[0].title + "\n" + tabs[0].url;
			changed();
		})
		.catch(clear);

	document.getElementById("hash").onchange = function () {
		if(document.getElementById("hash").checked) {
			head = "#" + head;
		} else {
			head = head.substr(1, head.length);
		}
		changed();
	}

	document.getElementById("head").oninput = function() {
		head = document.getElementById("head").value;
		changed();
	}

	document.getElementById("mastodon").onclick = function() {
		browser.tabs.create({url: "web+mastodon://share?text=" + fixedEncodeURI(text)});
	}
}

function fixedEncodeURI (str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

function changed() {
	text = head + ": " + body;
	document.getElementById("text").value = text;
}

function clear() {
	document.getElementById("text").value = "";
}

})();

