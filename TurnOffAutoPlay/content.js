var scriptName = 'content.js';
var consoleMessage = scriptName + ': %s';
var toggleButtonId = 'toggle';

function setToggle(){
    console.log(consoleMessage, 'setToggle()');
    var toggleButton = document.getElementById(toggleButtonId);
    if(toggleButton.checked===true){
        console.log(consoleMessage, 'toggleButton will be unchecked');
        toggleButton.click();
    }
}

function process(event) {
    console.log(consoleMessage, 'process() fired by event=' + event.type);
    if(event.type === 'DOMContentLoaded')
        setToggle();
    else{
        if(event.type === 'yt-navigate-finish' &&
            document.getElementById(toggleButtonId) !== null){
            setToggle();
        }
    }
}



console.log(consoleMessage, 'starting');

// ref.: https://stackoverflow.com/a/34100952
window.addEventListener('spfdone', process); // old youtube design
window.addEventListener('yt-navigate-start', process); // new youtube design
window.addEventListener('yt-navigate-finish', process); // new youtube design

// ref.: http://callmenick.com/post/check-if-everything-loaded-with-javascript
/*
var everythingLoaded = setInterval(function() {
    var toggleButton = document.getElementById(toggleButtonId);
    //var toggleButton = document.getElementById("toggle");
    //if (toggleButton !== null) {
    if (/loaded|complete/.test(document.readyState && (toggleButton !== null))) {
        clearInterval(everythingLoaded);
        process({type: 'DOMContentLoaded'}); // this is the function that gets called when everything is loaded
    }
}, 330);
*/
$(document).ready(function(){
    // because document ready still not enough
    // it's still too early, we have to wait certain element exist, then execute function.
    var everythingLoaded = setInterval(function() {
        var toggleButton = document.getElementById(toggleButtonId);
        if (toggleButton !== null && toggleButton.checked !== undefined) {
            process({type: 'DOMContentLoaded'}); // this is the function that gets called when everything is loaded
            clearInterval(everythingLoaded);
        }
    }, 330);
});