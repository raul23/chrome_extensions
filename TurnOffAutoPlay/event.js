var consoleMessage = "event.js : ";
console.log("It's a me, event.js!");

chrome.runtime.onInstalled.addListener(
    function(details) {
        // Using console.log() we won't see the messages, use alert() instead
        console.log(consoleMessage + "chrome.runtime.onInstalled event");
        // alert(consoleMessage + "chrome.runtime.onInstalled event");
    }
);

chrome.management.onEnabled.addListener(
    function(info) {
        console.log(consoleMessage + "chrome.management.onEnabled event");
        // alert(consoleMessage + "chrome.management.onEnabled event");
    }
);