//region {variables and functions}
var greeting = "Hello World!";
var responseObject = {
	message : "Test message Y",
	sender : "event_script.js"
};
function GetFormattedMessageString(message,sender) {
	return "Message '" + message + "' from Sender '" + sender.url + "'";
}
//end-region



//region {calls}
console.log(greeting);
chrome.runtime.onMessageExternal.addListener(function(message,sender,sendResponse) {
	sendResponse(responseObject); //Will get called from the script where sendResponse is defined
	console.log(GetFormattedMessageString(message,sender));
});
//end-region