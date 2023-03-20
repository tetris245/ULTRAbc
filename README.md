# ULTRAbc

ULTRA Bondage Club by Nemesea - Add-on for Ben987's BondageClub game

ULTRAbc is a modSDK version of QAM, providing better compatibility with other add-ons, especially BCX and FBC.

## Installation 

**Recommended methode with Tampermonkey** - link to the ULTRAbc loader: https://tetris245.github.io/ultrabc.github.io/ULTRAbcloader.js

You can find Tampermonkey here: https://www.tampermonkey.net/ (it's available for several browsers: Chrome, Microsoft Edge, Safari, Opera Next, Firefox, Dolphin, UC)

Inside Tampermonkey: Add new script / Utilities / Insert link to ULTRAbc loader in last option / Click on "Instal

To update: Go to Installed Scripts / Click on date corresponding to ULTRAbc (TM will search for new version and install it)

**Bookmark methode** - link to the ULTRAbc bookmark: https://tetris245.github.io/ultrabc.github.io/ULTRAbcbookmark.js

**Alternative methode for Google Chrome, Microsoft Edge, similar browsers**
1. Download the ULTRAbc-version1.0.zip file on the Releases page
2. Depending on browser, the .zip might have to be extracted. few browsers accept a .zip, a few requires a folder.
3. Go to browser extensions. Enable developer mode.
4. Load as Unpacked. Done. If the file can't be seen, see step 2.

After installation, refresh your BC page and relog.

==========================================================================

Changes for future version

* New modSDK function: ULTRAChatRoomKeyDown
* New command: stutter (stuttermode) to force a specific stuttering mode. The mode is specified by a number between 0 and 4.
* New command: talk (talkmode) to force a specific talk mode. The mode is specified by a number between -1 and 9.
* Improved the bg1 command by adding the Asylum backgrounds when BCX is not detected
* Fixed stand option in pose2 command
