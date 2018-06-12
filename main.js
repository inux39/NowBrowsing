(function() {
const DEF_HEAD = "Now Browsing";
window.onload = function() {
	var head = DEF_HEAD;
	var body = "";
	var url = "";
	var comment = "";
	var features = "width=600,height=500,centerscreen=yes,menubar=yes,location=yes,resizeable=yes,scrollbars=yes,status=yes";
	browser.tabs.query({currentWindow: true, active: true})
		.then((tabs) => {
			body = tabs[0].title;
			url = tabs[0].url;
			flush(head, body, url, comment);
		})
		.catch(clear);

	document.getElementById("comment").oninput = function() {
		comment = document.getElementById("comment").value;
		flush(head, body, url, comment);
	}

	document.getElementById("hash").onchange = function() {
		head = noSpace(head);
		flush(head, body, url, comment);
	}

	document.getElementById("head").oninput = function() {
		head = document.getElementById("head").value;
		head = noSpace(head);
		flush(head, body, url, comment);
	}

	document.getElementById("mastodon").onclick = function() {
		window.open("web+mastodon://share?text=" + encodeURIComponent(text), "Masotodn", features);
	}

	document.getElementById("twitter").onclick = function() {
		window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(text), "Twitter", features);
	}
}

function noSpace(head) {
	if(document.getElementById("hash").checked) {
		head = head.replace(/ /g, "_");
		head = "#" + head;
	} else {
		head = head.replace(/_/g, " ");
		if(head.substr(0, 1) === "#") {
			head = head.substr(1);
		}
	}
	return head;
}

function fit(text, max) {
	var s = text;
	if(text.length < max) {
		s = text.substr(0, max - 3) + "...";
	}
	return s;
}

function flush(head, body, url, comment) {
	var t = head + ": " + body + "\n" + comment;
	document.getElementById("preview").value = t;
}

function clear() {
	document.getElementById("preview").value = "";
}

})();

