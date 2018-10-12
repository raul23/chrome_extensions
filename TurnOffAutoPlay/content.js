var scriptName = 'content.js';
var consoleMessage = scriptName + ': %s';
var toggleButtonId = 'improved-toggle';

function setToggle(){
    console.log(consoleMessage, 'setToggle()');
    var toggleButton = document.getElementById(toggleButtonId);
    if(toggleButton.getAttribute('checked')!==null){
        console.log(consoleMessage, 'toggleButton will be unchecked');
        toggleButton.click();
    }
    else
        console.log(consoleMessage, 'toggleButton is already unchecked');
}

function process(event) {
    console.log(consoleMessage, 'process() fired by event=' + event.type);
    if(event.type === 'DOMContentLoaded') {
        console.log(consoleMessage, 'Process `DOMContentLoaded` calling setToggle()');
        setToggle();
    }
    else{
        if(event.type === 'yt-navigate-finish' &&
            document.getElementById(toggleButtonId) !== null){
            console.log(consoleMessage, 'Process `yt-navigate-finish` calling setToggle()');
            setToggle();
        }
    }
}

console.log(consoleMessage, 'starting');

// ref.: https://stackoverflow.com/a/34100952
// Good for next time loading through clicking, no address typing
window.addEventListener('spfdone', process); // old youtube design
window.addEventListener('yt-navigate-start', process); // new youtube design
window.addEventListener('yt-navigate-finish', process); // new youtube design

$(document).ready(function(){
    // Because $(document).ready() is still not enough
    // It's still too early, we have to wait certain elements to exist, then
    // execute the function.
    var everythingLoaded = setInterval(function() {
        console.log(consoleMessage, 'Everything is loaded!');
        var toggleButton = document.getElementById(toggleButtonId);
        if (toggleButton !== null) {
            // Good for first time page loading
            // this is the function that gets called when everything is loaded
            console.log(consoleMessage, 'Process `DOMContentLoaded` calling setToggle');
            setToggle();
            clearInterval(everythingLoaded);
        }
    }, 330);
});
