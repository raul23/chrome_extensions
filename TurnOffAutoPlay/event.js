var scriptName = "event.js";
var consoleMessage = scriptName + ": %s";
// Cookie details for the PREF cookie related with the autoplay feature
// e.g. PREF : f1=50000000&f5=20000&f6=400
var cookieDetails = {
    url: "https://www.youtube.com",
    // PREF is the youtube.com cookie that is in charge of autoplay (among other features)
    name: "PREF", // cookie name
};

// Object that groups all the useful info about the autoplay key-value pair in
// the PREF cookie
var keyValueAutoPlay = {
    // Key in the cookie that controls the autoplay
    keyAutoPlay: "f5",
    // Value in the cookie to switch the autoplay OFF
    valueAutoPlayOFF: 30000,
    // Value in the cookie to switch the autoplay ON
    valueAutoPlayON: 20000,
    // Separator used to separate key=value pair in cookie value
    // e.g. f1=50000000&f5=20000&f6=400
    keyValueSeparator: "&",

    // Returns the string representing the key=value pair for the "autoplay OFF" case
    // e.g. f5=30000
    getKeyValueOFF: function() {
        return this.keyAutoPlay+"="+this.valueAutoPlayOFF;
    },
    // Returns the string representing the key=value pair for the "autoplay ON" case
    // e.g. f5=20000
    getKeyValueON: function() {
        return this.keyAutoPlay+"="+this.valueAutoPlayON;
    },
};

// Wrapper to chrome.cookies() that sets a cookie with the given cookie data
function setCookie(cookie){
    var details = {};
    Object.keys(cookie).forEach(function(key){
        // Do not add the following keys: session and hostOnly
        if(key !== "session" && key !== "hostOnly" && cookie.hasOwnProperty(key)){
            details[key] = cookie[key];
        }
    });
    // Add url
    details["url"] = cookieDetails.url;

    chrome.cookies.set(details, function(cookie) {
        if(cookie === null)
            console.log(consoleMessage, "error in setting the cookie=" + cookie.name);
        else{
            console.log(consoleMessage, "success in setting cookie=" + cookie.name);
        }
    });
}

function getAutoPlayStatus(cookie){
    var index = cookie.value.indexOf(keyValueAutoPlay.getKeyValueON());
    if(index !== -1 ){ // autoplay is ON
        console.log(consoleMessage, "autoplay is turned ON");
        return "ON";
    }
    else{
        index = cookie.value.indexOf(keyValueAutoPlay.getKeyValueOFF());
        if(index !== -1){ // autoplay is OFF
            console.log(consoleMessage, "autoplay is already turned OFF");
            return "OFF";
        }
        else{
            console.log(consoleMessage, "No autoplay key-value found in the cookie");
            return "INVALID";
        }
    }
}

function turnOFFAutoPlay(cookie){
    // Replace the key-value pair for the autoplay ON case
    // with the key-value pair for the autoplay OFF case
    var status = getAutoPlayStatus(cookie);
    if(status === "ON" ){ // autoplay is ON
        cookie.value = cookie.value.replace(keyValueAutoPlay.getKeyValueON(), keyValueAutoPlay.getKeyValueOFF());
        setCookie(cookie);
        console.log(consoleMessage, "cookie value is changed to "
            + keyValueAutoPlay.getKeyValueOFF());
        console.log(consoleMessage, "autoplay is turned OFF");
        return 1;
    }
    else if(status === "OFF"){ // autoplay is OFF. Nothing to do
        console.log(consoleMessage, "cookie will not be changed since "
            + "the autoplay is already OFF");
        return 0;
    }
    else // invalid case
        console.log(consoleMessage, "No autoplay key-value found in the cookie");
        return -1;
}



console.log(scriptName + ": It's a me, " + scriptName + "!");

// Register listener
chrome.cookies.onChanged.addListener(
    function(changeInfo) {
        console.log(consoleMessage, "chrome.cookies.onChanged event");
        // Get the "PREF" cookie which is related to the autoplay feature
        if(changeInfo.cause === "explicit" && changeInfo.cookie.name === cookieDetails.name){
            console.log(consoleMessage, "Cookie " + cookieDetails.name + " found");
            var cookie = changeInfo.cookie;
            turnOFFAutoPlay(cookie);
        }
    }
);

chrome.runtime.onInstalled.addListener(
    function(details) {
        console.log(consoleMessage, "chrome.runtime.onInstalled event");
        // Get the "PREF" cookie which is related to the autoplay feature
        chrome.cookies.get(cookieDetails, function(cookie) {
            if(cookie === null)
                console.log(consoleMessage, "No cookie " + cookieDetails.name + " found");
            else{
                console.log(consoleMessage, "Cookie " + cookieDetails.name + " found");
                turnOFFAutoPlay(cookie);
            }
        });
    }
);

chrome.management.onEnabled.addListener(
    function(info) {
        console.log(consoleMessage, "chrome.management.onEnabled event");
        // Get the "PREF" cookie which is related to the autoplay feature
        chrome.cookies.get(cookieDetails, function(cookie) {
            if(cookie === null)
                console.log(consoleMessage, "No cookie " + cookieDetails.name + " found");
            else{
                console.log(consoleMessage, "Cookie " + cookieDetails.name + " found");
                turnOFFAutoPlay(cookie);
            }
        });
    }

);

// Example of cookie:
// cookie name: PREF
// cookie value: f1=50000000&f5=20000&f6=400
// Description:
// f5=20000: autoplay ON
// f5=30000: autoplay OFF
// f6=400: dark theme
// TODO: f1 controls which feature?


// "*://*.google.com/"
// "*://*/*"