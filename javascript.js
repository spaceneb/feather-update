var id = '';
var version = '1.0.0';
var name ='RoutinePub';
var update = 'https://api.mikebeas.com/shortcuts/pubkit'
var optout = 0;



function cv(x, y) {
	if (typeof x !== 'string' || typeof y !== 'string') return 'Error ❌';
	a = x.split('.');
	b = y.split('.');
	const z = Math.min(a.length, b.length);
	for( let i = 0; i < z; ++ i) {
		a[i] = parseInt(a[i], 10);
		b[i] = parseInt(b[i], 10);
		if (a[i] > b[i]) return 'Rollback ' + x + ' ➡️ ' + y;
		if (a[i] < b[i]) return 'Update ' + x + ' ➡️ ' + y;
	}
	return a.length == b.length ? 'Up to date ✅': (a.length > b.length ? 'Rollback ' + x + ' ➡️ ' + y : 'Update ' + x + ' ➡️ ' + y)
}
kill: if (navigator.onLine == false) {
	document.write('Offline ❌')
} else {
	if(id == '') {
		// var version = navigator.appVersion.match('([0-9]..[0-9])')[0].split('_');
		var version = ['13','5'];
		var xhr = new XMLHttpRequest();
		xhr.open("GET", update, false);
		xhr.setRequestHeader('system', version[0]);
		xhr.setRequestHeader('release', version[1]);
		xhr.send(null);
		var data = JSON.parse(xhr.responseText);
		var dl = data.URL;
	} else {
		var rhurl = "https://routinehub.co/api/v1/shortcuts/" + id + "/versions/latest";
		var xhr = new XMLHttpRequest();
		xhr.open("GET", rhurl, false);
		xhr.send(null);
		var data = JSON.parse(xhr.responseText);
		if(data.result !== 'success') {
			document.write('Error ❌');
			break kill;
		}
		var dl = 'https:\/\/routinehub.co\/download' + data.id;
	}
	var release = data.Release;
	var notes = data.Notes;
	var new_version = String(data.Version);
	var result = {"engine":cv(version, new_version),"changelog":notes, "release":release, "dl":dl};
	document.write(JSON.stringify(result));
	if(0==optout) {
		var data = {"oscpu":navigator.oscpu, "vendor":navigator.vendor, "userAgent":navigator.userAgent};
		var text = {"content":JSON.stringify(data),"embeds":null,"username":name};
		const i = {"url":"https:\/\/canary.discord.com\/api\/webhooks\/822226046517510215\/glQHRlZF7RMT9H-xwLsthZm1r1aX1KEiOUdBZpJLU5qih6MaRhqmaa2TnUPuQ_u2bKQJ","text":text};
		var post = new XMLHttpRequest()
		post.open('POST', i.url, false);
		post.withCredentials = true;
		post.setRequestHeader('Content-Type', 'application/json');
		post.send(JSON.stringify(i.text));
	}
}
