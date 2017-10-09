//region {variables and functions}
var ON_INPUT_ENTERED_DISPOSITION = {
	"CURRENT_TAB" : "currentTab",
	"NEW_FOREGROUND_TAB" : "newForegroundTab",
	"NEW_BACKGROUND_TAB" : "newBackgroundTab"
};
var suggestResultOne = {
	"content" : "Some content",
	"description" : "Description"
};
var suggestResults = [suggestResultOne];
var searchService = "https://www.google.com/search?q=chrome+extensions+developers+";
function CreateWindow(url) {
	var windowCreateData = {"url" : ""};
	windowCreateData.url = url;
	chrome.windows.create(windowCreateData);
}
var descriptions = {
	"a" : ["actions","alarms","apps",],
	"b" : ["background-page","bookmarks","browser-action"],
	"c" : ["commands","content-script","context-menu"],
	"d" : ["dashboard","declarativeContent"],
	"e" : ["event-script","examples"],
	"h" : ["history"],
	"i" : ["incognito","inject"],
	"m" : ["management page","manifest","match pattern","messaging"],
	"o" : ["omnibox"],
	"p" : ["page-action","permissions","plugins","popup"],
	"r" : ["resources panel","runtime"],
	"s" : ["sources panel","store","storage"],
	"t" : ["tabs","themes"]
};
function getSuggestResults(key) {
	var results = [];
		if(!descriptions[key] || !key) return suggestResults;
	for(var i=0;i<descriptions[key].length;i++) {
		var suggestResult = {};
		suggestResult["content"] = descriptions[key][i];
		suggestResult["description"] = "Search '" + descriptions[key][i] + "' on developer.chrome.com";
		results[i] = suggestResult;
	}
	return results;
}
//end-region



//region {calls}
chrome.omnibox.setDefaultSuggestion({"description":"Search on developer.chrome.com"});
chrome.omnibox.onInputStarted.addListener(function() {
	console.log("<InputStarted>");
});
chrome.omnibox.onInputChanged.addListener(function(text,suggest) {
	console.log("<InputChanged> Text: " + text);
	//suggest(suggestResults);
	suggest(getSuggestResults(text));
});
chrome.omnibox.onInputEntered.addListener(function(text,disposition) {
	console.log("<InputEntered> Text: " + text);
	CreateWindow(searchService + text);
	//default disposition is ON_INPUT_ENTERED_DISPOSITION.CURRENT_TAB
});
//end-region