(function() {
const DEF_HEAD = "Now Browsing";
window.onload = function() {
	var head = DEF_HEAD;
	var body = "";
	var text = "";
	var url = "";
	var features = "width=600,height=500,centerscreen=yes,menubar=yes,location=yes,resizeable=yes,scrollbars=yes,status=yes";
	browser.tabs.query({currentWindow: true, active: true})
		.then((tabs) => {
			body = tabs[0].title;
			url = tabs[0].url;
			flush(head, body, url);
		})
		.catch(clear);

	document.getElementById("text").oninput = function() {
		text = document.getElementById("text").value;
	}

	document.getElementById("hash").onchange = function() {
		head = noSpace(head);
		flush(head, body, url);
	}

	document.getElementById("head").oninput = function() {
		head = document.getElementById("head").value;
		head = noSpace(head);
		flush(head, body, url);
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

	} else {
		head = head.substr(1, head.length);
	}
}

function flush(head, body, url) {
	document.getElementById("text").value = head + ": " + body + "\n" + url + "\n";
}

function clear() {
	document.getElementById("text").value = "";
}

})();

