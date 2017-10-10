# Chapter 3: API Availability and Messaging

## Input Components: Part Two

Remaining input components to discuss: omnibox input and context menu item

### Omnibox Inputs
[HelloOmniboxInput](HelloOmniboxInput): extension using an omnibox input component

**omnibox input**: 
  - input component
  - requires **event script**
  - registers keyword with address bar

**Recall**: address bar = omnibox

**Declaration and definition of omnibox in manifest:**
```json
"omnibox" : {
    "keyword" : "OI"
}
```

#### Role of an Event Script for this Component
Event script ([event_script.js](HelloOmniboxInput/event_script.js)):
- defines an event listener that listens for the `onInputEntered`, `onInputChanged` and
`onInputStarted` events that belong to the `chrome.omnibox` API
  - the `chrome.omnibox` API doesn't require a permission in the manifest  
  - `onInputChanged`: fired when the user changes what is typed in the omnibox
    - results are suggested based on the letter typed by the user in the omnibox
  - `onInputEntered`: fired when the user accepts what is typed or suggested in the omnibox


### Context Menu Items
**Context menu item** input component:
- creates items in the context menu
- requires the `contextMenus` permission
- requires an **event script component**:
  - defined with `persistent` set to `true` in the manifest. Thus the event script
  is a *background script*

Two-steps process to use the **context menu item** component:
1. create the item with `chrome.contextMenus.create()`
  - takes as an argument an object with the following properties:
    - `type`
    - `id`
    - `title`
    - `contexts`
    - `documentUrlPatterns`
    - `targetUrlPatterns`
2. listen for the `onClicked` on the item with `chrome.contextMenus.onClicked.addListener()`
  - takes as arguments an `info` and `tab` objects
    - `info`: contains info about the clicked item and based on this info, certain
    actions can be taken 

#### Creating an Item
Different types of items:
- **normal**
- **separator**: to group items
- **checkbox**
- **radio**

[HelloContextMenuItem](HelloContextMenuItem): extension that creates a context menu item
when a selection is made in the visited web page

[HelloContextMenuItem/event_scripts.js](HelloContextMenuItem/event_script.js)
- create the item with `chrome.contextMenus.create()`
- `ID_CONTEXT_MENU_ITEM_HELLO`: each context menu item identified by an ID
- `TYPES_CONTEXT`: different types of context an item can appear in
- `"documentUrlPatterns" : [match_pattern_stackoverflow]`: to add context menu item
only on web pages from stackoverflow.com


### Revisiting Content-UI
Reminder about **content scripts** (from chapter 2):
- type of scripting component
- its code is injected into the visited web pages
- limited access to Extensions API
- have access to DOM API to read, modify and **add** HTML elements
- can ONLY use the following `chrome.*` APIs:
	- `extension`
	- `i18n`
	- `runtime`
	- `storage`
- cannot DIRECTLY access variables and functions defined in other scripting
and content components, and by web pages (where they are injected)

[HelloContentUI](HelloContentUI): extension that uses a content script
component to display a Page-Action component.

#### The HelloContentUI Extension
[HelloContentUI](HelloContentUI) consists in:
- [content_script.js](HelloContentUI/content_script.js) component:
  - creates button element "Send Message" into web page it is injected to
  - `addEventListener()`: listens for "click" event associated with the "Send Message" button
    - when button is clicked, Page-Action is displayed
  - communicates with the [event_script.js](HelloContentUI/event_script.js) component
  through the messaging API (from the Extensions framework)
    - `chrome.runtime.sendMessage()` sends message to extension runtime
- [event_script.js](HelloContentUI/event_script.js):
  - represents the extension runtime
  - `chrome.runtime.onMessage.addListener()`: listens for the `onMessage` event
    - displays the Page-Action for the currently active tab (identified 
    from `sender.tab.id`)
    
## Messaging for Communication
Scripting components can commuicate between each other and external web pages
can also communicate with extensions.

Four types of scripts that can communicate with each other:
- **content scripts**
- **popup scripts**
- **event/background scripts**
- **web page scripts** (from external web pages)

### APIs and Events
**Two types of messaging APIs**:
- **Standard JavaScript's messaging APIs**, e.g.  `window.postMessage()`
  - **event**: `message`
- **Extensions framework's messaging APIs**:
  - **methods**:  
    - `chrome.runtime.sendMessage()`
    - `chrome.runtime.connect()` and `port.postMessage()`
    - `chrome.tabs.sendMessage()`
    - `chrome.tabs.connect`() and `port.postMessage()`
  - **events**:
    - `chrome.runtime.onMessage`
    - `chrome.runtime.onMessageExternal`
    - `chrome.runtime.onConnect` and `port.onMessage`
    - `chrome.runtime.onConnectExternal` and `port.onMessage`
    
### Web Page Scripts and Event Scripts
**Objective:** external web page communicates with extension

`chrome.runtime.sendMessage()` used to send message to the extension runtime
- takes the parameters:
  - **extensionID**
  - **message**
  - **responseCallback**

[WSandES/WebServer](WSandES/WebServer):
- run a simple HTTP server with python from the directory [WSandES/WebServer](WSandES/WebServer):
```commandline
python -m SimpleHTTPServer 8000
```
- then open the [WSandES/WebServer/index.html](WSandES/WebServer/index.html) from the Chrome browser

[WSandES/WebServer/webpage_script.js](WSandES/WebServer/webpage_script.js):
- when the button "send_message" is clicked, `chrome.runtime.sendMessage(extensionID,message,responseCallback)`
is called
  - `extensionID`: ID of extension to send the message
  - `message`: message to send to the extension (i.e. `event_script.js`)
  - `responseCallback`: will be called by the receiver of the message, i.e. extension runtime
  (`event_script.js` which represents the extension runtime)
    - However, the `reponseCallback` function is executed within the context of the web page script 

[WSandES/event_script.js](WSandES/event_script.js):
- `chrome.runtime.onMessageExternal.addListener()`: listens for messages sent by the
external web page
  - takes three parameters: `message`, `sender`, and `sendResponse`
    - `message`: passed message from external web page
    - `sender`: URL of external web page that sent the message
    - `sendResponse(responseObject)`: is a callback that gets called within the context
    of the web page script 


#### Role of the Manifest for This API
[WSandES/manifest.json](WSandES/manifest.json):
- `externally_connectable` attribute: to allow extensions and external web pages
communicate between each other
  - two keys: `ids` and `matches`, both take array values
    - `ids`: IDs of external extensions that can send messages
    - `matches`: URL patterns of external web pages that can send messages
  - only the `matches` is defined. Thus, only external web pages can send
  messages to extension runtime; extensions can't initiate communication

#### Using Long-Lived Connections
