var scriptName = "event.js";
var consoleMessage = scriptName + ": %s";

console.log(consoleMessage, "It's a me, " + scriptName + "!");

chrome.runtime.onInstalled.addListener(
    function(details) {
        console.log(consoleMessage, "chrome.runtime.onInstalled event");
    }
);

chrome.management.onEnabled.addListener(
    function(info) {
        console.log(consoleMessage, "chrome.management.onEnabled event");
    }
);