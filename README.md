# ULTRAbc

ULTRA Bondage Club by Nemesea - Add-on for Ben987's BondageClub game

ULTRAbc is a modSDK version of QAM, providing better compatibility with other add-ons, especially BCX and WCE.

Most recent version: 4.1

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
1. Download the ULTRAbc-version4.1.zip file on the Releases page
2. Depending on browser, the .zip might have to be extracted. few browsers accept a .zip, a few requires a folder.
3. Go to browser extensions. Enable developer mode.
4. Load as Unpacked. Done. If the file can't be seen, see step 2.

After installation, refresh your BC page and relog.

## Credits

Special thanks to KellyLoveyness for creating the original version of QAM.

Special thanks to Julia for the powerful code of the BCTweaks GUI.

Special thanks to Firefly for giving permission to integrate the BC-Diaper-Wetter script.

Special thanks to Myrhanda and Kimei for giving permission to integrate the Moaner script.

Thanks to lillyBC for providing ideas and inspiration with her bcTampermonkeys scripts.

Thanks for special assistance:
Shyness, Ada, huzpsb, Lilly, Nikky90506, Tarram1010, harmony.

Thanks for general assistance:
Brianna, Better, Miyako, Zeltron, Selina, Estsanatlehi, okatakab.
All else I might not have included.



==========================================================================


Changes for future version 

* New commands:
  - infolock to give info (code, password, time left) for lock used on worn item in selected slot
  - prison2 (minutes) to be sent to online Pandora prison, after an automatic relog. More than 1 day (1440 minutes) is possible. If you don't automatically enter a Pandora prison after the relog, leave the current room and/or click on Exit in Chat Search.
* Added dogs option to the xstatus command
* Renamed the prison command as prison1
* Removed the code, ptcode, pw and timeleft commands (they are replaced by the infolock command)
