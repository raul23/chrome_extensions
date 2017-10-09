//region {variables and functions}
var greeting = "Hello World!";
var downloadOptions = {
	"url" : "http://www.apress.com/downloadable/download/sample/sample_id/1456/",
	"saveAs" : true
};
//end-region



//region {calls}
console.log(greeting);
chrome.downloads.download(downloadOptions,function(downloadId) {
	console.log(downloadId);
	/*
	chrome.downloads.pause(downloadId,function() {
		if(!chrome.runtime.lastError) console.log("pause");
	});
	*/
});
chrome.downloads.onCreated.addListener(function(downloadItem) {
	console.log("onCreated:");
	console.log(downloadItem);
});
chrome.downloads.onErased.addListener(function(downloadId) {
	console.log("onErased:");
	console.log(downloadId);
});
chrome.downloads.onChanged.addListener(function(downloadDelta) {
	console.log("onChanged:");
	console.log(downloadDelta);
});
//end-region