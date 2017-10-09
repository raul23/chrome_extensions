//region {variables and functions}
var consoleGreeting = "Hello World!";
var responseObject = {
	message : "Test message Y",
	sender : "content_script.js"
};
function GetFormattedMessageString(message,sender) {
	return "Message '" + message + "' from Sender '" + sender.id + "'";
}
function createButton() {
	var button = document.createElement("button");
	button.style.width = "70px";
	button.style.height = "40px";
	button.style.position = "fixed";
	button.style.top = "10px";
	button.style.right = "10px";
	button.innerText = "Send Message";
	document.body.appendChild(button);
	return button;
}
//end-region



//region {calls}
console.log(consoleGreeting);
var button = createButton();
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse) {
	sendResponse(responseObject); //Will get called from the script where sendResponse is defined
	console.log(GetFormattedMessageString(message,sender));
});
//end-region