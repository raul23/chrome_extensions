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
  - Browser-Action button: event
  - Page-Action: e.g. bookmark the page
  - Shortcut-Key
  - Context-Menu-Item
  - Omnibox-Input
- **scripting component**: scripts with app logic. Three types of scripting
components:
  - Event scripts: executed as background scripts
  - Popup scripts: used with popup components. They have access to Chrome Extensions
  API and the Standard JavaScript APIs. Only executed when popup is opended
  - Content scripts: injected into visited web pages. They don't represent the 
  extension runtime and they can only access the `chrome.runtime`, `chrome.extension`, 
  and `chrome.storage` AND the Standard JavaScript APIs.
- **popup component**: only available to Browser-Action and Page-Action components

**NOTE:** scripting components use *messaging* APIs to communicate with each other
**NOTE:** popup scripts can only be referred

## Extension runtime
**NOTE:** extension runtime != chrome.runtime API

**Event-driven programming:**
  - listen to events triggered from input components (e.g. Browser-Action button)
  - respond to triggered events
  
Some **important events** associated with extensions: `onMessage`, `onConnect`, 
`onConnectExternal`, `onInstalled`, and `onUpdateAvailable`

**Extension rutime** consists in scripting components (only **content and scripting**)
that listen for events triggered from input components.




