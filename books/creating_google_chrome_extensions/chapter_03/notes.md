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
	  - results are suggested based on the letter typed by user in the omnibox
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

