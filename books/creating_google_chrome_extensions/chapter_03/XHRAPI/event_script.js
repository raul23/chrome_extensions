//region {variables and functions}
var greeting = "Hello World!";
var xhr = new XMLHttpRequest();
function onReadyStateChange() {
	if(xhr.readyState == 4) {
		console.log(xhr.responseText);
	}
}
var host = "http://localhost/";
var ucService = host + "Exercise Files/Chapter3/XHRAPI/webpage.php?";
var queryString = "name=" + encodeURIComponent("xhr api");
//end-region



//region {calls}
console.log(greeting);
xhr.onreadystatechange = onReadyStateChange;
xhr.open("GET",ucService + queryString);
xhr.send();
//end-region