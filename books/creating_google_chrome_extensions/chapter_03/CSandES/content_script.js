//region {variables and functions}
var sendMessageButtonID = "send_message";
var greeting = "Hello World!";
var message = "Test message X";
function responseCallback(responseObject) {
	console.log("Message '" + responseObject.message + "' from Sender '" + responseObject.sender + "'");
}
//end-region



//region {calls}
console.log(greeting);
(function(){
	var buttonElement = document.createElement("button");
	buttonElement.style.position = "fixed";
	buttonElement.style.display = "block";
	buttonElement.style.width = "70px";
	buttonElement.style.height = "40px";
	buttonElement.style.bottom = "10px";
	buttonElement.style.left = "10px";
	buttonElement.innerText = "Message Runtime";
	buttonElement.addEventListener("click",function(ce) {
		//This message will be intercepted by event_script.js
		chrome.runtime.sendMessage(message,responseCallback);
	});
	document.body.appendChild(buttonElement);
	/*
	//var port = chrome.runtime.connect("...",{"name":"connection1"});
	var port = chrome.runtime.connect({"name":"connection1"});
	port.onMessage.addListener(function(message){console.log(message);});
	port.postMessage("...");
	*/
})();
//end-region