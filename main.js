(function() {
const FEAT = "width=600,height=500,centerscreen=yes,menubar=yes,location=yes,resizeable=yes,scrollbars=yes,status=yes";
const DEF_HEAD = "Now Browsing";
const SERVICE = {
	mastodon: {
		limit: 100,
		base: "web+mastodon://share?text=",
		icon: "icons/mastodon.svg"
	},
	twitter: {
		limit: 140,
		base: "https://twitter.com/intent/tweet?text=",
		icon: "icons/twitter.svg"
	}
};

window.onload = function() {
	var head = DEF_HEAD;
	var body = "";
	var url = "";
	var comment = "";

	addShareButton();
	browser.tabs.query({currentWindow: true, active: true})
		.then((tabs) => {
			body = tabs[0].title;
			url = tabs[0].url;
			var t = merge(head, body, url, comment);
			flush(t);
		})
		.catch(clear);

	function addShareButton() {
		var p = document.getElementById("share_button");
		for(var s in SERVICE) {
			var srv = SERVICE[s];
			var b = document.createElement("input");
			b.setAttribute('type', 'image');
			b.setAttribute('id', s);
			b.setAttribute('value', s);
			b.setAttribute('alt', s);
			b.setAttribute('src', srv.icon);
			p.appendChild(b);
		}
	}

	function openPostWindow(id) {
		var srv = SERVICE[id];
		var limit = srv.limit;
		var u = srv.base;
		if((head + body + comment + url).length >= limit) {
			body = optimize(body, limit);
		}
		var txt = merge(head, body, url, comment);
		u += encodeURIComponent(txt);
		window.open(u, id, FEAT);
	}

	document.getElementById("mastodon").onclick = function() {
		openPostWindow("mastodon");
	}
	document.getElementById("twitter").onclick = function() {
		openPostWindow("twitter");
	}

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

