# ULTRAbc

ULTRA Bondage Club by Nemesea - Add-on for Ben987's BondageClub game

ULTRAbc is a modSDK version of QAM, providing better compatibility with other add-ons, especially BCX and WCE.

Most recent version: 4.4

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
1. Download the ULTRAbc-version4.4.zip file on the Releases page
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
Shyness, Ada, huzpsb, Lilly, Nikky90506, Tarram1010, harmony, KitKat.

Thanks for general assistance:
Brianna, Better, Miyako, Zeltron, Selina, Estsanatlehi, okatakab.
All else I might not have included.



==========================================================================

Changes for future version

* Added an icon in the Extensions screen for the ULTRAbc Settings and a link to Icons8 in the GUI - Main menu
* Added the Chat Search page to the GUI, with some improvements:
  - You can now enable/disable two parameters (minimum and maximum players) for the normal and hybrid rooms
  - An Extensions button has been added in Chat Search, so you can faster access your settings
* New option in GUI - Misc to enable a no-escape mode:
  - This mode disables the FREE/OUT buttons and hotkeys.
  - It prevents to use some commands for yourself: boost, leave (BCAR), quit, safeworditem, safewordspecific (BCAR), slowleave, solidity (if value < 20), totalrelease, unlock, unrestrict total, untie.
  - If you are in unrestrict total mode when selecting this option, an automatic relog will disable the special goddess mode.
* New commands:
  - bgshow1 (bgnumber) to display locally clickable link to a specific standard background and embedded picture
  - bgshow2 (bgnumber) to send in chat link to a specific standard background (when used with WCE feature, the link is clickable and the picture can be embedded in the chat)
  - Tip: use the bglist command to get the list of all available standard background numbers
* Removed the roomsize and uset commands (all the settings are now in the GUI)
* Removed the roomtype command (as it's easier to use the buttons in Chat Search)


