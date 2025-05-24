# ULTRAbc

ULTRA Bondage Club by Nemesea - Add-on for Ben987's BondageClub game

ULTRAbc is a modSDK version of QAM, providing better compatibility with other add-ons, especially BCX and WCE.

Most recent version: 5.0

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
1. Download the ULTRAbc-version5.0.zip file on the Releases page
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

* Relooked the Chat Search screen (and removed the option related to games in GUI - Chat Search):
  - Moved the BC messages under the Search Input box, and the AutoJoin message under the Languages selector
  - Moved the Extensions button to the top after the Next button, and the lobby buttons to the center bottom
  - Moved the Club Card button and added the buttons corresponding to other games in rooms (GGTS, LARP, Magic Battle, Pandora Prison)
* Improved the online Pandora Prison as following (you need to enable the appropriate Immersion settings to auto-remake rooms): 
  - If you decide to be a prisoner in Infiltration dialog, a new room will always be created, and you will get admin powers after a full relog
  - If you decide to be a guardian in Infiltration dialog and choose the new room option, you can also get admin powers after a full relog
  - You can also directly create a Pandora room in any BC lobby (what's not possible with the Infiltration method, that is limited to the Mixed lobby)
  - To join a specific existing Pandora room as prisoner, first enter it as 'normal player', then use the prison2 command to be prisoner after the full automatic relog provoked by this command
