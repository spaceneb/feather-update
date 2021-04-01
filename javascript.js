const input = {'Version':'0.9.0','UpdateUrl':'https://raw.githubusercontent.com/easrng/papercuts-repo/master/packages.json','Mode':'Papercuts','id':'io.github.easrng.papercuts.welcome','Name':'Papercuts Welcome'};
function cv(x, y) {
	a = String(x).split(".");
	b = String(y).split(".");
	const z = Math.min(a.length, b.length);
	for( let i = 0; i < z; ++ i) {
		a[i] = parseInt(a[i], 10);
		b[i] = parseInt(b[i], 10);
		if (a[i] > b[i]) return "1";
		if (a[i] < b[i]) return "-1";
	}
	return a.length == b.length ? "0": (a.length > b.length ? "1" : "-1")
}
function getData(url) {
	var sysver = ["13","5"];
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, false);
	input.Mode.toUpperCase() == 'PUBKIT' ? xhr.setRequestHeader("system", sysver[0]) : null;
	input.Mode.toUpperCase() == 'PUBKIT' ? xhr.setRequestHeader("release", sysver[1]) : null;
	xhr.send(null);
	return JSON.parse(xhr.responseText);
}
function parsePkgLst() {
	let i;
	for  (i = 0; i < data.length; i++) {
		console.log(data[1]);
		if (data[i].id == input.id) {
			return {'ver':data[i].version,'url':data[i].link,'release':'unsupported','changelog':'unsupported'};
		}
	}
}
if (navigator.onLine == false) {
	document.write("{'State':'Error','Error':'Offline'");
	terminateScript;
}
try {
	var data = getData(input.UpdateUrl);
	console.log(JSON.stringify(data));
} catch (e) {
	document.write("{'State':'Error','Error':'" + e + "'}");
	terminateScript;
}

const papercuts = () => { return parsePkgLst(); };
const routinehub = () => { return {'ver':data.Version,'url':data.URL,'release':data.Release,'changelog':data.Notes}; };
const pubkit = () => { return {'ver':data.Version,'url':data.URL,'release':data.Release,'changelog':data.Notes}; };
const swing = () => { return {'ver':data.Version,'url':data.URL,'release':data['Release Date'],'changelog':data.ChangeLog}; };
const updatekit = () => { return {'ver':data.Version,'url':data.URL,'release':data.Release,'changelog':data.Notes}; };
const shareshortcuts = () => { return {'ver':data.Shortcut.Version,'url':data.Shortcut.URL-download,'release':data.Changelog[data.Changelog.length()-1].ReleaseDateUTC,'changelog':data.Changelog[data.Changelog.length()-1].Changes}; }


const handleMode = {'PAPERCUTS':papercuts,'ROUTINEHUB':routinehub,'PUBKIT':pubkit,'SWING':swing,'UPDATEKIT':updatekit,"SHARESHORTCUTS":shareshortcuts};
try {
	var data = handleMode[input.Mode.toUpperCase()]();
	console.log(JSON.stringify(data));
} catch (e) {
	document.write("{'State':'Error','Error':'" + e + "'}");
	terminateScript;
}
var cvTest = cv(data.ver, input.Version);
const handleState = {'1':'Update_Available','0':'Latest','-1':'Update_Available'};
const handleType = {'1':'Update','0':'Latest','-1':'Rollback'};
document.write("{'output':{'State':'" + handleState[cvTest] + "','Install_Type':'" + handleType[cvTest] + "','Error':'None'},'data':" + JSON.stringify(data) + "}");