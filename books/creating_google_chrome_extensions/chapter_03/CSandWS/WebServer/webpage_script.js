//region {variables and functions}
var sendMessageButtonID = "send_message";
var greeting = "Hello World!";
//var targetOrigin = window.location.origin;
//var message = "Test message Y";
//end-region



//region {calls}
console.log(greeting);
document.addEventListener("DOMContentLoaded",function(dcle) {
	var buttonID = document.getElementById(sendMessageButtonID);
	buttonID.addEventListener("click",function(ce) {
		//window.postMessage(message,targetOrigin);
	});
});
window.addEventListener("message",function(me) {
	console.log("message: " + me.data);
});
//end-region