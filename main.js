(function() {
var head = "Now Browsing";
var body = "";
var text = "";

window.onload = function() {
	var features = "width=600,height=500,centerscreen=yes,menubar=yes,location=yes,resizeable=yes,scrollbars=yes,status=yes";
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
		window.open("web+mastodon://share?text=" + encodeURIComponent(text), "Masotodn", features);
	}

	document.getElementById("twitter").onclick = function() {
		window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(text), "Twitter", features);
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

