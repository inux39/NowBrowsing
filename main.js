(function() {
const DEF_HEAD = "Now Browsing";
const MASTODON = 500;
const TWITTER = 140;
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
			var t = merge(head, body, url, comment);
			flush(t);
		})
		.catch(clear);

	document.getElementById("comment").oninput = function() {
		comment = document.getElementById("comment").value;
		var t = merge(head, body, url, comment);
		flush(t);
	}

	document.getElementById("hash").onchange = function() {
		head = noSpace(head);
		var t = merge(head, body, url, comment);
		flush(t);
	}

	document.getElementById("head").oninput = function() {
		head = document.getElementById("head").value;
		head = noSpace(head);
		var t = merge(head, body, url, comment);
		flush(t);
	}

	document.getElementById("mastodon").onclick = function() {
		if((head + body + comment + url).length >= MASTODON) {
			body = optimize(body, MASTODON);
		}
		var txt = merge(head, body, url, comment);
		var u = "web+mastodon://share?text=" + encodeURIComponent(txt);
		window.open(u, "Masotodn", features);
	}

	document.getElementById("twitter").onclick = function() {
		if((head + body + comment + url).length >= TWITTER) {
			body = optimize(body, TWITTER);
		}
		var txt = merge(head, body, url, comment);
		var u = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(txt);
		window.open(u, "Twitter", features);
	}
}

function optimize(body, max) {
	return body.substr(0, max - 4) + "...";
}

function merge(head, body, url, comment) {
	return head + ": " + body + "\n" + url + "\n" + comment;
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

function flush(text) {
	document.getElementById("preview").value = text;
}

function clear() {
	document.getElementById("preview").value = "";
}

})();

