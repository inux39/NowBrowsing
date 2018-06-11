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
		noSpace();
		changed();
	}

	document.getElementById("head").oninput = function() {
		head = document.getElementById("head").value;
		noSpace();
		changed();
	}

	document.getElementById("mastodon").onclick = function() {
		browser.tabs.create({url: "web+mastodon://share?text=" + encodeURIComponent(text)});
	}

	document.getElementById("twitter").onclick = function() {
		browser.tabs.create({url: "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text)});
	}
}

function noSpace() {
	if(document.getElementById("hash").checked) {
		head = "#" + head.replace(/ /g, "_");
	} else {
		head = head.substr(1, head.length);
	}
}

function changed() {
	text = head + ": " + body;
	document.getElementById("text").value = text;
}

function clear() {
	document.getElementById("text").value = "";
}

})();

