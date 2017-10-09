//region {variables and functions}
var consoleGreeting = "Hello World! - from event_script.js";
var details_icon1 = {path:"icon-1.png"};
var details_icon2 = {path:"icon-2.png"};
var toggle = true;
//end-region



//region {calls}
console.log(consoleGreeting);
// Attaches a listener to the onCommand event
// command is the name of the command (shortcut key) that was performed
chrome.commands.onCommand.addListener(function(command) {
	if(toggle){
		chrome.browserAction.setIcon(details_icon2);
		toggle = false;
	}
	else{
		chrome.browserAction.setIcon(details_icon1);
		toggle = true;
	}
});
//end-region