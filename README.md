# ULTRAbc

ULTRA Bondage Club by Nemesea - Add-on for Ben987's BondageClub game

ULTRAbc is a modSDK version of QAM, providing better compatibility with other add-ons, especially BCX and FBC.

Most recent version: 3.3.1

Check the Wiki for more info: https://github.com/tetris245/ULTRAbc/wiki

## Installation 

*Preliminary note* : if you use many add-ons for BC, you could be interested by **FUSAM**, a multi-add-on-loader for TamperMonkey: https://sidiousious.gitlab.io/bc-addon-loader/

**Recommended methode with Tampermonkey** - links to the ULTRAbc loader: 

Automatic: https://tetris245.github.io/ultrabc.github.io/ULTRAbcloader.user.js

Non-automatic: https://tetris245.github.io/ultrabc.github.io/ULTRAbcloader.js

You can find Tampermonkey here: https://www.tampermonkey.net/ (it's available for several browsers: Chrome, Microsoft Edge, Safari, Opera Next, Firefox, Dolphin, UC)

Manual installation: Add new script / Utilities / Insert link to ULTRAbc loader in last option / Click on "Install"

To update: Go to Installed Scripts / Click on date corresponding to ULTRAbc (TM will search for new version and install it)

**Bookmark methode** - link to the ULTRAbc bookmark: https://tetris245.github.io/ultrabc.github.io/ULTRAbcbookmark.js

**Alternative methode for Google Chrome, Microsoft Edge, similar browsers**
1. Download the ULTRAbc-version3.3.1.zip file on the Releases page
2. Depending on browser, the .zip might have to be extracted. few browsers accept a .zip, a few requires a folder.
3. Go to browser extensions. Enable developer mode.
4. Load as Unpacked. Done. If the file can't be seen, see step 2.

After installation, refresh your BC page and relog.

## Credits

Special thanks to KellyLoveyness for creating the original version of QAM.

Special thanks to Firefly for giving permission to integrate the BC-Diaper-Wetter script.

Special thanks to Myrhanda and Kimei for giving permission to integrate the Moaner script.

Thanks to lillyBC for providing ideas and inspiration with her bcTampermonkeys scripts.

Thanks for special assistance:
Shyness, Ada, huzpsb, Lilly, Nikky90506, Tarram1010.

Thanks for general assistance:
Brianna, Better, Miyako, Zeltron, Selina, Estsanatlehi, okatakab.
All else I might not have included.



==========================================================================


Changes for future version 

* New commands:
  - itemcolor2 (colorcode) to change the global item color for the worn item in a slot selected by mouse click (Can be used even when bound and locked)
  - itempriority (priority) to change the global item priority for the worn item in a slot selected by mouse click (Can be used even when bound and locked)
  - layerset1 (layernumber) (colorcode) to change a layer color for the worn item in the Item Slot previously saved by using layershow1 (Can be used even when bound and locked - To change all layers, use value -1 as layernumber)
  - layerset2 (layernumber) (priority) to change a layer priority for the worn item in the Item Slot previously saved by using layershow2 (Can be used even when bound and locked)
  - layershow1 to get layer color info about worn item in a slot selected by mouse click + save the selected Item Slot
  - layershow2 to get layer priority info about worn item in a slot selected by mouse click + save the selected Item Slot
* Renamed the itemcolor command as itemcolor1
* Added the admin option to the uhelp command and moved there the autokick, bg1, bg2 and bg3 commands
