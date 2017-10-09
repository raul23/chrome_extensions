//region {variables and functions}
var greeting = "Hello World!";
//end-region



//region {calls}
console.log(greeting);
/*
//single key or a list of keys for items to remove
chrome.storage.sync.remove("color",function() {
	console.log("remove");
	chrome.storage.sync.get("color",function(items) {
		console.log("get");
		console.log(items);
	});
});
*/
chrome.storage.sync.set({"color":"red"},function() {
	console.log("set");
	//string or array of string or object keys
	chrome.storage.sync.get("color",function(items) {
		console.log("get");
		console.log(items);
	});
});
chrome.storage.onChanged.addListener(function(changes,areaName) {
	console.log(changes);
	//"sync","local" or "managed"
	console.log(areaName);
});
//end-region