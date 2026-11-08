# ULTRAbc

ULTRA Bondage Club by Nemesea - Add-on for Ben987's BondageClub game

ULTRAbc is a modSDK version of QAM, providing better compatibility with other add-ons, especially BCX and WCE.

Most recent version: 6.4

Check the Wiki for more info: https://github.com/tetris245/ULTRAbc/wiki

<br>

## Installation 

Important: After installation, refresh your BC page and relog.

<br>

### Via mod managers 

If you use many add-ons for BC, you can use one of these mod managers and enable ULTRAbc inside their interface:

* FUSAM: https://sidiousious.gitlab.io/bc-addon-loader/
  
* PCM: https://awdrrawd.github.io/liko-Plugin-Repository/

You need Tampermonkey or Violentmonkey to install these mod managers.

<br>

### Standalone

**Methode with Tampermonkey or ViolentMonkey** - link to the ULTRAbc loader: 

https://tetris245.github.io/ultrabc.github.io/ULTRAbcloader.user.js

<br>

**Bookmark methode** - link to the ULTRAbc bookmark: 

https://tetris245.github.io/ultrabc.github.io/ULTRAbcbookmark.js

<br>

**Alternative methode for Google Chrome, Microsoft Edge, similar browsers** (Will not work with Asian server)
1. Download the ULTRAbc-version6.4.zip file on the Releases page   
2. Depending on browser, the .zip might have to be extracted. Some browsers accept a .zip, most browsers require a folder.
3. Go to browser extensions. Enable developer mode.
4. Load as Unpacked. Done. If the file can't be seen, see step 2.

<br>

## Language Selection

UBC is one script for all languages. Its texts are in the `translations` folder, in the same format as BC's own texts:

 - `Text_UBC.csv`: every text in English, as `key,text`
 - `Text_UBC_CN.txt`, `Text_UBC_ES.txt`: pairs of lines, the English text and then its translation (a missing line falls back to English)

UBC uses the language of BC (Chinese for 中文 and 繁體中文, English for languages UBC does not have) and follows it when you change it in game. 

On the login screen, click the UBC flag button at the right edge to open language settings afer a short delay (2 seconds). The UBC card has a "UBC follows BC" checkbox, manual English/Chinese/Spanish choices, and an English/Chinese fallback for BC languages UBC does not have. The BC card changes the main game language directly. Exit or Escape returns to Login. 

In game, use `/ulang es`, `/ulang cn` or `/ulang en` to pick a UBC language for your account, and `/ulang auto` to follow BC again. `\n` in a text is a line break and `{name}` parts are filled in by UBC. 

<b>If you prefer to choose language before login, never use the /ulang command, as the data saved to your account will override your choices in the language screen.</b>

`Text_UBC_DE.txt`, `Text_UBC_FR.txt`, `Text_UBC_RU.txt`, `Text_UBC_UA.txt` and `Text_UBC_TW.txt` only hold the few login-screen texts for now, so every BC language can show them. To add a full language, fill its file (or copy `Text_UBC_ES.txt`), translate the second line of each pair and add the language code to `UBC_LANGUAGES` in `ULTRAbc.js`.

<br>

## BC language-switch compatibility (only in version 6.4)

Older BC builds can leave text in a previous language when translation requests finish out of order, or refresh login labels before the selected language starts loading. UBC tests a disposable text cache and guards the recognized vulnerable build implementation. It also starts an outdated prefetched cache before callers await its loading promise. Native-fixed BC keeps its build method unchanged, and the prefetch hook does no extra rebuild when BC already refreshes the cache. Unfamiliar build implementations are left alone.

Regression tests use an actual BC checkout: set `BC_TEXT_SOURCE` to its `BondageClub/Scripts/Text.js`, then run `node --test tests/bc-text-cache.test.cjs`. Set `BC_EXPECT_NATIVE_FIX=1` when testing a BC checkout containing the native fix.

This feature will be removed in next UBC version, as it will be integrated in BC R134.

<br>

## Credits

Special thanks to KellyLoveyness for creating the original version of QAM.

Special thanks to Julia for the powerful code of the BCTweaks GUI.

Special thanks to Firefly for giving permission to integrate the BC-Diaper-Wetter script (removed since version 4.7 - if you like ABDL game, you are invited to install the new mod ABCL, which has more features and a nice interface - see https://github.com/zoe-64/ABCL/)

Special thanks to Myrhanda and Kimei for giving permission to integrate the Moaner script.

Special thanks to Eddii for giving permission to use a feature of his ELA mod (https://github.com/Eddiidev/ELA).

Thanks to lillyBC for providing ideas and inspiration with her bcTampermonkeys scripts.

Thanks to Feldob66 for providing the powerful Language support.

Thanks to TheSecretCoder for all his help to fix, optimise and improve many features.

Thanks to wwwruomeng for the Chinese translation.

Thanks to ciber for the Spanish translation.

Thanks for special assistance:
Shyness, Ada, huzpsb, Lilly, Nikky90506, Tarram1010, harmony, KitKat, Moon, Sin.

Thanks for general assistance:
Brianna, Better, Miyako, Zeltron, Selina, Estsanatlehi, okatakab, Lera.
All else I might not have included. 



==========================================================================

Changes for future version
* Improved the wexport command: The outfit code in BCG/UBC format is directly saved to the clipboard instead of being displayed in the chat
* Improved the wimport1, wimport2 and wimport3 commands: Several controls check now if the introduced code is in the appropriate BCG/UBC format
* Updated the alphabetic order for the screen with the Immersion settings


