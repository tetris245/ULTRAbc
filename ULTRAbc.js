// ==UserScript==
// @name ULTRAbc
// @namespace https://www.bondageprojects.com/
// @version 1.8
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
    
    const UBCver = "1.8";
    const modApi = bcModSDK.registerMod({
        name: 'ULTRAbc',
        fullName: 'Ultra Bondage Club',
        version: UBCver,
        repository: 'https://github.com/tetris245/ULTRAbc',
    });

    //Main variables and settings for UBC and The Moaner
    window.UBCver = UBCver;
    
    var FBC_VERSION = "";
    var M_MOANER_moanerKey = "bc_moaner_";

    var M_MOANER_scriptOn = true;
    var M_MOANER_cum = false;
    var NPCpunish = false;

    let profileName;
    let SosbuttonsOn;
    let SlowleaveOn;
    let FullseedOn;
    let AutojoinOn;
    let MagiccheatOn;
    let WelcomeOn;
    var NowhisperOn = false;
    let blureffect;

    let oldhorny = 0;

    let Clothes = "";
    let Mlock = "";
    let Naked = "";
    let Pet = "";
    let Randomize = "";
    let Restrain = "";
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
    let Ttotalrelease = "";
    let Tunderwear = "";
    let Tunlock = "";
    let Tuntie = "";

    var M_MOANER_talkActive = true;
    var M_MOANER_orgasmActive = true;
    var M_MOANER_vibratorActive = true;
    var M_MOANER_spankActive = true;
    var M_MOANER_verboseActive = true;

    function M_MOANER_initControls() {
        var datas = JSON.parse(localStorage.getItem(M_MOANER_moanerKey + "_" + Player.MemberNumber));
        if (datas == null || datas == undefined) {
            M_MOANER_talkActive = true;
            M_MOANER_orgasmActive = true;
            M_MOANER_vibratorActive = true;
            M_MOANER_spankActive = true;
            M_MOANER_scriptOn = false;
            M_MOANER_cum = false;
            profileName = "default";
	    NPCpunish = false;
            SosbuttonsOn = false;
            SlowleaveOn = false;
            FullseedOn = false;
            AutojoinOn = false;
            MagiccheatOn = false;
            WelcomeOn = false;
            NowhisperOn = false;
            blureffect = false;
            oldhorny = 0; 
	    Clothes = "";
	    Mlock = "";
            Naked = "";
	    Pet = "";
	    Randomize = "";
	    Restrain = "";
	    Tclothes = "";
	    Tlock = "";
	    Tnaked = "";
	    Totalrelease = "";
	    Tpet = "";
	    Trandomize = "";
	    Trestrain = "";
	    Ttotalrelease = "";
	    Tunderwear = "";
	    Tunlock = "";
	    Tuntie = "";
            Underwear = "";
	    Unlock = "";
	    Untie = "";
            //M_MOANER_saveControls();
        } else {
            M_MOANER_talkActive = datas.talkMoan;
            M_MOANER_orgasmActive = datas.orgasmMoan;
            M_MOANER_vibratorActive = datas.vibeMoan;
            M_MOANER_spankActive = datas.spankMoan;
            M_MOANER_scriptOn = datas.script;
            M_MOANER_cum = datas.cum;
            profileName = datas.moanProfile;
	    NPCpunish = datas.npcpunish;
            SosbuttonsOn = datas.sosbuttons;
            SlowleaveOn = datas.slowleave;
            FullseedOn = datas.fullseed;
            AutojoinOn = datas.autojoin;
            MagiccheatOn = datas.magiccheat;
            WelcomeOn = datas.welcome;
            NowhisperOn = datas.nowhisper;
            blureffect = false;
            oldhorny = 0;
	    Clothes = datas.clothes;
	    Mlock = datas.mlock;
	    Naked = datas.naked;
	    Pet = datas.pet;
	    Randomize = datas.randomize;
	    Restrain = datas.restrain;
	    Tclothes = datas.tclothes;
	    Tlock = datas.tlock;
	    Tnaked = datas.tnaked;
	    Totalrelease = datas.totalrelease;
	    Tpet = datas.tpet;
	    Trandomize = datas.trandomize;
	    Trestrain = datas.trestrain;
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
            "talkMoan": M_MOANER_talkActive,
            "orgasmMoan": M_MOANER_orgasmActive,
            "vibeMoan": M_MOANER_vibratorActive,
            "spankMoan": M_MOANER_spankActive,
            "script": M_MOANER_scriptOn,
            "cum": M_MOANER_cum,
            "moanProfile": profileName,
	    "npcpunish": NPCpunish,
            "sosbuttons": SosbuttonsOn,
            "slowleave": SlowleaveOn,
            "fullseed": FullseedOn,
            "autojoin": AutojoinOn,
            "magiccheat": MagiccheatOn,
            "welcome": WelcomeOn,
            "nowhisper": NowhisperOn,
            "blureffect": blureffect,
            "oldhorny": oldhorny, 
            "clothes": Clothes,
	    "mlock": Mlock,
	    "naked": Naked,
            "pet": Pet,
            "randomize": Randomize,
	    "restrain": Restrain,
            "tclothes": Tclothes,
	    "tlock": Tlock,
	    "tnaked": Tnaked,
	    "totalrelease": Totalrelease,
            "tpet": Tpet,
            "trandomize": Trandomize,
	    "trestrain": Trestrain,
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
		if (NPCpunish == true) {
                    Player.RestrictionSettings.BypassNPCPunishments = false;
                } else {                
                    Player.RestrictionSettings.BypassNPCPunishments = true;
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
    ULTRAChatRoomClick();
    ULTRAChatRoomDrawBackground();
    ULTRAChatRoomKeyDown();
    ULTRAChatRoomMenuDraw();
    ULTRAChatSearchExit();
    ULTRAChatSearchJoin();
    ULTRACraftingItemListBuild();
    ULTRADrawCharacter();
    ULTRAFriendListClick();
    ULTRAFriendListRun();
    ULTRALoginRun();
    ULTRAMagicPuzzleRun();
    ULTRAMagicSchoolEscapeSpellEnd();
    ULTRAMainHallClick();
    ULTRAMainHallRun();
    ULTRAPandoraPrisonRun();
    ULTRAStruggleLockPickDraw();

    //Chat Room
    async function ULTRAChatRoomClick() {
        modApi.hookFunction('ChatRoomClick', 4, (args, next) => {
            if (SosbuttonsOn == true) {
                if (Player.Nickname == '') {
                    var tmpname = Player.Name;
                } else {
                    var tmpname = Player.Nickname;
                }
                if ((MouseX >= 0) && (MouseX < 45) && (MouseY >= 45) && (MouseY < 90)) {
		    if (Totalrelease == undefined) {
                        var message = "Magical lasers make disappear all bindings and toys on " + tmpname + "'s body."
                    } else {    
                        if (Totalrelease != "") {
                            var message = tmpname + ' '.repeat(1) + Totalrelease;
                        } else {
                            var message = "Magical lasers make disappear all bindings and toys on " + tmpname + "'s body."
                        }
                    }
                    ServerSend("ChatRoomChat", {
                        Content: "Beep",
                        Type: "Action",
                        Dictionary: [{
                            Tag: "Beep",
                            Text: message
                        }]
                    });
                    CharacterReleaseTotal(Player);
                    ChatRoomCharacterUpdate(Player);
                    return;
                }
                if ((MouseX >= 0) && (MouseX < 45) && (MouseY >= 90) && (MouseY < 135)) {
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
            if (KeyPress == 13 && !event.shiftKey) {
                if ((FBC_VERSION != "") && bceSettingValue("ctrlEnterOoc") && event.ctrlKey) {
                    var text = ElementValue("InputChat");
                    var text1 = "(" + ElementValue("InputChat") + ")";
                    ElementValue("InputChat", text.replace(text, text1));
                } else {
                    var text = ElementValue("InputChat");
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
                } else if (text1.startsWith("*")) {
                    var text2 = text1;
                    var tsp = 1;
                    ChatRoomSetTarget(null);
                } else if (text1.startsWith("/")) {
                    var text2 = text1;
                    var tsp = 1;
                    if (!text1.startsWith("//")) {
                        ChatRoomSetTarget(null);
                    }
                } else if ((text1.startsWith("@")) && (window.MBCHC)) {
                    var text2 = text1;
                    var tsp = 1;
                    ChatRoomSetTarget(null);
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

    async function ULTRAChatRoomMenuDraw() {
        modApi.hookFunction('ChatRoomMenuDraw', 4, (args, next) => {
            if (SosbuttonsOn == true) {
                DrawButton(0, 45, 45, 45, "FREE", "White", "", "Total Release");
                if (SlowleaveOn == true) {
                    DrawButton(0, 90, 45, 45, "OUT", "White", "", "Slow Exit");
                } else {
                    DrawButton(0, 90, 45, 45, "OUT", "White", "", "Fast Exit");
                }
            }
            next(args);
        });
    }

    //Chat Search (including Auto-Join)
    async function ULTRAChatSearchJoin() {
        modApi.hookFunction('ChatSearchJoin', 4, (args, next) => {
            if (AutojoinOn == true) {
                var X = 25;
                var Y = 25;
                for (let C = ChatSearchResultOffset; C < ChatSearchResult.length && C < (ChatSearchResultOffset + ChatSearchRoomsPerPage); C++) {
                    if (ChatSearchLastQueryJoin != RoomName || (ChatSearchLastQueryJoin == RoomName && ChatSearchLastQueryJoinTime + 1000 < CommonTime())) {
                        if (this.IsOn == undefined || this.IsOn == false) {
                            IsOn = true;
                            var TextArea = document.createElement("TextArea");
                            TextArea.setAttribute("ID", "AutoJoinAlert");
                            document.body.appendChild(TextArea);
                            ElementValue("AutoJoinAlert", "AutoJoining...");
                            ElementPosition("AutoJoinAlert", 300, 970, 350);
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
                var X = 25;
                var Y = 25;
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
            DrawButton(1795, 5, 60, 60, "", "White", "Icons/Small/Reset.png", TextGet("Refresh"));
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
    async function ULTRAStruggleLockPickDraw() {
        modApi.hookFunction('StruggleLockPickDraw', 4, (args, next) => {
            if (FullseedOn == true) {
                var seed = parseInt(StruggleLockPickOrder.join(""));
                var tips = StruggleLockPickOrder.map((a) => {
                    return true;
                });
                for (let q = 0; q < tips.length; q++) {
                    var xx = 1475 + (0.5 - tips.length / 2 + q) * 100;
                    DrawText(`${StruggleLockPickOrder.indexOf(q) + 1}`, xx, 300, "blue");
                }
            }
            next(args);
        });
    }

    //Login
    async function ULTRALoginRun() {
        modApi.hookFunction('LoginRun', 4, (args, next) => {
            DrawButton(750, 120, 500, 60, "ULTRAbc 1.8 Ready!", "Pink", "Black", "");
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
            if (WelcomeOn == true) {
                var Utext =
                    "             Welcome to ULTRAbc            " +
                    "         The modSDK version of QAM         " +
                    "    Many extra commands and features     " +
                    "             More info with /uhelp           " +
                    "             Visit also the ULTRAbc Wiki       ";
                MainCanvas.fillStyle = "#50E992";
                MainCanvas.fillRect(20, 588, 640, 246);
                MainCanvas.strokeStyle = "Black";
                MainCanvas.strokeRect(20, 588, 640, 246);
                MainCanvas.textAlign = "left";
                DrawTextWrap(Utext, 30 - 630 / 2, 593, 630, 236, "black");
            }    
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

    //Pandora Prison
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
            return;
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
                    ChatRoomCharacterUpdate(Player);
                }
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
            CharacterSetActivePose(Player, null);
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
    async function ULTRAChatRoomDrawBackground() {
        modApi.hookFunction('ChatRoomDrawBackground', 4, (args, next) => {
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
                    if (ServerPlayerIsInChatRoom()) {
                        var appall = new Array();
                        C.Appearance.forEach(item => {
                            var app = new Array();
                            app.push(item.Asset.Name);
                            app.push(item.Asset.Group.Name);
                            app.push(item.Color);
                            app.push(item.Difficulty);
                            app.push(item.Craft);
                            app.push(false);
                            //Do not remove this line.It is for the compability with bcg.
                            appall.push(app);
                        });
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Appearance saved.</p>\n" +
                            btoa(encodeURI(JSON.stringify(appall)))
                        );
                        DialogLeave();
                    }
                }
                if ((MouseX >= 1630) && (MouseX < 1730) && (MouseY >= 240) && (MouseY < 290)) {
                    appinp = prompt('Please input the awcode (Compatible with BCG).', '');
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
                    DialogLeave();
                }
                if ((MouseX >= 1750) && (MouseX < 1850) && (MouseY >= 240) && (MouseY < 290)) {
                    appinp = prompt('Please input the awcode (Compatible with BCG).', '');
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
                    DialogLeave();
                }
                if ((MouseX >= 1870) && (MouseX < 1970) && (MouseY >= 240) && (MouseY < 290)) {
                    appinp = prompt('Please input the awcode (Compatible with BCG).', '');
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
        };
        ServerSend("ChatRoomAdmin", {
            MemberNumber: Player.ID,
            Room: UpdatedRoom,
            Action: "Update",
        });
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

    //////////////////////////////////////////////////////////
    //Moaner
    //////////////////////////////////////////////////////////

    //ChatRoom

    function M_MOANER_isSimpleChat(msg) {
        return msg.trim().length > 0 
            && !msg.startsWith("/") 
            && !msg.startsWith("(") 
            && !msg.startsWith("*") 
            && !msg.startsWith("@") 
            && ChatRoomTargetMemberNumber == null;
    }

    var M_MOANER_scriptStatus = ["The moaner is active.", "The moaner is not active."];
    var M_MOANER_orgasmStatus = ["The orgasm moan is active. You will moan while cumming.", "The orgasm moan is not active. You will not moan while cumming anymore."];
    var M_MOANER_vibratorStatus = ["The vibes moan is active. If vibrator's settings change in the chat room, you will moan.", "The vibes moan is not active. If vibrator's settings change in the chat room, you will not moan."];
    //var M_MOANER_spankStatus = ["The spank moan is active. You will moan while being spanked.", "The spank moan is not active. You will not moan while being spanked."];
    var M_MOANER_talkStatus = ["The talk moan is active. If you're vibed, you will moan while speaking.", "The talk moan is not active. If you're vibed, you will not moan while speaking anymore."];
    var M_MOANER_verboseStatus = ["Moaner is verbose.", "Moaner is not verbose."];
    var M_MOANER_profileStatus = ["No custom profile loaded.", "Current moans profile: "];
    var M_MOANER_profileListM_MOANER_intro = "Available moaning profiles: ";

    //Full script control
    function scriptControl(commande) {
        if (commande == "on") {
            M_MOANER_scriptOn = true;
        } else if (commande == "off") {
            M_MOANER_scriptOn = false;
        }
        showM_MOANER_scriptStatus();
    }

    //Verbose mode control
    function verboseControl(commande) {
        if (commande == "on") {
            M_MOANER_verboseActive = true;
        } else if (commande == "off") {
            M_MOANER_verboseActive = false;
        }
        showM_MOANER_verboseStatus();
    }

    //Talking moans control
    function talkControl(commande) {
        if (commande == "on") {
            M_MOANER_talkActive = true;
        } else if (commande == "off") {
            M_MOANER_talkActive = false;
        }
        showM_MOANER_talkStatus();
    }

    //Orgasm moans control
    function orgasmControl(commande) {
        if (commande == "on") {
            M_MOANER_orgasmActive = true;
        } else if (commande == "off") {
            M_MOANER_orgasmActive = false;
        }
        showM_MOANER_orgasmStatus();
    }

    //Vibe start moans control
    function vibeControl(commande) {
        if (commande == "on") {
            M_MOANER_vibratorActive = true;
        } else if (commande == "off") {
            M_MOANER_vibratorActive = false;
        }
        showM_MOANER_vibratorStatus();
    }

    //Spanking moans control
    /*function spankControl(commande) {
        if (commande == "on") {
            M_MOANER_spankActive = true;
        } else if (commande == "off") {
            M_MOANER_spankActive = false;
        }
        showM_MOANER_spankStatus();
    }*/

    function profilesList() {
        let liste = M_MOANER_getKeys(M_MOANER_moansProfiles);
        let msg = M_MOANER_profileListM_MOANER_intro + liste;
        M_MOANER_sendMessageToWearer(msg);
    }

    //Status
    function showStatus() {
        showM_MOANER_scriptStatus();
        showM_MOANER_profileStatus();
        showM_MOANER_talkStatus();
        showM_MOANER_orgasmStatus();
        showM_MOANER_vibratorStatus();
        //showM_MOANER_spankStatus();
        showM_MOANER_verboseStatus();
    }

    function showM_MOANER_profileStatus() {
        if (!M_MOANER_verboseActive) {
            return;
        }
        let msg;
        if (profileName == "default") {
            msg = M_MOANER_profileStatus[0];
        } else {
            msg = M_MOANER_profileStatus[1] + profileName;
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showM_MOANER_verboseStatus() {
        if (!M_MOANER_verboseActive) {
            return;
        }
        let msg;
        if (M_MOANER_scriptOn) {
            msg = M_MOANER_verboseStatus[0];
        } else {
            msg = M_MOANER_verboseStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showM_MOANER_scriptStatus() {
        if (!M_MOANER_verboseActive) {
            return;
        }
        let msg;
        if (M_MOANER_scriptOn) {
            msg = M_MOANER_scriptStatus[0];
        } else {
            msg = M_MOANER_scriptStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showM_MOANER_talkStatus() {
        if (!M_MOANER_verboseActive) {
            return;
        }
        let msg;
        if (M_MOANER_talkActive) {
            msg = M_MOANER_talkStatus[0];
        } else {
            msg = M_MOANER_talkStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showM_MOANER_orgasmStatus() {
        if (!M_MOANER_verboseActive) {
            return;
        }
        let msg;
        if (M_MOANER_orgasmActive) {
            msg = M_MOANER_orgasmStatus[0];
        } else {
            msg = M_MOANER_orgasmStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showM_MOANER_vibratorStatus() {
        if (!M_MOANER_verboseActive) {
            return;
        }
        let msg;
        if (M_MOANER_vibratorActive) {
            msg = M_MOANER_vibratorStatus[0];
        } else {
            msg = M_MOANER_vibratorStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    /*function showM_MOANER_spankStatus() {
        if (!M_MOANER_verboseActive) {
            return;
        }
        let msg;
        if (M_MOANER_spankActive) {
            msg = M_MOANER_spankStatus[0];
        } else {
            msg = M_MOANER_spankStatus[1];
        }
        M_MOANER_sendMessageToWearer(msg);
    }*/

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
        "pain": ["Aie!", "Aoouch!", "Aaaaie!", "Ouch", "Aow"]
    }

    M_MOANER_customMoans = {
        "hot": [],
        "medium": [],
        "light": [],
        "low": [],
        "orgasm": [],
        "pain": []
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
        Description: "Moaner Reactions",
        Callback: (data, sender, msg, metadata) => {
            //if (M_MOANER_isPlayerTarget(data)) {
                var msg = ElementValue("InputChat");
                if (M_MOANER_isSimpleChat(msg)) {
                    M_MOANER_reactionVibeWithChat(data);
                    //M_MOANER_reactionSpankWithChat(data);
                } else {
                    //M_MOANER_reactionSpankWithoutChat(data);
                    M_MOANER_reactionVibeWithoutChat(data);
                }
            //}
        }
    });

    /*function M_MOANER_reactionSpankWithChat(data) {
        if (M_MOANER_spankActive && M_MOANER_scriptOn && M_MOANER_isSpank(data)) {
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
    }*/

    /*function M_MOANER_reactionSpankWithoutChat(data) {
        if (M_MOANER_spankActive && M_MOANER_scriptOn && M_MOANER_isSpank(data)) {
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
    }*/

    function M_MOANER_reactionVibeWithoutChat(data) {
        if (M_MOANER_vibratorActive && M_MOANER_scriptOn && M_MOANER_isVibes(data)) {
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

    function M_MOANER_reactionVibeWithChat(data) {
        if (M_MOANER_vibratorActive && M_MOANER_scriptOn && M_MOANER_isVibes(data)) {
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

    /*function M_MOANER_isSpank(data) {
        if (data.Content == "ActionActivitySpankItem") {
            return true;
        }
        var FocusButt = false;
        var ActivitySpank = false;
        for (let elem of data.Dictionary) {
            if (elem.ActivityName) {
                if (elem.ActivityName == "Spank" || elem.ActivityName == "SpankItem") {
                    ActivitySpank = true;
                }
            }
            if (elem.FocusGroupName) {
                if (elem.FocusGroupName == "ItemButt") {
                    FocusButt = true;
                }
            }
        }
        if (FocusButt && ActivitySpank) {
            return true;
        }
        return false;
    }*/

    function M_MOANER_isVibes(data) {
        if (Player.ArousalSettings.Progress >= 10) {
            if ((data.Type == "Action") && (data.Content.includes("Vibe"))) {
                return true;
            }
        }
        if (Player.OnlineSettings.LSCG != undefined) {
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
        }
        return false;
    }

    /*function M_MOANER_isPlayerTarget(data) {
        var array = data.Dictionary;
        for (index in array) {
            let elem = array[index];
            if ((elem.Tag == "DestinationCharacter" || elem.Tag == "TargetCharacter" || elem.Tag == "DestinationCharacterName") && elem.MemberNumber == Player.MemberNumber) {
                return true;
            }
        }
        return false;
    }*/

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

    /*function getSpankMoan(Factor, seed) {
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
    }*/

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

    /*function getPainMoanBACK() {
        let index = Math.floor(Math.random() * basePainMoans.length);
        return basePainMoans[index];
    }*/

    function resetMoans(seed) {
        //M_MOANER_logDebug("resetMoans IN");
        moanProfile = M_MOANER_getMoans(profileName);
        factor1Moans = M_MOANER_shuffle(moanProfile.low.concat([]), seed);
        M_MOANER_factor2Moans = M_MOANER_shuffle(factor1Moans.concat(moanProfile.light), seed);
        M_MOANER_factor3Moans = M_MOANER_shuffle(M_MOANER_factor2Moans.concat(moanProfile.medium), seed);
        M_MOANER_factor4Moans = M_MOANER_shuffle(M_MOANER_factor3Moans.concat(moanProfile.hot), seed);
        //M_MOANER_logDebug("resetMoans OUT");
    }

    /*function getPainMoan() {
        moanProfile = M_MOANER_getMoans(profileName);
        let index = Math.floor(Math.random() * moanProfile.pain.length);
        return moanProfile.pain[index];
    }*/

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
        if (C.IsEgged() && ((C.ArousalSettings == null) || (C.ArousalSettings.AffectStutter == null) || (C.ArousalSettings.AffectStutter == "Vibration") || (C.ArousalSettings.AffectStutter == "All"))) {
            for (let A = 0; A < C.Appearance.length; A++) {
                var Item = C.Appearance[A];
                if (InventoryItemHasEffect(Item, "Vibrating", true)) {
                    return true;
                }
            }
        }
        if (Player.OnlineSettings.LSCG != null) {
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
        }
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
        "pain": ["Ka\u00ef!", "Aoouch!", "Kaaa\u00ef!", "Ouch", "Aow"]
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
        "pain": []
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
        "pain": []
    }
    M_MOANER_addMoansProfile("mouse", M_MOANER_mouseMoans);

    //neko
    M_MOANER_nekoMoans = {
        "hot": ["n... Nyah\u2665", "NYyaaA\u2665"],
        "medium": ["nyAh\u2665", "nyyy", "..yah"],
        "light": ["nyah\u2665", "Yah!", "myuh", "mh\u2665"],
        "low": ["myu", "ny\u2665", "mh", "\u2665yh\u2665", "ny\u2665"],
        "orgasm": ["Nya...Ny...NyaaAAaah!", "Mmmhnn... Nyhmm... Nyah!", "mmmh... mmmeeeee.... meeeoooow!"],
        "pain": []
    }
    M_MOANER_addMoansProfile("neko", M_MOANER_nekoMoans);

    //pig
    M_MOANER_pigMoans = {
        "hot": ["Gruiik\u2665", "gruik\u2665"],
        "medium": ["gruiii\u2665", "Gruik", "..Grui.."],
        "light": ["Grui\u2665", "Gruik!", "gruuiii\u2665ic", "gruik \u2665"],
        "low": ["grui.. gruiik\u2665", "gruiik\u2665", "gru\u2665i", "Gruik ", "Groi\u2665"],
        "orgasm": ["Gru\u2665 gr.. gruiIIIiick!!", "Mmmhnn... uii... gruiiik!!", "mmmh... Gruiik.... Gruiiiiik!"],
        "pain": ["Gruuik!!", "Aoouch!", "Awo... gruik!", "Ouch", "Gruiiik"]
    }
    M_MOANER_addMoansProfile("pig", M_MOANER_pigMoans);

    //wildFox
    M_MOANER_wildfoxMoans = {
        "hot": ["w... Wiiif\u2665", "Yiiif\u2665", "Wa\u2665ouu"],
        "medium": ["wiiif\u2665", "Yiii", "..yif", "waouuu"],
        "light": ["Wiff\u2665", "Yif!", "yi\u2665iif", "Wiif", "waou"],
        "low": ["wif", "Wy\u2665", "if\u2665", "\u2665yi\u2665", "Yi\u2665", "aou"],
        "orgasm": ["WAAAAOUUUUUUUHHHHH!", "Mmmhnn... Wiiif... Yiiiif!!", "AOUUUUUH!", "WAHOOOOOOOUUUUH!", "WAAAAAAAAHH!", "WAAAAOUUUUUUUHHHHH!", "AOUUUUUH!", "WAHOOOOOOOUUUUH!", "WAAAAAAAAHH!"],
        "pain": []
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

    const diaperHelpMessages = {
        default: "Welcome to BCDW: Bondage Club Diaper Wetter! Where we make sure babies use their diapers!\nTo get started, use the ->diaper start to begin using your diaper and ->diaper stop to stop. You can also use ->diaper help <command> to get more information on any given command (for example, arguments!).",
        start: "",
        change: "",
        stop: ""
    };

    diaperLoop = null; // Keeps a hold of the loop so it can be exited at any time easily

    // Destutter speach. Needed for interations with other mods
    function destutter(string) {
        // Step over every character in the string
        for (var i = 0; i < string.length - 2; i++) {
            if (string.at(i + 1) === "-" && string.at(i) === string.at(i + 2)) {
                console.log(string.at(i));
                string = string.substring(0, i) + string.substring(i + 2, string.length);
            }
        }
        return string;
    }

    // Chat handler
    // ServerSocket.on("ChatRoomMessage", bcdw);
    function bcdw(data) {
        // First, make sure there's actually something to read
        if (data) {
            // Check to see if a milk bottle is used on the user
            if (
                data.Type === "Action" &&
                data.Content === "ActionUse" &&
                data.Dictionary[1]?.Tag === "DestinationCharacter" &&
                data.Dictionary[1]?.MemberNumber === Player.MemberNumber &&
                data.Dictionary[2]?.AssetName === "MilkBottle"
            ) {
                setDesperation();
            }
            // Starts the script running
            if (
                destutter(data?.Content).startsWith("->diaper") &&
                (data.Type === "Chat" || data.Type === "Whisper")
            ) {
                // Parse out data into a queue for easier processing
                chatCommand = data?.Content.toLowerCase().split(" ");
                chatCommand.shift();
                // Send to command parser
                bcdwCommands(chatCommand.reverse(), data.Sender, data.Type);
            }
        }
    }

    // Command handler
    function bcdwCommands(chatCommand, callerID, type) {
        // Commands only the user can use
        if (callerID === Player.MemberNumber) {
            // Start the script
            if (chatCommand[chatCommand.length - 1] === "start") {
                // Check to see if other arguments have been passed as well (default regression level, desperation, or use levels)
                chatCommand.pop()
                // Parse arguments for command
                let commandArguments = ["wetchance", "messchance", "desperation", "regression", "timer", "wetpanties", "messpanties", "wetchastity", "messchastity"];
                let caughtArguments = diaperDefaultValues;
                while (commandArguments.includes(chatCommand[chatCommand.length - 1])) {
                    let tempVal = chatCommand.pop();
                    switch (tempVal) {
                        case commandArguments[0]:
                            caughtArguments.initWetChance = (isNaN(chatCommand[chatCommand.length - 1])) ? diaperDefaultValues.wetChance : chatCommand[chatCommand.length - 1];
                            break;
                        case commandArguments[1]:
                            caughtArguments.initMessChance = (isNaN(chatCommand[chatCommand.length - 1])) ? diaperDefaultValues.messChance : chatCommand[chatCommand.length - 1];
                            break;
                        case commandArguments[2]:
                            caughtArguments.initDesperationLevel = (isNaN(chatCommand[chatCommand.length - 1])) ? diaperDefaultValues.desperationLevel : chatCommand[chatCommand.length - 1];
                            break;
                        case commandArguments[3]:
                            caughtArguments.initRegressionLevel = (isNaN(chatCommand[chatCommand.length - 1])) ? diaperDefaultValues.regressionLevel : chatCommand[chatCommand.length - 1];
                            break;
                        case commandArguments[4]:
                            caughtArguments.baseTimer = (isNaN(chatCommand[chatCommand.length - 1])) ? diaperDefaultValues.baseTimer : chatCommand[chatCommand.length - 1];
                            break;
                        case commandArguments[5]:
                            caughtArguments.initWetLevelInner = (isNaN(chatCommand[chatCommand.length - 1])) ? diaperDefaultValues.wetLevelInner : chatCommand[chatCommand.length - 1];
                            break;
                        case commandArguments[6]:
                            caughtArguments.initMessLevelInner = (isNaN(chatCommand[chatCommand.length - 1])) ? diaperDefaultValues.messLevelInner : chatCommand[chatCommand.length - 1];
                            break;
                        case commandArguments[7]:
                            caughtArguments.initWetLevelOuter = (isNaN(chatCommand[chatCommand.length - 1])) ? diaperDefaultValues.wetLevelOuter : chatCommand[chatCommand.length - 1];
                            break;
                        case commandArguments[8]:
                            caughtArguments.initMessLevelOuter = (isNaN(chatCommand[chatCommand.length - 1])) ? diaperDefaultValues.messLevelOuter : chatCommand[chatCommand.length - 1];
                            break;
                    }
                    chatCommand.pop();
                }
                diaperWetter(caughtArguments);
            }
            // End the script
            else if (chatCommand[chatCommand.length - 1] === "stop") {
                stopWetting();
            }
        }
        // Chat commands that can be executed by other people
        {
            // Filter to make sure the command is targeted at the user
            if (chatCommand[chatCommand.length - 2] === Player.MemberNumber || type === "Whisper" || callerID === Player.MemberNumber) {
                // Change into a fresh diaper
                if (chatCommand[chatCommand.length - 1] === "change") {
                    chatCommand.pop();
                    // Get rid of the member number in case that was passed
                    if (chatCommand[chatCommand.length - 1] === Player.MemberNumber) {
                        chatCommand.pop();
                    }
                    // See if you should be changing both or just one of the diaper (and which one, of course)
                    if (chatCommand[chatCommand.length - 1] === "panties") {
                        if (checkForDiaper("panties")) {
                            ServerSend("ChatRoomChat", {
                                Type: "Action",
                                Content: "gag",
                                Dictionary: [{
                                    Tag: "gag",
                                    Text: tmpname + " doesn't have a diaper there!"
                                }]
                            });
                        } else {
                            refreshDiaper({
                                cdiaper: "panties"
                            });
                        }
                    } else if (chatCommand[chatCommand.length - 1] === "chastity") {
                        if (checkForDiaper === "chastity") {
                            ServerSend("ChatRoomChat", {
                                Type: "Action",
                                Content: "gag",
                                Dictionary: [{
                                    Tag: "gag",
                                    Text: tmpname + " doesn't have a diaper there!"
                                }]
                            });
                        } else {
                            refreshDiaper({
                                cdiaper: "chastity"
                            });
                        }
                    } else {
                        if (!((checkForDiaper("panties") || checkForDiaper("chastity")))) {
                            ServerSend("ChatRoomChat", {
                                Type: "Action",
                                Content: "gag",
                                Dictionary: [{
                                    Tag: "gag",
                                    Text: tmpname + " doesn't have a diaper! Get one on her before she makes a mess!"
                                }]
                            });
                        } else {
                            refreshDiaper({
                                cdiaper: "both"
                            });
                        }
                    }
                }
            }
        }
    }

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

        // Greating message
        if (Player.Nickname == '') {
            var tmpname = Player.Name;
        } else {
            var tmpname = Player.Nickname;
        }
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
        if (Player.Nickname == '') {
            var tmpname = Player.Name;
        } else {
            var tmpname = Player.Nickname;
        }
        if (InventoryGet(Player, "Pronouns").Asset.Name == "HeHim") {
            var tmpr1 = "He";
            var tmpr2 = "him";
            var tmpr3 = "his";
            var tmpr4 = "he";
        } else if (InventoryGet(Player, "Pronouns").Asset.Name == "SheHer") {
            var tmpr1 = "She";
            var tmpr2 = "her";
            var tmpr3 = "her";
            var tmpr4 = "she";
        } else {
            var tmpr1 = "They";
            var tmpr2 = "them";
            var tmpr3 = "their";
            var tmpr4 = "they";
        }
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
        return (InventoryGet(Player, "ItemMouth")?.Asset?.Name === "MilkBottle") || (InventoryGet(Player, "ItemMouth2")?.Asset?.Name === "MilkBottle") || (InventoryGet(Player, "ItemMouth3")?.Asset?.Name === "MilkBottle");
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

    // Sets the users desperationLevel to 3 when they are given a milk bottle
    function setDesperation() {
        desperationLevel = 3;
    }

    // Handles "desperateness" aka how recently a milk bottle was drunk
    function manageDesperation(diaperTimerModifier = 1) {
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
            if (Player.Nickname == '') {
                var tmpname = Player.Name;
            } else {
                var tmpname = Player.Nickname;
            }
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
        if (Player.Nickname == '') {
            var tmpname = Player.Name;
        } else {
            var tmpname = Player.Nickname;
        }
        if (InventoryGet(Player, "Pronouns").Asset.Name == "HeHim") {
            var tmpr1 = "He";
            var tmpr2 = "him";
            var tmpr3 = "his";
            var tmpr4 = "he";
        } else if (InventoryGet(Player, "Pronouns").Asset.Name == "SheHer") {
            var tmpr1 = "She";
            var tmpr2 = "her";
            var tmpr3 = "her";
            var tmpr4 = "she";
        } else {
            var tmpr1 = "They";
            var tmpr2 = "them";
            var tmpr3 = "their";
            var tmpr4 = "they";
        }
        DiaperUseMessages = {
            "MessInner": " has messed " + tmpr3 + " inner diaper.",
            "MessInnerFully": " has fully messed " + tmpr3 + " inner diaper.",
            "WetInner": " has wet " + tmpr3 + " inner diaper.",
            "WetInnerFully": " has fully wet " + tmpr3 + " inner diaper.",
            "MessOuter": " has messed " + tmpr3 + " outer diaper.",
            "MessOuterFully": " has fully messed " + tmpr3 + " outer diaper.",
            "WetOuter": " has wet " + tmpr3 + " outer diaper.",
            "WetOuterFully": " has fully wet " + tmpr3 + " outer diaper.",
            "MessOnly": " has messed " + tmpr3 + " diaper.",
            "MessOnlyFully": " has fully messed " + tmpr3 + " diaper.",
            "WetOnly": " has wet " + tmpr3 + " diaper.",
            "WetOnlyFully": " has fully " + tmpr3 + " her diaper."
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
        Tag: 'autojoin',
        Description: ": enables/disables Auto-Join to enter a full room as soon as it is possible.",
        Action: () => {
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
                )
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
        Description: ": adds hidden backgrounds to the admin selection screen.",
        Action: () => {
            BackgroundsList.push({
                Name: "ClubCardLounge",
                Tag: [BackgroundsTagIndoor]
            });
            BackgroundsList.push({
                Name: "ClubCardPlayBoard1",
                Tag: [BackgroundsTagIndoor]
            });
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
                "<p style='background-color:#5fbd7a'>ULTRAbc: You can use more backgrounds now.</p>"
            );
        }
    }])

    CommandCombine([{
        Tag: 'bg2',
        Description: "(number): uses a hidden platform background.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The bg2 command must be followed by a number. List of hidden platform backgrounds:\n" +
                    "1, 2 Balcony - 3 Ballroom\n" +
                    "4 to 6 Barn - 7 to 9 Bathroom Olivia\n" +
                    "10 Bedroom Dungeon - 11 Bedroom Edward\n" +
                    "12, 13 Bedroom Isabella - 14 Bedroom Melody\n" +
                    "15 to 17 Bedroom Olivia - 18 to 23 Birch\n" +
                    "24 Black - 25 to 27 Camp Ground\n" +
                    "28 to 30 Castle - 31, 32 Clearing\n" +
                    "33 to 35 College - 36 to 38 Countess Hall\n" +
                    "39, 40 Dungeon 1 - 41, 42 Dungeon Cell\n" +
                    "43 to 45 Dungeon Storage - 46 Forest\n" +
                    "47 to 50 Forest Cabin - 51 Gas\n" +
                    "52 Green Plain - 53 to 63 Hall (1 to 4)\n" +
                    "64 to 69 Lake - 70 Maid Bed\n" +
                    "71 Mountain Path - 72, 73 Oak\n" +
                    "74 to 78 Plain - 79 Pond\n" +
                    "80, 81 Savannah - 82, 83 Terrace\n" +
                    "84 Vulture Plain - 85, 86 Wine Cell</p>"
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
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/BarnExterior';
                updateBackground();
            } else if (args == 5) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/BarnInterior';
                updateBackground();
            } else if (args == 6) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/BarnInterior';
                updateBackground();
            } else if (args == 7) {
                ChatCreateBackgroundSelect = '../Screens/Room//Platform/Background/Castle/Orig/BathroomOlivia';
                updateBackground();
            } else if (args == 8) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/BathroomOlivia';
                updateBackground();
            } else if (args == 9) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/BathroomOlivia';
                updateBackground();
            } else if (args == 10) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/BedroomDungeon';
                updateBackground();
            } else if (args == 11) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/BedroomEdward';
                updateBackground();
            } else if (args == 12) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/BedroomIsabella';
                updateBackground();
            } else if (args == 13) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/BedroomIsabella';
                updateBackground();
            } else if (args == 14) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/BedroomMelody';
                updateBackground();
            } else if (args == 15) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/BedroomOlivia';
                updateBackground();
            } else if (args == 16) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/BedroomOlivia';
                updateBackground();
            } else if (args == 17) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/BedroomOliviaDark';
                updateBackground();
            } else if (args == 18) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/BirchClear';
                updateBackground();
            } else if (args == 19) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/BirchHeavy';
                updateBackground();
            } else if (args == 20) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/BirchLight';
                updateBackground();
            } else if (args == 21) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/ForestBirchLight';
                updateBackground();
            } else if (args == 22) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/BirchMaze';
                updateBackground();
            } else if (args == 23) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/ForestMaze';
                updateBackground();
            } else if (args == 24) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/Black';
                updateBackground();
            } else if (args == 25) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/CampGround';
                updateBackground();
            } else if (args == 26) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/CampGround';
                updateBackground();
            } else if (args == 27) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/CampGroundRaft';
                updateBackground();
            } else if (args == 28) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/Orig/CastleEntrance';
                updateBackground();
            } else if (args == 29) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/CastleHall';
                updateBackground();
            } else if (args == 30) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/CastleWall';
                updateBackground();
            } else if (args == 31) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/SecludedClearing';
                updateBackground();
            } else if (args == 32) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/SecludedClearing';
                updateBackground();
            } else if (args == 33) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/College/CollegeArt1';
                updateBackground();
            } else if (args == 34) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/College/CollegeClass1';
                updateBackground();
            } else if (args == 35) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/College/CollegeHall1';
                updateBackground();
            } else if (args == 36) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/CountessHall';
                updateBackground();
            } else if (args == 37) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/CountessHall';
                updateBackground();
            } else if (args == 38) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/CountessHallDeadEnd';
                updateBackground();
            } else if (args == 39) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Dungeon1C';
                updateBackground();
            } else if (args == 40) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Dungeon1W';
                updateBackground();
            } else if (args == 41) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/DungeonCell';
                updateBackground();
            } else if (args == 42) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/DungeonCell';
                updateBackground();
            } else if (args == 43) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/DungeonStorage';
                updateBackground();
            } else if (args == 44) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/DungeonStorage';
                updateBackground();
            } else if (args == 45) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/DungeonStorageDark';
                updateBackground();
            } else if (args == 46) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/FirLight';
                updateBackground();
            } else if (args == 47) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/CabinInterior';
                updateBackground();
            } else if (args == 48) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/CabinPath';
                updateBackground();
            } else if (args == 49) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/ForestCabinInterior';
                updateBackground();
            } else if (args == 50) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/Orig/WoodCabin';
                updateBackground();
            } else if (args == 51) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/Gas';
                updateBackground();
            } else if (args == 52) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/Orig/GreenPlain';
                updateBackground();
            } else if (args == 53) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Hall1C';
                updateBackground();
            } else if (args == 54) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Hall1W';
                updateBackground();
            } else if (args == 55) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Hall2C';
                updateBackground();
            } else if (args == 56) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Hall3C';
                updateBackground();
            } else if (args == 57) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Hall3Cv2';
                updateBackground();
            } else if (args == 58) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Hall3E';
                updateBackground();
            } else if (args == 59) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Hall3W';
                updateBackground();
            } else if (args == 60) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Hall4C';
                updateBackground();
            } else if (args == 61) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Hall4E';
                updateBackground();
            } else if (args == 62) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Hall4W1';
                updateBackground();
            } else if (args == 63) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Hall4W2';
                updateBackground();
            } else if (args == 64) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/LakeBetweenRocks';
                updateBackground();
            } else if (args == 65) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/LakeRaft';
                updateBackground();
            } else if (args == 66) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/LakeShore';
                updateBackground();
            } else if (args == 67) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/LakeShoreRaft';
                updateBackground();
            } else if (args == 68) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/MountainLake';
                updateBackground();
            } else if (args == 69) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/Water';
                updateBackground();
            } else if (args == 70) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/MaidBed';
                updateBackground();
            } else if (args == 71) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/Orig/MountainPath';
                updateBackground();
            } else if (args == 72) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/OakHeavy';
                updateBackground();
            } else if (args == 73) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/OakHeavy';
                updateBackground();
            } else if (args == 74) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/PlainDistantLake';
                updateBackground();
            } else if (args == 75) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/PlainSparseRocks';
                updateBackground();
            } else if (args == 76) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/PlainToForest';
                updateBackground();
            } else if (args == 77) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/PlainToSavannah';
                updateBackground();
            } else if (args == 78) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/PlainWoodPath';
                updateBackground();
            } else if (args == 79) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/LostPond';
                updateBackground();
            } else if (args == 80) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/Savannah';
                updateBackground();
            } else if (args == 81) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/Savannah';
                updateBackground();
            } else if (args == 82) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/Terrace';
                updateBackground();
            } else if (args == 83) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/Terrace';
                updateBackground();
            } else if (args == 84) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Forest/Orig/VulturePlain';
                updateBackground();
            } else if (args == 85) {
                ChatCreateBackgroundSelect = '../Screens/Room/Platform/Background/Castle/WineCellar';
                updateBackground();
            } else if (args == 86) {
                ChatCreateBackgroundSelect = '../Screens/Room/PlatformDialog/Background/WineCellar';
                updateBackground();
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
        Description: ": boosts skills, similar to maid quarters drink.",
        Action: () => {
            LogAdd("ModifierLevel", "SkillModifier", 105);
            LogAdd("ModifierDuration", "SkillModifier", CurrentTime + 3600000);
            ChatRoomSendLocal(
                "<p style='background-color:#5fbd7a'>ULTRAbc: You feel your senses heightened(bondage/evasion). Can see change in information panel.</p>"
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
                    ChatRoomDrawCharacter();
                    ChatRoomMenuBuild();
                    ChatRoomDrawBackground();
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
	    if (Player.Nickname == '') {
                var tmpname = Player.Name;
            } else {
                var tmpname = Player.Nickname;
            }
            if (args === "") {
                if (Clothes == undefined) {
                    var message = "Magical lasers put random clothes on " + tmpname + "'s body."
                } else {
                    if (Clothes != "") {
                        var message = tmpname + ' '.repeat(1) + Clothes;
                    } else {
                        var message = "Magical lasers put random clothes on " + tmpname + "'s body."
                    }
                }
                ServerSend("ChatRoomChat", {
                    Content: "Beep",
                    Type: "Action",
                    Dictionary: [{
                        Tag: "Beep",
                        Text: message
                    }]
                });
                CharacterAppearanceFullRandom(Player, true);
                ChatRoomCharacterUpdate(Player);
            } else {
                var targetname = args;
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].AllowItem == true)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
		    if (Tclothes == undefined) {
                        var message = "Magical lasers make disappear the clothes on " + tgpname + "'s body."
                    } else {
                        if (Tclothes != "") {
                            var message = tmpname + ' '.repeat(1) + Tclothes + ' '.repeat(1) + tgpname;
                        } else {
                            var message = "Magical lasers make disappear the clothes on " + tgpname + "'s body."
                        }
                    }
                    ServerSend("ChatRoomChat", {
                        Content: "Beep",
                        Type: "Action",
                        Dictionary: [{
                            Tag: "Beep",
                            Text: message
                        }]
                    });
                    CharacterAppearanceFullRandom(target[0], true);
                    ChatRoomCharacterUpdate(target[0]);
                    ChatRoomSetTarget(null);
                }
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
                            if (this.ColorTarget510) {
                                CharacterAppearanceSetColorForGroup(ColorTargetNameCustom, RandomColor, ColorTarget10);
                                ChatRoomCharacterItemUpdate(ColorTargetNameCustom, ColorTarget10);
                            };
                        };
                        ColorChangerCustom();
                        DialogLeave();
                    }
                }, 5000);
            }
            if (args === "eyes") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: You have 5 seconds to click on target, select area. If successful, will be returned. If not, retry.</p>"
                );
                setTimeout(function() {
                    if (CurrentCharacter) {
                        var ColorTargetNameEyes = CurrentCharacter;
                        ColorChangerEyes = function() {
                            setTimeout(function() {
                                ColorChangerEyes()
                            }, 1000);
                            var RandomColor = null;
                            RandomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
                            InventoryGet(ColorTargetNameEyes, "Eyes").Color = RandomColor
                            InventoryGet(ColorTargetNameEyes, "Eyes2").Color = RandomColor
                            ChatRoomCharacterItemUpdate(ColorTargetNameEyes, "Eyes");
                            ChatRoomCharacterItemUpdate(ColorTargetNameEyes, "Eyes2");
                        };
                        ColorChangerEyes();
                        DialogLeave();
                    }
                }, 5000);
            }
            if (args === "hair") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: You have 5 seconds to click on target, select area. If successful, will be returned. If not, retry.</p>"
                );
                setTimeout(function() {
                    if (CurrentCharacter) {
                        var ColorTargetNameHair = CurrentCharacter;
                        ColorChangerHair = function() {
                            setTimeout(function() {
                                ColorChangerHair()
                            }, 1000);
                            var RandomColor = null;
                            RandomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
                            InventoryGet(ColorTargetNameHair, "HairFront").Color = RandomColor
                            InventoryGet(ColorTargetNameHair, "HairBack").Color = RandomColor
                            ChatRoomCharacterItemUpdate(ColorTargetNameHair, "HairFront");
                            ChatRoomCharacterItemUpdate(ColorTargetNameHair, "HairBack");
                        };
                        ColorChangerHair();
                        DialogLeave();
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
                    if (Player.Nickname == '') {
                        var tmpname = Player.Name;
                    } else {
                        var tmpname = Player.Nickname;
                    }
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
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: " + tgpname + " does not have normal diapers!</p>"
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
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: " + tgpname + " does not have normal diapers!</p>"
                                );
                            }
                            ChatRoomSetTarget(null);
                        }
                    }
                }
                if (feature == "change2") {
                    if (Player.Nickname == '') {
                        var tmpname = Player.Name;
                    } else {
                        var tmpname = Player.Nickname;
                    }
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
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: " + tgpname + " does not have chastity diapers!</p>"
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
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: " + tgpname + " does not have chastity diapers!</p>"
                                );
                            }
                            ChatRoomSetTarget(null);
                        }
                    }
                }
                if (feature == "change3") {
                    if (Player.Nickname == '') {
                        var tmpname = Player.Name;
                    } else {
                        var tmpname = Player.Nickname;
                    }
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
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: " + tgpname + " does not have a diaper! Get one on " + tgpr2 + " before " + tgpr4 + " makes a mess!</p>"
                                );
                            } else if ((InventoryGet(target[0], "Panties") == null) && (InventoryGet(target[0], "ItemPelvis") != null)) {
                                if (InventoryGet(target[0], "ItemPelvis").Asset.Name == "BulkyDiaper" || InventoryGet(target[0], "ItemPelvis").Asset.Name === "PoofyDiaper") {
                                    ChatRoomSendLocal(
                                        "<p style='background-color:#5fbd7a'>ULTRAbc: " + tgpname + " does not have two layers of diapers!</p>"
                                    );
                                } else {
                                    ChatRoomSendLocal(
                                        "<p style='background-color:#5fbd7a'>ULTRAbc: " + tgpname + " does not have a diaper! Get one on " + tgpr2 + " before " + tgpr4 + " makes a mess!</p>"
                                    );
                                }
                            } else if ((InventoryGet(target[0], "Panties") != null) && (InventoryGet(target[0], "ItemPelvis") == null)) {
                                if (InventoryGet(target[0], "Panties").Asset.Name == "BulkyDiaper" || InventoryGet(target[0], "Panties").Asset.Name === "PoofyDiaper") {
                                    ChatRoomSendLocal(
                                        "<p style='background-color:#5fbd7a'>ULTRAbc: " + tgpname + " does not have two layers of diapers!</p>"
                                    );
                                } else {
                                    ChatRoomSendLocal(
                                        "<p style='background-color:#5fbd7a'>ULTRAbc: " + tgpname + " does not have a diaper! Get one on " + tgpr2 + " before " + tgpr4 + " makes a mess!</p>"
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
                                        "<p style='background-color:#5fbd7a'>ULTRAbc: " + tgpname + " does not have two layers of diapers!</p>"

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
        Tag: 'exitmode',
        Description: ": toggles exit mode for OUT button in chat room.",
        Action: () => {
            if (SlowleaveOn == true) {
                SlowleaveOn = false;
                M_MOANER_saveControls();
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: Back to fast exit mode!</p>"
                );
            } else {
                SlowleaveOn = true;
                M_MOANER_saveControls();
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: Slow exit mode is activated.</p>"
                );
            }
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
        Tag: 'fullseed',
        Description: ": toggles full solution for intricate and high security locks.",
        Action: () => {
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
                )
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
                if (Player.Nickname == '') {
                    var tmpname = Player.Name;
                } else {
                    var tmpname = Player.Nickname;
                }
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
        Tag: 'giveeverything',
        Description: ": gives every item.",
        Action: () => {
            ChatRoomSendLocal(
                "<p style='background-color:#5fbd7a'>ULTRAbc: Every item in the game now added.</p>"
            );
            AssetFemale3DCG.forEach(group => group.Asset.forEach(item => InventoryAdd(Player, item.Name, group.Group)));
            ServerPlayerInventorySync();
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
                if ((target[0] != null) && ((target[0] == Player) || (target[0].AllowItem == true))) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if (hint != "") {
                        for (let A = 0; A < target[0].Appearance.length; A++)
                            if ((target[0].Appearance[A].Property != null) && (target[0].Appearance[A].Property.LockedBy != null)) {
                                if ((target[0].Appearance[A].Property.LockedBy == "SafewordPadlock") || (target[0].Appearance[A].Property.LockedBy == "PasswordPadlock") || (target[0].Appearance[A].Property.LockedBy == "TimerPasswordPadlock")) {
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
                        ChatRoomSetTarget(null);
                    }
                }
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
                if (Player.Nickname == '') {
                    var tmpname = Player.Name;
                } else {
                    var tmpname = Player.Nickname;
                }
                var stringItc1 = args;
                var stringItc2 = stringItc1.split(/[ ,]+/);
                var color = stringItc2[0];
                var targetname = stringItc2[1];
                if ((targetname == null) && (color.startsWith("#"))) {
                    if (InventoryGet(Player, "ItemAddon") != null) CharacterAppearanceSetItem(Player, "ItemAddon", InventoryGet(Player, "ItemAddon").Asset, color);
                    if (InventoryGet(Player, "ItemArms") != null) CharacterAppearanceSetItem(Player, "ItemArms", InventoryGet(Player, "ItemArms").Asset, color);
                    if (InventoryGet(Player, "ItemBoots") != null) CharacterAppearanceSetItem(Player, "ItemBoots", InventoryGet(Player, "ItemBoots").Asset, color);
                    if (InventoryGet(Player, "ItemBreast") != null) CharacterAppearanceSetItem(Player, "ItemBreast", InventoryGet(Player, "ItemBreast").Asset, color);
                    if (InventoryGet(Player, "ItemButt") != null) CharacterAppearanceSetItem(Player, "ItemButt", InventoryGet(Player, "ItemButt").Asset, color);
                    if (InventoryGet(Player, "ItemDevices") != null) CharacterAppearanceSetItem(Player, "ItemDevices", InventoryGet(Player, "ItemDevices").Asset, color);
                    if (InventoryGet(Player, "ItemEars") != null) CharacterAppearanceSetItem(Player, "ItemEars", InventoryGet(Player, "ItemEars").Asset, color);
                    if (InventoryGet(Player, "ItemFeet") != null) CharacterAppearanceSetItem(Player, "ItemFeet", InventoryGet(Player, "ItemFeet").Asset, color);
                    if (InventoryGet(Player, "ItemHands") != null) CharacterAppearanceSetItem(Player, "ItemHands", InventoryGet(Player, "ItemHands").Asset, color);
                    if (InventoryGet(Player, "ItemHead") != null) CharacterAppearanceSetItem(Player, "ItemHead", InventoryGet(Player, "ItemHead").Asset, color);
                    if (InventoryGet(Player, "ItemHood") != null) CharacterAppearanceSetItem(Player, "ItemHood", InventoryGet(Player, "ItemHood").Asset, color);
                    if (InventoryGet(Player, "ItemLegs") != null) CharacterAppearanceSetItem(Player, "ItemLegs", InventoryGet(Player, "ItemLegs").Asset, color);
                    if (InventoryGet(Player, "ItemHands") != null) CharacterAppearanceSetItem(Player, "ItemHands", InventoryGet(Player, "ItemHands").Asset, color);
                    if (InventoryGet(Player, "ItemMisc") != null) CharacterAppearanceSetItem(Player, "ItemMisc", InventoryGet(Player, "ItemMisc").Asset, color);
                    if (InventoryGet(Player, "ItemMouth") != null) CharacterAppearanceSetItem(Player, "ItemMouth", InventoryGet(Player, "ItemMouth").Asset, color);
                    if (InventoryGet(Player, "ItemMouth2") != null) CharacterAppearanceSetItem(Player, "ItemMouth2", InventoryGet(Player, "ItemMouth2").Asset, color);
                    if (InventoryGet(Player, "ItemMouth3") != null) CharacterAppearanceSetItem(Player, "ItemMouth3", InventoryGet(Player, "ItemMouth3").Asset, color);
                    if (InventoryGet(Player, "ItemNeck") != null) CharacterAppearanceSetItem(Player, "ItemNeck", InventoryGet(Player, "ItemNeck").Asset, color);
                    if (InventoryGet(Player, "ItemNeckAccessories") != null) CharacterAppearanceSetItem(Player, "ItemNeckAccessories", InventoryGet(Player, "ItemNeckAccessories").Asset, color);
                    if (InventoryGet(Player, "ItemNeckRestraints") != null) CharacterAppearanceSetItem(Player, "ItemNeckRestraints", InventoryGet(Player, "ItemNeckRestraints").Asset, color);
                    if (InventoryGet(Player, "ItemNipples") != null) CharacterAppearanceSetItem(Player, "ItemNipples", InventoryGet(Player, "ItemNipples").Asset, color);
                    if (InventoryGet(Player, "ItemNipplesPiercings") != null) CharacterAppearanceSetItem(Player, "ItemNipplesPiercings", InventoryGet(Player, "ItemNipplesPiercings").Asset, color);
                    if (InventoryGet(Player, "ItemNose") != null) CharacterAppearanceSetItem(Player, "ItemNose", InventoryGet(Player, "ItemNose").Asset, color);
                    if (InventoryGet(Player, "ItemPelvis") != null) CharacterAppearanceSetItem(Player, "ItemPelvis", InventoryGet(Player, "ItemPelvis").Asset, color);
                    if (InventoryGet(Player, "ItemTorso") != null) CharacterAppearanceSetItem(Player, "ItemTorso", InventoryGet(Player, "ItemTorso").Asset, color);
                    if (InventoryGet(Player, "ItemTorso2") != null) CharacterAppearanceSetItem(Player, "ItemTorso2", InventoryGet(Player, "ItemTorso2").Asset, color);
                    if (InventoryGet(Player, "ItemVulva") != null) CharacterAppearanceSetItem(Player, "ItemVulva", InventoryGet(Player, "ItemVulva").Asset, color);
                    if (InventoryGet(Player, "ItemVulvaPiercings") != null) CharacterAppearanceSetItem(Player, "ItemVulvaPiercings", InventoryGet(Player, "ItemVulvaPiercings").Asset, color);
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
                    if ((target[0] != null) && (target[0].AllowItem == true) && (color.startsWith("#"))) {
                        if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                            tgpname = target[0].Name;
                        } else {
                            tgpname = target[0].Nickname;
                        }
                        if (InventoryGet(target[0], "ItemAddon") != null) CharacterAppearanceSetItem(target[0], "ItemAddon", InventoryGet(target[0], "ItemAddon").Asset, color);
                        if (InventoryGet(target[0], "ItemArms") != null) CharacterAppearanceSetItem(target[0], "ItemArms", InventoryGet(target[0], "ItemArms").Asset, color);
                        if (InventoryGet(target[0], "ItemBoots") != null) CharacterAppearanceSetItem(target[0], "ItemBoots", InventoryGet(target[0], "ItemBoots").Asset, color);
                        if (InventoryGet(target[0], "ItemBreast") != null) CharacterAppearanceSetItem(target[0], "ItemBreast", InventoryGet(target[0], "ItemBreast").Asset, color);
                        if (InventoryGet(target[0], "ItemButt") != null) CharacterAppearanceSetItem(target[0], "ItemButt", InventoryGet(target[0], "ItemButt").Asset, color);
                        if (InventoryGet(target[0], "ItemDevices") != null) CharacterAppearanceSetItem(target[0], "ItemDevices", InventoryGet(target[0], "ItemDevices").Asset, color);
                        if (InventoryGet(target[0], "ItemEars") != null) CharacterAppearanceSetItem(target[0], "ItemEars", InventoryGet(target[0], "ItemEars").Asset, color);
                        if (InventoryGet(target[0], "ItemFeet") != null) CharacterAppearanceSetItem(target[0], "ItemFeet", InventoryGet(target[0], "ItemFeet").Asset, color);
                        if (InventoryGet(target[0], "ItemHands") != null) CharacterAppearanceSetItem(target[0], "ItemHands", InventoryGet(target[0], "ItemHands").Asset, color);
                        if (InventoryGet(target[0], "ItemHead") != null) CharacterAppearanceSetItem(target[0], "ItemHead", InventoryGet(target[0], "ItemHead").Asset, color);
                        if (InventoryGet(target[0], "ItemHood") != null) CharacterAppearanceSetItem(target[0], "ItemHood", InventoryGet(target[0], "ItemHood").Asset, color);
                        if (InventoryGet(target[0], "ItemLegs") != null) CharacterAppearanceSetItem(target[0], "ItemLegs", InventoryGet(target[0], "ItemLegs").Asset, color);
                        if (InventoryGet(target[0], "ItemHands") != null) CharacterAppearanceSetItem(target[0], "ItemHands", InventoryGet(target[0], "ItemHands").Asset, color);
                        if (InventoryGet(target[0], "ItemMisc") != null) CharacterAppearanceSetItem(target[0], "ItemMisc", InventoryGet(target[0], "ItemMisc").Asset, color);
                        if (InventoryGet(target[0], "ItemMouth") != null) CharacterAppearanceSetItem(target[0], "ItemMouth", InventoryGet(target[0], "ItemMouth").Asset, color);
                        if (InventoryGet(target[0], "ItemMouth2") != null) CharacterAppearanceSetItem(target[0], "ItemMouth2", InventoryGet(target[0], "ItemMouth2").Asset, color);
                        if (InventoryGet(target[0], "ItemMouth3") != null) CharacterAppearanceSetItem(target[0], "ItemMouth3", InventoryGet(target[0], "ItemMouth3").Asset, color);
                        if (InventoryGet(target[0], "ItemNeck") != null) CharacterAppearanceSetItem(target[0], "ItemNeck", InventoryGet(target[0], "ItemNeck").Asset, color);
                        if (InventoryGet(target[0], "ItemNeckAccessories") != null) CharacterAppearanceSetItem(target[0], "ItemNeckAccessories", InventoryGet(target[0], "ItemNeckAccessories").Asset, color);
                        if (InventoryGet(target[0], "ItemNeckRestraints") != null) CharacterAppearanceSetItem(target[0], "ItemNeckRestraints", InventoryGet(target[0], "ItemNeckRestraints").Asset, color);
                        if (InventoryGet(target[0], "ItemNipples") != null) CharacterAppearanceSetItem(target[0], "ItemNipples", InventoryGet(target[0], "ItemNipples").Asset, color);
                        if (InventoryGet(target[0], "ItemNipplesPiercings") != null) CharacterAppearanceSetItem(target[0], "ItemNipplesPiercings", InventoryGet(target[0], "ItemNipplesPiercings").Asset, color);
                        if (InventoryGet(target[0], "ItemNose") != null) CharacterAppearanceSetItem(target[0], "ItemNose", InventoryGet(target[0], "ItemNose").Asset, color);
                        if (InventoryGet(target[0], "ItemPelvis") != null) CharacterAppearanceSetItem(target[0], "ItemPelvis", InventoryGet(target[0], "ItemPelvis").Asset, color);
                        if (InventoryGet(target[0], "ItemTorso") != null) CharacterAppearanceSetItem(target[0], "ItemTorso", InventoryGet(target[0], "ItemTorso").Asset, color);
                        if (InventoryGet(target[0], "ItemTorso2") != null) CharacterAppearanceSetItem(target[0], "ItemTorso2", InventoryGet(target[0], "ItemTorso2").Asset, color);
                        if (InventoryGet(target[0], "ItemVulva") != null) CharacterAppearanceSetItem(target[0], "ItemVulva", InventoryGet(target[0], "ItemVulva").Asset, color);
                        if (InventoryGet(target[0], "ItemVulvaPiercings") != null) CharacterAppearanceSetItem(target[0], "ItemVulvaPiercings", InventoryGet(target[0], "ItemVulvaPiercings").Asset, color);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "New colors are used on " + tgpname + "'s bindings."
                            }]
                        });
                        ChatRoomCharacterUpdate(target[0]);
                        ChatRoomSetTarget(null);
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'invisible1',
        Description: ": becomes invisible (anal hook must be allowed).",
        Action: () => {
            if (Player.Nickname == '') {
                var tmpname = Player.Name;
            } else {
                var tmpname = Player.Nickname;
            }
            ServerSend("ChatRoomChat", {
                Content: "Beep",
                Type: "Action",
                Dictionary: [{
                    Tag: "Beep",
                    Text: "Magical lasers make " + tmpname + " completely invisible."
                }]
            });
            InventoryWear(Player, "AnalHook", "ItemButt");
            InventoryWear(Player, "Script", "ItemScript");
            InventoryGet(Player, "ItemScript").Property = {
                Hide: [
                    "Activity",
                    "Blush",
                    "BodyLower",
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
    }])

    CommandCombine([{
        Tag: 'invisible2',
        Description: ": becomes invisible (glitter mask must be usable).",
        Action: () => {
            if (Player.Nickname == '') {
                var tmpname = Player.Name;
            } else {
                var tmpname = Player.Nickname;
            }
            ServerSend("ChatRoomChat", {
                Content: "Beep",
                Type: "Action",
                Dictionary: [{
                    Tag: "Beep",
                    Text: "Magical lasers make " + tmpname + " completely invisible."
                }]
            });
            InventoryWear(Player, "Glitter", "Mask", "#664433");
            InventoryWear(Player, "Script", "ItemScript");
            InventoryGet(Player, "ItemScript").Property = {
                Hide: [
                    "Activity",
                    "Blush",
                    "BodyLower",
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
                        KinkyDungeonInventoryAddWeapon("BoltCutters");
                        KinkyDungeonInventoryAddWeapon("BondageBuster");
                        KinkyDungeonInventoryAddWeapon("Dragonslaver");
                        KinkyDungeonInventoryAddWeapon("Dreamcatcher");
                        KinkyDungeonInventoryAddWeapon("EnchKnife");
                        KinkyDungeonInventoryAddWeapon("EscortDrone");
                        KinkyDungeonInventoryAddWeapon("Feather");
                        KinkyDungeonInventoryAddWeapon("Flail");
                        KinkyDungeonInventoryAddWeapon("Flamberge");
                        KinkyDungeonInventoryAddWeapon("FourSeasons");
                        KinkyDungeonInventoryAddWeapon("Hammer");
                        KinkyDungeonInventoryAddWeapon("IceBreaker");
                        KinkyDungeonInventoryAddWeapon("IceCube");
                        KinkyDungeonInventoryAddWeapon("Knife");
                        KinkyDungeonInventoryAddWeapon("MagicAxe");
                        KinkyDungeonInventoryAddWeapon("MagicFlail");
                        KinkyDungeonInventoryAddWeapon("MagicHammer");
                        KinkyDungeonInventoryAddWeapon("MagicSpear");
                        KinkyDungeonInventoryAddWeapon("MagicSword");
                        KinkyDungeonInventoryAddWeapon("MessengerOfLove");
                        KinkyDungeonInventoryAddWeapon("MoraiScissors");
                        KinkyDungeonInventoryAddWeapon("Pickaxe");
                        KinkyDungeonInventoryAddWeapon("Rope");
                        KinkyDungeonInventoryAddWeapon("Slimethrower");
                        KinkyDungeonInventoryAddWeapon("Spear");
                        KinkyDungeonInventoryAddWeapon("StaffBind");
                        KinkyDungeonInventoryAddWeapon("StaffDoll");
                        KinkyDungeonInventoryAddWeapon("StaffFlame");
                        KinkyDungeonInventoryAddWeapon("StaffFrostbite");
                        KinkyDungeonInventoryAddWeapon("StaffPermafrost");
                        KinkyDungeonInventoryAddWeapon("StaffStorm");
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
            if (Player.Nickname == '') {
                var tmpname = Player.Name;
            } else {
                var tmpname = Player.Nickname;
            }
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
		if (Player.Nickname == '') {
                    var tmpname = Player.Name;
                } else {
                    var tmpname = Player.Nickname;
                }
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
                if ((target[0] != null) && ((target[0] == Player) || (target[0].AllowItem == true))) {
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
                                var message = tmpname + ' '.repeat(1) + Mlock;
                            } else {
                                var message = "Magical lasers make appear locks on " + tgpname + "'s body."
                            }
                        }
                    } else {
                        if (Tlock == undefined) {
                            var message = "Magical lasers make appear locks on " + tgpname + "'s body."
                        } else {    
                            if (Tlock != "") {
                                var message = tmpname + ' '.repeat(1) + Tlock;
                            } else {
                                var message = "Magical lasers make appear locks on " + tgpname + "'s body."
                            }
                        }
                    }
                    ServerSend("ChatRoomChat", {
                        Content: "Beep",
                        Type: "Action",
                        Dictionary: [{
                            Tag: "Beep",
                            Text: message
                        }]
                    });
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
                    ChatRoomSetTarget(null);
                }
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
        Tag: 'magiccheat',
        Description: ": toggles cheat mode in Magic School.",
        Action: () => {
            if (MagiccheatOn == true) {
                MagiccheatOn = false;
                M_MOANER_saveControls();
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: Cheat mode disabled in Magic School.</p>"
                );
            } else {
                MagiccheatOn = true;
                M_MOANER_saveControls();
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: Cheat mode enabled in Magic School.</p>"
                );
            }
        }
    }])
 
    CommandCombine([{
        Tag: 'maxstatistics',
        Description: ": gives max statistics.",
        Action: () => {
            Player.Money = 9999999999;
            SkillChange("Infiltration", 10);
            SkillChange("SelfBondage", 10);
            SkillChange("Willpower", 10);
            SkillChange("Evasion", 10);
            SkillChange("Bondage", 10);
            SkillChange("Dressage", 10);
            SkillChange("LockPicking", 10)
            ReputationChange("Gaming", 100);
            ReputationChange("Gambling", 100);
            ReputationChange("LARP", 100);
            ReputationChange("Maid", 100);
            ReputationChange("ABDL", 100);
            ReputationChange("Nurse", 100);
            GameLARPLevelProgress(10000);
            CheatAllow = true;
            LogAdd("BondageCollege", "Import");
            LogAdd("KidnapSophie", "Sarah");
            ChatRoomSendLocal(
                "<p style='background-color:#5fbd7a'>ULTRAbc: A few things have to be set manually. See the /roleplay and /rolequit commands.</p>"
            );
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
                    "Options on yourself: clothes, lock, naked, pet, randomize, restrain, totalrelease, underwear, unlock, untie\n" +
                    "Options on other players: tclothes, tlock, tnaked, tpet, trandomize, trestrain, ttotalrelease, tunderwear, tunlock, tuntie\n" +
                    " \n" +
                    "When writing your message, don't forget that your name or nickname will be added before it\n" +
                    "When acting on another player, the target name or nickname will be added after the message\n" +
                    "Use ? as message to go back to default message</p>"         
                );
            } else {
                var [, , ...message] = command.split(" ");
                var custom = message?.join(" ");
                if (custom != "") {
                    if (option == "clothes") {
                        if (custom != "?") {
                            Clothes = custom; 
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for clothes command on yourself.</p>"
                            );
                        } else {
                            Clothes = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for clothes command on yourself.</p>"
                            );
                        }
                    }
		    if (option == "lock") {
                        if (custom != "?") {
                            Mlock = custom; 
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for lock command on yourself.</p>"
                            );
                        } else {
                            Mlock = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for lock command on yourself.</p>"
                            );
                        }
                    }
                    if (option == "naked") {
                        if (custom != "?") {
                            Naked = custom; 
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for naked command on yourself.</p>"
                            );
                        } else {
                            Naked = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for naked command on yourself.</p>"
                            );
                        }
                    }
		    if (option == "pet") {
                        if (custom != "?") {
                            Pet = custom; 
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for pet command on yourself.</p>"
                            );
                        } else {
                            Pet = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for pet command on yourself.</p>"
                            );
                        }
                    }
		    if (option == "randomize") {
                        if (custom != "?") {
                            Randomize = custom; 
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for randomize command on yourself.</p>"
                            );
                        } else {
                            Randomize = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for randomize command on yourself.</p>"
                            );
                        }
                    }
		    if (option == "restrain") {
                        if (custom != "?") {
                            Restrain = custom; 
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for restrain command on yourself.</p>"
                            );
                        } else {
                            Restrain = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for restrain command on yourself.</p>"
                            );
                        }
                    }
                    if (option == "tclothes") {
                        if (custom != "?") {
                            Tclothes = custom; 
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for clothes command on other players.</p>"
                            );
                        } else {
                            Tclothes = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for naked command on other players.</p>"
                            );
                        }
                    }
                    if (option == "tlock") {
                        if (custom != "?") {
                            Tlock = custom; 
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for lock command on other players.</p>"
                            );
                        } else {
                            Tlock = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for lock command on other players.</p>"
                            );
                        }
                    }
                    if (option == "tnaked") {               
                        if (custom != "?") {
                            Tnaked = custom; 
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for naked command on other players.</p>"
                            );
                        } else {
                            Tnaked = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for naked command on other players.</p>"
                            );
                        }
		    } 
		    if (option == "totalrelease") {
                        if (custom != "?") {
                            Totalrelease = custom; 
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for totalrelease command on yourself.</p>"
                            );
                        } else {
                            Totalrelease = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for totalrelease command on yourself.</p>"
                            );
                        }
                    }
		    if (option == "tpet") {               
                        if (custom != "?") {
                            Tpet = custom; 
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for pet command on other players.</p>"
                            );
                        } else {
                            Tpet = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for pet command on other players.</p>"
                            );
                        }
                    }
		    if (option == "trandomize") {
                        if (custom != "?") {
                            Trandomize = custom; 
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for randomize command on other players.</p>"
                            );
                        } else {
                            Trandomize = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for randomize command on other players.</p>"
                            );
                        }
                    }
                    if (option == "trestrain") {
                        if (custom != "?") {
                            Trestrain = custom; 
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for restrain command on other players.</p>"
                            );
                        } else {
                            Trestrain = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for restrain command on other players.</p>"
                            );
                        }
                    }
		    if (option == "ttotalrelease") {
                        if (custom != "?") {
                            Ttotalrelease = custom; 
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for totalrelease command on other players.</p>"
                            );
                        } else {
                            Ttotalrelease = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for totalrelease command on other players.</p>"
                            );
                        }
                    }
		    if (option == "tunderwear") {               
                        if (custom != "?") {
                            Tunderwear = custom; 
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for underwear command on other players.</p>"
                            );
                        } else {
                            Tunderwear = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for underwear command on other players.</p>"
                            );
                        }
                    }
		    if (option == "tunlock") {               
                        if (custom != "?") {
                            Tunlock = custom; 
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for unlock command on other players.</p>"
                            );
                        } else {
                            Tunlock = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for unlock command on other players.</p>"
                            );
                        }
                    }
		    if (option == "tuntie") {               
                        if (custom != "?") {
                            Tuntie = custom; 
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for untie command on other players.</p>"
                            );
                        } else {
                            Tuntie = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for untie command on other players.</p>"
                            );
                        }
                    }
                    if (option == "underwear") {               
                        if (custom != "?") {
                            Underwear = custom; 
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for underwear command on yourself.</p>"
                            );
                        } else {
                            Underwear = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for underwear command on yourself.</p>"
                            );
                        }
                    }
		    if (option == "unlock") {               
                        if (custom != "?") {
                            Unlock = custom; 
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for unlock command on yourself.</p>"
                            );
                        } else {
                            Unlock = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for unlock command on yourself.</p>"
                            );
                        }
                    }
		    if (option == "untie") {               
                        if (custom != "?") {
                            Untie = custom; 
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for untie command on yourself.</p>"
                            );
                        } else {
                            Untie = "";
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for untie command on yourself.</p>"
                            );
                        }
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'moaner',
        Description: "(options): moans when horny and stimulated.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>Quick-AccessMenu2</b>: Several actions are possible with the moaner command:\n" +
                    "<b>/moaner on</b> = starts the moaner\n" +
                    "<b>/moaner off</b> = stops the moaner\n" +
                    "<b>/moaner profile</b> (profilename) =  selects a moaner profile. Without profilename, access to moaner profile help\n" +
                    "<b>/moaner status</b> = displays current moaner status\n" +
                    "<b>/moaner verbose</b> (on/off) = enable/disable verbose mode\n" +
                    " \n" +
                    "You can also enable/disable parts of the Moaner with:\n" +
                    "<b>/moaner orgasm</b> (on/off): moans when you cum\n" +
                    "<b>/moaner talk</b> (on/off): moans when talking if vibed\n" +
                    "<b>/moaner vibe</b> (on/off): moans when vibes settings changed</p>"
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
                    /*} else if (feature == "spank") {
                        spankControl(commande);
                        M_MOANER_saveControls();*/
                    } else if (feature == "status") {
                        showStatus();
                    } else if (feature == "talk") {
                        talkControl(commande);
                        M_MOANER_saveControls();
                    } else if (feature == "verbose") {
                        verboseControl(commande);
                        M_MOANER_saveControls();
                    } else if (feature == "vibe") {
                        vibeControl(commande);
                        M_MOANER_saveControls();
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'money',
        Description: "(value): gives or takes money.",
        Action: (args) => {
            Player.Money = args;
            ServerPlayerSync();
        }
    }])

    CommandCombine([{
        Tag: 'naked',
        Description: "(target): removes clothes.",
        Action: (args) => {
            if (Player.Nickname == '') {
                var tmpname = Player.Name;
            } else {
                var tmpname = Player.Nickname;
            }	
            if (args === "") {
                if (Naked == undefined) {
                    var message = "Magical lasers make disappear the clothes on " + tmpname + "'s body."
                } else {    
                    if (Naked != "") {
                        var message = tmpname + ' '.repeat(1) + Naked;
                    } else {
                        var message = "Magical lasers make disappear the clothes on " + tmpname + "'s body."
                    }
                }
                ServerSend("ChatRoomChat", {
                    Content: "Beep",
                    Type: "Action",
                    Dictionary: [{
                        Tag: "Beep",
                        Text: message
                    }]
                });
                CharacterNaked(Player);
                ChatRoomCharacterUpdate(Player);
            } else {
                var targetname = args;
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].AllowItem == true)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if (Tnaked == undefined) {
                        var message = "Magical lasers make disappear the clothes on " + tgpname + "'s body."
                    } else {      
                        if (Tnaked != "") {
                            var message = tmpname + ' '.repeat(1) + Tnaked + ' '.repeat(1) + tgpname;
                        } else {
                            var message = "Magical lasers make disappear the clothes on " + tgpname + "'s body."
                        }
                    }
                    ServerSend("ChatRoomChat", {
                        Content: "Beep",
                        Type: "Action",
                        Dictionary: [{
                            Tag: "Beep",
                            Text: message
                        }]
                    });
                    CharacterNaked(target[0]);
                    ChatRoomCharacterUpdate(target[0]);
                    ChatRoomSetTarget(null);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'nowhisper',
        Description: ": toggles no-whisper mode.",
        Action: () => {
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
        }
    }])

    CommandCombine([{
        Tag: 'npcpunish',
        Description: ": enables/disables NPC punishments.",
        Action: () => {
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
                    CurrentCharacter.Appearance = this.savedoutfit1.slice(0);
                    CharacterRefresh(CurrentCharacter);
                    ChatRoomCharacterUpdate(CurrentCharacter);
                    DialogLeave();
                }, 5000);
            }
            if (args === "load2") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: You have 5 seconds to click on target. If successful, the outfit will be loaded. If not, retry.</p>"
                );
                setTimeout(function() {
                    CurrentCharacter.Appearance = savedoutfit2.slice(0);
                    CharacterRefresh(CurrentCharacter);
                    ChatRoomCharacterUpdate(CurrentCharacter);
                    DialogLeave();
                }, 5000);
            }
            if (args === "load3") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: You have 5 seconds to click on target. If successful, the outfit will be loaded. If not, retry.</p>"
                );
                setTimeout(function() {
                    CurrentCharacter.Appearance = savedoutfit3.slice(0);
                    CharacterRefresh(CurrentCharacter);
                    ChatRoomCharacterUpdate(CurrentCharacter);
                    DialogLeave();
                }, 5000);
            }
            if ((args === "reset") || (args === "revert") || (args === "restore")) {
                Player.Appearance = ChatSearchSafewordAppearance.slice(0);
                CharacterRefresh(Player);
                ChatRoomCharacterUpdate(Player);
            }
            if (args === "save1") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: You have 5 seconds to click on target. If successful, the outfit will be saved. If not, retry.</p>"
                );
                setTimeout(function() {
                    this.savedoutfit1 = CurrentCharacter.Appearance.slice(0);
                    DialogLeave();
                }, 5000);
            }
            if (args === "save2") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: You have 5 seconds to click on target. If successful, the outfit will be saved. If not, retry.</p>"
                );
                setTimeout(function() {
                    this.savedoutfit2 = CurrentCharacter.Appearance.slice(0);
                    DialogLeave();
                }, 5000);
            }
            if (args === "save3") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: You have 5 seconds to click on target. If successful, the outfit will be saved. If not, retry.</p>"
                );
                setTimeout(function() {
                    this.savedoutfit3 = CurrentCharacter.Appearance.slice(0);
                    DialogLeave();
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
	    if (Player.Nickname == '') {
                var tmpname = Player.Name;
            } else {
                var tmpname = Player.Nickname;
            }	
            if (args === "") {
                if (Pet == undefined) {
                    var message = "" + tmpname + " becomes a cute pet."
                } else {    
                    if (Pet != "") {
                        var message = tmpname + ' '.repeat(1) + Pet;
                    } else {
                        var message = "" + tmpname + " becomes a cute pet."
                    }
                }
                ServerSend("ChatRoomChat", {
                    Content: "Beep",
                    Type: "Action",
                    Dictionary: [{
                        Tag: "Beep",
                        Text: message
                    }]
                });
                CharacterNaked(Player);
                InventoryWearRandom(Player, "ItemArms", 8, null, false, true, ["ArmbinderJacket", "BitchSuit", "Bolero", "BoxTieArmbinder", "Chains", "FullLatexSuit", "HempRope", "InflatableStraightLeotard", "LatexBoxtieLeotard", "LatexButterflyLeotard", "LatexSleevelessLeotard", "LeatherStraitJacket", "PantyhoseBody", "PantyhoseBodyOpen", "SeamlessStraitDress", "SeamlessStraitDressOpen", "StraitLeotard", "StrictLeatherPetCrawler"], true);
                InventoryWearRandom(Player, "HairAccessory1", 8, null, false, true, ["Antennae", "BunnyEars1", "BunnyEars2", "CowHorns", "Ears1", "Ears2", "ElfEars", "FoxEars1", "FoxEars2", "FoxEars3", "KittenEars1", "KittenEars2", "MouseEars1", "MouseEars2", "PonyEars1", "PuppyEars1", "PuppyEars2", "RaccoonEars1", "WolfEars1", "WolfEars2"], true);
                InventoryWearRandom(Player, "TailStraps", 8, null, false, true, ["CowtailStrap", "FoxTailsStrap", "FoxTailStrap1", "FoxTailStrap2", "HorseTailStrap", "HorseTailStrap1", "KittenTailStrap1", "KittenTailStrap2", "MouseTailStrap1", "MouseTailStrap2", "PuppyTailStrap", "PuppyTailStrap1", "RaccoonStrap", "WolfTailStrap1", "WolfTailStrap2", "WolfTailStrap3"], true);
                if (InventoryGet(Player, "ItemMouth") == null) InventoryWearRandom(Player, "ItemMouth", 8);
                if (InventoryGet(Player, "ItemNeck") == null) InventoryWearRandom(Player, "ItemNeck", 8);
                if (InventoryGet(Player, "ItemNeckRestraints") == null) InventoryWear(Player, "ChainLeash", "ItemNeckRestraints", null, 8);
                CharacterSetActivePose(Player, "Kneel", true);
                CharacterRefresh(Player);
                ChatRoomCharacterUpdate(Player);
            } else {
                var targetname = args;
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].AllowItem == true)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
		    if (Tpet == undefined) {
                        var message = "" + tgpname + " becomes a cute pet."
                    } else {      
                        if (Tpet != "") {
                            var message = tmpname + ' '.repeat(1) + Tpet + ' '.repeat(1) + tgpname;
                        } else {
                            var message = "" + tgpname + " becomes a cute pet."
                        }
                    }
                    ServerSend("ChatRoomChat", {
                        Content: "Beep",
                        Type: "Action",
                        Dictionary: [{
                            Tag: "Beep",
                            Text: message
                        }]
                    });
                    CharacterNaked(target[0]);
                    InventoryWearRandom(target[0], "ItemArms", 8, null, false, true, ["ArmbinderJacket", "BitchSuit", "Bolero", "BoxTieArmbinder", "Chains", "FullLatexSuit", "HempRope", "InflatableStraightLeotard", "LatexBoxtieLeotard", "LatexButterflyLeotard", "LatexSleevelessLeotard", "LeatherStraitJacket", "PantyhoseBody", "PantyhoseBodyOpen", "SeamlessStraitDress", "SeamlessStraitDressOpen", "StraitLeotard", "StrictLeatherPetCrawler"], true);
                    InventoryWearRandom(target[0], "HairAccessory1", 8, null, false, true, ["Antennae", "BunnyEars1", "BunnyEars2", "CowHorns", "Ears1", "Ears2", "ElfEars", "FoxEars1", "FoxEars2", "FoxEars3", "KittenEars1", "KittenEars2", "MouseEars1", "MouseEars2", "PonyEars1", "PuppyEars1", "PuppyEars2", "RaccoonEars1", "WolfEars1", "WolfEars2"], true);
                    InventoryWearRandom(target[0], "TailStraps", 8, null, false, true, ["CowtailStrap", "FoxTailsStrap", "FoxTailStrap1", "FoxTailStrap2", "HorseTailStrap", "HorseTailStrap1", "KittenTailStrap1", "KittenTailStrap2", "MouseTailStrap1", "MouseTailStrap2", "PuppyTailStrap", "PuppyTailStrap1", "RaccoonStrap", "WolfTailStrap1", "WolfTailStrap2", "WolfTailStrap3"], true);
                    if (InventoryGet(target[0], "ItemMouth") == null) InventoryWearRandom(target[0], "ItemMouth", 8);
                    if (InventoryGet(target[0], "ItemNeck") == null) InventoryWearRandom(target[0], "ItemNeck", 8);
                    if (InventoryGet(target[0], "ItemNeckRestraints") == null) InventoryWear(target[0], "ChainLeash", "ItemNeckRestraints", null, 8);
                    CharacterSetActivePose(target[0], "Kneel", true);
                    CharacterRefresh(target[0]);
                    ChatRoomCharacterUpdate(target[0]);
                    ChatRoomSetTarget(null);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'poof',
        Description: "(action): leaves the club very fast.",
        Action: (args) => {
            if (Player.Nickname == '') {
                var tmpname = Player.Name;
            } else {
                var tmpname = Player.Nickname;
            }
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
                if (Player.Nickname == '') {
                    var tmpname = Player.Name;
                } else {
                    var tmpname = Player.Nickname;
                }
                if (InventoryGet(Player, "Pronouns").Asset.Name == "HeHim") {
                    var tmpr1 = "He";
                    var tmpr2 = "him";
                    var tmpr3 = "his";
                    var tmpr4 = "he";
                } else if (InventoryGet(Player, "Pronouns").Asset.Name == "SheHer") {
                    var tmpr1 = "She";
                    var tmpr2 = "her";
                    var tmpr3 = "her";
                    var tmpr4 = "she";
                } else {
                    var tmpr1 = "They";
                    var tmpr2 = "them";
                    var tmpr3 = "their";
                    var tmpr4 = "they";
                }
                var stringPose1 = args;
                var stringPose2 = stringPose1.split(/[ ,]+/);
                var pose = stringPose2[0];
                var targetname = stringPose2[1];
                if (targetname == null) {
                    if ((pose == "armsfree") &&
                        (Player.ActivePose != 'BaseUpper') &&
                        (CharacterCanChangeToPose(Player, 'BaseUpper'))) {
                        CharacterSetActivePose(Player, "BaseUpper");
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " relaxes " + tmpr3 + " arms."
                            }]
                        });
                    } else if ((pose == "belly") &&
                        (Player.ActivePose != 'Hogtied') &&
                        (CharacterCanChangeToPose(Player, 'Hogtied'))) {
                        CharacterSetActivePose(Player, "Hogtied");
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " relaxes on " + tmpr3 + " belly."
                            }]
                        });
                    } else if ((pose == "boxtied") &&
                        (Player.ActivePose != 'BackBoxTie') &&
                        (CharacterCanChangeToPose(Player, 'BackBoxTie'))) {
                        CharacterSetActivePose(Player, "BackBoxTie");
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " puts the arms behind " + tmpr3 + " back."
                            }]
                        });
                    } else if ((pose == "cuffed") &&
                        (Player.ActivePose != 'BackCuffs') &&
                        (CharacterCanChangeToPose(Player, 'BackCuffs'))) {
                        CharacterSetActivePose(Player, "BackCuffs");
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " puts " + tmpr3 + " arms out like " + tmpr4 + " is handcuffed."
                            }]
                        });
                    } else if ((pose == "elbowtied") &&
                        (Player.ActivePose != 'BackElbowTouch') &&
                        (CharacterCanChangeToPose(Player, 'BackElbowTouch'))) {
                        CharacterSetActivePose(Player, "BackElbowTouch");
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " puts the arms behind " + tmpr3 + " back, elbows almost touching."
                            }]
                        });
                    } else if ((pose == "kneel1") &&
                        (Player.ActivePose != 'Kneel') &&
                        ((CharacterCanChangeToPose(Player, 'Kneel')) || (ChatRoomCanAttemptKneel(Player) == true))) {
                        CharacterSetActivePose(Player, "Kneel");
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
                        (CharacterCanChangeToPose(Player, 'KneelingSpread'))) {
                        CharacterSetActivePose(Player, "KneelingSpread");
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " kneels down and opens " + tmpr3 + " legs."
                            }]
                        });
                    } else if ((pose == "legsclosed") &&
                        (Player.ActivePose != 'LegsClosed') &&
                        (CharacterCanChangeToPose(Player, 'LegsClosed'))) {
                        CharacterSetActivePose(Player, "LegsClosed");
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " stands up and closes " + tmpr3 + " legs."
                            }]
                        });
                    } else if ((pose == "legsopen") &&
                        (Player.ActivePose != 'LegsOpen') &&
                        (CharacterCanChangeToPose(Player, 'LegsOpen'))) {
                        CharacterSetActivePose(Player, "LegsOpen");
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " stands up normally on " + tmpr3 + " feet."
                            }]
                        });
                    } else if ((pose == "pet") &&
                        (Player.ActivePose != 'AllFours') &&
                        (CharacterCanChangeToPose(Player, 'AllFours'))) {
                        CharacterSetActivePose(Player, "AllFours");
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
                        (CharacterCanChangeToPose(Player, 'Yoked'))) {
                        CharacterSetActivePose(Player, "Yoked");
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " raises " + tmpr3 + " hands."
                            }]
                        });
                    } else if ((pose == "spreadarms2") &&
                        (Player.ActivePose != 'OverTheHead') &&
                        (CharacterCanChangeToPose(Player, 'OverTheHead'))) {
                        CharacterSetActivePose(Player, "OverTheHead");
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " raises the hands above " + tmpr3 + " head."
                            }]
                        });
                    } else if ((pose == "spreadeagle1") &&
                        ((Player.ActivePose == null) || (Player.ActivePose.includes('Yoked') == false) || (Player.ActivePose.includes('Spread') == false)) &&
                        (CharacterCanChangeToPose(target[0], 'Yoked')) &&
                        (CharacterCanChangeToPose(target[0], 'Spread'))) {
                        CharacterSetActivePose(target[0], "Yoked");
                        CharacterSetActivePose(target[0], "Spread")
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " raises " + tmpr3 + " hands and spreads " + tmpr3 + " legs."
                            }]
                        });
                    } else if ((pose == "spreadeagle2") &&
                        ((Player.ActivePose == null) || (Player.ActivePose.includes('OverTheHead') == false) || (Player.ActivePose.includes('Spread') == false)) &&
                        (CharacterCanChangeToPose(target[0], 'OverTheHead')) &&
                        (CharacterCanChangeToPose(target[0], 'Spread'))) {
                        CharacterSetActivePose(target[0], "OverTheHead");
                        CharacterSetActivePose(target[0], "Spread")
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " raises the hands above " + tmpr3 + " head and spreads " + tmpr3 + " legs."
                            }]
                        });
                    } else if ((pose == "spreadlegs") &&
                        (Player.ActivePose != 'Spread') &&
                        (CharacterCanChangeToPose(Player, 'Spread'))) {
                        CharacterSetActivePose(Player, "Spread");
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " spreads " + tmpr3 + " legs."
                            }]
                        });
                    } else if ((pose == "stand") &&
                        (Player.ActivePose != null) &&
                        ((CharacterCanChangeToPose(Player, null)) || (ChatRoomCanAttemptStand(Player) == true))) {
                        CharacterSetActivePose(Player, null);
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
                        (CharacterCanChangeToPose(Player, 'Suspension'))) {
                        CharacterSetActivePose(Player, "Suspension");
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
                        (CharacterCanChangeToPose(Player, 'TapedHands'))) {
                        CharacterSetActivePose(Player, "TapedHands");
                        ChatRoomCharacterUpdate(Player);
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " puts " + tmpr3 + " arms out like " + tmpr3 + " hands are taped."
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
                        CharacterSetActivePose(Player, null);
                        ChatRoomCharacterUpdate(Player);
                        setTimeout(function() {
                            InventoryGet(Player, "Emoticon").Property.OverrideHeight = {
                                Height: 150
                            };
                            CharacterSetActivePose(Player, "Kneel");
                            CurrentScreen === "ChatRoom" ?
                                ChatRoomCharacterUpdate(Player) :
                                CharacterRefresh(Player);
                        }, 1000);
                        setTimeout(function() {
                            InventoryGet(Player, "Emoticon").Property.OverrideHeight = undefined;
                            CharacterSetActivePose(Player, null);
                            CurrentScreen === "ChatRoom" ?
                                ChatRoomCharacterUpdate(Player) :
                                CharacterRefresh(Player);
                        }, 2000);
                        setTimeout(function() {
                            InventoryGet(Player, "Emoticon").Property.OverrideHeight = {
                                Height: 150
                            };
                            CharacterSetActivePose(Player, "Kneel");
                            CurrentScreen === "ChatRoom" ?
                                ChatRoomCharacterUpdate(Player) :
                                CharacterRefresh(Player);
                        }, 3000);
                        setTimeout(function() {
                            CharacterSetActivePose(Player, null);
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
                        CharacterSetActivePose(Player, null);
                        ChatRoomCharacterUpdate(Player);
                        setTimeout(function() {
                            CharacterSetActivePose(Player, "OverTheHead");
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
                            CharacterSetActivePose(Player, "Kneel");
                            ChatRoomCharacterUpdate(Player);
                        }, 2000);
                        setTimeout(function() {
                            CharacterSetActivePose(Player, "BaseUpper");
                            CharacterSetActivePose(Player, null);
                            CharacterSetActivePose(Player, ["Suspension", "Kneel"]);
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
                                "<p style='background-color:#5fbd7a'>ULTRAbc: You're too heavily tied to excercise.</p>"
                            );
                        }
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " makes " + tmpr3 + " workout."
                            }]
                        });
                        CharacterSetActivePose(Player, null);
                        ChatRoomCharacterUpdate(Player);
                        setTimeout(function() {
                            CharacterSetActivePose(Player, "OverTheHead");
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
                            CharacterSetActivePose(Player, "Kneel");
                        }, 2000);
                        setTimeout(function() {
                            CharacterSetActivePose(Player, "Yoked");
                            Player.FocusGroup = AssetGroupGet("Female3DCG", Region);
                            DialogExtendItem(InventoryGet(Player, Region));
                            DialogFocusItem.Property.OverrideHeight = {
                                Height: 350
                            };
                            ChatRoomCharacterUpdate(Player);
                            DialogLeaveItemMenu();
                        }, 3000);
                        setTimeout(function() {
                            CharacterSetActivePose(Player, "OverTheHead");
                            Player.FocusGroup = AssetGroupGet("Female3DCG", Region);
                            DialogExtendItem(InventoryGet(Player, Region));
                            DialogFocusItem.Property.OverrideHeight = {
                                Height: 100
                            };
                            ChatRoomCharacterUpdate(Player);
                            DialogLeaveItemMenu();
                        }, 4000);
                        setTimeout(function() {
                            CharacterSetActivePose(Player, "Yoked");
                            Player.FocusGroup = AssetGroupGet("Female3DCG", Region);
                            DialogExtendItem(InventoryGet(Player, Region));
                            DialogFocusItem.Property.OverrideHeight = {
                                Height: 350
                            };
                            ChatRoomCharacterUpdate(Player);
                            DialogLeaveItemMenu();
                        }, 5000);
                        setTimeout(function() {
                            CharacterSetActivePose(Player, "OverTheHead");
                            Player.FocusGroup = AssetGroupGet("Female3DCG", Region);
                            DialogExtendItem(InventoryGet(Player, Region));
                            DialogFocusItem.Property.OverrideHeight = {
                                Height: 100
                            };
                            ChatRoomCharacterUpdate(Player);
                            DialogLeaveItemMenu();
                        }, 6000);
                        setTimeout(function() {
                            CharacterSetActivePose(Player, "Yoked");
                            Player.FocusGroup = AssetGroupGet("Female3DCG", Region);
                            DialogExtendItem(InventoryGet(Player, Region));
                            DialogFocusItem.Property.OverrideHeight = {
                                Height: 350
                            };
                            ChatRoomCharacterUpdate(Player);
                            DialogLeaveItemMenu();
                        }, 7000);
                        setTimeout(function() {
                            CharacterSetActivePose(Player, "OverTheHead");
                            Player.FocusGroup = AssetGroupGet("Female3DCG", Region);
                            DialogExtendItem(InventoryGet(Player, Region));
                            DialogFocusItem.Property.OverrideHeight = {
                                Height: 100
                            };
                            ChatRoomCharacterUpdate(Player);
                            DialogLeaveItemMenu();
                        }, 8000);
                        setTimeout(function() {
                            CharacterSetActivePose(Player, "Yoked");
                            Player.FocusGroup = AssetGroupGet("Female3DCG", Region);
                            DialogExtendItem(InventoryGet(Player, Region));
                            DialogFocusItem.Property.OverrideHeight = {
                                Height: 350
                            };
                            ChatRoomCharacterUpdate(Player);
                            DialogLeaveItemMenu();
                        }, 9000);
                        setTimeout(function() {
                            CharacterSetActivePose(Player, "OverTheHead");
                            Player.FocusGroup = AssetGroupGet("Female3DCG", Region);
                            DialogExtendItem(InventoryGet(Player, Region));
                            DialogFocusItem.Property.OverrideHeight = {
                                Height: 100
                            };
                            ChatRoomCharacterUpdate(Player);
                            DialogLeaveItemMenu();
                        }, 10000);
                        setTimeout(function() {
                            CharacterSetActivePose(Player, null);
                            Player.FocusGroup = AssetGroupGet("Female3DCG", Region);
                            DialogExtendItem(InventoryGet(Player, Region));
                            DialogFocusItem.Property.OverrideHeight = undefined;
                            ChatRoomCharacterUpdate(Player);
                            DialogLeaveItemMenu();
                        }, 10000);
                        // reset	 
                    } else if (pose == "reset") {
                        CharacterSetActivePose(Player, null);
                        ChatRoomCharacterUpdate(Player);
                        CharacterRefresh(Player);
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
                        if (pose == "armsfree") {
                            if ((target[0].AllowItem == true) &&
                                (target[0].ActivePose != 'BaseUpper') &&
                                (CharacterCanChangeToPose(target[0], 'BaseUpper'))) {
                                CharacterSetActivePose(target[0], "BaseUpper");
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
                                (CharacterCanChangeToPose(target[0], 'Hogtied'))) {
                                CharacterSetActivePose(target[0], "Hogtied");
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
                                (CharacterCanChangeToPose(target[0], 'BackBoxTie'))) {
                                CharacterSetActivePose(target[0], "BackBoxTie");
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
                                (CharacterCanChangeToPose(target[0], 'BackCuffs'))) {
                                CharacterSetActivePose(target[0], "BackCuffs");
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
                                (CharacterCanChangeToPose(target[0], 'BackElbowTouch'))) {
                                CharacterSetActivePose(target[0], "BackElbowTouch");
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
                                ((CharacterCanChangeToPose(target[0], 'Kneel')) || (ChatRoomCanAttemptKneel(target[0]) == true))) {
                                CharacterSetActivePose(target[0], "Kneel");
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
                                (CharacterCanChangeToPose(target[0], 'KneelingSpread'))) {
                                CharacterSetActivePose(target[0], "KneelingSpread");
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
                                (CharacterCanChangeToPose(target[0], 'LegsClosed'))) {
                                CharacterSetActivePose(target[0], "LegsClosed");
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
                                (CharacterCanChangeToPose(target[0], 'LegsOpen'))) {
                                CharacterSetActivePose(target[0], "LegsOpen");
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
                                (CharacterCanChangeToPose(target[0], 'AllFours'))) {
                                CharacterSetActivePose(target[0], "AllFours");
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
                                (CharacterCanChangeToPose(target[0], 'Yoked'))) {
                                CharacterSetActivePose(target[0], "Yoked");
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
                                (CharacterCanChangeToPose(target[0], 'OverTheHead'))) {
                                CharacterSetActivePose(target[0], "OverTheHead");
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
                                (CharacterCanChangeToPose(target[0], 'Yoked')) &&
                                (CharacterCanChangeToPose(target[0], 'Spread'))) {
                                CharacterSetActivePose(target[0], "Yoked");
                                CharacterSetActivePose(target[0], "Spread");
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
                                (CharacterCanChangeToPose(target[0], 'OverTheHead')) &&
                                (CharacterCanChangeToPose(target[0], 'Spread'))) {
                                CharacterSetActivePose(target[0], "OverTheHead");
                                CharacterSetActivePose(target[0], "Spread");
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
                                (CharacterCanChangeToPose(target[0], 'Spread'))) {
                                CharacterSetActivePose(target[0], "Spread");
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
                                ((CharacterCanChangeToPose(target[0], null)) || (ChatRoomCanAttemptStand(target[0]) == true))) {
                                CharacterSetActivePose(target[0], null);
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
                                (CharacterCanChangeToPose(target[0], 'Suspension'))) {
                                CharacterSetActivePose(target[0], "Suspension");
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
                                (CharacterCanChangeToPose(target[0], 'TapedHands'))) {
                                CharacterSetActivePose(target[0], "TapedHands");
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
                                CharacterSetActivePose(target[0], null);
                                ChatRoomCharacterUpdate(target[0]);
                                CharacterRefresh(target[0]);
                            }
                        }
                    }
                    ChatRoomSetTarget(null);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'prison',
        Description: "(minutes): stays in Pandora prison.",
        Action: (args) => {
            if (Player.Nickname == '') {
                var tmpname = Player.Name;
            } else {
                var tmpname = Player.Nickname;
            }
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
            if (Player.Nickname == '') {
                var tmpname = Player.Name;
            } else {
                var tmpname = Player.Nickname;
            }
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
	    if (Player.Nickname == '') {
                var tmpname = Player.Name;
            } else {
                var tmpname = Player.Nickname;
            }
            if (args === "") {
                if (Randomize == undefined) {
                    var message = "Magical lasers apply random clothes and bindings on " + tmpname + "'s body."
                } else {    
                    if (Randomize != "") {
                        var message = tmpname + ' '.repeat(1) + Randomize;
                    } else {
                        var message = "Magical lasers apply random clothes and bindings on " + tmpname + "'s body."
                    }
                }
                ServerSend("ChatRoomChat", {
                    Content: "Beep",
                    Type: "Action",
                    Dictionary: [{
                        Tag: "Beep",
                        Text: message
                    }]
                });
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
                if ((target[0] != null) && (target[0].AllowItem == true)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
		    if (Trandomize == undefined) {
                        var message = "Magical lasers apply random clothes and bindings on " + tgpname + "'s body."
                    } else {      
                        if (Trandomize != "") {
                            var message = tmpname + ' '.repeat(1) + Trandomize + ' '.repeat(1) + tgpname;
                        } else {
                            var message = "Magical lasers apply random clothes and bindings on " + tgpname + "'s body."
                        }
                    }
                    ServerSend("ChatRoomChat", {
                        Content: "Beep",
                        Type: "Action",
                        Dictionary: [{
                            Tag: "Beep",
                            Text: message
                        }]
                    });
                    CharacterNaked(target[0]);
                    CharacterRandomUnderwear(target[0]);
                    CharacterAppearanceFullRandom(target[0], true);
                    CharacterFullRandomRestrain(target[0], "ALL");
                    ChatRoomCharacterUpdate(target[0]);
                    ChatRoomSetTarget(null);
                }
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
	    if (Player.Nickname == '') {
                var tmpname = Player.Name;
            } else {
                var tmpname = Player.Nickname;
            }
            if (args === "") {
                if (Restrain == undefined) {
                    var message = "Magical lasers apply random restraints on " + tmpname + "'s body."
                } else {    
                    if (Restrain != "") {
                        var message = tmpname + ' '.repeat(1) + Restrain;
                    } else {
                        var message = "Magical lasers apply random restraints on " + tmpname + "'s body."
                    }
                }
                ServerSend("ChatRoomChat", {
                    Content: "Beep",
                    Type: "Action",
                    Dictionary: [{
                        Tag: "Beep",
                        Text: message
                    }]
                });
                CharacterFullRandomRestrain(Player, "ALL");
                ChatRoomCharacterUpdate(Player);
            } else {
                var targetname = args;
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].AllowItem == true)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
		    if (Trestrain == undefined) {
                        var message = "Magical lasers apply random restraints on " + tgpname + "'s body."
                    } else {      
                        if (Trestrain != "") {
                            var message = tmpname + ' '.repeat(1) + Trestrain + ' '.repeat(1) + tgpname;
                        } else {
                            var message = "Magical lasers apply random restraints on " + tgpname + "'s body."
                        }
                    }
                    ServerSend("ChatRoomChat", {
                        Content: "Beep",
                        Type: "Action",
                        Dictionary: [{
                            Tag: "Beep",
                            Text: message
                        }]
                    });
                    CharacterFullRandomRestrain(target[0], "ALL");
                    ChatRoomCharacterUpdate(target[0]);
                    ChatRoomSetTarget(null);
                }
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
                CurrentCharacter.Appearance = CurrentCharacter.Appearance.filter(x => (CurrentCharacter.FocusGroup && CurrentCharacter.FocusGroup.Name) ? x.Asset.Group.Name !=
                    CurrentCharacter.FocusGroup.Name : true);
                ChatRoomCharacterUpdate(CurrentCharacter);
                DialogLeave();
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
                    SkillChange("Bondage", level);
                } else if (skill == "dressage") {
                    SkillChange("Dressage", level);
                } else if (skill == "evasion") {
                    SkillChange("Evasion", level);
                } else if (skill == "infiltration") {
                    SkillChange("Infiltration", level);
                } else if (skill == "lockpicking") {
                    SkillChange("LockPicking", level);
                } else if (skill == "selfbondage") {
                    SkillChange("SelfBondage", level);
                } else if (skill == "willpower") {
                    SkillChange("Willpower", level);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'sleep',
        Description: "(target): uses the sleeping pill on yourself or another player.",
        Action: (args) => {
            if (args === "") {
                if (Player.Nickname == '') {
                    var tmpname = Player.Name;
                } else {
                    var tmpname = Player.Nickname;
                }
                if (InventoryGet(Player, "Pronouns").Asset.Name == "HeHim") {
                    var tmpr1 = "He";
                    var tmpr2 = "him";
                    var tmpr3 = "his";
                    var tmpr4 = "he";
                } else if (InventoryGet(Player, "Pronouns").Asset.Name == "SheHer") {
                    var tmpr1 = "She";
                    var tmpr2 = "her";
                    var tmpr3 = "her";
                    var tmpr4 = "she";
                } else {
                    var tmpr1 = "They";
                    var tmpr2 = "them";
                    var tmpr3 = "their";
                    var tmpr4 = "they";
                }
                ServerSend("ChatRoomChat", {
                    Content: "Beep",
                    Type: "Action",
                    Dictionary: [{
                        Tag: "Beep",
                        Text: "" + tmpname + " swallows a sleeping pill and drinks a glass of water. " + tmpr1 + " falls asleep very quickly."
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
                if ((target[0] != null) && (target[0].AllowItem == true)) {
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
                    ChatRoomSetTarget(null);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'slowleave',
        Description: "(action): slowly leaves the room.",
        Action: (args) => {
            if (Player.Nickname == '') {
                var tmpname = Player.Name;
            } else {
                var tmpname = Player.Nickname;
            }
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
        Description: "(value): changes the solidity of most current bindings.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The solidity command must be followed by a number between 1 and 99.</p>"
                );
            } else {
                if (Player.Nickname == '') {
                    var tmpname = Player.Name;
                } else {
                    var tmpname = Player.Nickname;
                }
                var solidity = args;
                if (InventoryGet(Player, "ItemDevices") != null) {
                    if ((InventoryGet(Player, "ItemDevices").Asset.Name == "FuturisticCrate") || (InventoryGet(Player, "ItemDevices").Asset.Name == "WoodenRack")) {
                        if (solidity == 1) {
                            InventoryRemove(Player, "ItemDevices");
                            ServerSend("ChatRoomChat", {
                                Content: "Beep",
                                Type: "Action",
                                Dictionary: [{
                                    Tag: "Beep",
                                    Text: "Magical lasers make disappear the device in which " + tmpname + " was prisoner."
                                }]
                            });
                        }
                    }
                }
                InventorySetDifficulty(Player, "ItemAddon", solidity);
                InventorySetDifficulty(Player, "ItemArms", solidity);
                InventorySetDifficulty(Player, "ItemBoots", solidity);
                InventorySetDifficulty(Player, "ItemBreast", solidity);
                InventorySetDifficulty(Player, "ItemButt", solidity);
                InventorySetDifficulty(Player, "ItemDevices", solidity);
                InventorySetDifficulty(Player, "ItemEars", solidity);
                InventorySetDifficulty(Player, "ItemFeet", solidity);
                InventorySetDifficulty(Player, "ItemHands", solidity);
                InventorySetDifficulty(Player, "ItemHead", solidity);
                InventorySetDifficulty(Player, "ItemHood", solidity);
                InventorySetDifficulty(Player, "ItemLegs", solidity);
                InventorySetDifficulty(Player, "ItemMisc", solidity);
                InventorySetDifficulty(Player, "ItemMouth", solidity);
                InventorySetDifficulty(Player, "ItemMouth2", solidity);
                InventorySetDifficulty(Player, "ItemMouth3", solidity);
                InventorySetDifficulty(Player, "ItemNeck", solidity);
                InventorySetDifficulty(Player, "ItemNeckAccessories", solidity);
                InventorySetDifficulty(Player, "ItemNeckRestraints", solidity);
                InventorySetDifficulty(Player, "ItemNipples", solidity);
                InventorySetDifficulty(Player, "ItemNipplesPiercings", solidity);
                InventorySetDifficulty(Player, "ItemNose", solidity);
                InventorySetDifficulty(Player, "ItemPelvis", solidity);
                InventorySetDifficulty(Player, "ItemTorso", solidity);
                InventorySetDifficulty(Player, "ItemTorso2", solidity);
                InventorySetDifficulty(Player, "ItemVulva", solidity);
                InventorySetDifficulty(Player, "ItemVulvaPiercings", solidity);
                ServerPlayerInventorySync();
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: The solidity of most current bindings has been changed.</p>"
                );
            }
        }
    }])

    CommandCombine([{
        Tag: 'sosbuttons',
        Description: ": toggles emergency buttons in chat room and timer cell",
        Action: () => {
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
                if (Player.Nickname == '') {
                    var tmpname = Player.Name;
                } else {
                    var tmpname = Player.Nickname;
                }
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
        Tag: 'timercell',
        Description: "(minutes): stays in the isolation cell.",
        Action: (args) => {
            if (Player.Nickname == '') {
                var tmpname = Player.Name;
            } else {
                var tmpname = Player.Nickname;
            }
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
                        SkillChange("Infiltration", 6);
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
                        SkillChange("Evasion", 10);
                    }
                    TitleSet("BondageBaby");
                } else if (title == "bondagemaid") {
                    if ((LogQuery("JoinedSorority", "Maid") == false) || (LogQuery("LeadSorority", "Maid") == false)) {
                        LogAdd("JoinedSorority", "Management");
                    }
                    if (SkillGetLevel(Player, "Evasion") < 10) {
                        SkillChange("Evasion", 10);
                    }
                    TitleSet("BondageMaid");
                } else if (title == "bunny") {
                    TitleSet("Bunny");
                } else if (title == "clubslave") {
                    LogAdd("ClubSlave", "Management", CurrentTime + 3600000);
                } else if (title == "coldbloodhorse") {
                    if ((SkillGetLevel(Player, "Dressage") < 3) || (SkillGetLevel(Player, "Infiltration") > 3)) {
                        SkillChange("Dressage", 3);
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
                        SkillChange("Dressage", 2);
                    }
                    TitleSet("PonyFarm");
                } else if (title == "flyingpegasus") {
                    if ((SkillGetLevel(Player, "Dressage") < 8) || (SkillGetLevel(Player, "Infiltration") > 9)) {
                        SkillChange("Dressage", 8);
                    }
                    TitleSet("PonyPegasus");
                } else if (title == "foal") {
                    if (ReputationGet("ABDL") < 1) {
                        if ((SkillGetLevel(Player, "Dressage") < 1) || (SkillGetLevel(Player, "Infiltration") > 2)) {
                            SkillChange("Dressage", 1);
                        }
                    } else if (ReputationGet("ABDL") >= 1) {
                        if (SkillGetLevel(Player, "Dressage") < 1) {
                            SkillChange("Dressage", 1);
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
                        SkillChange("Dressage", 5);
                    }
                    TitleSet("PonyHot");
                } else if (title == "houdini") {
                    if (SkillGetLevel(Player, "Evasion") < 10) {
                        SkillChange("Evasion", 10);
                    }
                    TitleSet("Houdini");
                } else if (title == "infiltrator") {
                    if ((SkillGetLevel(Player, "Infiltration") < 4) || (SkillGetLevel(Player, "Infiltration") > 5)) {
                        SkillChange("Infiltration", 4);
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
                        SkillChange("Dressage", 10);
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
                        SkillChange("Infiltration", 2);
                    }
                    TitleSet("InfilrationMole");
                } else if (title == "nawashi") {
                    if (SkillGetLevel(Player, "Bondage") < 10) {
                        SkillChange("Bondage", 10);
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
                        SkillChange("Infiltration", 8);
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
                        SkillChange("Dressage", 7);
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
                        SkillChange("Infiltration", 10);
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
                        SkillChange("Dressage", 4);
                    }
                    TitleSet("PonyWarm");
                } else if (title == "wildmustang") {
                    if ((SkillGetLevel(Player, "Dressage") < 6) || (SkillGetLevel(Player, "Infiltration") > 6)) {
                        SkillChange("Dressage", 6);
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
	    if (Player.Nickname == '') {
                var tmpname = Player.Name;
            } else {
                var tmpname = Player.Nickname;
            }	
            if (args === "") {
                if (Totalrelease == undefined) {
                    var message = "Magical lasers make disappear all bindings and toys on " + tmpname + "'s body."
                } else {    
                    if (Totalrelease != "") {
                        var message = tmpname + ' '.repeat(1) + Totalrelease;
                    } else {
                        var message = "Magical lasers make disappear all bindings and toys on " + tmpname + "'s body."
                    }
                }
                ServerSend("ChatRoomChat", {
                    Content: "Beep",
                    Type: "Action",
                    Dictionary: [{
                        Tag: "Beep",
                        Text: message
                    }]
                });
                CharacterReleaseTotal(Player);
                ChatRoomCharacterUpdate(Player);
            } else {
                var targetname = args;
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].AllowItem == true)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
		    if (Ttotalrelease == undefined) {
                        var message = "Magical lasers make disappear all bindings and toys on " + tgpname + "'s body."
                    } else {      
                        if (Ttotalrelease != "") {
                            var message = tmpname + ' '.repeat(1) + Ttotalrelease + ' '.repeat(1) + tgpname;
                        } else {
                            var message = "Magical lasers make disappear all bindings and toys on " + tgpname + "'s body."
                        }
                    }
                    ServerSend("ChatRoomChat", {
                        Content: "Beep",
                        Type: "Action",
                        Dictionary: [{
                            Tag: "Beep",
                            Text: message
                        }]
                    });
                    CharacterReleaseTotal(target[0]);
                    ChatRoomCharacterUpdate(target[0]);
                    ChatRoomSetTarget(null);
                }
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
        Tag: 'ubc',
        Description: ": displays UBC version (+ more info if welcome message enabled).",
        Action: () => {
	    ChatRoomSendLocal(
                "<p style='background-color:#5fbd7a'>ULTRAbc 1.8: type <b>/uhelp</b> for general menu.</p>"
            );
	    if (WelcomeOn == true) {	
		ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>Myrhanda Moaner also installed. Type <b>/moaner</b> for more info, <b>/moaner status</b> for current status.\n" +
                    "Note: NPC punishments are disabled.\n" +
                    "Use <b>/uhelp new</b> to get info about changes in current ULTRAbc version.\n" +
                    "Use <b>/help</b> to get all standard BC + ULTRAbc commands in alphabetical order.\n" +
                    "Visit also our <a href='https://github.com/tetris245/ULTRAbc/wiki' target='_blank'>Wiki</a>\n" +
                    "For any inquiries, join <a href='https://discord.gg/JUvYfSpCmN' target='_blank'>https://discord.gg/JUvYfSpCmN</a></p>"
                );
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
                    "<b>fun</b> = commands related to fun, pain and pleasure.\n" +
                    "<b>kd</b> = info about kd command (for Kinky Dungeon).\n" +
                    "<b>misc</b> = special commands.\n" +
		    "<b>settings</b> = commands to customize ULTRAbc.\n" +
                    "<b>talking</b> = commands related to talking.\n" +
                    "<b>visual</b> = commands related to animations and background.\n" +
                    "<b>zones</b> = commands related to game zones.\n" +
                    "Several commands require or allow to specify a target. It can be a real name or a member number.\n" +
                    "Use <b>/uhelp new</b> to get info about changes in current ULTRAbc version.\n" +
                    "Visit also our <a href='https://github.com/tetris245/ULTRAbc/wiki' target='_blank'>Wiki</a></p>"
                );
            }
            if (args === "bondage") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Bondage commands:\n" +
                    "<b>/hint</b> (target) (hint) = adds or changes a hint for all current locks with password.\n" +
                    "<b>/itemcolor</b> (colorcode) (target) = changes color on all current bindings. Color code must be in the format #000000\n" +
                    "<b>/lock</b> = adds locks on all lockable items. Use /help lock for more info.\n" +
                    "<b>/outfit</b> = restores/saves/loads outfit (including restraints). Using will give more info.\n" +
                    "<b>/pet</b> (target) = becomes a fully restrained pet.\n" +
                    "<b>/randomize</b> (target) = naked + underwear + clothes + restrain commands.\n" +
                    "<b>/restrain</b> (target) = adds random restraints.\n" +
                    "<b>/solidity</b> (value) = changes the solidity of most current bindings. Value must be between 1 and 99. Use high values to make escape impossible!</p>"
                );
            }
            if (args === "character") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Character commands - * = more info when using\n" +
                    "<b>/difficulty</b> (number) = changes game difficulty. *\n" +
                    "<b>/giveeverything</b> = gives every item.\n" +
                    "<b>/maxstatistics</b> = gives max statistics.\n" +
                    "<b>/money</b> (value) = gives or takes money.\n" +
                    "<b>/permission</b> (number) = changes your item permission *\n" +
                    "<b>/reputation</b> (reputation) (level) = changes a reputation. *\n" +
                    "<b>/resetinventory</b> = erases your inventory. Will warn first.\n" +
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
                    "<b>/bio</b> (target) = gives direct access to the profile description of any player in the chat room.\n" +
                    "<b>/erase</b> = erases chat.\n" +
                    "<b>/font</b> (newfont) (size) = changes font in BC. Using will give more info.\n" +
                    "<b>/frlist</b> (lobby) = gives access to friendlist in specified lobby with clickable links during 15 seconds. *\n" +
                    "<b>/poof</b> (action) = leaves the club very fast. Action is optional (default = poofs away).\n" +
                    "<b>/search</b> (lobby) = opens room search for 15 seconds in specified lobby. *\n" +
                    "<b>/theme</b> (number) = changes chat color theme after automatic relog. Number must be between 0 and 3.</p>"
                );
            }
            if (args === "clothing") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Clothing commands:\n" +
                    "<b>/clothes</b> (target) = changes clothes.\n" +
                    "<b>/diaper</b> (action) (target or value) = plays with diapers (ABDL game). Using will give more info.\n" +
                    "<b>/naked</b> (target) = removes clothes.\n" +
                    "<b>/outfit</b> = restores/saves/loads outfit (including restraints). Using will give more info.\n" +
                    "<b>/underwear</b> (target) = changes underwear.\n" +
                    "<b>/wrobe</b> (target) = opens target wardrobe.</p>"
                );
            }
            if (args === "escape") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Escape commands:\n" +
                    "<b>/boost</b> = boosts skills, similar to maid quarters drink.\n" +
                    "<b>/code</b> (target) = reveals codes for combination locks.\n" +
                    "<b>/ptcode</b> (target) = reveals portal link codes.\n" +
                    "<b>/pw</b> (target) = reveals passwords for locks with password.\n" +
                    "<b>/quit</b> (action) = leaves room.\n" +
                    "<b>/removecollar</b> = temporarily removes slave/owner collar.\n" +
                    "<b>/resetdifficulty</b> = resets difficulty, thereby quitting it.\n" +
                    "<b>/safeworditem</b> = removes specific item. More info when used.\n" +
                    "<b>/solidity</b> (value) = changes the solidity of most current bindings. Use low values to escape! Value 1 allows to escape special devices.\n" +
                    "<b>/totalrelease</b> (target) = removes all bindings, collar, harness, chastity, toys.\n" +
                    "<b>/unlock</b> (target) (locktype) = removes all locks or only a specified type of lock. More info when used.\n" +
                    "<b>/untie</b> (target) = removes all bindings.</p>"
                );
            }
            if (args === "fun") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Fun commands:\n" +
                    "<b>/cum</b> = causes an orgasm.\n" +
                    "<b>/invisible1</b> = becomes invisible (anal hook must be allowed).\n" +
                    "<b>/invisible2</b> = becomes invisible (glitter mask must be usable).\n" +
                    "<b>/moaner</b> = moans when horny and stimulated. More info when using.\n" +
                    "<b>/sleep</b> (target) = uses the sleeping pill on yourself or another player.\n" +
                    "<b>/slowleave</b> (action) = slowly leaves the room.\n" +
                    "<b>/superdice</b> (sides) = rolls a superdice. Sides can be between 2 and 999999999.\n" +
                    "<b>/visible</b> = back to visible state after using of an invisible command.</p>"
                );
            }
            if (args === "kd") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: How to use the kd command:\n" +
                    "1 - Optionally, use <b>/kd devious</b> to toggle the Devious Challenge and/or <b>/kd debug</b> to enable the Debug Mode\n" +
                    "2 - Use twice <b>/kd</b> without any option to launch the game without cheat\n" +
                    "3 -  After launching of the game, you can click on the Exit button to go back to the chatroom and use a command with cheat:\n" +
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
		    "<b>/ubc</b> = displays UBC version (+ more info if welcome message enabled).\n" +
                    "<b>/uhelp</b> (category) = displays the ULTRAbc commands. *\n" +
                    "<b>/unrestrict</b> =  removes all restrictions from game. * </p>\n" 
                );
            }
            if (args === "new") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Version 1.8:\n" +
                    "- New commands: magiccheat, message, welcome.\n" +
                    "- message allows to create custom messages for 10 commands.\n" +
                    "- Removed target condition and spanking feature in the Moaner.\n" +
                    "- Allowed the Moaner to react to changes in vibe settings of other players in the same chat room.\n" +
                    "- Fixed an incompatibility issue of the Moaner with the MBCHC add-on.\n" +
                    "- Added code to prevent double UBC loading.</p>"
                );
            }
            if (args === "settings") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Settings commands - * = more info when using\n" +
                    "<b>/autojoin</b> = enables/disables the Auto-Join feature.\n" +
                    "<b>/exitmode</b> = toggles exit mode for OUT button.\n" +
                    "<b>/fullseed</b> = toggles full solution for intricate and high security locks.\n" +
                    "<b>/killpar</b> = kills UBC/Moaner parameters saved locally. Will warn first.\n" +
                    "<b>/magiccheat</b> = toggles cheat mode in Magic School.\n" +
		    "<b>/message</b> (option) (message) = creates custom messages for specific command. *\n" +
                    "<b>/nowhisper</b> = toggles no-whisper mode.\n" +
		    "<b>/npcpunish</b> = enables/disables NPC punishments.\n" +
                    "<b>/sosbuttons</b> = toggles SOS buttons in chat + timer cell.\n" +
                    "<b>/welcome</b> = toggles UBC welcome message in main hall.</p>" 
                );
            }
	
            if (args === "talking") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Talking commands - * = more info when using\n" +
                    "<b>/btalk</b> (stuffhere) = speaks once as a baby.\n" +
                    "<b>/gtalk</b> (talkmode) (stuffhere) = speaks once in specified gag talk. *\n" +
                    "<b>/moaner</b> = moans when horny and stimulated. *\n" +
                    "<b>/s1</b> (stuffhere) = speaks once in light stuttering mode.\n" +
                    "<b>/s2</b> (stuffhere) = speaks once in normal stuttering mode.\n" +
                    "<b>/s3</b> (stuffhere) = speaks once in heavy stuttering mode.\n" +
                    "<b>/s4</b> (stuffhere) = speaks once in total stuttering mode.\n" +
                    "<b>/stutter</b> (stuttermode) = forces a specific stuttering mode. *\n" +
                    "<b>/talk</b> (talkmode) = forces a specific talk mode. *\n" +
                    "<b>/whisper</b> (target) (message): sends whisper to specified target.</p>"
                );
            }
            if (args === "visual") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Visual commands - * = more info when using\n" +
                    "<b>/bg1</b> = adds hidden backgrounds to the admin selection screen. Tip for BCX users: activate BCX before login.\n" +
                    "<b>/bg2</b> (number) = uses a hidden platform background. Number between 1 and 86. /bg2 to get the list.\n" +
                    "<b>/blur</b> (blurlevel) = forces a specific blur level.\n" +
                    "<b>/colorchanger</b> (animhere) = gets an animation with color change. *\n" +
                    "<b>/pose2</b> (posehere) (target) = changes the pose of any player. *\n" +
                    "<b>/trsee</b> (visor) (deafening module) (chin strap) = changes the settings of a worn Techno Helmet. * \n" +
                    "<b>/vrsee</b> (background) (mode) (game) = changes the settings of a worn VR Headset. *</p>"
                );
            }
            if (args === "zones") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Zones commands:\n" +
                    "<b>/asylum</b> (minutes) = enters asylum, bypasses requirements. Specify minutes if you are a patient.\n" +
                    "<b>/chess</b> (difficulty) = starts chess, must specify difficulty first (1 easy - 2 normal - 3 hard).\n" +
                    "<b>/college</b> = enters college, bypasses requirements.\n" +
                    "<b>/game</b> (minigamehere) = launches a minigame. Using will give more info.\n" +
                    "<b>/ggts</b> (minutes) (level) = enters ggts training in asylum for the specified time. Level must be between 1 and 6.\n" +
                    "<b>/keydeposit</b> (hours) = keeps your keys safe in the vault.\n" +
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
	    if (Player.Nickname == '') {
                var tmpname = Player.Name;
            } else {
                var tmpname = Player.Nickname;
            }
            if (args === "") {
                if (Underwear == undefined) {
                    var message = "Magical lasers put " + tmpname + " in random underwear."
                } else {    
                    if (Underwear != "") {
                        var message = tmpname + ' '.repeat(1) + Underwear;
                    } else {
                        var message = "Magical lasers put " + tmpname + " in random underwear."
                    }
                }
                ServerSend("ChatRoomChat", {
                    Content: "Beep",
                    Type: "Action",
                    Dictionary: [{
                        Tag: "Beep",
                        Text: message
                    }]
                });
                CharacterRandomUnderwear(Player);
                ChatRoomCharacterUpdate(Player);
            } else {
                var targetname = args;
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].AllowItem == true)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
		    if (Tunderwear == undefined) {
                        var message = "Magical lasers put " + tgpname + " in random underwear."
                    } else {      
                        if (Tunderwear != "") {
                            var message = tmpname + ' '.repeat(1) + Tunderwear + ' '.repeat(1) + tgpname;
                        } else {
                            var message = "Magical lasers put " + tgpname + " in random underwear."
                        }
                    }
                    ServerSend("ChatRoomChat", {
                        Content: "Beep",
                        Type: "Action",
                        Dictionary: [{
                            Tag: "Beep",
                            Text: message
                        }]
                    });
                    CharacterRandomUnderwear(target[0]);
                    ChatRoomCharacterUpdate(target[0]);
                    ChatRoomSetTarget(null);
                }
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
		if (Player.Nickname == '') {
                    var tmpname = Player.Name;
                } else {
                    var tmpname = Player.Nickname;
                }
                var stringUnlock1 = args;
                var stringUnlock2 = stringUnlock1.split(/[ ,]+/);
                var lk = stringUnlock2[1];
                var targetname = stringUnlock2[0];
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].AllowItem == true)) {
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
                                var message = tmpname + ' '.repeat(1) + Unlock;
                            } else {
                                var message = "Magical lasers make disappear locks on " + tgpname + "'s body."
                            }
                        }
                    } else {
                        if (Tunlock == undefined) {
                            var message = "Magical lasers make disappear locks on " + tgpname + "'s body."
                        } else {    
                            if (Tunlock != "") {
                                var message = tmpname + ' '.repeat(1) + Tunlock;
                            } else {
                                var message = "Magical lasers make disappear locks on " + tgpname + "'s body."
                            }
                        }
                    }
                    ServerSend("ChatRoomChat", {
                        Content: "Beep",
                        Type: "Action",
                        Dictionary: [{
                            Tag: "Beep",
                            Text: message
                        }]
                    });
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
                    ChatRoomSetTarget(null);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'unrestrict',
        Description: "(option): removes all restrictions from game.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The unrestrict command removes all restrictions from game. It must be followed by an option.\n" +
                    "Submissives: type <b>/unrestrict soft</b>\n" +
                    "Other players: type <b>/unrestrict total</b></p>"
                );
            } else if (args === "soft") {
                InventoryGroupIsBlocked = function(C, GroupName) {
                    return false;
                }
                InventoryPrerequisiteMessage = function(C, Prerequisit) {
                    if (Prerequisit == 'HasBreasts') {
                        return !InventoryIsItemInList(C, "BodyUpper", ["XLarge", "Large", "Normal", "Small"]) ? "MustHaveBreasts" : "";
                    } else if (Prerequisit == 'HasFlatChest') {
                        return !InventoryIsItemInList(C, "BodyUpper", ["FlatSmall", "FlatMedium"]) ? "MustHaveFlatChest" : "";
                    } else if (Prerequisit == 'HasPenis') {
                        return !InventoryIsItemInList(C, "Pussy", ["Penis"]) ? "MustHavePenis" : "";
                    } else if (Prerequisit == 'HasVagina') {
                        return !InventoryIsItemInList(C, "Pussy", ["PussyLight1", "PussyLight2", "PussyLight3", "PussyDark1", "PussyDark2", "PussyDark3"]) ? "MustHaveVagina" : "";
                    } else {
                        return "";
                    }
                }
                Player.GameplaySettings.BlindDisableExamine = false;
                Asset.forEach(e => {
                    if (e.Value < 0) e.Value = 1;
                });
                Player.Inventory.forEach(item => item.Asset.Enable = true);
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: Unrestricted softly. Can do most things you couldn't do before.\n" +
                    "Store also includes hidden items. This can only be reset via a full relog.</p>"
                );
            } else if (args === "total") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: Unrestricted totally. Can do most things you couldn't do before.\n" +
                    "Store also includes hidden items. This can only be reset via a full relog.</p>"
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
                InventoryPrerequisiteMessage = function(C, Prerequisit) {
                    if (Prerequisit == 'HasBreasts') {
                        return !InventoryIsItemInList(C, "BodyUpper", ["XLarge", "Large", "Normal", "Small"]) ? "MustHaveBreasts" : "";
                    } else if (Prerequisit == 'HasFlatChest') {
                        return !InventoryIsItemInList(C, "BodyUpper", ["FlatSmall", "FlatMedium"]) ? "MustHaveFlatChest" : "";
                    } else if (Prerequisit == 'HasPenis') {
                        return !InventoryIsItemInList(C, "Pussy", ["Penis"]) ? "MustHavePenis" : "";
                    } else if (Prerequisit == 'HasVagina') {
                        return !InventoryIsItemInList(C, "Pussy", ["PussyLight1", "PussyLight2", "PussyLight3", "PussyDark1", "PussyDark2", "PussyDark3"]) ? "MustHaveVagina" : "";
                    } else {
                        return "";
                    }
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
	    if (Player.Nickname == '') {
                var tmpname = Player.Name;
            } else {
                var tmpname = Player.Nickname;
            }	
            if (args === "") {
                if (Untie == undefined) {
                    var message = "Magical lasers make disappear the bindings on " + tmpname + "'s body."
                } else {    
                    if (Untie != "") {
                        var message = tmpname + ' '.repeat(1) + Untie;
                    } else {
                        var message = "Magical lasers make disappear the bindings on " + tmpname + "'s body."
                    }
                }
                ServerSend("ChatRoomChat", {
                    Content: "Beep",
                    Type: "Action",
                    Dictionary: [{
                        Tag: "Beep",
                        Text: message
                    }]
                });
                CharacterRelease(Player);
                ChatRoomCharacterUpdate(Player);
            } else {
                var targetname = args;
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].AllowItem == true)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
		    if (Tuntie == undefined) {
                        var message = "Magical lasers make disappear the bindings on " + tgpname + "'s body."
                    } else {      
                        if (Tuntie != "") {
                            var message = tmpname + ' '.repeat(1) + Tuntie + ' '.repeat(1) + tgpname;
                        } else {
                            var message = "Magical lasers make disappear the bindings on " + tgpname + "'s body."
                        }
                    }
                    ServerSend("ChatRoomChat", {
                        Content: "Beep",
                        Type: "Action",
                        Dictionary: [{
                            Tag: "Beep",
                            Text: message
                        }]
                    });
                    CharacterRelease(target[0]);
                    ChatRoomCharacterUpdate(target[0]);
                    ChatRoomSetTarget(null);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'visible',
        Description: ": back to visible state after using of an invisible command.",
        Action: (args) => {
            if (Player.Nickname == '') {
                var tmpname = Player.Name;
            } else {
                var tmpname = Player.Nickname;
            }
            ServerSend("ChatRoomChat", {
                Content: "Beep",
                Type: "Action",
                Dictionary: [{
                    Tag: "Beep",
                    Text: "" + tmpname + " suddenly is visible for everybody."
                }]
            });
            if (InventoryGet(Player, "ItemButt") != null) {
                if (InventoryGet(Player, "ItemButt").Asset.Name == "AnalHook") {
                    InventoryRemove(Player, "ItemButt");
                }
            }
            if (InventoryGet(Player, "Mask") != null) {
                if (InventoryGet(Player, "Mask").Asset.Name == "Glitter") {
                    InventoryRemove(Player, "Mask");
                }
            }
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
        Tag: 'welcome',
        Description: ": toggles UBC welcome message in main hall.",
        Action: () => {
            if (WelcomeOn == true) {
                WelcomeOn = false;
                M_MOANER_saveControls();
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: No welcome message in main hall.</p>"
                );
            } else {
                WelcomeOn = true;
                M_MOANER_saveControls();
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: Welcome message in main hall.</p>"
                );
            }
        }
    }])

    CommandCombine([{
        Tag: 'whisper',
        Description: "(target) (message): sends whisper to specified target.",
        Action: (_, command, args) => {
            if (NowhisperOn == false) {
                var [targetname] = args;
                if (!targetname) {
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The whisper command must be followed by a target and the message you want to whisper.<p>"
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
        Tag: 'wrobe',
        Description: "(target): opens target wardrobe.",
        Action: (args) => {
            if (args === "") {
                ChatRoomClickCharacter(Player);
                DialogChangeClothes();
            } else {
                var targetname = args;
                var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    var targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if (target[0] != null) {
                    target[0].OnlineSharedSettings.AllowFullWardrobeAccess = true;
                    target[0].OnlineSharedSettings.BlockBodyCosplay = false;
                    ChatRoomClickCharacter(target[0]);
                    DialogChangeClothes();
                }
            }
        }
    }])

})();
