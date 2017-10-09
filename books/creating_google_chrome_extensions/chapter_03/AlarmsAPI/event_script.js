//region {variables and functions}
var greeting = "Hello World!";
var count = 0;
var alarmName = "testAlarm";
var alarmInfo = {
	when : Date.now() + 6000,
	periodInMinutes : 1 //Repeatedly fire after every 1 minute
};
//end-region



/*
 * NOTE:
 * While debugging extension, which is loaded unpacked, there's no
 * limit to how often the alarm can fire. For all other cases, alarms with interval
 * less than one minute will not be honored and will cause a warning.
 */
//region {calls}
console.log(greeting);
chrome.alarms.clearAll();
chrome.alarms.onAlarm.addListener(function(alarm) {
	console.log("onAlarm-" + ++count);
});
chrome.alarms.create(alarmName,alarmInfo);
//end-region