# TurnOffAutoPlay extension

**Objective:** turn off Youtube **autoplay**

The extension modifies the **PREF** cookie (**https://www.youtube.com**) to tell
**youtube.com** that the **autoplay** feature should be disabled.


## Code organization
**TurnOffAutoPlay** extension consists in the following components:
- `event.js`: in charge of modifying the "PREF" cookie
  - events listened to:
    - `chrome.cookies.onChanged`
    - `chrome.management.onEnabled`
    - `chrome.runtime.onInstalled`
- `content.js`: injects HTML code into the current youtube page to disable the
`paper-toggle-button` button
- `manifest.json`: declares the following permissions
  - `cookies`: to get access to the `chrome.cookies` API for `event.js` to be
  able to modify the **PREF** cookie
  - `*://*.youtube.com/*`:
  - `management`

**Calls:**
- `chrome.cookies.get`
- `chrome.cookies.onChanged`
- `chrome.cookies.set`
- `chrome.management.onEnabled`
- `chrome.runtime.onInstalled`

**Source files:**
- [manifest.json](TurnOffAutoPlay/manifest.json)
- [event.js](TurnOffAutoPlay/event.js)
- [content.js](TurnOffAutoPlay/content.js)
- [movie-lock-red-16.png](TurnOffAutoPlay/icons/movie-lock-red-16.png)
- [movie-lock-red-128.png](TurnOffAutoPlay/icons/movie-lock-red-128.png)
- [movie-lock-white-16.png](TurnOffAutoPlay/icons/movie-lock-white-16.png)
- [movie-lock-white-128.png](TurnOffAutoPlay/icons/movie-lock-white-128.png)


**NOTE:** Icon attributions
- Extension icons and Icons for the Browser-Action button: **movie-lock-{white/red}-{16/128}.png**
- Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>


## TODOs
**FEATURES:**
- Add **Enable/Disable** option in a popup linked with the Browser-Action button
  - It will enable/disable the extension
  - Indicate to the user that for the effect to take place, the page must be
  refreshed (e.g. see Ublock Origin extension)
  - The popup should display when clicking once (Mac) on the Browser-Action button
- When we hover over the **AUTOPLAY** text or the disabled toggle, we should
display a tooltip informing us that if we want to enable the toggle again, we
should disable the extension by clicking on the Browser-Action button.

**COMPATIBILITY:**
- Make it work with the **old youtube design**
