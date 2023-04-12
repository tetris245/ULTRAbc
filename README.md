# ULTRAbc

ULTRA Bondage Club by Nemesea - Add-on for Ben987's BondageClub game

ULTRAbc is a modSDK version of QAM, providing better compatibility with other add-ons, especially BCX and FBC.

Most recent version: 1.2

## Installation 

**Recommended methode with Tampermonkey** - link to the ULTRAbc loader: https://tetris245.github.io/ultrabc.github.io/ULTRAbcloader.js

You can find Tampermonkey here: https://www.tampermonkey.net/ (it's available for several browsers: Chrome, Microsoft Edge, Safari, Opera Next, Firefox, Dolphin, UC)

Inside Tampermonkey: Add new script / Utilities / Insert link to ULTRAbc loader in last option / Click on "Install"

To update: Go to Installed Scripts / Click on date corresponding to ULTRAbc (TM will search for new version and install it)

**Bookmark methode** - link to the ULTRAbc bookmark: https://tetris245.github.io/ultrabc.github.io/ULTRAbcbookmark.js

**Alternative methode for Google Chrome, Microsoft Edge, similar browsers**
1. Download the ULTRAbc-version1.2.zip file on the Releases page
2. Depending on browser, the .zip might have to be extracted. few browsers accept a .zip, a few requires a folder.
3. Go to browser extensions. Enable developer mode.
4. Load as Unpacked. Done. If the file can't be seen, see step 2.

After installation, refresh your BC page and relog.

==========================================================================

Changes for future version

* Integrated the BC-Diaper-Wetter script created by Firefly - Thanks for the permission :)
* Improved the OUT button in the chat rooms, you can leave in fast or slow mode according your choice set by using the new exitmode command
* New commands: exitmode and slowleave 
* Updated and improved the bg1 command
* Added support for the FBC feature OOC with Ctrl+Enter
* Added another case of forced normal talk in chat rooms (no whisper mode) when using : instead of * or /me
* Fixed a bug in the Moaner: it will no more activate features defined as ON when it is itself OFF
* Restructured the code with a section for main variables and settings (UBC and The Moaner)
* Added a timer in the Tampermonkey loader (thanks to Aries!)
