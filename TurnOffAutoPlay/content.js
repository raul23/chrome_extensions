var scriptName = 'content.js';
var consoleMessage = scriptName + ': %s';
var toggleButtonId = 'toggle';

function setToggle(){
    console.log(consoleMessage, 'setToggle');
    var toggleButton = document.getElementById(toggleButtonId);
    toggleButton.click();
}

function process(event) {
    console.log(consoleMessage, 'process() fired by event=' + event.type);
    if(event.type === 'DOMContentLoaded')
        setToggle();
    else{
        if(event.type === 'yt-navigate-start' &&
            document.getElementById(toggleButtonId) !== null){
            console.log(consoleMessage, 'test')
        }
    }
}



console.log(consoleMessage, 'starting');

// ref.: https://stackoverflow.com/a/34100952
window.addEventListener('spfdone', process); // old youtube design
window.addEventListener('yt-navigate-start', process); // new youtube design

// ref.: http://callmenick.com/post/check-if-everything-loaded-with-javascript
var everythingLoaded = setInterval(function() {
  if (document.getElementById(toggleButtonId) !== null) {
    clearInterval(everythingLoaded);
    process({type: 'DOMContentLoaded'}); // this is the function that gets called when everything is loaded
  }
}, 10);
