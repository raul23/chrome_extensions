//region {variables and functions}
var consoleGreeting = "Hello World! - from event_script.js";
var queryInfoForAllTabs = {
	//"active":false,"currentWindow":true
};
function logTabs(tabs) {
	console.group("Tabs");
	console.log(tabs);
	console.groupEnd("Tabs");
}
// Queries all the tabs
// NOTE: this function only gets called once, when the event script is loaded in the browser
// NOTE: listener defined for showing Page-Action every time the tabs get updated (opened
// or updated)
function queryTabsAndShowPageActions() {
	// chrome.tabs.query API used to query all the tabs
	// `queryInfoForAllTabs` is emtpy to make the query API return all the tabs
	// in order to show all the Page-Action on all the tabs
	chrome.tabs.query(
		queryInfoForAllTabs,
		function(tabs) { // callback function
			// tabs is an array
			console.log("All tabs length: %s", tabs.length);
			logTabs(tabs); //Output tabs object to the console as a separate visual group
			if(tabs.length > 0) {
				for(var i=0; i<tabs.length; i++) {
					// Based on the tab id, a Page-Action is shown
					if(tabs[i].status === "complete") chrome.pageAction.show(tabs[i].id);
				}
			}
		}
	);
}
//end-region



//region {calls}
console.log(consoleGreeting);
//Show Page-Actions using the chrome.tabs.query method
//queryTabsAndShowPageActions();
//Show Page-Actions using the onUpdated event
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab) {
	chrome.pageAction.show(tabId);
});
//end-region