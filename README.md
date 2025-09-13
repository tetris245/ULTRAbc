# ULTRAbc

ULTRA Bondage Club by Nemesea - Add-on for Ben987's BondageClub game

ULTRAbc is a modSDK version of QAM, providing better compatibility with other add-ons, especially BCX and WCE.

Most recent version: 5.5.2

Check the Wiki for more info: https://github.com/tetris245/ULTRAbc/wiki

## Installation 

*Preliminary note* : if you use many add-ons for BC, you could be interested by **FUSAM**, a multi-add-on-loader for TamperMonkey: https://sidiousious.gitlab.io/bc-addon-loader/

**Recommended methode with Tampermonkey** - links to the ULTRAbc loader: 

Automatic: https://tetris245.github.io/ultrabc.github.io/ULTRAbcloader.user.js

Non-automatic: https://tetris245.github.io/ultrabc.github.io/ULTRAbcloader.js

You can find Tampermonkey here: https://www.tampermonkey.net/ (it's available for several browsers: Chrome, Microsoft Edge, Safari, Opera Next, Firefox, Kiwi, UC)

Manual installation: Add new script / Utilities / Insert link to ULTRAbc loader in last option / Click on "Install"

To update: Go to Installed Scripts / Click on date corresponding to ULTRAbc (TM will search for new version and install it)

**Bookmark methode** - link to the ULTRAbc bookmark: https://tetris245.github.io/ultrabc.github.io/ULTRAbcbookmark.js

**Alternative methode for Google Chrome, Microsoft Edge, similar browsers** (Will not work with Asian server)
1. Download the ULTRAbc-version5.5.2.zip file on the Releases page
2. Depending on browser, the .zip might have to be extracted. few browsers accept a .zip, a few requires a folder.
3. Go to browser extensions. Enable developer mode.
4. Load as Unpacked. Done. If the file can't be seen, see step 2.

After installation, refresh your BC page and relog.

## Credits

Special thanks to KellyLoveyness for creating the original version of QAM.

Special thanks to Julia for the powerful code of the BCTweaks GUI.

Special thanks to Firefly for giving permission to integrate the BC-Diaper-Wetter script (removed since version 4.7 - if you like ABDL game, you are invited to install the new mod ABCL, which has more features and a nice interface - see https://github.com/zoe-64/ABCL/)

Special thanks to Myrhanda and Kimei for giving permission to integrate the Moaner script.

Thanks to lillyBC for providing ideas and inspiration with her bcTampermonkeys scripts.

Thanks for special assistance:
Shyness, Ada, huzpsb, Lilly, Nikky90506, Tarram1010, harmony, KitKat, Moon, Sin.

Thanks for general assistance:
Brianna, Better, Miyako, Zeltron, Selina, Estsanatlehi, okatakab, Lera.
All else I might not have included. 



==========================================================================

Changes for future version

* Added a new button on Login screen to disable all Chat Search toasts (only a full relog can enable them again)
  - Note: there is currently no any way to disable only a part of the beep toasts and Chat Search toasts
* Added lobbies buttons in the Asylum Entrance (only the Asylum button will work if you have enabled the Asylum limitations)
* Added an Extensions button in Chat Search
* Moved the "Players in Room" parameter to the restored Chat Search page of the UBC GUI
* Removed the Autojoin feature (as it's incompatible with the new BC Chat Search and its toast system)
* Removed most other UBC Chat Search features (as BC provides now an advanced Chat Search menu)
* Removed the display of a BACK button in Preferences screen if you come from Chat Search (this to avoid weird issues later with the Chat Search menu)
* Updated the effect of lobby icons in Main Hall, the hotkeys in Friend List + the frlist and search commands for R120 compatibility
* Updated the patch of the CommandExecute function
* Removed the option in GUI - Misc "No time out in help provided by TAB" (as BC has replaced this time out by a button for help deletion)
