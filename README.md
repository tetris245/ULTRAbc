# ULTRAbc

ULTRA Bondage Club by Nemesea - Add-on for Ben987's BondageClub game

ULTRAbc is a modSDK version of QAM, providing better compatibility with other add-ons, especially BCX and WCE.

Most recent version: 3.7

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
1. Download the ULTRAbc-version3.7.zip file on the Releases page
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
Shyness, Ada, huzpsb, Lilly, Nikky90506, Tarram1010, harmony.

Thanks for general assistance:
Brianna, Better, Miyako, Zeltron, Selina, Estsanatlehi, okatakab.
All else I might not have included.



==========================================================================


Changes for future version 

* Added two buttons in Main Hall for direct access to the "Main" Preferences screen and the Extensions screen
* Added a BACK button in all Preferences screens (except the screens added by extensions), so you can fastly go back to the chat room, the Main Hall or the Asylum Entrance
* New command: uset fixperm to enable/disable automatic change of your general item permission when using the BC safeword command or the revert option in the safeword menu
* Added support for the Devious Padlock (provided by DOGS mod) to the lock and unlock commands
  - Note 1: The lock command will work only if both players (source and target) have enabled the Devious Padlock in the DOGS menu
  - Note 2: As this lock is normally protected from cheats, the unlock command (and other 'escape' commands) will work only when the locked player uses a modified version of the DOGS mod
* Updated the high fame mode for Club Card Game with all the improvements made in BC since March 2024 + fixed the final message when receiving a reward card in high fame mode
* Updated the cardextra command and the Club Card Extra Deck
* Improved the diaper command by adding extra conditions for the custom settings
* Improved and optimised the outfit command 
* Optimised the gender checking for the Player and several other parts of the code 
* Migrated almost all variables from 'var' to 'let' (or 'const' in a few cases)
