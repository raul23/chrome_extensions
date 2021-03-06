# TurnOffAutoPlay extension
<p align="center"><img src="TurnOffAutoPlay/icons/movie-lock-red-128.png" alt="TurnOffAutoPlay Icon"/></p>

**Objective:** turn off Youtube **autoplay** for ever<sup id="a1">[1](#f1)</sup>. Even after you clear your
browsing data, it will still be turned off.

This very simple and basic **experimental** extension was developed as a training ground for testing out the
chrome.* APIs and to get practice using web technologies (in particular JavaScript).

## Installation notes
To install this **experimental** Chrome extension:
1. Go to `chrome://extensions` on the Chrome browser
1. Click on the **Developer mode** toggle button at the top right. This will trigger new buttons
to be available at the top left of the page.
1. Click on the **Load unpacked extension...** button
1. Select the extension directory [TurnOffAutoPlay](TurnOffAutoPlay)
1. The **TurnOffAutoPlay** extension should now be installed

If you want to enable the extension also while in **Incognito mode**, then after 
installing the extension:
1. Click on the extension icon on the Chrome toolbar
1. Choose the **Manage Extensions** from the context menu.
You should be re-directed to the extension's config page
1. Go to the **Allow in incognito** option and click on the toggle switch to 
enable also the extension in Incognito mode

## How to use it
1. Go to your favorite **Youtube** video page
1. The **AUTOPLAY** button on the top right of the page should be disabled (grayed out)
1. Now can you see your favorite video without getting bothered at the end by a suggested video
1. Enjoy!

**A picture is worth a thousand words :)**

<p align="center">
<b>BEFORE</b>
<br>
<br>
<br>
<img src=".screenshots/screenshot-enabled.png" title="TurnOffAutoPlay enabled" alt="TurnOffAutoPlay enabled">
</p>

<br>
<br>
<p align="center">
<b>AFTER</b>
<br>
<br>
<br>
<img src=".screenshots/screenshot-disabled.png" title="TurnOffAutoPlay disabled" alt="TurnOffAutoPlay disabled">
</p>


## How to disable it
To disable the extension:
1. Click on the extension icon on the Chrome toolbar
1. Choose the **Manage Extensions** from the context menu.
You should be re-directed to the extension's config page
1. Click on the toggle switch to disable the extension

To re-enable it, click again on the toggle switch from the extension's config page.

## How to remove it
To remove the extension from Chrome:
1. Click on the extension icon on the Chrome toolbar
1. Choose the **Remove from Chrome...** from the context menu.
A popup should get displayed asking **Remove "TurnOffAutoPlay"?**
1. Click on the **Remove** button

## Code organization
The **TurnOffAutoPlay** extension is in the folder [TurnOffAutoPlay](TurnOffAutoPlay)

The **TurnOffAutoPlay** extension consists in the following components:
- `event.js`:
  - events listened to:
    - `chrome.management.onEnabled`
    - `chrome.runtime.onInstalled`
- `content.js`: triggers the click event on the `paper-toggle-button` button and disables it
- `manifest.json`: declares the following permissions
  - `*://*.youtube.com/*`
  - `management`

**Calls:**
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


**Icon attributions:**
- Extension icons and Icons for the Browser-Action button
- Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>

## TODOs
**FEATURES:**
- Add **Enable/Disable** option in a popup linked with the Browser-Action button
  - It will enable/disable the extension
  - Indicate to the user that for the effect to take place, the page must be
  refreshed (e.g. see Ublock Origin extension)
  - The popup should display when clicking on the Browser-Action button
- When we hover over the **AUTOPLAY** text or the disabled toggle, we should
display a tooltip informing us that if we want to enable the toggle again, we
should disable the extension by clicking on the Browser-Action button.

<br></br>
<br></br>
**Footnotes:**  <div>
<b id="f1">1</b>: Well at least as long as you have the **TurnOffAutoPlay** extension installed. [↩](#a1)
