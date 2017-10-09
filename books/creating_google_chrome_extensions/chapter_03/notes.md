# Chapter 3: API Availability and Messaging

## Input Components: Part Two

Remaining input components to discuss: omnibox input and context menu item

### Omnibox Inputs
[HelloOmniboxInput](HelloOmniboxInput): extension using an omnibox input component

**omnibox input**: 
  - input component
  - requires event script
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

