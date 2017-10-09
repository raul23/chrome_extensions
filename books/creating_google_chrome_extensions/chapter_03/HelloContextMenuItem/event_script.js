//region {variables and functions}
var consoleGreeting = "Hello World! - from event_script.js";
function logSuccess(task) {console.log("%s Successful!",task);}
function logFailure(task) {console.log("%s Failed!",task);}
var ID_CONTEXT_MENU_ITEM_HELLO = "ID_CONTEXT_MENU_ITEM_HELLO";
var TYPES_CONTEXT_MENU_ITEM = { //Object used as an enum
	"NORMAL" : "normal",
	"CHECKBOX" : "checkbox",
	"RADIO" : "radio",
	"SEPARATOR" : "separator"
};
var TYPES_CONTEXT = {
	"ALL" : "all",
	"PAGE" : "page",
	"FRAME" : "frame",
	"SELECTION" : "selection",
	"LINK" : "link",
	"EDITABLE" : "editable",
	"IMAGE" : "image",
	"VIDEO" : "video",
	"AUDIO" : "audio",
	"LAUNCHER" : "launcher",
	"BROWSER_ACTION" : "browser_action",
	"PAGE_ACTION" : "page_action"
};
var match_pattern_stackoverflow = "*://*.stackoverflow.com/*";
var createProperties = {
	"type" : TYPES_CONTEXT_MENU_ITEM.NORMAL,
	"id" : ID_CONTEXT_MENU_ITEM_HELLO,
	"title" : "Custom search '%s'",
	"contexts" : [TYPES_CONTEXT.ALL],
	//Use "targetUrlPatterns" for TYPES_CONTEXT.IMAGE, TYPES_CONTEXT.VIDEO, TYPES_CONTEXT.AUDIO, etc.
	"targetUrlPatterns" : []
};
//end-region



//region {calls}
console.log(consoleGreeting);
chrome.contextMenus.create(createProperties,function() {
	if(!chrome.runtime.lastError) {
		logSuccess("ContextMenus.Create");
		chrome.contextMenus.onClicked.addListener(function(info,tab) {
			console.log("id: %s, selection: %s, url: %s",info.menuItemId,info.selectionText,tab.url);
		});
	} else {
		logFailure("ContextMenus.Create");
	}
});
//end-region