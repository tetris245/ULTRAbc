// ==UserScript==
// @name ULTRAbc
// @namespace https://www.bondageprojects.com/
// @version 5.5
// @description Everything you'll ever need for BC
// @author Nemesea
// @match https://bondageprojects.elementfx.com/*
// @match https://www.bondageprojects.elementfx.com/*
// @match https://bondage-europe.com/*
// @match https://www.bondage-europe.com/*
// @match https://bondageprojects.com/*
// @match https://www.bondageprojects.com/*
// @match http://localhost:*/*
// @icon data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant none
// @run-at document-end
// ==/UserScript==

// Includes a section under GPLv3 license
/**
 *     BCTweaks
 *  Copyright (C) 2024 agicitag - Modified by Nemesea for ULTRAbc
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

//SDK stuff
var bcModSDK=function(){"use strict";const o="1.2.0";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return!!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const i=new Map,a=new Set;function c(o){a.has(o)||(a.add(o),console.warn(o))}function s(o){const e=[],t=new Map,n=new Set;for(const r of f.values()){const i=r.patching.get(o.name);if(i){e.push(...i.hooks);for(const[e,a]of i.patches.entries())t.has(e)&&t.get(e)!==a&&c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${a}`),t.set(e,a),n.add(r.name)}}e.sort(((o,e)=>e.priority-o.priority));const r=function(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}(o.original,t);let i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,o.name,n),c=r.apply(this,e);return null==a||a(),c};for(let t=e.length-1;t>=0;t--){const n=e[t],r=i;i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,o.name,n.mod),c=n.hook.apply(this,[e,o=>{if(1!==arguments.length||!Array.isArray(e))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`);return r.call(this,o)}]);return null==a||a(),c}}return{hooks:e,patches:t,patchesSources:n,enter:i,final:r}}function l(o,e=!1){let r=i.get(o);if(r)e&&(r.precomputed=s(r));else{let e=window;const a=o.split(".");for(let t=0;t<a.length-1;t++)if(e=e[a[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const c=e[a[a.length-1]];if("function"!=typeof c)throw new Error(`ModSDK: Function ${o} to be patched not found`);const l=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o}return((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(c.toString().replaceAll("\r\n","\n")),d={name:o,original:c,originalHash:l};r=Object.assign(Object.assign({},d),{precomputed:s(d),router:()=>{},context:e,contextProperty:a[a.length-1]}),r.router=function(o){return function(...e){return o.precomputed.enter.apply(this,[e])}}(r),i.set(o,r),e[r.contextProperty]=r.router}return r}function d(){for(const o of i.values())o.precomputed=s(o)}function p(){const o=new Map;for(const[e,t]of i)o.set(e,{name:e,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const f=new Map;function u(o){f.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),f.delete(o.name),o.loaded=!1,d()}function g(o,t){o&&"object"==typeof o||e("Failed to register mod: Expected info object, got "+typeof o),"string"==typeof o.name&&o.name||e("Failed to register mod: Expected name to be non-empty string, got "+typeof o.name);let r=`'${o.name}'`;"string"==typeof o.fullName&&o.fullName||e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`),r=`'${o.fullName} (${o.name})'`,"string"!=typeof o.version&&e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`),o.repository||(o.repository=void 0),void 0!==o.repository&&"string"!=typeof o.repository&&e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`),null==t&&(t={}),t&&"object"==typeof t||e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`);const i=!0===t.allowReplace,a=f.get(o.name);a&&(a.allowReplace&&i||e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(a));const c=o=>{let e=g.patching.get(o.name);return e||(e={hooks:[],patches:new Map},g.patching.set(o.name,e)),e},s=(o,t)=>(...n)=>{var i,a;const c=null===(a=(i=m.errorReporterHooks).apiEndpointEnter)||void 0===a?void 0:a.call(i,o,g.name);g.loaded||e(`Mod ${r} attempted to call SDK function after being unloaded`);const s=t(...n);return null==c||c(),s},p={unload:s("unload",(()=>u(g))),hookFunction:s("hookFunction",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);"number"!=typeof t&&e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`);const s={mod:g.name,priority:t,hook:n};return a.hooks.push(s),d(),()=>{const o=a.hooks.indexOf(s);o>=0&&(a.hooks.splice(o,1),d())}})),patchFunction:s("patchFunction",((o,t)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);n(t)||e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`);for(const[n,i]of Object.entries(t))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`);d()})),removePatches:s("removePatches",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const t=l(o);c(t).patches.clear(),d()})),callOriginal:s("callOriginal",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`);const i=l(o);return Array.isArray(t)||e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`),i.original.apply(null!=n?n:globalThis,t)})),getOriginalHash:s("getOriginalHash",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`);return l(o).originalHash}))},g={name:o.name,fullName:o.fullName,version:o.version,repository:o.repository,allowReplace:i,api:p,loaded:!0,patching:new Map};return f.set(o.name,g),Object.freeze(p)}function h(){const o=[];for(const e of f.values())o.push({name:e.name,fullName:e.fullName,version:e.version,repository:e.repository});return o}let m;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:p,errorReporterHooks:Object.seal({apiEndpointEnter:null,hookEnter:null,hookChainExit:null})};return m=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}();
//SDKstuff end

(async function() {
    if (window.UBCver) {
        console.warn("ULTRAbc already loaded. No double loading");
        return;
    }

    const UBCver = "5.5";
    const UBCver0 = "5.4";
    const modApi = bcModSDK.registerMod({
        name: 'ULTRAbc',
        fullName: 'Ultra Bondage Club',
        version: UBCver,
        repository: 'https://github.com/tetris245/ULTRAbc',
    });

    //Main variables and settings for UBC and The Moaner
    window.UBCver = UBCver;
    let ini = 0;
    let kp = 0;

    let tmpname;
    let pronoun1;
    let pronoun2;
    let pronoun3;
    let pronoun4;
    let tgpname;
    let tgpr1;
    let tgpr2;
    let tgpr3;
    let tgpr4;
    const umsg1 = "Your command can't be executed because ";
    const umsg2 = " has enabled the Uwall protection.";
    const umsg3 = "you are in no-escape mode.";
    const umsg4 = "Your message can't be sent because it does not respect the rules of doll talk.";
    const umsg5 = "This room does not use the map feature.";
    const umsg6 = " Better use the <b>/uroom</b> command.";
    const umsg7 = "you are in silent mode.";
    const umsg8 = "Your very tight collar or a LSCG spell prevents you to talk.";

    const M_MOANER_moanerKey = "bc_moaner_";
    let M_MOANER_scriptOn = false;
    let M_MOANER_cum = false;
    let profile;
    let profileName;
    let ahybrid = false;
    let animal = 0;
    let bgall = false;
    let bl = 0;
    let blindness = 0;
    let blurmode = 0;
    let ccards = 30;
    let cdeck = 0;
    let cextra = false;
    let cfame = 150;
    let frname = "BrickWall";
    let gamestable = false;
    let gl = 0;
    let hearing = 0;
    let maptrap1 = 0;
    let mgl = 0;
    let npcdeck = -1;
    let onegl = 0;
    let pchat = false;
    let pmin = 2;
    let pmax = 20;
    let rchat = false;
    let rgame = 0;
    let rhide = false;
    let rmin = 2;
    let rsize = 20;
    let rtype = "ALL";
    let silent = false;
    let st = 0;
    let tcname = "Cell";
    let tintcolor = "#000000";
    let tintlevel = 0;
    let tintmbs = false;
    let tintnever = false;

    let asylumlimit;
    let autojoin;
    let dolltalk;
    let extbuttons;
    let extrainfo;
    let fixperm;
    let frkeys;
    let fullseed;
    let highfame;
    let hotkeys;
    let magiccheat;
    let magictoys;
    let mapcheat;
    let mapfull;
    let mapfull2;
    let noescape;
    let nogarble;
    let nostruggle;
    let noteleport;
    let notimeout;
    let notimeout2;
    let noubccolor;
    let nowhisper = false;
    let nowhrange;
    let npcpunish = false;
    let outbuttons;
    let rglbuttons;
    let rglsync;
    let slowleave;
    let sosbuttons;

    let blureffect = 0;
    let notalk = 0;
    let reaction = 0;
    let unrestrict = 0;
    let usoft = false;
    let utotal = false;

    let Clothes = "";
    let Invisible = "";
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
    let Visible = "";

    let Tclothes = "";
    let Tinvisible = "";
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
    let Tvisible = "";

    let M_MOANER_orgasmActive = true;
    let M_MOANER_spankActive = true;
    let M_MOANER_talkActive = true;
    let M_MOANER_tickleActive = true;
    let M_MOANER_vibratorActive = true;
    let M_MOANER_whisperActive = false;
    let M_MOANER_xvibratorActive = false;

    //BC Slots
    const body1 = ["Activity", "ArmsLeft", "ArmsRight", "Blush", "BodyLower", "BodyMarkings", "BodyUpper", "Emoticon", "Eyebrows", "Eyes", "Eyes2", "EyeShadow", "Face", "FaceMarkings", "FacialHair", "Fluids", "HairBack", "HairFront", "HandsLeft", "HandsRight", "Head", "Height", "Mouth", "Nipples", "Pronouns", "Pussy"];

    const body2 = ["\u{52A8}\u{7269}\u{8EAB}\u{4F53}_Luzi", "\u{65B0}\u{540E}\u{53D1}_Luzi", "BodyMarkings2_Luzi", "\u{989D}\u{5916}\u{5934}\u{53D1}_Luzi", "\u{65B0}\u{524D}\u{53D1}_Luzi", "\u{989D}\u{5916}\u{8EAB}\u{9AD8}_Luzi", "\u{5DE6}\u{773C}_Luzi", "Liquid2_Luzi", "\u{53F3}\u{773C}_Luzi", "\u{8EAB}\u{4F53}\u{75D5}\u{8FF9}_Luzi"];

    /*AlterBody = "\u{52A8}\u{7269}\u{8EAB}\u{4F53}_Luzi"
    BackHair = "\u{65B0}\u{540E}\u{53D1}_Luzi"
    BodyMarkings = "BodyMarkings2_Luzi"
    ExtraHair = "\u{989D}\u{5916}\u{5934}\u{53D1}_Luzi"
    FrontHair = "\u{65B0}\u{524D}\u{53D1}_Luzi"
    HeightAdjust = "\u{989D}\u{5916}\u{8EAB}\u{9AD8}_Luzi"
    LeftEye = "\u{5DE6}\u{773C}_Luzi"
    Liquid = "Liquid2_Luzi"
    RightEye = "\u{53F3}\u{773C}_Luzi"
    WhipMarks = "\u{8EAB}\u{4F53}\u{75D5}\u{8FF9}_Luzi"*/

    const clothes1 = ["AnkletLeft", "AnkletRight", "Bra", "Bracelet", "Cloth", "ClothAccessory", "ClothLower", "ClothOuter", "Corset", "Garters", "Glasses", "Gloves", "HandAccessoryLeft", "HandAccessoryRight", "Hat", "Jewelry", "Mask", "Necklace", "Panties", "Shoes", "Socks", "SocksLeft", "SocksRight", "Suit", "SuitLower"];

    const clothes2 = ["\u{52A8}\u{7269}\u{8EAB}\u{4F53}_Luzi", "Bra_\u{7B28}\u{7B28}\u{86CB}Luzi", "ClothAccessory_\u{7B28}\u{7B28}\u{86CB}Luzi", "ClothAccessory_\u{7B28}\u{7B28}\u{7B28}\u{86CB}Luzi2", "Cloth_\u{7B28}\u{7B28}\u{86CB}Luzi", "Cloth_\u{7B28}\u{7B28}\u{7B28}\u{86CB}Luzi2", "ClothLower_\u{7B28}\u{7B28}\u{86CB}Luzi", "ClothLower_\u{7B28}\u{7B28}\u{7B28}\u{86CB}Luzi2", "Gloves_\u{7B28}\u{7B28}\u{86CB}Luzi", "Hat_\u{7B28}\u{7B28}\u{86CB}Luzi", "\u{957F}\u{8896}\u{5B50}_Luzi", "Mask_\u{7B28}\u{7B28}\u{86CB}Luzi", "Necklace_\u{7B28}\u{7B28}\u{86CB}Luzi", "Panties_\u{7B28}\u{7B28}\u{86CB}Luzi", "Shoes_\u{7B28}\u{7B28}\u{86CB}Luzi"];

    const cosplay1 = ["HairAccessory1", "HairAccessory2", "HairAccessory3", "TailStraps", "Wings"];

    const cosplay2 = ["HairAccessory3_\u{7B28}\u{7B28}\u{86CB}Luzi", "Luzi_HairAccessory3_1", "Luzi_HairAccessory3_2", "Wings_\u{7B28}\u{7B28}\u{86CB}Luzi"];

    const restraints = ["ItemAddon", "ItemArms", "ItemBoots", "ItemDevices", "ItemEars", "ItemFeet", "ItemHands", "ItemHead", "ItemHood", "ItemLegs", "ItemMouth", "ItemMouth2", "ItemMouth3", "ItemNeck", "ItemNeckRestraints", "ItemNose", "ItemTorso", "ItemTorso2"];

    const toys = ["ItemBreast", "ItemButt", "ItemHandHeld", "ItemMisc", "ItemNeckAccessories", "ItemNipples", "ItemNipplesPiercings", "ItemPelvis", "ItemVulva", "ItemVulvaPiercings"];

    const allbody = body1.concat(body2);
    const allclothes = clothes1.concat(clothes2);
    const allcosplay = cosplay1.concat(cosplay2);
    const allitems = restraints.concat(toys);

    const bclevel1 = body1;
    const bclevel2 = bclevel1.concat(cosplay1);
    const bclevel3 = bclevel2.concat(clothes1);
    const bclevel4 = bclevel3.concat(restraints);
    const bclevel5 = bclevel4.concat(toys);

    const echolevel1 = allbody;
    const echolevel2 = echolevel1.concat(allcosplay);
    const echolevel3 = echolevel2.concat(allclothes);
    const echolevel4 = echolevel3.concat(restraints);
    const echolevel5 = echolevel4.concat(toys);

    //Club Card Game
    const ClubCardBuilderPetDeck = [1000, 1001, 1004, 1006, 1007, 1010, 1011, 1012, 1014, 1020, 2000, 2002, 4000, 4010, 4011, 6000, 6001, 6002, 6003, 6004, 6006, 6008, 8000, 12005, 14000, 14001, 14002, 14003, 14004, 14005];
          
    const ClubCardBuilderShibariDeck = [1000, 1001, 1004, 1006, 1007, 1010, 1011, 1012, 1014, 1020, 2000, 2002, 4000, 4007, 4009, 6000, 6001, 6002, 6003, 6004, 6006, 6008, 12003, 13000, 13001, 13002, 13003, 13004, 13005, 13006];

    const ClubCardBuilderExtraDeck = [1000, 1001, 1002, 1003, 1004, 1006, 1007, 1015, 1017, 2000, 3008, 5005, 6005, 7007, 8005, 11000, 11001, 11002, 11003, 11008, 11009, 11010, 12000, 12001, 12002, 12004, 30012, 30013, 30021, 30022];

    const DefaultDeckPlus = [4007, 4009, 12003, 13000, 13002, 13003, 13004, 13005, 13006, 30013];
    const ABDLDeckPlus = [1017, 1018, 3012, 4008, 10006, 10007, 10008, 10009, 31007, 31009];
    const AsylumDeckPlus = [7008, 7009, 7010, 7011, 11013, 12001, 30015, 30017, 30019, 31011];
    const CollegeDeckPlus = [11000, 11001, 11002, 11003, 11008, 11009, 11010, 11011, 11012, 31008];          
    const DominantDeckPlus = [2000, 2002, 2003, 8005, 10004, 10009, 11012, 12003, 30021, 31012];
    const LiabilityDeckPlus = [1018, 4001, 4008, 4009, 4011, 6005, 6007, 7009, 7010, 10008];
    const MaidDeckPlus = [1017, 6005, 6006, 6007, 6008, 6009, 6010, 6011, 12002, 14003];
    const PetDeckPlus = [14006, 14007, 14008, 14009, 14010, 14011, 14012, 14013, 31022, 31026];
    const PornDeckPlus = [4002, 4007, 5005, 5006, 5007, 5008, 31028, 31029, 31030, 31031];
    const ShibariDeckPlus = [30013, 31013, 31014, 31015, 31016, 31017, 31018, 31019, 31020, 31021];          
    const ExtraDeckPlus = [4009, 7008, 9004, 10004, 12003, 12005, 12006, 12007, 12008, 14003];

    //Items for pet command
    const petitems1 = ["ArmbinderJacket", "BitchSuit", "Bolero", "BoxTieArmbinder", "Chains", "FullLatexSuit", "HempRope", "InflatableStraightLeotard", "LatexBoxtieLeotard", "LatexButterflyLeotard", "LatexSleevelessLeotard", "LeatherStraitJacket", "PantyhoseBody", "PantyhoseBodyOpen", "SeamlessStraitDress", "SeamlessStraitDressOpen", "StraitLeotard", "StrictLeatherPetCrawler"];

    const petitems2 = ["Antennae", "BunnyEars1", "BunnyEars2", "CowHorns", "Ears1", "Ears2", "ElfEars", "FoxEars1", "FoxEars2", "FoxEars3", "KittenEars1", "KittenEars2", "MouseEars1", "MouseEars2", "PonyEars1", "PuppyEars1", "PuppyEars2", "RaccoonEars1", "WolfEars1", "WolfEars2"];

    const petitems3 = ["CowtailStrap", "FoxTailsStrap", "FoxTailStrap1", "FoxTailStrap2", "HorseTailStrap", "HorseTailStrap1", "KittenTailStrap1", "KittenTailStrap2", "MouseTailStrap1", "MouseTailStrap2", "PuppyTailStrap", "PuppyTailStrap1", "RaccoonStrap", "WolfTailStrap1", "WolfTailStrap2", "WolfTailStrap3"];

    //Locks
    const locks = ["", "MetalPadlock", "ExclusivePadlock", "IntricatePadlock", "HighSecurityPadlock", "PandoraPadlock", "MistressPadlock", "LoversPadlock", "OwnerPadlock", "TimerPadlock", "CombinationPadlock", "SafewordPadlock", "PasswordPadlock", "MistressTimerPadlock", "LoversTimerPadlock", "OwnerTimerPadlock", "TimerPasswordPadlock", "Best Friend Padlock", "Best Friend Timer Padlock", "FamilyPadlock", "\u{6DEB}\u{7EB9}\u{9501}_Luzi_Padlock", "DeviousPadlock", "PortalLinkPadlock"];

    //Animal Talk Profiles
    let animalmode1 = ["hoo", "honk", "hooink", "hoink", "hoiink", "hum", "yum", "huumm", "yuuum"];
    let animalmode2 = ["mo", "moo", "mooo", "mu", "muu", "moooo"];
    let animalmode3 = ["wif", "yif", "wiif", "yiif", "wiff", "yiff", "aou", "waou", "awaou"];
    let animalmode4 = ["meow", "meoow", "meooow", "meeow", "meeeow", "mnyaa", "mew", "meew", "meeew"];
    let animalmode5 = ["cou", "coui", "couic", "koui", "kouii", "scoui", "scouic"];
    let animalmode6 = ["gru", "grui", "gruik", "gruiik", "gruiii", "groi"];
    let animalmode7 = ["nei", "neigh", "neighh", "neighhhh", "whin", "whinny", "whinney"];
    let animalmode8 = ["wof", "woof", "wuf", "wooof", "awo", "awoo", "woo"];
    let animalmode9 = ["owo", "owoo", "whoo", "owoooo", "howl", "howll", "hoowl"];

    const animalModes = [null, animalmode1, animalmode2, animalmode3, animalmode4, animalmode5, animalmode6, animalmode7, animalmode8, animalmode9];

    //Moaner Default Profile
    let M_MOANER_profileName = "default";

    let M_MOANER_defaultMoans = {
        "hot": ["n... Nyah\u2665", "Oooh", "mmmmmh!", "NYyaaA\u2665"],
        "medium": ["mm", "aaaah", "nyAh\u2665"],
        "light": ["nyah\u2665", "Aah!", "mh", "oh!\u2665", "mh\u2665"],
        "low": ["mh", "\u2665oh\u2665", "ah", "...\u2665"],
        "orgasm": ["Nya...Ny...NyaaAAaah!", "Mmmmh... MMmh... Hhhmmmm...", "Oooooh... Mmmmh... OooOOOOh!", "Mmmhnn... Nyhmm... Nyah!"],
        "pain": ["Aie!", "Aoouch!", "Aaaaie!", "Ouch", "Aow"],
        "tickle": ["Hahaha!", "Mmmmhahaha!", "Muhahah...", "Ha!Ha!"]
    }

    let M_MOANER_customMoans = {
        "hot": [],
        "medium": [],
        "light": [],
        "low": [],
        "orgasm": [],
        "pain": [],
        "tickle": []
    }

    let M_MOANER_moansProfiles = [];

    //Moaner Profiles Management
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
        let pleasureMoans = M_MOANER_moansProfiles[name];
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

    M_MOANER_addMoansProfile("default", M_MOANER_defaultMoans);

    //Moaner Custom Profiles
    //bunny
    M_MOANER_bunnyMoans = {
        "hot": ["o... Hoiink\u2665", "YuuumM\u2665"],
        "medium": ["hoinK\u2665", "huumm", "..hooink"],
        "light": ["honk\u2665", "Hum!", "yum", "hoo\u2665"],
        "low": ["hoo", "ho\u2665", "ho", "\u2665yum\u2665", "hum\u2665"],
        "orgasm": ["Yum...Hum...YuuuuuMMMM!", "Hooiiinnk... Huuum... Yuuum!", "honkk... hoooiiink.... hoiiiiinnk!"],
        "pain": [],
        "tickle": []
    }
    M_MOANER_addMoansProfile("bunny", M_MOANER_bunnyMoans);

    //cow  
    M_MOANER_cowMoans = {
        "hot": ["m... Moooo\u2665", "Moooo\u2665"],
        "medium": ["moooo\u2665", "Mooo", "..muu"],
        "light": ["Mooo\u2665", "Muu!", "mu\u2665iif", "Mooo"],
        "low": ["moo", "Mo\u2665", "mu\u2665", "\u2665mu\u2665", "Mu\u2665"],
        "orgasm": ["Moooo\u2665 M... Mooo... MOOO!!", "Mmmhnn... Moooo... Moooooo!!", "mmmh... Muuuu.... Muuuuuu!"],
        "pain": [],
        "tickle": []
    }
    M_MOANER_addMoansProfile("cow", M_MOANER_cowMoans);

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

    //pony
    M_MOANER_ponyMoans = {
        "hot": ["n... Neighh\u2665", "NeighhH\u2665"],
        "medium": ["neighh\u2665", "neigh", "..whinney"],
        "light": ["neigh\u2665", "Whin!", "neigh", "whinny\u2665"],
        "low": ["neigh", "whin\u2665", "nei", "\u2665nei\u2665", "nei\u2665"],
        "orgasm": ["Neigh...Nei...Neighhhhh!", "Neighhh... Neighh... Neigh!", "whin... whinnyy.... whinnnnney!"],
        "pain": [],
        "tickle": []
    }
    M_MOANER_addMoansProfile("pony", M_MOANER_ponyMoans);

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

    //wolf
    M_MOANER_wolfMoans = {
        "hot": ["o... Woooooo\u2665", "hoowl\u2665"],
        "medium": ["owoooo\u2665", "hoo\u016b\u016b\n", "..howll"],
        "light": ["Whoo\u2665", "Howl!", "Owo\u2665oo", "Ho\u016bwl\u2665"],
        "low": ["owo..", "howl\u2665", "Who\u2665", "\u2665ow\u016boo\u2665", "ow\u016bo\u2665"],
        "orgasm": ["whoo\u2665 H... Ooow... Whooo!!", "Hoowl... whoo... Owooooooooh!!", "whoo... Hooowl.... Owhoooooo!"],
        "pain": [],
        "tickle": []
    }
    M_MOANER_addMoansProfile("wolf", M_MOANER_wolfMoans);

    //Initialisation
    function UBCdefault() {
        ahybrid = false;
        animal = 0;
        asylumlimit = false;
        autojoin = false;
        bgall = false;
        bl = 0;
        blureffect = 0;
        ccards = 30;
        cdeck = 0;
        cextra = false;
        cfame = 150;
        dolltalk = false;
        extbuttons = false;
        extrainfo = false;
        fixperm = false;
        fullseed = false;
        frkeys = false;
        gl = 0;
        highfame = false;
        hotkeys = false;
        magiccheat = false;
        magictoys = false;
        mapcheat = false;
        mapfull = false;
	mapfull2 = false;
        maptrap1 = 0;
        noescape = false;
        nogarble = false;
        nostruggle = false;
        notalk = 0;
	noteleport = false;
        notimeout = false;
        notimeout2 = false;
        noubccolor = false;
        nowhisper = false;
        nowhrange = false;
	npcdeck = -1;
        npcpunish = false;
        outbuttons = false;
        pchat = false;
        pmin = 2;
        pmax = 20;
        rchat = false;
        rglbuttons = false;
        rglsync = false;
        rmin = 2;
        rsize = 20;
        rtype = "ALL";
        silent = false;
        slowleave = false;
        sosbuttons = false;
        st = 0;
        tintcolor = "#000000";
        tintlevel = 0;
        tintmbs = false;
        tintnever = false;
        usoft = false;
        utotal = false;
    }

    function messageDefault() {
        Clothes = "";
        Invisible = "";
        Mlock = "";
        Naked = "";
        Pet = "";
        Randomize = "";
        Restrain = "";
        Solidity = "";
        Tclothes = "";
        Tinvisible = "";
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
        Tvisible = "";
        Underwear = "";
        Unlock = "";
        Untie = "";
        Visible = "";
    }

    function UBCdata(data) {
        ahybrid = data.ahybrid;
        animal = data.animal * 1;
        asylumlimit = data.asylumlimit;
        autojoin = data.autojoin;
        bgall = data.bgall;
        bl = data.bl;
        blureffect = 0;
        ccards = data.ccards * 1;
        cdeck = data.cdeck * 1;
        cextra = data.cextra;
        cfame = data.cfame;
        dolltalk = data.dolltalk;
        extbuttons = data.extbuttons;
        extrainfo = data.extrainfo;
        fixperm = data.fixperm;
        fullseed = data.fullseed;
        frkeys = data.frkeys;
        gl = data.gaglevel * 1;
        highfame = data.highfame;
        hotkeys = data.hotkeys;
        magiccheat = data.magiccheat;
        magictoys = data.magictoys;
        mapcheat = data.mapcheat;
        mapfull = data.mapfull;
	mapfull2 = data.mapfull2;
        maptrap1 = data.maptrap1 * 1;
        noescape = data.noescape;
        nogarble = data.nogarble;
        nostruggle = data.nostruggle;
        notalk = data.notalk;
        noteleport = data.noteleport;
        notimeout = data.notimeout;
        notimeout2 = data.notimeout2;
        noubccolor = data.noubccolor;
        nowhisper = data.nowhisper;
        nowhrange = data.nowhrange;
	npcdeck = data.npcdeck * 1;
        npcpunish = data.npcpunish;
        outbuttons = data.outbuttons;
        pchat = data.pchat;
        pmin = data.pmin * 1;
        pmax = data.pmax * 1;
        rchat = data.rchat;
        rglbuttons = data.rglbuttons;
        rglsync = data.rglsync;
        rmin = data.rmin * 1;
        rsize = data.rsize * 1;
        rtype = data.rtype;
        silent = data.silent;
        slowleave = data.slowleave;
        sosbuttons = data.sosbuttons;
        st = data.stutterlevel * 1;
        tintcolor = data.tintcolor;
        tintlevel = data.tintlevel;
        tintmbs = data.tintmbs;
        tintnever = data.tintnever;
        usoft = data.usoft;
        utotal = data.utotal;
    }

    function M_MOANER_initControls() {
        let data = JSON.parse(localStorage.getItem(M_MOANER_moanerKey + "_" + Player.MemberNumber));
        if (data == null || data == undefined) {
            UBCdefault();
            M_MOANER_orgasmActive = true;
            M_MOANER_scriptOn = false;
            M_MOANER_spankActive = true;
            M_MOANER_talkActive = true;
            M_MOANER_tickleActive = true;
            M_MOANER_vibratorActive = true;
            M_MOANER_whisperActive = false;
            M_MOANER_xvibratorActive = false;
            M_MOANER_cum = false;
            profile = 0;
            profileName = "default";
            tmpname = "";
            pronoun1 = "";
            pronoun2 = "";
            pronoun3 = "";
            pronoun4 = "";
            blindness = 0;
            blurmode = 0;
            frname = "BrickWall";
            gamestable = false;
            hearing = 0;
            mgl = 0;
            onegl = 0;
            reaction = 0;
            rgame = 0;
            rhide = false;
            tcname = "Cell";
            unrestrict = 0;
            messageDefault();
            M_MOANER_saveControls();
        } else {
            UBCdata(data);
            M_MOANER_orgasmActive = data.orgasmMoan;
            M_MOANER_scriptOn = data.script;
            M_MOANER_spankActive = data.spankMoan;
            M_MOANER_talkActive = data.talkMoan;
            M_MOANER_tickleActive = data.tickleMoan;
            M_MOANER_vibratorActive = data.vibeMoan;
            M_MOANER_whisperActive = data.whisperMoan;
            M_MOANER_xvibratorActive = data.xvibeMoan;
            M_MOANER_cum = data.cum;
            profile = data.profile;
            profileName = data.moanProfile;
            tmpname = data.tmpname;
            pronoun1 = data.pronoun1;
            pronoun2 = data.pronoun2;
            pronoun3 = data.pronoun3;
            pronoun4 = data.pronoun4;
            blindness = 0;
            blurmode = 0;
            frname = data.frname;
            gamestable = data.gamestable;
            hearing = 0;
            mgl = 0;
            onegl = 0;
            reaction = 0;
            rgame = data.rgame;
            rhide = data.rhide;
            tcname = data.tcname;
            unrestrict = 0;
            messageData(data);
        }
    }

    function M_MOANER_saveControls() {
        let controls = {
            "orgasmMoan": M_MOANER_orgasmActive,
            "script": M_MOANER_scriptOn,
            "spankMoan": M_MOANER_spankActive,
            "talkMoan": M_MOANER_talkActive,
            "tickleMoan": M_MOANER_tickleActive,
            "vibeMoan": M_MOANER_vibratorActive,
            "whisperMoan": M_MOANER_whisperActive,
            "xvibeMoan": M_MOANER_xvibratorActive,
            "cum": M_MOANER_cum,
            "profile": profile,
            "moanProfile": profileName,
            "tmpname": tmpname,
            "pronoun1": pronoun1,
            "pronoun2": pronoun2,
            "pronoun3": pronoun3,
            "pronoun4": pronoun4,
            "ahybrid": ahybrid,
            "animal": animal,
            "bgall": bgall,
            "bl": bl,
            "ccards": ccards,
            "cdeck": cdeck,
            "cextra": cextra,
            "cfame": cfame,
            "frname": frname,
            "gamestable": gamestable,
            "gaglevel": gl,
            "maptrap1": maptrap1,
            "npcdeck": npcdeck,
            "pchat": pchat,
            "pmin": pmin,
            "pmax": pmax,
            "rchat": rchat,
            "rgame": rgame,
            "rhide": rhide,
            "rmin": rmin,
            "rsize": rsize,
            "rtype": rtype,
            "silent": silent,
            "stutterlevel": st,
            "tcname": tcname,
            "tintcolor": tintcolor,
            "tintlevel": tintlevel,
            "tintmbs": tintmbs,
            "tintnever": tintnever,
            "asylumlimit": asylumlimit,
            "autojoin": autojoin,
            "dolltalk": dolltalk,
            "extbuttons": extbuttons,
            "extrainfo": extrainfo,
            "fixperm": fixperm,
            "frkeys": frkeys,
            "fullseed": fullseed,
            "highfame": highfame,
            "hotkeys": hotkeys,
            "magiccheat": magiccheat,
            "magictoys": magictoys,
            "mapcheat": mapcheat,
            "mapfull": mapfull,
            "mapfull2": mapfull2,
            "noescape": noescape,
            "nogarble": nogarble,
            "nostruggle": nostruggle,
            "noteleport": noteleport,
            "notimeout": notimeout,
            "notimeout2": notimeout2,
            "noubccolor": noubccolor,
            "nowhisper": nowhisper,
            "nowhrange": nowhrange,
            "npcpunish": npcpunish,
            "outbuttons": outbuttons,
            "rglbuttons": rglbuttons,
            "rglsync": rglsync,
            "slowleave": slowleave,
            "sosbuttons": sosbuttons,
            "blureffect": blureffect,
            "notalk": notalk,
            "reaction": reaction,
            "unrestrict": unrestrict,
            "clothes": Clothes,
            "invisible": Invisible,
            "mlock": Mlock,
            "naked": Naked,
            "pet": Pet,
            "randomize": Randomize,
            "restrain": Restrain,
            "solidity": Solidity,
            "tclothes": Tclothes,
            "tinvisible": Tinvisible,
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
            "tvisible": Tvisible,
            "underwear": Underwear,
            "unlock": Unlock,
            "untie": Untie,
            "visible": Visible
        };
        localStorage.setItem(M_MOANER_moanerKey + "_" + Player.MemberNumber, JSON.stringify(controls));
    }

    function M_MOANER_deleteControls() {
        kp = 1;
        for (var i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
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
		if (ahybrid == null || ahybrid == undefined) ahybrid = false;
                if (animal == null || animal == undefined) animal = 0;
                if (asylumlimit == null || asylumlimit == undefined) asylumlimit = false;                   
                if (autojoin == null || autojoin == undefined) autojoin = false;                  
                if (bgall == null || bgall == undefined) bgall = false;
                if (bl == null || bl == undefined) bl = 0;
                if (blindness == null || blindness == undefined) blindness = 0;
                if (blureffect == null || blureffect == undefined || blureffect == false) blureffect = 0;
                if (blurmode == null || blurmode == undefined) blurmode = 0;
                if (ccards == null || ccards == undefined) ccards = 30;
                if (cdeck == null || cdeck == undefined) cdeck = 0;                  
                if (cextra == null || cextra == undefined) cextra = false;
                if (cfame == null || cfame == undefined) cfame = 150;
                if (dolltalk == null || dolltalk == undefined) dolltalk = false;               
                if (extbuttons == null || extbuttons == undefined) extbuttons = false;                  
                if (extrainfo == null || extrainfo == undefined) extrainfo = false;                   
                if (fixperm == null || fixperm == undefined) fixperm = false;                  
                if (fullseed == null || fullseed == undefined) fullseed = false;                
                if (frkeys == null || frkeys == undefined) frkeys = false;
                if (frname == null || frname == undefined) frname = "BrickWall";
                if (gamestable == null || gamestable == undefined) gamestable = false;
                if (gl == null || gl == undefined) gl = 0;
                if (gl == -1) gl = 11;
                if (hearing == null || hearing == undefined) hearing = 0;
                if (highfame == null || highfame == undefined) highfame = false;                  
                if (hotkeys == null || hotkeys == undefined) hotkeys = false;                  
                if (magiccheat == null || magiccheat == undefined) magiccheat = false;               
                if (magictoys == null || magictoys == undefined) magictoys = false;                
                if (mapcheat == null || mapcheat == undefined) mapcheat = false;                   
                if (mapfull == null || mapfull == undefined) mapfull = false;   
		if (mapfull2 == null || mapfull2 == undefined) mapfull2 = false; 
                if (maptrap1 == null || maptrap1 == undefined) maptrap1 = 0;
                if (M_MOANER_cum == null || M_MOANER_cum == undefined || M_MOANER_cum == true) M_MOANER_cum = false;
                if (M_MOANER_orgasmActive == null || M_MOANER_orgasmActive == undefined) M_MOANER_orgasmActive = true;
                if (M_MOANER_scriptOn == null || M_MOANER_scriptOn == undefined) M_MOANER_scriptOn = false;
                if (M_MOANER_spankActive == null || M_MOANER_spankActive == undefined) M_MOANER_spankActive = true;
                if (M_MOANER_talkActive == null || M_MOANER_talkActive == undefined) M_MOANER_talkActive = true;
                if (M_MOANER_tickleActive == null || M_MOANER_tickleActive == undefined) M_MOANER_tickleActive = true;
                if (M_MOANER_vibratorActive == null || M_MOANER_vibratorActive == undefined) M_MOANER_vibratorActive = true;
                if (M_MOANER_whisperActive == null || M_MOANER_whisperActive == undefined) M_MOANER_whisperActive = false;
                if (M_MOANER_xvibratorActive == null || M_MOANER_xvibratorActive == undefined) M_MOANER_xvibratorActive = false;
                if (M_MOANER_talkActive == false) M_MOANER_whisperActive = false;
                if (M_MOANER_vibratorActive == false) M_MOANER_xvibratorActive = false;
                if (noescape == null || noescape == undefined) noescape = false;                  
                if (nogarble == null || nogarble == undefined) nogarble = false;                   
                if (nostruggle == null || nostruggle == undefined) nostruggle = false;                
                if (notalk == null || notalk == undefined) notalk = 0;
                if (noteleport == null || noteleport == undefined) noteleport = false;
                if (notimeout == null || notimeout == undefined) notimeout = false;               
                if (notimeout2 == null || notimeout2 == undefined) notimeout2 = false;
                if (noubccolor == null || noubccolor == undefined) noubccolor = false;                
                if (nowhisper == null || nowhisper == undefined) nowhisper = false;                 
                if (nowhrange == null || nowhrange == undefined) nowhrange = false;
		if (npcdeck == null || npcdeck == undefined) npcdeck = -1;
                if (npcpunish == null || npcpunish == undefined) npcpunish = false;                  
                if (outbuttons == null || outbuttons == undefined) outbuttons = false;                  
                if (pchat == null || pchat == undefined) pchat = false;
                if (pmin == null || pmin == undefined || pmin == 0) pmin = 2;
                if (pmax == null || pmax == undefined || pmax == 0) pmax = 20;
                if (profileName == null || profileName == undefined) profileName = "default";
                if (profileName == "default") profile = 0;
                if (profileName == "bunny") profile = 1;
                if (profileName == "cow") profile = 2;
                if (profileName == "dog") profile = 3;
                if (profileName == "fox") profile = 4;
                if (profileName == "mouse") profile = 5;
                if (profileName == "neko") profile = 6;
                if (profileName == "pig") profile = 7;
                if (profileName == "pony") profile = 8;
                if (profileName == "wildfox") profile = 9;
                if (profileName == "wolf") profile = 10;
                if (rchat == null || rchat == undefined) rchat = false;
                if (reaction == null || reaction == undefined) reaction = 0;
                if (rgame == null || rgame == undefined) rgame = 0;
                if (rglbuttons == null || rglbuttons == undefined) rglbuttons = false;                 
                if (rglsync == null || rglsync == undefined) rglsync = false;                 
                if (rhide == null || rhide == undefined) rhide = false;
                if (rmin == null || rmin == undefined || rmin == 0) rmin = 2;
                if (rsize == null || rsize == undefined || rsize == 0) rsize = 20;
                if (rtype == null || rtype == undefined || rtype == "") rtype = "ALL";
                if (slowleave == null || slowleave == undefined) slowleave = false;                
                if (sosbuttons == null || sosbuttons == undefined) sosbuttons = false;               
                if (silent == null || silent == undefined) silent = false;
                if (st == null || st == undefined) st = 0;
                if (tcname == null || tcname == undefined) tcname = "Cell";
                if (tintcolor == null || tintcolor == undefined) tintcolor = "#000000";
                if (tintlevel == null || tintlevel == undefined) tintlevel = 0;
                if (tintmbs == null || tintmbs == undefined) tintmbs = false;
                if (tintnever == null || tintnever == undefined) tintnever = false;
                if (unrestrict == null || unrestrict == undefined) unrestrict = 0;
                if (usoft == null || usoft == undefined) usoft = false;
                if (utotal == null || utotal == undefined) utotal = false;
                M_MOANER_saveControls();
                let BabyTalkOn = false;
                let GagTalkOn = false;
                let StutterOn = false;
                if ((gl > 0) && (gl != 11)) GagTalkOn = true;
                if (gl == 11) BabyTalkOn = true;
                if (st > 0) StutterOn = true;
                ini = 1;
                UBCsettings();
                FBCsettings();
                runUBC();
            } catch (err) {
                console.log(err);
            }
            await new Promise(r => setTimeout(r, 2000));
        }
    }
            
    //Section under GPLv3 license
    //GUI 
    const UBC_API = {
        HintForeColor: "Black",
        HintBackColor: "#5fbd7a",
        HintBorderColor: "Black",
    };

    async function runUBC() {

        await waitFor(() => ServerSocket && ServerIsConnected);

        const UBC_TIPS = [
            "See more stars with the UBC options and commands!",
            "Tip: Use the /uhelp command in chat or explore the wiki to better know all the UBC commands.",
            "Enjoy all the UBC options and commands!"
        ]

        const ubcSettingsKey = () => "bc_moaner_" + Player.MemberNumber;

        await ubcSettingsLoad();
        settingsPage();

        async function ubcSettingsLoad(reset = false) {
            await waitFor(() => !!Player?.AccountName);

            const UBC_DEFAULT_SETTINGS = {
                ahybrid: false,
                animal: 0,
                asylumlimit: false,
                autojoin: false,
                bgall: false,
                bl: 0,
                blindness: 0,
                blureffect: 0,
                blurmode: 0,
                ccards: 30,
                cdeck: 0,
                cextra: false,
                cfame: 150,
                cum: false,
                dolltalk: false,
                extbuttons: false,
                extrainfo: false,
                fixperm: false,
                frkeys: false,
                fullseed: false,
                gaglevel: 0,
                hearing: 0,
                highfame: false,
                hotkeys: false,
                magiccheat: false,
                magictoys: false,
                mapcheat: false,
                mapfull: false,
		mapfull2: false,
                maptrap1: 0,
                noescape: false,
                nogarble: false,
                nostruggle: false,
                notalk: 0,
		noteleport: false,
                notimeout: false,
                notimeout2: false,
                noubccolor: false,
                nowhisper: false,
                nowhrange: false,
		npcdeck: -1,
                npcpunish: false,
                orgasmMoan: true,
                outbuttons: false,
                pchat: false,
                pmin: 2,
                pmax: 20,
                profile: 0,
                rchat: false,
                reaction: 0,
                rglbuttons: false,
                rglsync: false,
                rmin: 2,
                rsize: 20,
                rtype: "ALL",
                script: false,
                silent: false,
                slowleave: false,
                sosbuttons: false,
                spankMoan: true,
                stutterlevel: 0,
                talkMoan: true,
                tickleMoan: true,
                tintcolor: "#000000",
                tintlevel: 0,
                tintmbs: false,
                tintnever: false,
                usoft: false,
                utotal: false,
                vibeMoan: true,
                whisperMoan: false,
                xvibeMoan: false,
            };

            Player.UBC = {};
            Player.UBC.version = UBCver;
            Player.UBC.ubcSettings = {};
            Player.UBC.ubcSharedSettings = {};

            let settings = JSON.parse(localStorage.getItem(M_MOANER_moanerKey + "_" + Player.MemberNumber));

            for (const setting in UBC_DEFAULT_SETTINGS) {
                if (!Object.prototype.hasOwnProperty.call(UBC_DEFAULT_SETTINGS, setting)) {
                    continue;
                }
                if (!(setting in settings)) {
                    settings[setting] = UBC_DEFAULT_SETTINGS[setting];
                }
            }

            Player.UBC.ubcSettings = settings;
        }

        async function waitFor(func, cancelFunc = () => false) {
            while (!func()) {
                if (cancelFunc()) {
                    return false;
                }
                await sleep(100);
            }
            return true;
        }

        function sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }

        function controllerIsActive() {
            if (typeof ControllerIsActive === "function") { // R92
                return ControllerIsActive();
            } else if (typeof ControllerActive === "boolean") { // R91
                return ControllerActive;
            } else {
                return false;
            }
        }

        async function settingsPage() {
            await waitFor(() => !!PreferenceRegisterExtensionSetting)

            const ubcSettingsCategories = [
                "UBCButtons",
                "UBCCheats",
                "UBCHotkeys",
                "UBCMaps",
                "UBCMisc",
                "UBCMoaner",
                "UBCSpecialModes",
                "UBCTalking",
                "UBCVisual"
            ];
            const ubcSettingCategoryLabels = {
                UBCButtons: "Buttons",
                UBCCheats: "Cheats",
                UBCHotkeys: "Hotkeys",
                UBCMaps: "Maps",
                UBCMisc: "Misc",
                UBCMoaner: "Moaner",
                UBCSpecialModes: "Special Modes",
                UBCTalking: "Talking",
                UBCVisual: "Visual"
            };
            const MENU_ELEMENT_X_OFFSET = 1050;

            let menuElements = {};
            for (category of ubcSettingsCategories) {
                menuElements[category] = [];
            }

            let settingsHint = "";
            let currentHint = 0;

            let UBCPreferenceSubscreen = "UBCSettings";

            /**
             * Draws a word wrapped text in a rectangle
             * @param {string} Text - Text to draw
             * @param {number} X - Position of the rectangle on the X axis
             * @param {number} Y - Position of the rectangle on the Y axis
             * @param {number} Width - Width of the rectangle
             * @param {number} Height - Height of the rectangle
             * @param {string} ForeColor - Foreground color
             * @param {string} [BackColor] - Background color
             * @param {number} [MaxLine] - Maximum of lines the word can wrap for
             * @returns {void} - Nothing
             */

            function DrawTextWrapGood(Text, X, Y, Width, Height, ForeColor = "Black", BackColor = null, BorderColor = "Black", MaxLine = null) {
                if (controllerIsActive()) {
                    setButton(X, Y);
                }
                // Draw the rectangle if we need too
                if (BackColor != null) {
                    MainCanvas.beginPath();
                    MainCanvas.rect(X, Y, Width, Height);
                    MainCanvas.fillStyle = BackColor;
                    MainCanvas.fillRect(X, Y, Width, Height);
                    MainCanvas.fill();
                    MainCanvas.lineWidth = 2;
                    MainCanvas.strokeStyle = BorderColor;
                    MainCanvas.stroke();
                    MainCanvas.closePath();
                }
                if (!Text) return;

                // Sets the text size if there's a maximum number of lines
                let TextSize;
                if (MaxLine != null) {
                    TextSize = MainCanvas.font;
                    GetWrapTextSize(Text, Width, MaxLine);
                }

                // Split the text if it wouldn't fit in the rectangle
                MainCanvas.fillStyle = "black";
                Y = Y + Math.floor(0.66 * (parseInt(MainCanvas.font.substring(0, 2))));
                if (MainCanvas.measureText(Text).width > Width) {
                    const words = fragmentText(Text, Width);
                    let line = '';

                    // Splits the words and draw the text
                    line = '';
                    for (let n = 0; n < words.length; n++) {
                        const testLine = line + words[n] + ' ';
                        if (MainCanvas.measureText(testLine).width > Width && n > 0) {
                            MainCanvas.fillText(line, X + 5, Y);
                            line = words[n] + ' ';
                            Y += 46;
                        } else {
                            line = testLine;
                        }
                    }
                    MainCanvas.fillText(line, X + 5, Y);

                } else MainCanvas.fillText(Text, X + 5, Y);

                // Resets the font text size
                if ((MaxLine != null) && (TextSize != null))
                    MainCanvas.font = TextSize;

            }

            function UBCPreferenceDrawBackNextButton(Left, Top, Width, Height, List, Index) {
                DrawBackNextButton(Left, Top, Width, Height, List[Index], "White", "",
                    () => List[PreferenceGetPreviousIndex(List, Index)],
                    () => List[PreferenceGetNextIndex(List, Index)],
                );
            }

            function getNewYPos() {
                let yPos = 200;
                if (menuElements[UBCPreferenceSubscreen].length > 0) {
                    let lastElement = menuElements[UBCPreferenceSubscreen][menuElements[UBCPreferenceSubscreen].length - 1];
                    yPos = lastElement.yPos + lastElement.yModifier + 75;
                }
                return yPos;
            }

            function addMenuCheckbox(width, height, text, setting, hint, grayedOutReference = "false", xModifier = 0, yModifier = 0, elementText = "") {
                menuElements[UBCPreferenceSubscreen].push({
                    type: "Checkbox",
                    yPos: getNewYPos(),
                    width: width,
                    height: height,
                    text: text,
                    setting: setting,
                    hint: hint,
                    grayedOutReference: grayedOutReference,
                    xModifier: xModifier,
                    yModifier: yModifier,
                    elementText: elementText,
                });
            }

            function addMenuButton(width, height, text, elementText, clickFunction, hint, xModifier = 0, yModifier = 0) {
                menuElements[UBCPreferenceSubscreen].push({
                    type: "Button",
                    yPos: getNewYPos(),
                    width: width,
                    height: height,
                    text: text,
                    elementText: elementText,
                    clickFunction: clickFunction,
                    hint: hint,
                    xModifier: xModifier,
                    yModifier: yModifier,
                });
            }

            function addMenuInput(width, text, setting, identifier, hint, xModifier = 0, yModifier = 0) {
                menuElements[UBCPreferenceSubscreen].push({
                    type: "Input",
                    yPos: getNewYPos(),
                    width: width,
                    text: text,
                    setting: setting,
                    identifier: identifier,
                    hint: hint,
                    xModifier: xModifier,
                    yModifier: yModifier,
                });
                ElementCreateInput(identifier, "text", Player.UBC.ubcSettings[setting], "100");
            }

            /*function backNextWithBF(setting, backNextOptions) {
		if (setting == BF_LOCK_NAME || setting == BF_TIMER_LOCK_NAME) {
		    if((backNextOptions.indexOf(Player.UBC.ubcSettings.ItemPerm[setting]) < 0)) {
			return 0;
		    } else {
			return backNextOptions.indexOf(Player.UBC.ubcSettings.ItemPerm[setting]);
		    }
		}
		if((backNextOptions.indexOf(Player.UBC.ubcSettings[setting]) < 0)) {
		    return 0;
		} else {
		    return backNextOptions.indexOf(Player.UBC.ubcSettings[setting]);
		}
	    }

	    function addMenuBackNext(width, height, text, setting, backNextOptions, hint, xModifier = 0, yModifier = 0) {
		menuElements[UBCPreferenceSubscreen].push({
		    type: "BackNext",
		    yPos: getNewYPos(),
		    width: width,
		    height: height,
		    text: text,
		    setting: setting,
		    backNextOptions: backNextOptions,
		    hint: hint,
		    xModifier: xModifier,
		    yModifier: yModifier,
		    index: backNextWithBF(setting, backNextOptions),
		    //(backNextOptions.indexOf(Player.UBC.ubcSettings[setting]) < 0) ? 0 : backNextOptions.indexOf(Player.UBC.ubcSettings[setting])
		});
	    }*/

            function drawMenuElements() {
                // Draw the player & controls
                DrawCharacter(Player, 50, 50, 0.9);
                DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");

                MainCanvas.textAlign = "left";
                if (PreferenceMessage != "") DrawText(PreferenceMessage, 1400, 125, "Red", "Black");
                DrawText("UBC " + ubcSettingCategoryLabels[UBCPreferenceSubscreen] + " - Click on a setting to get more info", 500, 125, "Black", "Gray");
                if (settingsHint != "") {
                    DrawTextWrapGood(settingsHint, 1350, 200, 555, 725, ForeColor = UBC_API.HintForeColor, BackColor = UBC_API.HintBackColor, BorderColor = UBC_API.HintBorderColor);
                }

                let currentElement;
                for (i = 0; i < menuElements[UBCPreferenceSubscreen].length; i++) {
                    currentElement = menuElements[UBCPreferenceSubscreen][i];
                    MainCanvas.textAlign = "left";
                    let textColor = "Black";
                    if (eval(currentElement?.grayedOutReference) === true) textColor = "Gray";
                    if (MouseIn(500, currentElement.yPos - 18, MENU_ELEMENT_X_OFFSET - 525, 36)) textColor = "Yellow";
                    if (currentElement.yPos === currentHint) textColor = "Red";
                    DrawText(currentElement.text, 500, currentElement.yPos, textColor, "Gray");
                    switch (currentElement.type) {
                        case "Checkbox":
                            DrawCheckbox(
                                MENU_ELEMENT_X_OFFSET + currentElement.xModifier,
                                currentElement.yPos - currentElement.height / 2,
                                currentElement.width,
                                currentElement.height,
                                currentElement.elementText,
                                (eval(currentElement.grayedOutReference)) ? false : Player.UBC.ubcSettings[currentElement.setting],
                                eval(currentElement.grayedOutReference)
                            );
                            break;
                        case "Button":
                            MainCanvas.textAlign = "center";
                            DrawButton(
                                MENU_ELEMENT_X_OFFSET + currentElement.xModifier,
                                currentElement.yPos - currentElement.height / 2,
                                currentElement.width,
                                currentElement.height,
                                currentElement.elementText,
                                "White",
                                ""
                            );
                            break;
                        case "Input":
                            ElementPosition(
                                currentElement.identifier,
                                MENU_ELEMENT_X_OFFSET + currentElement.xModifier + currentElement.width / 2,
                                currentElement.yPos,
                                currentElement.width
                            );
                            break;
                        case "BackNext":
                            MainCanvas.textAlign = "center";
                            UBCPreferenceDrawBackNextButton(
                                MENU_ELEMENT_X_OFFSET + currentElement.xModifier,
                                currentElement.yPos - currentElement.height / 2,
                                currentElement.width,
                                currentElement.height,
                                currentElement.backNextOptions,
                                currentElement.index
                            );
                            break;
                        default:
                            break;
                    }
                }
            }

            function handleMenuClicks() {
                // Exit button
                if (MouseIn(1815, 75, 90, 90)) {
                    CommonCallFunctionByName(`PreferenceSubscreen${UBCPreferenceSubscreen}Exit`)
                    return;
                }
                let currentElement;
                let foundElement = false;
                for (i = 0; i < menuElements[UBCPreferenceSubscreen].length; i++) {
                    currentElement = menuElements[UBCPreferenceSubscreen][i];
                    switch (currentElement.type) {
                        case "Checkbox":
                            if (eval(currentElement.grayedOutReference) === false) {
                                if (MouseIn(MENU_ELEMENT_X_OFFSET + currentElement.xModifier, currentElement.yPos - currentElement.height / 2, currentElement.width, currentElement.height)) {
                                    Player.UBC.ubcSettings[currentElement.setting] = !Player.UBC.ubcSettings[currentElement.setting];
                                    foundElement = true;
                                }
                            }
                            break;
                        case "Button":
                            if (MouseIn(MENU_ELEMENT_X_OFFSET + currentElement.xModifier, currentElement.yPos - currentElement.height / 2, currentElement.width, currentElement.height)) {
                                currentElement.clickFunction();
                                foundElement = true;
                            }
                            break;
                        case "BackNext":
                            if (MouseIn(MENU_ELEMENT_X_OFFSET + currentElement.xModifier, currentElement.yPos - currentElement.height / 2, currentElement.width, currentElement.height)) {
                                if (MouseX <= MENU_ELEMENT_X_OFFSET + currentElement.width / 2) currentElement.index = PreferenceGetPreviousIndex(currentElement.backNextOptions, currentElement.index);
                                else currentElement.index = PreferenceGetNextIndex(currentElement.backNextOptions, currentElement.index);
                                if (currentElement.setting == BF_LOCK_NAME || currentElement.setting == BF_TIMER_LOCK_NAME) {
                                    Player.UBC.ubcSettings.ItemPerm[currentElement.setting] = currentElement.backNextOptions[currentElement.index];
                                } else Player.UBC.ubcSettings[currentElement.setting] = currentElement.backNextOptions[currentElement.index];
                                foundElement = true;
                            }
                            break;
                        default:
                            break;
                    }
                    // Fontsize = 36
                    if (MouseIn(500, currentElement.yPos - 18, MENU_ELEMENT_X_OFFSET - 525, 36)) {
                        settingsHint = currentElement.hint;
                        currentHint = currentElement.yPos;
                    }
                    if (foundElement) i = menuElements[UBCPreferenceSubscreen].length;
                    if (Player.UBC.ubcSettings.talkMoan == false) Player.UBC.ubcSettings.whisperMoan = false;
                    if (Player.UBC.ubcSettings.vibeMoan == false) Player.UBC.ubcSettings.xvibeMoan = false;
                }
            }

            function defaultExit() {
                menuElements[UBCPreferenceSubscreen] = [];
                UBCPreferenceSubscreen = "UBCSettings";
                PreferenceMessage = "";
                settingsHint = "";
                currentHint = 0;
                PreferenceExtensionsCurrent = {
                    Identifier: "UBCSettings",
                    click: PreferenceSubscreenUBCSettingsClick,
                    run: PreferenceSubscreenUBCSettingsRun,
                    exit: PreferenceSubscreenUBCSettingsExit,
                    load: PreferenceSubscreenUBCSettingsLoad,
                }
                PreferenceSubscreenUBCSettingsLoad();
            }

            PreferenceSubscreenUBCSettingsLoad = function() {
                currentPageNumber = 0;
            };

            PreferenceSubscreenUBCSettingsRun = function() {

                // Draw the player & controls
                DrawCharacter(Player, 50, 50, 0.9);
                DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
                MainCanvas.textAlign = "left";
                DrawText("- ULTRA Bondage Club Settings -", 500, 125, "Black", "Gray");
                MainCanvas.textAlign = "center";
                //Show tips every 10 secs
                DrawTextWrapGood(UBC_TIPS[Math.floor(((TimerGetTime() % 100000) / 100000) * (UBC_TIPS.length))], 1650, 260, 400, 100, ForeColor = UBC_API.HintForeColor);

                DrawText("ULTRAbc " + UBCver, 1665, 525, "Black", "Gray");
                DrawButton(1500, 550, 315, 90, "", "White", "", "Link to Icons8");
                DrawImageResize(IMAGES.LOGO, 1510, 565, 60, 60);
                DrawTextFit("Icon by Icons8", 1690, 598, 308, "Black");
                DrawButton(1500, 655, 315, 90, "", "White", "", "Open UBC Changelog on GitHub");
                DrawImageResize("Icons/Changelog.png", 1510, 670, 60, 60);
                DrawTextFit("UBC Changes", 1685, 703, 308, "Black");
                DrawButton(1500, 760, 315, 90, "", "White", "", "Open UBC Wiki on GitHub");
                DrawImageResize("Icons/Introduction.png", 1510, 775, 60, 60);
                DrawTextFit("UBC Wiki", 1685, 808, 308, "Black");
                DrawText("/uhelp in chat", 1665, 880, "Black", "Gray");

                //DrawButton(1500, 860, 300, 90, "Reset", "Red", "Icons/Reset.png", "Reset ALL Settings (including best friends list).")

                if (PreferenceMessage != "") DrawText(PreferenceMessage, 865, 125, "Red", "Black");

                // Draw all the buttons to access the submenus
                for (let A = 0; A < ubcSettingsCategories.length; A++) {
                    ControllerIgnoreButton = true;
                    //DrawButton(500 + 420 * Math.floor(A / 7), 160 + 110 * (A % 7), 400, 90, "", "White", "Icons/" + ubcSettingsCategories[A] + ".png");
                    DrawButton(500 + 420 * Math.floor(A / 7), 160 + 110 * (A % 7), 400, 90, "", "White", "");
                    ControllerIgnoreButton = false;
                    DrawTextFit(ubcSettingCategoryLabels[ubcSettingsCategories[A]], 700 + 420 * Math.floor(A / 7), 205 + 110 * (A % 7), 310, "Black");
                    if (controllerIsActive()) {
                        setButton(745 + 420 * Math.floor(A / 7), 205 + 110 * (A % 7));
                    }
                }
            }

            /*function resetSettings() {
		    CommonDynamicFunction("PreferenceSubscreenResetLoad()");
		    PreferenceExtensionsCurrent = {
			Identifier: "Reset",
			click: () => CommonCallFunctionByName(`PreferenceSubscreenResetClick`),
			run: () => CommonCallFunctionByName(`PreferenceSubscreenResetRun`),
			exit: () => CommonCallFunctionByName(`PreferenceSubscreenResetExit`),
			load: () => CommonCallFunctionByName(`PreferenceSubscreenResetLoad`),
		    }
		    UBCPreferenceSubscreen = "Reset";
		    PreferencePageCurrent = 1;
		}
  
		PreferenceSubscreenResetLoad = function () {
		    currentPageNumber = 1;
		}
  
		PreferenceSubscreenResetRun = function () {
		    DrawTextWrapGood("Do you want to reset all settings to Defaults?",1000, 200, 800, 100, ForeColor = UBC_API.HintForeColor);
		    DrawButton(400, 650, 300, 100, "Confirm", "Red","","Confirm Reset and Exit");
		    DrawButton(1300, 650, 300, 100, "Cancel","White","","Cancel Reset");
		}
  
		PreferenceSubscreenResetClick = function () {
		    if (MouseIn(400, 650, 300, 100)) {
			ubcSettingsLoad(reset = true);
			defaultExit();
		    }
		    if (MouseIn(1300, 650, 300, 100)) {
			defaultExit();
		    }
		}
  
		PreferenceSubscreenResetExit = function () {
		    defaultExit();
		}*/

            PreferenceSubscreenUBCSettingsClick = function() {
                if (MouseIn(1815, 75, 90, 90)) PreferenceSubscreenUBCSettingsExit();
                if (MouseIn(1450, 550, 400, 90)) window.open('https://icons8.com', '_blank');
                if (MouseIn(1450, 655, 400, 90)) window.open('https://github.com/tetris245/ULTRAbc/releases', '_blank');
                if (MouseIn(1450, 760, 400, 90)) window.open('https://github.com/tetris245/ULTRAbc/wiki', '_blank');
                //if (MouseIn(1500, 860, 300, 90)) resetSettings();
                // Open the selected subscreen
                for (let A = 0; A < ubcSettingsCategories.length; A++) {
                    if (MouseIn(500 + 500 * Math.floor(A / 7), 160 + 110 * (A % 7), 400, 90)) {
                        if (typeof window["PreferenceSubscreen" + ubcSettingsCategories[A] + "Load"] === "function")
                            CommonDynamicFunction("PreferenceSubscreen" + ubcSettingsCategories[A] + "Load()");
                        PreferenceExtensionsCurrent = {
                            Identifier: ubcSettingsCategories[A],
                            // ButtonText: ubcSettingCategoryLabels[ubcSettingsCategories[A]],
                            click: () => CommonCallFunctionByName(`PreferenceSubscreen${ubcSettingsCategories[A]}Click`),
                            run: () => CommonCallFunctionByName(`PreferenceSubscreen${ubcSettingsCategories[A]}Run`),
                            exit: () => CommonCallFunctionByName(`PreferenceSubscreen${ubcSettingsCategories[A]}Exit`),
                            load: () => CommonCallFunctionByName(`PreferenceSubscreen${ubcSettingsCategories[A]}Load`),
                        }
                        UBCPreferenceSubscreen = ubcSettingsCategories[A];

                        PreferencePageCurrent = 1;
                        break;
                    }
                }
            }

            PreferenceSubscreenUBCSettingsExit = function() {
                Player.UBC.ubcSettings.cum = false;
                if (Player.UBC.ubcSettings.tintlevel == 0) Player.UBC.ubcSettings.tintmbs = false;
                if (Player.UBC.ubcSettings.tintnever == true) {
                    Player.UBC.ubcSettings.tintlevel = 0;
                    Player.UBC.ubcSettings.tintcolor = "#000000";
                    Player.UBC.ubcSettings.tintmbs = false;
                }
                let data = Player.UBC.ubcSettings;
                UBCdata(data);
                blindness = data.blindness;
                blurmode = data.blurmode;
                hearing = data.hearing;
                M_MOANER_cum = data.cum;
                M_MOANER_orgasmActive = data.orgasmMoan;
                M_MOANER_scriptOn = data.script;
                M_MOANER_spankActive = data.spankMoan;
                M_MOANER_talkActive = data.talkMoan;
                M_MOANER_tickleActive = data.tickleMoan;
                M_MOANER_vibratorActive = data.vibeMoan;
                M_MOANER_whisperActive = data.whisperMoan;
                M_MOANER_xvibratorActive = data.xvibeMoan;
                profile = data.profile;
                reaction = data.reaction;
                BabyTalkOn = false;
                if (blindness == 1) {
                    GetBlindLevel0();
                    Player.GetBlindLevel = GetBlindLevel0;
                }
                if (blindness == 2) {
                    GetBlindLevel1();
                    Player.GetBlindLevel = GetBlindLevel1;
                }
                if (blindness == 3) {
                    GetBlindLevel2();
                    Player.GetBlindLevel = GetBlindLevel2;
                }
                if (blindness == 4) {
                    GetBlindLevel3();
                    Player.GetBlindLevel = GetBlindLevel3;
                }
                if (blurmode == 1) {
                    GetBlurLevel0();
                    Player.GetBlurLevel = GetBlurLevel0;
                }
                if (blurmode == 2) {
                    GetBlurLevel1();
                    Player.GetBlurLevel = GetBlurLevel1;
                }
                if (blurmode == 3) {
                    GetBlurLevel2();
                    Player.GetBlurLevel = GetBlurLevel2;
                }
                if (blurmode == 4) {
                    GetBlurLevel3();
                    Player.GetBlurLevel = GetBlurLevel3;
                }
                if (blurmode == 5) {
                    GetBlurLevel4();
                    Player.GetBlurLevel = GetBlurLevel4;
                }
                GagTalkOn = false;
                if ((gl > 0) && (gl != 11)) GagTalkOn = true;
                if (gl == 11) BabyTalkOn = true;
                if (hearing == 1) {
                    GetDeafLevel0();
                    Player.GetDeafLevel = GetDeafLevel0;
                }
                if (hearing == 2) {
                    GetDeafLevel1();
                    Player.GetDeafLevel = GetDeafLevel1;
                }
                if (hearing == 3) {
                    GetDeafLevel2();
                    Player.GetDeafLevel = GetDeafLevel2;
                }
                if (hearing == 4) {
                    GetDeafLevel3();
                    Player.GetDeafLevel = GetDeafLevel3;
                }
                if (hearing == 5) {
                    GetDeafLevel4();
                    Player.GetDeafLevel = GetDeafLevel4;
                }
                if (hearing == 6) {
                    GetDeafLevel5();
                    Player.GetDeafLevel = GetDeafLevel5;
                }
                if (profile == 0) profileName = "default";
                if (profile == 1) profileName = "bunny";
                if (profile == 2) profileName = "cow";
                if (profile == 3) profileName = "dog";
                if (profile == 4) profileName = "fox";
                if (profile == 5) profileName = "mouse";
                if (profile == 6) profileName = "neko";
                if (profile == 7) profileName = "pig";
                if (profile == 8) profileName = "pony";
                if (profile == 9) profileName = "wildfox";
                if (profile == 10) profileName = "wolf";
                if (st == 0) StutterOn = false;
                if (st > 0) StutterOn = true;
                if ((usoft == true) && (unrestrict == 0)) softUnrestrict();
                if ((utotal == true) && (unrestrict != 2)) totalUnrestrict();
                silentMode();
                M_MOANER_saveControls();
                if (noescape == true) {
                    Player.OnlineSharedSettings.Unoescape = true;
                } else {
                    Player.OnlineSharedSettings.Unoescape = false;
                }
                ServerAccountUpdate.QueueData({
                    OnlineSharedSettings: Player.OnlineSharedSettings
                });
                if (nogarble == true) {
                    Player.RestrictionSettings.NoSpeechGarble = true;
                } else {
                    Player.RestrictionSettings.NoSpeechGarble = false;
                }
                if (nostruggle == true) {
                    Player.RestrictionSettings.BypassStruggle = true;
                } else {
                    Player.RestrictionSettings.BypassStruggle = false;
                }
                if (npcpunish == true) {
                    Player.RestrictionSettings.BypassNPCPunishments = false;
                } else {
                    Player.RestrictionSettings.BypassNPCPunishments = true;
                }
                if ((noescape == true) && (unrestrict == 2)) {
                    ServerSocket.close();
                    ServerSocket.open();
                }
                TintsEffect();
                UBCPreferenceSubscreen = "";
                PreferenceMessage = "";
                PreferenceSubscreenExtensionsClear();
            }

            PreferenceSubscreenUBCButtonsLoad = function() {
                UBCPreferenceSubscreen = "UBCButtons";
                addMenuCheckbox(64, 64, "Enable EXT button in chat rooms: ", "extbuttons",
                    "The EXT button gives direct access to the Extensions menu. It corresponds to the /xmenu command.", false, 150
                );
                addMenuCheckbox(64, 64, "Enable FREE buttons: ", "sosbuttons",
                    "The FREE button is added in the chat room, Pandora prison, photographic room and timer cell. It corresponds to the /totalrelease command, but only for yourself. The default message in chat rooms for this button can be replaced by a custom message or an absence of message - see the /message command. This option is not available in no-escape mode.", "Player.UBC.ubcSettings.noescape", 150
                );
                addMenuCheckbox(64, 64, "Enable OUT buttons: ", "outbuttons",
                    "The OUT button is added in the chat room, Pandora prison, photographic room and timer cell. It corresponds to the /quit command, but without a specific optional text. This option is not available in no-escape mode.", "Player.UBC.ubcSettings.noescape", 150
                );
                let slowmsg = "By default, you leave a chat room or another location with the OUT button in fast mode, even if you are bound. When you enable this option, you will exit in slow mode without a special icon under your character, what will surprise the other players! This option is not available in no-escape mode. ";
                let notesc = 0;
                if (Player.UBC.ubcSettings.noescape == false) notesc = 1;
                if (notesc == 0) {
                    addMenuCheckbox(64, 64, "Slow exit with OUT button: ", "slowleave", slowmsg, true, 150);
                } else {
                    addMenuCheckbox(64, 64, "Slow exit with OUT button: ", "slowleave", slowmsg, "!Player.UBC.ubcSettings.outbuttons", 150);
                }
                addMenuCheckbox(64, 64, "Enable RGL button in chat: ", "rglbuttons",
                    "The RGL button gives info about your current Real Garbling Level at any moment, by checking worn gags and other items restraining talking (also LSCG collar and spells). When using the buttons, hotkeys or commands to release yourself, this info is automatically given and synchronized with your forced gagtalk/whisper level as the result is 0. The RGL button can therefore be used as emergency when you can't talk while not being gagged, for example.", false, 150
                );
                addMenuCheckbox(64, 64, "Extended synchronization with RGL button:", "rglsync",
                    "By default, the synchronization of RGL button with forced level of gagtalk/whisper is automatic when using the emergency buttons, hotkeys or commands to release yourself. This setting allows to extend it to all other situations. The detected level will be limited to 10 for gagtalk (11 is used for baby talk). When enabled, manual changes in your worn gags and other items restraining talking (including LSCG collar and spells) require to click the RGL button again.", "!Player.UBC.ubcSettings.rglbuttons", 150
                );
            }

            PreferenceSubscreenUBCButtonsRun = function() {
                drawMenuElements();
            }

            PreferenceSubscreenUBCButtonsClick = function() {
                handleMenuClicks();
            }

            PreferenceSubscreenUBCButtonsExit = function() {
                defaultExit();
            }

            PreferenceSubscreenUBCCheatsLoad = function() {
                UBCPreferenceSubscreen = "UBCCheats";
                addMenuButton(150, 64, "Add/Remove Extra Cards for Card Game:", "Toggle", function() {
                        Player.Game.ClubCard.Reward = "";
                        if (Player.UBC.ubcSettings.cextra == false) {
                            Player.UBC.ubcSettings.cextra = true;
                            let Extra = [1015, 1017, 3008, 5005, 6005, 7007, 8005, 11000, 11001, 11002, 11003, 11008, 11009, 11010, 12000, 12001, 12002, 12004, 30012, 30013, 30021, 30022];
                            for (let i = 0; i < Extra.length; i++) {
                                let Char = String.fromCharCode(Extra[i]);
                                Player.Game.ClubCard.Reward = Player.Game.ClubCard.Reward + Char;
                            }
                            PreferenceMessage = "All extra cards added";
                        } else {
                            Player.UBC.ubcSettings.cextra = false;
                            PreferenceMessage = "All extra cards removed";
                        }
                        ServerAccountUpdate.QueueData({
                            Game: Player.Game
                        }, true);
                    },
                    "This setting is a toggle. You can add or remove all the reward extra cards. Note that also the extra cards you acquired by the normal way will be removed when this setting switches to the remove action.", 160
                );
                addMenuCheckbox(64, 64, "Enable Bondage Brawl/Magic School cheat: ", "magiccheat",
                    "With this option, you always be the winner in Bondage Brawl and the Magic School (only the Single Player part)!", false, 160
                );
                addMenuCheckbox(64, 64, "Enable extra info for some locks: ", "extrainfo",
                    "This setting allows to use the /infolock command and get this way extra info (code, password, time left) about some locks on worn item in a slot selected by clicking on yourself or another player.", false, 160
                );
                addMenuCheckbox(64, 64, "Enable full help for intricate and hs locks: ", "fullseed",
                    "You will become a lockpicking expert with this option! The full solution with the correct order to lockpick intricate and high security locks is displayed on screen.", false, 160
                );
                let gmsg = "This setting allows to ungarble your non-forced gagtalk, no matter your game difficulty. However, it is not available when you have enabled the corresponding WCE feature, which has more options.";
                let smsg = "This setting allows automatic struggle in mini-games, no matter your game difficulty. If the autostruggle fails, you need to change solidity of current worn items with the /solidity command and/or enhance your skills with the /boost command. Note that this setting is not available when you have enabled the corresponding WCE feature, which works slightly differently.";
                let gbc = 0;
                let sbc = 0;
                if (Player.FBC != undefined) {
                    let str = Player.ExtensionSettings.FBC;
                    let d = LZString.decompressFromBase64(str);
                    let FBCdata = {};
                    let decoded = JSON.parse(d);
                    FBCdata = decoded;
                    if (FBCdata.antiGarble) gbc = 1;
                    if (FBCdata.autoStruggle) sbc = 1;
                }
                if (gbc == 0) {
                    addMenuCheckbox(64, 64, "Enable ungarbling of your gagtalk: ", "nogarble", gmsg, false, 160);
                } else {
                    addMenuCheckbox(64, 64, "Enable ungarbling of your gagtalk: ", "nogarble", gmsg, true, 160);
                }
                if (sbc == 0) {
                    addMenuCheckbox(64, 64, "Enable automatic struggle in mini-games: ", "nostruggle", smsg, false, 160);
                } else {
                    addMenuCheckbox(64, 64, "Enable automatic struggle in mini-games: ", "nostruggle", smsg, true, 160);
                }
            }

            PreferenceSubscreenUBCCheatsRun = function() {
                drawMenuElements();
            }

            PreferenceSubscreenUBCCheatsClick = function() {
                handleMenuClicks();
            }

            PreferenceSubscreenUBCCheatsExit = function() {
                defaultExit();
            }

            PreferenceSubscreenUBCHotkeysLoad = function() {
                UBCPreferenceSubscreen = "UBCHotkeys";
                addMenuCheckbox(64, 64, "Enable hotkeys in chat: ", "hotkeys",
                    "These hotkeys are equivalent to the /quit command, but without a specific optional text, and the /totalrelease command, but only for yourself. Hotkeys on numeric pad: Divide = fast leave - Multiply = total release. If you don't have a numeric pad, use instead the similar command or an UBC button. This option is not available in no-escape mode.", "Player.UBC.ubcSettings.noescape"
                );
                addMenuCheckbox(64, 64, "Enable hotkeys in friend list: ", "frkeys",
                    "These hotkeys allow to get clickable links in another lobby you have access if you are in a lobby (not in a room). You can use them only on the list of current online friends AND if you are not in the search input or send beep zone. List of hotkeys: F = female club - G = mixed club - H = male club - J = asylum."
                );
            }

            PreferenceSubscreenUBCHotkeysRun = function() {
                drawMenuElements();
            }

            PreferenceSubscreenUBCHotkeysClick = function() {
                handleMenuClicks();
            }

            PreferenceSubscreenUBCHotkeysExit = function() {
                defaultExit();
            }

            PreferenceSubscreenUBCMapsLoad = function() {
                UBCPreferenceSubscreen = "UBCMaps";
                addMenuCheckbox(64, 64, "Add toys under locked chastity in traps: ", "magictoys",
                    "Enable this option if you accept that the traps in map rooms can add toys under locked chastity, with all the consequences you can have later with your owner or lovers for example!", false, 140
                );
                addMenuInput(200, "Selected device trap (0-9):", "maptrap1", "InputDeviceTrap",
                    "Input a number between 0 and 9 to select a device trap: 0 No device trap - 1 Bondage Bench - 2 Coffin - 3 Display Frame - 4 Kennel - 5 Locker - 6 Trolley - 7 Wooden Box - 8 X-Cross - 9 ALL THE DEVICE TRAPS. When a trap is enabled, you will be automatically bound if you walk on the device!", 6
                );
                addMenuCheckbox(64, 64, "Enable full hearing in maps: ", "mapfull2",
                    "When enabled, there's no any limitation to your hearing in the map rooms",false, 140
                );
                addMenuCheckbox(64, 64, "Enable full vision in maps: ", "mapfull",
                    "When enabled, you can see the entire map rooms without fog. Notes: the /mapfog command, that enables/disables the fog only in the current map room, is without any effect if this setting is active. If you don't have used /mapfog to remove the fog before enabling this setting, the fog will come back when disabling it.", false, 140
                );
                addMenuCheckbox(64, 64, "Enable full whispering in maps: ", "nowhrange",
                    "When enabled, you can whisper to any player in the map, no matter the distance that is between you and this player. It will work with the standard BC command /whisper and the UBC command /murmur, between all players who have enabled this option.", false, 140
                );
                addMenuCheckbox(64, 64, "Enable magic walk in maps: ", "mapcheat",
                    "When enabled, you can go everywhere in the maps, also pass through walls, even while not being an administrator!", false, 140
                );
                addMenuCheckbox(64, 64, "No forced teleportation in maps: ", "noteleport",
                    "When checked, the BC commands related to forced teleportation in the maps will not work on you, except if at least one admin of the chat room is in your Tplist (see the commands /tplistadd, /tplistremove and /tplistshow).", false, 140
                );
            }

            PreferenceSubscreenUBCMapsRun = function() {
                drawMenuElements();
            }

            PreferenceSubscreenUBCMapsClick = function() {
                handleMenuClicks();
            }

            PreferenceSubscreenUBCMapsExit = function() {
                let device = ElementValue("InputDeviceTrap");
                if ((CommonIsNumeric(device)) && (profile > -1) && (device < 10)) {
                    Player.UBC.ubcSettings.maptrap1 = device;
                    ElementRemove("InputDeviceTrap");
                    defaultExit();
                } else PreferenceMessage = "Put a valid number";
            }

            PreferenceSubscreenUBCMiscLoad = function() {
                UBCPreferenceSubscreen = "UBCMisc";
                addMenuCheckbox(64, 64, "Access all standard backgrounds: ", "bgall",
                    "With this option, you will not be limited to 42 backgrounds in Private Cell or 187 backgrounds in Online preferences and the Club Card Game editor to change several backgrounds. You will have access to all standard backgrounds (more than 250!). Note: if you use BCX and want direct access to the backgrounds added by BCX, unhide them with the /bg1 command!", false, 120
                );
                addMenuCheckbox(64, 64, "Enable Asylum limitations: ", "asylumlimit",
                    "By default, UBC disables the Asylum limitations (access to, exit from). If you like these limitations, you can enable them again with this option.", false, 120
                );
                addMenuCheckbox(64, 64, "Enable punishments by NPC: ", "npcpunish",
                    "By default, UBC disables the automatic punishments by NPC (especially when you are bound in a room and call a maid for help). If you like these punishments, you can enable them again with this option.", false, 120
                );
                addMenuCheckbox(64, 64, "No permission change after safeword: ", "fixperm",
                    "BC automatically changes your general item permission when you use the BC safeword command or the revert option in the safeword menu. If you don't like that, use this option and your general item permission will not be modified.", false, 120
                );
                addMenuCheckbox(64, 64, "No time out for wrong commands: ", "notimeout2",
                    "When you enter a command that is wrong or impossible according the context, the error message is removed after some time. If you don't like that, use this option to prevent the disappearance of the error message.", false, 120
                );
                addMenuCheckbox(64, 64, "No time out in help provided by TAB: ", "notimeout",
                    "When you use the TAB key to get help about BC commands, the displayed results are removed from the chat after some time. If you don't like that, use this option to prevent the disappearance of the help results.", false, 120
                );
            }

            PreferenceSubscreenUBCMiscRun = function() {
                drawMenuElements();
            }

            PreferenceSubscreenUBCMiscClick = function() {
                handleMenuClicks();
            }

            PreferenceSubscreenUBCMiscExit = function() {
                defaultExit();
            }

            PreferenceSubscreenUBCMoanerLoad = function() {
                UBCPreferenceSubscreen = "UBCMoaner";
                addMenuCheckbox(64, 64, "Activate the Moaner: ", "script",
                    "Add more fun to Bondage Club with the moans automatically generated by the Moaner!", false, 140
                );
                addMenuInput(200, "Moaning profile (0-10):", "profile", "InputMoanProfile",
                    "Input a number between 0 and 10 to select one of these moaning profiles: 0 Default - 1 Bunny - 2 Cow - 3 Dog - 4 Fox - 5 Mouse - 6 Neko - 7 Pig - 8 Pony - 9 Wildfox - 10 Wolf.", 6
                );
                let omsg = "When enabled, you will moan while cumming. It is not possible to enable it when the LSCG Splatter feature is detected as enabled.";
                let spl = 0;
                let LSCG = Player.ExtensionSettings.LSCG;
                if (LSCG) {
                    let LSCGdata = JSON.parse(LZString.decompressFromBase64(LSCG));
                    if (LSCGdata.SplatterModule.enabled) spl = 1;
                }
                if (spl == 0) {
                    addMenuCheckbox(64, 64, "Enable the orgasm moan: ", "orgasmMoan", omsg, false, 140);
                } else {
                    addMenuCheckbox(64, 64, "Enable the orgasm moan: ", "orgasmMoan", omsg, true, 140);    
                }
                addMenuCheckbox(64, 64, "Enable the spank moan: ", "spankMoan",
                    "When enabled, you will moan while being spanked. Also when bitten, kicked, pinched, shocked, slapped. In case of actions triggering a shock, it concerns only actions to punish orgasm, stand up or struggle. According your fetishes and your horny state, it can be pain or pleasure.", false, 140
                );
                addMenuCheckbox(64, 64, "Enable the talk moan: ", "talkMoan",
                    "When enabled, you will moan while speaking if you're vibed. The moans can interrupt your talking. Note that when you disable this setting, it automatically disables the whisper moan too.", false, 140
                );
                addMenuCheckbox(64, 64, "Extend talk moan to whispers: ", "whisperMoan",
                    "When enabled, you will moan while whispering if you're vibed. The moans can interrupt your whispers. Note that this setting can't be enabled when the talk moan is disabled.", "!Player.UBC.ubcSettings.talkMoan", 140
                );
                addMenuCheckbox(64, 64, "Enable the tickle moan: ", "tickleMoan",
                    "When enabled, you will moan while being tickled. According your fetishes and your horny state, it can be pain or pleasure.", false, 140
                );
                addMenuCheckbox(64, 64, "Enable the vibes moan: ", "vibeMoan",
                    "When enabled, you will moan if your vibrator's settings change and your arousal level is higher or equal to 10. Also when fingered, fisted, masturbated, or when your ears are caressed, kissed, licked, nibbled, or when using LSCG aphrodisiac injector, drink, respirator. Note that when you disable this setting, it automatically disables the xvibes moan too.", false, 140
                );
                addMenuCheckbox(64, 64, "Extend vibes moan (xvibes moan): ", "xvibeMoan",
                    "When enabled, you will moan when vibe settings of other players in the chat room change, even if you are not yourself vibed (the only condition is an arousal level higher or equal to 10). Note that this setting can't be enabled when the vibes moan is disabled.", "!Player.UBC.ubcSettings.vibeMoan", 140
                );
            }

            PreferenceSubscreenUBCMoanerRun = function() {
                drawMenuElements();
            }

            PreferenceSubscreenUBCMoanerClick = function() {
                handleMenuClicks();
            }

            PreferenceSubscreenUBCMoanerExit = function() {
                let profile = ElementValue("InputMoanProfile");
                if ((CommonIsNumeric(profile)) && (profile > -1) && (profile < 11)) {
                    Player.UBC.ubcSettings.profile = profile;
                    ElementRemove("InputMoanProfile");
                    defaultExit();
                } else PreferenceMessage = "Put a valid number";
            }

            PreferenceSubscreenUBCSpecialModesLoad = function() {
                UBCPreferenceSubscreen = "UBCSpecialModes";
                addMenuCheckbox(64, 64, "Enable no-escape mode: ", "noescape",
                    "This mode disables the FREE/OUT buttons and hotkeys, and prevents to use some commands for yourself: boost, leave (BCAR), quit, safeworditem, safewordspecific (BCAR), slowleave, solidity (if value < 20), totalrelease, unlock, untie. If you are in unrestrict total mode when selecting this option, an automatic relog will disable the special goddess mode.", false, 120
                );
                addMenuCheckbox(64, 64, "Enable silent mode: ", "silent",
                    "This mode prevents to use the message command and has as main effect that these commands will not display a message in chat rooms: clothes, invisible, lock, naked, pet, randomize, restrain, solidity, totalrelease, underwear, unlock, untie, visible. To go back to default messages and have access again to the message command, you will need to disable this mode.", false, 120
                );
                addMenuCheckbox(64, 64, "Enable unrestrict soft mode: ", "usoft",
                    "This mode adds all hidden items to your inventory, allows to use special items such as suitcase, wooden maid tray or paddle on yourself or other players in this mode, and preserves the examine feature when you are blind if you don't have choosen Total sensory deprivation. It does not remove the conditions to use assets. All these effects are also included in the unrestrict total mode. You will need to make a full relog to leave this mode (if you uncheck the box, it will have no any effect).", false, 120
                );
                addMenuCheckbox(64, 64, "Enable unrestrict total mode: ", "utotal",
                    "Besides all unrestrict soft effects, this goddess mode allows to be domme and submissive at the same time, even if you are bound.  One of its effects (simulation that you have the appropriate keys) can be blocked by Uwall and allowed by Ulist. This mode is not available if you are in no-escape mode. It can trigger a BCX warning. Just ignore it (close the breaking message)! You will need to make a full relog to leave this special mode (if you uncheck the box, it will have no any effect).", "Player.UBC.ubcSettings.noescape", 120
                );
            }

            PreferenceSubscreenUBCSpecialModesRun = function() {
                drawMenuElements();
            }

            PreferenceSubscreenUBCSpecialModesClick = function() {
                handleMenuClicks();
            }

            PreferenceSubscreenUBCSpecialModesExit = function() {
                defaultExit();
            }

            PreferenceSubscreenUBCTalkingLoad = function() {
                UBCPreferenceSubscreen = "UBCTalking";
                addMenuInput(200, "Animal talk/whisper mode (0-9):", "animal", "InputAnimalMode",
                    "Input a number between 0 and 9 to select one of these forced 'permanent' animal talk or whisper modes: 0 Human - 1 Bunny - 2 Cow - 3 Fox  - 4 Kitty - 5 Mouse - 6 Pig - 7 Pony - 8 Puppy - 9 Wolfy. If you want to only once talk in a specific talk mode, use the /atalk command after having selected here 0 (human talk).", -16
                );
                addMenuCheckbox(64, 64, "Enable hybrid talk/whisper mode: ", "ahybrid",
                    "When enabled and associated with an animal talk mode, all your chat messages and whispers will combine animal words and human words!", false, 120
                );
                addMenuCheckbox(64, 64, "Enable doll talk (and whisper) mode: ", "dolltalk",
                    "When enabled, maximum 5 words by message or whisper, and you can't use words with more than 6 characters. The respect of these rules is checked in the original version of your message or whisper, before its altering by stuttering, the Moaner, babytalk, gagtalk, animal talk.", false, 120
                );
                addMenuInput(200, "Forced gagtalk/whisper (0-11):", "gaglevel", "InputGagLevel",
                    "Input a number between 0 and 11 to select a 'permanent' forced level: 0 Disabled feature - 1 Almost no gag - 2 Very light gag - 3 Light gag - 4 Easy gag - 5 Normal gag - 6 Medium gag - 7 Heavy gag - 8 Better heavy gag - 9 Very heavy gag - 10 Total gag - 11 Baby talk. If you are really gagged, your choice can only increase the effect, not decrease it. To only once gagtalk, use the /gtalk command. To talk only once like a baby, use /btalk. See also the RGL button.", -16
                );
                addMenuInput(200, "Forced hearing mode (1-6):", "hearing", "InputHearingMode",
                    "Input a number between 1 and 6 to select one of these forced 'permanent' hearing modes, ignoring your real state: 1 No deafness - 2 Light deafness -  3 Normal deafness - 4 Heavy deafness  - 5 Very heavy deafness - 6 Total deafness. Note that you will need to make a full relog to leave this special mode (if you input 0, it will have no any effect). This mode can trigger a BCX warning. Just ignore it (close the breaking message)!", -16
                );
                addMenuInput(200, "Forced stuttering level (0-4):", "stutterlevel", "InputStutterLevel",
                    "Input a number between 0 and 4 to select one of these forced 'permanent' stuttering levels to talk or whisper: 0 No stuttering - 1 Light stuttering - 2 Normal stuttering - 3 Heavy stuttering  - 4 Total stuttering. Note that if you are vibed, your choice can only increase the effect, not decrease it. If you want to only once talk with a specific stuttering level, use the /stalk command after having selected here 0 (no stuttering).", -16
                );
                let wmsg = "When enabled, you can't use normal whispers. Only OOC and emote whispers are possible. This option is not available when a similar BCX rule is detected as active. In this case, UBC will apply the BCX whisper restrictions, but will not send public messages or add entries to the behaviour log if you try to whisper when it is not allowed.";
                let wbc = 0;
                if (Player.OnlineSettings.BCX != undefined) {
                    let str = Player.OnlineSettings.BCX;
                    let d = LZString.decompressFromBase64(str);
                    let BCXdata = {};
                    let decoded = JSON.parse(d);
                    BCXdata = decoded;
                    if (BCXdata.conditions != undefined) {
                        if (BCXdata.conditions.rules != undefined) {
                            if (BCXdata.conditions.rules.conditions != undefined) {
                                if (BCXdata.conditions.rules.conditions.speech_restrict_whisper_send != undefined) {
                                    BCXwh1 = BCXdata.conditions.rules.conditions.speech_restrict_whisper_send;
                                    if (BCXwh1.active) wbc = 1;
                                }
                            }
                        }
                    }
                }
                if (wbc == 0) {
                    addMenuCheckbox(64, 64, "Enable no-whisper mode: ", "nowhisper", wmsg, false, 120);
                } else {
                    addMenuCheckbox(64, 64, "Enable no-whisper mode: ", "nowhisper", wmsg, true, 120);
                }
            }

            PreferenceSubscreenUBCTalkingRun = function() {
                drawMenuElements();
            }

            PreferenceSubscreenUBCTalkingClick = function() {
                handleMenuClicks();
            }

            PreferenceSubscreenUBCTalkingExit = function() {
                let glevel = ElementValue("InputGagLevel");
                let hmode = ElementValue("InputHearingMode");
                let pmode = ElementValue("InputAnimalMode");
                let stlevel = ElementValue("InputStutterLevel");
                if ((CommonIsNumeric(glevel)) && (glevel > -1) && (glevel < 12) &&
                    (CommonIsNumeric(hmode)) && (hmode > -1) && (hmode < 7) &&
                    (CommonIsNumeric(pmode)) && (pmode > -1) && (pmode < 10) &&
                    (CommonIsNumeric(stlevel)) && (stlevel > -1) && (stlevel < 5)) {
                    Player.UBC.ubcSettings.animal = pmode;
                    Player.UBC.ubcSettings.gaglevel = glevel;
                    Player.UBC.ubcSettings.hearing = hmode;
                    Player.UBC.ubcSettings.stutterlevel = stlevel;
                    ElementRemove("InputAnimalMode");
                    ElementRemove("InputGagLevel");
                    ElementRemove("InputHearingMode");
                    ElementRemove("InputStutterLevel");
                    defaultExit();
                } else PreferenceMessage = "Put a valid number";
            }

            PreferenceSubscreenUBCVisualLoad = function() {
                UBCPreferenceSubscreen = "UBCVisual";
                addMenuCheckbox(64, 64, "Disable background color for UBC messages: ", "noubccolor",
                    "If you check this setting, UBC will not use a specific hard-coded color as background for its local messages in the chat rooms.", false, 192
                );
                addMenuInput(200, "Forced blindness mode (1-4):", "blindness", "InputBlindnessMode",
                    "Input a number between 1 and 4 to select one of these forced 'permanent' blindness modes, ignoring your real state: 1 No blindness - 2 Light blindness -  3 Normal blindness - 4 Heavy blindness. Note that you will need to make a full relog to leave this special mode (if you input 0, it will have no any effect). This mode can trigger a BCX warning. Just ignore it (close the breaking message)!", 60
                );
                addMenuInput(200, "Forced blurry vision (1-5):", "blurmode", "InputBlurMode",
                    "Input a number between 1 and 5 to select one of these forced 'permanent' blurry vision modes, ignoring your real state: 1 No blurry vision - 2 Light blurry vision -  3 Normal blurry vision - 4 Heavy blurry version - 5 Total blurry vision. Note that you will need to make a full relog to leave this special mode (if you input 0, it will have no any effect). This mode can trigger a BCX warning. Just ignore it (close the breaking message)!", 60
                );
                addMenuInput(200, "Forced global blur level (0-4):", "blureffect", "InputBlurEffect",
                    "Input a number between 0 and 4 to select one of these forced 'permanent' global blur levels: 0 No blur effect - 1 Light blur effect - 2 Normal blur effect - 3 Heavy blur effect - 4 Total blur effect. Note that all will be blurred, also your own character!", 60
                );
                addMenuCheckbox(64, 64, "Fully disable all UBC tint settings: ", "tintnever",
                    "If you check this setting, all UBC tint settings (level, color, MBS) will be fully disabled. However, a full relog is required to restore the original or themed colors on the MBS screens.", false, 192
                );
                addMenuInput(200, "Tint effect level (0-3):", "tintlevel", "InputTintLevel",
                    "Input a number between 0 and 3 to select one of these forced 'permanent' tint effect levels: 0 No tint effect - 1 Light tint effect - 2 Medium tint effect - 3 Heavy tint effect.", 60
                );
                addMenuInput(200, "Tint effect color (format #000000):", "tintcolor", "InputTintColor",
                    "Input a color code in the hexadecimal format #000000 to apply a tint effect almost everywhere in the Bondage Club. Don't forget to select a tint effect level too! The tint effect will also be applied on pages created by most add-ons. Known exceptions are BCX and Echo's mod. MBS case is special (see specific setting). The final color can be different when mixed with a Themed color.", 60
                );
                let mbsmsg = "When enabled, ALWAYS visit the Extensions screen to activate it after login. The tint color will be used as background color for the central part of MBS screens. If you disable it later, the restored color will correspond to the default MBS color or the main Themed color. This setting is without any effect when the tint level is 0. It is not available when MBS is not used or when all UBC tint settings are fully disabled.";
                let mbb = 0;
                let list = PreferenceExtensionsDisplay;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].Button == "MBS Settings") mbb = 1;
                }
                if (mbb == 0) {
                    addMenuCheckbox(64, 64, "Enable tint effect on MBS screens: ", "tintmbs", mbsmsg, true, 192);
                } else {
                    addMenuCheckbox(64, 64, "Enable tint effect on MBS screens: ", "tintmbs", mbsmsg, "Player.UBC.ubcSettings.tintnever", 192);
                }
            }

            PreferenceSubscreenUBCVisualRun = function() {
                drawMenuElements();
            }

            PreferenceSubscreenUBCVisualClick = function() {
                handleMenuClicks();
            }

            PreferenceSubscreenUBCVisualExit = function() {
                let blmode = ElementValue("InputBlindnessMode");
                let brmode = ElementValue("InputBlurMode");
                let effect = ElementValue("InputBlurEffect");
                let regex = /^#(([0-9a-f]{3})|([0-9a-f]{6}))$/i;
                let ttcolor = ElementValue("InputTintColor");
                let ttlevel = ElementValue("InputTintLevel");
                if ((CommonIsNumeric(blmode)) && (blmode > -1) && (blmode < 5) &&
                    (CommonIsNumeric(brmode)) && (brmode > -1) && (brmode < 6) &&
                    (CommonIsNumeric(effect)) && (effect > -1) && (effect < 5) &&
                    (CommonIsNumeric(ttlevel)) && (ttlevel > -1) && (ttlevel < 4) &&
                    (ttcolor.startsWith("#")) && (ttcolor.match(regex))) {
                    Player.UBC.ubcSettings.blindness = blmode;
                    Player.UBC.ubcSettings.blureffect = effect;
                    Player.UBC.ubcSettings.blurmode = brmode;
                    Player.UBC.ubcSettings.tintcolor = ttcolor;
                    Player.UBC.ubcSettings.tintlevel = ttlevel;
                    ElementRemove("InputBlindnessMode");
                    ElementRemove("InputBlurEffect");
                    ElementRemove("InputBlurMode");
                    ElementRemove("InputTintColor");
                    ElementRemove("InputTintLevel");
                    defaultExit();
                } else PreferenceMessage = "Put a valid number";
            }

            function keyHandler(e) {
                if (e.key === "Escape" && !!UBCPreferenceSubscreen && UBCPreferenceSubscreen !== "UBCSettings") {
                    CommonCallFunctionByName(`PreferenceSubscreen${UBCPreferenceSubscreen}Exit`);
                    e.stopPropagation();
                    e.preventDefault();
                }
            }

            document.addEventListener("keydown", keyHandler, true);
            document.addEventListener("keypress", keyHandler, true);

            PreferenceRegisterExtensionSetting({
                Identifier: "UBCSettings",
                ButtonText: "ULTRAbc Settings",
                Image: IMAGES.LOGO,
                click: PreferenceSubscreenUBCSettingsClick,
                run: PreferenceSubscreenUBCSettingsRun,
                exit: PreferenceSubscreenUBCSettingsExit,
                load: PreferenceSubscreenUBCSettingsLoad,
            });
        }

        const IMAGES = {
            LOGO: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAACXBIWXMAAAsTAAALEwEAmpwYAAAI00lEQVR4nO1caWxVVRD+4Gm0iitYl7qh4BaJUnewBHdRLAqK4oL+kLpHXHEF1yhGo9EaF1DcF9wSFzBuUUCJGBWQ1KhxBbdiiGALRWlrJplrxvEsc0vbe7H3S+6P9+7cOXPmnTMzZ2buAwoUKFCgQIEugt4A5gBoAfAWgF5ZC7Qm4k0AreKakrVAaxoOUAqkaxWAvlkLtibhDYcS6ZqctWB5xVoAzgPwHIC5ABqE0sgejleK/B3ARwCeAnAqgG5ZTyAPuMOz6uh6npX0YYDmAvyPMAxALYDTAZQc99cFUOb4/nuHYlbwytyYabYFMB3Anw7adx08y3g8jRLLdw+AauQMo9XEPgawD9+rBPA4gCYAfwG4MWL/rgDQPbD1axX9g4rmRh6nicel8cHyfKyePQ05wiuOFdLMNs61BfcUz+4AYKHywsd5xrlA8flMxY+VnvHmsjz6e5I7N5gasFmua4gjsP5W3CelamwAYLmg+cQRgB+VUg4yGbnBXUqwWWpFzlQet9zBo59ajdrrbqPub+rgUc78E7qZagXOYvmSzyR3bnC5iuVIAYcAGMMBcrW4X+fhMUjQfAmgJ4AJAF4CcBmAjdjhJDTbefjUCZphPP4Ylqcby5fcJ7lzgUoAi4Rg9ztoJoj7T3v4nCto6gEsVVvvVwB/iM9He/g8LWhoXI37xf1FwvFkhmoVHNM2G+igO1/RVEdMguUa65FnlaChcTUOVDQNvGIzwT4cSrTy1RjwquupbUYOYoCiuTSlEo9Xzw9QjudzAOt75DlO/fg0j72QAfRx7Bs+fRzqoKXJVCnBf+C4T9IkodJPvNLITs4H8CxvzSXsKCarWHJtFSY18LMuJR7Kcn6t5L8GGWB4YJXczjTkDKap7dMacQ49PCeeRFmuU09vD38a9zWWI3bE9O2iDgV5uusALHYI1MxBdCh+/CJwMpHoxcoLocQe3TfWVJbHFXAv9jigTkdfzqgsEMK945nQpwAe4dUTQw1P/BtxjvaBlPQo83eNK+VZwPLmMj95SsQZkOFfJwW/t8WzRxqfWUfFk66L5Ow0kOE/jDPN1gnUK4H/5GPeTQAGpxx/hiEudOEgHm+II/NTn+KHPIDnLx1gKtBAs1XKaVcV4jzCub7xwr5dq4SeKJ6hlNYJ7DwskMdFOhfHQHxHANhafDdRyXM1f9+dbeEcnkeSdQLP813xzOyUO+gfDHNsg5UA7laTa1XJ0RLHfC9zWiv5FcvEKqXcoAVynMMN9NOZ9meRT6Txr2R5LhU/9oWOOczk+a103GtTQH5SxK7o6ymDl02SA83GEui14sgXo+8lvG8Ln71DeCbl/EgfqTFIhQHzHGHMcvGZwp0Y5rXBuO8OYBMD3cmCN40Tw3XqtKXDn3kqfCN9pEYfwWAJb4uzALwA4Ba+v1DQHGzgObED68hTPHbYh4MF/UKez608vxqe7xJBQ/dT4yLBoMmR39tW2coyA8/9xZamOkcMA9lO3Wao6t0ntjKNE0OZsn00H4luPO/kPunDjJKjjkF1EI0dFU2NkT9lWi4xeuj3BP9YgmBDAONSOIAaJT/NJ9aFURs4kv4LT6oHKQGwlYf2dUOKC55Uf+wEAnX6GGzgaQ2ddMqM5uFCBddxpD6o+BWETMEn2/gcANt76HuqFFejwXb05+Tqck/uUWKu0bAP5LEpkbtHhGdfpk341gU8+fY8f7mtW1Uc6gwTXBkXsjMPC7tUxWn7+QB+U7SUyreWEu6N0M4XtDSmD7Upxh+n5P2Nx3lJjNGNHZWs18jcYzQ8u8qT7aBrFIcc8pdsVRedSKw1akqThfCKEFwbfolpgifxD2FkQPZGnp8Ml3RYR4G7CRWssDtVZuZ97hV0DdDEKyKW3qpSWymELfhoFjut1BlXLFi+ez2nklae3/vi8wLWwyjWS5vQO7AyW/kaYMj5ScUk2+Q7tA+SVpQW5m/B2lxvCc2r2ZiyM+E1xwDUmfUj13FNbl/gam7piG39cg6HYlmkUXzCoGNiGpS4aepHno+eI8273TBEMf9jdZZ2G368FZ6Cf3uiQpVk0+QwzbgewDLeOjItdTZnSGhrWLELH6/GR04iMuW/d6RMQTtipxQyDGLHRfInGMomZqkxF9Au2FzYtx9SbOsXhXJCyv9K0FUaHBX9MBaUWN7Ejnb0Kg9iXdWpYEmcyrxfLMUky5oUpLtwoqCx5ill49NSTy9jp+KBNqwEWQWkPhkfZHjlOwmdKWiIrwUviGdI/syxrwpWLZBNRZRhDp1x53EWx4cL29AYLw8LJH8uMC3lShzJtmilqm20BftxMaqF+aZZia8iRyhx3ddSjE+wWyCxIT1vH0ORaAfmZ0V3HjttfNvhKHFTubUdo59hFSaJhbmRsmVlCiVSI9QZeVQguAEpsTPHIozB4igZqrUsMjiWpKC2ylAHGR5pzcscN0QaPX3pqFA67BdBt5MhDUZ8rZGEfoshF6hOUW273KjwesNKfCBFLlHmJ49BDlEuBFwVSdVfImgnGVeizwlNEjTE14ceKuGc6SklhM9Ek6WvSxXckZVMhsqUiKyyjwKO4Dbjyz09RHxoqUtnhp1ZKVWGXN4tvJV7GkKcUK5yMw6yJxpymnROv7mtNeQCaxDKOCU1m+PA1cVoNhFJJ5evejeDC01UNvWhP3ewTTU2GmSGE4R9eixC28+Qg0wcS0ugTn23MZnxRODNg1zhZCHoq5E6cbNh4ssEP18m/SFjq4cssFEPY24xQghKLRiW0w0poTOU+IGgOwI5xlAhKNkpS7NUSImy5rFVV1HikUJQci6rq8RlXV2JHwToipWYkRK39NAUKxGFEouVmOV2Hmvczg2G7Ty5qzqWsR2kxIsDvAolwt/tVSgR9pVYKLEdtnOhRIVCiRk5li08NIVNRKHE/+CgyF/yJTjHWDKV79a5/tYKXLcO/Q9OAvn+ctqX1zsVZfx/XA3cN+hDBXfBLo68hzeBm57ope5QQ1M9N4TSy0wIdEo08ruCuS4PFChQoEABdG38DUyk6jipIs9DAAAAAElFTkSuQmCC"
        }
    }
    // End of section under GPLv3 license

    //ModSDK Functions
    ULTRAActivityChatRoomArousalSync();
    ULTRAAppearanceClick();
    ULTRAAppearanceRun();
    ULTRAAsylumEntranceStartChat();
    ULTRAAsylumMeetingClubCardStart();
    ULTRABackgroundsTextGet();
    ULTRACafeClubCardStart();
    ULTRACellClick();
    ULTRACellLoad();
    ULTRACellRun();
    ULTRAChatAdminClick();
    ULTRAChatAdminRun();
    ULTRAChatRoomClick();
    ULTRAChatRoomKeyDown();
    ULTRAChatRoomMapViewCalculatePerceptionMasks();
    ULTRAChatRoomMapViewCanEnterTile();
    ULTRAChatRoomMapViewCharacterOnWhisperRange();
    ULTRAChatRoomMapViewMovementProcess();
    ULTRAChatRoomMapViewTeleportHiddenMessage();
    ULTRAChatRoomMenuDraw();
    ULTRAChatRoomSafewordRevert();
    ULTRAChatRoomSendChat();
    ULTRAChatSearchClick();
    ULTRAChatSearchExit();
    ULTRAChatSearchJoin();
    ULTRAChatSearchParseResponse();
    ULTRAChatSearchQuery();
    ULTRAChatSearchRoomSpaceSelectClick();
    ULTRAChatSearchRoomSpaceSelectDraw();
    ULTRAChatSearchRun();
    ULTRAChatSearchUnload(); 
    ULTRAClubCardBuilderClick();
    ULTRAClubCardBuilderLoad();
    ULTRAClubCardCheckVictory();
    ULTRAClubCardClick();
    ULTRAClubCardEndTurn();
    ULTRAClubCardGetReward();
    ULTRAClubCardLoadDeckNumber();
    ULTRAClubCardLoungePraticeGameStart();
    ULTRAClubCardRenderPanel();
    ULTRACommandAutoComplete();
    ULTRACommandExecute();
    ULTRADrawCharacter();
    ULTRADrawRoomBackground();
    ULTRAFriendListDraw();
    ULTRAFriendListKeyDown(); 
    ULTRAInfiltrationClubCardStart();
    ULTRAIntroductionClubCardStart();
    ULTRAKidnapLeagueRandomClubCardStart();
    ULTRALARPClubCardStart();
    ULTRALoginClick();
    ULTRALoginRun();
    ULTRAMagicPuzzleRun();
    ULTRAMagicSchoolEscapeSpellEnd();
    ULTRAMainHallClick();
    ULTRAMainHallRun();
    ULTRAMovieStudioClubCardStart();
    ULTRAPandoraClubCardStart();
    ULTRAPandoraPenitentiaryResult();
    ULTRAPandoraPrisonClick();
    ULTRAPandoraPrisonRun();
    ULTRAPhotographicClick();
    ULTRAPhotographicRun();
    ULTRAPlatformAttack();
    ULTRAPlatformDialogEvent();
    ULTRAPreferenceClick();
    ULTRAPreferenceRun();
    ULTRAPreferenceSubscreenOnlineClick();
    ULTRAPreferenceSubscreenOnlineRun();
    ULTRAPrivateClick();
    ULTRAPrivateClubCardVsFriendStart();
    ULTRAPrivateClubCardVsOwnerStart();
    ULTRAPrivateClubCardVsSubStart();
    ULTRAPrivateGetClubCardDeck();
    ULTRAPrivateRun();
    ULTRAShibariClubCardStart(); 
    ULTRAStableClubCardStart();
    ULTRAStablePlayerTrainingCarrotsEnd();
    ULTRAStablePlayerTrainingHurdlesEnd();
    ULTRAStableRun();
    ULTRAStruggleMinigameWasInterrupted();
    ULTRATitleExit();

    ULTRAArcadeRun();
    ULTRAAsylumBedroomRun();
    ULTRAAsylumEntranceRun();
    ULTRAAsylumGGTSRun();
    ULTRAAsylumMeetingRun();
    ULTRAAsylumTherapyRun();
    ULTRACafeRun();
    ULTRAChatAdminRoomCustomizationRun();
    ULTRAChatSelectRun();
    ULTRAChestLockpickRun();
    ULTRAClubCardBuilderRun();
    ULTRAClubCardLoungeRun();
    ULTRAClubCardRun();
    ULTRACollegeCafeteriaRun();
    ULTRACollegeChessRun();
    ULTRACollegeDetentionRun();
    ULTRACollegeEntranceRun();
    ULTRACollegeTeacherRun();
    ULTRACollegeTennisRun();
    ULTRACollegeTheaterRun();
    ULTRACraftingRun();
    ULTRADojoStruggleRun();
    ULTRAGamblingRun();
    ULTRAGetUpRun();
    ULTRAHorseWalkRun();
    ULTRAInfiltrationRun();
    ULTRAInformationSheetRun();
    ULTRAIntroductionRun();
    ULTRAKidnapLeagueRun();
    ULTRAKidnapRun();
    ULTRALARPRun();
    ULTRAMagicRun();
    ULTRAMagicBattleRun();
    ULTRAMagicSchoolEscapeRun();
    ULTRAMagicSchoolLaboratoryRun();
    ULTRAMaidCleaningRun();
    ULTRAMaidDrinksRun();
    ULTRAMaidQuartersRun();
    ULTRAManagementRun();
    ULTRAMovieStudioRun();
    ULTRANurseryRun();
    ULTRAOnlineProfileRun();
    ULTRAPandoraRun();
    ULTRAPlatformIntroRun();
    ULTRAPlatformDialogRun();
    ULTRAPlatformProfileRun();
    ULTRAPlatformRun();
    ULTRAPlayerAuctionRun();
    ULTRAPokerRun();
    ULTRAPrisonRun();
    ULTRAPuppyWalkerRun();
    ULTRARhythmGameRun();
    ULTRASarahRun();
    ULTRAShibariRun();
    ULTRAShopRun();
    ULTRASlaveAuctionRun();
    ULTRASlaveMarketRun();
    ULTRATennisRun();
    ULTRATherapyRun();
    ULTRATitleRun();
    ULTRAWheelFortuneRun();

    //Backgrounds
    async function ULTRABackgroundsTextGet(msg) {
        modApi.hookFunction('BackgroundsTextGet', 4, (args, next) => {
            let fixname = next(args);
            if (fixname.startsWith("MISSING")) {
                let background = BackgroundsList.find(bg => bg === args[0]);
                return `${background ?? args[0]}`;
            }
            return fixname;
        });
    }

    //Bondage Brawl
    async function ULTRAPlatformAttack() {
        modApi.hookFunction('PlatformAttack', 4, (args, next) => {
            if (magiccheat == true) BrawlCheat();
            next(args);
        });
    }

    async function ULTRAPlatformDialogEvent() {
        modApi.hookFunction('PlatformDialogEvent', 4, (args, next) => {
            if (magiccheat == true) BrawlCheat();
            next(args);
        });
    }

    //Chat Room (+ name/nickname/pronouns management for player)
    async function ULTRAAsylumEntranceStartChat() {
        modApi.hookFunction('AsylumEntranceStartChat', 4, (args, next) => {
            if (asylumlimit == true) {
                ChatRoomStart("Asylum", "", "AsylumEntrance", "Room", "AsylumEntrance", [BackgroundsTagAsylum]);
            } else {
                ChatSelectStartSearch(ChatRoomSpaceType.ASYLUM);
            }
            return;
        });
    }

    async function ULTRAChatAdminClick() {
        modApi.hookFunction('ChatAdminClick', 4, (args, next) => {
            if (ChatAdminCanEdit()) {
                if (MouseIn(1230, 450, 60, 60)) {
                    if ((asylumlimit == true) && (ChatRoomSpace == "Asylum")) {
                        let AsylumList = BackgroundsGenerateList([BackgroundsTagAsylum]);
                        let listbg = AsylumList.length;
                        let Roll = Math.floor(Math.random() * listbg);
                        if (Roll == 0) Roll = 1;
                        let name = AsylumList[Roll - 1].Name;
                        ChatAdminData.Background = ChatAdminBackgroundList[Roll];
                    } else {
                        let listbg = BackgroundsList.length;
                        let Roll = Math.floor(Math.random() * listbg);
                        if (Roll == 0) Roll = 1;
                        let name = BackgroundsList[Roll - 1].Name;
                        ChatAdminData.Background = ChatAdminBackgroundList[Roll];
                    }
                    return;
                }
            }
            next(args);
        });
    }

    async function ULTRAChatAdminRun() {
        modApi.hookFunction('ChatAdminRun', 4, (args, next) => {
            TintsEffect();
            ChatAdminGameList = ["", "ClubCard", "LARP", "MagicBattle", "GGTS", "Prison"];
            if (ChatAdminCanEdit()) {
                DrawButton(1230, 450, 60, 60, "", "White", "", "Random background");
            } else {
                DrawButton(1230, 450, 60, 60, "", "Gray", "", "Random background");
            }
            DrawImageResize("Icons/Random.png", 1230, 450, 60, 60);
            next(args);
        });
    }

    async function ULTRAChatRoomClick() {
        modApi.hookFunction('ChatRoomClick', 4, (args, next) => {
            if (extbuttons == true) {
                if ((MouseX >= 955) && (MouseX < 1000) && (MouseY >= 270) && (MouseY < 315)) {
                    ExtClick();
                    return;
                }
            }
            if ((sosbuttons == true) && (noescape == false)) {
                if ((MouseX >= 955) && (MouseX < 1000) && (MouseY >= 315) && (MouseY < 360)) {
                    let msg = "Magical lasers make disappear all bindings and toys on " + tmpname + "'s body.";
                    if (Totalrelease != undefined) {
                        if (Totalrelease != "") {
                            if (Totalrelease.startsWith("\u0027")) {
                                msg = tmpname + Totalrelease;
                            } else {
                                msg = tmpname + ' '.repeat(1) + Totalrelease;
                            }
                        }
                    }
                    if (Totalrelease != "no message") publicmsg(msg);
                    SosClick();
                    return;
                }
            }
            if ((outbuttons == true) && (noescape == false)) {
                if ((MouseX >= 955) && (MouseX < 1000) && (MouseY >= 360) && (MouseY < 405)) {
                    if (slowleave == true) {
                        let msg = "" + tmpname + " slowly heads for the door.";
                        publicmsg(msg);
                        setTimeout(function() {
                            OutChat();
                        }, 15000);
                        return;
                    } else {
                        OutChat();
                    }
                }
            }
            if (rglbuttons == true) {
                if ((MouseX >= 955) && (MouseX < 1000) && (MouseY >= 405) && (MouseY < 450)) {
                    RealGarblingLevel();
                    return;
                }
            }
            next(args);
        });
    }

    async function ULTRAChatRoomKeyDown() {
        modApi.hookFunction('ChatRoomKeyDown', 4, (args, next) => {
            const ret = next(args);
            if ((hotkeys == true) && (noescape == false)) {
                if (event.code === "NumpadDivide") {
                    OutChat();
                    return true;
                }
                if (event.code === "NumpadMultiply") {
                    SosClick();
                    return true;
                }
            }
            return ret;
        });
    }

    async function ULTRAChatRoomMapViewCalculatePerceptionMasks() {
        modApi.hookFunction('ChatRoomMapViewCalculatePerceptionMasks', 4, (args, next) => {
            const ret = next(args);
            if ((mapfull) || (mapfull2)) {
                if ((ChatRoomData.MapData == null) || (ChatRoomData.MapData.Type == null) || (ChatRoomData.MapData.Type == "Never")) return;
                if (mapfull) ChatRoomMapViewVisibilityMask.fill(true);
                if (mapfull2) ChatRoomMapViewAudibilityMask.fill(true);
                return;
            }
            return ret;
        });
    }

    async function ULTRAChatRoomMapViewCanEnterTile() {
        modApi.hookFunction('ChatRoomMapViewCanEnterTile', 4, (args, next) => {
            const ret = next(args);
            if (mapcheat) return 20;
            return ret;
        });
    }

    async function ULTRAChatRoomMapViewCharacterOnWhisperRange() {
        modApi.hookFunction('ChatRoomMapViewCharacterOnWhisperRange', 4, (args, next) => {
            const ret = next(args);
            if (nowhrange) return true;
            return ret;
        });
    }

    async function ULTRAChatRoomMapViewMovementProcess() {
        modApi.hookFunction('ChatRoomMapViewMovementProcess', 4, (args, next) => {
            const {
                X: posX,
                Y: posY
            } = Player.MapData.Pos;
            const ret = next(args);
            if (Player.MapData.Pos.X < 0) Player.MapData.Pos.X = Player.MapData.Pos.X + 1;
            if (Player.MapData.Pos.Y < 0) Player.MapData.Pos.Y = Player.MapData.Pos.Y + 1;
            if (Player.MapData.Pos.X > 39) Player.MapData.Pos.X = Player.MapData.Pos.X - 1;
            if (Player.MapData.Pos.Y > 39) Player.MapData.Pos.Y = Player.MapData.Pos.Y - 1;
            if (posX !== Player.MapData.Pos.X || posY !== Player.MapData.Pos.Y) {
                const newTile = ChatRoomMapViewGetTileAtPos(Player.MapData.Pos.X, Player.MapData.Pos.Y);
                const newObject = ChatRoomMapViewGetObjectAtPos(Player.MapData.Pos.X, Player.MapData.Pos.Y);
                if (!newObject) return ret;
                let item1 = newObject.Type;
                let item2 = newObject.Style;
                if ((item1 == "FloorItem") && (item2 != "Blank")) {
                    if ((item2 == "BondageBench") && ((maptrap1 == 1) || (maptrap1 == 9))) {
                        BondageBenchTrap();
                        let msg = "" + tmpname + " is suddenly trapped on a Bondage Bench.";
                        publicmsg(msg);
                    }
                    if ((item2 == "Coffin") && ((maptrap1 == 2) || (maptrap1 == 9))) {
                        CoffinTrap();
                        let msg = "" + tmpname + " is suddenly trapped in a Coffin";
                        publicmsg(msg);
                    }
                    if ((item2 == "TheDisplayFrame") && ((maptrap1 == 3) || (maptrap1 == 9))) {
                        DisplayFrameTrap();
                        let msg = "" + tmpname + " is suddenly trapped in a Display Frame.";
                        publicmsg(msg);
                    }
                    if ((item2 == "Kennel") && ((maptrap1 == 4) || (maptrap1 == 9))) {
                        KennelTrap();
                        let msg = "" + tmpname + " is suddenly trapped in a Kennel.";
                        publicmsg(msg);
                    }
                    if ((item2 == "Locker") && ((maptrap1 == 5) || (maptrap1 == 9))) {
                        LockerTrap();
                        let msg = "" + tmpname + " is suddenly trapped in a Locker.";
                        publicmsg(msg);
                    }
                    if ((item2 == "Trolley") && ((maptrap1 == 6) || (maptrap1 == 9))) {
                        TrolleyTrap();
                        let msg = "" + tmpname + " is suddenly trapped on a Trolley.";
                        publicmsg(msg);
                    }
                    if ((item2 == "WoodenBox") && ((maptrap1 == 7) || (maptrap1 == 9))) {
                        WoodenBoxTrap();
                        let msg = "" + tmpname + " is suddenly trapped in a Wooden Box.";
                        publicmsg(msg);
                    }
                    if ((item2 == "X-Cross") && ((maptrap1 == 8) || (maptrap1 == 9))) {
                        XCrossTrap();
                        let msg = "" + tmpname + " is suddenly trapped on an X-Cross.";
                        publicmsg(msg);
                    }
                }
            }
            return ret;
        });
    }

    async function ULTRAChatRoomMapViewTeleportHiddenMessage() {
        modApi.hookFunction('ChatRoomMapViewTeleportHiddenMessage', 4, (args, next) => {
             if (noteleport) {
                let bltp = 1;
                if (Player.OnlineSharedSettings.Tplist != undefined) {
                    let adm = 0;
                    while (adm < ChatRoomData.Admin.length) {
                        if (Player.OnlineSharedSettings.Tplist.includes(ChatRoomData.Admin[adm])) bltp = 0;
                        adm++;
                    }
                 }
                 if (bltp == 1) {
                     let msg = "A teleportation attempt has been cancelled because not allowed.";
                     publicmsg(msg);
                     return; 
                 }
             }
             next(args);
        });
    }

    async function ULTRAChatRoomMenuDraw() {
        modApi.hookFunction('ChatRoomMenuDraw', 4, (args, next) => {
            TintsEffect();
            if (kp != 1) {
                if (tmpname == "") {
                    if (Player.Nickname == '') {
                        tmpname = Player.Name;
                    } else {
                        tmpname = Player.Nickname;
                    }
                    if (ini == 1) M_MOANER_saveControls();
                } else {
                    if (Player.Nickname != '') {
                        if (tmpname != Player.Nickname) {
                            tmpname = Player.Nickname;
                            if (ini == 1) M_MOANER_saveControls();
                        }
                    } else {
                        if (tmpname != Player.Name) {
                            tmpname = Player.Name;
                            if (ini == 1) M_MOANER_saveControls();
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
                                if (ini == 1) M_MOANER_saveControls();
                            } else if (chprn == "SheHer") {
                                pronoun1 = "She";
                                pronoun2 = "her";
                                pronoun3 = "her";
                                pronoun4 = "she";
                                if (ini == 1) M_MOANER_saveControls();
                            } else {
                                pronoun1 = "They";
                                pronoun2 = "them";
                                pronoun3 = "their";
                                pronoun4 = "they";
                                if (ini == 1) M_MOANER_saveControls();
                            }
                        }
                    }
                }
            }
            if (extbuttons == true) {
                DrawButton(955, 270, 45, 45, "", "White", "", "");
                DrawImageResize("Icons/Extensions.png", 960, 272, 40, 40);
            }
            if (sosbuttons == true) SosButtons();
            if (outbuttons == true) OutButtons();
            if (rglbuttons == true) DrawButton(955, 405, 45, 45, "RGL", "White", "", "");
            let chmap = ChatRoomCharacterViewIsActive();
            if ((chmap == false) && (Player.OnlineSharedSettings.Inmap == false)) {
                Player.OnlineSharedSettings.Inmap = true;
                ServerAccountUpdate.QueueData({
                    OnlineSharedSettings: Player.OnlineSharedSettings
                });
            } else if ((chmap == true) && (Player.OnlineSharedSettings.Inmap == true)) {
                Player.OnlineSharedSettings.Inmap = false;
                ServerAccountUpdate.QueueData({
                    OnlineSharedSettings: Player.OnlineSharedSettings
                });
            }
            next(args);
        });
    }

    async function ULTRAChatRoomSafewordRevert() {
        modApi.hookFunction('ChatRoomSafewordRevert', 4, (args, next) => {
            if (ChatSearchSafewordAppearance != null) {
                Player.Appearance = ChatSearchSafewordAppearance.slice(0);
                Player.ActivePoseMapping = ChatSearchSafewordPose;
                CharacterRefresh(Player);
                ChatRoomCharacterUpdate(Player);
                const Dictionary = new DictionaryBuilder()
                    .sourceCharacter(Player)
                    .build();
                ServerSend("ChatRoomChat", {
                    Content: "ActionActivateSafewordRevert",
                    Type: "Action",
                    Dictionary
                });
                if ((Player.ItemPermission < 3) && (fixperm == false)) {
                    Player.ItemPermission = 3;
                    ServerAccountUpdate.QueueData({
                        ItemPermission: Player.ItemPermission
                    }, true);
                    setTimeout(() => ChatRoomCharacterUpdate(Player), 5000);
                }
            }
            return;
        });
    }

    async function ULTRAChatRoomSendChat() {
        modApi.hookFunction('ChatRoomSendChat', 4, (args, next) => {
            const inputChat = /** @type {null | HTMLTextAreaElement} */ (document.getElementById("InputChat"));
            if (!inputChat) return;
            let msg = inputChat.value.trim();
            if (!msg.length) return;
            let tsp = 0;
            let text1 = msg;
            if (msg.startsWith(",")) {
                text1 = "(" + msg.slice(1) + ")";
                ElementValue("InputChat", text1);
            } else if ((msg.startsWith("(")) && (Player.ChatSettings.OOCAutoClose == true)) {
                let lr = SpeechGetOOCRanges(msg).pop();
                if ((lr != undefined) &&
                    (msg.charAt(lr.start + lr.length - 1) != ")") &&
                    (lr.start + lr.length == msg.length) &&
                    (lr.length != 1)) {
                    text1 = msg + ")";
                } else {
                    text1 = msg;
                }
            } else {
                text1 = msg;
            }
            if ((text1.startsWith(".")) && (window.BCX_Loaded == true)) tsp = 1;
            if ((text1.startsWith("!")) || (text1.startsWith("(")) || (text1.startsWith("*"))) tsp = 1;
            if ((text1.startsWith(":")) && (Player.ChatSettings.MuStylePoses == true)) tsp = 1;
            if ((text1.startsWith("@")) && (window.MBCHC)) {
                tsp = 1;
                ChatRoomSetTarget(-1);
            }
            let text2 = text1;
            let nw = 0;
            if (text1.startsWith("/")) {
                let act = "";
                if (text1.startsWith("/pandora")) {
                    act = text1.substring(8);
                    PandoraPenitentiaryDoActivity(act);
                    text2 = "";
                }
                if (((text1.startsWith("/leave")) || (text1.startsWith("/safewordspecific"))) && (Player.BCAR != null) && (noescape == true)) {
                    let msg = umsg1 + umsg3;
                    infomsg(msg);
                    text2 = "";
                }
                if (text2 != "") {
                    if (!text1.startsWith("//")) {
                        tsp = 1;
                        ChatRoomSetTarget(-1);
                        if ((text1.startsWith("/whisper")) || (text1.startsWith("/murmur"))) {
                            tsp = 0;
                            if (nowhisper == true) nw = 1;
                        }
                    } else {
                        tsp = 2;
                        text2 = text1.replaceAt(0, "\u200b");
                    }
                }
            }
            if (text1.startsWith("\\")) {
                tsp = 2;
                text2 = text1.replaceAt(0, "\u200b");
            }
            if (tsp == 2) tsp = 1;
            let nm = 0;
            let wh1 = 0;
            if ((window.BCX_Loaded == true) && (ChatRoomTargetMemberNumber != -1)) {
                if (Player.ExtensionSettings.BCX != undefined) {
                    if (IsBcxWhisperAllowed(ChatRoomTargetMemberNumber) == false) wh1 = 1;
                }
            }
            if (tsp == 0) {
                if (dolltalk == true) {
                    if (IsDollTalk(text1) == false) nm = 1;
                    if (nm == 1) {
                        text2 = "";
                        ElementValue("InputChat", "");
                        let msg = "Your message or whisper can't be sent because it does not respect the rules of doll talk.";
                        infomsg(msg);
                    }
                }
                if ((nowhisper == true) || (wh1 == 1)) {
                    if (ChatRoomTargetMemberNumber != -1) nw = 1;
                    if (nw == 1) {
                        text2 = "";
                        ElementValue("InputChat", "");
                        let msg = "Your whisper can't be sent because you are in no-whisper mode.";
                        if (wh1 == 1) msg = "Your whisper can't be sent because a BCX rule prevents you to whisper to this player.";
                        infomsg(msg);
                    }
                }
            }
            let text3 = "";
            if ((tsp == 1) || (nm == 1)) {
                text3 = text2;
            } else {
                if (this.StutterOn == true) {
                    text3 = SpeechTransformStutter(text2, st);
                } else {
                    text3 = text2;
                }
            }
            ElementValue("InputChat", text2.replace(text2, text3));
            let text4 = "";
            if ((tsp == 1) || (nm == 1)) {
                text4 = text3;
            } else {
                if (M_MOANER_talkActive && M_MOANER_scriptOn && IsStimulated(Player)) {
                    if ((ChatRoomTargetMemberNumber == -1) && (!(text1.startsWith("/whisper"))) && (!(text1.startsWith("/murmur")))) {
                        text4 = M_MOANER_applyMoanToMsg(Player, text3);
                    } else {
                        if (M_MOANER_whisperActive) {
                            text4 = M_MOANER_applyMoanToMsg(Player, text3);
                        } else {
                            text4 = text3;
                        }
                    }
                } else {
                    text4 = text3;
                }
            }
            ElementValue("InputChat", text3.replace(text3, text4));
            let mb = 0;
            let MBS = Player.ExtensionSettings.MBS;
            if (MBS) {
                let MBSdata = JSON.parse(LZString.decompressFromUTF16(MBS));
                if (MBSdata.AlternativeGarbling) mb = 1;
            }
            let text5 = "";
            if ((tsp == 1) || (nm == 1)) {
                text5 = text4;
            } else {
                if (this.BabyTalkOn == true) {
                    text5 = SpeechTransformBabyTalk(text4);
                } else if (this.GagTalkOn == true) {
                    if (mb == 1) {
                        if (ChatRoomTargetMemberNumber == null) {
                            text5 = text4;
                        } else {
                            text5 = SpeechTransformGagGarble(text4, gl);
                        }
                    } else {
                        text5 = SpeechTransformGagGarble(text4, gl);
                    }
                } else {
                    text5 = text4;
                }
            }
            ElementValue("InputChat", text4.replace(text4, text5));
            if (ChatRoomTargetMemberNumber == -1) {
                let text6 = "";
                if ((tsp == 1) || (notalk == 1) || (nm == 1)) {
                    text6 = text5;
                } else {
                    if (gl != 0) {
                        text6 = text5;
                    } else {
                        text6 = text4;
                    }
                }
                if (nm == 0) {
                    ElementValue("InputChat", text5.replace(text5, text6));
                    text6 = text5;
                }
                let texta = "";
                if ((tsp == 1) || (notalk == 1) || (nm == 1)) {
                    texta = text6;
                } else {
                    texta = text6;
                    if (animal != 0) texta = GarbleTalk(text6, animalModes[animal]);
                }
                ElementValue("InputChat", text6.replace(text6, texta));
            } else {
                if ((nowhisper == false) || (wh1 == 0)) {
                    let text6 = "";
                    if ((tsp == 1) || (notalk == 1) || (nm == 1)) {
                        text6 = text5;
                    } else {
                        if (gl != 0) {
                            if (Player.RestrictionSettings.NoSpeechGarble) {
                                text6 = text5 + " (\u0022" + text4 + "\u0022)";
                            } else {
                                text6 = text5;
                            }
                        } else {
                            text6 = text4;
                        }
                    }
                    let text7 = "";
                    if (text6.startsWith("*")) {
                        if (text6.startsWith("**")) {
                            text7 = text6.slice(1);
                        } else if (text6.match(/^(\*|\ )(\d{0,2}|100)%(.+)/)) {
                            let match = text6.match(/^(\*|\ )(\d{0,2}|100)%(.+)/);
                            text6 = text6.replace(/^(\*|\ )(\d{0,2}|100)%/, "");
                            let action = text6.trim();
                            const chance = parseInt(match[2] ? match[2] : 50);
                            const random = parseInt(Math.random() * 100);
                            text7 = "*" + tmpname + " " + action;
                            const attemptSucceeded = random <= chance;
                            text7 += attemptSucceeded ? ": \u2714" : ": \u274c";
                            text7 += " (" + chance + "%)";
                        } else {
                            text7 = "*" + tmpname + " " + text6.slice(1);
                        }
                    } else {
                        text7 = text6;
                    }
                    let texta = "";
                    if ((tsp == 1) || (notalk == 1) || (nm == 1)) {
                        texta = text7;
                    } else {
                        texta = text7;
                        if (animal != 0) texta = GarbleTalk(text7, animalModes[animal]);
                    }
                    if (texta != "") {
                        targetNumber = ChatRoomTargetMemberNumber;
                        const targetChar = ChatRoomCharacter.find(C => C.MemberNumber === targetNumber);
                        if (!targetChar) return "target-gone";
                        if (ChatRoomMapViewIsActive() && !ChatRoomMapViewCharacterOnWhisperRange(targetChar)) {
                            return "target-out-of-range";
                        }
                        const replyId = ChatRoomMessageGetReplyId();
                        let data = "";
                        if (texta.startsWith("*")) {
                            let Dictionary = [];
                            if (replyId) {
                                Dictionary.push({
                                    ReplyId: replyId,
                                    Tag: "ReplyId"
                                });
                                ChatRoomMessageReplyStop();
                            }
                            data = {
                                Content: texta,
                                Type: "Whisper",
                                Dictionary
                            };
                        } else {
                            data = ChatRoomGenerateChatRoomChatMessage("Whisper", texta, replyId);
                        }
                        data.Target = targetNumber;
                        ServerSend("ChatRoomChat", data);
                        if (targetChar.IsPlayer()) return true;
                        data.Sender = Player.MemberNumber;
                        ChatRoomMessage(data);
                        ElementValue("InputChat", "");
                    }
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
        });
    }

    //Chat Search (including Auto-Join)
    async function ULTRAChatSearchClick() {
        modApi.hookFunction('ChatSearchClick', 3, (args, next) => {
            if (ChatSearchFilterUnhideConfirm) {
                if (MouseIn(620, 898, 280, 64)) ChatSearchFilterUnhideConfirm = null;
                if (MouseIn(1100, 898, 280, 64)) {
                    ChatSearchClickUnhideRoom(ChatSearchFilterUnhideConfirm.Index, true);
                    ChatSearchFilterUnhideConfirm = null;
                }
                return;
            }
            if ((MouseX >= ChatSearchPageX) && (MouseX < 1975) && (MouseY >= ChatSearchPageY) && (MouseY < 778)) {
                if (ChatSearchMode == "Filter") ChatSearchClickPermission();
                if (ChatSearchMode == "") ChatSearchJoin();
            }
            if (MouseIn(1035, 25, 90, 90)) {
                ChatSearchResultOffset -= ChatSearchRoomsPerPage;
                if (ChatSearchResultOffset < 0)
                    ChatSearchResultOffset = Math.floor(((ChatSearchShowHiddenRoomsActive ? ChatSearchHiddenResult : ChatSearchResult).length - 1) / ChatSearchRoomsPerPage) * ChatSearchRoomsPerPage;
            }
            if (MouseIn(1225, 25, 90, 90)) {
                ChatSearchResultOffset += ChatSearchRoomsPerPage;
                if (ChatSearchResultOffset >= (ChatSearchShowHiddenRoomsActive ? ChatSearchHiddenResult : ChatSearchResult).length)
                    ChatSearchResultOffset = 0;
            }
            if (ChatSearchShowHiddenRoomsActive) {
                if (MouseIn(1885, 25, 90, 90)) ChatSearchToggleHiddenMode();
                return;
            }
            if (MouseIn(905, 25, 90, 90)) {
                ChatSearchToggleSearchMode();
                ChatSearchQuery();
            }
            if (MouseIn(25, 898, 300, 64)) {
                let Pos = !ChatSearchLanguageTemp ? 0 : ChatAdminLanguageList.indexOf(ChatSearchLanguageTemp) + 1;
                if (Pos >= ChatAdminLanguageList.length) {
                    ChatSearchLanguageTemp = "";
                } else {
                    ChatSearchLanguageTemp = ChatAdminLanguageList[Pos];
                }
                ChatSearchSaveLanguageFiltering();
                ChatSearchQuery();
            }
            if (ChatSearchMode == "") {
                if (MouseIn(685, 25, 90, 90)) ChatSearchQuery();
                if (MouseIn(795, 25, 90, 90)) {
                    ElementValue("InputSearch", "");
                    ChatSearchQuery();
                }
                if (MouseIn(1665, 25, 90, 90)) ChatAdminShowCreate();
                if (MouseIn(1775, 25, 90, 90)) {
                    ElementRemove("InputSearch");
                    FriendListReturn = {
                        Screen: CurrentScreen,
                        Module: CurrentModule
                    };
                    CommonSetScreen("Character", "FriendList");
                }
                if (MouseIn(1885, 25, 90, 90)) ChatSearchExit();
            } else {
                if (MouseIn(685, 25, 90, 90)) ChatSearchSaveLanguageAndFilterTerms();
                if (MouseIn(795, 25, 90, 90)) ChatSearchLoadLanguageAndFilterTerms();
                if (MouseIn(1555, 25, 90, 90)) ChatSearchGhostPlayerOnClickActive = false;
                if (MouseIn(1665, 25, 90, 90)) ChatSearchGhostPlayerOnClickActive = true;
                if (MouseIn(1775, 25, 90, 90)) ChatSearchToggleHiddenMode();
                if (MouseIn(1885, 25, 90, 90)) ChatSearchToggleHelpMode();
            }
            ChatSearchRoomSpaceSelectClick();
            return;
        });
    }

    async function ULTRAChatSearchExit() {
        modApi.hookFunction('ChatSearchExit', 4, (args, next) => {
            if (ChatRoomSpace == "Asylum") {
                ChatSearchReturnScreen = ["Room", "AsylumEntrance"];
            } else {
                ChatSearchReturnScreen = ["Room", "MainHall"];
            }
            next(args);
        });
    }

    async function ULTRAChatSearchJoin() {
        modApi.hookFunction('ChatSearchJoin', 4, (args, next) => {            
            if (autojoin == true) {
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
                            ElementPosition("AutoJoinAlert", 177, 970, 250);
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
            next(args);
        });
    }

    async function ULTRAChatSearchParseResponse() {
        modApi.hookFunction('ChatSearchParseResponse', 4, (args, next) => {
            const ret = next(args);
            let NewResult = [];
            if (Player.UBC != undefined) {
                if (Player.UBC.ubcSettings != undefined) {
                    let min = ElementValue("InputRoomMin");
                    let max = ElementValue("InputRoomMax");
                    let min2 = ElementValue("InputPlayerMin");
                    let max2 = ElementValue("InputPlayerMax");
                    Player.UBC.ubcSettings.rmin = min;
                    Player.UBC.ubcSettings.rsize = max;
                    Player.UBC.ubcSettings.pmin = min2;
                    Player.UBC.ubcSettings.pmax = max2;
                    PreferenceSubscreenUBCSettingsExit();
                 }
            }
            let game = "";
            if (rgame == 1) game = "ClubCard";
            if (rgame == 2) game = "GGTS";
            if (rgame == 3) game = "LARP";
            if (rgame == 4) game = "MagicBattle";
            if (rgame == 5) game = "Prison";
            if (game != "") {
                let rm = 0;
                while (rm < ret.length) {
                    if (ret[rm].Game == game) NewResult.push(ret[rm]);
                    rm++;
                }
            } else {
                if (!["ALL", "Always", "Hybrid", "Never"].includes(rtype)) return next(args);
                if (rtype == "ALL") {
                    let rm = 0;
                    while (rm < ret.length) {
                        let good = 0;
                        let room = ret[rm].MemberLimit;
                        let player = ret[rm].MemberCount;
                        if (ret[rm].MapType == "Always") {
                            if (pchat == false) good = 1;
                            if ((pchat == true) && (player >= pmin) && (player <= pmax)) good = 1;
                        } else {
                            if ((rchat == false) && (pchat == false)) good = 1;
                            if ((rchat == true) && (pchat == false) && (room >= rmin) && (room <= rsize)) good = 1;
                            if ((rchat == false) && (pchat == true) && (player >= pmin) && (player <= pmax)) good = 1;
                            if ((rchat == true) && (pchat == true) && (room >= rmin) && (room <= rsize) && (player >= pmin) && (player <= pmax)) good = 1;
                        }
                        if (good == 1) NewResult.push(ret[rm]);
                        rm++;
                    }
                }
                if ((rtype == "Never") || (rtype == "Hybrid")) {
                    let rm = 0;
                    while (rm < ret.length) {
                        let good = 0;
                        let room = ret[rm].MemberLimit;
                        let player = ret[rm].MemberCount;
                        if ((rchat == false) && (pchat == false)) good = 1;
                        if ((rchat == true) && (pchat == false) && (room >= rmin) && (room <= rsize)) good = 1;
                        if ((rchat == false) && (pchat == true) && (player >= pmin) && (player <= pmax)) good = 1;
                        if ((rchat == true) && (pchat == true) && (room >= rmin) && (room <= rsize) && (player >= pmin) && (player <= pmax)) good = 1;
                        if ((good == 1) && (ret[rm].MapType == rtype)) NewResult.push(ret[rm]);
                        rm++;
                    }
                }
                if (rtype == "Always") {
                    let rm = 0;
                    while (rm < ret.length) {
                        let good = 0;
                        let player = ret[rm].MemberCount;
                        if (pchat == false) good = 1;
                        if ((pchat == true) && (player >= pmin) && (player <= pmax)) good = 1;
                        if ((good == 1) && (ret[rm].MapType == "Always")) NewResult.push(ret[rm]);
                        rm++;
                    }
                }
            }
            return NewResult;
        });
    }

    async function ULTRAChatSearchQuery() {
        modApi.hookFunction('ChatSearchQuery', 4, (args, next) => {
            ChatSearchMessage = "";
            if (PandoraPenitentiaryIsInmate(Player)) return;
            var Query = ChatSearchMode == "Filter" ? "" : ElementValue("InputSearch").toUpperCase().trim();
            let FullRooms = (Player.OnlineSettings && Player.OnlineSettings.SearchShowsFullRooms);
            if (ChatRoomJoinLeash != null && ChatRoomJoinLeash != "") {
                Query = ChatRoomJoinLeash.toUpperCase().trim();
            } else if (Player.ImmersionSettings && Player.LastChatRoom && Player.LastChatRoom.Name != "") {
                if (Player.ImmersionSettings.ReturnToChatRoom) {
                    Query = Player.LastChatRoom.Name.toUpperCase().trim();
                    FullRooms = true;
                } else {
                    ChatRoomSetLastChatRoom(null);
                }
            } else {
                ChatSearchRejoinIncrement = 1;
            }
            if (rhide == true) {
                /** @type {ServerChatRoomSearchRequest} */
                const SearchData = {
                    Query: Query,
                    Language: ChatSearchLanguage,
                    Space: ChatRoomSpace,
                    Game: ChatRoomGame,
                    FullRooms: FullRooms,
                    ShowLocked: false
                };
                if (!CommonObjectEqual(ChatSearchLastSearchDataJSON, SearchData) || (ChatSearchLastQuerySearchTime + 2000 < CommonTime())) {
                    ChatSearchLastQuerySearchTime = CommonTime();
                    ChatSearchLastSearchDataJSON = SearchData;
                    ChatSearchResult = [];
                    ServerSend("ChatRoomSearch", SearchData);
                }
            } else {
                /** @type {ServerChatRoomSearchRequest} */
                const SearchData = {
                    Query: Query,
                    Language: ChatSearchLanguage,
                    Space: ChatRoomSpace,
                    Game: ChatRoomGame,
                    FullRooms: FullRooms,
                    ShowLocked: true
                };
                if (!CommonObjectEqual(ChatSearchLastSearchDataJSON, SearchData) || (ChatSearchLastQuerySearchTime + 2000 < CommonTime())) {
                    ChatSearchLastQuerySearchTime = CommonTime();
                    ChatSearchLastSearchDataJSON = SearchData;
                    ChatSearchResult = [];
                    ServerSend("ChatRoomSearch", SearchData);
                }
            }
            return;
        });
    }

    async function ULTRAChatSearchRoomSpaceSelectClick() {
        modApi.hookFunction('ChatSearchRoomSpaceSelectClick', 4, (args, next) => {          
            if ((MouseX >= 1390) && (MouseX < 1480) && (MouseY >= 25) && (MouseY < 115)) ExtClick();
            if ((MouseX >= 1500) && (MouseX < 1590) && (MouseY >= 25) && (MouseY < 115) && (ChatSearchMode == "")) CharacterAppearanceLoadCharacter(Player);
            if ((MouseX >= 275) && (MouseX < 339) && (MouseY >= 800) && (MouseY < 864)) {
                if (rchat == true) {
                    rchat = false;
                    Player.UBC.ubcSettings.rchat = false;
                    M_MOANER_saveControls();
                    ChatSelectStartSearch(ChatRoomSpace);
                } else {
                    rchat = true;
                    Player.UBC.ubcSettings.rchat = true;
                    M_MOANER_saveControls();
                    ChatSelectStartSearch(ChatRoomSpace);
                }
            }
            if ((MouseX >= 1095) && (MouseX < 1159) && (MouseY >= 800) && (MouseY < 864)) {
                if (autojoin == true) {
                    autojoin = false;
                    Player.UBC.ubcSettings.autojoin = false;
                    M_MOANER_saveControls();
                } else {
                    autojoin = true;
                    Player.UBC.ubcSettings.autojoin = true;
                    M_MOANER_saveControls();
                }
            }
            if ((MouseX >= 1450) && (MouseX < 1514) && (MouseY >= 800) && (MouseY < 864)) {
                if (pchat == true) {
                    pchat = false;
                    Player.UBC.ubcSettings.pchat = false;
                    M_MOANER_saveControls();
                    ChatSelectStartSearch(ChatRoomSpace);
                } else {
                    pchat = true;
                    Player.UBC.ubcSettings.pchat = true;
                    M_MOANER_saveControls();
                    ChatSelectStartSearch(ChatRoomSpace);
                }
            }
            if ((MouseX >= 335) && (MouseX < 475) && (MouseY >= 885) && (MouseY < 975)) {
                rgame = 0;
                rtype = "ALL";
                M_MOANER_saveControls();
                ChatSelectStartSearch(ChatRoomSpace);
            }
            if ((MouseX >= 445) && (MouseX < 585) && (MouseY >= 885) && (MouseY < 975)) {
                rgame = 0;
                rtype = "Never";
                M_MOANER_saveControls();
                ChatSelectStartSearch(ChatRoomSpace);
            }
            if ((MouseX >= 555) && (MouseX < 695) && (MouseY >= 885) && (MouseY < 975)) {
                rgame = 0;
                rtype = "Hybrid";
                M_MOANER_saveControls();
                ChatSelectStartSearch(ChatRoomSpace);
            }
            if ((MouseX >= 665) && (MouseX < 805) && (MouseY >= 885) && (MouseY < 975)) {
                rgame = 0;
                rtype = "Always";
                M_MOANER_saveControls();
                ChatSelectStartSearch(ChatRoomSpace);
            }
            if ((MouseX >= 807) && (MouseX < 897) && (MouseY >= 885) && (MouseY < 975)) {
                if (rhide == true) {
                    rhide = false;
                    M_MOANER_saveControls();
                    ChatSelectStartSearch(ChatRoomSpace);
                } else {
                    rhide = true;
                    M_MOANER_saveControls();
                    ChatSelectStartSearch(ChatRoomSpace);
                }
            }
            if ((MouseX >= 950) && (MouseX < 1040) && (MouseY >= 885) && (MouseY < 975)) {
                rgame = 0;
                M_MOANER_saveControls();
                if ((IsFemale() == true) && ((ChatRoomSpace != "Asylum") || (asylumlimit == false))) ChatSelectStartSearch(ChatRoomSpaceType.FEMALE_ONLY);
                if ((IsMale() == true) && ((ChatRoomSpace != "Asylum") || (asylumlimit == false))) ChatSelectStartSearch(ChatRoomSpaceType.MALE_ONLY);
            }
            if ((MouseX >= 1060) && (MouseX < 1150) && (MouseY >= 885) && (MouseY < 975)) {
                rgame = 0;
                M_MOANER_saveControls();
                if ((asylumlimit == false) || (ChatRoomSpace == "Asylum")) ChatSelectStartSearch(ChatRoomSpaceType.ASYLUM);
            }
            if ((MouseX >= 1170) && (MouseX < 1260) && (MouseY >= 885) && (MouseY < 975)) {
                rgame = 0;
                M_MOANER_saveControls();
                if ((asylumlimit == false) || ((asylumlimit == true) && (ChatRoomSpace != "Asylum"))) ChatSelectStartSearch(ChatRoomSpaceType.MIXED);
            }
            if ((MouseX >= 1405) && (MouseX < 1495) && (MouseY >= 885) && (MouseY < 975)) {
                rgame = 1;
                M_MOANER_saveControls();
                ChatSelectStartSearch(ChatRoomSpace);
            }
            if ((MouseX >= 1515) && (MouseX < 1605) && (MouseY >= 885) && (MouseY < 975)) {
                if ((asylumlimit == false) || (ChatRoomSpace == "Asylum")) {
                    rgame = 2;
                    M_MOANER_saveControls();
                    ChatSelectStartSearch(ChatRoomSpace);
                }
            }
            if ((MouseX >= 1625) && (MouseX < 1715) && (MouseY >= 885) && (MouseY < 975)) {
                rgame = 3;
                M_MOANER_saveControls();
                ChatSelectStartSearch(ChatRoomSpace);
            }
            if ((MouseX >= 1735) && (MouseX < 1825) && (MouseY >= 885) && (MouseY < 975)) {
                rgame = 4;
                M_MOANER_saveControls();
                ChatSelectStartSearch(ChatRoomSpace);
            }
            if ((MouseX >= 1845) && (MouseX < 1935) && (MouseY >= 885) && (MouseY < 975)) {
                rgame = 5;
                M_MOANER_saveControls();
                ChatSelectStartSearch(ChatRoomSpace);
            }
            return;
        });
    }

    async function ULTRAChatSearchRoomSpaceSelectDraw() {
        modApi.hookFunction('ChatSearchRoomSpaceSelectDraw', 4, (args, next) => {
            DrawText("Normal/Hybrid", 140, 810, "White", "Gray");
            DrawText("Room Size", 130, 850, "White", "Gray");
            DrawCheckbox(275, 800, 64, 64,"", rchat);
            const roomminInput = ElementCreateInput("InputRoomMin", "number", rmin);
            roomminInput.setAttribute("min", "2");
            roomminInput.setAttribute("max", "20");
            roomminInput.setAttribute("autocomplete", "off");
            DrawText("Minimum", 475, 800, "White", "Gray");
            ElementPosition("InputRoomMin", 475, 840, 200);
            const roommaxInput = ElementCreateInput("InputRoomMax", "number", rsize);
            roommaxInput.setAttribute("min", "2");
            roommaxInput.setAttribute("max", "20");
            roommaxInput.setAttribute("autocomplete", "off");
            DrawText("Maximum", 700, 800, "White", "Gray");
            ElementPosition("InputRoomMax", 700, 840, 200);
            DrawText("AutoJoin", 1000, 830, "White", "Gray");
            DrawCheckbox(1095, 800, 64, 64,"", autojoin);
            DrawText("Players", 1360, 810, "White", "Gray");
            DrawText("In Room", 1360, 850, "White", "Gray");
            DrawCheckbox(1450, 800, 64, 64,"", pchat);
            const playerminInput = ElementCreateInput("InputPlayerMin", "number", pmin);
            playerminInput.setAttribute("min", "2");
            playerminInput.setAttribute("max", "20");
            playerminInput.setAttribute("autocomplete", "off");
            DrawText("Minimum", 1650, 800, "White", "Gray");
            ElementPosition("InputPlayerMin", 1650, 840, 200);
            const playermaxInput = ElementCreateInput("InputPlayerMax", "number", pmax);
            playermaxInput.setAttribute("min", "2");
            playermaxInput.setAttribute("max", "20");
            playermaxInput.setAttribute("autocomplete", "off");
            DrawText("Maximum", 1875, 800, "White", "Gray");
            ElementPosition("InputPlayerMax", 1875, 840, 200);
            DrawButton(335, 885, 90, 90, "ALL", "White", "", "All Room Types");
            DrawButton(445, 885, 90, 90, "", "White", "", "Normal Rooms");
            DrawImageResize("Icons/Rectangle/CharacterView.png", 430, 900, 120, 60);
            DrawButton(555, 885, 90, 90, "", "White", "Icons/MapTypeHybrid.png", "Hybrid Rooms");
            DrawButton(665, 885, 90, 90, "", "White", "Icons/MapTypeAlways.png", "Map Rooms");
            if (rhide == false) {
                DrawButton(807, 885, 90, 90, "", "White", "", "Hide Locked Rooms");
                DrawImageResize("Icons/Unlocked.png", 812, 885, 80, 80);
            } else {
                DrawButton(807, 885, 90, 90, "", "White", "", "Show Locked Rooms");
                DrawImageResize("Icons/Locked.png", 812, 885, 80, 80);
            }
            if ((IsFemale() == true) && ((ChatRoomSpace != "Asylum") || (asylumlimit == false))) DrawButton(950, 885, 90, 90, "", "White", "Screens/Online/ChatSelect/Female.png", "Only Female");
            if ((IsMale() == true) && ((ChatRoomSpace != "Asylum") || (asylumlimit == false))) DrawButton(950, 885, 90, 90, "", "White", "Screens/Online/ChatSelect/Male.png", "Only Male");
            if ((asylumlimit == false) || (ChatRoomSpace == "Asylum")) {
                DrawButton(1060, 885, 90, 90, "", "White", "Icons/Asylum.png", "Asylum");
                DrawButton(1515, 885, 90, 90, "", "White", "Icons/GGTS.png", "GGTS");
            } else {
                DrawButton(1060, 885, 90, 90, "", "Gray", "Icons/Asylum.png", "Asylum");
                DrawButton(1515, 885, 90, 90, "", "Gray", "Icons/GGTS.png", "GGTS");
            }
            if ((asylumlimit == false) || ((asylumlimit == true) && (ChatRoomSpace != "Asylum"))) {
                DrawButton(1170, 885, 90, 90, "", "White", "Icons/Gender.png", "Mixed");
            } else {
                DrawButton(1170, 885, 90, 90, "", "Gray", "Icons/Gender.png", "Mixed");
            }
            DrawButton(1405, 885, 90, 90, "", "White", "Icons/ClubCard.png", "Club Card");
            DrawButton(1625, 885, 90, 90, "", "White", "Icons/Battle.png", "LARP");
            DrawButton(1735, 885, 90, 90, "", "White", "Icons/MagicSchool.png", "Magic Battle");
            DrawButton(1845, 885, 90, 90, "", "White", "Icons/Infiltration.png", "Pandora Prison");
            return;
        });
    }

    async function ULTRAChatSearchRun() {
        modApi.hookFunction('ChatSearchRun', 4, (args, next) => {
            ChatSearchListParams = {
	           x: ChatSearchPageX,
	           y: ChatSearchPageY,
	           width: MainCanvasWidth - 2 * ChatSearchPageX,
	           height: 582,
	           itemWidth: 630,
	           itemHeight: 85,
	           minMarginY: 24,
            };
            ChatSearchRoomsPerPage = 18;
            TintsEffect();
            KidnapLeagueResetOnlineBountyProgress();
            PandoraPenitentiaryCreate();
            if (ChatSearchFilterHelpActive) return ChatSearchFilterHelpDraw();
            if (ChatSearchFilterUnhideConfirm) return ChatSearchFilterUnhideConfirmDraw();
            if (ChatSearchMode == "") {
                ChatSearchNormalDraw();
                ElementSetAttribute("InputSearch", "placeholder", TextGet("EnterName"));
            } else if (ChatSearchMode == "Filter") {
                ChatSearchPermissionDraw();
                ElementSetAttribute("InputSearch", "placeholder", TextGet("FilterExcludeTerms"));
            }
            const Result = ChatSearchShowHiddenRoomsActive ? ChatSearchHiddenResult : ChatSearchResult;
            if (Result.length > ChatSearchRoomsPerPage) {
                DrawButton(1035, 25, 90, 90, "", "White", "Icons/Prev.png", TextGet("Prev"));
                DrawButton(1225, 25, 90, 90, "", "White", "Icons/Next.png", TextGet("Next"));
            }
            if (ChatSearchShowHiddenRoomsActive) {
                DrawButton(1885, 25, 90, 90, "", "White", "Icons/DialogNormalMode.png", TextGet("NormalFilterMode"));
                return;
            }
            ElementPositionFixed("InputSearch", 25, 35, 620);
            DrawTextFit(ChatSearchMessage != "" ? TextGet(ChatSearchMessage) : "", 300, 105, 490, "White", "Gray");
            let ChatSearchPageCount = Math.floor((Result.length + ChatSearchRoomsPerPage - 1) / ChatSearchRoomsPerPage).toString();
            let ChatSearchCurrentPage = (ChatSearchResultOffset / ChatSearchRoomsPerPage + 1).toString();
            DrawTextFit(`${ChatSearchCurrentPage}/${ChatSearchPageCount}`, 1175, 75, 90, "White", "Gray");
            DrawButton(905, 25, 90, 90, "", ChatSearchMode != "Filter" ? "White" : "Lime", "Icons/Private.png", TextGet(ChatSearchMode != "Filter" ? "FilterMode" : "NormalMode"));
            const languageLabel = TranslationGetLanguageName(ChatSearchLanguageTemp, true) || TextGet("Language" + ChatSearchLanguageTemp);
            DrawButton(25, 888, 300, 54, languageLabel, "White");
            DrawButton(685, 25, 90, 90, "", "White", "Icons/Accept.png", ChatSearchMode == "" ? TextGet("SearchRoom") : TextGet("ApplyFilter"));
            DrawButton(795, 25, 90, 90, "", "White", "Icons/Cancel.png", ChatSearchMode == "" ? TextGet("ClearFilter") : TextGet("LoadFilter"));
            DrawButton(1390, 25, 90, 90, "", "White", "Icons/Extensions.png", "Extensions");
            if (ChatSearchMode == "") {
                DrawButton(1500, 25, 90, 90, "", "White", "Icons/Dress.png", "Wardrobe");
                DrawButton(1665, 25, 90, 90, "", "White", "Icons/Plus.png", TextGet("CreateRoom"));
                DrawButton(1775, 25, 90, 90, "", "White", "Icons/FriendList.png", TextGet("FriendList"));
                DrawButton(1885, 25, 90, 90, "", "White", "Icons/Exit.png", TextGet("Exit"));
            } else {
                DrawButton(1555, 25, 90, 90, "", !ChatSearchGhostPlayerOnClickActive ? "Lime" : "White", "Icons/Trash.png", TextGet("TempHideOnClick"));
                DrawButton(1665, 25, 90, 90, "", ChatSearchGhostPlayerOnClickActive ? "Lime" : "White", "Icons/GhostList.png", TextGet("GhostPlayerOnClick"));
                DrawButton(1775, 25, 90, 90, "", "White", "Icons/InspectLock.png", TextGet("ShowHiddenRooms"));
                DrawButton(1885, 25, 90, 90, "", "White", "Icons/Question.png", TextGet("Help"));
            }
            ChatSearchRoomSpaceSelectDraw();
            return;
        });
    }

    async function ULTRAChatSearchUnload() {
        modApi.hookFunction('ChatSearchUnload', 4, (args, next) => {
            ElementRemove("InputRoomMin");
            ElementRemove("InputRoomMax");
            ElementRemove("InputPlayerMin");
            ElementRemove("InputPlayerMax");
            next(args);
        });
    }

    //Club Card Game
    async function ULTRAAsylumMeetingClubCardStart() {
        modApi.hookFunction('AsylumMeetingClubCardStart', 4, (args, next) => { 
            moreAsylumCards();
            MiniGameStart("ClubCard", 0, "AsylumMeetingClubCardEnd");
            return;
        });
    }

    async function ULTRAClubCardBuilderClick() {
        modApi.hookFunction('ClubCardBuilderClick', 4, (args, next) => { 
            const ret = next(args);
            if ((ClubCardBuilderDeckIndex == -1) && MouseIn(1655, 25, 90, 90)) {
                let background = Player.Game?.ClubCard?.Background ?? "ClubCardPlayBoard1";
                let backgrounds = BackgroundsClubCardsTagList;
                if (bgall) backgrounds = BackgroundsTagList;
                BackgroundSelectionMake(backgrounds, background, (Name, setBackground) => {
		    if (setBackground) {
		        Player.Game.ClubCard.Background = Name;
			ServerAccountUpdate.QueueData({ Game: Player.Game }, true);
		    }
		    CommonSetScreen("MiniGame", "ClubCardBuilder");
		});
            }
            return ret;
        });
    }
	
    async function ULTRAClubCardBuilderLoad() {
        modApi.hookFunction('ClubCardBuilderLoad', 4, (args, next) => { 
            ClubCardBuilderBackground = Player.Game.ClubCard.Background;
            next(args);
        });
    }

    async function ULTRACafeClubCardStart() {
        modApi.hookFunction('CafeClubCardStart', 4, (args, next) => { 
            moreMaidCards();
            MiniGameStart("ClubCard", 0, "CafeClubCardEnd");
            return;
        });
    }

    async function ULTRAClubCardCheckVictory(CCPLayer) {
        modApi.hookFunction('ClubCardCheckVictory', 4, (args, next) => {
            const ret = next(args);
            if (ret) {
                let CCPlayer = args[0];
                if (CCPlayer.Fame == null) CCPlayer.Fame = 0;
                if (CCPlayer == Player) {
                    ClubCardFameGoal = 100;
                    if (highfame == true) ClubCardFameGoal = cfame;
                }
                if (CCPlayer.Fame >= ClubCardFameGoal) {
                    ClubCardFocus = null;
                    MiniGameVictory = (CCPlayer.Control == "Player");
                    MiniGameEnded = true;
                    let nmg = TextGet("VictoryFor" + CCPlayer.Control);  
                    if (ClubCardIsOnline()) nmg = TextGet("VictoryOnline").replace("PLAYERNAME", CharacterNickname(CCPlayer.Character));
                    let Msg = nmg;          
                    if (highfame) Msg = nmg.replace("100", cfame);
                    ClubCardCreatePopup("TEXT", Msg, TextGet("Return"), null, "ClubCardEndGame()", null);
                    ClubCardGameEnded = true;
                    if (MiniGameVictory && (ClubCardReward != null)) ClubCardGetReward();
                    GameClubCardReset();
                } 
            }
            return ret;
        });
    }

    async function ULTRAClubCardClick() {
        modApi.hookFunction('ClubCardClick', 4, (args, next) => {
            if ((ClubCardPopup != null) && (ClubCardPopup.Mode == "DECK")) {
                if (MouseIn(65, 60, 90, 90)) {
                    if (highfame) {
                        highfame = false;
                        Player.UBC.ubcSettings.highfame = false;
                        M_MOANER_saveControls();
                    } else {
                        highfame = true;
                        Player.UBC.ubcSettings.highfame = true;
                        M_MOANER_saveControls();
                    }
                }
                if (MouseIn(385, 60, 90, 90)) {
                    let fame = ElementValue("InputHighFame");
                    let cards = ElementValue("InputMaxCards");
                    let deck = ElementValue("InputDefaultDeck");
                    Player.UBC.ubcSettings.cfame = fame;
                    Player.UBC.ubcSettings.ccards = cards;
                    Player.UBC.ubcSettings.cdeck = deck;
                    ElementRemove("InputHighFame");
                    ElementRemove("InputMaxCards");
                    ElementRemove("InputDefaultDeck");
                    if (ClubCardIsOnline() == false) {
                        let ndeck = ElementValue("InputNpcDeck");
                        Player.UBC.ubcSettings.npcdeck = ndeck;
                        ElementRemove("InputNpcDeck");
                    }
                    PreferenceSubscreenUBCSettingsExit();
                    ClubCardEndGame(true);
                }
            }
            next(args);
        });
    }

    async function ULTRAClubCardEndTurn(Draw = false) {
        modApi.hookFunction('ClubCardEndTurn', 4, (args, next) => {
            ClubCardFameGoal = 100;
            if (highfame == true) ClubCardFameGoal = cfame;
            next(args);
        });
    }

    async function ULTRAClubCardGetReward() {
        modApi.hookFunction('ClubCardGetReward', 4, (args, next) => {
            if (highfame == true) {
                ClubCardFameGoal = cfame;
                let nmg = "";
                let Char = String.fromCharCode(ClubCardReward.ID);
                if (Player.Game.ClubCard.Reward.indexOf(Char) < 0) {
                    ClubCardFocus = ClubCardReward;
                    Player.Game.ClubCard.Reward = Player.Game.ClubCard.Reward + Char;
                    ServerAccoutUpdate.QueueData({
                        Game: Player.Game
                    }, true);
                    nmg = TextGet("WonNewCard");
                    Msg = nmg.replace("100", cfame);
                    ClubCardCreatePopup("TEXT", Msg + " " + ClubCardReward.Title, TextGet("Return"), null, "ClubCardEndGame()", null);
                }
            }
            next(args);
        });
    }

    async function ULTRAClubCardLoadDeckNumber() {
        modApi.hookFunction('ClubCardLoadDeckNumber', 4, (args, next) => {
            ElementRemove("InputHighFame");
            ElementRemove("InputMaxCards");
            ElementRemove("InputDefaultDeck");
            if (ClubCardIsOnline() == false) ElementRemove("InputNpcDeck");
            let originaldeck = ClubCardBuilderDefaultDeck;
            let initialdeck = [];
            let plusdeck = [];
            if (cdeck == 0) {
                initialdeck = originaldeck;
                plusdeck = DefaultDeckPlus;
            }
            if (cdeck == 1) {
                initialdeck = ClubCardBuilderABDLDeck;
                plusdeck = ABDLDeckPlus;
            }
            if (cdeck == 2) {
                initialdeck = ClubCardBuilderAsylumDeck;
                plusdeck = AsylumDeckPlus;
            }
            if (cdeck == 3) {
                initialdeck = ClubCardBuilderCollegeDeck;
                plusdeck = CollegeDeckPlus;
            }
            if (cdeck == 4) {
                initialdeck = ClubCardBuilderDominantDeck;
                plusdeck = DominantDeckPlus;
            }
            if (cdeck == 5) {
                initialdeck = ClubCardBuilderLiabilityDeck;
                plusdeck = LiabilityDeckPlus;
            }
            if (cdeck == 6) {
                initialdeck = ClubCardBuilderMaidDeck;
                plusdeck = MaidDeckPlus;
            }
            if (cdeck == 7) {
                initialdeck = ClubCardBuilderPetDeck;
                plusdeck = PetDeckPlus;
            }
            if (cdeck == 8) {
                initialdeck = ClubCardBuilderPornDeck;
                plusdeck = PornDeckPlus;
            }
            if (cdeck == 9) {
                initialdeck = ClubCardBuilderShibariDeck;
                plusdeck = ShibariDeckPlus;
            }
            if (cdeck == 10) {
                initialdeck = ClubCardBuilderExtraDeck;
                plusdeck = ExtraDeckPlus;
            }
            ClubCardBuilderMinDeckSize = ccards;
            if (ccards == 30) ClubCardBuilderDefaultDeck = initialdeck;
            if (ccards > 30) ClubCardBuilderDefaultDeck = initialdeck.concat(plusdeck[0]);
            if (ccards > 31) ClubCardBuilderDefaultDeck = ClubCardBuilderDefaultDeck.concat(plusdeck[1]);
            if (ccards > 32) ClubCardBuilderDefaultDeck = ClubCardBuilderDefaultDeck.concat(plusdeck[2]);
            if (ccards > 33) ClubCardBuilderDefaultDeck = ClubCardBuilderDefaultDeck.concat(plusdeck[3]);
            if (ccards > 34) ClubCardBuilderDefaultDeck = ClubCardBuilderDefaultDeck.concat(plusdeck[4]);
            if (ccards > 35) ClubCardBuilderDefaultDeck = ClubCardBuilderDefaultDeck.concat(plusdeck[5]);
            if (ccards > 36) ClubCardBuilderDefaultDeck = ClubCardBuilderDefaultDeck.concat(plusdeck[6]);
            if (ccards > 37) ClubCardBuilderDefaultDeck = ClubCardBuilderDefaultDeck.concat(plusdeck[7]);
            if (ccards > 38) ClubCardBuilderDefaultDeck = ClubCardBuilderDefaultDeck.concat(plusdeck[8]);
            if (ccards > 39) ClubCardBuilderDefaultDeck = ClubCardBuilderDefaultDeck.concat(plusdeck[9]);
            next(args);
        });
    }

    async function ULTRAClubCardLoungePraticeGameStart() {
        modApi.hookFunction('ClubCardLoungePraticeGameStart', 4, (args, next) => {  
            moreDefaultCards();
            MiniGameStart("ClubCard", 0, "ClubCardLoungePraticeGameEnd");
            return;
        });
    }
	
    async function ULTRAClubCardRenderPanel() {
        modApi.hookFunction('ClubCardRenderPanel', 4, (args, next) => {
            if ((ClubCardPopup != null) && (ClubCardPopup.Mode == "DECK")) {
                DrawText("Current Mode", 120, 35, "White", "Black");
                if (highfame) {
                    DrawButton(65, 60, 90, 90, "HF", "White", "", "Switch to Normal mode");
                } else {
                    DrawButton(65, 60, 90, 90, "NHF", "White", "", "Switch to High Fame mode");
                }
		DrawText("Actualisation", 430, 35, "White", "Black");
                DrawButton(385, 60, 90, 90, "", "White", "Icons/Exit.png");
                DrawText("Available options for Default and NPC card decks:", 1140, 35, "White", "Gray");
                DrawText("0 Original - 1 ABDL - 2 Asylum - 3 College - 4 Dominant", 1140, 115, "White", "Gray");
                DrawText("5 Liability - 6 Maid - 7 Pet - 8 Porn - 9 Shibari - 10 Extra", 1140, 195, "White", "Gray");
		if (ClubCardIsOnline() == false) DrawText("Only for NPC: -1 = Deck defined by original BC code", 1140, 275, "White", "Gray");
		DrawText("If you change other parameters than the mode,", 1140, 750, "White", "Black");
                DrawText("click the Exit button, then come back to play", 1140, 830, "White", "Black");
                const fameInput = ElementCreateInput("InputHighFame", "number", cfame);
                fameInput.setAttribute("min", "150");
                fameInput.setAttribute("max", "550");
                fameInput.setAttribute("autocomplete", "off");
                DrawText("High Fame level", 145, 190, "White", "Gray");
                ElementPosition("InputHighFame", 420, 185, 250);
                const cardsInput = ElementCreateInput("InputMaxCards", "number", ccards);
                cardsInput.setAttribute("min", "30");
                cardsInput.setAttribute("max", "40");
                cardsInput.setAttribute("autocomplete", "off");
                DrawText("Cards in deck", 130, 270, "White", "Gray");
                ElementPosition("InputMaxCards", 420, 265, 250);
                const deckInput = ElementCreateInput("InputDefaultDeck", "number", cdeck);
                deckInput.setAttribute("min", "0");
                deckInput.setAttribute("max", "10");
                deckInput.setAttribute("autocomplete", "off");
                DrawText("Default card deck", 145, 350, "White", "Gray");
                ElementPosition("InputDefaultDeck", 420, 345, 250);
		if (ClubCardIsOnline() == false) { 
                    const npcdeckInput = ElementCreateInput("InputNpcDeck", "number", npcdeck);
                    npcdeckInput.setAttribute("min", "-1");
                    npcdeckInput.setAttribute("max", "10");
                    npcdeckInput.setAttribute("autocomplete", "off");
                    DrawText("NPC card deck", 145, 430, "White", "Gray");
                    ElementPosition("InputNpcDeck", 420, 425, 250);
                }
            }
            next(args);
        });
    }

    async function ULTRAInfiltrationClubCardStart() {
        modApi.hookFunction('InfiltrationClubCardStart', 4, (args, next) => { 
            moreLiabilityCards();
            MiniGameStart("ClubCard", 0, "InfiltrationClubCardEnd");
            return;
        });
    }

    async function ULTRAIntroductionClubCardStart() {
        modApi.hookFunction('IntroductionClubCardStart', 4, (args, next) => { 
            moreMaidCards();
            MiniGameStart("ClubCard", 0, "IntroductionClubCardEnd");
            return;
        });
    }  

    async function ULTRAKidnapLeagueRandomClubCardStart() {
        modApi.hookFunction('KidnapLeagueRandomClubCardStart', 4, (args, next) => { 
            morePornCards();
            MiniGameStart("ClubCard", 0, "KidnapLeagueRandomClubCardEnd");
            return;
        });
    }

    async function ULTRALARPClubCardStart() {
        modApi.hookFunction('LARPClubCardStart', 4, (args, next) => { 
            moreABDLCards();
            MiniGameStart("ClubCard", 0, "LARPClubCardEnd");
            return;
        });
    }

    async function ULTRAMovieStudioClubCardStart() {
        modApi.hookFunction('MovieStudioClubCardStart', 4, (args, next) => { 
            morePornCards();
            MiniGameStart("ClubCard", 0, "MovieStudioClubCardEnd");
            return;
        });
    }

    async function ULTRAPandoraClubCardStart() {
        modApi.hookFunction('PandoraClubCardStart', 4, (args, next) => { 
            PandoraFightCharacter = CurrentCharacter;
            moreDominantCards();
            MiniGameStart("ClubCard", 0, "PandoraClubCardEnd");
            return;
        });
    }

    async function ULTRAPrivateClubCardVsFriendStart() {
        modApi.hookFunction('PrivateClubCardVsFriendStart', 4, (args, next) => { 
            morePrivateCards();
            MiniGameStart("ClubCard", 0, "PrivateClubCardVsFriendEnd");
            return;
        });
    }
 
    async function ULTRAPrivateClubCardVsOwnerStart() {
        modApi.hookFunction('PrivateClubCardVsOwnerStart', 4, (args, next) => { 
            morePrivateCards();
            MiniGameStart("ClubCard", 0, "PrivateClubCardVsOwnerEnd");
            return;
        });
    }

    async function ULTRAPrivateClubCardVsSubStart() {
        modApi.hookFunction('PrivateClubCardVsSubStart', 4, (args, next) => { 
            morePrivateCards();
            MiniGameStart("ClubCard", 0, "PrivateClubCardVsSubEnd");
            return;
        });
    }

    async function ULTRAPrivateGetClubCardDeck(C) {
        modApi.hookFunction('PrivateGetClubCardDeck', 4, (args, next) => { 
            if (npcdeck == -1) {
                if (["Amanda", "Sarah", "Sidney", "Sarah", "Jennifer", "Julia", "Yuki", "Mildred"].includes(C.Name) ) return ClubCardBuilderCollegeDeck;
	        if ((C.Title === "Mistress") || (C.Title == "Dominatrix")) return ClubCardBuilderDominantDeck;
	        if (C.Title === "Maid") return ClubCardBuilderMaidDeck;
	        let Horny = NPCTraitGet(C, "Horny");
	        let Dominant = NPCTraitGet(C, "Dominant");
	        let Playful = NPCTraitGet(C, "Playful");
	        let Violent = NPCTraitGet(C, "Violent");
	        let Wise = NPCTraitGet(C, "Wise");
	        if ((Horny > 0) && (Horny >= Dominant) && (Horny >= Playful) && (Horny >= Violent) && (Horny >= Wise)) return ClubCardBuilderPornDeck;
	        if ((Dominant > 0) && (Dominant >= Horny) && (Dominant >= Playful) && (Dominant >= Violent) && (Dominant >= Wise)) return ClubCardBuilderDominantDeck;
	        if ((Playful > 0) && (Playful >= Horny) && (Playful >= Dominant) && (Playful >= Violent) && (Playful >= Wise)) return ClubCardBuilderABDLDeck;
	        if ((Violent > 0) && (Violent >= Horny) && (Violent >= Dominant) && (Violent >= Playful) && (Violent >= Wise)) return ClubCardBuilderLiabilityDeck;
	        if ((Wise > 0) && (Wise >= Horny) && (Wise >= Dominant) && (Wise >= Playful) && (Wise >= Violent)) return ClubCardBuilderAsylumDeck;
	        return ClubCardBuilderDefaultDeck;
           }
           if (npcdeck == 0) return ClubCardBuilderDefaultDeck;     
           if (npcdeck == 1) return ClubCardBuilderABDLDeck; 
           if (npcdeck == 2) return ClubCardBuilderAsylumDeck; 
           if (npcdeck == 3) return ClubCardBuilderCollegeDeck; 
           if (npcdeck == 4) return ClubCardBuilderDominantDeck; 
           if (npcdeck == 5) return ClubCardBuilderLiabilityDeck;
           if (npcdeck == 6) return ClubCardBuilderMaidDeck;
           if (npcdeck == 7) return ClubCardBuilderPetDeck; 
           if (npcdeck == 8) return ClubCardBuilderPornDeck; 
           if (npcdeck == 9) return ClubCardBuilderShibariDeck; 
           if (npcdeck == 10) return ClubCardBuilderExtraDeck; 
           return;
        });
    }

    async function ULTRAShibariClubCardStart() {
        modApi.hookFunction('ShibariClubCardStart', 4, (args, next) => { 
            moreDominantCards();
            MiniGameStart("ClubCard", 0, "ShibariClubCardEnd");
            return;
        });
    }

    async function ULTRAStableClubCardStart() {
        modApi.hookFunction('StableClubCardStart', 4, (args, next) => { 
            moreABDLCards();
            MiniGameStart("ClubCard", 0, "StableClubCardEnd");
            return;
        });
    }

    //Commands
    async function ULTRACommandAutoComplete() {
        modApi.hookFunction('CommandAutoComplete', 4, (args, next) => {
            msg = ElementValue("InputChat");
            const low = msg.toLowerCase();
            if (!low || !low.startsWith(CommandsKey) || low.length <= CommandsKey.length) return;
            if (low.substring(CommandsKey.length).startsWith(CommandsKey)) return;
            const [key, ...forward] = low.replace(/\s{2,}/g, ' ').split(' ');
            const tag = key.substring(CommandsKey.length);
            if (forward.length > 0) {
                const cmds = GetCommands().filter(C => C.Tag == tag);
                if (cmds.length == 1 && cmds[0].AutoComplete) {
                    cmds[0].AutoComplete.call(cmds[0], forward, low, msg);
                }
                return;
            }
            const CS = GetCommands().filter(C => C.Tag.startsWith(tag));
            if (CS.length == 0) return;
            if (CS.length == 1) {
                if (tag != CS[0].Tag) {
                    ElementValue("InputChat", CommandsKey + CS[0].Tag + " ");
                    ElementFocus("InputChat");
                } else if (CS[0].AutoComplete) {
                    CS[0].AutoComplete.call(CS[0], forward, low, msg);
                }
                return;
            }
            let complete = low;
            for (let I = low.length - CommandsKey.length;; ++I) {
                const TSI = CS.map(C => C.Tag[I]);
                if (TSI.some(TI => TI == null)) break;
                if (new Set(TSI).size != 1) break;
                complete += TSI[0];
            }
            if (low.length != complete.length) {
                ElementValue("InputChat", complete);
                ElementFocus("InputChat");
            } else {
                if (notimeout == true) {
                    CommandPrintHelpFor(CS);
                } else {
                    CommandPrintHelpFor(CS, 5000);
                }
            }
            return;
        });
    }

    async function ULTRACommandExecute() {
        modApi.hookFunction('CommandExecute', 4, (args, next) => {
            msg = ElementValue("InputChat");
            const low = msg.toLowerCase();
            const [key, ...parsed] = low.replace(/\s{2,}/g, ' ').split(' ');
            let flt = GetCommands().filter(cmd => key.indexOf(CommandsKey + cmd.Tag) == 0);
            if (Player.FBC != undefined) flt = GetCommands().filter(cmd => key.substring(1) === cmd.Tag);
            let C = flt[0];
            if (flt.length > 1) C = null;
            if (C && C.Reference) C = GetCommands().find(D => D.Tag == C.Reference);
            if (C != null) {
                if ((msg == "/bcc leave") || (msg == "/leave") || (msg.startsWith("/quit")) || (msg.startsWith("/wcegotoroom"))) {
                    C.Action.call(C, low.substring(C.Tag.length + 2), msg, parsed);
                    return false;
                }
            }
            if (C == null) {
                if (notimeout2 == true) {
                    ChatRoomSendLocal(`${msg} ${TextGet("CommandNoSuchCommand")}`);
                } else {
                    ChatRoomSendLocal(`${msg} ${TextGet("CommandNoSuchCommand")}`, 10_000);
                }
                return false;
            }
            if (C.Prerequisite && C.Prerequisite.call(C) == false) {
                if (notimeout2 == true) {
                    ChatRoomSendLocal(`${msg} ${TextGet("CommandPrerequisiteFailed")}`);
                } else {
                    ChatRoomSendLocal(`${msg} ${TextGet("CommandPrerequisiteFailed")}`, 10_000);
                }
                return false;
            }
            next(args);
        });
    }

    //Friendlist 
    async function ULTRAFriendListDraw() {
        modApi.hookFunction('FriendListDraw', 4, (args, next) => {
            FriendListBackground = frname;
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAFriendListKeyDown() {
        modApi.hookFunction('FriendListKeyDown', 4, (args, next) => {
            const searchInput = /** @type {HTMLTextAreaElement} */ (document.getElementById(FriendListIDs.searchInput));
            const searchInputHasFocus = searchInput && document.activeElement === searchInput;
            const beepTextArea = /** @type {HTMLTextAreaElement} */ (document.getElementById(FriendListIDs.beepTextArea));
            const beepTextAreaHasFocus = beepTextArea && document.activeElement === beepTextArea;
            if (frkeys == true) {
                if ((FriendListModeIndex == 0) && (!searchInputHasFocus) && (!beepTextAreaHasFocus)) {
                    if (event.code === "KeyF") {
                        if ((IsFemale() == true) && ((ChatRoomSpace != "Asylum") || (asylumlimit == false))) {
                            ChatRoomSpace = "";
                            ServerSend("AccountQuery", {
                                Query: "OnlineFriends"
                            });
                            return true;
                        }
                    }
                    if (event.code === "KeyG") {
                        if ((asylumlimit == false) || ((asylumlimit == true) && (ChatRoomSpace != "Asylum"))) {
                            ChatRoomSpace = "X";
                            ServerSend("AccountQuery", {
                                Query: "OnlineFriends"
                            });
                            return true;
                        }
                    }
                    if (event.code === "KeyH") {
                        if ((IsMale() == true) && ((ChatRoomSpace != "Asylum") || (asylumlimit == false))) {
                            ChatRoomSpace = "M";
                            ServerSend("AccountQuery", {
                                Query: "OnlineFriends"
                            });
                            return true;
                        }
                    }
                    if (event.code === "KeyJ") {
                        if ((asylumlimit == false) || (ChatRoomSpace == "Asylum")) {
                            ChatRoomSpace = "Asylum";
                            ServerSend("AccountQuery", {
                                Query: "OnlineFriends"
                            });
                            return true;
                        }
                    }
                }
            }
            next(args);
        });
    }

    //Lockpicking
    async function ULTRAStruggleMinigameWasInterrupted() {
        modApi.hookFunction('StruggleMinigameWasInterrupted', 4, (args, next) => {
            if (fullseed == true) {
                if (StruggleProgressCurrentMinigame === "LockPick") {
                    let seed = parseInt(StruggleLockPickOrder.join(""));
                    let tips = StruggleLockPickOrder.map((a) => {
                        return true;
                    });
                    for (let q = 0; q < tips.length; q++) {
                        let xx = 1475 + (0.5 - tips.length / 2 + q) * 100;
                        DrawText(`${StruggleLockPickOrder.indexOf(q) + 1}`, xx, 300, "blue");
                    }
                    return false;
                }
            }
            next(args);
        });
    }

    //Login
    async function ULTRALoginClick() {
        modApi.hookFunction('LoginClick', 4, (args, next) => {
            if (MouseIn(1910, 780, 90, 90)) hidetoast();
            next(args);
        });
    }

    async function ULTRALoginRun() {
        modApi.hookFunction('LoginRun', 4, (args, next) => {
            DrawButton(750, 120, 500, 60, "ULTRAbc " + UBCver + " Ready!", "Pink", "", "");
            DrawButton(1910, 780, 90, 90, "NO TOAST", "White", "", "Click here to hide all toasts");
            next(args);
        });
    }

    //Magic School
    async function ULTRAMagicPuzzleRun() {
        modApi.hookFunction('MagicPuzzleRun', 4, (args, next) => {
            if (magiccheat == true) {
                if (MiniGameEnded) MiniGameVictory = true;
            }
            next(args);
        });
    }

    async function ULTRAMagicSchoolEscapeSpellEnd() {
        modApi.hookFunction('MagicSchoolEscapeSpellEnd', 4, (args, next) => {
            if (magiccheat == true) {
                MagicSchoolEscapeTimer > CommonTime();
                MiniGameVictory = true;
            }
            next(args);
        });
    }

    //Main Hall
    async function ULTRAMainHallClick() {
        modApi.hookFunction('MainHallClick', 4, (args, next) => {
            if (MouseIn(1645, 145, 90, 90)) MainHallMoveToChatSelect();
            if ((MouseX >= 240) && (MouseX < 330) && (MouseY >= 475) && (MouseY < 565)) {
                if (IsFemale() == true) ChatSelectStartSearch(ChatRoomSpaceType.FEMALE_ONLY);
                if (IsMale() == true) ChatSelectStartSearch(ChatRoomSpaceType.MALE_ONLY);
            }
            if ((MouseX >= 350) && (MouseX < 440) && (MouseY >= 475) && (MouseY < 565)) {
                if (asylumlimit == false) ChatSelectStartSearch(ChatRoomSpaceType.ASYLUM);
            }
            if ((MouseX >= 460) && (MouseX < 550) && (MouseY >= 475) && (MouseY < 565)) ChatSelectStartSearch(ChatRoomSpaceType.MIXED);
            if ((MouseX >= 570) && (MouseX < 660) && (MouseY >= 475) && (MouseY < 565)) {
                if (BackgroundsList != undefined) {
                    let listbg = BackgroundsList.length;
                    let Roll = Math.floor(Math.random() * listbg);
                    if (Roll == 0) Roll = 1;
                    let name = BackgroundsList[Roll - 1].Name;
                    Player.VisualSettings.MainHallBackground = name;
                    ServerAccountUpdate.QueueData({
                        VisualSettings: Player.VisualSettings
                    });
                    MainHallLoad();
                }
            }
            if (MouseIn(240, 585, 315, 90)) window.open('https://github.com/tetris245/ULTRAbc/releases', '_blank');
            if (MouseIn(240, 695, 315, 90)) window.open('https://github.com/tetris245/ULTRAbc/wiki', '_blank');
            if ((MouseX >= 570) && (MouseX < 660) && (MouseY >= 585) && (MouseY < 675)) PrfClick();
            if ((MouseX >= 570) && (MouseX < 660) && (MouseY >= 695) && (MouseY < 785)) ExtClick();
            next(args);
        });
    }

    async function ULTRAMainHallRun() {
        modApi.hookFunction('MainHallRun', 4, (args, next) => {
            ChatRoomActivateView(ChatRoomCharacterViewName);
            MainCanvas.textAlign = "center";
            TintsEffect();
            DrawText("Chat Rooms", 130, 530, "White", "Black");
            if (IsFemale() == true) DrawButton(240, 475, 90, 90, "", "White", "Screens/Online/ChatSelect/Female.png", "Only Female");
            if (IsMale() == true) DrawButton(240, 475, 90, 90, "", "White", "Screens/Online/ChatSelect/Male.png", "Only Male");
            if (asylumlimit == true) {
                DrawButton(350, 475, 90, 90, "", "Gray", "Icons/Asylum.png", "Asylum");
            } else {
                DrawButton(350, 475, 90, 90, "", "White", "Icons/Asylum.png", "Asylum");
            }
            DrawButton(460, 475, 90, 90, "", "White", "Icons/Gender.png", "Mixed");
            DrawButton(570, 475, 90, 90, "", "White", "Icons/Random.png", "Random background");
            DrawText("ULTRAbc", 130, 615, "White", "Black");
            DrawText(UBCver, 140, 655, "White", "Black");
            DrawButton(240, 585, 315, 90, "", "White", "", "Open UBC Changelog on GitHub");
            DrawImageResize("Icons/Changelog.png", 250, 600, 60, 60);
            DrawTextFit("UBC Changes", 425, 633, 308, "Black");
            DrawButton(570, 585, 90, 90, "", "White", "Icons/Preference.png", "Preferences");
            DrawText("/uhelp", 145, 725, "White", "Black");
            DrawText("in chat", 140, 765, "White", "Black");
            DrawButton(240, 695, 315, 90, "", "White", "", "Open UBC Wiki on GitHub");
            DrawImageResize("Icons/Introduction.png", 250, 710, 60, 60);
            DrawTextFit("UBC Wiki", 425, 743, 308, "Black");
            DrawButton(570, 695, 90, 90, "", "White", "Icons/Extensions.png", "Extensions");
            next(args);
        });
    }

    //Orgasm
    async function ULTRAActivityChatRoomArousalSync() {
        modApi.hookFunction('ActivityChatRoomArousalSync', 4, (args, next) => {
            if (M_MOANER_orgasmActive && M_MOANER_scriptOn && window.CurrentScreen == "ChatRoom") {
                if (Player.UBC != undefined) {
                    if (Player.UBC.ubcSettings != undefined) {
                        if (Player.UBC.ubcSettings.cum == true) {
                            if (Player.ArousalSettings.OrgasmStage == 2) {
                                setTimeout(function() {
                                    Player.ArousalSettings.OrgasmStage = 0;
                                    Player.UBC.ubcSettings.cum = false;
                                }, 15000);
                            }
                        }
                    }
                }
            }
            next(args);
        });
    }

    //Pandora Infiltration
    async function ULTRAInfiltrationPrepareMission() {
        modApi.hookFunction('InfiltrationPrepareMission', 4, (args, next) => {
            if (InfiltrationMission == "") {
                let InfiltrationMissionType = ["Rescue", "Kidnap", "Retrieve", "CatBurglar", "ReverseMaid"];
                InfiltrationMission = CommonRandomItemFromList(InfiltrationMission, InfiltrationMissionType);
            }
            if ((InfiltrationMission == "Rescue") || (InfiltrationMission == "Kidnap")) {
                InfiltrationTarget = {
                    Type: "NPC",
                    Name: CharacterGenerateRandomName(),
                    PrivateRoom: false
                };
            } else {
                const PreviousTarget = InfiltrationTarget && InfiltrationTarget.Type || "";
                const Type = /** @type {InfiltrationTargetType} */ (CommonRandomItemFromList(PreviousTarget, InfiltrationObjectType));
                InfiltrationTarget = {
                    Type: Type,
                    Name: DialogFind(InfiltrationSupervisor, "Object" + Type),
                };
            }
            InfiltrationSupervisor.Stage = InfiltrationMission;
            InfiltrationSupervisor.CurrentDialog = DialogFind(InfiltrationSupervisor, InfiltrationMission + "Intro");
            InfiltrationSupervisor.CurrentDialog = InfiltrationSupervisor.CurrentDialog.replace("TargetName", InfiltrationTarget.Name);
            return;
        });
    }

    //Pandora Prison
    async function ULTRAPandoraPenitentiaryResult() {
        modApi.hookFunction('PandoraPenitentiaryResult', 4, (args, next) => {
            if (CurrentScreen == "ChatRoom") return;
            if (PandoraPenitentiaryIsInmate(Player)) {
                let Result = [];
                PandoraPenitentiaryStartNewRoom = false;
            }
            let space = ChatRoomSpaceType.MIXED;
            if (ChatRoomSpace == "") space = ChatRoomSpaceType.FEMALE_ONLY;
            if (ChatRoomSpace == "M") space = ChatRoomSpaceType.MALE_ONLY;
            if (ChatRoomSpace == "Asylum") space = ChatRoomSpaceType.ASYLUM;
            ChatSearchReturnToScreen = null;
            PandoraPenitentiaryCreateTimer = CommonTime() + 10000;
            let ban = [];
            if (Player.OnlineSettings.AutoBanBlackList) ban.push("BlackList");
            if (Player.OnlineSettings.AutoBanGhostList) ban.push("GhostList");
            let listban = ChatRoomConcatenateBanList(ban);
            let bgnumber = "";
            let bgname = CommonRandomItemFromList(null, ["PrisonHall", "PandoraCell0", "PandoraCell1", "PandoraCell2", "PandoraCell3", "PandoraCell4", "PandoraCell5", "PandoraCell6"]);
            ChatAdminBackgroundList = BackgroundsList;
            /** @type {ChatRoomSettings} */
            PrisonRoom = {
                Name: "Pandora " + Math.round(Math.random() * 1000000000).toString(),
                Description: "Pandora Penitentiary Cell",
                Admin: [Player.MemberNumber],
                Whitelist: [],
                Ban: listban,
                Background: bgname,
                Limit: 10,
                Game: "Prison",
                Visibility: ChatRoomVisibilityMode.PUBLIC,
                Access: ChatRoomAccessMode.PUBLIC,
                BlockCategory: ["Leashing"],
                Language: ChatAdminDefaultLanguage,
                Space: space,
                MapData: {
                    Type: "Never"
                },
            };
            ServerSend("ChatRoomCreate", PrisonRoom);
            ChatAdminData = PrisonRoom;
            ChatAdminData.Background = bgname;
            ServerSend("ChatRoomUpdate", ChatAdminData);
            return;
        });
    }

    async function ULTRAPandoraPrisonClick() {
        modApi.hookFunction('PandoraPrisonClick', 4, (args, next) => {
            if (sosbuttons == true) {
                if ((MouseX >= 0) && (MouseX < 45) && (MouseY >= 45) && (MouseY < 90)) SosClick();
            }
            if (outbuttons == true) {
                if ((MouseX >= 0) && (MouseX < 45) && (MouseY >= 90) && (MouseY < 135)) OutClick();
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
            if (sosbuttons == true) SosButtons();
            if (outbuttons == true) OutButtons();
            TintsEffect();
            return;
        });
    }

    //Photographic Room
    async function ULTRAPhotographicClick() {
        modApi.hookFunction('PhotographicClick', 4, (args, next) => {
            if (sosbuttons == true) {
                if ((MouseX >= 0) && (MouseX < 45) && (MouseY >= 45) && (MouseY < 90)) SosClick();
            }
            if (outbuttons == true) {
                if ((MouseX >= 0) && (MouseX < 45) && (MouseY >= 90) && (MouseY < 135)) OutClick();
            }
            next(args);
        });
    }

    async function ULTRAPhotographicRun() {
        modApi.hookFunction('PhotographicRun', 4, (args, next) => {
            if (sosbuttons == true) SosButtons();
            if (outbuttons == true) OutButtons();
            TintsEffect();
            next(args);
        });
    }

    //Preferences
    async function ULTRAInformationSheetExit() {
        modApi.hookFunction('InformationSheetExit', 4, (args, next) => {
            FBCsettings();
            next(args);
        });
    }

    async function ULTRAPreferenceClick() {
        modApi.hookFunction('PreferenceClick', 4, (args, next) => {
            let event;
            if (MouseIn(1815, 780, 90, 90)) {
                let name = PreferenceSubscreen.name;
                if (name == "Arousal") PreferenceSubscreenArousalExit();
                if (name == "Audio") PreferenceSubscreenAudioExit();
                if (name == "CensoredWords") PreferenceSubscreenCensoredWordsExit();
                if (name == "Chat") PreferenceSubscreenChatExit();
                if (name == "Controller") PreferenceSubscreenControllerExit();
                if (name == "Difficulty") PreferenceSubscreenExit();
                if ((name == "Extensions") && (PreferenceExtensionsCurrent == null)) PreferenceSubscreenExtensionsExit();
                if (name == "Gender") PreferenceSubscreenExit();
                if (name == "General") PreferenceSubscreenGeneralExit();
                if (name == "Graphics") PreferenceSubscreenGraphicsExit();
                if (name == "Immersion") PreferenceSubscreenExit();
                if (name == "Notifications") PreferenceSubscreenNotificationsExit();
                if (name == "Online") PreferenceSubscreenExit();
                if (name == "Restriction") PreferenceSubscreenExit();
                if (name == "Scripts") PreferenceSubscreenScriptsExit();
                if (name == "Security") PreferenceSubscreenSecurityExit();
                PreferenceExit();
                InformationSheetExit();
            }
            next(args);
        });
    }

    async function ULTRAPreferenceRun() {
        modApi.hookFunction('PreferenceRun', 4, (args, next) => {
            MainCanvas.textAlign = "center";
            let name = PreferenceSubscreen.name;
            if ((name != "Extensions") || ((name == "Extensions") && (PreferenceExtensionsCurrent == null))) {
                DrawButton(1815, 780, 90, 90, "BACK", "White", "");
            }
            let mbb = 0;
            let list = PreferenceExtensionsDisplay;
            for (let i = 0; i < list.length; i++) {
                if (list[i].Button == "MBS Settings") mbb = 1;
            }
            if ((name == "Extensions") && (PreferenceExtensionsCurrent == null) && (mbb == 1) && (tintnever == false)) {
                if ((tintmbs == true) && (tintlevel != 0)) tintMbsColors();
                if (tintmbs == false) untintMbsColors();
            }
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAPreferenceSubscreenOnlineClick() {
        modApi.hookFunction('PreferenceSubscreenOnlineClick', 4, (args, next) => {
            if (PreferencePageCurrent === 2) {
                if ((MouseIn(1260, 330, 60, 60))) {
                    let listbg = PreferenceOnlineDefaultBackgroundList.length;
                    if (bgall) listbg = BackgroundsList.length;
                    let Roll = Math.floor(Math.random() * listbg);
                    if (Roll == 0) Roll = 1;
                    let name = BackgroundsList[Roll - 1].Name;
                    PreferenceOnlineDefaultBackground = name;
                    Player.OnlineSettings.DefaultChatRoomBackground = name;
                    PreferenceOnlineDefaultBackgroundIndex = PreferenceOnlineDefaultBackgroundList.indexOf(PreferenceOnlineDefaultBackground);
                    CommonSetScreen("Character", "Preference");
                    PreferenceSubscreen = PreferenceSubscreens.find(s => s.name === "Online");
                    PreferenceSubscreen?.load();
                    PreferencePageCurrent = 2;
                }
            }
            next(args);
        });
    }

    async function ULTRAPreferenceSubscreenOnlineRun() {
        modApi.hookFunction('PreferenceSubscreenOnlineRun', 4, (args, next) => {
            if (PreferencePageCurrent === 2) {
                DrawButton(1260, 330, 60, 60, "", "White", "", "Random background");
                DrawImageResize("Icons/Random.png", 1260, 330, 60, 60);
            }
            next(args);
        });
    }

    //Private Room
    async function ULTRAPrivateClick() {
        modApi.hookFunction('PrivateClick', 4, (args, next) => {
            if ((Player.ArousalSettings != null) && (Player.ArousalSettings.OrgasmTimer != null) && (typeof Player.ArousalSettings.OrgasmTimer === "number") && !isNaN(Player.ArousalSettings.OrgasmTimer) && (Player.ArousalSettings.OrgasmTimer > 0)) {
                if ((MouseX >= 700) && (MouseX <= 950) && (MouseY >= 532) && (MouseY <= 600) && (Player.ArousalSettings.OrgasmStage == 0)) ActivityOrgasmGameGenerate(0);
                if ((MouseX >= 1050) && (MouseX <= 1300) && (MouseY >= 532) && (MouseY <= 600) && (Player.ArousalSettings.OrgasmStage == 0)) ActivityOrgasmStart(Player);
                if ((MouseX >= ActivityOrgasmGameButtonX + 500) && (MouseX <= ActivityOrgasmGameButtonX + 700) && (MouseY >= ActivityOrgasmGameButtonY) && (MouseY <= ActivityOrgasmGameButtonY + 64) && (Player.ArousalSettings.OrgasmStage == 1)) ActivityOrgasmGameGenerate(ActivityOrgasmGameProgress + 1);
                return;
            }
            if (MouseIn(500, 0, 500, 1000) && !LogQuery("RentRoom", "PrivateRoom")) CharacterSetCurrent(Player);
            if (MouseIn(1000, 0, 500, 1000) && !LogQuery("RentRoom", "PrivateRoom")) {
                NPCTraitDialog(PrivateVendor);
                CharacterSetCurrent(PrivateVendor);
            }
            if (MouseIn(1885, PrivateButtonTop(0), 90, 90) && Player.CanWalk() && !Player.Cage) PrivateExit();
            if (MouseIn(1885, PrivateButtonTop(1), 90, 90) && LogQuery("RentRoom", "PrivateRoom") && Player.CanKneel()) PoseSetActive(Player, Player.ActivePoseMapping.BodyLower !== "Kneel" ? "Kneel" : "BaseLower", true);
            if (MouseIn(1885, PrivateButtonTop(2), 90, 90) && LogQuery("RentRoom", "PrivateRoom") && Player.CanWalk() && (!Player.Cage)) CharacterSetCurrent(PrivateVendor);
            if (MouseIn(1885, PrivateButtonTop(3), 90, 90) && LogQuery("RentRoom", "PrivateRoom") && Player.CanChangeOwnClothes()) CharacterAppearanceLoadCharacter(Player);
            if (MouseIn(1885, PrivateButtonTop(4), 90, 90) && LogQuery("RentRoom", "PrivateRoom") && Player.CanChangeOwnClothes() && LogQuery("Wardrobe", "PrivateRoom")) CommonSetScreen("Character", "Wardrobe");
            if (MouseIn(1885, PrivateButtonTop(5), 90, 90) && LogQuery("RentRoom", "PrivateRoom") && (!Player.Cage) && PrivateBedActive()) CommonSetScreen("Room", "PrivateBed");
            if (MouseIn(1885, PrivateButtonTop(6), 90, 90) && LogQuery("RentRoom", "PrivateRoom") && LogQuery("Expansion", "PrivateRoom")) PrivateCharacterOffset = (PrivateCharacterOffset + 4 == PrivateCharacterMax) ? 0 : PrivateCharacterOffset + 4;
            let backgrounds = BackgroundsPrivateRoomTagList;
            if (bgall) backgrounds = BackgroundsTagList;
            if (MouseIn(1885, PrivateButtonTop(7), 90, 90) && LogQuery("RentRoom", "PrivateRoom")) {
                BackgroundSelectionMake(backgrounds, MainHallBackground, (Name, setBackground) => {
                    if (setBackground) {
                        if (Name !== "MainHall") {
                            Player.VisualSettings.MainHallBackground = Name;
                        } else {
                            delete Player.VisualSettings.MainHallBackground;
                        }
                        ServerAccountUpdate.QueueData({
                            VisualSettings: Player.VisualSettings
                        });
                    }
                    CommonSetScreen("Room", "Private");
                });
            }
            if (MouseIn(1885, PrivateButtonTop(8), 90, 90) && LogQuery("RentRoom", "PrivateRoom")) {
                BackgroundSelectionMake(backgrounds, PrivateBackground, (Name, setBackground) => {
                    if (setBackground) {
                        PrivateBackground = Name;
                        if (Name !== "MainHall") {
                            Player.VisualSettings.PrivateRoomBackground = Name;
                        } else {
                            delete Player.VisualSettings.PrivateRoomBackground;
                        }
                        ServerAccountUpdate.QueueData({
                            VisualSettings: Player.VisualSettings
                        });
                    }
                    CommonSetScreen("Room", "Private");
                });
            }
            if (MouseIn(0, 900, 49, 49) && LogQuery("RentRoom", "PrivateRoom")) {
                BackgroundSelectionMake(backgrounds, "", (Name, setBackground) => {
                    if (setBackground) {
                        frname = Name;
                        M_MOANER_saveControls();
                    }
                    CommonSetScreen("Room", "Private");
                });
            }
            if (MouseIn(0, 950, 49, 49) && LogQuery("RentRoom", "PrivateRoom")) {
                BackgroundSelectionMake(backgrounds, "", (Name, setBackground) => {
                    if (setBackground) {
                        tcname = Name;
                        M_MOANER_saveControls();
                    }
                    CommonSetScreen("Room", "Private");
                });
            }
            if ((MouseX <= 1885) && (MouseY < 900) && LogQuery("RentRoom", "PrivateRoom") && (!Player.Cage)) PrivateClickCharacter();
            if ((MouseX <= 1885) && (MouseY >= 900) && LogQuery("RentRoom", "PrivateRoom")) PrivateClickCharacterButton();
            return;
        });
    }

    async function ULTRAPrivateRun() {
        modApi.hookFunction('PrivateRun', 4, (args, next) => {
            if (LogQuery("RentRoom", "PrivateRoom")) {
                DrawButton(0, 900, 49, 49, "", "White", "", "Select friend list background");
                DrawButton(0, 950, 49, 49, "", "White", "", "Select timer cell background");
                DrawImageResize("Icons/FriendList.png", 0, 900, 48, 48);
                DrawImageResize("Icons/Cell.png", 0, 950, 48, 48);
            }
            TintsEffect();
            next(args);
        });
    }

    //Stable
    async function ULTRAStablePlayerTrainingCarrotsEnd() {
        modApi.hookFunction('StablePlayerTrainingCarrotsEnd', 4, (args, next) => {
            if (gamestable) StablePonyEnd();
            next(args);
        });
    }

    async function ULTRAStablePlayerTrainingHurdlesEnd() {
        modApi.hookFunction('StablePlayerTrainingHurdlesEnd', 4, (args, next) => {
            if (gamestable) StablePonyEnd();
            next(args);
        });
    }

    async function ULTRAStableRun() {
        modApi.hookFunction('StableRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    //Timer Cell
    async function ULTRACellClick() {
        modApi.hookFunction('CellClick', 4, (args, next) => {
            if (CellOpenTimer < CurrentTime) {
                if (MouseIn(1885, 385, 90, 90) && (CellMinutes > 59)) CellMinutes = CellMinutes + 5;
            }
            if (sosbuttons == true) {
                if ((MouseX >= 0) && (MouseX < 45) && (MouseY >= 45) && (MouseY < 90)) SosClick();
            }
            if (outbuttons == true) {
                if ((MouseX >= 0) && (MouseX < 45) && (MouseY >= 90) && (MouseY < 135)) OutClick();
            }
            next(args);
        });
    }

    async function ULTRACellLoad() {
        modApi.hookFunction('CellLoad', 4, (args, next) => {
            CellBackground = tcname;
            CellKeyDepositStaff = CharacterLoadNPC("NPC_Cell_KeyDepositStaff");
            CellKeyDepositStaff.AllowItem = false;
            PoseSetActive(Player, null);
            CellOpenTimer = LogValue("Locked", "Cell");
            if (CellOpenTimer == null) CellOpenTimer = 0;
            return;
        });
    }

    async function ULTRACellRun() {
        modApi.hookFunction('CellRun', 4, (args, next) => {
            if (sosbuttons == true) SosButtons();
            if (outbuttons == true) OutButtons();
            TintsEffect();
            next(args);
        });
    }

    //Vision
    async function ULTRAArcadeRun() {
        modApi.hookFunction('ArcadeRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAAsylumBedroomRun() {
        modApi.hookFunction('AsylumBedroomRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAAsylumEntranceRun() {
        modApi.hookFunction('AsylumEntranceRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAAsylumGGTSRun() {
        modApi.hookFunction('AsylumGGTSRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAAsylumMeetingRun() {
        modApi.hookFunction('AsylumMeetingRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAAsylumTherapyRun() {
        modApi.hookFunction('AsylumTherapyRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRACafeRun() {
        modApi.hookFunction('CafeRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAChatAdminRoomCustomizationRun() {
        modApi.hookFunction('ChatAdminRoomCustomizationRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAChatSelectRun() {
        modApi.hookFunction('ChatSelectRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAChestLockpickRun() {
        modApi.hookFunction('ChestLockpickRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAClubCardBuilderRun() {
        modApi.hookFunction('ClubCardBuilderRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAClubCardLoungeRun() {
        modApi.hookFunction('ClubCardLoungeRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAClubCardRun() {
        modApi.hookFunction('ClubCardRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRACollegeCafeteriaRun() {
        modApi.hookFunction('CollegeCafeteriaRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRACollegeChessRun() {
        modApi.hookFunction('CollegeChessRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRACollegeDetentionRun() {
        modApi.hookFunction('CollegeDetentionRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRACollegeEntranceRun() {
        modApi.hookFunction('CollegeEntranceRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRACollegeTeacherRun() {
        modApi.hookFunction('CollegeTeacherRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRACollegeTennisRun() {
        modApi.hookFunction('CollegeTennisRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRACollegeTheaterRun() {
        modApi.hookFunction('CollegeTheaterRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRACraftingRun() {
        modApi.hookFunction('CraftingRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRADojoStruggleRun() {
        modApi.hookFunction('DojoStruggleRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRADrawCharacter() {
        modApi.hookFunction('DrawCharacter', 4, (args, next) => {
            if (Player.UBC != undefined) {
                if (Player.UBC.ubcSettings != undefined) {
                    let effect = Player.UBC.ubcSettings.blureffect * 1;
                    if (effect != 0) BlurEffect();
                }
            }
            next(args);
        });
    }

    async function ULTRADrawRoomBackground() {
        modApi.hookFunction('DrawRoomBackground', 4, (args, next) => {
            if (Player.UBC != undefined) {
                if (Player.UBC.ubcSettings != undefined) {
                    let effect = Player.UBC.ubcSettings.blureffect * 1;
                    if (effect != 0) BlurEffect();
                }
            }
            next(args);
        });
    }

    async function ULTRAGamblingRun() {
        modApi.hookFunction('GamblingRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAGetUpRun() {
        modApi.hookFunction('GetUpRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAHorseWalkRun() {
        modApi.hookFunction('HorseWalkRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAInfiltrationRun() {
        modApi.hookFunction('InfiltrationRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAInformationSheetRun() {
        modApi.hookFunction('InformationSheetRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAIntroductionRun() {
        modApi.hookFunction('IntroductionRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAKidnapLeagueRun() {
        modApi.hookFunction('KidnapLeagueRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAKidnapRun() {
        modApi.hookFunction('KidnapRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRALARPRun() {
        modApi.hookFunction('LARPRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAMagicBattleRun() {
        modApi.hookFunction('MagicBattleRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAMagicRun() {
        modApi.hookFunction('MagicRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAMagicSchoolEscapeRun() {
        modApi.hookFunction('MagicSchoolEscapeRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAMagicSchoolLaboratoryRun() {
        modApi.hookFunction('MagicSchoolLaboratoryRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAMaidCleaningRun() {
        modApi.hookFunction('MaidCleaningRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAMaidDrinksRun() {
        modApi.hookFunction('MaidDrinksRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAMaidQuartersRun() {
        modApi.hookFunction('MaidQuartersRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAManagementRun() {
        modApi.hookFunction('ManagementRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAMovieStudioRun() {
        modApi.hookFunction('MovieStudioRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRANurseryRun() {
        modApi.hookFunction('NurseryRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAOnlineProfileRun() {
        modApi.hookFunction('OnlineProfileRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAPandoraRun() {
        modApi.hookFunction('PandoraRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAPlatformDialogRun() {
        modApi.hookFunction('PlatformDialogRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAPlatformIntroRun() {
        modApi.hookFunction('PlatformIntroRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAPlatformProfileRun() {
        modApi.hookFunction('PlatformProfileRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAPlatformRun() {
        modApi.hookFunction('PlatformRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAPlayerAuctionRun() {
        modApi.hookFunction('PlayerAuctionRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAPokerRun() {
        modApi.hookFunction('PokerRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAPrisonRun() {
        modApi.hookFunction('PrisonRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAPuppyWalkerRun() {
        modApi.hookFunction('PuppyWalkerRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRARhythmGameRun() {
        modApi.hookFunction('RhythmGameRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRASarahRun() {
        modApi.hookFunction('SarahRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAShibariRun() {
        modApi.hookFunction('ShibariRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAShopRun() {
        modApi.hookFunction('ShopRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRASlaveAuctionRun() {
        modApi.hookFunction('SlaveAuctionRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRASlaveMarketRun() {
        modApi.hookFunction('SlaveMarketRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRATennisRun() {
        modApi.hookFunction('TennisRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRATherapyRun() {
        modApi.hookFunction('TherapyRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRATitleRun() {
        modApi.hookFunction('TitleRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAWheelFortuneRun() {
        modApi.hookFunction('WheelFortuneRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    //Wardrobe
    async function ULTRAAppearanceClick() {
        modApi.hookFunction('AppearanceClick', 4, (args, next) => {
            let C = CharacterAppearanceSelection;
            if (CharacterAppearanceMode == "Wardrobe") {
                if ((MouseX >= 1510) && (MouseX < 1610) && (MouseY >= 240) && (MouseY < 290)) {
                    if (C.OnlineSharedSettings.UBC != undefined) {
                        if (ServerPlayerIsInChatRoom()) {
                            if ((C.Nickname == '') || (C.Nickname == undefined)) {
                                tgpname = C.Name;
                            } else {
                                tgpname = C.Nickname;
                            }
                            if ((tmpname != tgpname) && (IsTargetProtected(C))) {
                                let msg = "UBC Export is not possible because " + tgpname + " has enabled the Uwall protection.";
                                infomsg(msg);
                            } else {
                                let appall = new Array();
                                C.Appearance.forEach(item => {
                                    let app = new Array();
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
                    let appinp = prompt('Please input the awcode (Compatible with BCG).', '');
                    if (C.OnlineSharedSettings.UBC != undefined) {
                        if ((C.Nickname == '') || (C.Nickname == undefined)) {
                            tgpname = C.Name;
                        } else {
                            tgpname = C.Nickname;
                        }
                        if ((tmpname != tgpname) && (IsTargetProtected(C))) {
                            let msg = "UBC Import is not possible because " + tgpname + " has enabled the Uwall protection.";
                            infomsg(msg);
                        } else {
                            for (let A = C.Appearance.length - 1; A >= 0; A--)
                                if ((C.Appearance[A].Asset.Group.Category == "Appearance") && C.Appearance[A].Asset.Group.AllowNone) {
                                    if (!(echolevel2.includes(C.Appearance[A].Asset.Group.Name))) {
                                        InventoryRemove(C, C.Appearance[A].Asset.Group.Name);
                                    }
                                }
                            CharacterReleaseNoLock(C);
                            let appobj = JSON.parse(decodeURI(atob(appinp)));
                            appobj.forEach(itemstr => {
                                if ((InventoryGet(C, itemstr[1]) != null) && (InventoryGet(C, itemstr[1]).Asset.AllowLock == true)) {
                                    if (((InventoryGet(C, itemstr[1]).Property != null) && (InventoryGet(C, itemstr[1]).Property.LockedBy == null)) || (InventoryGet(C, itemstr[1]).Property == null)) {
                                        InventoryRemove(C, itemstr[1]);
                                        InventoryWear(C, itemstr[0], itemstr[1], itemstr[2], itemstr[3], -1, itemstr[4]);
                                    }
                                } else if (!(echolevel2.includes(itemstr[1]))) {
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
                    let appinp = prompt('Please input the awcode (Compatible with BCG).', '');
                    if (C.OnlineSharedSettings.UBC != undefined) {
                        if ((C.Nickname == '') || (C.Nickname == undefined)) {
                            tgpname = C.Name;
                        } else {
                            tgpname = C.Nickname;
                        }
                        if ((tmpname != tgpname) && (IsTargetProtected(C))) {
                            let msg = "UBC Import is not possible because " + tgpname + " has enabled the Uwall protection.";
                            infomsg(msg);
                        } else {
                            CharacterNaked(C);
                            CharacterReleaseNoLock(C);
                            let appobj = JSON.parse(decodeURI(atob(appinp)));
                            appobj.forEach(itemstr => {
                                if ((InventoryGet(C, itemstr[1]) != null) && (InventoryGet(C, itemstr[1]).Asset.AllowLock == true)) {
                                    if (((InventoryGet(C, itemstr[1]).Property != null) && (InventoryGet(C, itemstr[1]).Property.LockedBy == null)) || (InventoryGet(C, itemstr[1]).Property == null)) {
                                        InventoryRemove(C, itemstr[1]);
                                        InventoryWear(C, itemstr[0], itemstr[1], itemstr[2], itemstr[3], -1, itemstr[4]);
                                    }
                                } else if (!(echolevel1.includes(itemstr[1]))) {
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
                    let appinp = prompt('Please input the awcode (Compatible with BCG).', '');
                    if (C.OnlineSharedSettings.UBC != undefined) {
                        if ((C.Nickname == '') || (C.Nickname == undefined)) {
                            tgpname = C.Name;
                        } else {
                            tgpname = C.Nickname;
                        }
                        if ((tmpname != tgpname) && (IsTargetProtected(C))) {
                            let msg = "UBC Import is not possible because " + tgpname + " has enabled the Uwall protection.";
                            infomsg(msg);
                        } else {
                            CharacterNaked(C);
                            CharacterReleaseNoLock(C);
                            let appobj = JSON.parse(decodeURI(atob(appinp)));
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

    async function ULTRAAppearanceRun() {
        modApi.hookFunction('AppearanceRun', 4, (args, next) => {
            TintsEffect();
            if (CharacterAppearanceMode == "Wardrobe") {
                DrawButton(1510, 240, 100, 60, "Export", "#50E992", "", "Full ULTRAbc Export");
                DrawButton(1630, 240, 100, 60, "Import1", "#50E992", "", "Clothing + Restraints");
                DrawButton(1750, 240, 100, 60, "Import2", "#50E992", "", "Clothing + Restraints + Cosplay");
                DrawButton(1870, 240, 100, 60, "Import3", "#50E992", "", "Full ULTRAbc Import");
            }
            next(args);
        });
    }

    //Other functions
    //Background
    function morebg() {
        let alwaysBackgrounds = [
            { Name: "AmandaCollarIntro", Tag: [BackgroundsTagIndoor] },
            { Name: "AmandaIntro", Tag: [BackgroundsTagIndoor] },
            { Name: "Bar", Tag: [BackgroundsTagIndoor] },
            { Name: "BrickWall", Tag: [BackgroundsTagIndoor] },
            { Name: "Cell", Tag: [BackgroundsTagIndoor] },
            { Name: "ClubCardLounge", Tag: [BackgroundsTagIndoor] },
            { Name: "CollegeTeacherLounge", Tag: [BackgroundsTagIndoor] },
            { Name: "CollegeTennisPlay", Tag: [BackgroundsTagIndoor] },
            { Name: "CraftingWorkshop", Tag: [BackgroundsTagIndoor] },
            { Name: "Dressing", Tag: [BackgroundsTagIndoor] },
            { Name: "Gambling", Tag: [BackgroundsTagIndoor] },
            { Name: "grey", Tag: [BackgroundsTagIndoor] },
            { Name: "HorseStableLight", Tag: [BackgroundsTagIndoor] },
            { Name: "Magic", Tag: [BackgroundsTagIndoor] },
            { Name: "MagicSchoolEscape", Tag: [BackgroundsTagIndoor] },
            { Name: "MagicSchoolLaboratory", Tag: [BackgroundsTagIndoor] },
            { Name: "Orig/Entrance", Tag: [BackgroundsTagIndoor] },
            { Name: "Orig/Lounge", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Ground/Entrance", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Second/Cell0", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Second/Cell1", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Second/Cell2", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Second/Cell3", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Second/Cell4", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Second/Cell5", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Second/Cell6", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Second/Entrance", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Second/Fork0", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Second/Fork1", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Second/Fork2", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Second/Fork3", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Second/Fork4", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Second/Fork5", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Second/Fork6", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Second/Rest0", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Second/Tunnel0", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Second/Tunnel1", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Second/Tunnel2", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Second/Tunnel3", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Second/Tunnel4", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Second/Tunnel5", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Second/Tunnel6", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Underground/Entrance", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Underground/Fork0", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Underground/Fork1", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Underground/Fork2", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Underground/Fork3", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Underground/Fork4", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Underground/Fork5", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Underground/Fork6", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Underground/Rest0", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Underground/Tunnel0", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Underground/Tunnel1", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Underground/Tunnel2", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Underground/Tunnel3", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Underground/Tunnel4", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Underground/Tunnel5", Tag: [BackgroundsTagIndoor] },
            { Name: "Pandora/Underground/Tunnel6", Tag: [BackgroundsTagIndoor] },
            { Name: "Prison", Tag: [BackgroundsTagIndoor] },
            { Name: "RhythmGame", Tag: [BackgroundsTagIndoor] },
            { Name: "RhythmGameLoading", Tag: [BackgroundsTagIndoor] },
            { Name: "SarahBedroom0", Tag: [BackgroundsTagIndoor] },
            { Name: "SarahBedroom1", Tag: [BackgroundsTagIndoor] },
            { Name: "SarahBedroom2", Tag: [BackgroundsTagIndoor] },
            { Name: "SarahBedroom3", Tag: [BackgroundsTagIndoor] },
            { Name: "SarahIntro", Tag: [BackgroundsTagIndoor] },
            { Name: "Sheet", Tag: [BackgroundsTagIndoor] },
            { Name: "SheetWhite", Tag: [BackgroundsTagIndoor] },
            { Name: "Shop", Tag: [BackgroundsTagIndoor] },
            { Name: "SlaveMarket", Tag: [BackgroundsTagIndoor] },
            { Name: "SophieIntro", Tag: [BackgroundsTagIndoor] },
            { Name: "White", Tag: [BackgroundsTagIndoor] },
            { Name: "HypnoSpiral2", Tag: [BackgroundsTagIndoor] },
            { Name: "HypnoticSpiral", Tag: [BackgroundsTagIndoor] },
        ];
        let bcxBackgrounds = [
            { Name: "AsylumBedroom", Tag: [BackgroundsTagIndoor] },
            { Name: "AsylumEntrance", Tag: [BackgroundsTagIndoor] },
            { Name: "AsylumGGTSRoom", Tag: [BackgroundsTagIndoor] },
            { Name: "AsylumGGTSRoomAlert", Tag: [BackgroundsTagIndoor] },
            { Name: "AsylumMeeting", Tag: [BackgroundsTagIndoor] },
            { Name: "AsylumTherapy", Tag: [BackgroundsTagIndoor] },
            { Name: "OutsideCells", Tag: [BackgroundsTagIndoor] },
            { Name: "PaddedCell", Tag: [BackgroundsTagIndoor] },
            { Name: "PaddedCell2", Tag: [BackgroundsTagIndoor] },
        ];
        BackgroundsList.push(...alwaysBackgrounds);
        if (!window.BCX_Loaded) {
            BackgroundsList.push(...bcxBackgrounds);
        }
        ChatCreateBackgroundList = BackgroundsGenerateList(BackgroundsTagList);
    }

    function updateBackground() {
        let UpdatedRoom = {
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
    function showAnimalTypeStatus(BCARdata) {
        let msg = "Current Animal Type: " + BCARdata.animal;
        statusmsg(msg);
    }

    function showAnimationButtonsStatus(BCARdata) {
        let msg = "Animation Buttons disabled.";
        if (BCARdata.animationButtonsEnable) msg = "Animation Buttons enabled.";
        statusmsg(msg);
    }

    function showArousalManipulationStatus(BCARdata) {
        let msg = "Arousal Manipulation disabled.";
        if (BCARdata.arousalEnable) msg = "Arousal Manipulation enabled.";
        statusmsg(msg);
    }

    function showBCARExpressionsStatus(BCARdata) {
        let msg = "BCAR Expressions disabled.";
        if (BCARdata.expressionsEnable) msg = "BCAR Expressions enabled.";
        statusmsg(msg);
    }

    function showEarAnimationStatus(BCARdata) {
        let msg = "Ear Animation disabled.";
        if (BCARdata.earWigglingEnable) msg = "Ear Animation enabled.";
        statusmsg(msg);
    }

    function showEarEmoteStatus(BCARdata) {
        let msg = "Ear Emote disabled.";
        if (BCARdata.earEmoteEnable) msg = "Ear Emote enabled.";
        statusmsg(msg);
    }

    function showTailAnimationStatus(BCARdata) {
        let msg = "Tail Animation disabled.";
        if (BCARdata.tailWaggingEnable) msg = "Tail Animation enabled.";
        statusmsg(msg);
    }

    function showTailEmoteStatus(BCARdata) {
        let msg = "Tail Emote disabled.";
        if (BCARdata.tailEmoteEnable) msg = "Tail Emote enabled.";
        statusmsg(msg);
    }

    function showWingAnimationStatus(BCARdata) {
        let msg = "Wing Animation disabled.";
        if (BCARdata.wingFlappingEnable) msg = "Wing Animation enabled.";
        statusmsg(msg);
    }

    //BC Responsive Status	
    function showBCResponsiveStatus(BCRdata) {
        let msg = "";
        let msg1 = "BC Responsive is disabled.";
        if (BCRdata.settings.enabled) msg1 = "BC Responsive is enabled.";
        active = BCRdata.active_personality;
        Personality = BCRdata.personalities[active].name;
        let msg2 = "";
        let rsp = "";
        if (BCRdata.personalities[active].responses.length != 0) {
            for (let i = 0; i < BCRdata.personalities[active].responses.length; i++) {
                if (BCRdata.personalities[0].responses[i].enabled) {
                    rsp = BCRdata.personalities[0].responses[i].name;
                } else {
                    rsp = "";
                }
                msg2 = msg2 + rsp + " - ";
            }
            msg = msg1 + " Active personality when enabled: " + Personality + ". Responses: " + msg2;
            statusmsg(msg);
        }
    }

    //BCTweaks Status
    function showArousalErectionStatus(BCTdata) {
        let msg = "Arousal can't affect male erection.";
        if (BCTdata.arousalAffectsErection) msg = "Arousal can affect male erection.";
        statusmsg(msg);
    }

    function showArousalProgressStatus(BCTdata) {
        let msg = "Arousal can't affect orgasm progress.";
        if (BCTdata.arousalAffectsOrgasmProgress) msg = "Arousal can affect orgasm progress.";
        statusmsg(msg);
    }

    function showBCIconsStatus(BCTdata) {
        let msg = "BC Icons are always displayed.";
        if (BCTdata.allIconOnlyShowOnHover) msg = "BC Icons are displayed only when the mouse hovers above you.";
        statusmsg(msg);
    }

    function showBCTChangelogStatus(BCTdata) {
        let msg = "BCT Changelog feature is disabled.";
        if (BCTdata.showChangelog) msg = "BCT Changelog feature is enabled.";
        statusmsg(msg);
    }

    function showBCTIconStatus(BCTdata) {
        let msg = "BCT Icon is always displayed.";
        if (BCTdata.bctIconOnlyShowOnHover) msg = "BCT Icon is displayed only when the mouse hovers above you.";
        statusmsg(msg);
    }

    function showBestFriendsStatus(BCTdata) {
        let msg = "Best Friends feature is disabled.";
        if (BCTdata.bestFriendsEnabled) msg = "Best Friends feature is enabled.";
        statusmsg(msg);
    }

    function showFriendlistSlotsStatus(BCTdata) {
        let msg = "No extra infos in Friendlist.";
        if (BCTdata.friendlistSlotsEnabled) msg = "Extra infos in Friendlist.";
        statusmsg(msg);
    }

    function showLockConversionStatus(BCTdata) {
        let msg = "High security locks can't become Best Friend locks.";
        if (BCTdata.hsToBFLockconvert) msg = "High security locks can become Best Friend locks.";
        statusmsg(msg);
    }

    function showRoomShareStatus(BCTdata) {
        let msg = "Best Friends can't share private room names.";
        if (BCTdata.bestFriendsRoomShare) msg = "Best Friends can share private room names.";
        statusmsg(msg);
    }

    function showSplitStatus(BCTdata) {
        let msg = "Only the standard arousal + orgasm bar.";
        if (BCTdata.splitOrgasmArousal) msg = "Two bars for arousal and orgasm.";
        statusmsg(msg);
    }

    function showTailWaggingStatus(BCTdata) {
        let msg = "Tail Wagging feature is disabled.";
        if (BCTdata.tailWaggingEnable) msg = "Tail Wagging feature is enabled.";
        statusmsg(msg);
    }

    //Bondage Brawl
    function BrawlCheat() {
        PlatformPlayer.Health = 100;
        PlatformPlayer.Magic = 100;
        PlatformPlayer.Projectile = 100;
    }

    //Buttons
    function ExtClick() {
        ChatRoomSetLastChatRoom("");
        ChatRoomHideElements();
        InformationSheetLoadCharacter(Player);
        PreferenceSubscreen = "Extensions";
        PreferenceRun();
        CommonSetScreen("Character", "Preference");
        PreferenceSubscreenExtensionsLoad = function() {
            PreferenceSubscreen = "Extensions";
            PreferenceSettings = "Settings";
            PreferenceExtensionsDisplay = Object.keys(PreferenceExtensionsSettings).map(
                k => (
                    s => ({
                        Button: typeof s.ButtonText === "function" ? s.ButtonText() : s.ButtonText,
                        Image: s.Image && (typeof s.Image === "function" ? s.Image() : s.Image),
                        click: () => {
                            PreferenceExtensionsCurrent = s;
                            s?.load();
                        }
                    })
                )(PreferenceExtensionsSettings[k])
            );
        };
        PreferenceSubscreenExtensionsLoad();
    }

    function OutButtons() {
        if (noescape == false) {
            if (window.CurrentScreen == "ChatRoom") {
                DrawButton(955, 360, 45, 45, "OUT", "White", "", "");
            } else {
                if (slowleave == true) {
                    DrawButton(0, 90, 45, 45, "OUT", "White", "", "Slow Exit");
                } else {
                    DrawButton(0, 90, 45, 45, "OUT", "White", "", "Fast Exit");
                }
            }
        }
    }

    function OutChat() {
        if (PandoraPenitentiaryIsInmate(Player)) {
            Player.Game.Prison.Timer = Math.round(CurrentTime);
            ServerAccountUpdate.QueueData({
                Game: Player.Game
            }, true);
        }
        ChatRoomSetLastChatRoom("");
        ServerSend("ChatRoomLeave", "");
        CommonSetScreen("Online", "ChatSearch");
        ChatRoomClearAllElements();
        OnlineGameName = "";
        ChatRoomGame = "";
        ChatRoomData = null;
    }

    function OutClick() {
        if (noescape == false) {
            if (window.CurrentScreen == "Cell") CellLock(0);
            if (window.CurrentScreen == "PandoraPrison") PandoraPunishmentSentence(0);
            CharacterRefresh(Player);
            if (slowleave == true) {
                if (window.CurrentScreen == "PandoraPrison") {
                    setTimeout(function() {
                        PandoraPrisonExitPrison();
                    }, 15000);
                } else {
                    setTimeout(function() {
                        CommonSetScreen("Room", "MainHall");
                    }, 15000);
                }
            } else {
                if (window.CurrentScreen == "PandoraPrison") {
                    PandoraPrisonExitPrison();
                } else {
                    CommonSetScreen("Room", "MainHall");
                }
            }
        }
    }

    function PrfClick() {
        ChatRoomSetLastChatRoom("");
        ChatRoomHideElements();
        InformationSheetLoadCharacter(Player);
        PreferenceSubscreen = "Main";
        PreferenceRun();
        CommonSetScreen("Character", "Preference");
    }

    function SosButtons() {
        if (noescape == false) {
            if (window.CurrentScreen == "ChatRoom") {
                DrawButton(955, 315, 45, 45, "FREE", "White", "", "");
            } else {
                DrawButton(0, 45, 45, 45, "FREE", "White", "", "Total Release");
            }
        }
    }

    function SosClick() {
        if (noescape == false) {
            CharacterReleaseTotal(Player);
            if (window.CurrentScreen == "ChatRoom") ChatRoomCharacterUpdate(Player);
            RealGarblingLevel();
        }
    }

    //Character
    function CharacterBio(target) {
        ChatRoomSetLastChatRoom("");
        ChatRoomHideElements();
        InformationSheetLoadCharacter(target);
        OnlineProfileRun();
        CommonSetScreen("Character", "OnlineProfile");
    }

    function ResetHousesReputation() {
        DialogSetReputation("HouseAmplector", 0);
        DialogSetReputation("HouseCorporis", 0);
        DialogSetReputation("HouseMaiestas", 0);
        DialogSetReputation("HouseVincula", 0);
        LogDelete("Mastery", "MagicSchool");
    } 

    //Club Card Game
    const targetCard = ClubCardList.find(card => card.ID === 6011 && card.Name === "Vintage Maid");
    if (targetCard) {
        targetCard.OnPlay = function(CCPlayer) {
            if (CCPlayer.Control == 'AI') {
                if (CCPlayer.DiscardPile.length > 0) {
                    const randomCard = CCPlayer.DiscardPile[Math.floor(Math.random() * CCPlayer.DiscardPile.length)];
                    CCPlayer.Hand.push(ClubCardGetCopyCardByName(randomCard.Name));
                    CCPlayer.DiscardPile.splice(CCPlayer.DiscardPile.findIndex(value => value.ID === randomCard.ID), 1);                 
                }
            } else {
                if (ClubCardSelection == null && CCPlayer.DiscardPile.filter(card => card.Type !== "Event").length > 0) {
                    ClubCardCreatePopup("SEARCH", null, null, null, null, null, CCPlayer.DiscardPile.filter(card => card.Type !== "Event"));
                    return;
                }
                if (ClubCardSelection) {
                    CCPlayer.DiscardPile.splice(CCPlayer.DiscardPile.findIndex(value => value.ID === ClubCardSelection.ID), 1);
                    CCPlayer.Hand.push(ClubCardGetCopyCardByName(ClubCardSelection.Name));
                } else {
                    ClubCardPlayCard(CCPlayer, this, false);
                }
            }
        };
    }

    function moreABDLCards() {       
        ClubCardOpponent = CurrentCharacter;
        if (npcdeck == -1) {
            ClubCardOpponentDeck = ClubCardBuilderABDLDeck;
            moreCards("ABDL"); 
        }
        if (npcdeck != -1) setNpcDeck();    
    }

    function moreAsylumCards() {       
        ClubCardOpponent = CurrentCharacter;
        if (npcdeck == -1) {
            ClubCardOpponentDeck = ClubCardBuilderAsylumDeck;
            moreCards("Asylum"); 
        }
        if (npcdeck != -1) setNpcDeck();    
    }

    function moreCards(data) {
        let plusdeck = [];
        if (data == "Default") plusdeck = DefaultDeckPlus;
        if (data == "ABDL") plusdeck = ABDLDeckPlus; 
        if (data == "Asylum") plusdeck = AsylumDeckPlus;
	if (data == "College") plusdeck = CollegeDeckPlus;
        if (data == "Dominant") plusdeck = DominantDeckPlus;
        if (data == "Liability") plusdeck = LiabilityDeckPlus;
        if (data == "Maid") plusdeck = MaidDeckPlus;
        if (data == "Pet") plusdeck = PetDeckPlus;
        if (data == "Porn") plusdeck = PornDeckPlus;
        if (data == "Shibari") plusdeck = ShibariDeckPlus;
        if (data == "Extra") plusdeck = ExtraDeckPlus;
        if (ccards > 30) ClubCardOpponentDeck = ClubCardOpponentDeck.concat(plusdeck[0]);
        if (ccards > 31) ClubCardOpponentDeck = ClubCardOpponentDeck.concat(plusdeck[1]);
        if (ccards > 32) ClubCardOpponentDeck = ClubCardOpponentDeck.concat(plusdeck[2]);
        if (ccards > 33) ClubCardOpponentDeck = ClubCardOpponentDeck.concat(plusdeck[3]);
        if (ccards > 34) ClubCardOpponentDeck = ClubCardOpponentDeck.concat(plusdeck[4]);
        if (ccards > 35) ClubCardOpponentDeck = ClubCardOpponentDeck.concat(plusdeck[5]);
        if (ccards > 36) ClubCardOpponentDeck = ClubCardOpponentDeck.concat(plusdeck[6]);
        if (ccards > 37) ClubCardOpponentDeck = ClubCardOpponentDeck.concat(plusdeck[7]);
        if (ccards > 38) ClubCardOpponentDeck = ClubCardOpponentDeck.concat(plusdeck[8]);
        if (ccards > 39) ClubCardOpponentDeck = ClubCardOpponentDeck.concat(plusdeck[9]);
    } 

    function moreCollegeCards() {       
        ClubCardOpponent = CurrentCharacter;
        if (npcdeck == -1) {
            ClubCardOpponentDeck = ClubCardBuilderCollegeDeck;
            moreCards("College"); 
        }
        if (npcdeck != -1) setNpcDeck();    
    }

    function moreDefaultCards() {       
        ClubCardOpponent = ClubCardLoungeTutor; 
        if (npcdeck == -1) {
            ClubCardOpponentDeck = ClubCardBuilderDefaultDeck;
            moreCards("Default"); 
        }
	   if (npcdeck != -1) setNpcDeck();    
    }

    function moreDominantCards() {       
        ClubCardOpponent = CurrentCharacter;
        if (npcdeck == -1) {
            ClubCardOpponentDeck = ClubCardBuilderDominantDeck;
            moreCards("Dominant"); 
        }
        if (npcdeck != -1) setNpcDeck();    
    }

    function moreExtraCards() {       
        ClubCardOpponent = CurrentCharacter;
        if (npcdeck == -1) {
            ClubCardOpponentDeck = ClubCardBuilderExtraDeck;
            moreCards("Extra"); 
        }
        if (npcdeck != -1) setNpcDeck();    
    }

    function moreLiabilityCards() {       
        ClubCardOpponent = CurrentCharacter;
        if (npcdeck == -1) {
            ClubCardOpponentDeck = ClubCardBuilderLiabilityDeck;
            moreCards("Liability"); 
        }
        if (npcdeck != -1) setNpcDeck();    
    }
 
    function moreMaidCards() {       
        ClubCardOpponent = CurrentCharacter;
        if (npcdeck == -1) {
            ClubCardOpponentDeck = ClubCardBuilderMaidDeck;
            moreCards("Maid"); 
        }
        if (npcdeck != -1) setNpcDeck();    
    }

    function morePetCards() {       
        ClubCardOpponent = CurrentCharacter;
        if (npcdeck == -1) {
            ClubCardOpponentDeck = ClubCardBuilderPetDeck;
            moreCards("Pet"); 
        }
        if (npcdeck != -1) setNpcDeck();    
    }

    function morePornCards() {       
        ClubCardOpponent = CurrentCharacter;
        if (npcdeck == -1) {
            ClubCardOpponentDeck = ClubCardBuilderPornDeck;
            moreCards("Porn"); 
        }
        if (npcdeck != -1) setNpcDeck();    
    }

    function morePrivateCards() {
        ClubCardOpponent = CurrentCharacter;
        ClubCardOpponentDeck = PrivateGetClubCardDeck(CurrentCharacter);
        let data = "";
        if (ClubCardOpponentDeck == ClubCardBuilderDefaultDeck) data = "Default"; 
        if (ClubCardOpponentDeck == ClubCardBuilderABDLDeck) data = "ABDL"; 
        if (ClubCardOpponentDeck == ClubCardBuilderAsylumDeck) data = "Asylum"; 
        if (ClubCardOpponentDeck == ClubCardBuilderCollegeDeck) data = "College"; 
        if (ClubCardOpponentDeck == ClubCardBuilderDominantDeck) data = "Dominant";
        if (ClubCardOpponentDeck == ClubCardBuilderLiabilityDeck) data = "Liability";  
        if (ClubCardOpponentDeck == ClubCardBuilderMaidDeck) data = "Maid"; 
        if (ClubCardOpponentDeck == ClubCardBuilderPetDeck) data = "Pet"; 
        if (ClubCardOpponentDeck == ClubCardBuilderPornDeck) data = "Porn"; 
        if (ClubCardOpponentDeck == ClubCardBuilderShibariDeck) data = "Shibari"; 
        if (ClubCardOpponentDeck == ClubCardBuilderExtraDeck) data = "Extra"; 
        moreCards(data);
    }

    function moreShibariCards() {       
        ClubCardOpponent = CurrentCharacter;
        if (npcdeck == -1) {
            ClubCardOpponentDeck = ClubCardBuilderShibariDeck;
            moreCards("Shibari"); 
        }
        if (npcdeck != -1) setNpcDeck();    
    }

    function setNpcDeck() {
        if (npcdeck == 0) {
            ClubCardOpponentDeck = ClubCardBuilderDefaultDeck;
            moreCards("Default"); 
        }
        if (npcdeck == 1) {
            ClubCardOpponentDeck = ClubCardBuilderABDLDeck;
            moreCards("ABDL"); 
        }
        if (npcdeck == 2) {
            ClubCardOpponentDeck = ClubCardBuilderAsylumDeck;
            moreCards("Asylum"); 
        }
        if (npcdeck == 3) {
            ClubCardOpponentDeck = ClubCardBuilderCollegeDeck;
            moreCards("College"); 
        }
        if (npcdeck == 4) {
            ClubCardOpponentDeck = ClubCardBuilderDominantDeck;
            moreCards("Dominant"); 
        }
        if (npcdeck == 5) {
            ClubCardOpponentDeck = ClubCardBuilderLiabilityDeck;
            moreCards("Liability"); 
        }
        if (npcdeck == 6) {
            ClubCardOpponentDeck = ClubCardBuilderMaidDeck;
            moreCards("Maid"); 
        }
        if (npcdeck == 7) {
            ClubCardOpponentDeck = ClubCardBuilderPetDeck;
            moreCards("Pet"); 
        }
        if (npcdeck == 8) {
            ClubCardOpponentDeck = ClubCardBuilderPornDeck;
            moreCards("Porn"); 
        }
        if (npcdeck == 9) {
            ClubCardOpponentDeck = ClubCardBuilderShibariDeck;
            moreCards("Shibari"); 
        }
        if (npcdeck == 10) {
            ClubCardOpponentDeck = ClubCardBuilderExtraDeck;
            moreCards("Extra"); 
        }
    }

    //DOGS Status
    function showDeviousLockStatus(DOGSdata) {
        let msg = "Devious Padlock is disabled.";
        if (DOGSdata.deviousPadlock.state) msg = "Devious Padlock is enabled.";
        statusmsg(msg);
    }

    function showDogsLocalStatus(DOGSdata) {
        let msg = "DOGS local messages are not deleted.";
        if (DOGSdata.misc.deleteLocalMessages) msg = "DOGS local messages are deleted.";
        statusmsg(msg);
    }

    function showDogsVersionStatus(DOGSdata) {
        let msg = "New DOGS Version changelog is disabled.";
        if (DOGSdata.misc.autoShowChangelog) msg = "New DOGS Version changelog is enabled.";
        statusmsg(msg);
    }

    function showRemoteControlStatus(DOGSdata) {
        let msg = "Remote Control is disabled.";
        if (DOGSdata.remoteControl.state) msg = "Remote Control is enabled.";
        statusmsg(msg);
    }

    //EBCH Status
    function showEbchLogStatus(EBCHdata) {
        let msg = "Chatlogging is enabled.";
        if (EBCHdata[4] == 0) msg = "Chatlogging is disabled.";
        statusmsg(msg);
    }

    function showEbchNotificationStatus(EBCHdata) {
        let msg = "Custom notifications are enabled.";
        if (EBCHdata[8] == 0) msg = "Custom notifications are disabled.";
        statusmsg(msg);
    }

    function showEbchPoseStatus(EBCHdata) {
        let msg = "Pose menu is automatically displayed.";
        if (EBCHdata[6] == 0) msg = "Pose menu is not automatically displayed.";
        statusmsg(msg);
    }

    function showEbchUngarbleStatus(EBCHdata) {
        let msg = "All messages are ungarbled.";
        if (EBCHdata[2] == 0) msg = "Messages are not ungarbled.";
        if (EBCHdata[2] == 1) msg = "Messages from white list are ungarbled.";
        statusmsg(msg);
    }

    function showEbchWelcomeStatus(EBCHdata) {
        let msg = "EBCH Welcome message.";
        if (EBCHdata[20] == 0) msg = "No EBCH Welcome message.";
        statusmsg(msg);
    }

    //Gender
    function IsFemale() {
        if ((InventoryGet(Player, "Pronouns")?.Asset.Name == "SheHer") &&
            (InventoryGet(Player, "Pussy")?.Asset.Name != "Penis") &&
            (InventoryGet(Player, "BodyUpper")?.Asset.Name != "FlatSmall") &&
            (InventoryGet(Player, "BodyUpper")?.Asset.Name != "FlatMedium")) {
            return true;
        } else {
            return false;
        }
    }

    function IsMale() {
        if ((InventoryGet(Player, "Pronouns")?.Asset.Name == "HeHim") &&
            (InventoryGet(Player, "Pussy")?.Asset.Name == "Penis") &&
            ((InventoryGet(Player, "BodyUpper")?.Asset.Name == "FlatSmall") ||
                (InventoryGet(Player, "BodyUpper")?.Asset.Name == "FlatMedium"))) {
            return true;
        } else {
            return false;
        }
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

    function GetDeafLevel5() {
        let deafLevel = 5;
        return deafLevel;
    }

    //Locks
    function ExclusivePadlock() {
        setTimeout(function() {
            for (let A = 0; A < Player.Appearance.length; A++)
                if (Player.Appearance[A].Asset.AllowLock == true) {
                    if (((Player.Appearance[A].Property != null) && (Player.Appearance[A].Property.LockedBy == null)) || (Player.Appearance[A].Property == null)) {
                        InventoryLock(Player, Player.Appearance[A], "ExclusivePadlock", Player.MemberNumber, Update = true);
                    }
                }
        }, 2000);
    }

    function IsItemSlotUnlocked(p, slot) {
        return ((InventoryGet(p, slot) == null) ||
            (InventoryGet(p, slot).Property == null) ||
            (InventoryGet(p, slot).Property.LockedBy == null));
    }

    function WearItemIfUnlocked(p, item, slot) {
        if (IsItemSlotUnlocked(p, slot))
            InventoryWear(p, item, slot);
    }

    //LSCG Status
    function showBcLscgStatus(LSCGdata) {
        let msg = "";
        let Activities = "";
        let Collar = "";
        let Chloroform = "";
        let Cursed = "";
        let Drugs = "";
        let Gagchoke = "";
        let Handchoke = "";
        let Hypnosis = "";
        let Leashing = "";
        let Magic = "";
        let Splatter = "";
        let msg1 = "LSCG is disabled.";
        if (LSCGdata.GlobalModule.enabled) msg1 = "LSCG is enabled.";
        if (LSCGdata.ActivityModule.enabled) Activities = "Activities - ";
        if (LSCGdata.CollarModule.enabled) Collar = "Breathplay (Collar) - ";
        if (LSCGdata.MiscModule.chloroformEnabled) Chloroform = "Chloroform - ";
        if (LSCGdata.CursedItemModule.enabled) Cursed = "Cursed Items - ";
        if (LSCGdata.InjectorModule.enabled) Drugs = "Drugs + Net Gun - ";
        if (LSCGdata.MiscModule.gagChokeEnabled) Gagchoke = "Gag Choking - ";
        if (LSCGdata.MiscModule.handChokeEnabled) Handchoke = "Hand Choking - ";
        if (LSCGdata.HypnoModule.enabled) Hypnosis = "Hypnosis - ";
        if (LSCGdata.HypnoModule.allowSuggestions) Hypnosis = "Hypnosis including Suggestions - ";
        if (LSCGdata.LeashingModule.enabled) Leashing = "Leashing - ";
        if (LSCGdata.MagicModule.enabled) Magic = "Magic - ";
        if (LSCGdata.SplatterModule.enabled) Splatter = "Splatters";
        msg = msg1 + " Features activated when LSCG is enabled: " + Activities + Collar + Chloroform + Cursed + Drugs + Gagchoke + Handchoke + Hypnosis + Leashing + Magic + Splatter;
        statusmsg(msg);
    }

    function showBoopReactionsStatus(LSCGdata) {
        let msg = "No auto-react when booped.";
        if (LSCGdata.BoopsModule.enabled) msg = "Auto-react when booped.";
        statusmsg(msg);
    }

    function showCheckRollsStatus(LSCGdata) {
        let msg = "No display of attacker/defender roll values.";
        if (LSCGdata.GlobalModule.showCheckRolls) msg = "Display of attacker/defender roll values.";
        statusmsg(msg);
    }

    function showCraftingStatus(LSCGdata) {
        let msg = "";
        let msg1 = "Your public craftings are not shared.";
        let msg2 = "Your shared public craftings are not displayed.";
        let msg3 = "Chaotic features are disabled.";
        let msg4 = "Tamperproof features are disabled.";
        if (LSCGdata.GlobalModule.sharePublicCrafting) msg1 = "Your public craftings are shared.";
        if (LSCGdata.GlobalModule.seeSharedCrafts) msg2 = "Your shared public craftings are displayed.";
        if (LSCGdata.ChaoticItemModule.enabled) msg3 = "Chaotic features are enabled.";
        if (LSCGdata.GlobalModule.tamperproofEnabled) msg4 = "Tamperproof features are enabled.";
        msg = msg1 + " " + msg2 + " " + msg3 + " " + msg4;
        statusmsg(msg);
    }

    function showEdgeBlurStatus(LSCGdata) {
        let msg = "No blurring of the screen when you are on edge.";
        if (LSCGdata.GlobalModule.edgeBlur) msg = "Blurring of the screen when you are on edge.";
        statusmsg(msg);
    }

    function showErectionStatus(LSCGdata) {
        let msg = "No private message when you feel an erection under your clothes.";
        if (LSCGdata.GlobalModule.erectionDetection) msg = "Private message when you feel an erection under your clothes.";
        statusmsg(msg);
    }

    function showLipstickStatus(LSCGdata) {
        let msg = "";
        let msg1 = "No lipstick mark on your face or neck when someone kisses you.";
        let msg2 = "Lipstick marks possible when you kiss someone.";
        if (LSCGdata.LipstickModule.enabled) msg1 = "Other people can leave lipstick marks on your face or neck when kissing you.";
        if (LSCGdata.LipstickModule.dry) msg2 = "No lipstick marks when you kiss someone.";
        msg = msg1 + " " + msg2;
        statusmsg(msg);
    }

    function showOpacityStatus(LSCGdata) {
        let msg = "";
        let msg1 = "Effects bypassing opacity are not applied.";
        let msg2 = "Other players can't change the opacity of your wardrobe items.";
        if (LSCGdata.OpacityModule.enabled) msg1 = "Effects bypassing opacity are applied.";
        if (LSCGdata.OpacityModule.preventExternalMod) msg2 = "Other players can change the opacity of your wardrobe items.";
        msg = msg1 + " " + msg2;
        statusmsg(msg);
    }

    function showRemoteStatus(LSCGdata) {
        let msg = "";
        let msg1 = "Remote control enabled for: ";
        let msg2 = "";
        let msg3 = "";
        let msg4 = "";
        if (LSCGdata.CollarModule.remoteAccess) msg2 = "Breathplay - ";
        if (LSCGdata.HypnoModule.remoteAccess) msg3 = "Hypnosis - ";
        if (LSCGdata.MagicModule.remoteAccess) msg4 = "Magic";
        msg = msg1 + msg2 + msg3 + msg4;
        statusmsg(msg);
    }

    function showResizingStatus(LSCGdata) {
        let msg = "LSCG resizing effects will be displayed.";
        if (LSCGdata.GlobalModule.hideResizing) msg = "LSCG resizing effects will not be displayed.";
        statusmsg(msg);
    }

    function showRestrainedSettingsStatus(LSCGdata) {
        let msg = "";
        let msg1 = "LSCG settings can be changed when you are restrained.";
        let msg2 = "Immersive conditions are disabled";
        if (LSCGdata.GlobalModule.blockSettingsWhileRestrained) msg1 = "LSCG settings can't be changed when you are restrained.";
        if (LSCGdata.StateModule.immersive) msg2 = "Immersive conditions are enabled";
        msg = msg1 + " " + msg2;
        statusmsg(msg);
    }

    //MBS Status
    function showGarblingStatus(MBSdata) {
        let msg = "";
        let msg1 = "Alternative garbling disabled.";
        let msg2 = "Reduction of trailing characters with heavy gags is disabled.";
        let msg3 = "Garbling per syllable is disabled.";
        if (MBSdata.AlternativeGarbling) msg1 = "Alternative garbling enabled.";
        if (MBSdata.DropTrailing) msg2 = "Reduction of trailing characters with heavy gags is enabled.";
        if (MBSdata.GarblePerSyllable) msg3 = "Garbling per syllable is enabled.";
        msg = msg1 + " " + msg2 + " " + msg3;
        statusmsg(msg);
    }

    function showLockedMbsStatus(MBSdata) {
        let msg = "You can always change MBS settings, even when you are restrained.";
        if (MBSdata.LockedWhenRestrained) msg = "MBS settings are locked when you are restrained.";
        statusmsg(msg);
    }

    function showLockedWheelStatus(MBSdata) {
        let msg = "Wheel of fortune is locked when you are restrained.";
        if (MBSdata.RollWhenRestrained) msg = "You can always spin a wheel of fortune, even when you are restrained.";
        statusmsg(msg);
    }

    function showMbsChangeStatus(MBSdata) {
        let msg = "New MBS Version changelog is disabled.";
        if (MBSdata.ShowChangelog) msg = "New MBS Version changelog is enabled.";
        statusmsg(msg);
    }

    //Messages
    function hidetoast() {
        ServerShowBeep = function() {}
        ToastManager.dismissAll();
    }

    function infomsg(msg) {
        if (noubccolor) {
            ChatRoomSendLocal("ULTRAbc: " + msg);
        } else {
            ChatRoomSendLocal(
                "<p style='background-color:#5fbd7a'>ULTRAbc: " + msg + "</p>"
            );
        }
    }

    function messageData(data) {
        Clothes = data.clothes;
        Invisible = data.invisible;
        Mlock = data.mlock;
        Naked = data.naked;
        Pet = data.pet;
        Randomize = data.randomize;
        Restrain = data.restrain;
        Solidity = data.solidity;
        Tclothes = data.tclothes;
        Tinvisible = data.tinvisible;
        Tlock = data.tlock;
        Tnaked = data.tnaked;
        Totalrelease = data.totalrelease;
        Tpet = data.tpet;
        Trandomize = data.trandomize;
        Trestrain = data.trestrain;
        Tsolidity = data.tsolidity;
        Ttotalrelease = data.ttotalrelease;
        Tunderwear = data.tunderwear;
        Tunlock = data.tunlock;
        Tuntie = data.tuntie;
        Tvisible = data.visible;
        Underwear = data.underwear;
        Unlock = data.unlock;
        Untie = data.untie;
        Visible = data.visible;
    }

    function publicmsg(msg) {
        ServerSend("ChatRoomChat", {
            Content: "Beep",
            Type: "Action",
            Dictionary: [{
                Tag: "Beep",
                Text: msg
            }]
        });
    }

    function silentMode() {
        if (silent == true) {
            Clothes = "no message";
            Invisible = "no message";
            Mlock = "no message";
            Naked = "no message";
            Pet = "no message";
            Randomize = "no message";
            Restrain = "no message";
            Solidity = "no message";
            Totalrelease = "no message";
            Underwear = "no message";
            Unlock = "no message";
            Untie = "no message";
            Visible = "no message";
            Tclothes = "no message";
            Tinvisible = "no message";
            Tlock = "no message";
            Tnaked = "no message";
            Tpet = "no message";
            Trandomize = "no message";
            Trestrain = "no message";
            Tsolidity = "no message";
            Ttotalrelease = "no message";
            Tunderwear = "no message";
            Tunlock = "no message";
            Tuntie = "no message";
            Tvisible = "no message";
        }
        if (silent == false) {
            if (Clothes == "no message") Clothes = "";
            if (Invisible == "no message") Invisible = "";
            if (Mlock == "no message") Mlock = "";
            if (Naked == "no message") Naked = "";
            if (Pet == "no message") Pet = "";
            if (Randomize == "no message") Randomize = "";
            if (Restrain == "no message") Restrain = "";
            if (Solidity == "no message") Solidity = "";
            if (Totalrelease == "no message") Totalrelease = "";
            if (Underwear == "no message") Underwear = "";
            if (Unlock == "no message") Unlock = "";
            if (Untie == "no message") Untie = "";
            if (Visible == "no message") Visible = "";
            if (Tclothes == "no message") Tclothes = "";
            if (Tinvisible == "no message") Tinvisible = "";
            if (Tlock == "no message") Tlock = "";
            if (Tnaked == "no message") Tnaked = "";
            if (Tpet == "no message") Tpet = "";
            if (Trandomize == "no message") Trandomize = "";
            if (Trestrain == "no message") Trestrain = "";
            if (Tsolidity == "no message") Tsolidity = "";
            if (Ttotalrelease == "no message") Ttotalrelease = "";
            if (Tunderwear == "no message") Tunderwear = "";
            if (Tunlock == "no message") Tunlock = "";
            if (Tuntie == "no message") Tuntie = "";
            if (Tvisible == "no message") Tvisible = "";
        }
    }

    function statusmsg(msg) {
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

    //Poses
    function PoseChangeFocusToGroup(C, Group) {
        /** @type {null | AssetGroup} */
        let G = null;
        if (typeof Group === "string") {
            G = AssetGroupGet(C.AssetFamily, /** @type {AssetGroupName} */ (Group));
            if (!Group) return;
        } else {
            G = Group;
        }
        DialogLeaveFocusItem(false);
        AudioDialogStop();
        const previousGroup = C.FocusGroup;
        C.FocusGroup = /** @type {AssetItemGroup} */ (G);
        if (C.FocusGroup) {
            DialogChangeMode("items", true);
        } else {
            DialogChangeMode("dialog");
        }
    }

    //Preferences 
    function FBCsettings() {
        let gbc = 0;
        let sbc = 0;
        if (Player.FBC != undefined) {
            let str = Player.ExtensionSettings.FBC;
            let d = LZString.decompressFromBase64(str);
            let FBCdata = {};
            let decoded = JSON.parse(d);
            FBCdata = decoded;
            if (FBCdata.antiGarble) {
                gbc = 1;
                Player.RestrictionSettings.NoSpeechGarble = false;
                nogarble = false;
                M_MOANER_saveControls();
            }
            if (FBCdata.autoStruggle) {
                sbc = 1;
                Player.RestrictionSettings.BypassStruggle = false;
                nostruggle = false;
                M_MOANER_saveControls();
            }
        }
        if (gbc == 0) {
            if (nogarble == null || nogarble == undefined) {
                nogarble = false;
                M_MOANER_saveControls();
            }
            if (nogarble == true) {
                Player.RestrictionSettings.NoSpeechGarble = true;
            } else {
                Player.RestrictionSettings.NoSpeechGarble = false;
            }
        }
        if (sbc == 0) {
            if (nostruggle == null || nostruggle == undefined) {
                nostruggle = false;
                M_MOANER_saveControls();
            }
            if (nostruggle == true) {
                Player.RestrictionSettings.BypassStruggle = true;
            } else {
                Player.RestrictionSettings.BypassStruggle = false;
            }
        }
        let spl = 0;
        let LSCG = Player.ExtensionSettings.LSCG;
        if (LSCG) {
            let LSCGdata = JSON.parse(LZString.decompressFromBase64(LSCG));
            if (LSCGdata.SplatterModule.enabled) spl = 1;
        }
        if (spl == 1) {
            M_MOANER_orgasmActive = false;
            M_MOANER_saveControls();
        }
    }

    function UBCsettings() {
        Player.OnlineSharedSettings.UBC = UBCver;
        Player.OnlineSharedSettings.Inmap = false;
	if (Player.OnlineSharedSettings.Tplist == undefined) {
            Player.OnlineSharedSettings.Tplist = [];
        }
        if (Player.OnlineSharedSettings.Ulist == undefined) {
            Player.OnlineSharedSettings.Ulist = [];
        }
        if (noescape == true) {
            Player.OnlineSharedSettings.Unoescape = true;
        } else {
            Player.OnlineSharedSettings.Unoescape = false;
        }
        ServerAccountUpdate.QueueData({
            OnlineSharedSettings: Player.OnlineSharedSettings
        });
        if (npcpunish == true) {
            Player.RestrictionSettings.BypassNPCPunishments = false;
        } else {
            Player.RestrictionSettings.BypassNPCPunishments = true;
        }
    }

    //Responsive Status
    function showResponsiveStatus(RSPdata) {
        let msg = "Responsive is disabled.";
        if (RSPdata.GlobalModule.ResponsiveEnabled) msg = "Responsive is enabled.";
        statusmsg(msg);
    }

    function showBcrResponsesStatus(RSPdata) {
        let msg = "Responses feature is disabled.";
        if (RSPdata.GlobalModule.responsesEnabled) msg = "Responses feature is enabled.";
        statusmsg(msg);
    }

    function showCharacterTalkStatus(RSPdata) {
        let msg = "Character Talk is disabled.";
        if (RSPdata.GlobalModule.CharTalkEnabled) msg = "Character Talk is enabled.";
        statusmsg(msg);
    }

    function showInterceptMessageStatus(RSPdata) {
        let msg = "Responses can't interrupt and send messages.";
        if (RSPdata.GlobalModule.doMessageInterruption) msg = "Responses can interrupt and send messages.";
        statusmsg(msg);
    }

    function showLeaveMessageStatus(RSPdata) {
        let msg = "The message being written is not sent when leashed out of the room.";
        if (RSPdata.GlobalModule.doLeaveMessage) msg = "The message being written is sent when leashed out of the room.";
        statusmsg(msg);
    }

    function showMoansStatus(RSPdata) {
        let msg = "Moans are not added to responses when highly aroused.";
        if (RSPdata.GlobalModule.doAddMoansOnHighArousal) msg = "Moans are added to responses when highly aroused.";
        statusmsg(msg);
    }

    function showNewVersionStatus(RSPdata) {
        let msg = "New Responsive Version feature is disabled.";
        if (RSPdata.GlobalModule.doShowNewVersionMessage) msg = "New Responsive Version feature is enabled.";
        statusmsg(msg);
    }

    function showRulesStatus(RSPdata) {
        let msg = "BCX rules can't prevent message sending.";
        if (RSPdata.GlobalModule.doPreventMessageIfBcxBlock) msg = "BCX rules can prevent message sending.";
        statusmsg(msg);
    }

    //Room Connections
    function IsMapRoom() {
        if ((ChatRoomData.MapData == null) || (ChatRoomData.MapData.Type == null) || (ChatRoomData.MapData.Type == "Never")) {
            return false;
        } else {
            return true;
        }
    }

    function RoomToFriends() {
        CommonSetScreen("Online", "ChatSearch");
        RoomToOut();
        FriendListReturn = {
            Screen: CurrentScreen,
            Module: CurrentModule
        };
        CommonSetScreen("Character", "FriendList");
    }

    function RoomToGame() {
        ServerSend("ChatRoomLeave", "");
        ChatRoomSetLastChatRoom("");
        OnlineGameName = "";
        ChatRoomHideElements();
    }

    function RoomToOut() {
        ChatRoomSetLastChatRoom("");
        document.getElementById("InputChat").style.display = "none";
        document.getElementById("TextAreaChatLog").style.display = "none";
        ChatRoomHideElements();
    }

    function RoomToSearch(club) {
        if (club == "Asylum") {
            ChatRoomSpace = "Asylum";
            ChatSearchLeaveRoom = "AsylumEntrance";
            ChatSearchBackground = "AsylumEntrance";
            ChatCreateBackgroundList = BackgroundsTagAsylum;
            CommonSetScreen("Online", "ChatSearch");
        }
        ChatSelectStartSearch(club);
        RoomToOut();
        ChatSelectStartSearch(club);
        ChatRoomSetLastChatRoom("");
    }

    //Stable
    function StablePonyEnd() {
        gamestable = false;
        M_MOANER_saveControls();
        CommonSetScreen("Room", "Stable");
        CharacterSetCurrent(StableTrainer);
        StableTrainer.Stage = "StableTrainingRunOut";
        StablePlayerTrainingLessons = 6;
    }

    //Talking
    function IsBcxWhisperAllowed(target) {
        let wh1 = 0;
        let lovers = [];
        let bcxlist = [];
        let ownershipMember = (Player.Ownership && !Player.Ownership.Name.startsWith("NPC"))
            ? [Player.Ownership.MemberNumber]
            : [];
        for (let n = 0; n < Player.Lovership.length; n++) {
            if (!Player.Lovership[n].Name.startsWith("NPC")) {
                lovers.push(Player.Lovership[n].MemberNumber);
            }
        }
        let str = Player.ExtensionSettings.BCX;
        if (str && /^[0-9]+:/.test(str)) {
            const parts = str.split(":");
            const saveVersion = Number.parseInt(parts[0], 10);
            if (saveVersion === 2 && parts.length === 3) {
                let decoded = JSON.parse(LZString.decompressFromBase64(parts[1]));
                let rules = decoded?.conditions?.rules?.conditions?.speech_restrict_whisper_send;
                if (rules && rules.active) {
                    wh1 = 1;
                    let wh1data = rules.data.customData.minimumPermittedRole;
                    switch (wh1data) {
                        case 1:
                            bcxlist = ownershipMember;
                            break;
                        case 2:
                            bcxlist = (decoded.owners || []).concat(ownershipMember);
                            break;
                        case 3:
                            bcxlist = lovers.concat((decoded.owners || []).concat(ownershipMember));
                            break;
                        case 4:
                            bcxlist = (decoded.mistresses || []).concat(lovers.concat((decoded.owners || []).concat(ownershipMember)));
                            break;
                        case 5:
                            bcxlist = (Player.WhiteList || []).concat((decoded.mistresses || []).concat(lovers.concat((decoded.owners || []).concat(ownershipMember))));
                            break;
                        case 6:
                            bcxlist = (Player.FriendList || []).concat((Player.WhiteList || []).concat((decoded.mistresses || []).concat(lovers.concat((decoded.owners || []).concat(ownershipMember)))));
                            break;
                        case 7:
                            wh1 = 0;
                            break;
                    }
                    if (ChatRoomTargetMemberNumber === Player.Ownership?.MemberNumber) {
                        wh1 = 0;
                    } else if (wh1data > 1 && wh1data < 7 && bcxlist.includes(ChatRoomTargetMemberNumber)) {
                        wh1 = 0;
                    }
                }
            }
        }
        return wh1 === 0;
    }

   function IsDollTalk(text) {
        const segmenter = new Intl.Segmenter([], { granularity: 'word' });
        const words = [...segmenter.segment(text)].filter(s => s.isWordLike).map(s => s.segment);
        if (words.length > 5) return false;
        for (const word of words) {
            if (word.length > 6) return false;
        }
        return true;
    }

    function GarbleRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function GarbleTalk(text, garbleWords) {
        const punctuation = ",.!?";
        let message = text;
        let isWhisper = false;
        let target = "";
        if ((text.startsWith("/whisper")) || (text.startsWith("/murmur"))) {
            const [, tgt, ...parts] = text.split(" ");
            target = tgt;
            message = parts.join(" ");
            isWhisper = true;
        }
        if (!message) return text.trim();
        let newWords = [];
        for (const word of message.split(" ")) {
            let baseWord = word;
            let wordPunctuation = "";
            while (baseWord && punctuation.includes(baseWord[baseWord.length - 1])) {
                wordPunctuation = baseWord[baseWord.length - 1] + wordPunctuation;
                baseWord = baseWord.slice(0, -1);
            }
            const garbleWord = garbleWords[GarbleRandom(0, garbleWords.length - 1)];
            if (typeof ahybrid !== "undefined" && ahybrid) {
                newWords.push(garbleWord + word + wordPunctuation);
            } else {
                newWords.push(garbleWord + wordPunctuation);
            }
        }
        let newMessage = newWords.join(" ");
        if (isWhisper) {
            if (text.startsWith("/whisper")) newMessage = `/whisper ${target} ${newMessage}`;
            if (text.startsWith("/murmur")) newMessage = `/murmur ${target} ${newMessage}`;
        }
        return newMessage.trim();
    }

    function RealGarblingLevel() {
        let bl = 0, nbl = 0, notalk = 0, ntt = 0;
        let obl = Player.UBC.ubcSettings.bl;
        let ogl = Player.UBC.ubcSettings.gaglevel;
        let ont = Player.UBC.ubcSettings.notalk;
        ElementValue("InputChat", "");
        let LSCG = Player.ExtensionSettings.LSCG;
        if (LSCG) {
            let LSCGdata = JSON.parse(LZString.decompressFromBase64(LSCG));
            let states = LSCGdata.StateModule.states || [];
            let neck = InventoryGet(Player, "ItemNeck");
            if (neck && LSCGdata.CollarModule.chokeLevel == 4) ntt = 1;
            if (states.some(s => ["asleep", "frozen", "gagged", "hypnotized"].includes(s.type) && s.active)) ntt = 1;
        }
        let mouthSlots = ["ItemMouth", "ItemMouth2", "ItemMouth3"];
        nbl = mouthSlots.some(slot => {
            let item = InventoryGet(Player, slot);
            return item && item.Asset.Name === "RegressedMilk";
        }) ? 1 : 0;
        if (nbl == 1) {
            BabyTalkOn = true;
            GagTalkOn = false;
            if (Player.UBC.ubcSettings.rglsync == true) {
                bl = 1;
                gl = 11;
                Player.UBC.ubcSettings.bl = 1;
                Player.UBC.ubcSettings.gaglevel = 11;
            } else {
                bl = 0;
                gl = ogl;
                Player.UBC.ubcSettings.bl = obl;
                Player.UBC.ubcSettings.gaglevel = ogl;
            }
            updateNoTalk(ntt, ont);
            if (window.CurrentScreen == "ChatRoom") {
                let msg = "You are now in real baby talk mode.";
		if (ntt == 1) msg = msg + " " + umsg8;
                infomsg(msg);
            }
        } else {
            BabyTalkOn = false;
            GagTalkOn = true;
            let ngl = SpeechTransformGagGarbleIntensity(Player);
            mgl = ngl;
            let MBS = Player.ExtensionSettings.MBS;
            if (MBS) {
                let MBSdata = JSON.parse(LZString.decompressFromUTF16(MBS));
                if (MBSdata.AlternativeGarbling && ChatRoomTargetMemberNumber == null) {
                    ngl = 0;
                    mgl = SpeechTransformGagGarbleIntensity(Player);
                }
            }
            if (ngl < 0) ngl = 0;
            if (mgl < 0) mgl = 0;
            if (LSCG) {
                let LSCGdata = JSON.parse(LZString.decompressFromBase64(LSCG));
                let neck = InventoryGet(Player, "ItemNeck");
                if (neck && LSCGdata.CollarModule.chokeLevel > 1) {
                    ngl += LSCGdata.CollarModule.chokeLevel * 2;
                    mgl = ngl;
                }
            }
            if (mgl == 0) {
                bl = 0;
                gl = 0;
                GagTalkOn = false;
                Player.UBC.ubcSettings.bl = 0;
                Player.UBC.ubcSettings.gaglevel = 0;
                updateNoTalk(ntt, ont);
                M_MOANER_saveControls();
                if (window.CurrentScreen == "ChatRoom") {
                    let msg = "You are now in normal talk mode."; 
		    if (ntt == 1) msg = msg + " " + umsg8;
                    infomsg(msg);      
                }
            } else {
                if (Player.UBC.ubcSettings.rglsync == true) {
                    bl = 0;
                    gl = mgl;
                    GagTalkOn = true;
                    Player.UBC.ubcSettings.bl = 0;
                    Player.UBC.ubcSettings.gaglevel = mgl;
                    if (mgl > 10) Player.UBC.ubcSettings.gaglevel = 10;
                } else {
                    bl = 0;
                    gl = ogl;
                    Player.UBC.ubcSettings.bl = 0;
                    Player.UBC.ubcSettings.gaglevel = ogl;
                }
                updateNoTalk(ntt, ont);
                M_MOANER_saveControls();
                if (window.CurrentScreen == "ChatRoom") {
                    let msg = "You are now in real gag talk mode. Your current garbling level is " + ngl + ".";
		    if (ntt == 1) msg = msg + " " + umsg8;
                    infomsg(msg);
                }
            }
        }
    }

    function updateNoTalk(ntt, ont) {
        if (ntt == 1) {
            if (Player.UBC.ubcSettings.rglsync == true) {
                notalk = ntt;
                Player.UBC.ubcSettings.notalk = ntt;
            } else {
                notalk = ont;
                Player.UBC.ubcSettings.notalk = ont;
            }
        } else {
            notalk = 0;
            Player.UBC.ubcSettings.notalk = 0;
        }
    }

    //Targets
    function getNickname(target) {
        return CharacterNickname(target);
    }

    function getPronoun1(target) {
        let name = InventoryGet(target, "Pronouns").Asset.Name;
        tgpr1 = "They";
        if (name == "HeHim") tgpr1 = "He";
        if (name == "SheHer") tgpr1 = "She";
        return tgpr1;
    }

    function getPronoun2(target) {
        let name = InventoryGet(target, "Pronouns").Asset.Name;
        tgpr2 = "them";
        if (name == "HeHim") tgpr2 = "him";
        if (name == "SheHer") tgpr2 = "her";
        return tgpr2;
    }

    function getPronoun3(target) {
        let name = InventoryGet(target, "Pronouns").Asset.Name;
        tgpr3 = "their";
        if (name == "HeHim") tgpr3 = "his";
        if (name == "SheHer") tgpr3 = "her";
        return tgpr3;
    }

    function getPronoun4(target) {
        let name = InventoryGet(target, "Pronouns").Asset.Name;
        tgpr4 = "they";
        if (name == "HeHim") tgpr4 = "he";
        if (name == "SheHer") tgpr4 = "she";
        return tgpr4;
    }

    function IsTargetProtected(target) {
        if ((target.OnlineSharedSettings.Uwall) && ((target.OnlineSharedSettings.Ulist == undefined) || (!(target.OnlineSharedSettings.Ulist.includes(Player.MemberNumber))))) {
            return true;
        } else {
            return false;
        }
    }

    function TargetSearch(value) {
        if (!value) return;
        return ChatRoomCharacter.find((Character) => {
            return (
                Character.MemberNumber == value ||
                Character.Name.toLowerCase() === value ||
                Character.Nickname?.toLowerCase() === value
            );
        });
    }

    //Themed Status   
    function showBCThemedStatus(THMdata) {
        let msg = "ThemedBC is disabled.";
        if (THMdata.GlobalModule.themedEnabled) msg = "Themed is enabled.";
        statusmsg(msg);
    }

    function showCharacterAbsenceStatus(THMdata) {
        let msg = "Absence's indicator is disabled.";
        if (THMdata.GlobalModule.doIndicateCharacterAbsence) msg = "Absence's indicator is enabled.";
        statusmsg(msg);
    }

    function showAdvancedColoringStatus(THMdata) {
        let msg = "Advanced coloring is disabled";
        if (THMdata.GlobalModule.doUseAdvancedColoring) msg = "Advanced coloring is enabled.";
        statusmsg(msg);
    }

    function showChatStatus(THMdata) {
        let msg = "The chat uses the default BC colors.";
        if (THMdata.IntegrationModule.chat) msg = "The chat uses colors selected in Themed.";
        statusmsg(msg);
    }

    function showFlatColorStatus(THMdata) {
        let msg = "Coloring sheet enabled in settings.";
        if (THMdata.GlobalModule.doUseFlatColor) msg = "Flat color enabled in settings.";
        statusmsg(msg);
    }

    function showFriendListStatus(THMdata) {
        let msg = "";
        let msg1 = "The friend list uses the default BC colors.";
        let msg2 = "No blur effect on friend list background.";
        if (THMdata.IntegrationModule.friendList) msg1 = "The friend list uses colors selected in Themed.";
        if (THMdata.IntegrationModule.friendListBlur) msg2 = "Blur effect on friend list background.";
        msg = msg1 + " " + msg2;
        statusmsg(msg);
    }

    function showGuiOverhaulStatus(THMdata) {
        let msg = "The interface uses the default BC colors.";
        if (THMdata.GlobalModule.doVanillaGuiOverhaul) msg = "The interface uses colors selected in Themed.";
        statusmsg(msg);
    }

    function showInputZonesStatus(THMdata) {
        let msg = "The input zones use the default BC colors.";
        if (THMdata.IntegrationModule.inputs) msg = "The input zones use colors selected in Themed.";
        statusmsg(msg);
    }

    function showLocalTimeStatus(THMdata) {
        let msg = "The time is displayed according your system settings.";
        if (THMdata.GlobalModule.doShowLocaleTime) msg = "The time is displayed according your locale settings.";
        statusmsg(msg);
    }

    function showLoginStatus(THMdata) {
        let msg = "";
        let msg1 = "The credits are displayed on login screen.";
        let msg2 = "The npc characters are displayed on login screen.";
        if (ThemedLocalData.loginOptions.hideCredits) msg1 = "The credits are not displayed on login screen.";
        if (ThemedLocalData.loginOptions.hideDummy) msg2 = "The npc characters are not displayed on login screen.";
        msg = msg1 + " " + msg2;
        statusmsg(msg);
    }

    function showMiscDetailsStatus(THMdata) {
        let msg = "";
        let msg1 = "Scrollbar uses the default BC colors.";
        let msg2 = "Text selection is not colored.";
        if (THMdata.IntegrationModule.scrollbar) msg1 = "Scrollbar uses colors selected in Themed.";
        if (THMdata.IntegrationModule.selection) msg2 = "Text selection is colored.";
        msg = msg1 + " " + msg2;
        statusmsg(msg);
    }

    function showThemedVersionStatus(THMdata) {
        let msg = "New Themed Version feature is disabled.";
        if (THMdata.GlobalModule.doShowNewVersionMessage) msg = "New Themed Version feature is enabled.";
        statusmsg(msg);
    }

    //Traps
    function BondageBenchTrap() {
        let Target = "";
        let Item = "";
        CharacterNaked(Player);
        WearItemIfUnlocked(Player, "BondageBench", "ItemDevices");
        if (IsItemSlotUnlocked(Player, "ItemPelvis") || (magictoys == true)) {
            WearItemIfUnlocked(Player, "VibratingLatexPanties", "ItemVulva");
        }
        WearItemIfUnlocked(Player, "SleepSac", "ItemArms");
        WearItemIfUnlocked(Player, "HeavyDutyEarPlugs", "ItemEars");
        WearItemIfUnlocked(Player, "FullBlindfold", "ItemHead");
        WearItemIfUnlocked(Player, "DeepthroatGag", "ItemMouth");
        Target = "ItemDevices";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "BondageBench") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                typed: 4,
            }, {
                push: true,
                refresh: true,
            });
        }
        Target = "ItemVulva";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "VibratingLatexPanties") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                vibrating: 9,
            }, {
                push: true,
                refresh: true,
            });
        }
        ExclusivePadlock();
        CharacterRefresh(Player);
        ChatRoomCharacterUpdate(Player);
    }

    function CoffinTrap() {
        let Target = "";
        let Item = "";
        CharacterNaked(Player);
        WearItemIfUnlocked(Player, "LatexPostureCollar", "ItemMouth2");
        WearItemIfUnlocked(Player, "HeavyDutyEarPlugs", "ItemEars");
        WearItemIfUnlocked(Player, "StuddedBlindfold", "ItemHead");
        WearItemIfUnlocked(Player, "BalletWedges", "ItemBoots");
        if (IsItemSlotUnlocked(Player, "ItemPelvis") || (magictoys == true)) {
            WearItemIfUnlocked(Player, "PenisDildo", "ItemVulva");
            WearItemIfUnlocked(Player, "EggVibePlugXXL", "ItemButt");
        }
        WearItemIfUnlocked(Player, "ShinyLegBinder", "ItemLegs");
        WearItemIfUnlocked(Player, "ShinyStraitjacket", "ItemArms");
        WearItemIfUnlocked(Player, "Coffin", "ItemDevices");
        Target = "ItemArms";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "ShinyStraitjacket") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                typed: 2,
            }, {
                push: true,
                refresh: true,
            });
        }
        Target = "ItemLegs";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "ShinyLegBinder") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                typed: 3,
            }, {
                push: true,
                refresh: true,
            });
        }
        Target = "ItemButt";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "EggVibePlugXXL") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                vibrating: 9,
            }, {
                push: true,
                refresh: true,
            });
        }
        ExclusivePadlock();
        CharacterRefresh(Player);
        ChatRoomCharacterUpdate(Player);
    }

    function DisplayFrameTrap() {
        let Target = "";
        let Item = "";
        CharacterNaked(Player);
        WearItemIfUnlocked(Player, "PantyStuffing", "ItemMouth");
        WearItemIfUnlocked(Player, "HarnessBallGag1", "ItemMouth2");
        WearItemIfUnlocked(Player, "HeavyDutyEarPlugs", "ItemEars");
        WearItemIfUnlocked(Player, "LewdBlindfold", "ItemHead");
        if (IsItemSlotUnlocked(Player, "ItemPelvis") || (magictoys == true)) {
            WearItemIfUnlocked(Player, "WiredEgg", "ItemVulva");
        }
        WearItemIfUnlocked(Player, "DuctTape", "ItemHands");
        WearItemIfUnlocked(Player, "TheDisplayFrame", "ItemDevices");
        Target = "ItemMouth2";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "HarnessBallGag1") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                typed: 1,
            }, {
                push: true,
                refresh: true,
            });
        }
        Target = "ItemVulva";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "WiredEgg") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                vibrating: 9,
            }, {
                push: true,
                refresh: true,
            });
        }
        ExclusivePadlock();
        CharacterRefresh(Player);
        ChatRoomCharacterUpdate(Player);
    }

    function KennelTrap() {
        let Target = "";
        let Item = "";
        CharacterNaked(Player);
        WearItemIfUnlocked(Player, "ShinyPetSuit", "ItemArms");
        if (IsItemSlotUnlocked(Player, "ItemBreast") || (magictoys == true)) {
            WearItemIfUnlocked(Player, "VibeNippleClamp", "ItemNipples");
        }
        WearItemIfUnlocked(Player, "LeatherHarness", "ItemTorso");
        if (IsItemSlotUnlocked(Player, "ItemPelvis") || (magictoys == true)) {
            WearItemIfUnlocked(Player, "ClitoralStimulator", "ItemVulva");
        }
        WearItemIfUnlocked(Player, "HeavyDutyEarPlugs", "ItemEars");
        WearItemIfUnlocked(Player, "DildoPlugGag", "ItemMouth");
        WearItemIfUnlocked(Player, "LeatherSlimMaskOpenMouth", "ItemHead");
        WearItemIfUnlocked(Player, "Kennel", "ItemDevices");
        Target = "ItemNipples";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "VibeNippleClamp") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                vibrating: 9,
            }, {
                push: true,
                refresh: true,
            });
        }
        Target = "ItemVulva";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "ClitoralStimulator") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                vibrating: 9,
            }, {
                push: true,
                refresh: true,
            });
        }
        Target = "ItemMouth";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "DildoPlugGag") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                typed: 1,
            }, {
                push: true,
                refresh: true,
            });
        }
        Target = "ItemDevices";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "Kennel") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                d: 1,
                p: 1,
            }, {
                push: true,
                refresh: true,
            });
        }
        ExclusivePadlock();
        CharacterRefresh(Player);
        ChatRoomCharacterUpdate(Player);
    }

    function LockerTrap() {
        let Target = "";
        let Item = "";
        CharacterNaked(Player);
        WearItemIfUnlocked(Player, "SockStuffing", "ItemMouth");
        WearItemIfUnlocked(Player, "PantiesMask", "ItemMouth2");
        WearItemIfUnlocked(Player, "ShoeGag", "ItemMouth3");
        WearItemIfUnlocked(Player, "HeavyDutyEarPlugs", "ItemEars");
        WearItemIfUnlocked(Player, "Pantyhose", "ItemHead");
        WearItemIfUnlocked(Player, "TickleBra", "ItemBreast");
        WearItemIfUnlocked(Player, "ToeTie", "ItemBoots");
        WearItemIfUnlocked(Player, "HempRope", "ItemFeet");
        WearItemIfUnlocked(Player, "HempRope", "ItemLegs");
        WearItemIfUnlocked(Player, "HempRope", "ItemPelvis");
        WearItemIfUnlocked(Player, "DuctTape", "ItemHands");
        WearItemIfUnlocked(Player, "PantyhoseBodyOpen", "ItemArms");
        WearItemIfUnlocked(Player, "Locker", "ItemDevices");
        Target = "ItemBreast";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "TickleBra") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                vibrating: 9,
            }, {
                push: true,
                refresh: true,
            });
        }
        Target = "ItemDevices";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "Locker") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                typed: 1,
            }, {
                push: true,
                refresh: true,
            });
            Item.Property.Opacity = 0.66;
        }
        ExclusivePadlock();
        CharacterRefresh(Player);
        ChatRoomCharacterUpdate(Player);
    }

    function TrolleyTrap() {
        let Target = "";
        let Item = "";
        CharacterNaked(Player);
        WearItemIfUnlocked(Player, "QualityHarnessGag", "ItemMouth3");
        WearItemIfUnlocked(Player, "HeavyDutyEarPlugs", "ItemEars");
        WearItemIfUnlocked(Player, "LeatherBlindfold", "ItemHead");
        WearItemIfUnlocked(Player, "LeatherToeCuffs", "ItemBoots");
        if (IsItemSlotUnlocked(Player, "ItemPelvis") || (magictoys == true)) {
            WearItemIfUnlocked(Player, "PenisDildo", "ItemVulva");
            WearItemIfUnlocked(Player, "EggVibePlugXXL", "ItemButt");
        }
        WearItemIfUnlocked(Player, "PolishedChastityBelt", "ItemPelvis");
        WearItemIfUnlocked(Player, "DuctTape", "ItemHands");
        WearItemIfUnlocked(Player, "ShinyLegBinder", "ItemLegs");
        WearItemIfUnlocked(Player, "ShinyStraitjacket", "ItemArms");
        WearItemIfUnlocked(Player, "Trolley", "ItemDevices");
        Target = "ItemMouth3";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "QualityHarnessGag") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                typed: 1,
            }, {
                push: true,
                refresh: true,
            });
        }
        Target = "ItemArms";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "ShinyStraitjacket") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                typed: 1,
            }, {
                push: true,
                refresh: true,
            });
        }
        Target = "ItemButt";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "EggVibePlugXXL") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                vibrating: 9,
            }, {
                push: true,
                refresh: true,
            });
        }
        Target = "ItemDevices";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "Trolley") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                typed: 1,
            }, {
                push: true,
                refresh: true,
            });
        }
        ExclusivePadlock();
        CharacterRefresh(Player);
        ChatRoomCharacterUpdate(Player);
    }

    function WoodenBoxTrap() {
        let Target = "";
        let Item = "";
        CharacterNaked(Player);
        WearItemIfUnlocked(Player, "PantyStuffing", "ItemMouth");
        WearItemIfUnlocked(Player, "ClothGag", "ItemMouth2");
        WearItemIfUnlocked(Player, "HeavyDutyEarPlugs", "ItemEars");
        WearItemIfUnlocked(Player, "ClothBlindfold", "ItemHead");
        if (IsItemSlotUnlocked(Player, "ItemBreast") || (magictoys == true)) {
            WearItemIfUnlocked(Player, "TapedVibeEggs", "ItemNipples");
        }
        WearItemIfUnlocked(Player, "ToeTie", "ItemBoots");
        WearItemIfUnlocked(Player, "HempRope", "ItemFeet");
        WearItemIfUnlocked(Player, "HempRope", "ItemLegs");
        WearItemIfUnlocked(Player, "HempRope", "ItemPelvis");
        if (IsItemSlotUnlocked(Player, "ItemPelvis") || (magictoys == true)) {
            WearItemIfUnlocked(Player, "WiredEgg", "ItemVulva");
        }
        WearItemIfUnlocked(Player, "DuctTape", "ItemHands");
        WearItemIfUnlocked(Player, "HempRope", "ItemArms");
        WearItemIfUnlocked(Player, "WoodenBox", "ItemDevices");
        Target = "ItemArms";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "HempRope") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                typed: 1,
            }, {
                push: true,
                refresh: true,
            });
        }
        Target = "ItemNipples";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "TapedVibeEggs") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                vibrating: 9,
            }, {
                push: true,
                refresh: true,
            });
        }
        Target = "ItemVulva";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "WiredEgg") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                vibrating: 9,
            }, {
                push: true,
                refresh: true,
            });
        }
        Target = "ItemDevices";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "WoodenBox") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                opacity: 0.66,
            }, {
                push: true,
                refresh: true,
            });
        }
        ExclusivePadlock();
        CharacterRefresh(Player);
        ChatRoomCharacterUpdate(Player);
    }

    function XCrossTrap() {
        let Target = "";
        let Item = "";
        CharacterNaked(Player);
        WearItemIfUnlocked(Player, "LeatherDeluxeCuffs", "ItemArms");
        WearItemIfUnlocked(Player, "LeatherDeluxeAnkleCuffs", "ItemFeet");
        WearItemIfUnlocked(Player, "X-Cross", "ItemDevices");
        WearItemIfUnlocked(Player, "PaddedLeatherMittens", "ItemHands");
        if (IsItemSlotUnlocked(Player, "ItemBreast") || (magictoys == true)) {
            WearItemIfUnlocked(Player, "ChainClamp", "ItemNipples");
        }
        if (IsItemSlotUnlocked(Player, "ItemPelvis") || (magictoys == true)) {
            WearItemIfUnlocked(Player, "HempRopeBelt", "ItemVulva");
        }
        WearItemIfUnlocked(Player, "HarnessBallGag1", "ItemMouth");
        WearItemIfUnlocked(Player, "HeavyDutyEarPlugs", "ItemEars");
        WearItemIfUnlocked(Player, "PaddedBlindfold", "ItemHead");
        Target = "ItemVulva";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "HempRopeBelt") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                vibrating: 9,
            }, {
                push: true,
                refresh: true,
            });
        }
        ExclusivePadlock();
        CharacterRefresh(Player);
        ChatRoomCharacterUpdate(Player);
    }

    //Unrestrict
    function softUnrestrict() {
        unrestrict = 1;
        InventoryGroupIsBlocked = function(C, GroupName) {
            return false;
        }
        Player.GameplaySettings.BlindDisableExamine = false;
        Asset.forEach(e => {
            if (e.Value < 0) e.Value = 1;
        });
        InventoryAdd(Player, "BountySuitcase", "ItemMisc");
        InventoryAdd(Player, "BountySuitcaseEmpty", "ItemMisc");
        InventoryAdd(Player, "ClubSlaveCollar", "ItemNeck");
        InventoryAdd(Player, "FourLimbsShackles", "ItemArms");
        InventoryAdd(Player, "MilkCan", "ItemDevices");
        InventoryAdd(Player, "SlaveCollar", "ItemNeck");
        InventoryAdd(Player, "WaterCell", "ItemDevices");
        InventoryAdd(Player, "WoodenMaidTray", "ItemMisc");
        InventoryAdd(Player, "WoodenMaidTrayFull", "ItemMisc");
        InventoryAdd(Player, "WoodenPaddle", "ItemMisc");
        Player.Inventory.forEach(item => item.Asset.Enable = true);
    }

    function totalUnrestrict() {
        softUnrestrict();
        unrestrict = 2;
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
        DialogHasKey = function(C, Item) {
            if (C.IsPlayer()) {
                return true;
            } else {
                if (C.OnlineSharedSettings.UBC == undefined) {
                    return false;
                } else {
                    if (C.OnlineSharedSettings.Uwall) {
                        if (C.OnlineSharedSettings.Ulist == undefined) {
                            return false;
                        } else {
                            if (C.OnlineSharedSettings.Ulist.includes(Player.MemberNumber)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return true;
                    }
                }
            }
        }
        StruggleLockPickProgressStart = function(C, Item) {
            InventoryUnlock(CurrentCharacter, CurrentCharacter.FocusGroup.Name);
            ChatRoomCharacterItemUpdate(CurrentCharacter, CurrentCharacter.FocusGroup.Name);
            DialogLeave();
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

    //Vision
    function BlurEffect() {
        let effect = Player.UBC.ubcSettings.blureffect * 1;
        let BlurLevel = 0;
        if (effect == 1) BlurLevel = 3;
        if (effect == 2) BlurLevel = 8;
        if (effect == 3) BlurLevel = 20;
        if (effect == 4) BlurLevel = 50;
        MainCanvas.filter = `blur(${BlurLevel}px)`;
    }

    function DrawHexToTints(color) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        color = color.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
            a: tintlevel
        } : {
            r: 0,
            g: 0,
            b: 0,
            a: 0
        };
    }

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

    function tintMbsColors() {
        if (typeof mbs !== 'undefined' && mbs.API_VERSION.major === 1 && mbs.API_VERSION.minor >= 3) {
            if (Player.Themed != undefined) {
                if (Player.Themed.IntegrationModule.MBS == true) tintMbsColors1();
                if (Player.Themed.IntegrationModule.MBS == false) tintMbsColors2();
            } else {
                tintMbsColors2();
            }
        }
    }

    function tintMbsColors1() {
        return mbs.css.setStyle({
            backgroundColor: tintcolor,
            buttonColor: Player.Themed.ColorsModule.base.element,
            buttonHoverColor: Player.Themed.ColorsModule.base.elementHover,
            borderColor: Player.Themed.ColorsModule.base.accent,
            tooltipColor: Player.Themed.ColorsModule.base.elementHint,
            textColor: Player.Themed.ColorsModule.base.text
        });
    }

    function tintMbsColors2() {
        return mbs.css.setStyle({
            backgroundColor: tintcolor,
            buttonColor: mbs.css.DEFAULT_STYLE.buttonColor,
            buttonHoverColor: mbs.css.DEFAULT_STYLE.buttonHoverColor,
            borderColor: mbs.css.DEFAULT_STYLE.borderColor,
            tooltipColor: mbs.css.DEFAULT_STYLE.tooltipColor,
            textColor: mbs.css.DEFAULT_STYLE.textColor
        });
    }

    function TintsEffect() {
        if ((tintlevel != 0) && (tintnever == false)) {
            let a1 = "";
            let tints = DrawHexToTints(tintcolor);
            let r = tints.r;
            let g = tints.g;
            let b = tints.b;
            let a = tints.a;
            if (a == 0) a1 = 0;
            if (a == 1) a1 = 0.2;
            if (a == 2) a1 = 0.35;
            if (a == 3) a1 = 0.5;
            DrawRect(0, 0, 2000, 1000, `rgba(${r},${g},${b},${a1})`);
        }
    }

    function untintMbsColors() {
        if (typeof mbs !== 'undefined' && mbs.API_VERSION.major === 1 && mbs.API_VERSION.minor >= 3) {
            if (Player.Themed != undefined) {
                if (Player.Themed.IntegrationModule.MBS == true) untintMbsColors1();
                if (Player.Themed.IntegrationModule.MBS == false) untintMbsColors2();
            } else {
                untintMbsColors2();
            }
        }
    }

    function untintMbsColors1() {
        return mbs.css.setStyle({
            backgroundColor: Player.Themed.ColorsModule.base.main,
            buttonColor: Player.Themed.ColorsModule.base.element,
            buttonHoverColor: Player.Themed.ColorsModule.base.elementHover,
            borderColor: Player.Themed.ColorsModule.base.accent,
            tooltipColor: Player.Themed.ColorsModule.base.elementHint,
            textColor: Player.Themed.ColorsModule.base.text
        });
    }

    function untintMbsColors2() {
        return mbs.css.setStyle({
            backgroundColor: mbs.css.DEFAULT_STYLE.backgroundColor,
            buttonColor: mbs.css.DEFAULT_STYLE.buttonColor,
            buttonHoverColor: mbs.css.DEFAULT_STYLE.buttonHoverColor,
            borderColor: mbs.css.DEFAULT_STYLE.borderColor,
            tooltipColor: mbs.css.DEFAULT_STYLE.tooltipColor,
            textColor: mbs.css.DEFAULT_STYLE.textColor
        });
    }

    //WCE Status 
    function showAnimationStatus(WCEdata) {
        let msg = "Animation Engine disabled.";
        if (WCEdata.animationEngine) msg = "Animation Engine enabled.";
        statusmsg(msg);
    }

    function showAntiCheatStatus(WCEdata) {
        let msg = "";
        let msg1 = "Anti-Cheat disabled.";
        let msg2 = "No automatic blacklist for detected cheaters.";
        let msg3 = "Uwall disabled.";
        if (WCEdata.itemAntiCheat) msg1 = "Anti-Cheat enabled.";
        if (WCEdata.antiCheatBlackList) msg2 = "Automatic blacklist for detected cheaters.";
        if (WCEdata.uwall) msg3 = "Uwall enabled.";
        msg = msg1 + " " + msg2 + " " + msg3;
        statusmsg(msg);
    }

    function showArousalStatus(WCEdata) {
        let msg = "";
        let msg1 = "No alternate arousal system.";
        let msg2 = "No numeric arousal meter.";
        if (WCEdata.alternateArousal) msg1 = "Alternate arousal enabled.";
        if (WCEdata.numericArousalMeter) msg2 = "Numeric arousal meter.";
        msg = msg1 + " " + msg2;
        statusmsg(msg);
    }

    function showCheatStatus(WCEdata) {
        let msg = "";
        let msg1 = "No help for lockpicking.";
        let msg2 = "No automatic struggle.";
        let msg3 = "No bypassing of BCX beep restrictions.";
        if (WCEdata.lockpick) msg1 = "Help for lockpicking based on skills.";
        if (WCEdata.autoStruggle) msg2 = "Automatic progress when struggling.";
        if (WCEdata.allowIMBypassBCX) msg3 = "BCX beep restrictions can be bypassed.";
        msg = msg1 + " " + msg2 + " " + msg3;
        statusmsg(msg);
    }

    function showColorStatus(WCEdata) {
        let msg = "";
        let msg1 = "No copy color option.";
        let msg2 = "No improved colors in chat.";
        if (WCEdata.copyColor) msg1 = "Copy color option enabled.";
        if (WCEdata.chatColors) msg2 = "Improved colors in chat.";
        msg = msg1 + " " + msg2;
        statusmsg(msg);
    }

    function showEmbeddingStatus(WCEdata) {
        let msg = "No clickable links and image embeds.";
        if (WCEdata.augmentChat) msg = "Clickable links and image embeds.";
        statusmsg(msg);
    }

    function showImmersionStatus(WCEdata) {
        let msg = "";
        let msg1 = "No blind without glasses.";
        let msg2 = "No leashing without leashable items.";
        let msg3 = "No hiding of icon for hidden items.";
        if (WCEdata.blindWithoutGlasses) msg1 = "Blind without glasses.";
        if (WCEdata.leashAlways) msg2 = "Leashing also without leashable items.";
        if (WCEdata.hideHiddenItemsIcon) msg3 = "Hiding of icon for hidden items.";
        msg = msg1 + " " + msg2 + " " + msg3;
        statusmsg(msg);
    }

    function showLayeringStatus(WCEdata) {
        let msg = "";
        let msg1 = "No configuration for layer hiding.";
        let msg2 = "No layering menus when bound.";
        let msg3 = "Other players can make layer changes on you.";
        if (WCEdata.layeringHide) msg1 = "Configuration for layer hiding.";
        if (WCEdata.allowLayeringWhileBound) msg2 = "Layering allowed when bound.";
        if (WCEdata.preventLayeringByOthers) msg3 = "Other players can't make layer changes on you.";
        msg = msg1 + " " + msg2 + " " + msg3;
        statusmsg(msg);
    }

    function showMiscStatus(WCEdata) {
        let msg = "";
        let msg1 = "No instant messager.";
        let msg2 = "No saving of profiles.";
        let msg3 = "No sharing of used add-ons.";
        let msg4 = "No synchronisation with connected toys.";
        if (WCEdata.instantMessenger) msg1 = "Instant messenger.";
        if (WCEdata.pastProfiles) msg2 = "Saving of profiles.";
        if (WCEdata.shareAddons) msg3 = "Sharing of used add-ons.";
        if (WCEdata.toySync) msg4 = "Synchronisation with connected toys.";
        msg = msg1 + " " + msg2 + " " + msg3 + " " + msg4;
        statusmsg(msg);
    }

    function showPerformanceStatus(WCEdata) {
        let msg = "";
        let msg1 = "No automatic clearing of drawing cache.";
        let msg2 = "No drawing cache button.";
        let msg3 = "Discreet mode disabled.";
        if (WCEdata.automateCacheClear) msg1 = "Automatic clearing of drawing cache.";
        if (WCEdata.manualCacheClear) msg2 = "Drawing cache button.";
        if (WCEdata.discreetMode) msg3 = "Discreet mode enabled.";
        msg = msg1 + " " + msg2 + " " + msg3;
        statusmsg(msg);
    }

    function showWardrobeStatus(WCEdata) {
        let msg = "";
        let msg1 = "No extended wardrobe.";
        let msg2 = "No local wardrobe.";
        let msg3 = "No automatic preview.";
        let msg4 = "No confirmation when saving outfits.";
        if (WCEdata.extendedWardrobe) msg1 = "Extended wardrobe.";
        if (WCEdata.localWardrobe) msg2 = "Local wardrobe.";
        if (WCEdata.privateWardrobe) msg3 = "Automatic preview.";
        if (WCEdata.confirmWardrobeSave) msg4 = "Confirmation when saving outfits";
        msg = msg1 + " " + msg2 + " " + msg3 + " " + msg4;
        statusmsg(msg);
    }

    function showWceTalkingStatus(WCEdata) {
        let msg = "";
        let msg1 = "Anti-garble system disabled.";
        let msg2 = "Anti-deafen system disabled.";
        let msg3 = "Alternative speech stutter disabled.";
        if (WCEdata.antiGarble) msg1 = "Anti-garble system enabled.";
        if (WCEdata.antiDeaf) msg2 = "Anti-deafen system enabled.";
        if (WCEdata.stutters) msg3 = "Alternative speech stutter enabled.";
        msg = msg1 + " " + msg2 + " " + msg3;
        statusmsg(msg);
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
            ChatRoomTargetMemberNumber == -1;
    }

    //Status
    function showStatus() {
        showM_MOANER_scriptStatus();
        showM_MOANER_profileStatus();
        showM_MOANER_orgasmStatus();
        showM_MOANER_spankStatus();
        showM_MOANER_talkStatus();
        showM_MOANER_whisperStatus();
        showM_MOANER_tickleStatus();
        showM_MOANER_vibratorStatus();
        showM_MOANER_xvibratorStatus();
    }

    function showM_MOANER_scriptStatus() {
        let msg = "The moaner is not active.";
        if (M_MOANER_scriptOn) msg = "The moaner is active.";
        statusmsg(msg);
    }

    function showM_MOANER_profileStatus() {
        let msg = "Current moans profile: " + profileName;
        if (profileName == "default") msg = "No custom profile loaded.";
        statusmsg(msg);
    }

    function showM_MOANER_orgasmStatus() {
        let msg = "The orgasm moan is not active. You will not moan while cumming.";
        if (M_MOANER_orgasmActive) msg = "The orgasm moan is active. You will moan while cumming.";
        statusmsg(msg);
    }

    function showM_MOANER_spankStatus() {
        let msg = "The spank moan is not active. You will not moan while being spanked.";
        if (M_MOANER_spankActive) msg = "The spank moan is active. You will moan while being spanked.";
        statusmsg(msg);
    }

    function showM_MOANER_talkStatus() {
        let msg = "The talk moan is not active. If you're vibed, you will not moan while speaking.";
        if (M_MOANER_talkActive) msg = "The talk moan is active. If you're vibed, you will moan while speaking.";
        statusmsg(msg);
    }

    function showM_MOANER_whisperStatus() {
        let msg = "The whisper moan is not active. If you're vibed, you will not moan while whispering.";
        if (M_MOANER_whisperActive) msg = "The whisper moan is active. If you're vibed, you will whisper while speaking.";
        statusmsg(msg);
    }

    function showM_MOANER_tickleStatus() {
        let msg = "The tickle moan is not active. You will not moan while being tickled.";
        if (M_MOANER_tickleActive) msg = "The tickle moan is active. You will moan while being tickled.";
        statusmsg(msg);
    }

    function showM_MOANER_vibratorStatus() {
        let msg = "The vibes moan is not active. If your vibrator's settings change, you will not moan.";
        if (M_MOANER_vibratorActive) msg = "The vibes moan is active. If your vibrator's settings change, you will moan.";
        statusmsg(msg);
    }

    function showM_MOANER_xvibratorStatus() {
        let msg = "The xvibes moan is not active. If vibrator's settings of other players change, you will not moan.";
        if (M_MOANER_xvibratorActive) msg = "The xvibes moan is active. If vibrator's settings of other players change, you will moan.";
        statusmsg(msg);
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
        let keys = [];
        for (var key in obj) {
            keys.push(key);
        }
        return keys;
    }

    function M_MOANER_shuffle(array, seed) {
        let currentIndex = array.length,
            temporaryValue, randomIndex;
        // While there remain elements to M_MOANER_shuffle...
        while (0 !== currentIndex) {
            seed = M_MOANER_getRandomNumber(seed);
            // Pick a remaining element...
            let randomIndex = seed % (array.length - 1);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    function M_MOANER_getRandomNumber(seed) {
        let number = Math.floor(Math.abs(Math.sin(seed) * 1000));
        return number;
    }

    //MoanerReactions in chat
    let M_MOANER_orgasmMoans = [];
    let M_MOANER_factor4Moans = [];
    let M_MOANER_factor3Moans = [];
    let M_MOANER_factor2Moans = [];
    let factor1Moans = [];
    let PROPORTION_MAX = 40;

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
	let spl = 0;
        let LSCG = Player.ExtensionSettings.LSCG;
        if (LSCG) {
            let LSCGdata = JSON.parse(LZString.decompressFromBase64(LSCG));
            if (LSCGdata.SplatterModule.enabled) spl = 1;
        }
        if (spl == 1 && M_MOANER_orgasmActive) { 
            Player.UBC.ubcSettings.orgasmMoan = false;
            M_MOANER_orgasmActive = false;
            M_MOANER_saveControls();
        }
        if (M_MOANER_orgasmActive && M_MOANER_scriptOn && window.CurrentScreen == "ChatRoom") {
            if ((Player.ID == 0) && (Player.ArousalSettings.OrgasmStage == 2)) {
                let moan;
                let sc;
                let backupChatRoomTargetMemberNumber = -1;
                // not in whisper mode
                // initially not as /me
                // only in normal talk mode
                let msg = ElementValue("InputChat");
                if (M_MOANER_isSimpleChat(msg)) {
                    sc = 1;
                    moan = msg + "... " + getOrgasmMoan();
                } else {
                    sc = 0;
                    backupChatRoomTargetMemberNumber = ChatRoomTargetMemberNumber;
                    ChatRoomTargetMemberNumber = -1;
                    moan = "... " + getOrgasmMoan();
                }
                ElementValue("InputChat", moan);
                let moan2 = moan;
                if (this.StutterOn == true) moan2 = SpeechTransformStutter(moan, st);
                ElementValue("InputChat", moan.replace(moan, moan2));
                let mb = 0;
                let MBS = Player.ExtensionSettings.MBS;
                if (MBS) {
                    let MBSdata = JSON.parse(LZString.decompressFromUTF16(MBS));
                    if (MBSdata.AlternativeGarbling) mb = 1;
                }
                let moan3;
                if (this.BabyTalkOn == true) {
                    moan3 = SpeechTransformBabyTalk(moan2);
                } else if (this.GagTalkOn == true) {
                    if (mb == 1) {
                        moan3 = moan2;
                    } else {
                        moan3 = SpeechTransformGagGarble(moan2, gl);
                    }
                } else {
                    moan3 = moan2;
                }
                ElementValue("InputChat", moan2.replace(moan2, moan3));
                let moan4;
                if (notalk == 1) {
                    moan4 = moan3;
                } else {
                    if (gl != 0) {
                        moan4 = moan3;
                    } else {
                        moan4 = moan2;
                    }
                }
                ElementValue("InputChat", moan3.replace(moan3, moan4));
                msg = "";
                ActivityChatRoomArousalSync(Player);
                if (Player.UBC.ubcSettings.cum == false) {
                    ChatRoomSendChat();
                    Player.UBC.ubcSettings.cum = true;
                }
                if (sc == 0) {
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
                if (M_MOANER_xvibratorActive && M_MOANER_scriptOn) {
                    msg = ElementValue("InputChat");
                    reaction = 3;
                    M_MOANER_miscReactions(data);
                } else {
                    if ((metadata != undefined) || (metadata != null)) {
                        if ((metadata.TargetCharacter != undefined) || (metadata.TargetCharacter != null)) {
                            if (metadata.TargetCharacter.IsPlayer()) {
                                msg = ElementValue("InputChat");
                                if (M_MOANER_vibratorActive && M_MOANER_scriptOn && M_MOANER_isVibes) {
                                    reaction = 3;
                                    M_MOANER_saveControls();
                                    M_MOANER_miscReactions(data);
                                }
                            }
                        }
                    }
                }
            }
	    let lvibe = 0;
            let LSCG = Player.ExtensionSettings.LSCG;
            if (LSCG) {
                let LSCGdata = JSON.parse(LZString.decompressFromBase64(LSCG));
                if ((data.Content.includes("SipItem")) || (data.Content.includes("LSCG_FunnelPour"))) lvibe = 1;
                if (data.Content.includes("Inject")) {
                    if (data.Content.includes("Gears")) {
                        lvibe = 0;
                    } else {
                        lvibe = 1;
                    }
                }
                if (InventoryGet(Player, "ItemMouth") != null) {
                    if (InventoryGet(Player, "ItemMouth").Asset.Name == "LatexRespirator") {
                        if (InventoryGet(Player, "ItemMouth").Craft != undefined) {
                            if (InventoryGet(Player, "ItemMouth").Craft.Item == "LatexRespirator") {
                                if (data.Type === "Action") {
                                    if (data.Content.includes("ActionUse")) {
                                        lvibe = 1;
                                    }
                                }
                            }
                        }
                    }
                }
                if (InventoryGet(Player, "ItemMouth2") != null) {
                    if (InventoryGet(Player, "ItemMouth2").Asset.Name == "LatexRespirator") {
                        if (InventoryGet(Player, "ItemMouth2").Craft != undefined) {
                            if (InventoryGet(Player, "ItemMouth2").Craft.Item == "LatexRespirator") {
                                if (data.Type === "Action") {
                                    if (data.Content.includes("ActionUse")) {
                                        lvibe = 1;
                                    }
                                }
                            }
                        }
                    }
                }
                if (InventoryGet(Player, "ItemMouth3") != null) {
                    if (InventoryGet(Player, "ItemMouth3").Asset.Name == "LatexRespirator") {
                        if (InventoryGet(Player, "ItemMouth3").Craft != undefined) {
                            if (InventoryGet(Player, "ItemMouth3").Craft.Item == "LatexRespirator") {
                                if (data.Type === "Action") {
                                    if (data.Content.includes("ActionUse")) {
                                        lvibe = 1;
                                    }
                                }
                            }
                        }
                    }
                }
                if (lvibe == 1) {
                    if (!Player?.MemberNumber) return;
                    let mtarget = data.Dictionary.find(obj => obj.TargetCharacter)?.TargetCharacter;
                    mtarget ||= data.Dictionary.find(obj => obj.Tag === "TargetCharacter")?.MemberNumber;
                    if (mtarget !== Player.MemberNumber) return;
                    msg = ElementValue("InputChat");
                    if (LSCGdata.InjectorModule.enableHorny == true) {
                        if (LSCGdata.InjectorModule.hornyLevel != 0) {
                            if (M_MOANER_vibratorActive && M_MOANER_scriptOn && M_MOANER_isVibes) {
                                reaction = 3;
                                M_MOANER_saveControls();
                                M_MOANER_miscReactions(data);
                            }
                        }
                    }
                }
            }
            if (data.Type === "Action" && metadata.ShockIntensity >= 0) {
                let intensity = metadata.ShockIntensity;
                if (intensity !== null && metadata.TargetCharacter.IsPlayer()) {
                    msg = ElementValue("InputChat");
                    if ((data.Content.includes("Orgasm")) ||
                        (data.Content.includes("Standup")) ||
                        (data.Content.includes("Struggle"))) {
                        if (M_MOANER_spankActive && M_MOANER_scriptOn) {
                            reaction = 1;
                            M_MOANER_saveControls();
                            M_MOANER_miscReactions(data);
                        }
                    }
                }
            }
            if (data.Type !== 'Activity') return;
            if (!Player?.MemberNumber) return;
            let mtarget = data.Dictionary.find(obj => obj.TargetCharacter)?.TargetCharacter;
            mtarget ||= data.Dictionary.find(obj => obj.Tag === "TargetCharacter")?.MemberNumber;
            if (mtarget !== Player.MemberNumber) return;
            msg = ElementValue("InputChat");
            if ((data.Content.includes("Bite")) ||
                (data.Content.includes("Kick")) ||
                (data.Content.includes("Pinch")) ||
                (data.Content.includes("Shock")) ||
                (data.Content.includes("Slap")) ||
                (data.Content.includes("Spank"))) {
                if (M_MOANER_spankActive && M_MOANER_scriptOn) {
                    reaction = 1;
                    M_MOANER_saveControls();
                    M_MOANER_miscReactions(data);
                }
            }
            if (data.Content.includes("Tickle")) {
                if (M_MOANER_tickleActive && M_MOANER_scriptOn) {
                    reaction = 2;
                    M_MOANER_saveControls();
                    M_MOANER_miscReactions(data);
                }
            }
            if ((data.Content == "ChatOther-ItemEars-Caress") ||
                (data.Content == "ChatOther-ItemEars-Kiss") ||
                (data.Content == "ChatOther-ItemEars-Lick") ||
                (data.Content == "ChatOther-ItemEars-Nibble") ||
                (data.Content.includes("Finger")) ||
                (data.Content.includes("Fist")) ||
                (data.Content.includes("Masturbate"))) {
                if (M_MOANER_vibratorActive && M_MOANER_scriptOn && M_MOANER_isVibes) {
                    reaction = 3;
                    M_MOANER_saveControls();
                    M_MOANER_miscReactions(data);
                }
            }
        }
    });

    function M_MOANER_miscReactions(data) {
        let moan;
        let Factor = Math.floor(Player.ArousalSettings.Progress / 20);
        //get the moan type to apply
        //data to generate the moans
        if (reaction == 1) moan = getPainMoan(Factor, Math.random() * 300);
        if (reaction == 2) moan = getTickleMoan(Factor, Math.random() * 300);
        if (reaction == 3) moan = getMoan(Factor, true, Math.random() * 300);
        let msg = ElementValue("InputChat");
        if (M_MOANER_isSimpleChat(msg)) {
            if (msg != "") {
                moan = msg + "... " + moan;
            }
        }
        let backtarget = ChatRoomTargetMemberNumber;
        ChatRoomTargetMemberNumber = -1;
        ElementValue("InputChat", moan);
        let moan2 = moan;
        if (this.StutterOn == true) moan2 = SpeechTransformStutter(moan, st);
        ElementValue("InputChat", moan.replace(moan, moan2));
        let mb = 0;
        let MBS = Player.ExtensionSettings.MBS;
        if (MBS) {
            let MBSdata = JSON.parse(LZString.decompressFromUTF16(MBS));
            if (MBSdata.AlternativeGarbling) mb = 1;
        }
        let moan3;
        if (this.BabyTalkOn == true) {
            moan3 = SpeechTransformBabyTalk(moan2);
        } else if (this.GagTalkOn == true) {
            if (mb == 1) {
                moan3 = moan2;
            } else {
                moan3 = SpeechTransformGagGarble(moan2, gl);
            }
        } else {
            moan3 = moan2;
        }
        ElementValue("InputChat", moan2.replace(moan2, moan3));
        let moan4;
        if (notalk == 1) {
            moan4 = moan3;
        } else {
            if (gl != 0) {
                moan4 = moan3;
            } else {
                moan4 = moan2;
            }
        }
        ElementValue("InputChat", moan3.replace(moan3, moan4));
        ChatRoomSendChat();
        ElementValue("InputChat", msg);
        ChatRoomTargetMemberNumber = backtarget;
        reaction = 0;
        M_MOANER_saveControls();
    }

    function M_MOANER_isVibes(data) {
        if (Player.ArousalSettings.Progress >= 10) {
            return true;
        }
        let LSCG = Player.ExtensionSettings.LSCG;
        if (LSCG) {
            let LSCGdata = JSON.parse(LZString.decompressFromBase64(LSCG));
            if (LSCGdata.InjectorModule.enableHorny == true) {
                if (LSCGdata.InjectorModule.hornyLevel >= 40) {
                    return true;
                }
            }
        }
        return false;
    }

    function M_MOANER_applyMoanToMsg(C, CD) {
        //determine the number of moans
        //calculate it according the number of words
        //proportion: PROPORTION_MAX*ArousingLevel
        //PROPORTION_MAX=40%
        let proportion = C.ArousalSettings.Progress * PROPORTION_MAX / 10000;
        M_MOANER_logDebug("proportion: " + proportion);
        let CDList = CD.split(" ");
        let currentIndex = 0;
        let stop = false;
        let next = false;
        let wh = 0;
        let finalTextList = [];
        //get the moans to apply
        //data to generate the moans
        let Factor = Math.floor(C.ArousalSettings.Progress / 20);
        while (currentIndex < CDList.length) {
            //if the next word contains a bracket, we stop the repartition of moans
            let currentWord = CDList[currentIndex++];
            if ((currentWord == "/whisper") || (currentWord == "/murmur")) {
                next = true;
                wh = 1;
            }
            if (wh == 1) {
                next = true;
                wh = 2;
            }
            if (wh == 2) {
                next = true;
                wh = 3;
            }
            if (wh == 3) {
                next = true;
                wh = 0;
            }
            let presenceParenthese = M_MOANER_detectParentheses(currentWord);
            if (presenceParenthese == 1) stop = true;
            if (stop) {
                finalTextList.push(currentWord);
            } else {
                if (next) {
                    finalTextList.push(currentWord);
                    next = false;
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
            }
            if (presenceParenthese == 2) stop = false;
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

    function getPainMoan(Factor, seed) {
        let gemissement;
        //according level of spanking fetichism
        let ID = 26;
        let Taste = Player.ArousalSettings.Activity.charCodeAt(ID) - 100;
        if (Taste == 0 || Taste == 10 || Taste == 20 || Taste == 30 || Taste == 40) activitySelf = 0;
        if (Taste == 1 || Taste == 11 || Taste == 21 || Taste == 31 || Taste == 41) activitySelf = 1;
        if (Taste == 2 || Taste == 12 || Taste == 22 || Taste == 32 || Taste == 42) activitySelf = 2;
        if (Taste == 3 || Taste == 13 || Taste == 23 || Taste == 33 || Taste == 43) activitySelf = 3;
        if (Taste == 4 || Taste == 14 || Taste == 24 || Taste == 34 || Taste == 44) activitySelf = 4;
        let seuilDouleur = Math.min(10, (4 - activitySelf) * 25);
        let seuilPlaisir = seuilDouleur + 40;
        let douleur = Player.ArousalSettings.Progress <= seuilDouleur;
        let plaisir = Player.ArousalSettings.Progress > seuilPlaisir;
        if (douleur) {
            gemissement = getPain();
        } else if (plaisir) {
            gemissement = "\u2665" + getMoan(Factor, true, 300) + "\u2665";
        } else {
            gemissement = getPain() + "\u2665" + getMoan(Factor, true, 300) + "\u2665";
        }
        return gemissement;
    }

    function getTickleMoan(Factor, seed) {
        let gemissement;
        //according level of tickling fetichism
        let ID = 20;
        let Taste = Player.ArousalSettings.Activity.charCodeAt(ID) - 100;
        if (Taste == 0 || Taste == 10 || Taste == 20 || Taste == 30 || Taste == 40) activitySelf = 0;
        if (Taste == 1 || Taste == 11 || Taste == 21 || Taste == 31 || Taste == 41) activitySelf = 1;
        if (Taste == 2 || Taste == 12 || Taste == 22 || Taste == 32 || Taste == 42) activitySelf = 2;
        if (Taste == 3 || Taste == 13 || Taste == 23 || Taste == 33 || Taste == 43) activitySelf = 3;
        if (Taste == 4 || Taste == 14 || Taste == 24 || Taste == 34 || Taste == 44) activitySelf = 4;
        let seuilDouleur = Math.min(10, (4 - activitySelf) * 25);
        let seuilPlaisir = seuilDouleur + 40;
        let douleur = Player.ArousalSettings.Progress <= seuilDouleur;
        let plaisir = Player.ArousalSettings.Progress > seuilPlaisir;
        if (douleur) {
            gemissement = getPtickle();
        } else if (plaisir) {
            gemissement = "\u2665" + getMoan(Factor, true, 300) + "\u2665";
        } else {
            gemissement = getPtickle() + "\u2665" + getMoan(Factor, true, 300) + "\u2665";
        }
        return gemissement;
    }

    function getZoneTaste(data) {
        let zone;
        let taste;
        for (index in data.Dictionary) {
            let elem = data.Dictionary[index];
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
            let zone = Player.ArousalSettings.Zone[index];
            if (zone.Name == name) return zone;
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

    function getPainBACK() {
        let index = Math.floor(Math.random() * basePainMoans.length);
        return basePainMoans[index];
    }

    function getPtickleBACK() {
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

    function getPain() {
        let moanProfile = M_MOANER_getMoans(profileName);
        let index = Math.floor(Math.random() * moanProfile.pain.length);
        return moanProfile.pain[index];
    }

    function getPtickle() {
        let moanProfile = M_MOANER_getMoans(profileName);
        let index = Math.floor(Math.random() * moanProfile.tickle.length);
        return moanProfile.tickle[index];
    }

    function getOrgasmMoan() {
        let gemissement;
        if (M_MOANER_orgasmMoans.length == 0) {
            M_MOANER_logDebug("getOrgasmMoan: reset list");
            let seed = 3000;
            M_MOANER_logDebug("getOrgasmMoan: seed=" + seed);
            let moanProfile = M_MOANER_getMoans(profileName);
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
            let Item = C.Appearance[A];
            if (InventoryItemHasEffect(Item, "Vibrating", true)) {
                if (Player.ArousalSettings.Progress >= 10) {
                    return true;
                }
            }
        }
        let LSCG = Player.ExtensionSettings.LSCG;
        if (LSCG) {
            let LSCGdata = JSON.parse(LZString.decompressFromBase64(LSCG));
            if (LSCGdata.InjectorModule.enableHorny == true) {
                if (LSCGdata.InjectorModule.hornyLevel >= 40) {
                    return true;
                }
            }
        }
        return false;
    }

    ///////////////////////////////////////////////////////////////				
    //Commands

    CommandCombine([{
        Tag: 'asylum',
        Description: "(minutes): enters asylum, bypasses requirements.",
        Action: (args) => {
            if ((args === "") && (ReputationGet("Asylum") < 0)) {
                let msg = "You must specify minutes if you are a patient.";
                infomsg(msg);
            } else {
                if (ReputationGet("Asylum") < 0) {
                    let minutes = args;
                    LogAdd("Committed", "Asylum", CurrentTime + 60000 * minutes);
                }
                ChatRoomSetLastChatRoom("");
                ServerSend("ChatRoomLeave", "");
                OnlineGameName = "";
                CommonSetScreen("Room", "AsylumEntrance");
                ChatRoomHideElements();
                AsylumEntranceIsWearingNurseClothes = function() {
                    return true
                };
            }
        }
    }])

    CommandCombine([{
        Tag: 'atalk',
        Description: "(animal) (words): speaks once as a specified animal.",
        Action: (_, command, args) => {
            let help = "The atalk command must be followed by a number between 1 and 9 for the animal and the words you want to say.\n" +
                "Note that it can't be used when you are in a 'permanent' animal talk mode.\n" +
                "Available animals:\n" +
                "1 bunny - 2 cow - 3 fox - 4 kitty - 5 mouse\n" +
                "6 pig - 7 pony - 8 puppy - 9 wolfy";
            let [mode] = args;
            if (!mode || isNaN(mode) || mode < 1 || mode > 9) {
                infomsg(help);
                return;
            }
            let [, , ...message] = command.split(" ");
            let msg = message?.join(" ");
            if (!msg) {
                infomsg("Please include words to say after the animal number.");
                return;
             }
             if (dolltalk === true && IsDollTalk(msg) === false) {
                infomsg(umsg4);
                return;
             }
             let content = GarbleTalk(msg, animalModes[mode]);
             ElementValue("InputChat", content);
             event.preventDefault();
             ChatRoomSendChat();
         }
    }])

    CommandCombine([{
        Tag: 'autokick',
        Description: ": toggles on auto kick for 0 day old accounts.",
        Action: () => {
            if (this.AutoKickOn == false || this.AutoKickOn == undefined) {
                let msg = "AutoKick Ready.";
                infomsg(msg);
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
                        let msg = "AutoKick: Account was 0 days old.";
                        publicmsg(msg);
                    };
                };
                ServerSocket.on("ChatRoomMessage", AutoKicker);
            } else {
                AutoKickOn = false;
                ServerSocket.off("ChatRoomMessage", AutoKicker);
                let msg = "AutoKick Disabled.";
                infomsg(msg);
            }
        }
    }])

    CommandCombine([{
        Tag: 'bg1',
        Description: ": adds hidden backgrounds to the selection screen.",
        Action: () => {
            morebg();
            let msg = "You can use more standard backgrounds now. In addition, if you use BCX, the backgrouds added and hidden by this mod are now directly visible.";
            infomsg(msg);
        }
    }])

    CommandCombine([{
        Tag: 'bg2',
        Description: "(number): uses a Bondage Brawl background as standard background.",
        Action: (args) => {
            if (args === "") {
                let msg = "The bg2 command must be followed by a number. List of Bondage Brawl backgrounds:\n" +
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
                    "97 Vulture Plain - 98, 99 Wine Cell";
                infomsg(msg);
            } else {
                let bg = "";
                let url1 = "../Screens/Room/Platform/Background/";
                let url2 = "../Screens/Room/PlatformDialog/Background/";
                if (args == 1) bg = url1 + "Castle/Balcony";
                if (args == 2) bg = url2 + "Balcony";
                if (args == 3) bg = url1 + "Castle/Ballroom";
                if (args == 4) bg = url1 + "Savannah/BanditCampClosed";
                if (args == 5) bg = url1 + "Savannah/BanditCampGateClosed";
                if (args == 6) bg = url1 + "Savannah/BanditCampGateOpen";
                if (args == 7) bg = url1 + "Savannah/BanditCampOpen";
                if (args == 8) bg = url1 + "Savannah/BanditPath";
                if (args == 9) bg = url2 + "BanditCamp";
                if (args == 10) bg = url2 + "BanditCampGateGround";
                if (args == 11) bg = url2 + "BanditCampGateOpen";
                if (args == 12) bg = url2 + "BanditCampGround";
                if (args == 13) bg = url1 + "Forest/BarnExterior";
                if (args == 14) bg = url1 + "Forest/BarnInterior";
                if (args == 15) bg = url2 + "BarnInterior";
                if (args == 16) bg = url1 + "Castle/Orig/BathroomOlivia";
                if (args == 17) bg = url1 + "Castle/BathroomOlivia";
                if (args == 18) bg = url2 + "BathroomOlivia";
                if (args == 19) bg = url1 + "Castle/BedroomDungeon";
                if (args == 20) bg = url1 + "Castle/BedroomEdward";
                if (args == 21) bg = url1 + "Castle/BedroomIsabella";
                if (args == 22) bg = url2 + "BedroomIsabella";
                if (args == 23) bg = url1 + "Castle/BedroomMelody";
                if (args == 24) bg = url1 + "Castle/BedroomOlivia";
                if (args == 25) bg = url2 + "BedroomOlivia";
                if (args == 26) bg = url2 + "BedroomOliviaDark";
                if (args == 27) bg = url1 + "Forest/BirchClear";
                if (args == 28) bg = url1 + "Forest/BirchHeavy";
                if (args == 29) bg = url1 + "Forest/BirchLight";
                if (args == 30) bg = url2 + "ForestBirchLight";
                if (args == 31) bg = url1 + "Forest/BirchMaze";
                if (args == 32) bg = url2 + "ForestMaze";
                if (args == 33) bg = url2 + "Black";
                if (args == 34) bg = url1 + "Forest/CampGround";
                if (args == 35) bg = url2 + "CampGround";
                if (args == 36) bg = url1 + "Forest/CampGroundRaft";
                if (args == 37) bg = url1 + "Forest/Orig/CastleEntrance";
                if (args == 38) bg = url2 + "CastleHall";
                if (args == 39) bg = url1 + "Forest/CastleWall";
                if (args == 40) bg = url1 + "Forest/SecludedClearing";
                if (args == 41) bg = url2 + "SecludedClearing";
                if (args == 42) bg = url1 + "College/CollegeArt1";
                if (args == 43) bg = url1 + "College/CollegeClass1";
                if (args == 44) bg = url1 + "College/CollegeHall1";
                if (args == 45) bg = url1 + "Castle/CountessHall";
                if (args == 46) bg = url2 + "CountessHall";
                if (args == 47) bg = url1 + "Castle/CountessHallDeadEnd";
                if (args == 48) bg = url2 + "DesertEntrance";
                if (args == 49) bg = url1 + "Castle/Dungeon1C";
                if (args == 50) bg = url1 + "Castle/Dungeon1W";
                if (args == 51) bg = url1 + "Castle/DungeonCell";
                if (args == 52) bg = url2 + "DungeonCell";
                if (args == 53) bg = url1 + "Castle/DungeonStorage";
                if (args == 54) bg = url2 + "DungeonStorage";
                if (args == 55) bg = url2 + "DungeonStorageDark";
                if (args == 56) bg = url1 + "Forest/FirLight";
                if (args == 57) bg = url1 + "Forest/CabinInterior";
                if (args == 58) bg = url1 + "Forest/CabinPath";
                if (args == 59) bg = url2 + "ForestCabinInterior";
                if (args == 60) bg = url1 + "Forest/Orig/WoodCabin";
                if (args == 61) bg = url2 + "Gas";
                if (args == 62) bg = url1 + "Forest/Orig/GreenPlain";
                if (args == 63) bg = url1 + "Castle/Hall1C";
                if (args == 64) bg = url1 + "Castle/Hall1W";
                if (args == 65) bg = url1 + "Castle/Hall2C";
                if (args == 66) bg = url1 + "Castle/Hall3C";
                if (args == 67) bg = url1 + "Castle/Hall3Cv2";
                if (args == 68) bg = url1 + "Castle/Hall3E";
                if (args == 69) bg = url1 + "Castle/Hall3W";
                if (args == 70) bg = url1 + "Castle/Hall4C";
                if (args == 71) bg = url1 + "Castle/Hall4E";
                if (args == 72) bg = url1 + "Castle/Hall4W1";
                if (args == 73) bg = url1 + "Castle/Hall4W2";
                if (args == 74) bg = url1 + "Forest/LakeBetweenRocks";
                if (args == 75) bg = url2 + "LakeRaft";
                if (args == 76) bg = url1 + "Forest/LakeShore";
                if (args == 77) bg = url1 + "Forest/LakeShoreRaft";
                if (args == 78) bg = url1 + "Forest/MountainLake";
                if (args == 79) bg = url2 + "Water";
                if (args == 80) bg = url2 + "MaidBed";
                if (args == 81) bg = url1 + "Forest/Orig/MountainPath";
                if (args == 82) bg = url1 + "Forest/OakHeavy";
                if (args == 83) bg = url2 + "OakHeavy";
                if (args == 84) bg = url1 + "Forest/PlainDistantLake";
                if (args == 85) bg = url1 + "Forest/PlainSparseRocks";
                if (args == 86) bg = url1 + "Forest/PlainToForest";
                if (args == 87) bg = url1 + "Forest/PlainToSavannah";
                if (args == 88) bg = url1 + "Forest/PlainWoodPath";
                if (args == 89) bg = url1 + "Forest/LostPond";
                if (args == 90) bg = url1 + "Forest/Orig/Savannah";
                if (args == 91) bg = url2 + "Savannah";
                if (args == 92) bg = url1 + "Savannah/TentExterior";
                if (args == 93) bg = url1 + "Savannah/TentInterior";
                if (args == 94) bg = url2 + "SavannahTentInterior";
                if (args == 95) bg = url1 + "Castle/Terrace";
                if (args == 96) bg = url2 + "Terrace";
                if (args == 97) bg = url1 + "Forest/Orig/VulturePlain";
                if (args == 98) bg = url1 + "Castle/WineCellar";
                if (args == 99) bg = url2 + "WineCellar";
                if ((args > 0) && (args < 100)) {
                    ChatCreateBackgroundSelect = bg;
                    updateBackground();
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'bg3',
        Description: "(number): uses a Bondage College or Bondage Teacher background as custom background.",
        Action: (args) => {
            let BCver = GameVersion;
            if (BCver.includes("Beta")) {
                let beta1 = BCver.slice(0, 4);
                let beta2 = beta1.slice(-3);
                let beta3 = beta2 - 1;
                BCver = "R" + beta3;
            }
            if (args === "") {
                let msg = "The bg3 command must be followed by a number. List of Bondage College backgrounds:\n" +
                    "BONDAGE COLLEGE\n" +
                    "1 Art Class - 2, 3 Class - 4 Club - 5 College\n" +
                    "6 Dorm - 7 Dressing Room - 8 Gym Class\n" +
                    "9 to 12 Isolation Room - 13 to 16 Kinbaku Club\n" +
                    "17 to 26 Library - 27, 28 Lockers\n" +
                    "29 Running Track - 30, 31 Showers - 32 Theater\n" +
                    "BONDAGE TEACHER\n" +
                    "33, 34 Beach - 35, 36 Briefcase - 37 Bullseye\n" +
                    "38, 39 Class - 40 College - 41 Office";
                infomsg(msg);
            } else {
                let bg = "";
                let url1 = "https://www.bondage-europe.com/" + BCver;
                let url2 = "https://gitgud.io/BondageProjects/Bondage-College/-/raw/master/Backgrounds/";
                let url3 = "https://gitgud.io/BondageProjects/bondage-teacher/-/raw/master/";
                if (args == 1) bg = url1 + "/C004_ArtClass/Intro/Background.jpg";
                if (args == 2) bg = url1 + "/C001_BeforeClass/Intro/Background2.jpg";
                if (args == 3) bg = url1 + "/C999_Common/Quiz/Backgrounds/Classroom.jpg";
                if (args == 4) bg = url1 + "/C013_BondageClub/Intro/Background.jpg";
                if (args == 5) bg = url1 + "/C000_Intro/Intro/Background.jpg";
                if (args == 6) bg = url1 + "/C012_AfterClass/Intro/Background.jpg";
                if (args == 7) bg = url1 + "/C008_DramaClass/DressingRoom/Background.jpg";
                if (args == 8) bg = url1 + "/C005_GymClass/Intro/Background.jpg";
                if (args == 9) bg = url1 + "/C006_Isolation/Intro/Background.jpg";
                if (args == 10) bg = url1 + "/C006_Isolation/IsolationRoom/C006_CutRope_3_0.jpg";
                if (args == 11) bg = url1 + "/C006_Isolation/IsolationRoom/C006_CutRope_3_1.jpg";
                if (args == 12) bg = url1 + "/C006_Isolation/IsolationRoom/C006_CutRope_3_2.jpg";
                if (args == 13) bg = url1 + "/C101_KinbakuClub/ClubRoom1/ClubRoom1Arrows.jpg";
                if (args == 14) bg = url1 + "/C101_KinbakuClub/ClubRoom2/ClubRoom2Arrows.jpg";
                if (args == 15) bg = url1 + "/C101_KinbakuClub/ClubRoom3/ClubRoom3Arrows.jpg";
                if (args == 16) bg = url1 + "/C101_KinbakuClub/ClubRoom4/ClubRoom4.jpg";
                if (args == 17) bg = url1 + "/C009_Library/Library/001.jpg";
                if (args == 18) bg = url1 + "/C009_Library/Library/002.jpg";
                if (args == 19) bg = url1 + "/C009_Library/Library/003.jpg";
                if (args == 20) bg = url1 + "/C009_Library/Library/004.jpg";
                if (args == 21) bg = url1 + "/C009_Library/Library/005.jpg";
                if (args == 22) bg = url1 + "/C009_Library/Library/006.jpg";
                if (args == 23) bg = url1 + "/C009_Library/Library/007.jpg";
                if (args == 24) bg = url1 + "/C009_Library/Library/008.jpg";
                if (args == 25) bg = url1 + "/C009_Library/Library/009.jpg";
                if (args == 26) bg = url1 + "/C009_Library/Library/010.jpg";
                if (args == 27) bg = url1 + "/C010_Revenge/Intro/BackgroundAmandaSarah.jpg";
                if (args == 28) bg = url1 + "/C010_Revenge/Intro/BackgroundSidneyJennifer.jpg";
                if (args == 29) bg = url1 + "/C999_Common/Fights/Backgrounds/RunningTrack.jpg";
                if (args == 30) bg = url2 + "Shower1.jpg";
                if (args == 31) bg = url2 + "Shower2.jpg";
                if (args == 32) bg = url1 + "/C008_DramaClass/Theater/Background.jpg";
                if (args == 33) bg = url3 + "Screen/Character/Picture/Background/MiaBeach1.jpg";
                if (args == 34) bg = url3 + "Screen/Character/Picture/Background/TeacherBeach2.jpg";
                if (args == 35) bg = url3 + "Screen/Intro/FirstBossMeeting/Background/BriefcaseInside.jpg";
                if (args == 36) bg = url3 + "Screen/Intro/FirstBossMeeting/Background/BriefcaseOutside.jpg";
                if (args == 37) bg = url3 + "Image/Cheat/Bullseye.png";
                if (args == 38) bg = url3 + "Image/Background/TeacherClassStandingAlone.jpg";
                if (args == 39) bg = url3 + "Image/Background/TeacherClassStandingAloneCuffed.jpg";
                if (args == 40) bg = url3 + "Image/Background/TeacherCollegeSingle.jpg";
                if (args == 41) bg = url3 + "Screen/Intro/FirstBossMeeting/Background/TeacherLookOffice.jpg";
                if ((args > 0) && (args < 42)) ChatAdminRoomCustomizationCommand("Image", bg);
            }
        }
    }])

    CommandCombine([{
        Tag: 'bg4',
        Description: "(screen) (background): selects a standard background for the Club Card Game, Friend List, Main Hall, Private Room (SP) or Timer Cell",
        Action: (args) => {
            if (args === "") {
                let msg = "The bg4 command must be followed by two numbers:\n" +
                    "- a number for the concerned screen:\n" +
                    "0 = Club Card Game\n" +
                    "1 = Friend List - 2 = Main Hall\n" +
                    "3 = Private Room (SP) - 4 = Timer Cell\n" +
                    "5 = Creation of New Room (default)\n" +
                    " \n" +
                    "- a number between -1 and a maximum that can vary:\n" +
                    "Without BCX: 0 to 196 for official BC backgrounds, 197 to 279 are added if you use the /bg1 command.\n" +
                    "With BCX: 0 to 196 for official BC backgrounds, 197 to 286 are added by BCX, 287 to 360 are added if you use the /bg1 command (some backgrounds have two numbers).\n" +
                    " \n" +
                    "Use -1 to go back to the default background. Tip: use </b>/bglist</b> to know which number corresponds to a specific background.";
                infomsg(msg);
            } else {
                let stringBg1 = args;
                let stringBg2 = stringBg1.split(/[ ,]+/);
                let screen = stringBg2[0];
                if ((screen > -1) && (screen < 6)) {
                    if (screen == 0) {
                        let ccbg = stringBg2[1];
                        let ccback = "";
                        if ((ccbg > -2) && (ccbg < (BackgroundsList.length - 1))) {
                            if (ccbg == -1) {
                                ccback = "ClubCardPlayBoard1";
                            } else {
                                ccback = BackgroundsList[ccbg].Name;
                            }
                            Player.Game.ClubCard.Background = ccback;
			    ServerAccountUpdate.QueueData({
                                Game: Player.Game 
                            });
                            let msg = "The background of the Club Card Game is now: " + ccback + ".";
                            infomsg(msg);
                        }
                    }

                    if (screen == 1) {
                        let frbg = stringBg2[1];
                        let frback = "";
                        if ((frbg > -2) && (frbg < (BackgroundsList.length - 1))) {
                            if (frbg == -1) {
                                frback = "BrickWall";
                            } else {
                                frback = BackgroundsList[frbg].Name;
                            }
                            frname = frback;
                            M_MOANER_saveControls();
                            let msg = "The background of the friend list is now: " + frname + ".";
                            infomsg(msg);
                        }
                    }
                    if (screen == 2) {
                        let mhbg = stringBg2[1];
                        let mhback = "";
                        if ((mhbg > -2) && (mhbg < (BackgroundsList.length - 1))) {
                            if (mhbg == -1) {
                                mhback = "MainHall";
                            } else {
                                mhback = BackgroundsList[mhbg].Name;
                            }
                            Player.VisualSettings.MainHallBackground = mhback;
                            ServerAccountUpdate.QueueData({
                                VisualSettings: Player.VisualSettings
                            });
                            let msg = "The background of the main hall is now: " + mhback + ".";
                            infomsg(msg);
                        }
                    }
                    if (screen == 3) {
                        let prbg = stringBg2[1];
                        let prback = "";
                        if ((prbg > -2) && (prbg < (BackgroundsList.length - 1))) {
                            if (prbg == -1) {
                                prback = "Private";
                            } else {
                                prback = BackgroundsList[prbg].Name;
                            }
                            Player.VisualSettings.PrivateRoomBackground = prback;
                            PrivateBackground = prback;
                            ServerAccountUpdate.QueueData({
                                VisualSettings: Player.VisualSettings
                            });
                            let msg = "The background of your private room (SP) is now: " + prback + ".";
                            infomsg(msg);
                        }
                    }
                    if (screen == 4) {
                        let tcbg = stringBg2[1];
                        let tcback = "";
                        if ((tcbg > -2) && (tcbg < (BackgroundsList.length - 1))) {
                            if (tcbg == -1) {
                                tcback = "Cell";
                            } else {
                                tcback = BackgroundsList[tcbg].Name;
                            }
                            tcname = tcback;
                            M_MOANER_saveControls();
                            let msg = "The background of the timer cell is now: " + tcname + ".";
                            infomsg(msg);
                        }
                    }
                    if (screen == 5) {
                        let drbg = stringBg2[1];
                        let drback = "";
                        if ((drbg > -2) && (drbg < (BackgroundsList.length - 1))) {
                            if (drbg == -1) {
                                drback = "CosyChalet";
                            } else {
                                drback = BackgroundsList[drbg].Name;
                            }
                            PreferenceOnlineDefaultBackground = drback;
                            Player.OnlineSettings.DefaultChatRoomBackground = drback;
                            ServerAccountUpdate.QueueData({
                                OnlineSettings: Player.OnlineSettings
                            });
                            let msg = "The default background when creating a new room is now: " + drback + ".";
                            infomsg(msg);
                        }
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'bglist',
        Description: ": displays list of all available standard backgrounds",
        Action: () => {
            for (let i = 0; i < BackgroundsList.length; i++)
                ChatRoomSendLocal(i + " - " + BackgroundsList[i].Name);
        }
    }])

    CommandCombine([{
        Tag: 'bgshow1',
        Description: "(bgnumber): displays locally clickable link to a specific standard background and embedded picture.",
        Action: (args) => {
            let BCver = GameVersion;
            if (BCver.includes("Beta")) {
                let beta1 = BCver.slice(0, 4);
                let beta2 = beta1.slice(-3);
                let beta3 = beta2 - 1;
                BCver = "R" + beta3;
            }
            if (args === "") {
                let msg = "The bgshow1 command must be followed by a number (use /bglist to get available numbers).";
                infomsg(msg);
            } else {
                if ((args > -1) && (args < BackgroundsList.length)) {
                    let name = BackgroundsList[args].Name;
                    let url = 'https://www.bondage-europe.com/' + BCver + '/BondageClub/Backgrounds/' + name + '.jpg';

                    let msg = '<a href="' + url + '" target="_blank">' + url + '</a>';
                    let txt = "( " + msg + " )";
                    infomsg(txt);
                    let div = document.querySelector("#TextAreaChatLog");
                    let divMsg = document.createElement('div');
                    divMsg.classList.add("ChatMessage", "ChatMessageChat");
                    let img = document.createElement('img');
                    img.src = url;
                    img.classList.add('chatImg');
                    let a = document.createElement("a");
                    a.target = '_blank';
                    a.href = msg;
                    img.style.maxWidth = '90%';
                    img.style.maxHeight = '90%';
                    div.append(divMsg);
                    divMsg.append(a);
                    a.append(img);
                    if (div.scrollHeight - div.offsetHeight - div.scrollTop < 300) {
                        img.addEventListener('load', () => {
                            ElementScrollToEnd("TextAreaChatLog");
                        })
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'bgshow2',
        Description: "(bgnumber): sends in chat link to a specific standard background. When used with WCE feature, the link is clickable and the picture can be embedded in the chat.",
        Action: (args) => {
            let BCver = GameVersion;
            if (BCver.includes("Beta")) {
                let beta1 = BCver.slice(0, 4);
                let beta2 = beta1.slice(-3);
                let beta3 = beta2 - 1;
                BCver = "R" + beta3;
            }
            if (args === "") {
                let msg = "The bgshow2 command must be followed by a number (use /bglist to get available numbers).";
                infomsg(msg);
            } else {
                if ((args > -1) && (args < BackgroundsList.length)) {
                    let name = BackgroundsList[args].Name;
                    let url = 'https://www.bondage-europe.com/' + BCver + '/BondageClub/Backgrounds/' + name + '.jpg';
                    let msg = "( " + url + " )";
                    ChatRoomSendChatMessage(msg);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'bio',
        Description: "(target): gives direct access to the profile description of any player in the chat room.",
        Action: (args) => {
            let target = "";
            if (args === "") {
                CharacterBio(Player);
            } else {
                let target = TargetSearch(args);
                if (target != null) CharacterBio(target);
            }
        }
    }])

    CommandCombine([{
        Tag: 'boost',
        Description: ": boosts all your skills for one hour.",
        Action: () => {
            if (noescape) {
                let msg = umsg1 + umsg3;
                infomsg(msg);
            } else {
                SkillSetModifier(Player, "Bondage", +5, 3600000);
                SkillSetModifier(Player, "Dressage", +5, 3600000);
                SkillSetModifier(Player, "Evasion", +5, 3600000);
                SkillSetModifier(Player, "Infiltration", +5, 3600000);
                SkillSetModifier(Player, "LockPicking", +5, 3600000);
                SkillSetModifier(Player, "SelfBondage", +5, 3600000);
                SkillSetModifier(Player, "Willpower", +5, 3600000);
                let msg = "You feel all your skills boosted. Changes can be seen in information panel.";
                infomsg(msg);
            }
        }
    }])

    CommandCombine([{
        Tag: 'btalk',
        Description: "(words): speaks once as a baby.",
        Action: (args) => {
            if (!args) {
                infomsg("The btalk command must be followed by the words you want to say.");
                return;
            }
            if (dolltalk === true && !IsDollTalk(args)) {
                infomsg("Your message can't be sent because it does not respect the rules of doll talk");
                return;
            }
            let msg = SpeechTransformBabyTalk(args);
            if (this.StutterOn) msg = SpeechTransformStutter(msg, st);
            if (M_MOANER_talkActive && M_MOANER_scriptOn && IsStimulated(Player)) msg = M_MOANER_applyMoanToMsg(Player, msg);
            ElementValue("InputChat", msg);
            event.preventDefault();
            ChatRoomSendChatMessage(msg);
        }
    }])
	
    CommandCombine([{
        Tag: 'cgame',
        Description: "(zone): launches a Club Card Game against a specific NPC.",
        Action: (args) => {
            if (args === "") {
                let msg = "The cgame command must include a zone.\n" +
                    "Available zones:\n" +
                    "asylum, cafe, infiltration, introduction, kidnap, larp,\n" +
                    "lounge, movie, shibari, stable.\n" +
                    "You need to click on the concerned NPC, then on the appropriate option.";
                infomsg(msg);
            } else {
                let minigame = args;
                if (minigame == "asylum") {
                    RoomToGame();
                    CommonSetScreen("Room", "AsylumMeeting");
                    AsylumEntranceIsWearingNurseClothes = function() {
                        return true
                    };
                    InventoryRemove(AsylumMeetingPatientRight, "ItemArms");
                    InventoryRemove(AsylumMeetingPatientRight, "ItemHead");
                    InventoryRemove(AsylumMeetingPatientRight, "ItemMouth");
                    AsylumMeetingPatientRight.Stage = "20";
                } else if (minigame == "cafe") {
                    RoomToGame();
                    CommonSetScreen("Room", "Cafe");
                    CafeMaid.Stage = "50";
                } else if (minigame == "infiltration") {
                    RoomToGame();
                    CommonSetScreen("Room", "Infiltration");
                    InfiltrationSupervisor.Stage = "80";
                } else if (minigame == "introduction") {
                    RoomToGame();
                    CommonSetScreen("Room", "Introduction");
                    IntroductionMaid.Stage = "90";
		} else if (minigame == "kidnap") {
                    RoomToGame();
                    CommonSetScreen("Room", "KidnapLeague");
                    KidnapLeagueBackground = "MainHall";
	            CharacterDelete(KidnapLeagueRandomKidnapper, false);
	            KidnapLeagueRandomKidnapper = CharacterLoadNPC("NPC_KidnapLeague_RandomKidnapper");
	            CharacterSetCurrent(KidnapLeagueRandomKidnapper);
                    KidnapLeagueRandomKidnapperScenario = "1";
                    KidnapLeagueRandomKidnapper.Stage = KidnapLeagueRandomKidnapperScenario.toString();
		    KidnapLeagueRandomKidnapper.CurrentDialog = DialogFind(KidnapLeagueRandomKidnapper, "Intro" + KidnapLeagueRandomKidnapperScenario); 
                } else if (minigame == "larp") {
                    RoomToGame();
                    CommonSetScreen("Room", "LARP");
                    LARPOrganiser.Stage = "70";
                } else if (minigame == "lounge") {
                    RoomToGame();
                    CommonSetScreen("Room", "ClubCardLounge");
                    ClubCardLoungeTutor.Stage = "40";
                } else if (minigame == "movie") {
                    RoomToGame();
                    CommonSetScreen("Room", "MovieStudio");
                    MovieStudioDirector.Stage = "90";
                } else if (minigame == "shibari") {
                    RoomToGame();
                    CommonSetScreen("Room", "Shibari");
                    InventoryRemove(ShibariStudent, "ItemArms");
                    InventoryRemove(ShibariStudent, "ItemFeet");
                    InventoryRemove(ShibariStudent, "ItemLegs");
                    InventoryRemove(ShibariStudent, "ItemMouth");
                    InventoryRemove(ShibariStudent, "ItemTorso");
                    ShibariStudent.Stage = "0";
                } else if (minigame == "stable") {
                    RoomToGame();
                    CommonSetScreen("Room", "Stable");
                    StableTrainer.Stage = "80";
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'chess',
        Description: "(difficulty): starts chess.",
        Action: (args) => {
            if (args === "") {
                let msg = "The chess command must be followed by a number between 1 and 3.\n" +
                    " \n" +
                    "Available difficulty modes:\n" +
                    "1 easy\n" +
                    "2 normal\n" +
                    "3 hard";
                infomsg(msg);
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
                    DrawRoomBackground();
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
                let chessdifficulty = args;
                if (this.ChessOn == false || this.ChessOn == undefined) {
                    ChessOn = true;
                    CommonSetScreen("Room", "CollegeChess");
                    CollegeChessGameStartALT(chessdifficulty);
                    setTimeout(function() {
                        CommonSetScreen("Online", "ChatRoom");
                        ElementPositionFix("DivChessBoard", null, -1100, 0);
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
            let target = Player;
            if (args != "") target = TargetSearch(args);
            if (target != null) {
                if (target == Player) {
                    let msg = "Magical lasers put random clothes on " + tmpname + "'s body.";
                    if (Clothes != undefined) {
                        if (Clothes != "") {
                            msg = tmpname + ' '.repeat(1) + Clothes;
                            if (Clothes.startsWith("\u0027")) msg = tmpname + Clothes;
                        }
                    }
                    if (Clothes != "no message") publicmsg(msg);
                    CharacterAppearanceFullRandom(Player, true);
                    ChatRoomCharacterUpdate(Player);
                } else {
                    if ((target.AllowItem == true) && (target.OnlineSharedSettings.UBC != undefined)) {
                        tgpname = getNickname(target);
                        if (IsTargetProtected(target)) {
                            let msg = umsg1 + tgpname + umsg2;
                            infomsg(msg);
                        } else {
                            let msg = "Magical lasers put random clothes on " + tgpname + "'s body."
                            if (Tclothes != undefined) {
                                if (Tclothes != "") {
                                    msg = tmpname + ' '.repeat(1) + Tclothes + ' '.repeat(1) + tgpname;
                                    if (Tclothes.startsWith("\u0027")) msg = tmpname + Tclothes + ' '.repeat(1) + tgpname;
                                }
                            }
                            if (Tclothes != "no message") publicmsg(msg);
                            CharacterAppearanceFullRandom(target, true);
                            ChatRoomCharacterUpdate(target);
                        }
                    }
                }
                ChatRoomSetTarget(-1);
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
            ChatRoomHideElements();
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
                let msg = "The colorchanger command:\n" +
                    "To preselect, two choices exist, type: <b>/colorchanger hair</b> or <b>/colorchanger eyes</b>\n" +
                    "To manually select area, type: <b>/colorchanger set</b> or <b>/colorchanger select</b> or <b>/colorchanger custom</b>\n" +
                    "Manual selection can only target 10 areas at a time,\n" +
                    "then requires to be reset to reuse, type: <b>/colorchanger stop</b> or <b>/colorchanger reset</b>\n" +
                    "Only 1 target can be active at a time";
                infomsg(msg);
            }
            if ((args === "custom") || (args === "set") || (args === "select")) {
                let msg = "You have 5 seconds to click on target, select area. If successful, will be returned. If not, retry";
                infomsg(msg);
                setTimeout(function() {
                    if (CurrentCharacter != null) {
                        if (CurrentCharacter.FocusGroup.Name) {
                            let RandomColor = null;
                            let ColorTargetNameCustom = CurrentCharacter;
                            if (this.ColorTarget1 == undefined) this.ColorTarget1 = CurrentCharacter.FocusGroup.Name;
                            if (this.ColorTarget2 == undefined) this.ColorTarget2 = CurrentCharacter.FocusGroup.Name;
                            if (this.ColorTarget3 == undefined) this.ColorTarget3 = CurrentCharacter.FocusGroup.Name;
                            if (this.ColorTarget4 == undefined) this.ColorTarget4 = CurrentCharacter.FocusGroup.Name;
                            if (this.ColorTarget5 == undefined) this.ColorTarget5 = CurrentCharacter.FocusGroup.Name;
                            if (this.ColorTarget6 == undefined) this.ColorTarget6 = CurrentCharacter.FocusGroup.Name;
                            if (this.ColorTarget7 == undefined) this.ColorTarget7 = CurrentCharacter.FocusGroup.Name;
                            if (this.ColorTarget8 == undefined) this.ColorTarget8 = CurrentCharacter.FocusGroup.Name;
                            if (this.ColorTarget9 == undefined) this.ColorTarget9 = CurrentCharacter.FocusGroup.Name;
                            if (this.ColorTarget10 == undefined) this.ColorTarget10 = CurrentCharacter.FocusGroup.Name;
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
                let msg = "You have 5 seconds to click on target, select area. If successful, will be returned. If not, retry";
                infomsg(msg);
                setTimeout(function() {
                    if (CurrentCharacter != null) {
                        if (CurrentCharacter) {
                            let ColorTargetNameEyes = CurrentCharacter;
                            ColorChangerEyes = function() {
                                setTimeout(function() {
                                    ColorChangerEyes()
                                }, 1000);
                                let RandomColor = null;
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
                let msg = "You have 5 seconds to click on target, select area. If successful, will be returned. If not, retry";
                infomsg(msg);
                setTimeout(function() {
                    if (CurrentCharacter != null) {
                        if (CurrentCharacter) {
                            let ColorTargetNameHair = CurrentCharacter;
                            ColorChangerHair = function() {
                                setTimeout(function() {
                                    ColorChangerHair()
                                }, 1000);
                                let RandomColor = null;
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
        Tag: 'difficulty',
        Description: "(number): changes game difficulty.",
        Action: (args) => {
            if (args === "") {
                let msg = "The difficulty command must be followed by a number between 0 and 3.\n" +
                    " \n" +
                    "Available difficulty modes:\n" +
                    "0 roleplay\n" +
                    "1 regular\n" +
                    "2 hardcore\n" +
                    "3 extreme";
                infomsg(msg);
            } else {
                PreferenceDifficultyLevel = args * 1;
            }
            let currentlevel = Player.GetDifficulty();
            if ((PreferenceDifficultyLevel > -1) && (PreferenceDifficultyLevel < 4) && (PreferenceDifficultyLevel != currentlevel)) {
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
            const roomSeps = document.querySelectorAll("#TextAreaChatLog .chat-room-sep");
            const roomSep = roomSeps[0];
            const parent = roomSep.parentElement;
            while (roomSep.nextSibling) {
                parent.removeChild(roomSep.nextSibling);
            }
            ElementScrollToEnd("TextAreaChatLog");
        }
    }])

    CommandCombine([{
        Tag: 'font',
        Description: "(font) (size): changes font in BC. ",
        Action: (args) => {
            if (args === "") {
                let msg = "The font command must be followed by a font number and optionally a size number.\n" +
                    "Supported fonts: 0 Arial - 1 Times New Roman\n" +
                    "2 Papyrus - 3 Comic Sans - 4 Impact\n" +
                    "5 Helvetica Neue - 6 Verdana - 7 Century Gothic\n" +
                    "8 Georgia - 9 Courrier New - 10 Copperplate\n" +
                    "Sizes: 0 Small - 1 Medium - 2 Large";
                infomsg(msg);
            } else {
                let stringFont1 = args;
                let stringFont2 = stringFont1.split(/[ ,]+/);
                let font = stringFont2[0];
                let size = stringFont2[1];
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
                InformationSheetLoad();
                InformationSheetLoadCharacter(Player);
                InformationSheetExit();
            }
        }
    }])

    CommandCombine([{
        Tag: 'frlist',
        Description: "(lobby): gives access to friendlist in specified lobby.",
        Action: (args) => {
            if (args === "") {
                let msg = "The frlist command must be followed by the lobby for which you want to have clickable links.\n" +
                    "Available options: asylum, fclub, mclub, xclub.";
                infomsg(msg);
            } else {
                let frlist = "noaccess";
                if (args === "asylum") {
                    if ((asylumlimit == false) || (ChatRoomSpace == "Asylum")) frlist = "Asylum";
                }
                if (args === "fclub") {
                    if ((IsFemale() == true) && ((ChatRoomSpace != "Asylum") || (asylumlimit == false))) frlist = "";
                }
                if (args === "mclub") {
                    if ((IsMale() == true) && ((ChatRoomSpace != "Asylum") || (asylumlimit == false))) frlist = "M";
                }
                if (args === "xclub") {
                    if ((asylumlimit == false) || ((asylumlimit == true) && (ChatRoomSpace != "Asylum"))) frlist = "X";
                }
                if (frlist == "noaccess") {
                    let msg = "No access to this lobby.";
                    infomsg(msg);
                } else {
                    setTimeout(function() {
                        ChatRoomSpace = frlist;
                        RoomToFriends();
                    }, 1000);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'game',
        Description: "(minigame): launches a minigame.",
        Action: (args) => {
            if (args === "") {
                let msg = "The game command must include a minigame.\n" +
                    "Available minigames:\n" +
                    "carrot, cleaning, dojo, drinks, hurdle, kidnap, movie1,\n" +
                    "movie2, puppy, rhythm, tennis1, tennis2, tennis3,\n" +
                    "training, whippony.\n" +
                    "Tennis1 = easy, tennis2 = normal, tennis3 = hard\n" +
                    "Training is the trainer version of the hurdle game.\n" +
                    "You need to click on the maid in the Maid Quarters for the cleaning, drinks and rhythm games.";
                infomsg(msg);
            } else {
                let minigame = args;
                if (minigame == "carrot") {
                    gamestable = true;
                    M_MOANER_saveControls();
                    RoomToGame();
                    CommonSetScreen("Room", "Stable");
                    StableDressPonyStart();
                    StableWearPonyEquipment(Player);
                    MiniGameStart("HorseWalk", "Carrot", "StablePlayerTrainingCarrotsEnd");
                } else if (minigame == "cleaning") {
                    RoomToGame();
                    CommonSetScreen("Room", "MaidQuarters");
                    GameType = "MaidCleaning";
                    MaidQuartersMaid.Stage = "400";
                } else if (minigame == "dojo") {
                    RoomToGame();
                    CommonSetScreen("Room", "Introduction");
                    IntroductionJobStart("SubDojo", 0)
                    IntroductionJobDojoStart();
                } else if (minigame == "drinks") {
                    RoomToGame();
                    CommonSetScreen("Room", "MaidQuarters");
                    GameType = "MaidDrinks";
                    MaidQuartersMaid.Stage = "200";
                } else if (minigame == "hurdle") {
                    gamestable = true;
                    M_MOANER_saveControls();
                    RoomToGame();
                    CommonSetScreen("Room", "Stable");
                    StableDressPonyStart();
                    StableWearPonyEquipment(Player);
                    MiniGameStart("HorseWalk", "Hurdle", "StablePlayerTrainingHurdlesEnd");
                } else if (minigame == "kidnap") {
                    RoomToGame();
                    CommonSetScreen("Room", "Introduction");
                    IntroductionJobStart("DomKidnap", 0)
                    IntroductionJobBouncerStart();
                } else if (minigame == "movie1") {
                    RoomToGame();
                    CommonSetScreen("Room", "MovieStudio");
                    MovieStudioDailyMovie = "Interview";
                } else if (minigame == "movie2") {
                    RoomToGame();
                    CommonSetScreen("Room", "MovieStudio");
                    MovieStudioDailyMovie = "OpenHouse";
                } else if (minigame == "puppy") {
                    RoomToGame();
                    CommonSetScreen("Room", "Introduction");
                    IntroductionJobStart("DomPuppy", 0)
                    IntroductionJobPuppyStart();
                } else if (minigame == "rhythm") {
                    RoomToGame();
                    CommonSetScreen("Room", "MaidQuarters");
                    GameType = "RhythmGame";
                    MaidQuartersMaid.Stage = "500";
                } else if (minigame == "tennis1") {
                    RoomToGame();
                    CommonSetScreen("Room", "CollegeTennis");
                    CollegeTennisJennifer.Stage = "1000";
                    CollegeTennisGameStart("Easy");
                } else if (minigame == "tennis2") {
                    RoomToGame();
                    CommonSetScreen("Room", "CollegeTennis");
                    CollegeTennisJennifer.Stage = "1000";
                    CollegeTennisGameStart("Normal");
                } else if (minigame == "tennis3") {
                    RoomToGame();
                    CommonSetScreen("Room", "CollegeTennis");
                    CollegeTennisJennifer.Stage = "1000";
                    CollegeTennisGameStart("Hard");
                } else if (minigame == "training") {
                    RoomToGame();
                    CommonSetScreen("Room", "Stable");
                    StablePlayerAppearance = Player.Appearance.slice();
                    StableWearTrainerEquipment(Player);
                    MiniGameStart("HorseWalk", "HurdleTraining", "StablePonyTrainingHurdlesEnd");
                } else if (minigame == "whippony") {
                    RoomToGame();
                    CommonSetScreen("Room", "Stable");
                    StablePlayerAppearance = Player.Appearance.slice();
                    StableWearTrainerEquipment(Player);
                    MiniGameStart("HorseWalk", "WhipPony", "StableTrainerWhipEnd");
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'ggts',
        Description: "(minutes) (level):  enters ggts training in asylum for the specified time and level.",
        Action: (args) => {
            if (args === "") {
                let msg = "The ggts command must be followed by two numbers to  specify minutes and level (1-6).";
                infomsg(msg);
            } else {
                let stringGgts1 = args;
                let stringGgts2 = stringGgts1.split(/[ ,]+/);
                let minutes = stringGgts2[0];
                let level = stringGgts2[1];
                let msg = "" + tmpname + " gets grabbed by two maids and locked in the asylum for " + minutes + " minutes of training with the Good Girl Training System Level " + level + ".";
                publicmsg(msg);
                DialogLentLockpicks = false;
                ChatRoomClearAllElements();
                ServerSend("ChatRoomLeave", "");
                CharacterDeleteAllOnline();
                AsylumGGTSLock(minutes, TextGet("GGTSIntro"));
                Level = parseInt(level);
                if (Player.Game == null) Player.Game = {};
                Player.Game.GGTS = {
                    Level: Level,
                    Time: 0,
                    Strike: 0,
                    Rule: []
                };
                AsylumGGTSSAddItems();
                if (Level == 6) CharacterChangeMoney(Player, 1000);
                else if (Level >= 2) CharacterChangeMoney(Player, 100 * (Level - 1));
                ServerAccountUpdate.QueueData({
                    Game: Player.Game
                }, true);
            }
        }
    }])

    CommandCombine([{
        Tag: 'gtalk',
        Description: "(talkmode) (words): speaks once in specified gag talk.",
        Action: (_, command, args) => {
            let help = "The gtalk command must be followed by a number between 0 and 10, then the words you want to say.\n" +
                " \n" +
                "Available talk modes:\n" +
                "0 real gag talk (based on currently worn gags and other items restraining talking)\n" +
                "1 almost no gag talk\n" +
                "2 very light gag talk\n" +
                "3 light gag talk\n" +
                "4 easy gag talk\n" +
                "5 normal gag talk\n" +
                "6 medium gag talk\n" +
                "7 heavy gag talk\n" +
                "8 better heavy gag talk\n" +
                "9 very heavy gag talk\n" +
                "10 total gag talk";
            let [gaglevel] = args;
            if (!gaglevel || isNaN(gaglevel) || gaglevel < 0 || gaglevel > 10) {
                infomsg(help);
                return;
            }
            let [, , ...message] = command.split(" ");
            let msg = message?.join(" ");
            if (!msg) {
                infomsg("Please include words to say after the gagtalk level.");
                return;
            }
            if (dolltalk === true && IsDollTalk(msg) === false) {
                infomsg(umsg4);
                return;
            }
            let onegl = gaglevel;
            let nt = 0;
            if (gaglevel == 0) {
                onegl = SpeechTransformGagGarbleIntensity(Player);
                let mgl = onegl;
                let MBS = Player.ExtensionSettings.MBS;
                if (MBS) {
                    let MBSdata = JSON.parse(LZString.decompressFromUTF16(MBS));
                    if (MBSdata.AlternativeGarbling) {
                        onegl = 0;
                        mgl = SpeechTransformGagGarbleIntensity(Player);
                    }
                }
                let LSCG = Player.ExtensionSettings.LSCG;
                if (LSCG) {
                    let LSCGdata = JSON.parse(LZString.decompressFromBase64(LSCG));
                    let states = LSCGdata.StateModule.states || [];
                    let neck = InventoryGet(Player, "ItemNeck");
                    if (neck && LSCGdata.CollarModule.chokeLevel > 1) onegl = (LSCGdata.CollarModule.chokeLevel) * 2 + onegl;
                    if (neck && LSCGdata.CollarModule.chokeLevel == 4) nt = 1;
                    if (states.some(s => ["asleep", "frozen", "gagged", "hypnotized"].includes(s.type) && s.active)) nt = 1;            
                }
            } 
            let content = SpeechTransformGagGarble(msg, onegl);
            let content2 = (nt === 1 || onegl !== 0) ? content : msg;
            ElementValue("InputChat", content2);
            event.preventDefault();
            ChatRoomSendChat();
        }
    }])

    CommandCombine([{
        Tag: 'hint',
        Description: "(target) (hint): adds or changes a hint for current locks with passwords.",
        Action: (_, command, args) => {
            let [targetname] = args;
            if (!targetname) {
                let msg = "The hint command must be followed by a target and the hint you want to add to locks with password.";
                infomsg(msg);
            } else {
                let [, , ...message] = command.split(" ");
                let hint = message?.join(" ");
                let target = TargetSearch(targetname);
                if ((target != null) && ((target == Player) || (target.AllowItem == true)) && (target.OnlineSharedSettings.UBC != undefined)) {
                    tgpname = getNickname(target);
                    if (IsTargetProtected(target)) {
                        let msg = umsg1 + tgpname + umsg2;
                        infomsg(msg);
                    } else {
                        if (hint != "") {
                            for (let A = 0; A < target.Appearance.length; A++)
                                if ((target.Appearance[A].Property != null) && (target.Appearance[A].Property.LockedBy != null)) {
                                    if ((target.Appearance[A].Property.LockedBy == "SafewordPadlock") ||
                                        (target.Appearance[A].Property.LockedBy == "PasswordPadlock") ||
                                        (target.Appearance[A].Property.LockedBy == "TimerPasswordPadlock")) {
                                        target.Appearance[A].Property.Hint = hint;
                                        let msg = "A hint has been added to " + tgpname + "'s locks with password.";
                                        publicmsg(msg);
                                    }
                                }
                            ChatRoomCharacterUpdate(target);
                        }
                    }
                }
                ChatRoomSetTarget(-1);
            }
        }
    }])

    CommandCombine([{
        Tag: 'infolock',
        Description: ": gives info (code, password, time left) for lock used on worn item in selected slot.",
        Action: () => {
            if (extrainfo == false) {
                let msg = "You can't use this command according your settings.";
                infomsg(msg);
            } else {
                let msg = "You have 5 seconds to click on yourself or another player. If successful, you will get infos about the lock for the selected slot.";
                infomsg(msg);
                setTimeout(function() {
                    if (CurrentCharacter != null) {
                        let Target = "";
                        let Inventory = "";
                        let Lock = "";
                        let asset = "";
                        let code = "";
                        let time = "";
                        let left = "";
                        if (CurrentCharacter.FocusGroup.Name) {
                            Target = CurrentCharacter.FocusGroup.Name;
                            if (InventoryGet(CurrentCharacter, Target) != null) {
                                Inventory = InventoryGet(CurrentCharacter, Target);
                                if (Inventory.Property.LockedBy != null) {
                                    if (Inventory.Property.LockedBy == "CombinationPadlock") {
                                        Lock = "Combination Padlock";
                                        asset = Inventory.Asset.Description;
                                        code = Inventory.Property.CombinationNumber;
                                        ChatRoomSendLocal("AssetGroup = " + Target);
                                        ChatRoomSendLocal("Locked with " + Lock);
                                        ChatRoomSendLocal("" + asset + " = " + code + "");
                                    }
                                    if (Inventory.Property.LockedBy == "PortalLinkPadlock") {
                                        Lock = "Portal Link Padlock";
                                        asset = Inventory.Asset.Description;
                                        code = Inventory.Property.PortalLinkCode;
                                        ChatRoomSendLocal("AssetGroup = " + Target);
                                        ChatRoomSendLocal("Locked with " + Lock);
                                        ChatRoomSendLocal("" + asset + " = " + code + "");
                                    }
                                    if ((Inventory.Property.LockedBy == "SafewordPadlock") || (Inventory.Property.LockedBy == "PasswordPadlock") || (Inventory.Property.LockedBy == "TimerPasswordPadlock")) {
                                        Lock = "Safeword Padlock";
                                        if (Inventory.Property.LockedBy == "PasswordPadlock") Lock = "Password Padlock";
                                        if (Inventory.Property.LockedBy == "TimerPasswordPadlock") Lock = "Timer Password Padlock";
                                        asset = Inventory.Asset.Description;
                                        code = Inventory.Property.Password;
                                        ChatRoomSendLocal("AssetGroup = " + Target);
                                        ChatRoomSendLocal("Locked with " + Lock);
                                        ChatRoomSendLocal("" + asset + " = " + code + "");
                                        if (Inventory.Property.LockedBy == "TimerPasswordPadlock") {
                                            time = Inventory.Property.RemoveTimer;
                                            left = TimerToString(time - CurrentTime);
                                            ChatRoomSendLocal("" + asset + " = " + left + "");
                                        }
                                    }
                                    if ((Inventory.Property.LockedBy == "TimerPadlock") || (Inventory.Property.LockedBy == "MistressTimerPadlock") || (Inventory.Property.LockedBy == "LoversTimerPadlock") || (Inventory.Property.LockedBy == "OwnerTimerPadlock")) {
                                        Lock = "Timer Padlock";
                                        if (Inventory.Property.LockedBy == "MistressTimerPadlock") Lock = "Mistress Timer Padlock";
                                        if (Inventory.Property.LockedBy == "LoversTimerPadlock") Lock = "Lovers Timer Padlock";
                                        if (Inventory.Property.LockedBy == "OwnerTimerPadlock") Lock = "Owner Timer Padlock";
                                        asset = Inventory.Asset.Description;
                                        time = Inventory.Property.RemoveTimer;
                                        left = TimerToString(time - CurrentTime);
                                        ChatRoomSendLocal("AssetGroup = " + Target);
                                        ChatRoomSendLocal("Locked with " + Lock);
                                        ChatRoomSendLocal("" + asset + " = " + left + "");
                                    }
                                }
                                if (Inventory.Property.Name != null) {
                                    if (Inventory.Property.Name == "Best Friend Timer Padlock") {
                                        Lock = "Best Friend Timer Padlock";
                                        asset = Inventory.Asset.Description;
                                        time = Inventory.Property.RemovalTime;
                                        left = TimerToString(time - CurrentTime);
                                        ChatRoomSendLocal("AssetGroup = " + Target);
                                        ChatRoomSendLocal("Locked with " + Lock);
                                        ChatRoomSendLocal("" + asset + " = " + left + "");
                                    }
                                }
                            }
                            DialogLeave();
                        }
                    }
                }, 5000);
            }
        }
    }])

    CommandCombine([{
        Tag: 'invisible',
        Description: "(target): goes or sends to invisible mode (scripts need to be allowed in BC settings).",
        Action: (args) => {
            let target = Player;
            if (args != "") target = TargetSearch(args);
            if (target != null) {
                if (target == Player) {
                    if (Player.OnlineSharedSettings.ScriptPermissions.Hide.permission == 0) {
                        let msg = "To use the invisible command on yourself, you need first to allow Scripts in BC settings.";
                        infomsg(msg);
                    } else {
                        let msg = "Magical lasers make " + tmpname + " completely invisible.";
                        if (Invisible != undefined) {
                            if (Invisible != "") {
                                msg = tmpname + ' '.repeat(1) + Invisible;
                                if (Invisible.startsWith("\u0027")) msg = tmpname + Invisible;
                            }
                        }
                        if (Invisible != "no message") publicmsg(msg);
                        InventoryWear(Player, "Script", "ItemScript");
                        InventoryGet(Player, "ItemScript").Property = {
                            Hide: echolevel5
                        }
                        CurrentScreen === 'ChatRoom' ?
                            ChatRoomCharacterUpdate(Player) :
                            CharacterRefresh(Player);
                    }
                } else {
                    if ((target.AllowItem == true) && (target.OnlineSharedSettings.UBC != undefined)) {
                        tgpname = getNickname(target);
                        if (target.OnlineSharedSettings.ScriptPermissions.Hide.permission == 0) {
                            let msg = "To use the invisible command on other players, they need first to allow Scripts in BC settings.";
                            infomsg(msg);
                        } else {
                            if (IsTargetProtected(target)) {
                                let msg = umsg1 + tgpname + umsg2;
                                infomsg(msg);
                            } else {
                                let msg = "Magical lasers make " + tgpname + " completely invisible.";
                                if (Tinvisible != undefined) {
                                    if (Tinvisible != "") {
                                        msg = tmpname + ' '.repeat(1) + Tinvisible + ' '.repeat(1) + tgpname;
                                        if (Tinvisible.startsWith("\u0027")) msg = tmpname + Tinvisible + ' '.repeat(1) + tgpname;
                                    }
                                }
                                if (Tinvisible != "no message") publicmsg(msg);
                                InventoryWear(target, "Script", "ItemScript");
                                InventoryGet(target, "ItemScript").Property = {
                                    Hide: echolevel5
                                }
                                CurrentScreen === 'ChatRoom' ?
                                    ChatRoomCharacterUpdate(target) :
                                    CharacterRefresh(target);
                            }
                        }
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'itemcolor1',
        Description: "(colorcode) (target): changes color on all current bindings.",
        Action: (args) => {
            if (args === "") {
                let msg = "The itemcolor1 command must be followed by a color code in the format #000000 and optionally a target.";
                infomsg(msg);
            } else {
                let stringItc1 = args;
                let stringItc2 = stringItc1.split(/[ ,]+/);
                let color = stringItc2[0];
                let targetname = stringItc2[1];
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
                    let msg = "New colors are used on " + tmpname + "'s bindings.";
                    publicmsg(msg);
                    ChatRoomCharacterUpdate(Player);
                } else {
                    let target = TargetSearch(targetname);
                    if ((target != null) && (color.startsWith("#"))) {
                        if ((target.AllowItem == true) && (target.OnlineSharedSettings.UBC != undefined)) {
                            tgpname = getNickname(target);
                            if (IsTargetProtected(target)) {
                                let msg = umsg1 + tgpname + umsg2;
                                infomsg(msg);
                            } else {
                                for (let A = 0; A < target.Appearance.length; A++)
                                    if (target.Appearance[A].Asset.Group.Name != null) {
                                        if (target.Appearance[A].Asset.Group.Name.startsWith("Item")) {
                                            if (Array.isArray(target.Appearance[A].Color)) {
                                                for (let i = 0; i < 14; i++)
                                                    target.Appearance[A].Color[i] = color;
                                            } else {
                                                target.Appearance[A].Color = color;
                                            }
                                        }
                                    }
                                let msg = "New colors are used on " + tgpname + "'s bindings.";
                                publicmsg(msg);
                                ChatRoomCharacterUpdate(target);
                            }
                        }
                    }
                    ChatRoomSetTarget(-1);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'itemcolor2',
        Description: "(colorcode): changes color of worn item in selected slot.",
        Action: (args) => {
            if (args === "") {
                let msg = "The itemcolor2 command needs to be followed by a color code in the format #000000 to change the color of a worn item in a slot selected by mouse click.";
                infomsg(msg);
            } else {
                let color = args;
                if (color.startsWith("#")) {
                    let msg = "You have 5 seconds to click on yourself. If successful, the color of the worn item in selected slot will be changed. If not, retry.";
                    infomsg(msg);
                    setTimeout(function() {
                        if ((CurrentCharacter != null) && (CurrentCharacter == Player)) {
                            if (CurrentCharacter.FocusGroup.Name) {
                                let Target = CurrentCharacter.FocusGroup.Name;
                                if (InventoryGet(Player, Target) != null) {
                                    ChatRoomSendLocal("AssetGroup = " + Target);
                                    InventoryGet(Player, Target).Color = color;
                                    DialogLeave();
                                    ChatRoomCharacterUpdate(Player);
                                    let msg = "Item color changed.";
                                    infomsg(msg);
                                }
                            }
                        }
                    }, 5000);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'itempriority',
        Description: "(priority): changes priority of worn item in selected slot.",
        Action: (args) => {
            if (args === "") {
                let msg = "The itempriority command needs to be followed by a number (between -99 and 99) to change the priority of a worn item in a slot selected by mouse click.";
                infomsg(msg);
            } else {
                let priority = args * 1;
                if (priority > 99) priority = 99;
                if (priority < -99) priority = -99;
                let msg = "You have 5 seconds to click on yourself. If successful, the priority of the worn item in selected slot will be changed. If not, retry.";
                infomsg(msg);
                setTimeout(function() {
                    if ((CurrentCharacter != null) && (CurrentCharacter == Player)) {
                        if (CurrentCharacter.FocusGroup.Name) {
                            let Target = CurrentCharacter.FocusGroup.Name;
                            if (InventoryGet(Player, Target) != null) {
                                ChatRoomSendLocal("AssetGroup = " + Target);
                                let ak = 0;
                                if (InventoryGet(Player, Target).Asset.Archetype != undefined) {
                                    let Archetype = InventoryGet(Player, Target).Asset.Archetype;
                                    if (Archetype == "typed") ak = 1;
                                    if (Archetype == "modular") ak = 2;
                                }
                                let Property = InventoryGet(Player, Target).Property;
                                if (ak < 2) {
                                    if (Property == undefined) {
                                        Property = {};
                                        let OverridePriority = {};
                                        OverridePriority = priority;
                                        Property.OverridePriority = OverridePriority;
                                    } else {
                                        Property.OverridePriority = priority;
                                    }
                                }
                                if (ak == 2) {
                                    Property.OverridePriority = priority;
                                }
                                DialogLeave();
                                ChatRoomCharacterUpdate(Player);
                                let msg = "Item priority changed.";
                                infomsg(msg);
                            }
                        }
                    }
                }, 5000);
            }
        }
    }])

    CommandCombine([{
        Tag: 'keydeposit',
        Description: "(hours): keeps your keys safe in the vault.",
        Action: (args) => {
            if (args === "") {
                let msg = "The keydeposit command must be followed by a number higher than 0.";
                infomsg(msg);
            } else {
                let hours = args;
                if (hours > 0) {
                    let msg = "" + tmpname + "'s keys are now safe in the vault for " + hours + " hours.";
                    publicmsg(msg);
                    CellDepositKeys(hours);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'killpar',
        Description: ": kills UBC/Moaner parameters saved locally.",
        Action: (args) => {
            if (args === "") {
                let msg = "<b>Warning</b>: This command will kill all UBC/Moaner parameters saved locally. Use it only if some parameters don't seem to work. Confirm by typing: <b>/killpar yes</b>";
                infomsg(msg);
            } else if (args === "yes") {
                M_MOANER_deleteControls();
                let msg = "All UBC/Moaner parameters have been deleted. Make a full logout/login then use the appropriate commands to set the parameters that you like.";
                infomsg(msg);
            }
        }
    }])

    CommandCombine([{
        Tag: 'layerset1',
        Description: "(layernumber) (colorcode) changes a layer color for worn item in saved Item Slot",
        Action: (args) => {
            if (args === "") {
                let msg = "First use the <b>/layershow1</b> command to click on worn item, get useful info about layer colors and save Item Slot.\n" +
                    "The layerset1 command must be followed by an layer number (-1 for all layers) and a color code in the format #000000 for the worn item in the previously saved Item Slot.\n" +
                    "If you enter a non-numeric layer, it will be interpreted as 0 (zero). If the entered color does not exist, you will go back to the default color.";
                infomsg(msg);
            } else {
                let stringLys1 = args;
                let stringLys2 = stringLys1.split(/[ ,]+/);
                let layer = stringLys2[0];
                let color = stringLys2[1];
                if (this.saveditemslot == undefined) {
                    let msg = "<b>Warning</b>: First use the <b>/layershow1</b> command to get useful info and save Item Slot.";
                    infomsg(msg);
                } else {
                    let Target = this.saveditemslot.slice(0);
                    if ((InventoryGet(Player, Target) != null) && (color.startsWith("#"))) {
                        let ak = 0;
                        if (InventoryGet(Player, Target).Asset.Archetype != undefined) {
                            let Archetype = InventoryGet(Player, Target).Asset.Archetype;
                            if (Archetype == "typed") ak = 1;
                            if (Archetype == "modular") ak = 2;
                        }
                        let Asset = InventoryGet(Player, Target).Asset;
                        if (!CommonIsNumeric(layer)) layer = 0;
                        if (layer < -1) layer = 0;
                        if (layer > Asset.Layer.length - 1) layer = 0;
                        if (ak < 2) {
                            if (layer == -1) {
                                for (let A = 0; A < Asset.Layer.length; A++)
                                    if (Asset.Layer[A].AllowColorize) {
                                        InventoryGet(Player, Target).Color[A] = color;
                                    }
                            } else {
                                InventoryGet(Player, Target).Color[layer] = color;
                            }
                        }
                        if (ak == 2) {
                            let ColorIndex = 0;
                            if (layer == -1) {
                                for (let A = 0; A < Asset.Layer.length; A++)
                                    ColorIndex = InventoryGet(Player, Target).Asset.Layer[A].ColorIndex;
                                InventoryGet(Player, Target).Color[ColorIndex] = color;
                            } else {
                                ColorIndex = InventoryGet(Player, Target).Asset.Layer[layer].ColorIndex;
                                InventoryGet(Player, Target).Color[ColorIndex] = color;
                            }
                        }
                        ChatRoomCharacterUpdate(Player);
                        let msg = "Layer color changed for layer " + layer + ".";
                        if (layer == -1) msg = "Layer color changed for all layers.";
                        infomsg(msg);
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'layerset2',
        Description: "(layernumber) (priority) changes a layer priority for worn item in saved Item Slot",
        Action: (args) => {
            if (args === "") {
                let msg = "First use the <b>/layershow2</b> command to click on worn item, get useful info about layer priorities and save Item Slot.\n" +
                    "The layerset2 command must be followed by a layer number and a priority number (between -99 and 99) for the worn item in the previously saved Item Slot.\n" +
                    "If you enter a non-numeric layer and/or priority, it will be interpreted as 0 (zero).";
                infomsg(msg);
            } else {
                let stringLys3 = args;
                let stringLys4 = stringLys3.split(/[ ,]+/);
                let layer = stringLys4[0];
                let priority = stringLys4[1] * 1;
                if (!CommonIsNumeric(priority)) priority = 0;
                if (priority > 99) priority = 99;
                if (priority < -99) priority = -99;
                if (this.saveditemslot == undefined) {
                    let msg = "<b>Warning</b>: First use the <b>/layershow2</b> command to get useful info and save Item Slot.";
                    infomsg(msg);
                } else {
                    let Target = this.saveditemslot.slice(0);
                    if (InventoryGet(Player, Target) != null) {
                        let ak = 0;
                        if (InventoryGet(Player, Target).Asset.Archetype != undefined) {
                            let Archetype = InventoryGet(Player, Target).Asset.Archetype;
                            if (Archetype == "typed") ak = 1;
                            if (Archetype == "modular") ak = 2;
                        }
                        let Asset = InventoryGet(Player, Target).Asset;
                        if (!CommonIsNumeric(layer)) layer = 0;
                        if (layer < 0) layer = 0;
                        if (layer > Asset.Layer.length - 1) layer = 0;
                        let Property = InventoryGet(Player, Target).Property;
                        let Name = "";
                        if (ak == 0) {
                            if (layer == 0) {
                                Name = InventoryGet(Player, Target).Asset.Name;
                            } else {
                                Name = Asset.Layer[layer].Name;
                            }
                            if (Property == undefined) {
                                Property = {};
                                let OverridePriority = {};
                                OverridePriority[Name] = priority;
                                Property.OverridePriority = OverridePriority;
                                InventoryGet(Player, Target).Property = Property;
                            } else if (Property.OverridePriority == undefined) {
                                let OverridePriority = {};
                                OverridePriority[Name] = priority;
                                Property.OverridePriority = OverridePriority;
                                InventoryGet(Player, Target).Property = Property;
                            } else {
                                Property.OverridePriority[Name] = priority;
                                InventoryGet(Player, Target).Property = Property;
                            }
                        }
                        if (ak == 1) {
                            if ((Asset.Layer.length == 1) || (Asset.Layer[layer].Name == null)) {
                                Name = InventoryGet(Player, Target).Asset.Name;
                            } else {
                                Name = Asset.Layer[layer].Name;
                            }
                            if (Property.OverridePriority == undefined) {
                                let OverridePriority = {};
                                OverridePriority[Name] = priority;
                                Property.OverridePriority = OverridePriority;
                                InventoryGet(Player, Target).Property = Property;
                            } else {
                                Property.OverridePriority[Name] = priority;
                                InventoryGet(Player, Target).Property = Property;
                            }
                        }
                        if (ak == 2) {
                            let Name1 = InventoryGet(Player, Target).Asset.Layer[layer].ColorGroup;
                            let Name2 = InventoryGet(Player, Target).Asset.Layer[layer].Name;
                            InventoryGet(Player, Target).Property.OverridePriority[Name2] = priority;
                        }
                        ChatRoomCharacterUpdate(Player);
                        let msg = "Layer priority changed for layer " + layer + ".";
                        infomsg(msg);
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'layershow1',
        Description: "gives info about layer colors of a specific worn item + saves Item Slot",
        Action: () => {
            let msg = "You have 5 seconds to click on yourself. If successful, you will get infos and the Item Slot will be saved. If not, retry.";
            infomsg(msg);
            setTimeout(function() {
                if ((CurrentCharacter != null) && (CurrentCharacter == Player)) {
                    let Target = "";
                    if (CurrentCharacter.FocusGroup.Name) {
                        Target = CurrentCharacter.FocusGroup.Name;
                        if (InventoryGet(Player, Target) != null) {
                            ChatRoomSendLocal("AssetGroup = " + Target);
                            Asset.Layer = InventoryGet(Player, Target).Asset.Layer;
                            let Name = "";
                            let Color2 = "";
                            let ak = 0;
                            if (InventoryGet(Player, Target).Asset.Archetype != undefined) {
                                let Archetype = InventoryGet(Player, Target).Asset.Archetype;
                                if (Archetype == "typed") ak = 1;
                                if (Archetype == "modular") ak = 2;
                            }
                            if (ak < 2) {
                                let ly = 0;
                                while (ly < Asset.Layer.length) {
                                    if ((Asset.Layer.length == 1) || (Asset.Layer[ly].Name == null)) {
                                        Name = InventoryGet(Player, Target).Asset.Name;
                                    } else {
                                        Name = Asset.Layer[ly].Name;
                                    }
                                    if (InventoryGet(Player, Target).Asset.Layer[ly].AllowColorize) {
                                        Color2 = InventoryGet(Player, Target).Color[ly];
                                    } else {
                                        Color2 = "No way to change color";
                                    }
                                    ChatRoomSendLocal("Layer " + ly + " = " + Name + " - " + Color2);
                                    ly++;
                                }
                            }
                            if (ak == 2) {
                                let ly = 0;
                                while (ly < Asset.Layer.length) {
                                    //if (InventoryGet(Player, Target).Asset.Layer[ly].ColorGroup != null) {
                                    let Name1 = InventoryGet(Player, Target).Asset.Layer[ly].ColorGroup;
                                    let Name2 = Asset.Layer[ly].Name;
                                    let Index = InventoryGet(Player, Target).Asset.Layer[ly].ColorIndex;
                                    Color2 = InventoryGet(Player, Target).Color[Index];
                                    ChatRoomSendLocal("Layer " + ly + " = " + Name1 + " - " + Name2 + " - " + Color2);
                                    //}
                                    ly++;
                                }
                            }
                            this.saveditemslot = Target;
                            let msg = "Item Slot saved.";
                            infomsg(msg);
                        }
                        DialogLeave();
                    }
                }
            }, 5000);
        }
    }])

    CommandCombine([{
        Tag: 'layershow2',
        Description: "gives info about layer priorities of a specific worn item + saves Item Slot",
        Action: () => {
            let msg = "You have 5 seconds to click on yourself. If successful, you will get infos and the Item Slot will be saved. If not, retry.";
            infomsg(msg);
            setTimeout(function() {
                if ((CurrentCharacter != null) && (CurrentCharacter == Player)) {
                    let Target = "";
                    if (CurrentCharacter.FocusGroup.Name) {
                        let Target = CurrentCharacter.FocusGroup.Name;
                        if (InventoryGet(Player, Target) != null) {
                            ChatRoomSendLocal("AssetGroup = " + Target);
                            let Name = "";
                            let Priority2 = 0;
                            let ak = 0;
                            if (InventoryGet(Player, Target).Asset.Archetype != undefined) {
                                let Archetype = InventoryGet(Player, Target).Asset.Archetype;
                                if (Archetype == "typed") ak = 1;
                                if (Archetype == "modular") ak = 2;
                            }
                            let Asset = InventoryGet(Player, Target).Asset;
                            let Property = InventoryGet(Player, Target).Property;
                            if (ak == 0) {
                                let Priority = "";
                                if (Asset.DrawingPriority != undefined) {
                                    Priority = InventoryGet(Player, Target).Asset.DrawingPriority;
                                } else {
                                    Priority = InventoryGet(Player, Target).Asset.Group.DrawingPriority;
                                }
                                let ly = 0;
                                while (ly < Asset.Layer.length) {
                                    if (ly == 0) {
                                        Name = InventoryGet(Player, Target).Asset.Name;
                                    } else {
                                        Name = Asset.Layer[ly].Name;
                                    }
                                    if ((Property == undefined) || (Property.OverridePriority == undefined)) {
                                        Priority2 = Priority;
                                    } else {
                                        let layerPriority = Property.OverridePriority[Name];
                                        if (layerPriority == null) {
                                            Priority2 = Priority;
                                        } else {
                                            Priority2 = layerPriority;
                                        }
                                    }
                                    ChatRoomSendLocal("Layer " + ly + " = " + Name + " - " + Priority2);
                                    ly++;
                                }
                            }
                            if (ak == 1) {
                                let Priority = "";
                                if (Asset.DrawingPriority != undefined) {
                                    Priority = InventoryGet(Player, Target).Asset.DrawingPriority;
                                } else {
                                    Priority = InventoryGet(Player, Target).Asset.Group.DrawingPriority;
                                }
                                let ly = 0;
                                while (ly < Asset.Layer.length) {
                                    if ((Asset.Layer.length == 1) || (Asset.Layer[ly].Name == null)) {
                                        Name = InventoryGet(Player, Target).Asset.Name;
                                    } else {
                                        Name = Asset.Layer[ly].Name;
                                    }
                                    if (InventoryGet(Player, Target).Property == undefined) {
                                        Priority2 = InventoryGet(Player, Target).Asset.Layer[ly].Priority;
                                    } else {
                                        let layerPriority = Property.OverridePriority?.[Name] ?? Priority;
                                        if (layerPriority == null) {
                                            Priority2 = InventoryGet(Player, Target).Asset.Layer[ly].Priority;
                                        } else {
                                            Priority2 = layerPriority;
                                        }
                                    }
                                    ChatRoomSendLocal("Layer " + ly + " = " + Name + " - " + Priority2);
                                    ly++;
                                }
                            }
                            if (ak == 2) {
                                let ly = 0;
                                while (ly < Asset.Layer.length) {
                                    //if (InventoryGet(Player, Target).Asset.Layer[ly].ColorGroup != null) {
                                    let Name1 = InventoryGet(Player, Target).Asset.Layer[ly].ColorGroup;
                                    let Name2 = Asset.Layer[ly].Name;
                                    let Priority = Asset.Layer[ly].Priority;
                                    let layerPriority = Property.OverridePriority?.[Name2] ?? Priority;
                                    if (layerPriority == null) {
                                        Priority2 = Priority;
                                    } else {
                                        Priority2 = layerPriority;
                                    }
                                    ChatRoomSendLocal("Layer " + ly + " = " + Name1 + " - " + Name2 + " - " + Priority2);
                                    //}
                                    ly++;
                                }
                            }
                            this.saveditemslot = Target;
                            let msg = "Item Slot saved.";
                            infomsg(msg);
                        }
                        DialogLeave();
                    }
                }
            }, 5000);
        }
    }])

    CommandCombine([{
        Tag: 'lock',
        Description: "(target) (locktype) (other parameters): adds locks to all lockable items on specified target.",
        Action: (args) => {
            if (args === "") {
                let msg = "The lock command has several syntaxes:\n" +
                    "/lock (target) (locktype) for locks 1 to 8, 17, 19 to 22\n" +
                    "/lock (target) (locktype) (r) for lock 9\n" +
                    "/lock (target) (locktype) (code) for lock 10\n" +
                    "/lock (target) (locktype) (password) (r) for locks 11 and 12\n" +
                    "/lock (target) (locktype) (minutes) (h) (i) (r) - locks 13 to 15, 18\n" +
                    "/lock (target) (locktype) (password) (minutes) (h) (i) (r) - lock 16\n" +
                    "ALWAYS SPECIFY THE TARGET. Lock types:\n" +
                    "1 Metal (default when not specified) - 2 Exclusive\n" +
                    "3 Intricate - 4 High Security - 5 Pandora\n" +
                    "6 Mistress - 7 Lover - 8 Owner - 9 Five Minutes\n" +
                    "10 Combination - 11 Safeword - 12 Password\n" +
                    "13 Mistress Timer - 14 Lover Timer - 15 Owner Timer\n" +
                    "16 Timer Password - 17 Best Friend - 18 BF Timer\n" +
                    "19 Family - 20 Lewd Crest - 21 Devious (if enabled)\n" +
                    "22 Portal Link (only for specific item)\n" +
                    "Locks 17, 18, 20 and 21 require a specific mod\n" +
                    "Use <b>/lock par</b> for info about other parameters";
                infomsg(msg);
            } else if (args === "par") {
                let msg = "Special parameters of lock command:\n" +
                    "code must be between 0 and 9999.\n" +
                    "password is limited to 8 characters.\n" +
                    "maximum time = 240 minutes for locks 13 and 16,\n" +
                    "10080 minutes for locks 14, 15 and 18\n" +
                    "Use ? if you want a time randomly choosen by the game\n" +
                    "Use the portal options to set the code of Portal Link lock\n" +
                    " \n" +
                    "Optional parameters:\n" +
                    "h to hide the timer,\n" +
                    "i to enable time input from other players,\n" +
                    "r for item removal when correct password entered\n" +
                    "or lock timer runs out.\n" +
                    " \n" +
                    "Tip: replace h and/or i by another character when you need to skip them.";
                infomsg(msg);
            } else {
                let code = 0;
                let dogs = 1;
                let enableinput = "";
                let hidetimer = "";
                let minutes = 0;
                let PS = "";
                let pw = "";
                let removeitem = "";
                let silent = 0;
                let time = 0;
                let uw = 0;
                let stringLock1 = args;
                let stringLock2 = stringLock1.split(/[ ,]+/);
                let lk = stringLock2[1];
                if (!CommonIsNumeric(lk)) lk = 1;
                if ((lk < 1) || (lk > 22)) lk = 1;
                let Lock = locks[lk];
                if (lk == 9) removeitem = stringLock2[2];
                if (lk == 10) code = stringLock2[2];
                if (lk == 11) pw = "PLEASE";
                if ((lk == 11) || (lk == 12)) removeitem = stringLock2[3];
                if ((lk == 12) || (lk == 16)) pw = "PASSWORD";
                if ((lk == 11) || (lk == 12) || (lk == 16)) {
                    PS = /^[A-Z]+$/;
                    if (stringLock2[2] != null) pw = stringLock2[2].toUpperCase();
                }
                if ((lk == 13) || (lk == 14) || (lk == 15)) {
                    let maxtime = 240;
                    if (lk != 13) maxtime = 10080;
                    minutes = 5;
                    if ((!CommonIsNumeric(stringLock2[2])) && (stringLock2[2] == "?")) {
                        const Result = [];
                        let Roll = Math.floor(Math.random() * maxtime);
                        Result.push(Roll);
                        if (Result < 5) Result = 5;
                        minutes = Result;
                    }
                    if (CommonIsNumeric(stringLock2[2])) {
                        minutes = stringLock2[2];
                        if (minutes < 5) minutes = 5;
                        if (minutes > maxtime) minutes = maxtime;
                    }
                    time = (minutes - 5);
                    if (time < 1) time = 1;
                    hidetimer = stringLock2[3];
                    enableinput = stringLock2[4];
                    removeitem = stringLock2[5];
                }
                if (lk == 16) {
                    let maxtime = 240;
                    minutes = 5;
                    if ((!CommonIsNumeric(stringLock2[3])) && (stringLock2[3] == "?")) {
                        const Result = [];
                        let Roll = Math.floor(Math.random() * maxtime);
                        Result.push(Roll);
                        if (Result < 5) Result = 5;
                        minutes = Result;
                    }
                    if (CommonIsNumeric(stringLock2[3])) {
                        minutes = stringLock2[3];
                        if (minutes < 5) minutes = 5;
                        if (minutes > maxtime) minutes = maxtime;
                    }
                    time = (minutes - 5);
                    if (time < 1) time = 1;
                    hidetimer = stringLock2[4];
                    enableinput = stringLock2[5];
                    removeitem = stringLock2[6];
                }
                if (lk == 18) {
                    let maxtime = 10080;
                    minutes = 5;
                    if ((!CommonIsNumeric(stringLock2[2])) && (stringLock2[2] == "?")) {
                        const Result = [];
                        let Roll = Math.floor(Math.random() * maxtime);
                        Result.push(Roll);
                        if (Result < 1) Result = 1;
                        minutes = Result;
                    }
                    if (CommonIsNumeric(stringLock2[2])) {
                        minutes = stringLock2[2];
                        if (minutes < 5) minutes = 5;
                        if (minutes > maxtime) minutes = maxtime;
                    }
                    time = (minutes + 5);
                    hidetimer = stringLock2[3];
                    enableinput = stringLock2[4];
                    removeitem = stringLock2[5];
                }
                if (lk != 21) dogs = 0;
                let targetname = stringLock2[0];
                let target = TargetSearch(targetname);
                if ((target != null) && (lk == 21)) {
                    if (target == Player) {
                        if (Player.ExtensionSettings.DOGS != null) {
                            let str = Player.ExtensionSettings.DOGS;
                            let d = LZString.decompressFromBase64(str);
                            let DOGSdata = {};
                            let decoded = JSON.parse(d);
                            DOGSdata = decoded;
                            if (DOGSdata.deviousPadlock.state == true) dogs = 0;
                        }
                    } else {
                        if (target.DOGS != null) {
                            if (target.DOGS.deviousPadlock != undefined) {
                                if (target.DOGS.deviousPadlock.state == true) dogs = 0;
                            }
                        }
                    }
                }
                if ((target != null) && ((target == Player) || (target.AllowItem == true)) && (target.OnlineSharedSettings.UBC != undefined)) {
                    tgpname = getNickname(target);
                    if (dogs == 0) {
                        if (tmpname == tgpname) {
                            let msg = "Magical lasers make appear locks on " + tgpname + "'s body.";
                            if (Mlock != undefined) {
                                if (Mlock != "") {
                                    msg = tmpname + ' '.repeat(1) + Mlock;
                                    if (Mlock.startsWith("\u0027")) msg = tmpname + Mlock;
                                }
                            }
                            if (Mlock == "no message") silent = 1;
                            if (silent == 0) publicmsg(msg);
                        } else {
                            if (IsTargetProtected(target)) {
                                uw = 1;
                                let msg = umsg1 + tgpname + umsg2;
                                infomsg(msg);
                            } else {
                                let msg = "Magical lasers make appear locks on " + tgpname + "'s body.";
                                if (Tlock != undefined) {
                                    if (Tlock != "") {
                                        msg = tmpname + ' '.repeat(1) + Tlock + ' '.repeat(1) + tgpname;
                                        if (Tlock.startsWith("\u0027")) msg = tmpname + Tlock + ' '.repeat(1) + tgpname;
                                    }
                                }
                                if (Tlock == "no message") silent = 1;
                                if (silent == 0) publicmsg(msg);
                            }
                        }
                        if (uw == 0) {
                            let mn = Player.MemberNumber;
                            for (let A = 0; A < target.Appearance.length; A++)
                                if (target.Appearance[A].Asset.AllowLock == true) {
                                    if (((target.Appearance[A].Property != null) && (target.Appearance[A].Property.LockedBy == null)) || (target.Appearance[A].Property == null)) {
                                        InventoryLock(target, target.Appearance[A], Lock, mn);
                                        if (removeitem == "r") {
                                            target.Appearance[A].Property.RemoveOnUnlock = true;
                                            target.Appearance[A].Property.RemoveItem = true;
                                        }
                                        if (minutes != null) {
                                            if (lk == 18) {
                                                target.Appearance[A].Property.MaxTime = 604800;
                                                target.Appearance[A].Property.RemovalTime = Math.round(CurrentTime + time * 60 * 100);
                                            } else {
                                                target.Appearance[A].Property.RemoveTimer = target.Appearance[A].Property.RemoveTimer + (time * 60 * 1000);
                                            }
                                        }
                                        if (hidetimer == "h") target.Appearance[A].Property.ShowTimer = false;
                                        if (enableinput == "i") target.Appearance[A].Property.EnableRandomInput = true;
                                        if ((lk == 10) && (code != null) && (code > -1) && (code < 10000)) target.Appearance[A].Property.CombinationNumber = code;
                                        if (((lk == 11) || (lk == 12) || (lk == 16)) && (pw != null) && (pw.length <= 8) && (pw.match(PS))) target.Appearance[A].Property.Password = pw;
                                        if ((lk == 17) || (lk == 18)) {
                                            target.Appearance[A].Property.LockedBy = "HighSecurityPadlock";
                                            target.Appearance[A].Property.LockPickSeed = "8,3,5,10,4,2,6,7,1,9,0,11";
                                            let listOwnerLovers = new Set();
                                            if (target.Ownership && target.Ownership.MemberNumber != null) listOwnerLovers.add(target.Ownership.MemberNumber);
                                            if (target.Lovership) {
                                                for (let L = 0; L < target.Lovership.length; L++) {
                                                    const lover = target.Lovership[L];
                                                    if (lover.MemberNumber != null) listOwnerLovers.add(target.Lovership[L].MemberNumber);
                                                }
                                            }
                                            target.Appearance[A].Property.MemberNumberListKeys = "-1," + Array.from(listOwnerLovers).join(",");
                                        }
                                        if (lk == 17) target.Appearance[A].Property.Name = "Best Friend Padlock";
                                        if (lk == 18) target.Appearance[A].Property.Name = "Best Friend Timer Padlock";
                                        if (lk == 20) target.Appearance[A].Property.LockedBy = "\u{6DEB}\u{7EB9}\u{9501}_Luzi_Padlock";
                                        if (lk == 21) {
                                            target.Appearance[A].Property.LockedBy = "ExclusivePadlock";
                                            target.Appearance[A].Property.Name = "DeviousPadlock";
                                        }
                                    }
                                }
                        }
                        ChatRoomCharacterUpdate(target);
                    }
                }
                ChatRoomSetTarget(-1);
            }
        }
    }])

    CommandCombine([{
        Tag: 'login',
        Description: "(accountname) (password): logs in a new account.",
        Action: (args) => {
            if (args === "") {
                let msg = "The login command must be followed by an account name and a password";
                infomsg(msg);
            } else {
                let stringLogin1 = args;
                let stringLogin2 = stringLogin1.split(/[ ,]+/);
                this.LoginName = SpeechTransformGagGarble(stringLogin2[0], 6);
                this.LoginPassword = SpeechTransformGagGarble(stringLogin2[1], 6);
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
            if (IsMapRoom() == false) {
                let msg = umsg5;
                infomsg(msg);
            } else {
                if ((ChatRoomData.MapData.Fog == true || ChatRoomData.MapData.Fog == undefined)) {
                    ChatRoomData.MapData.Fog = false;
                    let msg = "Fog in current mapped room is disabled. No visible effect if you have enabled full vision and hearing in mapped rooms.";
                    infomsg(msg);
                } else {
                    ChatRoomData.MapData.Fog = true;
                    let msg = "Fog in current mapped room is enabled. No visible effect if you have enabled full vision and hearing in mapped rooms.";
                    infomsg(msg);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'mapkeys',
        Description: ": gives all keys for current mapped chat room.",
        Action: () => {
            if (IsMapRoom() == false) {
                let msg = umsg5;
                infomsg(msg);
            } else {
                if (Player.MapData == undefined) {
                    let msg = "You don't have entered the map.";
                    infomsg(msg);
                } else {
                    Player.MapData.PrivateState.HasKeyGold = true;
                    Player.MapData.PrivateState.HasKeySilver = true;
                    Player.MapData.PrivateState.HasKeyBronze = true;
                    let msg = "You have now the three keys.";
                    infomsg(msg);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'maproom',
        Description: ": gives infos about location of players in current mapped chat room.",
        Action: () => {
            if (IsMapRoom() == false) {
                let msg = umsg5 + umsg6;
                infomsg(msg);
            } else {
                let pl = 0;
                while (pl < ChatRoomCharacter.length) {
                    let name = "";
                    let aka = "";
                    if ((ChatRoomCharacter[pl].Nickname == '') || (ChatRoomCharacter[pl].Nickname == undefined)) {
                        name = ChatRoomCharacter[pl].Name;
                    } else {
                        name = ChatRoomCharacter[pl].Nickname;
                        aka = ChatRoomCharacter[pl].Name;
                    }
                    let number = ChatRoomCharacter[pl].MemberNumber;
                    ChatRoomSendLocal(name + " (" + aka + ") - " + number);
                    let ubc1 = "Does not use ULTRAbc.";
                    let ubc2 = "Does not use Uwall.";
                    if (ChatRoomCharacter[pl].OnlineSharedSettings.UBC != undefined) {
                        if ((ChatRoomCharacter[pl].OnlineSharedSettings.UBC == UBCver) || (ChatRoomCharacter[pl].OnlineSharedSettings.UBC == UBCver0)) {
                            ubc1 = "Is an ULTRAbc user.";
                            if (ChatRoomCharacter[pl].OnlineSharedSettings.Unoescape != undefined) {
                                if (ChatRoomCharacter[pl].OnlineSharedSettings.Unoescape == true) ubc1 = "UBC in no-escape mode";
                            }
                        }
                    }
                    if (ChatRoomCharacter[pl].OnlineSharedSettings.Uwall != undefined) {
                        if (ChatRoomCharacter[pl].OnlineSharedSettings.Uwall == true) {
                            ubc2 = "Has enabled Uwall.";
                        } else {
                            ubc2 = "Has disabled Uwall.";
                        }
                    }
                    ChatRoomSendLocal(ubc1 + " - " + ubc2);
                    if (ChatRoomCharacter[pl].MapData != undefined) {
                        let exinfo = "";
                        if (ChatRoomData.MapData.Type == "Always") exinfo = "Real presence in map: YES";
                        if (ChatRoomData.MapData.Type == "Hybrid") {
                            if (ChatRoomCharacter[pl].OnlineSharedSettings.Inmap != undefined) {
                                if (ChatRoomCharacter[pl].OnlineSharedSettings.Inmap == true) {
                                    exinfo = "Real presence in map: YES";
                                } else {
                                    exinfo = "Real presence in map: NO";
                                }
                            } else {
                                exinfo = "Real presence in map: ?";
                            }
                        }
                        ChatRoomSendLocal("X = " + ChatRoomCharacter[pl].MapData.Pos.X + " - Y = " + ChatRoomCharacter[pl].MapData.Pos.Y + " - " + exinfo);
                        let key1 = "";
                        let key2 = "";
                        let key3 = "";
                        if (ChatRoomCharacter[pl] == Player) {
                            if (Player.MapData.PrivateState.HasKeyGold) key1 = "Gold";
                            if (Player.MapData.PrivateState.HasKeySilver) key2 = "Silver";
                            if (Player.MapData.PrivateState.HasKeyBronze) key3 = "Bronze";
                            ChatRoomSendLocal("Keys found: " + key1 + " - " + key2 + " - " + key3 + ".");
                        }
                    } else {
                        ChatRoomSendLocal("Does not have entered map");
                    }
                    ChatRoomSendLocal(" ");
                    pl++;
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'mapx',
        Description: "(x-position): changes your X coordinate in the map.",
        Action: (args) => {
            if (args === "") {
                let msg = "The mapx command must be followed by a number between 0 and 39.";
                infomsg(msg);
            } else {
                if (IsMapRoom() == false) {
                    let msg = umsg5;
                    infomsg(msg);
                } else {
                    if (Player.MapData != undefined) {
                        let plx = args;
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
                            ServerAccountUpdate.QueueData({
                                MapData: Player.MapData
                            }, true);
                        } 
                    } else {
                        ChatRoomSendLocal("Does not have entered map");
                        ChatRoomSendLocal(" ");
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
                let msg = "The mapx command must be followed by a number between 0 and 39.";
                infomsg(msg);
            } else {
                if (IsMapRoom() == false) {
                    let msg = umsg5;
                    infomsg(msg);
                } else {
                    if (Player.MapData != undefined) {
                        let ply = args;
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
                            ServerAccountUpdate.QueueData({
                                MapData: Player.MapData
                            }, true);
                        } 
                    } else {
                        ChatRoomSendLocal("Does not have entered map");
                        ChatRoomSendLocal(" ");
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'mapz',
        Description: "(target): gives coordinates in the map.",
        Action: (args) => {
            if (IsMapRoom() == false) {
                let msg = umsg5;
                infomsg(msg);
            } else {
                let target = Player;
                if (args != "") target = TargetSearch(args);
                if (target != null) {
                    if (target.MapData != undefined) {
                        let exinfo = "";
                        if (ChatRoomData.MapData.Type == "Always") exinfo = "Real presence in map: YES";
                        if (ChatRoomData.MapData.Type == "Hybrid") {
                            if (target.OnlineSharedSettings.Inmap != undefined) {
                                if (target.OnlineSharedSettings.Inmap == true) {
                                    exinfo = "Real presence in map: YES";
                                } else {
                                    exinfo = "Real presence in map: NO";
                                }
                            } else {
                                exinfo = "Real presence in map: ?";
                            }
                        }
                        ChatRoomSendLocal("X = " + target.MapData.Pos.X + " - Y = " + target.MapData.Pos.Y + " - " + exinfo);
                        let key1 = "";
                        let key2 = "";
                        let key3 = "";
                        if (target == Player) {
                            if (Player.MapData.PrivateState.HasKeyGold) key1 = "Gold";
                            if (Player.MapData.PrivateState.HasKeySilver) key2 = "Silver";
                            if (Player.MapData.PrivateState.HasKeyBronze) key3 = "Bronze";
                            ChatRoomSendLocal("Keys found: " + key1 + " - " + key2 + " - " + key3 + ".");
                        }
                        ChatRoomSendLocal(" ");
                    } else {
                        ChatRoomSendLocal("Does not have entered map");
                        ChatRoomSendLocal(" ");
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'mapzoom',
        Description: "(value): changes zoom level in the map rooms.",
        Action: (args) => {
            if (args === "") {
                let msg = "The mapzoom command must be followed by a number between 7 and 50.";
                infomsg(msg);
            } else {
                if (IsMapRoom() == false) {
                    let msg = umsg5;
                    infomsg(msg);
                } else {
                    let zoom = args;
                    if ((zoom > 6) && (zoom < 51)) {
                        ChatRoomMapViewPerceptionRangeMax = zoom;
                        let msg = "Zoom level modified! Enjoy!";
                        infomsg(msg);
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
            let msg = "A few things have to be set manually. See the /roleplay and /rolequit commands";
            infomsg(msg);
        }
    }])

    CommandCombine([{
        Tag: 'mbsroom',
        Description: ": gives infos about MBS wheels of fortune in current chat room.",
        Action: () => {
            let pl = 0;
            while (pl < ChatRoomCharacter.length) {
                let name = "";
                let aka = "";
                if ((ChatRoomCharacter[pl].Nickname == '') || (ChatRoomCharacter[pl].Nickname == undefined)) {
                    name = ChatRoomCharacter[pl].Name;
                } else {
                    name = ChatRoomCharacter[pl].Nickname;
                    aka = ChatRoomCharacter[pl].Name;
                }
                let number = ChatRoomCharacter[pl].MemberNumber;
                ChatRoomSendLocal(name + " (" + aka + ") - " + number);
                let ubc1 = "Does not use ULTRAbc.";
                let ubc2 = "Does not use Uwall.";
                if (ChatRoomCharacter[pl].OnlineSharedSettings.UBC != undefined) {
                    if ((ChatRoomCharacter[pl].OnlineSharedSettings.UBC == UBCver) || (ChatRoomCharacter[pl].OnlineSharedSettings.UBC == UBCver0)) {
                        ubc1 = "Is an ULTRAbc user.";
                        if (ChatRoomCharacter[pl].OnlineSharedSettings.Unoescape != undefined) {
                            if (ChatRoomCharacter[pl].OnlineSharedSettings.Unoescape == true) ubc1 = "UBC in no-escape mode";
                        }
                    }
                }
                if (ChatRoomCharacter[pl].OnlineSharedSettings.Uwall != undefined) {
                    if (ChatRoomCharacter[pl].OnlineSharedSettings.Uwall == true) {
                        ubc2 = "Has enabled Uwall.";
                    } else {
                        ubc2 = "Has disabled Uwall.";
                    }
                }
                ChatRoomSendLocal(ubc1 + " - " + ubc2);
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
                            let d = "";
                            let str = ChatRoomCharacter[pl].OnlineSharedSettings.MBS;
                            let stringMBSver1 = ChatRoomCharacter[pl].OnlineSharedSettings.MBSVersion;
                            let stringMBSver2 = stringMBSver1.split(".");
                            let MBS1 = stringMBSver2[0];
                            let MBS2 = stringMBSver2[1];
                            let MBS3 = stringMBSver2[2];
                            if ((MBS1 == 0) && (MBS2 <= 6) && (MBS3 <= 22)) {
                                d = LZString.decompressFromBase64(str);
                            } else {
                                d = LZString.decompressFromUTF16(str);
                            }
                            let MBSwhdata = {};
                            let decoded = JSON.parse(d);
                            MBSwhdata = decoded;
                            let j = 0;
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
                pl++;
            }
        }
    }])

    CommandCombine([{
        Tag: 'message',
        Description: "(option) (message): creates custom message for a specific command.",
        Action: (_, command, args) => {
            if (silent) {
                let msg = umsg1 + umsg7;
                infomsg(msg);
            } else {
                var [option] = args;
                if (!option) {
                    let msg = "The message command must be followed by a command and the message you want instead of the default message.\n" +
                        "Options on yourself: clothes, invisible, lock, naked, pet, randomize, restrain, solidity, totalrelease, underwear, unlock, untie, visible\n" +
                        "Options on other players: tclothes, tinvisible, tlock, tnaked, tpet, trandomize, trestrain, tsolidity, ttotalrelease, tunderwear, tunlock, tuntie, tvisible\n" +
                        " \n" +
                        "When writing your message, don't forget that your name or nickname will be added before it\n" +
                        "When acting on another player, the target name or nickname will be added after the message\n" +
                        "Use ? as message to go back to default message\n" +
                        "Use ! as message to select silent mode (no message)";
                    infomsg(msg);
                } else {
                    let [, , ...message] = command.split(" ");
                    let custom = message?.join(" ");
                    if (custom != "") {
                        let option2 = "";
                        if ((option.startsWith("t")) && (option != "totalrelease")) option2 = option.slice(1);
                        let msg1 = "<p style='background-color:#5fbd7a'>ULTRAbc: Silent mode saved for " + option + " command on yourself.</p>";
                        let msg2 = "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for " + option + " command on yourself.</p>"
                        let msg3 = "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for " + option + " command on yourself.</p>"
                        let msg4 = "<p style='background-color:#5fbd7a'>ULTRAbc: Silent mode saved for " + option2 + " command on other players.</p>";
                        let msg5 = "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for " + option2 + " command on other players.</p>";
                        let msg6 = "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for " + option2 + " command on other players.</p>";
                        if (option == "clothes") {
                            if (custom == "!") {
                                Clothes = "no message";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg1);
                            } else if (custom == "?") {
                                Clothes = "";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg2);
                            } else {
                                Clothes = custom;
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg3);
                            }
                        }
                        if (option == "invisible") {
                            if (custom == "!") {
                                Invisible = "no message";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg1);
                            } else if (custom == "?") {
                                Invisible = "";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg2);
                            } else {
                                Invisible = custom;
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg3);
                            }
                        }
                        if (option == "lock") {
                            if (custom == "!") {
                                Mlock = "no message";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg1);
                            } else if (custom == "?") {
                                Mlock = "";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg2);
                            } else {
                                Mlock = custom;
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg3);
                            }
                        }
                        if (option == "naked") {
                            if (custom == "!") {
                                Naked = "no message";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg1);
                            } else if (custom == "?") {
                                Naked = "";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg2);
                            } else {
                                Naked = custom;
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg3);
                            }
                        }
                        if (option == "pet") {
                            if (custom == "!") {
                                Pet = "no message";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg1);
                            } else if (custom == "?") {
                                Pet = "";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg2);
                            } else {
                                Pet = custom;
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg3);
                            }
                        }
                        if (option == "randomize") {
                            if (custom == "!") {
                                Randomize = "no message";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg1);
                            } else if (custom == "?") {
                                Randomize = "";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg2);
                            } else {
                                Randomize = custom;
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg3);
                            }
                        }
                        if (option == "restrain") {
                            if (custom == "!") {
                                Restrain = "no message";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg1);
                            } else if (custom == "?") {
                                Restrain = "";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg2);
                            } else {
                                Restrain = custom;
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg3);
                            }
                        }
                        if (option == "solidity") {
                            if (custom == "!") {
                                Solidity = "no message";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg1);
                            } else if (custom == "?") {
                                Solidity = "";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg2);
                            } else {
                                Solidity = custom;
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg3);
                            }
                        }
                        if (option == "tclothes") {
                            if (custom == "!") {
                                Tclothes = "no message";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg4);
                            } else if (custom == "?") {
                                Tclothes = "";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg5);
                            } else {
                                Tclothes = custom;
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg6);
                            }
                        }
                        if (option == "tinvisible") {
                            if (custom == "!") {
                                Tinvisible = "no message";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg4);
                            } else if (custom == "?") {
                                Tinvisible = "";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg5);
                            } else {
                                Tinvisible = custom;
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg6);
                            }
                        }
                        if (option == "tlock") {
                            if (custom == "!") {
                                Tlock = "no message";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg4);
                            } else if (custom == "?") {
                                Tlock = "";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg5);
                            } else {
                                Tlock = custom;
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg6);
                            }
                        }
                        if (option == "tnaked") {
                            if (custom == "!") {
                                Tnaked = "no message";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg4);
                            } else if (custom == "?") {
                                Tnaked = "";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg5);
                            } else {
                                Tnaked = custom;
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg6);
                            }
                        }
                        if (option == "totalrelease") {
                            if (custom == "!") {
                                Totalrelease = "no message";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg1);
                            } else if (custom == "?") {
                                Totalrelease = "";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg2);
                            } else {
                                Totalrelease = custom;
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg3);
                            }
                        }
                        if (option == "tpet") {
                            if (custom == "!") {
                                Tpet = "no message";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg4);
                            } else if (custom == "?") {
                                Tpet = "";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg5);
                            } else {
                                Tpet = custom;
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg6);
                            }
                        }
                        if (option == "trandomize") {
                            if (custom == "!") {
                                Trandomize = "no message";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg4);
                            } else if (custom == "?") {
                                Trandomize = "";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg5);
                            } else {
                                Trandomize = custom;
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg6);
                            }
                        }
                        if (option == "trestrain") {
                            if (custom == "!") {
                                Trestrain = "no message";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg4);
                            } else if (custom == "?") {
                                Trestrain = "";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg5);
                            } else {
                                Trestrain = custom;
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg6);
                            }
                        }
                        if (option == "tsolidity") {
                            if (custom == "!") {
                                Tsolidity = "no message";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg4);
                            } else if (custom == "?") {
                                Tsolidity = "";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg5);
                            } else {
                                Tsolidity = custom;
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg6);
                            }
                        }
                        if (option == "ttotalrelease") {
                            if (custom == "!") {
                                Ttotalrelease = "no message";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg4);
                            } else if (custom == "?") {
                                Ttotalrelease = "";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg5);
                            } else {
                                Ttotalrelease = custom;
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg6);
                            }
                        }
                        if (option == "tunderwear") {
                            if (custom == "!") {
                                Tunderwear = "no message";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg4);
                            } else if (custom == "?") {
                                Tunderwear = "";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg5);
                            } else {
                                Tunderwear = custom;
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg6);
                            }
                        }
                        if (option == "tunlock") {
                            if (custom == "!") {
                                Tunlock = "no message";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg4);
                            } else if (custom == "?") {
                                Tunlock = "";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg5);
                            } else {
                                Tunlock = custom;
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg6);
                            }
                        }
                        if (option == "tuntie") {
                            if (custom == "!") {
                                Tuntie = "no message";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg4);
                            } else if (custom == "?") {
                                Tuntie = "";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg5);
                            } else {
                                Tuntie = custom;
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg6);
                            }
                        }
                        if (option == "tvisible") {
                            if (custom == "!") {
                                Tvisible = "no message";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg4);
                            } else if (custom == "?") {
                                Tvisible = "";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg5);
                            } else {
                                Tvisible = custom;
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg6);
                            }
                        }
                        if (option == "underwear") {
                            if (custom == "!") {
                                Underwear = "no message";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg1);
                            } else if (custom == "?") {
                                Underwear = "";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg2);
                            } else {
                                Underwear = custom;
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg3);
                            }
                        }
                        if (option == "unlock") {
                            if (custom == "!") {
                                Unlock = "no message";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg1);
                            } else if (custom == "?") {
                                Unlock = "";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg2);
                            } else {
                                Unlock = custom;
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg3);
                            }
                        }
                        if (option == "untie") {
                            if (custom == "!") {
                                Untie = "no message";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg1);
                            } else if (custom == "?") {
                                Untie = "";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg2);
                            } else {
                                Untie = custom;
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg3);
                            }
                        }
                        if (option == "visible") {
                            if (custom == "!") {
                                Visible = "no message";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg1);
                            } else if (custom == "?") {
                                Visible = "";
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg2);
                            } else {
                                Visible = custom;
                                M_MOANER_saveControls();
                                ChatRoomSendLocal(msg3);
                            }
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
                let msg = "The mission command must include a mission.\n" +
                    "Available missions:\n" +
                    "burglar, kidnap, rescue, retrieve, sabotage.\n" +
                    "Full random mission with random.";
                infomsg(msg);
            } else {
                let mission = args;
                if (mission == "random") InfiltrationMissionType = ["Rescue", "Kidnap", "Retrieve", "CatBurglar", "ReverseMaid"];
                if (mission == "burglar") InfiltrationMissionType = ["CatBurglar"];
                if (mission == "kidnap") InfiltrationMissionType = ["Kidnap"];
                if (mission == "rescue") InfiltrationMissionType = ["Rescue"];
                if (mission == "retrieve") InfiltrationMissionType = ["Retrieve"];
                if (mission == "sabotage") InfiltrationMissionType = ["ReverseMaid"];
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
        Tag: 'mstatus',
        Description: ": displays current status of the moaner.",
        Action: () => {
            showStatus();
        }
    }])

    CommandCombine([{
        Tag: 'murmur',
        Description: "(MemberNumber|Name|Nickname)(Message): sends a whisper to a player.",
        Action: (args, command) => {
            const [, ...parts] = command.split(" ");
            const target = parts?.shift();
            const message = parts?.join(" ");
            if (!target) {
                if (ChatRoomTargetMemberNumber >= 0) {
                    ChatRoomSetTarget(-1);
                    ChatRoomSendLocal(`${TextGet("CommandWhisperStopSuccess")}`);
                } else {
                    ChatRoomSendLocal(`${TextGet("CommandNoWhisperTargetSelected")}`);
                }
                return;
            }
            const matchingMembers = ChatRoomCharacter.filter((C) => {
                const memberNumber = parseInt(target);
                return (
                    !C.IsPlayer() &&
                    (
                        C.MemberNumber == memberNumber ||
                        C.Nickname?.toLowerCase() == target.toLowerCase() ||
                        C.Name.toLowerCase() == target.toLowerCase()
                    )
                );
            });
            if (!matchingMembers.length) {
                ChatRoomSendLocal(`${TextGet("CommandNoWhisperTarget")} ${target}.`);
            } else if (matchingMembers.length > 1) {
                const mappedMembers = matchingMembers
                    .map((C) => `&emsp;• <strong style="cursor: pointer;" onclick='window.CommandSet("whisper ${C.MemberNumber}")'>${CharacterNickname(C)} (${C.MemberNumber})</strong>`)
                    .join("<br>") + "<br>";
                const Targets = `<br>${mappedMembers}`;
                ChatRoomSendLocal(`${TextGet("CommandMultipleWhisperTargets").replace("$Targets", Targets)}`);
            } else if (matchingMembers.length == 1 && !message) {
                ChatRoomSendLocal(`${TextGet("CommandWhisperTargetSuccess")} ${CharacterNickname(matchingMembers[0])} (${matchingMembers[0].MemberNumber})`);
                ChatRoomSetTarget(matchingMembers[0].MemberNumber);
            } else {
                const targetMember = matchingMembers[0];
                const status = ChatRoomSendWhisper(targetMember.MemberNumber, message);
                if (status === "target-gone") {
                    ChatRoomSendLocal(`<span style="color: red">${TextGet("WhisperTargetGone")}</span>`);
                    return;
                } else if (status === "target-out-of-range") {
                    ChatRoomSendLocal(`<span style="color: red">${TextGet("WhisperTargetOutOfRange")}</span>`);
                    return;
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'naked',
        Description: "(target): removes clothes.",
        Action: (args) => {
            let target = Player;
            if (args != "") target = TargetSearch(args);
            if (target != null) {
                if (target == Player) {
                    let msg = "Magical lasers make disappear the clothes on " + tmpname + "'s body.";
                    if (Naked != undefined) {
                        if (Naked != "") {
                            msg = tmpname + ' '.repeat(1) + Naked;
                            if (Naked.startsWith("\u0027")) msg = tmpname + Naked;
                        }
                    }
                    if (Naked != "no message") publicmsg(msg);
                    CharacterNaked(Player);
                    ChatRoomCharacterUpdate(Player);
                } else {
                    if ((target.AllowItem == true) && (target.OnlineSharedSettings.UBC != undefined)) {
                        tgpname = getNickname(target);
                        if (IsTargetProtected(target)) {
                            let msg = umsg1 + tgpname + umsg2;
                            infomsg(msg);
                        } else {
                            let msg = "Magical lasers make disappear the clothes on " + tgpname + "'s body.";
                            if (Tnaked != undefined) {
                                if (Tnaked != "") {
                                    msg = tmpname + ' '.repeat(1) + Tnaked + ' '.repeat(1) + tgpname;
                                    if (Tnaked.startsWith("\u0027")) msg = tmpname + Tnaked + ' '.repeat(1) + tgpname;
                                }
                            }
                            if (Tnaked != "no message") publicmsg(msg);
                            CharacterNaked(target);
                            ChatRoomCharacterUpdate(target);
                        }
                    }
                }
                ChatRoomSetTarget(-1);
            }
        }
    }])

    CommandCombine([{
        Tag: 'outfit',
        Description: "(parameter): restores/saves/loads outfit (including restraints).",
        Action: (args) => {
            if (args === "") {
                let msg = "Options for outfit command:\n" +
                    "<b>All these options include the restraints</b>, so it's also a good bondage tool.\n" +
                    "To restore your outfit to what it was before entering room, type: <b>/outfit reset</b> or <b>/outfit restore</b> or <b>/outfit revert</b>\n" +
                    "Three outfits can be saved by using <b>/outfit save1</b> or <b>/outfit save2</b> or <b>/outfit save3</b>\n" +
                    "To load saved outfits, type: <b>/outfit load1</b> or <b>/outfit load2</b> or <b>/outfit load3</b>\n" +
                    "You will have 5 seconds to click on target. Retry if the saving/loading was unsuccessful\n" +
                    "These saves last only 1 login session.\n" +
                    "To save outfits between sessions, use the <b>Export button</b> in wardrobe\n" +
                    "You will have the outfit saved as a code. You can copy and paste it elsewhere.\n" +
                    "Then you can use the <b>Import buttons</b> to load it later.";
                infomsg(msg);
            }
            if ((args === "load1") || (args === "load2") || (args === "load3")) {
                let msg = "You have 5 seconds to click on target. If successful, the outfit will be loaded. If not, retry.";
                infomsg(msg);
                setTimeout(function() {
                    if (CurrentCharacter != null) {
                        if (CurrentCharacter.OnlineSharedSettings.UBC != undefined) {
                            let nl = 0;
                            let uw = 0;
                            if (args === "load1") {
                                if (this.savedoutfit1 == undefined) {
                                    nl = 1;
                                } else {
                                    CurrentCharacter.Appearance = this.savedoutfit1.slice(0);
                                }
                            }
                            if (args === "load2") {
                                if (this.savedoutfit2 == undefined) {
                                    nl = 1;
                                } else {
                                    CurrentCharacter.Appearance = this.savedoutfit2.slice(0);
                                }
                            }
                            if (args === "load3") {
                                if (this.savedoutfit1 == undefined) {
                                    nl = 1;
                                } else {
                                    CurrentCharacter.Appearance = this.savedoutfit3.slice(0);
                                }
                            }
                            if (nl == 1) {
                                DialogLeave();
                                let msg = "Outfit " + args + " command not executed as no any saved outfit has been found.";
                                infomsg(msg);
                            }
                            if (nl == 0) {
                                if (IsTargetProtected(CurrentCharacter)) {
                                    if ((CurrentCharacter.Nickname == '') || (CurrentCharacter.Nickname == undefined)) {
                                        tgpname = CurrentCharacter.Name;
                                    } else {
                                        tgpname = CurrentCharacter.Nickname;
                                    }
                                    if (tgpname != tmpname) {
                                        uw = 1;
                                        let msg = umsg1 + tgpname + umsg2;
                                        infomsg(msg);
                                    }
                                }
                                if (uw == 0) {
                                    CharacterRefresh(CurrentCharacter);
                                    ChatRoomCharacterUpdate(CurrentCharacter);
                                    DialogLeave();
                                    let msg = "Outfit " + args + " command executed.";
                                    infomsg(msg);
                                }
                            }
                        }
                    }
                }, 5000);
            }
            if ((args === "reset") || (args === "revert") || (args === "restore")) {
                Player.Appearance = ChatSearchSafewordAppearance.slice(0);
                CharacterRefresh(Player);
                ChatRoomCharacterUpdate(Player);
                let msg = "Outfit reset-restore-revert command executed.";
                infomsg(msg);
            }
            if ((args === "save1") || (args === "save2") || (args === "save3")) {
                let msg = "You have 5 seconds to click on target. If successful, the outfit will be saved. If not, retry.";
                infomsg(msg);
                setTimeout(function() {
                    if (CurrentCharacter != null) {
                        if (CurrentCharacter.OnlineSharedSettings.UBC != undefined) {
                            let uw = 0;
                            if (IsTargetProtected(CurrentCharacter)) {
                                if ((CurrentCharacter.Nickname == '') || (CurrentCharacter.Nickname == undefined)) {
                                    tgpname = CurrentCharacter.Name;
                                } else {
                                    tgpname = CurrentCharacter.Nickname;
                                }
                                if (tgpname != tmpname) {
                                    uw = 1;
                                    let msg = umsg1 + tgpname + umsg2;
                                    infomsg(msg);
                                }
                            }
                            if (uw == 0) {
                                if (args === "save1") this.savedoutfit1 = CurrentCharacter.Appearance.slice(0);
                                if (args === "save2") this.savedoutfit2 = CurrentCharacter.Appearance.slice(0);
                                if (args === "save3") this.savedoutfit3 = CurrentCharacter.Appearance.slice(0);
                                DialogLeave();
                                let msg = "Outfit " + args + " command executed.";
                                infomsg(msg);
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
                let msg = "The permission command must be followed by a number.\n" +
                    "The effect will be visible in your profile.\n" +
                    "0 Everyone, no exceptions\n" +
                    "1 Everyone, except blacklist\n" +
                    "2 Owner, Lover, whitelist & Dominants\n" +
                    "3 Owner, Lover and whitelist only\n" +
                    "4 Owner and Lover only\n" +
                    "5 Owner only";
                infomsg(msg);
            } else {
                let perm = args * 1;
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
            let target = Player;
            if (args != "") target = TargetSearch(args);
            if (target != null) {
                if (target == Player) {
                    let msg = "" + tmpname + " becomes a cute pet.";
                    if (Pet != undefined) {
                        if (Pet != "") {
                            msg = tmpname + ' '.repeat(1) + Pet;
                            if (Pet.startsWith("\u0027")) msg = tmpname + Pet;
                        }
                    }
                    if (Pet != "no message") publicmsg(msg);
                    CharacterNaked(Player);
                    InventoryWearRandom(Player, "ItemArms", 8, null, false, true, petitems1, true);
                    InventoryWearRandom(Player, "HairAccessory1", 8, null, false, true, petitems2, true);
                    InventoryWearRandom(Player, "TailStraps", 8, null, false, true, petitems3, true);
                    if (InventoryGet(Player, "ItemMouth") == null) InventoryWearRandom(Player, "ItemMouth", 8);
                    if (InventoryGet(Player, "ItemNeck") == null) InventoryWearRandom(Player, "ItemNeck", 8);
                    if (InventoryGet(Player, "ItemNeckRestraints") == null) InventoryWear(Player, "ChainLeash", "ItemNeckRestraints", null, 8);
                    PoseSetActive(Player, "Kneel", true);
                    CharacterRefresh(Player);
                    ChatRoomCharacterUpdate(Player);
                } else {
                    if ((target.AllowItem == true) && (target.OnlineSharedSettings.UBC != undefined)) {
                        tgpname = getNickname(target);
                        if (IsTargetProtected(target)) {
                            let msg = umsg1 + tgpname + umsg2;
                            infomsg(msg);
                        } else {
                            let msg = "" + tgpname + " becomes a cute pet.";
                            if (Tpet != undefined) {
                                if (Tpet != "") {
                                    msg = tmpname + ' '.repeat(1) + Tpet + ' '.repeat(1) + tgpname;
                                    if (Tpet.startsWith("\u0027")) msg = tmpname + Tpet + ' '.repeat(1) + tgpname;
                                }
                            }
                            if (Tpet != "no message") publicmsg(msg);
                            CharacterNaked(target);
                            InventoryWearRandom(target, "ItemArms", 8, null, false, true, petitems1, true);
                            InventoryWearRandom(target, "HairAccessory1", 8, null, false, true, petitems2, true);
                            InventoryWearRandom(target, "TailStraps", 8, null, false, true, petitems3, true);
                            if (InventoryGet(target, "ItemMouth") == null) InventoryWearRandom(target, "ItemMouth", 8);
                            if (InventoryGet(target, "ItemNeck") == null) InventoryWearRandom(target, "ItemNeck", 8);
                            if (InventoryGet(target, "ItemNeckRestraints") == null) InventoryWear(target, "ChainLeash", "ItemNeckRestraints", null, 8);
                            PoseSetActive(target, "Kneel", true);
                            CharacterRefresh(target);
                            ChatRoomCharacterUpdate(target);
                        }
                    }
                }
                ChatRoomSetTarget(-1);
            }
        }
    }])

    CommandCombine([{
        Tag: 'ping',
        Description: "(MemberNumber)(Message): sends a beep to a player.",
        Action: (args) => {
            const parts = args.split(" ");
            const target = parseInt(parts.shift(), 10);
            const msg = parts.join(" ");
            if (!CommonIsNonNegativeInteger(target)) {
                ChatRoomSendLocal(`<span style="color: red">${TextGet("CommandBeepInvalidTarget").replace('$target', target)}</span>`);
                return;
            } else if (!Player.FriendNames.get(target)) {
                ChatRoomSendLocal(`<span style="color: red">${TextGet("CommandBeepNotFriend").replace('$target', target.toString())}</span>`);
                return;
            } else if (!msg) {
                ChatRoomSendLocal(`<span style="color: red">${TextGet("CommandBeepEmptyMessage")}</span>`);
                return;
            }
            ServerSendBeepMessage(target, msg);
            const beepId = FriendListBeepLog.length - 1;
            const replyLink = ElementButton.Create(
                `beep-reply-${beepId}`,
                () => {
                    ElementValue("InputChat", `/beep ${target} ${ElementValue("InputChat").replace(/^\/(beep|w) \S+ ?/u, '')}`);
                    document.getElementById('InputChat').focus();
                }, {
                    noStyling: true
                }, {
                    button: {
                        classList: ["ReplyButton"],
                        children: ['\u21a9\ufe0f']
                    }
                },
            );
            const link = document.createElement("a");
            link.id = `#beep-${beepId}`;
            link.onclick = (e) => {
                e.preventDefault();
                FriendListShowBeep(beepId);
            };
            const targetName = Player.FriendNames.get(target) ?? InterfaceTextGet(`ServerBeepUnknownName`).replace('$target', target.toString());
            link.textContent = CommonStringSubstitute(TextGet("CommandBeepLink"), [
                ["{NAME}", targetName],
                ["{NUMBER}", target.toString()],
                ["{MESSAGE}", msg.length > 150 ? `${msg.substring(0, 150)}…` : msg],
            ]);
            link.classList.add("beep-link");
            const div = document.createElement("div");
            div.classList.add("ChatMessage", "ChatMessageLocalMessage", "ChatMessageNonDialogue", "ChatMessageBeep");
            div.dataset.time = ChatRoomCurrentTime();
            div.dataset.sender = Player.MemberNumber.toString();
            div.dataset.target = target.toString();
            div.append(replyLink, link);
            document.querySelector(`
		#TextAreaChatLog .ChatMessageBeep[data-sender="${target}"] > .ReplyButton:not([tabindex='-1']),
		#TextAreaChatLog .ChatMessageBeep[data-target="${target}"] > .ReplyButton:not([tabindex='-1'])
	    `)?.setAttribute("tabindex", "-1");
            ChatRoomAppendChat(div);
        }
    }])

    CommandCombine([{
        Tag: 'pmenu',
        Description: ": direct access to Preferences menu.",
        Action: () => {
            PrfClick();
        }
    }])

    CommandCombine([{
        Tag: 'poof',
        Description: "(action): leaves the club very fast.",
        Action: (args) => {
            let message = "";
            if (args === "") {
                message = " poofs away."
            } else {
                message = ' '.repeat(1) + args;
            }
            let msg = "" + tmpname + message;
            publicmsg(msg);
            RelogExit();
        }
    }])

    CommandCombine([{
        Tag: 'pose2',
        Description: "(pose) (target): changes the pose of any player.",
        Action: (args) => {
            if (args === "") {
                let msg = "The pose2 command must be followed by a pose and optionally a target.\n" +
                    " \n" +
                    "Available poses:\n" +
                    "armsfree, belly, boxtied, cuffed, elbowtied,\n" +
                    "kneel1, kneel2, legsclosed, legsopen, pet,\n" +
                    "spreadarms1, spreadarms2, spreadeagle1\n" +
                    "spreadeagle2, spreadlegs, stand, suspension,\n" +
                    "tapedhands. Only on yourself: exercise, jump.\n" +
                    "Use <b>/pose2 reset</b> (target) to back to neutral pose.\n" +
                    "If WCE is enabled, use <b>/pose baseupper</b> only on yourself when /pose2 reset fails.";
                infomsg(msg);
            } else {
                let stringPose1 = args;
                let stringPose2 = stringPose1.split(/[ ,]+/);
                let pose = stringPose2[0];
                let targetname = stringPose2[1];
                if (targetname == null) {
                    if ((pose == "armsfree") &&
                        (Player.ActivePose != 'BaseUpper') &&
                        (PoseCanChangeUnaided(Player, 'BaseUpper'))) {
                        PoseSetActive(Player, "BaseUpper");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " relaxes " + pronoun3 + " arms.";
                        publicmsg(msg);
                    } else if ((pose == "belly") &&
                        (Player.ActivePose != 'Hogtied') &&
                        (PoseCanChangeUnaided(Player, 'Hogtied'))) {
                        PoseSetActive(Player, "Hogtied");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " relaxes on " + pronoun3 + " belly.";
                        publicmsg(msg);
                    } else if ((pose == "boxtied") &&
                        (Player.ActivePose != 'BackBoxTie') &&
                        (PoseCanChangeUnaided(Player, 'BackBoxTie'))) {
                        PoseSetActive(Player, "BackBoxTie");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " puts " + pronoun3 + " arms behind " + pronoun3 + " back.";
                        publicmsg(msg);
                    } else if ((pose == "cuffed") &&
                        (Player.ActivePose != 'BackCuffs') &&
                        (PoseCanChangeUnaided(Player, 'BackCuffs'))) {
                        PoseSetActive(Player, "BackCuffs");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " puts " + pronoun3 + " arms out like " + pronoun4 + " is handcuffed.";
                        publicmsg(msg);
                    } else if ((pose == "elbowtied") &&
                        (Player.ActivePose != 'BackElbowTouch') &&
                        (PoseCanChangeUnaided(Player, 'BackElbowTouch'))) {
                        PoseSetActive(Player, "BackElbowTouch");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " puts " + pronoun3 + " arms behind " + pronoun3 + " back, elbows almost touching.";
                        publicmsg(msg);
                    } else if ((pose == "kneel1") &&
                        (Player.ActivePose != 'Kneel') &&
                        ((PoseCanChangeUnaided(Player, 'Kneel')) || (ChatRoomCanAttemptKneel(Player) == true))) {
                        PoseSetActive(Player, "Kneel");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " kneels down.";
                        publicmsg(msg);
                    } else if ((pose == "kneel2") &&
                        (Player.ActivePose != 'KneelingSpread') &&
                        (PoseCanChangeUnaided(Player, 'KneelingSpread'))) {
                        PoseSetActive(Player, "KneelingSpread");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " kneels down and opens " + pronoun3 + " legs.";
                        publicmsg(msg);
                    } else if ((pose == "legsclosed") &&
                        (Player.ActivePose != 'LegsClosed') &&
                        (PoseCanChangeUnaided(Player, 'LegsClosed'))) {
                        PoseSetActive(Player, "LegsClosed");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " stands up and closes " + pronoun3 + " legs.";
                        publicmsg(msg);
                    } else if ((pose == "legsopen") &&
                        (Player.ActivePose != 'LegsOpen') &&
                        (PoseCanChangeUnaided(Player, 'LegsOpen'))) {
                        PoseSetActive(Player, "LegsOpen");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " stands up normally on " + pronoun3 + " feet.";
                        publicmsg(msg);
                    } else if ((pose == "pet") &&
                        (Player.ActivePose != 'AllFours') &&
                        (PoseCanChangeUnaided(Player, 'AllFours'))) {
                        PoseSetActive(Player, "AllFours");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " relaxes on all fours.";
                        publicmsg(msg);
                    } else if ((pose == "spreadarms1") &&
                        (Player.ActivePose != 'Yoked') &&
                        (PoseCanChangeUnaided(Player, 'Yoked'))) {
                        PoseSetActive(Player, "Yoked");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " raises " + pronoun3 + " hands.";
                        publicmsg(msg);
                    } else if ((pose == "spreadarms2") &&
                        (Player.ActivePose != 'OverTheHead') &&
                        (PoseCanChangeUnaided(Player, 'OverTheHead'))) {
                        PoseSetActive(Player, "OverTheHead");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " raises the hands above " + pronoun3 + " head.";
                        publicmsg(msg);
                    } else if ((pose == "spreadeagle1") &&
                        ((Player.ActivePose == null) || (Player.ActivePose.includes('Yoked') == false) || (Player.ActivePose.includes('Spread') == false)) &&
                        (PoseCanChangeUnaided(Player, 'Yoked')) &&
                        (PoseCanChangeUnaided(Player, 'Spread'))) {
                        PoseSetActive(Player, "Yoked");
                        PoseSetActive(Player, "Spread")
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " raises " + pronoun3 + " hands and spreads " + pronoun3 + " legs.";
                        publicmsg(msg);
                    } else if ((pose == "spreadeagle2") &&
                        ((Player.ActivePose == null) || (Player.ActivePose.includes('OverTheHead') == false) || (Player.ActivePose.includes('Spread') == false)) &&
                        (PoseCanChangeUnaided(Player, 'OverTheHead')) &&
                        (PoseCanChangeUnaided(Player, 'Spread'))) {
                        PoseSetActive(Player, "OverTheHead");
                        PoseSetActive(Player, "Spread")
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " raises the hands above " + pronoun3 + " head and spreads " + pronoun3 + " legs.";
                        publicmsg(msg);
                    } else if ((pose == "spreadlegs") &&
                        (Player.ActivePose != 'Spread') &&
                        (PoseCanChangeUnaided(Player, 'Spread'))) {
                        PoseSetActive(Player, "Spread");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " spreads " + pronoun3 + " legs.";
                        publicmsg(msg);
                    } else if ((pose == "stand") &&
                        (Player.ActivePose != null) &&
                        ((PoseCanChangeUnaided(Player, null)) || (ChatRoomCanAttemptStand(Player) == true))) {
                        PoseSetActive(Player, null);
                        ChatRoomCharacterUpdate(Player);
                        CharacterRefresh(Player);
                        let msg = "" + tmpname + " stands up.";
                        publicmsg(msg);
                    } else if ((pose == "suspension") &&
                        (Player.ActivePose != 'Suspension') &&
                        (PoseCanChangeUnaided(Player, 'Suspension'))) {
                        PoseSetActive(Player, "Suspension");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " is now in an acrobatic pose in suspension.";
                        publicmsg(msg);
                    } else if ((pose == "tapedhands") &&
                        (Player.ActivePose != 'TapedHands') &&
                        (PoseCanChangeUnaided(Player, 'TapedHands'))) {
                        PoseSetActive(Player, "TapedHands");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " puts " + pronoun3 + " arms out like " + pronoun3 + " hands are taped.";
                        publicmsg(msg);
                        // Special poses
                    } else if (pose == "jump") {
                        let msg = "" + tmpname + " jumps with joy.";
                        publicmsg(msg);
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
                        // Workout
                    } else if (pose == "exercise") {
                        let Region = undefined;
                        let msg1 = "";
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
                            msg1 = "You're too heavily tied to exercise.";
                            infomsg(msg1);
                        }
                        if (msg1 == "") {
                            let msg2 = "" + tmpname + " makes " + pronoun3 + " workout.";
                            publicmsg(msg2);
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
                                PoseChangeFocusToGroup(Player, null);
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
                                PoseChangeFocusToGroup(Player, null);
                            }, 3000);
                            setTimeout(function() {
                                PoseSetActive(Player, "OverTheHead");
                                Player.FocusGroup = AssetGroupGet("Female3DCG", Region);
                                DialogExtendItem(InventoryGet(Player, Region));
                                DialogFocusItem.Property.OverrideHeight = {
                                    Height: 100
                                };
                                ChatRoomCharacterUpdate(Player);
                                PoseChangeFocusToGroup(Player, null);
                            }, 4000);
                            setTimeout(function() {
                                PoseSetActive(Player, "Yoked");
                                Player.FocusGroup = AssetGroupGet("Female3DCG", Region);
                                DialogExtendItem(InventoryGet(Player, Region));
                                DialogFocusItem.Property.OverrideHeight = {
                                    Height: 350
                                };
                                ChatRoomCharacterUpdate(Player);
                                PoseChangeFocusToGroup(Player, null);
                            }, 5000);
                            setTimeout(function() {
                                PoseSetActive(Player, "OverTheHead");
                                Player.FocusGroup = AssetGroupGet("Female3DCG", Region);
                                DialogExtendItem(InventoryGet(Player, Region));
                                DialogFocusItem.Property.OverrideHeight = {
                                    Height: 100
                                };
                                ChatRoomCharacterUpdate(Player);
                                PoseChangeFocusToGroup(Player, null);
                            }, 6000);
                            setTimeout(function() {
                                PoseSetActive(Player, "Yoked");
                                Player.FocusGroup = AssetGroupGet("Female3DCG", Region);
                                DialogExtendItem(InventoryGet(Player, Region));
                                DialogFocusItem.Property.OverrideHeight = {
                                    Height: 350
                                };
                                ChatRoomCharacterUpdate(Player);
                                PoseChangeFocusToGroup(Player, null);
                            }, 7000);
                            setTimeout(function() {
                                PoseSetActive(Player, "OverTheHead");
                                Player.FocusGroup = AssetGroupGet("Female3DCG", Region);
                                DialogExtendItem(InventoryGet(Player, Region));
                                DialogFocusItem.Property.OverrideHeight = {
                                    Height: 100
                                };
                                ChatRoomCharacterUpdate(Player);
                                PoseChangeFocusToGroup(Player, null);
                            }, 8000);
                            setTimeout(function() {
                                PoseSetActive(Player, "Yoked");
                                Player.FocusGroup = AssetGroupGet("Female3DCG", Region);
                                DialogExtendItem(InventoryGet(Player, Region));
                                DialogFocusItem.Property.OverrideHeight = {
                                    Height: 350
                                };
                                ChatRoomCharacterUpdate(Player);
                                PoseChangeFocusToGroup(Player, null);
                            }, 9000);
                            setTimeout(function() {
                                PoseSetActive(Player, "OverTheHead");
                                Player.FocusGroup = AssetGroupGet("Female3DCG", Region);
                                DialogExtendItem(InventoryGet(Player, Region));
                                DialogFocusItem.Property.OverrideHeight = {
                                    Height: 100
                                };
                                ChatRoomCharacterUpdate(Player);
                                PoseChangeFocusToGroup(Player, null);
                            }, 10000);
                            setTimeout(function() {
                                PoseSetActive(Player, null);
                                Player.FocusGroup = AssetGroupGet("Female3DCG", Region);
                                DialogExtendItem(InventoryGet(Player, Region));
                                DialogFocusItem.Property.OverrideHeight = undefined;
                                ChatRoomCharacterUpdate(Player);
                                PoseChangeFocusToGroup(Player, null);
                            }, 10000);
                        }
                        // reset	 
                    } else if (pose == "reset") {
                        PoseSetActive(Player, null);
                        ChatRoomCharacterUpdate(Player);
                        CharacterRefresh(Player);
                    }
                } else {
                    let target = TargetSearch(targetname);
                    if ((target != null) && (target.AllowItem == true) && (target.OnlineSharedSettings.UBC != undefined)) {
                        tgpname = getNickname(target);
                        tgpr1 = getPronoun1(target);
                        tgpr2 = getPronoun2(target);
                        tgpr3 = getPronoun3(target);
                        tgpr4 = getPronoun4(target);
                        if (IsTargetProtected(target)) {
                            let msg = umsg1 + tgpname + umsg2;
                            infomsg(msg);
                        } else {
                            if (pose == "armsfree") {
                                if ((target.ActivePose != 'BaseUpper') &&
                                    (PoseCanChangeUnaided(target, 'BaseUpper'))) {
                                    PoseSetActive(target, "BaseUpper");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " lets " + tgpname + " relax " + tgpr3 + " arms.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "belly") {
                                if ((target.ActivePose != 'Hogtied') &&
                                    (PoseCanChangeUnaided(target, 'Hogtied'))) {
                                    PoseSetActive(target, "Hogtied");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " forces " + tgpname + " to stay on " + tgpr3 + " belly.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "boxtied") {
                                if ((target.ActivePose != 'BackBoxTie') &&
                                    (PoseCanChangeUnaided(target, 'BackBoxTie'))) {
                                    PoseSetActive(target, "BackBoxTie");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " forces " + tgpname + " to put the arms behind " + tgpr3 + " back.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "cuffed") {
                                if ((target.ActivePose != 'BackCuffs') &&
                                    (PoseCanChangeUnaided(target, 'BackCuffs'))) {
                                    PoseSetActive(target, "BackCuffs");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " forces " + tgpname + " to put the arms out like " + tgpr4 + " handcuffed.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "elbowtied") {
                                if ((target.ActivePose != 'BackElbowTouch') &&
                                    (PoseCanChangeUnaided(target, 'BackElbowTouch'))) {
                                    PoseSetActive(target, "BackElbowTouch");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " forces " + tgpname + " to put the arms behind her back, elbows almost touching.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "kneel1") {
                                if ((target.ActivePose != 'Kneel') &&
                                    ((PoseCanChangeUnaided(target, 'Kneel')) || (ChatRoomCanAttemptKneel(target) == true))) {
                                    PoseSetActive(target, "Kneel");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " helps " + tgpname + " to kneel down.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "kneel2") {
                                if ((target.ActivePose != 'KneelingSpread') &&
                                    (PoseCanChangeUnaided(target, 'KneelingSpread'))) {
                                    PoseSetActive(target, "KneelingSpread");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " helps " + tgpname + " to kneel down, forcing " + tgpr3 + " legs open.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "legsclosed") {
                                if ((target.ActivePose != 'LegsClosed') &&
                                    (PoseCanChangeUnaided(target, 'LegsClosed'))) {
                                    PoseSetActive(target, "LegsClosed");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " helps " + tgpname + " to stand up with " + tgpr3 + " legs closed.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "legsopen") {
                                if ((target.ActivePose != 'LegsOpen') &&
                                    (PoseCanChangeUnaided(target, 'LegsOpen'))) {
                                    PoseSetActive(target, "LegsOpen");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " helps " + tgpname + " to stand up normally on " + tgpr3 + " feet.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "pet") {
                                if ((target.ActivePose != 'AllFours') &&
                                    (PoseCanChangeUnaided(target, 'AllFours'))) {
                                    PoseSetActive(target, "AllFours");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " forces " + tgpname + " on all fours.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "spreadarms1") {
                                if ((target.ActivePose != 'Yoked') &&
                                    (PoseCanChangeUnaided(target, 'Yoked'))) {
                                    PoseSetActive(target, "Yoked");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " helps " + tgpname + " to raise " + tgpr3 + " hands.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "spreadarms2") {
                                if ((target.ActivePose != 'OverTheHead') &&
                                    (PoseCanChangeUnaided(target, 'OverTheHead'))) {
                                    PoseSetActive(target, "OverTheHead");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " forces " + tgpname + " to raise the hands above " + tgpr3 + " head.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "spreadeagle1") {
                                if (((target.ActivePose == null) || (target.ActivePose.includes('Yoked') == false) || (target.ActivePose.includes('Spread') == false)) &&
                                    (PoseCanChangeUnaided(target, 'Yoked')) &&
                                    (PoseCanChangeUnaided(target, 'Spread'))) {
                                    PoseSetActive(target, "Yoked");
                                    PoseSetActive(target, "Spread");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " forces " + tgpname + " to raise the hands and spread the legs.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "spreadeagle2") {
                                if (((target.ActivePose == null) || (target.ActivePose.includes('OverTheHead') == false) || (target.ActivePose.includes('Spread') == false)) &&
                                    (PoseCanChangeUnaided(target, 'OverTheHead')) &&
                                    (PoseCanChangeUnaided(target, 'Spread'))) {
                                    PoseSetActive(target, "OverTheHead");
                                    PoseSetActive(target, "Spread");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " forces " + tgpname + " to raise the hands above the head and spread the legs.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "spreadlegs") {
                                if ((target.ActivePose != 'Spread') &&
                                    (PoseCanChangeUnaided(target, 'Spread'))) {
                                    PoseSetActive(target, "Spread");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " forces " + tgpname + " to spread " + tgpr3 + " legs.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "stand") {
                                if ((target.ActivePose != null) &&
                                    ((PoseCanChangeUnaided(target, null)) || (ChatRoomCanAttemptStand(target) == true))) {
                                    PoseSetActive(target, null);
                                    ChatRoomCharacterUpdate(target);
                                    CharacterRefresh(target);
                                    let msg = "" + tmpname + " helps " + tgpname + " to stand up.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "suspension") {
                                if ((target.ActivePose != 'Suspension') &&
                                    (PoseCanChangeUnaided(target, 'Suspension'))) {
                                    PoseSetActive(target, "Suspension");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " forces " + tgpname + " in an acrobatic pose in suspension.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "tapedhands") {
                                if ((target.ActivePose != 'TapedHands') &&
                                    (PoseCanChangeUnaided(target, 'TapedHands'))) {
                                    PoseSetActive(target, "TapedHands");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " forces " + tgpname + " to put the arms out like " + tgpr3 + " hands are taped.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "reset") {
                                PoseSetActive(target, null);
                                ChatRoomCharacterUpdate(target);
                                CharacterRefresh(target);
                            }
                        }
                    }
                }
                ChatRoomSetTarget(-1);
            }
        }
    }])

    CommandCombine([{
        Tag: 'prison1',
        Description: "(minutes): stays in NPC Pandora prison.",
        Action: (args) => {
            if (args === "") {
                let msg = "The prison1 command must be followed by a number higher than 0";
                infomsg(msg);
            } else {
                let minutes = args;
                if (minutes > 0) {
                    let msg = "" + tmpname + " gets grabbed by two maids and sent to NPC Pandora prison for " + minutes + " minutes.";
                    publicmsg(msg);
                    DialogLentLockpicks = false;
                    ChatRoomHideElements();
                    ServerSend("ChatRoomLeave", "");
                    CharacterDeleteAllOnline();
                    PandoraBackground = "Pandora/Underground/Cell" + Math.floor(Math.random() * 7).toString();
                    PandoraRestrainPlayer();
                    PandoraPunishmentSentence(minutes);
                    PandoraPunishmentStart();
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'prison2',
        Description: "(minutes): stays in online Pandora prison.",
        Action: (args) => {
            if (args === "") {
                let msg = "The prison2 command must be followed by a number higher than 0. It will provoke an automatic relog before sending you to prison.\n" +
                    "If you use it when you are alone in a room, it will be a new room automatically created.\n" +
                    "It is recommended to use it in an existing Pandora room that you have first entered as normal player.\n" +
                    "If you use it in an existing non-Pandora room, there will be no any timer, but the Pandora guards will be active though during the requested time.\n" +
                    "For a correct working in all cases, be sure to have enabled the appropriate Immersion settings to auto-remake rooms."
                infomsg(msg);
            } else {
                let minutes = args;
                if (minutes > 0) {
                    DialogLentLockpicks = false;
                    ChatRoomHideElements();
                    ServerSend("ChatRoomLeave", "");
                    CharacterDeleteAllOnline();
                    PandoraRestrainPlayer();
                    InfiltrationPenitentiaryMinutes = parseInt(minutes);
                    if (Player.Game.Prison == null) Player.Game.Prison = {};
                    Player.Game.Prison.Timer = Math.round(CurrentTime + (minutes * 60 * 1000));
                    ServerAccountUpdate.QueueData({
                        Game: Player.Game
                    }, true);
                    ServerSocket.close();
                    ServerSocket.open();
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'quit',
        Description: "(action): leaves room.",
        Action: (args) => {
            if (noescape) {
                let msg = umsg1 + umsg3;
                infomsg(msg);
            } else {
                if (args === "") {
                    OutChat();
                } else {
                    let message = ' '.repeat(1) + args;
                    let msg = "" + tmpname + message;
                    publicmsg(msg);
                    OutChat();
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'randomize',
        Description: "(target): naked + underwear + clothes + restrain commands.",
        Action: (args) => {
            let target = Player;
            if (args != "") target = TargetSearch(args);
            if (target != null) {
                if (target == Player) {
                    let msg = "Magical lasers apply random clothes and bindings on " + tmpname + "'s body.";
                    if (Randomize != undefined) {
                        if (Randomize != "") {
                            msg = tmpname + ' '.repeat(1) + Randomize;
                            if (Randomize.startsWith("\u0027")) msg = tmpname + Randomize;
                        }
                    }
                    if (Randomize != "no message") publicmsg(msg);
                    CharacterNaked(Player);
                    CharacterRandomUnderwear(Player);
                    CharacterAppearanceFullRandom(Player, true);
                    CharacterFullRandomRestrain(Player, "ALL");
                    ChatRoomCharacterUpdate(Player);
                } else {
                    if ((target.AllowItem == true) && (target.OnlineSharedSettings.UBC != undefined)) {
                        tgpname = getNickname(target);
                        if (IsTargetProtected(target)) {
                            let msg = umsg1 + tgpname + umsg2;
                            infomsg(msg);
                        } else {
                            let msg = "Magical lasers apply random clothes and bindings on " + tgpname + "'s body.";
                            if (Trandomize != undefined) {
                                if (Trandomize != "") {
                                    msg = tmpname + ' '.repeat(1) + Trandomize + ' '.repeat(1) + tgpname;
                                    if (Trandomize.startsWith("\u0027")) msg = tmpname + Trandomize + ' '.repeat(1) + tgpname;
                                }
                            }
                            if (Trandomize != "no message") publicmsg(msg);
                            CharacterNaked(target);
                            CharacterRandomUnderwear(target);
                            CharacterAppearanceFullRandom(target, true);
                            CharacterFullRandomRestrain(target, "ALL");
                            ChatRoomCharacterUpdate(target);
                        }
                    }
                }
                ChatRoomSetTarget(-1);
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
                let msg = "The reputation command must be followed by a reputation and a level.\n" +
                    "You will be able to check the change in your profile.\n" +
                    " \n" +
                    "Available reputations:\n" +
                    "abdl, amplector, corporis, dominant, gambling,\n" +
                    "gaming, kidnap, larp, maid, maiestas, nurse,\n" +
                    "patient, submissive, vincula.\n" +
                    "Level must be between 0 and 100.</p>"
                infomsg(msg);
            } else {
                let stringReputation1 = args;
                let stringReputation2 = stringReputation1.split(/[ ,]+/);
                let reputation = stringReputation2[0];
                let level = stringReputation2[1];
                if (reputation == "abdl") DialogSetReputation("ABDL", level);
                if (reputation == "amplector") {
                    ResetHousesReputation();
                    DialogSetReputation("HouseAmplector", level);
                }
                if (reputation == "corporis") {
                    ResetHousesReputation();
                    DialogSetReputation("HouseCorporis", level);
                }
                if (reputation == "dominant") DialogSetReputation("Dominant", level);
                if (reputation == "gambling") DialogSetReputation("Gambling", level);
                if (reputation == "gaming") DialogSetReputation("Gaming", level);
                if (reputation == "kidnap") DialogSetReputation("Kidnap", level);
                if (reputation == "larp") DialogSetReputation("LARP", level);
                if (reputation == "maid") DialogSetReputation("Maid", level);
                if (reputation == "maiestas") {
                    ResetHousesReputation();
                    DialogSetReputation("HouseMaiestas", level);
                }
                if (reputation == "nurse") DialogSetReputation("Asylum", level);
                if (reputation == "patient") DialogSetReputation("Asylum", -level);
                if (reputation == "submissive") DialogSetReputation("Dominant", -level);
                if (reputation == "vincula") {
                    ResetHousesReputation();
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
                let msg = "<b>Warning</b>: Resetting difficulty will incur a 7-day waiting period to rechange. Confirm by typing: <b>/resetdifficulty yes</b>";
                infomsg(msg);
            } else if (args === "yes") {
                Player.Difficulty = [];
                let msg = "Difficulty reset, select a new one in settings.";
                infomsg(msg);
            }
        }
    }])

    CommandCombine([{
        Tag: 'resetinventory',
        Description: ": erases your inventory.",
        Action: (args) => {
            if (args === "") {
                let msg = "<b>Warning</b>: You will lose many clothes and items, you will need to buy them again. Confirm by typing: <b>/resetinventory yes</b>";
                infomsg(msg);
            } else if (args === "yes") {
                Player.Inventory = [];
                ServerPlayerInventorySync();
                let msg = "Accomplished. Visit store to buy new clothes and items.";
                infomsg(msg);
            }
        }
    }])

    CommandCombine([{
        Tag: 'restrain',
        Description: "(target): adds random restraints.",
        Action: (args) => {
            let target = Player;
            if (args != "") target = TargetSearch(args);
            if (target != null) {
                if (target == Player) {
                    let msg = "Magical lasers apply random restraints on " + tmpname + "'s body.";
                    if (Restrain != undefined) {
                        if (Restrain != "") {
                            msg = tmpname + ' '.repeat(1) + Restrain;
                            if (Restrain.startsWith("\u0027")) msg = tmpname + Restrain;
                        }
                    }
                    if (Restrain != "no message") publicmsg(msg);
                    CharacterFullRandomRestrain(Player, "ALL");
                    ChatRoomCharacterUpdate(Player);
                } else {
                    if ((target.AllowItem == true) && (target.OnlineSharedSettings.UBC != undefined)) {
                        tgpname = getNickname(target);
                        if (IsTargetProtected(target)) {
                            let msg = umsg1 + tgpname + umsg2;
                            infomsg(msg);
                        } else {
                            let msg = "Magical lasers apply random restraints on " + tgpname + "'s body.";
                            if (Trestrain != undefined) {
                                if (Trestrain != "") {
                                    msg = tmpname + ' '.repeat(1) + Trestrain + ' '.repeat(1) + tgpname;
                                    if (Trestrain.startsWith("\u0027")) msg = tmpname + Trestrain + ' '.repeat(1) + tgpname;
                                }
                            }
                            if (Trestrain != "no message") publicmsg(msg);
                            CharacterFullRandomRestrain(target, "ALL");
                            ChatRoomCharacterUpdate(target);
                        }
                    }
                }
                ChatRoomSetTarget(-1);
            }
        }
    }])

    CommandCombine([{
        Tag: 'roleplay',
        Description: "(role): starts to play a role",
        Action: (args) => {
            if (args === "") {
                let msg = "The roleplay command must include a role.\n" +
                    "You will be able to check the changes in your profile.\n" +
                    " \n" +
                    "Available roles:\n" +
                    "clubmistress, clubslave, doctor, escapedpatient,\n" +
                    "headmaid, kidnapper, maid, magician, magus,\n" +
                    "masterkidnapper, mistress, nurse, oracle, patient,\n" +
                    "permanentpatient, sage, sorcerer, warlock, witch, wizard.\n" +
                    "Be careful with clubslave, you will be forced to complete contract. Similar warning for escapedpatient.";
                infomsg(msg);
            } else {
                let role = args;
                if (role == "clubmistress") LogAdd("ClubMistress", "Management");
                if (role == "clubslave") LogAdd("ClubSlave", "Management", CurrentTime + 3600000);
                if (role == "doctor") {
                    LogAdd("Committed", "Asylum", CurrentTime);
                    ReputationChange('Asylum', 200);
                }
                if (role == "escapedpatient") LogAdd("Escaped", "Asylum", CurrentTime + 86400000);
                if (role == "headmaid") LogAdd("LeadSorority", "Maid");
                if (role == "kidnapper") DialogSetReputation("Kidnap", 50);
                if (role == "magician") {
                    ResetHousesReputation();
                    DialogSetReputation("HouseVincula", 50);
                }
                if (role == "magus") {
                    ResetHousesReputation();
                    DialogSetReputation("HouseMaiestas", 100);
                }
                if (role == "maid") {
                    LogDelete("LeadSorority", "Maid");
                    LogAdd("JoinedSorority", "Management");
                }
                if (role == "masterkidnapper") ReputationChange("Kidnap", 100);
                if (role == "mistress") {
                    LogAdd("ClubMistress", "Management");
                    ReputationChange("Dominant", 200);
                }
                if (role == "nurse") {
                    LogAdd("Committed", "Asylum", CurrentTime);
                    DialogSetReputation("Asylum", 50);
                }
                if (role == "oracle") {
                    ResetHousesReputation();
                    DialogSetReputation("HouseAmplector", 100);
                }
                if (role == "patient") DialogSetReputation("Asylum", -50);
                if (role == "permanentpatient") ReputationChange('Asylum', -200);
                if (role == "sage") {
                    ResetHousesReputation();
                    DialogSetReputation("HouseAmplector", 50);
                }
                if (role == "sorcerer") {
                    ResetHousesReputation();
                    DialogSetReputation("HouseVincula", 100);
                }
                if (role == "warlock") {
                    ResetHousesReputation();
                    DialogSetReputation("HouseCorporis", 100);
                }
                if (role == "witch") {
                    ResetHousesReputation();
                    DialogSetReputation("HouseCorporis", 50);
                }
                if (role == "wizard") {
                    ResetHousesReputation();
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
                let msg = "The rolequit command must include a role or clubarea.\n" +
                    "You will be able to check the changes in your profile.\n" +
                    " \n" +
                    "Available roles or areas:\n" +
                    "asylum to cease being doctor, nurse, patient or permanent patient.\n" +
                    "clubslave to break the club slave contract.\n" +
                    "ggts to leave ggts training (back to level 0).\n" +
                    "kidnapper to cease being kidnapper or master kidnapper.\n" +
                    "magician to cease one of the 8 magic roles.\n" +
                    "management or mistress to cease being mistress or club mistress.\n" +
                    "sorority or maid to cease being maid or headmaid.";
                infomsg(msg);
            } else {
                let role = args;
                if (role == "asylum") {
                    LogAdd("Escaped", "Asylum", CurrentTime);
                    LogAdd("Committed", "Asylum", CurrentTime);
                    DialogSetReputation("Asylum", 0);
                }
                if (role == "clubslave") {
                    LogAdd("ClubSlave", "Management", CurrentTime);
                    LogAdd("BlockChange", "Rule", CurrentTime);
                    ManagementIsClubSlave = function() {
                        return false
                    }
                    ManagementClubSlaveDialog = function(Player) {}
                    ManagementFinishClubSlave()
                }
                if (role == "ggts") {
                    ChatRoomHideElements();
                    ServerSend("ChatRoomLeave", "");
                    CharacterDeleteAllOnline();
                    AsylumGGTSLock(0);
                    Level = parseInt(0);
                    Player.Game.GGTS.Level = 0;
                    ServerAccountUpdate.QueueData({
                        Game: Player.Game
                    });
                }
                if (role == "kidnapper") DialogSetReputation("Kidnap", 0)
                if (role == "magician") ResetHousesReputation();
                if ((role == "management") || (role == "mistress")) {
                    LogDelete("ClubMistress", "Management");
                    LogDelete("Mistress", "Management");
                }
                if ((role == "sorority") || (role == "maid")) {
                    LogDelete("JoinedSorority", "Management");
                    LogDelete("LeadSorority", "Maid");
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'safeworditem',
        Description: ": removes specific item.",
        Action: () => {
            let msg = "You have 5 seconds to click on target, select area. If successful, will be returned. If not, retry.";
            infomsg(msg);
            setTimeout(function() {
                if (CurrentCharacter != null) {
                    if ((noescape) && (CurrentCharacter == Player)) {
                        let msg = umsg1 + umsg3;
                        infomsg(msg);
                    } else {
                        if (CurrentCharacter.OnlineSharedSettings.UBC != undefined) {
                            let uw = 0;
                            CurrentCharacter.Appearance = CurrentCharacter.Appearance.filter(x => (CurrentCharacter.FocusGroup && CurrentCharacter.FocusGroup.Name) ? x.Asset.Group.Name !=
                                CurrentCharacter.FocusGroup.Name : true);
                            if (IsTargetProtected(CurrentCharacter)) {
                                if ((CurrentCharacter.Nickname == '') || (CurrentCharacter.Nickname == undefined)) {
                                    tgpname = CurrentCharacter.Name;
                                } else {
                                    tgpname = CurrentCharacter.Nickname;
                                }
                                if (tgpname != tmpname) {
                                    uw = 1;
                                    let msg = umsg1 + tgpname + umsg2;
                                    infomsg(msg);
                                }
                            }
                            if (uw == 0) {
                                ChatRoomCharacterUpdate(CurrentCharacter);
                                DialogLeave();
                            }
                        }
                    }
                }
            }, 5000);
        }
    }])

    CommandCombine([{
        Tag: 'search',
        Description: "(lobby): opens chat search in specified lobby.",
        Action: (args) => {
            if (args === "") {
                let msg = "The search command must be followed by the lobby you want to explore.\n" +
                    "Available options: asylum, fclub, mclub, xclub.";
                infomsg(msg);
            } else {
                let search = "noaccess";
                if (args === "asylum") {
                    if ((asylumlimit == false) || (ChatRoomSpace == "Asylum")) search = "Asylum";
                }
                if (args === "fclub") {
                    if ((IsFemale() == true) && ((ChatRoomSpace != "Asylum") || (asylumlimit == false))) search = "";
                }
                if (args === "mclub") {
                    if ((IsMale() == true) && ((ChatRoomSpace != "Asylum") || (asylumlimit == false))) search = "M";
                }
                if (args === "xclub") {
                    if ((asylumlimit == false) || ((asylumlimit == true) && (ChatRoomSpace != "Asylum"))) search = "X";
                }
                if (search == "noaccess") {
                    let msg = "No access to this lobby.";
                    infomsg(msg);
                } else {
                    setTimeout(function() {
                        RoomToSearch(search);
                    }, 1000);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'sfchaste',
        Description: "(model) (front shield) (back shield) (tamper protection) (orgasm mode): changes the settings of worn Futuristic Chastity Belt.",
        Action: (args) => {
            if (args === "") {
                let msg = "The sfchaste command must be followed by 5 numbers for model, front shield, back shield, tamper protection and orgasm mode.\n" +
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
                    "0 Allow - 1 Punish";
                infomsg(msg);
            } else {
                if (InventoryGet(Player, "ItemPelvis") != null) {
                    if (InventoryGet(Player, "ItemPelvis").Asset.Name == "FuturisticChastityBelt") {
                        let stringSFchaste1 = args;
                        let stringSFchaste2 = stringSFchaste1.split(/[ ,]+/);
                        let msf = stringSFchaste2[0];
                        let fsf = stringSFchaste2[1];
                        let bsf = stringSFchaste2[2];
                        let tsf = stringSFchaste2[3];
                        let osf = stringSFchaste2[4];
                        if ((msf > -1) && (msf < 4) && (fsf > -1) && (fsf < 2) && (bsf > -1) && (bsf < 2) && (tsf > -1) && (tsf < 3) && (osf > -1) && (osf < 2)) {
                            const FuturisticChastityBelt = InventoryGet(Player, "ItemPelvis");
                            const FuturisticChastityBeltConfig = ModularItemDataLookup.ItemPelvisFuturisticChastityBelt;
                            FuturisticChastityBelt.Property = ModularItemMergeModuleValues(FuturisticChastityBeltConfig, [msf, fsf, bsf, tsf, osf]);
                            ChatRoomCharacterUpdate(Player);
                            let msg = "The settings of your Futuristic Chastity Belt have been modified.";
                            infomsg(msg);
                        }
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'shock',
        Description: ": (slot) (sensibility) (intensity): changes mode of worn device shock in a specific slot.",
        Action: (args) => {
            if (args === "") {
                let msg = "The shock command must be followed by two (or three) numbers:\n" +
                    "- a number for the concerned slot:\n" +
                    "0 = Arms - 1 = Breast - 2 = Butt - 3 = Devices - 4 = Neck - 5 = Neck Accessories - 6 = Nipples - 7 = Pelvis - 8 = Vulva\n" +
                    " \n" +
                    "- a number for the sensibility of the shock device in this slot:\n" +
                    "0 = Off - 1 = Low - 2 = Medium - 3 = High \n" +
                    "- a number for the intensity of the shocks:\n" +
                    "1 = Low - 2 = Medium - 3 = High \n" +
                    "Note that most devices don't need the last parameter as they refer to a level combining sensibility and intensity!\n" +
                    "Several devices can't be disabled. For the Obedience Belt, use 0 (disabled) or 1 (enabled).\n" +
                    "This command does not support the Futuristic Chastity Belt and the Futuristic Training Belt.";
                infomsg(msg);
            } else {
                let Target = "";
                let Item = "";
                let stringSol1 = args;
                let stringSol2 = stringSol1.split(/[ ,]+/);
                let slot = stringSol2[0];
                let ms = stringSol2[1];
                let mi = stringSol2[2];
                let msg = "Settings changed for one of your shock devices!";
                if ((slot > -1) && (slot < 9)) {
                    if (slot == 0) Target = "ItemArms";
                    if (slot == 1) Target = "ItemBreast";
                    if (slot == 2) Target = "ItemButt";
                    if (slot == 3) Target = "ItemDevices";
                    if (slot == 4) Target = "ItemNeck";
                    if (slot == 5) Target = "ItemNeckAccessories";
                    if (slot == 6) Target = "ItemNipples";
                    if (slot == 7) Target = "ItemPelvis";
                    if (slot == 8) Target = "ItemVulva";
                    Item = InventoryGet(Player, Target);
                    if (Item != null) {
                        if ((Item.Asset.Name == "AutoShockCollar") || (Item.Asset.Name == "CollarAutoShockUnit")) {
                            if ((ms > -1) && (ms < 4) && (mi > 0) && (mi < 4)) {
                                ExtendedItemSetOptionByRecord(Player, Item, {
                                    s: (mi - 1),
                                    y: ms,
                                }, {
                                    push: true,
                                    refresh: true,
                                });
                                ChatRoomCharacterUpdate(Player);
                                infomsg(msg);
                            }
                        }
                        if ((Item.Asset.Name == "CollarShockUnit") || (Item.Asset.Name == "ShockClamps") || (Item.Asset.Name == "ShockDildo") || (Item.Asset.Name == "ShockPlug")) {
                            if ((ms > 0) && (ms < 4)) {
                                ExtendedItemSetOptionByRecord(Player, Item, {
                                    typed: (ms - 1),
                                }, {
                                    push: true,
                                    refresh: true,
                                });
                                ChatRoomCharacterUpdate(Player);
                                infomsg(msg);
                            }
                        }
                        if ((Item.Asset.Name == "ForbiddenChastityBelt") || (Item.Asset.Name == "ModularChastityBelt")) {
                            if ((ms > -1) && (ms < 4)) {
                                ExtendedItemSetOptionByRecord(Player, Item, {
                                    s: ms,
                                }, {
                                    push: true,
                                    refresh: true,
                                });
                                ChatRoomCharacterUpdate(Player);
                                infomsg(msg);
                            }
                        }
                        if (Item.Asset.Name == "ForbiddenChastityBra") {
                            if ((ms > -1) && (ms < 4)) {
                                ExtendedItemSetOptionByRecord(Player, Item, {
                                    typed: ms,
                                }, {
                                    push: true,
                                    refresh: true,
                                });
                                ChatRoomCharacterUpdate(Player);
                                infomsg(msg);
                            }
                        }
                        if (Item.Asset.Name == "PetSuitShockCollar") {
                            let smode = "";
                            if (ms == 0) smode = 0;
                            if ((ms > 0) && (ms < 4)) smode = 1;
                            ExtendedItemSetOptionByRecord(Player, Item, {
                                s: smode,
                            }, {
                                push: true,
                                refresh: true,
                            });
                            if (ms > 0) Item.Property.ShockLevel = (ms - 1);
                            ChatRoomCharacterUpdate(Player);
                            infomsg(msg);
                        }
                        if ((Item.Asset.Name == "LoveChastityBelt") || (Item.Asset.Name == "PrisonLockdownSuit") || (Item.Asset.Name == "SciFiPleasurePanties")) {
                            if ((ms > 0) && (ms < 4)) {
                                ExtendedItemSetOptionByRecord(Player, Item, {
                                    s: (ms - 1),
                                }, {
                                    push: true,
                                    refresh: true,
                                });
                                ChatRoomCharacterUpdate(Player);
                                infomsg(msg);
                            }
                        }
                        if (Item.Asset.Name == "ObedienceBelt") {
                            if ((ms > -1) && (ms < 2)) {
                                ExtendedItemSetOptionByRecord(Player, Item, {
                                    s: ms,
                                }, {
                                    push: true,
                                    refresh: true,
                                });
                                ChatRoomCharacterUpdate(Player);
                                infomsg(msg);
                            }
                        }
                        if (Item.Asset.Name == "\u{73BB}\u{7483}\u{7F50}\u{5B50}_Luzi") {
                            if ((ms > -1) && (ms < 4)) {
                                ExtendedItemSetOptionByRecord(Player, Item, {
                                    d: ms,
                                }, {
                                    push: true,
                                    refresh: true,
                                });
                                ChatRoomCharacterUpdate(Player);
                                infomsg(msg);
                            }
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
                let msg = "The skill command must be followed by a skill and a level.\n" +
                    "You will be able to check the change in your profile.\n" +
                    " \n" +
                    "Available skills:\n" +
                    "bondage, dressage, evasion, infiltration,\n" +
                    "lockpicking, selfbondage, willpower.\n" +
                    "Level must be between 0 and 10.";
                infomsg(msg);
            } else {
                let stringSkill1 = args;
                let stringSkill2 = stringSkill1.split(/[ ,]+/);
                let skill = stringSkill2[0];
                let level = stringSkill2[1];
                if (skill == "bondage") SkillChange(Player, "Bondage", level);
                if (skill == "dressage") SkillChange(Player, "Dressage", level);
                if (skill == "evasion") SkillChange(Player, "Evasion", level);
                if (skill == "infiltration") SkillChange(Player, "Infiltration", level);
                if (skill == "lockpicking") SkillChange(Player, "LockPicking", level);
                if (skill == "selfbondage") SkillChange(Player, "SelfBondage", level);
                if (skill == "willpower") SkillChange(Player, "Willpower", level);
            }
        }
    }])

    CommandCombine([{
        Tag: 'sleep',
        Description: "(target): uses the sleeping pill on yourself or another player.",
        Action: (args) => {
            let target = Player;
            if (args != "") target = TargetSearch(args);
            if (target != null) {
                if (target == Player) {
                    let msg = "" + tmpname + " swallows a sleeping pill and drinks a glass of water. " + pronoun1 + " falls asleep very quickly.";
                    publicmsg(msg);
                    InventoryWear(Player, "RegularSleepingPill", 'ItemMouth');
                    CharacterSetFacialExpression(Player, "Eyes", "Closed");
                    CharacterSetFacialExpression(Player, "Eyes2", "Closed");
                    CharacterSetFacialExpression(Player, "Emoticon", "Sleep");
                    ChatRoomCharacterUpdate(Player);
                } else {
                    if ((target.AllowItem == true) && (target.OnlineSharedSettings.UBC != undefined)) {
                        tgpname = getNickname(target);
                        tgpr1 = getPronoun1(target);
                        tgpr2 = getPronoun2(target);
                        tgpr3 = getPronoun3(target);
                        tgpr4 = getPronoun4(target);
                        if (IsTargetProtected(target)) {
                            let msg = umsg1 + tgpname + umsg2;
                            infomsg(msg);
                        } else {
                            let msg = "" + tmpname + " feeds " + tgpname + " a sleeping pill and gives " + tgpr2 + " a glass of water. " + tgpname + " falls asleep very quickly.";
                            publicmsg(msg);
                            InventoryWear(target, "RegularSleepingPill", 'ItemMouth');
                            CharacterSetFacialExpression(target, "Eyes", "Closed");
                            CharacterSetFacialExpression(target, "Eyes2", "Closed");
                            CharacterSetFacialExpression(target, "Emoticon", "Sleep");
                            ChatRoomCharacterUpdate(target);
                        }
                    }
                }
                ChatRoomSetTarget(-1);
            }
        }
    }])

    CommandCombine([{
        Tag: 'slowleave',
        Description: "(action): slowly leaves the room.",
        Action: (args) => {
            if (noescape) {
                let msg = umsg1 + umsg3;
                infomsg(msg);
            } else {
                let message = "";
                if (args === "") {
                    message = " slowly heads for the door."
                } else {
                    message = ' '.repeat(1) + args;
                }
                let msg = "" + tmpname + message;
                publicmsg(msg);
                setTimeout(function() {
                    OutChat();
                }, 15000);
            }
        }
    }])

    CommandCombine([{
        Tag: 'solidity',
        Description: "(value) (target): changes the solidity of most current bindings.",
        Action: (args) => {
            if (args === "") {
                let msg = "The solidity command must be followed by a number between 1 and 99, and optionally a target.\n" +
                    "To escape special restraints (Futuristic Crate, Wooden Rack, Armbinder Suit), use the value 1.";
                infomsg(msg);
            } else {
                let stringSol1 = args;
                let stringSol2 = stringSol1.split(/[ ,]+/);
                let solidity = stringSol2[0];
                let targetname = stringSol2[1];
                if ((solidity < 1) || (solidity > 99)) {
                    let msg = "The solidity value must be between 1 and 99.";
                    infomsg(msg);
                } else {
                    if ((targetname == null) && (solidity > 0) && (solidity < 100)) {
                        if ((noescape) && (solidity < 20)) {
                            let msg = umsg1 + umsg3;
                            infomsg(msg);
                        } else {
                            let extrasol = 0;
                            if (InventoryGet(Player, "ItemDevices") != null) {
                                if ((InventoryGet(Player, "ItemDevices").Asset.Name == "FuturisticCrate") || (InventoryGet(Player, "ItemDevices").Asset.Name == "WoodenRack")) extrasol = 1;
                            }
                            if (InventoryGet(Player, "ItemArms") != null) {
                                if (InventoryGet(Player, "ItemArms").Asset.Name == "ArmbinderSuit") extrasol = 2;
                            }
                            if ((extrasol != 0) && (solidity == 1)) {
                                if (extrasol == 1) InventoryRemove(Player, "ItemDevices");
                                if (extrasol == 2) InventoryRemove(Player, "ItemArms");
                                let msg1 = "Magical lasers make disappear the special restraints that kept " + tmpname + " prisoner.";
                                if (Solidity != undefined) {
                                    if (Solidity != "") {
                                        msg1 = tmpname + ' '.repeat(1) + Solidity;
                                        if (Solidity.startsWith("\u0027")) msg1 = tmpname + Solidity;
                                    }
                                }
                                if (Solidity != "no message") publicmsg(msg1);
                            }
                            for (let A = 0; A < Player.Appearance.length; A++)
                                if (Player.Appearance[A].Asset.Group.Name != null) {
                                    if (Player.Appearance[A].Asset.Group.Name.startsWith("Item")) {
                                        Player.Appearance[A].Difficulty = solidity;
                                    }
                                }
                            ChatRoomCharacterUpdate(Player);
                            let msg2 = "The solidity of most current bindings has been changed.";
                            infomsg(msg2);
                        }
                    } else {
                        let target = TargetSearch(targetname);
                        if ((target != null) && (target.AllowItem == true) && (solidity > 0) && (solidity < 100) && (target.OnlineSharedSettings.UBC != undefined)) {
                            tgpname = getNickname(target);
                            if (IsTargetProtected(target)) {
                                let msg = umsg1 + tgpname + umsg2;
                                infomsg(msg);
                            } else {
                                let extrasol = 0;
                                if (InventoryGet(target, "ItemDevices") != null) {
                                    if ((InventoryGet(target, "ItemDevices").Asset.Name == "FuturisticCrate") || (InventoryGet(target, "ItemDevices").Asset.Name == "WoodenRack")) extrasol = 1;
                                }
                                if (InventoryGet(target, "ItemArms") != null) {
                                    if (InventoryGet(target, "ItemArms").Asset.Name == "ArmbinderSuit") extrasol = 2;
                                }
                                if ((extrasol != 0) && (solidity == 1)) {
                                    if (extrasol == 1) InventoryRemove(target, "ItemDevices");
                                    if (extrasol == 2) InventoryRemove(target, "ItemArms");
                                    let msg1 = "Magical lasers make disappear the special restraints that kept " + tgpname + " prisoner.";
                                    if (Tsolidity != undefined) {
                                        if (Tsolidity != "") {
                                            msg1 = tmpname + ' '.repeat(1) + Tsolidity + ' '.repeat(1) + tgpname;
                                            if (Tsolidity.startsWith("\u0027")) msg1 = tmpname + Tsolidity + ' '.repeat(1) + tgpname;
                                        }
                                    }
                                    if (Tsolidity != "no message") publicmsg(msg1);
                                }
                                for (let A = 0; A < target.Appearance.length; A++)
                                    if (target.Appearance[A].Asset.Group.Name != null) {
                                        if (target.Appearance[A].Asset.Group.Name.startsWith("Item")) {
                                            target.Appearance[A].Difficulty = solidity;
                                        }
                                    }
                                let msg2 = "The solidity of most current " + tgpname + "\u0027s bindings has been changed by " + tmpname + ".";
                                publicmsg(msg2);
                                ChatRoomCharacterUpdate(target);
                            }
                        }
                        ChatRoomSetTarget(-1);
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'spin',
        Description: "(target) (option): allows access to target's wheel of fortune, even when not displayed.",
        Action: (args) => {
            if (args === "") {
                let msg = "The spin command must be followed by the target whose wheel of fortune interests you, and optionally a mode.\n" +
                    "Available modes:\n" +
                    "a = automatic real spinning (only the options selected by the wheel creator)\n" +
                    "i = info about the maximum of options on the wheel\n" +
                    "r = full random spinning (includes also the options not selected by the wheel creator)\n" +
                    "Tip: use the i mode before the r mode, it will correctly initialise the messages.\n" +
                    "Note that roleplay is disabled by a and r modes!";
                infomsg(msg);
            } else {
                let stringSol1 = args;
                let stringSol2 = stringSol1.split(/[ ,]+/);
                let targetname = stringSol2[0];
                let option = stringSol2[1];
                let target = TargetSearch(targetname);
                if ((target != null) && (target.OnlineSharedSettings.UBC != undefined)) {
                    tgpname = getNickname(target);
                    if (IsTargetProtected(target)) {
                        let msg = umsg1 + tgpname + umsg2;
                        infomsg(msg);
                    } else {
                        if (!InventoryAvailable(target, "WheelFortune", "ItemDevices")) {
                            let msg = "Bad luck! This player does not have a wheel of fortune.";
                            infomsg(msg);
                        } else {
                            CurrentCharacter = target;
                            ChatRoomHideElements();
                            WheelFortuneReturnScreen = CommonGetScreen();
                            WheelFortuneBackground = ChatRoomData.Background;
                            WheelFortuneCharacter = CurrentCharacter;
                            DialogLeave();
                            CommonSetScreen("MiniGame", "WheelFortune");
                            let maxwh = WheelFortuneOption.length - 1;
                            if (option == "a") {
                                WheelFortuneRoleplay = false;
                                WheelFortuneForced = false;
                                WheelFortuneVelocity = WheelFortuneVelocity + 3000 + (Math.random() * 3000);
                                WheelFortuneVelocityTime = CommonTime();
                                let Msg = TextGet("Spin");
                                Msg = Msg.replace("CharacterName", CharacterNickname(WheelFortuneCharacter));
                                ServerSend("ChatRoomChat", {
                                    Content: Msg,
                                    Type: "Emote"
                                });
                            }
                            if (option == "i") {
                                WheelFortuneExit();
                                let msg = "The options on this wheel go from 0 to " + maxwh + ".";
                                infomsg(msg);
                            }
                            if (option == "r") {
                                WheelFortuneRoleplay = false;
                                const Result = [];
                                let Roll = Math.floor(Math.random() * WheelFortuneOption.length);
                                if (Roll == 0) Roll = 1;
                                let id = WheelFortuneOption[Roll - 1].ID;
                                if ((id != "j") && (id != "k") && (id != "l") && (id != "m")) {
                                    Result.push(Roll - 1);
                                    let msg = tmpname + " randomly forces an option of " + tgpname + "'s wheel.";
                                    publicmsg(msg);
                                    WheelFortuneValue = WheelFortuneOption.map(o => o.ID)[Result];
                                    WheelFortuneResult();
                                } else {
                                    WheelFortuneExit();
                                    let msg = "No result! Try again!";
                                    infomsg(msg);
                                }
                            }
                        }
                    }
                }
                ChatRoomSetTarget(-1);
            }
        }
    }])

    CommandCombine([{
        Tag: 'stalk',
        Description: "(stuttermode) (words): speaks once in a specified stuttering mode.",
        Action: (_, command, args) => {
           if (StutterOn) return; 
           let help = "The stalk command must be followed by a number between 1 and 4 for the stuttering mode and the words you want to say.\n" +
                    "Note that it can't be used when you are in a 'permanent' stuttering mode.\n" +
                    " \n" +
                    "Available stuttering modes:\n" +
                    "1 light stuttering\n" +
                    "2 normal stuttering\n" +
                    "3 heavy stuttering\n" +
                    "4 total stuttering";
            let [mode] = args;
            if (!mode || isNaN(mode) || mode < 1 || mode > 4) {
                infomsg(help);
                return;
            }
            let [, , ...message] = command.split(" ");
            let msg = message?.join(" ");
            if (!msg) {
                infomsg("Please include words to say after the stuttering mode.");
                return;
             }
             if (dolltalk === true && IsDollTalk(msg) === false) {
                infomsg(umsg4);
                return;
             }
             let content = "";
             if (mode == 1) content = SpeechTransformStutter(msg, 1);
             if (mode == 2) content = SpeechTransformStutter(msg, 2);
             if (mode == 3) content = SpeechTransformStutter(msg, 3);
             if (mode == 4) content = SpeechTransformStutter(msg, 4);
             ElementValue("InputChat", content);
             event.preventDefault();
             ChatRoomSendChat();
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
            ChatRoomHideElements();
        }
    }])

    CommandCombine([{
        Tag: 'superdice',
        Description: "(sides): rolls a superdice. ",
        Action: (args) => {
            if (args === "") {
                let msg = "The superdice command must be followed by a number between 2 and 999999999.";
                infomsg(msg);
            } else {
                let sides = args;
                if ((sides < 2) || (sides > 1000000000)) sides = 6;
                const Result = [];
                let Roll = Math.floor(Math.random() * sides) + 1;
                Result.push(Roll);
                let msg = "" + tmpname + " rolls a superdice of " + sides + " sides. The result is " + Result + ".";
                publicmsg(msg);
            }
        }
    }])

    CommandCombine([{
        Tag: 'theme',
        Description: "(number): changes chat color theme.",
        Action: (args) => {
            if (args === "") {
                let msg = "The theme command must be followed by a number between 0 and 3.";
                infomsg(msg);
            } else {
                let theme = args;
                if ((theme > -1) && (theme < 4)) {
                    Player.ChatSettings.ColorTheme = PreferenceChatColorThemeList[theme]
                    ServerAccountUpdate.QueueData({
                        ChatSettings: Player.ChatSettings
                    });
                    InformationSheetLoad();
                    InformationSheetLoadCharacter(Player);
                    InformationSheetExit();
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'thmlogin',
        Description: "(options) shows/hides Credits and/or NPCs on login screen, when Themed mod used",
        Action: (args) => {
            if (args === "") {
                let msg = "The thmlogin command can be used only if Themed mod is enabled.\n" +
                    "It must be followed by a number between 1 and 3.\n" +
                    "1 = Credits - 2 = NPCs - 3 = 1 + 2.\n" +
                    "";
                if (Player.Themed != undefined) msg = msg + "Current status:";
                infomsg(msg);
                if (Player.Themed != undefined) showLoginStatus();
            } else {
                if (Player.Themed != undefined) {
                    if ((args == 1) || (args == 3)) {
                        if (ThemedLocalData.loginOptions.hideCredits) {
                            ThemedLocalData.loginOptions.hideCredits = false;
                        } else {
                            ThemedLocalData.loginOptions.hideCredits = true;
                        }
                    }
                    if ((args == 2) || (args == 3)) {
                        if (ThemedLocalData.loginOptions.hideDummy) {
                            ThemedLocalData.loginOptions.hideDummy = false;
                        } else {
                            ThemedLocalData.loginOptions.hideDummy = true;
                        }
                    }
                    if ((args > 0) && (args < 4)) {
                        localStorage.setItem('ThemedLocalData', JSON.stringify(window.ThemedLocalData));
                        let msg = "Settings for login screen modified!";
                        infomsg(msg);
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'timercell',
        Description: "(minutes): stays in the isolation cell.",
        Action: (args) => {
            if (args === "") {
                let msg = "The timercell command must be followed by a number higher than 0.";
                infomsg(msg);
            } else {
                let minutes = args;
                if (minutes > 0) {
                    let msg = "" + tmpname + " gets grabbed by two maids and locked in a timer cell for " + minutes + " minutes.";
                    publicmsg(msg);
                    DialogLentLockpicks = false;
                    ChatRoomHideElements();
                    ServerSend("ChatRoomLeave", "");
                    CharacterDeleteAllOnline();
                    CellLock(minutes);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'title1',
        Description: "(title): chooses a new title (from A to K).",
        Action: (args) => {
            if (args === "") {
                let msg = "The title1 command must be followed by a title.\n" +
                    "It will also change required parameters to get the title.\n" +
                    "You will be able to check the changes in your profile.\n" +
                    " \n" +
                    "Available titles:\n" +
                    "admiral, agent, alien, angel, baby, bondagebaby,\n" +
                    "bondagemaid, brat, bunny, captain, clubslave,\n" +
                    "coldbloodhorse, collegestudent, concubus, demon,\n" +
                    "diaperlover, doctor, doll, drone, duchess, duke,\n" +
                    "escapedpatient, farmhorse, femboy, flyingpegasus, foal,\n" +
                    "foxy, goodboy, goodone, goodgirl, goodslave,\n" +
                    "goodslaveboy, goodslavegirl, headmaid, hotbloodhorse,\n" +
                    "houdin, incubus, infiltrator, kidnapper, kitten.";
                infomsg(msg);
            } else {
                let title = args;
                if (title == "admiral") TitleSet("Admiral");
                if (title == "agent") {
                    if ((SkillGetLevel(Player, "Infiltration") < 6) || (SkillGetLevel(Player, "Infiltration") > 7)) {
                        SkillChange(Player, "Infiltration", 6);
                    }
                    TitleSet("InfilrationAgent");
                }
                if (title == "alien") TitleSet("Alien");
                if (title == "angel") TitleSet("Angel");
                if (title == "baby") {
                    if (ReputationGet("ABDL") < 1) {
                        DialogSetReputation("ABDL", 1);
                    }
                    TitleSet("Baby");
                }
                if (title == "bondagebaby") {
                    if (ReputationGet("ABDL") < 1) {
                        DialogSetReputation("ABDL", 1);
                    }
                    if (SkillGetLevel(Player, "Evasion") < 10) {
                        SkillChange(Player, "Evasion", 10);
                    }
                    TitleSet("BondageBaby");
                }
                if (title == "bondagemaid") {
                    if ((LogQuery("JoinedSorority", "Maid") == false) || (LogQuery("LeadSorority", "Maid") == false)) {
                        LogAdd("JoinedSorority", "Management");
                    }
                    if (SkillGetLevel(Player, "Evasion") < 10) {
                        SkillChange(Player, "Evasion", 10);
                    }
                    TitleSet("BondageMaid");
                }
                if (title == "brat") TitleSet("Brat");
                if (title == "bunny") TitleSet("Bunny");
                if (title == "captain") TitleSet("Captain");
                if (title == "clubslave") LogAdd("ClubSlave", "Management", CurrentTime + 3600000);
                if (title == "coldbloodhorse") {
                    if ((SkillGetLevel(Player, "Dressage") < 3) || (SkillGetLevel(Player, "Infiltration") > 3)) {
                        SkillChange(Player, "Dressage", 3);
                    }
                    TitleSet("PonyCold");
                }
                if (title == "collegestudent") {
                    LogAdd("BondageCollege", "Import");
                    TitleSet("CollegeStudent");
                }
                if (title == "concubus") TitleSet("Concubus");
                if (title == "demon") TitleSet("Demon");
                if (title == "diaperlover") {
                    if (ReputationGet("ABDL") < 1) {
                        DialogSetReputation("ABDL", 1);
                    }
                    TitleSet("DL");
                }
                if (title == "doctor") {
                    if (ReputationGet("Asylum") < 100) {
                        DialogSetReputation("Asylum", 100);
                    }
                    LogAdd("Committed", "Asylum", CurrentTime);
                    TitleSet("Doctor");
                }
                if (title == "doll") TitleSet("Doll");
                if (title == "drone") {
                    if (AsylumGGTSGetLevel(Player) < 6) {
                        Level = parseInt(6);
                        Player.Game.GGTS.Level = 6;
                        ServerAccountUpdate.QueueData({
                            Game: Player.Game
                        });
                    }
                    TitleSet("Drone");
                }
                if (title == "duchess") {
                    LogAdd("KidnapSophie", "Sarah");
                    TitleSet("Duchess");
                }
                if (title == "duke") {
                    LogAdd("KidnapSophie", "Sarah");
                    TitleSet("Duke");
                }
                if (title == "escapedpatient") LogAdd("Escaped", "Asylum", CurrentTime + 86400000);
                if (title == "farmhorse") {
                    if ((SkillGetLevel(Player, "Dressage") < 2) || (SkillGetLevel(Player, "Infiltration") > 2)) {
                        SkillChange(Player, "Dressage", 2);
                    }
                    TitleSet("PonyFarm");
                }
                if (title == "femboy") TitleSet("Femboy");
                if (title == "flyingpegasus") {
                    if ((SkillGetLevel(Player, "Dressage") < 8) || (SkillGetLevel(Player, "Infiltration") > 9)) {
                        SkillChange(Player, "Dressage", 8);
                    }
                    TitleSet("PonyPegasus");
                }
                if (title == "foal") {
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
                }
                if (title == "foxy") TitleSet("Foxy");
                if (title == "goodboy") {
                    if (AsylumGGTSGetLevel(Player) < 4) {
                        Level = parseInt(4);
                        Player.Game.GGTS.Level = 4;
                        ServerAccountUpdate.QueueData({
                            Game: Player.Game
                        });
                    }
                    TitleSet("GoodBoy");
                }
                if (title == "goodone") TitleSet("Good One");
                if (title == "goodgirl") {
                    if (AsylumGGTSGetLevel(Player) < 4) {
                        Level = parseInt(4);
                        Player.Game.GGTS.Level = 4;
                        ServerAccountUpdate.QueueData({
                            Game: Player.Game
                        });
                    }
                    TitleSet("GoodGirl");
                }
                if (title == "goodslave") {
                    if (AsylumGGTSGetLevel(Player) < 6) {
                        Level = parseInt(6);
                        Player.Game.GGTS.Level = 6;
                        ServerAccountUpdate.QueueData({
                            Game: Player.Game
                        });
                    }
                    TitleSet("GoodSlave");
                }
                if (title == "goodslaveboy") {
                    if (AsylumGGTSGetLevel(Player) < 5) {
                        Level = parseInt(5);
                        Player.Game.GGTS.Level = 5;
                        ServerAccountUpdate.QueueData({
                            Game: Player.Game
                        });
                    }
                    TitleSet("GoodSlaveBoy");
                }
                if (title == "goodslavegirl") {
                    if (AsylumGGTSGetLevel(Player) < 5) {
                        Level = parseInt(5);
                        Player.Game.GGTS.Level = 5;
                        ServerAccountUpdate.QueueData({
                            Game: Player.Game
                        });
                    }
                    TitleSet("GoodSlaveGirl");
                }
                if (title == "headmaid") {
                    LogAdd("LeadSorority", "Maid");
                    TitleSet("HeadMaid");
                }
                if (title == "hotbloodhorse") {
                    if ((SkillGetLevel(Player, "Dressage") < 5) || (SkillGetLevel(Player, "Infiltration") > 5)) {
                        SkillChange(Player, "Dressage", 5);
                    }
                    TitleSet("PonyHot");
                }
                if (title == "houdini") {
                    if (SkillGetLevel(Player, "Evasion") < 10) {
                        SkillChange(Player, "Evasion", 10);
                    }
                    TitleSet("Houdini");
                }
                if (title == "incubus") TitleSet("Incubus");
                if (title == "infiltrator") {
                    if ((SkillGetLevel(Player, "Infiltration") < 4) || (SkillGetLevel(Player, "Infiltration") > 5)) {
                        SkillChange(Player, "Infiltration", 4);
                    }
                    TitleSet("InfilrationInfiltrator");
                }
                if (title == "kidnapper") {
                    if ((ReputationGet("Kidnap") < 50) || (ReputationGet("Kidnap") > 99)) {
                        DialogSetReputation("Kidnap", 50);
                    }
                    TitleSet("Kidnapper");
                }
                if (title == "kitten") TitleSet("Kitten");
            }
        }
    }])

    CommandCombine([{
        Tag: 'title2',
        Description: "(title): chooses a new title (from L to Z).",
        Action: (args) => {
            if (args === "") {
                let msg = "The title2 command must be followed by a title.\n" +
                    "It will also change required parameters to get the title.\n" +
                    "You will be able to check the changes in your profile.\n" +
                    " \n" +
                    "Available titles:\n" +
                    "ladyluck, liege, littleone, lordfortune, magician, magus,\n" +
                    "maid, majesticalicorn, majesty, master, masterkidnapper,\n" +
                    "missy, mistree, mistress, mole, nawashi, nurse, operative,\n" +
                    "oracle, patient, patron, permanentpatient, pet,\n" +
                    "prince, princess, puppy, sage, shiningunicorn, sissy,\n" +
                    "sorcerer, succubus, superhero, superheroine,\n" +
                    "superspy, switch, tomboy, warlock, warmbloodhorse,\n" +
                    "wildmustang, witch, wizard.";
                infomsg(msg);
            } else {
                let title = args;
                if (title == "ladyluck") {
                    if (ReputationGet("Gambling") < 100) {
                        DialogSetReputation("Gambling", 100);
                    }
                    TitleSet("LadyLuck");
                }
                if (title == "liege") TitleSet("Liege");
                if (title == "littleone") {
                    if (ReputationGet("ABDL") < 1) {
                        DialogSetReputation("ABDL", 1);
                    }
                    TitleSet("LittleOne");
                }
                if (title == "lordfortune") {
                    if (ReputationGet("Gambling") < 100) {
                        DialogSetReputation("Gambling", 100);
                    }
                    TitleSet("Lord Fortune");
                }
                if (title == "magician") {
                    if ((ReputationGet("HouseVincula") < 50) || (ReputationGet("HouseVincula") > 99)) {
                        ResetHousesReputation();
                        DialogSetReputation("HouseVincula", 50);
                    }
                    TitleSet("MagicSchoolMagician");
                }
                if (title == "magus") {
                    if (ReputationGet("HouseMaiestas") < 100) {
                        ResetHousesReputation();
                        DialogSetReputation("HouseMaiestas", 100);
                    }
                    TitleSet("MagicSchoolMagus");
                }
                if (title == "maid") {
                    LogDelete("LeadSorority", "Maid");
                    LogAdd("JoinedSorority", "Management");
                    TitleSet("Maid");
                }
                if (title == "majesticalicorn") {
                    if (SkillGetLevel(Player, "Dressage") < 10) {
                        SkillChange(Player, "Dressage", 10);
                    }
                    TitleSet("PonyAlicorn");
                }
                if (title == "majesty") TitleSet("Majesty");
                if (title == "master") {
                    LogAdd("ClubMistress", "Management");
                    TitleSet("Master");
                }
                if (title == "masterkidnapper") {
                    if (ReputationGet("Kidnap") < 100) {
                        DialogSetReputation("Kidnap", 100);
                    }
                    TitleSet("MasterKidnapper");
                }
                if (title == "missy") TitleSet("Missy");
                if (title == "mistree") {
                    LogAdd("ClubMistress", "Management");
                    TitleSet("Mistree");
                }
                if (title == "mistress") {
                    LogAdd("ClubMistress", "Management");
                    TitleSet("Mistress");
                }
                if (title == "mole") {
                    if ((SkillGetLevel(Player, "Infiltration") < 2) || (SkillGetLevel(Player, "Infiltration") > 3)) {
                        SkillChange(Player, "Infiltration", 2);
                    }
                    TitleSet("InfilrationMole");
                }
                if (title == "nawashi") {
                    if (SkillGetLevel(Player, "Bondage") < 10) {
                        SkillChange(Player, "Bondage", 10);
                    }
                    TitleSet("Nawashi");
                }
                if (title == "nurse") {
                    if ((ReputationGet("Asylum") < 50) || (ReputationGet("Asylum") > 99)) {
                        DialogSetReputation("Asylum", 50);
                    }
                    LogAdd("Committed", "Asylum", CurrentTime);
                    TitleSet("Nurse");
                }
                if (title == "operative") {
                    if ((SkillGetLevel(Player, "Infiltration") < 8) || (SkillGetLevel(Player, "Infiltration") > 9)) {
                        SkillChange(Player, "Infiltration", 8);
                    }
                    TitleSet("InfilrationOperative");
                }
                if (title == "oracle") {
                    if (ReputationGet("HouseAmplector") < 100) {
                        ResetHousesReputation();
                        DialogSetReputation("HouseAmplector", 100);
                    }
                    TitleSet("MagicSchoolOracle");
                }
                if (title == "patient") {
                    if ((ReputationGet("Asylum") > -50) || (ReputationGet("Asylum") < -99)) {
                        DialogSetReputation("Asylum", -50);
                    }
                    TitleSet("Patient");
                }
                if (title == "patron") TitleSet("Patron");
                if (title == "permanentpatient") {
                    if (ReputationGet("Asylum") > -100) {
                        DialogSetReputation("Asylum", -100);
                    }
                    TitleSet("PermanentPatient");
                }
                if (title == "pet") TitleSet("Pet");
                if (title == "prince") TitleSet("Prince");
                if (title == "princess") TitleSet("Princess");
                if (title == "puppy") TitleSet("Puppy");
                if (title == "sage") {
                    if ((ReputationGet("HouseAmplector") < 50) || (ReputationGet("HouseAmplector") > 99)) {
                        ResetHousesReputation();
                        DialogSetReputation("HouseAmplector", 50);
                    }
                    TitleSet("MagicSchoolSage");
                }
                if (title == "shiningunicorn") {
                    if ((SkillGetLevel(Player, "Dressage") < 7) || (SkillGetLevel(Player, "Infiltration") > 7)) {
                        SkillChange(Player, "Dressage", 7);
                    }
                    TitleSet("PonyUnicorn");
                }
                if (title == "sissy") TitleSet("Sissy");
                if (title == "sorcerer") {
                    if (ReputationGet("HouseVincula") < 100) {
                        ResetHousesReputation();
                        DialogSetReputation("HouseVincula", 100);
                    }
                    TitleSet("MagicSchoolSorcerer");
                }
                if (title == "succubus") TitleSet("Succubus");
                if (title == "superhero") {
                    InventoryAdd(Player, "AnimeGirl", "Cloth"),
                        TitleSet("AnimeBoy");
                }
                if (title == "superheroine") {
                    InventoryAdd(Player, "AnimeGirl", "Cloth");
                    TitleSet("AnimeGirl");
                }
                if (title == "superspy") {
                    if (SkillGetLevel(Player, "Infiltration") < 10) {
                        SkillChange(Player, "Infiltration", 10);
                    }
                    TitleSet("InfilrationSuperspy");
                }
                if (title == "switch") TitleSet("Switch");
                if (title == "tomboy") TitleSet("Tomboy");
                if (title == "warlock") {
                    if (ReputationGet("HouseCorporis") < 100) {
                        ResetHousesReputation();
                        DialogSetReputation("HouseCorporis", 100);
                    }
                    TitleSet("MagicSchoolWarlock");
                }
                if (title == "warmbloodhorse") {
                    if ((SkillGetLevel(Player, "Dressage") < 4) || (SkillGetLevel(Player, "Infiltration") > 4)) {
                        SkillChange(Player, "Dressage", 4);
                    }
                    TitleSet("PonyWarm");
                }
                if (title == "wildmustang") {
                    if ((SkillGetLevel(Player, "Dressage") < 6) || (SkillGetLevel(Player, "Infiltration") > 6)) {
                        SkillChange(Player, "Dressage", 6);
                    }
                    TitleSet("PonyWild");
                }
                if (title == "witch") {
                    if ((ReputationGet("HouseCorporis") < 50) || (ReputationGet("HouseCorporis") > 99)) {
                        ResetHousesReputation();
                        DialogSetReputation("HouseCorporis", 50);
                    }
                    TitleSet("MagicSchoolWitch");
                }
                if (title == "wizard") {
                    if ((ReputationGet("HouseMaiestas") < 50) || (ReputationGet("HouseMaiestas") > 99)) {
                        ResetHousesReputation();
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
            let target = Player;
            if (args != "") target = TargetSearch(args);
            if (target != null) {
                if (target == Player) {
                    if (noescape) {
                        let msg = umsg1 + umsg3;
                        infomsg(msg);
                    } else {
                        let msg = "Magical lasers make disappear all bindings and toys on " + tmpname + "'s body.";
                        if (Totalrelease != undefined) {
                            if (Totalrelease != "") {
                                msg = tmpname + ' '.repeat(1) + Totalrelease;
                                if (Totalrelease.startsWith("\u0027")) msg = tmpname + Totalrelease;
                            }
                        }
                        if (Totalrelease != "no message") publicmsg(msg);
                        SosClick();
                    }
                } else {
                    if ((target.AllowItem == true) && (target.OnlineSharedSettings.UBC != undefined)) {
                        tgpname = getNickname(target);
                        if (IsTargetProtected(target)) {
                            let msg = umsg1 + tgpname + umsg2;
                            infomsg(msg);
                        } else {
                            let msg = "Magical lasers make disappear all bindings and toys on " + tgpname + "'s body.";
                            if (Ttotalrelease != undefined) {
                                if (Ttotalrelease != "") {
                                    msg = tmpname + ' '.repeat(1) + Ttotalrelease + ' '.repeat(1) + tgpname;
                                    if (Ttotalrelease.startsWith("\u0027")) msg = tmpname + Ttotalrelease + ' '.repeat(1) + tgpname;
                                }
                            }
                            if (Ttotalrelease != "no message") publicmsg(msg);
                            CharacterReleaseTotal(target);
                            ChatRoomCharacterUpdate(target);
                        }
                    }
                }
                ChatRoomSetTarget(-1);
            }
        }
    }])

    CommandCombine([{
        Tag: 'tplistadd',
        Description: "(membernumber): adds a player to the list allowing to teleport you.",
        Action: (args) => {
            if (args === "") {
                let msg = "The tplistadd command must be followed by the member number of the player that you allow to teleport you.";
                infomsg(msg);
            } else {
                let member = args * 1;
                let List;
                if (Player.OnlineSharedSettings.Tplist == undefined) {
                    List = [];
                } else {
                    List = Player.OnlineSharedSettings.Tplist;
                }
                if ((member > 0) && (member != Player.MemberNumber) && (!isNaN(member))) {
                    List.push(member);
                    Player.OnlineSharedSettings.Tplist = List;
                    ServerAccountUpdate.QueueData({
                        OnlineSharedSettings: Player.OnlineSharedSettings
                    });
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'tplistremove',
        Description: "(membernumber): removes a player from the list allowing to teleport you.",
        Action: (args) => {
            if (args === "") {
                let msg = "The tplistremove command must be followed by the member number of the player who is no more allowed to teleport you.";
                infomsg(msg);
            } else {
                let member = args * 1;
                let List;
                if (Player.OnlineSharedSettings.Tplist != undefined) {
                    List = Player.OnlineSharedSettings.Tplist;
                    if ((member > 0) && (member != Player.MemberNumber) && (!isNaN(member))) {
                        let NewList = [];
                        let rm = 0;
                        while (rm < List.length) {
                            if (List[rm] != member) {
                                NewList.push(List[rm]);
                            }
                            rm++;
                        }
                        Player.OnlineSharedSettings.Tplist = NewList;
                        ServerAccountUpdate.QueueData({
                            OnlineSharedSettings: Player.OnlineSharedSettings
                        });
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'tplistshow',
        Description: "displays the list of players allowed to teleport you.",
        Action: (args) => {
            let List;
            if (Player.OnlineSharedSettings.Tplist == undefined) {
                List = [];
            } else {
                List = Player.OnlineSharedSettings.Tplist;
            }
            ChatRoomSendLocal("Tplist: " + JSON.stringify(List));
        }
    }])

    CommandCombine([{
        Tag: 'trsee',
        Description: "(visor) (deafening module) (chin strap): changes the settings of a worn Techno Helmet",
        Action: (args) => {
            if (args === "") {
                let msg = "The trsee command must be followed by 3 numbers for visor, deafening module and chin strap.\n" +
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
                    "1 chin strap";
                infomsg(msg);
            } else {
                if (InventoryGet(Player, "ItemHood") != null) {
                    if (InventoryGet(Player, "ItemHood").Asset.Name == "TechnoHelmet1") {
                        let stringTRvision1 = args;
                        let stringTRvision2 = stringTRvision1.split(/[ ,]+/);
                        let vtr = stringTRvision2[0];
                        let dtr = stringTRvision2[1];
                        let ctr = stringTRvision2[2];
                        if ((vtr > -1) && (vtr < 6) && (dtr > -1) && (dtr < 4) && (ctr > -1) && (ctr < 2)) {
                            const TechnoHelmet1 = InventoryGet(Player, "ItemHood");
                            const TechnoHelmet1Config = ModularItemDataLookup.ItemHoodTechnoHelmet1;
                            TechnoHelmet1.Property = ModularItemMergeModuleValues(TechnoHelmet1Config, [vtr, dtr, ctr]);
                            ChatRoomCharacterUpdate(Player);
                            let msg = "The settings of your Techno Helmet have been modified.";
                            infomsg(msg);
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
                let msg = "The uhelp is organized into categories. Use <b>/uhelp</b> (category). List of categories:\n" +
                    "<b>admin</b> = commands only for chat room admins.\n" +
                    "<b>bondage</b> = commands related to bondage.\n" +
                    "<b>character</b> = commands related to your character.\n" +
                    "<b>chat</b> = commands with extra features in chat room.\n" +
                    "<b>clothing</b> = commands related to the clothes.\n" +
                    "<b>escape</b> = commands related to escape.\n" +
                    "<b>fun</b> = commands related to fun, pain and pleasure.\n" +
                    "<b>maps</b> = commands related to hybrid and map rooms.\n" +
                    "<b>misc</b> = help, info, login and Ulist commands.\n" +
                    "<b>settings</b> = commands to customize ULTRAbc.\n" +
                    "<b>talking</b> = commands related to talking.\n" +
                    "<b>visual</b> = commands related to animations and background.\n" +
                    "<b>zones</b> = commands related to game zones.\n" +
                    "Several commands require or allow to specify a target. It can be a real name or a member number.\n" +
                    "Visit also our <a href='https://github.com/tetris245/ULTRAbc/wiki' target='_blank'>Wiki</a> and join this <a href='https://discord.gg/JUvYfSpCmN' target='_blank'>Discord</a>";
                infomsg(msg);
            }
            if (args === "admin") {
                let msg = "Admin commands\n" +
                    "<b>/autokick</b> = toggles on auto kick for 0 day old accounts.\n" +
                    "<b>/bg1</b> = adds hidden backgrounds to the selection screen.\n" +
                    "<b>/bg2</b> (number) = uses a Bondage Brawl background as standard background. /bg2 to get the list.\n" +
                    "<b>/bg3</b> (number) = uses a Bondage College background as custom background. /bg3 to get the list.";
                infomsg(msg);
            }
            if (args === "bondage") {
                let msg = "Bondage commands - * = more info when using\n" +
                    "<b>/hint</b> (target) (hint) = adds or changes a hint for all current locks with password.\n" +
                    "<b>/itemcolor1</b> (colorcode) (target) = changes color on all current bindings. Color code must be in the format #000000\n" +
                    "<b>/lock</b> = adds locks on all lockable items. *.\n" +
                    "<b>/outfit</b> = restores/saves/loads outfit (including restraints). *\n" +
                    "<b>/pet</b> (target) = becomes a fully restrained pet.\n" +
                    "<b>/randomize</b> (target) = naked + underwear + clothes + restrain commands.\n" +
                    "<b>/restrain</b> (target) = adds random restraints.\n" +
                    "<b>/solidity</b> (value) (target) = changes the solidity of most current bindings. Value must be between 1 and 99.\n" +
                    "<b>/spin</b> (target) (option) = access to any wheel of fortune, even hidden. *";
                infomsg(msg);
            }
            if (args === "character") {
                let msg = "Character commands - * = more info when using\n" +
                    "<b>/difficulty</b> (number) = changes game difficulty. *\n" +
                    "<b>/maxstatistics</b> = gives max statistics.\n" +
                    "<b>/permission</b> (number) = changes your item permission *\n" +
                    "<b>/reputation</b> (reputation) (level) = changes a reputation. *\n" +
                    "<b>/resetinventory</b> = erases your inventory.\n" +
                    "<b>/roleplay</b> (rolehere) = starts a role. *\n" +
                    "<b>/rolequit</b> (role or clubarea here) = ceases to play a role. *\n" +
                    "<b>/skill</b> (skill) (level) = changes a skill. *\n" +
                    "<b>/title1</b> (newtitlehere) = chooses a new title (from A to K). *\n" +
                    "<b>/title2</b> (newtitlehere) = chooses a new title (from L to Z). *";
                infomsg(msg);
            }
            if (args === "chat") {
                let msg = "Chat commands - * = more info when using\n" +
                    "<b>/bio</b> (target) = sees profile of any player in chat room.\n" +
                    "<b>/erase</b> = erases chat.\n" +
                    "<b>/font</b> (newfont) (size) = changes font in BC. *\n" +
                    "<b>/frlist</b> (lobby) = gives access to friendlist in specified lobby. *\n" +                   
                    "<b>/search</b> (lobby) = opens chat search in specified lobby. *\n" +
                    "<b>/theme</b> (number) = changes chat color theme. Number between 0 and 3.";
                infomsg(msg);
            }
            if (args === "clothing") {
                let msg = "Clothing commands - * = more info when using\n" +
                    "<b>/clothes</b> (target) = changes clothes.\n" +
                    "<b>/naked</b> (target) = removes clothes.\n" +
                    "<b>/outfit</b> (options) = restores/saves/loads outfit (including restraints). *\n" +
                    "<b>/underwear</b> (target) = changes underwear.\n" +
                    "<b>/wrobe</b> (target) = opens target wardrobe.";
                infomsg(msg);
            }
            if (args === "escape") {
                let msg = "Escape commands - * = more info when using\n" +
                    "<b>/boost</b> = boosts all your skills for one hour.\n" +
                    "<b>/infolock</b> = gives extra info (code, password, time left) for lock used on worn item in selected slot.\n" +
                    "<b>/quit</b> (action) = leaves room.\n" +
                    "<b>/removecollar</b> = temporarily removes slave/owner collar.\n" +
                    "<b>/resetdifficulty</b> = resets difficulty, thereby quitting it.\n" +
                    "<b>/safeworditem</b> = removes specific item. *\n" +
                    "<b>/solidity</b> (value) (target) = changes the solidity of most current bindings. Use low values to escape! Value 1 to escape special restraints.\n" +
                    "<b>/totalrelease</b> (target) = removes all bindings, collar, harness, chastity, toys.\n" +
                    "<b>/unlock</b> (target) (locktype) = removes all locks or only a specified type of lock. *\n" +
                    "<b>/untie</b> (target) = removes all bindings.";
                infomsg(msg);
            }
            if (args === "fun") {
                let msg = "Fun commands - * = more info when using\n" +
                    "** = scripts must be allowed in BC settings\n" +
                    "<b>/cum</b> = causes an orgasm.\n" +
                    "<b>/invisible</b> (target) = goes or sends to invisible mode. **\n" +
                    "<b>/poof</b> (action) = leaves the club very fast. Action is optional (default = poofs away).\n" +
                    "<b>/sfchaste</b> (options) = changes settings of worn Futuristic Chastity Belt. *\n" +
                    "<b>/shock</b> (slot) (sensibility) (intensity) = changes mode of worn device shock in a specific slot. *\n" +
                    "<b>/sleep</b> (target) = uses the sleeping pill.\n" +
                    "<b>/slowleave</b> (action) = slowly leaves the room.\n" +
                    "<b>/superdice</b> (sides) = rolls a superdice. Sides can be between 2 and 999999999.\n" +
                    "<b>/vibe</b> (slot) (mode) = changes mode of worn vibe in a specific slot. *\n" +
                    "<b>/visible</b> (target) = goes or sends back to visible mode. **";
                infomsg(msg);
            }
            if (args === "maps") {
                let msg = "Maps commands\n" +
                    "<b>/mapfog</b> = toggles fog in current map room.\n" +
                    "<b>/mapkeys</b> = gives all keys for current map room.\n" +
                    "<b>/maproom</b> = gives infos about players in current map.\n" +
                    "<b>/mapx</b> (x-position) = changes your X coordinate in the map.\n" +
                    "<b>/mapy</b> (y-position) = changes your Y coordinate in the map.\n" +
                    "<b>/mapz</b> (target) = gives coordinates in the map.\n" +
		    "<b>/mapzoom</b> (value) = changes zoom level in map rooms.\n" +
                    "<b>/tplistadd</b> (membernumber) = adds a player to the list allowing to teleport you.\n" +
                    "<b>/tplistremove</b> (membernumber) = removes a player from the list allowing to teleport you.\n" +
                    "<b>/tplistshow</b> = displays the list of players allowed to teleport you.";
                infomsg(msg);
            }
            if (args === "misc") {
                let msg = "Misc commands - * = more info when using\n" +
                    "<b>/login</b> (accountname) (password) = logs in a new account.\n" +
                    "<b>/mbsroom</b> = infos about MBS wheels in current room.\n" +
                    "<b>/mstatus</b> = displays current status of the moaner.\n" +
                    "<b>/pmenu</b> = direct access to Preferences screen.\n" +
                    "<b>/relog</b> = relogs.\n" +
                    "<b>/thmlogin</b> (options) shows/hides Credits and/or NPCs on login screen, when Themed mod used. *\n" +
                    "<b>/uhelp</b> (category) = displays the ULTRAbc commands. *\n" +
                    "<b>/ulistadd</b> (membernumber) = adds a player to the list allowing to bypass Uwall.\n" +
                    "<b>/ulistremove</b> (membernumber) = removes a player from the list allowing to bypass Uwall.\n" +
                    "<b>/ulistshow</b> = displays the list of players allowed to bypass Uwall.\n" +
                    "<b>/uroom</b> = infos about UBC users and Uwall in current room.\n" +
                    "<b>/xmenu</b> = direct access to Extensions screen.\n" +
                    "<b>/xstatus</b> (add-on) = displays status of main settings for other add-ons. *";
                infomsg(msg);
            }
            if (args === "settings") {
                let msg = "Settings commands - * = more info when using\n" +
                    "<b>/bg4</b> (screen) (background) = selects a standard background for the some specific BC rooms. *\n" +
                    "<b>/bglist</b> displays the list of all available standard backgrounds.\n" +
                    "<b>/bgshow1</b> (bgnumber) = displays locally clickable link to a specific standard background and embedded picture.\n" +
                    "<b>/bgshow2</b> (bgnumber) = sends in chat link to a specific standard background. Clickable link and embedding possible if used with WCE feature.\n" +
                    "<b>/killpar</b> = kills UBC/Moaner parameters saved locally.\n" +
                    "<b>/message</b> (option) (message) = creates custom messages for specific command. *";
                infomsg(msg);
            }
            if (args === "talking") {
                let msg = "Talking commands - * = more info when using\n" +
                    "<b>/atalk</b> (stuffhere) = speaks once as an animal. *\n" +
                    "<b>/btalk</b> (stuffhere) = speaks once as a baby.\n" +
                    "<b>/gtalk</b> (talkmode) (stuffhere) = speaks once in specified gag talk. *\n" +
                    "<b>/murmur</b> (MemberNumber|Name|Nickname) (Message) = sends a whisper to a player. Error messages will not disappear.\n" +
                    "<b>/ping</b> (MemberNumber) (Message) = sends a beep to a player. Beep errors will not disappear.\n" +
                    "<b>/stalk</b> (stuttermode) (stuffhere) = speaks once in specified stuttering mode. *";
                infomsg(msg);
            }
            if (args === "visual") {
                let msg = "Visual commands - * = more info when using\n" +
                    "<b>/colorchanger</b> (anim) =  animation with color change. *\n" +
                    "<b>/itemcolor2</b> (colorcode) = changes item color in selected slot. *\n" +
                    "<b>/itempriority</b> (priority) = changes item priority in selected slot. *\n" +
                    "<b>/layerset1</b> (layernumber) (colorcode) = changes layer color of item in saved Item Slot. *\n" +
                    "<b>/layerset2</b> (layernumber) (priority) = changes layer priority of item in saved Item Slot. *\n" +
                    "<b>/layershow1</b> = color info and saving of Item Slot.\n" +
                    "<b>/layershow2</b> = priority info + saving of Item Slot.\n" +
                    "<b>/pose2</b> (pose) (target) = changes pose of any player. *\n" +
                    "<b>/trsee</b> (visor) (deafening module) (chin strap) = changes the settings of a worn Techno Helmet. * \n" +
                    "<b>/vrsee</b> (background) (mode) (game) = changes the settings of a worn VR Headset. *";
                infomsg(msg);
            }
            if (args === "zones") {
                let msg = "Zones commands - * = more info when using\n" +
                    "<b>/asylum</b> (minutes) = enters asylum, bypasses requirements. Specify minutes if you are a patient.\n" +
                    "<b>/cgame</b> (zone) = launches a NPC Club Card Game. *\n" +
                    "<b>/chess</b> (difficulty) = starts chess, must specify difficulty first (1 easy - 2 normal - 3 hard).\n" +
                    "<b>/college</b> = enters college, bypasses requirements.\n" +
                    "<b>/game</b> (minigame) = launches a minigame. *\n" +
                    "<b>/ggts</b> (minutes) (level) = enters ggts training in asylum for the specified time. Level must be between 1 and 6.\n" +
                    "<b>/keydeposit</b> (hours) = keeps your keys safe in the vault. More than 7 days (168 hours) is possible. \n" +
                    "<b>/mission</b> (missiontype) = forces an infiltration mission. *\n" +
                    "<b>/prison1</b> (minutes) = stays in NPC Pandora prison. More than 60 minutes is possible.\n" +
                    "<b>/prison2</b> (minutes) = stays in online Pandora prison. More than 1 day (1440 minutes) is possible. *\n" +
                    "<b>/store</b> = Goes to store. Shows hidden items.\n" +
                    "<b>/timercell</b> (minutes) = stays in the isolation cell. More than 60 minutes is possible.";
                infomsg(msg);
            }
        }
    }])

    CommandCombine([{
        Tag: 'ulistadd',
        Description: "(membernumber): adds a player to the list allowing to bypass Uwall.",
        Action: (args) => {
            if (args === "") {
                let msg = "The ulistadd command must be followed by the member number of the player that you allow to bypass Uwall.";
                infomsg(msg);
            } else {
                let member = args * 1;
                let List;
                if (Player.OnlineSharedSettings.Ulist == undefined) {
                    List = [];
                } else {
                    List = Player.OnlineSharedSettings.Ulist;
                }
                if ((member > 0) && (member != Player.MemberNumber) && (!isNaN(member))) {
                    List.push(member);
                    Player.OnlineSharedSettings.Ulist = List;
                    ServerAccountUpdate.QueueData({
                        OnlineSharedSettings: Player.OnlineSharedSettings
                    });
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'ulistremove',
        Description: "(membernumber): removes a player from the list allowing to bypass Uwall.",
        Action: (args) => {
            if (args === "") {
                let msg = "The ulistremove command must be followed by the member number of the player who is no more allowed to bypass Uwall.";
                infomsg(msg);
            } else {
                let member = args * 1;
                let List;
                if (Player.OnlineSharedSettings.Ulist != undefined) {
                    List = Player.OnlineSharedSettings.Ulist;
                    if ((member > 0) && (member != Player.MemberNumber) && (!isNaN(member))) {
                        let NewList = [];
                        let rm = 0;
                        while (rm < List.length) {
                            if (List[rm] != member) {
                                NewList.push(List[rm]);
                            }
                            rm++;
                        }
                        Player.OnlineSharedSettings.Ulist = NewList;
                        ServerAccountUpdate.QueueData({
                            OnlineSharedSettings: Player.OnlineSharedSettings
                        });
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'ulistshow',
        Description: "displays the list of players allowed to bypass Uwall.",
        Action: (args) => {
            let List;
            if (Player.OnlineSharedSettings.Ulist == undefined) {
                List = [];
            } else {
                List = Player.OnlineSharedSettings.Ulist;
            }
            ChatRoomSendLocal("Ulist: " + JSON.stringify(List));
        }
    }])

    CommandCombine([{
        Tag: 'underwear',
        Description: "(target): changes underwear.",
        Action: (args) => {
            let target = Player;
            if (args != "") target = TargetSearch(args);
            if (target != null) {
                if (target == Player) {
                    let msg = "Magical lasers put " + tmpname + " in random underwear.";
                    if (Underwear != undefined) {
                        if (Underwear != "") {
                            msg = tmpname + ' '.repeat(1) + Underwear;
                            if (Underwear.startsWith("\u0027")) msg = tmpname + Underwear;
                        }
                    }
                    if (Underwear != "no message") publicmsg(msg);
                    CharacterRandomUnderwear(Player);
                    ChatRoomCharacterUpdate(Player);
                } else {
                    if ((target.AllowItem == true) && (target.OnlineSharedSettings.UBC != undefined)) {
                        tgpname = getNickname(target);
                        if (IsTargetProtected(target)) {
                            let msg = umsg1 + tgpname + umsg2;
                            infomsg(msg);
                        } else {
                            let msg = "Magical lasers put " + tgpname + " in random underwear.";
                            if (Tunderwear != undefined) {
                                if (Tunderwear != "") {
                                    msg = tmpname + ' '.repeat(1) + Tunderwear + ' '.repeat(1) + tgpname;
                                    if (Tunderwear.startsWith("\u0027")) msg = tmpname + Tunderwear + ' '.repeat(1) + tgpname;
                                }
                            }
                            if (Tunderwear != "no message") publicmsg(msg);
                            CharacterRandomUnderwear(target);
                            ChatRoomCharacterUpdate(target);
                        }
                    }
                }
                ChatRoomSetTarget(-1);
            }
        }
    }])

    CommandCombine([{
        Tag: 'unlock',
        Description: "(target) (locktype): removes all locks or only a specified type of lock on specified target.",
        Action: (args) => {
            if (args === "") {
                let msg = "The unlock command:\n" +
                    "<b>/unlock</b> (target) (locktype).\n" +
                    "The target always needs to be specified.\n" +
                    "All locks of any type will be removed if you don't specify the lock type.\n" +
                    " \n" +
                    "The lock types:\n" +
                    "1 Metal (default if wrong value entered) - 2 Exclusive\n" +
                    "3 Intricate - 4 High Security - 5 Pandora\n" +
                    "6 Mistress - 7 Lover - 8 Owner - 9 Five Minutes\n" +
                    "10 Combination - 11 Safeword - 12 Password\n" +
                    "13 Mistress Timer - 14 Lover Timer - 15 Owner Timer\n" +
                    "16 Timer Password - 17 Best Friend - 18 BF Timer\n" +
                    "19 Family - 20 Lewd Crest - 21 Devious \n" +
                    "22 Portal Link\n" +
                    "Lock 21 can be removed only if players use a modified version of the DOGS mod.";
                infomsg(msg);
            } else {
                let silent = 0;
                let uw = 0;
                let stringUnlock1 = args;
                let stringUnlock2 = stringUnlock1.split(/[ ,]+/);
                let lk = stringUnlock2[1];
                let targetname = stringUnlock2[0];
                let target = TargetSearch(targetname);
                if ((target != null) && ((target == Player) || (target.AllowItem == true)) && (target.OnlineSharedSettings.UBC != undefined)) {
                    tgpname = getNickname(target);
                    if (tmpname == tgpname) {
                        if (noescape) {
                            let msg = umsg1 + umsg3;
                            infomsg(msg);
                        } else {
                            let msg = "Magical lasers make disappear locks on " + tgpname + "'s body.";
                            if (Unlock != undefined) {
                                if (Unlock != "") {
                                    msg = tmpname + ' '.repeat(1) + Unlock;
                                    if (Unlock.startsWith("\u0027")) msg = tmpname + Unlock;
                                }
                            }
                            if (Unlock == "no message") silent = 1;
                            if (silent == 0) publicmsg(msg);
                        }
                    } else {
                        if (IsTargetProtected(target)) {
                            uw = 1;
                            let msg = umsg1 + tgpname + umsg2;
                            infomsg(msg);
                        } else {
                            let msg = "Magical lasers make disappear locks on " + tgpname + "'s body.";
                            if (Tunlock != undefined) {
                                if (Tunlock != "") {
                                    msg = tmpname + ' '.repeat(1) + Tunlock + ' '.repeat(1) + tgpname;
                                    if (Tunlock.startsWith("\u0027")) msg = tmpname + Tunlock + ' '.repeat(1) + tgpname;
                                }
                            }
                            if (Tunlock == "no message") silent = 1;
                            if (silent == 0) publicmsg(msg);
                        }
                    }
                    if (uw == 0) {
                        if (lk == null) {
                            let lm = 1;
                            while (lm < 17) {
                                CharacterReleaseFromLock(target, locks[lm]);
                                lm++;
                            }
                            CharacterReleaseFromLock(target, locks[19]);
                            CharacterReleaseFromLock(target, locks[22]);
                            for (let A = 0; A < target.Appearance.length; A++)
                                if ((target.Appearance[A].Property != null) &&
                                    (target.Appearance[A].Property.LockedBy == "\u{6DEB}\u{7EB9}\u{9501}_Luzi_Padlock"))
                                    InventoryUnlock(target, target.Appearance[A]);
                        } else {
                            if (!CommonIsNumeric(lk)) lk = 1;
                            if ((lk < 1) || (lk > 22)) lk = 1;
                            let Lock = locks[lk];
                            if ((lk != 4) && (lk != 17) && (lk != 18) && (lk != 20) && (lk != 21)) CharacterReleaseFromLock(target, Lock);
                            if (lk == 4) {
                                for (let A = 0; A < target.Appearance.length; A++)
                                    if ((target.Appearance[A].Property != null) &&
                                        (target.Appearance[A].Property.LockedBy == "HighSecurityPadlock") &&
                                        (target.Appearance[A].Property.Name == undefined))
                                        InventoryUnlock(target, target.Appearance[A]);
                            }
                            if (lk == 17) {
                                for (let A = 0; A < target.Appearance.length; A++)
                                    if ((target.Appearance[A].Property != null) &&
                                        (target.Appearance[A].Property.LockedBy == "HighSecurityPadlock") &&
                                        (target.Appearance[A].Property.Name == "Best Friend Padlock"))
                                        InventoryUnlock(target, target.Appearance[A]);
                            }
                            if (lk == 18) {
                                for (let A = 0; A < target.Appearance.length; A++)
                                    if ((target.Appearance[A].Property != null) &&
                                        (target.Appearance[A].Property.LockedBy == "HighSecurityPadlock") &&
                                        (target.Appearance[A].Property.Name == "Best Friend Timer Padlock"))
                                        InventoryUnlock(target, target.Appearance[A]);
                            }
                            if (lk == 20) {
                                for (let A = 0; A < target.Appearance.length; A++)
                                    if ((target.Appearance[A].Property != null) &&
                                        (target.Appearance[A].Property.LockedBy == "\u{6DEB}\u{7EB9}\u{9501}_Luzi_Padlock"))
                                        InventoryUnlock(target, target.Appearance[A]);
                            }
                            if (lk == 21) {
                                for (let A = 0; A < target.Appearance.length; A++)
                                    if ((target.Appearance[A].Property != null) &&
                                        (target.Appearance[A].Property.LockedBy == "ExclusivePadlock") &&
                                        (target.Appearance[A].Property.Name == "DeviousPadlock"))
                                        InventoryUnlock(target, target.Appearance[A]);
                            }
                        }
                        ChatRoomCharacterUpdate(target);
                    }
                }
                ChatRoomSetTarget(-1);
            }
        }
    }])

    CommandCombine([{
        Tag: 'untie',
        Description: "(target): removes all bindings.",
        Action: (args) => {
            let target = Player;
            if (args != "") target = TargetSearch(args);
            if (target != null) {
                if (target == Player) {
                    if (noescape) {
                        let msg = umsg1 + umsg3;
                        infomsg(msg);
                    } else {
                        let msg = "Magical lasers make disappear the bindings on " + tmpname + "'s body.";
                        if (Untie != undefined) {
                            if (Untie != "") {
                                msg = tmpname + ' '.repeat(1) + Untie;
                                if (Untie.startsWith("\u0027")) msg = tmpname + Untie;
                            }
                        }
                        if (Untie != "no message") publicmsg(msg);
                        CharacterRelease(Player);
                        ChatRoomCharacterUpdate(Player);
                        RealGarblingLevel();
                    }
                } else {
                    if ((target.AllowItem == true) && (target.OnlineSharedSettings.UBC != undefined)) {
                        tgpname = getNickname(target);
                        if (IsTargetProtected(target)) {
                            let msg = umsg1 + tgpname + umsg2;
                            infomsg(msg);
                        } else {
                            let msg = "Magical lasers make disappear the bindings on " + tgpname + "'s body.";
                            if (Tuntie != undefined) {
                                if (Tuntie != "") {
                                    msg = tmpname + ' '.repeat(1) + Tuntie + ' '.repeat(1) + tgpname;
                                    if (Tuntie.startsWith("\u0027")) msg = tmpname + Tuntie + ' '.repeat(1) + tgpname;
                                }
                            }
                            if (Tuntie != "no message") publicmsg(msg);
                            CharacterRelease(target);
                            ChatRoomCharacterUpdate(target);
                        }
                    }
                }
                ChatRoomSetTarget(-1);
            }
        }
    }])

    CommandCombine([{
        Tag: 'uroom',
        Description: ": gives infos about UBC users and Uwall protection in current chat room.",
        Action: () => {
            let pl = 0;
            while (pl < ChatRoomCharacter.length) {
                let name = "";
                let aka = "";
                if ((ChatRoomCharacter[pl].Nickname == '') || (ChatRoomCharacter[pl].Nickname == undefined)) {
                    name = ChatRoomCharacter[pl].Name;
                } else {
                    name = ChatRoomCharacter[pl].Nickname;
                    aka = ChatRoomCharacter[pl].Name;
                }
                let number = ChatRoomCharacter[pl].MemberNumber;
                ChatRoomSendLocal(name + " (" + aka + ") - " + number);
                let ubc1 = "Does not use ULTRAbc.";
                let ubc2 = "Does not use Uwall.";
                if (ChatRoomCharacter[pl].OnlineSharedSettings.UBC != undefined) {
                    if ((ChatRoomCharacter[pl].OnlineSharedSettings.UBC == UBCver) || (ChatRoomCharacter[pl].OnlineSharedSettings.UBC == UBCver0)) {
                        ubc1 = "Is an ULTRAbc user.";
                        if (ChatRoomCharacter[pl].OnlineSharedSettings.Unoescape != undefined) {
                            if (ChatRoomCharacter[pl].OnlineSharedSettings.Unoescape == true) ubc1 = "UBC in no-escape mode";
                        }
                    }
                }
                if (ChatRoomCharacter[pl].OnlineSharedSettings.Uwall != undefined) {
                    if (ChatRoomCharacter[pl].OnlineSharedSettings.Uwall == true) {
                        ubc2 = "Has enabled Uwall.";
                    } else {
                        ubc2 = "Has disabled Uwall.";
                    }
                }
                ChatRoomSendLocal(ubc1 + " - " + ubc2);
                ChatRoomSendLocal(" ");
                pl++;
            }
        }
    }])

    CommandCombine([{
        Tag: 'vibe',
        Description: ": (slot) (mode): changes mode of worn vibe in a specific slot.",
        Action: (args) => {
            if (args === "") {
                let msg = "The vibe command must be followed by two numbers:\n" +
                    "- a number for the concerned slot:\n" +
                    "0 = Boots - 1 = Breast - 2 = Butt - 3 = Clitoris/Gland\n" +
                    "4 = Devices - 5 = Feet - 6 = Nipples\n" +
                    "7 = Nipples Piercings - 8 = Pelvis - 9 = Vulva/Penis\n" +
                    " \n" +
                    "- a number for the mode of the vibe in this slot:\n" +
                    "0 = Off - 1 = Low - 2 = Medium - 3 = High - 4 = Maximum\n" +
                    "5 = Random - 6 = Escalate - 7 = Tease - 8 = Deny - 9 = Edge\n" +
                    "Note that modes 5 to 9 are not available on some vibes!\n" +
                    "For Heavy Duty Belt, Sci-Fi Pleasure Panties and the Glass Jar: 5, 6 or 7 = Allow orgasm\n" +
                    "This command does not support the Futuristic Training Belt and the Lewd Crest.";
                infomsg(msg);
            } else {
                let Target = "";
                let Item = "";
                let stringSol1 = args;
                let stringSol2 = stringSol1.split(/[ ,]+/);
                let slot = stringSol2[0];
                let mode = stringSol2[1];
                let msg = "Mode changed for one of your vibes!";
                if ((slot > -1) && (slot < 10)) {
                    if (slot == 0) Target = "ItemBoots";
                    if (slot == 1) Target = "ItemBreast";
                    if (slot == 2) Target = "ItemButt";
                    if (slot == 3) Target = "ItemVulvaPiercings";
                    if (slot == 4) Target = "ItemDevices";
                    if (slot == 5) Target = "ItemFeet";
                    if (slot == 6) Target = "ItemNipples";
                    if (slot == 7) Target = "ItemNipplesPiercings";
                    if (slot == 8) Target = "ItemPelvis";
                    if (slot == 9) Target = "ItemVulva";
                    Item = InventoryGet(Player, Target);
                    if (Item != null) {
                        if (Item.Asset.Name == "ClitAndDildoVibratorbelt") {
                            if ((mode > -1) && (mode < 5)) {
                                ExtendedItemSetOptionByRecord(Player, Item, {
                                    d: mode,
                                    e: mode,
                                }, {
                                    push: true,
                                    refresh: true,
                                });
                                ChatRoomCharacterUpdate(Player);
                                infomsg(msg);
                            }
                        }
                        if ((Item.Asset.Name == "FuturisticCrate") && (Item.Property.TypeRecord.d == 1)) {
                            if ((mode > -1) && (mode < 10)) {
                                ExtendedItemSetOptionByRecord(Player, Item, {
                                    d1: mode,
                                }, {
                                    push: true,
                                    refresh: true,
                                });
                                ChatRoomCharacterUpdate(Player);
                                infomsg(msg);
                            }
                        }
                        if ((Item.Asset.Name == "HeavyDutyBelt") || (Item.Asset.Name == "ModularChastityBelt") || (Item.Asset.Namer == "SciFiPleasurePanties")) {
                            if ((mode > -1) && (mode < 10)) {
                                if ((mode > -1) && (mode < 5)) {
                                    ExtendedItemSetOptionByRecord(Player, Item, {
                                        i: mode,
                                    }, {
                                        push: true,
                                        refresh: true,
                                    });
                                }
                                if ((mode > 4) && (mode < 10)) {
                                    let smode = "";
                                    if ((mode > 4) && (mode < 18)) smode = 0;
                                    if (mode == 8) smode = 1;
                                    if (mode == 9) smode = 2;
                                    ExtendedItemSetOptionByRecord(Player, Item, {
                                        o: smode,
                                    }, {
                                        push: true,
                                        refresh: true,
                                    });
                                }
                                ChatRoomCharacterUpdate(Player);
                                infomsg(msg);
                            }
                        }
                        if ((Item.Asset.Name == "InflatableVibeDildo") || (Item.Asset.Name == "InflatableVibratingPanties") || (Item.Asset.Name == "InflVibeButtPlug")) {
                            if ((mode > -1) && (mode < 5)) {
                                ExtendedItemSetOptionByRecord(Player, Item, {
                                    i: mode,
                                }, {
                                    push: true,
                                    refresh: true,
                                });
                                ChatRoomCharacterUpdate(Player);
                                infomsg(msg);
                            }
                        }
                        if ((Item.Asset.Name == "LoveChastityBelt") && (Item.Property.TypeRecord.f == 2)) {
                            if ((mode > -1) && (mode < 5)) {
                                ExtendedItemSetOptionByRecord(Player, Item, {
                                    i: mode,
                                }, {
                                    push: true,
                                    refresh: true,
                                });
                                ChatRoomCharacterUpdate(Player);
                                infomsg(msg);
                            }
                        }
                        if ((Item.Asset.Name == "OneBarGirl") || (Item.Asset.Name == "TormentHeels")) {
                            if ((mode > -1) && (mode < 5)) {
                                ExtendedItemSetOptionByRecord(Player, Item, {
                                    v: mode,
                                }, {
                                    push: true,
                                    refresh: true,
                                });
                                ChatRoomCharacterUpdate(Player);
                                infomsg(msg);
                            }
                        }
                        if (Item.Asset.Name == "\u{73BB}\u{7483}\u{7F50}\u{5B50}_Luzi") {
                            if ((mode > -1) && (mode < 10)) {
                                if ((mode > -1) && (mode < 5)) {
                                    ExtendedItemSetOptionByRecord(Player, Item, {
                                        k: mode,
                                    }, {
                                        push: true,
                                        refresh: true,
                                    });
                                }
                                if ((mode > 4) && (mode < 10)) {
                                    let smode = "";
                                    if ((mode > 4) && (mode < 18)) smode = 0;
                                    if (mode == 8) smode = 1;
                                    if (mode == 9) smode = 2;
                                    ExtendedItemSetOptionByRecord(Player, Item, {
                                        g: smode,
                                    }, {
                                        push: true,
                                        refresh: true,
                                    });
                                }
                                ChatRoomCharacterUpdate(Player);
                                infomsg(msg);
                            }
                        }
                        if (Item.Asset.Name == "\u{66F4}\u{591A}\u{6709}\u{7EBF}\u{8DF3}\u{86CB}_Luzi") {
                            if ((mode > -1) && (mode < 5)) {
                                ExtendedItemSetOptionByRecord(Player, Item, {
                                    o: mode,
                                }, {
                                    push: true,
                                    refresh: true,
                                });
                                ChatRoomCharacterUpdate(Player);
                                infomsg(msg);
                            }
                        }
                        if (Item.Asset.Name == "FuturisticTrainingBelt") {
                            if ((mode > -1) && (mode < 5)) {
                                ExtendedItemSetOptionByRecord(Player, Item, {
                                    vibrating: mode,
                                }, {
                                    push: true,
                                    refresh: true,
                                });
                                ChatRoomCharacterUpdate(Player);
                                infomsg(msg);
                            }
                        }
                        if ((Item.Asset.Name == "BunnyTailVibePlug") ||
                            (Item.Asset.Name == "ClitoralStimulator") ||
                            (Item.Asset.Name == "EggVibePlugXXL") ||
                            (Item.Asset.Name == "FuckMachine") ||
                            (Item.Asset.Name == "FullLatexSuitWand") ||
                            (Item.Asset.Name == "FuturisticVibrator") ||
                            (Item.Asset.Name == "HempRopeBelt") ||
                            (Item.Asset.Name == "LatexNudge") ||
                            (Item.Asset.Name == "LockingVibePlug") ||
                            (Item.Asset.Name == "NippleVibe") ||
                            (Item.Asset.Name == "SpreaderVibratingDildoBar") ||
                            (Item.Asset.Name == "Sybian") ||
                            (Item.Asset.Name == "TapedClitEgg") ||
                            (Item.Asset.Name == "TapedVibeEgg") ||
                            (Item.Asset.Name == "TickleBra") ||
                            (Item.Asset.Name == "VibeEggGland") ||
                            (Item.Asset.Name == "VibeEggPenisBase") ||
                            (Item.Asset.Name == "VibeHeartClitPiercing") ||
                            (Item.Asset.Name == "VibeHeartPiercings") ||
                            (Item.Asset.Name == "VibeNippleClamp") ||
                            (Item.Asset.Name == "VibratingButtplug") ||
                            (Item.Asset.Name == "VibratingDildo") ||
                            (Item.Asset.Name == "VibratingDildoPlug") ||
                            (Item.Asset.Name == "VibratingEgg") ||
                            (Item.Asset.Name == "VibratingLatexPanties") ||
                            (Item.Asset.Name == "WandBelt") ||
                            (Item.Asset.Name == "WiredEgg") ||
                            (Item.Asset.Name == "\u{4E73}\u{5939}_Luzi")) {
                            if ((mode > -1) && (mode < 10)) {
                                ExtendedItemSetOptionByRecord(Player, Item, {
                                    vibrating: mode,
                                }, {
                                    push: true,
                                    refresh: true,
                                });
                                ChatRoomCharacterUpdate(Player);
                                infomsg(msg);
                            }
                        }
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'visible',
        Description: ": (target): goes back or sends back to visible mode.",
        Action: (args) => {
            let target = Player;
            if (args != "") target = TargetSearch(args);
            if (target != null) {
                if (target == Player) {
                    let msg = "" + tmpname + " suddenly is visible for everybody.";
                    if (Visible != undefined) {
                        if (Visible != "") {
                            msg = tmpname + ' '.repeat(1) + Visible;
                            if (Visible.startsWith("\u0027")) msg = tmpname + Visible;
                        }
                    }
                    if (Visible != "no message") publicmsg(msg);
                    InventoryRemove(Player, "ItemScript");
                    CurrentScreen === 'ChatRoom' ?
                        ChatRoomCharacterUpdate(Player) :
                        CharacterRefresh(Player);
                } else {
                    if ((target.AllowItem == true) && (target.OnlineSharedSettings.UBC != undefined)) {
                        tgpname = getNickname(target);
                        if (target.OnlineSharedSettings.ScriptPermissions.Hide.permission == 0) {
                            let msg = "To use the visible command on other players, they need first to allow Scripts in BC settings.";
                            infomsg(msg);
                        } else {
                            if (IsTargetProtected(target)) {
                                let msg = umsg1 + tgpname + umsg2;
                                infomsg(msg);
                            } else {
                                let msg = "" + tgpname + " suddenly is visible for everybody.";
                                if (Tvisible != undefined) {
                                    if (Tvisible != "") {
                                        msg = tmpname + ' '.repeat(1) + Tvisible + ' '.repeat(1) + tgpname;
                                        if (Tvisible.startsWith("\u0027")) msg = tmpname + Tvisible + ' '.repeat(1) + tgpname;
                                    }
                                }
                                if (Tvisible != "no message") publicmsg(msg);
                                InventoryRemove(target, "ItemScript");
                                CurrentScreen === 'ChatRoom' ?
                                    ChatRoomCharacterUpdate(target) :
                                    CharacterRefresh(target);
                            }
                        }
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'vrsee',
        Description: "(background) (mode) (game): changes the settings of a worn VR Headset.",
        Action: (args) => {
            if (args === "") {
                let msg = "The vrsee command must be followed by 3 numbers for background, mode and game.\n" +
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
                    "1 Kinky Dungeon";
                infomsg(msg);
            } else {
                if (InventoryGet(Player, "ItemHead") != null) {
                    if (InventoryGet(Player, "ItemHead").Asset.Name == "InteractiveVRHeadset") {
                        let stringVRvision1 = args;
                        let stringVRvision2 = stringVRvision1.split(/[ ,]+/);
                        let bvr = stringVRvision2[0];
                        let fvr = stringVRvision2[1];
                        let gvr = stringVRvision2[2];
                        if ((bvr > -1) && (bvr < 6) && (fvr > -1) && (fvr < 4) && (gvr > -1) && (gvr < 2)) {
                            const InteractiveVRHeadset = InventoryGet(Player, "ItemHead");
                            const InteractiveVRHeadsetConfig = ModularItemDataLookup.ItemHeadInteractiveVRHeadset;
                            InteractiveVRHeadset.Property = ModularItemMergeModuleValues(InteractiveVRHeadsetConfig, [bvr, fvr, gvr]);
                            ChatRoomCharacterUpdate(Player);
                            let msg = "The settings of your VR Headset have been modified.";
                            infomsg(msg);
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
                ChatRoomCharacterViewClickCharacter(Player);
                DialogChangeClothes();
            } else {
                let target = TargetSearch(args);
                if ((target != null) && (target.OnlineSharedSettings.UBC != undefined)) {
                    tgpname = getNickname(target);
                    if (IsTargetProtected(target)) {
                        let msg = umsg1 + tgpname + umsg2;
                        infomsg(msg);
                    } else {
                        target.OnlineSharedSettings.AllowFullWardrobeAccess = true;
                        target.OnlineSharedSettings.BlockBodyCosplay = false;
                        ChatRoomCharacterViewClickCharacter(target);
                        DialogChangeClothes();
                    }
                }
                ChatRoomSetTarget(-1);
            }
        }
    }])

    CommandCombine([{
        Tag: 'xmenu',
        Description: ": direct access to Extensions menu.",
        Action: () => {
            ExtClick();
        }
    }])

   CommandCombine([{
        Tag: 'xstatus',
        Description: "(add-on): displays status of settings for other add-ons.",
        Action: (args) => {
            if (args === "") {
                let msg = "The xstatus command must be followed by an option corresponding to an add-on.\n" +
                    " \n" +
                    "Available options:\n" +
                    "bcar for BCAR\n" +
                    "bcr for BC Responsive\n" +
                    "bctw for BCTweaks\n" +
                    "dogs for DOGS\n" +
                    "ebch for EBCH\n" +
                    "lscg for LSCG\n" +
                    "mbs for MBS\n" +
                    "rsp for Responsive\n" +
                    "thm for Themed-BC\n" +
                    "wce for WCE";
                infomsg(msg);
            } else {
                let addon = args;
                if (addon == "bcar") {
                    let str = Player.OnlineSettings.BCAR;
                    if (str) {
                        let BCAR = Player.OnlineSettings.BCAR.bcarSettings;
                        if (BCAR) {
                            let BCARdata = Player.OnlineSettings.BCAR.bcarSettings;
                            showAnimalTypeStatus(BCARdata);
                            showAnimationButtonsStatus(BCARdata);
                            showArousalManipulationStatus(BCARdata);
                            showBCARExpressionsStatus(BCARdata);
                            showEarAnimationStatus(BCARdata);
                            showEarEmoteStatus(BCARdata);
                            showTailAnimationStatus(BCARdata);
                            showTailEmoteStatus(BCARdata);
                            showWingAnimationStatus(BCARdata);
                        }
                    }
                } else if (addon == "bcr") {
                    let BCR = Player.ExtensionSettings.BCResponsiveData;
                    if (BCR) {
                        let BCRdata = JSON.parse(LZString.decompressFromBase64(BCR));              
                        showBCResponsiveStatus(BCRdata);
                    }
                } else if (addon == "bctw") {
                    let BCT = Player.ExtensionSettings.Themed;
                    if (BCT) {
                        let BCTdata = JSON.parse(LZString.decompressFromBase64(BCT));
                        showArousalErectionStatus(BCTdata);
                        showArousalProgressStatus(BCTdata);
                        showBCIconsStatus(BCTdata);
                        showBCTChangelogStatus(BCTdata);
                        showBCTIconStatus(BCTdata);
                        showBestFriendsStatus(BCTdata);
                        showFriendlistSlotsStatus(BCTdata);
                        showLockConversionStatus(BCTdata);
                        showRoomShareStatus(BCTdata);
                        showSplitStatus(BCTdata);
                        showTailWaggingStatus(BCTdata);
                    }
                } else if (addon == "dogs") {
                    let DOGS = Player.ExtensionSettings.DOGS;
                    if (DOGS) {
                        let DOGSdata = JSON.parse(LZString.decompressFromBase64(DOGS));
                        showDeviousLockStatus(DOGSdata);
                        showDogsLocalStatus(DOGSdata);
                        showDogsVersionStatus(DOGSdata);
                        showRemoteControlStatus(DOGSdata);
                    }
                } else if (addon == "ebch") {
                    let EBCH = Player.OnlineSettings.EBCH;
                    if (EBCH) {
                        EBCHdata = Player.OnlineSettings.EBCH;
                        showEbchLogStatus(EBCHdata);
                        showEbchNotificationStatus(EBCHdata);
                        showEbchPoseStatus(EBCHdata);
                        showEbchUngarbleStatus(EBCHdata);
                        showEbchWelcomeStatus(EBCHdata);
                    }
                } else if (addon == "lscg") {
                    let LSCG = Player.ExtensionSettings.LSCG;
                    if (LSCG) {
                        let LSCGdata = JSON.parse(LZString.decompressFromBase64(LSCG));
                        showBcLscgStatus(LSCGdata);
                        showBoopReactionsStatus(LSCGdata);
                        showCheckRollsStatus(LSCGdata);
                        showCraftingStatus(LSCGdata);
                        showEdgeBlurStatus(LSCGdata);
                        showErectionStatus(LSCGdata);
                        showLipstickStatus(LSCGdata);
                        showOpacityStatus(LSCGdata);
                        showRemoteStatus(LSCGdata);
                        showResizingStatus(LSCGdata);
                        showRestrainedSettingsStatus(LSCGdata);
                    }
                } else if (addon == "mbs") {
                    if (Player.OnlineSharedSettings.MBSVersion != null) {
                        let MBSver = Player.OnlineSharedSettings.MBSVersion;
                        let stringMBSver1 = MBSver;
                        let stringMBSver2 = stringMBSver1.split(".");
                        let MBS1 = stringMBSver2[0];
                        let MBS2 = stringMBSver2[1];
                        let MBS3 = stringMBSver2[2];
                        let str = "";
                        let d = "";
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
                        let MBSdata = JSON.parse(d);
                        showGarblingStatus(MBSdata);
                        showLockedMbsStatus(MBSdata);
                        showLockedWheelStatus(MBSdata);
                        showMbsChangeStatus(MBSdata);
                    }
                } else if (addon == "rsp") {
                    let RSP = Player.ExtensionSettings.Responsive;
                    if (RSP) {
                        let RSPdata = JSON.parse(LZString.decompressFromBase64(RSP));
                        showResponsiveStatus(RSPdata);
                        showBcrResponsesStatus(RSPdata);
                        showCharacterTalkStatus(RSPdata);
                        showInterceptMessageStatus(RSPdata);
                        showLeaveMessageStatus(RSPdata);
                        showMoansStatus(RSPdata);
                        showNewVersionStatus(RSPdata);
                        showRulesStatus(RSPdata);
                    }
                } else if (addon == "thm") {
                    let THM = Player.ExtensionSettings.Themed;
                    if (THM) {
                        let THMdata = JSON.parse(LZString.decompressFromBase64(THM));
                        showBCThemedStatus(THMdata);
                        showCharacterAbsenceStatus(THMdata);
                        showAdvancedColoringStatus(THMdata);
                        showChatStatus(THMdata);
                        showFlatColorStatus(THMdata);
                        showFriendListStatus(THMdata);
                        showGuiOverhaulStatus(THMdata);
                        showInputZonesStatus(THMdata);
                        showLocalTimeStatus(THMdata);
                        if (Player.Themed != undefined) showLoginStatus(THMdata);
                        showMiscDetailsStatus(THMdata);
                        showThemedVersionStatus(THMdata);
                    }
                } else if (addon == "wce") {
                    let WCE = Player.ExtensionSettings.FBC;
                    if (WCE) {
                        let WCEdata = JSON.parse(LZString.decompressFromBase64(WCE));
                        showAnimationStatus(WCEdata);
                        showAntiCheatStatus(WCEdata);
                        showArousalStatus(WCEdata);
                        showCheatStatus(WCEdata);
                        showColorStatus(WCEdata);
                        showEmbeddingStatus(WCEdata);
                        showImmersionStatus(WCEdata);
                        showLayeringStatus(WCEdata);
                        showMiscStatus(WCEdata);
                        showPerformanceStatus(WCEdata);
                        showWardrobeStatus(WCEdata);
                        showWceTalkingStatus(WCEdata);
                    }
                }
            }
        }
    }])

})();
