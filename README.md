# ULTRAbc

ULTRA Bondage Club by Nemesea - Add-on for Ben987's BondageClub game

ULTRAbc is a modSDK version of QAM, providing better compatibility with other add-ons, especially BCX and WCE.

Most recent version: 4.7

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

**Alternative methode for Google Chrome, Microsoft Edge, similar browsers**
1. Download the ULTRAbc-version4.7.zip file on the Releases page
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
Shyness, Ada, huzpsb, Lilly, Nikky90506, Tarram1010, harmony, KitKat.

Thanks for general assistance:
Brianna, Better, Miyako, Zeltron, Selina, Estsanatlehi, okatakab, Lera.
All else I might not have included.



==========================================================================

Changes for future version

* New options in GUI - Chat Search to display only the rooms with a minimum and maximum of present players 
* New commands:
  - shock (slot) (sensibility) (intensity) to change mode of worn device shock in a specific slot, even when you are bound (for most shock devices, the last parameter is not required as they refer to a level combining sensibility and intensity!)
  - vibe (slot) (mode) to change mode of worn vibe in a specific slot, even when you are bound
  - Note: these commands don't support the Futuristic Chastity Belt, the Futuristic Training Belt and the Lewd Crest
* Added the tennis1, tennis2 and tennis3 options to the game command
* Improved the lock command to allow time randomly choosen by the game when you use timer locks: for that, you need to use ? instead of specifying the number of minutes
* Improved the maproom command by adding info about the keys found in the map only for the player using the command
* Updated and improved the xstatus lscg command to include info about enabled remote control
* Optimised the detection of Uwall/Ulist protection, chat room typê and target pronouns
* Removed the hdvibe command ((use instead the new vibe command!)
* Removed the plvibe command (use instead the new shock and vibe commands!)
* Removed the ustatus command and the extra option of the uhelp command; all 'extra' commands are moved to /uhelp misc
