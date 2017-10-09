//region {variables and functions}
var consoleGreeting = "Hello World! - from event_script.js";
var cssCode = "a {text-decoration:underline !important;}";
cssCode += "div {background-color:#999 !important;}";
var javascriptCode = "var imgElement = document.createElement('img');";
javascriptCode += "imgElement.src = 'http://placehold.it/350x150';";
javascriptCode += "document.body.appendChild(imgElement);";
//end-region



//region {calls}
console.log(consoleGreeting);
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.insertCSS(
        {
            //CSS file or code to inject
            //file : "mystyles.css",
            code : cssCode
        },
        function() {
            console.log("CSS inserted!");
        }
    );
    chrome.tabs.executeScript(
        {
            //JavaScript file or code to inject
            //file : "content_script.js",
            code : javascriptCode
            
        },
        function() {
            console.log("JavaScript executed!");
        }
    );
});
//end-region