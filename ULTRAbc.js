// ==UserScript==
// @name ULTRAbc
// @namespace https://www.bondageprojects.com/
// @version 2.8
// @description Everything you'll ever need for BC
// @author Nemesea
// @match https://bondageprojects.elementfx.com/*
// @match https://www.bondageprojects.elementfx.com/*
// @match https://bondage-europe.com/*
// @match https://www.bondage-europe.com/*
// @match http://localhost:*/*
// @icon data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant none
// @run-at document-end
// ==/UserScript==

//SDK stuff
var bcModSDK=function(){"use strict";const e="1.1.0";function o(e){alert("Mod ERROR:\n"+e);const o=new Error(e);throw console.error(o),o}const t=new TextEncoder;function n(e){return!!e&&"object"==typeof e&&!Array.isArray(e)}function r(e){const o=new Set;return e.filter((e=>!o.has(e)&&o.add(e)))}const i=new Map,a=new Set;function d(e){a.has(e)||(a.add(e),console.warn(e))}function s(e){const o=[],t=new Map,n=new Set;for(const r of p.values()){const i=r.patching.get(e.name);if(i){o.push(...i.hooks);for(const[o,a]of i.patches.entries())t.has(o)&&t.get(o)!==a&&d(`ModSDK: Mod '${r.name}' is patching function ${e.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${o}\nPatch1:\n${t.get(o)||""}\nPatch2:\n${a}`),t.set(o,a),n.add(r.name)}}o.sort(((e,o)=>o.priority-e.priority));const r=function(e,o){if(0===o.size)return e;let t=e.toString().replaceAll("\r\n","\n");for(const[n,r]of o.entries())t.includes(n)||d(`ModSDK: Patching ${e.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}(e.original,t);let i=function(o){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,e.name,n),d=r.apply(this,o);return null==a||a(),d};for(let t=o.length-1;t>=0;t--){const n=o[t],r=i;i=function(o){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,e.name,n.mod),d=n.hook.apply(this,[o,e=>{if(1!==arguments.length||!Array.isArray(o))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof e}`);return r.call(this,e)}]);return null==a||a(),d}}return{hooks:o,patches:t,patchesSources:n,enter:i,final:r}}function c(e,o=!1){let r=i.get(e);if(r)o&&(r.precomputed=s(r));else{let o=window;const a=e.split(".");for(let t=0;t<a.length-1;t++)if(o=o[a[t]],!n(o))throw new Error(`ModSDK: Function ${e} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const d=o[a[a.length-1]];if("function"!=typeof d)throw new Error(`ModSDK: Function ${e} to be patched not found`);const c=function(e){let o=-1;for(const n of t.encode(e)){let e=255&(o^n);for(let o=0;o<8;o++)e=1&e?-306674912^e>>>1:e>>>1;o=o>>>8^e}return((-1^o)>>>0).toString(16).padStart(8,"0").toUpperCase()}(d.toString().replaceAll("\r\n","\n")),l={name:e,original:d,originalHash:c};r=Object.assign(Object.assign({},l),{precomputed:s(l),router:()=>{},context:o,contextProperty:a[a.length-1]}),r.router=function(e){return function(...o){return e.precomputed.enter.apply(this,[o])}}(r),i.set(e,r),o[r.contextProperty]=r.router}return r}function l(){const e=new Set;for(const o of p.values())for(const t of o.patching.keys())e.add(t);for(const o of i.keys())e.add(o);for(const o of e)c(o,!0)}function f(){const e=new Map;for(const[o,t]of i)e.set(o,{name:o,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((e=>e.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return e}const p=new Map;function u(e){p.get(e.name)!==e&&o(`Failed to unload mod '${e.name}': Not registered`),p.delete(e.name),e.loaded=!1,l()}function g(e,t,r){"string"==typeof e&&"string"==typeof t&&(alert(`Mod SDK warning: Mod '${e}' is registering in a deprecated way.\nIt will work for now, but please inform author to update.`),e={name:e,fullName:e,version:t},t={allowReplace:!0===r}),e&&"object"==typeof e||o("Failed to register mod: Expected info object, got "+typeof e),"string"==typeof e.name&&e.name||o("Failed to register mod: Expected name to be non-empty string, got "+typeof e.name);let i=`'${e.name}'`;"string"==typeof e.fullName&&e.fullName||o(`Failed to register mod ${i}: Expected fullName to be non-empty string, got ${typeof e.fullName}`),i=`'${e.fullName} (${e.name})'`,"string"!=typeof e.version&&o(`Failed to register mod ${i}: Expected version to be string, got ${typeof e.version}`),e.repository||(e.repository=void 0),void 0!==e.repository&&"string"!=typeof e.repository&&o(`Failed to register mod ${i}: Expected repository to be undefined or string, got ${typeof e.version}`),null==t&&(t={}),t&&"object"==typeof t||o(`Failed to register mod ${i}: Expected options to be undefined or object, got ${typeof t}`);const a=!0===t.allowReplace,d=p.get(e.name);d&&(d.allowReplace&&a||o(`Refusing to load mod ${i}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(d));const s=e=>{"string"==typeof e&&e||o(`Mod ${i} failed to patch a function: Expected function name string, got ${typeof e}`);let t=g.patching.get(e);return t||(t={hooks:[],patches:new Map},g.patching.set(e,t)),t},f={unload:()=>u(g),hookFunction:(e,t,n)=>{g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`);const r=s(e);"number"!=typeof t&&o(`Mod ${i} failed to hook function '${e}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&o(`Mod ${i} failed to hook function '${e}': Expected hook function, got ${typeof n}`);const a={mod:g.name,priority:t,hook:n};return r.hooks.push(a),l(),()=>{const e=r.hooks.indexOf(a);e>=0&&(r.hooks.splice(e,1),l())}},patchFunction:(e,t)=>{g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`);const r=s(e);n(t)||o(`Mod ${i} failed to patch function '${e}': Expected patches object, got ${typeof t}`);for(const[n,a]of Object.entries(t))"string"==typeof a?r.patches.set(n,a):null===a?r.patches.delete(n):o(`Mod ${i} failed to patch function '${e}': Invalid format of patch '${n}'`);l()},removePatches:e=>{g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`);s(e).patches.clear(),l()},callOriginal:(e,t,n)=>(g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`),"string"==typeof e&&e||o(`Mod ${i} failed to call a function: Expected function name string, got ${typeof e}`),Array.isArray(t)||o(`Mod ${i} failed to call a function: Expected args array, got ${typeof t}`),function(e,o,t=window){return c(e).original.apply(t,o)}(e,t,n)),getOriginalHash:e=>("string"==typeof e&&e||o(`Mod ${i} failed to get hash: Expected function name string, got ${typeof e}`),c(e).originalHash)},g={name:e.name,fullName:e.fullName,version:e.version,repository:e.repository,allowReplace:a,api:f,loaded:!0,patching:new Map};return p.set(e.name,g),Object.freeze(f)}function h(){const e=[];for(const o of p.values())e.push({name:o.name,fullName:o.fullName,version:o.version,repository:o.repository});return e}let m;const y=function(){if(void 0===window.bcModSdk)return window.bcModSdk=function(){const o={version:e,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:f,errorReporterHooks:Object.seal({hookEnter:null,hookChainExit:null})};return m=o,Object.freeze(o)}();if(n(window.bcModSdk)||o("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&o(`Failed to init Mod SDK: Different version already loaded ('1.1.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==e&&(alert(`Mod SDK warning: Loading different but compatible versions ('1.1.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk.version.startsWith("1.0.")&&void 0===window.bcModSdk._shim10register)){const e=window.bcModSdk,o=Object.freeze(Object.assign(Object.assign({},e),{registerMod:(o,t,n)=>o&&"object"==typeof o&&"string"==typeof o.name&&"string"==typeof o.version?e.registerMod(o.name,o.version,"object"==typeof t&&!!t&&!0===t.allowReplace):e.registerMod(o,t,n),_shim10register:!0}));window.bcModSdk=o}return window.bcModSdk}();return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}();
//SDKstuff end

(async function() {
    if (window.UBCver) {
        console.warn("ULTRAbc already loaded. No double loading");
        return;
    }

    const UBCver = "2.8";
    const modApi = bcModSDK.registerMod({
        name: 'ULTRAbc',
        fullName: 'Ultra Bondage Club',
        version: UBCver,
        repository: 'https://github.com/tetris245/ULTRAbc',
    });

    //Main variables and settings for UBC and The Moaner
    window.UBCver = UBCver;
    let kp = 0;
    
    let tmpname;
    let pronoun1;
    let pronoun2;
    let pronoun3;
    let pronoun4;

    var M_MOANER_moanerKey = "bc_moaner_";
    var M_MOANER_scriptOn = false;
    var M_MOANER_cum = false;
    let profileName;
    var cdesk = 0;
    var cfame = 200;

    let AutojoinOn;   
    let FullseedOn;
    let HighfameOn;
    let HotkeysOn;
    let MagiccheatOn;
    let MapfullOn = false;
    var NowhisperOn = false;
    var NPCpunish = false;  
    let OutbuttonsOn;
    let SlowleaveOn;
    let SosbuttonsOn;

    let blureffect;
    let oldhorny = 0;

    let Clothes = "";
    let Mlock = "";
    let Naked = "";
    let Pet = "";
    let Randomize = "";
    let Restrain = "";
    let Solidity = "";
    let Totalrelease = "";
    let Underwear = "";
    let Unlock = "";
    let Untie = "";

    let Tclothes = "";
    let Tlock = "";
    let Tnaked = "";
    let Tpet = "";
    let Trandomize = "";
    let Trestrain = "";
    let Tsolidity = "";
    let Ttotalrelease = "";
    let Tunderwear = "";
    let Tunlock = "";
    let Tuntie = "";

    var M_MOANER_orgasmActive = true;
    var M_MOANER_spankActive = true;
    var M_MOANER_talkActive = true;
    var M_MOANER_tickleActive = true;
    var M_MOANER_vibratorActive = true;
    var M_MOANER_xvibratorActive = true;

    var M_MOANER_orgasmStatus = ["The orgasm moan is active. You will moan while cumming.",
        "The orgasm moan is not active. You will not moan while cumming anymore."
    ];
    var M_MOANER_profileStatus = ["No custom profile loaded.",
        "Current moans profile: "
    ];
    var M_MOANER_profileListM_MOANER_intro = "Available moaning profiles: ";
    var M_MOANER_scriptStatus = ["The moaner is active.",
        "The moaner is not active."
    ];
    var M_MOANER_spankStatus = ["The spank moan is active. You will moan while being spanked.",
        "The spank moan is not active. You will not moan while being spanked."
    ];
    var M_MOANER_talkStatus = ["The talk moan is active. If you're vibed, you will moan while speaking.",
        "The talk moan is not active. If you're vibed, you will not moan while speaking anymore."
    ];
    var M_MOANER_tickleStatus = ["The tickle moan is active. You will moan while being tickled.",
        "The tickle moan is not active. You will not moan while being tickled."
    ];
    var M_MOANER_vibratorStatus = ["The vibes moan is active. If your vibrator's settings change, you will moan.",
        "The vibes moan is not active. If your vibrator's settings change, you will not moan."
    ];
    var M_MOANER_xvibratorStatus = ["The xvibes moan is active. If vibrator's settings of other players change, you will moan.",
        "The xvibes moan is not active. If vibrator's settings of other players change, you will not moan."
    ];

    var AutojoinStatus = ["Auto-Join feature is enabled.",
        "Auto-Join feature is disabled."
    ];
    var ExitmodeStatus = ["Fast exit mode is activated.",
        "Slow exit mode is activated."
    ];
    var FullseedStatus = ["Full solution for intricate and high security locks is enabled.",
        "Full solution for intricate and high security locks  is disabled."
    ];
    var HighfameStatus = ["High fame mode enabled in Bondage Club Card Game.",
        "High fame mode disabled in Bondage Club Card Game."
    ];
    var HotkeysStatus = ["Hotkeys on numeric pad are enabled.",
        "Hotkeys on numeric pad are disabled."
    ];
    var MagiccheatStatus = ["Cheat mode enabled in Bondage Brawl and Magic School.",
        "Cheat mode disabled in Magic School."
    ];
    var NowhisperStatus = ["No-whisper mode enabled.",
        "No-whisper mode disabled."
    ];
    var NpcpunishStatus = ["NPC punishments enabled.",
        "NPC punishments disabled."
    ];
    var OutbuttonsStatus = ["OUT buttons displayed and enabled.",
        "OUT buttons hidden and disabled."
    ];
    var SosbuttonsStatus = ["FREE buttons displayed and enabled.",
        "FREE buttons hidden and disabled."
    ];
    
    // Main variables from other add-ons
    // BCAR
    var AnimalTypeStatus = ["Current Animal Type: "];
    var AnimationButtonsStatus = ["Animation Buttons enabled.",
        "Animation Buttons disabled."
    ];
    var ArousalManipulationStatus = ["Arousal Manipulation enabled.",
        "Arousal Manipulation disabled."
    ];
    var BCARExpressionsStatus = ["BCAR Expressions enabled.",
        "BCAR Expressions disabled."
    ];
    var EarAnimationStatus = ["Ear Animation enabled.",
        "Ear Animation disabled."
    ];
    var EarEmoteStatus = ["Ear Emote enabled.",
        "Ear Emote disabled."
    ];
    var TailAnimationStatus = ["Tail Animation enabled.",
        "Tail Animation disabled."
    ];
    var TailEmoteStatus = ["Tail Emote enabled.",
        "Tail Emote disabled."
    ];
    var WingAnimationStatus = ["Wing Animation enabled.",
        "Tail Animation disabled."
    ];

    // BC Responsive
    var BCResponsiveStatus = ["BC Responsive is enabled.",
        "BC Responsive is disabled."
    ];
	
    // BCTweaks
    var ArousalErectionStatus = ["Arousal can affect male erection.",
        "Arousal can't affect male erection."
    ];
    var ArousalProgressStatus = ["Arousal can affect orgasm progress.",
        "Arousal can't affect orgasm progress."
    ];
    var BCIconsStatus = ["BC Icons are displayed only when the mouse hovers above you.",
        "BC Icons are always displayed."
    ];
    var BCTChangelogStatus = ["BCT Changelog feature is enabled.",
        "BCT Changelog feature is disabled."
    ];
    var BCTIconStatus = ["BCT Icon is displayed only when the mouse hovers above you.",
        "BCT Icon is always displayed."
    ];
    var BestFriendsStatus = ["Best Friends feature is enabled.",
        "Best Friends feature is disabled."
    ];
    var LockConversionStatus = ["High security locks can become Best Friend locks.",
        "High security locks can't become Best Friend locks."
    ];
    var RoomShareStatus = ["Best Friends can share private room names.",
        "Best Friends can't share private room names."
    ];
    var SplitStatus = ["Two bars for arousal and orgasm.",
        "Only the standard arousal + orgasm bar."
    ];
    var TailWaggingStatus = ["Tail Wagging feature is enabled.",
        "Tail Wagging feature is disabled."
    ];

    // EBCH
    var EbchLogStatus = ["Chatlogging is disabled.",
        "Chatlogging is enabled."
    ];
    var EbchNotificationStatus = ["Custom notifications are disabled.",
        "Custom notifications are enabled."
    ];
    var EbchPoseStatus = ["Pose menu is not automatically displayed.",
        "Pose menu is automatically displayed."
    ];
    var EbchUngarbleStatus = ["Messages are not ungarbled.",
        "Messages from white list are ungarbled.",
        "All messages are ungarbled."
    ];
    var EbchWelcomeStatus = ["No EBCH Welcome message.",
        "EBCH Welcome message."
    ]

    // LSCG
    var BcLscgStatus = ["LSCG is enabled.",
        "LSCG is disabled."
    ];
    var BoopReactionsStatus = ["Auto-react when booped.",
        "No auto-react when booped."
    ];
    var CheckRollsStatus = ["Display of attacker/defender roll values with some activities.",
        "No display of attacker/defender roll values with some activities."
    ];
    var Crafting1Status = ["Your public craftings are shared and can be used by other LSCG players in the chat room.",
        "Your public craftings are not shared."
    ];
    var Crafting2Status = ["Your shared public craftings are displayed.",
        "Your shared public craftings are not displayed."
    ];
    var EdgeBlurStatus = ["Blurring of the screen when you are on edge.",
        "No blurring of the screen when you are on edge."
    ];
    var ErectionStatus = ["Private message when you feel an erection under your clothes.",
        "No private message when you feel an erection under your clothes."
    ];
    var Lipstick1Status = ["Other people can leave lipstick marks on your face or neck when kissing you.",
        "No lipstick mark on your face or neck when someone kisses you."
    ];
    var Lipstick2Status = ["No lipstick marks when you kiss someone.",
        "Lipstick marks possible when you kiss someone."
    ];
    var Opacity1Status = ["Effects bypassing opacity are applied.",
        "Effects bypassing opacity are not applied."
    ];
    var Opacity2Status = ["Other players can change the opacity of your wardrobe items.",
        "Other players can't change the opacity of your wardrobe items."
    ];
    var RestrainedSettingsStatus = ["LSCG settings can't be changed when you are restrained.",
        "LSCG settings can be changed when you are restrained."
    ];
    var ResizingStatus = ["LSCG resizing effects will not be displayed.",
        "LSCG resizing effects will be displayed."
    ];

    // MBS
    var LockedMbsStatus = ["MBS settings are locked when you are restrained.",
        "You can always change MBS settings, even when you are restrained."
    ]; 
    var LockedWheelStatus = ["You can always spin a wheel of fortune, even when you are restrained.",
        "Wheel of fortune is locked when you are restrained."
    ];

    // Responsive
    var BcrResponsesStatus = ["Responses feature is enabled.",
        "Responses feature is disabled."
    ];
    var CharacterTalkStatus = ["Character Talk is enabled.",
        "Character Talk is disabled."
    ];
    var InterceptMessageStatus = ["Responses can interrupt and send messages.",
        "Responses can't interrupt and send messages."
    ];
    var LeaveMessageStatus = ["The message being written is sent when leashed out of the room.",
        "The message being written is not sent when leashed out of the room."
    ];
    var MoansStatus = ["Moans are added to responses when highly aroused.",
        "Moans are not added to responses when highly aroused."
    ];
    var NewVersionStatus = ["New Responsive Version feature is enabled.",
        "New Responsive Version feature is disabled."
    ];  
     var ResponsiveStatus = ["Responsive is enabled.",
        "Responsive is disabled."
    ];
    var RulesStatus = ["BCX rules can prevent message sending.",
        "BCX rules can't prevent message sending."
    ];

    // Themed
    var BCThemedStatus = ["Themed is enabled.",
        "ThemedBC is disabled."
    ];
    var ChatInputStatus = ["The chat input zone uses colors selected in Themed.",
        "The chat input zone uses the default BC colors."
    ];
    var ChatStylingStatus = ["Chat Special Tyling is enabled.",
        "Chat Special Tyling is disabled."
    ];
    var FriendListStatus = ["The friend list uses colors selected in Themed.",
        "The friend list uses the default BC colors."
    ];
    var GuiOverhaulStatus = ["The interface uses colors selected in Themed.",
        "The interface uses the default BC colors."
    ];
    var InputZonesStatus = ["Misc input zones use colors selected in Themed.",
        "Misc input zones use the default BC colors."
    ];
    var LocalTimeStatus = ["The time is displayed according your locale settings.",
        "The time is displayed according your system settings."
    ];
    var MiscDetailsStatus = ["Misc details use colors selected in Themed.",
        "Misc details use the default BC colors."
    ];
    var ThemedVersionStatus = ["New Themed Version feature is enabled.",
        "New Themed Version feature is disabled."
    ];

    //Initialisation
    function M_MOANER_initControls() {
        var datas = JSON.parse(localStorage.getItem(M_MOANER_moanerKey + "_" + Player.MemberNumber));
        if (datas == null || datas == undefined) {
            M_MOANER_orgasmActive = true;
            M_MOANER_scriptOn = false;
            M_MOANER_spankActive = true;
            M_MOANER_talkActive = true;
            M_MOANER_tickleActive = true;
            M_MOANER_vibratorActive = true;
            M_MOANER_xvibratorActive = true;
            M_MOANER_cum = false;
            profileName = "default";
            tmpname = "";
            pronoun1 = "";
            pronoun2 = "";
            pronoun3 = "";
            pronoun4 = "";
            cdesk = 0;
            cfame = 200;
            AutojoinOn = false;
            FullseedOn = false;
            HighfameOn = false;
            HotkeysOn = false;
            MagiccheatOn = false;
	    MapfullOn = false;
            NowhisperOn = false;
            NPCpunish = false;
	    OutbuttonsOn = false;
            SlowleaveOn = false;
            SosbuttonsOn = false;
            blureffect = false;
            oldhorny = 0;
            Clothes = "";
            Mlock = "";
            Naked = "";
            Pet = "";
            Randomize = "";
            Restrain = "";
	    Solidity = "";
            Tclothes = "";
            Tlock = "";
            Tnaked = "";
            Totalrelease = "";
            Tpet = "";
            Trandomize = "";
            Trestrain = "";
	    Tsolidity = "";
            Ttotalrelease = "";
            Tunderwear = "";
            Tunlock = "";
            Tuntie = "";
            Underwear = "";
            Unlock = "";
            Untie = "";
            //M_MOANER_saveControls();
        } else {
            M_MOANER_orgasmActive = datas.orgasmMoan;
            M_MOANER_scriptOn = datas.script;
            M_MOANER_spankActive = datas.spankMoan;
            M_MOANER_talkActive = datas.talkMoan;
            M_MOANER_tickleActive = datas.tickleMoan;
            M_MOANER_vibratorActive = datas.vibeMoan;
            M_MOANER_xvibratorActive = datas.xvibeMoan;
            M_MOANER_cum = datas.cum;
            profileName = datas.moanProfile;
            tmpname = datas.tmpname;
            pronoun1 = datas.pronoun1;
            pronoun2 = datas.pronoun2;
            pronoun3 = datas.pronoun3;
            pronoun4 = datas.pronoun4;
            cdesk = datas.cdesk;
            cfame = datas.cfame;
            AutojoinOn = datas.autojoin;
            FullseedOn = datas.fullseed;
            HighfameOn = datas.highfame;
            HotkeysOn = datas.hotkeys;
            MagiccheatOn = datas.magiccheat;
	    MapfullOn = false;
            NowhisperOn = datas.nowhisper;
            NPCpunish = datas.npcpunish;
	    OutbuttonsOn = datas.outbuttons;
            SlowleaveOn = datas.slowleave;
            SosbuttonsOn = datas.sosbuttons;
            blureffect = false;
            oldhorny = 0;
            Clothes = datas.clothes;
            Mlock = datas.mlock;
            Naked = datas.naked;
            Pet = datas.pet;
            Randomize = datas.randomize;
            Restrain = datas.restrain;
	    Solidity = datas.solidity;
            Tclothes = datas.tclothes;
            Tlock = datas.tlock;
            Tnaked = datas.tnaked;
            Totalrelease = datas.totalrelease;
            Tpet = datas.tpet;
            Trandomize = datas.trandomize;
            Trestrain = datas.trestrain;
	    Tsolidity = datas.tsolidity;
            Ttotalrelease = datas.ttotalrelease;
            Tunderwear = datas.tunderwear;
            Tunlock = datas.tunlock;
            Tuntie = datas.tuntie;
            Underwear = datas.underwear;
            Unlock = datas.unlock;
            Untie = datas.untie;
        }
    }

    function M_MOANER_saveControls() {
        var controls = {
            "orgasmMoan": M_MOANER_orgasmActive,
            "script": M_MOANER_scriptOn,
            "spankMoan": M_MOANER_spankActive,
            "talkMoan": M_MOANER_talkActive,
            "tickleMoan": M_MOANER_tickleActive,
            "vibeMoan": M_MOANER_vibratorActive,
            "xvibeMoan": M_MOANER_xvibratorActive,
            "cum": M_MOANER_cum,
            "moanProfile": profileName,
            "tmpname": tmpname,
            "pronoun1": pronoun1,
            "pronoun2": pronoun2,
            "pronoun3": pronoun3,
            "pronoun4": pronoun4,
            "cdesk": cdesk,
            "cfame": cfame,
            "autojoin": AutojoinOn,
            "fullseed": FullseedOn,
            "highfame": HighfameOn,
            "hotkeys": HotkeysOn,
            "magiccheat": MagiccheatOn,
	    "mapfull": MapfullOn,
            "nowhisper": NowhisperOn,
            "npcpunish": NPCpunish,
            "outbuttons": OutbuttonsOn,
            "slowleave": SlowleaveOn,
            "sosbuttons": SosbuttonsOn,
            "blureffect": blureffect,
            "oldhorny": oldhorny,
            "clothes": Clothes,
            "mlock": Mlock,
            "naked": Naked,
            "pet": Pet,
            "randomize": Randomize,
            "restrain": Restrain,
            "solidity": Solidity,
            "tclothes": Tclothes,
            "tlock": Tlock,
            "tnaked": Tnaked,
            "totalrelease": Totalrelease,
            "tpet": Tpet,
            "trandomize": Trandomize,
            "trestrain": Trestrain,
            "tsolidity": Tsolidity,
            "ttotalrelease": Ttotalrelease,
            "tunderwear": Tunderwear,
            "tunlock": Tunlock,
            "tuntie": Tuntie,
            "underwear": Underwear,
            "unlock": Unlock,
            "untie": Untie
        };
        localStorage.setItem(M_MOANER_moanerKey + "_" + Player.MemberNumber, JSON.stringify(controls));
    }

    function M_MOANER_deleteControls() {
        kp = 1;
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key.startsWith(M_MOANER_moanerKey) && key.endsWith(Player.MemberNumber)) {
                localStorage.removeItem(key);
            }
        }
    }

    let MoanerIsLoaded;

    MoanerLoginListener();

    async function MoanerLoginListener() {
        while (!MoanerIsLoaded) {
            try {
                while ((!window.CurrentScreen || window.CurrentScreen == "Login") && !MoanerIsLoaded) {
                    //console.log("search for isLoaded");
                    //console.log("window.CurrentScreen="+window.CurrentScreen);
                    await new Promise(r => setTimeout(r, 2000));
                }
                //console.log("window.CurrentScreen="+window.CurrentScreen);
                //console.log("MoanerIsLoaded found");
                MoanerIsLoaded = true;
                M_MOANER_initControls();
                Player.UBC = UBCver;
                console.log("ULTRAbc loaded: Version " + UBCver);
		Player.OnlineSharedSettings.UBC = UBCver;
                ServerAccountUpdate.QueueData({ OnlineSharedSettings: Player.OnlineSharedSettings });
                if (NPCpunish == true) {
                    Player.RestrictionSettings.BypassNPCPunishments = false;
                } else {
                    Player.RestrictionSettings.BypassNPCPunishments = true;
                }
                if (cfame == null || cfame == undefined) {
                    cdesk = 0;
                    cfame = 200;
                    M_MOANER_saveControls();
                }
                if (HighfameOn == null || HighfameOn == undefined) {
                    HighfameOn = false;
                    M_MOANER_saveControls();
                }
                if (HotkeysOn == null || HotkeysOn == undefined) {
                    HotkeysOn = false;
                    M_MOANER_saveControls();
                }
		if (MapfullOn == null || MapfullOn == undefined) {
                    MapfullOn = false;
                    M_MOANER_saveControls();
                }
		if (OutbuttonsOn == null || OutbuttonsOn == undefined) {
                    OutbuttonsOn = false;
                    M_MOANER_saveControls();
                }
                if (M_MOANER_tickleActive == null || M_MOANER_tickleActive == undefined) {
                    M_MOANER_tickleActive = true;
                    M_MOANER_saveControls();
                }
                if (M_MOANER_xvibratorActive == null || M_MOANER_xvibratorActive == undefined) {
                    M_MOANER_xvibratorActive = true;
                    M_MOANER_saveControls();
                }
            } catch (err) {
                console.log(err);
            }
            await new Promise(r => setTimeout(r, 2000));
        }
    }

    //ModSDK Functions
    ULTRAActivityChatRoomArousalSync();
    ULTRAAppearanceClick();
    ULTRAAppearanceRun();
    ULTRACellClick();
    ULTRACellLoad();
    ULTRACellRun();
    ULTRAChatRoomCharacterViewDrawBackground();
    ULTRAChatRoomClick();
    ULTRAChatRoomKeyDown();
    ULTRAChatRoomMapViewCalculatePerceptionMasks();
    ULTRAChatRoomMenuDraw();
    ULTRAChatSearchExit();
    ULTRAChatSearchJoin();
    ULTRAChatSearchRoomSpaceSelectClick();
    ULTRAChatSearchRoomSpaceSelectDraw(); 
    ULTRAClubCardEndTurn();
    ULTRAClubCardLoadDeckNumber();
    ULTRACraftingItemListBuild();
    ULTRADrawCharacter();
    ULTRAFriendListClick();
    ULTRAFriendListRun();
    ULTRAInfiltrationPrepareMission();
    ULTRALoginRun();
    ULTRAMagicPuzzleRun();
    ULTRAMagicSchoolEscapeSpellEnd();
    ULTRAMainHallClick();
    ULTRAMainHallRun();
    ULTRAPandoraPrisonClick();
    ULTRAPandoraPrisonRun();
    ULTRAPhotographicClick();
    ULTRAPhotographicRun();
    ULTRAPlatformAttack();
    ULTRAPlatformDialogEvent();
    ULTRAStruggleMinigameWasInterrupted();
    ULTRATitleExit();

    //Bondage Brawl
    async function ULTRAPlatformAttack() {
        modApi.hookFunction('PlatformAttack', 4, (args, next) => {
            if (MagiccheatOn == true) {
                PlatformPlayer.Health = 100;
                PlatformPlayer.Magic = 100;
                PlatformPlayer.Projectile = 100;
            }
            next(args);
        });
    }

    async function ULTRAPlatformDialogEvent() {
        modApi.hookFunction('PlatformDialogEvent', 4, (args, next) => {
            if (MagiccheatOn == true) {
                PlatformPlayer.Health = 100;
                PlatformPlayer.Magic = 100;
                PlatformPlayer.Projectile = 100;
            }
            next(args);
        });
    }

    //Chat Room (+ name/nickname/pronouns management for player)
    async function ULTRAChatRoomClick() {
        modApi.hookFunction('ChatRoomClick', 4, (args, next) => {
            if (SosbuttonsOn == true) {
                if ((ChatRoomData.MapData == null) || (ChatRoomData.MapData.Type == null) || (ChatRoomData.MapData.Type == "Never")) {
                    if ((MouseX >= 0) && (MouseX < 45) && (MouseY >= 45) && (MouseY < 90)) {
                        var move = 1;
                    }
                } else {
                    if ((MouseX >= 955) && (MouseX < 1000) && (MouseY >= 45) && (MouseY < 90)) {
                        var move = 1;
                    }
                }    
                if (move == 1) {
                    var move = 0;
                    if (Totalrelease == undefined) {
                        var message = "Magical lasers make disappear all bindings and toys on " + tmpname + "'s body."
                    } else {
                        if (Totalrelease != "") {
                            if (Totalrelease.startsWith("\u0027")) {
                                var message = tmpname + Totalrelease;
                            } else {
                                var message = tmpname + ' '.repeat(1) + Totalrelease;
                            }
                        } else {
                            var message = "Magical lasers make disappear all bindings and toys on " + tmpname + "'s body."
                        }
                    }
                    if (Totalrelease != "no message") {
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: message
                            }]
                        });
                    }
                    CharacterReleaseTotal(Player);
                    ChatRoomCharacterUpdate(Player);
                    return;
                }
	    }
            if (OutbuttonsOn == true) {
                if ((ChatRoomData.MapData == null) || (ChatRoomData.MapData.Type == null) || (ChatRoomData.MapData.Type == "Never")) {
                    if ((MouseX >= 0) && (MouseX < 45) && (MouseY >= 90) && (MouseY < 135)) {
                        var move = 2;
                    }
                } else {
                    if ((MouseX >= 955) && (MouseX < 1000) && (MouseY >= 90) && (MouseY < 135)) {
                        var move = 2;
                    }
                }    
                if (move == 2) {
                    var move = 0;
                    if (SlowleaveOn == true) {
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " slowly heads for the door."
                            }]
                        });
                        setTimeout(function() {
                            ChatRoomSetLastChatRoom("");
                            ServerSend("ChatRoomLeave", "");
                            CommonSetScreen("Online", "ChatSearch");
                            ChatRoomClearAllElements();
                            OnlineGameName = "";
                        }, 15000);
                        return;
                    } else {
                        ChatRoomSetLastChatRoom("");
                        ServerSend("ChatRoomLeave", "");
                        CommonSetScreen("Online", "ChatSearch");
                        ChatRoomClearAllElements();
                        OnlineGameName = "";
                    }
                }
            }
            next(args);
        });
    }

    async function ULTRAChatRoomKeyDown() {
        modApi.hookFunction('ChatRoomKeyDown', 4, (args, next) => {
            if (HotkeysOn == true) {
                if (event.code === "NumpadDivide") {              
                    ChatRoomSetLastChatRoom("");
                    ServerSend("ChatRoomLeave", "");
                    CommonSetScreen("Online", "ChatSearch");
                    ChatRoomClearAllElements();
                    OnlineGameName = "";
                }
                if (event.code === "NumpadMultiply") {             
                     CharacterReleaseTotal(Player);
                     ChatRoomCharacterUpdate(Player);
                     return;
                }
            }
            if (event.key === "Enter" && !event.shiftKey) {
                var text = ElementValue("InputChat");
                if (text.startsWith(",")) {
                    var text1 = "(" + text.slice(1) + ")";
                    ElementValue("InputChat", text.replace(text, text1));
                } else {
                    var text1 = text;
                }
                if ((text1.startsWith(".")) && (window.BCX_Loaded == true)) {
                    var text2 = text1;
                    var tsp = 1;
                    ChatRoomSetTarget(null);
                } else if ((text1.startsWith("!")) || (text1.startsWith("("))) {
                    var text2 = text1;
                    var tsp = 1;
                } else if ((text1.startsWith(":")) && (Player.ChatSettings.MuStylePoses == true)) {
                    var text2 = text1;
                    var tsp = 1;
                    ChatRoomSetTarget(null);
                } else if ((text1.startsWith("*")) || (text1.startsWith("/"))) {
                    var text2 = text1;
                    var tsp = 1;
                    ChatRoomSetTarget(null);
                } else if ((text1.startsWith("@")) && (window.MBCHC)) {
                    var text2 = text1;
                    var tsp = 1;
                    ChatRoomSetTarget(null);
		} else if (text1.startsWith("\\")) {
                    var text2 = text1.replaceAt(0, "\u200b");
                    var tsp = 1;
                } else {
                    var tsp = 0;
                    if (this.BabyTalkOn == true) {
                        var text2 = SpeechBabyTalk({
                            Effect: ["RegressedTalk"]
                        }, text1);
                    } else if (this.GagTalkOn == true) {
                        var text2 = SpeechGarbleByGagLevel(gl, text1);
                    } else {
                        var text2 = text1;
                    }
                }
                ElementValue("InputChat", text1.replace(text1, text2));
                if (tsp == 1) {
                    var text3 = text2;
                } else {
                    if (this.Stutter1On == true) {
                        var text3 = StutterTalk1(text2);
                    } else if (this.Stutter2On == true) {
                        var text3 = StutterTalk2(text2);
                    } else if (this.Stutter3On == true) {
                        var text3 = StutterTalk3(text2);
                    } else if (this.Stutter4On == true) {
                        var text3 = StutterTalk4(text2);
                    } else {
                        var text3 = text2;
                    }
                }
                ElementValue("InputChat", text2.replace(text2, text3));
                if (tsp == 1) {
                    var text4 = text3;
                } else {
                    if (M_MOANER_talkActive && M_MOANER_scriptOn && IsStimulated(Player)) {
                        var text4 = M_MOANER_applyMoanToMsg(Player, text3);
                    } else {
                        var text4 = text3;
                    }
                }
                ElementValue("InputChat", text3.replace(text3, text4));
                event.preventDefault();
                if (ChatRoomTargetMemberNumber == null) {
                    ChatRoomSendChat();
                } else {
                    if (NowhisperOn == false) {
                        ServerSend("ChatRoomChat", {
                            "Content": text4,
                            "Type": "Whisper",
                            "Target": ChatRoomTargetMemberNumber
                        });
                        for (let C = 0; C < ChatRoomCharacter.length; C++)
                            if (ChatRoomTargetMemberNumber == ChatRoomCharacter[C].MemberNumber) {
                                if ((ChatRoomCharacter[C].Nickname == '') || (ChatRoomCharacter[C].Nickname == undefined)) {
                                    TargetName = ChatRoomCharacter[C].Name;
                                } else {
                                    TargetName = ChatRoomCharacter[C].Nickname;
                                }
                                break;
                            }
                        ChatRoomMessage({
                            Content: "Whisper to " + TargetName + ": " + text4,
                            Type: "LocalMessage",
                            Sender: Player.MemberNumber
                        });
                        document.querySelector('#TextAreaChatLog').lastChild.style.fontStyle = "italic";
                        document.querySelector('#TextAreaChatLog').lastChild.style.color = "silver";
                    }
                }
                ElementValue("InputChat", "");
            }
            next(args);
        });
    }

    async function ULTRAChatRoomMapViewCalculatePerceptionMasks() {
        modApi.hookFunction('ChatRoomMapViewCalculatePerceptionMasks', 4, (args, next) => {
            if (MapfullOn) {
                ChatRoomMapViewVisibilityMask.fill(true);
		ChatRoomMapViewAudibilityMask.fill(true);
		return;
            }    
            next(args);
        });
    }

    async function ULTRAChatRoomMenuDraw() {
        modApi.hookFunction('ChatRoomMenuDraw', 4, (args, next) => {
            if (kp != 1) {
                if (tmpname == "") {
                    if (Player.Nickname == '') {
                        tmpname = Player.Name;
                    } else {
                        tmpname = Player.Nickname;
                    }
                    M_MOANER_saveControls();
                } else {
                    if (Player.Nickname != '') {
                        if (tmpname != Player.Nickname) {
                            tmpname = Player.Nickname;
                            M_MOANER_saveControls();
                        }
                    } else {
                        if (tmpname != Player.Name) {
                            tmpname = Player.Name;
                            M_MOANER_saveControls();
                        }
                    }
                }
                if (InventoryGet(Player, "Pronouns") != null) {
                    if (InventoryGet(Player, "Pronouns").Asset != null) {
                        let chprn = InventoryGet(Player, "Pronouns").Asset.Name;
                        if (chprn != pronoun1) {
                            if (chprn == "HeHim") {
                                pronoun1 = "He";
                                pronoun2 = "him";
                                pronoun3 = "his";
                                pronoun4 = "he";
                                M_MOANER_saveControls();
                            } else if (chprn == "SheHer") {
                                pronoun1 = "She";
                                pronoun2 = "her";
                                pronoun3 = "her";
                                pronoun4 = "she";
                                M_MOANER_saveControls();
                            } else {
                                pronoun1 = "They";
                                pronoun2 = "them";
                                pronoun3 = "their";
                                pronoun4 = "they";
                                M_MOANER_saveControls();
                            }
                        }
                    }
                }
            }
            if (SosbuttonsOn == true) {
                if ((ChatRoomData.MapData == null) || (ChatRoomData.MapData.Type == null) || (ChatRoomData.MapData.Type == "Never")) {
                    DrawButton(0, 45, 45, 45, "FREE", "White", "", "Total Release");
	           } else {
                    DrawButton(955, 45, 45, 45, "FREE", "White", "", "");
                 }
            }
            if (OutbuttonsOn == true) {
                if ((ChatRoomData.MapData == null) || (ChatRoomData.MapData.Type == null) || (ChatRoomData.MapData.Type == "Never")) {
                    if (SlowleaveOn == true) {
                        DrawButton(0, 90, 45, 45, "OUT", "White", "", "Slow Exit");
                    } else {
                        DrawButton(0, 90, 45, 45, "OUT", "White", "", "Fast Exit");
                    }
                } else {
                    DrawButton(955, 90, 45, 45, "OUT", "White", "", "");
                }
            }
            next(args);
        });
    }

    async function ULTRATitleExit() {
        modApi.hookFunction('TitleExit', 4, (args, next) => {
            let Nick = ElementValue("InputNickname");
            if (kp != 1) {
                if (Nick == null) {
                    Nick = "";
                    if ((tmpname == "") || (tmpname != Nick)) {
                        tmpname = Player.Name;
                        M_MOANER_saveControls();
                    }
                } else {
                    if ((tmpname == "") || (tmpname != Nick)) {
                        tmpname = Nick;
                        M_MOANER_saveControls();
                    }
                }
            }
            const status = CharacterSetNickname(Player, Nick);
            if (status) {
                TitleNicknameStatus = status;
                return;
            }
            TitleSet(TitleSelectedTitle);
            ElementRemove("InputNickname");
            CommonSetScreen("Character", "InformationSheet");
            return;
            next(args);
        });
    }

    //Chat Search (including Auto-Join)
    async function ULTRAChatSearchExit() {
        modApi.hookFunction('ChatSearchExit', 4, (args, next) => {
            if (ChatRoomSpace == "Asylum") {
                ChatSearchLeaveSpace = "Room";
                ChatSearchLeaveRoom = "AsylumEntrance";
            } else {
                ChatSearchLeaveSpace = "Room";
                ChatSearchLeaveRoom = "MainHall";
            }
            next(args);
        });
    }
	
    async function ULTRAChatSearchJoin() {
        modApi.hookFunction('ChatSearchJoin', 4, (args, next) => {
            if (AutojoinOn == true) {
                var X = ChatSearchPageX;
	        var Y = ChatSearchPageY;
                for (let C = ChatSearchResultOffset; C < ChatSearchResult.length && C < (ChatSearchResultOffset + ChatSearchRoomsPerPage); C++) {
                    if (ChatSearchLastQueryJoin != RoomName || (ChatSearchLastQueryJoin == RoomName && ChatSearchLastQueryJoinTime + 1000 < CommonTime())) {
                        if (this.IsOn == undefined || this.IsOn == false) {
                            IsOn = true;
                            var TextArea = document.createElement("TextArea");
                            TextArea.setAttribute("ID", "AutoJoinAlert");
                            document.body.appendChild(TextArea);
                            ElementValue("AutoJoinAlert", "AutoJoining...");
                            ElementPosition("AutoJoinAlert", 1030, 970, 350);
                        }
                        if ((MouseX >= X) && (MouseX <= X + 630) && (MouseY >= Y) && (MouseY <= Y + 85)) {
                            var RoomName = ChatSearchResult[C].Name;
                            AutoJoin = function() {
                                this.AutoJoinOn = true;
                                setTimeout(function() {
                                    AutoJoin()
                                }, 1300);
                                ChatSearchLastQueryJoinTime = CommonTime();
                                ChatSearchLastQueryJoin = RoomName;
                                ChatRoomPlayerCanJoin = true;
                                ServerSend("ChatRoomJoin", {
                                    Name: RoomName
                                });
                                ChatRoomPingLeashedPlayers();
                                if (CurrentScreen == "ChatRoom") {
                                    AutoJoin = function() {};
                                    this.AutoJoinOn = false;
                                    ElementRemove("AutoJoinAlert");
                                    IsOn = false;
                                }
                            }
                            if (this.AutoJoinOn == false || this.AutoJoinOn == undefined) {
                                AutoJoin();
                            }
                        }
                    }
                    X = X + 660;
                    if (X > 1500) {
                        X = 25;
                        Y = Y + 109;
                    }
                }
            }
            if (AutojoinOn == false) {
                var X = ChatSearchPageX;
	        var Y = ChatSearchPageY;
                for (let C = ChatSearchResultOffset; C < ChatSearchResult.length && C < (ChatSearchResultOffset + ChatSearchRoomsPerPage); C++) {
                    if ((MouseX >= X) && (MouseX <= X + 630) && (MouseY >= Y) && (MouseY <= Y + 85)) {
                        var RoomName = ChatSearchResult[C].Name;
                        if (ChatSearchLastQueryJoin != RoomName || (ChatSearchLastQueryJoin == RoomName && ChatSearchLastQueryJoinTime + 1000 < CommonTime())) {
                            ChatSearchLastQueryJoinTime = CommonTime();
                            ChatSearchLastQueryJoin = RoomName;
                            ChatRoomPlayerCanJoin = true;
                            ServerSend("ChatRoomJoin", {
                                Name: RoomName
                            });
                            ChatRoomPingLeashedPlayers();
                        }
                    }
                    X = X + 660;
                    if (X > 1500) {
                        X = 25;
                        Y = Y + 109;
                    }
                }
            }
            next(args);
        });
    }

    async function ULTRAChatSearchRoomSpaceSelectClick() {
        modApi.hookFunction('ChatSearchRoomSpaceSelectClick', 4, (args, next) => {
           if ((MouseX >= 1515) && (MouseX < 1595) && (MouseY >= 885) && (MouseY < 975)) {
                if ((InventoryGet(Player, "Pronouns").Asset.Name == "SheHer") &&
                    (InventoryGet(Player, "Pussy").Asset.Name != "Penis") &&
                    (InventoryGet(Player, "BodyUpper").Asset.Name != "FlatSmall") &&
                    (InventoryGet(Player, "BodyUpper").Asset.Name != "FlatMedium")) {
                    ChatSelectStartSearch(ChatRoomSpaceType.FEMALE_ONLY);
                }
            }
            if ((MouseX >= 1625) && (MouseX < 1715) && (MouseY >= 885) && (MouseY < 975)) ChatSelectStartSearch(ChatRoomSpaceType.ASYLUM);
            if ((MouseX >= 1735) && (MouseX < 1825) && (MouseY >= 885) && (MouseY < 975)) ChatSelectStartSearch(ChatRoomSpaceType.MIXED);
            if ((MouseX >= 1845) && (MouseX < 1935) && (MouseY >= 885) && (MouseY < 975)) {
                if ((InventoryGet(Player, "Pronouns").Asset.Name == "HeHim") &&
                    (InventoryGet(Player, "Pussy").Asset.Name == "Penis") &&
                    ((InventoryGet(Player, "BodyUpper").Asset.Name == "FlatSmall") || (InventoryGet(Player, "BodyUpper").Asset.Name == "FlatMedium"))) {
                    ChatSelectStartSearch(ChatRoomSpaceType.MALE_ONLY);
                }
            } 
	    return;
            next(args);
        });
    }

    async function ULTRAChatSearchRoomSpaceSelectDraw() {
        modApi.hookFunction('ChatSearchRoomSpaceSelectDraw', 4, (args, next) => {
	    DrawText("Lobbies", 1405, 940, "White", "Black");
            if ((InventoryGet(Player, "Pronouns").Asset.Name == "SheHer") &&
                (InventoryGet(Player, "Pussy").Asset.Name != "Penis") &&
                (InventoryGet(Player, "BodyUpper").Asset.Name != "FlatSmall") &&
                (InventoryGet(Player, "BodyUpper").Asset.Name != "FlatMedium")) {
                DrawButton(1515, 885, 90, 90, "", "White", "Screens/Online/ChatSelect/Female.png", "Only Female");
            } else {
                DrawButton(1515, 885, 90, 90, "", "Gray", "Screens/Online/ChatSelect/Female.png", "Only Female");
            }
            DrawButton(1625, 885, 90, 90, "", "White", "Icons/Asylum.png", "Asylum");
            DrawButton(1735, 885, 90, 90, "MIXED", "White", "", "Mixed");
            if ((InventoryGet(Player, "Pronouns").Asset.Name == "HeHim") &&
                (InventoryGet(Player, "Pussy").Asset.Name == "Penis") &&
                ((InventoryGet(Player, "BodyUpper").Asset.Name == "FlatSmall") || (InventoryGet(Player, "BodyUpper").Asset.Name == "FlatMedium"))) {
                DrawButton(1845, 885, 90, 90, "", "White", "Screens/Online/ChatSelect/Male.png", "Only Male");
            } else {
                DrawButton(1845, 885, 90, 90, "", "Gray", "Screens/Online/ChatSelect/Male.png", "Only Male");
            }
            return;
            next(args);
        });
    }
    
    //Club Card Game
    async function ULTRAClubCardEndTurn(Draw = false) {
        modApi.hookFunction('ClubCardEndTurn', 4, (args, next) => {
            if (HighfameOn == true) {
                ClubCardFameGoal = cfame;
                var win = 0;
                let nmg = "";
                if (MouseIn(1705, 905, 90, 90) && (ClubCardPlayer[ClubCardTurnIndex].Control == "Player")) Draw = true;
                let CCPlayer = ClubCardPlayer[ClubCardTurnIndex];
                let Opponent = ClubCardGetOpponent(CCPlayer);
                let StartingFame = CCPlayer.Fame;
                let StartingMoney = CCPlayer.Money;
                let FameMoneyText = "";
                if (CCPlayer.Board != null)
                    for (let Card of CCPlayer.Board) {
                        if (Card.FamePerTurn != null) ClubCardPlayerAddFame(CCPlayer, Card.FamePerTurn);
                        if (Card.MoneyPerTurn != null) ClubCardPlayerAddMoney(CCPlayer, Card.MoneyPerTurn);
                        if (Card.OnTurnEnd != null) Card.OnTurnEnd(CCPlayer);
                    }
                if ((CCPlayer.Money < 0) && (CCPlayer.Fame > StartingFame)) CCPlayer.Fame = StartingFame;
                CCPlayer.LastFamePerTurn = CCPlayer.Fame - StartingFame;
                CCPlayer.LastMoneyPerTurn = CCPlayer.Money - StartingMoney;
                if (CCPlayer.Event != null)
                    for (let Card of CCPlayer.Event)
                        if (Card.OnTurnEnd != null)
                            Card.OnTurnEnd(CCPlayer);
                if (Opponent.Event != null)
                    for (let Card of Opponent.Event)
                        if (Card.OnOpponentTurnEnd != null)
                            Card.OnOpponentTurnEnd(CCPlayer);
                FameMoneyText = ((CCPlayer.LastFamePerTurn >= 0) ? "+" : "") + CCPlayer.LastFamePerTurn.toString() + " Fame, " + ((CCPlayer.LastMoneyPerTurn >= 0) ? "+" : "") + CCPlayer.LastMoneyPerTurn.toString() + " Money";             
                if (CCPlayer.Fame >= ClubCardFameGoal) {
                    MiniGameVictory = (CCPlayer.Control == "Player");
                    MiniGameEnded = true;
                    let nmg = TextGet("VictoryFor" + CCPlayer.Control);
                    if (ClubCardIsOnline()) nmg = TextGet("VictoryOnline").replace("PLAYERNAME", CharacterNickname(CCPlayer.Character));
                    Msg = nmg.replace("100", cfame);
                    ClubCardLogAdd(Msg);
                    ClubCardCreatePopup("TEXT", Msg, TextGet("Return"), null, "ClubCardEndGame()", null);
                    if (MiniGameVictory && (ClubCardReward != null)) ClubCardGetReward();
                    GameClubCardSyncOnlineData();
                    GameClubCardReset();
                    return;
                }
                ClubCardTurnEndDraw = Draw;
                if (Draw) {
                    ClubCardLogAdd(TextGet("EndDrawPlayer").replace("FAMEMONEY", FameMoneyText).replace("SOURCEPLAYER", CharacterNickname(CCPlayer.Character)).replace("OPPONENTPLAYER", CharacterNickname(Opponent.Character)));
                    ClubCardPlayerDrawCard(ClubCardPlayer[ClubCardTurnIndex]);
                } else {
                    ClubCardLogAdd(TextGet("EndTurnPlayer").replace("FAMEMONEY", FameMoneyText).replace("SOURCEPLAYER", CharacterNickname(CCPlayer.Character)).replace("OPPONENTPLAYER", CharacterNickname(Opponent.Character)));
                }
                Draw = false;
                ClubCardTurnIndex++;
                if (ClubCardTurnIndex >= ClubCardPlayer.length) ClubCardTurnIndex = 0;
                ClubCardTurnCardPlayed = 0;
                ClubCardAIStart();
                CCPlayer = ClubCardPlayer[ClubCardTurnIndex];
                if (CCPlayer.Event != null)
                    for (let Pos = 0; Pos < CCPlayer.Event.length; Pos++) {
                        let Card = CCPlayer.Event[Pos];
                        if ((Card.Time != null) && (Card.Time > 0)) Card.Time--;
                        if ((Card.Time == null) || (Card.Time <= 0)) {
                            ClubCardLogPublish("EventExpired", CCPlayer, null, Card);
                            CCPlayer.Event.splice(Pos, 1);
                            Pos--;
                        }
                    }
                GameClubCardSyncOnlineData();
                return;
            }
            next(args);
        });
    }

    async function ULTRAClubCardLoadDeckNumber() {
        modApi.hookFunction('ClubCardLoadDeckNumber', 4, (args, next) => {
            let originaldesk = ClubCardBuilderDefaultDeck;
            var ClubCardBuilderExtraDeck = [1000, 1001, 1002, 1003, 1004, 1006, 1007, 1009, 1015, 1017, 2000, 3008, 5005, 6005, 7007, 8005, 11000, 11001, 11002, 11003, 11008, 11009, 11010, 12000, 12001, 12002, 30012, 30013, 30021, 30022];
            if (cdesk == 1) {
                ClubCardBuilderDefaultDeck = ClubCardBuilderABDLDeck;
            } else if (cdesk == 2) {
                ClubCardBuilderDefaultDeck = ClubCardBuilderAsylumDeck;
            } else if (cdesk == 3) {
                ClubCardBuilderDefaultDeck = ClubCardBuilderCollegeDeck;
            } else if (cdesk == 4) {
                ClubCardBuilderDefaultDeck = ClubCardBuilderDominantDeck;
            } else if (cdesk == 5) {
                ClubCardBuilderDefaultDeck = ClubCardBuilderLiabilityDeck;
            } else if (cdesk == 6) {
                ClubCardBuilderDefaultDeck = ClubCardBuilderMaidDeck;
            } else if (cdesk == 7) {
                ClubCardBuilderDefaultDeck = ClubCardBuilderPornDeck;
            } else if (cdesk == 8) {
                ClubCardBuilderDefaultDeck = ClubCardBuilderExtraDeck;
            } else if (cdesk == 0) {
                ClubCardBuilderDefaultDeck = originaldesk;
            }
            next(args);
        });
    }

    //Crafting
    async function ULTRACraftingItemListBuild() {
        modApi.hookFunction('CraftingItemListBuild', 4, (args, next) => {
            let Search = ElementValue("InputSearch");
            if (Search == null) Search = "";
            Search = Search.toUpperCase().trim();
            CraftingItemList = [];
            for (let A of Asset) {
                if (!InventoryAvailable(Player, A.Name, A.Group.Name) && A.AvailableLocations.length === 0) continue;
                if (!A.Group.Name.startsWith("Item")) continue;
                let Match = true;
                const desc = A.DynamicDescription(Player).toUpperCase().trim();
                if (desc.indexOf(Search) < 0) Match = false;
                if (Match)
                    for (let E of CraftingItemList)
                        if (E.CraftGroup === A.Name || E.Name === A.CraftGroup)
                            Match = false;
                if (Match) CraftingItemList.push(A);
            }
            CraftingItemList.sort((a, b) => (a.Description > b.Description) ? 1 : (b.Description > a.Description) ? -1 : 0);
            if (CraftingOffset >= CraftingItemList.length) CraftingOffset = 0;
            return;
            next(args);
        });
    }

    //Friendlist
    async function ULTRAFriendListRun() {
        modApi.hookFunction('FriendListRun', 4, (args, next) => {
            const mode = FriendListMode[FriendListModeIndex];
            DrawText(TextGet("MemberNumber"), 665, 35, "White", "Gray");
            if ((InventoryGet(Player, "Pronouns").Asset.Name == "SheHer") &&
                (InventoryGet(Player, "Pussy").Asset.Name != "Penis") &&
                (InventoryGet(Player, "BodyUpper").Asset.Name != "FlatSmall") &&
                (InventoryGet(Player, "BodyUpper").Asset.Name != "FlatMedium")) {
                DrawButton(850, 5, 90, 90, "", "White", "Screens/Online/ChatSelect/Female.png", "Only Female");
            } else {
                DrawButton(850, 5, 90, 90, "", "Gray", "Screens/Online/ChatSelect/Female.png", "Only Female");
            }
            DrawButton(960, 5, 90, 90, "", "White", "Icons/Asylum.png", "Asylum");
            DrawButton(1070, 5, 90, 90, "MIXED", "White", "", "Mixed");
            if ((InventoryGet(Player, "Pronouns").Asset.Name == "HeHim") &&
                (InventoryGet(Player, "Pussy").Asset.Name == "Penis") &&
                ((InventoryGet(Player, "BodyUpper").Asset.Name == "FlatSmall") || (InventoryGet(Player, "BodyUpper").Asset.Name == "FlatMedium"))) {
                DrawButton(1180, 5, 90, 90, "", "White", "Screens/Online/ChatSelect/Male.png", "Only Male");
            } else {
                DrawButton(1180, 5, 90, 90, "", "Gray", "Screens/Online/ChatSelect/Male.png", "Only Male");
            }
            if (mode === "Friends") {
                DrawText(TextGet("ListOnlineFriends"), 230, 35, "White", "Gray");
                DrawText(TextGet("ActionFriends"), 1535, 35, "White", "Gray");
            } else if (mode === "Beeps") {
                DrawText(TextGet("ListBeeps"), 230, 35, "White", "Gray");
            } else if (mode === "Delete") {
                DrawText(TextGet("ListFriends"), 230, 35, "White", "Gray");
                DrawText(TextGet("ActionDelete"), 1535, 35, "White", "Gray");
            }
            ElementPositionFix("FriendList", 36, 5, 75, 1985, 890);
            if (FriendListBeepTarget !== null) {
                ElementPositionFix("FriendListBeep", 36, 5, 75, 1985, 890);
            }
            DrawButton(1725, 5, 60, 60, "", "White", "Icons/Small/Reset.png", TextGet("Refresh"));
	    DrawButton(1795, 5, 60, 60, "", "White", "Icons/Small/Prev.png");
            DrawButton(1865, 5, 60, 60, "", "White", "Icons/Small/Next.png");
            DrawButton(1935, 5, 60, 60, "", "White", "Icons/Small/Exit.png");
            return;
            next(args);
        });
    }

    async function ULTRAFriendListClick() {
        modApi.hookFunction('FriendListClick', 4, (args, next) => {
            if ((MouseX >= 850) && (MouseX < 940) && (MouseY >= 5) && (MouseY < 95)) {
                if ((InventoryGet(Player, "Pronouns").Asset.Name == "SheHer") &&
                    (InventoryGet(Player, "Pussy").Asset.Name != "Penis") &&
                    (InventoryGet(Player, "BodyUpper").Asset.Name != "FlatSmall") &&
                    (InventoryGet(Player, "BodyUpper").Asset.Name != "FlatMedium")) {
                    ChatRoomSpace = "";
                    ElementContent("FriendList", "");
                    ServerSend("AccountQuery", {
                        Query: "OnlineFriends"
                    });
                }
            }
            if ((MouseX >= 960) && (MouseX < 1050) && (MouseY >= 5) && (MouseY < 95)) {
                ChatRoomSpace = "Asylum";
                ElementContent("FriendList", "");
                ServerSend("AccountQuery", {
                    Query: "OnlineFriends"
                });
            }
            if ((MouseX >= 1070) && (MouseX < 1160) && (MouseY >= 5) && (MouseY < 95)) {
                ChatRoomSpace = "X";
                ElementContent("FriendList", "");
                ServerSend("AccountQuery", {
                    Query: "OnlineFriends"
                });
            }
            if ((MouseX >= 1180) && (MouseX < 1270) && (MouseY >= 5) && (MouseY < 95)) {
                if ((InventoryGet(Player, "Pronouns").Asset.Name == "HeHim") &&
                    (InventoryGet(Player, "Pussy").Asset.Name == "Penis") &&
                    ((InventoryGet(Player, "BodyUpper").Asset.Name == "FlatSmall") || (InventoryGet(Player, "BodyUpper").Asset.Name == "FlatMedium"))) {
                    ChatRoomSpace = "M";
                    ElementContent("FriendList", "");
                    ServerSend("AccountQuery", {
                        Query: "OnlineFriends"
                    });
                }
            }
            next(args);
        });
    }

    //Lockpicking
    async function ULTRAStruggleMinigameWasInterrupted() {
        modApi.hookFunction('StruggleMinigameWasInterrupted', 4, (args, next) => {
            if (FullseedOn == true) {
                if (StruggleProgressCurrentMinigame === "LockPick") {
                    var seed = parseInt(StruggleLockPickOrder.join(""));
                    var tips = StruggleLockPickOrder.map((a) => {
                        return true;
                    });
                    for (let q = 0; q < tips.length; q++) {
                        var xx = 1475 + (0.5 - tips.length / 2 + q) * 100;
                        DrawText(`${StruggleLockPickOrder.indexOf(q) + 1}`, xx, 300, "blue");
                    }
                    return false;
                }
            }
            next(args);
        });
    }

    //Login
    async function ULTRALoginRun() {
        modApi.hookFunction('LoginRun', 4, (args, next) => {
            DrawButton(750, 120, 500, 60, "ULTRAbc " + UBCver + " Ready!", "Pink", "", "");
            next(args);
        });
    }

    //Magic School
    async function ULTRAMagicPuzzleRun() {
        modApi.hookFunction('MagicPuzzleRun', 4, (args, next) => {
            if (MagiccheatOn == true) {
                if (MiniGameEnded) {
                    MiniGameVictory = true;
                }
            }
            next(args);
        });
    }

    async function ULTRAMagicSchoolEscapeSpellEnd() {
        modApi.hookFunction('MagicSchoolEscapeSpellEnd', 4, (args, next) => {
            if (MagiccheatOn == true) {
                MagicSchoolEscapeTimer > CommonTime();
                MiniGameVictory = true;
            }
            next(args);
        });
    }

    //Main Hall
    async function ULTRAMainHallRun() {
        modApi.hookFunction('MainHallRun', 4, (args, next) => {
            MainCanvas.textAlign = "center";
            DrawText("Chat Rooms", 130, 530, "White", "Black");
            if ((InventoryGet(Player, "Pronouns").Asset.Name == "SheHer") &&
                (InventoryGet(Player, "Pussy").Asset.Name != "Penis") &&
                (InventoryGet(Player, "BodyUpper").Asset.Name != "FlatSmall") &&
                (InventoryGet(Player, "BodyUpper").Asset.Name != "FlatMedium")) {
                DrawButton(240, 475, 90, 90, "", "White", "Screens/Online/ChatSelect/Female.png", "Only Female");
            } else {
                DrawButton(240, 475, 90, 90, "", "Gray", "Screens/Online/ChatSelect/Female.png", "Only Female");
            }
            DrawButton(350, 475, 90, 90, "", "White", "Icons/Asylum.png", "Asylum");
            DrawButton(460, 475, 90, 90, "MIXED", "White", "", "Mixed");
            if ((InventoryGet(Player, "Pronouns").Asset.Name == "HeHim") &&
                (InventoryGet(Player, "Pussy").Asset.Name == "Penis") &&
                ((InventoryGet(Player, "BodyUpper").Asset.Name == "FlatSmall") || (InventoryGet(Player, "BodyUpper").Asset.Name == "FlatMedium"))) {
                DrawButton(570, 475, 90, 90, "", "White", "Screens/Online/ChatSelect/Male.png", "Only Male");
            } else {
                DrawButton(570, 475, 90, 90, "", "Gray", "Screens/Online/ChatSelect/Male.png", "Only Male");
            }
	    DrawText("ULTRAbc", 130, 615, "White", "Black");
            DrawText(UBCver, 140, 655, "White", "Black");
            DrawButton(240, 585, 420, 90, "", "White", "", "Open UBC Changelog on GitHub");
            DrawImageResize("Icons/Changelog.png", 250, 600, 60, 60);
            DrawTextFit("Open UBC Changelog", 480, 633, 308, "Black");   
            DrawText("/uhelp", 145, 725, "White", "Black");
            DrawText("in chat", 140, 765, "White", "Black");
            DrawButton(240, 695, 420, 90, "", "White", "", "Open UBC Wiki on GitHub");
            DrawImageResize("Icons/Introduction.png", 250, 710, 60, 60);
            DrawTextFit("Open UBC Wiki", 480, 743, 308, "Black");
            next(args);
        });
    }

    async function ULTRAMainHallClick() {
        modApi.hookFunction('MainHallClick', 4, (args, next) => {
            if (MouseIn(1645, 145, 90, 90)) MainHallMoveToChatSelect();
            if ((MouseX >= 240) && (MouseX < 330) && (MouseY >= 475) && (MouseY < 565)) {
                if ((InventoryGet(Player, "Pronouns").Asset.Name == "SheHer") &&
                    (InventoryGet(Player, "Pussy").Asset.Name != "Penis") &&
                    (InventoryGet(Player, "BodyUpper").Asset.Name != "FlatSmall") &&
                    (InventoryGet(Player, "BodyUpper").Asset.Name != "FlatMedium")) {
                    ChatSelectStartSearch(ChatRoomSpaceType.FEMALE_ONLY);
                }
            }
            if ((MouseX >= 350) && (MouseX < 440) && (MouseY >= 475) && (MouseY < 565)) ChatSelectStartSearch(ChatRoomSpaceType.ASYLUM);
            if ((MouseX >= 460) && (MouseX < 550) && (MouseY >= 475) && (MouseY < 565)) ChatSelectStartSearch(ChatRoomSpaceType.MIXED);
            if ((MouseX >= 570) && (MouseX < 660) && (MouseY >= 475) && (MouseY < 565)) {
                if ((InventoryGet(Player, "Pronouns").Asset.Name == "HeHim") &&
                    (InventoryGet(Player, "Pussy").Asset.Name == "Penis") &&
                    ((InventoryGet(Player, "BodyUpper").Asset.Name == "FlatSmall") || (InventoryGet(Player, "BodyUpper").Asset.Name == "FlatMedium"))) {
                    ChatSelectStartSearch(ChatRoomSpaceType.MALE_ONLY);
                }
            }
	    if (MouseIn(240, 585, 420, 90))
                window.open('https://github.com/tetris245/ULTRAbc/releases', '_blank');
            if (MouseIn(240, 695, 420, 90))
                window.open('https://github.com/tetris245/ULTRAbc/wiki', '_blank');
            next(args);
        });
    }

    //Orgasm
    async function ULTRAActivityChatRoomArousalSync() {
        modApi.hookFunction('ActivityChatRoomArousalSync', 4, (args, next) => {
            if ((Player.ArousalSettings.OrgasmStage == 0) && (M_MOANER_cum == true)) {
                M_MOANER_cum = false;
                M_MOANER_saveControls();
            }
            next(args);
        });
    }

    //Pandora Infiltration
    async function ULTRAInfiltrationPrepareMission() {
        modApi.hookFunction('InfiltrationPrepareMission', 4, (args, next) => {   
            if (InfiltrationMission == "") {
                var InfiltrationMissionType = ["Rescue", "Kidnap", "Retrieve", "CatBurglar", "ReverseMaid"];
                InfiltrationMission = CommonRandomItemFromList(InfiltrationMission, InfiltrationMissionType);
            }
	    if ((InfiltrationMission == "Rescue") || (InfiltrationMission == "Kidnap")) {
		let C = /** @type {NPCCharacter} */ ({});
		CharacterRandomName(C);
		InfiltrationTarget = {
		    Type: "NPC",
		    Name: C.Name,
		    PrivateRoom: false
		};
	    } else {
		const PreviousTarget = InfiltrationTarget && InfiltrationTarget.Type || "";
		const Type = /** @type {InfiltrationTargetType} */(CommonRandomItemFromList(PreviousTarget, InfiltrationObjectType));
		InfiltrationTarget = {
		    Type: Type,
		    Name: DialogFind(InfiltrationSupervisor, "Object" + Type),
		};
	     }
	     InfiltrationSupervisor.Stage = InfiltrationMission;
	     InfiltrationSupervisor.CurrentDialog = DialogFind(InfiltrationSupervisor, InfiltrationMission + "Intro");
	     InfiltrationSupervisor.CurrentDialog = InfiltrationSupervisor.CurrentDialog.replace("TargetName", InfiltrationTarget.Name);
             return;
             next(args);
        });
    }

    //Pandora Prison
    async function ULTRAPandoraPrisonClick() {
        modApi.hookFunction('PandoraPrisonClick', 4, (args, next) => {            
            if (SosbuttonsOn == true) {
                if ((MouseX >= 0) && (MouseX < 45) && (MouseY >= 45) && (MouseY < 90)) {
                    CharacterReleaseTotal(Player);
                }
	    }
            if (OutbuttonsOn == true) {
                if ((MouseX >= 0) && (MouseX < 45) && (MouseY >= 90) && (MouseY < 135)) {
                    PandoraPunishmentSentence(0);
                    CharacterRefresh(Player);
                    if (SlowleaveOn == true) {
                        setTimeout(function() {
                            PandoraPrisonExitPrison();
                        }, 15000);
                    } else {
                        PandoraPrisonExitPrison();
                    }
                }
            }
            next(args);
        });
    }

    async function ULTRAPandoraPrisonRun() {
        modApi.hookFunction('PandoraPrisonRun', 4, (args, next) => {
            if ((Player.Infiltration.Punishment.Timer < CurrentTime) && (CurrentCharacter == null) && !PandoraPrisonEscaped)
                PandoraPrisonCharacter = PandoraPrisonMaid;
            if (PandoraWillpowerTimer < CommonTime()) {
                if (PandoraWillpower < PandoraMaxWillpower) PandoraWillpower++;
                PandoraWillpowerTimer = PandoraWillpowerTimer + ((InfiltrationPerksActive("Recovery")) ? 20000 : 30000);
            }
            if ((Player.Infiltration.Punishment.Timer >= CurrentTime) && (PandoraPrisonCharacterTimer < CommonTime()) && (CurrentCharacter == null) && !PandoraPrisonEscaped) {
                PandoraPrisonBribeEnabled = true;
                PandoraPrisonCharacter = (PandoraPrisonCharacter == null) ? PandoraPrisonGuard : null;
                PandoraPrisonCharacterTimer = CommonTime() + 30000 + Math.floor(Math.random() * 30000);
            }
            if (PandoraPrisonCharacter != null) {
                DrawCharacter(Player, 500, 0, 1);
                DrawCharacter(PandoraPrisonCharacter, 1000, 0, 1);
            } else DrawCharacter(Player, 750, 0, 1);
            if (Player.CanKneel()) DrawButton(1885, 25, 90, 90, "", "White", "Icons/Kneel.png", TextGet("Kneel"));
            DrawButton(1885, 145, 90, 90, "", "White", "Icons/Character.png", TextGet("Profile"));
            if (Player.Infiltration.Punishment.Timer > CurrentTime) {
                DrawText(TextGet("Sentence") + " " + Player.Infiltration.Punishment.Minutes.toString() + " " + TextGet("Minutes"), 1800, 870, "White", "Black");
                DrawText(TextGet("EndsIn") + " " + TimerToString(Player.Infiltration.Punishment.Timer - CurrentTime), 1800, 920, "White", "Black");
            }
            DrawProgressBar(1610, 954, 380, 36, Math.round(PandoraWillpower / PandoraMaxWillpower * 100));
            DrawText(PandoraWillpower.toString(), 1800, 973, "black", "white");
            if (SosbuttonsOn == true) {
                DrawButton(0, 45, 45, 45, "FREE", "White", "", "Total Release");
	    }
            if (OutbuttonsOn == true) {
                if (SlowleaveOn == true) {
                    DrawButton(0, 90, 45, 45, "OUT", "White", "", "Slow Exit");
                } else {
                    DrawButton(0, 90, 45, 45, "OUT", "White", "", "Fast Exit");
                }
            }
            return;
            next(args);
        });
    }

    //Photographic Room
    async function ULTRAPhotographicClick() {
        modApi.hookFunction('PhotographicClick', 4, (args, next) => {            
            if (SosbuttonsOn == true) {
                if ((MouseX >= 0) && (MouseX < 45) && (MouseY >= 45) && (MouseY < 90)) {
                    CharacterReleaseTotal(Player);
                }
	    }
            if (OutbuttonsOn == true) {
                if ((MouseX >= 0) && (MouseX < 45) && (MouseY >= 90) && (MouseY < 135)) {
                    CharacterRefresh(Player);
                    if (SlowleaveOn == true) {
                        setTimeout(function() {
                            CommonSetScreen("Room", "MainHall");
                        }, 15000);
                    } else {
                        CommonSetScreen("Room", "MainHall");
                    }
                }
            }
            next(args);
        });
    }
   
    async function ULTRAPhotographicRun() {
        modApi.hookFunction('PhotographicRun', 4, (args, next) => {
            if (SosbuttonsOn == true) {
                DrawButton(0, 45, 45, 45, "FREE", "White", "", "Total Release");
	    }
            if (OutbuttonsOn == true) {
                if (SlowleaveOn == true) {
                    DrawButton(0, 90, 45, 45, "OUT", "White", "", "Slow Exit");
                } else {
                    DrawButton(0, 90, 45, 45, "OUT", "White", "", "Fast Exit");
                }
            }
            next(args);
        });
    }

    //Timer Cell
    async function ULTRACellClick() {
        modApi.hookFunction('CellClick', 4, (args, next) => {
            if (CellOpenTimer < CurrentTime) {
                if (MouseIn(1885, 385, 90, 90) && (CellMinutes > 59)) CellMinutes = CellMinutes + 5;
            }
            if (SosbuttonsOn == true) {
                if ((MouseX >= 0) && (MouseX < 45) && (MouseY >= 45) && (MouseY < 90)) {
                    CharacterReleaseTotal(Player);
                }
	    }
            if (OutbuttonsOn == true) {
                if ((MouseX >= 0) && (MouseX < 45) && (MouseY >= 90) && (MouseY < 135)) {
                    CellLock(0);
                    if (SlowleaveOn == true) {
                        setTimeout(function() {
                            CommonSetScreen("Room", "MainHall");
                        }, 15000);
                    } else {
                        CommonSetScreen("Room", "MainHall");
                    }
                }
            }
            next(args);
        });
    }

    async function ULTRACellLoad() {
        modApi.hookFunction('CellLoad', 4, (args, next) => {
            CellKeyDepositStaff = CharacterLoadNPC("NPC_Cell_KeyDepositStaff");
            CellKeyDepositStaff.AllowItem = false;
            PoseSetActive(Player, null);
            CellOpenTimer = LogValue("Locked", "Cell");
            if (CellOpenTimer == null) CellOpenTimer = 0;
            return;
            next(args);
        });
    }

    async function ULTRACellRun() {
        modApi.hookFunction('CellRun', 4, (args, next) => {
            if (SosbuttonsOn == true) {
                DrawButton(0, 45, 45, 45, "FREE", "White", "", "Total Release");
	    }
            if (OutbuttonsOn == true) {
                if (SlowleaveOn == true) {
                    DrawButton(0, 90, 45, 45, "OUT", "White", "", "Slow Exit");
                } else {
                    DrawButton(0, 90, 45, 45, "OUT", "White", "", "Fast Exit");
                }
            }
            next(args);
        });
    }

    //Vision
    async function ULTRAChatRoomCharacterViewDrawBackground() {
        modApi.hookFunction('ChatRoomCharacterViewDrawBackground', 4, (args, next) => {
            if (blureffect == true) {
                if (Blur1On == true) {
                    BlurLevel = 3;
                }
                if (Blur2On == true) {
                    BlurLevel = 8;
                }
                if (Blur3On == true) {
                    BlurLevel = 20;
                }
                if (Blur4On == true) {
                    BlurLevel = 50;
                }
                MainCanvas.filter = `blur(${BlurLevel}px)`;
            }
            next(args);
        });
    }

    async function ULTRADrawCharacter() {
        modApi.hookFunction('DrawCharacter', 4, (args, next) => {
            if (blureffect == true) {
                if (Blur1On == true) {
                    BlurLevel = 3;
                }
                if (Blur2On == true) {
                    BlurLevel = 8;
                }
                if (Blur3On == true) {
                    BlurLevel = 20;
                }
                if (Blur4On == true) {
                    BlurLevel = 50;
                }
                MainCanvas.filter = `blur(${BlurLevel}px)`;
            }
            next(args);
        });
    }

    //Wardrobe
    async function ULTRAAppearanceRun() {
        modApi.hookFunction('AppearanceRun', 4, (args, next) => {
            if (CharacterAppearanceMode == "Wardrobe") {
                DrawButton(1510, 240, 100, 60, "Export", "#50E992", "", "Full ULTRAbc Export");
                DrawButton(1630, 240, 100, 60, "Import1", "#50E992", "", "Clothing + Restraints");
                DrawButton(1750, 240, 100, 60, "Import2", "#50E992", "", "Clothing + Restraints + Cosplay");
                DrawButton(1870, 240, 100, 60, "Import3", "#50E992", "", "Full ULTRAbc Import");
            }
            next(args);
        });
    }

    async function ULTRAAppearanceClick() {
        modApi.hookFunction('AppearanceClick', 4, (args, next) => {
            var C = CharacterAppearanceSelection;
            if (CharacterAppearanceMode == "Wardrobe") {
                if ((MouseX >= 1510) && (MouseX < 1610) && (MouseY >= 240) && (MouseY < 290)) {
                    if (C.OnlineSharedSettings.UBC != undefined) {
                        if (ServerPlayerIsInChatRoom()) {
                            if ((C.Nickname == '') || (C.Nickname == undefined)) {
                                tgpname = C.Name;
                            } else {
                                tgpname = C.Nickname;
                            }
		            if ((tmpname != tgpname) && (C.OnlineSharedSettings.Uwall == true)) {
                                ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: UBC Export is not possible because " + tgpname + " has enabled the Uwall protection.</p>"
                                );
                            } else {
                                var appall = new Array();
                                C.Appearance.forEach(item => {
                                    var app = new Array();
                                    app.push(item.Asset.Name);
                                    app.push(item.Asset.Group.Name);
                                    app.push(item.Color);
                                    app.push(item.Difficulty);
                                    app.push(item.Craft);
                                    app.push(false);
                                    //Do not remove this line. It is for the compatibility with bcg.
                                    appall.push(app);
                                });
                                ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: Appearance saved.</p>\n" +
                                btoa(encodeURI(JSON.stringify(appall)))
                                );
                            }
                        }
                    }
                    DialogLeave();
                }
                if ((MouseX >= 1630) && (MouseX < 1730) && (MouseY >= 240) && (MouseY < 290)) {
                    appinp = prompt('Please input the awcode (Compatible with BCG).', '');
                    if (C.OnlineSharedSettings.UBC != undefined) {
                        if ((C.Nickname == '') || (C.Nickname == undefined)) {
                            tgpname = C.Name;
                        } else {
                            tgpname = C.Nickname;
                        }
		        if ((tmpname != tgpname) && (C.OnlineSharedSettings.Uwall == true)) {
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: UBC Import is not possible because " + tgpname + " has enabled the Uwall protection.</p>"
                            );
                        } else {
                            for (let A = C.Appearance.length - 1; A >= 0; A--)
                                if ((C.Appearance[A].Asset.Group.Category == "Appearance") && C.Appearance[A].Asset.Group.AllowNone) {
                                    if ((C.Appearance[A].Asset.Group.Name != "Blush") &&
                                    (C.Appearance[A].Asset.Group.Name != "BodyLower") &&
                                    (C.Appearance[A].Asset.Group.Name != "BodyUpper") &&
                                    (C.Appearance[A].Asset.Group.Name != "Emoticon") &&
                                    (C.Appearance[A].Asset.Group.Name != "Eyebrows") &&
                                    (C.Appearance[A].Asset.Group.Name != "Eyes") &&
                                    (C.Appearance[A].Asset.Group.Name != "Eyes2") &&
                                    (C.Appearance[A].Asset.Group.Name != "FacialHair") &&
                                    (C.Appearance[A].Asset.Group.Name != "Fluids") &&
                                    (C.Appearance[A].Asset.Group.Name != "HairBack") &&
                                    (C.Appearance[A].Asset.Group.Name != "HairFront") &&
                                    (C.Appearance[A].Asset.Group.Name != "Hands") &&
                                    (C.Appearance[A].Asset.Group.Name != "Head") &&
                                    (C.Appearance[A].Asset.Group.Name != "Height") &&
                                    (C.Appearance[A].Asset.Group.Name != "Mouth") &&
                                    (C.Appearance[A].Asset.Group.Name != "Nipples") &&
                                    (C.Appearance[A].Asset.Group.Name != "Pronouns") &&
                                    (C.Appearance[A].Asset.Group.Name != "Pussy") &&
                                    (C.Appearance[A].Asset.Group.Name != "HairAccessory1") &&
                                    (C.Appearance[A].Asset.Group.Name != "HairAccessory2") &&
                                    (C.Appearance[A].Asset.Group.Name != "TailStraps") &&
                                    (C.Appearance[A].Asset.Group.Name != "Wings")) {
                                        InventoryRemove(C, C.Appearance[A].Asset.Group.Name);
                                    }
                                }
                            CharacterReleaseNoLock(C);
                            var appobj = JSON.parse(decodeURI(atob(appinp)));
                            appobj.forEach(itemstr => {
                                if ((InventoryGet(C, itemstr[1]) != null) && (InventoryGet(C, itemstr[1]).Asset.AllowLock == true)) {
                                    if (((InventoryGet(C, itemstr[1]).Property != null) && (InventoryGet(C, itemstr[1]).Property.LockedBy == null)) || (InventoryGet(C, itemstr[1]).Property == null)) {
                                        InventoryRemove(C, itemstr[1]);
                                        InventoryWear(C, itemstr[0], itemstr[1], itemstr[2], itemstr[3], -1, itemstr[4]);
                                    }
                                } else if ((itemstr[1] != "Blush") &&
                                    (itemstr[1] != "BodyLower") &&
                                    (itemstr[1] != "BodyUpper") &&
                                    (itemstr[1] != "Emoticon") &&
                                    (itemstr[1] != "Eyebrows") &&
                                    (itemstr[1] != "Eyes") &&
                                    (itemstr[1] != "Eyes2") &&
                                    (itemstr[1] != "FacialHair") &&
                                    (itemstr[1] != "Fluids") &&
                                    (itemstr[1] != "HairBack") &&
                                    (itemstr[1] != "HairFront") &&
                                    (itemstr[1] != "Hands") &&
                                    (itemstr[1] != "Head") &&
                                    (itemstr[1] != "Height") &&
                                    (itemstr[1] != "Mouth") &&
                                    (itemstr[1] != "Nipples") &&
                                    (itemstr[1] != "Pronouns") &&
                                    (itemstr[1] != "Pussy") &&
                                    (itemstr[1] != "HairAccessory1") &&
                                    (itemstr[1] != "HairAccessory2") &&
                                    (itemstr[1] != "TailStraps") &&
                                    (itemstr[1] != "Wings")) {
                                    InventoryRemove(C, itemstr[1]);
                                    InventoryWear(C, itemstr[0], itemstr[1], itemstr[2], itemstr[3], -1, itemstr[4]);
                                }
                            });
                            CharacterRefresh(C, false);
                        }
                    }
                    DialogLeave();
                }
                if ((MouseX >= 1750) && (MouseX < 1850) && (MouseY >= 240) && (MouseY < 290)) {
                    appinp = prompt('Please input the awcode (Compatible with BCG).', '');
                    if (C.OnlineSharedSettings.UBC != undefined) {
                        if ((C.Nickname == '') || (C.Nickname == undefined)) {
                            tgpname = C.Name;
                        } else {
                            tgpname = C.Nickname;
                        }
		        if ((tmpname != tgpname) && (C.OnlineSharedSettings.Uwall == true)) {
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: UBC Import is not possible because " + tgpname + " has enabled the Uwall protection.</p>"
                            );
                        } else {
                            CharacterNaked(C);
                            CharacterReleaseNoLock(C);
                            var appobj = JSON.parse(decodeURI(atob(appinp)));
                            appobj.forEach(itemstr => {
                                if ((InventoryGet(C, itemstr[1]) != null) && (InventoryGet(C, itemstr[1]).Asset.AllowLock == true)) {
                                    if (((InventoryGet(C, itemstr[1]).Property != null) && (InventoryGet(C, itemstr[1]).Property.LockedBy == null)) || (InventoryGet(C, itemstr[1]).Property == null)) {
                                        InventoryRemove(C, itemstr[1]);
                                        InventoryWear(C, itemstr[0], itemstr[1], itemstr[2], itemstr[3], -1, itemstr[4]);
                                    }
                                } else if ((itemstr[1] != "Blush") &&
                                    (itemstr[1] != "BodyLower") &&
                                    (itemstr[1] != "BodyUpper") &&
                                    (itemstr[1] != "Emoticon") &&
                                    (itemstr[1] != "Eyebrows") &&
                                    (itemstr[1] != "Eyes") &&
                                    (itemstr[1] != "Eyes2") &&
                                    (itemstr[1] != "FacialHair") &&
                                    (itemstr[1] != "Fluids") &&
                                    (itemstr[1] != "HairBack") &&
                                    (itemstr[1] != "HairFront") &&
                                    (itemstr[1] != "Hands") &&
                                    (itemstr[1] != "Head") &&
                                    (itemstr[1] != "Height") &&
                                    (itemstr[1] != "Mouth") &&
                                    (itemstr[1] != "Nipples") &&
                                    (itemstr[1] != "Pronouns") &&
                                    (itemstr[1] != "Pussy")) {
                                    InventoryRemove(C, itemstr[1]);
                                    InventoryWear(C, itemstr[0], itemstr[1], itemstr[2], itemstr[3], -1, itemstr[4]);
                                }
                            });
                            CharacterRefresh(C, false);
                        }
                    }
                    DialogLeave();
                }
                if ((MouseX >= 1870) && (MouseX < 1970) && (MouseY >= 240) && (MouseY < 290)) {
                    appinp = prompt('Please input the awcode (Compatible with BCG).', '');
                    if (C.OnlineSharedSettings.UBC != undefined) {
                        if ((C.Nickname == '') || (C.Nickname == undefined)) {
                            tgpname = C.Name;
                        } else {
                            tgpname = C.Nickname;
                        }
		        if ((tmpname != tgpname) && (C.OnlineSharedSettings.Uwall == true)) {
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: UBC Import is not possible because " + tgpname + " has enabled the Uwall protection.</p>"
                            );
                        } else {
                            CharacterNaked(C);
                            CharacterReleaseNoLock(C);
                            var appobj = JSON.parse(decodeURI(atob(appinp)));
                            appobj.forEach(itemstr => {
                                if ((InventoryGet(C, itemstr[1]) != null) && (InventoryGet(C, itemstr[1]).Asset.AllowLock == true)) {
                                    if (((InventoryGet(C, itemstr[1]).Property != null) && (InventoryGet(C, itemstr[1]).Property.LockedBy == null)) || (InventoryGet(C, itemstr[1]).Property == null)) {
                                        InventoryRemove(C, itemstr[1]);
                                        InventoryWear(C, itemstr[0], itemstr[1], itemstr[2], itemstr[3], -1, itemstr[4]);
                                    }
                                } else {
                                    InventoryRemove(C, itemstr[1]);
                                    InventoryWear(C, itemstr[0], itemstr[1], itemstr[2], itemstr[3], -1, itemstr[4]);
                                }
                            });
                            CharacterRefresh(C, false);
                        }   
                    }
                    DialogLeave();
                }
            }
            next(args);
        });
    }

    //Other functions

    //Background
    function updateBackground() {
        var UpdatedRoom = {
            Name: ChatRoomData.Name,
            Description: ChatRoomData.Description,
            Language: ChatRoomData.Language,
            Background: ChatCreateBackgroundSelect,
            Limit: "" + ChatRoomData.Limit,
            Admin: ChatRoomData.Admin,
            Ban: ChatRoomData.Ban,
            BlockCategory: ChatRoomData.BlockCategory,
            Game: ChatRoomData.Game,
            Private: ChatRoomData.Private,
            Locked: ChatRoomData.Locked,    
            MapData: ChatRoomData.MapData,
            Custom: ChatRoomData.Custom,
        };
        ServerSend("ChatRoomAdmin", {
            MemberNumber: Player.ID,
            Room: UpdatedRoom,
            Action: "Update",
        });
    }

    //BCAR Status
    function showAnimalTypeStatus() {
        let msg;
        msg = AnimalTypeStatus[0] + BCARdata.animal;
        M_MOANER_sendMessageToWearer(msg);
    }

    function showAnimationButtonsStatus() {
        let msg;
        if (BCARdata.animationButtonsEnable) {
            msg = AnimationButtonsStatus[0];
        } else {
            msg = AnimationButtonsStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showArousalManipulationStatus() {
        let msg;
        if (BCARdata.arousalEnable) {
            msg = ArousalManipulationStatus[0];
        } else {
            msg = ArousalManipulationStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showBCARExpressionsStatus() {
        let msg;
        if (BCARdata.expressionsEnable) {
            msg = BCARExpressionsStatus[0];
        } else {
            msg = BCARExpressionsStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showEarAnimationStatus() {
        let msg;
        if (BCARdata.earWigglingEnable) {
            msg = EarAnimationStatus[0];
        } else {
            msg = EarAnimationStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showEarEmoteStatus() {
        let msg;
        if (BCARdata.earEmoteEnable) {
            msg = EarEmoteStatus[0];
        } else {
            msg = EarEmoteStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showTailAnimationStatus() {
        let msg;
        if (BCARdata.tailWaggingEnable) {
            msg = TailAnimationStatus[0];
        } else {
            msg = TailAnimationStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showTailEmoteStatus() {
        let msg;
        if (BCARdata.tailEmoteEnable) {
            msg = TailEmoteStatus[0];
        } else {
            msg = TailEmoteStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showWingAnimationStatus() {
        let msg;
        if (BCARdata.wingFlappingEnable) {
            msg = WingAnimationStatus[0];
        } else {
            msg = WingAnimationStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showBCResponsiveStatus() {
        let msg;
        if (BCRdata.settings.enabled) {
            msg1 = BCResponsiveStatus[0];
        } else {
            msg1 = BCResponsiveStatus[1];
        }
        active = BCRdata.active_personality;
        Personality = BCRdata.personalities[active].name;
        msg2 = "";
        if (BCRdata.personalities[active].responses.length != 0){
            for (let i = 0; i < BCRdata.personalities[active].responses.length; i++) {
                if (BCRdata.personalities[0].responses[i].enabled){ 
                    rsp = BCRdata.personalities[0].responses[i].name;   
                } else {
                    rsp = "";
                } 
                msg2 = msg2 + rsp + " - ";           
            }
            msg = msg1 + " Active personality when enabled: " + Personality + ". Responses: " + msg2;
            M_MOANER_sendMessageToWearer(msg);
        }
    }

    //BCTweaks Status
    function showArousalErectionStatus() {
        let msg;
        if (BCTdata.arousalAffectsErection) {
            msg = ArousalErectionStatus[0];
        } else {
            msg = ArousalErectionStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showArousalProgressStatus() {
        let msg;
        if (BCTdata.arousalAffectsOrgasmProgress) {
            msg = ArousalProgressStatus[0];
        } else {
            msg = ArousalProgressStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showBCIconsStatus() {
        let msg;
        if (BCTdata.allIconOnlyShowOnHover) {
            msg = BCIconsStatus[0];
        } else {
            msg = BCIconsStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showBCTChangelogStatus() {
        let msg;
        if (BCTdata.showChangelog) {
            msg = BCTChangelogStatus[0];
        } else {
            msg = BCTChangelogStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showBCTIconStatus() {
        let msg;
        if (BCTdata.bctIconOnlyShowOnHover) {
            msg = BCTIconStatus[0];
        } else {
            msg = BCTIconStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showBestFriendsStatus() {
        let msg;
        if (BCTdata.bestFriendsEnabled) {
            msg = BestFriendsStatus[0];
        } else {
            msg = BestFriendsStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showLockConversionStatus() {
        let msg;
        if (BCTdata.hsToBFLockconvert) {
            msg = LockConversionStatus[0];
        } else {
            msg = LockConversionStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showRoomShareStatus() {
        let msg;
        if (BCTdata.bestFriendsRoomShare) {
            msg = RoomShareStatus[0];
        } else {
            msg = RoomShareStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showSplitStatus() {
        let msg;
        if (BCTdata.splitOrgasmArousal) {
            msg = SplitStatus[0];
        } else {
            msg = SplitStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showTailWaggingStatus() {
        let msg;
        if (BCTdata.tailWaggingEnable) {
            msg = TailWaggingStatus[0];
        } else {
            msg = TailWaggingStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    //EBCH Status
    function showEbchLogStatus() {
        let msg;
        if (EBCHdata[4] == 0) {
            msg = EbchLogStatus[0];
        } else {
            msg = EbchLogStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showEbchNotificationStatus() {
        let msg;
        if (EBCHdata[8] == 0) {
            msg = EbchNotificationStatus[0];
        } else {
            msg = EbchNotificationStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showEbchPoseStatus() {
        let msg;
        if (EBCHdata[6] == 0) {
            msg = EbchPoseStatus[0];
        } else {
            msg = EbchPoseStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showEbchUngarbleStatus() {
        let msg;
        if (EBCHdata[2] == 0) {
            msg = EbchUngarbleStatus[0];
        } else if (EBCHdata[2] == 1) {
            msg = EbchUngarbleStatus[1];
        } else {
            msg = EbchUngarbleStatus[2];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showEbchWelcomeStatus() {
        let msg;
        if (EBCHdata[20] == 0) {
            msg = EbchWelcomeStatus[0];
        } else {
            msg = EbchWelcomeStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    //Hearing
    function GetDeafLevel0() {
        let deafLevel = 0;
        return deafLevel;
    }

    function GetDeafLevel1() {
        let deafLevel = 1;
        return deafLevel;
    }

    function GetDeafLevel2() {
        let deafLevel = 2;
        return deafLevel;
    }

    function GetDeafLevel3() {
        let deafLevel = 3;
        return deafLevel;
    }

    function GetDeafLevel4() {
        let deafLevel = 4;
        return deafLevel;
    }

    //LSCG Status
    function showBcLscgStatus() {
        let msg;
        if (LSCGdata.GlobalModule.enabled) {
            msg1 = BcLscgStatus[0];
        } else {
            msg1 = BcLscgStatus[1];
        }
        if (LSCGdata.ActivityModule.enabled) {
            Activities = "Activities - ";
        } else {
            Activities = "";
        }
        if (LSCGdata.CollarModule.enabled) {
            Collar = "Breathplay (Collar) - ";
        } else {
            Collar = "";
        }
        if (LSCGdata.MiscModule.chloroformEnabled) {
            Chloroform = "Chloroform - ";
        } else {
            Chloroform = "";
        }
        if (LSCGdata.InjectorModule.enabled) {
            Drugs = "Drugs + Net Gun - ";
        } else {
            Drugs = "";
        }
        if (LSCGdata.MiscModule.gagChokeEnabled) {
            Gagchoke = "Gag Choking - ";
        } else {
            Gagchoke = "";
        }
        if (LSCGdata.MiscModule.handChokeEnabled) {
            Handchoke = "Hand Choking - ";
        } else {
            Handchoke = "";
        }
        if (LSCGdata.HypnoModule.enabled) {
            Hypnosis = "Hypnosis - ";
        } else {
            Hypnosis = "";
        }
        if (LSCGdata.MagicModule.enabled) {
            Magic = "Magic";
        } else {
            Magic = "";
        }
        msg = msg1 + " Features activated when LSCG is enabled: " + Activities + Collar + Chloroform + Drugs + Gagchoke + Handchoke + Hypnosis + Magic;
        M_MOANER_sendMessageToWearer(msg);
    }
    
    function showBoopReactionsStatus() {
        let msg;
        if (LSCGdata.BoopsModule.enabled) {
            msg = BoopReactionsStatus[0];
        } else {
            msg = BoopReactionsStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showCheckRollsStatus() {
        let msg;
        if (LSCGdata.GlobalModule.showCheckRolls) {
            msg = CheckRollsStatus[0];
        } else {
            msg = CheckRollsStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showCraftingStatus() {
        let msg;
        if (LSCGdata.GlobalModule.sharePublicCrafting) {
            msg1 = Crafting1Status[0];
        } else {
            msg1 = Crafting1Status[1];
        }
        if (LSCGdata.GlobalModule.seeSharedCrafts) {
            msg2 = Crafting2Status[0];
        } else {
            msg2 = Crafting2Status[1];
        }
        msg = msg1 + " " + msg2;
        M_MOANER_sendMessageToWearer(msg);
    }
    
    function showEdgeBlurStatus() {
        let msg;
        if (LSCGdata.GlobalModule.edgeBlur) {
            msg = EdgeBlurStatus[0];
        } else {
            msg = EdgeBlurStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showErectionStatus() {
        let msg;
        if (LSCGdata.GlobalModule.erectionDetection) {
            msg = ErectionStatus[0];
        } else {
            msg = ErectionStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showLipstickStatus() {
        let msg;
        if (LSCGdata.LipstickModule.enabled) {
            msg1 = Lipstick1Status[0];
        } else {
            msg1 = Lipstick1Status[1];
        }
        if (LSCGdata.LipstickModule.dry) {
            msg2 = Lipstick2Status[0];
        } else {
            msg2 = Lipstick2Status[1];
        }
        msg = msg1 + " " + msg2;
        M_MOANER_sendMessageToWearer(msg);
    }

    function showOpacityStatus() {
        let msg;
        if (LSCGdata.OpacityModule.enabled) {
            msg1 = Opacity1Status[0];
        } else {
            msg1 = Opacity1Status[1];
        }
        if (LSCGdata.OpacityModule.preventExternalMod) {
            msg2 = Opacity2Status[0];
        } else {
            msg2 = Opacity2Status[1];
        }
        msg = msg1 + " " + msg2;
        M_MOANER_sendMessageToWearer(msg);
    }

    function showRestrainedSettingsStatus() {
        let msg;
        if (LSCGdata.GlobalModule.blockSettingsWhileRestrained) {
            msg = RestrainedSettingsStatus[0];
        } else {
            msg = RestrainedSettingsStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }
 
    function showResizingStatus() {
        let msg;
        if (LSCGdata.GlobalModule.hideResizing) {
            msg = ResizingStatus[0];
        } else {
            msg = ResizingStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    //MBS Status
    function showLockedMbsStatus() {
        let msg;
        if (MBSdata.LockedWhenRestrained) {
            msg = LockedMbsStatus[0];
        } else {
            msg = LockedMbsStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showLockedWheelStatus() {
        let msg;
        if (MBSdata.RollWhenRestrained) {
            msg = LockedWheelStatus[0];
        } else {
            msg = LockedWheelStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    //Responsive Status
    function showResponsiveStatus() {
        let msg;
        if (RSPdata.GlobalModule.ResponsiveEnabled) {
            msg = ResponsiveStatus[0];
        } else {
            msg = ResponsiveStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showBcrResponsesStatus() {
        let msg;
        if (RSPdata.GlobalModule.responsesEnabled) {
            msg = BcrResponsesStatus[0];
        } else {
            msg = BcrResponsesStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showCharacterTalkStatus() {
        let msg;
        if (RSPdata.GlobalModule.CharTalkEnabled) {
            msg = CharacterTalkStatus[0];
        } else {
            msg = CharacterTalkStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showInterceptMessageStatus() {
        let msg;
        if (RSPdata.GlobalModule.doMessageInterruption) {
            msg = InterceptMessageStatus[0];
        } else {
            msg = InterceptMessageStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showLeaveMessageStatus() {
        let msg;
        if (RSPdata.GlobalModule.doLeaveMessage) {
            msg = LeaveMessageStatus[0];
        } else {
            msg = LeaveMessageStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showMoansStatus() {
        let msg;
        if (RSPdata.GlobalModule.doAddMoansOnHighArousal) {
            msg = MoansStatus[0];
        } else {
            msg = MoansStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }
	
    function showNewVersionStatus() {
        let msg;
        if (RSPdata.GlobalModule.doShowNewVersionMessage) {
            msg = NewVersionStatus[0];
        } else {
            msg = NewVersionStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showRulesStatus() {
        let msg;
        if (RSPdata.GlobalModule.doPreventMessageIfBcxBlock) {
            msg = RulesStatus[0];
        } else {
            msg = RulesStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    //Stable
    function StablePonyEnd() {
        CommonSetScreen("Room", "Stable");
        CharacterSetCurrent(StableTrainer);
        StableTrainer.Stage = "StableTrainingRunOut";
        CharacterRelease(Player);
        CharacterNaked(Player);
        for (let E = Player.Appearance.length - 1; E >= 0; E--)
            if ((Player.Appearance[E].Asset.Group.Name == "ItemTorso") || (Player.Appearance[E].Asset.Group.Name == "Hat") || (Player.Appearance[E].Asset.Group.Name == "ItemButt")) {
                Player.Appearance.splice(E, 1);
            }
        CharacterDress(Player, StablePlayerAppearance);
        CharacterRefresh(Player);
    }

    function StableTrainerEnd() {
        CommonSetScreen("Room", "Stable");
        CharacterSetCurrent(StableTrainer);
        StableTrainer.Stage = "StableExamTPass";
        CharacterNaked(Player);
        CharacterDress(Player, StablePlayerAppearance);
        CharacterRefresh(Player);
    }

    //Status
    function showAutojoinStatus() {
        let msg;
        if (AutojoinOn) {
            msg = AutojoinStatus[0];
        } else {
            msg = AutojoinStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showExitmodeStatus() {
        let msg;
        if (SlowleaveOn) {
            msg = ExitmodeStatus[1];
        } else {
            msg = ExitmodeStatus[0];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showFullseedStatus() {
        let msg;
        if (FullseedOn) {
            msg = FullseedStatus[0];
        } else {
            msg = FullseedStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showHighfameStatus() {
        let msg;
        if (HighfameOn) {
            msg = HighfameStatus[0];
        } else {
            msg = HighfameStatus[1];
        }
        msg = msg + " Current high fame: " + cfame + ". Current default desk: " + cdesk + ".";
        M_MOANER_sendMessageToWearer(msg);
    }

    function showHotkeysStatus() {
        let msg;
        if (HotkeysOn) {
            msg = HotkeysStatus[0];
        } else {
            msg = HotkeysStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showMagiccheatStatus() {
        let msg;
        if (MagiccheatOn) {
            msg = MagiccheatStatus[0];
        } else {
            msg = MagiccheatStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showNowhisperStatus() {
        let msg;
        if (NowhisperOn) {
            msg = NowhisperStatus[0];
        } else {
            msg = NowhisperStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showNpcpunishStatus() {
        let msg;
        if (NPCpunish) {
            msg = NpcpunishStatus[0];
        } else {
            msg = NpcpunishStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showOutbuttonsStatus() {
        let msg;
        if (OutbuttonsOn) {
            msg = OutbuttonsStatus[0];
        } else {
            msg = OutbuttonsStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showSosbuttonsStatus() {
        let msg;
        if (SosbuttonsOn) {
            msg = SosbuttonsStatus[0];
        } else {
            msg = SosbuttonsStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    //Talking
    function StutterTalk1(CD) {
        if (CD == null) CD = "";
        var Par = false;
        var CS = 1;
        var Seed = CD.length;
        for (let L = 0; L < CD.length; L++) {
            var H = CD.charAt(L).toLowerCase();
            if (H == "(") Par = true;
            if (!Par && CS >= 0 && (H.match(/[[a-z?-??]/i))) {
                var R = Math.sin(Seed++) * 10000;
                R = R - Math.floor(R);
                R = Math.floor(R * 10) + 2;
                if (CS == 1 || R >= 10) {
                    CD = CD.substring(0, L) + CD.charAt(L) + "-" + CD.substring(L, CD.length);
                    L += 2;
                }
                CS = -1;
            }
            if (H == " ") CS = 0;
        }
        return CD;
    }

    function StutterTalk2(CD) {
        if (CD == null) CD = "";
        var Par = false;
        var CS = 1;
        var Seed = CD.length;
        for (let L = 0; L < CD.length; L++) {
            var H = CD.charAt(L).toLowerCase();
            if (H == "(") Par = true;
            if (!Par && CS >= 0 && (H.match(/[[a-z?-??]/i))) {
                var R = Math.sin(Seed++) * 10000;
                R = R - Math.floor(R);
                R = Math.floor(R * 10) + 4;
                if (CS == 1 || R >= 10) {
                    CD = CD.substring(0, L) + CD.charAt(L) + "-" + CD.substring(L, CD.length);
                    L += 2;
                }
                CS = -1;
            }
            if (H == " ") CS = 0;
        }
        return CD;
    }

    function StutterTalk3(CD) {
        if (CD == null) CD = "";
        var Par = false;
        var CS = 1;
        var Seed = CD.length;
        for (let L = 0; L < CD.length; L++) {
            var H = CD.charAt(L).toLowerCase();
            if (H == "(") Par = true;
            if (!Par && CS >= 0 && (H.match(/[[a-z?-??]/i))) {
                var R = Math.sin(Seed++) * 10000;
                R = R - Math.floor(R);
                R = Math.floor(R * 10) + 6;
                if (CS == 1 || R >= 10) {
                    CD = CD.substring(0, L) + CD.charAt(L) + "-" + CD.substring(L, CD.length);
                    L += 2;
                }
                CS = -1;
            }
            if (H == " ") CS = 0;
        }
        return CD;
    }

    function StutterTalk4(CD) {
        if (CD == null) CD = "";
        var Par = false;
        var CS = 1;
        var Seed = CD.length;
        for (let L = 0; L < CD.length; L++) {
            var H = CD.charAt(L).toLowerCase();
            if (H == "(") Par = true;
            if (!Par && CS >= 0 && (H.match(/[[a-z?-??]/i))) {
                var R = Math.sin(Seed++) * 10000;
                R = R - Math.floor(R);
                R = Math.floor(R * 10) + 8;
                if (CS == 1 || R >= 10) {
                    CD = CD.substring(0, L) + CD.charAt(L) + "-" + CD.substring(L, CD.length);
                    L += 2;
                }
                CS = -1;
            }
            if (H == " ") CS = 0;
        }
        return CD;
    }

    //Themed Status   
    function showBCThemedStatus() {
        let msg;
        if (THMdata.GlobalModule.themedEnabled) {
            msg = BCThemedStatus[0];
        } else {
            msg = BCThemedStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }
    function showChatInputStatus() {
        let msg;
        if (THMdata.IntegrationModule.BC_Chat) {
            msg = ChatInputStatus[0];
        } else {
            msg = ChatInputStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }
    function showChatStylingStatus() {
        let msg;
        if (THMdata.GlobalModule.doUseChatSpecialStyling) {
            msg = ChatStylingStatus[0];
        } else {
            msg = ChatStylingStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }
    function showFriendListStatus() {
        let msg;
        if (THMdata.IntegrationModule.BC_FriendList) {
            msg = FriendListStatus[0];
        } else {
            msg = FriendListStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }
    function showGuiOverhaulStatus() {
        let msg;
        if (THMdata.GlobalModule.doVanillaGuiOverhaul) {
            msg = GuiOverhaulStatus[0];
        } else {
            msg = GuiOverhaulStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }
    function showInputZonesStatus() {
        let msg;
        if (THMdata.IntegrationModule.BC) {
            msg = InputZonesStatus[0];
        } else {
            msg = InputZonesStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }
    function showLocalTimeStatus() {
        let msg;
        if (THMdata.GlobalModule.doShowLocaleTime) {
            msg = LocalTimeStatus[0];
        } else {
            msg = LocalTimeStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }
    function showMiscDetailsStatus() {
        let msg;
        if (THMdata.IntegrationModule.BC_Other) {
            msg = MiscDetailsStatus[0];
        } else {
            msg = MiscDetailsStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }
    function showThemedVersionStatus() {
        let msg;
        if (THMdata.GlobalModule.doShowNewVersionMessage) {
            msg = ThemedVersionStatus[0];
        } else {
            msg = ThemedVersionStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    //Vision
    function GetBlindLevel0() {
        let blindLevel = 0;
        return blindLevel;
    }

    function GetBlindLevel1() {
        let blindLevel = 1;
        return blindLevel;
    }

    function GetBlindLevel2() {
        let blindLevel = 2;
        return blindLevel;
    }

    function GetBlindLevel3() {
        let blindLevel = 3;
        return blindLevel;
    }

    function GetBlurLevel0() {
         let blurLevel = 0;
         return blurLevel;
    }

    function GetBlurLevel1() {
         let blurLevel = 3;
         return blurLevel;
    }

    function GetBlurLevel2() {
         let blurLevel = 8;
         return blurLevel;
    }

    function GetBlurLevel3() {
         let blurLevel = 20;
         return blurLevel;
    }

    function GetBlurLevel4() {
         let blurLevel = 50;
         return blurLevel;
    }

    //////////////////////////////////////////////////////////
    //Moaner
    //////////////////////////////////////////////////////////

    //ChatRoom
    function M_MOANER_isSimpleChat(msg) {
        return msg.trim().length > 0 &&
            !msg.startsWith("/") &&
            !msg.startsWith("(") &&
            !msg.startsWith("*") &&
            !msg.startsWith("@") &&
            ChatRoomTargetMemberNumber == null;
    }

    //Full script control
    function scriptControl(commande) {
        if (commande == "on") {
            M_MOANER_scriptOn = true;
        } else if (commande == "off") {
            M_MOANER_scriptOn = false;
        }
        showM_MOANER_scriptStatus();
    }

    function profilesList() {
        let liste = M_MOANER_getKeys(M_MOANER_moansProfiles);
        let msg = M_MOANER_profileListM_MOANER_intro + liste;
        M_MOANER_sendMessageToWearer(msg);
    }

    //Orgasm moans control
    function orgasmControl(commande) {
        if (M_MOANER_orgasmActive == false) {
            M_MOANER_orgasmActive = true;
        } else {
            M_MOANER_orgasmActive = false;
        }
        showM_MOANER_orgasmStatus();
    }

    //Spanking moans control
    function spankControl(commande) {
        if (M_MOANER_spankActive == false) {
            M_MOANER_spankActive = true;
        } else {
            M_MOANER_spankActive = false;
        }
        showM_MOANER_spankStatus();
    }

    //Talking moans control
    function talkControl(commande) {
        if (M_MOANER_talkActive == false) {
            M_MOANER_talkActive = true;
        } else {
            M_MOANER_talkActive = false;
        }
        showM_MOANER_talkStatus();
    }

    //Tickling moans control
    function tickleControl(commande) {
        if (M_MOANER_tickleActive == false) {
            M_MOANER_tickleActive = true;
        } else {
            M_MOANER_tickleActive = false;
        }
        showM_MOANER_tickleStatus();
    }

    //Player vibes moans control
    function vibeControl(commande) {
        if (M_MOANER_vibratorActive == false) {
            M_MOANER_vibratorActive = true;
            M_MOANER_xvibratorActive = false;
            showM_MOANER_xvibratorStatus();
        } else {
            M_MOANER_vibratorActive = false;
        }
        showM_MOANER_vibratorStatus();
    }

    //Other players vibes moans control
    function xvibeControl(commande) {
        if (M_MOANER_xvibratorActive == false) {
            M_MOANER_xvibratorActive = true;
            M_MOANER_vibratorActive = true
            showM_MOANER_vibratorStatus();
        } else {
            M_MOANER_xvibratorActive = false;
        }
        showM_MOANER_xvibratorStatus();
    }

    //Status
    function showStatus() {
        showM_MOANER_scriptStatus();
        showM_MOANER_profileStatus();
        showM_MOANER_orgasmStatus();
        showM_MOANER_spankStatus();
        showM_MOANER_talkStatus();
        showM_MOANER_tickleStatus();
        showM_MOANER_vibratorStatus();
        showM_MOANER_xvibratorStatus();
    }

    function showM_MOANER_scriptStatus() {
        let msg;
        if (M_MOANER_scriptOn) {
            msg = M_MOANER_scriptStatus[0];
        } else {
            msg = M_MOANER_scriptStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showM_MOANER_profileStatus() {
        let msg;
        if (profileName == "default") {
            msg = M_MOANER_profileStatus[0];
        } else {
            msg = M_MOANER_profileStatus[1] + profileName;
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showM_MOANER_orgasmStatus() {
        let msg;
        if (M_MOANER_orgasmActive) {
            msg = M_MOANER_orgasmStatus[0];
        } else {
            msg = M_MOANER_orgasmStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showM_MOANER_spankStatus() {
        let msg;
        if (M_MOANER_spankActive) {
            msg = M_MOANER_spankStatus[0];
        } else {
            msg = M_MOANER_spankStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showM_MOANER_talkStatus() {
        let msg;
        if (M_MOANER_talkActive) {
            msg = M_MOANER_talkStatus[0];
        } else {
            msg = M_MOANER_talkStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showM_MOANER_tickleStatus() {
        let msg;
        if (M_MOANER_tickleActive) {
            msg = M_MOANER_tickleStatus[0];
        } else {
            msg = M_MOANER_tickleStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showM_MOANER_vibratorStatus() {
        let msg;
        if (M_MOANER_vibratorActive) {
            msg = M_MOANER_vibratorStatus[0];
        } else {
            msg = M_MOANER_vibratorStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showM_MOANER_xvibratorStatus() {
        let msg;
        if (M_MOANER_xvibratorActive) {
            msg = M_MOANER_xvibratorStatus[0];
        } else {
            msg = M_MOANER_xvibratorStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    //MoanerUtils
    function M_MOANER_logDebug(msg) {}

    function startDebug() {
        M_MOANER_logDebug = (msg) => {
            console.log("DEBUG: " + msg);
        };
    }

    function stopDebug() {
        M_MOANER_logDebug = (msg) => {
            console.log("DEBUG: " + msg);
        };
    }

    function M_MOANER_getKeys(obj) {
        var keys = [];
        for (var key in obj) {
            keys.push(key);
        }
        return keys;
    }

    function M_MOANER_shuffle(array, seed) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;
        // While there remain elements to M_MOANER_shuffle...
        while (0 !== currentIndex) {
            seed = M_MOANER_getRandomNumber(seed);
            // Pick a remaining element...
            randomIndex = seed % (array.length - 1);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    function M_MOANER_sendMessageToWearer(msg) {
        ServerSend("ChatRoomChat", {
            Type: "Action",
            Content: "gag",
            Target: Player.MemberNumber,
            Dictionary: [{
                Tag: "gag",
                Text: msg
            }],
        });
    }

    function M_MOANER_getRandomNumber(seed) {
        let number = Math.floor(Math.abs(Math.sin(seed) * 1000));
        return number;
    }

    //MoanerManagement
    /*const baseM_MOANER_factor4Moans=["n... Nyah\u2665","Oooh","mmmmmh!","NYyaaA\u2665"];
    const baseM_MOANER_factor3Moans=["mm","aaaah","nyAh\u2665"];
    const baseM_MOANER_factor2Moans=["nyah\u2665","Aah!","mh","oh!\u2665","mh\u2665"];
    const basefactor1Moans=["mh","\u2665oh\u2665","ah","...\u2665"];
    const baseM_MOANER_orgasmMoans=["Nya...Ny...NyaaAAaah!","Mmmmh... MMmh... Hhhmmmm...","Oooooh... Mmmmh... OooOOOOh!","Mmmhnn... Nyhmm... Nyah!"];
    const basePainMoans=["Aie!","Aoouch!","Eek","ouch","Aow"];*/

    var M_MOANER_profileName = "default";

    M_MOANER_defaultMoans = {
        "hot": ["n... Nyah\u2665", "Oooh", "mmmmmh!", "NYyaaA\u2665"],
        "medium": ["mm", "aaaah", "nyAh\u2665"],
        "light": ["nyah\u2665", "Aah!", "mh", "oh!\u2665", "mh\u2665"],
        "low": ["mh", "\u2665oh\u2665", "ah", "...\u2665"],
        "orgasm": ["Nya...Ny...NyaaAAaah!", "Mmmmh... MMmh... Hhhmmmm...", "Oooooh... Mmmmh... OooOOOOh!", "Mmmhnn... Nyhmm... Nyah!"],
        "pain": ["Aie!", "Aoouch!", "Aaaaie!", "Ouch", "Aow"],
        "tickle": ["Hahaha!", "Mmmmhahaha!", "Muhahah...", "Ha!Ha!"]
    }

    M_MOANER_customMoans = {
        "hot": [],
        "medium": [],
        "light": [],
        "low": [],
        "orgasm": [],
        "pain": [],
        "tickle": []
    }

    var M_MOANER_moansProfiles = [];

    function M_MOANER_activerProfile(name) {
        if (M_MOANER_moansProfiles[name] == undefined) {
            profileName = "default";
            resetMoans(Math.random() * 300);
        } else {
            profileName = name;
            resetMoans(Math.random() * 300);
        }
    }

    function M_MOANER_getMoans(name) {
        var pleasureMoans = M_MOANER_moansProfiles[name];
        if (pleasureMoans == undefined) {
            pleasureMoans = M_MOANER_defaultMoans;
        }
        return pleasureMoans;
    }

    function M_MOANER_addMoansProfile(name, pleasure) {
        if (pleasure.hot == undefined || pleasure.hot.length == 0) {
            pleasure.hot = M_MOANER_defaultMoans.hot;
        }
        if (pleasure.medium == undefined || pleasure.medium.length == 0) {
            pleasure.medium = M_MOANER_defaultMoans.medium;
        }
        if (pleasure.light == undefined || pleasure.light.length == 0) {
            pleasure.light = M_MOANER_defaultMoans.light;
        }
        if (pleasure.low == undefined || pleasure.low.length == 0) {
            pleasure.low = M_MOANER_defaultMoans.low;
        }
        if (pleasure.orgasm == undefined || pleasure.orgasm.length == 0) {
            pleasure.orgasm = M_MOANER_defaultMoans.orgasm;
        }
        if (pleasure.pain == undefined || pleasure.pain.length == 0) {
            pleasure.pain = M_MOANER_defaultMoans.pain;
        }
        if (pleasure.tickle == undefined || pleasure.tickle.length == 0) {
            pleasure.tickle = M_MOANER_defaultMoans.tickle;
        }
        M_MOANER_moansProfiles[name] = pleasure;
    }

    function addLowMoans(name, pleasureList) {
        var profile = M_MOANER_moansProfiles[name];
        if (profile == undefined) {
            profiledefaultPleasureMoans;
        }
        profile.low = pleasureList;
        addMoansProfile(name, profile);
    }

    M_MOANER_addMoansProfile("default", M_MOANER_defaultMoans);

    //MoanerReactions
    var M_MOANER_orgasmMoans = [];
    var M_MOANER_factor4Moans = [];
    var M_MOANER_factor3Moans = [];
    var M_MOANER_factor2Moans = [];
    var factor1Moans = [];
    var PROPORTION_MAX = 40;

    /******************************************************************/
    // Reactions in chat
    /******************************************************************/

    window.ChatRoomRegisterMessageHandler({
        Priority: 600,
        Description: "Moaner Orgasm",
        Callback: (data, sender, msg, metadata) => {
            if (M_MOANER_scriptOn) {
                M_MOANER_reactionOrgasm(Player);
            }
        }
    });

    function M_MOANER_reactionOrgasm(Player) {
        if (M_MOANER_orgasmActive && M_MOANER_scriptOn && window.CurrentScreen == "ChatRoom") {
            if ((Player.ID == 0) && (Player.ArousalSettings.OrgasmStage == 2)) {
                var moan;
                var backupChatRoomTargetMemberNumber = null;
                // not in whisper mode
                // not as /me
                // only in normal talk mode
                msg = ElementValue("InputChat");
                if (M_MOANER_isSimpleChat(msg)) {
                    moan = msg + "... " + getOrgasmMoan();
                    ElementValue("InputChat", moan);
                    if (this.BabyTalkOn == true) {
                        var moan2 = SpeechBabyTalk({
                            Effect: ["RegressedTalk"]
                        }, moan);
                    } else if (this.GagTalkOn == true) {
                        var moan2 = SpeechGarbleByGagLevel(gl, moan);
                    } else {
                        var moan2 = moan;
                    }
                    ElementValue("InputChat", moan.replace(moan, moan2));
                    if (this.Stutter1On == true) {
                        var moan3 = StutterTalk1(moan2);
                    } else if (this.Stutter2On == true) {
                        var moan3 = StutterTalk2(moan2);
                    } else if (this.Stutter3On == true) {
                        var moan3 = StutterTalk3(moan2);
                    } else if (this.Stutter4On == true) {
                        var moan3 = StutterTalk4(moan2);
                    } else {
                        var moan3 = moan2;
                    }
                    ElementValue("InputChat", moan2.replace(moan2, moan3));
                    msg = "";
                    ActivityChatRoomArousalSync(Player);
                    if (M_MOANER_cum == false) {
                        ChatRoomSendChat();
                        M_MOANER_cum = true;
                        M_MOANER_saveControls();
                    }
                } else {
                    backupChatRoomTargetMemberNumber = ChatRoomTargetMemberNumber;
                    ChatRoomTargetMemberNumber = null;
                    moan = "... " + getOrgasmMoan();
                    ElementValue("InputChat", moan);
                    if (this.BabyTalkOn == true) {
                        var moan2 = SpeechBabyTalk({
                            Effect: ["RegressedTalk"]
                        }, moan);
                    } else if (this.GagTalkOn == true) {
                        var moan2 = SpeechGarbleByGagLevel(gl, moan);
                    } else {
                        var moan2 = moan;
                    }
                    ElementValue("InputChat", moan.replace(moan, moan2));
                    if (this.Stutter1On == true) {
                        var moan3 = StutterTalk1(moan2);
                    } else if (this.Stutter2On == true) {
                        var moan3 = StutterTalk2(moan2);
                    } else if (this.Stutter3On == true) {
                        var moan3 = StutterTalk3(moan2);
                    } else if (this.Stutter4On == true) {
                        var moan3 = StutterTalk4(moan2);
                    } else {
                        var moan3 = moan2;
                    }
                    ElementValue("InputChat", moan2.replace(moan2, moan3));;
                    ActivityChatRoomArousalSync(Player);
                    if (M_MOANER_cum == false) {
                        ChatRoomSendChat();
                        M_MOANER_cum = true;
                        M_MOANER_saveControls();
                    }
                    ChatRoomTargetMemberNumber = backupChatRoomTargetMemberNumber;
                    ElementValue("InputChat", msg);
                }
            }
        }
    }

    window.ChatRoomRegisterMessageHandler({
        Priority: 600,
        Description: "Moaner Target",
        Callback: (data, sender, msg, metadata) => {
            if ((data.Content.includes("Vibe")) && (Player.ArousalSettings.Progress >= 10)) {
                if (M_MOANER_xvibratorActive == true) {
                    var msg = ElementValue("InputChat");
                    if (M_MOANER_isSimpleChat(msg)) {
                        M_MOANER_reactionVibeWithChat(data);
                    } else {
                        M_MOANER_reactionVibeWithoutChat(data);
                    }
                } else {
                    if ((metadata != undefined) || (metadata != null)) {
                        if ((metadata.TargetCharacter != undefined) || (metadata.TargetCharacter != null)) {
                            if (metadata.TargetCharacter.IsPlayer()) {
                                var msg = ElementValue("InputChat");
                                if (M_MOANER_isSimpleChat(msg)) {
                                    M_MOANER_reactionVibeWithChat(data);
                                } else {
                                    M_MOANER_reactionVibeWithoutChat(data);
                                }
                            }
                        }
                    }
                }
            }
            /*if (data.Content.includes("Inject")) {
                if (!Player?.MemberNumber) return;
                let mtarget = data.Dictionary.find(obj => obj.TargetCharacter)?.TargetCharacter;
                mtarget ||= data.Dictionary.find(obj => obj.Tag === "TargetCharacter")?.MemberNumber; 
                if (mtarget !== Player.MemberNumber) return;
                var msg = ElementValue("InputChat");
                if (Player.OnlineSettings.LSCG != null) {
                    if (Player.OnlineSettings.LSCG.InjectorModule.enableHorny == true) {
                        if (Player.OnlineSettings.LSCG.InjectorModule.hornyLevel != 0) {
                            if (M_MOANER_isSimpleChat(msg)) {
                                M_MOANER_reactionVibeWithChat(data);
                            } else {
                                M_MOANER_reactionVibeWithoutChat(data);
                            }
                        }
                    }
                }
            }*/
            if (data.Type === "Action" && metadata.ShockIntensity >= 0) {
                let intensity = metadata.ShockIntensity;
                if (intensity !== null && metadata.TargetCharacter.IsPlayer()) {
                    var msg = ElementValue("InputChat");
                    if ((data.Content.includes("Orgasm")) ||
                        (data.Content.includes("Standup")) ||
                        (data.Content.includes("Struggle"))) {
                        if (M_MOANER_isSimpleChat(msg)) {
                            M_MOANER_reactionSpankWithChat(data);
                        } else {
                            M_MOANER_reactionSpankWithoutChat(data);
                        }
                    }
                }
            }
            if (data.Type !== 'Activity') return;
            if (!Player?.MemberNumber) return;
            let mtarget = data.Dictionary.find(obj => obj.TargetCharacter)?.TargetCharacter;
            mtarget ||= data.Dictionary.find(obj => obj.Tag === "TargetCharacter")?.MemberNumber;
            if (mtarget !== Player.MemberNumber) return;
            var msg = ElementValue("InputChat");
            if ((data.Content.includes("Bite")) ||
                (data.Content.includes("Kick")) ||
                (data.Content.includes("Pinch")) ||
                (data.Content.includes("Shock")) ||
                (data.Content.includes("Slap")) ||
                (data.Content.includes("Spank"))) {
                if (M_MOANER_isSimpleChat(msg)) {
                    M_MOANER_reactionSpankWithChat(data);
                } else {
                    M_MOANER_reactionSpankWithoutChat(data);
                }
            }
            if (data.Content.includes("Tickle")) {
                if (M_MOANER_isSimpleChat(msg)) {
                    M_MOANER_reactionTickleWithChat(data);
                } else {
                    M_MOANER_reactionTickleWithoutChat(data);
                }
            }
            if ((data.Content == "ChatOther-ItemEars-Caress") ||
                (data.Content == "ChatOther-ItemEars-Kiss") ||
                (data.Content == "ChatOther-ItemEars-Lick") ||
                (data.Content == "ChatOther-ItemEars-Nibble") ||
                (data.Content.includes("Finger")) ||
                (data.Content.includes("Fist")) ||
                (data.Content.includes("Masturbate"))) {
                if (M_MOANER_isSimpleChat(msg)) {
                    M_MOANER_reactionVibeWithChat(data);
                } else {
                    M_MOANER_reactionVibeWithoutChat(data);
                }
            }
        }
    });

    function M_MOANER_reactionSpankWithChat(data) {
        if (M_MOANER_spankActive && M_MOANER_scriptOn) {
            //get the moan type to apply
            //data to generate the moans
            var Factor = Math.floor(Player.ArousalSettings.Progress / 20);
            var moan = getSpankMoan(Factor, Math.random() * 300);
            var msg = ElementValue("InputChat");
            if (msg != "") {
                moan = msg + "... " + moan;
            }
            ElementValue("InputChat", moan);
            if (this.BabyTalkOn == true) {
                var moan2 = SpeechBabyTalk({
                    Effect: ["RegressedTalk"]
                }, moan);
            } else if (this.GagTalkOn == true) {
                var moan2 = SpeechGarbleByGagLevel(gl, moan);
            } else {
                var moan2 = moan;
            }
            ElementValue("InputChat", moan.replace(moan, moan2));
            if (this.Stutter1On == true) {
                var moan3 = StutterTalk1(moan2);
            } else if (this.Stutter2On == true) {
                var moan3 = StutterTalk2(moan2);
            } else if (this.Stutter3On == true) {
                var moan3 = StutterTalk3(moan2);
            } else if (this.Stutter4On == true) {
                var moan3 = StutterTalk4(moan2);
            } else {
                var moan3 = moan2;
            }
            ElementValue("InputChat", moan2.replace(moan2, moan3));
            ChatRoomSendChat();
        }
    }

    function M_MOANER_reactionSpankWithoutChat(data) {
        if (M_MOANER_spankActive && M_MOANER_scriptOn) {
            //get the moan type to apply
            //data to generate the moans
            var Factor = Math.floor(Player.ArousalSettings.Progress / 20);
            var moan = getSpankMoan(Factor, Math.random() * 300);
            var msg = ElementValue("InputChat");
            let backtarget = ChatRoomTargetMemberNumber;
            ChatRoomTargetMemberNumber = null;
            ElementValue("InputChat", moan);
            if (this.BabyTalkOn == true) {
                var moan2 = SpeechBabyTalk({
                    Effect: ["RegressedTalk"]
                }, moan);
            } else if (this.GagTalkOn == true) {
                var moan2 = SpeechGarbleByGagLevel(gl, moan);
            } else {
                var moan2 = moan;
            }
            ElementValue("InputChat", moan.replace(moan, moan2));
            if (this.Stutter1On == true) {
                var moan3 = StutterTalk1(moan2);
            } else if (this.Stutter2On == true) {
                var moan3 = StutterTalk2(moan2);
            } else if (this.Stutter3On == true) {
                var moan3 = StutterTalk3(moan2);
            } else if (this.Stutter4On == true) {
                var moan3 = StutterTalk4(moan2);
            } else {
                var moan3 = moan2;
            }
            ElementValue("InputChat", moan2.replace(moan2, moan3));
            ChatRoomSendChat();
            ElementValue("InputChat", msg);
            ChatRoomTargetMemberNumber = backtarget;
        }
    }

    function M_MOANER_reactionTickleWithChat(data) {
        if (M_MOANER_tickleActive && M_MOANER_scriptOn) {
            //get the moan type to apply
            //data to generate the moans
            var Factor = Math.floor(Player.ArousalSettings.Progress / 20);
            var moan = getTickleMoan(Factor, Math.random() * 300);
            var msg = ElementValue("InputChat");
            if (msg != "") {
                moan = msg + "... " + moan;
            }
            ElementValue("InputChat", moan);
            if (this.BabyTalkOn == true) {
                var moan2 = SpeechBabyTalk({
                    Effect: ["RegressedTalk"]
                }, moan);
            } else if (this.GagTalkOn == true) {
                var moan2 = SpeechGarbleByGagLevel(gl, moan);
            } else {
                var moan2 = moan;
            }
            ElementValue("InputChat", moan.replace(moan, moan2));
            if (this.Stutter1On == true) {
                var moan3 = StutterTalk1(moan2);
            } else if (this.Stutter2On == true) {
                var moan3 = StutterTalk2(moan2);
            } else if (this.Stutter3On == true) {
                var moan3 = StutterTalk3(moan2);
            } else if (this.Stutter4On == true) {
                var moan3 = StutterTalk4(moan2);
            } else {
                var moan3 = moan2;
            }
            ElementValue("InputChat", moan2.replace(moan2, moan3));
            ChatRoomSendChat();
        }
    }

    function M_MOANER_reactionTickleWithoutChat(data) {
        if (M_MOANER_tickleActive && M_MOANER_scriptOn) {
            //get the moan type to apply
            //data to generate the moans
            var Factor = Math.floor(Player.ArousalSettings.Progress / 20);
            var moan = getTickleMoan(Factor, Math.random() * 300);
            var msg = ElementValue("InputChat");
            let backtarget = ChatRoomTargetMemberNumber;
            ChatRoomTargetMemberNumber = null;
            ElementValue("InputChat", moan);
            if (this.BabyTalkOn == true) {
                var moan2 = SpeechBabyTalk({
                    Effect: ["RegressedTalk"]
                }, moan);
            } else if (this.GagTalkOn == true) {
                var moan2 = SpeechGarbleByGagLevel(gl, moan);
            } else {
                var moan2 = moan;
            }
            ElementValue("InputChat", moan.replace(moan, moan2));
            if (this.Stutter1On == true) {
                var moan3 = StutterTalk1(moan2);
            } else if (this.Stutter2On == true) {
                var moan3 = StutterTalk2(moan2);
            } else if (this.Stutter3On == true) {
                var moan3 = StutterTalk3(moan2);
            } else if (this.Stutter4On == true) {
                var moan3 = StutterTalk4(moan2);
            } else {
                var moan3 = moan2;
            }
            ElementValue("InputChat", moan2.replace(moan2, moan3));
            ChatRoomSendChat();
            ElementValue("InputChat", msg);
            ChatRoomTargetMemberNumber = backtarget;
        }
    }

    function M_MOANER_reactionVibeWithChat(data) {
        if (M_MOANER_vibratorActive && M_MOANER_scriptOn && M_MOANER_isVibes) {
            //get the moan type to apply
            //data to generate the moans
            var Factor = Math.floor(Player.ArousalSettings.Progress / 20);
            var moan = getMoan(Factor, true, Math.random() * 300);
            var msg = ElementValue("InputChat");
            if (msg != "") {
                moan = msg + "... " + moan;
            }
            ElementValue("InputChat", moan);
            if (this.BabyTalkOn == true) {
                var moan2 = SpeechBabyTalk({
                    Effect: ["RegressedTalk"]
                }, moan);
            } else if (this.GagTalkOn == true) {
                var moan2 = SpeechGarbleByGagLevel(gl, moan);
            } else {
                var moan2 = moan;
            }
            ElementValue("InputChat", moan.replace(moan, moan2));
            if (this.Stutter1On == true) {
                var moan3 = StutterTalk1(moan2);
            } else if (this.Stutter2On == true) {
                var moan3 = StutterTalk2(moan2);
            } else if (this.Stutter3On == true) {
                var moan3 = StutterTalk3(moan2);
            } else if (this.Stutter4On == true) {
                var moan3 = StutterTalk4(moan2);
            } else {
                var moan3 = moan2;
            }
            ElementValue("InputChat", moan2.replace(moan2, moan3));
            ChatRoomSendChat();
        }
    }

    function M_MOANER_reactionVibeWithoutChat(data) {
        if (M_MOANER_vibratorActive && M_MOANER_scriptOn && M_MOANER_isVibes) {
            //get the moan type to apply
            //data to generate the moans
            var Factor = Math.floor(Player.ArousalSettings.Progress / 20);
            var moan = getMoan(Factor, true, Math.random() * 300);
            var msg = ElementValue("InputChat");
            let backtarget = ChatRoomTargetMemberNumber;
            ChatRoomTargetMemberNumber = null;
            ElementValue("InputChat", moan);
            if (this.BabyTalkOn == true) {
                var moan2 = SpeechBabyTalk({
                    Effect: ["RegressedTalk"]
                }, moan);
            } else if (this.GagTalkOn == true) {
                var moan2 = SpeechGarbleByGagLevel(gl, moan);
            } else {
                var moan2 = moan;
            }
            ElementValue("InputChat", moan.replace(moan, moan2));
            if (this.Stutter1On == true) {
                var moan3 = StutterTalk1(moan2);
            } else if (this.Stutter2On == true) {
                var moan3 = StutterTalk2(moan2);
            } else if (this.Stutter3On == true) {
                var moan3 = StutterTalk3(moan2);
            } else if (this.Stutter4On == true) {
                var moan3 = StutterTalk4(moan2);
            } else {
                var moan3 = moan2;
            }
            ElementValue("InputChat", moan2.replace(moan2, moan3));
            ChatRoomSendChat();
            ElementValue("InputChat", msg);
            ChatRoomTargetMemberNumber = backtarget;
        }
    }

    function M_MOANER_isVibes(data) {
        if (Player.ArousalSettings.Progress >= 10) {
            return true;
        }
        /*if (Player.OnlineSettings.LSCG != undefined) {
            if (Player.OnlineSettings.LSCG.InjectorModule.enableHorny == true) {
                if (Player.OnlineSettings.LSCG.InjectorModule.hornyLevel != 0) {
                    let newhorny = Player.OnlineSettings.LSCG.InjectorModule.hornyLevel;
                    if (newhorny > oldhorny) {
                        oldhorny = newhorny;
                        M_MOANER_saveControls();
                        return true;
                    } else {
                        oldhorny = newhorny;
                        M_MOANER_saveControls();
                    }
                }
            }
        }*/
        return false;
    }

    function M_MOANER_applyMoanToMsg(C, CD) {
        //determine the number of moans
        //calculate it according the number of words
        //proportion: PROPORTION_MAX*ArousingLevel
        //PROPORTION_MAX=40%
        var proportion = C.ArousalSettings.Progress * PROPORTION_MAX / 10000;
        M_MOANER_logDebug("proportion: " + proportion);
        var CDList = CD.split(" ");
        var currentIndex = 0;
        var stop = false;
        var finalTextList = [];
        //get the moans to apply
        //data to generate the moans
        var Factor = Math.floor(C.ArousalSettings.Progress / 20);
        while (currentIndex < CDList.length) {
            //if the next word contains a bracket, we stop the repartition of moans
            var currentWord = CDList[currentIndex++];
            var presenceParenthese = M_MOANER_detectParentheses(currentWord);
            if (presenceParenthese == 1) {
                stop = true;
            }
            if (stop) {
                finalTextList.push(currentWord);
            } else {
                let random = Math.ceil(Math.random() * 100)
                let result;
                if (random <= proportion * 100) {
                    if (random % 2 == 0) {
                        result = currentWord + "..." + getMoan(Factor, true, CD.length);
                    } else {
                        result = getMoan(Factor, true, CD.length) + " " + currentWord;
                    }
                    finalTextList.push(result);
                } else {
                    finalTextList.push(currentWord);
                }
            }
            if (presenceParenthese == 2) {
                stop = false;
            }
        }
        return finalTextList.join(" ");
    }

    //return 1 if opening bracket, 2 of closing bracket, 0 otherwise
    function M_MOANER_detectParentheses(CD) {
        if (!CD.includes("(") && !CD.includes(")")) {
            return 0;
        }
        for (i = CD.length; i >= 0; i--) {
            if (CD.charAt(i) == ")") {
                return 2;
            }
            if (CD.charAt(i) == "(") {
                return 1;
            }
        }
        return 0;
    }

    function transformText(isStimulated, L, ArouseFactor, CD) {
        if (isStimulated) {
            return CD.substring(0, L) + CD.charAt(L) + getMoan(ArouseFactor, isStimulated) + CD.substring(L, CD.length);
        } else {
            return CD.substring(0, L) + CD.charAt(L) + "-" + CD.substring(L, CD.length);
        }
    }

    function getMoan(Factor, isStimulated, seed) {
        //M_MOANER_logDebug("getMoan: factor="+Factor);
        //M_MOANER_logDebug("getMoan: isStimulated="+isStimulated);
        if (!isStimulated) return "";
        //select a moan
        return " " + selectMoan(Factor, seed);
    }

    function getSpankMoan(Factor, seed) {
        let gemissement;
        //according level of spanking fetichism
        let activity = getActivityTaste("Spank");
        if (activity == undefined) return "";
        let activityTaste = activity.Self;
        let seuilDouleur = Math.min(10, (4 - activityTaste) * 25);
        let seuilPlaisir = seuilDouleur + 40
        let douleur = Player.ArousalSettings.Progress <= seuilDouleur;
        let plaisir = Player.ArousalSettings.Progress > seuilPlaisir;
        if (douleur) {
            gemissement = getPainMoan();
        } else if (plaisir) {
            gemissement = "\u2665" + getMoan(Factor, true, 300) + "\u2665";
        } else {
            gemissement = getPainMoan() + "\u2665" + getMoan(Factor, true, 300) + "\u2665";
        }
        return gemissement;
    }

    function getTickleMoan(Factor, seed) {
        let gemissement;
        //according level of tickling fetichism
        let activity = getActivityTaste("Tickle");
        if (activity == undefined) return "";
        let activityTaste = activity.Self;
        let seuilDouleur = Math.min(10, (4 - activityTaste) * 25);
        let seuilPlaisir = seuilDouleur + 40
        let douleur = Player.ArousalSettings.Progress <= seuilDouleur;
        let plaisir = Player.ArousalSettings.Progress > seuilPlaisir;
        if (douleur) {
            gemissement = getTickleMoan();
        } else if (plaisir) {
            gemissement = "\u2665" + getMoan(Factor, true, 300) + "\u2665";
        } else {
            gemissement = getTickleMoan() + "\u2665" + getMoan(Factor, true, 300) + "\u2665";
        }
        return gemissement;
    }

    function getZoneTaste(data) {
        let zone;
        let taste;
        for (index in data.Dictionary) {
            var elem = data.Dictionary[index];
            if (elem.Tag == "ActivityGroup") zone = getZone(elem.Text);
        }
        if (zone == undefined || zone == null || zone.Factor == undefined) {
            return undefined;
        }
        taste = zone.Factor;
        if (zone.Orgasm == true) {
            taste *= 2;
        }
        return taste;
    }

    function getZone(name) {
        for (index in Player.ArousalSettings.Activity) {
            var zone = Player.ArousalSettings.Zone[index];
            if (zone.Name == name) return zone;
        }
    }

    function getActivityTaste(name) {
        for (index in Player.ArousalSettings.Activity) {
            var activity = Player.ArousalSettings.Activity[index];
            if (activity.Name == name) return activity;
        }
    }

    function resetMoans(seed) {
        //M_MOANER_logDebug("resetMoans IN");
        factor1Moans = M_MOANER_shuffle(basefactor1Moans.concat([]), seed);
        M_MOANER_factor2Moans = M_MOANER_shuffle(factor1Moans.concat(baseM_MOANER_factor2Moans), seed);
        M_MOANER_factor3Moans = M_MOANER_shuffle(M_MOANER_factor2Moans.concat(baseM_MOANER_factor3Moans), seed);
        M_MOANER_factor4Moans = M_MOANER_shuffle(M_MOANER_factor3Moans.concat(baseM_MOANER_factor4Moans), seed);
        //M_MOANER_logDebug("resetMoans OUT");
    }

    function getPainMoanBACK() {
        let index = Math.floor(Math.random() * basePainMoans.length);
        return basePainMoans[index];
    }

    function getTickleMoanBACK() {
        let index = Math.floor(Math.random() * baseTickleMoans.length);
        return baseTickleMoans[index];
    }

    function resetMoans(seed) {
        //M_MOANER_logDebug("resetMoans IN");
        moanProfile = M_MOANER_getMoans(profileName);
        factor1Moans = M_MOANER_shuffle(moanProfile.low.concat([]), seed);
        M_MOANER_factor2Moans = M_MOANER_shuffle(factor1Moans.concat(moanProfile.light), seed);
        M_MOANER_factor3Moans = M_MOANER_shuffle(M_MOANER_factor2Moans.concat(moanProfile.medium), seed);
        M_MOANER_factor4Moans = M_MOANER_shuffle(M_MOANER_factor3Moans.concat(moanProfile.hot), seed);
        //M_MOANER_logDebug("resetMoans OUT");
    }

    function getPainMoan() {
        moanProfile = M_MOANER_getMoans(profileName);
        let index = Math.floor(Math.random() * moanProfile.pain.length);
        return moanProfile.pain[index];
    }

    function getTickleMoan() {
        moanProfile = M_MOANER_getMoans(profileName);
        let index = Math.floor(Math.random() * moanProfile.tickle.length);
        return moanProfile.tickle[index];
    }

    function getOrgasmMoan() {
        var gemissement;
        if (M_MOANER_orgasmMoans.length == 0) {
            M_MOANER_logDebug("getOrgasmMoan: reset list");
            let seed = 3000;
            M_MOANER_logDebug("getOrgasmMoan: seed=" + seed);
            moanProfile = M_MOANER_getMoans(profileName);
            M_MOANER_orgasmMoans = M_MOANER_shuffle(moanProfile.orgasm.concat([]), seed);
        }
        gemissement = M_MOANER_orgasmMoans.shift();
        return gemissement;
    }

    function selectMoan(Factor, seed) {
        if (Factor < 2) {
            //M_MOANER_logDebug("factor1Moans.length="+factor1Moans.length);
            if (factor1Moans.length <= 0) {
                resetMoans(seed);
                return selectMoan(Factor, seed);
            } else {
                return factor1Moans.shift();
            }
        } else if (Factor < 3) {
            //M_MOANER_logDebug("M_MOANER_factor2Moans.length="+M_MOANER_factor2Moans.length);
            if (M_MOANER_factor2Moans.length <= 0) {
                resetMoans(seed);
                return selectMoan(Factor, seed);
            } else {
                return M_MOANER_factor2Moans.shift();
            }
        } else if (Factor < 4) {
            //M_MOANER_logDebug("M_MOANER_factor3Moans.length="+M_MOANER_factor3Moans.length);
            if (M_MOANER_factor3Moans.length <= 0) {
                resetMoans(seed);
                return selectMoan(Factor, seed);
            } else {
                return M_MOANER_factor3Moans.shift();
            }
        } else if (Factor >= 4) {
            //M_MOANER_logDebug("M_MOANER_factor4Moans.length="+M_MOANER_factor4Moans.length);
            if (M_MOANER_factor4Moans.length <= 0) {
                resetMoans(seed);
                return selectMoan(Factor, seed);
            } else {
                return M_MOANER_factor4Moans.shift();
            }
        }
    }

    function IsStimulated(C) {
        for (let A = 0; A < C.Appearance.length; A++) {
            var Item = C.Appearance[A];
            if (InventoryItemHasEffect(Item, "Vibrating", true)) {
                if (Player.ArousalSettings.Progress >= 10) {
                    return true;
                }
            }
        }
        /*if (Player.OnlineSettings.LSCG != null) {
            if (Player.OnlineSettings.LSCG.InjectorModule.enableHorny == true) {
                if (Player.OnlineSettings.LSCG.InjectorModule.hornyLevel != 0) {
                    let horny = Player.OnlineSettings.LSCG.InjectorModule.hornyLevel;
                    if (horny < 100) {
                        Stutter1On = true;
                        Stutter2On = false;
                        Stutter3On = false;
                        Stutter4On = false;
                        return true;
                    } else if ((horny > 99) && (horny < 200)) {
                        Stutter1On = false;
                        Stutter2On = true;
                        Stutter3On = false;
                        Stutter4On = false;
                        return true;
                    } else if ((horny > 199) && (horny < 300)) {
                        Stutter1On = false;
                        Stutter2On = false;
                        Stutter3On = true;
                        Stutter4On = false;
                        return true;
                    } else if (horny > 299) {
                        Stutter1On = false;
                        Stutter2On = false;
                        Stutter3On = false;
                        Stutter4On = true;
                        return true;
                    }
                } else {
                    Stutter1On = false;
                    Stutter2On = false;
                    Stutter3On = false;
                    Stutter4On = false;
                    return false;
                }
            }
        }*/
        return false;
    }

    //MoanerProfiles
    //dog
    M_MOANER_dogMoans = {
        "hot": ["w... Wouuuf\u2665", "aouuh\u2665"],
        "medium": ["waaaf\u2665", "ky\u016b\u016b\n", "..wouf"],
        "light": ["Ouaff\u2665", "Aouh!", "Oua\u2665af", "Ky\u016bn\u2665"],
        "low": ["wou..", "ouah\u2665", "Wouf\u2665", "\u2665ky\u016bn\u2665", "ky\u016b\u2665"],
        "orgasm": ["ouaf\u2665 O... Ouuw... Ouaaaa!!", "Mmmhnn... aaaa... Ouuuaaaaaf!!", "mmmh... Aouuuh.... Aouhhhh!"],
        "pain": ["Ka\u00ef!", "Aoouch!", "Kaaa\u00ef!", "Ouch", "Aow"],
        "tickle": []
    }
    M_MOANER_addMoansProfile("dog", M_MOANER_dogMoans);

    //fox
    //base: wif, yif, aouh
    //thanks to Noriko
    M_MOANER_foxMoans = {
        "hot": ["w... Wiiif\u2665", "Yiiif\u2665"],
        "medium": ["wiiif\u2665", "Yiii", "..yif"],
        "light": ["Wiff\u2665", "Yif!", "yi\u2665iif", "Wiif"],
        "low": ["wif", "Wy\u2665", "if\u2665", "\u2665yi\u2665", "Yi\u2665"],
        "orgasm": ["Wiff\u2665 W... Wiii... WIIF!!", "Mmmhnn... Wiiif... Yiiiif!!", "mmmh... Aouuuh.... Aouhhhh!"],
        "pain": [],
        "tickle": []
    }
    M_MOANER_addMoansProfile("fox", M_MOANER_foxMoans);

    //mouse
    //base coui
    M_MOANER_mouseMoans = {
        "hot": ["Scouiiic\u2665", "couiiic\u2665"],
        "medium": ["scouiii\u2665", "Couyk", "..scoui"],
        "light": ["Scouii\u2665", "Coui!", "kouu\u2665ic", "Couic \u2665"],
        "low": ["coui..", "scoui\u2665", "cou\u2665i", "Couic ", "koui\u2665"],
        "orgasm": ["Couic\u2665 sc.. couIIIiic!!", "Mmmhnn... ooo... ouiiiic!!", "mmmh... Scouuu.... Scouiiic!"],
        "pain": [],
        "tickle": []
    }
    M_MOANER_addMoansProfile("mouse", M_MOANER_mouseMoans);

    //neko
    M_MOANER_nekoMoans = {
        "hot": ["n... Nyah\u2665", "NYyaaA\u2665"],
        "medium": ["nyAh\u2665", "nyyy", "..yah"],
        "light": ["nyah\u2665", "Yah!", "myuh", "mh\u2665"],
        "low": ["myu", "ny\u2665", "mh", "\u2665yh\u2665", "ny\u2665"],
        "orgasm": ["Nya...Ny...NyaaAAaah!", "Mmmhnn... Nyhmm... Nyah!", "mmmh... mmmeeeee.... meeeoooow!"],
        "pain": [],
        "tickle": []
    }
    M_MOANER_addMoansProfile("neko", M_MOANER_nekoMoans);

    //pig
    M_MOANER_pigMoans = {
        "hot": ["Gruiik\u2665", "gruik\u2665"],
        "medium": ["gruiii\u2665", "Gruik", "..Grui.."],
        "light": ["Grui\u2665", "Gruik!", "gruuiii\u2665ic", "gruik \u2665"],
        "low": ["grui.. gruiik\u2665", "gruiik\u2665", "gru\u2665i", "Gruik ", "Groi\u2665"],
        "orgasm": ["Gru\u2665 gr.. gruiIIIiick!!", "Mmmhnn... uii... gruiiik!!", "mmmh... Gruiik.... Gruiiiiik!"],
        "pain": ["Gruuik!!", "Aoouch!", "Awo... gruik!", "Ouch", "Gruiiik"],
        "tickle": []
    }
    M_MOANER_addMoansProfile("pig", M_MOANER_pigMoans);

    //wildFox
    M_MOANER_wildfoxMoans = {
        "hot": ["w... Wiiif\u2665", "Yiiif\u2665", "Wa\u2665ouu"],
        "medium": ["wiiif\u2665", "Yiii", "..yif", "waouuu"],
        "light": ["Wiff\u2665", "Yif!", "yi\u2665iif", "Wiif", "waou"],
        "low": ["wif", "Wy\u2665", "if\u2665", "\u2665yi\u2665", "Yi\u2665", "aou"],
        "orgasm": ["WAAAAOUUUUUUUHHHHH!", "Mmmhnn... Wiiif... Yiiiif!!", "AOUUUUUH!", "WAHOOOOOOOUUUUH!", "WAAAAAAAAHH!", "WAAAAOUUUUUUUHHHHH!", "AOUUUUUH!", "WAHOOOOOOOUUUUH!", "WAAAAAAAAHH!"],
        "pain": [],
        "tickle": []
    }
    M_MOANER_addMoansProfile("wildfox", M_MOANER_wildfoxMoans);

    //////////////////////////////////////////////////////////
    //BC-Diaper-Wetter
    //////////////////////////////////////////////////////////	

    // A simple table for the colors that the script will use.
    DiaperUseLevels = [
        ["#808080", "#97916A", "#8B8D41"],
        ["#877C6C", "#7E774E"],
        ["#4C3017"]
    ];

    // Table to store all the defaul values for diaperWetter()
    const diaperDefaultValues = {
        messChance: .3,
        wetChance: .5,
        baseTimer: 30,
        regressionLevel: 0,
        desperationLevel: 0,
        messLevelInner: 0,
        wetLevelInner: 0,
        messLevelOuter: 0,
        wetLevelOuter: 0
    };

    diaperLoop = null; // Keeps a hold of the loop so it can be exited at any time easily

    // Initializer function
    function diaperWetter({
        initMessChance = diaperDefaultValues.messChance,
        initWetChance = diaperDefaultValues.wetChance,
        baseTimer = diaperDefaultValues.baseTimer,
        initRegressionLevel = diaperDefaultValues.regressionLevel,
        initDesperationLevel = diaperDefaultValues.desperationLevel,
        initMessLevelInner = diaperDefaultValues.messLevelInner,
        initWetLevelInner = diaperDefaultValues.wetLevelInner,
        initMessLevelOuter = diaperDefaultValues.messLevelOuter,
        initWetLevelOuter = diaperDefaultValues.wetLevelOuter
    } = {}) {

        // Greeting message
        ServerSend("ChatRoomChat", {
            Type: "Action",
            Content: "gag",
            Dictionary: [{
                Tag: "gag",
                Text: "Say hello to the little baby " + tmpname + "!"
            }]
        });

        // Initial clear.
        refreshDiaper({
            cdiaper: "both",
            inMessLevelChastity: (initMessLevelOuter < 0 || initMessLevelOuter > 2) ?
                diaperDefaultValues.messLevelOuter : initMessLevelOuter,
            inWetLevelChastity: (initWetLevelOuter < 0 || initWetLevelOuter > 2) ?
                ((initMessLevelOuter < 0 || initMessLevelOuter > 2) ?
                    diaperDefaultValues.messLevelOuter :
                    inMessLevelOuter
                ) : ((initWetLevelOuter > initMessLevelOuter) ?
                    initWetLevelOuter :
                    ((initMessLevelOuter < 0 || initMessLevelOuter > 2) ?
                        diaperDefaultValues.messLevelOuter :
                        initMessLevelOuter
                    )
                ),
            inMessLevelPanties: (initMessLevelInner < 0 || initMessLevelInner > 2) ?
                diaperDefaultValues.messLevelInner : initMessLevelInner,
            inWetLevelPanties: (initWetLevelInner < 0 || initWetLevelInner > 2) ?
                ((initMessLevelInner < 0 || initMessLevelInner > 2) ?
                    diaperDefaultValues.messLevelInner :
                    initMessLevelOuter
                ) : ((initWetLevelInner > initMessLevelInner) ?
                    initWetLevelInner :
                    ((initMessLevelInner < 0 || initMessLevelInner > 2) ?
                        diaperDefaultValues.messLevelInner :
                        initMessLevelInner
                    )
                ),
        });
        messChance = initMessChance;
        wetChance = initWetChance;
        diaperTimerBase = baseTimer; // The default amount of time between ticks in minutes
        regressionLevel = initRegressionLevel; // Used for tracking how much the user has regressed (affects the timer)
        desperationLevel = initDesperationLevel; // Used for tracking how recently a milk bottle has been used (affects the timer)

        // Handle modifiers
        var diaperTimerModifier = 1; // We will divide by the modifier (positive modifiers decrease the timer)
        diaperTimerModifier = manageRegression(diaperTimerModifier);
        diaperTimerModifier = manageDesperation(diaperTimerModifier);
        diaperTimer = diaperTimerBase / diaperTimerModifier;

        // Go into main loop
        diaperRunning = true; // Helps with the kill switch
        checkTick();
    }

    // Changes how long it takes between ticks (in minutes)
    function changeDiaperTimer(delay) {
        // Bound the delay to between 2 minutes and 1 hour
        if (delay < 2) {
            delay = 2;
        } else if (delay > 60) {
            delay = 60;
        }
        diaperTimerBase = delay; // Updates diaperTimerBase
    }

    // Refresh the diaper settings so wet and mess levels are 0. Pass "chastity", "panties", or "both" so only the correct diaper gets reset.
    function refreshDiaper({
        cdiaper = "both",
        inWetLevelPanties = diaperDefaultValues.wetLevelInner,
        inMessLevelPanties = diaperDefaultValues.messLevelInner,
        inWetLevelChastity = diaperDefaultValues.wetLevelOuter,
        inMessLevelChastity = diaperDefaultValues.messLevelOuter,
    } = {}) {
        DiaperChangeMessages = {
            "ChangeDiaperInner": " has gotten a fresh inner diaper.",
            "ChangeDiaperOuter": " has gotten a fresh outer diaper.",
            "ChangeDiaperOnly": " has gotten a fresh diaper.",
            "ChangeDiaperBoth": " has gotten a fresh pair of diapers."
        };
        if (cdiaper === "both") {
            MessLevelPanties = inMessLevelPanties;
            WetLevelPanties = inWetLevelPanties;
            MessLevelChastity = inMessLevelChastity;
            WetLevelChastity = inWetLevelChastity;
            changeDiaperColor("ItemPelvis");
            changeDiaperColor("Panties");
            if (checkForDiaper("Panties") && checkForDiaper("ItemPelvis")) {
                ServerSend("ChatRoomChat", {
                    Type: "Action",
                    Content: "gag",
                    Dictionary: [{
                        Tag: "gag",
                        Text: tmpname + DiaperChangeMessages["ChangeDiaperBoth"]
                    }]
                });
            } else if ((checkForDiaper("Panties") && !checkForDiaper("ItemPelvis")) || (checkForDiaper("ItemPelvis") && !checkForDiaper("Panties"))) {
                ServerSend("ChatRoomChat", {
                    Type: "Action",
                    Content: "gag",
                    Dictionary: [{
                        Tag: "gag",
                        Text: tmpname + DiaperChangeMessages["ChangeDiaperOnly"]
                    }]
                });
            }
        } else if (cdiaper === "chastity") {
            MessLevelChastity = inMessLevelChastity;
            WetLevelChastity = inWetLevelChastity;
            changeDiaperColor("ItemPelvis");
            if (checkForDiaper("ItemPelvis") && checkForDiaper("Panties")) {
                ServerSend("ChatRoomChat", {
                    Type: "Action",
                    Content: "gag",
                    Dictionary: [{
                        Tag: "gag",
                        Text: tmpname + DiaperChangeMessages["ChangeDiaperOuter"]
                    }]
                });
            } else if (checkForDiaper("ItemPelvis") && !checkForDiaper("Panties")) {
                ServerSend("ChatRoomChat", {
                    Type: "Action",
                    Content: "gag",
                    Dictionary: [{
                        Tag: "gag",
                        Text: tmpname + DiaperChangeMessages["ChangeDiaperOnly"]
                    }]
                });
            }
        } else if (cdiaper === "panties") {
            MessLevelPanties = inMessLevelPanties;
            WetLevelPanties = inWetLevelPanties;
            changeDiaperColor("Panties");
            if (checkForDiaper("ItemPelvis") && checkForDiaper("Panties")) {
                ServerSend("ChatRoomChat", {
                    Type: "Action",
                    Content: "gag",
                    Dictionary: [{
                        Tag: "gag",
                        Text: tmpname + DiaperChangeMessages["ChangeDiaperOuter"]
                    }]
                });
            } else if (checkForDiaper("Panties") && !checkForDiaper("ItemPelvis")) {
                ServerSend("ChatRoomChat", {
                    Type: "Action",
                    Content: "gag",
                    Dictionary: [{
                        Tag: "gag",
                        Text: tmpname + DiaperChangeMessages["ChangeDiaperOnly"]
                    }]
                });
            }
        }
    }

    // Check for if a diaper is in the Panties or ItemPelvies slot
    function checkForDiaper(slot) {
        return InventoryGet(Player, slot)?.Asset?.Name === "PoofyDiaper" || InventoryGet(Player, slot)?.Asset?.Name === "BulkyDiaper";
    }

    // Checks to see if the user has a nursery milk equiped
    function checkForNurseryMilk() {
        return (InventoryGet(Player, "ItemMouth")?.Asset?.Name === "RegressedMilk") || (InventoryGet(Player, "ItemMouth2")?.Asset?.Name === "RegressedMilk") || (InventoryGet(Player, "ItemMouth3")?.Asset?.Name === "RegressedMilk");
    }

    // Checks for a normal milk bottle
    function checkForMilk() {
        return (InventoryGet(Player, "ItemMouth")?.Asset?.Name === "MilkBottle");
    }

    // Handles the regression counter
    function manageRegression(diaperTimerModifier = 1) {
        if (checkForNurseryMilk() && regressionLevel < 3) {
            regressionLevel++;
        } else if (!checkForNurseryMilk() && regressionLevel > 0) {
            regressionLevel--;
        }
        return diaperTimerModifier * Math.pow(2, regressionLevel);
    }

    // Handles "desperateness" aka how recently a milk bottle was drunk
    function manageDesperation(diaperTimerModifier = 1) {
	// If they have a milk bottle
        if (checkForMilk()) {
            desperationLevel = 3;
        }
        // If they don't have a milk bottle anymore
        if (!checkForMilk()) {
            // Decrease desperationLevel to a minimum of zero if no milk is found
            desperationLevel = (desperationLevel != 0) ? desperationLevel - 1 : 0;
        }
        return diaperTimerModifier * (desperationLevel + 1);
    }

    // Updates the color of a diaper
    function changeDiaperColor(slot) {
        if (slot === "ItemPelvis" && checkForDiaper(slot)) {
            InventoryWear(
                Player,
                InventoryGet(Player, slot)?.Asset?.Name,
                slot,
                [
                    InventoryGet(Player, slot)?.Color[0],
                    DiaperUseLevels[MessLevelChastity][WetLevelChastity - MessLevelChastity],
                    InventoryGet(Player, slot)?.Color[2],
                    InventoryGet(Player, slot)?.Color[3]
                ],
                InventoryGet(Player, slot)?.Difficulty,
                Player.MemberNumber
            );
        } else if (slot === "Panties" && checkForDiaper(slot)) {
            InventoryWear(
                Player,
                InventoryGet(Player, slot)?.Asset?.Name,
                slot,
                [
                    InventoryGet(Player, slot)?.Color[0],
                    DiaperUseLevels[MessLevelPanties][WetLevelPanties - MessLevelPanties],
                    InventoryGet(Player, slot)?.Color[2],
                    InventoryGet(Player, slot)?.Color[3]
                ],
                InventoryGet(Player, slot)?.Difficulty,
                Player.MemberNumber
            );
        }
    }

    // Command to stop the script from running
    function stopWetting() {
	console.log("See you next time!");
        diaperRunning = false;
        clearTimeout(diaperLoop);
        checkTick();
    }

    // Funcky while loop
    function checkTick() {
        // Terminate loop if the user isn't wearing a compatible diaper
        if ((checkForDiaper("ItemPelvis") || checkForDiaper("Panties")) && diaperRunning === true) {
            // Wait for a bit
            diaperLoop = setTimeout(checkTick, diaperTimer * 60 * 1000);
            // Go to main logic
            diaperTick();
        } else {
            diaperRunning = false;
            ServerSend("ChatRoomChat", {
                Type: "Action",
                Content: "gag",
                Dictionary: [{
                    Tag: "gag",
                    Text: "Awww, " + tmpname + " is all grown up!"
                }]
            });
        }
    }

    // Body function
    // If the baby uses their diaper, it will make the front of their diaper look like it's been used
    function diaperTick() {
        // Handle modifiers 
        DiaperUseMessages = {
            "MessInner": " has messed " + pronoun3 + " inner diaper.",
            "MessInnerFully": " has fully messed " + pronoun3 + " inner diaper.",
            "WetInner": " has wet " + pronoun3 + " inner diaper.",
            "WetInnerFully": " has fully wet " + pronoun3 + " inner diaper.",
            "MessOuter": " has messed " + pronoun3 + " outer diaper.",
            "MessOuterFully": " has fully messed " + pronoun3 + " outer diaper.",
            "WetOuter": " has wet " + pronoun3 + " outer diaper.",
            "WetOuterFully": " has fully wet " + pronoun3 + " outer diaper.",
            "MessOnly": " has messed " + pronoun3 + " diaper.",
            "MessOnlyFully": " has fully messed " + pronoun3 + " diaper.",
            "WetOnly": " has wet " + pronoun3 + " diaper.",
            "WetOnlyFully": " has fully " + pronoun3 + " her diaper."
        };
        var diaperTimerModifier = 1; // We will divide by the modifier (positive modifiers decrease the timer)
        diaperTimerModifier = manageRegression(diaperTimerModifier);
        diaperTimerModifier = manageDesperation(diaperTimerModifier);
        diaperTimer = diaperTimerBase / diaperTimerModifier;
        testMess = Math.random();
        // If the baby messes, increment the mess level to a max of 2 and make sure that the wet level is at least as high as the mess level.
        if (testMess > 1 - messChance) {
            if (MessLevelPanties === 2 || !checkForDiaper("Panties")) {
                MessLevelChastity = (MessLevelChastity < 2) ? MessLevelChastity + 1 : MessLevelChastity;
                WetLevelChastity = (WetLevelChastity < MessLevelChastity) ? MessLevelChastity : WetLevelChastity;
            } else if (checkForDiaper("Panties")) {
                MessLevelPanties = MessLevelPanties + 1;
                WetLevelPanties = (WetLevelPanties < MessLevelPanties) ? MessLevelPanties : WetLevelPanties;
            }
            // Display messages for when a diaper is messed.
            if ((MessLevelPanties === 2 && checkForDiaper("Panties") && !checkForDiaper("ItemPelvis")) || (MessLevelChastity === 2 && checkForDiaper("ItemPelvis") && !checkForDiaper("Panties"))) {
                ServerSend("ChatRoomChat", {
                    Type: "Action",
                    Content: "gag",
                    Dictionary: [{
                        Tag: "gag",
                        Text: tmpname + DiaperUseMessages["MessOnlyFully"]
                    }]
                });
            } else if ((checkForDiaper("Panties") && !checkForDiaper("ItemPelvis")) || (checkForDiaper("ItemPelvis") && !checkForDiaper("Panties"))) {
                ServerSend("ChatRoomChat", {
                    Type: "Action",
                    Content: "gag",
                    Dictionary: [{
                        Tag: "gag",
                        Text: tmpname + DiaperUseMessages["MessOnly"]
                    }]
                });
            } else if (MessLevelChastity === 0) {
                if (MessLevelPanties === 2) {
                    ServerSend("ChatRoomChat", {
                        Type: "Action",
                        Content: "gag",
                        Dictionary: [{
                            Tag: "gag",
                            Text: tmpname + DiaperUseMessages["MessInnerFully"]
                        }]
                    });
                } else if (MessLevelPanties === 1) {
                    ServerSend("ChatRoomChat", {
                        Type: "Action",
                        Content: "gag",
                        Dictionary: [{
                            Tag: "gag",
                            Text: tmpname + DiaperUseMessages["MessInner"]
                        }]
                    });
                }
            } else if (MessLevelChastity === 1) {
                ServerSend("ChatRoomChat", {
                    Type: "Action",
                    Content: "gag",
                    Dictionary: [{
                        Tag: "gag",
                        Text: tmpname + DiaperUseMessages["MessOuter"]
                    }]
                });
            } else if (MessLevelChastity === 2) {
                ServerSend("ChatRoomChat", {
                    Type: "Action",
                    Content: "gag",
                    Dictionary: [{
                        Tag: "gag",
                        Text: tmpname + DiaperUseMessages["MessOuterFully"]
                    }]
                });
            }
        }
        // If the baby only wets, increment the wet level to a max of 2.
        else if (testMess > 1 - wetChance) {
            if (WetLevelPanties == 2 && (InventoryGet(Player, "Panties") !== "PoofyDiaper" && InventoryGet(Player, "Panties") !== "BulkyDiaper")) {
                WetLevelChastity = (WetLevelChastity < 2) ? WetLevelChastity + 1 : WetLevelChastity;
            } else {
                WetLevelPanties = WetLevelPanties + 1;
            }
            // Display messages for when a diaper is wet.
            if ((WetLevelPanties === 2 && checkForDiaper("Panties") && !checkForDiaper("ItemPelvis")) || (WetLevelChastity === 2 && checkForDiaper("ItemPelvis") && !checkForDiaper("Panties"))) {
                ServerSend("ChatRoomChat", {
                    Type: "Action",
                    Content: "gag",
                    Dictionary: [{
                        Tag: "gag",
                        Text: tmpname + DiaperUseMessages["MessOnlyFully"]
                    }]
                });
            } else if ((checkForDiaper("Panties") && !checkForDiaper("ItemPelvis")) || (checkForDiaper("ItemPelvis") && !checkForDiaper("Panties"))) {
                ServerSend("ChatRoomChat", {
                    Type: "Action",
                    Content: "gag",
                    Dictionary: [{
                        Tag: "gag",
                        Text: tmpname + DiaperUseMessages["WetOnly"]
                    }]
                });
            } else if (WetLevelChastity === 0) {
                if (WetLevelPanties === 2) {
                    ServerSend("ChatRoomChat", {
                        Type: "Action",
                        Content: "gag",
                        Dictionary: [{
                            Tag: "gag",
                            Text: tmpname + DiaperUseMessages["WetInnerFully"]
                        }]
                    });
                } else if (WetLevelPanties === 1) {
                    ServerSend("ChatRoomChat", {
                        Type: "Action",
                        Content: "gag",
                        Dictionary: [{
                            Tag: "gag",
                            Text: tmpname + DiaperUseMessages["WetInner"]
                        }]
                    });
                }
            } else if (WetLevelChastity === 1) {
                ServerSend("ChatRoomChat", {
                    Type: "Action",
                    Content: "gag",
                    Dictionary: [{
                        Tag: "gag",
                        Text: tmpname + DiaperUseMessages["WetOuter"]
                    }]
                });
            } else if (WetLevelChastity === 2) {
                ServerSend("ChatRoomChat", {
                    Type: "Action",
                    Content: "gag",
                    Dictionary: [{
                        Tag: "gag",
                        Text: tmpname + DiaperUseMessages["WetOuterFully"]
                    }]
                });
            }
        }
        // Don't update the color when it's not needed.
        else {
            return;
        }
        // Update color based on the DiaperUseLevels table.
        changeDiaperColor("ItemPelvis");
        changeDiaperColor("Panties");
        ChatRoomCharacterUpdate(Player);
    }

    ///////////////////////////////////////////////////////////////				
    //Commands

    CommandCombine([{
        Tag: 'asylum',
        Description: "(minutes): enters asylum, bypasses requirements.",
        Action: (args) => {
            if ((args === "") && (ReputationGet("Asylum") < 0)) {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: You must specify minutes if you are a patient.</p>"
                );
            } else {
                var minutes = args;
                ChatRoomSetLastChatRoom("");
                ServerSend("ChatRoomLeave", "");
                OnlineGameName = "";
                CommonSetScreen("Room", "AsylumEntrance");
                ChatRoomClearAllElements();
                AsylumEntranceIsWearingNurseClothes = function() {
                    return true
                };
                if (ReputationGet("Asylum") < 0) {
                    LogAdd("Committed", "Asylum", CurrentTime + 60000 * minutes);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'autokick',
        Description: ": toggles on auto kick for 0 day old accounts.",
        Action: () => {
            if (this.AutoKickOn == false || this.AutoKickOn == undefined) {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: AutoKick Ready.</p>"
                );
                AutoKickOn = true;
                AutoKicker = function(data, days = 1, hours = 12, minutes = 0) {
                    minutes *= 60000;
                    hours *= 3600000;
                    days *= 86400000;
                    let character = ChatRoomCharacter.find((c) => c.MemberNumber === data.Sender);
                    if (data.Content == "ServerEnter" && character.Creation > CurrentTime - days - hours - minutes) {
                        ServerSend("ChatRoomAdmin", {
                            MemberNumber: character.MemberNumber,
                            Action: "Ban"
                        });
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "AutoKick: Account was 0 days old."
                            }]
                        });
                    };
                };
                ServerSocket.on("ChatRoomMessage", AutoKicker);
            } else {
                AutoKickOn = false;
                ServerSocket.off("ChatRoomMessage", AutoKicker);
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: AutoKick Disabled.</p>"
                );
            }
        }
    }])

    CommandCombine([{
        Tag: 'bg1',
        Description: ": adds hidden backgrounds to the selection screen.",
        Action: () => {          
            BackgroundsList.push({
                Name: "HypnoSpiral2",
                Tag: [BackgroundsTagIndoor]
            });
            BackgroundsList.push({
                Name: "HypnoticSpiral",
                Tag: [BackgroundsTagIndoor]
            });
            if (!window.BCX_Loaded == true) {
                BackgroundsList.push({
                    Name: "AmandaCollarIntro",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "AmandaIntro",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "AsylumBedroom",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "AsylumEntrance",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "AsylumGGTSRoom",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "AsylumGGTSRoomAlert",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "AsylumMeeting",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "AsylumTherapy",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Bar",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "BrickWall",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Cell",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "ClubCardLounge",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "ClubCardPlayBoard1",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "CollegeCafeteria",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "CollegeClass2",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "CollegeDetention",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "CollegeEntrance",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "CollegeTeacherLounge",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "CollegeTennisPlay",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "CraftingWorkshop",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Dressing",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Gambling",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "grey",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "HorseStableLight",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Magic",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "MagicSchoolEscape",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "MagicSchoolLaboratory",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "/Orig/Entrance",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "/Orig/Lounge",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "OutsideCells",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "PaddedCell",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "PaddedCell2",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Ground/Entrance",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Second/Cell0",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Second/Cell1",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Second/Cell2",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Second/Cell3",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Second/Cell4",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Second/Cell5",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Second/Cell6",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Second/Entrance",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Second/Fork0",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Second/Fork1",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Second/Fork2",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Second/Fork3",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Second/Fork4",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Second/Fork5",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Second/Fork6",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Second/Rest0",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Second/Tunnel0",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Second/Tunnel1",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Second/Tunnel2",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Second/Tunnel3",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Second/Tunnel4",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Second/Tunnel5",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Second/Tunnel6",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Underground/Cell0",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Underground/Cell1",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Underground/Cell2",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Underground/Cell3",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Underground/Cell4",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Underground/Cell5",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Underground/Cell6",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Underground/Entrance",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Underground/Fork0",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Underground/Fork1",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Underground/Fork2",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Underground/Fork3",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Underground/Fork4",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Underground/Fork5",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Underground/Fork6",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Underground/Rest0",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Underground/Tunnel0",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Underground/Tunnel1",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Underground/Tunnel2",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Underground/Tunnel3",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Underground/Tunnel4",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Underground/Tunnel5",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Pandora/Underground/Tunnel6",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Prison",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "RhythmGame",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "RhythmGameLoading",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "SarahBedroom0",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "SarahBedroom1",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "SarahBedroom2",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "SarahBedroom3",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "SarahIntro",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Sheet",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "SheetWhite",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "Shop",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "SlaveMarket",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "SophieIntro",
                    Tag: [BackgroundsTagIndoor]
                });
                BackgroundsList.push({
                    Name: "White",
                    Tag: [BackgroundsTagIndoor]
                });
            }
            ChatCreateBackgroundList = BackgroundsGenerateList(BackgroundsTagList);
            ChatRoomSendLocal(
                "<p style='background-color:#5fbd7a'>ULTRAbc: You can use more standard backgrounds now.</p>"
            );
        }
    }])

    CommandCombine([{
        Tag: 'bg2',
        Description: "(number): uses a Bondage Brawl background as standard background.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The bg2 command must be followed by a number. List of Bondage Brawl backgrounds:\n" +
                    "1, 2 Balcony - 3 Ballroom - 4 to 12 Bandit Camp\n" +
                    "13 to 15 Barn - 16 to 18 Bathroom Olivia\n" +
                    "19 Bedroom Dungeon - 20 Bedroom Edward\n" +
                    "21, 22 Bedroom Isabella - 23 Bedroom Melody\n" +
                    "24 to 26 Bedroom Olivia - 27 to 32 Birch\n" +
                    "33 Black - 34 to 36 Camp Ground\n" +
                    "37 to 39 Castle - 40, 41 Clearing\n" +
                    "42 to 44 College - 45 to 47 Countess Hall\n" +
		    "48 Desert - 49, 50 Dungeon - 51, 52 Dungeon Cell\n" +
                    "53 to 55 Dungeon Storage - 56 Forest\n" +
                    "57 to 60 Forest Cabin - 61 Gas - 62 Green Plain\n" +
                    "63 to 73 Hall (1 to 4) - 74 to 79 Lake - 80 Maid Bed\n" +
                    "81 Mountain Path - 82, 83 Oak\n" +
                    "84 to 88 Plain - 89 Pond - 90, 91 Savannah\n" +
                    "92 to 94 Tent - 95, 96 Terrace\n" +
                    "97 Vulture Plain - 98, 99 Wine Cell</p>"
                );
            } else if (args == 1) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Balcony';
                updateBackground();
            } else if (args == 2) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/Balcony';
                updateBackground();
            } else if (args == 3) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Ballroom';
                updateBackground();
            } else if (args == 4) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Savannah/BanditCampClosed';
                updateBackground();
            } else if (args == 5) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Savannah/BanditCampGateClosed';
                updateBackground();
            } else if (args == 6) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Savannah/BanditCampGateOpen';
                updateBackground();
            } else if (args == 7) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Savannah/BanditCampOpen';
                updateBackground();
            } else if (args == 8) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Savannah/BanditPath';
                updateBackground();
            } else if (args == 9) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/BanditCamp';
                updateBackground();
            } else if (args == 10) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/BanditCampGateGround';
                updateBackground();
            } else if (args == 11) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/BanditCampGateOpen';
                updateBackground();
            } else if (args == 12) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/BanditCampGround';
                updateBackground();
            } else if (args == 13) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/BarnExterior';
                updateBackground();
            } else if (args == 14) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/BarnInterior';
                updateBackground();
            } else if (args == 15) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/BarnInterior';
                updateBackground();
            } else if (args == 16) {
                ChatCreateBackgroundSelect = '../Screens/Room//Platform/Background/Castle/Orig/BathroomOlivia';
                updateBackground();
            } else if (args == 17) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/BathroomOlivia';
                updateBackground();
            } else if (args == 18) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/BathroomOlivia';
                updateBackground();
            } else if (args == 19) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/BedroomDungeon';
                updateBackground();
            } else if (args == 20) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/BedroomEdward';
                updateBackground();
            } else if (args == 21) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/BedroomIsabella';
                updateBackground();
            } else if (args == 22) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/BedroomIsabella';
                updateBackground();
            } else if (args == 23) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/BedroomMelody';
                updateBackground();
            } else if (args == 24) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/BedroomOlivia';
                updateBackground();
            } else if (args == 25) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/BedroomOlivia';
                updateBackground();
            } else if (args == 26) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/BedroomOliviaDark';
                updateBackground();
            } else if (args == 27) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/BirchClear';
                updateBackground();
            } else if (args == 28) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/BirchHeavy';
                updateBackground();
            } else if (args == 29) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/BirchLight';
                updateBackground();
            } else if (args == 30) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/ForestBirchLight';
                updateBackground();
            } else if (args == 31) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/BirchMaze';
                updateBackground();
            } else if (args == 32) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/ForestMaze';
                updateBackground();
            } else if (args == 33) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/Black';
                updateBackground();
            } else if (args == 34) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/CampGround';
                updateBackground();
            } else if (args == 35) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/CampGround';
                updateBackground();
            } else if (args == 36) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/CampGroundRaft';
                updateBackground();
            } else if (args == 37) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/Orig/CastleEntrance';
                updateBackground();
            } else if (args == 38) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/CastleHall';
                updateBackground();
            } else if (args == 39) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/CastleWall';
                updateBackground();
            } else if (args == 40) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/SecludedClearing';
                updateBackground();
            } else if (args == 41) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/SecludedClearing';
                updateBackground();
            } else if (args == 42) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/College/CollegeArt1';
                updateBackground();
            } else if (args == 43) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/College/CollegeClass1';
                updateBackground();
            } else if (args == 44) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/College/CollegeHall1';
                updateBackground();
            } else if (args == 45) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/CountessHall';
                updateBackground();
            } else if (args == 46) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/CountessHall';
                updateBackground();
            } else if (args == 47) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/CountessHallDeadEnd';
                updateBackground();
	    } else if (args == 48) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/DesertEntrance';
                updateBackground();
            } else if (args == 49) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Dungeon1C';
                updateBackground();
            } else if (args == 50) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Dungeon1W';
                updateBackground();
            } else if (args == 51) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/DungeonCell';
                updateBackground();
            } else if (args == 52) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/DungeonCell';
                updateBackground();
            } else if (args == 53) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/DungeonStorage';
                updateBackground();
            } else if (args == 54) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/DungeonStorage';
                updateBackground();
            } else if (args == 55) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/DungeonStorageDark';
                updateBackground();
            } else if (args == 56) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/FirLight';
                updateBackground();
            } else if (args == 57) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/CabinInterior';
                updateBackground();
            } else if (args == 58) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/CabinPath';
                updateBackground();
            } else if (args == 59) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/ForestCabinInterior';
                updateBackground();
            } else if (args == 60) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/Orig/WoodCabin';
                updateBackground();
            } else if (args == 61) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/Gas';
                updateBackground();
            } else if (args == 62) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/Orig/GreenPlain';
                updateBackground();
            } else if (args == 63) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Hall1C';
                updateBackground();
            } else if (args == 64) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Hall1W';
                updateBackground();
            } else if (args == 65) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Hall2C';
                updateBackground();
            } else if (args == 66) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Hall3C';
                updateBackground();
            } else if (args == 67) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Hall3Cv2';
                updateBackground();
            } else if (args == 68) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Hall3E';
                updateBackground();
            } else if (args == 69) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Hall3W';
                updateBackground();
            } else if (args == 70) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Hall4C';
                updateBackground();
            } else if (args == 71) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Hall4E';
                updateBackground();
            } else if (args == 72) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Hall4W1';
                updateBackground();
            } else if (args == 73) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Hall4W2';
                updateBackground();
            } else if (args == 74) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/LakeBetweenRocks';
                updateBackground();
            } else if (args == 75) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/LakeRaft';
                updateBackground();
            } else if (args == 76) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/LakeShore';
                updateBackground();
            } else if (args == 77) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/LakeShoreRaft';
                updateBackground();
            } else if (args == 78) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/MountainLake';
                updateBackground();
            } else if (args == 79) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/Water';
                updateBackground();
            } else if (args == 80) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/MaidBed';
                updateBackground();
            } else if (args == 81) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/Orig/MountainPath';
                updateBackground();
            } else if (args == 82) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/OakHeavy';
                updateBackground();
            } else if (args == 83) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/OakHeavy';
                updateBackground();
            } else if (args == 84) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/PlainDistantLake';
                updateBackground();
            } else if (args == 85) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/PlainSparseRocks';
                updateBackground();
            } else if (args == 86) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/PlainToForest';
                updateBackground();
            } else if (args == 87) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/PlainToSavannah';
                updateBackground();
            } else if (args == 88) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/PlainWoodPath';
                updateBackground();
            } else if (args == 89) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/LostPond';
                updateBackground();
            } else if (args == 90) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/Orig/Savannah';
                updateBackground();
            } else if (args == 91) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/Savannah';
                updateBackground();
            } else if (args == 92) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Savannah/TentExterior';
                updateBackground();
            } else if (args == 93) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Savannah/TentInterior';
                updateBackground();
            } else if (args == 94) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/SavannahTentInterior';
                updateBackground();
            } else if (args == 95) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Terrace';
                updateBackground();
            } else if (args == 96) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/Terrace';
                updateBackground();
            } else if (args == 97) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/Orig/VulturePlain';
                updateBackground();
            } else if (args == 98) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/WineCellar';
                updateBackground();
            } else if (args == 99) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/WineCellar';
                updateBackground();
            }
        }
    }])

    CommandCombine([{
        Tag: 'bg3',
        Description: "(number): uses a Bondage College background as custom background.",
        Action: (args) => {
            var BCver = GameVersion;
            if (BCver.includes("Beta")) {
               if (BCver.startsWith("R10")) {
                   var beta1 = BCver.slice(0,4);
                   var beta2 = beta1.slice(-3);
               } else {
                   var beta1 = BCver.slice(0,3);
                   var beta2 = beta1.slice(-2);
               }
               var beta3 = beta2 - 1;
               var BCver = "R" + beta3;
            }
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The bg3 command must be followed by a number. List of Bondage College backgrounds:\n" +
                    "1 Art Class - 2, 3 Class - 4 Club\n" +
                    "5 College - 6 Dorm\n" +
                    "7 Dressing Room - 8 Gym Class\n" +
                    "9 to 12 Isolation Room\n" +
                    "13 to 16 Kinbaku Club\n" +
                    "17 to 26 Library\n" +
                    "27, 28 Lockers - 29 Running Track\n" +
                    "30, 31 Showers - 32 Theater</p>"
                );
            } else if (args == 1) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C004_ArtClass/Intro/Background.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 2) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C001_BeforeClass/Intro/Background2.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 3) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C999_Common/Quiz/Backgrounds/Classroom.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 4) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C013_BondageClub/Intro/Background.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 5) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C000_Intro/Intro/Background.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 6) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C012_AfterClass/Intro/Background.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 7) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C008_DramaClass/DressingRoom/Background.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 8) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C005_GymClass/Intro/Background.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 9) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C006_Isolation/Intro/Background.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 10) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C006_Isolation/IsolationRoom/C006_CutRope_3_0.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 11) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C006_Isolation/IsolationRoom/C006_CutRope_3_1.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 12) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C006_Isolation/IsolationRoom/C006_CutRope_3_2.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 13) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C101_KinbakuClub/ClubRoom1/ClubRoom1Arrows.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 14) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C101_KinbakuClub/ClubRoom2/ClubRoom2Arrows.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 15) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C101_KinbakuClub/ClubRoom3/ClubRoom3Arrows.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 16) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C101_KinbakuClub/ClubRoom4/ClubRoom4.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 17) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C009_Library/Library/001.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 18) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C009_Library/Library/002.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 19) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C009_Library/Library/003.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 20) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C009_Library/Library/004.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 21) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C009_Library/Library/005.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 22) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C009_Library/Library/006.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 23) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C009_Library/Library/007.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 24) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C009_Library/Library/008.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 25) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C009_Library/Library/009.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 26) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C009_Library/Library/010.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 27) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C010_Revenge/Intro/BackgroundAmandaSarah.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 28) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C010_Revenge/Intro/BackgroundSidneyJennifer.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 29) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C999_Common/Fights/Backgrounds/RunningTrack.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 30) {
                Background = "https://gitgud.io/BondageProjects/Bondage-College/-/raw/master/Backgrounds/Shower1.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 31) {
                Background = "https://gitgud.io/BondageProjects/Bondage-College/-/raw/master/Backgrounds/Shower2.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            } else if (args == 32) {
                Background = "https://www.bondage-europe.com/" + BCver + "/C008_DramaClass/Theater/Background.jpg";
                ChatAdminRoomCustomizationCommand("Image", Background);
            }
        }
    }])

    CommandCombine([{
        Tag: 'bio',
        Description: "(target): gives direct access to the profile description of any player in the chat room.",
        Action: (args) => {
            if (args === "") {
                InformationSheetLoadCharacter(Player);
                OnlineProfileRun();
                document.getElementById("InputChat").style.display = "none";
                document.getElementById("TextAreaChatLog").style.display = "none";
                CommonSetScreen("Character", "OnlineProfile");
            } else {
                var targetname = args;
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if (target[0] != null) {
                    InformationSheetLoadCharacter(target[0]);
                    OnlineProfileRun();
                    document.getElementById("InputChat").style.display = "none";
                    document.getElementById("TextAreaChatLog").style.display = "none";
                    CommonSetScreen("Character", "OnlineProfile");
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'blur',
        Description: "(level): forces a specific blur level.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The blur command must be followed by a number between 0 and 4.\n" +
                    " \n" +
                    "Available blur levels:\n" +
                    "0 no blur effect\n" +
                    "1 light blur effect\n" +
                    "2 normal blur effect\n" +
                    "3 heavy blur effect\n" +
                    "4 total blur effect</p>"
                );
            } else {
                var brlevel = args;
                if (brlevel == 0) {
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: No more forced blur effect.</p>"
                    );
                    blureffect = false;
                    Blur1On = false;
                    Blur2On = false;
                    Blur3On = false;
                    Blur4On = false;
                    M_MOANER_saveControls();
                } else if (brlevel == 1) {
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: Light blur effect enabled.</p>"
                    );
                    blureffect = true;
                    Blur1On = true;
                    Blur2On = false;
                    Blur3On = false;
                    Blur4On = false;
                    M_MOANER_saveControls();
                } else if (brlevel == 2) {
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: Normal blur effect enabled.</p>"
                    );
                    blureffect = true;
                    Blur1On = false;
                    Blur2On = true;
                    Blur3On = false;
                    Blur4On = false;
                    M_MOANER_saveControls();
                } else if (brlevel == 3) {
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: Heavy blur effect enabled.</p>"
                    );
                    blureffect = true;
                    Blur1On = false;
                    Blur2On = false;
                    Blur3On = true;
                    Blur4On = false;
                    M_MOANER_saveControls();
                } else if (brlevel == 4) {
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: Total blur effect enabled.</p>"
                    );
                    blureffect = true;
                    Blur1On = false;
                    Blur2On = false;
                    Blur3On = false;
                    Blur4On = true;
                    M_MOANER_saveControls();
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'boost',
        Description: ": boosts all your skills for one hour.",
        Action: () => {
            SkillSetModifier(Player, "Bondage", +5, 3600000);
            SkillSetModifier(Player, "Dressage", +5, 3600000);
            SkillSetModifier(Player, "Evasion", +5, 3600000);
            SkillSetModifier(Player, "Infiltration", +5, 3600000);
            SkillSetModifier(Player, "LockPicking", +5, 3600000);
            SkillSetModifier(Player, "SelfBondage", +5, 3600000);
            SkillSetModifier(Player, "Willpower", +5, 3600000);
            ChatRoomSendLocal(
                "<p style='background-color:#5fbd7a'>ULTRAbc: You feel all your skills boosted. Changes can be seen in information panel.</p>"
            );
        }
    }])

    CommandCombine([{
        Tag: 'btalk',
        Description: "(words): speaks once as a baby.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The btalk command must be followed by the words you want to say.</p>"
                );
            } else {
                content = SpeechBabyTalk({
                    Effect: ["RegressedTalk"]
                }, args);
                ServerSend("ChatRoomChat", {
                    "Content": content,
                    "Type": "Chat"
                });
            }
        }
    }])

    CommandCombine([{
        Tag: 'carddesk',
        Description: "(desk): sets a specific desk as default desk for the Bondage Club Card Game.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The carddesk command must be followed by a number between 0 and 8.\n" +
                    " \n" +
                    "Available desks:\n" +
                    "0 Original Default\n" +
                    "1 ABDL - 2 Asylum - 3 College\n" +
                    "4 Dominant - 5 Liability - 6 Maid\n" +
                    "7 Porn - 8 Extra</p>"
                );
            } else {
                var desk = args;
                if ((desk > -1) && (desk < 9) && (desk != cdesk)) {
                    cdesk = desk;
                    M_MOANER_saveControls();
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Default desk changed for the Bondage Club Card Game.</p>"
                    );
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'cardextra',
        Description: ": gives all extra cards of the Bondage Club Card Game.",
        Action: () => {
            Player.Game.ClubCard.Reward = "";
            var Extra = [1015, 1017, 3008, 5005, 6005, 7007, 8005, 11000, 11001, 11002, 11003, 11008, 11009, 11010, 12000, 12001, 12002, 30012, 30013, 30021, 30022];
            ChatRoomSendLocal(
                "<p style='background-color:#5fbd7a'>ULTRAbc: All extra cards of the Bondage Club Card Game now added.</p>"
            );
            for (let i = 0; i < Extra.length; i++) {
                let Char = String.fromCharCode(Extra[i]);
                Player.Game.ClubCard.Reward = Player.Game.ClubCard.Reward + Char;
            }
            ServerAccountUpdate.QueueData({
                Game: Player.Game
            }, true);
        }
    }])

    CommandCombine([{
        Tag: 'cardfame',
        Description: "(fame): sets the fame level for the high fame mode of Bondage Club Card Game.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The cardfame command must be followed by a number between 200 and 600.</p>"
                );
            } else {
                var fame = args;
                if ((fame > 199) && (fame < 601) && (fame != cfame)) {
                    cfame = fame;
                    M_MOANER_saveControls();
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Fame level changed for the high fame mode of the Bondage Club Card Game.</p>"
                    );
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'cardnoextra',
        Description: ": removes all extra cards of the Bondage Club Card Game.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>Warning</b>: You will lose all the extra cards of the Bondage Club Card Game. Confirm by typing: <b>/cardnoextra yes</b></p>"
                );
            } else if (args === "yes") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: No more extra cards in the Bondage Club Card Game.</p>"
                );
                Player.Game.ClubCard.Reward = "";
                ServerAccountUpdate.QueueData({
                    Game: Player.Game
                }, true);
            }
        }
    }])

    CommandCombine([{
        Tag: 'chess',
        Description: "(difficulty): starts chess.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The chess command must be followed by a number between 1 and 3.\n" +
                    " \n" +
                    "Available difficulty modes:\n" +
                    "1 easy\n" +
                    "2 normal\n" +
                    "3 hard</p>"
                );
            } else {
                CollegeChessGameEndALT = function() {
                    document.removeEventListener("chessOnMove", CollegeChessGameProgress);
                    MiniGameEnded = true;
                    ChessEndStatus = "Draw";
                    ElementRemove("DivChessBoard");
                    CommonDynamicFunction(MiniGameReturnFunction + "()");
                    CommonSetScreen("Online", "ChatRoom");
                    CurrentScreen = "ChatRoom";
                    ChatRoomCharacterViewDraw();
                    ChatRoomMenuBuild();
                    ChatRoomCharacterViewDrawBackground();
                    ChatRoomLoad();
                    ChatRoomClearAllElements();
                };
                CollegeChessGameStartALT = function(Difficulty) {
                    CollegeChessDifficulty = parseInt(Difficulty);
                    const playerStarts = Math.random() < 0.5;
                    ChessCharacterWhite = playerStarts ? Player : CollegeChessOpponent;
                    ChessCharacterBlack = playerStarts ? CollegeChessOpponent : Player;
                    MiniGameStart("Chess", CollegeChessDifficulty, "CollegeChessGameEndALT");
                    document.addEventListener("chessOnMove", CollegeChessGameProgress);
                };
                var chessdifficulty = args;
                if (this.ChessOn == false || this.ChessOn == undefined) {
                    ChessOn = true;
                    CommonSetScreen("Room", "CollegeChess");
                    CollegeChessGameStartALT(chessdifficulty);
                    setTimeout(function() {
                        CommonSetScreen("Online", "ChatRoom");
                        ElementPositionFix("DivChessBoard", null, -1000, 0);
                    }, 2000);
                } else {
                    ChessOn = false;
                    CollegeChessGameEndALT();
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'clothes',
        Description: "(target): changes clothes.",
        Action: (args) => {
            if (args === "") {
                if (Clothes == undefined) {
                    var message = "Magical lasers put random clothes on " + tmpname + "'s body."
                } else {
                    if (Clothes != "") {
                        if (Clothes.startsWith("\u0027")) {
                            var message = tmpname + Clothes;
                        } else {
                            var message = tmpname + ' '.repeat(1) + Clothes;
                        }
                    } else {
                        var message = "Magical lasers put random clothes on " + tmpname + "'s body."
                    }
                }
                if (Clothes != "no message") {
                    ServerSend("ChatRoomChat", {
                        Content: "Beep",
                        Type: "Action",
                        Dictionary: [{
                            Tag: "Beep",
                            Text: message
                        }]
                    });
                }
                CharacterAppearanceFullRandom(Player, true);
                ChatRoomCharacterUpdate(Player);
            } else {
                var targetname = args;
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].AllowItem == true) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
		    if (target[0].OnlineSharedSettings.Uwall == true) {
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                        );
                    } else {
                        if (Tclothes == undefined) {
                            var message = "Magical lasers make disappear the clothes on " + tgpname + "'s body."
                        } else {
                            if (Tclothes != "") {
                                if (Tclothes.startsWith("\u0027")) {
                                    var message = tmpname + Tclothes + ' '.repeat(1) + tgpname;
                                } else {
                                    var message = tmpname + ' '.repeat(1) + Tclothes + ' '.repeat(1) + tgpname;
                                }
                            } else {
                                var message = "Magical lasers make disappear the clothes on " + tgpname + "'s body."
                            }
                        }
                        if (Tclothes != "no message") {
                            ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: message
                            }]
                        });
                        }
                        CharacterAppearanceFullRandom(target[0], true);
                        ChatRoomCharacterUpdate(target[0]);
                    }    
                }
                ChatRoomSetTarget(null);
            }
        }
    }])

    CommandCombine([{
        Tag: 'code',
        Description: "(target): reveals codes used on current combination locks.",
        Action: (args) => {
            if (args === "") {
                for (let A = 0; A < Player.Appearance.length; A++)
                    if ((Player.Appearance[A].Property != null) && (Player.Appearance[A].Property.LockedBy != null)) {
                        if (Player.Appearance[A].Property.LockedBy == "CombinationPadlock") {
                            var asset = Player.Appearance[A].Asset.Description;
                            var code = Player.Appearance[A].Property.CombinationNumber;
                            ChatRoomSendLocal("" + asset + " = " + code + "");
                        }
                    }
            } else {
                var targetname = args;
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if (target[0] != null) {
                    for (let A = 0; A < target[0].Appearance.length; A++)
                        if ((target[0].Appearance[A].Property != null) && (target[0].Appearance[A].Property.LockedBy != null)) {
                            if (target[0].Appearance[A].Property.LockedBy == "CombinationPadlock") {
                                var asset = target[0].Appearance[A].Asset.Description;
                                var code = target[0].Appearance[A].Property.CombinationNumber;
                                ChatRoomSendLocal("" + asset + " = " + code + "");
                            }
                        }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'college',
        Description: "enters college, bypasses requirements.",
        Action: () => {
            ChatRoomSetLastChatRoom("");
            ServerSend("ChatRoomLeave", "");
            OnlineGameName = "";
            CommonSetScreen("Room", "CollegeEntrance");
            ChatRoomClearAllElements();
            CollegeEntranceIsWearingTennisClothes = function() {
                return true;
            }
            CollegeEntranceIsWearingCollegeClothes = function() {
                return true;
            }
            CollegeEntranceIsWearingTennisClothes = function() {
                return true;
            }
            CollegeEntranceCanGoTeacher = function() {
                return true;
            }
        }
    }])

    CommandCombine([{
        Tag: 'colorchanger',
        Description: "(anim): gets an animation with color change.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The colorchanger command:\n" +
                    "To preselect, two choices exist, type: <b>/colorchanger hair</b> or <b>/colorchanger eyes</b>\n" +
                    "To manually select area, type: <b>/colorchanger set</b> or <b>/colorchanger select</b> or <b>/colorchanger custom</b>\n" +
                    "Manual selection can only target 10 areas at a time,\n" +
                    "then requires to be reset to reuse, type: <b>/colorchanger stop</b> or <b>/colorchanger reset</b>\n" +
                    "Only 1 target can be active at a time</p>"
                );
            }
            if ((args === "custom") || (args === "set") || (args === "select")) {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: You have 5 seconds to click on target, select area. If successful, will be returned. If not, retry.</p>"
                );
                setTimeout(function() {
                    if (CurrentCharacter != null) { 
                        if (CurrentCharacter.FocusGroup.Name) {
                            var RandomColor = null;
                            var ColorTargetNameCustom = CurrentCharacter;
                            if (this.ColorTarget1 == undefined) {
                                this.ColorTarget1 = CurrentCharacter.FocusGroup.Name
                            } else if (this.ColorTarget2 == undefined) {
                                this.ColorTarget2 = CurrentCharacter.FocusGroup.Name
                            } else if (this.ColorTarget3 == undefined) {
                                this.ColorTarget3 = CurrentCharacter.FocusGroup.Name
                            } else if (this.ColorTarget4 == undefined) {
                                this.ColorTarget4 = CurrentCharacter.FocusGroup.Name
                            } else if (this.ColorTarget5 == undefined) {
                                this.ColorTarget5 = CurrentCharacter.FocusGroup.Name
                            } else if (this.ColorTarget6 == undefined) {
                                this.ColorTarget6 = CurrentCharacter.FocusGroup.Name
                            } else if (this.ColorTarget7 == undefined) {
                                this.ColorTarget7 = CurrentCharacter.FocusGroup.Name
                            } else if (this.ColorTarget8 == undefined) {
                                this.ColorTarget8 = CurrentCharacter.FocusGroup.Name
                            } else if (this.ColorTarget9 == undefined) {
                                this.ColorTarget9 = CurrentCharacter.FocusGroup.Name
                            } else if (this.ColorTarget10 == undefined) {
                                this.ColorTarget10 = CurrentCharacter.FocusGroup.Name
                            }
                            ColorChangerCustom = function() {
                                setTimeout(function() {
                                    ColorChangerCustom()
                                }, 1000);
                                RandomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
                                if (this.ColorTarget1) {
                                CharacterAppearanceSetColorForGroup(ColorTargetNameCustom, RandomColor, ColorTarget1);
                                ChatRoomCharacterItemUpdate(ColorTargetNameCustom, ColorTarget1);
                                };
                                if (this.ColorTarget2) {
                                CharacterAppearanceSetColorForGroup(ColorTargetNameCustom, RandomColor, ColorTarget2);
                                ChatRoomCharacterItemUpdate(ColorTargetNameCustom, ColorTarget2);
                                };
                                if (this.ColorTarget3) {
                                CharacterAppearanceSetColorForGroup(ColorTargetNameCustom, RandomColor, ColorTarget3);
                                ChatRoomCharacterItemUpdate(ColorTargetNameCustom, ColorTarget3);
                                };
                                if (this.ColorTarget4) {
                                CharacterAppearanceSetColorForGroup(ColorTargetNameCustom, RandomColor, ColorTarget4);
                                ChatRoomCharacterItemUpdate(ColorTargetNameCustom, ColorTarget4);
                                };
                                if (this.ColorTarget5) {
                                CharacterAppearanceSetColorForGroup(ColorTargetNameCustom, RandomColor, ColorTarget5);
                                ChatRoomCharacterItemUpdate(ColorTargetNameCustom, ColorTarget5);
                                };
                                if (this.ColorTarget6) {
                                CharacterAppearanceSetColorForGroup(ColorTargetNameCustom, RandomColor, ColorTarget6);
                                ChatRoomCharacterItemUpdate(ColorTargetNameCustom, ColorTarget6);
                                };
                                if (this.ColorTarget7) {
                                CharacterAppearanceSetColorForGroup(ColorTargetNameCustom, RandomColor, ColorTarget7);
                                ChatRoomCharacterItemUpdate(ColorTargetNameCustom, ColorTarget7);
                                };
                                if (this.ColorTarget8) {
                                CharacterAppearanceSetColorForGroup(ColorTargetNameCustom, RandomColor, ColorTarget8);
                                ChatRoomCharacterItemUpdate(ColorTargetNameCustom, ColorTarget8);
                                };
                                if (this.ColorTarget9) {
                                CharacterAppearanceSetColorForGroup(ColorTargetNameCustom, RandomColor, ColorTarget9);
                                ChatRoomCharacterItemUpdate(ColorTargetNameCustom, ColorTarget9);
                                };
                                if (this.ColorTarget10) {
                                CharacterAppearanceSetColorForGroup(ColorTargetNameCustom, RandomColor, ColorTarget10);
                                ChatRoomCharacterItemUpdate(ColorTargetNameCustom, ColorTarget10);
                                };
                            };
                            ColorChangerCustom();
                            DialogLeave();
                        }
                    }
                }, 5000);
            }
            if (args === "eyes") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: You have 5 seconds to click on target, select area. If successful, will be returned. If not, retry.</p>"
                );
                setTimeout(function() {
                    if (CurrentCharacter != null) { 
                        if (CurrentCharacter) {
                            var ColorTargetNameEyes = CurrentCharacter;
                            ColorChangerEyes = function() {
                                setTimeout(function() {
                                    ColorChangerEyes()
                                }, 1000);
                                var RandomColor = null;
                                RandomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
                                InventoryGet(ColorTargetNameEyes, "Eyes").Color = RandomColor;
                                InventoryGet(ColorTargetNameEyes, "Eyes2").Color = RandomColor;
                                ChatRoomCharacterItemUpdate(ColorTargetNameEyes, "Eyes");
                                ChatRoomCharacterItemUpdate(ColorTargetNameEyes, "Eyes2");
                            };
                            ColorChangerEyes();
                            DialogLeave();
                        }
                    }
                }, 5000);
            }
            if (args === "hair") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: You have 5 seconds to click on target, select area. If successful, will be returned. If not, retry.</p>"
                );
                setTimeout(function() {
                    if (CurrentCharacter != null) { 
                        if (CurrentCharacter) {
                            var ColorTargetNameHair = CurrentCharacter;
                            ColorChangerHair = function() {
                                setTimeout(function() {
                                    ColorChangerHair()
                                }, 1000);
                                var RandomColor = null;
                                RandomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
                                InventoryGet(ColorTargetNameHair, "HairFront").Color = RandomColor;
                                InventoryGet(ColorTargetNameHair, "HairBack").Color = RandomColor;
                                ChatRoomCharacterItemUpdate(ColorTargetNameHair, "HairFront");
                                ChatRoomCharacterItemUpdate(ColorTargetNameHair, "HairBack");
                            };
                            ColorChangerHair();
                            DialogLeave();
                        }
                    }
                }, 5000);
            }
            if ((args === "stop") || (args === "reset")) {
                ColorChangerCustom = function() {};
                ColorChangerEyes = function() {};
                ColorChangerHair = function() {};
                this.ColorTarget1 = undefined;
                this.ColorTarget2 = undefined;
                this.ColorTarget3 = undefined;
                this.ColorTarget4 = undefined;
                this.ColorTarget5 = undefined;
                this.ColorTarget6 = undefined;
                this.ColorTarget7 = undefined;
                this.ColorTarget8 = undefined;
                this.ColorTarget9 = undefined;
                this.ColorTarget10 = undefined;
                this.ColorTargetNameCustom = undefined;
            }
        }
    }])
	
    CommandCombine([{
        Tag: 'cum',
        Description: ": causes an orgasm.",
        Action: () => {
            ActivityOrgasmRuined = false;
            ActivityOrgasmStart(Player);
        }
    }])

    CommandCombine([{
        Tag: 'diaper',
        Description: "(action) (target or value) = plays with diapers (ABDL game).",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Welcome to Bondage Club Diaper Wetter! Where we make sure babies use their diapers!\n" +
                    " \n" +
                    "The diaper command must include an action.\n" +
                    "You need to wear one or two layers of diapers (only bulky and poofy versions)\n" +
                    "<b>/diaper start</b> to enable the script\n" +
                    "<b>/diaper stop</b> to disable the script\n" +
                    "<b>/diaper tick</b> to force a tick\n" +
                    " \n" +
                    "To get new clean diapers:\n" +
                    "<b>/diaper change1</b> (target) for normal diapers\n" +
                    "<b>/diaper change2</b> (target) for chastity diapers\n" +
                    "<b>/diaper change3</b> (target) for both diapers\n" +
                    " \n" +
                    "Customisation (before using /diaper start):\n" +
                    "Use <b>/diaper custom</b> for detailed info</p>"
                );
            } else if (args === "custom") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Diaper customisation (before using /diaper start):\n" +
                    "<b>/diaper setdesperation</b> (value between 0 and 3) for desperation level, normally controlled by having a milk bottle used on you\n" +
                    "<b>/diaper setregression</b> (value between 0 and 3) for regression level, normally controlled by wearing Nursery Milk for an extended period of time\n" +
                    "<b>/diaper settimer</b> (minutes) to change the wet/mess timer\n" +
                    "<b>/diaper setwetchance</b> (value between 0 and 1) to control how often you will wet\n" +
                    "<b>/diaper setmesschance</b> (value between 0 and 1) to control how often you will mess. Make sure this is lower than wetchance.\n" +
                    "<b>/diaper setwet1</b> (value)* for wet level of normal diapers\n" +
                    "<b>/diaper setwet2</b> (value)* for wet level of chastity diapers\n" +
                    "<b>/diaper setmess1</b> (value)* for mess level of normal diapers\n" +
                    "<b>/diaper setmess2</b> (value)* for mess level of chastity diapers - * = value between 0 and 2</p>"
                );
            } else if (args === "start") {
                diaperWetter();
            } else if (args === "stop") {
                stopWetting();
            } else if (args === "tick") {
                diaperTick();
            } else {
                var stringDiaper1 = args;
                var stringDiaper2 = stringDiaper1.split(/[ ,]+/);
                var feature = stringDiaper2[0];
                if (feature == "change1") {
                    var targetname = stringDiaper2[1];
                    if (targetname == null) {
                        if (InventoryGet(Player, "Panties") == null) {
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: You don't have normal diapers!</p>"
                            );
                        } else if (InventoryGet(Player, "Panties").Asset.Name == "BulkyDiaper" || InventoryGet(Player, "Panties").Asset.Name === "PoofyDiaper") {
                            refreshDiaper("panties");
                        } else {
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: You don't have normal diapers!</p>"
                            );
                        }
                    } else {
                        var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                        if (target[0] == null) {
                            var targetnumber = parseInt(targetname);
                            target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                        }
                        if (target[0] != null) {
                            if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                                tgpname = target[0].Name;
                            } else {
                                tgpname = target[0].Nickname;
                            }
                            if (InventoryGet(target[0], "Panties") == null) {
                                ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: " + ChatRoomHTMLEntities(tgpname) + " does not have normal diapers!</p>"
                                );
                            } else if (InventoryGet(target[0], "Panties").Asset.Name == "BulkyDiaper" || InventoryGet(target[0], "Panties").Asset.Name === "PoofyDiaper") {
                                ChatRoomTargetMemberNumber = target[0].MemberNumber;
                                var msg = "" + tmpname + " will change your normal diapers and allows you to use the /diaper change1 command.";
                                ServerSend("ChatRoomChat", {
                                    "Content": msg,
                                    "Type": "Whisper",
                                    "Target": ChatRoomTargetMemberNumber
                                });
                                for (let C = 0; C < ChatRoomCharacter.length; C++)
                                    if (ChatRoomTargetMemberNumber == ChatRoomCharacter[C].MemberNumber) {
                                        if ((ChatRoomCharacter[C].Nickname == '') || (ChatRoomCharacter[C].Nickname == undefined)) {
                                            TargetName = ChatRoomCharacter[C].Name;
                                        } else {
                                            TargetName = ChatRoomCharacter[C].Nickname;
                                        }
                                        break;
                                    }
                                ChatRoomMessage({
                                    Content: "Whisper to " + TargetName + ": " + msg,
                                    Type: "LocalMessage",
                                    Sender: Player.MemberNumber
                                });
                                document.querySelector('#TextAreaChatLog').lastChild.style.fontStyle = "italic";
                                document.querySelector('#TextAreaChatLog').lastChild.style.color = "silver";
                            } else {
                                ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: " + ChatRoomHTMLEntities(tgpname) + " does not have normal diapers!</p>"
                                );
                            }
                            ChatRoomSetTarget(null);
                        }
                    }
                }
                if (feature == "change2") {
                    var targetname = stringDiaper2[1];
                    if (targetname == null) {
                        if (InventoryGet(Player, "ItemPelvis") == null) {
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: You don't have chastity diapers!</p>"
                            );
                        } else if (InventoryGet(Player, "ItemPelvis").Asset.Name == "BulkyDiaper" || InventoryGet(Player, "ItemPelvis").Asset.Name === "PoofyDiaper") {
                            refreshDiaper("chastity");
                        } else {
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: You don't have chastity diapers!</p>"
                            );
                        }
                    } else {
                        var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                        if (target[0] == null) {
                            var targetnumber = parseInt(targetname);
                            target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                        }
                        if (target[0] != null) {
                            if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                                tgpname = target[0].Name;
                            } else {
                                tgpname = target[0].Nickname;
                            }
                            if (InventoryGet(target[0], "ItemPelvis") == null) {
                                ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: " + ChatRoomHTMLEntities(tgpname) + " does not have chastity diapers!</p>"
                                );
                            } else if (InventoryGet(target[0], "ItemPelvis").Asset.Name == "BulkyDiaper" || InventoryGet(target[0], "ItemPelvis").Asset.Name === "PoofyDiaper") {
                                ChatRoomTargetMemberNumber = target[0].MemberNumber;
                                var msg = "" + tmpname + " will change your chastity diapers and allows you to use the /diaper change2 command.";
                                ServerSend("ChatRoomChat", {
                                    "Content": msg,
                                    "Type": "Whisper",
                                    "Target": ChatRoomTargetMemberNumber
                                });
                                for (let C = 0; C < ChatRoomCharacter.length; C++)
                                    if (ChatRoomTargetMemberNumber == ChatRoomCharacter[C].MemberNumber) {
                                        if ((ChatRoomCharacter[C].Nickname == '') || (ChatRoomCharacter[C].Nickname == undefined)) {
                                            TargetName = ChatRoomCharacter[C].Name;
                                        } else {
                                            TargetName = ChatRoomCharacter[C].Nickname;
                                        }
                                        break;
                                    }
                                ChatRoomMessage({
                                    Content: "Whisper to " + TargetName + ": " + msg,
                                    Type: "LocalMessage",
                                    Sender: Player.MemberNumber
                                });
                                document.querySelector('#TextAreaChatLog').lastChild.style.fontStyle = "italic";
                                document.querySelector('#TextAreaChatLog').lastChild.style.color = "silver";
                            } else {
                                ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: " + ChatRoomHTMLEntities(tgpname) + " does not have chastity diapers!</p>"
                                );
                            }
                            ChatRoomSetTarget(null);
                        }
                    }
                }
                if (feature == "change3") {
                    var targetname = stringDiaper2[1];
                    if (targetname == null) {
                        if ((InventoryGet(Player, "Panties") == null) && (InventoryGet(Player, "ItemPelvis") == null)) {
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: You don't have a diaper! Get one on you before you make a mess!</p>"
                            );
                        } else if ((InventoryGet(Player, "Panties") == null) && (InventoryGet(Player, "ItemPelvis") != null)) {
                            if (InventoryGet(Player, "ItemPelvis").Asset.Name == "BulkyDiaper" || InventoryGet(Player, "ItemPelvis").Asset.Name === "PoofyDiaper") {
                                ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: You don't have two layers of diapers!</p>"
                                );
                            } else {
                                ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: You don't have a diaper! Get one on you before you make a mess!</p>"
                                );
                            }
                        } else if ((InventoryGet(Player, "Panties") != null) && (InventoryGet(Player, "ItemPelvis") == null)) {
                            if (InventoryGet(Player, "Panties").Asset.Name == "BulkyDiaper" || InventoryGet(Player, "Panties").Asset.Name === "PoofyDiaper") {
                                ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: You don't have two layers of diapers!</p>"
                                );
                            } else {
                                ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: You don't have a diaper! Get one on you before you make a mess!</p>"
                                );
                            }
                        } else if ((InventoryGet(Player, "Panties") != null) && (InventoryGet(Player, "ItemPelvis") != null)) {
                            if ((InventoryGet(Player, "Panties").Asset.Name == "BulkyDiaper" || InventoryGet(Player, "Panties").Asset.Name === "PoofyDiaper") &&
                                (InventoryGet(Player, "ItemPelvis").Asset.Name == "BulkyDiaper" || InventoryGet(Player, "ItemPelvis").Asset.Name === "PoofyDiaper")) {
                                refreshDiaper("both");
                            } else {
                                ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: You don't have two layers of diapers!</p>"
                                );
                            }
                        }
                    } else {
                        var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                        if (target[0] == null) {
                            var targetnumber = parseInt(targetname);
                            target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                        }
                        if (target[0] != null) {
                            if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                                tgpname = target[0].Name;
                            } else {
                                tgpname = target[0].Nickname;
                            }
                            if (InventoryGet(target[0], "Pronouns").Asset.Name == "HeHim") {
                                tgpr1 = "He";
                                tgpr2 = "him";
                                tgpr3 = "his";
                                tgpr4 = "he";
                            } else if (InventoryGet(target[0], "Pronouns").Asset.Name == "SheHer") {
                                tgpr1 = "She";
                                tgpr2 = "her";
                                tgpr3 = "her";
                                tgpr4 = "she";
                            } else {
                                tgpr1 = "They";
                                tgpr2 = "them";
                                tgpr3 = "their";
                                tgpr4 = "they";
                            }
                            if ((InventoryGet(target[0], "Panties") == null) && (InventoryGet(target[0], "ItemPelvis") == null)) {
                                ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: " + ChatRoomHTMLEntities(tgpname) + " does not have a diaper! Get one on " + tgpr2 + " before " + tgpr4 + " makes a mess!</p>"
                                );
                            } else if ((InventoryGet(target[0], "Panties") == null) && (InventoryGet(target[0], "ItemPelvis") != null)) {
                                if (InventoryGet(target[0], "ItemPelvis").Asset.Name == "BulkyDiaper" || InventoryGet(target[0], "ItemPelvis").Asset.Name === "PoofyDiaper") {
                                    ChatRoomSendLocal(
                                        "<p style='background-color:#5fbd7a'>ULTRAbc: " + ChatRoomHTMLEntities(tgpname) + " does not have two layers of diapers!</p>"
                                    );
                                } else {
                                    ChatRoomSendLocal(
                                        "<p style='background-color:#5fbd7a'>ULTRAbc: " + ChatRoomHTMLEntities(tgpname) + " does not have a diaper! Get one on " + tgpr2 + " before " + tgpr4 + " makes a mess!</p>"
                                    );
                                }
                            } else if ((InventoryGet(target[0], "Panties") != null) && (InventoryGet(target[0], "ItemPelvis") == null)) {
                                if (InventoryGet(target[0], "Panties").Asset.Name == "BulkyDiaper" || InventoryGet(target[0], "Panties").Asset.Name === "PoofyDiaper") {
                                    ChatRoomSendLocal(
                                        "<p style='background-color:#5fbd7a'>ULTRAbc: " + ChatRoomHTMLEntities(tgpname) + " does not have two layers of diapers!</p>"
                                    );
                                } else {
                                    ChatRoomSendLocal(
                                        "<p style='background-color:#5fbd7a'>ULTRAbc: " + ChatRoomHTMLEntities(tgpname) + " does not have a diaper! Get one on " + tgpr2 + " before " + tgpr4 + " makes a mess!</p>"
                                    );
                                }
                            } else if ((InventoryGet(target[0], "Panties") != null) && (InventoryGet(target[0], "ItemPelvis") != null)) {
                                if ((InventoryGet(target[0], "Panties").Asset.Name == "BulkyDiaper" || InventoryGet(target[0], "Panties").Asset.Name === "PoofyDiaper") &&
                                    (InventoryGet(target[0], "ItemPelvis").Asset.Name == "BulkyDiaper" || InventoryGet(target[0], "ItemPelvis").Asset.Name === "PoofyDiaper")) {
                                    ChatRoomTargetMemberNumber = target[0].MemberNumber;
                                    var msg = "" + tmpname + " will change all your diapers and allows you to use the /diaper change3 command.";
                                    ServerSend("ChatRoomChat", {
                                        "Content": msg,
                                        "Type": "Whisper",
                                        "Target": ChatRoomTargetMemberNumber
                                    });
                                    for (let C = 0; C < ChatRoomCharacter.length; C++)
                                        if (ChatRoomTargetMemberNumber == ChatRoomCharacter[C].MemberNumber) {
                                            if ((ChatRoomCharacter[C].Nickname == '') || (ChatRoomCharacter[C].Nickname == undefined)) {
                                                TargetName = ChatRoomCharacter[C].Name;
                                            } else {
                                                TargetName = ChatRoomCharacter[C].Nickname;
                                            }
                                            break;
                                        }
                                    ChatRoomMessage({
                                        Content: "Whisper to " + TargetName + ": " + msg,
                                        Type: "LocalMessage",
                                        Sender: Player.MemberNumber
                                    });
                                    document.querySelector('#TextAreaChatLog').lastChild.style.fontStyle = "italic";
                                    document.querySelector('#TextAreaChatLog').lastChild.style.color = "silver";
                                } else {
                                    ChatRoomSendLocal(
                                        "<p style='background-color:#5fbd7a'>ULTRAbc: " + ChatRoomHTMLEntities(tgpname) + " does not have two layers of diapers!</p>"

                                    );
                                }
                                ChatRoomSetTarget(null);
                            }
                        }
                    }
                }
                if (feature == "setdesperation") {
                    var setchange = stringDiaper2[1];
                    diaperDefaultValues.desperationLevel = setchange;
                    setchange = "";
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: Your desperation level has been changed.</p>"
                    );
                }
                if (feature == "setmesschance") {
                    var setchange = stringDiaper2[1];
                    diaperDefaultValues.messChance = setchange;
                    setchange = "";
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: Your chance to mess diapers has been changed.</p>"
                    );
                }
                if (feature == "setmess1") {
                    if (InventoryGet(Player, "Panties") != null) {
                        if (InventoryGet(Player, "Panties").Asset.Name == "BulkyDiaper" || InventoryGet(Player, "Panties").Asset.Name === "PoofyDiaper") {
                            var setchange = stringDiaper2[1];
                            if (setchange < diaperDefaultValues.wetLevelInner) {
                                diaperDefaultValues.messLevelInner = setchange;
                                setchange = "";
                                ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: Your mess level for normal diapers has been changed.</p>"
                                );
                            }
                        }
                    }
                }
                if (feature == "setmess2") {
                    if (InventoryGet(Player, "ItemPelvis") != null) {
                        if (InventoryGet(Player, "ItemPelvis").Asset.Name == "BulkyDiaper" || InventoryGet(Player, "ItemPelvis").Asset.Name === "PoofyDiaper") {
                            var setchange = stringDiaper2[1];
                            if (setchange < diaperDefaultValues.wetLevelOuter) {
                                diaperDefaultValues.messLevelOuter = setchange;
                                setchange = "";
                                ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: Your mess level for chastity diapers has been changed.</p>"
                                );
                            }
                        }
                    }
                }
                if (feature == "setregression") {
                    var setchange = stringDiaper2[1];
                    diaperDefaultValues.regressionLevel = setchange;
                    setchange = "";
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: Your regression level has been changed.</p>"
                    );
                }
                if (feature == "settimer") {
                    var setchange = stringDiaper2[1];
                    diaperDefaultValues.baseTimer = setchange;
                    setchange = "";
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: Your wet/mess timer has been changed.</p>"
                    );
                }
                if (feature == "setwetchance") {
                    var setchange = stringDiaper2[1];
                    diaperDefaultValues.wetChance = setchange;
                    setchange = "";
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: Your chance to wet diapers has been changed.</p>"
                    );
                }
                if (feature == "setwet1") {
                    if (InventoryGet(Player, "Panties") != null) {
                        if (InventoryGet(Player, "Panties").Asset.Name == "BulkyDiaper" || InventoryGet(Player, "Panties").Asset.Name === "PoofyDiaper") {
                            var setchange = stringDiaper2[1];
                            if (setchange > diaperDefaultValues.messLevelInner) {
                                diaperDefaultValues.wetLevelInner = setchange;
                                setchange = "";
                                ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: Your wet level for normal diapers has been changed.</p>"
                                );
                            }
                        }
                    }
                }
                if (feature == "setwet2") {
                    if (InventoryGet(Player, "ItemPelvis") != null) {
                        if (InventoryGet(Player, "ItemPelvis").Asset.Name == "BulkyDiaper" || InventoryGet(Player, "ItemPelvis").Asset.Name === "PoofyDiaper") {
                            var setchange = stringDiaper2[1];
                            if (setchange > diaperDefaultValues.messLevelOuter) {
                                diaperDefaultValues.wetLevelOuter = setchange;
                                setchange = "";
                                ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: Your wet level for chastity diapers has been changed.</p>"
                                );
                            }
                        }
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'difficulty',
        Description: "(number): changes game difficulty.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The difficulty command must be followed by a number between 0 and 3.\n" +
                    " \n" +
                    "Available difficulty modes:\n" +
                    "0 roleplay\n" +
                    "1 regular\n" +
                    "2 hardcore\n" +
                    "3 extreme</p>"
                );
            } else {
                PreferenceDifficultyLevel = args * 1;
            }
            if ((PreferenceDifficultyLevel > -1) && (PreferenceDifficultyLevel < 4) && (PreferenceDifficultyLevel != Player.Difficulty.Level)) {
                PreferenceDifficultyAccept = true;
                Player.Difficulty = {
                    LastChange: CurrentTime,
                    Level: PreferenceDifficultyLevel
                };
                ServerSend("AccountDifficulty", PreferenceDifficultyLevel);
                PreferenceInitPlayer();
                LoginDifficulty(true);
            }
        }
    }])
   
    CommandCombine([{
        Tag: 'erase',
        Description: ": erases chat.",
        Action: () => {
            ElementRemove("TextAreaChatLog");
        }
    }])

    CommandCombine([{
        Tag: 'font',
        Description: "(font) (size): changes font in BC after automatic relog. ",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The font command must be followed by a font number and optionally a size number.\n" +
                    "The effect will be visible in the chat after an automatic relog.\n" +
                    "Supported fonts: 0 Arial - 1 Times New Roman\n" +
                    "2 Papyrus - 3 Comic Sans - 4 Impact\n" +
                    "5 Helvetica Neue - 6 Verdana - 7 Century Gothic\n" +
                    "8 Georgia - 9 Courrier New - 10 Copperplate\n" +
                    "Sizes: 0 Small - 1 Medium - 2 Large</p>"
                );
            } else {
                var stringFont1 = args;
                var stringFont2 = stringFont1.split(/[ ,]+/);
                var font = stringFont2[0];
                var size = stringFont2[1];
                Player.GraphicsSettings.Font = PreferenceGraphicsFontList[font];
                CommonGetFont.clearCache();
                CommonGetFontName.clearCache();
                DrawingGetTextSize.clearCache();
                if ((size > -1) && (size < 3)) {
                    Player.ChatSettings.FontSize = PreferenceChatFontSizeList[size];
                    ChatRoomRefreshFontSize();
                }
                ServerAccountUpdate.QueueData({
                    ChatSettings: Player.ChatSettings
                });
                ServerAccountUpdate.QueueData({
                    GraphicsSettings: Player.GraphicsSettings
                });
                ServerSocket.close();
                ServerSocket.open();
            }
        }
    }])

    CommandCombine([{
        Tag: 'frlist',
        Description: "(lobby): gives access to friendlist with clickable links in specified lobby during 15 seconds.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The frlist command must be followed by the lobby for which you want to have clickable links.\n" +
                    "Available options: asylum, fclub, mclub, xclub.</p>"
                );
            }
            if (args === "asylum") {
                setTimeout(function() {
                    ChatRoomSpace = "Asylum";
                    CommonSetScreen("Online", "ChatSearch");
                    ChatRoomSetLastChatRoom("");
                    document.getElementById("InputChat").style.display = "none";
                    document.getElementById("TextAreaChatLog").style.display = "none";
                    ElementRemove("InputSearch");
                    FriendListReturn = {
                        Screen: CurrentScreen,
                        Module: CurrentModule
                    };
                    CommonSetScreen("Character", "FriendList");
                }, 3000);
                setTimeout(function() {
                    FriendListExit();
                    CommonSetScreen("Online", "ChatRoom");
                    document.getElementById("InputChat").style.display = "inline";
                    document.getElementById("TextAreaChatLog").style.display = "inline";
                }, 15000);
            }
            if (args === "fclub") {
                if ((InventoryGet(Player, "Pronouns").Asset.Name == "SheHer") &&
                    (InventoryGet(Player, "Pussy").Asset.Name != "Penis") &&
                    (InventoryGet(Player, "BodyUpper").Asset.Name != "FlatSmall") &&
                    (InventoryGet(Player, "BodyUpper").Asset.Name != "FlatMedium")) {
                    setTimeout(function() {
                        ChatRoomSpace = "";
                        CommonSetScreen("Online", "ChatSearch");
                        ChatRoomSetLastChatRoom("");
                        document.getElementById("InputChat").style.display = "none";
                        document.getElementById("TextAreaChatLog").style.display = "none";
                        ElementRemove("InputSearch");
                        FriendListReturn = {
                            Screen: CurrentScreen,
                            Module: CurrentModule
                        };
                        CommonSetScreen("Character", "FriendList");
                    }, 3000);
                    setTimeout(function() {
                        FriendListExit();
                        CommonSetScreen("Online", "ChatRoom");
                        document.getElementById("InputChat").style.display = "inline";
                        document.getElementById("TextAreaChatLog").style.display = "inline";
                    }, 15000);
                } else {
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: Only females have access to this lobby.</p>"
                    );
                }
            }
            if (args === "mclub") {
                if ((InventoryGet(Player, "Pronouns").Asset.Name == "HeHim") &&
                    (InventoryGet(Player, "Pussy").Asset.Name == "Penis") &&
                    ((InventoryGet(Player, "BodyUpper").Asset.Name == "FlatSmall") || (InventoryGet(Player, "BodyUpper").Asset.Name == "FlatMedium"))) {

                    setTimeout(function() {
                        ChatRoomSpace = "M";
                        CommonSetScreen("Online", "ChatSearch");
                        ChatRoomSetLastChatRoom("");
                        document.getElementById("InputChat").style.display = "none";
                        document.getElementById("TextAreaChatLog").style.display = "none";
                        ElementRemove("InputSearch");
                        FriendListReturn = {
                            Screen: CurrentScreen,
                            Module: CurrentModule
                        };
                        CommonSetScreen("Character", "FriendList");
                    }, 3000);
                    setTimeout(function() {
                        FriendListExit();
                        CommonSetScreen("Online", "ChatRoom");
                        document.getElementById("InputChat").style.display = "inline";
                        document.getElementById("TextAreaChatLog").style.display = "inline";
                    }, 15000);
                } else {
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: Only males have access to this lobby.</p>"
                    );
                }
            }
            if (args === "xclub") {
                setTimeout(function() {
                    ChatRoomSpace = "X";
                    CommonSetScreen("Online", "ChatSearch");
                    ChatRoomSetLastChatRoom("");
                    document.getElementById("InputChat").style.display = "none";
                    document.getElementById("TextAreaChatLog").style.display = "none";
                    ElementRemove("InputSearch");
                    FriendListReturn = {
                        Screen: CurrentScreen,
                        Module: CurrentModule
                    };
                    CommonSetScreen("Character", "FriendList");
                }, 3000);
                setTimeout(function() {
                    FriendListExit();
                    CommonSetScreen("Online", "ChatRoom");
                    document.getElementById("InputChat").style.display = "inline";
                    document.getElementById("TextAreaChatLog").style.display = "inline";
                }, 15000);
            }
        }
    }])

    CommandCombine([{
        Tag: 'game',
        Description: "(minigame): launches a minigame.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The game command must include a minigame.\n" +
                    "Available minigames:\n" +
                    "carrot, cleaning, dojo, drinks, hurdle, kidnap, movie1,\n" +
                    "movie2, puppy, rhythm, training, whippony.\n" +
                    "Training is the trainer version of the hurdle game.\n" +
                    "You need to click on the maid in the Maid Quarters for the cleaning, drinks and rhythm games.</p>"
                );
            } else {
                var minigame = args;
                if (minigame == "carrot") {
                    ServerSend("ChatRoomLeave", "");
                    ChatRoomSetLastChatRoom("");
                    OnlineGameName = "";
                    ChatRoomClearAllElements();
                    CommonSetScreen("Room", "Stable");
                    StableDressPonyStart();
                    StableWearPonyEquipment(Player);
                    MiniGameStart("HorseWalk", "Carrot", "StablePonyEnd");
                } else if (minigame == "cleaning") {
                    ServerSend("ChatRoomLeave", "");
                    ChatRoomSetLastChatRoom("");
                    OnlineGameName = "";
                    ChatRoomClearAllElements();
                    CommonSetScreen("Room", "MaidQuarters");
                    GameType = "MaidCleaning";
                    MaidQuartersMaid.Stage = "400";
                } else if (minigame == "dojo") {
                    ServerSend("ChatRoomLeave", "");
                    ChatRoomSetLastChatRoom("");
                    OnlineGameName = "";
                    ChatRoomClearAllElements();
                    CommonSetScreen("Room", "Introduction");
                    IntroductionJobStart("SubDojo", 0)
                    IntroductionJobDojoStart();
                } else if (minigame == "drinks") {
                    ServerSend("ChatRoomLeave", "");
                    ChatRoomSetLastChatRoom("");
                    OnlineGameName = "";
                    ChatRoomClearAllElements();
                    CommonSetScreen("Room", "MaidQuarters");
                    GameType = "MaidDrinks";
                    MaidQuartersMaid.Stage = "200";
                } else if (minigame == "hurdle") {
                    ServerSend("ChatRoomLeave", "");
                    ChatRoomSetLastChatRoom("");
                    OnlineGameName = "";
                    ChatRoomClearAllElements();
                    CommonSetScreen("Room", "Stable");
                    StableDressPonyStart();
                    StableWearPonyEquipment(Player);
                    MiniGameStart("HorseWalk", "Hurdle", "StablePonyEnd");
                } else if (minigame == "kidnap") {
                    ServerSend("ChatRoomLeave", "");
                    ChatRoomSetLastChatRoom("");
                    OnlineGameName = "";
                    ChatRoomClearAllElements();
                    CommonSetScreen("Room", "Introduction");
                    IntroductionJobStart("DomKidnap", 0)
                    IntroductionJobBouncerStart();
                } else if (minigame == "movie1") {
                    ServerSend("ChatRoomLeave", "");
                    ChatRoomSetLastChatRoom("");
                    OnlineGameName = "";
                    ChatRoomClearAllElements();
                    CommonSetScreen("Room", "MovieStudio");
                    MovieStudioDailyMovie = "Interview";
                } else if (minigame == "movie2") {
                    ServerSend("ChatRoomLeave", "");
                    ChatRoomSetLastChatRoom("");
                    OnlineGameName = "";
                    ChatRoomClearAllElements();
                    CommonSetScreen("Room", "MovieStudio");
                    MovieStudioDailyMovie = "OpenHouse";
                } else if (minigame == "puppy") {
                    ServerSend("ChatRoomLeave", "");
                    ChatRoomSetLastChatRoom("");
                    OnlineGameName = "";
                    ChatRoomClearAllElements();
                    CommonSetScreen("Room", "Introduction");
                    IntroductionJobStart("DomPuppy", 0)
                    IntroductionJobPuppyStart();
                } else if (minigame == "rhythm") {
                    ServerSend("ChatRoomLeave", "");
                    ChatRoomSetLastChatRoom("");
                    OnlineGameName = "";
                    ChatRoomClearAllElements();
                    CommonSetScreen("Room", "MaidQuarters");
                    GameType = "RhythmGame";
                    MaidQuartersMaid.Stage = "500";
                } else if (minigame == "training") {
                    ServerSend("ChatRoomLeave", "");
                    ChatRoomSetLastChatRoom("");
                    OnlineGameName = "";
                    ChatRoomClearAllElements();
                    CommonSetScreen("Room", "Stable");
                    StablePlayerAppearance = Player.Appearance.slice();
                    StableWearTrainerEquipment(Player);
                    MiniGameStart("HorseWalk", "HurdleTraining", "StableTrainerEnd");
                } else if (minigame == "whippony") {
                    ServerSend("ChatRoomLeave", "");
                    ChatRoomSetLastChatRoom("");
                    OnlineGameName = "";
                    ChatRoomClearAllElements();
                    CommonSetScreen("Room", "Stable");
                    StablePlayerAppearance = Player.Appearance.slice();
                    StableWearTrainerEquipment(Player);
                    MiniGameStart("HorseWalk", "WhipPony", "StableTrainerEnd");
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'ggts',
        Description: "(minutes) (level):  enters ggts training in asylum for the specified time and level.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The ggts command must be followed by two numbers to  specify minutes and level (1-6).<p>"
                );
            } else {
                var stringGgts1 = args;
                var stringGgts2 = stringGgts1.split(/[ ,]+/);
                var minutes = stringGgts2[0];
                var level = stringGgts2[1];
                ServerSend("ChatRoomChat", {
                    Content: "Beep",
                    Type: "Action",
                    Dictionary: [{
                        Tag: "Beep",
                        Text: "" + tmpname + " gets grabbed by two maids and locked in the asylum for " + minutes + " minutes of training with the Good Girl Training System Level " + level + "."
                    }]
                });
                DialogLentLockpicks = false;
                ChatRoomClearAllElements();
                ServerSend("ChatRoomLeave", "");
                CharacterDeleteAllOnline();
                AsylumGGTSLock(minutes, TextGet("GGTSIntro"));
                AsylumGGTSStartLevel(level);
            }
        }
    }])

    CommandCombine([{
        Tag: 'gtalk',
        Description: "(talkmode) (words): speaks once in specified gag talk.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The gtalk command must be followed by a number between 1 and 9, then the words you want to say.\n" +
                    " \n" +
                    "Available talk modes:\n" +
                    "1 very light gag talk\n" +
                    "2 light gag talk\n" +
                    "3 easy gag talk\n" +
                    "4 normal gag talk\n" +
                    "5 medium gag talk\n" +
                    "6 heavy gag talk\n" +
                    "7 very heavy gag talk\n" +
                    "8 total gag talk\n" +
                    "9 real gag talk</p>"
                );
            } else {
                var stringGag1 = args;
                var stringGag2 = stringGag1.split(/[ ,]+/);
                var gaglevel = stringGag2[0];
                if ((gaglevel > 0) && (gaglevel < 9)) {
                    gl = gaglevel;
                }
                if (gaglevel == 9) {
                    gl = SpeechGetTotalGagLevel(Player);
                }
                if ((gaglevel > 0) && (gaglevel < 10)) {
                    content = SpeechGarbleByGagLevel(gl, args.substring(2).trim());
                    ServerSend("ChatRoomChat", {
                        "Content": content,
                        "Type": "Chat"
                    });
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'hdvibe',
        Description: "(crotch shield) (back shield) (modules)(intensity) (orgasm mode): changes the settings of worn Heavy Duty Belt.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The hdvibe command must be followed by 5 numbers for crotch shield, back shield, modules, intensity and orgasm mode.\n" +
                    " \n" +
                    "Available crotch shields:\n" +
                    "0 Open - 1 Transparent - 2 Metal\n" +
                    " \n" +
                    "Available back shields:\n" +
                    "0 Open - 1 Closed\n" +
                    " \n" +
                    "Available modules:\n" +
                    "0 No module - 1 Cage/Spreader\n" +
                    "2 Brushes - 3 Both modules \n" +
                    " \n" +
                    "Available intensities:\n" +
                    "0 Off - 1 Low - 2 Medium - 3 High - 4 Maximum\n" +
                    " \n" +
                    "Available orgasm modes:\n" +
                    "0 Normal - 1 Edge - 2 Denial</p>"
                );
            } else {
                if (InventoryGet(Player, "ItemPelvis") != null) {
                    if (InventoryGet(Player, "ItemPelvis").Asset.Name == "HeavyDutyBelt") {
                        var stringHDbelt1 = args;
                        var stringHDbelt2 = stringHDbelt1.split(/[ ,]+/);
                        var chd = stringHDbelt2[0];
                        var bhd = stringHDbelt2[1];
                        var mhd = stringHDbelt2[2];
                        var ihd = stringHDbelt2[3];
                        var ohd = stringHDbelt2[4];
                        if ((chd > -1) && (chd < 3) && (bhd > -1) && (bhd < 2) && (mhd > -1) && (mhd < 4) && (ihd > -1) && (ihd < 5) && (ohd > -1) && (ohd < 3)) {
                            const HeavyDutyBelt = InventoryGet(Player, "ItemPelvis");
                            const HeavyDutyBeltConfig = ModularItemDataLookup.ItemPelvisHeavyDutyBelt;
                            HeavyDutyBelt.Property = ModularItemMergeModuleValues(HeavyDutyBeltConfig, [chd, bhd, mhd, ihd, ohd]);
                            ChatRoomCharacterUpdate(Player);
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: The settings of your Heavy Duty Belt have been modified.</p>"
                            );
                        }
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'hear',
        Description: "(hearingmode): forces a specific hearing mode",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The hear command must be followed by a number between 0 and 4.\n" +
                    "Notes:\n" +
                    "- a full relog is requested to leave this forced hearing mode\n" +
                    "- this command can trigger a BCX warning. Just ignore it (close the breaking message)!\n" +
                    " \n" +
                    "Available hearing modes:\n" +
                    "0 normal hearing\n" +
                    "1 light deafness\n" +
                    "2 normal deafness\n" +
                    "3 heavy deafness\n" +
                    "4 total deafness</p>"
                );
            } else {
                var dl = args;
                if (dl == 0) {
                    GetDeafLevel0();
                    Player.GetDeafLevel = GetDeafLevel0;
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: Back to normal hearing mode.</p>"
                    );
                }
                if (dl == 1) {
                    GetDeafLevel1();
                    Player.GetDeafLevel = GetDeafLevel1;
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in light deafness mode.</p>"
                    );
                }
                if (dl == 2) {
                    GetDeafLevel2();
                    Player.GetDeafLevel = GetDeafLevel2;
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in normal deafness mode.</p>"
                    );
                }
                if (dl == 3) {
                    GetDeafLevel3();
                    Player.GetDeafLevel = GetDeafLevel3;
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in heavy deafness mode.</p>"
                    );
                }
                if (dl == 4) {
                    GetDeafLevel4();
                    Player.GetDeafLevel = GetDeafLevel4;
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in total deafness mode.</p>"
                    );
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'hint',
        Description: "(target) (hint): adds or changes a hint for current locks with passwords.",
        Action: (_, command, args) => {
            var [targetname] = args;
            if (!targetname) {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The hint command must be followed by a target and the hint you want to add to locks with password.<p>"
                );
            } else {
                var [, , ...message] = command.split(" ");
                var hint = message?.join(" ");
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && ((target[0] == Player) || (target[0].AllowItem == true)) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
		    if (target[0].OnlineSharedSettings.Uwall == true) {
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                        );
                    } else { 
                        if (hint != "") {
                            for (let A = 0; A < target[0].Appearance.length; A++)
                                if ((target[0].Appearance[A].Property != null) && (target[0].Appearance[A].Property.LockedBy != null)) {
                                    if ((target[0].Appearance[A].Property.LockedBy == "SafewordPadlock") ||
					(target[0].Appearance[A].Property.LockedBy == "PasswordPadlock") ||
					(target[0].Appearance[A].Property.LockedBy == "TimerPasswordPadlock")) {
                                        target[0].Appearance[A].Property.Hint = hint;
                                        ServerSend("ChatRoomChat", {
                                            Content: "Beep",
                                            Type: "Action",
                                            Dictionary: [{
                                                Tag: "Beep",
                                                Text: "A hint has been added to " + tgpname + "'s locks with password."
                                            }]
                                        });
                                    }
                                }
                            ChatRoomCharacterUpdate(Player);
                        }
                    }
                }
                ChatRoomSetTarget(null);                
            }
        }
    }])

    CommandCombine([{
        Tag: 'invisible',
        Description: ": becomes invisible (scripts need to be allowed in BC settings).",
        Action: () => {
	    if (Player.OnlineSharedSettings.ScriptPermissions.Hide.permission == 0) {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: To use the invisible command, you need first to allow Scripts in BC settings.<p>"
                );
            } else {    
                ServerSend("ChatRoomChat", {
                    Content: "Beep",
                    Type: "Action",
                    Dictionary: [{
                        Tag: "Beep",
                        Text: "Magical lasers make " + tmpname + " completely invisible."
                    }]
                });
                InventoryWear(Player, "Script", "ItemScript");
                InventoryGet(Player, "ItemScript").Property = {
                    Hide: [
                        "Activity",
                        "Blush",
                        "BodyLower",
			"BodyMarkings",
                        "BodyUpper",
                        "Bra",
                        "Bracelet",
                        "Cloth",
                        "ClothAccessory",
                        "ClothLower",
                        "Corset",
                        "Emoticon",
                        "Eyebrows",
                        "Eyes",
                        "Eyes2",
                        "EyeShadow",
                        "Face",
                        "FacialHair",
                        "Fluids",
                        "Garters",
                        "Glasses",
                        "Gloves",
                        "HairAccessory1",
                        "HairAccessory2",
                        "HairAccessory3",
                        "HairBack",
                        "HairFront",
                        "Hands",
                        "Hat",
                        "Head",
                        "ItemAddon",
                        "ItemArms",
                        "ItemBoots",
                        "ItemBreast",
                        "ItemButt",
                        "ItemDevices",
                        "ItemEars",
                        "ItemFeet",
                        "ItemHandheld",
                        "ItemHands",
                        "ItemHead",
                        "ItemHood",
                        "ItemLegs",
                        "ItemMisc",
                        "ItemMouth",
                        "ItemMouth2",
                        "ItemMouth3",
                        "ItemNeck",
                        "ItemNeckAccessories",
                        "ItemNeckRestraints",
                        "ItemNipples",
                        "ItemNipplesPiercings",
                        "ItemNose",
                        "ItemPelvis",
                        "ItemTorso",
                        "ItemTorso2",
                        "ItemVulva",
                        "ItemVulvaPiercings",
                        "Jewelry",
                        "LeftAnklet",
                        "LeftHand",
		        "Mask",
                        "Mouth",
                        "Necklace",
                        "Nipples",
                        "Panties",
                        "Pussy",
                        "RightAnklet",
                        "RightHand",
                        "Shoes",
                        "Socks",
                        "SocksLeft",
                        "SocksRight",
                        "Suit",
                        "SuitLower",
                        "TailStraps",
                        "Wings"
                    ]
                }
                CurrentScreen === 'ChatRoom' ?
                    ChatRoomCharacterUpdate(Player) :
                CharacterRefresh(Player);
	    }	    
        }
    }])

    CommandCombine([{
        Tag: 'itemcolor',
        Description: "(colorcode) (target): changes color on all current bindings.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The itemcolor command must be followed by a color code in the format #000000 and optionally a target.</p>"
                );
            } else {
                var stringItc1 = args;
                var stringItc2 = stringItc1.split(/[ ,]+/);
                var color = stringItc2[0];
                var targetname = stringItc2[1];
                if ((targetname == null) && (color.startsWith("#"))) {
                    for (let A = 0; A < Player.Appearance.length; A++)
                        if (Player.Appearance[A].Asset.Group.Name != null) {
                            if (Player.Appearance[A].Asset.Group.Name.startsWith("Item")) {
                                if (Array.isArray(Player.Appearance[A].Color)) {
                                    for (let i = 0; i < 14; i++)
                                    Player.Appearance[A].Color[i] = color;  
                                } else {
                                      Player.Appearance[A].Color = color;    
                                }               
                            }
                        }                   
                    ServerSend("ChatRoomChat", {
                        Content: "Beep",
                        Type: "Action",
                        Dictionary: [{
                            Tag: "Beep",
                            Text: "New colors are used on " + tmpname + "'s bindings."
                        }]
                    });
                    ChatRoomCharacterUpdate(Player);
                } else {
                    var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                    if (target[0] == null) {
                        var targetnumber = parseInt(targetname);
                        target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                    }
                    if ((target[0] != null) && (target[0].AllowItem == true) && (color.startsWith("#")) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                        if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                            tgpname = target[0].Name;
                        } else {
                            tgpname = target[0].Nickname;
                        }
                        if (target[0].OnlineSharedSettings.Uwall == true) {
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                            );
                        } else { 
                            for (let A = 0; A < target[0].Appearance.length; A++)
                                if (target[0].Appearance[A].Asset.Group.Name != null) {
                                    if (target[0].Appearance[A].Asset.Group.Name.startsWith("Item")) {
                                        if (Array.isArray(target[0].Appearance[A].Color)) {
                                            for (let i = 0; i < 14; i++)
                                                target[0].Appearance[A].Color[i] = color;  
                                        } else {
                                            target[0].Appearance[A].Color = color;    
                                        }               
                                    }
                                }
                            ServerSend("ChatRoomChat", {
                                 Content: "Beep",
                                 Type: "Action",
                                 Dictionary: [{
                                     Tag: "Beep",
                                     Text: "New colors are used on " + tgpname + "'s bindings."
                                }]
                            });
                            ChatRoomCharacterUpdate(target[0]);
                        }
                    }
                    ChatRoomSetTarget(null);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'kd',
        Description: "(option): launches Kinky Dungeon.",
        Action: (args) => {
            ArcadeKinkyDungeonEnd = function() {
                CommonSetScreen("Online", "ChatRoom");
                document.getElementById("InputChat").style.display = "inline";
                document.getElementById("TextAreaChatLog").style.display = "inline";
            }; //rewrite end to return to chatroom and restore chat
            ArcadeDeviousChallengeAllowed = function() {} //null to always allow
            if (args === "debug") {
                TestMode = true;
                KDDebugMode = true;
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: KD Debug mode enabled</p>"
                );
            } else if (args === "devious") {
                if (this.DeviousOn == undefined || this.DeviousOn == false) {
                    DeviousOn = true;
                    ArcadeDeviousChallenge = true;
                    LogAdd("DeviousChallenge", "Arcade", 1, true);
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: Devious Challenge enabled</p>"
                    );
                } else {
                    DeviousOn = false;
                    ArcadeDeviousChallenge = false;
                    LogDelete("DeviousChallenge", "Arcade", true);
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: Devious Challenge disabled</p>"
                    );
                }
            } else {
                ArcadeRun();
                ArcadeKinkyDungeonStart(ReputationChange("Gaming"));
                document.getElementById("InputChat").style.display = "none";
                document.getElementById("TextAreaChatLog").style.display = "none";
                if (args === "") {} else if (args === "maxstats") {
                    setTimeout(function() {
                        KinkyDungeonAddGold(999999);
                        KinkyDungeonBlueKeys = 999;
                        KinkyDungeonEnchantedBlades = 999;
                        KinkyDungeonLockpicks = 999;
                        KinkyDungeonNormalBlades = 999;
                        KinkyDungeonMysticSeals = 999;
                        KinkyDungeonRedKeys = 999;
                        KinkyDungeonSpellPoints = 999;
                        KinkyDungeonChangeConsumable(KinkyDungeonConsumables.PotionFrigid, +99);
                        KinkyDungeonChangeConsumable(KinkyDungeonConsumables.PotionInvisibility, +99);
                        KinkyDungeonChangeConsumable(KinkyDungeonConsumables.PotionMana, +99);
                        KinkyDungeonChangeConsumable(KinkyDungeonConsumables.PotionStamina, +99);
                        KinkyDungeonChangeConsumable(KinkyDungeonConsumables.PotionWill, +99);
                    }, 5000);
                } else if (args === "moreitems") {
                    setTimeout(function() {
                        KinkyDungeonChangeConsumable(KinkyDungeonConsumables.AncientPowerSource, +99);
                        KinkyDungeonChangeConsumable(KinkyDungeonConsumables.AncientPowerSourceSpent, +99);
                        KinkyDungeonChangeConsumable(KinkyDungeonConsumables.Bola, +99);
                        KinkyDungeonChangeConsumable(KinkyDungeonConsumables.Bomb, +99);
                        KinkyDungeonChangeConsumable(KinkyDungeonConsumables.EarthRune, +99);
                        KinkyDungeonChangeConsumable(KinkyDungeonConsumables.Ectoplasm, +99);
                        KinkyDungeonChangeConsumable(KinkyDungeonConsumables.ElfCrystal, +99);
                        KinkyDungeonChangeConsumable(KinkyDungeonConsumables.EnchantedGrinder, +99);
                        KinkyDungeonChangeConsumable(KinkyDungeonConsumables.IceRune, +99);
                        KinkyDungeonChangeConsumable(KinkyDungeonConsumables.ManaOrb, +99);
                        KinkyDungeonChangeConsumable(KinkyDungeonConsumables.MistressKey, +99);
                        KinkyDungeonChangeConsumable(KinkyDungeonConsumables.ScrollArms, +99);
                        KinkyDungeonChangeConsumable(KinkyDungeonConsumables.ScrollLegs, +99);
                        KinkyDungeonChangeConsumable(KinkyDungeonConsumables.ScrollPurity, +99);
                        KinkyDungeonChangeConsumable(KinkyDungeonConsumables.ScrollVerbal, +99);
                        KinkyDungeonChangeConsumable(KinkyDungeonConsumables.SmokeBomb, +99);
                        KinkyDungeonChangeConsumable(KinkyDungeonConsumables.WaterRune, +99);
                    }, 5000);
                } else if (args === "outfits") {
                    setTimeout(function() {
                        KinkyDungeonInventoryAddOutfit("BlueSuit");
                        KinkyDungeonInventoryAddOutfit("BlueSuitPrison");
                        KinkyDungeonInventoryAddOutfit("Dragon");
                        KinkyDungeonInventoryAddOutfit("Elven");
                        KinkyDungeonInventoryAddOutfit("JailUniform");
                        KinkyDungeonInventoryAddOutfit("Maid");
                        KinkyDungeonInventoryAddOutfit("Obsidian");
                        KinkyDungeonInventoryAddOutfit("Wolfgirl");
                    }, 5000);
                } else if (args === "remove") {
                    setTimeout(function() {
                        KinkyDungeonRemoveRestraint("ItemAddon");
                        KinkyDungeonRemoveRestraint("ItemArms");
                        KinkyDungeonRemoveRestraint("ItemBoots");
                        KinkyDungeonRemoveRestraint("ItemBreast");
                        KinkyDungeonRemoveRestraint("ItemButt");
                        KinkyDungeonRemoveRestraint("ItemDevices");
                        KinkyDungeonRemoveRestraint("ItemEars");
                        KinkyDungeonRemoveRestraint("ItemFeet");
                        KinkyDungeonRemoveRestraint("ItemHands");
                        KinkyDungeonRemoveRestraint("ItemHead");
                        KinkyDungeonRemoveRestraint("ItemHood");
                        KinkyDungeonRemoveRestraint("ItemLegs");
                        KinkyDungeonRemoveRestraint("ItemMisc");
                        KinkyDungeonRemoveRestraint("ItemMouth");
                        KinkyDungeonRemoveRestraint("ItemMouth2");
                        KinkyDungeonRemoveRestraint("ItemMouth3");
                        KinkyDungeonRemoveRestraint("ItemNeck");
                        KinkyDungeonRemoveRestraint("ItemNeckAccessories");
                        KinkyDungeonRemoveRestraint("ItemNeckRestraints");
                        KinkyDungeonRemoveRestraint("ItemNipples");
                        KinkyDungeonRemoveRestraint("ItemNipplesPiercings");
                        KinkyDungeonRemoveRestraint("ItemNose");
                        KinkyDungeonRemoveRestraint("ItemPelvis");
                        KinkyDungeonRemoveRestraint("ItemTorso");
                        KinkyDungeonRemoveRestraint("ItemTorso2");
                        KinkyDungeonRemoveRestraint("ItemVulva");
                        KinkyDungeonRemoveRestraint("ItemVulvaPiercings");
                    }, 5000);
                } else if (args === "restraints") {
                    setTimeout(function() {
                        for (var i = 0; i < KinkyDungeonRestraints.length; i++) {
                            if (!Object.hasOwn(KinkyDungeonRestraints[i], "events")) {
                                KinkyDungeonInventoryAdd({
                                    "name": KinkyDungeonRestraints[i].name,
                                    "type": "looserestraint",
                                    "quantity": 2
                                });
                            } else {
                                KinkyDungeonInventoryAdd({
                                    "name": KinkyDungeonRestraints[i].name,
                                    "type": "looserestraint",
                                    "events": KinkyDungeonRestraints[i].events,
                                    "quantity": 2
                                });
                            }
                        }
                    }, 5000);
                } else if (args === "spells") {
                    setTimeout(function() {
                        KinkyDungeonSpells = [{
                                name: "APUp1",
                                school: "Any",
                                manacost: 0,
                                components: [],
                                level: 2,
                                passive: true,
                                type: "",
                                onhit: "",
                                time: 0,
                                delay: 0,
                                range: 0,
                                lifetime: 0,
                                power: 0,
                                damage: "inert"
                            },
                            {
                                name: "APUp2",
                                school: "Any",
                                manacost: 0,
                                components: [],
                                level: 2,
                                passive: true,
                                type: "",
                                onhit: "",
                                time: 0,
                                delay: 0,
                                range: 0,
                                lifetime: 0,
                                power: 0,
                                damage: "inert"
                            },
                            {
                                name: "APUp3",
                                school: "Any",
                                manacost: 0,
                                components: [],
                                level: 2,
                                passive: true,
                                type: "",
                                onhit: "",
                                time: 0,
                                delay: 0,
                                range: 0,
                                lifetime: 0,
                                power: 0,
                                damage: "inert"
                            },
                            {
                                name: "IronWill",
                                tags: ["utility"],
                                school: "Elements",
                                spellPointCost: 2,
                                manacost: 0,
                                components: [],
                                level: 1,
                                passive: true,
                                type: "",
                                onhit: "",
                                time: 0,
                                delay: 0,
                                range: 0,
                                lifetime: 0,
                                power: 0,
                                damage: "inert",
                                events: [{
                                    type: "IronWill",
                                    trigger: "calcMaxStats",
                                    power: 0.4
                                }, ]
                            },
                            {
                                name: "MPUp1",
                                school: "Any",
                                manacost: 0,
                                components: [],
                                level: 2,
                                passive: true,
                                type: "",
                                onhit: "",
                                time: 0,
                                delay: 0,
                                range: 0,
                                lifetime: 0,
                                power: 0,
                                damage: "inert"
                            },
                            {
                                name: "MPUp2",
                                school: "Any",
                                manacost: 0,
                                components: [],
                                level: 2,
                                passive: true,
                                type: "",
                                onhit: "",
                                time: 0,
                                delay: 0,
                                range: 0,
                                lifetime: 0,
                                power: 0,
                                damage: "inert"
                            },
                            {
                                name: "MPUp3",
                                school: "Any",
                                manacost: 0,
                                components: [],
                                level: 2,
                                passive: true,
                                type: "",
                                onhit: "",
                                time: 0,
                                delay: 0,
                                range: 0,
                                lifetime: 0,
                                power: 0,
                                damage: "inert"
                            },
                            {
                                name: "SPUp1",
                                school: "Any",
                                manacost: 0,
                                components: [],
                                level: 2,
                                passive: true,
                                type: "",
                                onhit: "",
                                time: 0,
                                delay: 0,
                                range: 0,
                                lifetime: 0,
                                power: 0,
                                damage: "inert"
                            },
                            {
                                name: "StaffUser1",
                                tags: ["utility"],
                                school: "Elements",
                                manacost: 0,
                                components: [],
                                level: 1,
                                passive: true,
                                type: "",
                                onhit: "",
                                time: 0,
                                delay: 0,
                                range: 0,
                                lifetime: 0,
                                power: 0,
                                damage: "inert",
                                events: [{
                                    type: "StaffUser1",
                                    trigger: "afterCalcMana",
                                    power: 0.8
                                }, ]
                            },
                            {
                                name: "StaffUser2",
                                tags: ["utility"],
                                prerequisite: "StaffUser1",
                                school: "Elements",
                                manacost: 0,
                                components: [],
                                level: 2,
                                passive: true,
                                type: "",
                                onhit: "",
                                time: 0,
                                delay: 0,
                                range: 0,
                                lifetime: 0,
                                power: 0.5,
                                damage: "inert",
                                events: [{
                                    type: "IncreaseManaPool",
                                    trigger: "calcMaxStats",
                                    power: 10
                                }, ]
                            },
                            {
                                name: "StaffUser3",
                                tags: ["utility"],
                                prerequisite: "StaffUser2",
                                school: "Elements",
                                manacost: 0,
                                components: [],
                                level: 3,
                                passive: true,
                                type: "",
                                onhit: "",
                                time: 0,
                                delay: 0,
                                range: 0,
                                lifetime: 0,
                                power: 0,
                                damage: "inert",
                                events: [{
                                    type: "StaffUser3",
                                    trigger: "beforeMultMana",
                                    power: 0.75
                                }, ]
                            },
                            {
                                name: "SummonUp1",
                                school: "Any",
                                manacost: 0,
                                components: [],
                                level: 2,
                                passive: true,
                                type: "",
                                onhit: "",
                                time: 0,
                                delay: 0,
                                range: 0,
                                lifetime: 0,
                                power: 0,
                                damage: "inert"
                            },
                            {
                                name: "SummonUp2",
                                school: "Any",
                                manacost: 0,
                                components: [],
                                level: 3,
                                passive: true,
                                type: "",
                                onhit: "",
                                time: 0,
                                delay: 0,
                                range: 0,
                                lifetime: 0,
                                power: 0,
                                damage: "inert"
                            },
                            {
                                name: "WPUp1",
                                school: "Any",
                                hide: true,
                                manacost: 0,
                                components: [],
                                level: 2,
                                passive: true,
                                type: "",
                                onhit: "",
                                time: 0,
                                delay: 0,
                                range: 0,
                                lifetime: 0,
                                power: 0,
                                damage: "inert"
                            },
                        ];
                    }, 5000);
                } else if (args === "weapons") {
                    setTimeout(function() {
                        KinkyDungeonInventoryAddWeapon("Arbiter");
                        KinkyDungeonInventoryAddWeapon("ArcaneCrystal");
                        KinkyDungeonInventoryAddWeapon("Axe");
                        KinkyDungeonInventoryAddWeapon("Blaster");
                        KinkyDungeonInventoryAddWeapon("BoltCutters");
                        KinkyDungeonInventoryAddWeapon("BondageBuster");
                        KinkyDungeonInventoryAddWeapon("ChainSword");
                        KinkyDungeonInventoryAddWeapon("Crop");
                        KinkyDungeonInventoryAddWeapon("DarkKatana");
                        KinkyDungeonInventoryAddWeapon("Dirk");
                        KinkyDungeonInventoryAddWeapon("Dragonslaver");
                        KinkyDungeonInventoryAddWeapon("Dreamcatcher");
                        KinkyDungeonInventoryAddWeapon("EnchKnife");
                        KinkyDungeonInventoryAddWeapon("EscortDrone");
                        KinkyDungeonInventoryAddWeapon("Feather");
                        KinkyDungeonInventoryAddWeapon("Flail");
                        KinkyDungeonInventoryAddWeapon("Flamberge");
                        KinkyDungeonInventoryAddWeapon("Foil");
                        KinkyDungeonInventoryAddWeapon("FourSeasons");
                        KinkyDungeonInventoryAddWeapon("FrostSword");
                        KinkyDungeonInventoryAddWeapon("Hammer");
                        KinkyDungeonInventoryAddWeapon("IceBreaker");
                        KinkyDungeonInventoryAddWeapon("IceCube");
                        KinkyDungeonInventoryAddWeapon("Katana");
                        KinkyDungeonInventoryAddWeapon("Knife");
                        KinkyDungeonInventoryAddWeapon("MagicAxe");
                        KinkyDungeonInventoryAddWeapon("MagicFlail");
                        KinkyDungeonInventoryAddWeapon("MagicHammer");
                        KinkyDungeonInventoryAddWeapon("MagicSpear");
                        KinkyDungeonInventoryAddWeapon("MagicSword");
                        KinkyDungeonInventoryAddWeapon("MessengerOfLove");
                        KinkyDungeonInventoryAddWeapon("MoiraiScissors");
                        KinkyDungeonInventoryAddWeapon("Pickaxe");
                        KinkyDungeonInventoryAddWeapon("Rapier");
                        KinkyDungeonInventoryAddWeapon("Rope");
                        KinkyDungeonInventoryAddWeapon("Scissors");
                        KinkyDungeonInventoryAddWeapon("Shield");
                        KinkyDungeonInventoryAddWeapon("ShieldMagic");
                        KinkyDungeonInventoryAddWeapon("ShieldReinforced");
                        KinkyDungeonInventoryAddWeapon("ShieldTower");
                        KinkyDungeonInventoryAddWeapon("SlimeSword");
                        KinkyDungeonInventoryAddWeapon("Slimethrower");
                        KinkyDungeonInventoryAddWeapon("Spear");
                        KinkyDungeonInventoryAddWeapon("StaffBind");
                        KinkyDungeonInventoryAddWeapon("StaffChain");
                        KinkyDungeonInventoryAddWeapon("StaffDoll");
                        KinkyDungeonInventoryAddWeapon("StaffElectric");
                        KinkyDungeonInventoryAddWeapon("StaffFlame");
                        KinkyDungeonInventoryAddWeapon("StaffFrostbite");
                        KinkyDungeonInventoryAddWeapon("StaffGlue");
                        KinkyDungeonInventoryAddWeapon("StaffIncineration");
                        KinkyDungeonInventoryAddWeapon("StaffPermafrost");
                        KinkyDungeonInventoryAddWeapon("StaffStorm");
                        KinkyDungeonInventoryAddWeapon("StormBreaker");
                        KinkyDungeonInventoryAddWeapon("Sword");
                        KinkyDungeonInventoryAddWeapon("TheEncaser");
                        KinkyDungeonInventoryAddWeapon("Torch");
                        KinkyDungeonInventoryAddWeapon("VibeWand");
                    }, 5000);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'keydeposit',
        Description: "(hours): keeps your keys safe in the vault.",
        Action: (args) => {
            var hours = args;
            if (hours != '') {
                ServerSend("ChatRoomChat", {
                    Content: "Beep",
                    Type: "Action",
                    Dictionary: [{
                        Tag: "Beep",
                        Text: "" + tmpname + "'s keys are now safe in the vault for " + hours + " hours."
                    }]
                });
                CellDepositKeys(hours);
            }
        }
    }])

    CommandCombine([{
        Tag: 'killpar',
        Description: ": kills UBC/Moaner parameters saved locally.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>Warning</b>: This command will kill all UBC/Moaner parameters saved locally. Use it only if some parameters don't seem to work. Confirm by typing: <b>/killpar yes</b></p>"
                );
            } else if (args === "yes") {
                M_MOANER_deleteControls();
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: All UBC/Moaner parameters have been deleted. Make a full logout/login then use the appropriate commands to set the parameters that you like.</p>"
                );
            }
        }
    }])

    CommandCombine([{
        Tag: 'lock',
        Description: "(target) (locktype) (other parameters): adds locks to all lockable items on specified target.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The lock command has several syntaxes:\n" +
                    "/lock (target) (locktype) for locks 1 to 8 + locks 17 and 19\n" +
                    "/lock (target) (locktype) (r) for lock 9\n" +
                    "/lock (target) (locktype) (code/ptcode) for locks 10 and 20\n" +
                    "/lock (target) (locktype) (password) (r) for locks 11 and 12\n" +
                    "/lock (target) (locktype) (minutes) (h) (i) (r) for locks 13 to 15 + lock 18\n" +
                    "/lock (target) (locktype) (password) (minutes) (h) (i) (r) for lock 16\n" +
                    "ALWAYS SPECIFY THE TARGET. Lock types:\n" +
                    "1 Metal - 2 Exclusive - 3 Intricate - 4 High Security\n" +
                    "5 Pandora - 6 Mistress - 7 Lover - 8 Owner\n" +
                    "9 Five Minutes - 10 Combination - 11 Safeword\n" +
                    "12 Password - 13 Mistress Timer - 14 Lover Timer\n" +
                    "15 Owner Timer - 16 Timer Password\n" +
                    "17 Best Friend - 18 Best Friend Timer\n" +
                    "19 Family - 20 Portal Link\n" +
                    "BCTweaks is required for locks 17 and 18\n" +
                    "Use <b>/lock par</b> for info about other parameters</p>"
                );
            } else if (args === "par") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Special parameters of lock command:\n" +
                    "code must be between 0 and 9999.\n" +
                    "password is limited to 8 characters.\n" +
                    "portal code must include 8 characters, using only 0-9 and a-f.\n" +
                    "maximum time = 240 minutes for locks 13 and 16,\n" +
                    "10080 minutes for locks 14, 15 and 18\n" +
                    " \n" +
                    "Optional parameters:\n" +
                    "h to hide the timer,\n" +
                    "i to enable time input from other players,\n" +
                    "r for item removal when correct password entered\n" +
                    "or lock timer runs out.\n" +
                    " \n" +
                    "Tip: replace h and/or i by another character when you need to skip them.</p>"
                );
            } else {
                var silent = 0;
		var uw = 0;
                var stringLock1 = args;
                var stringLock2 = stringLock1.split(/[ ,]+/);
                var lk = stringLock2[1];
                if (lk == 1) {
                    Lock = "MetalPadlock";
                } else if (lk == 2) {
                    Lock = "ExclusivePadlock";
                } else if (lk == 3) {
                    Lock = "IntricatePadlock";
                } else if (lk == 4) {
                    Lock = "HighSecurityPadlock";
                } else if (lk == 5) {
                    Lock = "PandoraPadlock";
                } else if (lk == 6) {
                    Lock = "MistressPadlock";
                } else if (lk == 7) {
                    Lock = "LoversPadlock";
                } else if (lk == 8) {
                    Lock = "OwnerPadlock";
                } else if (lk == 9) {
                    Lock = "TimerPadlock";
                    var removeitem = stringLock2[2];
                } else if (lk == 10) {
                    Lock = "CombinationPadlock";
                    var code = stringLock2[2];
                } else if (lk == 11) {
                    Lock = "SafewordPadlock";
                    var PS = /^[A-Z]+$/;
                    if (stringLock2[2] != null) {
                        var pw = stringLock2[2].toUpperCase();
                    } else {
                        var pw = "PLEASE";
                    }
                    var removeitem = stringLock2[3];
                } else if (lk == 12) {
                    Lock = "PasswordPadlock";
                    var PS = /^[A-Z]+$/;
                    if (stringLock2[2] != null) {
                        var pw = stringLock2[2].toUpperCase();
                    } else {
                        var pw = "PASSWORD";
                    }
                    var removeitem = stringLock2[3];
                } else if (lk == 13) {
                    Lock = "MistressTimerPadlock";
                    var minutes = stringLock2[2];
                    time = (minutes - 5);
                    var hidetimer = stringLock2[3];
                    var enableinput = stringLock2[4];
                    var removeitem = stringLock2[5];
                } else if (lk == 14) {
                    Lock = "LoversTimerPadlock";
                    var minutes = stringLock2[2];
                    time = (minutes - 5);
                    var hidetimer = stringLock2[3];
                    var enableinput = stringLock2[4];
                    var removeitem = stringLock2[5];
                } else if (lk == 15) {
                    Lock = "OwnerTimerPadlock";
                    var minutes = stringLock2[2];
                    time = (minutes - 5);
                    var hidetimer = stringLock2[3];
                    var enableinput = stringLock2[4];
                    var removeitem = stringLock2[5];
                } else if (lk == 16) {
                    Lock = "TimerPasswordPadlock";
                    var PS = /^[A-Z]+$/;
                    if (stringLock2[2] != null) {
                        var pw = stringLock2[2].toUpperCase();
                    } else {
                        var pw = "PASSWORD";
                    }
                    var minutes = stringLock2[3];
                    time = (minutes - 5);
                    var hidetimer = stringLock2[4];
                    var enableinput = stringLock2[5];
                    var removeitem = stringLock2[6];
                } else if (lk == 17) {
                    Lock = "Best Friend Padlock";
                } else if (lk == 18) {
                    Lock = "Best Friend Timer Padlock";
                    if (stringLock2[2] == null) {
                        var minutes = 1;
                    } else {
                        var minutes = stringLock2[2];
                    }
                    if (minutes > 10080) {
                        time = 100800;
                    } else {
                        time = (minutes + 5);
                    }
                    var hidetimer = stringLock2[3];
                    var enableinput = stringLock2[4];
                    var removeitem = stringLock2[5];
                } else if (lk == 19) {
                    Lock = "FamilyPadlock";
                } else if (lk == 20) {
                    Lock = "PortalLinkPadlock";
                    var PTS = /^[0-9a-f]+$/;
                    var ptcode = stringLock2[2];
                }
                var targetname = stringLock2[0];
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && ((target[0] == Player) || (target[0].AllowItem == true)) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if (tmpname == tgpname) {
                        if (Mlock == undefined) {
                            var message = "Magical lasers make appear locks on " + tgpname + "'s body."
                        } else {
                            if (Mlock != "") {
                                if (Mlock.startsWith("\u0027")) {
                                    var message = tmpname + Mlock;
                                } else {
                                    var message = tmpname + ' '.repeat(1) + Mlock;
                                }
                            } else {
                                var message = "Magical lasers make appear locks on " + tgpname + "'s body."
                            }
                        }
                        if (Mlock == "no message") var silent = 1;
                    } else {
                        if (target[0].OnlineSharedSettings.Uwall == true) {
                            var uw = 1;
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                            );
                        } else  { 
                            if (Tlock == undefined) {
                                var message = "Magical lasers make appear locks on " + tgpname + "'s body."
                            } else {
                                if (Tlock != "") {
                                    if (Tlock.startsWith("\u0027")) {
                                        var message = tmpname + Tlock + ' '.repeat(1) + tgpname;
                                    } else {
                                        var message = tmpname + ' '.repeat(1) + Tlock + ' '.repeat(1) + tgpname;
                                    }
                                } else {
                                    var message = "Magical lasers make appear locks on " + tgpname + "'s body."
                                }
                            }
                            if (Tlock == "no message") var silent = 1;                 
                        }
                    }
                    if (uw == 0) {
                        if (silent == 0) {
                            ServerSend("ChatRoomChat", {
                                Content: "Beep",
                                Type: "Action",
                                Dictionary: [{
                                    Tag: "Beep",
                                    Text: message
                                }]
                            });
                        }
                        mn = Player.MemberNumber;
                        for (let A = 0; A < target[0].Appearance.length; A++)
                            if (target[0].Appearance[A].Asset.AllowLock == true) {
                                if (((target[0].Appearance[A].Property != null) && (target[0].Appearance[A].Property.LockedBy == null)) || (target[0].Appearance[A].Property == null)) {
                                    if (lk != 20) {
                                    InventoryLock(target[0], target[0].Appearance[A], Lock, mn);
                                    } else {
                                        if (target[0].Appearance[A].Property.Attribute != null) {
                                            if (target[0].Appearance[A].Property.Attribute.includes("PortalLinkLockable")) {
                                            InventoryLock(target[0], target[0].Appearance[A], Lock, mn);
                                            }
                                        }
                                    }
                                    if (removeitem == "r") {
                                    target[0].Appearance[A].Property.RemoveOnUnlock = true;
                                    target[0].Appearance[A].Property.RemoveItem = true;
                                    }
                                    if (minutes != null) {
                                        if (lk == 18) {
                                        target[0].Appearance[A].Property.MaxTime = 604800;
                                        target[0].Appearance[A].Property.RemovalTime = Math.round(CurrentTime + time * 60 * 100);
                                        } else {
                                        target[0].Appearance[A].Property.RemoveTimer = target[0].Appearance[A].Property.RemoveTimer + (time * 60 * 1000);
                                        }
                                    }
                                    if (hidetimer == "h") {
                                    target[0].Appearance[A].Property.ShowTimer = false;
                                    }
                                    if (enableinput == "i") {
                                    target[0].Appearance[A].Property.EnableRandomInput = true;
                                    }
                                    if ((code != null) && (code > -1) && (code < 10000)) {
                                    target[0].Appearance[A].Property.CombinationNumber = code;
                                    }
                                    if ((ptcode != null) && (ptcode.length == 8) && (ptcode.match(PTS))) {
                                    target[0].Appearance[A].Property.PortalLinkCode = ptcode;
                                    }
                                    if ((pw != null) && (pw.length <= 8) && (pw.match(PS))) {
                                    target[0].Appearance[A].Property.Password = pw;
                                    }
                                    if ((lk == 17) || (lk == 18)) {
                                    target[0].Appearance[A].Property.LockedBy = "HighSecurityPadlock";
                                    target[0].Appearance[A].Property.LockPickSeed = "8,3,5,10,4,2,6,7,1,9,0,11";
                                        let listOwnerLovers = new Set();
                                        if (target[0].Ownership && target[0].Ownership.MemberNumber != null) {
                                        listOwnerLovers.add(target[0].Ownership.MemberNumber);
                                        }
                                        if (target[0].Lovership) {
                                            for (let L = 0; L < target[0].Lovership.length; L++) {
                                                const lover = target[0].Lovership[L];
                                                if (lover.MemberNumber != null)
                                                listOwnerLovers.add(target[0].Lovership[L].MemberNumber);
                                            }
                                        }
                                    target[0].Appearance[A].Property.MemberNumberListKeys = "-1," + Array.from(listOwnerLovers).join(",");
                                    }
                                    if (lk == 17) {
                                    target[0].Appearance[A].Property.Name = "Best Friend Padlock";
                                    }
                                    if (lk == 18) {
                                    target[0].Appearance[A].Property.Name = "Best Friend Timer Padlock";
                                    }
                                }
                            }
                        ChatRoomCharacterUpdate(target[0]);
                    }
                }
                ChatRoomSetTarget(null);
            }
        }
    }])

    CommandCombine([{
        Tag: 'login',
        Description: "(accountname) (password): logs in a new account.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The login command must be followed by an account name and a password.</p>"
                );
            } else {
                var stringLogin1 = args;
                var stringLogin2 = stringLogin1.split(/[ ,]+/);
                this.LoginName = SpeechGarbleByGagLevel(6, stringLogin2[0]);
                this.LoginPassword = SpeechGarbleByGagLevel(6, stringLogin2[1]);
                ServerSocket.close();
                ServerSocket.open();
                ServerSend("AccountLogin", {
                    AccountName: stringLogin2[0],
                    Password: stringLogin2[1]
                });
                setTimeout(function() {
                    ChatRoomClearAllElements();
                }, 3000);
            }
        }
    }])

    CommandCombine([{
        Tag: 'mapfog',
        Description: ": toggles fog in current mapped room.",
        Action: () => {
            if ((ChatRoomData.MapData == null) || (ChatRoomData.MapData.Type == null) || (ChatRoomData.MapData.Type == "Never")) {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: This room does not use the map feature.</p>"
                    );
            } else {
                if ((ChatRoomData.MapData.Fog == true || ChatRoomData.MapData.Fog == undefined)) {
                    ChatRoomData.MapData.Fog = false;
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: Fog in current mapped room is disabled. No visible effect if mapfull command has enabled full vision and hearing in mapped rooms.</p>"
                     );
                } else {
                    ChatRoomData.MapData.Fog = true;
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: Fog in current mapped room is enabled. No visible effect if mapfull command has enabled full vision and hearing in mapped rooms.</p>"
                    );
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'mapfull',
        Description: ": toggles full vision and hearing in mapped rooms.",
        Action: () => {
            if ((ChatRoomData.MapData == null) || (ChatRoomData.MapData.Type == null) || (ChatRoomData.MapData.Type == "Never")) {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: This room does not use the map feature.</p>"
                    );
            } else {
                if (MapfullOn == true) {
                    MapfullOn = false;
                    M_MOANER_saveControls();
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: Full vision and hearing in mapped rooms is disabled. Fog is also back if not disabled with mapfog command.</p>"
                     );
                } else {
                    MapfullOn = true;
                    M_MOANER_saveControls();
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: Full vision and hearing in mapped rooms is enabled. Fog is also removed. Will be disabled if you use this toggle again or relog.</p>"
                    );
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'mapkeys',
        Description: ": gives all keys for current mapped chat room.",
        Action: () => {
            if ((ChatRoomData.MapData == null) || (ChatRoomData.MapData.Type == null) || (ChatRoomData.MapData.Type == "Never")) {
                ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: This room does not use the map feature.</p>"
                    );       
            } else {
                if (Player.MapData == undefined) {
                     ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: You fon't have entered the map.</p>"
                    );
                } else {
                    Player.MapData.PrivateState.HasKeyGold = true;
                    Player.MapData.PrivateState.HasKeySilver = true;
                    Player.MapData.PrivateState.HasKeyBronze = true;
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: You have now the three keys.</p>"
                    );
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'maproom',
        Description: ": gives infos about location of players in current mapped chat room.",
        Action: () => {
            if ((ChatRoomData.MapData == null) || (ChatRoomData.MapData.Type == null) || (ChatRoomData.MapData.Type == "Never")) {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: This room does not use the map feature.</p>"
                ); 
            } else {
                let pl = 0;
                while (pl < ChatRoomCharacter.length) {
                    if ((ChatRoomCharacter[pl].Nickname == '') || (ChatRoomCharacter[pl].Nickname == undefined)) {
                        var name = ChatRoomCharacter[pl].Name;
                        var aka = "";
                    } else {
                        var name = ChatRoomCharacter[pl].Nickname; 
                        var aka =  ChatRoomCharacter[pl].Name;
                    }
                    var number = ChatRoomCharacter[pl].MemberNumber;
                    ChatRoomSendLocal(name + " (" + aka + ") - " + number);           
                    if (ChatRoomCharacter[pl].MapData != undefined) {
			if (ChatRoomData.MapData.Type == "Hybrid"){
                            var exinfo = "Real presence in map: ?"; 
                        } else {
                            var exinfo = "Real presence in map: YES";                 
                        }
                        ChatRoomSendLocal("X = " + ChatRoomCharacter[pl].MapData.Pos.X + " - Y = " + ChatRoomCharacter[pl].MapData.Pos.Y + " - " + exinfo);
                    } else {
                        ChatRoomSendLocal("Does not have entered map");  
                    }   
                ChatRoomSendLocal(" "); 
                pl ++;
                } 
            }
        }
    }])

    CommandCombine([{
        Tag: 'mapx',
        Description: "(x-position): changes your X coordinate in the map.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The mapx command must be followed by a number between 0 and 39."
                );
            } else {
                if ((ChatRoomData.MapData == null) || (ChatRoomData.MapData.Type == null) || (ChatRoomData.MapData.Type == "Never")) {
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: This room does not use the map feature.</p>"
                    ); 
                } else {
                    var plx = args;
                    if ((plx > -1) && (plx < 40) && (plx != Player.MapData.Pos.X)) {  
                        if (plx < Player.MapData.Pos.X) {
                            D = "West";
                            m = (Player.MapData.Pos.X - plx);
                        }  
                        if (plx > Player.MapData.Pos.X) {
                            D = "East";
                            m = (plx - Player.MapData.Pos.X);
                        }   
                        let X = Player.MapData.Pos.X + ((D == "West") ? -m : 0) + ((D == "East") ? m : 0);
                        let Y = Player.MapData.Pos.Y;
                        let Time = ChatRoomMapViewCanEnterTile(X, Y);
                        if (Time > 0) {
		            ChatRoomMapViewMovement = {
			        X: X,
			        Y: Y,
			        Direction: D,
			        TimeStart: CommonTime(),
			        TimeEnd: CommonTime() + Time
		            };
	                }
                        ChatRoomMapViewUpdatePlayerNext = null;
                        ServerAccountUpdate.QueueData({ MapData: Player.MapData }, true);
                    }
                }
            }
        }
    }])
   
    CommandCombine([{
        Tag: 'mapy',
        Description: "(y-position): changes your Y coordinate in the map.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The mapy command must be followed by a number between 0 and 39."
                );
            } else { 
                if ((ChatRoomData.MapData == null) || (ChatRoomData.MapData.Type == null) || (ChatRoomData.MapData.Type == "Never")) {
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: This room does not use the map feature.</p>"
                    );
                } else {
                    var ply = args;
                    if ((ply > -1) && (ply < 40) && (ply != Player.MapData.Pos.Y)) {
                        if (ply < Player.MapData.Pos.Y) {
                            D = "North";
                            m = (Player.MapData.Pos.Y - ply);
                        }  
                        if (ply > Player.MapData.Pos.Y) {
                            D = "South";
                            m = (ply - Player.MapData.Pos.Y);
                        }                 
                        let X = Player.MapData.Pos.X;
                        let Y = Player.MapData.Pos.Y + ((D == "North") ? -m : 0) + ((D == "South") ? m : 0);
                        let Time = ChatRoomMapViewCanEnterTile(X, Y);
                        if (Time > 0) {
		            ChatRoomMapViewMovement = {
			        X: X,
			        Y: Y,
			        Direction: D,
			        TimeStart: CommonTime(),
			        TimeEnd: CommonTime() + Time
		            };
	                }
                        ChatRoomMapViewUpdatePlayerNext = null;
                        ServerAccountUpdate.QueueData({ MapData: Player.MapData }, true);
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'maxstatistics',
        Description: ": gives max statistics.",
        Action: () => {
            SkillChange(Player, "Infiltration", 10);
            SkillChange(Player, "SelfBondage", 10);
            SkillChange(Player, "Willpower", 10);
            SkillChange(Player, "Evasion", 10);
            SkillChange(Player, "Bondage", 10);
            SkillChange(Player, "Dressage", 10);
            SkillChange(Player, "LockPicking", 10)
            ReputationChange("Gaming", 100);
            ReputationChange("Gambling", 100);
            ReputationChange("LARP", 100);
            ReputationChange("Maid", 100);
            ReputationChange("ABDL", 100);
            ReputationChange("Nurse", 100);
            GameLARPLevelProgress(10000);
            LogAdd("BondageCollege", "Import");
            LogAdd("KidnapSophie", "Sarah");
            ChatRoomSendLocal(
                "<p style='background-color:#5fbd7a'>ULTRAbc: A few things have to be set manually. See the /roleplay and /rolequit commands.</p>"
            );
        }
    }])

    CommandCombine([{
        Tag: 'mbsroom',
        Description: ": gives infos about MBS wheels of fortune in current chat room.",
        Action: () => {
            let pl = 0;
            while (pl < ChatRoomCharacter.length) {
                if ((ChatRoomCharacter[pl].Nickname == '') || (ChatRoomCharacter[pl].Nickname == undefined)) {
                    var name = ChatRoomCharacter[pl].Name;
		    var aka = "";
                } else {
                    var name = ChatRoomCharacter[pl].Nickname; 
		    var aka =  ChatRoomCharacter[pl].Name;
                }
                var number = ChatRoomCharacter[pl].MemberNumber;
                ChatRoomSendLocal(name + " (" + aka + ") - " + number);
                if (!InventoryAvailable(ChatRoomCharacter[pl], "WheelFortune", "ItemDevices")) {                
                    ChatRoomSendLocal("Does not have a wheel of fortune.");
                } else {
                    if (ChatRoomCharacter[pl].OnlineSharedSettings.MBS == undefined) {
                        ChatRoomSendLocal("Does not have a MBS wheel of fortune.");
                    }
                    if (ChatRoomCharacter[pl].OnlineSharedSettings.MBS != undefined) {
                        ChatRoomSendLocal("Has a MBS wheel of fortune.");     
                        if (ChatRoomCharacter[pl].OnlineSharedSettings.MBS.Version != undefined) {
                            ChatRoomSendLocal("Does not have custom options on this wheel.");      
                        } else {
			    str = ChatRoomCharacter[pl].OnlineSharedSettings.MBS;
                            var stringMBSver1 = ChatRoomCharacter[pl].OnlineSharedSettings.MBSVersion;
                            var stringMBSver2 = stringMBSver1.split(".");
                            var MBS1 = stringMBSver2[0];
                            var MBS2 = stringMBSver2[1];
                            var MBS3 = stringMBSver2[2];
                            if ((MBS1 == 0) && (MBS2 <= 6) && (MBS3 <= 22)) {
                                d = LZString.decompressFromBase64(str);
                            } else {
                                d = LZString.decompressFromUTF16(str);
                            }
                            MBSwhdata = {};
                            decoded = JSON.parse(d);
                            MBSwhdata = decoded; 
                            var j = 0; 
                            for (let i = 0; i < 32; i++)
                                if (MBSwhdata.FortuneWheelItemSets[i] != null) {
                                    j = j + 1;
                                    ChatRoomSendLocal(i + " - " + MBSwhdata.FortuneWheelItemSets[i].name);
                                }
                                if (j == 0) {
                                    ChatRoomSendLocal("Does not have custom options on this wheel."); 
                                }
                        }
                    }                     
		}
            ChatRoomSendLocal(" "); 
            pl ++;
            } 
        }
    }])

    CommandCombine([{
        Tag: 'message',
        Description: "(option) (message): creates custom message for a specific command.",
        Action: (_, command, args) => {
            var [option] = args;
            if (!option) {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The message command must be followed by a command and the message you want instead of the default message.\n" +
                    "Options on yourself: clothes, lock, naked, pet, randomize, restrain, solidity, totalrelease, underwear, unlock, untie\n" +
                    "Options on other players: tclothes, tlock, tnaked, tpet, trandomize, trestrain, tsolidity, ttotalrelease, tunderwear, tunlock, tuntie\n" +
                    " \n" +
                    "When writing your message, don't forget that your name or nickname will be added before it\n" +
                    "When acting on another player, the target name or nickname will be added after the message\n" +
                    "Use ? as message to go back to default message\n" + 
                    "Use ! as message to select silent mode (no message)</p>" 
                );
            } else {
                var [, , ...message] = command.split(" ");
                var custom = message?.join(" ");
                if (custom != "") {
                    if (option == "clothes") {
                        if (custom == "!") {
                            Clothes = "no message";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Silent mode saved for clothes command on yourself.</p>"
                            ); 
                        } else if (custom == "?") {
                            Clothes = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for clothes command on yourself.</p>"
                            );
                        } else {
                            Clothes = custom;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for clothes command on yourself.</p>"
                            );
                        } 
                    }
                    if (option == "lock") {
                        if (custom == "!") {
                            Mlock = "no message";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Silent mode saved for lock command on yourself.</p>"
                            ); 
                        } else if (custom == "?") {
                            Mlock = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for lock command on yourself.</p>"
                            );
                        } else {
                            Mlock = custom;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for lock command on yourself.</p>"
                            );
                        } 
                    }
                    if (option == "naked") {
                        if (custom == "!") {
                            Naked = "no message";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Silent mode saved for naked command on yourself.</p>"
                            ); 
                        } else if (custom == "?") {
                            Naked = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for naked command on yourself.</p>"
                            );
                        } else {
                            Naked = custom;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for naked command on yourself.</p>"
                            );
                        } 
                    }
                    if (option == "pet") {
                        if (custom == "!") {
                            Pet = "no message";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Silent mode saved for pet command on yourself.</p>"
                            ); 
                        } else if (custom == "?") {
                            Pet = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for pet command on yourself.</p>"
                            );
                        } else {
                            Pet = custom;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for pet command on yourself.</p>"
                            );
                        } 
                    }
                    if (option == "randomize") {
                        if (custom == "!") {
                            Randomize = "no message";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Silent mode saved for randomize command on yourself.</p>"
                            ); 
                        } else if (custom == "?") {
                            Randomize = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for randomize command on yourself.</p>"
                            );
                        } else {
                            Randomize = custom;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for randomize command on yourself.</p>"
                            );
                        } 
                    }
                    if (option == "restrain") {
                        if (custom == "!") {
                            Restrain = "no message";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Silent mode saved for restrain command on yourself.</p>"
                            ); 
                        } else if (custom == "?") {
                            Restrain = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for restrain command on yourself.</p>"
                            );
                        } else {
                            Restrain = custom;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for restrain command on yourself.</p>"
                            );
                        } 
                    }
		    if (option == "solidity") {
                        if (custom == "!") {
                            Solidity = "no message";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Silent mode saved for solidity command to escape yourself special devices.</p>"
                            ); 
                        } else if (custom == "?") {
                            Solidity = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for solidity command to escape yourself special devices.</p>"
                            );
                        } else {
                            Solidity = custom;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for solidity command to escape yourself special devices.</p>"
                            );
                        } 
                    }
                    if (option == "tclothes") {
                        if (custom == "!") {
                            Tclothes = "no message";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Silent mode saved for clothes command on other players.</p>"
                            ); 
                        } else if (custom == "?") {
                            Tclothes = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for clothes command on other players.</p>"
                            );
                        } else {
                            Tclothes = custom;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for clothes command on other players.</p>"
                            );
                        } 
                    }
                    if (option == "tlock") {
                        if (custom == "!") {
                            Tlock = "no message";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Silent mode saved for lock command on other players.</p>"
                            ); 
                        } else if (custom == "?") {
                            Tlock = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for lock command on other players.</p>"
                            );
                        } else {
                            Tlock = custom;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for lock command on other players.</p>"
                            );
                        } 
                    }
                    if (option == "tnaked") {
                        if (custom == "!") {
                            Tnaked = "no message";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Silent mode saved for naked command on other players.</p>"
                            ); 
                        } else if (custom == "?") {
                            Tnaked = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for naked command on other players.</p>"
                            );
                        } else {
                            Tnaked = custom;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for naked command on other players.</p>"
                            );
                        } 
                    }
                    if (option == "totalrelease") {
                        if (custom == "!") {
                            Totalrelease = "no message";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Silent mode saved for totalrelease command on yourself.</p>"
                            ); 
                        } else if (custom == "?") {
                            Totalrelease = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for totalrelease command on yourself.</p>"
                            );
                        } else {
                            Totalrelease = custom;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for totalrelease command on yourself.</p>"
                            );
                        } 
                    }
                    if (option == "tpet") {
                        if (custom == "!") {
                            Tpet = "no message";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Silent mode saved for pet command on other players.</p>"
                            ); 
                        } else if (custom == "?") {
                            Tpet = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for pet command on other players.</p>"
                            );
                        } else {
                            Tpet = custom;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for pet command on other players.</p>"
                            );
                        } 
                    }
                    if (option == "trandomize") {
                        if (custom == "!") {
                            Trandomize = "no message";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Silent mode saved for randomize command on other players.</p>"
                            ); 
                        } else if (custom == "?") {
                            Trandomize = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for randomize command on other players.</p>"
                            );
                        } else {
                            Trandomize = custom;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for randomize command on other players.</p>"
                            );
                        } 
                    }
                    if (option == "trestrain") {
                        if (custom == "!") {
                            Trestrain = "no message";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Silent mode saved for restrain command on other players.</p>"
                            ); 
                        } else if (custom == "?") {
                            Trestrain = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for restrain command on other players.</p>"
                            );
                        } else {
                            Trestrain = custom;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for restrain command on other players.</p>"
                            );
                        } 
                    }
		    if (option == "tsolidity") {
                        if (custom == "!") {
                            Tsolidity = "no message";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Silent mode saved for solidity command when helping another player to escape special devices.</p>"
                            ); 
                        } else if (custom == "?") {
                            Tsolidity = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for solidity command when helping another player to escape special devices.</p>"
                            );
                        } else {
                            Tsolidity = custom;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for solidity command when helping another player to escape special devices.</p>"
                            );
                        } 
                    }
                    if (option == "ttotalrelease") {
                        if (custom == "!") {
                            Ttotalrelease = "no message";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Silent mode saved for totalrelease command on other players.</p>"
                            ); 
                        } else if (custom == "?") {
                            Ttotalrelease = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for totalrelease command on other players.</p>"
                            );
                        } else {
                            Ttotalrelease = custom;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for totalrelease command on other players.</p>"
                            );
                        } 
                    }
                    if (option == "tunderwear") {
                        if (custom == "!") {
                            Tunderwear = "no message";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Silent mode saved for underwear command on other players.</p>"
                            ); 
                        } else if (custom == "?") {
                            Tunderwear = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for underwear command on other players.</p>"
                            );
                        } else {
                            Tunderwear = custom;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for underwear command on other players.</p>"
                            );
                        } 
                    }
                    if (option == "tunlock") {
                        if (custom == "!") {
                            Tunlock = "no message";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Silent mode saved for unlock command on other players.</p>"
                            ); 
                        } else if (custom == "?") {
                            Tunlock = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for unlock command on other players.</p>"
                            );
                        } else {
                            Tunlock = custom;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for unlock command on other players.</p>"
                            );
                        } 
                    }
                    if (option == "tuntie") {
                        if (custom == "!") {
                            Tuntie = "no message";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Silent mode saved for untie command on other players.</p>"
                            ); 
                        } else if (custom == "?") {
                            Tuntie = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for untie command on other players.</p>"
                            );
                        } else {
                            Tuntie = custom;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for untie command on other players.</p>"
                            );
                        } 
                    }
                    if (option == "underwear") {
                        if (custom == "!") {
                            Underwear = "no message";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Silent mode saved for underwear command on yourself.</p>"
                            ); 
                        } else if (custom == "?") {
                            Underwear = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for underwear command on yourself.</p>"
                            );
                        } else {
                            Underwear = custom;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for underwear command on yourself.</p>"
                            );
                        } 
                    }
                    if (option == "unlock") {
                        if (custom == "!") {
                            Unlock = "no message";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Silent mode saved for unlock command on yourself.</p>"
                            ); 
                        } else if (custom == "?") {
                            Unlock = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for unlock command on yourself.</p>"
                            );
                        } else {
                            Unlock = custom;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for unlock command on yourself.</p>"
                            );
                        } 
                    }
                    if (option == "untie") {
                        if (custom == "!") {
                            Untie = "no message";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Silent mode saved for untie command on yourself.</p>"
                            ); 
                        } else if (custom == "?") {
                            Untie = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for untie command on yourself.</p>"
                            );
                        } else {
                            Untie = custom;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for untie command on yourself.</p>"
                            );
                        } 
                    }                    
                }
            }
        }
    }])

   CommandCombine([{
        Tag: 'mission',
        Description: "(mission): goes to infiltration room and forces a specific mission.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The mission command must include a mission.\n" +
                    "Available missions:\n" +
                    "burglar, kidnap, rescue, retrieve, sabotage.\n" +  
                    "Full random mission with random.</p>"                                     
                );
            } else {
                var mission = args;
                if (mission == "random") {
                    var InfiltrationMissionType = ["Rescue", "Kidnap", "Retrieve", "CatBurglar", "ReverseMaid"];
                }
                if (mission == "burglar") {
                    var InfiltrationMissionType = ["CatBurglar"];
                }
                if (mission == "kidnap") {
                    var InfiltrationMissionType = ["Kidnap"];
                }
                if (mission == "rescue") {
                    var InfiltrationMissionType = ["Rescue"];
                }
                if (mission == "retrieve") {
                    var InfiltrationMissionType = ["Retrieve"];
                }
                if (mission == "sabotage") {
                    var InfiltrationMissionType = ["ReverseMaid"];
                }
                InfiltrationMission = CommonRandomItemFromList(InfiltrationMission, InfiltrationMissionType);
                ServerSend("ChatRoomLeave", "");
                ChatRoomSetLastChatRoom("");
                OnlineGameName = "";
                ChatRoomClearAllElements();
                CommonSetScreen("Room", "Infiltration");
            }
        }
    }])

    CommandCombine([{
        Tag: 'moaner',
        Description: "(options): moans when horny and stimulated.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Several actions are possible with the moaner command:\n" +
                    "<b>/moaner on</b> = starts the moaner\n" +
                    "<b>/moaner off</b> = stops the moaner\n" +
                    "<b>/moaner profile</b> (profilename) =  selects a moaner profile. Without profilename, access to moaner profile help\n" +
                    "<b>/moaner status</b> = displays current moaner status\n" +
                    " \n" +
                    "You can also enable/disable parts of the Moaner with:\n" +
                    "<b>/moaner orgasm</b> = toggles moans when you cum\n" +
                    "<b>/moaner spank</b> = toggles moans when you are spanked\n" +
                    "<b>/moaner talk</b> = toggles moans when talking if vibed\n" +
                    "<b>/moaner tickle</b> = toggles moans when you are tickled\n" +
                    "<b>/moaner vibe</b> = toggles moans when your vibes settings change\n" +
                    "<b>/moaner xvibe</b> = toggles moans when vibes settings of other players change</p>"
                );
            } else {
                var stringMoan1 = args;
                var stringMoan2 = stringMoan1.split(/[ ,]+/);
                var feature = stringMoan2[0];
                if ((feature == "on") || (feature == "off")) {
                    scriptControl(feature);
                    M_MOANER_saveControls();
                } else {
                    var commande = stringMoan2[1];
                    if (feature == "orgasm") {
                        orgasmControl(commande);
                        M_MOANER_saveControls();
                    } else if (feature == "profile") {
                        if (commande == null) {
                            profilesList();
                        } else if (commande != null) {
                            M_MOANER_activerProfile(commande);
                            M_MOANER_saveControls();
                        }
                        showM_MOANER_profileStatus();
                    } else if (feature == "spank") {
                        spankControl(commande);
                        M_MOANER_saveControls();
                    } else if (feature == "status") {
                        showStatus();
                    } else if (feature == "talk") {
                        talkControl(commande);
                        M_MOANER_saveControls();
                    } else if (feature == "tickle") {
                        tickleControl(commande);
                        M_MOANER_saveControls();
                    } else if (feature == "vibe") {
                        vibeControl(commande);
                        M_MOANER_saveControls();
                    } else if (feature == "xvibe") {
                        xvibeControl(commande);
                        M_MOANER_saveControls();
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'murmur',
        Description: "(target) (message): sends whisper to specified target.",
        Action: (_, command, args) => {
            if (NowhisperOn == false) {
                var [targetname] = args;
                if (!targetname) {
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The murmur command must be followed by a target and the message you want to whisper.\n" +
                        "You can omit the message if you want only to set the target for your whispers.</p>"
                    );
                } else {
                    var [, , ...message] = command.split(" ");
                    var msg = message?.join(" ");
                    var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                    if (target[0] == null) {
                        var targetnumber = parseInt(targetname);
                        target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                    }
                    if (target[0] != null) {
                        ElementValue("InputChat", msg);
                        if (this.BabyTalkOn == true) {
                            var msg2 = SpeechBabyTalk({
                                Effect: ["RegressedTalk"]
                            }, msg);
                        } else if (this.GagTalkOn == true) {
                            var msg2 = SpeechGarbleByGagLevel(gl, msg);
                        } else {
                            var msg2 = msg;
                        }
                        ElementValue("InputChat", msg.replace(msg, msg2));
                        if (this.Stutter1On == true) {
                            var msg3 = StutterTalk1(msg2);
                        } else if (this.Stutter2On == true) {
                            var msg3 = StutterTalk2(msg2);
                        } else if (this.Stutter3On == true) {
                            var msg3 = StutterTalk3(msg2);
                        } else if (this.Stutter4On == true) {
                            var msg3 = StutterTalk4(msg2);
                        } else {
                            var msg3 = msg2;
                        }
                        ElementValue("InputChat", msg2.replace(msg2, msg3));
                        if (M_MOANER_talkActive && M_MOANER_scriptOn && IsStimulated(Player)) {
                            var msg4 = M_MOANER_applyMoanToMsg(Player, msg3);
                        } else {
                            var msg4 = msg3;
                        }
                        ElementValue("InputChat", msg3.replace(msg3, msg4));
                        ChatRoomTargetMemberNumber = target[0].MemberNumber;
                        if (msg != "") {
                            ServerSend("ChatRoomChat", {
                                "Content": msg4,
                                "Type": "Whisper",
                                "Target": ChatRoomTargetMemberNumber
                            });
                            for (let C = 0; C < ChatRoomCharacter.length; C++)
                                if (ChatRoomTargetMemberNumber == ChatRoomCharacter[C].MemberNumber) {
                                    if ((ChatRoomCharacter[C].Nickname == '') || (ChatRoomCharacter[C].Nickname == undefined)) {
                                        TargetName = ChatRoomCharacter[C].Name;
                                    } else {
                                        TargetName = ChatRoomCharacter[C].Nickname;
                                    }
                                    break;
                                }
                            ChatRoomMessage({
                                Content: "Whisper to " + TargetName + ": " + msg4,
                                Type: "LocalMessage",
                                Sender: Player.MemberNumber
                            });
                            document.querySelector('#TextAreaChatLog').lastChild.style.fontStyle = "italic";
                            document.querySelector('#TextAreaChatLog').lastChild.style.color = "silver";
                        }
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'naked',
        Description: "(target): removes clothes.",
        Action: (args) => {
            if (args === "") {
                if (Naked == undefined) {
                    var message = "Magical lasers make disappear the clothes on " + tmpname + "'s body."
                } else {
                    if (Naked != "") {
                        if (Naked.startsWith("\u0027")) {
                            var message = tmpname + Naked;
                        } else {
                            var message = tmpname + ' '.repeat(1) + Naked;
                        }
                    } else {
                        var message = "Magical lasers make disappear the clothes on " + tmpname + "'s body."
                    }
                }
                if (Naked != "no message") {
                    ServerSend("ChatRoomChat", {
                        Content: "Beep",
                        Type: "Action",
                        Dictionary: [{
                            Tag: "Beep",
                            Text: message
                        }]
                    });
                }
                CharacterNaked(Player);
                ChatRoomCharacterUpdate(Player);
            } else {
                var targetname = args;
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].AllowItem == true) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if (target[0].OnlineSharedSettings.Uwall == true) {
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                        );
                    } else {  
                        if (Tnaked == undefined) {
                            var message = "Magical lasers make disappear the clothes on " + tgpname + "'s body."
                        } else {
                            if (Tnaked != "") {
                                if (Tnaked.startsWith("\u0027")) {
                                    var message = tmpname + Tnaked + ' '.repeat(1) + tgpname;
                                } else {
                                    var message = tmpname + ' '.repeat(1) + Tnaked + ' '.repeat(1) + tgpname;
                                }
                            } else {
                                var message = "Magical lasers make disappear the clothes on " + tgpname + "'s body."
                            }
                        }
                        if (Tnaked != "no message") {
                            ServerSend("ChatRoomChat", {
                                Content: "Beep",
                                Type: "Action",
                                Dictionary: [{
                                    Tag: "Beep",
                                    Text: message
                                }]
                            });
                        }
                        CharacterNaked(target[0]);
                        ChatRoomCharacterUpdate(target[0]);
                    }    
                }
                ChatRoomSetTarget(null);
            }
        }
    }])

    CommandCombine([{
        Tag: 'outfit',
        Description: "(parameter): restores/saves/loads outfit (including restraints).",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Options for outfit command:\n" +
                    "<b>All these options include the restraints</b>, so it's also a good bondage tool.\n" +
                    "To restore your outfit to what it was before entering room, type: <b>/outfit reset</b> or <b>/outfit restore</b> or <b>/outfit revert</b>\n" +
                    "Three outfits can be saved by using <b>/outfit save1</b> or <b>/outfit save2</b> or <b>/outfit save3</b>\n" +
                    "To load saved outfits, type: <b>/outfit load1</b> or <b>/outfit load2</b> or <b>/outfit load3</b>\n" +
                    "You will have 5 seconds to click on target. Retry if the saving/loading was unsuccessful\n" +
                    "These saves last only 1 login session.\n" +
                    "To save outfits between sessions, use the <b>Export button</b> in wardrobe\n" +
                    "You will have the outfit saved as a code. You can copy and paste it elsewhere.\n" +
                    "Then you can use the <b>Import buttons</b> to load it later.</p>"
                );
            }
            if (args === "load1") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: You have 5 seconds to click on target. If successful, the outfit will be loaded. If not, retry.</p>"
                );
                setTimeout(function() {
                    if (CurrentCharacter != null) {
                        if (CurrentCharacter.OnlineSharedSettings.UBC != undefined) {
		            var uw = 0;
                            CurrentCharacter.Appearance = this.savedoutfit1.slice(0);
                            if (CurrentCharacter.OnlineSharedSettings.Uwall == true) {
                                if ((CurrentCharacter.Nickname == '') || (CurrentCharacter.Nickname == undefined)) {
                                    tgpname = CurrentCharacter.Name;
                                } else {
                                    tgpname = CurrentCharacter.Nickname;
                                }
                                if (tgpname != tmpname) {
                                    var uw = 1;
                                    ChatRoomSendLocal(
                                        "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                                    );
                                } 
                            } 
                            if (uw == 0) {
                                CharacterRefresh(CurrentCharacter);
                                ChatRoomCharacterUpdate(CurrentCharacter);
                                DialogLeave();
			        ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: Outfit load1 command executed.</p>"
                                );
                            }
                        }
                    }
                }, 5000);
            }
            if (args === "load2") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: You have 5 seconds to click on target. If successful, the outfit will be loaded. If not, retry.</p>"
                );
                setTimeout(function() {
                    if (CurrentCharacter != null) {
                        if (CurrentCharacter.OnlineSharedSettings.UBC != undefined) {
		            var uw = 0;
                            CurrentCharacter.Appearance = this.savedoutfit2.slice(0);
                            if (CurrentCharacter.OnlineSharedSettings.Uwall == true) {
                                if ((CurrentCharacter.Nickname == '') || (CurrentCharacter.Nickname == undefined)) {
                                    tgpname = CurrentCharacter.Name;
                                } else {
                                    tgpname = CurrentCharacter.Nickname;
                                }
                                if (tgpname != tmpname) {
                                    var uw = 1;
                                    ChatRoomSendLocal(
                                        "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                                    );
                                } 
                            } 
                            if (uw == 0) {
                                CharacterRefresh(CurrentCharacter);
                                ChatRoomCharacterUpdate(CurrentCharacter);
                                DialogLeave();
			        ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: Outfit load1 command executed.</p>"
                                );
                            }
                        }
                    }
                }, 5000);
            }           
            if (args === "load3") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: You have 5 seconds to click on target. If successful, the outfit will be loaded. If not, retry.</p>"
                );
                setTimeout(function() {
                    if (CurrentCharacter != null) {
                        if (CurrentCharacter.OnlineSharedSettings.UBC != undefined) {
		            var uw = 0;
                            CurrentCharacter.Appearance = this.savedoutfit3.slice(0);
                            if (CurrentCharacter.OnlineSharedSettings.Uwall == true) {
                                if ((CurrentCharacter.Nickname == '') || (CurrentCharacter.Nickname == undefined)) {
                                    tgpname = CurrentCharacter.Name;
                                } else {
                                    tgpname = CurrentCharacter.Nickname;
                                }
                                if (tgpname != tmpname) {
                                    var uw = 1;
                                    ChatRoomSendLocal(
                                        "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                                    );
                                } 
                            } 
                            if (uw == 0) {
                                CharacterRefresh(CurrentCharacter);
                                ChatRoomCharacterUpdate(CurrentCharacter);
                                DialogLeave();
			        ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: Outfit load1 command executed.</p>"
                                );
                            }
                        }
                    }
                }, 5000);
            }
            if ((args === "reset") || (args === "revert") || (args === "restore")) {
                Player.Appearance = ChatSearchSafewordAppearance.slice(0);
                CharacterRefresh(Player);
                ChatRoomCharacterUpdate(Player);
		ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: Outfit reset-restore-revert command executed.</p>"
                );
            }
            if (args === "save1") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: You have 5 seconds to click on target. If successful, the outfit will be saved. If not, retry.</p>"
                );
                setTimeout(function() {
                    if (CurrentCharacter != null) {
                        if (CurrentCharacter.OnlineSharedSettings.UBC != undefined) {
                            var uw = 0;
                            if (CurrentCharacter.OnlineSharedSettings.Uwall == true) {
                                if ((CurrentCharacter.Nickname == '') || (CurrentCharacter.Nickname == undefined)) {
                                    tgpname = CurrentCharacter.Name;
                                } else {
                                    tgpname = CurrentCharacter.Nickname;
                                }
                                if (tgpname != tmpname) {
                                    var uw = 1;
                                    ChatRoomSendLocal(
                                        "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                                    );
                                } 
                            } 
                            if (uw == 0) {
                                this.savedoutfit1 = CurrentCharacter.Appearance.slice(0);
                                DialogLeave();
		                ChatRoomSendLocal(
                                     "<p style='background-color:#5fbd7a'>ULTRAbc: Outfit save1 command executed.</p>"
                                );
                            }
                        }
                    }
                }, 5000);
            }
            if (args === "save2") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: You have 5 seconds to click on target. If successful, the outfit will be saved. If not, retry.</p>"
                );      
                setTimeout(function() {
                    if (CurrentCharacter != null) {
                        if (CurrentCharacter.OnlineSharedSettings.UBC != undefined) {
                            var uw = 0;
                            if (CurrentCharacter.OnlineSharedSettings.Uwall == true) {
                                if ((CurrentCharacter.Nickname == '') || (CurrentCharacter.Nickname == undefined)) {
                                    tgpname = CurrentCharacter.Name;
                                } else {
                                    tgpname = CurrentCharacter.Nickname;
                                }
                                if (tgpname != tmpname) {
                                    var uw = 1;
                                    ChatRoomSendLocal(
                                        "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                                    );
                                } 
                            } 
                            if (uw == 0) {
                                this.savedoutfit2 = CurrentCharacter.Appearance.slice(0);
                                DialogLeave();
		                ChatRoomSendLocal(
                                     "<p style='background-color:#5fbd7a'>ULTRAbc: Outfit save1 command executed.</p>"
                                );
                            }
                        }
                    }
                }, 5000);
            }  
            if (args === "save3") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: You have 5 seconds to click on target. If successful, the outfit will be saved. If not, retry.</p>"
                );
                setTimeout(function() {
                    if (CurrentCharacter != null) {
                        if (CurrentCharacter.OnlineSharedSettings.UBC != undefined) {
                            var uw = 0;
                            if (CurrentCharacter.OnlineSharedSettings.Uwall == true) {
                                if ((CurrentCharacter.Nickname == '') || (CurrentCharacter.Nickname == undefined)) {
                                    tgpname = CurrentCharacter.Name;
                                } else {
                                    tgpname = CurrentCharacter.Nickname;
                                }
                                if (tgpname != tmpname) {
                                    var uw = 1;
                                    ChatRoomSendLocal(
                                        "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                                    );
                                } 
                            } 
                            if (uw == 0) {
                                this.savedoutfit3 = CurrentCharacter.Appearance.slice(0);
                                DialogLeave();
		                ChatRoomSendLocal(
                                     "<p style='background-color:#5fbd7a'>ULTRAbc: Outfit save1 command executed.</p>"
                                );
                            }
                        }
                    }
                }, 5000);
            }      
        }
    }])

    CommandCombine([{
        Tag: 'permission',
        Description: "(number): changes your item permission.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The permission command must be followed by a number.\n" +
                    "The effect will be visible in your profile.\n" +
                    "0 Everyone, no exceptions\n" +
                    "1 Everyone, except blacklist\n" +
                    "2 Owner, Lover, whitelist & Dominants\n" +
                    "3 Owner, Lover and whitelist only\n" +
                    "4 Owner and Lover only\n" +
                    "5 Owner only</p>"
                );
            } else {
                var perm = args * 1;
                if ((perm > -1) && (perm < 6)) {
                    Player.ItemPermission = perm;
                    ServerAccountUpdate.QueueData({
                        ItemPermission: Player.ItemPermission
                    });
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'pet',
        Description: "(target): becomes a fully restrained pet.",
        Action: (args) => {
            if (args === "") {
                if (Pet == undefined) {
                    var message = "" + tmpname + " becomes a cute pet."
                } else {
                    if (Pet != "") {
                        if (Pet.startsWith("\u0027")) {
                            var message = tmpname + Pet;
                        } else {
                            var message = tmpname + ' '.repeat(1) + Pet;
                        }
                    } else {
                        var message = "" + tmpname + " becomes a cute pet."
                    }
                }
                if (Pet != "no message") {
                    ServerSend("ChatRoomChat", {
                        Content: "Beep",
                        Type: "Action",
                        Dictionary: [{
                            Tag: "Beep",
                            Text: message
                        }]
                    });
                }
                CharacterNaked(Player);
                InventoryWearRandom(Player, "ItemArms", 8, null, false, true, ["ArmbinderJacket", "BitchSuit", "Bolero", "BoxTieArmbinder", "Chains", "FullLatexSuit", "HempRope", "InflatableStraightLeotard", "LatexBoxtieLeotard", "LatexButterflyLeotard", "LatexSleevelessLeotard", "LeatherStraitJacket", "PantyhoseBody", "PantyhoseBodyOpen", "SeamlessStraitDress", "SeamlessStraitDressOpen", "StraitLeotard", "StrictLeatherPetCrawler"], true);
                InventoryWearRandom(Player, "HairAccessory1", 8, null, false, true, ["Antennae", "BunnyEars1", "BunnyEars2", "CowHorns", "Ears1", "Ears2", "ElfEars", "FoxEars1", "FoxEars2", "FoxEars3", "KittenEars1", "KittenEars2", "MouseEars1", "MouseEars2", "PonyEars1", "PuppyEars1", "PuppyEars2", "RaccoonEars1", "WolfEars1", "WolfEars2"], true);
                InventoryWearRandom(Player, "TailStraps", 8, null, false, true, ["CowtailStrap", "FoxTailsStrap", "FoxTailStrap1", "FoxTailStrap2", "HorseTailStrap", "HorseTailStrap1", "KittenTailStrap1", "KittenTailStrap2", "MouseTailStrap1", "MouseTailStrap2", "PuppyTailStrap", "PuppyTailStrap1", "RaccoonStrap", "WolfTailStrap1", "WolfTailStrap2", "WolfTailStrap3"], true);
                if (InventoryGet(Player, "ItemMouth") == null) InventoryWearRandom(Player, "ItemMouth", 8);
                if (InventoryGet(Player, "ItemNeck") == null) InventoryWearRandom(Player, "ItemNeck", 8);
                if (InventoryGet(Player, "ItemNeckRestraints") == null) InventoryWear(Player, "ChainLeash", "ItemNeckRestraints", null, 8);
                PoseSetActive(Player, "Kneel", true);
                CharacterRefresh(Player);
                ChatRoomCharacterUpdate(Player);
            } else {
                var targetname = args;
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].AllowItem == true)&& (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if (target[0].OnlineSharedSettings.Uwall == true) {
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                        );
                    } else {
                        if (Tpet == undefined) {
                            var message = "" + tgpname + " becomes a cute pet."
                        } else {
                            if (Tpet != "") {
                                if (Tpet.startsWith("\u0027")) {
                                    var message = tmpname + Tpet + ' '.repeat(1) + tgpname;
                                } else {
                                    var message = tmpname + ' '.repeat(1) + Tpet + ' '.repeat(1) + tgpname;
                                }
                            } else {
                                var message = "" + tgpname + " becomes a cute pet."
                            }
                        }
                        if (Tpet != "no message") {
                            ServerSend("ChatRoomChat", {
                                Content: "Beep",
                                Type: "Action",
                                Dictionary: [{
                                    Tag: "Beep",
                                    Text: message
                                }]
                            });
                        }
                        CharacterNaked(target[0]);
                        InventoryWearRandom(target[0], "ItemArms", 8, null, false, true, ["ArmbinderJacket", "BitchSuit", "Bolero", "BoxTieArmbinder", "Chains", "FullLatexSuit", "HempRope", "InflatableStraightLeotard", "LatexBoxtieLeotard", "LatexButterflyLeotard", "LatexSleevelessLeotard", "LeatherStraitJacket", "PantyhoseBody", "PantyhoseBodyOpen", "SeamlessStraitDress", "SeamlessStraitDressOpen", "StraitLeotard", "StrictLeatherPetCrawler"], true);
                        InventoryWearRandom(target[0], "HairAccessory1", 8, null, false, true, ["Antennae", "BunnyEars1", "BunnyEars2", "CowHorns", "Ears1", "Ears2", "ElfEars", "FoxEars1", "FoxEars2", "FoxEars3", "KittenEars1", "KittenEars2", "MouseEars1", "MouseEars2", "PonyEars1", "PuppyEars1", "PuppyEars2", "RaccoonEars1", "WolfEars1", "WolfEars2"], true);
                        InventoryWearRandom(target[0], "TailStraps", 8, null, false, true, ["CowtailStrap", "FoxTailsStrap", "FoxTailStrap1", "FoxTailStrap2", "HorseTailStrap", "HorseTailStrap1", "KittenTailStrap1", "KittenTailStrap2", "MouseTailStrap1", "MouseTailStrap2", "PuppyTailStrap", "PuppyTailStrap1", "RaccoonStrap", "WolfTailStrap1", "WolfTailStrap2", "WolfTailStrap3"], true);
                        if (InventoryGet(target[0], "ItemMouth") == null) InventoryWearRandom(target[0], "ItemMouth", 8);
                        if (InventoryGet(target[0], "ItemNeck") == null) InventoryWearRandom(target[0], "ItemNeck", 8);
                        if (InventoryGet(target[0], "ItemNeckRestraints") == null) InventoryWear(target[0], "ChainLeash", "ItemNeckRestraints", null, 8);
                        PoseSetActive(target[0], "Kneel", true);
                        CharacterRefresh(target[0]);
                        ChatRoomCharacterUpdate(target[0]);
                    }    
                }
                ChatRoomSetTarget(null);
            }
        }
    }])

    CommandCombine([{
        Tag: 'plvibe',
        Description: "(crotch shield) (intensity) (orgasm mode) (shock level): changes the settings of worn Sci-Fi Pleasure Panties.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The plvibe command must be followed by 4 numbers for crotch shield, intensity, orgasm mode and shock level.\n" +
                    " \n" +
                    "Available crotch shields: \n" +
                    "0 No shield - 1 Front shield\n" +
                    "2 Back shield - 3 Both shields\n" +
                    " \n" +
                    "Available intensities:\n" +
                    "0 Off - 1 Low - 2 Medium - 3 High - 4 Maximum\n" +
                    " \n" +
                    "Available orgasm modes:\n" +
                    "0 Normal - 1 Edge - 2 Denial\n" +
                    " \n" +
                    "Available shock levels:\n" +
                    "0 Low - 1 Medium - 2 High</p>"
                );
            } else {
                if (InventoryGet(Player, "ItemPelvis") != null) {
                    if (InventoryGet(Player, "ItemPelvis").Asset.Name == "SciFiPleasurePanties") {
                        var stringPLpanties1 = args;
                        var stringPLpanties2 = stringPLpanties1.split(/[ ,]+/);
                        var cpl = stringPLpanties2[0];
                        var ipl = stringPLpanties2[1];
                        var opl = stringPLpanties2[2];
                        var spl = stringPLpanties2[3];
                        if ((cpl > -1) && (cpl < 4) && (ipl > -1) && (ipl < 5) && (opl > -1) && (opl < 3) && (spl > -1) && (spl < 3)) {
                            const SciFiPleasurePanties = InventoryGet(Player, "ItemPelvis");
                            const SciFiPleasurePantiesConfig = ModularItemDataLookup.ItemPelvisSciFiPleasurePanties;
                            SciFiPleasurePanties.Property = ModularItemMergeModuleValues(SciFiPleasurePantiesConfig, [cpl, ipl, opl, spl]);
                            ChatRoomCharacterUpdate(Player);
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: The settings of your Sci-Fi Pleasure Panties have been modified.</p>"
                            );
                        }
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'poof',
        Description: "(action): leaves the club very fast.",
        Action: (args) => {
            if (args === "") {
                var message = " poofs away."
            } else {
                var message = ' '.repeat(1) + args;
            }
            ServerSend("ChatRoomChat", {
                Content: "Beep",
                Type: "Action",
                Dictionary: [{
                    Tag: "Beep",
                    Text: "" + tmpname + message
                }]
            });
            RelogExit();
        }
    }])

    CommandCombine([{
        Tag: 'pose2',
        Description: "(pose) (target): changes the pose of any player.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The pose2 command must be followed by a pose and optionally a target.\n" +
                    " \n" +
                    "Available poses:\n" +
                    "armsfree, belly, boxtied, cuffed, elbowtied,\n" +
                    "kneel1, kneel2, legsclosed, legsopen, pet,\n" +
                    "spreadarms1, spreadarms2, spreadeagle1\n" +
                    "spreadeagle2, spreadlegs, stand, suspension,\n" +
                    "tapedhands. Only on yourself: exercise, jump, roof.\n" +
                    "Use <b>/pose2 reset</b> (target) to back to neutral pose.\n" +
                    "If FBC is enabled, use <b>/pose baseupper</b> only on yourself when /pose2 reset fails.</p>"
                );
            } else {
                var stringPose1 = args;
                var stringPose2 = stringPose1.split(/[ ,]+/);
                var pose = stringPose2[0];
                var targetname = stringPose2[1];
                if (targetname == null) {
                    if ((pose == "armsfree") &&
                        (Player.ActivePose != 'BaseUpper') &&    
                        (PoseCanChangeUnaided(Player, 'BaseUpper'))) {
                        PoseSetActive(Player, "BaseUpper");
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " relaxes " + pronoun3 + " arms."
                            }]
                        });
                    } else if ((pose == "belly") &&
                        (Player.ActivePose != 'Hogtied') &&
                        (PoseCanChangeUnaided(Player, 'Hogtied'))) {
                        PoseSetActive(Player, "Hogtied");
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " relaxes on " + pronoun3 + " belly."
                            }]
                        });
                    } else if ((pose == "boxtied") &&
                        (Player.ActivePose != 'BackBoxTie') &&
                        (PoseCanChangeUnaided(Player, 'BackBoxTie'))) {
                        PoseSetActive(Player, "BackBoxTie");
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " puts the arms behind " + pronoun3 + " back."
                            }]
                        });
                    } else if ((pose == "cuffed") &&
                        (Player.ActivePose != 'BackCuffs') &&
                        (PoseCanChangeUnaided(Player, 'BackCuffs'))) {
                        PoseSetActive(Player, "BackCuffs");
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " puts " + pronoun3 + " arms out like " + pronoun4 + " is handcuffed."
                            }]
                        });
                    } else if ((pose == "elbowtied") &&
                        (Player.ActivePose != 'BackElbowTouch') &&
                        (PoseCanChangeUnaided(Player, 'BackElbowTouch'))) {
                        PoseSetActive(Player, "BackElbowTouch");
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " puts the arms behind " + pronoun3 + " back, elbows almost touching."
                            }]
                        });
                    } else if ((pose == "kneel1") &&
                        (Player.ActivePose != 'Kneel') &&
                        ((PoseCanChangeUnaided(Player, 'Kneel')) || (ChatRoomCanAttemptKneel(Player) == true))) {
                        PoseSetActive(Player, "Kneel");
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " kneels down."
                            }]
                        });
                    } else if ((pose == "kneel2") &&
                        (Player.ActivePose != 'KneelingSpread') &&
                        (PoseCanChangeUnaided(Player, 'KneelingSpread'))) {
                        PoseSetActive(Player, "KneelingSpread");
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " kneels down and opens " + pronoun3 + " legs."
                            }]
                        });
                    } else if ((pose == "legsclosed") &&
                        (Player.ActivePose != 'LegsClosed') &&
                        (PoseCanChangeUnaided(Player, 'LegsClosed'))) {
                        PoseSetActive(Player, "LegsClosed");
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " stands up and closes " + pronoun3 + " legs."
                            }]
                        });
                    } else if ((pose == "legsopen") &&
                        (Player.ActivePose != 'LegsOpen') &&
                        (PoseCanChangeUnaided(Player, 'LegsOpen'))) {
                        PoseSetActive(Player, "LegsOpen");
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " stands up normally on " + pronoun3 + " feet."
                            }]
                        });
                    } else if ((pose == "pet") &&
                        (Player.ActivePose != 'AllFours') &&
                        (PoseCanChangeUnaided(Player, 'AllFours'))) {
                        PoseSetActive(Player, "AllFours");
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " relaxes on all fours."
                            }]
                        });
                    } else if ((pose == "spreadarms1") &&
                        (Player.ActivePose != 'Yoked') &&
                        (PoseCanChangeUnaided(Player, 'Yoked'))) {
                        PoseSetActive(Player, "Yoked");
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " raises " + pronoun3 + " hands."
                            }]
                        });
                    } else if ((pose == "spreadarms2") &&
                        (Player.ActivePose != 'OverTheHead') &&
                        (PoseCanChangeUnaided(Player, 'OverTheHead'))) {
                        PoseSetActive(Player, "OverTheHead");
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " raises the hands above " + pronoun3 + " head."
                            }]
                        });
                    } else if ((pose == "spreadeagle1") &&
                        ((Player.ActivePose == null) || (Player.ActivePose.includes('Yoked') == false) || (Player.ActivePose.includes('Spread') == false)) &&
                        (PoseCanChangeUnaided(Player, 'Yoked')) &&
                        (PoseCanChangeUnaided(Player, 'Spread'))) {
                        PoseSetActive(Player, "Yoked");
                        PoseSetActive(Player, "Spread")
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " raises " + pronoun3 + " hands and spreads " + pronoun3 + " legs."
                            }]
                        });
                    } else if ((pose == "spreadeagle2") &&
                        ((Player.ActivePose == null) || (Player.ActivePose.includes('OverTheHead') == false) || (Player.ActivePose.includes('Spread') == false)) &&
                        (PoseCanChangeUnaided(Player, 'OverTheHead')) &&
                        (PoseCanChangeUnaided(Player, 'Spread'))) {
                        PoseSetActive(Player, "OverTheHead");
                        PoseSetActive(Player, "Spread")
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " raises the hands above " + pronoun3 + " head and spreads " + pronoun3 + " legs."
                            }]
                        });
                    } else if ((pose == "spreadlegs") &&
                        (Player.ActivePose != 'Spread') &&
                        (PoseCanChangeUnaided(Player, 'Spread'))) {
                        PoseSetActive(Player, "Spread");
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " spreads " + pronoun3 + " legs."
                            }]
                        });
                    } else if ((pose == "stand") &&
                        (Player.ActivePose != null) &&
                        ((PoseCanChangeUnaided(Player, null)) || (ChatRoomCanAttemptStand(Player) == true))) {
                        PoseSetActive(Player, null);
                        ChatRoomCharacterUpdate(Player);
                        CharacterRefresh(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " stands up."
                            }]
                        });
                    } else if ((pose == "suspension") &&
                        (Player.ActivePose != 'Suspension') &&
                        (PoseCanChangeUnaided(Player, 'Suspension'))) {
                        PoseSetActive(Player, "Suspension");
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " is now in an acrobatic pose in suspension."
                            }]
                        });
                    } else if ((pose == "tapedhands") &&
                        (Player.ActivePose != 'TapedHands') &&
                        (PoseCanChangeUnaided(Player, 'TapedHands'))) {
                        PoseSetActive(Player, "TapedHands");
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " puts " + pronoun3 + " arms out like " + pronoun3 + " hands are taped."
                            }]
                        });
                        // Special poses
                    } else if (pose == "jump") {
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " jumps with joy."
                            }]
                        });
                        CharacterSetFacialExpression(Player, "Emoticon", "Annoyed", 1);
                        PoseSetActive(Player, null);
                        ChatRoomCharacterUpdate(Player);
                        setTimeout(function() {
                            InventoryGet(Player, "Emoticon").Property.OverrideHeight = {
                                Height: 150
                            };
                            PoseSetActive(Player, "Kneel");
                            CurrentScreen === "ChatRoom" ?
                                ChatRoomCharacterUpdate(Player) :
                                CharacterRefresh(Player);
                        }, 1000);
                        setTimeout(function() {
                            InventoryGet(Player, "Emoticon").Property.OverrideHeight = undefined;
                            PoseSetActive(Player, null);
                            CurrentScreen === "ChatRoom" ?
                                ChatRoomCharacterUpdate(Player) :
                                CharacterRefresh(Player);
                        }, 2000);
                        setTimeout(function() {
                            InventoryGet(Player, "Emoticon").Property.OverrideHeight = {
                                Height: 150
                            };
                            PoseSetActive(Player, "Kneel");
                            CurrentScreen === "ChatRoom" ?
                                ChatRoomCharacterUpdate(Player) :
                                CharacterRefresh(Player);
                        }, 3000);
                        setTimeout(function() {
                            PoseSetActive(Player, null);
                            delete InventoryGet(Player, 'Emoticon').Property.OverrideHeight;
                            CurrentScreen === 'ChatRoom' ?
                                ChatRoomCharacterUpdate(Player) :
                                CharacterRefresh(Player);
                        }, 4000);
                    } else if (pose == "roof") {
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " jumps to the ceiling."
                            }]
                        });
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: To leave this position, use first /pose2 jump, then /pose2 reset (or /pose baseupper if FBC enabled).</p>"
                        );
                        CharacterSetFacialExpression(Player, "Emoticon", "Annoyed", 1);
                        PoseSetActive(Player, null);
                        ChatRoomCharacterUpdate(Player);
                        setTimeout(function() {
                            PoseSetActive(Player, "OverTheHead");
                            ChatRoomCharacterUpdate(Player);
                        }, 500);
                        setTimeout(function() {
                            InventoryGet(Player, "Emoticon").Property.OverrideHeight = {
                                Height: 250
                            };
                            CurrentScreen === "ChatRoom" ?
                                ChatRoomCharacterUpdate(Player) :
                                CharacterRefresh(Player);
                        }, 1000);
                        setTimeout(function() {
                            PoseSetActive(Player, "Kneel");
                            ChatRoomCharacterUpdate(Player);
                        }, 2000);
                        setTimeout(function() {
                            PoseSetActive(Player, "BaseUpper");
                            PoseSetActive(Player, null);
                            PoseSetActive(Player, ["Suspension", "Kneel"]);
                            InventoryGet(Player, "Emoticon").Property.OverrideHeight = {
                                Height: -300
                            };
                            CurrentScreen === "ChatRoom" ?
                                ChatRoomCharacterUpdate(Player) :
                                CharacterRefresh(Player);
                        }, 3000);
                        // Workout
                    } else if (pose == "exercise") {
                        var Region = undefined;
                        if (InventoryGet(Player, "ItemButt") == null) {
                            InventoryWear(Player, "AnalHook", "ItemButt", "#272727");
                            Region = "ItemButt";
                        } else if (InventoryGet(Player, "ItemButt").Asset.Name == "AnalHook") {
                            Region = "ItemButt";
                        } else if (InventoryGet(Player, "ItemTorso") == null) {
                            InventoryWear(Player, "HempRopeHarness", "ItemTorso", "#272727");
                            InventoryGet(Player, "ItemTorso").Property = {
                                Type: "Waist"
                            };
                            Region = "ItemTorso";
                        } else if (InventoryGet(Player, "ItemTorso").Asset.Name == "HempRopeHarness") {
                            InventoryGet(Player, "ItemTorso").Property = {
                                Type: "Waist"
                            };
                            Region = "ItemTorso";
                        } else if (InventoryGet(Player, "ItemPelvis") == null) {
                            InventoryWear(Player, "HempRope", "ItemPelvis", "#272727");
                            Region = "ItemPelvis";
                        } else if (InventoryGet(Player, "ItemPelvis").Asset.Name == "HempRope") {
                            Region = "ItemPelvis";
                        } else {
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: You're too heavily tied to exercise.</p>"
                            );
                        }
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " makes " + pronoun3 + " workout."
                            }]
                        });
                        PoseSetActive(Player, null);
                        ChatRoomCharacterUpdate(Player);
                        setTimeout(function() {
                            PoseSetActive(Player, "OverTheHead");
                            ChatRoomCharacterUpdate(Player);
                        }, 500);
                        setTimeout(function() {
                            Player.FocusGroup = AssetGroupGet("Female3DCG", Region);
                            DialogExtendItem(InventoryGet(Player, Region));
                            DialogFocusItem.Property.OverrideHeight = {
                                Height: 100
                            };
                            ChatRoomCharacterUpdate(Player);
                            DialogLeaveItemMenu();
                        }, 1000);
                        setTimeout(function() {
                            PoseSetActive(Player, "Kneel");
                        }, 2000);
                        setTimeout(function() {
                            PoseSetActive(Player, "Yoked");
                            Player.FocusGroup = AssetGroupGet("Female3DCG", Region);
                            DialogExtendItem(InventoryGet(Player, Region));
                            DialogFocusItem.Property.OverrideHeight = {
                                Height: 350
                            };
                            ChatRoomCharacterUpdate(Player);
                            DialogLeaveItemMenu();
                        }, 3000);
                        setTimeout(function() {
                            PoseSetActive(Player, "OverTheHead");
                            Player.FocusGroup = AssetGroupGet("Female3DCG", Region);
                            DialogExtendItem(InventoryGet(Player, Region));
                            DialogFocusItem.Property.OverrideHeight = {
                                Height: 100
                            };
                            ChatRoomCharacterUpdate(Player);
                            DialogLeaveItemMenu();
                        }, 4000);
                        setTimeout(function() {
                            PoseSetActive(Player, "Yoked");
                            Player.FocusGroup = AssetGroupGet("Female3DCG", Region);
                            DialogExtendItem(InventoryGet(Player, Region));
                            DialogFocusItem.Property.OverrideHeight = {
                                Height: 350
                            };
                            ChatRoomCharacterUpdate(Player);
                            DialogLeaveItemMenu();
                        }, 5000);
                        setTimeout(function() {
                            PoseSetActive(Player, "OverTheHead");
                            Player.FocusGroup = AssetGroupGet("Female3DCG", Region);
                            DialogExtendItem(InventoryGet(Player, Region));
                            DialogFocusItem.Property.OverrideHeight = {
                                Height: 100
                            };
                            ChatRoomCharacterUpdate(Player);
                            DialogLeaveItemMenu();
                        }, 6000);
                        setTimeout(function() {
                            PoseSetActive(Player, "Yoked");
                            Player.FocusGroup = AssetGroupGet("Female3DCG", Region);
                            DialogExtendItem(InventoryGet(Player, Region));
                            DialogFocusItem.Property.OverrideHeight = {
                                Height: 350
                            };
                            ChatRoomCharacterUpdate(Player);
                            DialogLeaveItemMenu();
                        }, 7000);
                        setTimeout(function() {
                            PoseSetActive(Player, "OverTheHead");
                            Player.FocusGroup = AssetGroupGet("Female3DCG", Region);
                            DialogExtendItem(InventoryGet(Player, Region));
                            DialogFocusItem.Property.OverrideHeight = {
                                Height: 100
                            };
                            ChatRoomCharacterUpdate(Player);
                            DialogLeaveItemMenu();
                        }, 8000);
                        setTimeout(function() {
                            PoseSetActive(Player, "Yoked");
                            Player.FocusGroup = AssetGroupGet("Female3DCG", Region);
                            DialogExtendItem(InventoryGet(Player, Region));
                            DialogFocusItem.Property.OverrideHeight = {
                                Height: 350
                            };
                            ChatRoomCharacterUpdate(Player);
                            DialogLeaveItemMenu();
                        }, 9000);
                        setTimeout(function() {
                            PoseSetActive(Player, "OverTheHead");
                            Player.FocusGroup = AssetGroupGet("Female3DCG", Region);
                            DialogExtendItem(InventoryGet(Player, Region));
                            DialogFocusItem.Property.OverrideHeight = {
                                Height: 100
                            };
                            ChatRoomCharacterUpdate(Player);
                            DialogLeaveItemMenu();
                        }, 10000);
                        setTimeout(function() {
                            PoseSetActive(Player, null);
                            Player.FocusGroup = AssetGroupGet("Female3DCG", Region);
                            DialogExtendItem(InventoryGet(Player, Region));
                            DialogFocusItem.Property.OverrideHeight = undefined;
                            ChatRoomCharacterUpdate(Player);
                            DialogLeaveItemMenu();
                        }, 10000);
                        // reset	 
                    } else if (pose == "reset") {
                        PoseSetActive(Player, null);
                        ChatRoomCharacterUpdate(Player);
                        CharacterRefresh(Player);
                    }
                } else {
                    var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                    if (target[0] == null) {
                        var targetnumber = parseInt(targetname);
                        target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                    }
                    if ((target[0] != null) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                        if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                            tgpname = target[0].Name;
                        } else {
                            tgpname = target[0].Nickname;
                        }
                        if (InventoryGet(target[0], "Pronouns").Asset.Name == "HeHim") {
                            tgpr1 = "He";
                            tgpr2 = "him";
                            tgpr3 = "his";
                            tgpr4 = "he";
                        } else if (InventoryGet(target[0], "Pronouns").Asset.Name == "SheHer") {
                            tgpr1 = "She";
                            tgpr2 = "her";
                            tgpr3 = "her";
                            tgpr4 = "she";
                        } else {
                            tgpr1 = "They";
                            tgpr2 = "them";
                            tgpr3 = "their";
                            tgpr4 = "they";
                        }
                        if (target[0].OnlineSharedSettings.Uwall == true) {
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                            );
                        } else {
                            if (pose == "armsfree") {
                                if ((target[0].AllowItem == true) &&
                                (target[0].ActivePose != 'BaseUpper') &&
                                (PoseCanChangeUnaided(target[0], 'BaseUpper'))) {
                                    PoseSetActive(target[0], "BaseUpper");
                                     ChatRoomCharacterUpdate(target[0]);
                                    ServerSend("ChatRoomChat", {
                                        Content: "Beep",
                                        Type: "Action",
                                        Dictionary: [{
                                            Tag: "Beep",
                                            Text: "" + tmpname + " lets " + tgpname + " relax " + tgpr3 + " arms."
                                        }]
                                    });
                                }
                            } else if (pose == "belly") {
                                if ((target[0].AllowItem == true) &&
                                (target[0].ActivePose != 'Hogtied') &&
                                (PoseCanChangeUnaided(target[0], 'Hogtied'))) {
                                    PoseSetActive(target[0], "Hogtied");
                                    ChatRoomCharacterUpdate(target[0]);
                                    ServerSend("ChatRoomChat", {
                                        Content: "Beep",
                                        Type: "Action",
                                        Dictionary: [{
                                            Tag: "Beep",
                                            Text: "" + tmpname + " forces " + tgpname + " to stay on " + tgpr3 + " belly."
                                        }]
                                    });
                                }
                            } else if (pose == "boxtied") {
                                if ((target[0].AllowItem == true) &&
                                (target[0].ActivePose != 'BackBoxTie') &&
                                (PoseCanChangeUnaided(target[0], 'BackBoxTie'))) {
                                    PoseSetActive(target[0], "BackBoxTie");
                                    ChatRoomCharacterUpdate(target[0]);
                                    ServerSend("ChatRoomChat", {
                                        Content: "Beep",
                                        Type: "Action",
                                        Dictionary: [{
                                            Tag: "Beep",
                                            Text: "" + tmpname + " forces " + tgpname + " to put the arms behind " + tgpr3 + " back."
                                        }]
                                    });
                                }
                            } else if (pose == "cuffed") {
                                if ((target[0].AllowItem == true) &&
                                (target[0].ActivePose != 'BackCuffs') &&
                                (PoseCanChangeUnaided(target[0], 'BackCuffs'))) {
                                    PoseSetActive(target[0], "BackCuffs");
                                ChatRoomCharacterUpdate(target[0]);
                                    ServerSend("ChatRoomChat", {
                                        Content: "Beep",
                                        Type: "Action",
                                        Dictionary: [{
                                            Tag: "Beep",
                                            Text: "" + tmpname + " forces " + tgpname + " to put the arms out like " + tgpr4 + " handcuffed."
                                        }]
                                    });
                                }
                            } else if (pose == "elbowtied") {
                                if ((target[0].AllowItem == true) &&
                                (target[0].ActivePose != 'BackElbowTouch') &&
                                (PoseCanChangeUnaided(target[0], 'BackElbowTouch'))) {
                                    PoseSetActive(target[0], "BackElbowTouch");
                                     ChatRoomCharacterUpdate(target[0]);
                                    ServerSend("ChatRoomChat", {
                                        Content: "Beep",
                                        Type: "Action",
                                        Dictionary: [{
                                            Tag: "Beep",
                                            Text: "" + tmpname + " forces " + tgpname + " to put the arms behind her back, elbows almost touching."
                                        }]
                                    });
                                }
                            } else if (pose == "kneel1") {
                                if ((target[0].AllowItem == true) &&
                                (target[0].ActivePose != 'Kneel') &&
                                ((PoseCanChangeUnaided(target[0], 'Kneel')) || (ChatRoomCanAttemptKneel(target[0]) == true))) {
                                    PoseSetActive(target[0], "Kneel");
                                    ChatRoomCharacterUpdate(target[0]);
                                    ServerSend("ChatRoomChat", {
                                        Content: "Beep",
                                        Type: "Action",
                                        Dictionary: [{
                                            Tag: "Beep",
                                            Text: "" + tmpname + " helps " + tgpname + " to kneel down."
                                        }]
                                    });
                                }
                            } else if (pose == "kneel2") {
                                if ((target[0].AllowItem == true) &&
                                (target[0].ActivePose != 'KneelingSpread') &&
                                (PoseCanChangeUnaided(target[0], 'KneelingSpread'))) {
                                    PoseSetActive(target[0], "KneelingSpread");
                                    ChatRoomCharacterUpdate(target[0]);
                                    ServerSend("ChatRoomChat", {
                                        Content: "Beep",
                                        Type: "Action",
                                        Dictionary: [{
                                            Tag: "Beep",
                                            Text: "" + tmpname + " helps " + tgpname + " to kneel down, forcing " + tgpr3 + " legs open."
                                        }]
                                    });
                                }
                            } else if (pose == "legsclosed") {
                                if ((target[0].AllowItem == true) &&
                                (target[0].ActivePose != 'LegsClosed') &&
                                (PoseCanChangeUnaided(target[0], 'LegsClosed'))) {
                                    PoseSetActive(target[0], "LegsClosed");
                                    ChatRoomCharacterUpdate(target[0]);
                                    ServerSend("ChatRoomChat", {
                                        Content: "Beep",
                                        Type: "Action",
                                        Dictionary: [{
                                            Tag: "Beep",
                                            Text: "" + tmpname + " helps " + tgpname + " to stand up with " + tgpr3 + " legs closed."
                                        }]
                                    });
                                }
                            } else if (pose == "legsopen") {
                                if ((target[0].AllowItem == true) &&
                                (target[0].ActivePose != 'LegsOpen') &&
                                (PoseCanChangeUnaided(target[0], 'LegsOpen'))) {
                                    PoseSetActive(target[0], "LegsOpen");
                                    ChatRoomCharacterUpdate(target[0]);
                                    ServerSend("ChatRoomChat", {
                                        Content: "Beep",
                                        Type: "Action",
                                        Dictionary: [{
                                            Tag: "Beep",
                                            Text: "" + tmpname + " helps " + tgpname + " to stand up normally on " + tgpr3 + " feet."
                                        }]
                                    });
                                }
                            } else if (pose == "pet") {
                                if ((target[0].AllowItem == true) &&
                                (target[0].ActivePose != 'AllFours') &&
                                (PoseCanChangeUnaided(target[0], 'AllFours'))) {
                                    PoseSetActive(target[0], "AllFours");
                                    ChatRoomCharacterUpdate(target[0]);
                                    ServerSend("ChatRoomChat", {
                                        Content: "Beep",
                                        Type: "Action",
                                        Dictionary: [{
                                            Tag: "Beep",
                                            Text: "" + tmpname + " forces " + tgpname + " on all fours."
                                        }]
                                    });
                                }
                            } else if (pose == "spreadarms1") {
                                if ((target[0].AllowItem == true) &&
                                (target[0].ActivePose != 'Yoked') &&
                                (PoseCanChangeUnaided(target[0], 'Yoked'))) {
                                    PoseSetActive(target[0], "Yoked");
                                    ChatRoomCharacterUpdate(target[0]);
                                    ServerSend("ChatRoomChat", {
                                        Content: "Beep",
                                        Type: "Action",
                                        Dictionary: [{
                                            Tag: "Beep",
                                            Text: "" + tmpname + " helps " + tgpname + " to raise " + tgpr3 + " hands."
                                        }]
                                    });
                                }
                            } else if (pose == "spreadarms2") {
                                if ((target[0].AllowItem == true) &&
                                (target[0].ActivePose != 'OverTheHead') &&
                                (PoseCanChangeUnaided(target[0], 'OverTheHead'))) {
                                    PoseSetActive(target[0], "OverTheHead");
                                    ChatRoomCharacterUpdate(target[0]);
                                    ServerSend("ChatRoomChat", {
                                        Content: "Beep",
                                        Type: "Action",
                                        Dictionary: [{
                                            Tag: "Beep",
                                            Text: "" + tmpname + " forces " + tgpname + " to raise the hands above " + tgpr3 + " head."
                                        }]
                                    });
                                }
                            } else if (pose == "spreadeagle1") {
                                if ((target[0].AllowItem == true) &&
                                ((target[0].ActivePose == null) || (target[0].ActivePose.includes('Yoked') == false) || (target[0].ActivePose.includes('Spread') == false)) &&
                                (PoseCanChangeUnaided(target[0], 'Yoked')) &&
                                (PoseCanChangeUnaided(target[0], 'Spread'))) {
                                    PoseSetActive(target[0], "Yoked");
                                    PoseSetActive(target[0], "Spread");
                                    ChatRoomCharacterUpdate(target[0]);
                                    ServerSend("ChatRoomChat", {
                                        Content: "Beep",
                                        Type: "Action",
                                        Dictionary: [{
                                            Tag: "Beep",
                                            Text: "" + tmpname + " forces " + tgpname + " to raise the hands and spread the legs."
                                        }]
                                    });
                                }
                            } else if (pose == "spreadeagle2") {
                                if ((target[0].AllowItem == true) &&
                                ((target[0].ActivePose == null) || (target[0].ActivePose.includes('OverTheHead') == false) || (target[0].ActivePose.includes('Spread') == false)) &&
                                (PoseCanChangeUnaided(target[0], 'OverTheHead')) &&
                                (PoseCanChangeUnaided(target[0], 'Spread'))) {
                                    PoseSetActive(target[0], "OverTheHead");
                                    PoseSetActive(target[0], "Spread");
                                    ChatRoomCharacterUpdate(target[0]);
                                    ServerSend("ChatRoomChat", {
                                        Content: "Beep",
                                        Type: "Action",
                                        Dictionary: [{
                                            Tag: "Beep",
                                            Text: "" + tmpname + " forces " + tgpname + " to raise the hands above the head and spread the legs."
                                        }]
                                    });
                                }
                            } else if (pose == "spreadlegs") {
                                if ((target[0].AllowItem == true) &&
                                (target[0].ActivePose != 'Spread') &&
                                (PoseCanChangeUnaided(target[0], 'Spread'))) {
                                    PoseSetActive(target[0], "Spread");
                                    ChatRoomCharacterUpdate(target[0]);
                                    ServerSend("ChatRoomChat", {
                                        Content: "Beep",
                                        Type: "Action",
                                        Dictionary: [{
                                            Tag: "Beep",
                                            Text: "" + tmpname + " forces " + tgpname + " to spread " + tgpr3 + " legs."
                                        }]
                                    });
                                }
                            } else if (pose == "stand") {
                                if ((target[0].AllowItem == true) &&
                                (target[0].ActivePose != null) &&
                                ((PoseCanChangeUnaided(target[0], null)) || (ChatRoomCanAttemptStand(target[0]) == true))) {
                                    PoseSetActive(target[0], null);
                                    ChatRoomCharacterUpdate(target[0]);
                                    CharacterRefresh(target[0]);
                                    ServerSend("ChatRoomChat", {
                                        Content: "Beep",
                                        Type: "Action",
                                        Dictionary: [{
                                            Tag: "Beep",
                                            Text: "" + tmpname + " helps " + tgpname + " to stand up."
                                        }]
                                    });
                                }
                            } else if (pose == "suspension") {
                                if ((target[0].AllowItem == true) &&
                                (target[0].ActivePose != 'Suspension') &&
                                (PoseCanChangeUnaided(target[0], 'Suspension'))) {
                                    PoseSetActive(target[0], "Suspension");
                                    ChatRoomCharacterUpdate(target[0]);
                                    ServerSend("ChatRoomChat", {
                                        Content: "Beep",
                                        Type: "Action",
                                        Dictionary: [{
                                            Tag: "Beep",
                                            Text: "" + tmpname + " forces " + tgpname + " in an acrobatic pose in suspension."
                                        }]
                                    });
                                }
                            } else if (pose == "tapedhands") {
                                if ((target[0].AllowItem == true) &&
                                (target[0].ActivePose != 'TapedHands') &&
                                (PoseCanChangeUnaided(target[0], 'TapedHands'))) {
                                    PoseSetActive(target[0], "TapedHands");
                                    ChatRoomCharacterUpdate(target[0]);
                                    ServerSend("ChatRoomChat", {
                                        Content: "Beep",
                                        Type: "Action",
                                        Dictionary: [{
                                            Tag: "Beep",
                                            Text: "" + tmpname + " forces " + tgpname + " to put the arms out like " + tgpr3 + " hands are taped."
                                        }]
                                    });
                                }
                            } else if (pose == "reset") {
                                if (target[0].AllowItem == true) {
                                    PoseSetActive(target[0], null);
                                    ChatRoomCharacterUpdate(target[0]);
                                    CharacterRefresh(target[0]);
                                }
                            }
                        }
                    }
                }
                ChatRoomSetTarget(null);
            }
        }
    }])

    CommandCombine([{
        Tag: 'prison',
        Description: "(minutes): stays in Pandora prison.",
        Action: (args) => {
            var minutes = args;
            ServerSend("ChatRoomChat", {
                Content: "Beep",
                Type: "Action",
                Dictionary: [{
                    Tag: "Beep",
                    Text: "" + tmpname + " gets grabbed by two maids and sent to Pandora prison for " + minutes + " minutes."
                }]
            });
            DialogLentLockpicks = false;
            ChatRoomClearAllElements();
            ServerSend("ChatRoomLeave", "");
            CharacterDeleteAllOnline();
            PandoraBackground = "Pandora/Underground/Cell" + Math.floor(Math.random() * 7).toString();
            PandoraRestrainPlayer();
            PandoraPunishmentSentence(minutes);
            PandoraPunishmentStart();
        }
    }])

    CommandCombine([{
        Tag: 'ptcode',
        Description: "(target): reveals codes used on items controlled by portal link.",
        Action: (args) => {
            if (args === "") {
                for (let A = 0; A < Player.Appearance.length; A++)
                    if ((Player.Appearance[A].Property != null) && (Player.Appearance[A].Property.Attribute != null)) {
                        if (Player.Appearance[A].Property.Attribute.includes("PortalLinkLockable")) {
                            var asset = Player.Appearance[A].Asset.Description;
                            var ptcode = Player.Appearance[A].Property.PortalLinkCode;
                            ChatRoomSendLocal("" + asset + " = " + ptcode + "");
                        }
                    }
            } else {
                var targetname = args;
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if (target[0] != null) {
                    for (let A = 0; A < target[0].Appearance.length; A++)
                        if ((target[0].Appearance[A].Property != null) && (target[0].Appearance[A].Property.Attribute != null)) {
                            if (target[0].Appearance[A].Property.Attribute.includes("PortalLinkLockable")) {
                                var asset = target[0].Appearance[A].Asset.Description;
                                var ptcode = target[0].Appearance[A].Property.PortalLinkCode;
                                ChatRoomSendLocal("" + asset + " = " + ptcode + "");
                            }
                        }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'pw',
        Description: "(target): reveals passwords used on current locks with password.",
        Action: (args) => {
            if (args === "") {
                for (let A = 0; A < Player.Appearance.length; A++)
                    if ((Player.Appearance[A].Property != null) && (Player.Appearance[A].Property.LockedBy != null)) {
                        if ((Player.Appearance[A].Property.LockedBy == "SafewordPadlock") || (Player.Appearance[A].Property.LockedBy == "PasswordPadlock") || (Player.Appearance[A].Property.LockedBy == "TimerPasswordPadlock")) {
                            var asset = Player.Appearance[A].Asset.Description;
                            var pw = Player.Appearance[A].Property.Password;
                            ChatRoomSendLocal("" + asset + " = " + pw + "");
                        }
                    }
            } else {
                var targetname = args;
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if (target[0] != null) {
                    for (let A = 0; A < target[0].Appearance.length; A++)
                        if ((target[0].Appearance[A].Property != null) && (target[0].Appearance[A].Property.LockedBy != null)) {
                            if ((target[0].Appearance[A].Property.LockedBy == "SafewordPadlock") || (target[0].Appearance[A].Property.LockedBy == "PasswordPadlock") || (target[0].Appearance[A].Property.LockedBy == "TimerPasswordPadlock")) {
                                var asset = target[0].Appearance[A].Asset.Description;
                                var pw = target[0].Appearance[A].Property.Password;
                                ChatRoomSendLocal("" + asset + " = " + pw + "");
                            }
                        }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'quit',
        Description: "(action): leaves room.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSetLastChatRoom("");
                ServerSend("ChatRoomLeave", "");
                CommonSetScreen("Online", "ChatSearch");
                ChatRoomClearAllElements();
                OnlineGameName = "";
            } else {
                var message = ' '.repeat(1) + args;
                ServerSend("ChatRoomChat", {
                    Content: "Beep",
                    Type: "Action",
                    Dictionary: [{
                        Tag: "Beep",
                        Text: "" + tmpname + message
                    }]
                });
                ChatRoomSetLastChatRoom("");
                ServerSend("ChatRoomLeave", "");
                CommonSetScreen("Online", "ChatSearch");
                ChatRoomClearAllElements();
                OnlineGameName = "";
            }
        }
    }])

    CommandCombine([{
        Tag: 'randomize',
        Description: "(target): naked + underwear + clothes + restrain commands.",
        Action: (args) => {
            if (args === "") {
                if (Randomize == undefined) {
                    var message = "Magical lasers apply random clothes and bindings on " + tmpname + "'s body."
                } else {
                    if (Randomize != "") {
                        if (Randomize.startsWith("\u0027")) {
                            var message = tmpname + Randomize;
                        } else {
                            var message = tmpname + ' '.repeat(1) + Randomize;
                        }
                    } else {
                        var message = "Magical lasers apply random clothes and bindings on " + tmpname + "'s body."
                    }
                }
                if (Randomize != "no message") {
                    ServerSend("ChatRoomChat", {
                        Content: "Beep",
                        Type: "Action",
                        Dictionary: [{
                            Tag: "Beep",
                            Text: message
                        }]
                    });
                }
                CharacterNaked(Player);
                CharacterRandomUnderwear(Player);
                CharacterAppearanceFullRandom(Player, true);
                CharacterFullRandomRestrain(Player, "ALL");
                ChatRoomCharacterUpdate(Player);
            } else {
                var targetname = args;
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].AllowItem == true) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if (target[0].OnlineSharedSettings.Uwall == true) {
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                        );
                    } else {
                        if (Trandomize == undefined) {
                            var message = "Magical lasers apply random clothes and bindings on " + tgpname + "'s body."
                        } else {
                            if (Trandomize != "") {
                                if (Trandomize.startsWith("\u0027")) {
                                    var message = tmpname + Trandomize + ' '.repeat(1) + tgpname;
                                } else {
                                    var message = tmpname + ' '.repeat(1) + Trandomize + ' '.repeat(1) + tgpname;
                                }
                            } else {
                                var message = "Magical lasers apply random clothes and bindings on " + tgpname + "'s body."
                            }
                        }
                        if (Trandomize != "no message") {
                            ServerSend("ChatRoomChat", {
                                Content: "Beep",
                                Type: "Action",
                                Dictionary: [{
                                    Tag: "Beep",
                                    Text: message
                                }]
                            });
                         }
                         CharacterNaked(target[0]);
                         CharacterRandomUnderwear(target[0]);
                         CharacterAppearanceFullRandom(target[0], true);
                         CharacterFullRandomRestrain(target[0], "ALL");
                         ChatRoomCharacterUpdate(target[0]);
                    }    
                }
                ChatRoomSetTarget(null);
            }
        }
    }])

    CommandCombine([{
        Tag: 'relog',
        Description: ": relogs.",
        Action: () => {
            ServerSocket.close();
            ServerSocket.open();
        }
    }])

    CommandCombine([{
        Tag: 'removecollar',
        Description: ": temporarily removes slave/owner collar.",
        Action: () => {
            ServerSend("ChatRoomChat", {
                Content: "PlayerOwnerCollarRelease",
                Type: "Action",
                Dictionary: [{
                    Tag: "DestinationCharacterName",
                    Text: Player.Name,
                    MemberNumber: Player.MemberNumber
                }]
            });
            LogAdd("Released.Collar", "OwnerRule");
            InventoryRemove(Player, "ItemNeck");
            ChatRoomCharacterItemUpdate(Player, "ItemNeck");
        }
    }])

    CommandCombine([{
        Tag: 'reputation',
        Description: "(reputation) (level): changes a reputation. ",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The reputation command must be followed by a reputation and a level.\n" +
                    "You will be able to check the change in your profile.\n" +
                    " \n" +
                    "Available reputations:\n" +
                    "abdl, amplector, corporis, dominant, gambling,\n" +
                    "gaming, kidnap, larp, maid, maiestas, nurse,\n" +
                    "patient, submissive, vincula.\n" +
                    "Level must be between 0 and 100.</p>"
                );
            } else {
                var stringReputation1 = args;
                var stringReputation2 = stringReputation1.split(/[ ,]+/);
                var reputation = stringReputation2[0];
                var level = stringReputation2[1];
                if (reputation == "abdl") {
                    DialogSetReputation("ABDL", level);
                } else if (reputation == "amplector") {
                    DialogSetReputation("HouseCorporis", 0);
                    DialogSetReputation("HouseMaiestas", 0);
                    DialogSetReputation("HouseVincula", 0);
                    LogDelete("Mastery", "MagicSchool");
                    DialogSetReputation("HouseAmplector", level);
                } else if (reputation == "corporis") {
                    DialogSetReputation("HouseAmplector", 0);
                    DialogSetReputation("HouseMaiestas", 0);
                    DialogSetReputation("HouseVincula", 0);
                    LogDelete("Mastery", "MagicSchool");
                    DialogSetReputation("HouseCorporis", level);
                } else if (reputation == "dominant") {
                    DialogSetReputation("Dominant", level);
                } else if (reputation == "gambling") {
                    DialogSetReputation("Gambling", level);
                } else if (reputation == "gaming") {
                    DialogSetReputation("Gaming", level);
                } else if (reputation == "kidnap") {
                    DialogSetReputation("Kidnap", level);
                } else if (reputation == "larp") {
                    DialogSetReputation("LARP", level);
                } else if (reputation == "maid") {
                    DialogSetReputation("Maid", level);
                } else if (reputation == "maiestas") {
                    DialogSetReputation("HouseAmplector", 0);
                    DialogSetReputation("HouseCorporis", 0);
                    DialogSetReputation("HouseVincula", 0);
                    LogDelete("Mastery", "MagicSchool");
                    DialogSetReputation("HouseMaiestas", level);
                } else if (reputation == "nurse") {
                    DialogSetReputation("Asylum", level);
                } else if (reputation == "patient") {
                    DialogSetReputation("Asylum", -level);
                } else if (reputation == "submissive") {
                    DialogSetReputation("Dominant", -level);
                } else if (reputation == "vincula") {
                    DialogSetReputation("HouseAmplector", 0);
                    DialogSetReputation("HouseCorporis", 0);
                    DialogSetReputation("HouseMaiestas", 0);
                    LogDelete("Mastery", "MagicSchool");
                    DialogSetReputation("HouseVincula", level);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'resetdifficulty',
        Description: ": resets difficulty, thereby quitting it.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>Warning</b>: Resetting difficulty will incur a 7-day waiting period to rechange. Confirm by typing: <b>/resetdifficulty yes</b></p>"
                );
            } else if (args === "yes") {
                Player.Difficulty = [];
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: Difficulty reset, select a new one in settings.</p>"
                );
            }
        }
    }])

    CommandCombine([{
        Tag: 'resetinventory',
        Description: ": erases your inventory.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>Warning</b>: You will lose many clothes and items, you will need to buy them again. Confirm by typing: <b>/resetinventory yes</b></p>"
                );
            } else if (args === "yes") {
                Player.Inventory = [];
                ServerPlayerInventorySync();
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: Accomplished. Visit store to buy new clothes and items.</p>"
                );
            }
        }
    }])

    CommandCombine([{
        Tag: 'restrain',
        Description: "(target): adds random restraints.",
        Action: (args) => {
            if (args === "") {
                if (Restrain == undefined) {
                    var message = "Magical lasers apply random restraints on " + tmpname + "'s body."
                } else {
                    if (Restrain != "") {
                        if (Restrain.startsWith("\u0027")) {
                            var message = tmpname + Restrain;
                        } else {
                            var message = tmpname + ' '.repeat(1) + Restrain;
                        }
                    } else {
                        var message = "Magical lasers apply random restraints on " + tmpname + "'s body."
                    }
                }
                if (Restrain != "no message") {
                    ServerSend("ChatRoomChat", {
                        Content: "Beep",
                        Type: "Action",
                        Dictionary: [{
                            Tag: "Beep",
                            Text: message
                        }]
                    });
                }
                CharacterFullRandomRestrain(Player, "ALL");
                ChatRoomCharacterUpdate(Player);
            } else {
                var targetname = args;
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].AllowItem == true) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if (target[0].OnlineSharedSettings.Uwall == true) {
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                        );
                    } else {
                        if (Trestrain == undefined) {
                            var message = "Magical lasers apply random restraints on " + tgpname + "'s body."
                        } else {
                            if (Trestrain != "") {
                                if (Trestrain.startsWith("\u0027")) {
                                    var message = tmpname + Trestrain + ' '.repeat(1) + tgpname;
                                } else {
                                    var message = tmpname + ' '.repeat(1) + Trestrain + ' '.repeat(1) + tgpname;
                                }
                            } else {
                                var message = "Magical lasers apply random restraints on " + tgpname + "'s body."
                            }
                        }
                        if (Trestrain != "no message") {
                            ServerSend("ChatRoomChat", {
                                Content: "Beep",
                                Type: "Action",
                                Dictionary: [{
                                    Tag: "Beep",
                                    Text: message
                                }]
                            });
                        }
                        CharacterFullRandomRestrain(target[0], "ALL");
                        ChatRoomCharacterUpdate(target[0]);
                    }    
                }
                ChatRoomSetTarget(null);
            }
        }
    }])

    CommandCombine([{
        Tag: 'roleplay',
        Description: "(role): starts to play a role",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The roleplay command must include a role.\n" +
                    "You will be able to check the changes in your profile.\n" +
                    " \n" +
                    "Available roles:\n" +
                    "clubmistress, clubslave, doctor, escapedpatient,\n" +
                    "headmaid, kidnapper, maid, magician, magus,\n" +
                    "masterkidnapper, mistress, nurse, oracle, patient,\n" +
                    "permanentpatient, sage, sorcerer, warlock, witch, wizard.\n" +
                    "Be careful with clubslave, you will be forced to complete contract. Similar warning for escapedpatient.</p>"
                );
            } else {
                var role = args;
                if (role == "clubmistress") {
                    LogAdd("ClubMistress", "Management");
                } else if (role == "clubslave") {
                    LogAdd("ClubSlave", "Management", CurrentTime + 3600000);
                } else if (role == "doctor") {
                    LogAdd("Committed", "Asylum", CurrentTime);
                    ReputationChange('Asylum', 200);
                } else if (role == "escapedpatient") {
                    LogAdd("Escaped", "Asylum", CurrentTime + 86400000);
                } else if (role == "headmaid") {
                    LogAdd("LeadSorority", "Maid");
                } else if (role == "kidnapper") {
                    DialogSetReputation("Kidnap", 50);
                } else if (role == "magician") {
                    DialogSetReputation("HouseAmplector", 0);
                    DialogSetReputation("HouseCorporis", 0);
                    DialogSetReputation("HouseMaiestas", 0);
                    LogDelete("Mastery", "MagicSchool");
                    DialogSetReputation("HouseVincula", 50);
                } else if (role == "magus") {
                    DialogSetReputation("HouseAmplector", 0);
                    DialogSetReputation("HouseCorporis", 0);
                    DialogSetReputation("HouseVincula", 0);
                    LogDelete("Mastery", "MagicSchool");
                    DialogSetReputation("HouseMaiestas", 100);
                } else if (role == "maid") {
                    LogDelete("LeadSorority", "Maid");
                    LogAdd("JoinedSorority", "Management");
                } else if (role == "masterkidnapper") {
                    ReputationChange("Kidnap", 100);
                } else if (role == "mistress") {
                    LogAdd("ClubMistress", "Management");
                    ReputationChange("Dominant", 200);
                } else if (role == "nurse") {
                    LogAdd("Committed", "Asylum", CurrentTime);
                    DialogSetReputation("Asylum", 50);
                } else if (role == "oracle") {
                    DialogSetReputation("HouseCorporis", 0);
                    DialogSetReputation("HouseMaiestas", 0);
                    DialogSetReputation("HouseVincula", 0);
                    LogDelete("Mastery", "MagicSchool");
                    DialogSetReputation("HouseAmplector", 100);
                } else if (role == "patient") {
                    DialogSetReputation("Asylum", -50);
                } else if (role == "permanentpatient") {
                    ReputationChange('Asylum', -200);
                } else if (role == "sage") {
                    DialogSetReputation("HouseCorporis", 0);
                    DialogSetReputation("HouseMaiestas", 0);
                    DialogSetReputation("HouseVincula", 0);
                    LogDelete("Mastery", "MagicSchool");
                    DialogSetReputation("HouseAmplector", 50);
                } else if (role == "sorcerer") {
                    DialogSetReputation("HouseAmplector", 0);
                    DialogSetReputation("HouseCorporis", 0);
                    DialogSetReputation("HouseMaiestas", 0);
                    LogDelete("Mastery", "MagicSchool");
                    DialogSetReputation("HouseVincula", 100);
                } else if (role == "warlock") {
                    DialogSetReputation("HouseAmplector", 0);
                    DialogSetReputation("HouseMaiestas", 0);
                    DialogSetReputation("HouseVincula", 0);
                    LogDelete("Mastery", "MagicSchool");
                    DialogSetReputation("HouseCorporis", 100);
                } else if (role == "witch") {
                    DialogSetReputation("HouseAmplector", 0);
                    DialogSetReputation("HouseMaiestas", 0);
                    DialogSetReputation("HouseVincula", 0);
                    LogDelete("Mastery", "MagicSchool");
                    DialogSetReputation("HouseCorporis", 50);
                } else if (role == "wizard") {
                    DialogSetReputation("HouseAmplector", 0);
                    DialogSetReputation("HouseCorporis", 0);
                    DialogSetReputation("HouseVincula", 0);
                    LogDelete("Mastery", "MagicSchool");
                    DialogSetReputation("HouseMaiestas", 50);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'rolequit',
        Description: "(role or club area): ceases to play a role",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The rolequit command must include a role or clubarea.\n" +
                    "You will be able to check the changes in your profile.\n" +
                    " \n" +
                    "Available roles or areas:\n" +
                    "asylum to cease being doctor, nurse, patient or permanent patient.\n" +
                    "clubslave to break the club slave contract.\n" +
                    "ggts to leave ggts training (back to level 0).\n" +
                    "kidnapper to cease being kidnapper or master kidnapper.\n" +
                    "magician to cease one of the 8 magic roles.\n" +
                    "management or mistress to cease being mistress or club mistress.\n" +
                    "sorority or maid to cease being maid or headmaid.</p>"
                );
            } else {
                var role = args;
                if (role == "asylum") {
                    LogAdd("Escaped", "Asylum", CurrentTime);
                    LogAdd("Committed", "Asylum", CurrentTime);
                    DialogSetReputation("Asylum", 0);
                } else if (role == "clubslave") {
                    LogAdd("ClubSlave", "Management", CurrentTime);
                    LogAdd("BlockChange", "Rule", CurrentTime);
                    ManagementIsClubSlave = function() {
                        return false
                    }
                    ManagementClubSlaveDialog = function(Player) {}
                    ManagementFinishClubSlave()
                } else if (role == "ggts") {
                    Level = parseInt(0);
                    Player.Game.GGTS.Level = 0;
                    ServerAccountUpdate.QueueData({
                        Game: Player.Game
                    });
                } else if (role == "kidnapper") {
                    DialogSetReputation("Kidnap", 0)
                } else if (role == "magician") {
                    DialogSetReputation("HouseMaiestas", 0);
                    DialogSetReputation("HouseVincula", 0);
                    DialogSetReputation("HouseAmplector", 0);
                    DialogSetReputation("HouseCorporis", 0);
                    LogDelete("Mastery", "MagicSchool");
                } else if ((role == "management") || (role == "mistress")) {
                    LogDelete("ClubMistress", "Management");
                    LogDelete("Mistress", "Management");
                } else if ((role == "sorority") || (role == "maid")) {
                    LogDelete("JoinedSorority", "Management");
                    LogDelete("LeadSorority", "Maid");
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 's1',
        Description: "(words): speaks once in light stuttering mode.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The s1 command must be followed by the words you want to say.</p>"
                );
            } else {
                content = StutterTalk1(args);
                ServerSend("ChatRoomChat", {
                    "Content": content,
                    "Type": "Chat"
                });
            }
        }
    }])

    CommandCombine([{
        Tag: 's2',
        Description: "(words): speaks once in normal stuttering mode.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The s2 command must be followed by the words you want to say.</p>"
                );
            } else {
                content = StutterTalk2(args);
                ServerSend("ChatRoomChat", {
                    "Content": content,
                    "Type": "Chat"
                });
            }
        }
    }])

    CommandCombine([{
        Tag: 's3',
        Description: "(words): speaks once in heavy stuttering mode.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The s3 command must be followed by the words you want to say.</p>"
                );
            } else {
                content = StutterTalk3(args);
                ServerSend("ChatRoomChat", {
                    "Content": content,
                    "Type": "Chat"
                });
            }
        }
    }])

    CommandCombine([{
        Tag: 's4',
        Description: "(words): speaks once in total stuttering mode.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The s4 command must be followed by the words you want to say.</p>"
                );
            } else {
                content = StutterTalk4(args);
                ServerSend("ChatRoomChat", {
                    "Content": content,
                    "Type": "Chat"
                });
            }
        }
    }])

    CommandCombine([{
        Tag: 'safeworditem',
        Description: ": removes specific item.",
        Action: () => {
            ChatRoomSendLocal(
                "<p style='background-color:#5fbd7a'>ULTRAbc: You have 5 seconds to click on target, select area. If successful, will be returned. If not, retry.</p>"
            );
            setTimeout(function() {
                if (CurrentCharacter != null) {
                    if (CurrentCharacter.OnlineSharedSettings.UBC != undefined) {
		        var uw = 0;
                        CurrentCharacter.Appearance = CurrentCharacter.Appearance.filter(x => (CurrentCharacter.FocusGroup && CurrentCharacter.FocusGroup.Name) ? x.Asset.Group.Name !=
                        CurrentCharacter.FocusGroup.Name : true);
                        if (CurrentCharacter.OnlineSharedSettings.Uwall == true) {
                            if ((CurrentCharacter.Nickname == '') || (CurrentCharacter.Nickname == undefined)) {
                                tgpname = CurrentCharacter.Name;
                            } else {
                                tgpname = CurrentCharacter.Nickname;
                            }
                            if (tgpname != tmpname) {
                                var uw = 1;
                                ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                                );
                            } 
                        }
                        if (uw == 0) {
                            ChatRoomCharacterUpdate(CurrentCharacter);
                            DialogLeave();
                        }
                    }
                }
            }, 5000);
        }
    }])
         
    CommandCombine([{
        Tag: 'search',
        Description: "(lobby): opens room search for 15 seconds in specified lobby.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The search command must be followed by the lobby you want to explore.\n" +
                    "Available options: asylum, fclub, mclub, xclub.</p>"
                );
            }
            if (args === "asylum") {
                setTimeout(function() {
                    ChatRoomSpace = "Asylum";
                    ChatSearchLeaveRoom = "AsylumEntrance";
                    ChatSearchBackground = "AsylumEntrance";
                    ChatCreateBackgroundList = BackgroundsTagAsylum;
                    CommonSetScreen("Online", "ChatSearch");
                    ChatRoomSetLastChatRoom("");
                    document.getElementById("InputChat").style.display = "none";
                    document.getElementById("TextAreaChatLog").style.display = "none";
                }, 3000);
                setTimeout(function() {
                    CommonSetScreen("Online", "ChatRoom");
                    document.getElementById("InputChat").style.display = "inline";
                    document.getElementById("TextAreaChatLog").style.display = "inline";
                }, 15000);
            }
            if (args === "fclub") {
                if ((InventoryGet(Player, "Pronouns").Asset.Name == "SheHer") &&
                    (InventoryGet(Player, "Pussy").Asset.Name != "Penis") &&
                    (InventoryGet(Player, "BodyUpper").Asset.Name != "FlatSmall") &&
                    (InventoryGet(Player, "BodyUpper").Asset.Name != "FlatMedium")) {
                    setTimeout(function() {
                        ChatSelectStartSearch("");
                        ChatRoomSetLastChatRoom("");
                        document.getElementById("InputChat").style.display = "none";
                        document.getElementById("TextAreaChatLog").style.display = "none";
                        ChatSelectStartSearch("");
                        ChatRoomSetLastChatRoom("");
                    }, 3000);
                    setTimeout(function() {
                        CommonSetScreen("Online", "ChatRoom");
                        document.getElementById("InputChat").style.display = "inline";
                        document.getElementById("TextAreaChatLog").style.display = "inline";
                    }, 15000);
                } else {
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: Only females have access to this lobby.</p>"
                    );
                }
            }
            if (args === "mclub") {
                if ((InventoryGet(Player, "Pronouns").Asset.Name == "HeHim") &&
                    (InventoryGet(Player, "Pussy").Asset.Name == "Penis") &&
                    ((InventoryGet(Player, "BodyUpper").Asset.Name == "FlatSmall") || (InventoryGet(Player, "BodyUpper").Asset.Name == "FlatMedium"))) {
                    setTimeout(function() {
                        ChatSelectStartSearch("M");
                        ChatRoomSetLastChatRoom("");
                        document.getElementById("InputChat").style.display = "none";
                        document.getElementById("TextAreaChatLog").style.display = "none";
                        ChatSelectStartSearch("M");
                        ChatRoomSetLastChatRoom("");
                    }, 3000);
                    setTimeout(function() {
                        CommonSetScreen("Online", "ChatRoom");
                        document.getElementById("InputChat").style.display = "inline";
                        document.getElementById("TextAreaChatLog").style.display = "inline";
                    }, 15000);
                } else {
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: Only males have access to this lobby.</p>"
                    );
                }
            }
            if (args === "xclub") {
                setTimeout(function() {
                    ChatSelectStartSearch("X");
                    ChatRoomSetLastChatRoom("");
                    document.getElementById("InputChat").style.display = "none";
                    document.getElementById("TextAreaChatLog").style.display = "none";
                    ChatSelectStartSearch("X");
                    ChatRoomSetLastChatRoom("");
                }, 3000);
                setTimeout(function() {
                    CommonSetScreen("Online", "ChatRoom");
                    document.getElementById("InputChat").style.display = "inline";
                    document.getElementById("TextAreaChatLog").style.display = "inline";
                }, 15000);
            }
        }
    }])

    CommandCombine([{
        Tag: 'see',
        Description: "(visionmode) (blurlevel): forces a specific vision mode",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The see command must be followed by a vision mode number and optionally a blur level number.\n" +
                    "Notes:\n" +
                    "- a full relog is requested to leave this forced vision mode\n" +
                    "- this command can trigger a BCX warning. Just ignore it (close the breaking message)!\n" +
                    " \n" +
                    "Available vision modes:\n" +
                    "0 normal vision\n" +
                    "1 light blindness\n" +
                    "2 normal blindness\n" +
                    "3 heavy blindness\n" +
                    " \n" +
                    "Available blur levels:\n" +
                    "0 no blur effect\n" +
                    "1 light blur effect\n" +
                    "2 normal blur effect\n" +
                    "3 heavy blur effect\n" +
                    "4 total blur effect</p>"
                );
            } else {
                var stringVision1 = args;
                var stringVision2 = stringVision1.split(/[ ,]+/);
                var bl = stringVision2[0];
                var br = stringVision2[1];
                if (bl == 0) {
                    GetBlindLevel0();
                    Player.GetBlindLevel = GetBlindLevel0;
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: Back to normal vision mode.</p>"
                    );
                }
                if (bl == 1) {
                    GetBlindLevel1();
                    Player.GetBlindLevel = GetBlindLevel1;
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in light blindness mode.</p>"
                    );
                }
                if (bl == 2) {
                    GetBlindLevel2();
                    Player.GetBlindLevel = GetBlindLevel2;
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in normal blindness mode.</p>"
                    );
                }
                if (bl == 3) {
                    GetBlindLevel3();
                    Player.GetBlindLevel = GetBlindLevel3;
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in heavy blindness mode.</p>"
                    );
                }
                if (br == 0) {
                    GetBlurLevel0();
                    Player.GetBlurLevel = GetBlurLevel0;
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: Back to vision without blur effect.</p>"
                    );
                }
                if (br == 1) {
                    GetBlurLevel1();
                    Player.GetBlurLevel = GetBlurLevel1;
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: A light blur effect is applied on your vision.</p>"
                    );
                }
                if (br == 2) {
                    GetBlurLevel2();
                    Player.GetBlurLevel = GetBlurLevel2;
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: A normal blur effect is applied on your vision.</p>"
                    );
                }
                if (br == 3) {
                    GetBlurLevel3();
                    Player.GetBlurLevel = GetBlurLevel3;
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: A heavy blur effect is applied on your vision.</p>"
                    );
                }
                if (br == 4) {
                    GetBlurLevel4();
                    Player.GetBlurLevel = GetBlurLevel4;
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: A total blur effect is applied on your vision.</p>"
                    );
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'sfchaste',
        Description: "(model) (front shield) (back shield) (tamper protection) (orgasm mode): changes the settings of worn Futuristic Chastity Belt.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The sfchaste command must be followed by 5 numbers for model, front shield, back shield, tamper protection and orgasm mode.\n" +
                    " \n" +
                    "Available models: \n" +
                    "0 Prototype - 1 High-Security\n" +
                    "2 Training - 3 Neo\n" +
                    " \n" +
                    "Available front shields:\n" +
                    "0 Open - 1 Locked\n" +
                    " \n" +
                    "Available back shields:\n" +
                    "0 Open - 1 Locked\n" +
                    " \n" +
                    "Available tamper protections:\n" +
                    "0 Disabled - 1 Belt - 2 All items\n" +
                    " \n" +
                    "Available orgasm modes:\n" +
                    "0 Allow - 1 Punish</p>"
                );
            } else {
                if (InventoryGet(Player, "ItemPelvis") != null) {
                    if (InventoryGet(Player, "ItemPelvis").Asset.Name == "FuturisticChastityBelt") {
                        var stringSFchaste1 = args;
                        var stringSFchaste2 = stringSFchaste1.split(/[ ,]+/);
                        var msf = stringSFchaste2[0];
                        var fsf = stringSFchaste2[1];
                        var bsf = stringSFchaste2[2];
                        var tsf = stringSFchaste2[3];
                        var osf = stringSFchaste2[4];
                        if ((msf > -1) && (msf < 4) && (fsf > -1) && (fsf < 2) && (bsf > -1) && (bsf < 2) && (tsf > -1) && (tsf < 3) && (osf > -1) && (osf < 2)) {
                            const FuturisticChastityBelt = InventoryGet(Player, "ItemPelvis");
                            const FuturisticChastityBeltConfig = ModularItemDataLookup.ItemPelvisFuturisticChastityBelt;
                            FuturisticChastityBelt.Property = ModularItemMergeModuleValues(FuturisticChastityBeltConfig, [msf, fsf, bsf, tsf, osf]);
                            ChatRoomCharacterUpdate(Player);
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: The settings of your Futuristic Chastity Belt have been modified.</p>"
                            );
                        }
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'skill',
        Description: "(skill) (level): changes a skill. ",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The skill command must be followed by a skill and a level.\n" +
                    "You will be able to check the change in your profile.\n" +
                    " \n" +
                    "Available skills:\n" +
                    "bondage, dressage, evasion, infiltration,\n" +
                    "lockpicking, selfbondage, willpower.\n" +
                    "Level must be between 0 and 10.</p>"
                );
            } else {
                var stringSkill1 = args;
                var stringSkill2 = stringSkill1.split(/[ ,]+/);
                var skill = stringSkill2[0];
                var level = stringSkill2[1];
                if (skill == "bondage") {
                    SkillChange(Player, "Bondage", level);
                } else if (skill == "dressage") {
                    SkillChange(Player, "Dressage", level);
                } else if (skill == "evasion") {
                    SkillChange(Player, "Evasion", level);
                } else if (skill == "infiltration") {
                    SkillChange(Player, "Infiltration", level);
                } else if (skill == "lockpicking") {
                    SkillChange(Player, "LockPicking", level);
                } else if (skill == "selfbondage") {
                    SkillChange(Player, "SelfBondage", level);
                } else if (skill == "willpower") {
                    SkillChange(Player, "Willpower", level);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'sleep',
        Description: "(target): uses the sleeping pill on yourself or another player.",
        Action: (args) => {
            if (args === "") {
                ServerSend("ChatRoomChat", {
                    Content: "Beep",
                    Type: "Action",
                    Dictionary: [{
                        Tag: "Beep",
                        Text: "" + tmpname + " swallows a sleeping pill and drinks a glass of water. " + pronoun1 + " falls asleep very quickly."
                    }]
                });
                InventoryWear(Player, "RegularSleepingPill", 'ItemMouth');
                CharacterSetFacialExpression(Player, "Eyes", "Closed");
                CharacterSetFacialExpression(Player, "Eyes2", "Closed");
                CharacterSetFacialExpression(Player, "Emoticon", "Sleep");
                ChatRoomCharacterUpdate(Player);
            } else {
                var targetname = args;
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].AllowItem == true) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if (InventoryGet(target[0], "Pronouns").Asset.Name == "HeHim") {
                        tgpr1 = "He";
                        tgpr2 = "him";
                        tgpr3 = "his";
                        tgpr4 = "he";
                    } else if (InventoryGet(target[0], "Pronouns").Asset.Name == "SheHer") {
                        tgpr1 = "She";
                        tgpr2 = "her";
                        tgpr3 = "her";
                        tgpr4 = "she";
                    } else {
                        tgpr1 = "They";
                        tgpr2 = "them";
                        tgpr3 = "their";
                        tgpr4 = "they";
                    }
                    if (target[0].OnlineSharedSettings.Uwall == true) {
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                        );
                    } else {
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " feeds " + tgpname + " a sleeping pill and gives " + tgpr2 + " a glass of water. " + tgpname + " falls asleep very quickly."
                            }]
                        });
                        InventoryWear(target[0], "RegularSleepingPill", 'ItemMouth');
                        CharacterSetFacialExpression(target[0], "Eyes", "Closed");
                        CharacterSetFacialExpression(target[0], "Eyes2", "Closed");
                        CharacterSetFacialExpression(target[0], "Emoticon", "Sleep");
                        ChatRoomCharacterUpdate(target[0]);
                    }
                }
                ChatRoomSetTarget(null);
            }
        }
    }])

    CommandCombine([{
        Tag: 'slowleave',
        Description: "(action): slowly leaves the room.",
        Action: (args) => {
            if (args === "") {
                var message = " slowly heads for the door."
            } else {
                var message = ' '.repeat(1) + args;
            }
            ServerSend("ChatRoomChat", {
                Content: "Beep",
                Type: "Action",
                Dictionary: [{
                    Tag: "Beep",
                    Text: "" + tmpname + message
                }]
            });
            setTimeout(function() {
                ChatRoomSetLastChatRoom("");
                ServerSend("ChatRoomLeave", "");
                CommonSetScreen("Online", "ChatSearch");
                ChatRoomClearAllElements();
                OnlineGameName = "";
            }, 15000);
        }
    }])

    CommandCombine([{
        Tag: 'solidity',
        Description: "(value) (target): changes the solidity of most current bindings.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The solidity command must be followed by a number between 1 and 99, and optionally a target. </p>"
                );
            } else {
                var stringSol1 = args;
                var stringSol2 = stringSol1.split(/[ ,]+/);
                var solidity = stringSol2[0];
                var targetname = stringSol2[1];
                if ((targetname == null) && (solidity > 0) && (solidity < 100)) {
                    if (InventoryGet(Player, "ItemDevices") != null) {
                        if ((InventoryGet(Player, "ItemDevices").Asset.Name == "FuturisticCrate") || (InventoryGet(Player, "ItemDevices").Asset.Name == "WoodenRack")) {
                            if (solidity == 1) {
                                InventoryRemove(Player, "ItemDevices");
                                if (Solidity == undefined) {
                                    var message = "Magical lasers make disappear the device in which " + tmpname + " was prisoner.";
                                } else {
                                    if (Solidity != "") {
                                        if (Solidity.startsWith("\u0027")) {
                                            var message = tmpname + Solidity;
                                        } else {
                                            var message = tmpname + ' '.repeat(1) + Solidity;
                                        }
                                    } else {
                                        var message = "Magical lasers make disappear the device in which " + tmpname + " was prisoner.";
                                    }
                                }
                                if (Solidity != "no message") {
                                    ServerSend("ChatRoomChat", {
                                        Content: "Beep",
                                        Type: "Action",
                                        Dictionary: [{
                                            Tag: "Beep",
                                            Text: message
                                        }]
                                    });
                                }
                            }
                        }
                    }
                    for (let A = 0; A < Player.Appearance.length; A++)
                        if  (Player.Appearance[A].Asset.Group.Name != null) {
                            if (Player.Appearance[A].Asset.Group.Name.startsWith("Item")) {
                                Player.Appearance[A].Difficulty = solidity;
                            }
                        } 
                    ChatRoomCharacterUpdate(Player);
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: The solidity of most current bindings has been changed.</p>"
                    );
                } else {
                    var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                    if (target[0] == null) {
                        var targetnumber = parseInt(targetname);
                        target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                    }
                    if ((target[0] != null) && (target[0].AllowItem == true) && (solidity > 0) && (solidity < 100) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                        if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                            tgpname = target[0].Name;
                        } else {
                            tgpname = target[0].Nickname;
                        }
                        if (target[0].OnlineSharedSettings.Uwall == true) {
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                            );
                        } else {
                            if (InventoryGet(target[0], "ItemDevices") != null) {
                                if ((InventoryGet(target[0], "ItemDevices").Asset.Name == "FuturisticCrate") || (InventoryGet(target[0], "ItemDevices").Asset.Name == "WoodenRack")) {
                                    if (solidity == 1) {
                                        InventoryRemove(target[0], "ItemDevices");
                                        if (Tsolidity == undefined) {
                                            var message = "Magical lasers make disappear the device in which " + tgpname + " was prisoner.";
                                        } else {
                                            if (Tsolidity != "") {
                                                if (Tsolidity.startsWith("\u0027")) {
                                                    var message = tmpname + Tsolidity + ' '.repeat(1) + tgpname;
                                                } else {
                                                    var message = tmpname + ' '.repeat(1) + Tsolidity + ' '.repeat(1) + tgpname;
                                                }
                                            } else {
                                                var message = "Magical lasers make disappear the device in which " + tgpname + " was prisoner.";
                                            }
                                        }
                                        if (Tsolidity != "no message") {
                                            ServerSend("ChatRoomChat", {
                                                Content: "Beep",
                                                Type: "Action",
                                                Dictionary: [{
                                                    Tag: "Beep",
                                                    Text: message
                                                }]
                                            });
                                        }
                                    }
                                }
                            }
                            for (let A = 0; A < target[0].Appearance.length; A++)
                                if (target[0].Appearance[A].Asset.Group.Name != null) {
                                    if (target[0].Appearance[A].Asset.Group.Name.startsWith("Item")) {
                                        target[0].Appearance[A].Difficulty = solidity;
                                    }
                                } 
			    ServerSend("ChatRoomChat", {
                                Content: "Beep",
                                Type: "Action",
                                Dictionary: [{
                                    Tag: "Beep",
                                    Text: "The solidity of most current " + tgpname + "\u0027s bindings has been changed by " + tmpname + "."
                                }]
                            });
                            ChatRoomCharacterUpdate(target[0]);
                        }    
                    }
                    ChatRoomSetTarget(null);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'spin',
        Description: "(target): allows access to target's wheel of fortune, even when not displayed.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The spin command must be followed by the target whose wheel of fortune interests you.</p>"
                );
            } else {
                var targetname = args;
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if (target[0].OnlineSharedSettings.Uwall == true) {
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                        );
                    } else {
                        if (!InventoryAvailable(target[0], "WheelFortune", "ItemDevices")) {
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Bad luck! This player does not have a wheel of fortune.</p>"
                            );
                        } else {
                            CurrentCharacter = target[0];
                            ChatRoomHideElements();
                            WheelFortuneEntryModule = CurrentModule;
                            WheelFortuneEntryScreen = CurrentScreen;
                            WheelFortuneBackground = ChatRoomData.Background;
                            WheelFortuneCharacter = CurrentCharacter;
                            DialogLeave();
                            CommonSetScreen("MiniGame", "WheelFortune");
                        }
                    }
                }
                ChatRoomSetTarget(null);  
            }
        } 
    }])

    CommandCombine([{
        Tag: 'store',
        Description: ": leaves chatroom, goes to store, shows hidden items.",
        Action: () => {
            Asset.forEach(e => {
                if (e.Value < 0) e.Value = 1;
            });
            ServerSend("ChatRoomLeave", "");
            CommonSetScreen("Room", "Shop");
            ChatRoomSetLastChatRoom("");
            OnlineGameName = "";
            ChatRoomClearAllElements();
        }
    }])

    CommandCombine([{
        Tag: 'stutter',
        Description: "(stuttermode): forces a specific stuttering mode.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The stutter command must be followed by a number between 0 and 4.\n" +
                    " \n" +
                    "Available stuttering modes:\n" +
                    "0 no stuttering\n" +
                    "1 light stuttering\n" +
                    "2 normal stuttering\n" +
                    "3 heavy stuttering\n" +
                    "4 total stuttering</p>"
                );
            } else {
                var stlevel = args;
                ElementValue("InputChat", "");
                if (stlevel == 0) {
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: No more stuttering.</p>"
                    );
                    Stutter1On = false;
                    Stutter2On = false;
                    Stutter3On = false;
                    Stutter4On = false;
                } else if (stlevel == 1) {
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in light stuttering mode.</p>"
                    );
                    Stutter1On = true;
                    Stutter2On = false;
                    Stutter3On = false;
                    Stutter4On = false;
                } else if (stlevel == 2) {
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in normal stuttering mode.</p>"
                    );
                    Stutter1On = false;
                    Stutter2On = true;
                    Stutter3On = false;
                    Stutter4On = false;
                } else if (stlevel == 3) {
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in heavy stuttering mode.</p>"
                    );
                    Stutter1On = false;
                    Stutter2On = false;
                    Stutter3On = true;
                    Stutter4On = false;
                } else if (stlevel == 4) {
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in total stuttering mode.</p>"
                    );
                    Stutter1On = false;
                    Stutter2On = false;
                    Stutter3On = false;
                    Stutter4On = true;
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'superdice',
        Description: "(sides): rolls a superdice. ",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The superdice command must be followed by a number between 2 and 999999999.<p>"
                );
            } else {
                var sides = args;
                if ((sides < 2) || (sides > 1000000000)) sides = 6;
                const Result = [];
                let Roll = Math.floor(Math.random() * sides) + 1;
                Result.push(Roll);
                ServerSend("ChatRoomChat", {
                    Content: "Beep",
                    Type: "Action",
                    Dictionary: [{
                        Tag: "Beep",
                        Text: "" + tmpname + " rolls a superdice of " + sides + " sides. The result is " + Result + "."
                    }]
                });
            }
        }
    }])

    CommandCombine([{
        Tag: 'talk',
        Description: "(talkmode): forces a specific talk mode",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The talk command must be followed by a number between -1 and 9.\n" +
                    " \n" +
                    "Available talk modes:\n" +
                    "-1 baby talk\n" +
                    "0 normal talk\n" +
                    "1 very light gag talk\n" +
                    "2 light gag talk\n" +
                    "3 easy gag talk\n" +
                    "4 normal gag talk\n" +
                    "5 medium gag talk\n" +
                    "6 heavy gag talk\n" +
                    "7 very heavy gag talk\n" +
                    "8 total gag talk\n" +
                    "9 real baby/gag talk</p>"
                );
            } else {
                var gaglevel = args;
                ElementValue("InputChat", "");
                if (gaglevel == -1) {
                    if (this.BabyTalkOn == false || this.BabyTalkOn == undefined) {
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in baby talk mode.</p>"
                        );
                        GagTalkOn = false;
                        BabyTalkOn = true;
                    }
                }
                if (gaglevel == 0) {
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: Back to normal talk mode.</p>"
                    );
                    BabyTalkOn = false;
                    GagTalkOn = false;
                }
                if ((gaglevel > 0) && (gaglevel < 9)) {
                    if (this.GagTalkOn == false || this.GagTalkOn == undefined) {
                        BabyTalkOn = false;
                        gl = gaglevel;
                        GagTalkOn = true;
                    } else {
                        GagTalkOn = false;
                        gl = gaglevel;
                        GagTalkOn = true;
                    }
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in gag talk mode.</p>"
                    );
                }
                if (gaglevel == 9) {
                    var bl = 0;
                    if ((InventoryGet(Player, "ItemMouth") != null) && (InventoryGet(Player, "ItemMouth").Asset.Name == "RegressedMilk")) {
                        bl = 1;
                    }
                    if ((InventoryGet(Player, "ItemMouth2") != null) && (InventoryGet(Player, "ItemMouth2").Asset.Name == "RegressedMilk")) {
                        bl = 1;
                    }
                    if ((InventoryGet(Player, "ItemMouth3") != null) && (InventoryGet(Player, "ItemMouth3").Asset.Name == "RegressedMilk")) {
                        bl = 1;
                    }
                    if (bl == 1) {
                        if (this.BabyTalkOn == false || this.BabyTalkOn == undefined) {
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in real baby talk mode.</p>"
                            );
                            GagTalkOn = false;
                            BabyTalkOn = true;
                        }
                    } else {
                        if (this.GagTalkOn == false || this.GagTalkOn == undefined) {
                            BabyTalkOn = false;
                            gl = SpeechGetTotalGagLevel(Player);
                            if (gl == 0) {
                                GagTalkOn = false;
                                ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: Back to normal talk mode.</p>"
                                );
                            } else {
                                GagTalkOn = true;
                                ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in real gag talk mode.</p>"
                                );
                            }
                        } else {
                            GagTalkOn = false;
                            gl = SpeechGetTotalGagLevel(Player);
                            if (gl == 0) {
                                ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: Back to normal talk mode.</p>"
                                );
                            } else {
                                GagTalkOn = true;
                                ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in real gag talk mode.</p>"
                                );
                            }
                        }
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'theme',
        Description: "(number): changes chat color theme after automatic relog.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The theme command must be followed by a number between 0 and 3.<p>"
                );
            } else {
                var theme = args;
                if ((theme > -1) && (theme < 4)) {
                    Player.ChatSettings.ColorTheme = PreferenceChatColorThemeList[theme]
                    ServerAccountUpdate.QueueData({
                        ChatSettings: Player.ChatSettings
                    });
                    ServerSocket.close();
                    ServerSocket.open();
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'timeleft',
        Description: "(target): reveals remaining time on current timer locks.",
        Action: (args) => {
            if (args === "") {
                for (let A = 0; A < Player.Appearance.length; A++)
                    if ((Player.Appearance[A].Property != null) && (Player.Appearance[A].Property.LockedBy != null)) {
                        if ((Player.Appearance[A].Property.LockedBy == "TimerPadlock") || (Player.Appearance[A].Property.LockedBy == "MistressTimerPadlock") || (Player.Appearance[A].Property.LockedBy == "LoversTimerPadlock") || (Player.Appearance[A].Property.LockedBy == "OwnerTimerPadlock") || (Player.Appearance[A].Property.LockedBy == "TimerPasswordPadlock")) {
                            var asset = Player.Appearance[A].Asset.Description;
                            var time = Player.Appearance[A].Property.RemoveTimer;
                            var left = TimerToString(time - CurrentTime);
                            ChatRoomSendLocal("" + asset + " = " + left + "");
                        }
                        if (Player.Appearance[A].Property.Name == "Best Friend Timer Padlock") {
                            var asset = Player.Appearance[A].Asset.Description;
                            var time = Player.Appearance[A].Property.RemovalTime;
                            var left = TimerToString(time - CurrentTime);
                            ChatRoomSendLocal("" + asset + " = " + left + "");
                        }
                    }
            } else {
                var targetname = args;
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if (target[0] != null) {
                    for (let A = 0; A < target[0].Appearance.length; A++)
                         if ((target[0].Appearance[A].Property != null) && (target[0].Appearance[A].Property.LockedBy != null)) {
                             if ((target[0].Appearance[A].Property.LockedBy == "TimerPadlock") || (target[0].Appearance[A].Property.LockedBy == "MistressTimerPadlock") || (target[0].Appearance[A].Property.LockedBy == "LoversTimerPadlock") || (target[0].Appearance[A].Property.LockedBy == "OwnerTimerPadlock") || (target[0].Appearance[A].Property.LockedBy == "TimerPasswordPadlock")) {
                                 var asset = target[0].Appearance[A].Asset.Description;
                                 var time = target[0].Appearance[A].Property.RemoveTimer;
                                 var left = TimerToString(time - CurrentTime);
                                 ChatRoomSendLocal("" + asset + " = " + left + "");
                             }
                             if (target[0].Appearance[A].Property.Name == "Best Friend Timer Padlock") {
                                 var asset = target[0].Appearance[A].Asset.Description;
                                 var time = target[0].Appearance[A].Property.RemovalTime;
                                 var left = TimerToString(time - CurrentTime);
                                 ChatRoomSendLocal("" + asset + " = " + left + "");
                             }
                        }            
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'timercell',
        Description: "(minutes): stays in the isolation cell.",
        Action: (args) => {
            var minutes = args;
            ServerSend("ChatRoomChat", {
                Content: "Beep",
                Type: "Action",
                Dictionary: [{
                    Tag: "Beep",
                    Text: "" + tmpname + " gets grabbed by two maids and locked in a timer cell for " + minutes + " minutes."
                }]
            });
            DialogLentLockpicks = false;
            ChatRoomClearAllElements();
            ServerSend("ChatRoomLeave", "");
            CharacterDeleteAllOnline();
            CellLock(minutes);
        }
    }])

    CommandCombine([{
        Tag: 'title',
        Description: "(title): chooses a new title.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The title command must be followed by a title.\n" +
                    "It will also change required parameters to get the title.\n" +
                    "You will be able to check the changes in your profile.\n" +
                    " \n" +
                    "Available titles:\n" +
                    "agent, angel, baby, bondage baby, bondage maid,\n" +
                    "bunny, clubslave, coldbloodhorse, collegestudent,\n" +
                    "demon, diaperlover, doctor, doll, drone, duchess,\n" +
                    "escapedpatient, farmhorse, flyingpegasus, foal, foxy,\n" +
                    "goodgirl, goodslave, goodslavegirl, headmaid,\n" +
                    "hotbloodhorse, houdini, infiltrator, kidnapper,\n" +
                    "kitten, ladyluck, littleone, magician, magus, maid,\n" +
                    "majesticalicorn, masterkidnapper, mistress, mole,\n" +
                    "nawashi, nurse, operative, oracle, patient,\n" +
                    "patron, permanentpatient, puppy, sage, shiningunicorn,\n" +
                    "sorcerer, succubus, superspy, switch, warmbloodhorse,\n" +
                    "warlock, wildmustang, witch, wizard.</p>"
                );
            } else {
                var title = args;
                if (title == "agent") {
                    if ((SkillGetLevel(Player, "Infiltration") < 6) || (SkillGetLevel(Player, "Infiltration") > 7)) {
                        SkillChange(Player, "Infiltration", 6);
                    }
                    TitleSet("InfilrationAgent");
                } else if (title == "angel") {
                    TitleSet("Angel");
                } else if (title == "baby") {
                    if (ReputationGet("ABDL") < 1) {
                        DialogSetReputation("ABDL", 1);
                    }
                    TitleSet("Baby");
                } else if (title == "bondagebaby") {
                    if (ReputationGet("ABDL") < 1) {
                        DialogSetReputation("ABDL", 1);
                    }
                    if (SkillGetLevel(Player, "Evasion") < 10) {
                        SkillChange(Player, "Evasion", 10);
                    }
                    TitleSet("BondageBaby");
                } else if (title == "bondagemaid") {
                    if ((LogQuery("JoinedSorority", "Maid") == false) || (LogQuery("LeadSorority", "Maid") == false)) {
                        LogAdd("JoinedSorority", "Management");
                    }
                    if (SkillGetLevel(Player, "Evasion") < 10) {
                        SkillChange(Player, "Evasion", 10);
                    }
                    TitleSet("BondageMaid");
                } else if (title == "bunny") {
                    TitleSet("Bunny");
                } else if (title == "clubslave") {
                    LogAdd("ClubSlave", "Management", CurrentTime + 3600000);
                } else if (title == "coldbloodhorse") {
                    if ((SkillGetLevel(Player, "Dressage") < 3) || (SkillGetLevel(Player, "Infiltration") > 3)) {
                        SkillChange(Player, "Dressage", 3);
                    }
                    TitleSet("PonyCold");
                } else if (title == "collegestudent") {
                    LogAdd("BondageCollege", "Import");
                    TitleSet("CollegeStudent");
                } else if (title == "demon") {
                    TitleSet("Demon");
                } else if (title == "diaperlover") {
                    if (ReputationGet("ABDL") < 1) {
                        DialogSetReputation("ABDL", 1);
                    }
                    TitleSet("DL");
                } else if (title == "doctor") {
                    if (ReputationGet("Asylum") < 100) {
                        DialogSetReputation("Asylum", 100);
                    }
                    LogAdd("Committed", "Asylum", CurrentTime);
                    TitleSet("Doctor");
                } else if (title == "doll") {
                    TitleSet("Doll");
                } else if (title == "drone") {
                    if (AsylumGGTSGetLevel(Player) < 6) {
                        Level = parseInt(6);
                        Player.Game.GGTS.Level = 6;
                        ServerAccountUpdate.QueueData({
                            Game: Player.Game
                        });
                    }
                    TitleSet("Drone");
                } else if (title == "duchess") {
                    LogAdd("KidnapSophie", "Sarah");
                    TitleSet("Duchess");
                } else if (title == "escapedpatient") {
                    LogAdd("Escaped", "Asylum", CurrentTime + 86400000);
                } else if (title == "farmhorse") {
                    if ((SkillGetLevel(Player, "Dressage") < 2) || (SkillGetLevel(Player, "Infiltration") > 2)) {
                        SkillChange(Player, "Dressage", 2);
                    }
                    TitleSet("PonyFarm");
                } else if (title == "flyingpegasus") {
                    if ((SkillGetLevel(Player, "Dressage") < 8) || (SkillGetLevel(Player, "Infiltration") > 9)) {
                        SkillChange(Player, "Dressage", 8);
                    }
                    TitleSet("PonyPegasus");
                } else if (title == "foal") {
                    if (ReputationGet("ABDL") < 1) {
                        if ((SkillGetLevel(Player, "Dressage") < 1) || (SkillGetLevel(Player, "Infiltration") > 2)) {
                            SkillChange(Player, "Dressage", 1);
                        }
                    } else if (ReputationGet("ABDL") >= 1) {
                        if (SkillGetLevel(Player, "Dressage") < 1) {
                            SkillChange(Player, "Dressage", 1);
                        }
                    }
                    TitleSet("PonyFoal");
                } else if (title == "foxy") {
                    TitleSet("Foxy");
                } else if (title == "goodgirl") {
                    if (AsylumGGTSGetLevel(Player) < 4) {
                        Level = parseInt(4);
                        Player.Game.GGTS.Level = 4;
                        ServerAccountUpdate.QueueData({
                            Game: Player.Game
                        });
                    }
                    TitleSet("GoodGirl");
                } else if (title == "goodslave") {
                    if (AsylumGGTSGetLevel(Player) < 6) {
                        Level = parseInt(6);
                        Player.Game.GGTS.Level = 6;
                        ServerAccountUpdate.QueueData({
                            Game: Player.Game
                        });
                    }
                    TitleSet("GoodSlave");
                } else if (title == "goodslavegirl") {
                    if (AsylumGGTSGetLevel(Player) < 5) {
                        Level = parseInt(5);
                        Player.Game.GGTS.Level = 5;
                        ServerAccountUpdate.QueueData({
                            Game: Player.Game
                        });
                    }
                    TitleSet("GoodSlaveGirl");
                } else if (title == "headmaid") {
                    LogAdd("LeadSorority", "Maid");
                    TitleSet("HeadMaid");
                } else if (title == "hotbloodhorse") {
                    if ((SkillGetLevel(Player, "Dressage") < 5) || (SkillGetLevel(Player, "Infiltration") > 5)) {
                        SkillChange(Player, "Dressage", 5);
                    }
                    TitleSet("PonyHot");
                } else if (title == "houdini") {
                    if (SkillGetLevel(Player, "Evasion") < 10) {
                        SkillChange(Player, "Evasion", 10);
                    }
                    TitleSet("Houdini");
                } else if (title == "infiltrator") {
                    if ((SkillGetLevel(Player, "Infiltration") < 4) || (SkillGetLevel(Player, "Infiltration") > 5)) {
                        SkillChange(Player, "Infiltration", 4);
                    }
                    TitleSet("InfilrationInfiltrator");
                } else if (title == "kidnapper") {
                    if ((ReputationGet("Kidnap") < 50) || (ReputationGet("Kidnap") > 99)) {
                        DialogSetReputation("Kidnap", 50);
                    }
                    TitleSet("Kidnapper");
                } else if (title == "kitten") {
                    TitleSet("Kitten");
                } else if (title == "ladyluck") {
                    if (ReputationGet("Gambling") < 100) {
                        DialogSetReputation("Gambling", 100);
                    }
                    TitleSet("LadyLuck");
                } else if (title == "littleone") {
                    if (ReputationGet("ABDL") < 1) {
                        DialogSetReputation("ABDL", 1);
                    }
                    TitleSet("LittleOne");
                } else if (title == "magician") {
                    if ((ReputationGet("HouseVincula") < 50) || (ReputationGet("HouseVincula") > 99)) {
                        DialogSetReputation("HouseAmplector", 0);
                        DialogSetReputation("HouseCorporis", 0);
                        DialogSetReputation("HouseMaiestas", 0);
                        LogDelete("Mastery", "MagicSchool");
                        DialogSetReputation("HouseVincula", 50);
                    }
                    TitleSet("MagicSchoolMagician");
                } else if (title == "magus") {
                    if (ReputationGet("HouseMaiestas") < 100) {
                        DialogSetReputation("HouseAmplector", 0);
                        DialogSetReputation("HouseCorporis", 0);
                        DialogSetReputation("HouseVincula", 0);
                        LogDelete("Mastery", "MagicSchool");
                        DialogSetReputation("HouseMaiestas", 100);
                    }
                    TitleSet("MagicSchoolMagus");
                } else if (title == "maid") {
                    LogDelete("LeadSorority", "Maid");
                    LogAdd("JoinedSorority", "Management");
                    TitleSet("Maid");
                } else if (title == "majesticalicorn") {
                    if (SkillGetLevel(Player, "Dressage") < 10) {
                        SkillChange(Player, "Dressage", 10);
                    }
                    TitleSet("PonyAlicorn");
                } else if (title == "masterkidnapper") {
                    if (ReputationGet("Kidnap") < 100) {
                        DialogSetReputation("Kidnap", 100);
                    }
                    TitleSet("MasterKidnapper");
                } else if (title == "mistress") {
                    LogAdd("ClubMistress", "Management");
                    TitleSet("Mistress");
                } else if (title == "mole") {
                    if ((SkillGetLevel(Player, "Infiltration") < 2) || (SkillGetLevel(Player, "Infiltration") > 3)) {
                        SkillChange(Player, "Infiltration", 2);
                    }
                    TitleSet("InfilrationMole");
                } else if (title == "nawashi") {
                    if (SkillGetLevel(Player, "Bondage") < 10) {
                        SkillChange(Player, "Bondage", 10);
                    }
                    TitleSet("Nawashi");
                } else if (title == "nurse") {
                    if ((ReputationGet("Asylum") < 50) || (ReputationGet("Asylum") > 99)) {
                        DialogSetReputation("Asylum", 50);
                    }
                    LogAdd("Committed", "Asylum", CurrentTime);
                    TitleSet("Nurse");
                } else if (title == "operative") {
                    if ((SkillGetLevel(Player, "Infiltration") < 8) || (SkillGetLevel(Player, "Infiltration") > 9)) {
                        SkillChange(Player, "Infiltration", 8);
                    }
                    TitleSet("InfilrationOperative");
                } else if (title == "oracle") {
                    if (ReputationGet("HouseAmplector") < 100) {
                        DialogSetReputation("HouseCorporis", 0);
                        DialogSetReputation("HouseMaiestas", 0);
                        DialogSetReputation("HouseVincula", 0);
                        LogDelete("Mastery", "MagicSchool");
                        DialogSetReputation("HouseAmplector", 100);
                    }
                    TitleSet("MagicSchoolOracle");
                } else if (title == "patient") {
                    if ((ReputationGet("Asylum") > -50) || (ReputationGet("Asylum") < -99)) {
                        DialogSetReputation("Asylum", -50);
                    }
                    TitleSet("Patient");
                } else if (title == "patron") {
                    TitleSet("Patron");
                } else if (title == "permanentpatient") {
                    if (ReputationGet("Asylum") > -100) {
                        DialogSetReputation("Asylum", -100);
                    }
                    TitleSet("PermanentPatient");
                } else if (title == "puppy") {
                    TitleSet("Puppy");
                } else if (title == "sage") {
                    if ((ReputationGet("HouseAmplector") < 50) || (ReputationGet("HouseAmplector") > 99)) {
                        DialogSetReputation("HouseCorporis", 0);
                        DialogSetReputation("HouseMaiestas", 0);
                        DialogSetReputation("HouseVincula", 0);
                        LogDelete("Mastery", "MagicSchool");
                        DialogSetReputation("HouseAmplector", 50);
                    }
                    TitleSet("MagicSchoolSage");
                } else if (title == "shiningunicorn") {
                    if ((SkillGetLevel(Player, "Dressage") < 7) || (SkillGetLevel(Player, "Infiltration") > 7)) {
                        SkillChange(Player, "Dressage", 7);
                    }
                    TitleSet("PonyUnicorn");
                } else if (title == "sorcerer") {
                    if (ReputationGet("HouseVincula") < 100) {
                        DialogSetReputation("HouseAmplector", 0);
                        DialogSetReputation("HouseCorporis", 0);
                        DialogSetReputation("HouseMaiestas", 0);
                        LogDelete("Mastery", "MagicSchool");
                        DialogSetReputation("HouseVincula", 100);
                    }
                    TitleSet("MagicSchoolSorcerer");
                } else if (title == "succubus") {
                    TitleSet("Succubus");
                } else if (title == "superspy") {
                    if (SkillGetLevel(Player, "Infiltration") < 10) {
                        SkillChange(Player, "Infiltration", 10);
                    }
                    TitleSet("InfilrationSuperspy");
                } else if (title == "switch") {
                    TitleSet("Switch");
                } else if (title == "warlock") {
                    if (ReputationGet("HouseCorporis") < 100) {
                        DialogSetReputation("HouseAmplector", 0);
                        DialogSetReputation("HouseMaiestas", 0);
                        DialogSetReputation("HouseVincula", 0);
                        LogDelete("Mastery", "MagicSchool");
                        DialogSetReputation("HouseCorporis", 100);
                    }
                    TitleSet("MagicSchoolWarlock");
                } else if (title == "warmbloodhorse") {
                    if ((SkillGetLevel(Player, "Dressage") < 4) || (SkillGetLevel(Player, "Infiltration") > 4)) {
                        SkillChange(Player, "Dressage", 4);
                    }
                    TitleSet("PonyWarm");
                } else if (title == "wildmustang") {
                    if ((SkillGetLevel(Player, "Dressage") < 6) || (SkillGetLevel(Player, "Infiltration") > 6)) {
                        SkillChange(Player, "Dressage", 6);
                    }
                    TitleSet("PonyWild");
                } else if (title == "witch") {
                    if ((ReputationGet("HouseCorporis") < 50) || (ReputationGet("HouseCorporis") > 99)) {
                        DialogSetReputation("HouseAmplector", 0);
                        DialogSetReputation("HouseMaiestas", 0);
                        DialogSetReputation("HouseVincula", 0);
                        LogDelete("Mastery", "MagicSchool");
                        DialogSetReputation("HouseCorporis", 50);
                    }
                    TitleSet("MagicSchoolWitch");
                } else if (title == "wizard") {
                    if ((ReputationGet("HouseMaiestas") < 50) || (ReputationGet("HouseMaiestas") > 99)) {
                        DialogSetReputation("HouseAmplector", 0);
                        DialogSetReputation("HouseCorporis", 0);
                        DialogSetReputation("HouseVincula", 0);
                        LogDelete("Mastery", "MagicSchool");
                        DialogSetReputation("HouseMaiestas", 50);
                    }
                    TitleSet("MagicSchoolWizard");
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'totalrelease',
        Description: "(target): removes all bindings, collar, harness, chastity, toys.",
        Action: (args) => {
            if (args === "") {
                if (Totalrelease == undefined) {
                    var message = "Magical lasers make disappear all bindings and toys on " + tmpname + "'s body."
                } else {
                    if (Totalrelease != "") {
                        if (Totalrelease.startsWith("\u0027")) {
                            var message = tmpname + Totalrelease;
                        } else {
                            var message = tmpname + ' '.repeat(1) + Totalrelease;
                        }
                    } else {
                        var message = "Magical lasers make disappear all bindings and toys on " + tmpname + "'s body."
                    }
                }
                if (Totalrelease != "no message") {
                    ServerSend("ChatRoomChat", {
                        Content: "Beep",
                        Type: "Action",
                        Dictionary: [{
                            Tag: "Beep",
                            Text: message
                        }]
                    });
                }
                CharacterReleaseTotal(Player);
                ChatRoomCharacterUpdate(Player);
            } else {
                var targetname = args;
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].AllowItem == true) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if (target[0].OnlineSharedSettings.Uwall == true) {
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                        );
                    } else {
                        if (Ttotalrelease == undefined) {
                            var message = "Magical lasers make disappear all bindings and toys on " + tgpname + "'s body."
                        } else {
                            if (Ttotalrelease != "") {
                                if (Ttotalrelease.startsWith("\u0027")) {
                                    var message = tmpname + Ttotalrelease + ' '.repeat(1) + tgpname;
                                } else {
                                    var message = tmpname + ' '.repeat(1) + Ttotalrelease + ' '.repeat(1) + tgpname;
                                }
                            } else {
                                var message = "Magical lasers make disappear all bindings and toys on " + tgpname + "'s body."
                            }
                        }
                        if (Ttotalrelease != "no message") {
                            ServerSend("ChatRoomChat", {
                                Content: "Beep",
                                Type: "Action",
                                Dictionary: [{
                                    Tag: "Beep",
                                    Text: message
                                }]
                            });
                        }
                        CharacterReleaseTotal(target[0]);
                        ChatRoomCharacterUpdate(target[0]);
                    }
                }
                ChatRoomSetTarget(null);   
            }
        }
    }])

    CommandCombine([{
        Tag: 'trsee',
        Description: "(visor) (deafening module) (chin strap): changes the settings of a worn Techno Helmet",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The trsee command must be followed by 3 numbers for visor, deafening module and chin strap.\n" +
                    " \n" +
                    "Available visors:\n" +
                    "0 No visor - 1 transparent\n" +
                    "2 light tinted - 3 heavy tinted\n" +
                    "4 opaque - 5 hypnotic\n" +
                    " \n" +
                    "Available deafening modules:\n" +
                    "0 no module\n" +
                    "1 light\n" +
                    "2 heavy\n" +
                    "3 noise-cancelling\n" +
                    " \n" +
                    "Available options for chin strap:\n" +
                    "0 No chin strap\n" +
                    "1 chin strap</p>"
                );
            } else {
                if (InventoryGet(Player, "ItemHood") != null) {
                    if (InventoryGet(Player, "ItemHood").Asset.Name == "TechnoHelmet1") {
                        var stringTRvision1 = args;
                        var stringTRvision2 = stringTRvision1.split(/[ ,]+/);
                        var vtr = stringTRvision2[0];
                        var dtr = stringTRvision2[1];
                        var ctr = stringTRvision2[2];
                        if ((vtr > -1) && (vtr < 6) && (dtr > -1) && (dtr < 4) && (ctr > -1) && (ctr < 2)) {
                            const TechnoHelmet1 = InventoryGet(Player, "ItemHood");
                            const TechnoHelmet1Config = ModularItemDataLookup.ItemHoodTechnoHelmet1;
                            TechnoHelmet1.Property = ModularItemMergeModuleValues(TechnoHelmet1Config, [vtr, dtr, ctr]);
                            ChatRoomCharacterUpdate(Player);
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: The settings of your Techno Helmet have been modified.</p>"
                            );
                        }
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'uhelp',
        Description: "(category): displays the ULTRAbc commands.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The help is organized into categories. Use <b>/uhelp</b> (category). List of categories:\n" +
                    "<b>bondage</b> = commands related to bondage.\n" +
                    "<b>character</b> = commands related to your character.\n" +
                    "<b>chat</b> = commands with extra features in chat room.\n" +
                    "<b>clothing</b> = commands related to the clothes.\n" +
                    "<b>escape</b> = commands related to escape.\n" +
                    "<b>extra</b> = commands for info about other add-ons.\n" +
                    "<b>fun</b> = commands related to fun, pain and pleasure.\n" +
                    "<b>kd</b> = info about kd command (for Kinky Dungeon).\n" +
                    "<b>misc</b> = special commands.\n" +
                    "<b>settings</b> = commands to customize ULTRAbc.\n" +
                    "<b>talking</b> = commands related to talking.\n" +
                    "<b>visual</b> = commands related to animations and background.\n" +
                    "<b>zones</b> = commands related to game zones.\n" +
                    "Several commands require or allow to specify a target. It can be a real name or a member number.\n" +
                    "Visit also our <a href='https://github.com/tetris245/ULTRAbc/wiki' target='_blank'>Wiki</a> and join this <a href='https://discord.gg/JUvYfSpCmN' target='_blank'>Discord</a></p>"
                );
            }
            if (args === "bondage") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Bondage commands - * = more info when using\n" +
                    "<b>/hint</b> (target) (hint) = adds or changes a hint for all current locks with password.\n" +
                    "<b>/itemcolor</b> (colorcode) (target) = changes color on all current bindings. Color code must be in the format #000000\n" +
                    "<b>/lock</b> = adds locks on all lockable items. *.\n" +
                    "<b>/outfit</b> = restores/saves/loads outfit (including restraints). *\n" +
                    "<b>/pet</b> (target) = becomes a fully restrained pet.\n" +
                    "<b>/randomize</b> (target) = naked + underwear + clothes + restrain commands.\n" +
                    "<b>/restrain</b> (target) = adds random restraints.\n" +
                    "<b>/solidity</b> (value) (target) = changes the solidity of most current bindings. Value must be between 1 and 99.\n" +
                    "<b>/spin</b> (target) = access to any wheel of fortune, even hidden.</p>"
                );
            }
            if (args === "character") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Character commands - * = more info when using\n" +
                    "<b>/difficulty</b> (number) = changes game difficulty. *\n" +
                    "<b>/maxstatistics</b> = gives max statistics.\n" +     
                    "<b>/permission</b> (number) = changes your item permission *\n" +
                    "<b>/reputation</b> (reputation) (level) = changes a reputation. *\n" +
                    "<b>/resetinventory</b> = erases your inventory.\n" +
                    "<b>/roleplay</b> (rolehere) = starts a role. *\n" +
                    "<b>/rolequit</b> (role or clubarea here) = ceases to play a role. *\n" +
                    "<b>/skill</b> (skill) (level) = changes a skill. *\n" +
                    "<b>/title</b> (newtitlehere) = chooses a new title. *</p>"
                );
            }
            if (args === "chat") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Chat commands - * = more info when using\n" +
                    "<b>/autokick</b> = toggles on auto kick for 0 day old accounts.\n" +
                    "<b>/bio</b> (target) = sees profile of any player in chat room.\n" +
                    "<b>/erase</b> = erases chat.\n" +
                    "<b>/font</b> (newfont) (size) = changes font in BC. *\n" +
                    "<b>/frlist</b> (lobby) = gives access to friendlist in specified lobby with clickable links during 15 seconds. *\n" +
		    "<b>/mapfog</b> = toggles fog in current map room.\n" +
		    "<b>/mapfull</b> = toggles full vision and hearing in map rooms.\n" +
                    "<b>/mapkeys</b> = gives all keys for current map room.\n" + 
		    "<b>/maproom</b> = gives infos about players in current map.\n" +
                    "<b>/mapx</b> (x-position) = changes your X coordinate in the map.\n" +
                    "<b>/mapy</b> (y-position) = changes your Y coordinate in the map.\n" +
                    "<b>/poof</b> (action) = leaves the club very fast. Action is optional (default = poofs away).\n" +
                    "<b>/search</b> (lobby) = opens room search for 15 seconds in specified lobby. *\n" +
                    "<b>/theme</b> (number) = changes chat color theme after automatic relog. Number must be between 0 and 3.</p>"
                );
            }
            if (args === "clothing") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Clothing commands - * = more info when using\n" +
                    "<b>/clothes</b> (target) = changes clothes.\n" +
                    "<b>/diaper</b> (options) = plays with diapers (ABDL game). *\n" +
                    "<b>/naked</b> (target) = removes clothes.\n" +
                    "<b>/outfit</b> (options) = restores/saves/loads outfit (including restraints). *\n" +
                    "<b>/underwear</b> (target) = changes underwear.\n" +
                    "<b>/wrobe</b> (target) = opens target wardrobe.</p>"
                );
            }
            if (args === "escape") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Escape commands - * = more info when using\n" +
                    "<b>/boost</b> = boosts all your skills for one hour.\n" +
                    "<b>/code</b> (target) = reveals codes for combination locks.\n" +
                    "<b>/ptcode</b> (target) = reveals portal link codes.\n" +
                    "<b>/pw</b> (target) = reveals passwords for locks with password.\n" +
                    "<b>/quit</b> (action) = leaves room.\n" +
                    "<b>/removecollar</b> = temporarily removes slave/owner collar.\n" +
                    "<b>/resetdifficulty</b> = resets difficulty, thereby quitting it.\n" +
                    "<b>/safeworditem</b> = removes specific item. *\n" +
                    "<b>/solidity</b> (value) (target) = changes the solidity of most current bindings. Use low values to escape! Value 1 to escape special devices.\n" +
		    "<b>/timeleft</b> (target) = reveals remaining time on timer locks.\n" +
                    "<b>/totalrelease</b> (target) = removes all bindings, collar, harness, chastity, toys.\n" +
                    "<b>/unlock</b> (target) (locktype) = removes all locks or only a specified type of lock. *\n" +
                    "<b>/untie</b> (target) = removes all bindings.</p>"
                );
            }
            if (args === "extra") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Extra commands:\n" +
		    "<b>/mbsroom</b> = gives infos about MBS wheels of fortune in current chat room.\n" +
                    "<b>/xstatus</b> (add-on) = displays status of main settings for other add-ons. Available options with /xstatus.</p>"
                );
            }
            if (args === "fun") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Fun commands - * = more info when using\n" +
                    "<b>/cum</b> = causes an orgasm.\n" +
                    "<b>/hdvibe</b> (options) = changes the settings of worn High Duty Belt. *\n" +
                    "<b>/invisible</b> = becomes invisible (scripts must be allowed in BC settings).\n" +
                    "<b>/moaner</b> (options) = moans when horny and stimulated. *.\n" +
                    "<b>/plvibe</b> (options) = changes the settings of worn Sci-Fi Pleasure Panties. *\n" +
                    "<b>/sfchaste</b> (options) = changes the settings of worn Futuristic Chastity Belt. *\n" +
                    "<b>/sleep</b> (target) = uses the sleeping pill on yourself or another player.\n" +
                    "<b>/slowleave</b> (action) = slowly leaves the room.\n" +
                    "<b>/superdice</b> (sides) = rolls a superdice. Sides can be between 2 and 999999999.\n" +
                    "<b>/visible</b> = back to visible state if you are invisible.</p>"
                );
            }
            if (args === "kd") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: How to use the kd command:\n" +
                    "1 - Optionally, use <b>/kd devious</b> to toggle the Devious Challenge and/or <b>/kd debug</b> to enable the Debug Mode\n" +
                    "2 - Use twice <b>/kd</b> without any option to launch the game without cheat\n" +
                    "3 - After launching of the game, you can click on the Exit button to go back to the chatroom and use a command with cheat:\n" +
                    "<b>/kd maxstats</b> to get high stats and many potions\n" +
                    "<b>/kd moreitems</b> to get all extra items\n" +
                    "<b>/kd outfits</b> to get all outfits\n" +
                    "<b>/kd restraints</b> to get all restraints\n" +
                    "<b>/kd spells</b> to get special spells for extra slots and improved stats\n" +
                    "<b>/kd weapons</b> to get all weapons\n" +
                    " \n" +
                    "<b>/kd remove</b> to remove one layer of restraints\n" +
                    "4 - Check the cheat effect on the game before repeating step 3 for another cheat</p>"
                );
            }
            if (args === "misc") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Misc commands - * = more info when using\n" +
                    "<b>/login</b> (accountname) (password) = logs in a new account.\n" +
                    "<b>/relog</b> = relogs.\n" +
                    "<b>/uhelp</b> (category) = displays the ULTRAbc commands. *\n" +
                    "<b>/ustatus</b> = displays status of ULTRAbc settings.\n" +
                    "<b>/unrestrict</b> =  partially removes restrictions from game. * </p>\n"
                );
            }
            if (args === "settings") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Settings commands - * = more info when using\n" +
                    "<b>/carddesk</b> (desk) = changes default desk for Card Game.\n" +
		    "<b>/cardextra</b> = gives all extra cards.\n" +
                    "<b>/cardfame</b> (fame) = sets high fame level for Card Game.\n" +
		    "<b>/cardnoextra</b> = removes all extra cards.\n" +
                    "<b>/killpar</b> = kills UBC/Moaner parameters saved locally.\n" +
                    "<b>/message</b> (option) (message) = creates custom messages for specific command. *\n" +
                    "<b>/uset</b> (setting) = toggles a specific UBC setting *.</p>"
                );
            }

            if (args === "talking") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Talking commands - * = more info when using\n" +
                    "<b>/btalk</b> (stuffhere) = speaks once as a baby.\n" +
                    "<b>/gtalk</b> (talkmode) (stuffhere) = speaks once in specified gag talk. *\n" +
		    "<b>/hear</b> (hearingmode) = forces a specific hearing mode. *\n" +
                    "<b>/moaner</b> = moans when horny and stimulated. *\n" +
		    "<b>/murmur</b> (target) (message) = sends whisper to specified target.\n" +
                    "<b>/s1</b> (stuffhere) = speaks once in light stuttering mode.\n" +
                    "<b>/s2</b> (stuffhere) = speaks once in normal stuttering mode.\n" +
                    "<b>/s3</b> (stuffhere) = speaks once in heavy stuttering mode.\n" +
                    "<b>/s4</b> (stuffhere) = speaks once in total stuttering mode.\n" +
                    "<b>/stutter</b> (stuttermode) = forces a specific stuttering mode. *\n" +
                    "<b>/talk</b> (talkmode) = forces a specific talk mode. *</p>"
                );
            }
            if (args === "visual") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Visual commands - * = more info when using\n" +
                    "<b>/bg1</b> = adds hidden backgrounds to the selection screen.\n" +
                    "<b>/bg2</b> (number) = uses a Bondage Brawl background as standard background. /bg2 to get the list.\n" +
                    "<b>/bg3</b> (number) = uses a Bondage College background as custom background. /bg3 to get the list.\n" +
                    "<b>/blur</b> (blurlevel) = forces a specific global blur level.\n" +
                    "<b>/colorchanger</b> (animhere) = gets an animation with color change. *\n" +
                    "<b>/pose2</b> (posehere) (target) = changes the pose of any player. *\n" +
		    "<b>/see</b> (visionmode) (blurlevel): forces a specific vision mode. *\n" +
                    "<b>/trsee</b> (visor) (deafening module) (chin strap) = changes the settings of a worn Techno Helmet. * \n" +
                    "<b>/vrsee</b> (background) (mode) (game) = changes the settings of a worn VR Headset. *</p>"
                );
            }
            if (args === "zones") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Zones commands - * = more info when using\n" +
                    "<b>/asylum</b> (minutes) = enters asylum, bypasses requirements. Specify minutes if you are a patient.\n" +
                    "<b>/chess</b> (difficulty) = starts chess, must specify difficulty first (1 easy - 2 normal - 3 hard).\n" +
                    "<b>/college</b> = enters college, bypasses requirements.\n" +
                    "<b>/game</b> (minigame) = launches a minigame. *\n" +
                    "<b>/ggts</b> (minutes) (level) = enters ggts training in asylum for the specified time. Level must be between 1 and 6.\n" +
                    "<b>/keydeposit</b> (hours) = keeps your keys safe in the vault.\n" +
                    "<b>/mission</b> (missionhere) = forces a specific infiltration mission. *\n" +
                    "<b>/prison</b> (minutes) = stays in Pandora prison. More than 60 minutes is possible.\n" +
                    "<b>/store</b> = leaves chatroom, goes to store. Shows hidden items.\n" +
                    "<b>/timercell</b> (minutes) = stays in the isolation cell. More than 60 minutes is possible.</p>"
                );
            }
        }
    }])

    CommandCombine([{
        Tag: 'underwear',
        Description: "(target): changes underwear.",
        Action: (args) => {
            if (args === "") {
                if (Underwear == undefined) {
                    var message = "Magical lasers put " + tmpname + " in random underwear."
                } else {
                    if (Underwear != "") {
                        if (Underwear.startsWith("\u0027")) {
                            var message = tmpname + Underwear;
                        } else {
                            var message = tmpname + ' '.repeat(1) + Underwear;
                        }
                    } else {
                        var message = "Magical lasers put " + tmpname + " in random underwear."
                    }
                }
                if (Underwear != "no message") {
                    ServerSend("ChatRoomChat", {
                        Content: "Beep",
                        Type: "Action",
                        Dictionary: [{
                            Tag: "Beep",
                            Text: message
                        }]
                    });
                }
                CharacterRandomUnderwear(Player);
                ChatRoomCharacterUpdate(Player);
            } else {
                var targetname = args;
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].AllowItem == true) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if (target[0].OnlineSharedSettings.Uwall == true) {
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                        );
                    } else {
                        if (Tunderwear == undefined) {
                            var message = "Magical lasers put " + tgpname + " in random underwear."
                        } else {
                            if (Tunderwear != "") {
                                if (Tunderwear.startsWith("\u0027")) {
                                    var message = tmpname + Tunderwear + ' '.repeat(1) + tgpname;
                                } else {
                                    var message = tmpname + ' '.repeat(1) + Tunderwear + ' '.repeat(1) + tgpname;
                                }
                            } else {
                                var message = "Magical lasers put " + tgpname + " in random underwear."
                            }
                        }
                        if (Tunderwear != "no message") {
                            ServerSend("ChatRoomChat", {
                                Content: "Beep",
                                Type: "Action",
                                Dictionary: [{
                                    Tag: "Beep",
                                    Text: message
                                }]
                            });
                        }
                        CharacterRandomUnderwear(target[0]);
                        ChatRoomCharacterUpdate(target[0]);
                    }    
                }
                ChatRoomSetTarget(null);
            }
        }
    }])

    CommandCombine([{
        Tag: 'unlock',
        Description: "(target) (locktype): removes all locks or only a specified type of lock on specified target.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The unlock command:\n" +
                    "<b>/unlock</b> (target) (locktype).\n" +
                    "The target always needs to be specified.\n" +
                    "All locks of any type will be removed if you don't specify the lock type.\n" +
                    " \n" +
                    "The lock types:\n" +
                    "1 Metal - 2 Exclusive - 3 Intricate - 4 High Security\n" +
                    "5 Pandora - 6 Mistress - 7 Lover - 8 Owner\n" +
                    "9 Five Minutes - 10 Combination - 11 Safeword\n" +
                    "12 Password - 13 Mistress Timer - 14 Lover Timer\n" +
                    "15 Owner Timer - 16 Timer Password\n" +
                    "17 Best Friend - 18 Best Friend Timer\n" +
                    "19 Family - 20 Portal Link</p>"
                );
            } else {
                var silent = 0;
		var uw = 0;
                var stringUnlock1 = args;
                var stringUnlock2 = stringUnlock1.split(/[ ,]+/);
                var lk = stringUnlock2[1];
                var targetname = stringUnlock2[0];
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && ((target[0] == Player) || (target[0].AllowItem == true)) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if (tmpname == tgpname) {
                        if (Unlock == undefined) {
                            var message = "Magical lasers make disappear locks on " + tgpname + "'s body."
                        } else {
                            if (Unlock != "") {
                                if (Unlock.startsWith("\u0027")) {
                                    var message = tmpname + Unlock;
                                } else {
                                    var message = tmpname + ' '.repeat(1) + Unlock;
                                }
                            } else {
                                var message = "Magical lasers make disappear locks on " + tgpname + "'s body."
                            }
                        }                     
                        if (Unlock == "no message") var silent = 1;
                    } else {
                        if (target[0].OnlineSharedSettings.Uwall == true) {
                            var uw = 1;
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                            );
                        } else  { 
                            if (Tunlock == undefined) {
                                var message = "Magical lasers make disappear locks on " + tgpname + "'s body."
                            } else {
                                if (Tunlock != "") {
                                    if (Tunlock.startsWith("\u0027")) {
                                        var message = tmpname + Tunlock + ' '.repeat(1) + tgpname;
                                    } else {
                                        var message = tmpname + ' '.repeat(1) + Tunlock + ' '.repeat(1) + tgpname;
                                    }
                                } else {
                                    var message = "Magical lasers make disappear locks on " + tgpname + "'s body."
                                }
                            }
                            if (Tunlock == "no message") var silent = 1;
                        }
                    }
                    if (uw == 0) {
                        if (silent == 0) {
                            ServerSend("ChatRoomChat", {
                                Content: "Beep",
                                Type: "Action",
                                Dictionary: [{
                                    Tag: "Beep",
                                    Text: message
                                }]
                            });
                        }
                        if (lk == null) {
                            CharacterReleaseFromLock(target[0], "CombinationPadlock");
                            CharacterReleaseFromLock(target[0], "ExclusivePadlock");
                            CharacterReleaseFromLock(target[0], "FamilyPadlock");
                            CharacterReleaseFromLock(target[0], "HighSecurityPadlock");
                            CharacterReleaseFromLock(target[0], "IntricatePadlock");
                            CharacterReleaseFromLock(target[0], "LoversPadlock");
                            CharacterReleaseFromLock(target[0], "LoversTimerPadlock");
                            CharacterReleaseFromLock(target[0], "MetalPadlock");
                            CharacterReleaseFromLock(target[0], "MistressPadlock");
                            CharacterReleaseFromLock(target[0], "MistressTimerPadlock");
                            CharacterReleaseFromLock(target[0], "OwnerPadlock");
                            CharacterReleaseFromLock(target[0], "OwnerTimerPadlock");
                            CharacterReleaseFromLock(target[0], "PandoraPadlock");
                            CharacterReleaseFromLock(target[0], "PasswordPadlock");
                            CharacterReleaseFromLock(target[0], "PortalLinkPadlock");
                            CharacterReleaseFromLock(target[0], "SafewordPadlock");
                            CharacterReleaseFromLock(target[0], "TimerPadlock");
                            CharacterReleaseFromLock(target[0], "TimerPasswordPadlock");
                        } else if (lk == 1) {
                            CharacterReleaseFromLock(target[0], "MetalPadlock");
                        } else if (lk == 2) {
                            CharacterReleaseFromLock(target[0], "ExclusivePadlock");
                        } else if (lk == 3) {
                            CharacterReleaseFromLock(target[0], "IntricatePadlock");
                        } else if (lk == 4) {
                            for (let A = 0; A < target[0].Appearance.length; A++)
                                if ((target[0].Appearance[A].Property != null) &&
                                (target[0].Appearance[A].Property.LockedBy == "HighSecurityPadlock") &&
                                (target[0].Appearance[A].Property.Name == undefined))
                                    InventoryUnlock(target[0], target[0].Appearance[A]);
                        } else if (lk == 5) {
                            CharacterReleaseFromLock(target[0], "PandoraPadlock");
                        } else if (lk == 6) {
                            CharacterReleaseFromLock(target[0], "MistressTimerPadlock");
                        } else if (lk == 7) {
                            CharacterReleaseFromLock(target[0], "LoversPadlock");
                        } else if (lk == 8) {
                            CharacterReleaseFromLock(target[0], "OwnerPadlock");
                        } else if (lk == 9) {
                            CharacterReleaseFromLock(target[0], "TimerPadlock");
                        } else if (lk == 10) {
                            CharacterReleaseFromLock(target[0], "CombinationPadlock");
                        } else if (lk == 11) {
                            CharacterReleaseFromLock(target[0], "SafewordPadlock");
                        } else if (lk == 12) {
                            CharacterReleaseFromLock(target[0], "PasswordPadlock");
                        } else if (lk == 13) {
                            CharacterReleaseFromLock(target[0], "MistressTimerPadlock");
                        } else if (lk == 14) {
                            CharacterReleaseFromLock(target[0], "LoversTimerPadlock");
                        } else if (lk == 15) {
                            CharacterReleaseFromLock(target[0], "OwnerTimerPadlock");
                        } else if (lk == 16) {
                            CharacterReleaseFromLock(target[0], "TimerPasswordPadlock");
                        } else if (lk == 17) {
                            for (let A = 0; A < target[0].Appearance.length; A++)
                                if ((target[0].Appearance[A].Property != null) &&
                                (target[0].Appearance[A].Property.LockedBy == "HighSecurityPadlock") &&
                                (target[0].Appearance[A].Property.Name == "Best Friend Padlock"))
                                    InventoryUnlock(target[0], target[0].Appearance[A]);
                        } else if (lk == 18) {
                            for (let A = 0; A < target[0].Appearance.length; A++)
                                if ((target[0].Appearance[A].Property != null) &&
                                (target[0].Appearance[A].Property.LockedBy == "HighSecurityPadlock") &&
                                (target[0].Appearance[A].Property.Name == "Best Friend Timer Padlock"))
                                    InventoryUnlock(target[0], target[0].Appearance[A]);
                        } else if (lk == 19) {
                            CharacterReleaseFromLock(target[0], "FamilyPadlock");
                        } else if (lk == 20) {
                            CharacterReleaseFromLock(target[0], "PortalLinkPadlock");
                        }
                        ChatRoomCharacterUpdate(target[0]);
                    }
                }    
                ChatRoomSetTarget(null);
            }
        }
    }])
                 
    CommandCombine([{
        Tag: 'unrestrict',
        Description: "(option): partially removes restrictions from game.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The unrestrict command partially removes restrictions from game. It must be followed by an option.\n" +
                    "Submissives: type <b>/unrestrict soft</b>\n" +
                    "Other players: type <b>/unrestrict total</b>\n" +
		    "Notes: \n" +
                    "- On request from BC main coder, and because some developers act like the BC 'asset' police, a feature removing conditions (except those related to gender) to use assets is no more included in this command.\n" +
                    "- The unrestrict total command can trigger a BCX warning. Just ignore it (close the breaking message) and enjoy your goddess powers!</p>"
                );
            } else if (args === "soft") {
                InventoryGroupIsBlocked = function(C, GroupName) {
                    return false;
                }
                Player.GameplaySettings.BlindDisableExamine = false;
                Asset.forEach(e => {
                    if (e.Value < 0) e.Value = 1;
                });
                Player.Inventory.forEach(item => item.Asset.Enable = true);
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: Unrestricted softly. Can do some things you couldn't do before.\n" +
                    "Store also includes hidden items. This can only be reset via a full relog.</p>"
                );
            } else if (args === "total") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: Unrestricted totally. Can do many things you couldn't do before.\n" +
                    "Store also includes hidden items. This can only be reset via a full relog.\n" +
		    "This command can trigger a BCX warning. Just ignore it (close the breaking message) and enjoy your goddess powers!</p>"
                );
                Player.CanInteract = function() {
                    return true;
                }
                Player.CanTalk = function() {
                    return true;
                }
                Player.IsPlugged = function() {
                    return false;
                }
                Player.IsVulvaChaste = function() {
                    return false;
                }
                Player.CanChange = function() {
                    return true;
                }
                InventoryGroupIsBlocked = function(C, GroupName) {
                    return false;
                }
                Player.GameplaySettings.BlindDisableExamine = false;
                Asset.forEach(e => {
                    if (e.Value < 0) e.Value = 1;
                });
                Player.Inventory.forEach(item => item.Asset.Enable = true);
                DialogHasKey = function(C, Item) {
                    return true
                }
                StruggleLockPickProgressStart = function(C, Item) {
                    InventoryUnlock(CurrentCharacter, CurrentCharacter.FocusGroup.Name);
                    ChatRoomCharacterItemUpdate(CurrentCharacter, CurrentCharacter.FocusGroup.Name);
                    DialogLeave()
                }
                StruggleProgressStart = function(C, PrevItem, NextItem) {
                    if (InventoryGet(CurrentCharacter, CurrentCharacter.FocusGroup.Name) == null) {
                        if (C != Player || PrevItem == null || ((PrevItem != null) && (!InventoryItemHasEffect(PrevItem, "Lock", true) || DialogCanUnlock(C, PrevItem)) && ((Player.CanInteract() && !InventoryItemHasEffect(PrevItem, "Mounted", true)) || StruggleStrengthGetDifficulty(C, PrevItem, NextItem).auto >= 0))) {
                            StruggleProgressCurrentMinigame = "Strength";
                            StruggleStrengthStart(C, PrevItem, NextItem);
                        }
                    } else {
                        InventoryUnlock(CurrentCharacter, CurrentCharacter.FocusGroup.Name);
                        InventoryRemove(CurrentCharacter, CurrentCharacter.FocusGroup.Name);
                        ChatRoomCharacterItemUpdate(CurrentCharacter, CurrentCharacter.FocusGroup.Name);
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'untie',
        Description: "(target): removes all bindings.",
        Action: (args) => {
            if (args === "") {
                if (Untie == undefined) {
                    var message = "Magical lasers make disappear the bindings on " + tmpname + "'s body."
                } else {
                    if (Untie != "") {
                        if (Untie.startsWith("\u0027")) {
                            var message = tmpname + Untie;
                        } else {
                            var message = tmpname + ' '.repeat(1) + Untie;
                        }
                    } else {
                        var message = "Magical lasers make disappear the bindings on " + tmpname + "'s body."
                    }
                }
                if (Untie != "no message") {
                    ServerSend("ChatRoomChat", {
                        Content: "Beep",
                        Type: "Action",
                        Dictionary: [{
                            Tag: "Beep",
                            Text: message
                        }]
                    });
                }
                CharacterRelease(Player);
                ChatRoomCharacterUpdate(Player);
            } else {
                var targetname = args;
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].AllowItem == true) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if (target[0].OnlineSharedSettings.Uwall == true) {
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                        );
                    } else {
                        if (Tuntie == undefined) {
                            var message = "Magical lasers make disappear the bindings on " + tgpname + "'s body."
                        } else {
                            if (Tuntie != "") {
                                if (Tuntie.startsWith("\u0027")) {
                                    var message = tmpname + Tuntie + ' '.repeat(1) + tgpname;
                                } else {
                                    var message = tmpname + ' '.repeat(1) + Tuntie + ' '.repeat(1) + tgpname;
                                }
                            } else {
                                var message = "Magical lasers make disappear the bindings on " + tgpname + "'s body."
                            }
                        }
                        if (Tuntie != "no message") {
                            ServerSend("ChatRoomChat", {
                                Content: "Beep",
                                Type: "Action",
                                Dictionary: [{
                                    Tag: "Beep",
                                    Text: message
                                }]
                            });
                        }
                        CharacterRelease(target[0]);
                        ChatRoomCharacterUpdate(target[0]);
                    }
                }
                ChatRoomSetTarget(null);
            }
        }
    }])
          
    CommandCombine([{
        Tag: 'uset',
        Description: "(setting): toggles a specific UBC setting.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The uset command must be followed by an option corresponding to an UBC setting.\n" +
                    " \n" +
                    "Available options:\n" +
                    "<b>autojoin</b> to toggle chat room auto-join feature\n" +
                    "<b>exitmode</b> to toggle exit mode for OUT button \n" +
                    "<b>fullseed</b> to toggle full solution for intricate and hs locks\n" +
                    "<b>highfame</b> to toggle high fame mode in Club Card Game\n" +  
                    "<b>hotkeys</b> to toggle hotkeys on numeric pad (Divide = fast leave - Multiply = Total Release)\n" +      
                    "<b>magiccheat</b> to toggle cheat mode in Bondage Brawl and Magic School\n" +
                    "<b>nowhisper</b> to toggle no-whisper mode\n" +
                    "<b>npcpunish</b> to toggle NPC punishments\n" +
		    "<b>outbuttons</b> to toggle OUT buttons\n" +
                    "<b>sosbuttons</b> to toggle emergency buttons (FREE)</p>"
                );
            } else {
                var setting = args;
                if (setting == "autojoin") {
                    if (AutojoinOn == true) {
                        AutojoinOn = false;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Auto-Join feature is disabled.</p>"
                        );
                    } else {
                        AutojoinOn = true;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                             "<p style='background-color:#5fbd7a'>ULTRAbc: Auto-Join feature is enabled.</p>"
                        );
                    }
                } else if (setting == "exitmode") {
                    if (SlowleaveOn == true) {
                        SlowleaveOn = false;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Fast exit mode is activated.</p>"
                        );
                    } else {
                        SlowleaveOn = true;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Slow exit mode is activated.</p>"
                        );
                    }
                } else if (setting == "fullseed") {
                    if (FullseedOn == true) {
                        FullseedOn = false;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Full solution for intricate and high security locks is disabled.</p>"
                        );
                    } else {
                        FullseedOn = true;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Full solution for intricate and high security locks is enabled.</p>"
                        );
                    }
                } else if (setting == "highfame") {
                    if (HighfameOn == true) {
                        HighfameOn = false;
                        ClubCardFameGoal = 100;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: High fame mode disabled in Bondage Club Card Game.</p>"
                        );
                    } else {
                        HighfameOn = true;
                        ClubCardFameGoal = cfame;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: High fame mode enabled in Bondage Club Card Game.</p>"
                        );
                    }
                } else if (setting == "hotkeys") {
                    if (HotkeysOn == true) {
                        HotkeysOn = false;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Hotkeys on numeric pad are disabled.</p>"
                        );
                    } else {
                        HotkeysOn = true;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Hotkeys on numeric pad are enabled.</p>"
                        );
                    }
                } else if (setting == "magiccheat") {
                    if (MagiccheatOn == true) {
                        MagiccheatOn = false;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Cheat mode disabled in Bondage Brawl and Magic School.</p>"
                        );
                    } else {
                        MagiccheatOn = true;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                             "<p style='background-color:#5fbd7a'>ULTRAbc: Cheat mode enabled in Bondage Brawl and Magic School.</p>"
                        );
                    }
                } else if (setting == "nowhisper") {                   
                    if (NowhisperOn == true) {
                        NowhisperOn = false;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: No-whisper mode disabled.</p>"
                        );
                    } else {
                        NowhisperOn = true;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: No-whisper mode enabled.</p>"
                        );
                    }
                } else if (setting == "npcpunish") {
                    if (Player.RestrictionSettings.BypassNPCPunishments == true) {
                        Player.RestrictionSettings.BypassNPCPunishments = false;
                        NPCpunish = true;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: NPC punishments enabled.</p>"
                        );
                    } else {
                        Player.RestrictionSettings.BypassNPCPunishments = true;
                        NPCpunish = false;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: NPC punishments disabled.</p>"
                        );
                    }
		} else if (setting == "outbuttons") {
                    if (OutbuttonsOn == true) {
                        OutbuttonsOn = false;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: OUT buttons hidden and disabled.</p>"
                        );
                    } else {
                        OutbuttonsOn = true;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: OUT buttons displayed and enabled.</p>"
                        );
                    }
                } else if (setting == "sosbuttons") {
                    if (SosbuttonsOn == true) {
                        SosbuttonsOn = false;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Emergency buttons hidden and disabled.</p>"
                        );
                    } else {
                        SosbuttonsOn = true;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Emergency buttons displayed and enabled.</p>"
                        );
                    }
                }
            }    
        }
    }])
 
    CommandCombine([{
        Tag: 'ustatus',
        Description: ": displays status of UBC settings.",
        Action: () => {
            showAutojoinStatus();
            showExitmodeStatus();
            showFullseedStatus();
            showHighfameStatus();
            showHotkeysStatus();
            showMagiccheatStatus();
            showNowhisperStatus();
            showNpcpunishStatus();
	    showOutbuttonsStatus();
            showSosbuttonsStatus();
        }
    }])

    CommandCombine([{
        Tag: 'visible',
        Description: ": back to visible state after using of the invisible command.",
        Action: (args) => {
            ServerSend("ChatRoomChat", {
                Content: "Beep",
                Type: "Action",
                Dictionary: [{
                    Tag: "Beep",
                    Text: "" + tmpname + " suddenly is visible for everybody."
                }]
            });
            InventoryRemove(Player, "ItemScript");
            CurrentScreen === 'ChatRoom' ?
                ChatRoomCharacterUpdate(Player) :
                CharacterRefresh(Player);
        }
    }])

    CommandCombine([{
        Tag: 'vrsee',
        Description: "(background) (mode) (game): changes the settings of a worn VR Headset.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The vrsee command must be followed by 3 numbers for background, mode and game.\n" +
                    " \n" +
                    "Available backgrounds:\n" +
                    "0 No background - 1 Virtual World\n" +
                    "2 Dungeon - 3 High-Tech\n" +
                    "4 Ancient Ruins - 5 Trance\n" +
                    " \n" +
                    "Available modes:\n" +
                    "0 Passthrough\n" +
                    "1 VR off\n" +
                    "2 VR on\n" +
                    "3 VR on + Hide restraints\n" +
                    " \n" +
                    "Available games:\n" +
                    "0 No game\n" +
                    "1 Kinky Dungeon</p>"
                );
            } else {
                if (InventoryGet(Player, "ItemHead") != null) {
                    if (InventoryGet(Player, "ItemHead").Asset.Name == "InteractiveVRHeadset") {
                        var stringVRvision1 = args;
                        var stringVRvision2 = stringVRvision1.split(/[ ,]+/);
                        var bvr = stringVRvision2[0];
                        var fvr = stringVRvision2[1];
                        var gvr = stringVRvision2[2];
                        if ((bvr > -1) && (bvr < 6) && (fvr > -1) && (fvr < 4) && (gvr > -1) && (gvr < 2)) {
                            const InteractiveVRHeadset = InventoryGet(Player, "ItemHead");
                            const InteractiveVRHeadsetConfig = ModularItemDataLookup.ItemHeadInteractiveVRHeadset;
                            InteractiveVRHeadset.Property = ModularItemMergeModuleValues(InteractiveVRHeadsetConfig, [bvr, fvr, gvr]);
                            ChatRoomCharacterUpdate(Player);
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: The settings of your VR Headset have been modified.</p>"
                            );
                        }
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'xstatus',
        Description: "(add-on): displays status settings for other add-ons.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The xstatus command must be followed by an option corresponding to an add-on.\n" +
                    " \n" +
                    "Available options:\n" +
                    "bcar for BCAR\n" +
                    "bcr for BC Responsive\n" +
                    "bctw for BCTweaks\n" +
                    "ebch for EBCH\n" + 
                    "lscg for LSCG\n" +
                    "mbs for MBS\n" +
		    "rsp for Responsive\n" +
                    "thm for Themed-BC</p>"
                );
            } else {
                var addon = args;
                if (addon == "bcar") {
                    if (Player.OnlineSettings.BCAR != null) {
                        if (Player.OnlineSettings.BCAR.bcarSettings != null) {
                            BCARdata = {};
                            str = Player.OnlineSettings.BCAR.bcarSettings;
                            BCARdata = str;
                            showAnimalTypeStatus();
                            showAnimationButtonsStatus();
                            showArousalManipulationStatus();
                            showBCARExpressionsStatus();
                            showEarAnimationStatus();
                            showEarEmoteStatus();
                            showTailAnimationStatus();
                            showTailEmoteStatus();
                            showWingAnimationStatus();
                        }
                    }
                } else if (addon == "bcr") {
                    if (Player.ExtensionSettings.BCResponsiveData != null) {
                        str = Player.ExtensionSettings.BCResponsiveData;
                        d = LZString.decompressFromBase64(str);
                        BCRdata = {};
                        decoded = JSON.parse(d);
                        BCRdata = decoded;
                        showBCResponsiveStatus();
                    }
                } else if (addon == "bctw") {
                    if (Player.OnlineSettings.BCT != null) {
                        str = Player.OnlineSettings.BCT;
                        d = LZString.decompressFromBase64(str);
                        BCTdata = {};
                        decoded = JSON.parse(d);
                        BCTdata = decoded;
                        showArousalErectionStatus();
                        showArousalProgressStatus();
                        showBCIconsStatus();
                        showBCTChangelogStatus();
                        showBCTIconStatus();
                        showBestFriendsStatus();
                        showLockConversionStatus();
                        showRoomShareStatus();
                        showSplitStatus();
                        showTailWaggingStatus();
                    }
                } else if (addon == "ebch") {
                    if (Player.OnlineSettings.EBCH != null) {
                        EBCHdata = {};
                        str = Player.OnlineSettings.EBCH;
                        EBCHdata = str;                    
                        showEbchLogStatus();
                        showEbchNotificationStatus();
                        showEbchPoseStatus();
                        showEbchUngarbleStatus();
                        showEbchWelcomeStatus();
                    }
		} else if (addon == "lscg") {
                    if (Player.ExtensionSettings.LSCG != null) {
                        str = Player.ExtensionSettings.LSCG;
                        d = LZString.decompressFromBase64(str);
                        LSCGdata = {};
                        decoded = JSON.parse(d);
                        LSCGdata = decoded;
                        showBcLscgStatus();
                        showBoopReactionsStatus();
                        showCheckRollsStatus();
                        showCraftingStatus();
                        showEdgeBlurStatus();
			showErectionStatus();
                        showLipstickStatus();
			showOpacityStatus();
                        showRestrainedSettingsStatus();
                        showResizingStatus();
                    }
		} else if (addon == "mbs") {
                    if (Player.OnlineSharedSettings.MBSVersion != null) {
                        MBSver = Player.OnlineSharedSettings.MBSVersion;
                        var stringMBSver1 = MBSver;
                        var stringMBSver2 = stringMBSver1.split(".");
                        var MBS1 = stringMBSver2[0];
                        var MBS2 = stringMBSver2[1];
                        var MBS3 = stringMBSver2[2];
                        if ((MBS1 == 0) || (MBSver == "1.0.0") || (MBSver == "1.0.1")) {
                            str = Player.OnlineSettings.MBS; 
                        } else {
                            str = Player.ExtensionSettings.MBS;
                        } 
                        if ((MBS1 == 0) && (MBS2 <= 6) && (MBS3 <= 22)) {
                            d = LZString.decompressFromBase64(str);
                        } else {
                            d = LZString.decompressFromUTF16(str);
                        }
                        MBSdata = {};
                        decoded = JSON.parse(d);
                        MBSdata = decoded;  
                        showLockedMbsStatus();
                        showLockedWheelStatus(); 
                    }
		} else if (addon == "rsp") {
                    if (Player.ExtensionSettings.Responsive != null) {
                        str = Player.ExtensionSettings.Responsive;
                        d = LZString.decompressFromBase64(str);
                        RSPdata = {};
                        decoded = JSON.parse(d);
                        RSPdata = decoded;
                        showResponsiveStatus();
			showBcrResponsesStatus();
                        showCharacterTalkStatus();
                        showInterceptMessageStatus();
                        showLeaveMessageStatus();
			showMoansStatus();
                        showNewVersionStatus();
			showRulesStatus();
                    }
                } else if (addon == "thm") {
                    if (Player.ExtensionSettings.Themed != null) {
                        str = Player.ExtensionSettings.Themed;
                        d = LZString.decompressFromBase64(str);
                        THMdata = {};
                        decoded = JSON.parse(d);
                        THMdata = decoded;
                        showBCThemedStatus();
                        showChatInputStatus();
                        //showChatStylingStatus();
                        showFriendListStatus();
                        showInputZonesStatus();
                        showGuiOverhaulStatus(); 
                        showLocalTimeStatus();  
                        showMiscDetailsStatus();               
                        showThemedVersionStatus();
                    }
                } 
            }
        }
    }])

    CommandCombine([{
        Tag: 'wrobe',
        Description: "(target): opens target wardrobe.",
        Action: (args) => {
            if (args === "") {
                ChatRoomCharacterViewClickCharacter(Player);
                DialogChangeClothes();
            } else {
                var targetname = args;
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if (target[0].OnlineSharedSettings.Uwall == true) {
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                        );
                    } else  {                    
                        target[0].OnlineSharedSettings.AllowFullWardrobeAccess = true;
                        target[0].OnlineSharedSettings.BlockBodyCosplay = false;
                        ChatRoomCharacterViewClickCharacter(target[0]);
                        DialogChangeClothes();
                    }
                }
                ChatRoomSetTarget(null);        
            }
        }
    }])

})();
