# Chapter 2: Architecture Overview

Chrome Extensions framework API can be described according to two perspectives:
1. **user perspective**: understanding API in terms of interactive 
functionalities it provides
2. **developer perspective**: understanding API in terms of inner
techniques involved in providing functionalities, e.g. UI, storage

## Components Involved in Creating Chrome Extensions
Components to create Chrome extensions:
- **manifest component**: provides info about extension to Chrome browser.
These are the required attributes in a manifest.json file:
  - `manifest_version`: manifest file format version. As of October 8 2017, the
  version is **2**
  - `name`: extension name
  - `version`: extension version
- **input component**: provides interactive functionalities via UI/non-UI
input elements.  
Chrome Extensions framework provides the following input components:
  - **Browser-Action** button:
    - its features accessed via `chrome.browserAction` API
  - **Page-Action** button: e.g. bookmark the page
    - its features accessed via `chrome.pageAction` API
  - **Shortcut-Key**: 
    - its features accessed via `chrome.commands` API
  - **Context-Menu-Item**
  - **Omnibox-Input**
- **scripting component**: scripts with app logic. Three types of scripting
components:
  - **Event scripts**: listens for events (triggered from input components). 
  Executed as background scripts. **Persistence** support.
  - **Popup scripts**: provides app logic. Attached to popup components. They 
  have access to Chrome Extensions API and the Standard JavaScript APIs. Only 
  executed when popup is opened by clicking the Browser-Action or Page-Action
  buttons.
  - **Content scripts**: injected into visited web pages. They don't represent the 
  extension runtime and they can only access the `chrome.runtime`, `chrome.extension`, 
  and `chrome.storage` (from the Extensions API) AND the Standard JavaScript APIs.
- **popup component**: provides a views; only available to Browser-Action and 
Page-Action components. Contains additional views, e.g. form fields.

**NOTE:** scripting components use *messaging* APIs (via the `chrome.runtime` object)
to communicate with each other
**NOTE:** popup scripts can only be referred

## Extension runtime
**NOTE:** extension runtime != chrome.runtime API

**Event-driven programming:** events and listeners model
  - listen to events triggered from input components (e.g. Browser-Action button)
  - respond to triggered events
  
Some **important events** associated with extensions: `onMessage`, `onConnect`, 
`onConnectExternal`, `onInstalled`, and `onUpdateAvailable`

**Extension runtime** consists in scripting components (only **event and scripting**)
that listen for events triggered from input components. However, popup scripts
can only listen to some events.

## Input Components: Part One
**Input components** are entry points to extensions' logic.

**NOTE:** extensions can also be created without any input components, e.g. **Themes**
which only use a manifest.json file + images.

###The Browser-Action and Page-Action Components
**Browser-Action** component: 
  - Associated with any page
  - Located right of the address bar  
  - automatically visible
  - example: note-taking extension for any pages

**Page-Action** component: 
  - Associated with specific pages
  - Located inside the address bar  
  - To display it:
    - call `chrome.pageAction.show(tabId)`  
    OR
    - use the `chrome.declarativeContent` API
  - example: web pages with password fields, or note-taking extension for stackoverflow.com pages

`chrome.browserAction`: object to access the Browser-Action API
`chrome.pageAction`: object to access the Page-Action API

**IMPORTANT:** Extensions can only use one of these components at a time.

**NOTE:** omnibox = address bar

**NOTE:** In the Extensions framework, tabs are represented by the 
`Tab` type with the important properties `id`, `active`, and `url`. See 
https://developer.chrome.com/extensions/tabs#type for complete list of
`Tab` properties. Also, the `chrome.tabs` API is used to interact with tabs.

### Role of the Manifest for This Component
**Declaration and definition of Browser-Action in manifest:**
```json
"browser_action" : {
    "default_title" : "HelloBrowserAction",
    "default_icon" : "icon.png",
    "default_popup" : "popup.html"
}
```

**Declaration and definition of Browser-Action in manifest:**
```json
"page_action" : {
    "default_title" : "HelloPageAction",
    "default_icon" : "icon.png",
    "default_popup" : "popup.html"
}
```

**NOTE:**
- `default_title`: extension tooltip
- `default_icon`: relative path PNG icon for extension
- `default_popup`: relative path for HTML for extension

**NOTE:**
The attributes' values can be overriden by the extension runtime via API calls
(from the Extensions framework):
- Methods to modify Page-Action's values:
  - `chrome.pageAction.setTitle(object details)`: to set the tooltip text
	- `chrome.pageAction.setIcon(object details,function callback)`: to set the icon image's relative path
	- `chrome.pageAction.setPopup(object details)`: to set the popup HTML file's relative path
- Methods to modify Browser-Action's values:
  - `chrome.browserAction.setTitle(object details)`: to set the tooltip text
	- `chrome.browserAction.setIcon(object details,function callback)`: to set the icon image's relative path
	- `chrome.browserAction.setPopup(object details)`: to set the popup HTML file's relative path
	
### Shortcut Key or Command
**Shortcut key (or Command) component:** keyboard shortcut used as input to an extension

Use the `commands` manifest attribute for declaring shortcut keys.

**Declaration and definition of Shortcut key (or Command) component in manifest:** 
```json
{
    "manifest_version" : 2,
    "name" : "HelloShortcutKey",
    "description" : "Extension to demonstrate a Shortcut-Key as an input component",
    "version" : "1.2",
    "browser_action" : {
        "default_title" : "HelloShortcutKey",
        "default_icon" : "icon-1.png"
    },
    "background" : {
        "scripts" : ["event_script.js"],
        "persistent" : false
    },
    "commands" : {
        "shortcut-key to change the extension icon" : {
            "suggested_key" : {"default" : "Alt+Shift+9"},
            "description" : "Change the extension icon"
} }
}
```

**NOTE:**
- you have many shortcut key attributes
- you can only map four keyboard shortcuts to these shortcut key attributes
- API associated with Shortcut Key components is accessed from `chrome.commands` object. Only
scripting components can access this API (content scripts can't)
- Use `chrome://extensions/configureCommands` to add more shortcuts

#### The onCommand Event
For each shortcut key component, implement a listener that listens to the
`onCommand` event (from `chrome.commands.onCommand`).

[HelloShortcutKey](): extension that changes its icon with a shortcut key.
**icon-1.png** is the default Browser-Action icon. Listener listens for the 
`onCommand` event to then change the Browser-Action icon to **icon-2.png** by
calling the `chrome.browserAction.setIcon` method.

**IMPORTANT**: do not confuse `addListener` (used in the event script) and
`addEventListener` which is part of the DOM API.

## Event Scripts
List of events listened by event scripts:
- Events fired by input components:
	- `onClicked`: from `chrome.browserAction` API
	- `onClicked`: from `chrome.pageAction` API
	- `onCommand`: from `chrome.commands` API
	- `onClicked`: from `chrome.contextMenus` API
	- `onInputStarted`, `onInputChanged`, `onInputEntered`, `onInputCancelled`: from
	`chrome.omnibox` API
- Events fired by the extension: `onMessage`, `onConnect`, `onInstalled` from the
`chrome.runtime` object. `onMessage` and `onConnect` events can be listen to
for message sent by content scripts.
- Other events (examples given):
  - `onCreated`, `onUpdated`, `onRemoved`: from `chrome.tabs`
  - `onAlarm`: from `chrome.alarms`
  - `onChanged`: from `chrome.storage`
  - `onCreated`, `onRemoved`, `onChanged`: from `chrome.bookmarks`
  - `onVisited`, `onVisitRemoved`: from `chrome.history`

**Persistence** of event scripts: long-running background script that can
reliably listen for events

Event script can contain the common app logic if lots of input components are used
in the extension. The event script can share the code with all the components
because of its persistence (it is running in the background whereas the popup
script is executed only when the popup is opened).

### Role of the Manifest for This Component
**Declaration and definition of event script in manifest:** 
"background" : {
    "scripts" : ["event_script.js","another_event_script.js"],
    "persistent" : false
}

`persisten`: 
- if `true`, then the event scripts persist as long as the browser
is opened. These type of event scripts are called **background scripts**. 
- if `false`, then the event scripts persist as long as the events they are
listen to are getting triggered. When the events stop getting triggered, then
the events scripts are made inactive by Chrome browser: all the associated scripts
are unloaded to save memory and other system resources.

**NOTE:** the event scripts are referred in an auto-generated HTML
known as *background page*.

**IMPORTANT**: don't use **background scripts** because of performance issues
(memory consumption). Use event scripts instead.

### Event objects
**All events represent event objects** from the Extensions framework.

**Event**: is an object that notifies you when something interesting happens.

The listeners functions are registered with `addListener`.

### Declarative Event Handlers

**Declarative Event Handlers:** advanced mechanism for taking actions based
on custom rules.

#### The HelloPageAction Extension
[The HelloPageAction Extension](HelloPageAction):
  - manifest attributes
 		- `permissions`: to use the **tabs** features
  	- `persistent`: set to `false` to make the event script active on an event basis
	- `chrome.tabs.query` API used to query the tabs
	- In the Extensions framework, tabs are represented with the `Tab` type which 
	have the important properties `id`, `active`, and `url`
	- `chrome.pageAction.show` shows the Page-Action associated with a tab
	- listener listens for the `onUpdated` event associated with tabs; every time
	a tab is updated or opened, its corresponding Page-Action is shown

#### The declarativeContent API
The custom rules consist of:
- **declarative conditions**: evaluated on the browser itself instead of the JavaScript
engine
- **actions**

Two kinds of declarative event handlers:
- **chrome.declarativeContent**: used to take actions depending on the content of a
page, without requiring permission to read the page's content
  - only two actions supported as of October 9 2017:
    - `chrome.declarativeContent.ShowPageAction`
    - `chrome.declarativeContent.SetIcon`
  - Add the `declarativeContent` permission in the manifest file
- **chrome.declarativeWebRequest**: only available on the beta channel and dev channel

##### Adding and Removing Rules
Use `chrome.declarativeContent.onPageChanged.[addRules|removeRules]` to register rules
on the `onPageChanged` event.

`addRules` takes two argumentsL
- array of rule instances (dict)
- optional callback function called on completion

`removeRules` takes two arguments:
- optional array of rule identifiers (e.g. [rule1.id,rule2.id])
  - If array is `undefined`, all registered rules are removed
- callback function

**IMPORTANT**: since rules are persistent across browsing sessions
- listen to the `runtime.onInstalled` event
- remove previously installed rules by given `undefined` as first argument to `removeRules`
- add new rules

For more info on rules, check https://developer.chrome.com/extensions/events.

##### Using ShowPageAction
Use of a declarative event handlers’ actions to display Page-Action.

In [PageActionNotes](PageActionNotes):
```
var ruleStackOverflowHost = {
    "conditions" : [
        new chrome.declarativeContent.PageStateMatcher({
            "pageUrl" : {
                "hostEquals" : "stackoverflow.com",
                "schemes" : ["http","https"]
            }
        })
    ],
    "actions" : [new chrome.declarativeContent.ShowPageAction()]
};
```
**NOTE:**
-`ruleStackOverflowHost`: rule associated with condition-action pair
  - condition: represented with a `PageStateMatcher` object
    - `pageUrl.hostEquals` and `pageUrl.schemes` are the criteria that
    `PageStateMatcher` uses to match web pages
      - `PageStateMatcher` matches all webpages on stackoverflow.com
    - `css` criteria can also be used as another criteria to match web pages

## Content scripts
Disadvantages of `declarativeContent` API:
- limited criteria for matching
- limited actions

Use content scripts instead.

**Content scripts:** 
  - type of scripting component
  - its code is injected into the visited web pages
  - limited access to Extensions API
  - have access to DOM API to read, modify and **add** HTML elements
  - can ONLY used the following `chrome.*` APIs:
    - `extension`
    - `i18n`
    - `runtime`
    - `storage`
  - cannot access variables and functions defined in other scripting and content components,
  and by web pages (where they are injected)
  
**NOTE**: content scripts can use the messaging API to access all the `chrome.*` APIs
and the variables and functions defined in other scripting components.

### Role of the Manifest for This Component
**Declaration and definition of content script in manifest:**
```json
"content_scripts" : [
    {
        "matches" : ["http://www.google.com/*"],
        "css" : ["mystyles_A.css"],
        "js" : ["jquery.js","myscript_A.js"]
} ]
```

**NOTE:**
- `content_scripts` attribute is an array where each element is a content script
- `css` and `js`  are the files that are injected in the web pages matched against
the URLs defined in `matches`
  - code can also be injected programmatically instead of doing it in the manifest:
    - use the `tabs` API
    - add the either the `tabs` (access to all tabs) or `activeTab` (access only to the
    currently active tab) in the manifest
    - useful if js and css code needs to be injected in certain cases, not in all web pages
    that matches against URLs
- methods to inject code in tabs:
  - `chrome.tabs.insertCSS(integer tabId, object details, function callback)`
  - `chrome.tabs.executeScript(integer tabId, object details, function callback)`
  - `tabID` defaults to the currently active tab
  - `details` is an object that contains the CSS/JavaScript code or file to inject
    - one of two properties (`code` or `file`) must be set

### HelloContentScript Extension
[HelloContentScript](HelloContentScript) injects content script using both methods:
- with the `content_scripts` attribute in the manifest file:
  - `"matches" : ["*://stackoverflow.com/*"]`: any scheme (http, https, ...) and all paths on the
  stackoverflow.com host
  - `content_scripts.js` gets injected in all web pages on the stackoverflow.com host
  - `content_scripts.js` outputs to the web page's Dev tools console
- programmatically by injecting from an `event_script.js`:
  - `onClicked` listener: calls `insertCSS` and `executeScript` to inject the CSS and
  JavaScript code
  - `event_script.js` outputs to the **_generated_background_page.html**'s Dev tools console
  
## Examples of Components
