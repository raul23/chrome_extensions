//region {variables and functions}
var greeting = "Hello World!";
var tenMinutesAsMilliseconds = 10 * 60 * 1000;
//getTime returns the number of milliseconds since the epoch
var currentTimeAsMilliseconds = new Date().getTime();
//query to filter history using "text", in the past hour
var query = {
	"text" : "apress",
	"startTime" : currentTimeAsMilliseconds - 6 * tenMinutesAsMilliseconds,
	"endTime" : currentTimeAsMilliseconds,
	"maxResults" : 10
};
//end-region



//region {calls}
console.log(greeting);
chrome.history.search(query,function(results) {
	results.forEach(function(result) {
		//result is of type HistoryItem
		console.log(result);
	});
});
chrome.history.getVisits({"url" : "http://www.example.org"},function(results) {
	results.forEach(function(result) {
		//result is of type VisitItem
		console.log(result);
	});
});
chrome.history.addUrl({"url" : "http://www.example.org"},function() {
	console.log("addUrl");
});
chrome.history.deleteUrl({"url" : "http://www.example.org"},function() {
	console.log("deleteUrl");
});
/*
chrome.history.deleteAll(function() {
	console.log("deleteAll");
});
*/
//end-region