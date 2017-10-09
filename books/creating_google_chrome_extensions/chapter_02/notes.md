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
  - **Event scripts**: executed as background scripts. **Persistence** support.
  - **Popup scripts**: attached to popup components. They have access to Chrome Extensions
  API and the Standard JavaScript APIs. Only executed when popup is opened by clicking
  the Browser-Action or Page-Action buttons.
  - **Content scripts**: injected into visited web pages. They don't represent the 
  extension runtime and they can only access the `chrome.runtime`, `chrome.extension`, 
  and `chrome.storage` AND the Standard JavaScript APIs.
- **popup component**: only available to Browser-Action and Page-Action components.
Contains additional views, e.g. form fields.

**NOTE:** scripting components use *messaging* APIs to communicate with each other
**NOTE:** popup scripts can only be referred

## Extension runtime
**NOTE:** extension runtime != chrome.runtime API

**Event-driven programming:**
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
`onCommand` event to then change the Browser-Actoin icon to **icon-2.png** by
calling the `chrome.browserAction.setIcon` method.

**IMPORTANT**: do not confuse `addListener` (used in the event script) and
`addEventListener` which is part of the DOM API.

## Event Scripts
