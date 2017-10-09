//region {variables and functions}
var greeting = "Hello World!";
var createProperties = {
	url : "http://www.example.org",
	active : false,
};
var updateProperties = {
	pinned : true
};
function getJavaScriptCode(dataUrl) {
	var javascriptCode = "var imgElement = document.createElement('img');";
	javascriptCode += "document.body.appendChild(imgElement);";
	javascriptCode += "imgElement.style.borderTop = '2px dashed silver';";
	javascriptCode += "imgElement.src = ";
	javascriptCode += "'" + dataUrl + "';";
	return javascriptCode;
}
function createAndUpdateTab(tab) {
	chrome.tabs.create(createProperties,function(tab) {
		console.log("create");
		//integer or array of integers
		//chrome.tabs.remove(tab.id);
		/*
		chrome.tabs.duplicate(tab.id,function(tab) {
			console.log("duplicate");
		});
		*/
		chrome.tabs.update(tab.id,updateProperties,function(tab) {
			console.log("update");
			//chrome.tabs.reload(tab.id);
			chrome.tabs.getZoom(tab.id,function(zoomFactor) {
				console.log("getZoom");
				console.log(zoomFactor); //1
			});
			/*
			chrome.tabs.setZoom(tab.id,2,function() {
				console.log("setZoom");
			});
			*/
		});
	});
}
//end-region



//region {calls}
console.log(greeting);
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.captureVisibleTab({"format":"png"},function(dataUrl) {
		//Cannot access a chrome:// URL
		chrome.tabs.executeScript(tab.id,{"code":getJavaScriptCode(dataUrl)});
	});
	//createAndUpdateTab(tab);
});
//end-region