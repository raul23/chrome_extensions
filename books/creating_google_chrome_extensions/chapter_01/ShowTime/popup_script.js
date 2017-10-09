//region {variables and functions}
var timeId = "time";
var dateId = "date";
var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var consoleGreeting = "Hello World! - from popup_script.js";

// arguments are the elements used to display the current time and date
function setTimeAndDate(timeElement,dateElement) {
	var date = new Date();
	var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
	var time = date.getHours() + ":" + minutes;
	//In "date.getMonth", 0 indicates the first month of the year
	//In "date.getDay", 0 represents Sunday
	var date = days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear();
	timeElement.innerHTML = time;
	dateElement.innerHTML = date;
}
//end-region


//region {calls}
console.log(consoleGreeting);
// TIP: access the DOM AFTER the document has loaded
// Listener for the DOMContentLoaded event
document.addEventListener("DOMContentLoaded",function(dcle) {
	var timeElement = document.getElementById(timeId);
	var dateElement = document.getElementById(dateId);
	setTimeAndDate(timeElement,dateElement);
});
//end-region