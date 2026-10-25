# ULTRAbc

ULTRA Bondage Club by Nemesea - Add-on for Ben987's BondageClub game

ULTRAbc is a modSDK version of QAM, providing better compatibility with other add-ons, especially BCX and WCE.

Most recent version: 6.3.2

Check the Wiki for more info: https://github.com/tetris245/ULTRAbc/wiki

<br>

## Languages

UBC is one script for all languages. Its texts are in the `translations` folder, in the same format as BC's own texts:

 - `Text_UBC.csv`: every text in English, as `key,text`
 - `Text_UBC_CN.txt`, `Text_UBC_ES.txt`: pairs of lines, the English text and then its translation (a missing line falls back to English)

UBC uses the language of BC (Chinese for 中文 and 繁體中文, English for languages UBC does not have) and follows it when you change it in game. On the login screen, UBC has its own picker under the BC one, with a "UBC follows BC" checkbox. In game, use `/ulang es`, `/ulang cn` or `/ulang en` to pick a UBC language for your account, and `/ulang auto` to follow BC again. `\n` in a text is a line break and `{name}` parts are filled in by UBC.

`Text_UBC_DE.txt`, `Text_UBC_FR.txt`, `Text_UBC_RU.txt`, `Text_UBC_UA.txt` and `Text_UBC_TW.txt` only hold the few login-screen texts for now, so every BC language can show them. To add a full language, fill its file (or copy `Text_UBC_ES.txt`), translate the second line of each pair and add the language code to `UBC_LANGUAGES` in `ULTRAbc.js`.

<br>

## Not recommended installation (FUSAM)

Although UBC is available in the multi-mod manager FUSAM (only at browser-level), it is not recommended to use this way to load UBC, for these reasons:

 - FUSAM maintainer has refused to insert the language versions of UBC
 - In reaction to this decision, UBC loading via FUSAM adds 3 buttons on the Login screen, so you can click on the appropriate button to login with the English, Chinese or Spanish version of UBC (the standard Login button and the WCE buttons will not load one language version of UBC)
 - If you want to avoid this step, use one of the below recommended procedures

<br>


## Recommended installation procedures

To use UBC in English or Chinese, I recommend the PCM mod created by Likolisu, a Chinese friend: https://github.com/awdrrawd/liko-Plugin-Repository

To use UBC in English, Chinese or Spanish, the below methodes are also available, the TM/VM way is the easiest one.

<br>

**Methode with Tampermonkey or ViolentMonkey** - links to the ULTRAbc loader: 

English version: https://tetris245.github.io/ultrabc.github.io/ULTRAbcloader.user.js

Chinese version: https://tetris245.github.io/ultrabc.github.io/ULTRAbcloader-ch.user.js

Spanish version: https://tetris245.github.io/ultrabc.github.io/ULTRAbcloader-es.user.js

<br>

**Bookmark methode** - links to the ULTRAbc bookmark: 

English version: https://tetris245.github.io/ultrabc.github.io/ULTRAbcbookmark.js

Chinese version: https://tetris245.github.io/ultrabc.github.io/ULTRAbcbookmark-ch.js

Spanish version: https://tetris245.github.io/ultrabc.github.io/ULTRAbcbookmark-es.js

<br>

**Alternative methode for Google Chrome, Microsoft Edge, similar browsers** (Will not work with Asian server)
1. Download one of these files:

   English version: https://github.com/tetris245/ULTRAbc/releases/download/v6.3.2/ULTRAbc-en-v6.3.2.zip

   Chinese version: https://github.com/tetris245/ULTRAbc/releases/download/v6.3.2/ULTRAbc-ch-v6.3.2.zip

   Spanish version: https://github.com/tetris245/ULTRAbc/releases/download/v6.3.2/ULTRAbc-es-v6.3.2.zip
   
3. Depending on browser, the .zip might have to be extracted. Some browsers accept a .zip, most browsers require a folder.
4. Go to browser extensions. Enable developer mode.
5. Load as Unpacked. Done. If the file can't be seen, see step 2.

After installation, refresh your BC page and relog.

<br>

## Credits

Special thanks to KellyLoveyness for creating the original version of QAM.

Special thanks to Julia for the powerful code of the BCTweaks GUI.

Special thanks to Firefly for giving permission to integrate the BC-Diaper-Wetter script (removed since version 4.7 - if you like ABDL game, you are invited to install the new mod ABCL, which has more features and a nice interface - see https://github.com/zoe-64/ABCL/)

Special thanks to Myrhanda and Kimei for giving permission to integrate the Moaner script.

Special thanks to Eddii for giving permission to use a feature of his ELA mod (https://github.com/Eddiidev/ELA).

Thanks to lillyBC for providing ideas and inspiration with her bcTampermonkeys scripts.

Thanks to wwwruomeng for the Chinese translation.

Thanks to ciber for the Spanish translation.

Thanks for special assistance:
Shyness, Ada, huzpsb, Lilly, Nikky90506, Tarram1010, harmony, KitKat, Moon, Sin.

Thanks for general assistance:
Brianna, Better, Miyako, Zeltron, Selina, Estsanatlehi, okatakab, Lera.
All else I might not have included. 



==========================================================================

Changes for future version

* New setting in GUI - Visual Effects to enable/disable transparent effect on beep screen of the friend list


