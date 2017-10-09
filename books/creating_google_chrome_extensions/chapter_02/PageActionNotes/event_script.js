//region {variables and functions}
var consoleGreeting = "Hello World! - from event_script.js";
var ruleStackOverflowHost = {
	"conditions" : [
		new chrome.declarativeContent.PageStateMatcher({
			"pageUrl" : {
				"hostEquals" : "stackoverflow.com",
				"schemes" : ["http","https"]
			}
		})
	],
	"actions" : [new chrome.declarativeContent.ShowPageAction()]
};
//end-region



//region {calls}
console.log(consoleGreeting);
// Register rules. Since rules are persistent across browsing sessions, they are only
// added once when the extension is installed
chrome.runtime.onInstalled.addListener(function() {
	//Replace all rules
	// `undefined` is given to remove previously defined rules
	chrome.declarativeContent.onPageChanged.removeRules(undefined,function() {
		//With a new rule
		chrome.declarativeContent.onPageChanged.addRules([ruleStackOverflowHost]);
	});
});
//end-region