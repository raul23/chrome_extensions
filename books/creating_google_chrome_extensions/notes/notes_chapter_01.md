# Introduction

**Chrome extensions:** 
- bundled app
- access to browser features, e.g. bookmarks, history, search
- implemented with web technologies: HTML, CSS, JavaScript

# Chapter 1-Introduction to Google Chrome Extensions

Chrome web browser (and Opera) uses **WebKit** engine.

**Browser extensions:**
- run within security sandbox (software container) of a web browser
- combine existing features of web browser to provide new functionalities

**Chrome Web Store:** online marketplace for Chrome apps, extensions, and themes.

**IMPORTANT:** extensions != plug-ins

**Plug-ins:** not running within security sandbox of web browser.

**Chrome apps:** somewhere in-between Chrome extensions and plug-ins.

Examples of plug-ins: Adobe Flash Player, the Chrome PDF Viewer, 
the QuickTime Player, and the Java plug-in.

Examples of free Chrome extensions: Adblock Plus, LastPass, Google Translate

Chrome web store at **https://chrome.google.com/webstore/category/extensions**.

## Important Chrome URLs
To View Chrome extensions (+apps) installed through the Extensions management page:  
`chrome://extensions`

To only view apps installed:  
`chrome://extensions`

To view plug-ins installed:  
`chrome://plugins`

To get complete list of Chrome URLs:
`chrome://chrome-urls`

## Technologies to create extensions

Technologies used to create Google Chrome Extensions:
- **HTML**: creates views
- **CSS**: creates views
- **JavaScript**: provides app logic, and access to the API from the Google Chrome Extensions framework
- **JSON**: creates the manifest file (which provides info about the extension to the Chrome browser) 

## Extensions API
Chrome extensions are sandboxed in Chrome browsers:
- isolated execution of JavaScript code
  - extensions don't know about each other's existence **automatically**
  - extension cannot **automatically** access code or memory belonging to another
  extension.
- no name conflicts of resources such as HTML, CSS, JavaScript, images
- messaging API to connect extensions with each other

APIs accessed by Chrome extensions:
- **Extensions framework** special-purpose APIs: provide features from the Chrome browser
  - Examples:
    - **chrome.runtime**: retrieves the background page or returns details about the manifest
    - **chrome.alarms**: schedules code to run periodically or at a specified time in the future
- **standard APIs** (aka standard JavaScript APIs) provided by the browser to web pages
  - core JavaScript and DOM APIs
- **XMLHttpRequest** API
- **HTML5** API: e.g. audio, canvas, gelocation
- **WebKit** APIs: e.g. CSS animations, filters
- **V8** APIs: e.g. JSON

**NOTE**: More detailed list of Web APIs accessed by extensions at 
https://developer.chrome.com/extensions/api_other

## Creating Your First Extension
**Objective:** build simple extensions **ShowTime** that displays a popup when clicking the 
Browser-Action button

Go to [ShowTime](../code/chapter_01/ShowTime) for extension code.


