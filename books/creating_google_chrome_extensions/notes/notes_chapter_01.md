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
  - core JavaScript and DOM APIs. They are provided by Extensions framework.
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

Files in **Showtime** folder
- **manifest.json**: provides info about extension to Chrome browser
- **popup.html**: extension's view
- **popup_script.js**: app logic

JSON file online validators:
- http://jsonlint.com
- http://jsonschemalint.com

**IMPORTANT**: Don't add any comments in JSON files.

### Creating the Manifest
Required fields in manifest file:
- `manifest_version`: version of the manifest file format. **Integer** > 0. Put `2`.
- `name`: name of the extension. **String**.
- `version`: version of the extension. **String**.

Optional field:
- `description`: text description of extension. **String**.

### Adding the Button: Browser-Action
In manifest.json, add attribute for the *Browser-Action* button: `browser_action`  
`browser_action` has the following keys:
- `default_title`: **String**. Tooltip for the button
- `default_icon`: **String**. Relative path of icon PNG image to be used in the Chrome toolbar
- `default_popup`: **String**. Relative path of HTML file for popup

ShowTime extension makes use of standard JavaScript APIs:
- **Date API**: gets current time and date
- **DOM API**: accesses the DOM tree

**TIP**: access the DOM after the has loaded. Call your function in the listener
to the DOMContentLoaded event.

**IMPORTANT**: Inlining of scripts is not allowed in popups. They should be
referred, e.g. `<script src="popup_script.js"></script>`

## Loading the Extension Folder

Steps to load extension in the browser:
1. Go to `chrome://extensions`
1. Enable the *Developer Mode* option
1. Click on *Load Unpacked Extension*
1. Select the extensions folder
