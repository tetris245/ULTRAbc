// ==UserScript==
// @name ULTRAbc
// @namespace https://www.bondageprojects.com/
// @version 5.9
// @description Everything you'll ever need for BC
// @author Nemesea
// @match https://bondageprojects.elementfx.com/*
// @match https://www.bondageprojects.elementfx.com/*
// @match https://bondage-europe.com/*
// @match https://www.bondage-europe.com/*
// @match https://bondage-asia.com/club/*
// @match https://www.bondage-asia.com/club/*
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

//CSS
(function addChatSearchStyles() {
    const css = `
        #chat-search-room-bottom {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            z-index: 10;         
        }
        .chat-search-room-bottom-section {
            width: fit-content;
            height: 100%;
            white-space: nowrap;
            flex-direction: row;
            display: flex;
            gap: 0.5em;
        }
		#chat-search-search-menu-room-players-grid {
            display: grid;
            grid-template-columns: 3em 1em 3em;
            grid-template-rows: 1fr 1fr;
            text-align: center;
        }
        .chat-search-search-menu-room-players-label {
            font-size: 0.8em;
            user-select: none;
        }
        .chat-search-room-players-input {
            border: var(--border-width) solid black;
        }
  `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = css;
    const append = () => {
        if (document.head) document.head.appendChild(style);
    };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', append);
    } else {
        append();
    }
})();

(async function() {
    if (window.UBCver) {
        console.warn("ULTRAbc ya está cargado, por lo que no se volverá a cargar");
        return;
    }

    const UBCver = "5.9";
    const UBCver0 = "5.8.3";
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
    let altchsh = true;
    let ChatSearchRoomBottom = "chat-search-room-bottom";

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
    const umsg1 = "Tu comando no puede ser ejecutado porque ";
    const umsg2 = " has activado la protección Uwall.";
    const umsg3 = "estás en modo sin escape (no-escape).";
    const umsg4 = "Tu mensaje no puede enviarse porque no respeta las reglas de 'doll talk'.";
    const umsg5 = "Esta sala no utiliza la función de mapa.";
    const umsg6 = " Es mejor usar el comando <b>/uroom</b>.";
    const umsg7 = "estás en modo silencio.";
    const umsg8 = "Tu collar está muy apretado o un hechizo LSCG te impide hablar.";

    const M_MOANER_moanerKey = "bc_moaner_";
    let M_MOANER_scriptOn = false;
    let M_MOANER_cum = false;
    let profile;
    let profileName;
    let ahybrid = false;
    let alfaprf = false;
    let alfmenu = false;
    let alfrpsk = false;
    let animal = 0;
    let bgall = false;
    let bl = 0;
    let blindness = 0;
    let blurmode = 0;
    let ccards = 30;
    let cdeck = 0;
    let cextra = false;
    let cfame = 150;
    let csname = "Introduction";
	let ctitle = "";
    let dogsforbid = false;
    let dogsforced = false;
    let frname = "BrickWall";
    let gamestable = false;
    let gl = 0;
    let hearing = 0;
    let ifext = false;
    let ifname = "Sheet";
    let layerall = false;
    let maptrap1 = 0;
    let mgl = 0;
    let minigame = "";
    let mission = "";
    let npcdeck = -1;
    let onegl = 0;
    let onlydays = false;
    let pmin = 1;
    let pmax = 20;
    let rpabdl = 0;
    let rpasyl = 0;
    let rpgamb = 0;
    let rpgame = 0;
    let rpkidn = 0;
    let rplarp = 0;
    let rpmagh = 0;
    let rpmagp = 0;
    let rpmaid = 0;
    let rpmain = 0;
    let silent = false;
    let silsafe = false;
    let skbondage = 0;
    let skdressage = 0;
    let skevasion = 0;
    let skinfiltration = 0;
    let sklockpicking = 0;
    let skselfbondage = 0;
    let skwillpower = 0;
    let st = 0;
    let tcname = "Cell";
    let tintcolor = "#000000";
    let tintlevel = 0;
    let tintmbs = false;
    let tintnever = false;
    let wrname = "Dressing";

    let asylumlimit;
    let autojoin;
    let cskeys;
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
    let noifbuttons;
	let nopinkscr;
    let nostruggle;
    let notcbuttons;
    let noteleport;
    let noubcbar;
    let noubccolor;
    let nowhisper = false;
    let nowhrange;
    let nowrbuttons;
    let npcpunish = false;
    let outbuttons;
    let rglbuttons;
    let rglsync;
    let slowleave;
    let sosbuttons;

    let notalk = 0;
    let reaction = 0;
    let unrestrict = 0;
    let usoft = false;
    let utotal = false;

    let Allcolor = "";
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

    let Tallcolor = "";
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

    const cosplay1 = ["Decals", "HairAccessory1", "HairAccessory2", "HairAccessory3", "TailStraps", "Wings"];

    const cosplay2 = ["HairAccessory3_\u{7B28}\u{7B28}\u{86CB}Luzi", "Luzi_HairAccessory3_1", "Luzi_HairAccessory3_2", "Wings_\u{7B28}\u{7B28}\u{86CB}Luzi"];

    const restraints = ["ItemAddon", "ItemArms", "ItemBoots", "ItemDevices", "ItemEars", "ItemFeet", "ItemHands", "ItemHead", "ItemHood", "ItemLegs", "ItemMouth", "ItemMouth2", "ItemMouth3", "ItemNeck", "ItemNeckRestraints", "ItemNose", "ItemTorso", "ItemTorso2"];

    const toys = ["ItemBreast", "ItemButt", "ItemHandheld", "ItemMisc", "ItemNeckAccessories", "ItemNipples", "ItemNipplesPiercings", "ItemPelvis", "ItemVulva", "ItemVulvaPiercings"];

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

    const ClubCardBuilderExtraDeck = [1000, 1001, 1002, 1003, 1004, 1006, 1015, 1017, 2000, 3008, 5005, 6005, 7007, 8005, 11000, 11001, 11002, 11003, 11008, 11009, 11010, 12000, 12001, 12002, 12004, 12016, 30012, 30013, 30021, 30022];

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

    //Options for message command
    const msgcommand = ["allcolor", "clothes", "invisible", "lock", "naked", "pet", "randomize", "restrain", "solidity", "tallcolor", "tclothes", "tinvisible", "tlock", "tnaked", "totalrelease", "tpet", "trandomize", "trestrain", "tsolidity", "ttotalrelease", "tunderwear", "tunlock", "tuntie", "tvisible", "underwear", "unlock", "untie", "visible"];

    //Items for pet command
    const petitems1 = ["ArmbinderJacket", "BitchSuit", "Bolero", "BoxTieArmbinder", "Chains", "FullLatexSuit", "HempRope", "InflatableStraightLeotard", "LatexBoxtieLeotard", "LatexButterflyLeotard", "LatexSleevelessLeotard", "LeatherStraitJacket", "PantyhoseBody", "PantyhoseBodyOpen", "SeamlessStraitDress", "SeamlessStraitDressOpen", "ShinyPetSuit", "StraitLeotard", "StrictLeatherPetCrawler"];

    const petitems2 = ["Antennae", "BigLynxEars", "BunnyEars1", "BunnyEars2", "CowEars", "CowHorns", "Ears1", "Ears2", "ElfEars", "FoxEars1", "FoxEars2", "FoxEars3", "KittenEars1", "KittenEars2", "MouseEars1", "MouseEars2", "PonyEars1", "PuppyEars1", "PuppyEars2", "RaccoonEars1", "WolfEars1", "WolfEars2"];

    const petitems3 = ["CowtailStrap", "FoxTailStrap", "FoxTailsStrap", "HorseTailStrap", "HorseTailStrap1", "KittenTailStrap1", "KittenTailStrap2", "LargeBushyTail", "LargeFoxTail", "MouseTailStrap1", "MouseTailStrap2", "PuppyTailStrap", "PuppyTailStrap1", "RaccoonStrap", "RaccoonTailStrap", "TailStrap", "WolfTailStrap1", "WolfTailStrap2", "WolfTailStrap3"];

    //Locks
    const locks = ["", "MetalPadlock", "ExclusivePadlock", "IntricatePadlock", "HighSecurityPadlock", "PandoraPadlock", "MistressPadlock", "LoversPadlock", "OwnerPadlock", "TimerPadlock", "CombinationPadlock", "SafewordPadlock", "PasswordPadlock", "MistressTimerPadlock", "LoversTimerPadlock", "OwnerTimerPadlock", "TimerPasswordPadlock", "Best Friend Padlock", "Best Friend Timer Padlock", "FamilyPadlock", "\u{6DEB}\u{7EB9}\u{9501}LuziPadlock", "DeviousPadlock", "PortalLinkPadlock"];

    //Senses levels
    const blindLevels = [GetBlindLevel0, GetBlindLevel1, GetBlindLevel2, GetBlindLevel3];
    const blurLevels = [GetBlurLevel0, GetBlurLevel1, GetBlurLevel2, GetBlurLevel3, GetBlurLevel4];
    const deafLevels = [GetDeafLevel0, GetDeafLevel1, GetDeafLevel2, GetDeafLevel3, GetDeafLevel4, GetDeafLevel5];

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
        alfaprf = false;
        alfmenu = false;
        alfrpsk = false;
        animal = 0;
        asylumlimit = false;
        autojoin = false;
        bgall = false;
        bl = 0;
        ccards = 30;
        cdeck = 0;
        cextra = false;
        cfame = 150;
        cskeys = false;
		ctitle = "";
        dogsforbid = false;
        dogsforced = false;
        dolltalk = false;
        extbuttons = false;
        extrainfo = false;
        fixperm = false;
        fullseed = false;
        frkeys = false;
        gl = 0;
        highfame = false;
        hotkeys = false;
        ifext = false;
        layerall = false;
        magiccheat = false;
        magictoys = false;
        mapcheat = false;
        mapfull = false;
        mapfull2 = false;
        maptrap1 = 0;
        minigame = "";
        mission = "";
        noescape = false;
        nogarble = false;
        noifbuttons = false;
		nopinkscr = false;
        nostruggle = false;
        notalk = 0;
        notcbuttons = false;
        noteleport = false;
        noubcbar = false;
        noubccolor = false;
        nowhisper = false;
        nowhrange = false;
        nowrbuttons = false;
        npcdeck = -1;
        npcpunish = false;
        onlydays = false;
        outbuttons = false;
        pmin = 1;
        pmax = 20;
        rglbuttons = false;
        rglsync = false;
        rpabdl = 0;
        rpasyl = 0;
        rpgamb = 0;
        rpgame = 0;
        rpkidn = 0;
        rplarp = 0;
        rpmagh = 0;
        rpmagp = 0;
        rpmaid = 0;
        rpmain = 0;
        silent = false;
        silsafe = false;
        skbondage = 0;
        skdressage = 0;
        skevasion = 0;
        skinfiltration = 0;
        sklockpicking = 0;
        skselfbondage = 0;
        skwillpower = 0;
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
        Allcolor = "";
        Clothes = "";
        Invisible = "";
        Mlock = "";
        Naked = "";
        Pet = "";
        Randomize = "";
        Restrain = "";
        Solidity = "";
        Tallcolor = "";
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
        alfaprf = data.alfaprf;
        alfmenu = data.alfmenu;
        alfrpsk = data.alfrpsk;
        animal = data.animal * 1;
        asylumlimit = data.asylumlimit;
        autojoin = data.autojoin;
        bgall = data.bgall;
        bl = data.bl;
        ccards = data.ccards * 1;
        cdeck = data.cdeck * 1;
        cextra = data.cextra;
        cfame = data.cfame;
        cskeys = data.cskeys;
		ctitle = data.ctitle;
        dogsforbid = data.dogsforbid;
        dogsforced = data.dogsforced;
        dolltalk = data.dolltalk;
        extbuttons = data.extbuttons;
        extrainfo = data.extrainfo;
        fixperm = data.fixperm;
        fullseed = data.fullseed;
        frkeys = data.frkeys;
        gl = data.gaglevel * 1;
        highfame = data.highfame;
        hotkeys = data.hotkeys;
        ifext = data.ifext;
        layerall = data.layerall;
        magiccheat = data.magiccheat;
        magictoys = data.magictoys;
        mapcheat = data.mapcheat;
        mapfull = data.mapfull;
        mapfull2 = data.mapfull2;
        maptrap1 = data.maptrap1 * 1;
        minigame = data.minigame;
        mission = data.mission;
        noescape = data.noescape;
        nogarble = data.nogarble;
        noifbuttons = data.noifbuttons;
		nopinkscr = data.nopinkscr;
        nostruggle = data.nostruggle;
        notalk = data.notalk;
        notcbuttons = data.notcbuttons;
        noteleport = data.noteleport;
        noubcbar = data.noubcbar;
        noubccolor = data.noubccolor;
        nowhisper = data.nowhisper;
        nowhrange = data.nowhrange;
        nowrbuttons = data.nowrbuttons;
        npcdeck = data.npcdeck * 1;
        npcpunish = data.npcpunish;
        onlydays = data.onlydays;
        outbuttons = data.outbuttons;
        pmin = data.pmin * 1;
        pmax = data.pmax * 1;
        rglbuttons = data.rglbuttons;
        rglsync = data.rglsync;
        rpabdl = data.rpabdl * 1;
        rpasyl = data.rpasyl * 1;
        rpgamb = data.rpgamb * 1;
        rpgame = data.rpgame * 1;
        rpkidn = data.rpkidn * 1;
        rplarp = data.rplarp * 1;
        rpmagh = data.rpmagh * 1;
        rpmagp = data.rpmagp * 1;
        rpmaid = data.rpmaid * 1;
        rpmain = data.rpmain * 1;
        silent = data.silent;
        silsafe = data.silsafe;
        skbondage = data.skbondage;
        skdressage = data.skdressage;
        skevasion = data.skevasion;
        skinfiltration = data.skinfiltration;
        sklockpicking = data.sklockpicking;
        skselfbondage = data.skselfbondage;
        skwillpower = data.skwillpower;
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
            csname = "Introduction";
            frname = "BrickWall";
            gamestable = false;
            hearing = 0;
            ifname = "Sheet";
            mgl = 0;
            onegl = 0;
            reaction = 0;
            tcname = "Cell";
            unrestrict = 0;
            wrname = "Dressing";
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
            csname = data.csname;
            frname = data.frname;
            gamestable = data.gamestable;
            hearing = 0;
            ifname = data.ifname;
            mgl = 0;
            minigame = "";
            mission = "";
            onegl = 0;
            reaction = 0;
            tcname = data.tcname;
            unrestrict = 0;
            wrname = data.wrname;
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
            "alfaprf": alfaprf,
            "alfmenu": alfmenu,
            "alfrpsk": alfrpsk,
            "animal": animal,
            "bgall": bgall,
            "bl": bl,
            "ccards": ccards,
            "cdeck": cdeck,
            "cextra": cextra,
            "cfame": cfame,
            "csname": csname,
            "ctitle": ctitle,
            "frname": frname,
            "gamestable": gamestable,
            "gaglevel": gl,
            "ifext": ifext,
            "ifname": ifname,
            "layerall": layerall,
            "maptrap1": maptrap1,
            "minigame": minigame,
            "mission": mission,
            "npcdeck": npcdeck,
            "onlydays": onlydays,
            "pmin": pmin,
            "pmax": pmax,
            "rpabdl": rpabdl,
            "rpasyl": rpasyl,
            "rpgamb": rpgamb,
            "rpgame": rpgame,
            "rpkidn": rpkidn,
            "rplarp": rplarp,
            "rpmagh": rpmagh,
            "rpmagp": rpmagp,
            "rpmaid": rpmaid,
            "rpmain": rpmain,
            "silent": silent,
            "silsafe": silsafe,
            "skbondage": skbondage,
            "skdressage": skdressage,
            "skevasion": skevasion,
            "skinfiltration": skinfiltration,
            "sklockpicking": sklockpicking,
            "skselfbondage": skselfbondage,
            "skwillpower": skwillpower,
            "stutterlevel": st,
            "tcname": tcname,
            "tintcolor": tintcolor,
            "tintlevel": tintlevel,
            "tintmbs": tintmbs,
            "tintnever": tintnever,
            "wrname": wrname,
            "asylumlimit": asylumlimit,
            "autojoin": autojoin,
            "cskeys": cskeys,
            "dogsforbid": dogsforbid,
            "dogsforced": dogsforced,
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
            "noifbuttons": noifbuttons,
            "nopinkscr": nopinkscr,
            "nostruggle": nostruggle,
            "notcbuttons": notcbuttons,
            "noteleport": noteleport,
            "noubcbar": noubcbar,
            "noubccolor": noubccolor,
            "nowhisper": nowhisper,
            "nowhrange": nowhrange,
            "nowrbuttons": nowrbuttons,
            "npcpunish": npcpunish,
            "outbuttons": outbuttons,
            "rglbuttons": rglbuttons,
            "rglsync": rglsync,
            "slowleave": slowleave,
            "sosbuttons": sosbuttons,
            "notalk": notalk,
            "reaction": reaction,
            "unrestrict": unrestrict,
            "allcolor": Allcolor,
            "clothes": Clothes,
            "invisible": Invisible,
            "mlock": Mlock,
            "naked": Naked,
            "pet": Pet,
            "randomize": Randomize,
            "restrain": Restrain,
            "solidity": Solidity,
            "tallcolor": Tallcolor,
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
                if (alfaprf == null || alfaprf == undefined) alfaprf = false;
                if (alfmenu == null || alfmenu == undefined) alfmenu = false;
                if (alfrpsk == null || alfrpsk == undefined) alfrpsk = false;
                if (animal == null || animal == undefined) animal = 0;
                if (asylumlimit == null || asylumlimit == undefined) asylumlimit = false;
                if (autojoin == null || autojoin == undefined) autojoin = false;
                if (bgall == null || bgall == undefined) bgall = false;
                if (bl == null || bl == undefined) bl = 0;
                if (blindness == null || blindness == undefined) blindness = 0;
                if (blurmode == null || blurmode == undefined) blurmode = 0;
                if (ccards == null || ccards == undefined) ccards = 30;
                if (cdeck == null || cdeck == undefined) cdeck = 0;
                if (cextra == null || cextra == undefined) cextra = false;
                if (cfame == null || cfame == undefined) cfame = 150;
                if (cskeys == null || cskeys == undefined) cskeys = false;
                if (csname == null || csname == undefined) csname = "Introduction";
				if (ctitle == null || ctitle == undefined) ctitle = "";
                if (dogsforbid == null || dogsforbid == undefined) dogsforbid = false;
                if (dogsforced == null || dogsforced == undefined) dogsforced = false;
                if (dogsforced == false) dogsforbid = false;
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
                if (ifext == null || ifext == undefined) ifext = false;
                if (ifname == null || ifname == undefined) ifname = "Sheet";
                if (layerall == null || layerall == undefined) layerall = false;
                if (magiccheat == null || magiccheat == undefined) magiccheat = false;
                if (magictoys == null || magictoys == undefined) magictoys = false;
                if (mapcheat == null || mapcheat == undefined) mapcheat = false;
                if (mapfull == null || mapfull == undefined) mapfull = false;
                if (mapfull2 == null || mapfull2 == undefined) mapfull2 = false;
                if (maptrap1 == null || maptrap1 == undefined) maptrap1 = 0;
                if (minigame == null || minigame == undefined) minigame = "";
                if (mission == null || mission == undefined) mission = "";
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
                if (noifbuttons == null || noifbuttons == undefined) noifbuttons = false;
				if (nopinkscr == null || nopinkscr == undefined) nopinkscr = false;
                if (nostruggle == null || nostruggle == undefined) nostruggle = false;
                if (notalk == null || notalk == undefined) notalk = 0;
                if (notcbuttons == null || notcbuttons == undefined) notcbuttons = false;
                if (noteleport == null || noteleport == undefined) noteleport = false;
                if (noubcbar == null || noubcbar == undefined) noubcbar = false;
                if (noubccolor == null || noubccolor == undefined) noubccolor = false;
                if (nowhisper == null || nowhisper == undefined) nowhisper = false;
                if (nowhrange == null || nowhrange == undefined) nowhrange = false;
                if (nowrbuttons == null || nowrbuttons == undefined) nowrbuttons = false;
                if (npcdeck == null || npcdeck == undefined) npcdeck = -1;
                if (npcpunish == null || npcpunish == undefined) npcpunish = false;
                if (onlydays == null || onlydays == undefined) onlydays = false;
                if (outbuttons == null || outbuttons == undefined) outbuttons = false;
                if (pmin == null || pmin == undefined || pmin == 0) pmin = 1;
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
                if (reaction == null || reaction == undefined) reaction = 0;
                if (rglbuttons == null || rglbuttons == undefined) rglbuttons = false;
                if (rglsync == null || rglsync == undefined) rglsync = false;
                if (rglsync == null || rglsync == undefined) rglsync = false;
                if (rpabdl == null || rpabdl == undefined) rpabdl = 0;
                if (rpasyl == null || rpasyl == undefined) rpasyl = 0;
                if (rpgamb == null || rpgamb == undefined) rpgamb = 0;
                if (rpgame == null || rpgame == undefined) rpgame = 0;
                if (rpkidn == null || rpkidn == undefined) rpkidn = 0;
                if (rplarp == null || rplarp == undefined) rplarp = 0;
                if (rpmagh == null || rpmagh == undefined) rpmagh = 0;
                if (rpmagp == null || rpmagp == undefined) rpmagp = 0;
                if (rpmaid == null || rpmaid == undefined) rpmaid = 0;
                if (rpmain == null || rpmain == undefined) rpmain = 0;
                if (skbondage == null || skbondage == undefined) skbondage = 0;
                if (skdressage == null || skdressage == undefined) skdressage = 0;
                if (skevasion == null || skevasion == undefined) skevasion = 0;
                if (skinfiltration == null || skinfiltration == undefined) skinfiltration = 0;
                if (sklockpicking == null || sklockpicking == undefined) sklockpicking = 0;
                if (skselfbondage == null || skselfbondage == undefined) skselfbondage = 0;
                if (skwillpower == null || skwillpower == undefined) skwillpower = 0;
                if (slowleave == null || slowleave == undefined) slowleave = false;
                if (sosbuttons == null || sosbuttons == undefined) sosbuttons = false;
                if (silent == null || silent == undefined) silent = false;
                if (silsafe == null || silsafe == undefined) silsafe = false;
                if (st == null || st == undefined) st = 0;
                if (tcname == null || tcname == undefined) tcname = "Cell";
                if (tintcolor == null || tintcolor == undefined) tintcolor = "#000000";
                if (tintlevel == null || tintlevel == undefined) tintlevel = 0;
                if (tintmbs == null || tintmbs == undefined) tintmbs = false;
                if (tintnever == null || tintnever == undefined) tintnever = false;
                if (unrestrict == null || unrestrict == undefined) unrestrict = 0;
                if (usoft == null || usoft == undefined) usoft = false;
                if (utotal == null || utotal == undefined) utotal = false;
                if (wrname == null || wrname == undefined) wrname = "Dressing";
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
            "¡Mira más estrellas con las opciones y comandos de UBC!",
            "Consejo: Usa el comando /uhelp en el chat o explora la wiki para conocer mejor todos los comandos de UBC.",
            "¡Disfruta de todas las opciones y comandos de UBC!"
        ]

        const ubcSettingsKey = () => "bc_moaner_" + Player.MemberNumber;

        await ubcSettingsLoad();
        settingsPage();
        layermenu();

        async function ubcSettingsLoad(reset = false) {
            await waitFor(() => !!Player?.AccountName);

            const UBC_DEFAULT_SETTINGS = {
                ahybrid: false,
                alfaprf: false,
                alfmenu: false,
                alfrpsk: false,
                animal: 0,
                asylumlimit: false,
                autojoin: false,
                bgall: false,
                bl: 0,
                blindness: 0,
                blurmode: 0,
                ccards: 30,
                cdeck: 0,
                cextra: false,
                cfame: 150,
                cskeys: false,
                cum: false,
                dogsforced: false,
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
                ifext: false,
                layerall: false,
                magiccheat: false,
                magictoys: false,
                mapcheat: false,
                mapfull: false,
                mapfull2: false,
                maptrap1: 0,
                noescape: false,
                nogarble: false,
                noifbuttons: false,
                nopinkscr: false,
                nostruggle: false,
                notalk: 0,
                notcbuttons: false,
                noteleport: false,
                noubcbar: false,
                noubccolor: false,
                nowhisper: false,
                nowhrange: false,
                nowrbuttons: false,
                npcdeck: -1,
                npcpunish: false,
                onlydays: false,
                orgasmMoan: true,
                outbuttons: false,
                pmin: 1,
                pmax: 20,
                profile: 0,
                reaction: 0,
                rglbuttons: false,
                rglsync: false,
                rpabdl: 0,
                rpasyl: 0,
                rpgamb: 0,
                rpgame: 0,
                rpkidn: 0,
                rplarp: 0,
                rpmagh: 0,
                rpmagp: 0,
                rpmaid: 0,
                rpmain: 0,
                script: false,
                silent: false,
                silsafe: false,
                skbondage: 0,
                skdressage: 0,
                skevasion: 0,
                skinfiltration: 0,
                sklockpicking: 0,
                skselfbondage: 0,
                skwillpower: 0,
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

        async function layermenu() {
            await waitFor(() => !!Player?.AppearanceLayers);
            modApi.hookFunction('Layering.Load', 4, (args, next) => {
                if (layerall == true) Layering.Readonly = false;
                next(args);
            });
        }

        async function settingsPage() {
            await waitFor(() => !!PreferenceRegisterExtensionSetting)

            const ubcSettingsCategories = [
                "UBCBackgrounds",
                "UBCButtons",
                "UBCCheats",
                "UBCHotkeys",
                "UBCMaps",
                "UBCMisc",
                "UBCMoaner",
                "UBCReputation",
                "UBCSkills",
                "UBCSpecialModes",
                "UBCTalking",
                "UBCVisual"
            ];
            const ubcSettingCategoryLabels = {
                UBCBackgrounds: "Fondos",
                UBCButtons: "Botones",
                UBCCheats: "Trucos",
                UBCHotkeys: "Atajos de teclado",
                UBCMaps: "Mapas",
                UBCMisc: "Varios",
                UBCMoaner: "Gemidos (Moaner)",
                UBCReputation: "Reputación",
                UBCSkills: "Habilidades",
                UBCSpecialModes: "Modos especiales",
                UBCTalking: "Hablar",
                UBCVisual: "Visuales"
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
                if (PreferenceMessage != "") DrawText(PreferenceMessage, 1200, 85, "Red", "Black");
                DrawText("UBC " + ubcSettingCategoryLabels[UBCPreferenceSubscreen] + " - Haz clic en una opción para obtener más información", 500, 125, "Black", "Gray");
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
                DrawText("- Configuración de ULTRAbc -", 500, 125, "Black", "Gray");
                MainCanvas.textAlign = "center";
                //Show tips every 10 secs
                DrawTextWrapGood(UBC_TIPS[Math.floor(((TimerGetTime() % 100000) / 100000) * (UBC_TIPS.length))], 1650, 260, 400, 100, ForeColor = UBC_API.HintForeColor);

                DrawText("ULTRAbc " + UBCver, 1665, 525, "Black", "Gray");
                DrawButton(1500, 550, 315, 90, "", "White", "", "Enlace a Icons8");
                DrawImageResize(IMAGES.LOGO, 1510, 565, 60, 60);
                DrawTextFit("Icono de Icons8", 1690, 598, 308, "Black");
                DrawButton(1500, 655, 315, 90, "", "White", "", "Abre el Changelog de UBC en GitHub");
                DrawImageResize("Icons/Changelog.png", 1510, 670, 60, 60);
                DrawTextFit("UBC Changes", 1685, 703, 308, "Black");
                DrawButton(1500, 760, 315, 90, "", "White", "", "Abrir la Wiki de UBC en GitHub");
                DrawImageResize("Icons/Introduction.png", 1510, 775, 60, 60);
                DrawTextFit("Wiki de UBC", 1685, 808, 308, "Black");
                DrawText("/uhelp en el chat", 1665, 880, "Black", "Gray");

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
                if ((blindness > 0) && (blindness < 5)) {
                    let fn1 = blindLevels[blindness - 1];
                    fn1();
                    Player.GetBlindLevel = fn1;
                }
                if ((blurmode > 0) && (blurmode < 6)) {
                    let fn2 = blurLevels[blurmode - 1];
                    fn2();
                    Player.GetBlurLevel = fn2;
                }
                GagTalkOn = false;
                if ((gl > 0) && (gl != 11)) GagTalkOn = true;
                if (gl == 11) BabyTalkOn = true;
                if ((hearing > 0) && (hearing < 7)) {
                    let fn3 = deafLevels[hearing - 1];
                    fn3();
                    Player.GetDeafLevel = fn3;
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
                if (dogsforced == false) {
                    dogsforbid = false;
                    M_MOANER_saveControls();
                }
                if ((noescape == true) && (unrestrict == 2)) {
                    Player.UBC.ubcSettings.utotal = false;
                    Player.CanInteract = function() {
                        return !this.HasEffect("Block");
                    };
                    Player.CanTalk = function() {
                        const GagEffect = SpeechTransformGagGarbleIntensity(this);
                        return (GagEffect <= 0);
                    };
                    unrestrict = 0;
                    M_MOANER_saveControls();
                }
                TintsEffect();
                UBCPreferenceSubscreen = "";
                PreferenceMessage = "";
                PreferenceSubscreenExtensionsClear();
            }

            PreferenceSubscreenUBCBackgroundsLoad = function() {
                UBCPreferenceSubscreen = "UBCBackgrounds";
                addMenuCheckbox(64, 64, "Acceder a todos los fondos estándar: ", "bgall",
                    "Con esta opción, no estarás limitada a 42 fondos en la Celda Privada o 187 en las preferencias Online y el editor de Club Card Game al cambiar varios fondos. Tendrás acceso a todos los fondos estándar (¡más de 250!). Nota: si usas BCX y quieres acceso directo a los fondos añadidos por BCX, ¡muéstralos con el comando /bg1!", false, 200
                );
                addMenuCheckbox(64, 64, "Desactivar color de fondo para mensajes UBC: ", "noubccolor",
                    "Si marcas esta casilla, UBC no usará un color específico predefinido como fondo para sus mensajes locales en las salas de chat.", false, 200
                );
                addMenuCheckbox(64, 64, "Uso extendido del fondo de Información de Personaje: ", "ifext",
                    "En la pantalla de Información de Personaje, tienes botones para seleccionar manual o aleatoriamente un fondo que reemplaza al predeterminado. El fondo seleccionado también se aplica automáticamente a las pantallas de BCX. Si activas este ajuste, UBC extiende este fondo a las siguientes pantallas: Título, Perfil y Preferencias (también de la mayoría de complementos), pero el efecto no es inmediato (¡debes volver al menú de Extensiones!)", false, 200
                );
                addMenuCheckbox(64, 64, "Quitar botones de fondo en Información de Personaje: ", "noifbuttons",
                    "Si marcas esta casilla, UBC no mostrará los botones de fondo en la pantalla de Información de Personaje. Sin embargo, tus ajustes actuales seguirán activos. NOTA IMPORTANTE: Si quieres usar la herramienta de Likolisu para cambiar el fondo de esta pantalla, debes hacer clic primero en el botón de Fondo Predeterminado antes de marcar esta opción.", false, 200
                );
                addMenuCheckbox(64, 64, "Quitar botones de fondo en Celda de Tiempo: ", "notcbuttons",
                    "Si marcas esta casilla, UBC no mostrará los botones de fondo en la Celda de Tiempo. Sin embargo, tus ajustes actuales seguirán activos.", false, 200
                );
                addMenuCheckbox(64, 64, "Quitar botones de fondo en Vestuario: ", "nowrbuttons",
                    "Si marcas esta casilla, UBC no mostrará los botones de fondo en el Vestuario. Sin embargo, tus ajustes actuales seguirán activos. NOTA IMPORTANTE: Si quieres usar la herramienta de Likolisu para cambiar el fondo de esta pantalla, debes hacer clic primero en el botón de Fondo Predeterminado antes de marcar esta opción.", false, 200
                );
            }

            PreferenceSubscreenUBCBackgroundsRun = function() {
                drawMenuElements();
            }

            PreferenceSubscreenUBCBackgroundsClick = function() {
                handleMenuClicks();
            }

            PreferenceSubscreenUBCBackgroundsExit = function() {
                defaultExit();
            }

            PreferenceSubscreenUBCButtonsLoad = function() {
                UBCPreferenceSubscreen = "UBCButtons";
                addMenuCheckbox(64, 64, "Activar botón de Preferencias en salas de chat: ", "extbuttons",
                    "Cuando está marcado, se añadirá un botón de Extensiones en las salas de chat.", false, 150
                );
                addMenuCheckbox(64, 64, "Activar botones de LIBERAR (FREE): ", "sosbuttons",
                    "El botón FREE se añade en la sala de chat, la prisión de Pandora, la sala fotográfica y la celda de tiempo. Corresponde al comando /totalrelease, pero solo para ti. El mensaje por defecto en las salas de chat para este botón puede ser reemplazado por un mensaje personalizado o por la ausencia de mensaje (ver el comando /message). Esta opción no está disponible en modo sin escape (no-escape).", "Player.UBC.ubcSettings.noescape", 150
                );
                addMenuCheckbox(64, 64, "Activar botones de SALIR (OUT): ", "outbuttons",
                    "El botón OUT se añade en la sala de chat, la prisión de Pandora, la sala fotográfica y la celda de tiempo. Corresponde al comando /quit, pero sin un texto opcional específico. Esta opción no está disponible en modo sin escape (no-escape).", "Player.UBC.ubcSettings.noescape", 150
                );
                let slowmsg = "Por defecto, sales de una sala de chat u otra ubicación con el botón OUT en modo rápido, incluso si estás atada. Al activar esta opción, saldrás en modo lento sin un icono especial bajo tu personaje, ¡lo que sorprenderá a los demás jugadores! Esta opción no está disponible en modo sin escape (no-escape). ";
                let notesc = 0;
                if (Player.UBC.ubcSettings.noescape == false) notesc = 1;
                if (notesc == 0) {
                    addMenuCheckbox(64, 64, "Salida lenta con botón OUT: ", "slowleave", slowmsg, true, 150);
                } else {
                    addMenuCheckbox(64, 64, "Salida lenta con botón OUT: ", "slowleave", slowmsg, "!Player.UBC.ubcSettings.outbuttons", 150);
                }
                addMenuCheckbox(64, 64, "Activar botón RGL en el chat: ", "rglbuttons",
                    "El botón RGL da información sobre tu Nivel Real de Balbuceo (Real Garbling Level) en cualquier momento, comprobando las mordazas puestas y otros objetos que restringen el habla (también collares LSCG y hechizos). Al usar los botones, atajos o comandos para liberarte, esta información se da automáticamente y se sincroniza con tu nivel forzado de gagtalk/susurro cuando el resultado es 0. Por lo tanto, el botón RGL puede usarse como emergencia cuando no puedes hablar sin estar amordazada, por ejemplo.", false, 150
                );
                addMenuCheckbox(64, 64, "Sincronización extendida con botón RGL:", "rglsync",
                    "Por defecto, la sincronización del botón RGL con el nivel forzado de gagtalk/susurro es automática al usar los botones de emergencia, atajos o comandos para liberarte. Este ajuste permite extenderlo a todas las demás situaciones. El nivel detectado se limitará a 10 para gagtalk (el 11 se usa para baby talk). Cuando está activado, los cambios manuales en tus mordazas y otros objetos que restringen el habla (incluyendo collares LSCG y hechizos) requieren hacer clic de nuevo en el botón RGL.", "!Player.UBC.ubcSettings.rglbuttons", 150
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
                addMenuButton(150, 64, "Añadir/Quitar cartas extra del juego:", "Alternar", function() {
                        Player.Game.ClubCard.Reward = "";
                        if (Player.UBC.ubcSettings.cextra == false) {
                            Player.UBC.ubcSettings.cextra = true;
                            let Extra = [1015, 1017, 3008, 5005, 6005, 7007, 8005, 11000, 11001, 11002, 11003, 11008, 11009, 11010, 12000, 12001, 12002, 12004, 12016, 30012, 30013, 30021, 30022];
                            for (let i = 0; i < Extra.length; i++) {
                                let Char = String.fromCharCode(Extra[i]);
                                Player.Game.ClubCard.Reward = Player.Game.ClubCard.Reward + Char;
                            }
                            PreferenceMessage = "Todas las cartas extra añadidas";
                        } else {
                            Player.UBC.ubcSettings.cextra = false;
                            PreferenceMessage = "Todas las cartas extra eliminadas";
                        }
                        ServerAccountUpdate.QueueData({
                            Game: Player.Game
                        }, true);
                    },
                    "Este ajuste es un interruptor. Puedes añadir o quitar todas las cartas extra de recompensa. Ten en cuenta que las cartas extra que hayas conseguido de forma normal también se eliminarán cuando esta opción cambie a la acción de quitar.", 140
                );
                addMenuCheckbox(64, 64, "Acceso total a menús de capas (layering): ", "layerall",
                    "Con esta opción, siempre tendrás acceso a los menús de capas, ¡incluso si las ataduras y candados restringen tus movimientos! Nota: Si no quieres que otros jugadores cambien las capas de tu personaje, puedes activar una opción específica en el mod WCE.", false, 160
                );
                addMenuCheckbox(64, 64, "Truco para Bondage Brawl/Escuela de Magia: ", "magiccheat",
                    "¡Con esta opción, siempre serás la ganadora en Bondage Brawl y en la Escuela de Magia (solo en la parte de un solo jugador)!", false, 160
                );
                addMenuCheckbox(64, 64, "Información extra para algunos candados: ", "extrainfo",
                    "Este ajuste permite usar el comando /infolock para obtener información extra (código, contraseña, tiempo restante) sobre algunos candados en objetos equipados en una ranura seleccionada al hacer clic en ti misma o en otro jugador.", false, 160
                );
                addMenuCheckbox(64, 64, "Ayuda total para candados intrincados y HS: ", "fullseed",
                    "¡Te convertirás en una experta en ganzúas con esta opción! Se mostrará en pantalla la solución completa con el orden correcto para forzar candados intrincados y de alta seguridad (HS).", false, 160
                );
                let gmsg = "Este ajuste permite que tu habla (gagtalk) no forzada sea legible, sin importar la dificultad del juego. Sin embargo, no está disponible si has activado la función correspondiente de WCE, que tiene más opciones.";
                let smsg = "Este ajuste permite el forcejeo (struggle) automático en minijuegos, sin importar la dificultad del juego. Si el forcejeo automático falla, necesitarás cambiar la solidez de los objetos equipados con el comando /solidity y/o mejorar tus habilidades con el comando /boost. Ten en cuenta que este ajuste no está disponible si has activado la función correspondiente de WCE, que funciona de forma algo distinta.";
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
                    addMenuCheckbox(64, 64, "Desactivar balbuceo (ungarbling) en tu gagtalk: ", "nogarble", gmsg, false, 160);
                } else {
                    addMenuCheckbox(64, 64, "Desactivar balbuceo (ungarbling) en tu gagtalk: ", "nogarble", gmsg, true, 160);
                }
                if (sbc == 0) {
                    addMenuCheckbox(64, 64, "Activar forcejeo automático en minijuegos: ", "nostruggle", smsg, false, 160);
                } else {
                    addMenuCheckbox(64, 64, "Activar forcejeo automático en minijuegos: ", "nostruggle", smsg, true, 160);
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
                addMenuCheckbox(64, 64, "Activar atajos en salas de chat: ", "hotkeys",
                    "Estos atajos equivalen al comando /quit (sin texto opcional) y al comando /totalrelease (solo para ti). Atajos en el teclado numérico: Dividir (/) = salida rápida, Multiplicar (*) = liberación total. Si no tienes teclado numérico, usa el comando similar o un botón de UBC. Esta opción no está disponible en modo sin escape (no-escape).", "Player.UBC.ubcSettings.noescape"
                );
                addMenuCheckbox(64, 64, "Activar atajos en búsqueda de chat: ", "cskeys",
                    "Cuando esta opción está activa, tendrás acceso directo a varias pantallas y podrás cambiar el fondo de la Búsqueda de Chat. Alt Izquierdo = Preferencias, Flecha Izquierda = Vestuario, Flecha Derecha = Extensiones, Flecha Arriba = Fondo aleatorio, Flecha Abajo = Seleccionar fondo, Tab = Fondo predeterminado."
                );
                addMenuCheckbox(64, 64, "Activar atajos en lista de amigos: ", "frkeys",
                    "Estos atajos permiten obtener enlaces clicables a otros lobbies a los que tengas acceso si estás en un lobby (no en una sala). Solo puedes usarlos en la lista de amigos conectados Y si no estás en el cuadro de búsqueda o zona de pitidos. También permite cambiar el fondo. Atajos: D = Fondo predeterminado, F = Club femenino, G = Club mixto, H = Club masculino, J = Manicomio (Asylum), R = Fondo aleatorio, S = Seleccionar fondo."
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
                addMenuCheckbox(64, 64, "Añadir juguetes bajo castidad bloqueada en trampas: ", "magictoys",
                    "Activa esta opción si aceptas que las trampas en salas con mapa puedan añadir juguetes bajo castidad bloqueada, ¡con todas las consecuencias que eso pueda tener después con tu dueño/a o amantes, por ejemplo!", false, 140
                );
                addMenuInput(200, "Trampa de dispositivo seleccionada (0-9):", "maptrap1", "InputDeviceTrap",
                    "Introduce un número entre 0 y 9 para seleccionar una trampa de dispositivo: 0 Ninguna - 1 Banco de bondage - 2 Ataúd - 3 Marco de exhibición - 4 Perrera (Kennel) - 5 Casillero - 6 Carretilla - 7 Caja de madera - 8 Cruz en X - 9 TODAS LAS TRAMPAS. ¡Cuando una trampa está activa, serás atada automáticamente si caminas sobre el dispositivo!", 6
                );
                addMenuCheckbox(64, 64, "Activar audición completa en mapas: ", "mapfull2",
                    "Cuando está activado, no habrá ninguna limitación a tu audición en las salas con mapa.", false, 140
                );
                addMenuCheckbox(64, 64, "Activar visión completa en mapas: ", "mapfull",
                    "Cuando está activado, puedes ver las salas del mapa completas sin niebla. Notas: el comando /mapfog, que activa/desactiva la niebla solo en la sala actual, no tendrá efecto si este ajuste está activo. Si no usaste /mapfog para quitar la niebla antes de activar esto, la niebla volverá al desactivarlo.", false, 140
                );
                addMenuCheckbox(64, 64, "Activar susurros completos en mapas: ", "nowhrange",
                    "Cuando está activado, puedes susurrar a cualquier jugador en el mapa, sin importar la distancia. Funcionará con el comando estándar /whisper y el comando de UBC /murmur, entre todos los jugadores que tengan esta opción activa.", false, 140
                );
                addMenuCheckbox(64, 64, "Activar caminata mágica en mapas: ", "mapcheat",
                    "¡Cuando está activado, puedes ir a cualquier parte de los mapas e incluso atravesar paredes, incluso sin ser administradora!", false, 140
                );
                addMenuCheckbox(64, 64, "Sin teletransporte forzado en mapas: ", "noteleport",
                    "Cuando está marcado, los comandos de BC relacionados con el teletransporte forzado en los mapas no funcionarán contigo, excepto si al menos un administrador de la sala está en tu Tplist (ver comandos /tplistadd, /tplistremove y /tplistshow).", false, 140
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
                } else PreferenceMessage = "Introduce un número válido";
            }

            PreferenceSubscreenUBCMiscLoad = function() {
                UBCPreferenceSubscreen = "UBCMisc";
                addMenuCheckbox(64, 64, "Orden alfabético para Reputación y Habilidades: ", "alfrpsk",
                    "Cuando está activado, la mayoría de la información sobre reputación y habilidades en la pantalla de Información de Personaje se ordenará alfabéticamente. Ten en cuenta que la reputación como dominante o sumisa seguirá apareciendo en primera posición.", false, 140
                );
                addMenuCheckbox(64, 64, "Orden alfabético para el menú de Preferencias: ", "alfmenu",
                    "Cuando está activado, todas las opciones del menú principal de Preferencias se ordenarán alfabéticamente, a excepción de las Preferencias Generales.", false, 140
                );
                addMenuCheckbox(64, 64, "Orden alfabético en pantallas de Preferencias: ", "alfaprf",
                    "Con esta opción, la mayoría de los ajustes en algunas pantallas de Preferencias estarán en orden alfabético (según el texto en inglés) por tipo de ajuste (desplegables, casillas). Las pantallas afectadas son: General, Chat, Inmersión y Online.", false, 140
                );
                addMenuCheckbox(64, 64, "Activar limitaciones del Manicomio (Asylum): ", "asylumlimit",
                    "Por defecto, UBC desactiva las limitaciones del Manicomio (acceso y salida). Si te gustan estas limitaciones, puedes activarlas de nuevo con esta opción.", false, 140
                );
                addMenuCheckbox(64, 64, "Activar castigos por NPC: ", "npcpunish",
                    "Por defecto, UBC desactiva los castigos automáticos de los NPC (especialmente cuando estás atada en una sala y pides ayuda a una sirvienta). Si te gustan estos castigos, puedes activarlos de nuevo con esta opción.", false, 140
                );
                addMenuCheckbox(64, 64, "Sin cambios de permisos tras usar la Safeword: ", "fixperm",
                    "BC cambia automáticamente tus permisos generales de objetos cuando usas el comando de safeword o la opción de revertir en el menú de safeword. Si no te gusta esto, usa esta opción y tus permisos generales no serán modificados.", false, 140
                );
                addMenuCheckbox(64, 64, "Usar solo días en pantallas de Información: ", "onlydays",
                    "BC convierte automáticamente los días en años, meses y días. Si no te gusta esto, usa esta opción para que estos datos se expresen únicamente en días en las pantallas de Información de Personaje.", false, 140
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
                addMenuCheckbox(64, 64, "Activar el Moaner: ", "script",
                    "¡Añade más diversión al Bondage Club con los gemidos generados automáticamente por el Moaner!", false, 140
                );
                addMenuInput(200, "Perfil de gemidos (0-10):", "profile", "InputMoanProfile",
                    "Introduce un número entre 0 y 10 para seleccionar un perfil de gemidos: 0 Por defecto - 1 Bunny - 2 Cow - 3 Dog - 4 Fox - 5 Mouse - 6 Neko - 7 Pig - 8 Pony - 9 Wildfox - 10 Wolf.", 6
                );
                let omsg = "Cuando está activado, gemirás al llegar al orgasmo. No es posible activarlo si se detecta que la función LSCG Splatter está activa.";
                let spl = 0;
                let LSCG = Player.ExtensionSettings.LSCG;
                if (LSCG) {
                    let LSCGdata = JSON.parse(LZString.decompressFromBase64(LSCG));
                    if (LSCGdata.SplatterModule.enabled) spl = 1;
                }
                if (spl == 0) {
                    addMenuCheckbox(64, 64, "Activar gemido de orgasmo: ", "orgasmMoan", omsg, false, 140);
                } else {
                    addMenuCheckbox(64, 64, "Activar gemido de orgasmo: ", "orgasmMoan", omsg, true, 140);
                }
                addMenuCheckbox(64, 64, "Activar gemido por azote (spank): ", "spankMoan",
                    "Cuando está activado, gemirás al recibir azotes. También al ser mordida, pateada, pellizcada, electrocutada o abofeteada. En caso de acciones que activen descargas, solo afecta a las acciones para castigar orgasmos, levantarse o forcejear. Según tus fetiches y nivel de excitación, puede ser de dolor o placer.", false, 140
                );
                addMenuCheckbox(64, 64, "Activar gemido al hablar: ", "talkMoan",
                    "Cuando está activado, gemirás al hablar si tienes un vibrador activo. Los gemidos pueden interrumpir tu habla. Ten en cuenta que al desactivar este ajuste, también se desactivará automáticamente el gemido al susurrar.", false, 140
                );
                addMenuCheckbox(64, 64, "Extender gemido al hablar a los susurros: ", "whisperMoan",
                    "Cuando está activado, gemirás al susurrar si tienes un vibrador activo. Los gemidos pueden interrumpir tus susurros. Este ajuste no puede activarse si el gemido al hablar está desactivado.", "!Player.UBC.ubcSettings.talkMoan", 140
                );
                addMenuCheckbox(64, 64, "Activar gemido por cosquillas: ", "tickleMoan",
                    "Cuando está activado, gemirás al recibir cosquillas. Según tus fetiches y nivel de excitación, puede ser de dolor o placer.", false, 140
                );
                addMenuCheckbox(64, 64, "Activar gemido por vibradores: ", "vibeMoan",
                    "Cuando está activado, gemirás si cambian los ajustes de tu vibrador y tu nivel de excitación es igual o superior a 10. También al ser penetrada con dedos o puño, masturbada, o cuando tus orejas son acariciadas, besadas, lamidas o mordisqueadas, o al usar el inyector afrodisíaco, bebida o respirador de LSCG. Al desactivar esto, también se desactiva el gemido por vibradores ajenos (xvibes).", false, 140
                );
                addMenuCheckbox(64, 64, "Extender gemidos por vibradores (xvibes): ", "xvibeMoan",
                    "Cuando está activado, gemirás cuando cambien los ajustes de vibración de otros jugadores en la sala, incluso si tú no tienes un vibrador activo (la única condición es tener un nivel de excitación igual o superior a 10). Este ajuste requiere que el gemido por vibradores propio esté activado.", "!Player.UBC.ubcSettings.vibeMoan", 140
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
                } else PreferenceMessage = "Introduce un número válido";
            }

            PreferenceSubscreenUBCReputationLoad = function() {
                UBCPreferenceSubscreen = "UBCReputation";
                addMenuInput(200, "Reputación principal (-100 a 100):", "rpmain", "InputRpMain",
                    "Introduce un número entre -100 y 100 para establecer tu nivel de reputación principal. Un número negativo significa que eres Sumisa, un número positivo significa que eres Dominante.", 6
                );
                addMenuInput(200, "ABDL (0-100):", "rpabdl", "InputRpAbdl",
                    "Introduce un número entre 0 y 100 para establecer tu nivel de reputación ABDL.", 6
                );
                addMenuInput(200, "Manicomio (-100 a 100):", "rpasyl", "InputRpAsyl",
                    "Introduce un número entre -100 y 100 para establecer tu nivel de reputación en el Manicomio. Un número negativo significa que eres Paciente, un número positivo significa que eres Enfermera.", 6
                );
                addMenuInput(200, "Apuestas (0-100):", "rpgamb", "InputRpGamb",
                    "Introduce un número entre 0 y 100 para establecer tu nivel de reputación en Apuestas.", 6
                );
                addMenuInput(200, "Videojuegos (0-100):", "rpgame", "InputRpGame",
                    "Introduce un número entre 0 y 100 para establecer tu nivel de reputación en Videojuegos.", 6
                );
                addMenuInput(200, "Secuestro (0-100):", "rpkidn", "InputRpKidn",
                    "Introduce un número entre 0 y 100 para establecer tu nivel de reputación en Secuestro.", 6
                );
                addMenuInput(200, "LARP (0-100):", "rplarp", "InputRpLarp",
                    "Introduce un número entre 0 y 100 para establecer tu nivel de reputación LARP.", 6
                );
                addMenuInput(200, "Casa Mágica (0-4):", "rpmagh", "InputRpMagh",
                    "Introduce un número entre 0 y 4 para seleccionar una Casa Mágica: 0 = Ninguna - 1 = House Amplector - 2 = House Corporis - 3 = House Maiestas - 4 = House Vincula. Nota: al cambiar este parámetro, UBC reseteará automáticamente a 0 la reputación de Poder Mágico en todas las casas no seleccionadas.", 6
                );
                addMenuInput(200, "Poder Mágico (0-100):", "rpmagp", "InputRpMagp",
                    "Introduce un número entre 0 y 100 para establecer tu nivel de reputación de Poder Mágico en la Casa Mágica seleccionada.", 6
                );
                addMenuInput(200, "Sirvienta (0-100):", "rpmaid", "InputRpMaid",
                    "Introduce un número entre 0 y 100 para establecer tu nivel de reputación de Sirvienta.", 6
                );
            }

            PreferenceSubscreenUBCReputationRun = function() {
                drawMenuElements();
            }

            PreferenceSubscreenUBCReputationClick = function() {
                handleMenuClicks();
            }

            PreferenceSubscreenUBCReputationExit = function() {
                let abdl = ElementValue("InputRpAbdl") * 1;
                let asyl = ElementValue("InputRpAsyl") * 1;
                let gamb = ElementValue("InputRpGamb") * 1;
                let game = ElementValue("InputRpGame") * 1;
                let kidn = ElementValue("InputRpKidn") * 1;
                let larp = ElementValue("InputRpLarp") * 1;
                let magh = ElementValue("InputRpMagh") * 1;
                let magp = ElementValue("InputRpMagp") * 1;
                let maid = ElementValue("InputRpMaid") * 1;
                let main = ElementValue("InputRpMain") * 1;
                if ((CommonIsNumeric(abdl)) && (abdl > -1) && (abdl < 101) &&
                    (CommonIsNumeric(asyl)) && (asyl > -101) && (asyl < 101) &&
                    (CommonIsNumeric(gamb)) && (gamb > -1) && (gamb < 101) &&
                    (CommonIsNumeric(game)) && (game > -1) && (game < 101) &&
                    (CommonIsNumeric(kidn)) && (kidn > -1) && (kidn < 101) &&
                    (CommonIsNumeric(larp)) && (larp > -1) && (larp < 101) &&
                    (CommonIsNumeric(magh)) && (magh > -1) && (magh < 5) &&
                    (CommonIsNumeric(magp)) && (magp > -1) && (magp < 101) &&
                    (CommonIsNumeric(maid)) && (maid > -1) && (maid < 101) &&
                    (CommonIsNumeric(main)) && (main > -101) && (main < 101)) {
                    Player.UBC.ubcSettings.rpabdl = abdl;
                    Player.UBC.ubcSettings.rpasyl = asyl;
                    Player.UBC.ubcSettings.rpgamb = gamb;
                    Player.UBC.ubcSettings.rpgame = game;
                    Player.UBC.ubcSettings.rpkidn = kidn;
                    Player.UBC.ubcSettings.rplarp = larp;
                    Player.UBC.ubcSettings.rpmagh = magh;
                    Player.UBC.ubcSettings.rpmagp = magp;
                    Player.UBC.ubcSettings.rpmaid = maid;
                    Player.UBC.ubcSettings.rpmain = main;
                    DialogSetReputation("ABDL", abdl);
                    DialogSetReputation("Asylum", asyl);
                    DialogSetReputation("Gambling", gamb);
                    DialogSetReputation("Gaming", game);
                    DialogSetReputation("Kidnap", kidn);
                    DialogSetReputation("LARP", larp);
                    ResetHousesReputation();
                    let house = "";
                    if (magh == 1) house = "HouseAmplector";
                    if (magh == 2) house = "HouseCorporis";
                    if (magh == 3) house = "HouseMaiestas";
                    if (magh == 4) house = "HouseVincula";
                    if (magh != 0) DialogSetReputation(house, magp);
                    DialogSetReputation("Maid", maid);
                    DialogSetReputation("Dominant", main);
                    ElementRemove("InputRpAbdl");
                    ElementRemove("InputRpAsyl");
                    ElementRemove("InputRpGamb");
                    ElementRemove("InputRpGame");
                    ElementRemove("InputRpKidn");
                    ElementRemove("InputRpLarp");
                    ElementRemove("InputRpMagh");
                    ElementRemove("InputRpMagp");
                    ElementRemove("InputRpMaid");
                    ElementRemove("InputRpMain");
                    defaultExit();
                } else PreferenceMessage = "Introduce un número válido";
            }

            PreferenceSubscreenUBCSkillsLoad = function() {
                UBCPreferenceSubscreen = "UBCSkills";
                addMenuInput(200, "Bondage (0-10):", "skbondage", "InputSkillBondage",
                    "¡Introduce un número entre 0 y 10 para establecer tu nivel de habilidad en Bondage!", 6
                );
                addMenuInput(200, "Doma (0-10):", "skdressage", "InputSkillDressage",
                    "¡Introduce un número entre 0 y 10 para establecer tu nivel de habilidad en Doma (Dressage)!", 6
                );
                addMenuInput(200, "Evasión (0-10):", "skevasion", "InputSkillEvasion",
                    "¡Introduce un número entre 0 y 10 para establecer tu nivel de habilidad en Evasión!", 6
                );
                addMenuInput(200, "Infiltración (0-10):", "skinfiltration", "InputSkillInfiltration",
                    "¡Introduce un número entre 0 y 10 para establecer tu nivel de habilidad en Infiltración!", 6
                );
                addMenuInput(200, "Ganzúa (0-10):", "sklockpicking", "InputSkillLockpicking",
                    "¡Introduce un número entre 0 y 10 para establecer tu nivel de habilidad en Ganzúa (Lockpicking)!", 6
                );
                addMenuInput(200, "Autobondage (0-10):", "skselfbondage", "InputSkillSelfbondage",
                    "¡Introduce un número entre 0 y 10 para establecer tu nivel de habilidad en Autobondage!", 6
                );
                addMenuInput(200, "Fuerza de voluntad (0-10):", "skwillpower", "InputSkillWillpower",
                    "¡Introduce un número entre 0 y 10 para establecer tu nivel de habilidad en Fuerza de voluntad!", 6
                );
            }

            PreferenceSubscreenUBCSkillsRun = function() {
                drawMenuElements();
            }

            PreferenceSubscreenUBCSkillsClick = function() {
                handleMenuClicks();
            }

            PreferenceSubscreenUBCSkillsExit = function() {
                let bondage = ElementValue("InputSkillBondage") * 1;
                let dressage = ElementValue("InputSkillDressage") * 1;
                let evasion = ElementValue("InputSkillEvasion") * 1;
                let infiltration = ElementValue("InputSkillInfiltration") * 1;
                let lockpicking = ElementValue("InputSkillLockpicking") * 1;
                let selfbondage = ElementValue("InputSkillSelfbondage") * 1;
                let willpower = ElementValue("InputSkillWillpower") * 1;
                if ((CommonIsNumeric(bondage)) && (bondage > -1) && (bondage < 11) &&
                    (CommonIsNumeric(dressage)) && (dressage > -1) && (dressage < 11) &&
                    (CommonIsNumeric(evasion)) && (evasion > -1) && (evasion < 11) &&
                    (CommonIsNumeric(infiltration)) && (infiltration > -1) && (infiltration < 11) &&
                    (CommonIsNumeric(lockpicking)) && (lockpicking > -1) && (lockpicking < 11) &&
                    (CommonIsNumeric(selfbondage)) && (selfbondage > -1) && (selfbondage < 11) &&
                    (CommonIsNumeric(willpower)) && (willpower > -1) && (willpower < 11)) {
                    Player.UBC.ubcSettings.skbondage = bondage;
                    Player.UBC.ubcSettings.skdressage = dressage;
                    Player.UBC.ubcSettings.skevasion = evasion;
                    Player.UBC.ubcSettings.skinfiltration = infiltration;
                    Player.UBC.ubcSettings.sklockpicking = lockpicking;
                    Player.UBC.ubcSettings.skselfbondage = selfbondage;
                    Player.UBC.ubcSettings.skwillpower = willpower;
                    SkillChange(Player, "Bondage", bondage);
                    SkillChange(Player, "Dressage", dressage);
                    SkillChange(Player, "Evasion", evasion);
                    SkillChange(Player, "Infiltration", infiltration);
                    SkillChange(Player, "LockPicking", lockpicking);
                    SkillChange(Player, "SelfBondage", selfbondage);
                    SkillChange(Player, "Willpower", willpower);
                    ElementRemove("InputSkillBondage");
                    ElementRemove("InputSkillDressage");
                    ElementRemove("InputSkillEvasion");
                    ElementRemove("InputSkillInfiltration");
                    ElementRemove("InputSkillLockpicking");
                    ElementRemove("InputSkillSelfbondage");
                    ElementRemove("InputSkillWillpower");
                    defaultExit();
                } else PreferenceMessage = "Introduce un número válido";
            }

            PreferenceSubscreenUBCSpecialModesLoad = function() {
                UBCPreferenceSubscreen = "UBCSpecialModes";
                DOGSsettings();
                let nmsg = "Este modo desactiva los botones y atajos de LIBERAR/SALIR, y prohíbe muchos comandos sobre ti misma: boost, leave (BCAR), quit, safeworditem, safewordspecific (BCAR), slowleave, solidity (si el valor < 20), totalrelease, unlock, untie. Si este modo está activo, no puede desactivarse mientras se está en restricción. Si se está en modo 'unrestrict total' al activar esta opción, el modo especial se desactivará automáticamente.";
                if (((Player.IsRestrained() == true) || (dogsforbid == true)) && (noescape == true)) {
                    addMenuCheckbox(64, 64, "Activar modo sin escape (no-escape): ", "noescape", nmsg, true, 220);
                } else {
                    addMenuCheckbox(64, 64, "Activar modo sin escape (no-escape): ", "noescape", nmsg, false, 220);
                }
                addMenuCheckbox(64, 64, "Forzar modo no-escape con candados devious: ", "dogsforced",
                    "Cuando el modo no-escape está desactivado, se puede decidir forzar este modo cuando se tienen candados devious. Estos candados deben estar activados en el mod DOGS. Este modo seguirá activo tras quitar los candados y debe desactivarse manualmente.", "Player.UBC.ubcSettings.noescape", 220
                );
                addMenuCheckbox(64, 64, "Activar modo silencio: ", "silent",
                    "Este modo impide usar el comando de mensaje y hace que ciertos comandos no muestren avisos en el chat: allcolor, clothes, invisible, lock, naked, pet, randomize, restrain, solidity, totalrelease, underwear, unlock, untie, visible. Para volver a los mensajes por defecto, se debe desactivar este modo.", false, 220
                );
                addMenuCheckbox(64, 64, "Extender modo silencio a la Safeword: ", "silsafe",
                    "Cuando el modo silencio está activo, se puede usar la safeword sin que aparezca ningún mensaje en el chat. Útil solo si la safeword está habilitada.", "!Player.UBC.ubcSettings.silent", 220
                );
                addMenuCheckbox(64, 64, "Activar modo 'unrestrict soft': ", "usoft",
                    "Efectos de este modo: objetos ocultos añadidos al inventario, acceso a objetos cubiertos por otros, uso de ciertos objetos sobre uno mismo o terceros, y función de examen preservada bajo ceguera (excepto en privación sensorial total). No elimina las condiciones para usar assets. Requiere reiniciar sesión para salir del modo.", false, 220
                );
                addMenuCheckbox(64, 64, "Activar modo 'unrestrict total': ", "utotal",
                    "Además de los efectos 'soft', este modo permite ciertas interacciones incluso bajo restricción. Uno de sus efectos puede ser bloqueado por Uwall. Este modo no está disponible en no-escape. Puede activar una alerta de BCX que debe ignorarse. Requiere reiniciar sesión para salir de este modo.", "Player.UBC.ubcSettings.noescape", 220
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
                addMenuInput(200, "Modo habla/susurro animal (0-9):", "animal", "InputAnimalMode",
                    "Introduce un número del 0 al 9 para seleccionar un modo de habla o susurro animal 'permanente' forzado: 0 Humano - 1 Conejo - 2 Vaca - 3 Zorro - 4 Gatito - 5 Ratón - 6 Cerdo - 7 Pony - 8 Cachorro - 9 Lobito. Si solo quieres hablar así una vez, usa el comando /atalk tras seleccionar 0 (habla humana) aquí.", 64
                );
                addMenuCheckbox(64, 64, "Activar modo de habla/susurro híbrido: ", "ahybrid",
                    "Cuando está activado y se asocia con un modo de habla animal, ¡todos tus mensajes y susurros combinarán palabras animales y humanas!", false, 200
                );
                addMenuCheckbox(64, 64, "Activar modo de habla (y susurro) de muñeca: ", "dolltalk",
                    "Cuando está activado, máximo 5 palabras por mensaje o susurro, y no puedes usar palabras de más de 6 caracteres. El cumplimiento de estas reglas se verifica en la versión original de tu mensaje antes de ser alterado por tartamudeo, el Moaner, babytalk, gagtalk o habla animal.", false, 200
                );
                addMenuInput(200, "Mordaza/susurro forzado (0-11):", "gaglevel", "InputGagLevel",
                    "Introduce un número del 0 al 11 para seleccionar un nivel 'permanente' forzado: 0 Función desactivada - 1 Casi sin mordaza - 2 Muy ligera - 3 Ligera - 4 Fácil - 5 Normal - 6 Media - 7 Pesada - 8 Pesada superior - 9 Muy pesada - 10 Total - 11 Habla de bebé (Baby talk). Si ya estás amordazada, tu elección solo puede aumentar el efecto, no disminuirlo. Para usar gagtalk una sola vez, usa el comando /gtalk. Para hablar como un bebé una sola vez, usa /btalk. Mira también el botón RGL.", 64
                );
                addMenuInput(200, "Modo de audición forzada (1-6):", "hearing", "InputHearingMode",
                    "Introduce un número del 1 al 6 para seleccionar un modo de audición 'permanente' forzado, ignorando tu estado real: 1 Sin sordera - 2 Sordera ligera - 3 Normal - 4 Pesada - 5 Muy pesada - 6 Total. Nota: necesitarás reiniciar sesión (relog) completamente para salir de este modo especial (si introduces 0, no tendrá efecto). ¡Este modo puede activar un aviso de BCX, simplemente ignóralo (cierra el mensaje de error)!", 64
                );
                addMenuInput(200, "Nivel de tartamudeo forzado (0-4):", "stutterlevel", "InputStutterLevel",
                    "Introduce un número del 0 al 4 para seleccionar un nivel de tartamudeo 'permanente' forzado: 0 Sin tartamudeo - 1 Ligero - 2 Normal - 3 Pesado - 4 Total. Ten en cuenta que si tienes vibradores activos, tu elección solo puede aumentar el efecto, no disminuirlo. Si solo quieres hablar con un nivel de tartamudeo específico una vez, usa el comando /stalk tras seleccionar 0 aquí.", 64
                );
                let wmsg = "Cuando está activado, no puedes usar susurros normales. Solo son posibles los susurros OOC y de gestos (emote). Esta opción no está disponible cuando se detecta una regla de BCX similar activa. En ese caso, UBC aplicará las restricciones de susurro de BCX, pero no enviará mensajes públicos ni añadirá entradas al registro de comportamiento si intentas susurrar cuando no está permitido.";
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
                    addMenuCheckbox(64, 64, "Activar modo sin susurros: ", "nowhisper", wmsg, false, 200);
                } else {
                    addMenuCheckbox(64, 64, "Activar modo sin susurros: ", "nowhisper", wmsg, true, 200);
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
                } else PreferenceMessage = "Introduce un número válido";
            }
			
            PreferenceSubscreenUBCVisualLoad = function() {
                UBCPreferenceSubscreen = "UBCVisual";
                let pmsg = "Por defecto, BC añade mensajes y un efecto rosa cuando estás muy excitada y probablemente vayas a tener un orgasmo. ¡Si no te gusta eso, este ajuste de UBC te hará feliz! Nota: No está disponible cuando la función LSCG Splatter está detectada como activada.";
                let spl = 0;
                let LSCG = Player.ExtensionSettings.LSCG;
                if (LSCG) {
                    let LSCGdata = JSON.parse(LZString.decompressFromBase64(LSCG));
                    if (LSCGdata.SplatterModule.enabled) spl = 1;
                }
                if (spl == 0) {
                    addMenuCheckbox(64, 64, "Desactivar capa rosa de excitación de BC: ", "nopinkscr", pmsg, false, 200);
                } else {
                    addMenuCheckbox(64, 64, "Desactivar capa rosa de excitación de BC: ", "nopinkscr", pmsg, true, 200);
                }
                addMenuCheckbox(64, 64, "Quitar barra inferior de UBC en Búsqueda de Chat: ", "noubcbar",
                    "Si marcas este ajuste, UBC no mostrará la barra inferior en la Búsqueda de Chat. Las opciones faltantes estarán disponibles en el menú de Búsqueda de Chat.", false, 200
                );
                addMenuInput(200, "Modo de ceguera forzada (1-4):", "blindness", "InputBlindnessMode",
                    "Introduce un número entre 1 y 4 para seleccionar uno de estos modos de ceguera 'permanentes' forzados, ignorando tu estado real: 1 Sin ceguera - 2 Ceguera ligera - 3 Ceguera normal - 4 Ceguera pesada. Nota: necesitarás reiniciar sesión (relog) completamente para salir de este modo especial (si introduces 0, no tendrá efecto). ¡Este modo puede activar un aviso de BCX, simplemente ignóralo!", 65
                );
                addMenuInput(200, "Visión borrosa forzada (1-5):", "blurmode", "InputBlurMode",
                    "Introduce un número entre 1 y 5 para seleccionar uno de estos modos de visión borrosa 'permanentes' forzados, ignorando tu estado real: 1 Sin visión borrosa - 2 Visión borrosa ligera - 3 Visión borrosa normal - 4 Versión borrosa pesada - 5 Visión borrosa total. Nota: necesitarás reiniciar sesión (relog) para salir de este modo especial (si introduces 0, no tendrá efecto). ¡Este modo puede activar un aviso de BCX, simplemente ignóralo!", 65
                );
                addMenuCheckbox(64, 64, "Desactivar totalmente los ajustes de tinte: ", "tintnever",
                    "Si marcas este ajuste, todos los ajustes de tinte de UBC (nivel, color, MBS) se desactivarán por completo. Sin embargo, se requiere reiniciar sesión para restaurar los colores originales o del tema en las pantallas de MBS.", false, 200
                );
                addMenuInput(200, "Nivel de efecto de tinte (0-3):", "tintlevel", "InputTintLevel",
                    "Introduce un número entre 0 y 3 para seleccionar uno de estos niveles de efecto de tinte forzados: 0 Sin efecto - 1 Efecto ligero - 2 Efecto medio - 3 Efecto pesado.", 65
                );
                addMenuInput(200, "Color del efecto de tinte (formato #000000):", "tintcolor", "InputTintColor",
                    "Introduce un código de color en formato hexadecimal #000000 para aplicar un efecto de tinte en casi todo el Bondage Club. ¡No olvides seleccionar también un nivel de efecto de tinte! El tinte también se aplicará en las páginas creadas por la mayoría de complementos. Excepciones conocidas son BCX y el mod de Echo. El caso de MBS es especial (ver ajuste específico). El color final puede variar al mezclarse con un color de Tema.", 65
                );
                let mbsmsg = "Cuando esté activado, visita SIEMPRE la pantalla de Extensiones para activarlo tras iniciar sesión. El color del tinte se usará como color de fondo para la parte central de las pantallas de MBS. Si lo desactivas más tarde, el color restaurado corresponderá al color por defecto de MBS o al color principal del Tema. Este ajuste no tiene efecto si el nivel de tinte es 0. No está disponible si no se usa MBS o si los ajustes de tinte de UBC están totalmente desactivados.";
                let mbb = 0;
                let list = PreferenceExtensionsDisplay;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].Button == "MBS Settings") mbb = 1;
                }
                if (mbb == 0) {
                    addMenuCheckbox(64, 64, "Activar efecto de tinte en pantallas MBS: ", "tintmbs", mbsmsg, true, 200);
                } else {
                    addMenuCheckbox(64, 64, "Activar efecto de tinte en pantallas MBS: ", "tintmbs", mbsmsg, "Player.UBC.ubcSettings.tintnever", 200);
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
                let regex = /^#(([0-9a-f]{3})|([0-9a-f]{6}))$/i;
                let ttcolor = ElementValue("InputTintColor");
                let ttlevel = ElementValue("InputTintLevel");
                if ((CommonIsNumeric(blmode)) && (blmode > -1) && (blmode < 5) &&
                    (CommonIsNumeric(brmode)) && (brmode > -1) && (brmode < 6) &&
                    (CommonIsNumeric(ttlevel)) && (ttlevel > -1) && (ttlevel < 4) &&
                    (ttcolor.startsWith("#")) && (ttcolor.match(regex))) {
                    Player.UBC.ubcSettings.blindness = blmode;
                    Player.UBC.ubcSettings.blurmode = brmode;
                    Player.UBC.ubcSettings.tintcolor = ttcolor;
                    Player.UBC.ubcSettings.tintlevel = ttlevel;
                    ElementRemove("InputBlindnessMode");
                    ElementRemove("InputBlurMode");
                    ElementRemove("InputTintColor");
                    ElementRemove("InputTintLevel");
                    defaultExit();
                } else PreferenceMessage = "Introduce un número válido";
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
                ButtonText: "ULTRAbc",
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
    ULTRAAppearanceMenuDraw();
    ULTRAAppearanceRun();
    ULTRAAsylumEntranceClick();
    ULTRAAsylumEntranceRun();
    ULTRAAsylumEntranceStartChat();
    ULTRAAsylumGGTSLoad();
    ULTRAAsylumMeetingClubCardStart();
    ULTRAAsylumMeetingRun();
    ULTRABackgroundsTextGet();
    ULTRACafeClubCardStart();
    ULTRACafeRun();
    ULTRACellClick();
    ULTRACellLoad();
    ULTRACellRun();
    ULTRAChatAdminClick();
    ULTRAChatAdminRun();
    ULTRAChatRoomClick();
	ULTRAChatRoomDrawArousalOverlay();
    ULTRAChatRoomKeyDown();
    ULTRAChatRoomMapViewCalculatePerceptionMasks();
    ULTRAChatRoomMapViewCanEnterTile();
    ULTRAChatRoomMapViewCharacterOnWhisperRange();
    ULTRAChatRoomMapViewMovementProcess();
    ULTRAChatRoomMapViewTeleportHiddenMessage();
    ULTRAChatRoomMenuDraw();
    ULTRAChatRoomSafewordRevert();
    ULTRAChatRoomSendChat();
    ULTRAChatSearchExit();
    ULTRAChatSearchJoin();
    ULTRAChatSearchKeyDown();
    ULTRAChatSearchLoad();
    ULTRAChatSearchParseResponse();
    ULTRAChatSearchResize();
    ULTRAChatSearchRun();
	ULTRAChatSearchToggleSearchMode();
    ULTRAChatSearchUnload();
    ULTRAClubCardBuilderClick();
    ULTRAClubCardBuilderLoad();
    ULTRAClubCardCheckVictory();
    ULTRAClubCardClick();
    ULTRAClubCardEndTurn();
    ULTRAClubCardGetReward();
    ULTRAClubCardLoadDeckNumber();
    ULTRAClubCardLoungePraticeGameStart();
    ULTRAClubCardLoungeRun();
    ULTRAClubCardRenderPanel();
    ULTRACollegeTennisGameStart();
    ULTRAFriendListDraw();
    ULTRAFriendListKeyDown();
    ULTRAInfiltrationClubCardStart();
    ULTRAInfiltrationPrepareMission();
    ULTRAInfiltrationRun();
    ULTRAInformationSheetClick();
    ULTRAInformationSheetRun();
    ULTRAInformationSheetSecondScreenRun();
    ULTRAIntroductionClubCardStart();
    ULTRAIntroductionJobAnyAvailable();
    ULTRAIntroductionRun();
    ULTRAKidnapLeagueRandomClubCardStart();
    ULTRAKidnapLeagueRun();
    ULTRALARPClubCardStart();
    ULTRALARPRun();
    ULTRALoginClick();
    ULTRALoginRun();
    ULTRAMagicPuzzleRun();
    ULTRAMagicSchoolEscapeSpellEnd();
    ULTRAMagicSchoolFindsAroundRun();
    ULTRAMaidQuartersRun();
    ULTRAMainHallClick();
    ULTRAMainHallRun();
    ULTRAMovieStudioClubCardStart();
    ULTRAMovieStudioRun();
    ULTRAPandoraClubCardStart();
    ULTRAPandoraPenitentiaryResult();
    ULTRAPandoraPrisonClick();
    ULTRAPandoraPrisonRun();
    ULTRAPhotographicClick();
    ULTRAPhotographicRun();
    ULTRAPlatformAttack();
    ULTRAPlatformDialogEvent();
    ULTRAPreferenceRun();
    ULTRAPreferenceSubscreenChatLoad();
    ULTRAPreferenceSubscreenExtensionsLoad();
    ULTRAPreferenceSubscreenGeneralLoad();
    ULTRAPreferenceSubscreenImmersionLoad();
    ULTRAPreferenceSubscreenMainLoad();
    ULTRAPreferenceSubscreenOnlineClick();
    ULTRAPreferenceSubscreenOnlineLoad();
    ULTRAPreferenceSubscreenOnlineRun();
	ULTRAPrivateClick();
    ULTRAPrivateClubCardVsFriendStart();
    ULTRAPrivateClubCardVsOwnerStart();
    ULTRAPrivateClubCardVsSubStart();
    ULTRAPrivateGetClubCardDeck();
	ULTRAPrivateRun();
    ULTRARelogLoad();
    ULTRAShibariClubCardStart();
    ULTRAShibariRun();
    ULTRAStableClubCardStart();
    ULTRAStablePlayerTrainingCarrotsEnd();
    ULTRAStablePlayerTrainingHurdlesEnd();
    ULTRAStableRun();
    ULTRAStruggleMinigameWasInterrupted();
    ULTRATitleExit();

    ULTRAArcadeRun();
    ULTRAAsylumBedroomRun();
    ULTRAAsylumGGTSRun();
    ULTRAAsylumTherapyRun();
    ULTRAChatAdminRoomCustomizationRun();
    ULTRAChatSelectRun();
    ULTRAChestLockpickRun();
    ULTRAClubCardBuilderRun();
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
    ULTRAKidnapRun();
    ULTRAMagicRun();
    ULTRAMagicBattleRun();
    ULTRAMagicSchoolEscapeRun();
    ULTRAMagicSchoolLaboratoryRun();
    ULTRAMaidCleaningRun();
    ULTRAMaidDrinksRun();
    ULTRAManagementRun();
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
    ULTRAShopRun();
    ULTRASlaveAuctionRun();
    ULTRASlaveMarketRun();
    ULTRATennisRun();
    ULTRATherapyRun();
    ULTRATitleRun();
    ULTRAWheelFortuneRun();

    //Asylum
    function ULTRAAsylumEntranceClick() {
        modApi.hookFunction('AsylumEntranceClick', 4, (args, next) => {
            if (asylumlimit == false) {
                if ((MouseX >= 240) && (MouseX < 330) && (MouseY >= 475) && (MouseY < 565)) {
                    if (IsFemale() == true) {
                        Player.ChatSearchSettings.Space = "";
                        ChatSelectStartSearch(ChatRoomSpaceType.FEMALE_ONLY);
                    }
                    if (IsMale() == true) {
                        Player.ChatSearchSettings.Space = "M";
                        ChatSelectStartSearch(ChatRoomSpaceType.MALE_ONLY);
                    }
                }
                if ((MouseX >= 240) && (MouseX < 330) && (MouseY >= 585) && (MouseY < 675)) {
                    Player.ChatSearchSettings.Space = "X";
                    ChatSelectStartSearch(ChatRoomSpaceType.MIXED);
                }
            }
            if ((MouseX >= 350) && (MouseX < 440) && (MouseY >= 475) && (MouseY < 565)) {
                Player.ChatSearchSettings.Space = "Asylum";
                ChatSelectStartSearch(ChatRoomSpaceType.ASYLUM);
            }
            next(args);
        });
    }

    async function ULTRAAsylumEntranceRun() {
        modApi.hookFunction('AsylumEntranceRun', 4, (args, next) => {
            TintsEffect();
            DrawText("Chat Rooms", 130, 530, "White", "Black");
            if (asylumlimit == false) {
                if (IsFemale() == true) DrawButton(240, 475, 90, 90, "", "White", "Screens/Online/ChatSelect/Female.png", "Only Female");
                if (IsMale() == true) DrawButton(240, 475, 90, 90, "", "White", "Screens/Online/ChatSelect/Male.png", "Only Male");
                DrawButton(240, 585, 90, 90, "", "White", "Icons/Gender.png", "Mixed");
            } else {
                if (IsFemale() == true) DrawButton(240, 475, 90, 90, "", "Gray", "Screens/Online/ChatSelect/Female.png", "Only Female");
                if (IsMale() == true) DrawButton(240, 475, 90, 90, "", "Gray", "Screens/Online/ChatSelect/Male.png", "Only Male");
                DrawButton(240, 585, 90, 90, "", "Gray", "Icons/Gender.png", "Mixed");
            }
            DrawButton(350, 475, 90, 90, "", "White", "Icons/Asylum.png", "Asylum");
            next(args);
        });
    }

    async function ULTRAAsylumMeetingRun() {
        modApi.hookFunction('AsylumMeetingRun', 4, (args, next) => {
            TintsEffect();
            if (minigame == "asylum") {
                minigame = "";
                M_MOANER_saveControls();
                AsylumEntranceIsWearingNurseClothes = function() {
                    return true
                };
                InventoryRemove(AsylumMeetingPatientRight, "ItemArms");
                InventoryRemove(AsylumMeetingPatientRight, "ItemHead");
                InventoryRemove(AsylumMeetingPatientRight, "ItemMouth");
            }
            next(args);
        });
    }

    //Backgrounds
    function ULTRABackgroundsTextGet(msg) {
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
    function ULTRAPlatformAttack() {
        modApi.hookFunction('PlatformAttack', 4, (args, next) => {
            if (magiccheat == true) BrawlCheat();
            next(args);
        });
    }

    function ULTRAPlatformDialogEvent() {
        modApi.hookFunction('PlatformDialogEvent', 4, (args, next) => {
            if (magiccheat == true) BrawlCheat();
            next(args);
        });
    }

    //Cafe
    async function ULTRACafeRun() {
        modApi.hookFunction('CafeRun', 4, (args, next) => {
            TintsEffect();
            if (minigame == "cafe") {
                minigame = "";
                M_MOANER_saveControls();
            }
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

    function ULTRAChatAdminClick() {
        modApi.hookFunction('ChatAdminClick', 4, (args, next) => {
            if (ChatAdminCanEdit()) {
                if (MouseIn(1230, 450, 60, 60)) {
                    if ((asylumlimit == true) && (ChatSearchSpace == "Asylum")) {
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

    function ULTRAChatRoomClick() {
        modApi.hookFunction('ChatRoomClick', 4, (args, next) => {
            if (extbuttons == true) {
                if ((MouseX >= 955) && (MouseX < 1000) && (MouseY >= 270) && (MouseY < 315)) {
                    ExtClick();
                    return;
                }
            }
            if ((sosbuttons == true) && (noescape == false)) {
                if ((MouseX >= 955) && (MouseX < 1000) && (MouseY >= 315) && (MouseY < 360)) {
                    let msg = "Láseres mágicos hacen desaparecer todas las ataduras y juguetes del cuerpo de " + tmpname + ".";
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
                        let msg = "" + tmpname + " se dirige lentamente hacia la puerta.";
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

    function ULTRAChatRoomKeyDown() {
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

    function ULTRAChatRoomMapViewCalculatePerceptionMasks() {
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

    function ULTRAChatRoomMapViewCanEnterTile() {
        modApi.hookFunction('ChatRoomMapViewCanEnterTile', 4, (args, next) => {
            const ret = next(args);
            if (mapcheat) return 20;
            return ret;
        });
    }

    function ULTRAChatRoomMapViewCharacterOnWhisperRange() {
        modApi.hookFunction('ChatRoomMapViewCharacterOnWhisperRange', 4, (args, next) => {
            const ret = next(args);
            if (nowhrange) return true;
            return ret;
        });
    }

    function ULTRAChatRoomMapViewMovementProcess() {
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
                        let msg = "" + tmpname + " ha caído de repente en un Banco de Bondage.";
                        publicmsg(msg);
                    }
                    if ((item2 == "Coffin") && ((maptrap1 == 2) || (maptrap1 == 9))) {
                        CoffinTrap();
                        let msg = "" + tmpname + " ha caído de repente en un Ataúd.";
                        publicmsg(msg);
                    }
                    if ((item2 == "TheDisplayFrame") && ((maptrap1 == 3) || (maptrap1 == 9))) {
                        DisplayFrameTrap();
                        let msg = "" + tmpname + " ha caído de repente en un Marco de Exhibición.";
                        publicmsg(msg);
                    }
                    if ((item2 == "Kennel") && ((maptrap1 == 4) || (maptrap1 == 9))) {
                        KennelTrap();
                        let msg = "" + tmpname + " ha caído de repente en una Perrera.";
                        publicmsg(msg);
                    }
                    if ((item2 == "Locker") && ((maptrap1 == 5) || (maptrap1 == 9))) {
                        LockerTrap();
                        let msg = "" + tmpname + " ha caído de repente en un Casillero.";
                        publicmsg(msg);
                    }
                    if ((item2 == "Trolley") && ((maptrap1 == 6) || (maptrap1 == 9))) {
                        TrolleyTrap();
                        let msg = "" + tmpname + " ha caído de repente en una Carretilla.";
                        publicmsg(msg);
                    }
                    if ((item2 == "WoodenBox") && ((maptrap1 == 7) || (maptrap1 == 9))) {
                        WoodenBoxTrap();
                        let msg = "" + tmpname + " ha caído de repente en una Caja de Madera.";
                        publicmsg(msg);
                    }
                    if ((item2 == "X-Cross") && ((maptrap1 == 8) || (maptrap1 == 9))) {
                        XCrossTrap();
                        let msg = "" + tmpname + " ha caído de repente en una Cruz en X.";
                        publicmsg(msg);
                    }
                }
            }
            return ret;
        });
    }


    function ULTRAChatRoomMapViewTeleportHiddenMessage() {
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
                    let msg = "Un intento de teletransporte ha sido cancelado porque no está permitido.";
                    publicmsg(msg);
                    return;
                }
            }
            next(args);
        });
    }

    async function ULTRAChatRoomMenuDraw() {
        modApi.hookFunction('ChatRoomMenuDraw', 4, (args, next) => {
            ElementRemove("chat-search-room-bottom");
            AutoJoin = function() {};
            this.AutoJoinOn = false;
            ElementRemove("AutoJoinAlert");
            IsOn = false;
            TintsEffect();
            minigame = "";
            M_MOANER_saveControls();
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
            Player.ChatSearchSettings.Game = "";
            next(args);
        });
    }

    function ULTRAChatRoomSafewordRevert() {
        modApi.hookFunction('ChatRoomSafewordRevert', 4, (args, next) => {
            if (ChatSearchSafewordAppearance != null) {
                Player.Appearance = ChatSearchSafewordAppearance.slice(0);
                Player.ActivePoseMapping = ChatSearchSafewordPose;
                CharacterRefresh(Player);
                ChatRoomCharacterUpdate(Player);
                if (silsafe == false) {
                    const Dictionary = new DictionaryBuilder()
                        .sourceCharacter(Player)
                        .build();
                    ServerSend("ChatRoomChat", {
                        Content: "ActionActivateSafewordRevert",
                        Type: "Action",
                        Dictionary
                    });
                }
                if ((Player.AllowedInteractions < AllowedInteractions.OwnerLoversWhitelistOnly) && (fixperm == false)) {
                    Player.AllowedInteractions = AllowedInteractions.OwnerLoversWhitelistOnly;
                    ServerAccountUpdate.QueueData({
                        AllowedInteractions: Player.AllowedInteractions,
                        ItemPermission: Player.AllowedInteractions
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
                        let msg = "Tu mensaje o susurro no puede enviarse porque no respeta las reglas de habla de muñeca (doll talk).";
                        infomsg(msg);
                    }
                }
                if ((nowhisper == true) || (wh1 == 1)) {
                    if (ChatRoomTargetMemberNumber != -1) nw = 1;
                    if (nw == 1) {
                        text2 = "";
                        ElementValue("InputChat", "");
                        let msg = "Tu susurro no puede enviarse porque estás en modo sin susurros.";
                        if (wh1 == 1) msg = "Tu susurro no puede enviarse porque una regla de BCX te impide susurrar a este jugador.";
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

    //Chat Search 
    async function ULTRAChatSearchExit() {
        modApi.hookFunction('ChatSearchExit', 4, (args, next) => {
            Player.ChatSearchSettings.Game = "";
            if (ChatSearchSpace == "Asylum") {
                ChatSearchReturnScreen = ["Room", "AsylumEntrance"];
            } else {
                ChatSearchReturnScreen = ["Room", "MainHall"];
            }
            next(args);
        });
    }

    async function ULTRAChatSearchJoin(RoomName) {
        modApi.hookFunction('ChatSearchJoin', 4, (args, next) => {
            if (autojoin == true) {
                if (ChatSearchLastQueryJoin != RoomName || (ChatSearchLastQueryJoin == RoomName && ChatSearchLastQueryJoinTime + 1000 < CommonTime())) {
                    if (this.IsOn == undefined || this.IsOn == false) {
                        IsOn = true;
                        var TextArea = document.createElement("TextArea");
                        TextArea.setAttribute("ID", "AutoJoinAlert");
                        document.body.appendChild(TextArea);
                        ElementValue("AutoJoinAlert", "AutoJoining...");
                        ElementPosition("AutoJoinAlert", 260, 935, 250);
                    }
                    AutoJoin = function() {
                        this.AutoJoinOn = true;
                        setTimeout(function() {
                            AutoJoin()
                        }, 1300);
                        ChatSearchLastQueryJoinTime = CommonTime();
                        ChatSearchLastQueryJoin = RoomName;
                        ServerSend("ChatRoomJoin", {
                            Name: RoomName
                        });
                        ChatRoomPingLeashedPlayers();
                        if (this.AutoJoinOn == false || this.AutoJoinOn == undefined) {
                            AutoJoin();
                        }
                    }
                }
            }
            next(args);
        });
    }

    function ULTRAChatSearchKeyDown() {
        modApi.hookFunction('ChatSearchKeyDown', 4, (args, next) => {
            let ret = next(args);
            if ((cskeys == true) && (event.code === "ArrowDown")) {
                let backgrounds = BackgroundsTagList;
                BackgroundSelectionMake(backgrounds, "", (Name, setBackground) => {
                    if (setBackground) {
                        csname = Name;
                        M_MOANER_saveControls();
                    }
                    CommonSetScreen("Online", "ChatSearch");
                });
            }
            if ((cskeys == true) && (event.code === "AltLeft")) PrfClick();
            if ((cskeys == true) && (event.code === "ArrowLeft")) CharacterAppearanceLoadCharacter(Player);          
            if ((cskeys == true) && (event.code === "ArrowRight")) ExtClick();
            if ((cskeys == true) && (event.code === "ArrowUp")) {
                if (BackgroundsList != undefined) {
                    let listbg = BackgroundsList.length;
                    let Roll = Math.floor(Math.random() * listbg);
                    if (Roll == 0) Roll = 1;
                    let name = BackgroundsList[Roll - 1].Name;
                    csname = name;
                    M_MOANER_saveControls();
                    CommonSetScreen("Online", "ChatSearch");
                 }
            }
            if ((cskeys == true) && (event.code === "Tab")) {
                csname = "Introduction";
                M_MOANER_saveControls();
                CommonSetScreen("Online", "ChatSearch");
            }
            return ret;
        });
    }

    async function ULTRAChatSearchLoad() {
        modApi.hookFunction('ChatSearchLoad', 4, (args, next) => {
            if (altchsh == true) {
                AltChatSearchLoad();
                return;
            }
            next(args);
        });
    }

    function ULTRAChatSearchParseResponse() {
        modApi.hookFunction('ChatSearchParseResponse', 4, (args, next) => {
            let ret = next(args);
            let NewResult = [];
            if ((pmin != 1) && (pmax != 20)) {
                let rm = 0;
                while (rm < ret.length) {
                    let player = ret[rm].MemberCount;
                    if ((player >= pmin) && (player <= pmax)) NewResult.push(ret[rm]);
                    rm++;
                }
            } else {
                NewResult = ret;
            }
            return NewResult;
        });
    }

    function ULTRAChatSearchResize() {
        modApi.hookFunction('ChatSearchResize', 4, (args, next) => {
            let ret = next(args);
            if (noubcbar == false) {
                ElementPositionFixed(ChatSearchRoomBottom, 430, 880, 1520, 90);
                ElementPositionFixed(ChatSearchSearchMenu, 25, 115, 810, 480);           
            } 
            if (noubcbar == true) ElementPositionFixed(ChatSearchSearchMenu, 25, 115, 810, 680);           
            return ret;
        });
    }

    async function ULTRAChatSearchRun() {
        modApi.hookFunction('ChatSearchRun', 4, (args, next) => {
            ChatSearchBackground = csname;
            TintsEffect();
            ChatSearchRoomsPerColumn = 7;
            ChatSearchRoomsPerPage = 21;
            next(args);
        });
    }

	function ULTRAChatSearchToggleSearchMode() {
        modApi.hookFunction('ChatSearchToggleSearchMode', 4, (args, next) => {
            if (noubcbar == false) {
                AltChatSearchToggle();
                return;
            }
            next(args);
        });
    }

    async function ULTRAChatSearchUnload() {
        modApi.hookFunction('ChatSearchUnload', 4, (args, next) => {
            ElementRemove("chat-search-room-bottom");
            AutoJoin = function() {};
            this.AutoJoinOn = false;
            ElementRemove("AutoJoinAlert");
            IsOn = false;
            next(args);
        });
    }

    async function ULTRARelogLoad() {
        modApi.hookFunction('RelogLoad', 4, (args, next) => {
            AutoJoin = function() {};
            this.AutoJoinOn = false;
            ElementRemove("AutoJoinAlert");
            IsOn = false;
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

    function ULTRAClubCardBuilderClick() {
        modApi.hookFunction('ClubCardBuilderClick', 4, (args, next) => {
            const ret = next(args);
            if ((ClubCardBuilderDeckIndex == -1) && MouseIn(1655, 25, 90, 90)) {
                let background = Player.Game?.ClubCard?.Background ?? "ClubCardPlayBoard1";
                let backgrounds = BackgroundsClubCardsTagList;
                if (bgall) backgrounds = BackgroundsTagList;
                BackgroundSelectionMake(backgrounds, background, (Name, setBackground) => {
                    if (setBackground) {
                        Player.Game.ClubCard.Background = Name;
                        ServerAccountUpdate.QueueData({
                            Game: Player.Game
                        }, true);
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

    function ULTRAClubCardClick() {
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
                    ServerAccountUpdate.QueueData({
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

    async function ULTRAClubCardLoungeRun() {
        modApi.hookFunction('ClubCardLoungeRun', 4, (args, next) => {
            TintsEffect();
            if (minigame == "lounge") {
                minigame = "";
                M_MOANER_saveControls();
            }
            next(args);
        });
    }

    async function ULTRAClubCardRenderPanel() {
        modApi.hookFunction('ClubCardRenderPanel', 4, (args, next) => {
            if ((ClubCardPopup != null) && (ClubCardPopup.Mode == "DECK")) {
                DrawText("Modo Actual", 120, 35, "White", "Black");
                if (highfame) {
                    DrawButton(65, 60, 90, 90, "HF", "White", "", "Cambiar a modo Normal");
                } else {
                    DrawButton(65, 60, 90, 90, "NHF", "White", "", "Cambiar a modo Fama Alta (High Fame)");
                }
                DrawText("Actualización", 430, 35, "White", "Black");
                DrawButton(385, 60, 90, 90, "", "White", "Icons/Exit.png");
                DrawText("Opciones de mazos para Predeterminado y NPCs:", 1140, 35, "White", "Gray");
                DrawText("0 Original - 1 ABDL - 2 Manicomio - 3 Universidad - 4 Dominante", 1140, 115, "White", "Gray");
                DrawText("5 Responsabilidad - 6 Sirvienta - 7 Mascota - 8 Porno - 9 Shibari - 10 Extra", 1140, 195, "White", "Gray");
                if (ClubCardIsOnline() == false) DrawText("Solo para NPC: -1 = Mazo definido por código BC original", 1140, 275, "White", "Gray");
                DrawText("Si cambias otros parámetros distintos al modo,", 1140, 750, "White", "Black");
                DrawText("haz clic en el botón Salir y vuelve para jugar", 1140, 830, "White", "Black");
                const fameInput = ElementCreateInput("InputHighFame", "number", cfame);
                fameInput.setAttribute("min", "150");
                fameInput.setAttribute("max", "550");
                fameInput.setAttribute("autocomplete", "off");
                DrawText("Nivel de Fama Alta", 145, 190, "White", "Gray");
                ElementPosition("InputHighFame", 420, 185, 250);
                const cardsInput = ElementCreateInput("InputMaxCards", "number", ccards);
                cardsInput.setAttribute("min", "30");
                cardsInput.setAttribute("max", "40");
                cardsInput.setAttribute("autocomplete", "off");
                DrawText("Cartas en mazo", 130, 270, "White", "Gray");
                ElementPosition("InputMaxCards", 420, 265, 250);
                const deckInput = ElementCreateInput("InputDefaultDeck", "number", cdeck);
                deckInput.setAttribute("min", "0");
                deckInput.setAttribute("max", "10");
                deckInput.setAttribute("autocomplete", "off");
                DrawText("Mazo predeterminado", 145, 350, "White", "Gray");
                ElementPosition("InputDefaultDeck", 420, 345, 250);
                if (ClubCardIsOnline() == false) {
                    const npcdeckInput = ElementCreateInput("InputNpcDeck", "number", npcdeck);
                    npcdeckInput.setAttribute("min", "-1");
                    npcdeckInput.setAttribute("max", "10");
                    npcdeckInput.setAttribute("autocomplete", "off");
                    DrawText("Mazo de cartas NPC", 145, 430, "White", "Gray");
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
            let C = CurrentCharacter;
            if (npcdeck == -1) {
                if (["Amanda", "Sarah", "Sidney", "Sarah", "Jennifer", "Julia", "Yuki", "Mildred"].includes(C.Name)) return ClubCardBuilderCollegeDeck;
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

    //College Tennis
    async function ULTRACollegeTennisGameStart() {
        modApi.hookFunction('CollegeTennisGameStart', 4, (args, next) => {
            let ret = next(args);
            if (minigame == "") return ret;
            InventoryWear(Player, "TennisRacket", "ItemHandheld");
            CharacterRefresh(Player);
            let level = "";
            if (minigame == "tennis1") level = "Easy";
            if (minigame == "tennis2") level = "Normal";
            if (minigame == "tennis3") level = "Hard";
            minigame = "";
            M_MOANER_saveControls();
            if ((level == "Hard") && (CollegeTennisJennifer.Name != "Jennifer")) CharacterChangeMoney(Player, -25);
            TennisCharacterLeft = Player;
            TennisCharacterRight = CollegeTennisJennifer;
            MiniGameStart("Tennis", level, "CollegeTennisGameEnd");
        });
    }

    //Friendlist 
    function ULTRAFriendListDraw() {
        modApi.hookFunction('FriendListDraw', 4, (args, next) => {
            FriendListBackground = frname;
            TintsEffect();
            next(args);
        });
    }

    function ULTRAFriendListKeyDown() {
        modApi.hookFunction('FriendListKeyDown', 4, (args, next) => {
            const searchInput = /** @type {HTMLTextAreaElement} */ (document.getElementById(FriendListIDs.searchInput));
            const searchInputHasFocus = searchInput && document.activeElement === searchInput;
            const beepTextArea = /** @type {HTMLTextAreaElement} */ (document.getElementById(FriendListIDs.beepTextArea));
            const beepTextAreaHasFocus = beepTextArea && document.activeElement === beepTextArea;
            if (frkeys == true) {
                if ((FriendListModeIndex == 0) && (!searchInputHasFocus) && (!beepTextAreaHasFocus)) {
					if (event.code === "KeyD") {
                       frname = "BrickWall";
                       M_MOANER_saveControls();
                       CommonSetScreen("Character", "FriendList");
                    }
                    if (event.code === "KeyF") {
                        if ((IsFemale() == true) && ((ChatSearchSpace != "Asylum") || (asylumlimit == false))) {
                            Player.ChatSearchSettings.Space = "";
                            ChatSearchSpace = "";
                            ServerSend("AccountQuery", {
                                Query: "OnlineFriends"
                            });
                            return true;
                        }
                    }
                    if (event.code === "KeyG") {
                        if ((asylumlimit == false) || ((asylumlimit == true) && (ChatSearchSpace != "Asylum"))) {
                            Player.ChatSearchSettings.Space = "X";
                            ChatSearchSpace = "X";
                            ServerSend("AccountQuery", {
                                Query: "OnlineFriends"
                            });
                            return true;
                        }
                    }
                    if (event.code === "KeyH") {
                        if ((IsMale() == true) && ((ChatSearchSpace != "Asylum") || (asylumlimit == false))) {
                            Player.ChatSearchSettings.Space = "M";
                            ChatSearchSpace = "M";
                            ServerSend("AccountQuery", {
                                Query: "OnlineFriends"
                            });
                            return true;
                        }
                    }
                    if (event.code === "KeyJ") {
                        if ((asylumlimit == false) || (ChatSearchSpace == "Asylum")) {
                            Player.ChatSearchSettings.Space = "Asylum";
                            ChatSearchSpace = "Asylum";
                            ServerSend("AccountQuery", {
                                Query: "OnlineFriends"
                            });
                            return true;
                        }
                    }
					if (event.code === "KeyR") {
                        if (BackgroundsList != undefined) {
                            let listbg = BackgroundsList.length;
                            let Roll = Math.floor(Math.random() * listbg);
                            if (Roll == 0) Roll = 1;
                            let name = BackgroundsList[Roll - 1].Name;
                            frname = name;
                            M_MOANER_saveControls();
                            CommonSetScreen("Character", "FriendList");
                        }       
                    }
                    if (event.code === "KeyS") {                      
                        ElementRemove(FriendListIDs.root);
                        let backgrounds = BackgroundsTagList;
                        BackgroundSelectionMake(backgrounds, "", (Name, setBackground) => {
                            if (setBackground) {
                                frname = Name;
                                M_MOANER_saveControls();
                            }
                            CommonSetScreen("Character", "FriendList");
                         });                  
                     }
                }
            }
            next(args);
        });
    }

    //GGTS
    async function ULTRAAsylumGGTSLoad() {
        modApi.hookFunction('AsylumGGTSLoad', 4, (args, next) => {
            ChatSearchRoomSpaces = ["ASYLUM"];
            AsylumGGTSIntroDone = false;
            AsylumGGTSTask = null;
            if (AsylumGGTSComputer == null) {
                AsylumGGTSComputer = CharacterLoadNPC("NPC_AsylumGGTS_Computer");
                AsylumGGTSComputer.AllowItem = false;
                AsylumGGTSComputer.Stage = "0";
                let Level = "";
                if (minigame == "") {
                    Level = AsylumGGTSGetLevel(Player);
                } else {
                    Level = minigame;
                }
                if (Level == 1) AsylumGGTSComputer.Stage = "100";
                if (Level == 2) AsylumGGTSComputer.Stage = "1000";
                if (Level == 3) AsylumGGTSComputer.Stage = "2000";
                if (Level == 4) AsylumGGTSComputer.Stage = "3000";
                if (Level == 5) AsylumGGTSComputer.Stage = "4000";
                if (Level >= 6) AsylumGGTSComputer.Stage = "5000";
                if (Level >= 6) Player.Game.GGTS.Strike = 0;
                AsylumGGTSComputerImage(Level);
            }
            return;
        });
    }

    //Information Sheet
    function ULTRAInformationSheetClick() {
        modApi.hookFunction('InformationSheetClick', 4, (args, next) => {
            if (noifbuttons == false) {
                if ((MouseX >= 1575) && (MouseX < 1665) && (MouseY >= 910) && (MouseY < 1000)) {
                    ifname = "Sheet";
                    M_MOANER_saveControls();
                    CommonSetScreen("Character", "InformationSheet");
                }
                if ((MouseX >= 1695) && (MouseX < 1785) && (MouseY >= 910) && (MouseY < 1000)) {
                    if (BackgroundsList != undefined) {
                        let listbg = BackgroundsList.length;
                        let Roll = Math.floor(Math.random() * listbg);
                        if (Roll == 0) Roll = 1;
                        let name = BackgroundsList[Roll - 1].Name;
                        ifname = name;
                        M_MOANER_saveControls();
                        CommonSetScreen("Character", "InformationSheet");
                    }
                }
                if ((MouseX >= 1815) && (MouseX < 1905) && (MouseY >= 910) && (MouseY < 1000)) {
                    let backgrounds = BackgroundsTagList;
                    BackgroundSelectionMake(backgrounds, "", (Name, setBackground) => {
                        if (setBackground) {
                            ifname = Name;
                            M_MOANER_saveControls();
                        }
                        CommonSetScreen("Character", "InformationSheet");
                    });
                }
            }
            if ((onlydays == true) && (window.BCX_Loaded)) {
                DaysClick();
                return;
            }
            next(args);
        });
    }

    function ULTRAInformationSheetRun() {
        modApi.hookFunction('InformationSheetRun', 4, (args, next) => {
            InformationSheetBackground = ifname;
            if (noifbuttons == false) {
                DrawButton(1575, 910, 90, 90, "", "White", "Icons/Reset.png", "Fondo predeterminado");
                DrawButton(1695, 910, 90, 90, "", "White", "Icons/Random.png", "Fondo aleatorio");
                DrawButton(1815, 910, 90, 90, "", "White", "Icons/Explore.png", "Seleccionar fondo");
            }
            TintsEffect();
            if (onlydays == true) {
                DaysOnly();
                return;
            }
            next(args);
        });
    }

    function ULTRAInformationSheetSecondScreenRun() {
        modApi.hookFunction('InformationSheetSecondScreenRun', 4, (args, next) => {
            if (alfrpsk == true) {
                Altrpsk();
                return;
            }
            next(args);
        });
    }

    //Introduction
    async function ULTRAIntroductionJobAnyAvailable() {
        modApi.hookFunction('IntroductionJobAnyAvailable', 4, (args, next) => {
            if (minigame == "") {
                for (let J = 0; J < IntroductionJobList.length; J++)
                    if (IntroductionJobAvailable(IntroductionJobList[J])) return true;
                return false;
            }
            if (minigame != "") {
                let introgame = minigame;
                minigame = "";
                M_MOANER_saveControls();
                if (introgame == "dojo") {
                    IntroductionJobList = ["SubDojo"];
                    IntroductionJobStart("SubDojo", 0)
                    IntroductionJobDojoStart();
                    return true;
                }
                if (introgame == "kidnap") {
                    IntroductionJobList = ["DomKidnap"];
                    IntroductionJobStart("DomKidnap", 0)
                    IntroductionJobBouncerStart();
                    return true;
                }
                if (introgame == "puppy") {
                    IntroductionJobList = ["DomPuppy"];
                    IntroductionJobStart("DomPuppy", 0)
                    IntroductionJobPuppyStart();
                    return true;
                }
            }
            return;
        });
    }

    async function ULTRAIntroductionRun() {
        modApi.hookFunction('IntroductionRun', 4, (args, next) => {
            TintsEffect();
            if (minigame == "introduction") {
                minigame = "";
                M_MOANER_saveControls();
            }
            next(args);
        });
    }

    //Kidnap League
    async function ULTRAKidnapLeagueRun() {
        modApi.hookFunction('KidnapLeagueRun', 4, (args, next) => {
            TintsEffect();
            if (minigame == "kidnap") {
                minigame = "";
                M_MOANER_saveControls();
                KidnapLeagueBackground = "MainHall";
                CharacterDelete(KidnapLeagueRandomKidnapper, false);
                KidnapLeagueRandomKidnapper = CharacterLoadNPC("NPC_KidnapLeague_RandomKidnapper");
                CharacterSetCurrent(KidnapLeagueRandomKidnapper);
                KidnapLeagueRandomKidnapperScenario = "1";
                KidnapLeagueRandomKidnapper.Stage = KidnapLeagueRandomKidnapperScenario.toString();
                KidnapLeagueRandomKidnapper.CurrentDialog = DialogFind(KidnapLeagueRandomKidnapper, "Intro" + KidnapLeagueRandomKidnapperScenario);
            }
            next(args);
        });
    }

    //LARP
    async function ULTRALARPRun() {
        modApi.hookFunction('LARPRun', 4, (args, next) => {
            TintsEffect();
            if (minigame == "larp") {
                minigame = "";
                M_MOANER_saveControls();
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
    function ULTRALoginClick() {
        modApi.hookFunction('LoginClick', 4, (args, next) => {
            if (MouseIn(1910, 670, 90, 90)) hidetoast1();
            next(args);
        });
    }

    async function ULTRALoginRun() {
        modApi.hookFunction('LoginRun', 4, (args, next) => {
            DrawButton(750, 145, 500, 60, "ULTRAbc " + UBCver + " ¡Listo!", "Pink", "", "");
            DrawButton(1910, 670, 90, 90, "SIN AVISOS BEEP", "White", "", "Haz clic aquí para ocultar todas las notificaciones (toasts) de pitidos");
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

    async function ULTRAMagicSchoolFindsAroundRun() {
        modApi.hookFunction('MagicSchoolFindsAroundRun', 4, (args, next) => {
            TintsEffect();
            if (minigame == "magic") {
                minigame = "";
                M_MOANER_saveControls();
            }
            next(args);
        });
    }

    //Maid Quarters
    async function ULTRAMaidQuartersRun() {
        modApi.hookFunction('MaidQuartersRun', 4, (args, next) => {
            TintsEffect();
            let maidgame = minigame;
            minigame = "";
            M_MOANER_saveControls();
            if (maidgame == "cleaning") MaidCleaning();
            if (maidgame == "drinks") MaidDrinks();
            if (maidgame == "rhythm") MaidRhythm();
            next(args);
        });
    }

    //Main Hall
    function ULTRAMainHallClick() {
        modApi.hookFunction('MainHallClick', 4, (args, next) => {
            if (MouseIn(1645, 145, 90, 90)) MainHallMoveToChatSelect();
            if ((MouseX >= 240) && (MouseX < 330) && (MouseY >= 475) && (MouseY < 565)) {
                if (IsFemale() == true) {
                    Player.ChatSearchSettings.Space = "";
                    ChatSelectStartSearch(ChatRoomSpaceType.FEMALE_ONLY);
                }
                if (IsMale() == true) {
                    Player.ChatSearchSettings.Space = "M";
                    ChatSelectStartSearch(ChatRoomSpaceType.MALE_ONLY);
                }
            }
            if ((MouseX >= 350) && (MouseX < 440) && (MouseY >= 475) && (MouseY < 565)) {
                if (asylumlimit == false) {
                    Player.ChatSearchSettings.Space = "Asylum";
                    ChatSelectStartSearch(ChatRoomSpaceType.ASYLUM);
                }
            }
            if ((MouseX >= 460) && (MouseX < 550) && (MouseY >= 475) && (MouseY < 565)) {
                Player.ChatSearchSettings.Space = "X";
                ChatSelectStartSearch(ChatRoomSpaceType.MIXED);
            }
            if ((MouseX >= 460) && (MouseX < 550) && (MouseY >= 585) && (MouseY < 675)) PrfClick();
            if ((MouseX >= 460) && (MouseX < 550) && (MouseY >= 695) && (MouseY < 785)) ExtClick();

            if (MouseIn(240, 585, 200, 90)) window.open('https://github.com/tetris245/ULTRAbc/releases', '_blank');
            if (MouseIn(240, 695, 200, 90)) window.open('https://github.com/tetris245/ULTRAbc/wiki', '_blank');
            if ((MouseX >= 570) && (MouseX < 660) && (MouseY >= 475) && (MouseY < 565)) {
                Player.VisualSettings.MainHallBackground = "MainHall";
                ServerAccountUpdate.QueueData({
                    VisualSettings: Player.VisualSettings
                });
                CommonSetScreen("Room", "MainHall");
            }
            if ((MouseX >= 570) && (MouseX < 660) && (MouseY >= 585) && (MouseY < 675)) {
                if (BackgroundsList != undefined) {
                    let listbg = BackgroundsList.length;
                    let Roll = Math.floor(Math.random() * listbg);
                    if (Roll == 0) Roll = 1;
                    let name = BackgroundsList[Roll - 1].Name;
                    Player.VisualSettings.MainHallBackground = name;
                    ServerAccountUpdate.QueueData({
                        VisualSettings: Player.VisualSettings
                    });
                    CommonSetScreen("Room", "MainHall");
                }
            }
            if ((MouseX >= 570) && (MouseX < 660) && (MouseY >= 695) && (MouseY < 785)) {
                let backgrounds = BackgroundsTagList;
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
                    CommonSetScreen("Room", "MainHall");
                });
            }
            next(args);
        });
    }

    async function ULTRAMainHallRun() {
        modApi.hookFunction('MainHallRun', 4, (args, next) => {
            ChatRoomActivateView(ChatRoomCharacterViewName);
            MainCanvas.textAlign = "center";
            TintsEffect();
            DrawText("Salas de Chat", 115, 530, "White", "Black");
            if (IsFemale() == true) DrawButton(240, 475, 90, 90, "", "White", "Screens/Online/ChatSelect/Female.png", "Solo Mujeres");
            if (IsMale() == true) DrawButton(240, 475, 90, 90, "", "White", "Screens/Online/ChatSelect/Male.png", "Solo Hombres");
            if (asylumlimit == true) {
                DrawButton(350, 475, 90, 90, "", "Gray", "Icons/Asylum.png", "Manicomio (Asylum)");
            } else {
                DrawButton(350, 475, 90, 90, "", "White", "Icons/Asylum.png", "Manicomio (Asylum)");
            }
            DrawButton(460, 475, 90, 90, "", "White", "Icons/Gender.png", "Mixto");
            DrawButton(570, 475, 90, 90, "", "White", "Icons/Reset.png", "Fondo predeterminado");
            DrawText("ULTRAbc", 130, 615, "White", "Black");
            DrawText(UBCver, 140, 655, "White", "Black");
            DrawButton(240, 585, 200, 90, "", "White", "", "Abrir registro de cambios (Changelog) en GitHub");
            DrawImageResize("Icons/Changelog.png", 240, 600, 60, 60);
            DrawTextFit("Cambios", 365, 633, 308, "Black");
            DrawButton(460, 585, 90, 90, "", "White", "Icons/Preference.png", "Preferencias");
            DrawButton(570, 585, 90, 90, "", "White", "Icons/Random.png", "Fondo aleatorio");
            DrawButton(460, 695, 90, 90, "", "White", "Icons/Extensions.png", "Extensiones");
            DrawButton(570, 695, 90, 90, "", "White", "Icons/Explore.png", "Seleccionar fondo");
            DrawText("/uhelp", 145, 725, "White", "Black");
            DrawText("en chat", 140, 765, "White", "Black");
            DrawButton(240, 695, 200, 90, "", "White", "", "Abrir la Wiki de UBC en GitHub");
            DrawImageResize("Icons/Introduction.png", 250, 710, 60, 60);
            DrawTextFit("Wiki", 375, 743, 308, "Black");
            next(args);
        });
    }

    //Movie Studio
    async function ULTRAMovieStudioRun() {
        modApi.hookFunction('MovieStudioRun', 4, (args, next) => {
            TintsEffect();
            let moviegame = minigame;
            minigame = "";
            M_MOANER_saveControls();
            if (moviegame == "movie1") MovieStudioDailyMovie = "Interview";
            if (moviegame == "movie2") MovieStudioDailyMovie = "OpenHouse";
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

	async function ULTRAChatRoomDrawArousalOverlay() {
        modApi.hookFunction('ChatRoomDrawArousalOverlay', 4, (args, next) => { 
            if (nopinkscr == true) {
                let orgasmScreen = false;
                return orgasmScreen;
            }
            next(args);
        });
    }

    //Pandora Infiltration
    async function ULTRAInfiltrationPrepareMission() {
        modApi.hookFunction('InfiltrationPrepareMission', 4, (args, next) => {
            if (mission == "") InfiltrationMission = CommonRandomItemFromList(InfiltrationMission, InfiltrationMissionType);
            if (mission == "burglar") InfiltrationMission = "CatBurglar";
            if (mission == "kidnap") InfiltrationMission = "Kidnap";
            if (mission == "rescue") InfiltrationMission = "Rescue";
            if (mission == "retrieve") InfiltrationMission = "Retrieve";
            if (mission == "sabotage") InfiltrationMission = "ReverseMaid";
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
            mission = "";
            M_MOANER_saveControls();
            return;
        });
    }

    async function ULTRAInfiltrationRun() {
        modApi.hookFunction('InfiltrationRun', 4, (args, next) => {
            TintsEffect();
            if (minigame == "infiltration") {
                minigame = "";
                M_MOANER_saveControls();
            }
            next(args);
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
            if (ChatSearchSpace == "") space = ChatRoomSpaceType.FEMALE_ONLY;
            if (ChatSearchSpace == "M") space = ChatRoomSpaceType.MALE_ONLY;
            if (ChatSearchSpace == "Asylum") space = ChatRoomSpaceType.ASYLUM;
            ChatSearchReturnScreen = ["Online", "ChatSearch"];
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
            ServerSend("ChatRoomAdmin", ChatAdminData);
            return;
        });
    }

    function ULTRAPandoraPrisonClick() {
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
    function ULTRAPhotographicClick() {
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

    async function ULTRAPreferenceRun() {
        modApi.hookFunction('PreferenceRun', 4, (args, next) => {
            let mbb = 0;
            let list = PreferenceExtensionsDisplay;
            for (let i = 0; i < list.length; i++) {
                if (list[i].Button == "MBS Settings") mbb = 1;
            }
            let name = PreferenceSubscreen.name;
            if ((name == "Extensions") && (PreferenceExtensionsCurrent == null) && (mbb == 1) && (tintnever == false)) {
                if ((tintmbs == true) && (tintlevel != 0)) tintMbsColors();
                if (tintmbs == false) untintMbsColors();
            }
            PreferenceBackground = "Sheet";
            if (ifext == true) PreferenceBackground = ifname;
            TintsEffect();
            next(args);
        });
    }

    async function ULTRAPreferenceSubscreenChatLoad() {
        modApi.hookFunction('PreferenceSubscreenChatLoad', 4, (args, next) => {
            PreferenceBackground = "Sheet";
            if (ifext == true) PreferenceBackground = ifname;
            if (alfaprf == true) {
                AltPrfChat();
                return;
            }
            next(args);
        });
    }

    async function ULTRAPreferenceSubscreenExtensionsLoad() {
        modApi.hookFunction('PreferenceSubscreenExtensionsLoad', 4, (args, next) => {
            UBCrpsk();
            M_MOANER_saveControls();
            Player.UBC.ubcSettings.rpabdl = rpabdl;
            Player.UBC.ubcSettings.rpasyl = rpasyl;
            Player.UBC.ubcSettings.rpgamb = rpgamb;
            Player.UBC.ubcSettings.rpgame = rpgame;
            Player.UBC.ubcSettings.rpkidn = rpkidn;
            Player.UBC.ubcSettings.rplarp = rplarp;
            Player.UBC.ubcSettings.rpmagh = rpmagh;
            Player.UBC.ubcSettings.rpmagp = rpmagp;
            Player.UBC.ubcSettings.rpmaid = rpmaid;
            Player.UBC.ubcSettings.rpmain = rpmain;
            Player.UBC.ubcSettings.skbondage = skbondage;
            Player.UBC.ubcSettings.skdressage = skdressage;
            Player.UBC.ubcSettings.skevasion = skevasion;
            Player.UBC.ubcSettings.skinfiltration = skinfiltration;
            Player.UBC.ubcSettings.sklockpicking = sklockpicking;
            Player.UBC.ubcSettings.skselfbondage = skselfbondage;
            Player.UBC.ubcSettings.skwillpower = skwillpower;
            next(args);
        });
    }

    async function ULTRAPreferenceSubscreenGeneralLoad() {
        modApi.hookFunction('PreferenceSubscreenGeneralLoad', 4, (args, next) => {
            PreferenceBackground = "Sheet";
            if (ifext == true) PreferenceBackground = ifname;
            if (alfaprf == true) {
                AltPrfGeneral();
                return;
            }
            next(args);
        });
    }

    async function ULTRAPreferenceSubscreenImmersionLoad() {
        modApi.hookFunction('PreferenceSubscreenImmersionLoad', 4, (args, next) => {
            PreferenceBackground = "Sheet";
            if (ifext == true) PreferenceBackground = ifname;
            if (alfaprf == true) {
                AltPrfImmersion();
                return;
            }
            next(args);
        });
    }

    function ULTRAPreferenceSubscreenOnlineClick() {
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
                    PreferenceOpenSubscreen("Online", 2);
                }
            }
            next(args);
        });
    }

    async function ULTRAPreferenceSubscreenMainLoad() {
        modApi.hookFunction('PreferenceSubscreenMainLoad', 4, (args, next) => {
            PreferenceBackground = "Sheet";
            if (ifext == true) PreferenceBackground = ifname;
            if (alfmenu == true) {
                AltPrf();
                return;
            }
            next(args);
        });
    }

    async function ULTRAPreferenceSubscreenOnlineLoad() {
        modApi.hookFunction('PreferenceSubscreenOnlineLoad', 4, (args, next) => {
            PreferenceBackground = "Sheet";
            if (ifext == true) PreferenceBackground = ifname;
            if (alfaprf == true) {
                AltPrfOnline();
                return;
            }
            next(args);
        });
    }

    async function ULTRAPreferenceSubscreenOnlineRun() {
        modApi.hookFunction('PreferenceSubscreenOnlineRun', 4, (args, next) => {
            if (PreferencePageCurrent === 2) {
                MainCanvas.textAlign = "left";
                DrawText(BackgroundsTextGet(PreferenceOnlineDefaultBackground), 960, 255, "Black", "Gray");
                DrawButton(1260, 330, 60, 60, "", "White", "", "Fondo Aleatorio");
                DrawImageResize("Icons/Random.png", 1260, 330, 60, 60);
            }
            next(args);
        });
    }

	//Private Room
    function ULTRAPrivateClick() {
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
                        if (Name !== "Private") {
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
                if (BackgroundsList != undefined) {
                    let listbg = BackgroundsList.length;
                    let Roll = Math.floor(Math.random() * listbg);
                    if (Roll == 0) Roll = 1;
                    let name = BackgroundsList[Roll - 1].Name;
                    Player.VisualSettings.PrivateRoomBackground = name;
                    ServerAccountUpdate.QueueData({
                        VisualSettings: Player.VisualSettings
                    });
                    CommonSetScreen("Room", "Private");
                 }  
            }
            if (MouseIn(0, 950, 49, 49) && LogQuery("RentRoom", "PrivateRoom")) {
                Player.VisualSettings.PrivateRoomBackground = "Private";
                ServerAccountUpdate.QueueData({
                    VisualSettings: Player.VisualSettings
                });
                CommonSetScreen("Room", "Private"); 
            }
            if ((MouseX <= 1885) && (MouseY < 900) && LogQuery("RentRoom", "PrivateRoom") && (!Player.Cage)) PrivateClickCharacter();
            if ((MouseX <= 1885) && (MouseY >= 900) && LogQuery("RentRoom", "PrivateRoom")) PrivateClickCharacterButton();
            return;
        });
    }

    async function ULTRAPrivateRun() {
        modApi.hookFunction('PrivateRun', 4, (args, next) => {
            if (LogQuery("RentRoom", "PrivateRoom")) {
                DrawButton(0, 900, 49, 49, "", "White", "", "Fondo aleatorio");
                DrawButton(0, 950, 49, 49, "", "White", "", "Fondo predeterminado");
                DrawImageResize("Icons/Random.png", 0, 900, 48, 48);
                DrawImageResize("Icons/Reset.png", 0, 950, 48, 48);  
            }
            TintsEffect();
            next(args);
        });
    }

    //Shibari
    async function ULTRAShibariRun() {
        modApi.hookFunction('ShibariRun', 4, (args, next) => {
            TintsEffect();
            if (minigame == "shibari") {
                minigame = "";
                M_MOANER_saveControls();
                InventoryRemove(ShibariStudent, "ItemArms");
                InventoryRemove(ShibariStudent, "ItemFeet");
                InventoryRemove(ShibariStudent, "ItemLegs");
                InventoryRemove(ShibariStudent, "ItemMouth");
                InventoryRemove(ShibariStudent, "ItemTorso");
            }
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
            let stablegame = minigame;
            minigame = "";
            M_MOANER_saveControls();
            if (stablegame == "carrot") StableCarrot();
            if (stablegame == "hurdle") StableHurdle();
            if (stablegame == "training") StableTraining();
            if (stablegame == "whippony") StableWhip();
            next(args);
        });
    }

    //Timer Cell
    function ULTRACellClick() {
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
            if (notcbuttons == false) {
                if ((MouseX >= 1765) && (MouseX < 1855) && (MouseY >= 745) && (MouseY < 835)) {
                    tcname = "Cell";
                    M_MOANER_saveControls();
                    CommonSetScreen("Room", "Cell");
                }
                if ((MouseX >= 1885) && (MouseX < 1975) && (MouseY >= 745) && (MouseY < 835)) {
                    if (BackgroundsList != undefined) {
                        let listbg = BackgroundsList.length;
                        let Roll = Math.floor(Math.random() * listbg);
                        if (Roll == 0) Roll = 1;
                        let name = BackgroundsList[Roll - 1].Name;
                        tcname = name;
                        M_MOANER_saveControls();
                        CommonSetScreen("Room", "Cell");
                    }
                }
                if ((MouseX >= 1885) && (MouseX < 1975) && (MouseY >= 865) && (MouseY < 955)) {
                    let backgrounds = BackgroundsTagList;
                    BackgroundSelectionMake(backgrounds, "", (Name, setBackground) => {
                        if (setBackground) {
                            tcname = Name;
                            M_MOANER_saveControls();
                        }
                        CommonSetScreen("Room", "Cell");
                    });
                }
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
            if (notcbuttons == false) {
                DrawButton(1765, 745, 90, 90, "", "White", "Icons/Reset.png", "Fondo predeterminado");
                DrawButton(1885, 745, 90, 90, "", "White", "Icons/Random.png", "Fondo aleatorio");
                DrawButton(1885, 865, 90, 90, "", "White", "Icons/Explore.png", "Seleccionar fondo");
            }
            TintsEffect();
            next(args);
        });
    }

    //Vision
    function ULTRAArcadeRun() {
        modApi.hookFunction('ArcadeRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAAsylumBedroomRun() {
        modApi.hookFunction('AsylumBedroomRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAAsylumGGTSRun() {
        modApi.hookFunction('AsylumGGTSRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAAsylumTherapyRun() {
        modApi.hookFunction('AsylumTherapyRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAChatAdminRoomCustomizationRun() {
        modApi.hookFunction('ChatAdminRoomCustomizationRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAChatSelectRun() {
        modApi.hookFunction('ChatSelectRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAChestLockpickRun() {
        modApi.hookFunction('ChestLockpickRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAClubCardBuilderRun() {
        modApi.hookFunction('ClubCardBuilderRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAClubCardRun() {
        modApi.hookFunction('ClubCardRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRACollegeCafeteriaRun() {
        modApi.hookFunction('CollegeCafeteriaRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRACollegeChessRun() {
        modApi.hookFunction('CollegeChessRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRACollegeDetentionRun() {
        modApi.hookFunction('CollegeDetentionRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRACollegeEntranceRun() {
        modApi.hookFunction('CollegeEntranceRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRACollegeTeacherRun() {
        modApi.hookFunction('CollegeTeacherRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRACollegeTennisRun() {
        modApi.hookFunction('CollegeTennisRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRACollegeTheaterRun() {
        modApi.hookFunction('CollegeTheaterRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRACraftingRun() {
        modApi.hookFunction('CraftingRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRADojoStruggleRun() {
        modApi.hookFunction('DojoStruggleRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAGamblingRun() {
        modApi.hookFunction('GamblingRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAGetUpRun() {
        modApi.hookFunction('GetUpRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAHorseWalkRun() {
        modApi.hookFunction('HorseWalkRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAKidnapRun() {
        modApi.hookFunction('KidnapRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAMagicBattleRun() {
        modApi.hookFunction('MagicBattleRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAMagicRun() {
        modApi.hookFunction('MagicRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAMagicSchoolEscapeRun() {
        modApi.hookFunction('MagicSchoolEscapeRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAMagicSchoolLaboratoryRun() {
        modApi.hookFunction('MagicSchoolLaboratoryRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAMaidCleaningRun() {
        modApi.hookFunction('MaidCleaningRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAMaidDrinksRun() {
        modApi.hookFunction('MaidDrinksRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAManagementRun() {
        modApi.hookFunction('ManagementRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRANurseryRun() {
        modApi.hookFunction('NurseryRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAOnlineProfileRun() {
        modApi.hookFunction('OnlineProfileRun', 4, (args, next) => {
            OnlineProfileBackground = "Sheet";
            if (ifext == true) OnlineProfileBackground = ifname;
            TintsEffect();
            next(args);
        });
    }

    function ULTRAPandoraRun() {
        modApi.hookFunction('PandoraRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAPlatformDialogRun() {
        modApi.hookFunction('PlatformDialogRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAPlatformIntroRun() {
        modApi.hookFunction('PlatformIntroRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAPlatformProfileRun() {
        modApi.hookFunction('PlatformProfileRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAPlatformRun() {
        modApi.hookFunction('PlatformRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAPlayerAuctionRun() {
        modApi.hookFunction('PlayerAuctionRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAPokerRun() {
        modApi.hookFunction('PokerRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAPrisonRun() {
        modApi.hookFunction('PrisonRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAPuppyWalkerRun() {
        modApi.hookFunction('PuppyWalkerRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRARhythmGameRun() {
        modApi.hookFunction('RhythmGameRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRASarahRun() {
        modApi.hookFunction('SarahRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRAShopRun() {
        modApi.hookFunction('ShopRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRASlaveAuctionRun() {
        modApi.hookFunction('SlaveAuctionRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRASlaveMarketRun() {
        modApi.hookFunction('SlaveMarketRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRATennisRun() {
        modApi.hookFunction('TennisRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRATherapyRun() {
        modApi.hookFunction('TherapyRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    function ULTRATitleRun() {
        modApi.hookFunction('TitleRun', 4, (args, next) => {
            TitleBackground = "Sheet";
            if (ifext == true) TitleBackground = ifname;
            TintsEffect();
            next(args);
        });
    }

    function ULTRAWheelFortuneRun() {
        modApi.hookFunction('WheelFortuneRun', 4, (args, next) => {
            TintsEffect();
            next(args);
        });
    }

    //Wardrobe
    function ULTRAAppearanceClick() {
        modApi.hookFunction('AppearanceClick', 4, (args, next) => {
            let C = CharacterAppearanceSelection;
            if (CharacterAppearanceMode == "") {
                if (nowrbuttons == false) {
                    if ((MouseX >= 260) && (MouseX < 350) && (MouseY >= 910) && (MouseY < 1000)) {
                        wrname = "Dressing";
                        M_MOANER_saveControls();
                        CommonSetScreen("Character", "Appearance");
                    }
                    if ((MouseX >= 380) && (MouseX < 470) && (MouseY >= 910) && (MouseY < 1000)) {
                        if (BackgroundsList != undefined) {
                            let listbg = BackgroundsList.length;
                            let Roll = Math.floor(Math.random() * listbg);
                            if (Roll == 0) Roll = 1;
                            let name = BackgroundsList[Roll - 1].Name;
                            wrname = name;
                            M_MOANER_saveControls();
                            CommonSetScreen("Character", "Appearance");
                        }
                    }
                    if ((MouseX >= 500) && (MouseX < 590) && (MouseY >= 910) && (MouseY < 1000)) {
                        let backgrounds = BackgroundsTagList;
                        BackgroundSelectionMake(backgrounds, "", (Name, setBackground) => {
                            if (setBackground) {
                                wrname = Name;
                                M_MOANER_saveControls();
                            }
                            CommonSetScreen("Character", "Appearance");
                        });
                    }
                }
            }
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
                                let msg = "La exportación de UBC no es posible porque " + tgpname + " ha activado la protección Uwall.";
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
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: Apariencia guardada.</p>\n" +
                                    btoa(encodeURI(JSON.stringify(appall)))
                                );
                            }
                        }
                    }
                    DialogLeave();
                }
                if ((MouseX >= 1630) && (MouseX < 1730) && (MouseY >= 240) && (MouseY < 290)) {
                    let appinp = prompt('Por favor, introduce el awcode (Compatible con BCG).', '');
                    if (C.OnlineSharedSettings.UBC != undefined) {
                        if ((C.Nickname == '') || (C.Nickname == undefined)) {
                            tgpname = C.Name;
                        } else {
                            tgpname = C.Nickname;
                        }
                        if ((tmpname != tgpname) && (IsTargetProtected(C))) {
                            let msg = "La importación de UBC no es posible porque " + tgpname + " ha activado la protección Uwall.";
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
                    let appinp = prompt('Por favor, introduce el awcode (Compatible con BCG).', '');
                    if (C.OnlineSharedSettings.UBC != undefined) {
                        if ((C.Nickname == '') || (C.Nickname == undefined)) {
                            tgpname = C.Name;
                        } else {
                            tgpname = C.Nickname;
                        }
                        if ((tmpname != tgpname) && (IsTargetProtected(C))) {
                            let msg = "La importación de UBC no es posible porque " + tgpname + " ha activado la protección Uwall.";
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
                    let appinp = prompt('Por favor, introduce el awcode (Compatible con BCG).', '');
                    if (C.OnlineSharedSettings.UBC != undefined) {
                        if ((C.Nickname == '') || (C.Nickname == undefined)) {
                            tgpname = C.Name;
                        } else {
                            tgpname = C.Nickname;
                        }
                        if ((tmpname != tgpname) && (IsTargetProtected(C))) {
                            let msg = "La importación de UBC no es posible porque " + tgpname + " ha activado la protección Uwall.";
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

    async function ULTRAAppearanceMenuDraw() {
        modApi.hookFunction('AppearanceMenuDraw', 4, (args, next) => {
            if (CharacterAppearanceMode == "") {
                if (nowrbuttons == false) {
                    DrawButton(260, 910, 90, 90, "", "White", "Icons/Reset.png", "Fondo predeterminado");
                    DrawButton(380, 910, 90, 90, "", "White", "Icons/Random.png", "Fondo aleatorio");
                    DrawButton(500, 910, 90, 90, "", "White", "Icons/Explore.png", "Seleccionar fondo");
                }
            }
            next(args);
        });
    }

    async function ULTRAAppearanceRun() {
        modApi.hookFunction('AppearanceRun', 4, (args, next) => {
            AppearanceBackground = wrname;
            TintsEffect();
            if (CharacterAppearanceMode == "Wardrobe") {
                DrawButton(1510, 240, 100, 60, "Exportar", "#50E992", "", "Exportación completa de ULTRAbc");
                DrawButton(1630, 240, 100, 60, "Import1", "#50E992", "", "Ropa + Ataduras");
                DrawButton(1750, 240, 100, 60, "Import2", "#50E992", "", "Ropa + Ataduras + Cosplay");
                DrawButton(1870, 240, 100, 60, "Import3", "#50E992", "", "Importación completa de ULTRAbc");
            }
            next(args);
        });
    }

    //Other functions
    //Background
    function morebg() {
        let alwaysBackgrounds = [{
                Name: "AmandaCollarIntro",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "AmandaIntro",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Bar",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "BrickWall",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Cell",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "ClubCardLounge",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "CollegeTeacherLounge",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "CollegeTennisPlay",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "CraftingWorkshop",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Dressing",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Gambling",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "grey",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "HorseStableLight",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Magic",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "MagicSchoolEscape",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "MagicSchoolLaboratory",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Orig/Entrance",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Orig/Lounge",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Ground/Entrance",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Second/Cell0",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Second/Cell1",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Second/Cell2",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Second/Cell3",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Second/Cell4",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Second/Cell5",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Second/Cell6",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Second/Entrance",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Second/Fork0",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Second/Fork1",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Second/Fork2",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Second/Fork3",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Second/Fork4",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Second/Fork5",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Second/Fork6",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Second/Rest0",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Second/Tunnel0",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Second/Tunnel1",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Second/Tunnel2",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Second/Tunnel3",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Second/Tunnel4",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Second/Tunnel5",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Second/Tunnel6",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Underground/Entrance",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Underground/Fork0",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Underground/Fork1",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Underground/Fork2",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Underground/Fork3",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Underground/Fork4",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Underground/Fork5",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Underground/Fork6",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Underground/Rest0",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Underground/Tunnel0",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Underground/Tunnel1",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Underground/Tunnel2",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Underground/Tunnel3",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Underground/Tunnel4",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Underground/Tunnel5",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Pandora/Underground/Tunnel6",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Prison",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "RhythmGame",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "RhythmGameLoading",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "SarahBedroom0",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "SarahBedroom1",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "SarahBedroom2",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "SarahBedroom3",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "SarahIntro",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Sheet",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "SheetWhite",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "Shop",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "SlaveMarket",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "SophieIntro",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "White",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "HypnoSpiral2",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "HypnoticSpiral",
                Tag: [BackgroundsTagIndoor]
            },
        ];
        let bcxBackgrounds = [{
                Name: "AsylumBedroom",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "AsylumEntrance",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "AsylumGGTSRoom",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "AsylumGGTSRoomAlert",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "AsylumMeeting",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "AsylumTherapy",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "OutsideCells",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "PaddedCell",
                Tag: [BackgroundsTagIndoor]
            },
            {
                Name: "PaddedCell2",
                Tag: [BackgroundsTagIndoor]
            },
        ];
        BackgroundsList.push(...alwaysBackgrounds);
        if (!window.BCX_Loaded) {
            BackgroundsList.push(...bcxBackgrounds);
        }
        let ChatCreateBackgroundList = BackgroundsGenerateList(BackgroundsTagList);
    }

    function updateBackground(ChatCreateBackgroundSelect) {
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

    //Bondage Brawl
    function BrawlCheat() {
        PlatformPlayer.Health = 100;
        PlatformPlayer.Magic = 100;
        PlatformPlayer.Projectile = 100;
    }

    //Buttons
    async function ExtClick() {
        ChatRoomSetLastChatRoom("");
        ChatRoomHideElements();
        InformationSheetLoadCharacter(Player);
        PreferenceSubscreen = "Extensions";
        await CommonSetScreen("Character", "Preference");
        PreferenceOpenSubscreen("Extensions");
    }

    function OutButtons() {
        DOGSsettings();
        if (noescape == false) {
            if (window.CurrentScreen == "ChatRoom") {
                DrawButton(955, 360, 45, 45, "SALIR", "White", "", "");
            } else {
                if (slowleave == true) {
                    DrawButton(0, 90, 45, 45, "SALIR", "White", "", "Salida lenta");
                } else {
                    DrawButton(0, 90, 45, 45, "SALIR", "White", "", "Salida rápida");
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
        ChatRoomLeave();
        CommonSetScreen("Online", "ChatSearch");
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
        CommonSetScreen("Character", "Preference");
    }

    function SosButtons() {
        DOGSsettings();
        if (noescape == false) {
            if (window.CurrentScreen == "ChatRoom") {
                DrawButton(955, 315, 45, 45, "LIBRE", "White", "", "");
            } else {
                DrawButton(0, 45, 45, 45, "LIBRE", "White", "", "Liberación Total");
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
    async function CharacterBio(target) {
        ChatRoomSetLastChatRoom("");
        ChatRoomHideElements();
        InformationSheetLoadCharacter(target);
        await CommonSetScreen("Character", "InformationSheet");
        ProfileCharacter = function() {
            ElementCreateTextArea("DescriptionInput");
            CommonSetScreen("Character", "OnlineProfile");
        };
        ProfileCharacter();
    }

    function ResetHousesReputation() {
        DialogSetReputation("HouseAmplector", 0);
        DialogSetReputation("HouseCorporis", 0);
        DialogSetReputation("HouseMaiestas", 0);
        DialogSetReputation("HouseVincula", 0);
        LogDelete("Mastery", "MagicSchool");
    }

    //Chat Search - Room Types + Games + Extra Features
    function AllRooms() {
        Player.ChatSearchSettings.MapTypes = undefined;
        Player.ChatSearchSettings.Game = "";
        ChatSearchGame = Player.ChatSearchSettings.Game;
        ChatSearchUpdateSearchSettings();
        ChatSearchQuery(ChatSearchQueryString);
    }

    function CardRooms() {
        Player.ChatSearchSettings.MapTypes = undefined;
        Player.ChatSearchSettings.Game = "ClubCard";
        ChatSearchGame = Player.ChatSearchSettings.Game;
        ChatSearchUpdateSearchSettings();
        ChatSearchQuery(ChatSearchQueryString);
    }

    function GgtsRooms() {
        Player.ChatSearchSettings.MapTypes = undefined;
        Player.ChatSearchSettings.Game = "GGTS";
        ChatSearchGame = Player.ChatSearchSettings.Game;
        ChatSearchUpdateSearchSettings();
        ChatSearchQuery(ChatSearchQueryString);
    }

    function HybridRooms() {
        Player.ChatSearchSettings.MapTypes = "Hybrid";
        Player.ChatSearchSettings.Game = "";
        ChatSearchGame = Player.ChatSearchSettings.Game;
        ChatSearchUpdateSearchSettings();
        ChatSearchQuery(ChatSearchQueryString);
    }

    function LarpRooms() {
        Player.ChatSearchSettings.MapTypes = undefined;
        Player.ChatSearchSettings.Game = "LARP";
        ChatSearchGame = Player.ChatSearchSettings.Game;
        ChatSearchUpdateSearchSettings();
        ChatSearchQuery(ChatSearchQueryString);
    }

    function MagicRooms() {
        Player.ChatSearchSettings.MapTypes = undefined;
        Player.ChatSearchSettings.Game = "MagicBattle";
        ChatSearchGame = Player.ChatSearchSettings.Game;
        ChatSearchUpdateSearchSettings();
        ChatSearchQuery(ChatSearchQueryString);
    }

    function MapRooms() {
        Player.ChatSearchSettings.MapTypes = "Always";
        Player.ChatSearchSettings.Game = "";
        ChatSearchGame = Player.ChatSearchSettings.Game;
        ChatSearchUpdateSearchSettings();
        ChatSearchQuery(ChatSearchQueryString);
    }

    function NormalRooms() {
        Player.ChatSearchSettings.MapTypes = "Never";
        Player.ChatSearchSettings.Game = "";
        ChatSearchGame = Player.ChatSearchSettings.Game;
        ChatSearchUpdateSearchSettings();
        ChatSearchQuery(ChatSearchQueryString);
    }

    function PrisonRooms() {
        Player.ChatSearchSettings.MapTypes = undefined;
        Player.ChatSearchSettings.Game = "Prison";
        ChatSearchGame = Player.ChatSearchSettings.Game;
        ChatSearchUpdateSearchSettings();
        ChatSearchQuery(ChatSearchQueryString);
    }

    function SetAutoJoin() {
        AutoJoin = function() {};
        this.AutoJoinOn = false;
        ElementRemove("AutoJoinAlert");
        IsOn = false;
        M_MOANER_saveControls();
        Player.UBC.ubcSettings.autojoin = autojoin;
    }

    //Chat Search - Screen + Menu
    function AltChatSearchLoad() {
        ChatSearchInitState();
        ChatSearchCreatePageCountElement();
        const {
            minRoomSizeInput,
            maxRoomSizeInput
        } = ChatSearchCreateRoomSizeInputs();
        const {
            minRoomPlayersInput,
            maxRoomPlayersInput
        } = ChatSearchCreateRoomPlayersInputs();
        const {
            searchInput,
            filterInput,
            clearButton
        } = ChatSearchCreateSearchControls();
        ChatSearchCreateHeader(searchInput, filterInput, clearButton, minRoomSizeInput, maxRoomSizeInput, minRoomPlayersInput, maxRoomPlayersInput);
        if (noubcbar == false) ChatSearchCreateBottom();
        ChatSearchCreateGrid();
        ChatSearchCreateSearchMenu(minRoomSizeInput, maxRoomSizeInput, minRoomPlayersInput, maxRoomPlayersInput);
        ChatSearchCreateFilterHelpDialog();
        ChatSearchQuery(ChatSearchQueryString);
        ChatRoomNotificationReset();
        ChatSearchRejoinIncrement = 1;
        TextPrefetch("Character", "FriendList");
        TextPrefetch("Online", "ChatAdmin");
        TextPrefetch("Online", "ChatRoom");
    }

	function AltChatSearchToggle() {
        switch (ChatSearchMode) {
            case "":
                ChatSearchRoomGrid?.classList.add("chat-search-filter-search");
                ElementWrap("InputSearch")?.toggleAttribute("hidden", true);
                ElementWrap("InputFilter")?.toggleAttribute("hidden", false);
                document.getElementById("chat-search-room-search-button")?.toggleAttribute("disabled", true);
                document.getElementById("chat-search-room-allrooms-button")?.toggleAttribute("disabled", true);
                document.getElementById("chat-search-room-normalrooms-button")?.toggleAttribute("disabled", true);
                document.getElementById("chat-search-room-hybridrooms-button")?.toggleAttribute("disabled", true);
                document.getElementById("chat-search-room-maprooms-button")?.toggleAttribute("disabled", true);
                document.getElementById("chat-search-room-female-lobby-button")?.toggleAttribute("disabled", true);         
                document.getElementById("chat-search-room-male-lobby-button")?.toggleAttribute("disabled", true);         
                document.getElementById("chat-search-room-mixed-lobby-button")?.toggleAttribute("disabled", true);         
                document.getElementById("chat-search-room-asylum-lobby-button")?.toggleAttribute("disabled", true);
                document.getElementById("chat-search-room-clubcard-button")?.toggleAttribute("disabled", true);   
                document.getElementById("chat-search-room-ggts-button")?.toggleAttribute("disabled", true);            
                document.getElementById("chat-search-room-larp-button")?.toggleAttribute("disabled", true);
                document.getElementById("chat-search-room-magicbattle-button")?.toggleAttribute("disabled", true);
                document.getElementById("chat-search-room-pandoraprison-button")?.toggleAttribute("disabled", true);
                if (ChatSearchSearchMenuButton?.getAttribute("aria-expanded") === "true") {
                    ChatSearchSearchMenuButton.click();
                }
                ChatSearchSearchMenuButton?.toggleAttribute("disabled", true);
                ChatSearchQueryString = ElementValue("InputSearch");
                ChatSearchFilterTermsTemp = Player.ChatSearchSettings.FilterTerms;
                ElementValue("InputFilter", ChatSearchFilterTermsTemp);
                ChatSearchMode = "Filter";
                ChatSearchQuery("");
                ChatSearchQuerySort();
                break;
            case "Filter":
                ChatSearchRoomGrid?.classList.remove("chat-search-filter-search");
                ElementWrap("InputSearch")?.toggleAttribute("hidden", false);
                ElementWrap("InputFilter")?.toggleAttribute("hidden", true);
                document.getElementById("chat-search-room-search-button")?.toggleAttribute("disabled", false);
                document.getElementById("chat-search-room-allrooms-button")?.toggleAttribute("disabled", false);
                document.getElementById("chat-search-room-normalrooms-button")?.toggleAttribute("disabled", false);
                document.getElementById("chat-search-room-hybridrooms-button")?.toggleAttribute("disabled", false);
                document.getElementById("chat-search-room-maprooms-button")?.toggleAttribute("disabled", false);
                document.getElementById("chat-search-room-female-lobby-button")?.toggleAttribute("disabled", false);         
                document.getElementById("chat-search-room-male-lobby-button")?.toggleAttribute("disabled", false);         
                document.getElementById("chat-search-room-mixed-lobby-button")?.toggleAttribute("disabled", false);         
                document.getElementById("chat-search-room-asylum-lobby-button")?.toggleAttribute("disabled", false);
                document.getElementById("chat-search-room-clubcard-button")?.toggleAttribute("disabled", false);   
                document.getElementById("chat-search-room-ggts-button")?.toggleAttribute("disabled", false);            
                document.getElementById("chat-search-room-larp-button")?.toggleAttribute("disabled", false);
                document.getElementById("chat-search-room-magicbattle-button")?.toggleAttribute("disabled", false);
                document.getElementById("chat-search-room-pandoraprison-button")?.toggleAttribute("disabled", false);
                ChatSearchSearchMenuButton?.toggleAttribute("disabled", false);
                ChatSearchSaveFilterTerms();
                ChatSearchMode = "";
                ChatSearchQuery(ChatSearchQueryString);
                break;
       }
       ElementWrap('chat-search-room-filter-section')?.toggleAttribute("hidden", ChatSearchMode != "Filter");
       ElementWrap('chat-search-room-navigation-section')?.toggleAttribute("hidden", ChatSearchMode == "Filter");
       const filterButton = document.getElementById('chat-search-hide-rooms');
       if (filterButton) {
           const tooltip = filterButton.querySelector(".button-tooltip");
           if (tooltip) {
                tooltip.textContent = TextGet(ChatSearchMode != "Filter" ? "FilterMode" : "NormalMode");
            }
            filterButton.dataset.mode = ChatSearchMode == "Filter" ? "FilterMode" : "NormalMode";
        }
        ChatSearchSetPageRelative(0);
    }

    function ChatSearchCreateBottom() {	
        const showFemaleButton = (
            ((ChatSearchGetSpace() !== "Asylum" && asylumlimit === true) || (asylumlimit === false)) &&
            Player.GetGenders().includes("F")
        );
        const showMaleButton = (
            ((ChatSearchGetSpace() !== "Asylum" && asylumlimit === true) || (asylumlimit === false)) &&
            Player.GetGenders().includes("M")
        );
        const showMixedButton = (
            (((ChatSearchGetSpace() != "Asylum" && asylumlimit == true)) || (asylumlimit == false))
        );
        const showAsylumButton = (
            (((ChatSearchGetSpace() === "Asylum" && asylumlimit == true)) || (asylumlimit == false))
        );
        ChatSearchRoomBottom = ElementCreate({
            tag: "div",
            attributes: {
                id: "chat-search-room-bottom"
            },
            children: [{
                tag: "div",
                attributes: {
                    id: "chat-search-room-navigation-section"
                },
                classList: ["chat-search-room-bottom-section"],
                children: [
                    ElementButton.Create(
                        "chat-search-room-allrooms-button",
                        () => AllRooms(), {
                            tooltip: TextGet("AllRooms"),
                            tooltipPosition: "left",
                            image: "Icons/Chat.png",
                        }, {
                            button: {
                                classList: ["chat-search-room-button"]
                            },
                        },
                    ),
                    ElementButton.Create(
                        "chat-search-room-normalrooms-button",
                        () => NormalRooms(), {
                            tooltip: TextGet("NormalRooms"),
                            tooltipPosition: "left",
                            image: "Icons/RoomTypeNormal.svg",
                        }, {
                            button: {
                                classList: ["chat-search-room-button"]
                            },
                        },
                    ),
                    ElementButton.Create(
                        "chat-search-room-hybridrooms-button",
                        () => HybridRooms(), {
                            tooltip: TextGet("HybridRooms"),
                            tooltipPosition: "left",
                            image: "Icons/RoomTypeHybrid.svg",
                        }, {
                            button: {
                                classList: ["chat-search-room-button"]
                            },
                        },
                    ),
                    ElementButton.Create(
                        "chat-search-room-maprooms-button",
                        () => MapRooms(), {
                            tooltip: TextGet("MapRooms"),
                            tooltipPosition: "left",
                            image: "Icons/RoomTypeMap.svg",
                        }, {
                            button: {
                                classList: ["chat-search-room-button"]
                            },
                        },
                    ),
                    ElementButton.Create(
                        "chat-search-room-empty-button",
                        () => {}, {
                            tooltip: "Unavailable",
                            tooltipPosition: "left",
                            image: "",
                        }, {
                            button: {
                                classList: ["chat-search-room-button"],
                                attributes: {
                                    "aria-hidden": "true",
                                    "tabindex": "-1",
                                    "disabled": "true",
                                    "style": "visibility:hidden; pointer-events:none;"
                                }
                            },
                        },
                    ),
                    ...(showFemaleButton ? [
                        ElementButton.Create(
                            "chat-search-room-female-lobby-button",
                            () => {
                                ChatSelectStartSearch(ChatRoomSpaceType.FEMALE_ONLY);
                                ChatSearchQuery(ChatSearchQueryString);
                            }, {
                                tooltip: TextGet("Female"),
                                tooltipPosition: "left",
                                image: "Screens/Online/ChatSelect/Female.png",
                            }, {
                                button: {
                                    classList: ["chat-search-room-button"]
                                }
                            }
                        )
                    ] : []),
                    ...(showMaleButton ? [
                        ElementButton.Create(
                            "chat-search-room-male-lobby-button",
                            () => {
                                ChatSelectStartSearch(ChatRoomSpaceType.MALE_ONLY);
                                ChatSearchQuery(ChatSearchQueryString);
                            }, {
                                tooltip: TextGet("Male"),
                                tooltipPosition: "left",
                                image: "Screens/Online/ChatSelect/Male.png",
                            }, {
                                button: {
                                    classList: ["chat-search-room-button"]
                                }
                            }
                        )
                    ] : []),
                    ...(showMixedButton ? [
                        ElementButton.Create(
                            "chat-search-room-mixed-lobby-button",
                            () => {
                                ChatSelectStartSearch(ChatRoomSpaceType.MIXED);
                                ChatSearchQuery(ChatSearchQueryString);
                            }, {
                                tooltip: TextGet("Mixed"),
                                tooltipPosition: "left",
                                image: "Icons/Gender.png",
                            }, {
                                button: {
                                    classList: ["chat-search-room-button"]
                                }
                            }
                        )
                    ] : []),
                    ElementButton.Create(
                        "chat-search-room-asylum-lobby-button",
                        () => {
                            if (!showAsylumButton) return;
                            ChatSelectStartSearch(ChatRoomSpaceType.ASYLUM);
                            ChatSearchQuery(ChatSearchQueryString);
                        }, {
                            tooltip: TextGet("Asylum"),
                            tooltipPosition: "left",
                            image: "Icons/Asylum.png",
                        }, {
                            button: {
                                classList: ["chat-search-room-button"],
                                attributes: !showAsylumButton ? {
                                    "aria-hidden": "true",
                                    "tabindex": "-1",
                                    "disabled": "true",
                                    "style": "visibility:hidden; pointer-events:none;"
                                } : {}
                            }
                        }
                    ),    
                    ElementButton.Create(
                        "chat-search-room-empty-button",
                        () => {}, {
                            tooltip: "Unavailable",
                            tooltipPosition: "left",
                            image: "",
                        }, {
                            button: {
                                classList: ["chat-search-room-button"],
                                attributes: {
                                    "aria-hidden": "true",
                                    "tabindex": "-1",
                                    "disabled": "true",
                                    "style": "visibility:hidden; pointer-events:none;"
                                }
                            },
                        },
                    ),
                    ElementButton.Create(
                        "chat-search-room-clubcard-button",
                        () => CardRooms(), {
                            tooltip: "Club Card",
                            tooltipPosition: "left",
                            image: "Icons/ClubCard.png",
                        }, {
                            button: {
                                classList: ["chat-search-room-button"]
                            },
                        },
                    ),
                    ElementButton.Create(
                        "chat-search-room-ggts-button",
                        () => GgtsRooms(), {
                            tooltip: "GGTS",
                            tooltipPosition: "left",
                            image: "Icons/GGTS.png",
                        }, {
                            button: {
                                classList: ["chat-search-room-button"]
                            },
                        },
                    ),
                    ElementButton.Create(
                        "chat-search-room-larp-button",
                        () => LarpRooms(), {
                            tooltip: "LARP",
                            tooltipPosition: "left",
                            image: "Icons/Battle.png",
                        }, {
                            button: {
                                classList: ["chat-search-room-button"]
                            },
                        },
                    ),
                    ElementButton.Create(
                        "chat-search-room-magicbattle-button",
                        () => MagicRooms(), {
                            tooltip: "Magic Battle",
                            tooltipPosition: "left",
                            image: "Icons/MagicSchool.png",
                        }, {
                            button: {
                                classList: ["chat-search-room-button"]
                            },
                        },
                    ),
                    ElementButton.Create(
                        "chat-search-room-pandoraprison-button",
                        () => PrisonRooms(), {
                            tooltip: "Pandora	 Prison",
                            tooltipPosition: "left",
                            image: "Icons/Infiltration.png",
                        }, {
                            button: {
                                classList: ["chat-search-room-button"]
                            },
                        },
                    ),
                ],
            }, ],
            parent: document.body,
        });
    }

    function ChatSearchCreateFilterHelpDialog() {
        ChatSearchFilterHelpScreenElement = ElementCreate({
            tag: "dialog",
            attributes: {
                id: "chat-search-filter-help-screen",
            },
            children: [{
                    tag: "ul",
                    classList: ["chat-search-filter-help-screen-content"],
                    children: CommonRange(1, 6).map(n => ({
                        tag: "li",
                        children: [TextGet(`HelpText${n}`)],
                    })),
                },
                ElementButton.Create("chat-search-filter-help-screen-close", function() {
                    ChatSearchFilterHelpScreenElement?.close();
                }, null, {
                    button: {
                        classList: ["chat-search-filter-help-screen-close-button"],
                        children: [
                            TextGet("CloseHelp"),
                        ],
                    },
                }),
            ],
            parent: document.body,
        });
    }

    function ChatSearchCreateGrid() {
        ChatSearchSearchBodyElement = ElementCreateDiv("chat-search-body");
        ChatSearchRoomGrid = ElementCreateDiv("chat-search-room-grid");
    }

    function ChatSearchCreateHeader(searchInput, filterInput, clearButton, minRoomSizeInput, maxRoomSizeInput, minRoomPlayersInput, maxRoomPlayersInput) {
        ChatSearchRoomHeader = ElementCreate({
            tag: "div",
            attributes: {
                id: "chat-search-room-header"
            },
            children: [{
                    tag: "div",
                    attributes: {
                        id: "chat-search-room-search-section",
                    },
                    classList: ["chat-search-room-header-section"],
                    children: [{
                            tag: "div",
                            attributes: {
                                id: "chat-search-input-search"
                            },
                            children: [
                                searchInput,
                                filterInput,
                                clearButton,
                            ],
                        },
                        ElementButton.Create(
                            "chat-search-room-search-button",
                            () => {
                                if (ChatSearchSearchMenuButton?.getAttribute("aria-expanded") === "true") {
                                    ChatSearchSearchMenuButton.click();
                                }
                                ChatSearchQuery(ChatSearchQueryString);
                            }, {
                                tooltip: TextGet("Search"),
                                tooltipPosition: "bottom",
                                image: "Icons/Search.png",
                            }, {
                                button: {
                                    classList: ["chat-search-room-button"]
                                },
                            },
                        ),
                        ChatSearchSearchMenuButton,
                        ElementButton.Create(
                            "chat-search-room-prev-page",
                            () => ChatSearchSetPageRelative(-1), {
                                tooltip: TextGet("Prev"),
                                tooltipPosition: "bottom",
                                image: "Icons/Prev.png",
                            }, {
                                button: {
                                    classList: ["chat-search-room-button"],
                                    attributes: {
                                        "aria-controls": "chat-search-room-grid"
                                    },
                                },
                            },
                        ),
                        ChatSearchPageCountElement,
                        ElementButton.Create(
                            "chat-search-room-next-page",
                            () => ChatSearchSetPageRelative(1), {
                                tooltip: TextGet("Next"),
                                tooltipPosition: "bottom",
                                image: "Icons/Next.png",
                            }, {
                                button: {
                                    classList: ["chat-search-room-button"],
                                    attributes: {
                                        "aria-controls": "chat-search-room-grid"
                                    },
                                },
                            },
                        ),
                        ElementButton.Create("chat-search-hide-rooms", function() {
                            ChatSearchToggleSearchMode();
                        }, {
                            tooltip: TextGet(ChatSearchMode != "Filter" ? "FilterMode" : "NormalMode"),
                            tooltipPosition: "bottom",
                            role: "checkbox",
                            image: "Icons/Private.png",
                        }, {
                            button: {
                                classList: ["chat-search-room-button"],
                                dataAttributes: {
                                    mode: ChatSearchMode == "Filter" ? "FilterMode" : "NormalMode",
                                },
                            },
                        }),
                    ],
                },
                {
                    tag: "div",
                    attributes: {
                        id: "chat-search-room-filter-section",
                        role: "radiogroup",
                        "aria-required": "true",
                        hidden: true
                    },
                    classList: ["chat-search-room-header-section"],
                    children: [
                        ElementButton.Create("chat-search-temp-hide-button", function() {
                            ChatSearchGhostPlayerOnClickActive = false;
                        }, {
                            role: "radio",
                            tooltip: TextGet("TempHideOnClick"),
                            tooltipPosition: "bottom",
                            image: "Icons/Trash.png",
                        }, {
                            button: {
                                classList: ["chat-search-room-button"],
                                attributes: {
                                    "aria-checked": !ChatSearchGhostPlayerOnClickActive ? "true" : "false",
                                },
                            },
                        }),
                        ElementButton.Create("chat-search-ghost-list-button", function() {
                            ChatSearchGhostPlayerOnClickActive = true;
                        }, {
                            role: "radio",
                            tooltip: TextGet("GhostPlayerOnClick"),
                            tooltipPosition: "bottom",
                            image: "Icons/GhostList.png",
                        }, {
                            button: {
                                classList: ["chat-search-room-button"],
                                attributes: {
                                    "aria-checked": ChatSearchGhostPlayerOnClickActive ? "true" : "false",
                                },
                            },
                        }),
                        ElementButton.Create(
                            "chat-search-room-show-hidden-rooms-button",
                            () => ChatSearchToggleHiddenMode(), {
                                role: "checkbox",
                                tooltip: TextGet("ShowHiddenRooms"),
                                tooltipPosition: "bottom",
                                image: "Icons/InspectLock.png",
                            }, {
                                button: {
                                    classList: ["chat-search-room-button"]
                                },
                            },
                        ),
                        ElementButton.Create(
                            "chat-search-room-help-button",
                            () => {
                                if (ChatSearchFilterHelpScreenElement?.open) {
                                    return ChatSearchFilterHelpScreenElement.close();
                                }
                                ChatSearchFilterHelpScreenElement?.showModal();
                                ElementPositionFixed(ChatSearchFilterHelpScreenElement, 25, 135, 1900, 800);
                                ChatSearchFilterHelpScreenElement?.addEventListener("keydown", (ev) => {
                                    if (ev.key === "Escape") {
                                        ChatSearchFilterHelpScreenElement?.close();
                                        return;
                                    }
                                }, {
                                    once: true
                                });
                                ChatSearchFilterHelpScreenElement?.focus();
                            }, {
                                tooltip: TextGet("Help"),
                                tooltipPosition: "bottom",
                                image: "Icons/Question.png",
                            }, {
                                button: {
                                    classList: ["chat-search-room-button"]
                                },
                            },
                        ),
                    ],
                },
                {
                    tag: "div",
                    attributes: {
                        id: "chat-search-room-navigation-section"
                    },
                    classList: ["chat-search-room-header-section"],
					children: [
                        ElementButton.Create(
                            "chat-search-room-wardrobe-button",
                            () => CharacterAppearanceLoadCharacter(Player), {
                                tooltip: "Wardrobe",
                                tooltipPosition: "bottom",
                                image: "Icons/Dress.png",
                            }, {
                                button: {
                                    classList: ["chat-search-room-button"]
                                },
                            },
                        ),
                        ElementButton.Create(
                            "chat-search-room-preferences-button",
                            () => PrfClick(), {
                                tooltip: "Preferences",
                                tooltipPosition: "bottom",
                                image: "Icons/Preference.png",
                            }, {
                                button: {
                                    classList: ["chat-search-room-button"]
                                },
                            },
                        ),
                        ElementButton.Create(
                            "chat-search-room-extensions-button",
                            () => ExtClick(), {
                                tooltip: "Extensions",
                                tooltipPosition: "bottom",
                                image: "Icons/Extensions.png",
                            }, {
                                button: {
                                    classList: ["chat-search-room-button"]
                                },
                            },
                        ),
                        ElementButton.Create(
                            "chat-search-room-create-room-button",
                            () => ChatAdminShowCreate(), {
                                tooltip: TextGet("CreateRoom"),
                                tooltipPosition: "bottom",
                                image: "Icons/Plus.png",
                            }, {
                                button: {
                                    classList: ["chat-search-room-button"]
                                },
                            },
                        ),
                        ElementButton.Create(
                            "chat-search-room-friend-list-button",
                            () => {
                                FriendListReturn = {
                                    Screen: CurrentScreen,
                                    Module: CurrentModule
                                };
                                CommonSetScreen("Character", "FriendList");
                            }, {
                                tooltip: TextGet("FriendList"),
                                tooltipPosition: "bottom",
                                image: "Icons/FriendList.png",
                            }, {
                                button: {
                                    classList: ["chat-search-room-button"]
                                },
                            },
                        ),
                        ElementButton.Create(
                            "chat-search-room-exit-button",
                            () => ChatSearchExit(false), {
                                tooltip: "",
                                tooltipPosition: "bottom",
                                image: "Icons/Exit.png",
                            }, {
                                button: {
                                    classList: ["chat-search-room-button"]
                                },
                            },
                        ),
                    ],
                },
            ],
            parent: document.body,
        });
    }

    function ChatSearchCreatePageCountElement() {
        ChatSearchPageCountElement = ElementCreate({
            tag: "div",
            attributes: {
                id: "chat-search-page-count",
            },
            children: [
                `0 / 0`,
            ],
        });
    }

    function ChatSearchCreateRoomPlayersInputs() {
        const minRoomPlayersInput = ElementCreate({
            tag: "input",
            attributes: {
                id: "chat-search-search-menu-room-players-min",
                type: "number",
                inputmode: "numeric",
                value: pmin,
                min: 1,
                max: 20,
                step: 1,
                required: true,
            },
            classList: ["chat-search-room-players-input"],
            eventListeners: {
                change: () => {
                    const min = parseInt(minRoomPlayersInput.value, 10);
                    if (!minRoomPlayersInput.validity.valid) return;
                    pmin = min;
                    minRoomPlayersInput.valueAsNumber = min;
                    maxRoomPlayersInput.min = String(min);
                    M_MOANER_saveControls();
                    Player.UBC.ubcSettings.pmin = min;
                }
            }
        });
        const maxRoomPlayersInput = ElementCreate({
            tag: "input",
            attributes: {
                id: "chat-search-search-menu-room-players-max",
                type: "number",
                inputmode: "numeric",
                value: pmax,
                min: 1,
                max: 20,
                step: 1,
                required: true,
            },
            classList: ["chat-search-room-players-input"],
            eventListeners: {
                change: () => {
                    let max = parseInt(maxRoomPlayersInput.value, 10);
                    if (!maxRoomPlayersInput.validity.valid) return;
                    pmax = max;
                    maxRoomPlayersInput.valueAsNumber = max;
                    minRoomPlayersInput.max = String(max);
                    M_MOANER_saveControls();
                    Player.UBC.ubcSettings.pmax = max;
                }
            }
        });
        return {
            minRoomPlayersInput,
            maxRoomPlayersInput
        };
    }

    function ChatSearchCreateRoomSizeInputs() {
        const minRoomSizeInput = ElementCreate({
            tag: "input",
            attributes: {
                id: "chat-search-search-menu-room-size-min",
                type: "number",
                inputmode: "numeric",
                value: Player.ChatSearchSettings.RoomMinSize,
                min: 2,
                max: 20,
                step: 1,
                required: true,
            },
            classList: ["chat-search-room-size-input"],
            eventListeners: {
                change: () => {
                    const min = parseInt(minRoomSizeInput.value, 10);
                    if (!minRoomSizeInput.validity.valid) return;
                    Player.ChatSearchSettings.RoomMinSize = min;
                    minRoomSizeInput.valueAsNumber = min;
                    maxRoomSizeInput.min = String(min);
                    ChatSearchUpdateSearchSettings();
                }
            }
        });
        const maxRoomSizeInput = ElementCreate({
            tag: "input",
            attributes: {
                id: "chat-search-search-menu-room-size-max",
                type: "number",
                inputmode: "numeric",
                value: Player.ChatSearchSettings.RoomMaxSize,
                min: 2,
                max: 20,
                step: 1,
                required: true,
            },
            classList: ["chat-search-room-size-input"],
            eventListeners: {
                change: () => {
                    let max = parseInt(maxRoomSizeInput.value, 10);
                    if (!maxRoomSizeInput.validity.valid) return;
                    Player.ChatSearchSettings.RoomMaxSize = max;
                    maxRoomSizeInput.valueAsNumber = max;
                    minRoomSizeInput.max = String(max);
                    ChatSearchUpdateSearchSettings();
                }
            }
        });
        return {
            minRoomSizeInput,
            maxRoomSizeInput
        };
    }

    function ChatSearchCreateSearchControls() {
        const space = ChatSearchGetSpace();
        if (space && !Player.ChatSearchSettings.Space.includes(space)) {
            Player.ChatSearchSettings.Space = space;
        }
        const searchInput = ElementCreateSearchInput("InputSearch", () => {
            const rooms = ChatSearchShowHiddenRoomsActive ? ChatSearchHiddenResult : ChatSearchResult;
            return rooms.map(i => i.DisplayName).sort();
        }, {
            maxLength: 200,
            value: ChatSearchQueryString
        });
        ElementSetAttribute("InputSearch", "placeholder", TextGet("SearchRoom"));
        searchInput.classList.add("chat-search-input-search-box");
        searchInput.addEventListener("input", function(ev) {
            clearButton.hidden = this.value.length === 0;
            ChatSearchQueryString = this.value;
        });
        searchInput.addEventListener("keydown", ChatSearchKeyDownListener);
        const filterInput = ElementCreateInput("InputFilter", "text", Player.ChatSearchSettings.FilterTerms);
        ElementSetAttribute("InputFilter", "placeholder", TextGet("FilterExcludeTerms"));
        filterInput.toggleAttribute("hidden", true);
        filterInput.classList.add("chat-search-input-filter-box");
        filterInput.addEventListener("input", function() {
			clearButton.hidden = this.value.length === 0;
            Player.ChatSearchSettings.FilterTerms = this.value;
        });
        filterInput.addEventListener("keydown", (event) => {
            if (event.repeat || !CommonKey.IsPressed(event, "Enter")) return;
            ChatSearchSaveFilterTerms();
        });
        const clearButton = ElementButton.Create("chat-search-clear-input-search", function(ev) {
            switch (ChatSearchMode) {
			    case "":
					ElementValue("InputSearch", "");
					ChatSearchQuery("");
					break;
				case "Filter":
					ElementValue("InputFilter", "");
                    break;
            }
        }, {
            image: "Icons/cross.svg",
            noStyling: true,
        }, {
            button: {
                classList: ["chat-search-room-button"],
                attributes: {
                    hidden: !ChatSearchQueryString.length
                },
            },
        });
        ChatSearchSearchMenuButton = ElementButton.Create(
            "chat-search-room-open-search-menu",
            function() {
                const img = this.querySelector('img');
                if (!img) return;
                const open = this.getAttribute("aria-expanded") === "true";
                if (open) {
                    this.setAttribute("aria-expanded", "false");
                    img.src = `Icons/CaretUp.svg`;
                } else {
                    this.setAttribute("aria-expanded", "true");
                    img.src = `Icons/CaretDown.svg`;
                    if (document.activeElement?.id !== "InputSearch") {
                        ElementFocus("InputSearch");
                    }
                }
                ElementUnpackIDs.fromAttribute(this, "aria-controls").forEach(el => el.hidden = open);
            }, {
                tooltip: TextGet("SearchMenuButton"),
                tooltipPosition: "bottom",
                image: "Icons/CaretUp.svg",
            }, {
                button: {
                    classList: ["chat-search-room-button"],
                    attributes: {
                        "aria-expanded": "false",
                        "aria-controls": "chat-search-search-menu"
                    }
                }
            });
        return {
            searchInput,
            filterInput,
            clearButton
        };
    }

	function ChatSearchCreateSearchMenu(minRoomSizeInput, maxRoomSizeInput, minRoomPlayersInput, maxRoomPlayersInput) {
       if (noubcbar == true)  SearchMenu1(minRoomSizeInput, maxRoomSizeInput, minRoomPlayersInput, maxRoomPlayersInput);  
       if (noubcbar == false) SearchMenu2(minRoomSizeInput, maxRoomSizeInput, minRoomPlayersInput, maxRoomPlayersInput);
    }

	function ChatSearchInitState() {
        ChatRoomCustomizationClear();
        ChatRoomActivateView(ChatRoomCharacterViewName);
        ChatRoomMapViewEditMode = "";
        ChatRoomMapViewEditBackup = [];
        delete Player.MapData;
        CurrentDarkFactor = 0.5;
        if (ChatSearchSafewordAppearance == null) {
            ChatSearchSafewordAppearance = Player.Appearance.slice(0);
            ChatSearchSafewordPose = Player.ActivePoseMapping;
        }
        AsylumGGTSIntroDone = false;
        AsylumGGTSTask = null;
        AsylumGGTSPreviousPose = {
            ...Player.PoseMapping
        };
        Player.ArousalSettings.OrgasmCount = 0;
        ChatSearchLanguage = Player.ChatSearchSettings.Language;
    }

	function SearchMenu1(minRoomSizeInput, maxRoomSizeInput, minRoomPlayersInput, maxRoomPlayersInput) {
        ChatSearchSearchMenu = ElementCreate({
            tag: "fieldset",
            attributes: {
                id: "chat-search-search-menu",
                hidden: true,
            },
            children: [
                // Room type
                {
                    tag: "div",
                    attributes: {
                        id: "chat-search-search-menu-room-type",
                    },
                    classList: ["chat-search-search-menu-grid-item"],
                    children: [
                        ElementCreateSettingsLabel(TextGet("RoomType")),
                        ElementCreateRadioButtonGroup(
                            "chat-search-search-menu-room-type-radio-group",
                            (ev, key) => {
                                if (key === "None") {
                                    Player.ChatSearchSettings.MapTypes = "";
                                } else {
                                    Player.ChatSearchSettings.MapTypes = key;
                                }
                                ChatSearchUpdateSearchSettings();
                            },
                            !Player.ChatSearchSettings.MapTypes ? "None" : Player.ChatSearchSettings.MapTypes,
                            [{
                                    options: {
                                        image: "Icons/cross.svg",
                                        tooltip: TextGet("AllRooms"),
                                    },
                                    htmlOptions: {
                                        button: {
                                            attributes: {
                                                value: "None"
                                            }
                                        }
                                    }
                                },
                                {
                                    options: {
                                        image: "Icons/RoomTypeNormal.svg",
                                        tooltip: TextGet("NormalRooms")
                                    },
                                    htmlOptions: {
                                        button: {
                                            attributes: {
                                                value: "Never"
                                            }
                                        }
                                    }
                                },
                                {
                                    options: {
                                        image: "Icons/RoomTypeHybrid.svg",
                                        tooltip: TextGet("HybridRooms")
                                    },
                                    htmlOptions: {
                                        button: {
                                            attributes: {
                                                value: "Hybrid"
                                            }
                                        }
                                    }
                                },
                                {
                                    options: {
                                        image: "Icons/RoomTypeMap.svg",
                                        tooltip: TextGet("MapRooms")
                                    },
                                    htmlOptions: {
                                        button: {
                                            attributes: {
                                                value: "Always"
                                            }
                                        }
                                    }
                                },
                            ]),
                    ],
                }, 
                // Lobby
                {
                    tag: "div",
                    attributes: {
                        id: "chat-search-search-menu-room-lobby",
                    },
                    classList: ["chat-search-search-menu-grid-item"],
                    children: [
                        ElementCreateSettingsLabel(TextGet("Lobby")),
                        ElementCreateRadioButtonGroup(
                            "chat-search-search-menu-room-lobby-radio-group",
                            (ev, key) => {
                                Player.ChatSearchSettings.Space = ChatSearchSpace = key;
                                ChatSearchUpdateSearchSettings();
                            },
                            ChatSearchGetSpace() ?? "",
                            [
                                (((ChatSearchGetSpace() != "Asylum" && asylumlimit == true)) || (asylumlimit == false)) && Player.GetGenders().includes("F") && {
                                    options: {
                                        image: "Icons/Female.svg",
                                        tooltip: TextGet("Female")
                                    },
                                    htmlOptions: {
                                        button: {
                                            attributes: {
                                                value: ""
                                            }
                                        }
                                    }
                                },
                                (((ChatSearchGetSpace() != "Asylum" && asylumlimit == true)) || (asylumlimit == false)) && {
                                    options: {
                                        image: "Icons/Gender.svg",
                                        tooltip: TextGet("Mixed")
                                    },
                                    htmlOptions: {
                                        button: {
                                            attributes: {
                                                value: "X"
                                            }
                                        }
                                    }
                                },
                                (((ChatSearchGetSpace() != "Asylum" && asylumlimit == true)) || (asylumlimit == false)) && Player.GetGenders().includes("M") && {
                                    options: {
                                        image: "Icons/Male.svg",
                                        tooltip: TextGet("Male")
                                    },
                                    htmlOptions: {
                                        button: {
                                            attributes: {
                                                value: "M"
                                            }
                                        }
                                    }
                                },
                                (((ChatSearchGetSpace() === "Asylum" && asylumlimit == true)) || (asylumlimit == false)) && {
                                    options: {
                                        image: "Icons/Asylum.png",
                                        tooltip: TextGet("Asylum")
                                    },
                                    htmlOptions: {
                                        button: {
                                            attributes: {
                                                value: "Asylum"
                                            }
                                        }
                                    }
                                },
                            ].filter(Boolean),
                        ),
                    ],
                },              
                // Full rooms
                {
                    tag: "div",
                    attributes: {
                        id: "chat-search-search-menu-full-rooms",
                    },
                    dataAttributes: {
                        checkbox: true,
                    },
                    classList: ["chat-search-search-menu-grid-item"],
                    children: [
                        ElementCreateSettingsLabel(TextGet("ShowFullRooms"), "left"),
                        ElementCheckbox.Create("chat-search-search-menu-full-rooms-input", function(ev) {
                            Player.ChatSearchSettings.FullRooms = this.checked;
                            ChatSearchUpdateSearchSettings();
                        }, {
                            checked: Player.ChatSearchSettings.FullRooms,
                        })
                    ],
                },
                // Locked rooms
                {
                    tag: "div",
                    attributes: {
                        id: "chat-search-search-menu-locked-rooms",
                    },
                    dataAttributes: {
                        checkbox: true,
                    },
                    classList: ["chat-search-search-menu-grid-item"],
                    children: [
                        ElementCreateSettingsLabel(TextGet("ShowLockedRooms"), "left"),
                        ElementCheckbox.Create("chat-search-search-menu-locked-rooms-input", function(ev) {
                            Player.ChatSearchSettings.ShowLocked = this.checked;
                            ChatSearchUpdateSearchSettings();
                        }, {
                            checked: Player.ChatSearchSettings.ShowLocked,
                        })
                    ],
                },
                // Search description
                {
                    tag: "div",
                    attributes: {
                        id: "chat-search-search-menu-search-description",
                    },
                    dataAttributes: {
                        checkbox: true,
                    },
                    classList: ["chat-search-search-menu-grid-item"],
                    children: [
                        ElementCreateSettingsLabel(TextGet("SearchDescription"), "left"),
                        ElementCheckbox.Create("chat-search-search-menu-search-description-input", function() {
                            Player.ChatSearchSettings.SearchDescriptions = this.checked;
                            ChatSearchUpdateSearchSettings();
                        }, {
                            checked: Player.ChatSearchSettings.SearchDescriptions,
                        }),
                    ],
                },
                // Friends
                {
                    tag: "div",
                    attributes: {
                        id: "chat-search-search-menu-autojoin",
                    },
                    dataAttributes: {
                        checkbox: true,
                    },
                    classList: ["chat-search-search-menu-grid-item"],
                    children: [
                        ElementCreateSettingsLabel("First rooms with friends:", "left"),
                        ElementCheckbox.Create("chat-search-search-menu-friends-input", function() {
                            Player.OnlineSettings.SearchFriendsFirst = this.checked;
                        }, {
                            checked: Player.OnlineSettings.SearchFriendsFirst,
                        }),
                    ],
                },
                // AutoJoin feature
                {
                    tag: "div",
                    attributes: {
                        id: "chat-search-search-menu-autojoin",
                    },
                    dataAttributes: {
                        checkbox: true,
                    },
                    classList: ["chat-search-search-menu-grid-item"],
                    children: [
                        ElementCreateSettingsLabel("AutoJoin feature:", "left"),
                        ElementCheckbox.Create("chat-search-search-menu-autojoin-input", function() {
                            autojoin = this.checked;
                            SetAutoJoin();
                        }, {
                            checked: autojoin,
                        }),
                    ],
                },
                // Game
                {
                    tag: "div",
                    attributes: {
                        id: "chat-search-search-menu-room-game",
                    },
                    classList: ["chat-search-search-menu-grid-item"],
                    children: [
                        ElementCreateSettingsLabel(TextGet("GameLabel")),
                        ElementCreateDropdown(
                            "chat-search-search-menu-room-game-dropdown",
                            [
                                ...[...ChatAdminGameList, "Prison"].map(game => ({
                                    children: [TextGet(`Game${game === "" ? "AllRooms" : game}`)],
                                    attributes: {
                                        value: game,
                                        selected: ChatSearchGame == game
                                    }
                                })),
                            ],
                            function(ev) {
                                ChatSearchGame = Player.ChatSearchSettings.Game = /** @type {ServerChatRoomGame} */ (this.value);
                                ChatSearchUpdateSearchSettings();
                            },
                            null, {
                                select: {
                                    attributes: {
                                        value: ChatSearchGame,
                                    }
                                }
                            }
                        ),
                    ],
                },
                // Language
                {
                    tag: "div",
                    attributes: {
                        id: "chat-search-search-menu-room-language"
                    },
                    classList: ["chat-search-search-menu-grid-item"],
                    children: [
                        ElementCreateSettingsLabel("Language"),
                        ElementCreateDropdown(
                            "chat-search-search-menu-room-language-dropdown",
                            [
                                ... /** @type {ServerChatRoomLanguage[]} */ ([...ChatAdminLanguageList, ""]).map(lang => ({
                                    children: [ChatSearchGetLanguageName(lang)],
                                    attributes: {
                                        value: lang,
                                        selected: Player.ChatSearchSettings.Language == lang
                                    }
                                })),
                            ],
                            function(ev) {
                                Player.ChatSearchSettings.Language = ChatSearchLanguage = /** @type {ServerChatRoomLanguage} */ (this.value);
                                ChatSearchUpdateSearchSettings();
                            }, {
                                required: true
                            }
                        ),
                    ],
                },
                // Room size
                {
                    tag: "div",
                    attributes: {
                        id: "chat-search-search-menu-room-size"
                    },
                    classList: ["chat-search-search-menu-grid-item"],
                    children: [
                        ElementCreateSettingsLabel("Room Size"),
                        {
                            tag: "div",
                            attributes: {
                                id: "chat-search-search-menu-room-size-grid"
                            },
                            children: [
                                minRoomSizeInput,
                                "/",
                                maxRoomSizeInput,
                                {
                                    tag: "span",
                                    classList: ["chat-search-search-menu-room-size-label"],
                                    children: ["min"],
                                    attributes: {
                                        "for": "chat-search-search-menu-room-size-min"
                                    }
                                },
                                {
                                    tag: "span",
                                    classList: ["chat-search-search-menu-room-size-label"],
                                    children: ["max"],
                                    style: {
                                        "grid-column": "3/3"
                                    },
                                    attributes: {
                                        "for": "chat-search-search-menu-room-size-max"
                                    },
                                },
                            ],
                        }
                    ]
                },
                // Players in room
                {
                    tag: "div",
                    attributes: {
                        id: "chat-search-search-menu-room-players"
                    },
                    classList: ["chat-search-search-menu-grid-item"],
                    children: [
                        ElementCreateSettingsLabel("Players in Room"),
                        {
                            tag: "div",
                            attributes: {
                                id: "chat-search-search-menu-room-players-grid"
                            },
                            children: [
                                minRoomPlayersInput,
                                "/",
                                maxRoomPlayersInput,
                                {
                                    tag: "span",
                                    classList: ["chat-search-search-menu-room-players-label"],
                                    children: ["min"],
                                    attributes: {
                                        "for": "chat-search-search-menu-room-players-min"
                                    }
                                },
                                {
                                    tag: "span",
                                    classList: ["chat-search-search-menu-room-players-label"],
                                    children: ["max"],
                                    style: {
                                        "grid-column": "3/3"
                                    },
                                    attributes: {
                                        "for": "chat-search-search-menu-room-players-max"
                                    },
                                },
                            ],
                        }
                    ]
                },
                ElementButton.Create("chat-search-search-menu-search-button", function() {
                    const elements = /** @type {HTMLCollectionOf<Element & { validity: ValidityState, reportValidity(): boolean }>} */ (ChatSearchSearchMenu?.elements) ?? [];
                    for (const el of elements) {
                        if (!el.validity.valid) {
                            el.reportValidity();
                            return;
                        }
                    }
                    ChatSearchQuery(ChatSearchQueryString);
                }, null, {
                    button: {
                        classList: ["chat-search-search-menu-search-button"],
                        children: [
                            TextGet("Search"),
                        ],
                    },
                }),
            ],
            parent: document.body,
        });
    }

    function SearchMenu2(minRoomSizeInput, maxRoomSizeInput, minRoomPlayersInput, maxRoomPlayersInput) {
        ChatSearchSearchMenu = ElementCreate({
            tag: "fieldset",
            attributes: {
                id: "chat-search-search-menu",
                hidden: true,
            },
            children: [
                // Full rooms
                {
                    tag: "div",
                    attributes: {
                        id: "chat-search-search-menu-full-rooms",
                    },
                    dataAttributes: {
                        checkbox: true,
                    },
                    classList: ["chat-search-search-menu-grid-item"],
                    children: [
                        ElementCreateSettingsLabel(TextGet("ShowFullRooms"), "left"),
                        ElementCheckbox.Create("chat-search-search-menu-full-rooms-input", function(ev) {
                            Player.ChatSearchSettings.FullRooms = this.checked;
                            ChatSearchUpdateSearchSettings();
                        }, {
                            checked: Player.ChatSearchSettings.FullRooms,
                        })
                    ],
                },
                // Locked rooms
                {
                    tag: "div",
                    attributes: {
                        id: "chat-search-search-menu-locked-rooms",
                    },
                    dataAttributes: {
                        checkbox: true,
                    },
                    classList: ["chat-search-search-menu-grid-item"],
                    children: [
                        ElementCreateSettingsLabel(TextGet("ShowLockedRooms"), "left"),
                        ElementCheckbox.Create("chat-search-search-menu-locked-rooms-input", function(ev) {
                            Player.ChatSearchSettings.ShowLocked = this.checked;
                            ChatSearchUpdateSearchSettings();
                        }, {
                            checked: Player.ChatSearchSettings.ShowLocked,
                        })
                    ],
                },
                // Search description
                {
                    tag: "div",
                    attributes: {
                        id: "chat-search-search-menu-search-description",
                    },
                    dataAttributes: {
                        checkbox: true,
                    },
                    classList: ["chat-search-search-menu-grid-item"],
                    children: [
                        ElementCreateSettingsLabel(TextGet("SearchDescription"), "left"),
                        ElementCheckbox.Create("chat-search-search-menu-search-description-input", function() {
                            Player.ChatSearchSettings.SearchDescriptions = this.checked;
                            ChatSearchUpdateSearchSettings();
                        }, {
                            checked: Player.ChatSearchSettings.SearchDescriptions,
                        }),
                    ],
                },
                // Friends
                {
                    tag: "div",
                    attributes: {
                        id: "chat-search-search-menu-autojoin",
                    },
                    dataAttributes: {
                        checkbox: true,
                    },
                    classList: ["chat-search-search-menu-grid-item"],
                    children: [
                        ElementCreateSettingsLabel("First rooms with friends:", "left"),
                        ElementCheckbox.Create("chat-search-search-menu-friends-input", function() {
                            Player.OnlineSettings.SearchFriendsFirst = this.checked;
                        }, {
                            checked: Player.OnlineSettings.SearchFriendsFirst,
                        }),
                    ],
                },
                // AutoJoin feature
                {
                    tag: "div",
                    attributes: {
                        id: "chat-search-search-menu-autojoin",
                    },
                    dataAttributes: {
                        checkbox: true,
                    },
                    classList: ["chat-search-search-menu-grid-item"],
                    children: [
                        ElementCreateSettingsLabel("AutoJoin feature:", "left"),
                        ElementCheckbox.Create("chat-search-search-menu-autojoin-input", function() {
                            autojoin = this.checked;
                            SetAutoJoin();
                        }, {
                            checked: autojoin,
                        }),
                    ],
                },
                // Language
                {
                    tag: "div",
                    attributes: {
                        id: "chat-search-search-menu-room-language"
                    },
                    classList: ["chat-search-search-menu-grid-item"],
                    children: [
                        ElementCreateSettingsLabel("Language"),
                        ElementCreateDropdown(
                            "chat-search-search-menu-room-language-dropdown",
                            [
                                ... /** @type {ServerChatRoomLanguage[]} */ ([...ChatAdminLanguageList, ""]).map(lang => ({
                                    children: [ChatSearchGetLanguageName(lang)],
                                    attributes: {
                                        value: lang,
                                        selected: Player.ChatSearchSettings.Language == lang
                                    }
                                })),
                            ],
                            function(ev) {
                                Player.ChatSearchSettings.Language = ChatSearchLanguage = /** @type {ServerChatRoomLanguage} */ (this.value);
                                ChatSearchUpdateSearchSettings();
                            }, {
                                required: true
                            }
                        ),
                    ],
                },
                // Room size
                {
                    tag: "div",
                    attributes: {
                        id: "chat-search-search-menu-room-size"
                    },
                    classList: ["chat-search-search-menu-grid-item"],
                    children: [
                        ElementCreateSettingsLabel("Room Size"),
                        {
                            tag: "div",
                            attributes: {
                                id: "chat-search-search-menu-room-size-grid"
                            },
                            children: [
                                minRoomSizeInput,
                                "/",
                                maxRoomSizeInput,
                                {
                                    tag: "span",
                                    classList: ["chat-search-search-menu-room-size-label"],
                                    children: ["min"],
                                    attributes: {
                                        "for": "chat-search-search-menu-room-size-min"
                                    }
                                },
                                {
                                    tag: "span",
                                    classList: ["chat-search-search-menu-room-size-label"],
                                    children: ["max"],
                                    style: {
                                        "grid-column": "3/3"
                                    },
                                    attributes: {
                                        "for": "chat-search-search-menu-room-size-max"
                                    },
                                },
                            ],
                        }
                    ]
                },
                // Players in room
                {
                    tag: "div",
                    attributes: {
                        id: "chat-search-search-menu-room-players"
                    },
                    classList: ["chat-search-search-menu-grid-item"],
                    children: [
                        ElementCreateSettingsLabel("Players in Room"),
                        {
                            tag: "div",
                            attributes: {
                                id: "chat-search-search-menu-room-players-grid"
                            },
                            children: [
                                minRoomPlayersInput,
                                "/",
                                maxRoomPlayersInput,
                                {
                                    tag: "span",
                                    classList: ["chat-search-search-menu-room-players-label"],
                                    children: ["min"],
                                    attributes: {
                                        "for": "chat-search-search-menu-room-players-min"
                                    }
                                },
                                {
                                    tag: "span",
                                    classList: ["chat-search-search-menu-room-players-label"],
                                    children: ["max"],
                                    style: {
                                        "grid-column": "3/3"
                                    },
                                    attributes: {
                                        "for": "chat-search-search-menu-room-players-max"
                                    },
                                },
                            ],
                        }
                    ]
                },
                ElementButton.Create("chat-search-search-menu-search-button", function() {
                    const elements = /** @type {HTMLCollectionOf<Element & { validity: ValidityState, reportValidity(): boolean }>} */ (ChatSearchSearchMenu?.elements) ?? [];
                    for (const el of elements) {
                        if (!el.validity.valid) {
                            el.reportValidity();
                            return;
                        }
                    }
                    ChatSearchQuery(ChatSearchQueryString);
                }, null, {
                    button: {
                        classList: ["chat-search-search-menu-search-button"],
                        children: [
                            TextGet("Search"),
                        ],
                    },
                }),
            ],
            parent: document.body,
        });
    }
	
    //Chess Game
    async function GameChess() {
        await CommonSetScreen("Room", "CollegeChess");
        CollegeChessGameStartALT = function(Difficulty) {
            CollegeChessDifficulty = parseInt(Difficulty);
            const playerStarts = Math.random() < 0.5;
            ChessCharacterWhite = playerStarts ? Player : CollegeChessOpponent;
            ChessCharacterBlack = playerStarts ? CollegeChessOpponent : Player;
            MiniGameStart("Chess", CollegeChessDifficulty, "CollegeChessGameEndALT");
            document.addEventListener("chessOnMove", CollegeChessGameProgress);
        };
        if (this.ChessOn == false || this.ChessOn == undefined) {
            ChessOn = true;
            if (minigame == "easy") chessdifficulty = 1;
            if (minigame == "normal") chessdifficulty = 2;
            if (minigame == "hard") chessdifficulty = 3;
            CollegeChessGameStartALT(chessdifficulty);
            setTimeout(function() {
                CommonSetScreen("Online", "ChatRoom");
                ElementPositionFix("DivChessBoard", null, -1100, 0);
            }, 2000);
        } else {
            minigame = "";
            M_MOANER_saveControls();
        }
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

    //Effects
    function applySleepEffect(character, name, pronoun2) {
        publicmsg(
            character === Player ?
            `${tmpname} toma una pastilla para dormir y bebe un vaso de agua. Se duerme muy rápido.` :
            `${tmpname} le da a ${name} una pastilla para dormir y un vaso de agua. ${name} se duerme muy rápido.`
        );
        InventoryWear(character, "RegularSleepingPill", 'ItemMouth');
        CharacterSetFacialExpression(character, "Eyes", "Closed");
        CharacterSetFacialExpression(character, "Eyes2", "Closed");
        CharacterSetFacialExpression(character, "Emoticon", "Sleep");
        ChatRoomCharacterUpdate(character);
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

    //Information Sheet
    function Altrpsk() {
        var C = InformationSheetSelection;
        if (C.IsPlayer() || C.IsOnline()) {
            const lineHeight = 55;
            const x = 1000;
            const headerY = 125;
            const firstY = 200;
            DrawText(TextGet("Reputation"), x, headerY, "Black", "Gray");
            const labelMap = {
                Dominant: {
                    posKey: "ReputationDominantPositive",
                    negKey: "ReputationDominantNegative",
                    useAbs: true
                },
                Asylum: {
                    posKey: "ReputationAsylumPositive",
                    negKey: "ReputationAsylumNegative",
                    useAbs: true
                },
                ABDL: {
                    key: "ReputationABDLPositive"
                },
                Gaming: {
                    key: "ReputationGamingPositive"
                },
                Gambling: {
                    key: "ReputationGamblingPositive"
                },
                HouseAmplector: {
                    key: "ReputationHouseAmplectorPositive"
                },
                HouseCorporis: {
                    key: "ReputationHouseCorporisPositive"
                },
                HouseMaiestas: {
                    key: "ReputationHouseMaiestasPositive"
                },
                HouseVincula: {
                    key: "ReputationHouseVinculaPositive"
                },
                Kidnap: {
                    key: "ReputationKidnapPositive"
                },
                LARP: {
                    key: "ReputationLARPPositive"
                },
                Maid: {
                    key: "ReputationMaidPositive"
                }
            };
            const entriesByType = {};
            for (const rep of C.Reputation || []) {
                if (!rep) continue;
                if (!entriesByType[rep.Type]) entriesByType[rep.Type] = [];
                entriesByType[rep.Type].push(rep);
            }
            let pos = 0;
            for (const typeKey of Object.keys(labelMap)) {
                const group = entriesByType[typeKey];
                if (!group) continue;
                for (const rep of group) {
                    if (rep.Value === 0) continue;
                    const map = labelMap[typeKey];
                    let label;
                    let valueText;
                    if (map.posKey) {
                        label = rep.Value > 0 ? TextGet(map.posKey) : TextGet(map.negKey);
                        valueText = Math.abs(rep.Value).toString();
                    } else {
                        label = TextGet(map.key);
                        valueText = rep.Value.toString();
                    }
                    DrawText(label + " " + valueText, x, firstY + pos * lineHeight, "Black", "Gray");
                    pos++;
                }
            }
            if (pos === 0) DrawText(TextGet("ReputationNone"), x, firstY, "Black", "Gray");
            SkillValidSkills = ['Bondage', 'Dressage', 'Evasion', 'Infiltration', 'LockPicking', 'SelfBondage', 'Willpower'];
            DrawText(TextGet("Skill"), 1425, 125, "Black", "Gray");
            if (!C.IsPlayer()) {
                DrawText(TextGet("Unknown"), 1425, 200, "Black", "Gray");
            } else {
                let skillLine = 0;
                if (C.Skill.length == 0) {
                    DrawText(TextGet("SkillNone"), 1425, 200, "Black", "Gray");
                } else {
                    for (const type of SkillValidSkills) {
                        const name = TextGet(`Skill${type}`);
                        const level = SkillGetLevel(C, type);
                        const progress = SkillGetProgress(C, type);
                        if (level === 0 && progress === 0) continue;
                        const ratio = SkillGetRatio(C, type);
                        const modifier = SkillGetModifier(C, type);
                        const duration = SkillGetModifierDuration(C, type);
                        const skillText = `${name} ${level} (${progress / 10}%)`;
                        const color = ratio !== 1 ? "Red" : "Black";
                        DrawText(skillText, 1425, 200 + skillLine * lineHeight, color, "Gray");
                        skillLine++;
                        if (modifier && modifier !== 0) {
                            const subst = [
                                ["ABS", (modifier > 0 ? "+" : "-")],
                                ["VAL", modifier.toString()],
                                ["DURATION", TimermsToTime(duration)],
                            ];
                            const modifierColor = modifier > 0 ? "Green" : "Red";
                            const modifierText = CommonStringSubstitute(TextGet("SkillModifier"), subst);
                            DrawText(modifierText, 1440, 200 + skillLine * lineHeight, modifierColor, "Gray");
                            skillLine++;
                        }
                    }
                }
            }
        }
        MainCanvas.textAlign = "center";
    }

    function DaysClick() {
        var C = InformationSheetSelection;
        if (MouseIn(1815, 75, 90, 90)) InformationSheetExit();
        if (C.IsPlayer()) {
            if (MouseIn(1815, 190, 90, 90) && !TitleIsForced(TitleGet(C))) CommonSetScreen("Character", "Title");
            if (MouseIn(1815, 305, 90, 90)) CommonSetScreen("Character", "Preference");
            if (MouseIn(1815, 420, 90, 90)) CommonSetScreen("Character", "FriendList");
            if (MouseIn(1815, 535, 90, 90)) OnlineProfileStart("Description");
            if (MouseIn(1715, 535, 90, 90) && C.HasOwnerNotes()) OnlineProfileStart("OwnersNotes");
            if (MouseIn(1815, 800, 90, 90)) InformationSheetSecondScreen = !InformationSheetSecondScreen;
        } else if (C.IsOnline()) {
            if (MouseIn(1815, 190, 90, 90)) OnlineProfileStart("Description");
            if (MouseIn(1715, 190, 90, 90) && (C.HasOwnerNotes() || C.IsFullyOwnedByPlayer())) OnlineProfileStart("OwnersNotes");
            if (MouseIn(1815, 800, 90, 90)) InformationSheetSecondScreen = !InformationSheetSecondScreen;
        }
    }

    function DaysOnly() {
        const C = InformationSheetSelection;
        const CurrentTitle = TitleGet(C);
        DrawCharacter(C, 50, 50, 0.9);
        MainCanvas.textAlign = "left";
        const spacing = 55;
        const spacingLarge = 75;
        let currentY = 125;
        DrawTextFit(TextGet("Name") + " " + C.Name, 550, currentY, 450, "Black", "Gray");
        currentY += spacing;
        if (C.Name !== CharacterNickname(C)) {
            DrawTextFit(TextGet("Nickname") + " " + CharacterNickname(C), 550, currentY, 450, "Black", "Gray");
            currentY += spacing;
        }
        if (C.OnlineSharedSettings.ctitle != undefined){
            if (C.OnlineSharedSettings.ctitle != "") {
                DrawTextFit(TextGet("Title") + " " + C.OnlineSharedSettings.ctitle, 550, currentY, 450, "#0000BF", "Black", "Gray"); 
            } else {
                if (CurrentTitle != "None") {
                    DrawTextFit(TextGet("Title") + " " + TextGet("Title" + CurrentTitle), 550, currentY, 450, TitleIsForced(CurrentTitle) ? "Red" : TitleIsEarned(CurrentTitle) ? "#0000BF" : "Black", "Gray");
                }
            }
        } else {
            if (CurrentTitle != "None") {
                DrawTextFit(TextGet("Title") + " " + TextGet("Title" + CurrentTitle), 550, currentY, 450, TitleIsForced(CurrentTitle) ? "Red" : TitleIsEarned(CurrentTitle) ? "#0000BF" : "Black", "Gray");
            }
        }
        currentY += spacing;
        if (C.MemberNumber != null) {
            DrawTextFit(TextGet("MemberNumber") + " " + C.MemberNumber.toString(), 550, currentY, 450, "Black", "Gray");
            currentY += spacing;
        }
        DrawTextFit(TextGet("Pronouns") + " " + CharacterPronounDescription(C), 550, currentY, 450, "Black", "Gray");
        currentY += spacingLarge;
        if ((C.IsPlayer() || C.IsOnline()) && C.Creation !== null) {
            const clubStayDuration = CommonFormatDurationRange(CurrentTime, C.Creation, {
                showFull: true,
                includeYears: false,
                includeMonths: false,
                includeDays: true
            });
            const memberForLine = TextGet(C.IsBirthday() ? "Birthday" : "MemberFor") + " " + clubStayDuration;
            const joinedDate = new Date(C.Creation).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
            });
            DrawTextFit(memberForLine, 550, currentY, 450, (C.IsBirthday() ? "Blue" : "Black"), "Gray");
            const y = currentY;
            if (MouseIn(550, y - 20, 450, 40))
                DrawHoverElements.push(() => {
                    DrawButtonHover(550, y - 20, 450, 40, joinedDate);
                });
            currentY += spacing;
            if (C.IsPlayer()) {
                let moneyLine = TextGet("Money") + " " + C.Money.toString() + " $";
                DrawTextFit(moneyLine, 550, currentY, 450, "Black", "Gray");
                currentY += spacing;
            }
        } else if (C.IsNpc()) {
            const friendshipDuration = CommonFormatDurationRange(CurrentTime, NPCEventGet(C, "PrivateRoomEntry"), {
                showFull: true,
                includeYears: false,
                includeMonths: false,
                includeDays: true
            });
            let friendsFor = `${TextGet("FriendsFor")} ${friendshipDuration}`;
            const friendshipStartDate = new Date(NPCEventGet(C, "PrivateRoomEntry")).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
            });
            DrawTextFit(friendsFor, 550, currentY, 450, "Black", "Gray");
            const y = currentY;
            if (MouseIn(550, y - 20, 450, 40))
                DrawHoverElements.push(() => {
                    DrawButtonHover(550, y - 20, 450, 40, friendshipStartDate);
                });
            currentY += spacing;
            let relationshipQualifier = "";
            if (C.Love >= 100) relationshipQualifier = "RelationshipPerfect";
            else if (C.Love >= 75) relationshipQualifier = "RelationshipGreat";
            else if (C.Love >= 50) relationshipQualifier = "RelationshipGood";
            else if (C.Love >= 25) relationshipQualifier = "RelationshipFair";
            else if (C.Love > -25) relationshipQualifier = "RelationshipNeutral";
            else if (C.Love > -50) relationshipQualifier = "RelationshipPoor";
            else if (C.Love > -75) relationshipQualifier = "RelationshipBad";
            else if (C.Love > -100) relationshipQualifier = "RelationshipHorrible";
            else relationshipQualifier = "RelationshipAtrocious";
            let loveLine = TextGet("Relationship") + " " + C.Love.toString() + " " + TextGet(relationshipQualifier);
            DrawTextFit(loveLine, 550, currentY, 450, "Black", "Gray");
            currentY += spacing;
        }
        currentY += spacingLarge;
        if (C.IsPlayer() || C.IsOnline()) {
            let difficultyLine = `${TextGet("DifficultyLevel" + C.GetDifficulty())} ${TextGet("DifficultyTitle")}`;
            if (C.IsPlayer()) {
                const MillisecondsPerDay = 86400000;
                const DifficultyChangeMaxDelay = 7;
                const LastChangeTime = typeof C.Difficulty?.LastChange === "number" ? C.Difficulty.LastChange : C.Creation;
                const DaysSinceLastChange = Math.floor((CurrentTime - LastChangeTime) / MillisecondsPerDay);
                const RemainingDays = DaysSinceLastChange >= DifficultyChangeMaxDelay ? 0 : DifficultyChangeMaxDelay - DaysSinceLastChange;
                difficultyLine += TextGet("DifficultyDaysTillCanChange").replace("NumberOfDays", RemainingDays.toString());
            }
            DrawTextFit(difficultyLine, 550, currentY, 450, "Black", "Gray");
            currentY += spacing;
            if (!C.IsOwned()) {
                DrawTextFit(TextGet("Unowned"), 550, currentY, 450, "Black", "Gray");
                currentY += spacing;
            }
            if (C.IsOwned() && C.IsOwned() != "ggts") {
                const stageText = C.IsFullyOwned() ? "Collared" : "Trial";
                const ownerNumber = C.OwnerNumber() !== -1 ? `(${C.OwnerNumber()})` : "";
                const ownerLine = `${TextGet(`${stageText}By`)} ${C.OwnerName()} ${ownerNumber}`;
                const stageDuration = CommonFormatDurationRange(CurrentTime, C.OwnedSinceMs(), {
                    showFull: true,
                    includeYears: false,
                    includeMonths: false,
                    includeDays: true
                });
                const joinedHoverLine = new Date(C.OwnedSinceMs()).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                });
                DrawTextFit(ownerLine, 550, currentY, 450, "Black", "Gray");
                currentY += spacing;
                if (C.OwnedSinceMs() > 0) {
                    DrawTextFit(`${TextGet("For")} ${stageDuration}`, 550, currentY, 450, "Black", "Gray");
                    const y = currentY;
                    if (MouseIn(550, y - 20, 450, 40))
                        DrawHoverElements.push(() => {
                            DrawButtonHover(550, y - 20, 450, 40, joinedHoverLine);
                        });
                    currentY += spacing;
                }
            }
            currentY = 800;
            if (C.IsOnline()) {
                DrawTextFit(TextGet("AllowedInteractions"), 550, currentY, 450, "Black", "Gray");
                currentY += spacing;
                DrawTextFit(TextGet("AllowedInteraction" + C.AllowedInteractions.toString()), 550, currentY, 450, "Black", "Gray");
                currentY += spacing;
            }
        }
        MainCanvas.textAlign = "center";
        DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
        if (C.IsPlayer()) {
            if (!TitleIsForced(CurrentTitle)) DrawButton(1815, 190, 90, 90, "", "White", "Icons/Title.png");
            DrawButton(1815, 305, 90, 90, "", "White", "Icons/Preference.png");
            DrawButton(1815, 420, 90, 90, "", "White", "Icons/FriendList.png");
            DrawButton(1815, 535, 90, 90, "", "White", "Icons/Introduction.png");
            if (C.HasOwnerNotes()) DrawButton(1715, 535, 90, 90, "", "White", "Icons/Management.png");
            if (!window.BCX_Loaded) {
                DrawButton(1815, 765, 90, 90, "", "White", "Icons/Next.png");
            } else {
                DrawButton(1815, 800, 90, 90, "", "White", "Icons/Next.png");
            }
        } else if (C.IsOnline()) {
            DrawButton(1815, 190, 90, 90, "", "White", "Icons/Introduction.png");
            if (C.HasOwnerNotes() || C.IsFullyOwnedByPlayer()) DrawButton(1715, 190, 90, 90, "", "White", "Icons/Management.png");
            if (!window.BCX_Loaded) {
                DrawButton(1815, 765, 90, 90, "", "White", "Icons/Next.png");
            } else {
                DrawButton(1815, 800, 90, 90, "", "White", "Icons/Next.png");
            }
        }
        MainCanvas.textAlign = "left";
        if (InformationSheetSecondScreen) return InformationSheetSecondScreenRun();
        if ((C.IsPlayer() || C.IsOnline()) && C.GetLovership().length > 0) {
            const stageQualifier = Object.freeze({
                0: "Dating",
                1: "Engaged",
                2: "Married",
            });
            DrawText(TextGet("Relationships"), 1200, 125, "Black", "Gray");
            const lovership = C.GetLovership();
            if (lovership.length < 1) DrawText(TextGet("None"), 1200, 200, "Black", "Gray");
            for (let [L, lover] of lovership.entries()) {
                const stageText = stageQualifier[lover.Stage];
                const loverNumber = lover.MemberNumber ? `(${lover.MemberNumber})` : "";
                const relationshipDurationHover = CommonFormatDurationRange(CurrentTime, lover.Start, {
                    showFull: true,
                    includeYears: false,
                    includeMonths: false,
                    includeDays: true
                });
                const stageDurationHover = new Date(lover.Start).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                });
                DrawTextFit(`${TextGet(`${stageText}With`)} ${lover.Name} ${loverNumber}`, 1200, 200 + L * 150, 600, "Black", "Gray");
                DrawTextFit(`${TextGet("For")} ${relationshipDurationHover}`, 1200, 260 + L * 150, 600, "Black", "Gray");
                const hoverY = 260 + L * 150 - 20;
                if (MouseIn(1200, hoverY, 600, 40))
                    DrawHoverElements.push(() => {
                        DrawButtonHover(1200, hoverY, 450, 40, stageDurationHover);
                    });
            }
        } else if (C.IsNpc()) {
            const stageQualifier = Object.freeze({
                0: "Dating",
                1: "Engaged",
                2: "Married",
            });
            const lovership = C.GetLovership();
            const playerLove = lovership.find(l => l.MemberNumber === Player.MemberNumber);
            if (!C.LoverName() && !playerLove) {
                DrawText(`${TextGet("Lover")} ${TextGet("None")}`, 550, currentY, "Black", "Gray");
                currentY += spacing;
            }
            if (playerLove) {
                const stageText = stageQualifier[playerLove.Stage];
                const loverLine = `${TextGet(`${stageText}With`)} ${C.LoverName()}`;
                const relationshipDuration = CommonFormatDurationRange(CurrentTime, playerLove.Start, {
                    showFull: true,
                    includeYears: false,
                    includeMonths: false,
                    includeDays: true
                });
                const stageDurationHover = new Date(playerLove.Start).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                });
                DrawText(loverLine, 550, currentY, "Black", "Gray");
                currentY += spacing;
                DrawText(`${TextGet("For")} ${relationshipDuration}`, 550, currentY, "Black", "Gray");
                const y = currentY - 20;
                if (MouseIn(550, y, 450, 40))
                    DrawHoverElements.push(() => {
                        DrawButtonHover(550, y, 450, 40, stageDurationHover);
                    });
                currentY += spacing;
            }
            if (!C.IsOwned()) {
                DrawText(`${TextGet("Owner")} ${TextGet("None")}`, 550, currentY, "Black", "Gray");
                currentY += spacing;
            } else if (C.IsOwned()) {
                const stageText = C.IsFullyOwned() ? "Collared" : "Trial";
                const ownerLine = `${TextGet(`${stageText}By`)} ${C.OwnerName()}`;
                const ownedDuration = CommonFormatDurationRange(CurrentTime, C.OwnedSinceMs(), {
                    showFull: true,
                    includeYears: false,
                    includeMonths: false,
                    includeDays: true
                });
                const stageLine = `${TextGet(`For`)} ${ownedDuration}`;
                const joinedHoverLine = new Date(C.OwnedSinceMs()).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                });
                DrawText(ownerLine, 550, currentY, "Black", "Gray");
                currentY += spacing;
                DrawText(stageLine, 550, currentY, "Black", "Gray");
                const y = currentY - 20;
                if (MouseIn(550, y, 450, 40))
                    DrawHoverElements.push(() => {
                        DrawButtonHover(550, y, 450, 40, joinedHoverLine);
                    });
                currentY += spacing;
            }
            DrawText(TextGet("Trait"), 1000, 125, "Black", "Gray");
            if (CurrentTime >= NPCEventGet(C, "PrivateRoomEntry") * CheatFactor("AutoShowTraits", 0) + 604800000) {
                let Pos = 0;
                for (let T = 0; T < C.Trait.length; T++)
                    if ((C.Trait[T].Value != null) && (C.Trait[T].Value != 0)) {
                        DrawText(TextGet("Trait" + ((C.Trait[T].Value > 0) ? C.Trait[T].Name : NPCTraitReverse(C.Trait[T].Name))) + " " + ((CurrentTime >= NPCEventGet(C, "PrivateRoomEntry") * CheatFactor("AutoShowTraits", 0) + 1209600000) ? Math.abs(C.Trait[T].Value).toString() : "??"), 1000, 200 + Pos * 75, "Black", "Gray");
                        Pos++;
                    }
            } else DrawText(TextGet("TraitUnknown"), 1000, 200, "Black", "Gray");
        }
        MainCanvas.textAlign = "center";
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
        }, 5000);
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

    //Maid games
    async function MaidCleaning() {
        await CommonSetScreen("Room", "MaidQuarters");
        GameType = "MaidCleaning";
        MaidQuartersMaid.Stage = "400";
    }

    async function MaidDrinks() {
        await CommonSetScreen("Room", "MaidQuarters");
        GameType = "MaidDrinks";
        MaidQuartersMaid.Stage = "200";
    }

    async function MaidRhythm() {
        await CommonSetScreen("Room", "MaidQuarters");
        GameType = "RhythmGame";
        MaidQuartersMaid.Stage = "500";
    }

    //Messages
    function hidetoast1() {
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
        Allcolor = data.allcolor;
        Clothes = data.clothes;
        Invisible = data.invisible;
        Mlock = data.mlock;
        Naked = data.naked;
        Pet = data.pet;
        Randomize = data.randomize;
        Restrain = data.restrain;
        Solidity = data.solidity;
        Tallcolor = data.tallcolor;
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
            Allcolor = "no message";
            Clothes = "no message";
            Invisible = "no message";
            Mlock = "no message";
            Naked = "no message";
            Pet = "no message";
            Randomize = "no message";
            Restrain = "no message";
            Solidity = "no message";
            Tallcolor = "no message";
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
            if (Allcolor == "no message") Allcolor = "";
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
            if (Tallcolor == "no message") Tallcolor = "";
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

    function targetMessage(type, msg, number) {
        if (type != undefined) {
            if (type != "") {
                if (number == 1) {
                    msg = tmpname + ' '.repeat(1) + type;
                    if (type.startsWith("\u0027")) msg = tmpname + type;
                }
                if (number == 2) {
                    msg = tmpname + ' '.repeat(1) + type + ' '.repeat(1) + tgpname;
                    if (type.startsWith("\u0027")) msg = tmpname + type + ' '.repeat(1) + tgpname;
                }
            }
        }
        if (type != "no message") publicmsg(msg);
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
    function AltPrf() {
        let prfscr = AltPreferenceSubscreens;
        const subscreenButtons = prfscr.filter(s => !s.hidden);
        const buttons = ElementCreate({
            tag: "div",
            classList: ["preference-button-grid", "scroll-box"],
            attributes: {
                id: MainSubscreenIDs.grid
            },
            children: subscreenButtons.map((screen) => {
                return ElementButton.Create(`preference-main-${screen.name}`,
                    () => {
                        PreferenceOpenSubscreen(screen.name);
                    }, {
                        image: screen.icon || `Icons/${screen.name}.png`,
                        label: screen.description || TextGet(`Homepage${screen.name}`),
                        labelPosition: "right",
                    });
            }),
        });
        ElementWrap(PreferenceIDs.subscreen).append(buttons);
    }

    const AltPreferenceSubscreens = [{
            name: "Main",
            hidden: true,
            load: () => PreferenceSubscreenMainLoad(),
            run: () => PreferenceSubscreenMainRun(),
            click: () => PreferenceSubscreenMainClick(),
            resize: () => PreferenceSubscreenMainResize(),
            unload: () => PreferenceSubscreenMainUnload(),
            exit: () => PreferenceSubscreenMainExit(),
        },
        {
            name: "General",
            load: () => PreferenceSubscreenGeneralLoad(),
            run: () => PreferenceSubscreenGeneralRun(),
            click: () => PreferenceSubscreenGeneralClick(),
            exit: () => PreferenceSubscreenGeneralExit(),
            unload: () => PreferenceSubscreenGeneralUnload(),
            resize: () => PreferenceSubscreenGeneralResize(),
        },
        {
            name: "Arousal",
            load: () => PreferenceSubscreenArousalLoad(),
            run: () => PreferenceSubscreenArousalRun(),
            click: () => PreferenceSubscreenArousalClick(),
            exit: () => PreferenceSubscreenArousalExit(),
            unload: () => PreferenceSubscreenArousalUnload(),
        },
        {
            name: "Audio",
            load: () => PreferenceSubscreenAudioLoad(),
            run: () => PreferenceSubscreenAudioRun(),
            click: () => PreferenceSubscreenAudioClick(),
            exit: () => PreferenceSubscreenAudioExit(),
            unload: () => PreferenceSubscreenAudioUnload(),
            resize: () => PreferenceSubscreenAudioResize(),
        },
        {
            name: "CensoredWords",
            load: () => PreferenceSubscreenCensoredWordsLoad(),
            run: () => PreferenceSubscreenCensoredWordsRun(),
            click: () => PreferenceSubscreenCensoredWordsClick(),
            exit: () => PreferenceSubscreenCensoredWordsExit(),
            unload: () => PreferenceSubscreenCensoredWordsUnload(),
            resize: () => PreferenceSubscreenCensoredWordsResize(),
        },
        {
            name: "Chat",
            load: () => PreferenceSubscreenChatLoad(),
            run: () => PreferenceSubscreenChatRun(),
            click: () => PreferenceSubscreenChatClick(),
            exit: () => PreferenceSubscreenChatExit(),
            resize: () => PreferenceSubscreenChatResize(),
        },
        {
            name: "Controller",
            load: () => PreferenceSubscreenControllerLoad(),
            run: () => PreferenceSubscreenControllerRun(),
            click: () => PreferenceSubscreenControllerClick(),
            exit: () => PreferenceSubscreenControllerExit(),
            unload: () => PreferenceSubscreenControllerUnload(),
        },
        {
            name: "Difficulty",
            run: () => PreferenceSubscreenDifficultyRun(),
            click: () => PreferenceSubscreenDifficultyClick(),
            exit: () => PreferenceSubscreenDifficultyExit(),
        },
        {
            name: "Extensions",
            load: () => PreferenceSubscreenExtensionsLoad(),
            run: () => PreferenceSubscreenExtensionsRun(),
            click: () => PreferenceSubscreenExtensionsClick(),
            exit: () => PreferenceSubscreenExtensionsExit(),
            unload: () => PreferenceSubscreenExtensionsUnload(),
            resize: () => PreferenceSubscreenExtensionsResize(),
        },
        {
            name: "Gender",
            run: () => PreferenceSubscreenGenderRun(),
            click: () => PreferenceSubscreenGenderClick(),
        },
        {
            name: "Graphics",
            load: () => PreferenceSubscreenGraphicsLoad(),
            run: () => PreferenceSubscreenGraphicsRun(),
            click: () => PreferenceSubscreenGraphicsClick(),
            exit: () => PreferenceSubscreenGraphicsExit(),
            unload: () => PreferenceSubscreenGraphicsUnload(),
        },
        {
            name: "Immersion",
            load: () => PreferenceSubscreenImmersionLoad(),
            run: () => PreferenceSubscreenImmersionRun(),
            click: () => PreferenceSubscreenImmersionClick(),
            resize: () => PreferenceSubscreenImmersionResize(),
        },
        {
            name: "Visibility",
            load: () => PreferenceSubscreenVisibilityLoad(),
            run: () => PreferenceSubscreenVisibilityRun(),
            click: () => PreferenceSubscreenVisibilityClick(),
            exit: () => PreferenceSubscreenVisibilityExit(),
            unload: () => PreferenceSubscreenVisibilityUnload(),
        },
        {
            name: "Keybindings",
            icon: "Icons/Keyboard.png",
            load: () => PreferenceSubscreenKeybindingsLoad(),
            run: () => PreferenceSubscreenKeybindingsRun(),
            click: () => PreferenceSubscreenKeybindingsClick(),
            exit: () => PreferenceSubscreenKeybindingsExit(),
            resize: () => PreferenceSubscreenKeybindingsResize(),
        },
        {
            name: "Notifications",
            load: () => PreferenceSubscreenNotificationsLoad(),
            run: () => PreferenceSubscreenNotificationsRun(),
            click: () => PreferenceSubscreenNotificationsClick(),
            exit: () => PreferenceSubscreenNotificationsExit(),
            unload: () => PreferenceSubscreenNotificationsUnload(),
        },
        {
            name: "Online",
            load: () => PreferenceSubscreenOnlineLoad(),
            run: () => PreferenceSubscreenOnlineRun(),
            click: () => PreferenceSubscreenOnlineClick(),
            resize: () => PreferenceSubscreenOnlineResize(),
        },
        {
            name: "Restriction",
            load: () => PreferenceSubscreenRestrictionLoad(),
            run: () => PreferenceSubscreenRestrictionRun(),
            click: () => PreferenceSubscreenRestrictionClick(),
            resize: () => PreferenceSubscreenRestrictionResize(),
        },
        {
            name: "Scripts",
            load: () => PreferenceSubscreenScriptsLoad(),
            run: () => PreferenceSubscreenScriptsRun(),
            click: () => PreferenceSubscreenScriptsClick(),
            exit: () => PreferenceSubscreenScriptsExit(),
            unload: () => PreferenceSubscreenScriptsUnload(),
        },
        {
            name: "Security",
            load: () => PreferenceSubscreenSecurityLoad(),
            run: () => PreferenceSubscreenSecurityRun(),
            click: () => PreferenceSubscreenSecurityClick(),
            exit: () => PreferenceSubscreenSecurityExit(),
            unload: () => PreferenceSubscreenSecurityUnload(),
            resize: () => PreferenceSubscreenSecurityResize(),
        },
    ];

    function AltPrfChat() {
        let Dropcheck = AltPreferenceSubscreenChatDropdowns;
        const dropdownElements = Object.entries(Dropcheck).map(([key, dropdown]) => {
            const currentValue = dropdown.current();
            const options = dropdown.list.map(( /** @type {string} */ e) => /** @type {Omit<HTMLOptions<"option">, "tag">} */ ({
                attributes: {
                    value: e,
                    label: TextGet(e),
                    selected: e === currentValue
                }
            }));
            return ElementCreate({
                tag: "div",
                classList: ["preference-settings-dropdown"],
                attributes: {
                    id: `${key}-dropdown-container`
                },
                children: [{
                        tag: "label",
                        children: [TextGet(key)],
                        attributes: {
                            for: `${key}-dropdown`
                        },
                    },
                    ElementCreateDropdown(`${key}-dropdown`, options,
                        (ev) => {
                            ev.preventDefault();
                            const value = /** @type {HTMLSelectElement} */ (ev.target).value;
                            if (!value) return;
                            if (!dropdown.list.includes(value)) return;
                            dropdown.onChange(value);
                        })
                ]
            });
        });
        let Boxcheck = AltPreferenceSubscreenChatCheckboxes;
        const checkboxElements = Boxcheck.map((checkbox) => {
            const checked = checkbox.check();
            const label = TextGet(checkbox.label);
            return ElementCheckbox.CreateLabelled(`${checkbox.label}-checkbox`, label, checkbox.click, {
                checked
            });
        });
        const grid = ElementCreate({
            tag: "div",
            classList: ["preference-settings-grid", "scroll-box"],
            attributes: {
                id: PreferenceSubscreenChatIDs.grid
            },
            children: [
                ...dropdownElements,
                ...checkboxElements
            ]
        });
        ElementWrap(PreferenceIDs.subscreen).append(grid);
    }

    /** @type {PreferenceChatCheckboxOption[]} */
    const AltPreferenceSubscreenChatCheckboxes = [{
            label: "OOCAutoClose",
            check: () => Player.ChatSettings.OOCAutoClose,
            click: () => Player.ChatSettings.OOCAutoClose = !Player.ChatSettings.OOCAutoClose
        },
        {
            label: "ColorActions",
            check: () => Player.ChatSettings.ColorActions,
            click: () => Player.ChatSettings.ColorActions = !Player.ChatSettings.ColorActions
        },
        {
            label: "ColorActivities",
            check: () => Player.ChatSettings.ColorActivities,
            click: () => Player.ChatSettings.ColorActivities = !Player.ChatSettings.ColorActivities
        },
        {
            label: "ColorEmotes",
            check: () => Player.ChatSettings.ColorEmotes,
            click: () => Player.ChatSettings.ColorEmotes = !Player.ChatSettings.ColorEmotes
        },
        {
            label: "ColorNames",
            check: () => Player.ChatSettings.ColorNames,
            click: () => Player.ChatSettings.ColorNames = !Player.ChatSettings.ColorNames
        },
        {
            label: "DisableReplies",
            check: () => Player.ChatSettings.DisableReplies,
            click: () => Player.ChatSettings.DisableReplies = !Player.ChatSettings.DisableReplies
        },
        {
            label: "DisplayTimestamps",
            check: () => Player.ChatSettings.DisplayTimestamps,
            click: () => Player.ChatSettings.DisplayTimestamps = !Player.ChatSettings.DisplayTimestamps
        },
        {
            label: "PreserveChat",
            check: () => Player.ChatSettings.PreserveChat,
            click: () => {
                Player.ChatSettings.PreserveChat = !Player.ChatSettings.PreserveChat;
                const roomSeps = /** @type {HTMLDivElement[]} */ (Array.from(document.querySelectorAll("#TextAreaChatLog .chat-room-sep")));
                if (Player.ChatSettings.PreserveChat) {
                    roomSeps.forEach(e => e.toggleAttribute("hidden", false));
                }
            }
        },
        {
            label: "PreserveWhitespace",
            check: () => Player.ChatSettings.WhiteSpace == "Preserve",
            click: () => Player.ChatSettings.WhiteSpace = Player.ChatSettings.WhiteSpace == "Preserve" ? "" : "Preserve"
        },
        {
            label: "ShowAutomaticMessages",
            check: () => Player.ChatSettings.ShowAutomaticMessages,
            click: () => Player.ChatSettings.ShowAutomaticMessages = !Player.ChatSettings.ShowAutomaticMessages
        },
        {
            label: "ShowBeepChat",
            check: () => Player.ChatSettings.ShowBeepChat,
            click: () => Player.ChatSettings.ShowBeepChat = !Player.ChatSettings.ShowBeepChat
        },
        {
            label: "ShowFriendRequestMessages",
            check: () => Player.ChatSettings.ShowFriendRequestMessages,
            click: () => Player.ChatSettings.ShowFriendRequestMessages = !Player.ChatSettings.ShowFriendRequestMessages
        },
        {
            label: "ShowChatRoomHelp",
            check: () => Player.ChatSettings.ShowChatHelp,
            click: () => Player.ChatSettings.ShowChatHelp = !Player.ChatSettings.ShowChatHelp
        },
        {
            label: "ShowActivities",
            check: () => Player.ChatSettings.ShowActivities,
            click: () => Player.ChatSettings.ShowActivities = !Player.ChatSettings.ShowActivities
        },
        {
            label: "ShrinkNonDialogue",
            check: () => Player.ChatSettings.ShrinkNonDialogue,
            click: () => Player.ChatSettings.ShrinkNonDialogue = !Player.ChatSettings.ShrinkNonDialogue
        },
        {
            label: "MuStylePoses",
            check: () => Player.ChatSettings.MuStylePoses,
            click: () => Player.ChatSettings.MuStylePoses = !Player.ChatSettings.MuStylePoses
        },
    ];

    /** @type {Record<string, PreferenceChatDropdownOption>} */
    const AltPreferenceSubscreenChatDropdowns = {
        DisplayMemberNumbers: {
            list: [...PreferenceChatMemberNumbersList],
            current: () => Player.ChatSettings.MemberNumbers,
            onChange: (value) => {
                Player.ChatSettings.MemberNumbers = /** @type {ChatMemberNumbersType} */ (value);
            },
        },
        EnterLeaveStyle: {
            list: [...PreferenceChatEnterLeaveList],
            current: () => Player.ChatSettings.EnterLeave,
            onChange: (value) => {
                Player.ChatSettings.EnterLeave = /** @type {ChatEnterLeaveType} */ (value);
            },
        },
        FontSize: {
            list: [...PreferenceChatFontSizeList],
            current: () => Player.ChatSettings.FontSize,
            onChange: (value) => {
                Player.ChatSettings.FontSize = /** @type {ChatFontSizeType} */ (value);
                ChatRoomRefreshFontSize();
            },
        },
        ColorTheme: {
            list: [...PreferenceChatColorThemeList],
            current: () => Player.ChatSettings.ColorTheme,
            onChange: (value) => {
                Player.ChatSettings.ColorTheme = /** @type {ChatColorThemeType} */ (value);
            },
        },
    };

    function AltPrfGeneral() {
        const colorInput = ElementCreateInput(PreferenceSubscreenGeneralIDs.colorInput, "text", Player.LabelColor);
        colorInput.addEventListener("input", function() {
            PreferenceSubscreenGeneralColorInput(this);
        });
        PreferenceSubscreenGeneralColorInput(colorInput);
        const colorInputGroup = ElementCreate({
            tag: "label",
            children: [
                TextGet("CharacterLabelColor"),
                colorInput,
                ElementButton.Create(PreferenceSubscreenGeneralIDs.colorPickerToggle,
                    () => PreferenceSubscreenGeneralColorPickerToggle(), {
                        image: "Icons/Color.png",
                        tooltip: TextGet("ToggleColorPicker")
                    }
                ),
            ],
            attributes: {
                for: PreferenceSubscreenGeneralIDs.colorInput
            },
        });
        const dropdownOptions = Object.values(AllowedInteractions)
            .map((e) => /** @type {Omit<HTMLOptions<"option">, "tag">} */ ({
                attributes: {
                    value: e.toString(),
                    label: TextGet("AllowedInteraction" + e.toString()),
                    selected: e === Player.AllowedInteractions
                }
            }));
        const dropdown = ElementCreate({
            tag: "div",
            classList: ["preference-settings-dropdown"],
            attributes: {
                id: "AllowedInteractions-dropdown-container"
            },
            children: [{
                    tag: "label",
                    children: [TextGet("AllowedInteractions")],
                    attributes: {
                        for: "AllowedInteractions-dropdown"
                    },
                },
                ElementCreateDropdown("AllowedInteractions-dropdown", dropdownOptions, function(ev) {
                    ev.preventDefault();
                    if (this.value in Object.values(AllowedInteractions) === false) return;
                    Player.AllowedInteractions = /** @type {AllowedInteractions} */ (CommonParseInt(this.value));
                    if (Player.GetDifficulty() >= Difficulty.EXTREME) LoginExtremeItemSettings(Player.AllowedInteractions === AllowedInteractions.Everyone);
                })
            ]
        });
        const onHighDifficulty = Player.GetDifficulty() >= Difficulty.HARDCORE;
        const checkboxes = AltPreferenceSubscreenGeneralCheckboxes.map((checkbox) => {
            return ElementCheckbox.CreateLabelled(
                `preference-immersion-${checkbox.label}`,
                TextGet(checkbox.label),
                function() {
                    const value = this.checked;
                    checkbox.click(value);
                }, {
                    checked: checkbox.check(),
                    disabled: checkbox.disabled?.(onHighDifficulty)
                });
        });
        ElementCreate({
            tag: "div",
            classList: ["preference-settings-grid", "scroll-box"],
            attributes: {
                id: PreferenceSubscreenGeneralIDs.grid
            },
            children: [
                colorInputGroup,
                dropdown,
                onHighDifficulty ? {
                    tag: 'span',
                    attributes: {
                        id: PreferenceSubscreenGeneralIDs.generalHardcoreWarning
                    },
                    children: [TextGet("GeneralHardcoreWarning")],
                } : undefined,
                ...checkboxes
            ],
            parent: ElementWrap(PreferenceIDs.subscreen)
        });
    }

    /** @type {{label: string, check: () => boolean, click: (value: boolean) => void, disabled?: (disableButtons: boolean) => boolean}[]} */
    const AltPreferenceSubscreenGeneralCheckboxes = [{
            label: "EnableSafeword",
            check: () => Player.GameplaySettings.EnableSafeword,
            click: () => {
                const canToggle = !Player.IsRestrained() && !Player.IsChaste();
                const enabled = Player.GameplaySettings.EnableSafeword;
                if (canToggle || enabled) {
                    if (PreferenceSafewordConfirm) {
                        Player.GameplaySettings.EnableSafeword = !enabled;
                        PreferenceSafewordConfirm = false;
                    } else {
                        PreferenceSafewordConfirm = true;
                    }
                }
                const checkbox = /** @type {HTMLInputElement} */ (ElementWrap("preference-immersion-EnableSafeword"));
                checkbox.checked = Player.GameplaySettings.EnableSafeword;
                const label = TextGet(PreferenceSafewordConfirm ? "ConfirmSafeword" : "EnableSafeword");
                ElementWrap("preference-immersion-EnableSafeword-label").textContent = label;
            },
            disabled: (onHighDifficulty) => onHighDifficulty
        },
        {
            label: "OfflineLockedRestrained",
            check: () => Player.GameplaySettings.OfflineLockedRestrained,
            click: (value) => Player.GameplaySettings.OfflineLockedRestrained = value,
            disabled: (onHighDifficulty) => onHighDifficulty
        },
        {
            label: "ForceFullHeight",
            check: () => Player.VisualSettings.ForceFullHeight,
            click: (value) => Player.VisualSettings.ForceFullHeight = value,
        },
        {
            label: "ItemsAffectExpressions",
            check: () => Player.OnlineSharedSettings.ItemsAffectExpressions,
            click: (value) => Player.OnlineSharedSettings.ItemsAffectExpressions = value,
        },
        {
            label: "DisablePickingLocksOnSelf",
            check: () => Player.OnlineSharedSettings.DisablePickingLocksOnSelf,
            click: (value) => Player.OnlineSharedSettings.DisablePickingLocksOnSelf = value,
        },
        {
            label: "DisableAutoMaid",
            check: () => !Player.GameplaySettings.DisableAutoMaid,
            click: (value) => Player.GameplaySettings.DisableAutoMaid = !value,
            disabled: (onHighDifficulty) => onHighDifficulty
        }
    ];

    function AltPrfImmersion() {
        const difficultyTooHigh = Player.GetDifficulty() > 2;
        const disableButtons = difficultyTooHigh || (Player.GameplaySettings.ImmersionLockSetting && Player.IsRestrained());
        const disableCheckbox = ElementCheckbox.CreateLabelled(
            PreferenceSubscreenImmersionIDs.lockCheckbox,
            difficultyTooHigh ? TextGet("ImmersionLocked") : TextGet("ImmersionLockSetting"),
            function() {
                const value = this.checked;
                Player.GameplaySettings.ImmersionLockSetting = value;
                PreferenceSubscreenImmersionCheckStates(disableButtons);
            }, {
                checked: Player.GameplaySettings.ImmersionLockSetting,
                disabled: disableButtons,
            }
        );
        const options = PreferenceSettingsSensDepList.map((e) => /** @type {Omit<HTMLOptions<"option">, "tag">} */ ({
            attributes: {
                value: e,
                label: TextGet(e),
                selected: e === Player.GameplaySettings.SensDepChatLog
            }
        }));
        const sensDepDropdown = ElementCreate({
            tag: "div",
            classList: ["preference-settings-dropdown"],
            attributes: {
                id: `SensDepSetting-dropdown-container`
            },
            children: [{
                    tag: "label",
                    children: [TextGet("SensDepSetting")],
                    attributes: {
                        for: "SensDepSetting-dropdown"
                    },
                },
                ElementCreateDropdown(`SensDepSetting-dropdown`, options,
                    function() {
                        const value = /** @type {SettingsSensDepName} */ (this.value);
                        if (!value) return;
                        if (!PreferenceSettingsSensDepList.includes(value)) return;
                        Player.GameplaySettings.SensDepChatLog = value;
                        if (Player.GameplaySettings.SensDepChatLog === "SensDepExtreme") ChatRoomSetTarget(-1);
                        PreferenceSubscreenImmersionCheckStates(disableButtons);
                    }, {
                        disabled: disableButtons
                    })
            ]
        });
        let Boxcheck3 = AltPreferenceSubscreenImmersionCheckboxes;
        const otherCheckboxes = Boxcheck3.map((checkbox) => {
            return ElementCheckbox.CreateLabelled(
                `preference-immersion-${checkbox.label}`,
                TextGet(checkbox.label),
                function() {
                    const value = this.checked;
                    checkbox.click(value);
                    PreferenceSubscreenImmersionCheckStates(disableButtons);
                }, {
                    checked: checkbox.check(),
                    disabled: checkbox.disabled(disableButtons)
                });
        });
        ElementCreate({
            tag: "div",
            attributes: {
                id: PreferenceSubscreenImmersionIDs.wrapper
            },
            children: [
                disableCheckbox,
                {
                    tag: "hr",
                    classList: ["preference-settings-divider"]
                },
                {
                    tag: "div",
                    classList: ["preference-settings-grid", "scroll-box"],
                    attributes: {
                        id: PreferenceSubscreenImmersionIDs.grid
                    },
                    children: [
                        sensDepDropdown,
                        ...otherCheckboxes
                    ],
                }
            ],
            parent: ElementWrap(PreferenceIDs.subscreen)
        });
    }

    /** @type {PreferenceChatCheckboxOption[]} */
    const AltPreferenceSubscreenImmersionCheckboxes = [{
            label: "AllowTints",
            check: () => Player.ImmersionSettings.AllowTints,
            click: (value) => Player.ImmersionSettings.AllowTints = value,
            disabled: (disableButtons) => disableButtons
        },
        {
            label: "ChatRoomMapLeaveOnExit",
            check: () => Player.ImmersionSettings.ChatRoomMapLeaveOnExit,
            click: (value) => Player.ImmersionSettings.ChatRoomMapLeaveOnExit = value,
            disabled: (disableButtons) => disableButtons
        },
        {
            label: "BlindDisableExamine",
            check: () => (Player.GameplaySettings.BlindDisableExamine && Player.GameplaySettings.SensDepChatLog !== "SensDepLight") || Player.GameplaySettings.SensDepChatLog === "SensDepExtreme",
            click: (value) => Player.GameplaySettings.BlindDisableExamine = value,
            disabled: (disableButtons) => disableButtons || Player.GameplaySettings.SensDepChatLog === "SensDepLight" || Player.GameplaySettings.SensDepChatLog === "SensDepExtreme"
        },
        {
            label: "StimulationEvents",
            check: () => Player.ImmersionSettings.StimulationEvents,
            click: (value) => Player.ImmersionSettings.StimulationEvents = value,
            disabled: (disableButtons) => disableButtons
        },
        {
            label: "ChatRoomMuffle",
            check: () => Player.ImmersionSettings.ChatRoomMuffle,
            click: (value) => Player.ImmersionSettings.ChatRoomMuffle = value,
            disabled: (disableButtons) => disableButtons
        },
        {
            label: "BlindAdjacent",
            check: () => Player.ImmersionSettings.BlindAdjacent,
            click: (value) => Player.ImmersionSettings.BlindAdjacent = value,
            disabled: (disableButtons) => disableButtons
        },
        {
            label: "SenseDepMessages",
            check: () => Player.GameplaySettings.SensDepChatLog !== "SensDepLight" && Player.ImmersionSettings.SenseDepMessages,
            click: (value) => Player.ImmersionSettings.SenseDepMessages = value,
            disabled: (disableButtons) => Player.GameplaySettings.SensDepChatLog === "SensDepLight" || disableButtons
        },
        {
            label: "DisableAutoRemoveLogin",
            check: () => Player.GameplaySettings.DisableAutoRemoveLogin,
            click: (value) => Player.GameplaySettings.DisableAutoRemoveLogin = value,
            disabled: (disableButtons) => disableButtons
        },
        {
            label: "AllowPlayerLeashing",
            check: () => Player.OnlineSharedSettings.AllowPlayerLeashing,
            click: (value) => Player.OnlineSharedSettings.AllowPlayerLeashing = value,
            disabled: (disableButtons) => disableButtons
        },
        {
            label: "ReturnToChatRoom",
            check: () => Player.ImmersionSettings.ReturnToChatRoom,
            click: (value) => Player.ImmersionSettings.ReturnToChatRoom = value,
            disabled: (disableButtons) => disableButtons
        },
        {
            label: "ReturnToChatRoomAdmin",
            check: () => Player.ImmersionSettings.ReturnToChatRoom && Player.ImmersionSettings.ReturnToChatRoomAdmin,
            click: (value) => Player.ImmersionSettings.ReturnToChatRoomAdmin = value,
            disabled: (disableButtons) => !Player.ImmersionSettings.ReturnToChatRoom || disableButtons
        },
        {
            label: "ShowUngarbledMessages",
            check: () => Player.ImmersionSettings.ShowUngarbledMessages,
            click: (value) => Player.ImmersionSettings.ShowUngarbledMessages = value,
            disabled: (disableButtons) => disableButtons
        },
        {
            label: "AllowRename",
            check: () => Player.OnlineSharedSettings.AllowRename,
            click: (value) => Player.OnlineSharedSettings.AllowRename = value,
            disabled: (disableButtons) => disableButtons || !CharacterCanChangeNickname(Player)
        },
    ];

    function AltPrfOnline() {
        if (!PreferenceOnlineDefaultBackground) PreferenceOnlineDefaultBackground = Player.OnlineSettings.DefaultChatRoomBackground;
        PreferenceOnlineDefaultBackgroundList = BackgroundsGenerateList(BackgroundsTagList);
        PreferenceOnlineDefaultBackgroundIndex = PreferenceOnlineDefaultBackgroundList.indexOf(PreferenceOnlineDefaultBackground);
        let Boxcheck2 = AltPreferenceSubscreenOnlineCheckboxes;
        const checkboxElements = Boxcheck2.map((checkbox) => {
            const checked = checkbox.check();
            const label = TextGet(checkbox.label);
            return ElementCheckbox.CreateLabelled(`${checkbox.label}-checkbox`, label, checkbox.click, {
                checked
            });
        });
        const dropdownOptions = [0, 1, 2, 3].map((e) => /** @type {Omit<HTMLOptions<"option">, "tag">} */ ({
            attributes: {
                value: e.toString(),
                label: TextGet("RoomCustomizationLevel" + e.toString()),
                selected: e === Player.OnlineSettings.ShowRoomCustomization
            }
        }));
        const dropdown = ElementCreate({
            tag: "div",
            classList: ["preference-settings-dropdown"],
            attributes: {
                id: `RoomCustomizationLevel-dropdown-container`
            },
            children: [{
                    tag: "label",
                    children: [TextGet("RoomCustomizationLabel")],
                    attributes: {
                        for: "RoomCustomizationLevel"
                    },
                },
                ElementCreateDropdown("RoomCustomizationLevel", dropdownOptions, (ev) => {
                    ev.preventDefault();
                    const value = parseInt( /** @type {HTMLSelectElement} */ (ev.target).value);
                    if (!value) return;
                    Player.OnlineSettings.ShowRoomCustomization = /** @type {0 | 1 | 2 | 3} */ (value);
                })
            ]
        });
        const grid = ElementCreate({
            tag: "div",
            classList: ["preference-settings-grid", "scroll-box"],
            attributes: {
                id: PreferenceSubscreenOnlineIDs.grid
            },
            children: [
                dropdown,
                ...checkboxElements
            ]
        });
        ElementWrap(PreferenceIDs.subscreen).append(grid);
        const subtitle = ElementCreate({
            tag: "label",
            attributes: {
                id: PreferenceSubscreenOnlineIDs.subtitle,
                for: PreferenceSubscreenOnlineIDs.selection
            },
            children: [TextGet("DefaultChatRoomBackground")],
        });
        const selection = ElementButton.Create(PreferenceSubscreenOnlineIDs.selection, () => {
            BackgroundSelectionMake(BackgroundsTagList, PreferenceOnlineDefaultBackground, (Name, setBackground) => {
                if (setBackground) {
                    PreferenceOnlineDefaultBackground = Name;
                    Player.OnlineSettings.DefaultChatRoomBackground = Name;
                    PreferenceOnlineDefaultBackgroundIndex = PreferenceOnlineDefaultBackgroundList.indexOf(PreferenceOnlineDefaultBackground);
                }
                PreferenceOpenSubscreen("Online", 2);
            });
        }, {
            image: "Icons/Preference.png",
        });
        const grid2 = ElementCreate({
            tag: "div",
            classList: ["preference-settings-grid", "scroll-box"],
            attributes: {
                id: PreferenceSubscreenOnlineIDs.grid2
            },
            children: [
                subtitle,
                selection
            ]
        });
        ElementWrap(PreferenceIDs.subscreen).append(grid2);
    }

    /** @type {PreferenceChatCheckboxOption[]} */
    const AltPreferenceSubscreenOnlineCheckboxes = [{
            label: "AllowFullWardrobeAccess",
            check: () => Player.OnlineSharedSettings.AllowFullWardrobeAccess,
            click: () => Player.OnlineSharedSettings.AllowFullWardrobeAccess = !Player.OnlineSharedSettings.AllowFullWardrobeAccess
        },
        {
            label: "AutoBanBlackList",
            check: () => Player.OnlineSettings.AutoBanBlackList,
            click: () => Player.OnlineSettings.AutoBanBlackList = !Player.OnlineSettings.AutoBanBlackList
        },
        {
            label: "AutoBanGhostList",
            check: () => Player.OnlineSettings.AutoBanGhostList,
            click: () => Player.OnlineSettings.AutoBanGhostList = !Player.OnlineSettings.AutoBanGhostList
        },
        {
            label: "DisableAnimations",
            check: () => Player.OnlineSettings.DisableAnimations,
            click: () => Player.OnlineSettings.DisableAnimations = !Player.OnlineSettings.DisableAnimations
        },
        {
            label: "BlockBodyCosplay",
            check: () => Player.OnlineSharedSettings.BlockBodyCosplay,
            click: () => Player.OnlineSharedSettings.BlockBodyCosplay = !Player.OnlineSharedSettings.BlockBodyCosplay
        },
        {
            label: "SendStatus",
            check: () => Player.OnlineSettings.SendStatus,
            click: () => Player.OnlineSettings.SendStatus = !Player.OnlineSettings.SendStatus
        },
        {
            label: "EnableAfkTimer",
            check: () => Player.OnlineSettings.EnableAfkTimer,
            click: () => {
                Player.OnlineSettings.EnableAfkTimer = !Player.OnlineSettings.EnableAfkTimer;
                AfkTimerSetEnabled(Player.OnlineSettings.EnableAfkTimer);
            }
        },
        {
            label: "ShowStatus",
            check: () => Player.OnlineSettings.ShowStatus,
            click: () => Player.OnlineSettings.ShowStatus = !Player.OnlineSettings.ShowStatus
        },
    ];

    function DOGSsettings() {
        dogsforbid = false;
        if (dogsforced == false) {
            M_MOANER_saveControls();
            return;
        }
        if (dogsforced == true) {
            let DOGS = Player.ExtensionSettings.DOGS;
            if (DOGS) {
                let DOGSdata = JSON.parse(LZString.decompressFromBase64(DOGS));
                for (let A = 0; A < Player.Appearance.length; A++)
                    if ((Player.Appearance[A].Property != null) &&
                        (Player.Appearance[A].Property.LockedBy == "ExclusivePadlock") &&
                        (Player.Appearance[A].Property.Name == "DeviousPadlock")) {
                        let groupName = Player.Appearance[A].Asset.Group.Name;
                        let hasGroup = !!DOGSdata?.deviousPadlock?.itemGroups?.[groupName];
                        if (hasGroup == true) {
                            Player.UBC.ubcSettings.noescape = true;
                            noescape = true;
                            dogsforbid = true;					
                            Player.OnlineSharedSettings.Unoescape = true;
                            ServerAccountUpdate.QueueData({
                                OnlineSharedSettings: Player.OnlineSharedSettings
                            });
                            if (unrestrict == 2) {
                                Player.UBC.ubcSettings.utotal = false;
                                unrestrict = 0;
                                Player.CanInteract = function() {
                                    return !this.HasEffect("Block");
                                };
                                Player.CanTalk = function() {
                                    const GagEffect = SpeechTransformGagGarbleIntensity(this);
                                    return (GagEffect <= 0);
                                };
                            }
                        } else {
                            Player.UBC.ubcSettings.noescape = false;
                            noescape = false;
                        }
                    }
            }
            M_MOANER_saveControls();
        }
    }

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

    function UBCrpsk() {
        rpabdl = ReputationGet("ABDL");
        rpasyl = ReputationGet("Asylum");
        rpgamb = ReputationGet("Gambling");
        rpgame = ReputationGet("Gaming");
        rpkidn = ReputationGet("Kidnap");
        rplarp = ReputationGet("LARP");
        if (ReputationGet("HouseAmplector") != 0) rpmagh = 1;
        if (ReputationGet("HouseCorporis") != 0) rpmagh = 2;
        if (ReputationGet("HouseMaiestas") != 0) rpmagh = 3;
        if (ReputationGet("HouseVincula") != 0) rpmagh = 4;
        let house = "";
        if (rpmagh == 1) house = "HouseAmplector";
        if (rpmagh == 2) house = "HouseCorporis";
        if (rpmagh == 3) house = "HouseMaiestas";
        if (rpmagh == 4) house = "HouseVincula";
        rpmagp = ReputationGet(house);
        rpmaid = ReputationGet("Maid");
        rpmain = ReputationGet("Dominant");
        skbondage = SkillGetLevel(Player, "Bondage") - SkillGetModifier(Player, "Bondage");
        skdressage = SkillGetLevel(Player, "Dressage") - SkillGetModifier(Player, "Dressage");
        skevasion = SkillGetLevel(Player, "Evasion") - SkillGetModifier(Player, "Evasion");
        skinfiltration = SkillGetLevel(Player, "Infiltration") - SkillGetModifier(Player, "Infiltration");
        sklockpicking = SkillGetLevel(Player, "LockPicking") - SkillGetModifier(Player, "LockPicking");
        skselfbondage = SkillGetLevel(Player, "SelfBondage") - SkillGetModifier(Player, "SelfBondage");
        skwillpower = SkillGetLevel(Player, "Willpower") - SkillGetModifier(Player, "Willpower");
    }

    function UBCsettings() {
        Player.OnlineSharedSettings.UBC = UBCver;
		Player.OnlineSharedSettings.ctitle = ctitle;
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
        UBCrpsk();
    }

    //Room Connections
    function IsMapRoom() {
        if ((ChatRoomData.MapData == null) || (ChatRoomData.MapData.Type == null) || (ChatRoomData.MapData.Type == "Never")) {
            return false;
        } else {
            return true;
        }
    }

    function RoomToGame() {
        ServerSend("ChatRoomLeave", "");
        ChatRoomSetLastChatRoom("");
        OnlineGameName = "";
        ChatSearchGame = "";
        ChatRoomData = null;
        ChatRoomClearAllElements();
    }

    function RoomToOut() {
        ChatRoomSetLastChatRoom("");
        document.getElementById("InputChat").style.display = "none";
        document.getElementById("TextAreaChatLog").style.display = "none";
        ChatRoomHideElements();
    }

    //Room Info
    function keysinfo(Player) {
        const keys = [];
        if (Player.MapData.PrivateState.HasKeyGold) keys.push("Gold");
        if (Player.MapData.PrivateState.HasKeySilver) keys.push("Silver");
        if (Player.MapData.PrivateState.HasKeyBronze) keys.push("Bronze");
        ChatRoomSendLocal(`Keys found: ${keys.join(" - ") || "None"}.`);
    }

    function UBCinfo(character, command) {
        const name = character.Nickname || character.Name;
        const aka = character.Nickname ? character.Name : "";
        const number = character.MemberNumber;
        ChatRoomSendLocal(`${name}${aka ? " (" + aka + ")" : ""} - ${number}`);
        let ubc1 = "Does not use ULTRAbc.";
        let ubc2 = "Does not use Uwall.";
        const shared = character.OnlineSharedSettings || {};
        if (shared.UBC === UBCver || shared.UBC === UBCver0) {
            ubc1 = "Is an ULTRAbc user.";
            if (shared.Unoescape === true) {
                ubc1 = "UBC in no-escape mode";
            }
        }
        if (typeof shared.Uwall === "boolean") {
            ubc2 = shared.Uwall ? "Ha activado Uwall." : "Ha desactivado Uwall.";
        }
        ChatRoomSendLocal(`${ubc1} - ${ubc2}`);
        if (command == "uroom") ChatRoomSendLocal(" ");
    }

    //Stable
    async function StableCarrot() {
        await CommonSetScreen("Room", "Stable");
        StableDressPonyStart();
        StableWearPonyEquipment(Player);
        MiniGameStart("HorseWalk", "Carrot", "StablePlayerTrainingCarrotsEnd");
    }

    async function StableHurdle() {
        await CommonSetScreen("Room", "Stable");
        StableDressPonyStart();
        StableWearPonyEquipment(Player);
        MiniGameStart("HorseWalk", "Hurdle", "StablePlayerTrainingHurdlesEnd");
    }

    function StablePonyEnd() {
        gamestable = false;
        M_MOANER_saveControls();
        CommonSetScreen("Room", "Stable");
        CharacterSetCurrent(StableTrainer);
        StableTrainer.Stage = "StableTrainingRunOut";
        StablePlayerTrainingLessons = 6;
    }

    async function StableTraining() {
        await CommonSetScreen("Room", "Stable");
        StablePlayerAppearance = Player.Appearance.slice();
        StableWearTrainerEquipment(Player);
        MiniGameStart("HorseWalk", "HurdleTraining", "StablePonyTrainingHurdlesEnd");
    }

    async function StableWhip() {
        await CommonSetScreen("Room", "Stable");
        StablePlayerAppearance = Player.Appearance.slice();
        StableWearTrainerEquipment(Player);
        MiniGameStart("HorseWalk", "WhipPony", "StableTrainerWhipEnd");
    }

    //Talking
	function IsBcxWhisperAllowed(target) {
        const str = Player.ExtensionSettings.BCX;
        if (!str || !/^[0-9]+:/.test(str)) return true;
        const parts = str.split(":");
        const saveVersion = Number.parseInt(parts[0], 10);
        if (saveVersion !== 2 || parts.length !== 3) return true;
        const decoded = JSON.parse(LZString.decompressFromBase64(parts[1]));
        const rules = decoded?.conditions?.rules?.conditions?.speech_restrict_whisper_send;
        if (!rules?.active || rules.data?.enforce === false) return true;
        let wh1 = 0;
        let bcxlist = [];
        let reglist = [];
        let r1 = 0;
        let r2 = 0;
        let r3 = 0;
        let r4 = 0;   
        let ror = 0;   
        let rg1 = 0;
        let rg2 = 0;
        let rg3 = 0;
        let rg4 = 0;
        const ownershipMember = (Player.Ownership && !Player.Ownership.Name.startsWith("NPC")) 
            ? [Player.Ownership.MemberNumber] 
            : [];
        const lovers = Player.Lovership
            .filter(person => !person.Name.startsWith("NPC"))
            .map(person => person.MemberNumber); 
        let regor = rules?.requirements?.orLogic;     
        let reg1 = rules?.requirements?.room?.type;
        let reg2 = rules?.requirements?.roomName?.name;
        let reg3 = rules?.requirements?.role?.role;
        let reg4 = rules?.requirements?.player?.memberNumber;
        if (!reg1 && !reg2 && !reg3 && !reg4) wh1 = 1;
        if (wh1 == 0) {
            if (regor) ror = 1;
            if (reg1) r1 = 1;
            if (reg2) r2 = 1;
            if (reg3) r3 = 1;
            if (reg4) r4 = 1;
        }
        if ((r1 == 1) && (wh1 == 0)) {
            let room = ChatRoomData.Private;
            let rtype = "public"
            if (room == true) rtype = "private";
            if (rtype == reg1) {
                if (ror == 1) wh1 = 1;
                rg1 = 1;
            }
        }
        if ((r2 == 1) && (wh1 == 0)) {
            let rname = ChatRoomData.Name;
            if (rname == reg2) {
                if (ror == 1) wh1 = 1;
                rg2 = 1;
            }
        }
        if ((r3 == 1) && (wh1 == 0)) { 
            let check = 0;
            switch (reg3) {
                case 1:
                    reglist = ownershipMember;
                    break;
                case 2:
                    reglist = (decoded.owners || []).concat(ownershipMember);
                    break;
                case 3:
                    reglist = lovers.concat((decoded.owners || []).concat(ownershipMember));
                    break;
                case 4:
                    reglist = (decoded.mistresses || []).concat(lovers.concat((decoded.owners || []).concat(ownershipMember)));
                    break;
                case 5:
                    reglist = (Player.WhiteList || []).concat((decoded.mistresses || []).concat(lovers.concat((decoded.owners || []).concat(ownershipMember))));
                     break;
                 case 6:
                     reglist = (Player.FriendList || []).concat((Player.WhiteList || []).concat((decoded.mistresses || []).concat(lovers.concat((decoded.owners || []).concat(ownershipMember)))));
                     break;
                 case 7:
                     check = 1;
                     break;
             }
             let rplay = ChatRoomCharacter; 
             ChatRoomCharacter.forEach(character => {                
				 let rnumber = character.MemberNumber;
                 if (reglist.includes(rnumber)) check = 1;
             });
             if (check == 1) {
                 if (ror == 1) wh1 = 1;
                 rg3 = 1;
             }
        }
        if ((r4 == 1) && (wh1 == 0)) { 
             let check = 0;
             let rplay = ChatRoomCharacter;   
             ChatRoomCharacter.forEach(character => {
                 let rnumber = character.MemberNumber;
                 if (rnumber == reg4) check = 1;
             });
             if (check == 1) {
                 if (ror == 1) wh1 = 1;
                 rg4 = 1;
             }
        }
        if (ror == 0) {
             if ((r1 == 1) && (rg1 == 1) && (r2 == 0) && (r3 == 0) && (r4 == 0)) wh1 = 1;
             if ((r2 == 1) && (rg2 == 1) && (r1 == 0) && (r3 == 0) && (r4 == 0)) wh1 = 1;
             if ((r3 == 1) && (rg3 == 1) && (r1 == 0) && (r2 == 0) && (r4 == 0)) wh1 = 1;
             if ((r4 == 1) && (rg4 == 1) && (r1 == 0) && (r2 == 0) && (r3 == 0)) wh1 = 1;
             if ((r1 == 1) && (rg1 == 1) && (r2 == 1) && (rg2 == 1) && (r3 == 0) && (r4 == 0)) wh1 = 1;
             if ((r1 == 1) && (rg1 == 1) && (r3 == 1) && (rg3 == 1) && (r2 == 0) && (r4 == 0)) wh1 = 1;
             if ((r1 == 1) && (rg1 == 1) && (r4 == 1) && (rg4 == 1) && (r2 == 0) && (r3 == 0)) wh1 = 1;
             if ((r2 == 1) && (rg2 == 1) && (r3 == 1) && (rg3 == 1) && (r1 == 0) && (r4 == 0)) wh1 = 1;
             if ((r2 == 1) && (rg2 == 1) && (r4 == 1) && (rg4 == 1) && (r1 == 0) && (r3 == 0)) wh1 = 1;
             if ((r3 == 1) && (rg3 == 1) && (r4 == 1) && (rg4 == 1) && (r1 == 0) && (r2 == 0)) wh1 = 1;
             if ((r1 == 1) && (rg1 == 1) && (r2 == 1) && (rg2 == 1) && (r3 == 1) && (rg3 == 1) && (r4 == 0)) wh1 = 1;
             if ((r1 == 1) && (rg1 == 1) && (r3 == 1) && (rg3 == 1) && (r4 == 1) && (rg4 == 1) && (r2 == 0)) wh1 = 1;
             if ((r2 == 1) && (rg2 == 1) && (r3 == 1) && (rg3 == 1) && (r4 == 1) && (rg4 == 1) && (r1 == 0)) wh1 = 1;
             if ((r1 == 1) && (rg1 == 1) && (r2 == 1) && (rg2 == 1) && (r3 == 1) && (rg3 == 1) && (r4 == 1) && (rg4 == 1)) wh1 = 1;
        } 
        let wh1data = rules.data.customData.minimumPermittedRole;
        if (wh1data === 7) return true; 
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
        }
        if (ChatRoomTargetMemberNumber === Player.Ownership?.MemberNumber) {
            wh1 = 0;
        } else if (wh1data > 1 && wh1data < 7 && bcxlist.includes(ChatRoomTargetMemberNumber)) {
            wh1 = 0;
        }
        return wh1 === 0;
    }  
         
    function IsDollTalk(text) {
        const segmenter = new Intl.Segmenter([], {
            granularity: 'word'
        });
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
        let bl = 0,
            nbl = 0,
            notalk = 0,
            ntt = 0;
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
                let msg = "Ahora estás en modo babytalk real.";
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
                    let msg = "Ahora estás en modo de habla normal.";
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
                    let msg = "Ahora estás en modo gagtalk real. Tu nivel actual de balbuceo es " + ngl + ".";
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
                Character.Name == value ||
                Character.Name.toLowerCase() === value ||
                Character.Nickname === value ||
                Character.Nickname?.toLowerCase() === value
            );
        });
    }

    //Traps
    function BondageBenchTrap() {
        let Target = "";
        let Item = "";
        CharacterNaked(Player);
        WearItemIfUnlocked(Player, "BondageBench", "ItemDevices");
        WearItemIfUnlocked(Player, "BalletMittens", "ItemBoots");
        WearItemIfUnlocked(Player, "SciFiPleasurePanties", "ItemPelvis");
        WearItemIfUnlocked(Player, "InflatableDress", "ItemArms");
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
        Target = "ItemPelvis";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "SciFiPleasurePanties") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                c: 3,
                i: 4,
                o: 1,
                s: 2,
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
        WearItemIfUnlocked(Player, "MetalChastityBelt", "ItemPelvis");
        if (IsItemSlotUnlocked(Player, "ItemPelvis") || (magictoys == true)) {
            WearItemIfUnlocked(Player, "EggVibePlugXXL", "ItemButt");
        }
        WearItemIfUnlocked(Player, "ShinyLegBinder", "ItemLegs");
        WearItemIfUnlocked(Player, "HighSecurityStraitJacket", "ItemArms");
        WearItemIfUnlocked(Player, "Coffin", "ItemDevices");
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
        Target = "ItemArms";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "HighSecurityStraitJacket") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                c: 1,
                a: 1,
                s: 3,
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
        WearItemIfUnlocked(Player, "SturdyLeatherBelts", "ItemArms");
        WearItemIfUnlocked(Player, "FrogtieStraps", "ItemLegs");
        if (IsItemSlotUnlocked(Player, "ItemBreast") || (magictoys == true)) {
            WearItemIfUnlocked(Player, "VibeNippleClamp", "ItemNipples");
        }
        WearItemIfUnlocked(Player, "Corset4", "ItemTorso");
        WearItemIfUnlocked(Player, "OrnateChastityBelt", "ItemPelvis");
        if (IsItemSlotUnlocked(Player, "ItemPelvis") || (magictoys == true)) {
            WearItemIfUnlocked(Player, "BunnyTailVibePlug", "ItemButt");
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
        Target = "ItemButt";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "BunnyTailVibePlug") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                vibrating: 9,
            }, {
                push: true,
                refresh: true,
            });
        }
        Target = "ItemPelvis";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "OrnateChastityBelt") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                typed: 1,
            }, {
                push: true,
                refresh: true,
            });
        }
        Target = "ItemArms";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "SturdyLeatherBelts") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                typed: 2,
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
        if (IsItemSlotUnlocked(Player, "ItemBreast") || (magictoys == true)) {
            WearItemIfUnlocked(Player, "NippleWeightClamps", "ItemNipples");
        }
        if (IsItemSlotUnlocked(Player, "ItemPelvis") || (magictoys == true)) {
            WearItemIfUnlocked(Player, "EggVibePlugXXL", "ItemButt");
        }
        WearItemIfUnlocked(Player, "ForbiddenChastityBelt", "ItemPelvis");
        WearItemIfUnlocked(Player, "DuctTape", "ItemHands");
        WearItemIfUnlocked(Player, "ShinyLegBinder", "ItemLegs");
        WearItemIfUnlocked(Player, "HeavyLatexCorset", "ItemTorso");
        WearItemIfUnlocked(Player, "Chains", "ItemArms");
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
        if (Item != null && Item.Asset.Name == "Chains") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                typed: 1,
            }, {
                push: true,
                refresh: true,
            });
        }
        Target = "ItemTorso";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "HeavyLatexCorset") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                typed: 1,
            }, {
                push: true,
                refresh: true,
            });
        }
        Target = "ItemPelvis";
        Item = InventoryGet(Player, Target);
        if (Item != null && Item.Asset.Name == "ForbiddenChastityBelt") {
            Item.Property.PunishOrgasm = false;
            Item.Property.PunishStandup = false;
            Item.Property.PunishStruggle = true;
            ExtendedItemSetOptionByRecord(Player, Item, {
                c: 3,
                s: 3,
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
                if (Player.Themed.IntegrationModule != undefined) {
                    if (Player.Themed.IntegrationModule.MBS != undefined) {
                        if (Player.Themed.IntegrationModule.MBS == true) tintMbsColors1();
                        if (Player.Themed.IntegrationModule.MBS == false) tintMbsColors2();
                    }
                }
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
                if (Player.Themed.IntegrationModule != undefined) {
                    if (Player.Themed.IntegrationModule.MBS != undefined) {
                        if (Player.Themed.IntegrationModule.MBS == true) untintMbsColors1();
                        if (Player.Themed.IntegrationModule.MBS == false) untintMbsColors2();
                    }
                }
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

    //Wheel of Fortune
    async function WheelGame(option) {
        await CommonSetScreen("MiniGame", "WheelFortune");
        WheelStart = function() {
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
        WheelStart();
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
        let msg = "El moaner no está activo.";
        if (M_MOANER_scriptOn) msg = "El moaner está activo.";
        statusmsg(msg);
    }

    function showM_MOANER_profileStatus() {
        let msg = "Perfil de gemidos actual: " + profileName;
        if (profileName == "default") msg = "No hay ningún perfil personalizado cargado.";
        statusmsg(msg);
    }

    function showM_MOANER_orgasmStatus() {
        let msg = "El gemido de orgasmo no está activo. No gemirás al correrte.";
        if (M_MOANER_orgasmActive) msg = "El gemido de orgasmo está activo. Gemirás al correrte.";
        statusmsg(msg);
    }

    function showM_MOANER_spankStatus() {
        let msg = "El gemido por azote no está activo. No gemirás mientras recibes azotes.";
        if (M_MOANER_spankActive) msg = "El gemido por azote está activo. Gemirás mientras recibes azotes.";
        statusmsg(msg);
    }

    function showM_MOANER_talkStatus() {
        let msg = "El gemido al hablar no está activo. Si tienes vibradores, no gemirás mientras hablas.";
        if (M_MOANER_talkActive) msg = "El gemido al hablar está activo. Si tienes vibradores, gemirás mientras hablas.";
        statusmsg(msg);
    }

    function showM_MOANER_whisperStatus() {
        let msg = "El gemido al susurrar no está activo. Si tienes vibradores, no gemirás mientras susurras.";
        if (M_MOANER_whisperActive) msg = "El gemido al susurrar está activo. Si tienes vibradores, gemirás al susurrar.";
        statusmsg(msg);
    }

    function showM_MOANER_tickleStatus() {
        let msg = "El gemido por cosquillas no está activo. No gemirás mientras recibes cosquillas.";
        if (M_MOANER_tickleActive) msg = "El gemido por cosquillas está activo. Gemirás mientras recibes cosquillas.";
        statusmsg(msg);
    }

    function showM_MOANER_vibratorStatus() {
        let msg = "El gemido por vibración no está activo. Si cambian los ajustes de tu vibrador, no gemirás.";
        if (M_MOANER_vibratorActive) msg = "El gemido por vibración está activo. Si cambian los ajustes de tu vibrador, gemirás.";
        statusmsg(msg);
    }

    function showM_MOANER_xvibratorStatus() {
        let msg = "El gemido por vibración ajena (xvibes) no está activo. Si cambian los ajustes de vibradores de otros jugadores, no gemirás.";
        if (M_MOANER_xvibratorActive) msg = "El gemido por vibración ajena (xvibes) está activo. Si cambian los ajustes de vibradores de otros jugadores, gemirás.";
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
        let seuilDouleur = Math.max(10, (4 - activitySelf) * 25);
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
        let seuilDouleur = Math.max(10, (4 - activitySelf) * 25);
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
        Tag: 'allcolor',
        Description: "(código-color) (categoría) (objetivo): cambia el color de los elementos actuales en la categoría especificada.",
        Action: (args) => {
            args = (args || "").trim();
            if (!args) {
                let msg = "El comando allcolor debe ir seguido de un código de color, un número correspondiente a una categoría y opcionalmente un objetivo.\n" +
                    " \n" +
                    "El código de color debe estar en formato hexadecimal: #RRGGBB o #RGB.\n" +
                    " \n" +
                    "Los números para las categorías son: 1 = Objetos - 2 = Ropa (excluyendo cosplay) - 3 = Cosplay - 4 = Cuerpo - 5 = Todas las categorías.";
                infomsg(msg);
                return;
            }
            const parts = args.split(/\s+/);
            const color = parts[0];
            const category = parts[1];
            const targetname = parts[2];
            const isValidColor = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(color);
            if (!isValidColor) {
                infomsg("Color inválido. Usa el formato hexadecimal como #RRGGBB o #RGB.");
                return;
            }
            if (!category || isNaN(category) || category < 1 || category > 5) {
                infomsg("Categoría inválida. Usa un número entre 1 y 5 para la categoría que quieras colorear: 1 = Objetos - 2 = Ropa (excluyendo cosplay) - 3 = Cosplay - 4 = Cuerpo - 5 = Todas las categorías.");
                return;
            }
            let catname = "";
            if (category == 1) catname = "objetos.";
            if (category == 2) catname = "ropa.";
            if (category == 3) catname = "cosplay.";
            if (category == 4) catname = "cuerpo.";
            if (category == 5) catname = "objetos, ropa, cosplay y cuerpo.";
            const applyColorToAppearance = (appearanceArray, color) => {
                for (const part of appearanceArray) {
                    if (!part || !part.Asset || !part.Asset.Group || !part.Asset.Group.Name) continue;
                    let name = part.Asset.Group.Name;
                    if ((category == 1) && (!name.startsWith("Item"))) continue;
                    if ((category > 1) && (category < 5) && (name.startsWith("Item"))) continue;
                    if ((category == 2) && (!allclothes.includes(name))) continue;
                    if ((category == 3) && (!allcosplay.includes(name))) continue;
                    if ((category == 4) && (!allbody.includes(name))) continue;
                    if (Array.isArray(part.Color)) {
                        for (let i = 0; i < 14; i++) part.Color[i] = color;
                    } else {
                        part.Color = color;
                    }
                }
            };
            if (!targetname) {
                applyColorToAppearance(Player.Appearance, color);
                let msg = "Se están usando nuevos colores en los " + catname + " de " + tmpname;
                targetMessage(Allcolor, msg, 1);
                ChatRoomCharacterUpdate(Player);
                return;
            }
            const target = TargetSearch(targetname);
            if (!target) {
                ChatRoomSetTarget(-1);
                return;
            }
            if (!target.AllowItem || target.OnlineSharedSettings.UBC === undefined) {
                ChatRoomSetTarget(-1);
                return;
            }
            const tgpname = getNickname(target);
            if (IsTargetProtected(target)) {
                infomsg(umsg1 + tgpname + umsg2);
                ChatRoomSetTarget(-1);
                return;
            }
            applyColorToAppearance(target.Appearance, color);
            let msg = "Se están usando nuevos colores en los " + catname + " de " + tgpname;
            targetMessage(Tallcolor, msg, 2);
            ChatRoomCharacterUpdate(target);
            ChatRoomSetTarget(-1);
        }
    }]);

    CommandCombine([{
        Tag: 'asylum',
        Description: "(minutos): entra al manicomio, omitiendo los requisitos.",
        Action: (args) => {
            if ((args === "") && (ReputationGet("Asylum") < 0)) {
                let msg = "Debes especificar los minutos si eres un paciente.";
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
        Description: "(animal) (palabras): habla una vez como el animal especificado.",
        Action: (_, command, args) => {
            let help = "El comando atalk debe ir seguido de un número entre 1 y 9 para el animal y las palabras que quieras decir.\n" +
                "Ten en cuenta que no puede usarse cuando ya estás en un modo de habla animal 'permanente'.\n" +
                "Animales disponibles:\n" +
                "1 conejo - 2 vaca - 3 zorro - 4 gatito - 5 ratón\n" +
                "6 cerdo - 7 pony - 8 cachorro - 9 lobito";
            let [mode] = args;
            if (!mode || isNaN(mode) || mode < 1 || mode > 9) {
                infomsg(help);
                return;
            }
            let [, , ...message] = command.split(" ");
            let msg = message?.join(" ");
            if (!msg) {
                infomsg("Por favor, incluye las palabras que quieras decir después del número de animal.");
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
        Description: ": alterna la expulsión automática (auto kick) para cuentas de 0 días de antigüedad.",
        Action: () => {
            if (this.AutoKickOn == false || this.AutoKickOn == undefined) {
                let msg = "AutoKick Preparado.";
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
                        let msg = "AutoKick: La cuenta tenía 0 días de antigüedad.";
                        publicmsg(msg);
                    };
                };
                ServerSocket.on("ChatRoomMessage", AutoKicker);
            } else {
                AutoKickOn = false;
                ServerSocket.off("ChatRoomMessage", AutoKicker);
                let msg = "AutoKick Desactivado.";
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
        Description: "(número): usa un fondo de Bondage Brawl como fondo estándar.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando bg2 debe ir seguido de un número. Lista de fondos de Bondage Brawl:\n" +
                    "1, 2 Balcón - 3 Salón de baile - 4 al 12 Campamento bandido\n" +
                    "13 al 15 Granero - 16 al 18 Baño de Olivia\n" +
                    "19 Dormitorio Mazmorra - 20 Dormitorio de Edward\n" +
                    "21, 22 Dormitorio de Isabella - 23 Dormitorio de Melody\n" +
                    "24 al 26 Dormitorio de Olivia - 27 al 32 Abedul (Birch)\n" +
                    "33 Negro - 34 al 36 Terreno de campamento\n" +
                    "37 al 39 Castillo - 40, 41 Claro del bosque\n" +
                    "42 al 44 Universidad - 45 al 47 Salón de la Condesa\n" +
                    "48 Desierto - 49, 50 Mazmorra - 51, 52 Celda de mazmorra\n" +
                    "53 al 55 Almacén de mazmorra - 56 Bosque\n" +
                    "57 al 60 Cabaña del bosque - 61 Gas - 62 Llanura verde\n" +
                    "63 al 73 Pasillo (1 al 4) - 74 al 79 Lago - 80 Cama de sirvienta\n" +
                    "81 Camino de montaña - 82, 83 Roble (Oak)\n" +
                    "84 al 88 Llanura - 89 Estanque - 90, 91 Sabana\n" +
                    "92 al 94 Tienda - 95, 96 Terraza\n" +
                    "97 Llanura del buitre - 98, 99 Bodega de vino";
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
                    let ChatCreateBackgroundSelect = bg;
                    updateBackground(bg);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'bg3',
        Description: "(número): utiliza un fondo de Bondage College o Bondage Teacher como fondo personalizado.",
        Action: (args) => {
            let BCver = GameVersion;
            if (BCver.includes("Beta")) {
                let beta1 = BCver.slice(0, 4);
                let beta2 = beta1.slice(-3);
                let beta3 = beta2 - 1;
                BCver = "R" + beta3;
            }
            if (args === "") {
                let msg = "El comando bg3 debe ir seguido de un número. Lista de fondos de Bondage College:\n" +
                    "BONDAGE COLLEGE\n" +
                    "1 Clase de Arte - 2, 3 Clase - 4 Club - 5 Universidad\n" +
                    "6 Dormitorio - 7 Vestidor - 8 Clase de Gimnasia\n" +
                    "9 al 12 Sala de Aislamiento - 13 al 16 Club Kinbaku\n" +
                    "17 al 26 Biblioteca - 27, 28 Casilleros\n" +
                    "29 Pista de Atletismo - 30, 31 Duchas - 32 Teatro\n" +
                    "BONDAGE TEACHER\n" +
                    "33, 34 Playa - 35, 36 Maletín - 37 Diana\n" +
                    "38, 39 Clase - 40 Universidad - 41 Oficina";
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
        Description: "(pantalla) (fondo): selecciona un fondo estándar para el Juego de Cartas del Club, Lista de Amigos, Salón Principal, Habitación Privada (SP) o Celda con Temporizador",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando bg4 debe ir seguido de dos números:\n" +
                    "- un número para la pantalla afectada:\n" +
                    "0 = Info de Personaje - 1 = Búsqueda de Chat\n" +
                    "2 = Juego de Cartas del Club - 3 = Lista de Amigos\n" +
                    "4 = Salón Principal - 5 = Habitación Privada (SP)\n" +
                    "6 = Celda con Temporizador - 7 = Guardarropa\n" +
                    "8 = Creación de Nueva Sala (predeterminado)\n" +
                    " \n" +
                    "- un número entre -1 y un máximo que puede variar:\n" +
                    "Sin BCX: 0 a 235 para fondos oficiales de BC, 236 a 318 se añaden si usas el comando /bg1.\n" +
                    "Con BCX: 0 a 235 para fondos oficiales de BC, 236 a 325 son añadidos por BCX, 326 a 399 se añaden si usas el comando /bg1 (algunos fondos tienen dos números).\n" +
                    " \n" +
                    "Usa -1 para volver al fondo predeterminado. Consejo: usa <b>/bglist</b> para saber qué número corresponde a cada fondo.";
                infomsg(msg);
            } else {
                let stringBg1 = args;
                let stringBg2 = stringBg1.split(/[ ,]+/);
                let screen = stringBg2[0];
                if ((screen > -1) && (screen < 9)) {
                    if (screen == 0) {
                        let ifbg = stringBg2[1];
                        let ifback = "";
                        if ((ifbg > -2) && (ifbg < (BackgroundsList.length - 1))) {
                            if (ifbg == -1) {
                                ifback = "Sheet";
                            } else {
                                ifback = BackgroundsList[ifbg].Name;
                            }
                            ifname = ifback;
                            M_MOANER_saveControls();
                            let msg = "El fondo de tu información de personaje ahora es: " + ifname + ".";
                            infomsg(msg);
                        }
                    }
                    if (screen == 1) {
                        let csbg = stringBg2[1];
                        let csback = "";
                        if ((csbg > -2) && (csbg < (BackgroundsList.length - 1))) {
                            if (csbg == -1) {
                                csback = "Introduction";
                            } else {
                                csback = BackgroundsList[csbg].Name;
                            }
                            csname = csback;
                            M_MOANER_saveControls();
                            let msg = "El fondo de Búsqueda de Chat ahora es: " + BackgroundsTextGet(csname) + ".";
                            infomsg(msg);
                        }
                    }
                    if (screen == 2) {
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
                            let msg = "El fondo del Juego de Cartas del Club ahora es: " + BackgroundsTextGet(ccback) + ".";
                            infomsg(msg);
                        }
                    }
                                        if (screen == 3) {
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
                            let msg = "El fondo de la lista de amigos ahora es: " + BackgroundsTextGet(frname) + ".";
                            infomsg(msg);
                        }
                    }
                    if (screen == 4) {
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
                            let msg = "El fondo del salón principal ahora es: " + BackgroundsTextGet(mhback) + ".";
                            infomsg(msg);
                        }
                    }
                    if (screen == 5) {
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
                            let msg = "El fondo de tu habitación privada (SP) ahora es: " + BackgroundsTextGet(prback) + ".";
                            infomsg(msg);
                        }
                    }
                    if (screen == 6) {
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
                            let msg = "El fondo de la celda con temporizador ahora es: " + tcname + ".";
                            infomsg(msg);
                        }
                    }
                                        if (screen == 7) {
                        let wrbg = stringBg2[1];
                        let wrback = "";
                        if ((wrbg > -2) && (wrbg < (BackgroundsList.length - 1))) {
                            if (wrbg == -1) {
                                wrback = "Dressing";
                            } else {
                                wrback = BackgroundsList[wrbg].Name;
                            }
                            wrname = wrback;
                            M_MOANER_saveControls();
                            let msg = "El fondo del guardarropa ahora es: " + wrname + ".";
                            infomsg(msg);
                        }
                    }
                    if (screen == 8) {
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
                            let msg = "El fondo predeterminado al crear una nueva sala ahora es: " + BackgroundsTextGet(drback) + ".";
                            infomsg(msg);
                        }
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'bglist',
        Description: ": muestra la lista de todos los fondos estándar disponibles",
        Action: () => {
            for (let i = 0; i < BackgroundsList.length; i++)
                ChatRoomSendLocal(i + " - " + BackgroundsTextGet(BackgroundsList[i].Name));
        }
    }])

    CommandCombine([{
        Tag: 'bgshow1',
        Description: "(numero): muestra un enlace local con clic y la imagen incrustada de un fondo estándar específico.",
        Action: (args) => {
            let BCver = GameVersion;
            if (BCver.includes("Beta")) {
                let beta1 = BCver.slice(0, 4);
                let beta2 = beta1.slice(-3);
                let beta3 = beta2 - 1;
                BCver = "R" + beta3;
            }
            if (args === "") {
                let msg = "El comando bgshow1 debe ir seguido de un número (usa /bglist para ver los números disponibles).";
                infomsg(msg);
            } else {
                if ((args > -1) && (args < BackgroundsList.length)) {
                    let name = BackgroundsList[args].Name;
                    let url = 'https://www.bondage-europe.com' + BCver + '/BondageClub/Backgrounds/' + name + '.jpg';
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
                    a.href = url;
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
        Description: "(numero): envía al chat un enlace a un fondo estándar específico. Al usar con WCE, el enlace es clicable y la imagen se puede incrustar.",
        Action: (args) => {
            let BCver = GameVersion;
            if (BCver.includes("Beta")) {
                let beta1 = BCver.slice(0, 4);
                let beta2 = beta1.slice(-3);
                let beta3 = beta2 - 1;
                BCver = "R" + beta3;
            }
            if (args === "") {
                let msg = "El comando bgshow2 debe ir seguido de un número (usa /bglist para ver los disponibles).";
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
        Description: "(objetivo): da acceso directo a la descripción del perfil de cualquier jugador en la sala.",
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
        Description: ": potencia todas tus habilidades durante una hora.",
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
                let msg = "Sientes todas tus habilidades potenciadas. Los cambios se ven en el panel de información.";
                infomsg(msg);
            }
        }
    }])

    CommandCombine([{
        Tag: 'btalk',
        Description: "(palabras): habla una vez como un bebé.",
        Action: (args) => {
            if (!args) {
                infomsg("El comando btalk debe ir seguido de las palabras que quieras decir.");
                return;
            }
            if (dolltalk === true && !IsDollTalk(args)) {
                infomsg("Tu mensaje no se pudo enviar porque no respeta las reglas dolltalk.");
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
        Tag: 'callubc',
        Description: ": instalación de la interfaz UBC (usar si falló durante la inicialización).",
        Action: () => {
            let msg = "¡Revisa ahora la página de Extensiones!";
            infomsg(msg);
            runUBC();
        }
    }])

    CommandCombine([{
        Tag: 'cgame',
        Description: "(zona): inicia un Juego de Cartas del Club contra un NPC específico.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando cgame debe incluir una zona.\n" +
                    "Zonas disponibles:\n" +
                    "asylum, cafe, infiltration, introduction, kidnap, larp,\n" +
                    "lounge, magic, movie, shibari, stable.\n" +
                    "Debes hacer clic en el NPC correspondiente y luego en la opción apropiada.";
                infomsg(msg);
            } else {
                minigame = args;
                M_MOANER_saveControls();
                if (minigame == "asylum") {
                    RoomToGame();
                    CommonSetScreen("Room", "AsylumMeeting");
                }
                if (minigame == "cafe") {
                    RoomToGame();
                    CommonSetScreen("Room", "Cafe");
                }
                if (minigame == "infiltration") {
                    RoomToGame();
                    CommonSetScreen("Room", "Infiltration");
                }
                if (minigame == "introduction") {
                    RoomToGame();
                    CommonSetScreen("Room", "Introduction");
                }
                if (minigame == "kidnap") {
                    RoomToGame();
                    CommonSetScreen("Room", "KidnapLeague");
                }
                if (minigame == "larp") {
                    RoomToGame();
                    CommonSetScreen("Room", "LARP");
                }
                if (minigame == "lounge") {
                    RoomToGame();
                    CommonSetScreen("Room", "ClubCardLounge");
                }
                if (minigame == "magic") {
                    RoomToGame();
                    CommonSetScreen("Room", "MagicSchoolFindsAround");
                }
                if (minigame == "movie") {
                    RoomToGame();
                    CommonSetScreen("Room", "MovieStudio");
                }
                if (minigame == "shibari") {
                    RoomToGame();
                    CommonSetScreen("Room", "Shibari");
                }
                if (minigame == "stable") {
                    RoomToGame();
                    CommonSetScreen("Room", "Stable");
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'chess',
        Description: "(dificultad): inicia el ajedrez.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando chess debe ir seguido de un número entre 1 y 3.\n" +
                    " \n" +
                    "Modos de dificultad disponibles:\n" +
                    "1 fácil\n" +
                    "2 normal\n" +
                    "3 difícil\n" +
                    "Ten en cuenta que se requiere un relog completo al finalizar una partida de ajedrez.";
                infomsg(msg);
            } else {
                let chessdifficulty = args;
                if (chessdifficulty == 1) minigame = "easy";
                if (chessdifficulty == 2) minigame = "normal";
                if (chessdifficulty == 3) minigame = "hard";
                M_MOANER_saveControls();
                CommonSetScreen("Room", "CollegeChess");
                GameChess();
            }
        }
    }])

    CommandCombine([{
        Tag: 'clothes',
        Description: "(objetivo): cambia la ropa.",
        Action: (args) => {
            let target = Player;
            if (args != "") target = TargetSearch(args);
            if (!target) return;
            if (target == Player) {
                let msg = "Láseres mágicos ponen ropa aleatoria en el cuerpo de " + tmpname + ".";
                targetMessage(Clothes, msg, 1);
                CharacterAppearanceFullRandom(Player, true);
                ChatRoomCharacterUpdate(Player);
            } else {
                if ((target.AllowItem == true) && (target.OnlineSharedSettings.UBC != undefined)) {
                    tgpname = getNickname(target);
                    if (IsTargetProtected(target)) {
                        let msg = umsg1 + tgpname + umsg2;
                        infomsg(msg);
                    } else {
                        let msg = "Láseres mágicos ponen ropa aleatoria en el cuerpo de " + tgpname + ".";
                        targetMessage(Tclothes, msg, 2);
                        CharacterAppearanceFullRandom(target, true);
                        ChatRoomCharacterUpdate(target);
                    }
                }
            }
            ChatRoomSetTarget(-1);
        }
    }])

    CommandCombine([{
        Tag: 'college',
        Description: "entra a la universidad, omitiendo los requisitos.",
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
        Description: "(anim): activa una animación con cambio de color.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando colorchanger:\n" +
                    "Para preseleccionar, existen dos opciones, escribe: <b>/colorchanger hair</b> o <b>/colorchanger eyes</b>\n" +
                    "Para seleccionar un área manualmente, escribe: <b>/colorchanger set</b> o <b>/colorchanger select</b> o <b>/colorchanger custom</b>\n" +
                    "La selección manual solo puede afectar a 10 áreas a la vez,\n" +
                    "luego requiere ser reiniciada para volver a usarla, escribe: <b>/colorchanger stop</b> o <b>/colorchanger reset</b>\n" +
                    "Solo puede haber 1 objetivo activo a la vez";
                infomsg(msg);
            }
            if ((args === "custom") || (args === "set") || (args === "select")) {
                let msg = "Tienes 5 segundos para hacer clic en el objetivo y seleccionar el área. Si tiene éxito, se confirmará. Si no, reintenta.";
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
                let msg = "Tienes 5 segundos para hacer clic en el objetivo y seleccionar el área. Si tiene éxito, se confirmará. Si no, reintenta.";
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
                let msg = "Tienes 5 segundos para hacer clic en el objetivo y seleccionar el área. Si tiene éxito, se confirmará. Si no, reintenta.";
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
        Tag: 'ctitle',
        Description: "(titulo personalizado): crea un título personalizado que no requiere cumplir condiciones.",
        Action: (args, originalInput) => {  
            if (args === "") { 
                let msg = "El comando ctitle debe ir seguido del título personalizado que quieras mostrar en tu perfil.\n" +
                    "Puede ser un título original o uno oficial existente para el cual no cumplas los requisitos.\n" +
                    "¡Máximo 25 caracteres (espacios incluidos)!\n" +
                    "Solo funcionará entre usuarios de UBC que tengan seleccionada la opción 'Only Days' en la pantalla de Info de Personaje.\n" +
                    "Este título no se mostrará en la pantalla de Títulos.\n" +
                    "Usa 'None' como título para volver a un perfil sin título personalizado.";
                infomsg(msg);
                return;
            }      
            let custom = originalInput.replace(/^\/ctitle\s+/i, '').trim(); 
            let LS = /[/\p{L}\p{N}\p{Z}'-]/gu;
            let length = custom.length;
            if ((length > 0) && (length < 26) && (custom.match(LS))) {
                if (custom === "None") {
                    ctitle = "";
                    infomsg("Título personalizado eliminado")
                } else {
                    ctitle = custom;
                    infomsg("Título personalizado creado o modificado");        
                } 
                M_MOANER_saveControls();
                Player.OnlineSharedSettings.ctitle = ctitle;
                ServerAccountUpdate.QueueData({
                    OnlineSharedSettings: Player.OnlineSharedSettings
                });
            } else {
                infomsg("¡Máximo 25 caracteres (espacios incluidos)!");
            }
        }
    }])

    CommandCombine([{
        Tag: 'cum',
        Description: ": provoca un orgasmo.",
        Action: () => {
            ActivityOrgasmRuined = false;
            ActivityOrgasmStart(Player);
        }
    }])

    CommandCombine([{
        Tag: 'difficulty',
        Description: "(numero): cambia la dificultad del juego.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando difficulty debe ir seguido de un número entre 0 y 3.\n" +
                    " \n" +
                    "Modos de dificultad disponibles:\n" +
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
                LoginDifficulty(true);
            }
        }
    }])

    CommandCombine([{
        Tag: 'font',
        Description: "(fuente) (tamaño): cambia la fuente en BC.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando font debe ir seguido de un número de fuente y opcionalmente un número de tamaño.\n" +
                    "Fuentes soportadas: 0 Arial - 1 Times New Roman\n" +
                    "2 Papyrus - 3 Comic Sans - 4 Impact\n" +
                    "5 Helvetica Neue - 6 Verdana - 7 Century Gothic\n" +
                    "8 Georgia - 9 Courrier New - 10 Copperplate\n" +
                    "Tamaños: 0 Pequeño - 1 Mediano - 2 Grande";
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
        Description: "(lobby): da acceso a la lista de amigos en el lobby actual.",
        Action: () => {
            RoomToGame();
            CommonSetScreen("Online", "ChatSearch");
            FriendListReturn = {
                Screen: CurrentScreen,
                Module: CurrentModule
            };
            CommonSetScreen("Character", "FriendList");
        }
    }])

    CommandCombine([{
        Tag: 'game',
        Description: "(minijuego): lanza un minijuego.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando game debe incluir un minijuego.\n" +
                    "Minijuegos disponibles:\n" +
                    "carrot, cleaning, dojo, drinks, hurdle, kidnap, movie1,\n" +
                    "movie2, puppy, rhythm, tennis1, tennis2, tennis3,\n" +
                    "training, whippony.\n" +
                    "Tennis1 = fácil, tennis2 = normal, tennis3 = difícil\n" +
                    "Training es la versión de entrenamiento del juego hurdle.\n" +
                    "Generalmente necesitas hacer clic en el NPC y seleccionar las opciones apropiadas en los diálogos.\n" +
                    "Nota: se requiere un relog completo para terminar realmente los juegos en el establo (¡la opción 'leave' en el diálogo iniciará un juego nuevo!)";
                infomsg(msg);
            } else {
                minigame = args;
                M_MOANER_saveControls();
                if ((minigame == "carrot") || (minigame == "hurdle") || (minigame == "training") || (minigame == "whippony")) {
                    gamestable = true;
                    M_MOANER_saveControls();
                    RoomToGame();
                    CommonSetScreen("Room", "Stable");
                }
                if ((minigame == "cleaning") || (minigame == "drinks") || (minigame == "rhythm")) {
                    RoomToGame();
                    CommonSetScreen("Room", "MaidQuarters");
                }
                if ((minigame == "dojo") || (minigame == "kidnap") || (minigame == "puppy")) {
                    RoomToGame();
                    CommonSetScreen("Room", "Introduction");
                }
                if ((minigame == "movie1") || (minigame == "movie2")) {
                    RoomToGame();
                    CommonSetScreen("Room", "MovieStudio");
                }
                if ((minigame == "tennis1") || (minigame == "tennis2") || (minigame == "tennis3")) {
                    RoomToGame();
                    CommonSetScreen("Room", "CollegeTennis");
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'ggts',
        Description: "(minutos) (nivel): entra al entrenamiento ggts en el asilo por el tiempo y nivel especificados.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando ggts debe ir seguido de dos números para especificar minutos y nivel (1-6).";
                infomsg(msg);
            } else {
                let stringGgts1 = args;
                let stringGgts2 = stringGgts1.split(/[ ,]+/);
                let minutes = stringGgts2[0];
                let level = stringGgts2[1];
                minigame = level;
                M_MOANER_saveControls();
                let msg = "" + tmpname + " es agarrada por dos sirvientas y encerrada en el asilo para " + minutes + " minutos de entrenamiento con el Good Girl Training System Nivel " + level + ".";
                publicmsg(msg);
                DialogLentLockpicks = false;
                RoomToGame();
                CommonSetScreen("Room", "AsylumEntrance");
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
        Description: "(modo_habla) (palabras): habla una vez con el habla de mordaza especificada.",
        Action: (_, command, args) => {
            let help = "El comando gtalk debe ir seguido de un número entre 0 y 10, y luego las palabras que quieras decir.\n" +
                " \n" +
                "Modos de habla disponibles:\n" +
                "0 habla de mordaza real (basada en mordazas actuales y otros objetos que restrinjan el habla)\n" +
                "1 casi sin habla de mordaza\n" +
                "2 habla de mordaza muy ligera\n" +
                "3 habla de mordaza ligera\n" +
                "4 habla de mordaza fácil\n" +
                "5 habla de mordaza normal\n" +
                "6 habla de mordaza media\n" +
                "7 habla de mordaza pesada\n" +
                "8 mejor habla de mordaza pesada\n" +
                "9 habla de mordaza muy pesada\n" +
                "10 habla de mordaza total";
            let [gaglevel] = args;
            if (!gaglevel || isNaN(gaglevel) || gaglevel < 0 || gaglevel > 10) {
                infomsg(help);
                return;
            }
            let [, , ...message] = command.split(" ");
            let msg = message?.join(" ");
            if (!msg) {
                infomsg("Por favor, incluye las palabras a decir después del nivel de gtalk.");
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
        Description: "(objetivo) (pista): añade o cambia una pista para los candados con contraseña actuales.",
        Action: (_, command, args) => {
            let [targetname] = args;
            if (!targetname) {
                let msg = "El comando hint debe ir seguido de un objetivo y la pista que quieras añadir a los candados con contraseña.";
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
                                        let msg = "Se ha añadido una pista a los candados con contraseña de " + tgpname + ".";
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
        Tag: 'horny',
        Description: "(nivel): establece tu nivel de excitación (en todos los casos).",
        Action: (args) => {
            let msg1 = "El comando horny debe ir seguido de un número entre 0 y 100.";
            let msg2 = "Tu nivel de excitación ha sido modificado.";
            const arousal = CommonParseInt(args);
            if (arousal === null) return infomsg(msg1);
            const clamped = CommonClamp(arousal, 0, 100);
            if ((Player.ArousalSettings.Active == "NoMeter") || (Player.ArousalSettings.Active == "Inactive")) infomsg(msg2);
            ActivitySetArousal(Player, clamped);
            if (Player.ArousalSettings.AffectExpression) ActivityExpression(Player, Player.ArousalSettings.Progress);
            if (Player.ArousalSettings.Progress === 100) ActivityOrgasmPrepare(Player);
        }
    }])

    CommandCombine([{
        Tag: 'infolock',
        Description: ": da información (código, contraseña, tiempo restante) del candado usado en el objeto del espacio seleccionado.",
        Action: () => {
            if (extrainfo == false) {
                let msg = "No puedes usar este comando según tus ajustes.";
                infomsg(msg);
            } else {
                let msg = "Tienes 5 segundos para hacer clic en ti mismo o en otro jugador. Si tiene éxito, obtendrás información sobre el candado del espacio seleccionado.";
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
                                        Lock = "Candado de Combinación";
                                        asset = Inventory.Asset.Description;
                                        code = Inventory.Property.CombinationNumber;
                                        ChatRoomSendLocal("Grupo de Objeto = " + Target);
                                        ChatRoomSendLocal("Bloqueado con " + Lock);
                                        ChatRoomSendLocal("" + asset + " = " + code + "");
                                    }
                                    if (Inventory.Property.LockedBy == "PortalLinkPadlock") {
                                        Lock = "Candado de Enlace de Portal";
                                        asset = Inventory.Asset.Description;
                                        code = Inventory.Property.PortalLinkCode;
                                        ChatRoomSendLocal("Grupo de Objeto = " + Target);
                                        ChatRoomSendLocal("Bloqueado con " + Lock);
                                        ChatRoomSendLocal("" + asset + " = " + code + "");
                                    }
                                    if ((Inventory.Property.LockedBy == "SafewordPadlock") || (Inventory.Property.LockedBy == "PasswordPadlock") || (Inventory.Property.LockedBy == "TimerPasswordPadlock")) {
                                        Lock = "Candado de Palabra de Seguridad";
                                        if (Inventory.Property.LockedBy == "PasswordPadlock") Lock = "Candado de Contraseña";
                                        if (Inventory.Property.LockedBy == "TimerPasswordPadlock") Lock = "Candado de Contraseña con Temporizador";
                                        asset = Inventory.Asset.Description;
                                        code = Inventory.Property.Password;
                                        ChatRoomSendLocal("Grupo de Objeto = " + Target);
                                        ChatRoomSendLocal("Bloqueado con " + Lock);
                                        ChatRoomSendLocal("" + asset + " = " + code + "");
                                        if (Inventory.Property.LockedBy == "TimerPasswordPadlock") {
                                            time = Inventory.Property.RemoveTimer;
                                            left = TimerToString(time - CurrentTime);
                                            ChatRoomSendLocal("" + asset + " = " + left + "");
                                        }
                                    }
                                    if ((Inventory.Property.LockedBy == "TimerPadlock") || (Inventory.Property.LockedBy == "MistressTimerPadlock") || (Inventory.Property.LockedBy == "LoversTimerPadlock") || (Inventory.Property.LockedBy == "OwnerTimerPadlock")) {
                                        Lock = "Candado con Temporizador";
                                        if (Inventory.Property.LockedBy == "MistressTimerPadlock") Lock = "Candado con Temporizador de Ama";
                                        if (Inventory.Property.LockedBy == "LoversTimerPadlock") Lock = "Candado con Temporizador de Amante";
                                        if (Inventory.Property.LockedBy == "OwnerTimerPadlock") Lock = "Candado con Temporizador de Dueño";
                                        asset = Inventory.Asset.Description;
                                        time = Inventory.Property.RemoveTimer;
                                        left = TimerToString(time - CurrentTime);
                                        ChatRoomSendLocal("Grupo de Objeto = " + Target);
                                        ChatRoomSendLocal("Bloqueado con " + Lock);
                                        ChatRoomSendLocal("" + asset + " = " + left + "");
                                    }
                                }
                                if (Inventory.Property.Name != null) {
                                    if (Inventory.Property.Name == "Best Friend Timer Padlock") {
                                        Lock = "Candado con Temporizador de Mejor Amigo";
                                        asset = Inventory.Asset.Description;
                                        time = Inventory.Property.RemovalTime;
                                        left = TimerToString(time - CurrentTime);
                                        ChatRoomSendLocal("Grupo de Objeto = " + Target);
                                        ChatRoomSendLocal("Bloqueado con " + Lock);
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
        Description: "(objetivo): activa o envía al modo invisible (los scripts deben estar permitidos en los ajustes de BC).",
        Action: (args) => {
            let target = Player;
            if (args != "") target = TargetSearch(args);
            if (!target) return;
            if (target == Player) {
                if (Player.OnlineSharedSettings.ScriptPermissions.Hide.permission == 0) {
                    let msg = "Para usar el comando invisible en ti mismo, primero debes permitir Scripts en los ajustes de BC.";
                    infomsg(msg);
                    return;
                }
                let msg = "Láseres mágicos hacen a " + tmpname + " completamente invisible.";
                targetMessage(Invisible, msg, 1);
                InventoryWear(Player, "Script", "ItemScript");
                InventoryGet(Player, "ItemScript").Property = {
                    Hide: echolevel5
                }
                CurrentScreen === 'ChatRoom' ?
                    ChatRoomCharacterUpdate(Player) :
                    CharacterRefresh(Player);
            } else {
                if ((target.AllowItem == true) && (target.OnlineSharedSettings.UBC != undefined)) {
                    tgpname = getNickname(target);
                    if (target.OnlineSharedSettings.ScriptPermissions.Hide.permission == 0) {
                        let msg = "Para usar el comando invisible en otros jugadores, ellos deben primero permitir Scripts en los ajustes de BC.";
                        infomsg(msg);
                        return;
                    }
                    if (IsTargetProtected(target)) {
                        let msg = umsg1 + tgpname + umsg2;
                        infomsg(msg);
                    } else {
                        let msg = "Láseres mágicos hacen a " + tgpname + " completamente invisible.";
                        targetMessage(Tinvisible, msg, 2);
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
    }])

    CommandCombine([{
        Tag: 'itemcolor',
        Description: "(codigocolor): cambia el color del objeto usado en el espacio seleccionado.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando itemcolor debe ir seguido de un código de color en formato #000000 para cambiar el color del objeto en el espacio seleccionado con un clic.";
                infomsg(msg);
            } else {
                let color = args;
                if (color.startsWith("#")) {
                    let msg = "Tienes 5 segundos para hacer clic en ti mismo. Si tiene éxito, el color del objeto en el espacio seleccionado cambiará. Si no, reintenta.";
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
                                    let msg = "Color del objeto cambiado.";
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
        Tag: 'keydeposit',
        Description: "(horas): guarda tus llaves a salvo en la bóveda.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando keydeposit debe ir seguido de un número mayor a 0.";
                infomsg(msg);
            } else {
                let hours = args;
                if (hours > 0) {
                    let msg = "Las llaves de " + tmpname + " están ahora a salvo en la bóveda por " + hours + " horas.";
                    publicmsg(msg);
                    CellDepositKeys(hours);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'killpar',
        Description: ": elimina los parámetros de UBC/Moaner guardados localmente.",
        Action: (args) => {
            if (args === "") {
                let msg = "<b>Advertencia</b>: Este comando eliminará todos los parámetros de UBC/Moaner guardados localmente. Úsalo solo si algunos parámetros parecen no funcionar. Confirma escribiendo: <b>/killpar yes</b>";
                infomsg(msg);
            } else if (args === "yes") {
                M_MOANER_deleteControls();
                let msg = "Todos los parámetros de UBC/Moaner han sido eliminados. Haz un logout/login completo y luego usa los comandos apropiados para configurar los parámetros que gustes.";
                infomsg(msg);
            }
        }
    }])

    CommandCombine([{
        Tag: 'layerset',
        Description: "(numero_capa) (codigocolor): cambia el color de una capa del objeto en el espacio guardado.",
        Action: (args) => {
            if (args === "") {
                let msg = "Primero usa el comando <b>/layershow</b> para hacer clic en un objeto, obtener info de sus capas y guardar el espacio.\n" +
                    "El comando layerset debe ir seguido de un número de capa (-1 para todas) y un código de color #000000 para el objeto en el espacio guardado previamente.\n" +
                    "Si ingresas una capa no numérica, se interpretará como 0. Si el color no existe, volverá al color por defecto.";
                infomsg(msg);
            } else {
                let stringLys1 = args;
                let stringLys2 = stringLys1.split(/[ ,]+/);
                let layer = stringLys2[0];
                let color = stringLys2[1];
                if (this.saveditemslot == undefined) {
                    let msg = "<b>Advertencia</b>: Primero usa el comando <b>/layershow</b> para obtener información y guardar el espacio del objeto.";
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
                        let msg = "Color cambiado para la capa " + layer + ".";
                        if (layer == -1) msg = "Color cambiado para todas las capas.";
                        infomsg(msg);
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'layershow',
        Description: "da info sobre los colores de capa de un objeto específico + guarda el espacio del objeto.",
        Action: () => {
            let msg = "Tienes 5 segundos para hacer clic en ti misma. Si tiene éxito, obtendrás la info y el espacio del objeto se guardará. Si no, reintenta.";
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
                                        Color2 = "No es posible cambiar el color";
                                    }
                                    ChatRoomSendLocal("Capa " + ly + " = " + Name + " - " + Color2);
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
                                    ChatRoomSendLocal("Capa " + ly + " = " + Name1 + " - " + Name2 + " - " + Color2);
                                    //}
                                    ly++;
                                }
                            }
                            this.saveditemslot = Target;
                            let msg = "Espacio del objeto guardado.";
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
        Description: "(objetivo) (tipo_candado) (otros parámetros): añade candados a todos los objetos bloqueables del objetivo especificado.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando lock tiene varias sintaxis:\n" +
                    "/lock (objetivo) (tipo_candado) para candados 1 al 8, 17, 19 al 22\n" +
                    "/lock (objetivo) (tipo_candado) (r) para candado 9\n" +
                    "/lock (objetivo) (tipo_candado) (codigo) para candado 10\n" +
                    "/lock (objetivo) (tipo_candado) (contraseña) (r) para candados 11 y 12\n" +
                    "/lock (objetivo) (tipo_candado) (minutos) (h) (i) (r) - candados 13 al 15, 18\n" +
                    "/lock (objetivo) (tipo_candado) (contraseña) (minutos) (h) (i) (r) - candado 16\n" +
                    "SIEMPRE ESPECIFICA EL OBJETIVO. Tipos de candado:\n" +
                    "1 Metal (por defecto) - 2 Exclusivo\n" +
                    "3 Intrincado - 4 Alta Seguridad - 5 Pandora\n" +
                    "6 Ama - 7 Amante - 8 Dueño - 9 Cinco Minutos\n" +
                    "10 Combinación - 11 Palabra de Seguridad - 12 Contraseña\n" +
                    "13 Temporizador de Ama - 14 Temporizador de Amante - 15 Temporizador de Dueño\n" +
                    "16 Contraseña con Tiempo - 17 Mejor Amigo - 18 Temp. Mejor Amigo\n" +
                    "19 Familiar - 20 Escudo Lúbrico - 21 Devious (si está activo)\n" +
                    "22 Enlace de Portal (solo para objeto específico)\n" +
                    "Los candados 17, 18, 20 y 21 requieren un mod específico\n" +
                    "Usa <b>/lock par</b> para info sobre otros parámetros";
                infomsg(msg);
            } else if (args === "par") {
                let msg = "Parámetros especiales del comando lock:\n" +
                    "El código debe estar entre 0 y 9999.\n" +
                    "La contraseña está limitada a 8 caracteres.\n" +
                    "Tiempo máximo = 240 minutos para candados 13 y 16,\n" +
                    "10080 minutos para candados 14, 15 y 18\n" +
                    "Usa ? si quieres un tiempo elegido al azar por el juego\n" +
                    "Usa las opciones de portal para fijar el código del candado de Enlace de Portal\n" +
                    " \n" +
                    "Parámetros opcionales:\n" +
                    "h para ocultar el temporizador,\n" +
                    "i para permitir la entrada de tiempo de otros jugadores,\n" +
                    "r para la eliminación del objeto cuando se meta la contraseña correcta\n" +
                    "o cuando el tiempo del candado se agote.\n" +
                    " \n" +
                    "Consejo: reemplaza h y/o i por otro carácter cuando necesites omitirlos.";
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
                            let msg = "Láseres mágicos hacen aparecer candados en el cuerpo de " + tgpname + ".";
                            targetMessage(Mlock, msg, 1);
                        } else {
                            if (IsTargetProtected(target)) {
                                uw = 1;
                                let msg = umsg1 + tgpname + umsg2;
                                infomsg(msg);
                            } else {
                                let msg = "Láseres mágicos hacen aparecer candados en el cuerpo de " + tgpname + ".";
                                targetMessage(Tlock, msg, 2);
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
                                        if (lk == 20) target.Appearance[A].Property.LockedBy = "\u{6DEB}\u{7EB9}\u{9501}LuziPadlock";
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
        Description: "(nombre_cuenta) (contraseña): inicia sesión en una cuenta nueva.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando login debe ir seguido de un nombre de cuenta y una contraseña";
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
        Description: ": activa/desactiva la niebla en la sala con mapa actual.",
        Action: () => {
            if (!IsMapRoom()) return infomsg(umsg5);
            const fogEnabled = !!ChatRoomData.MapData.Fog;
            ChatRoomData.MapData.Fog = !fogEnabled;
            const status = fogEnabled ? "desactivada" : "activada";
            infomsg(`La niebla en la sala con mapa actual está ${status}. No habrá efecto visible si tienes activada la visión completa en salas con mapa.`);
        }
    }])

    CommandCombine([{
        Tag: 'mapforce',
        Description: ": fuerza el acceso al mapa en la sala normal actual (solo para ti).",
        Action: () => {
            if (ChatRoomData.MapData.Type == "Never") ChatRoomData.MapData.Type = "Hybrid";
        }
    }])

    CommandCombine([{
        Tag: 'mapkeys',
        Description: "(numero_llave) (accion): encuentra o pierde todas las llaves o una específica para la sala con mapa actual.",
        Action: (args) => {
            if (!IsMapRoom()) return infomsg(umsg5);
            if (!args) {
                return infomsg(
                    "El comando mapkeys debe ir seguido de dos números.\n" +
                    "1er número: 1 = Llave de Bronce - 2 = Llave de Plata - 3 = Llave de Oro - 4 = Todas las llaves.\n" +
                    "2do número: 1 = Encontrar - 2 = Perder."
                );
            }
            if (!Player.MapData) return infomsg("No has entrado al mapa.");
            const [keynrStr, actionStr] = args.split(/[ ,]+/);
            const keynr = Number(keynrStr);
            const action = Number(actionStr);
            if (![1, 2, 3, 4].includes(keynr) || ![1, 2].includes(action)) return;
            const keys = [{
                    name: "Oro",
                    prop: "HasKeyGold"
                },
                {
                    name: "Plata",
                    prop: "HasKeySilver"
                },
                {
                    name: "Bronce",
                    prop: "HasKeyBronze"
                }
            ];
            keys.forEach((key, idx) => {
                if (keynr === idx + 1 || keynr === 4) {
                    Player.MapData.PrivateState[key.prop] = (action === 1);
                }
            });
            const foundKeys = keys
                .filter(key =>
                    Player.MapData.PrivateState[key.prop])
                .map(key => key.name);
            ChatRoomSendLocal(`Llaves encontradas: ${foundKeys.join(" - ") || "Ninguna"}.`);
            ChatRoomSendLocal(" ");
        }
    }])

    CommandCombine([{
        Tag: 'maproom',
        Description: ": da información sobre la ubicación de los jugadores en la sala con mapa actual.",
        Action: () => {
            if (!IsMapRoom()) return infomsg(umsg5 + umsg6);
            ChatRoomCharacter.forEach(character => {
                const {
                    Nickname,
                    Name,
                    MemberNumber,
                    OnlineSharedSettings = {},
                    MapData
                } = character;
                const command = "maproom";
                UBCinfo(character, command);
                if (MapData) {
                    let exinfo = "";
                    if (ChatRoomData.MapData.Type === "Always") {
                        exinfo = "Presencia real en el mapa: SÍ";
                    } else if (ChatRoomData.MapData.Type === "Hybrid") {
                        if (typeof OnlineSharedSettings.Inmap === "boolean") {
                            exinfo = `Presencia real en el mapa: ${OnlineSharedSettings.Inmap ? "SÍ" : "NO"}`;
                        } else {
                            exinfo = "Presencia real en el mapa: ?";
                        }
                    }
                    const {
                        X,
                        Y
                    } = MapData.Pos;
                    ChatRoomSendLocal(`X = ${X} - Y = ${Y} - ${exinfo}`);
                    if (character === Player) keysinfo(Player);
                } else {
                    ChatRoomSendLocal("No ha entrado al mapa");
                }
                ChatRoomSendLocal(" ");
            });
        }
    }])

    CommandCombine([{
        Tag: 'mapx',
        Description: "(posicion-x): cambia tu coordenada X en el mapa.",
        Action: (args) => {
            const plx = Number(args);
            if (args === "" || isNaN(plx) || plx < 0 || plx > 39) {
                infomsg("El comando mapx debe ir seguido de un número entre 0 y 39.");
                return;
            }
            if (!IsMapRoom()) return infomsg(umsg5);
            if (!Player.MapData) return infomsg("¡No has entrado al mapa!");
            if (plx === Player.MapData.Pos.X) return;
            const D = plx < Player.MapData.Pos.X ? "Oeste" : "Este";
            const m = Math.abs(plx - Player.MapData.Pos.X);
            const X = plx;
            const Y = Player.MapData.Pos.Y;
            const Time = ChatRoomMapViewCanEnterTile(X, Y);
            if (Time > 0) {
                ChatRoomMapViewMovement = {
                    X,
                    Y,
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
    }])

    CommandCombine([{
        Tag: 'mapy',
        Description: "(posicion-y): cambia tu coordenada Y en el mapa.",
        Action: (args) => {
            const ply = Number(args);
            if (args === "" || isNaN(ply) || ply < 0 || ply > 39) {
                infomsg("El comando mapy debe ir seguido de un número entre 0 y 39.");
                return;
            }
            if (!IsMapRoom()) return infomsg(umsg5);
            if (!Player.MapData) return infomsg("¡No has entrado al mapa!");
            if (ply === Player.MapData.Pos.Y) return;
            const D = ply < Player.MapData.Pos.Y ? "Norte" : "Sur";
            const m = Math.abs(ply - Player.MapData.Pos.Y);
            const X = Player.MapData.Pos.X;
            const Y = ply;
            const Time = ChatRoomMapViewCanEnterTile(X, Y);
            if (Time > 0) {
                ChatRoomMapViewMovement = {
                    X,
                    Y,
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
    }])

    CommandCombine([{
        Tag: 'mapz',
        Description: "(objetivo): da las coordenadas en el mapa.",
        Action: (args) => {
            if (!IsMapRoom()) return infomsg(umsg5);
            const target = args ? TargetSearch(args) : Player;
            if (!target) return;
            const mapData = target.MapData;
            if (!mapData) {
                ChatRoomSendLocal("No ha entrado al mapa");
                ChatRoomSendLocal(" ");
                return;
            }
            let exinfo = "";
            const mapType = ChatRoomData?.MapData?.Type;
            if (mapType === "Always") {
                exinfo = "Presencia real en el mapa: SÍ";
            } else if (mapType === "Hybrid") {
                const inmap = target.OnlineSharedSettings?.Inmap;
                exinfo = "Presencia real en el mapa: " +
                    (inmap === true ? "SÍ" : inmap === false ? "NO" : "?");
            }
            ChatRoomSendLocal(`X = ${mapData.Pos?.X ?? "?"} - Y = ${mapData.Pos?.Y ?? "?"} - ${exinfo}`);
            if (target === Player) keysinfo(Player);
            ChatRoomSendLocal(" ");
        }
    }])

    CommandCombine([{
        Tag: 'mapzoom',
        Description: "(valor): cambia el nivel de zoom en las salas con mapa.",
        Action: (args) => {
            const plz = Number(args);
            if (args === "" || isNaN(plz) || plz < 7 || plz > 50) {
                infomsg("El comando mapzoom debe ir seguido de un número entre 7 y 50.");
                return;
            }
            if (!IsMapRoom()) return infomsg(umsg5);
            ChatRoomMapViewPerceptionRangeMax = plz;
            infomsg("¡Nivel de zoom modificado! ¡Disfruta!");
        }
    }])

    CommandCombine([{
        Tag: 'maxstatistics',
        Description: ": otorga estadísticas máximas.",
        Action: () => {
            ReputationChange("ABDL", 100);
            if (ReputationGet("Asylum") >= 0) ReputationChange("Asylum", 100);
            if (ReputationGet("Asylum") < 0) ReputationChange("Asylum", -100);
            if (ReputationGet("Dominant") >= 0) ReputationChange("Dominant", 100);
            if (ReputationGet("Dominant") < 0) ReputationChange("Dominant", -100);
            ReputationChange("Gambling", 100);
            ReputationChange("Gaming", 100);
            ReputationChange("LARP", 100);
            let magh = 0;
            if (ReputationGet("HouseAmplector") != 0) magh = 1;
            if (ReputationGet("HouseCorporis") != 0) magh = 2;
            if (ReputationGet("HouseMaiestas") != 0) magh = 3;
            if (ReputationGet("HouseVincula") != 0) magh = 4;
            let house = "";
            if (magh == 0) house = "HouseAmplector";
            if (magh == 1) house = "HouseAmplector";
            if (magh == 2) house = "HouseCorporis";
            if (magh == 3) house = "HouseMaiestas";
            if (magh == 4) house = "HouseVincula";
            ReputationChange(house, 100);
            ReputationChange("Maid", 100);
            SkillChange(Player, "Bondage", 10);
            SkillChange(Player, "Dressage", 10);
            SkillChange(Player, "Evasion", 10);
            SkillChange(Player, "Infiltration", 10);
            SkillChange(Player, "LockPicking", 10)
            SkillChange(Player, "SelfBondage", 10);
            SkillChange(Player, "Willpower", 10);
            GameLARPLevelProgress(10000);
            LogAdd("BondageCollege", "Import");
            LogAdd("KidnapSophie", "Sarah");
            let msg = "¡Cambios realizados! Algunas otras cosas deben configurarse con los comandos /roleplay y /rolequit.";
            infomsg(msg);
        }
    }])

    CommandCombine([{
        Tag: 'mbsroom',
        Description: ": da información sobre las ruedas de la fortuna MBS en la sala de chat actual.",
        Action: () => {
            ChatRoomCharacter.forEach(character => {
                const {
                    Nickname,
                    Name,
                    MemberNumber,
                    OnlineSharedSettings = {}
                } = character;
                const command = "mbsroom";
                UBCinfo(character, command);
                if (!InventoryAvailable(character, "WheelFortune", "ItemDevices")) {
                    ChatRoomSendLocal("No tiene una rueda de la fortuna.");
                    ChatRoomSendLocal(" ");
                    return;
                }
                const MBS = OnlineSharedSettings.MBS;
                const MBSVersion = OnlineSharedSettings.MBSVersion;
                if (!MBS) {
                    ChatRoomSendLocal("No tiene una rueda de la fortuna MBS.");
                    ChatRoomSendLocal(" ");
                    return;
                }
                ChatRoomSendLocal("Tiene una rueda de la fortuna MBS.");
                if (MBS.Version !== undefined) {
                    ChatRoomSendLocal("No tiene opciones personalizadas en esta rueda.");
                    ChatRoomSendLocal(" ");
                    return;
                }
                let decompressed;
                if (MBSVersion) {
                    const [MBS1, MBS2, MBS3] = MBSVersion.split(".").map(Number);
                    decompressed = ((MBS1 === 0) && (MBS2 <= 6) && (MBS3 <= 22)) ?
                        LZString.decompressFromBase64(MBS) :
                        LZString.decompressFromUTF16(MBS);
                } else {
                    decompressed = LZString.decompressFromUTF16(MBS);
                }
                let MBSwhdata;
                try {
                    MBSwhdata = JSON.parse(decompressed);
                } catch {
                    ChatRoomSendLocal("Error al leer las opciones personalizadas.");
                    ChatRoomSendLocal(" ");
                    return;
                }
                let found = false;
                if (MBSwhdata && MBSwhdata.FortuneWheelItemSets) {
                    MBSwhdata.FortuneWheelItemSets.forEach((item, i) => {
                        if (item != null) {
                            found = true;
                            ChatRoomSendLocal(i + " - " + item.name);
                        }
                    });
                }
                if (!found) {
                    ChatRoomSendLocal("No tiene opciones personalizadas en esta rueda.");
                }
                ChatRoomSendLocal(" ");
            });
        }
    }])

    CommandCombine([{
        Tag: 'message',
        Description: "(opción) (mensaje): crea un mensaje personalizado para un comando específico.",
        Action: (_, command, args) => {
            if (silent) {
                let msg = umsg1 + umsg7;
                infomsg(msg);
                return;
            }
            var [option] = args;
            if (!option) {
                let msg = "El comando message debe ir seguido de una opción y el mensaje que desees en lugar del predeterminado.\n" +
                    "Cada opción corresponde a un comando, añadiendo un prefijo 't' para su uso en otros jugadores.\n" +
                    "Opciones sobre uno mismo: clothes, invisible, lock, naked, pet, randomize, restrain, solidity, totalrelease, underwear, unlock, untie, visible\n" +
                    "Opciones sobre otros jugadores: tclothes, tinvisible, tlock, tnaked, tpet, trandomize, trestrain, tsolidity, ttotalrelease, tunderwear, tunlock, tuntie, tvisible\n" +
                    " \n" +
                    "Al escribir el mensaje, el nombre o apodo se añadirá antes de este.\n" +
                    "Al actuar sobre otro jugador, el nombre o apodo del objetivo se añadirá después del mensaje.\n" +
                    "Usa ? para volver al mensaje predeterminado.\n" +
                    "Usa ! para seleccionar el modo silencioso (sin mensaje).";
                infomsg(msg);
                return;
            }
            let [, , ...message] = command.split(" ");
            let custom = message?.join(" ");
            if (custom != "") {
                let change = 0;
                let option2 = "";
                if (msgcommand.includes(option)) change = 1;
                if ((option.startsWith("t")) && (option != "totalrelease")) {
                    change = 2;
                    option2 = option.slice(1);
                }
                let msg1 = "<p style='background-color:#5fbd7a'>ULTRAbc: Modo silencioso guardado para el comando " + option + " sobre uno mismo.</p>";
                let msg2 = "<p style='background-color:#5fbd7a'>ULTRAbc: Regreso al mensaje predeterminado para el comando " + option + " sobre uno mismo.</p>"
                let msg3 = "<p style='background-color:#5fbd7a'>ULTRAbc: Nuevo mensaje guardado para el comando " + option + " sobre uno mismo.</p>"
                let msg4 = "<p style='background-color:#5fbd7a'>ULTRAbc: Modo silencioso guardado para el comando " + option2 + " sobre otros jugadores.</p>";
                let msg5 = "<p style='background-color:#5fbd7a'>ULTRAbc: Regreso al mensaje predeterminado para el comando " + option2 + " sobre otros jugadores.</p>";
                let msg6 = "<p style='background-color:#5fbd7a'>ULTRAbc: Nuevo mensaje guardado para el comando " + option2 + " sobre otros jugadores.</p>";
                if (option == "allcolor") {
                    Allcolor = custom;
                    if (custom == "!") Allcolor = "no message";
                    if (custom == "?") Allcolor = "";
                }
                if (option == "clothes") {
                    Clothes = custom;
                    if (custom == "!") Clothes = "no message";
                    if (custom == "?") Clothes = "";
                }
                if (option == "invisible") {
                    Invisible = custom;
                    if (custom == "!") Invisible = "no message";
                    if (custom == "?") Invisible = "";
                }
                if (option == "lock") {
                    Mlock = custom;
                    if (custom == "!") Mlock = "no message";
                    if (custom == "?") Mlock = "";
                }
                if (option == "naked") {
                    Naked = custom;
                    if (custom == "!") Naked = "no message";
                    if (custom == "?") Naked = "";
                }
                if (option == "pet") {
                    Pet = custom;
                    if (custom == "!") Pet = "no message";
                    if (custom == "?") Pet = "";
                }
                if (option == "randomize") {
                    Randomize = custom;
                    if (custom == "!") Randomize = "no message";
                    if (custom == "?") Randomize = "";
                }
                if (option == "restrain") {
                    Restrain = custom;
                    if (custom == "!") Restrain = "no message";
                    if (custom == "?") Restrain = "";
                }
                if (option == "solidity") {
                    Solidity = custom;
                    if (custom == "!") Solidity = "no message";
                    if (custom == "?") Solidity = "";
                }
                if (option == "tallcolor") {
                    Tallcolor = custom;
                    if (custom == "!") Tallcolor = "no message";
                    if (custom == "?") Tallcolor = "";
                }
                if (option == "tclothes") {
                    Tclothes = custom;
                    if (custom == "!") Tclothes = "no message";
                    if (custom == "?") Tclothes = "";
                }
                if (option == "tinvisible") {
                    Tinvisible = custom;
                    if (custom == "!") Tinvisible = "no message";
                    if (custom == "?") Tinvisible = "";
                }
                if (option == "tlock") {
                    Tlock = custom;
                    if (custom == "!") Tlock = "no message";
                    if (custom == "?") Tlock = "";
                }
                if (option == "tnaked") {
                    Tnaked = custom;
                    if (custom == "!") Tnaked = "no message";
                    if (custom == "?") Tnaked = "";
                }
                if (option == "totalrelease") {
                    Totalrelease = custom;
                    if (custom == "!") Totalrelease = "no message";
                    if (custom == "?") Totalrelease = "";
                }
                if (option == "tpet") {
                    Tpet = custom;
                    if (custom == "!") Tpet = "no message";
                    if (custom == "?") Tpet = "";
                }
                if (option == "trandomize") {
                    Trandomize = custom;
                    if (custom == "!") Trandomize = "no message";
                    if (custom == "?") Trandomize = "";
                }
                if (option == "trestrain") {
                    Trestrain = custom;
                    if (custom == "!") Trestrain = "no message";
                    if (custom == "?") Trestrain = "";
                }
                if (option == "tsolidity") {
                    Tsolidity = custom;
                    if (custom == "!") Tsolidity = "no message";
                    if (custom == "?") Tsolidity = "";
                }
                if (option == "ttotalrelease") {
                    Ttotalrelease = custom;
                    if (custom == "!") Ttotalrelease = "no message";
                    if (custom == "?") Ttotalrelease = "";
                }
                if (option == "tunderwear") {
                    Tunderwear = custom;
                    if (custom == "!") Tunderwear = "no message";
                    if (custom == "?") Tunderwear = "";
                }
                if (option == "tunlock") {
                    Tunlock = custom;
                    if (custom == "!") Tunlock = "no message";
                    if (custom == "?") Tunlock = "";
                }
                if (option == "tuntie") {
                    Tuntie = custom;
                    if (custom == "!") Tuntie = "no message";
                    if (custom == "?") Tuntie = "";
                }
                if (option == "tvisible") {
                    Tvisible = custom;
                    if (custom == "!") Tvisible = "no message";
                    if (custom == "?") Tvisible = "";
                }
                if (option == "underwear") {
                    Underwear = custom;
                    if (custom == "!") Underwear = "no message";
                    if (custom == "?") Underwear = "";
                }
                if (option == "unlock") {
                    Unlock = custom;
                    if (custom == "!") Unlock = "no message";
                    if (custom == "?") Unlock = "";
                }
                if (option == "untie") {
                    Untie = custom;
                    if (custom == "!") Untie = "no message";
                    if (custom == "?") Untie = "";
                }
                if (option == "visible") {
                    Visible = custom;
                    if (custom == "!") Visible = "no message";
                    if (custom == "?") Visible = "";
                }
                if (change == 1) {
                    let msf = msg3;
                    if (custom == "!") msf = msg1;
                    if (custom == "?") msf = msg2;
                    ChatRoomSendLocal(msf);
                    M_MOANER_saveControls();
                }
                if (change == 2) {
                    let msf = msg6;
                    if (custom == "!") msf = msg4;
                    if (custom == "?") msf = msg5;
                    ChatRoomSendLocal(msf);
                    M_MOANER_saveControls();
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'mission',
        Description: "(mision): va a la sala de infiltración y fuerza una misión específica.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando mission debe incluir una misión.\n" +
                    "Misiones disponibles:\n" +
                    "burglar, kidnap, rescue, retrieve, sabotage.\n" +
                    "Misión aleatoria con 'random'.";
                infomsg(msg);
            } else {
                mission = args;
                if (mission == "random") mission = "";
                M_MOANER_saveControls();
                RoomToGame();
                CommonSetScreen("Room", "Infiltration");
            }
        }
    }])

    CommandCombine([{
        Tag: 'mstatus',
        Description: ": muestra el estado actual del moaner.",
        Action: () => {
            showStatus();
        }
    }])

    CommandCombine([{
        Tag: 'murmur',
        Description: "(NumeroMiembro|Nombre|Apodo)(Mensaje): envía un susurro a un jugador.",
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
        Description: "(objetivo): quita la ropa.",
        Action: (args) => {
            let target = Player;
            if (args != "") target = TargetSearch(args);
            if (!target) return;
            if (target == Player) {
                let msg = "Láseres mágicos hacen desaparecer la ropa del cuerpo de " + tmpname + ".";
                targetMessage(Naked, msg, 1);
                CharacterNaked(Player);
                ChatRoomCharacterUpdate(Player);
            } else {
                if ((target.AllowItem == true) && (target.OnlineSharedSettings.UBC != undefined)) {
                    tgpname = getNickname(target);
                    if (IsTargetProtected(target)) {
                        let msg = umsg1 + tgpname + umsg2;
                        infomsg(msg);
                    } else {
                        let msg = "Láseres mágicos hacen desaparecer la ropa del cuerpo de " + tgpname + ".";
                        targetMessage(Tnaked, msg, 2);
                        CharacterNaked(target);
                        ChatRoomCharacterUpdate(target);
                    }
                }
            }
            ChatRoomSetTarget(-1);
        }
    }])

    CommandCombine([{
        Tag: 'npcprison',
        Description: "(minutos): permanece en la prisión NPC de Pandora.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando npcprison debe ir seguido de un número mayor a 0";
                infomsg(msg);
            } else {
                let minutes = args;
                if (minutes > 0) {
                    let msg = "" + tmpname + " es agarrada por dos sirvientas y enviada a la prisión NPC de Pandora por " + minutes + " minutos.";
                    publicmsg(msg);
                    DialogLentLockpicks = false;
                    RoomToGame();
                    PandoraBackground = "Pandora/Underground/Cell" + Math.floor(Math.random() * 7).toString();
                    PandoraRestrainPlayer();
                    PandoraPunishmentSentence(minutes);
                    PandoraPunishmentStart();
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'outfit',
        Description: "(parámetro): restaura/guarda/carga vestimentas (incluyendo accesorios).",
        Action: (args) => {
            if (args === "") {
                let msg = "Opciones para el comando outfit:\n" +
                    "<b>Todas estas opciones incluyen los accesorios</b>, por lo que es una herramienta integral de vestuario.\n" +
                    "Para restaurar la vestimenta a como estaba antes de entrar a la sala, escribir: <b>/outfit reset</b> o <b>/outfit restore</b> o <b>/outfit revert</b>\n" +
                    "Se pueden guardar tres configuraciones usando <b>/outfit save1</b> o <b>/outfit save2</b> o <b>/outfit save3</b>\n" +
                    "Para cargar configuraciones guardadas, escribir: <b>/outfit load1</b> o <b>/outfit load2</b> o <b>/outfit load3</b>\n" +
                    "Habrá un margen de 5 segundos para hacer clic en el objetivo. Reintentar si el guardado o la carga no tienen éxito.\n" +
                    "Estos guardados duran solo una sesión de inicio de sesión.\n" +
                    "Para mantener las vestimentas entre sesiones, utilizar el <b>botón Exportar</b> en el guardarropa.\n" +
                    "La vestimenta se guardará como un código que se puede copiar y pegar en otro lugar.\n" +
                    "Luego se pueden usar los <b>botones de Importar</b> para cargarla más tarde.";
                infomsg(msg);
            }
            if ((args === "load1") || (args === "load2") || (args === "load3")) {
                let msg = "Hay 5 segundos para hacer clic en el objetivo. Si tiene éxito, la vestimenta será cargada. De lo contrario, reintentar.";
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
                                let msg = "El comando outfit " + args + " no se ha ejecutado porque no se ha encontrado ninguna vestimenta guardada.";
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
                                    let msg = "Comando outfit " + args + " ejecutado.";
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
                let msg = "Comando outfit reset-restore-revert ejecutado.";
                infomsg(msg);
            }
            if ((args === "save1") || (args === "save2") || (args === "save3")) {
                let msg = "Tienes 5 segundos para hacer clic en el objetivo. Si tiene éxito, la vestimenta se guardará. Si no, reintenta.";
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
                                let msg = "Comando outfit " + args + " ejecutado.";
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
        Description: "(numero): cambia tus permisos de objetos.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando permission debe ir seguido de un número.\n" +
                    "El efecto será visible en tu perfil.\n" +
                    "0 Todos, sin excepciones\n" +
                    "1 Todos, excepto lista negra\n" +
                    "2 Dueño, Amante, lista blanca y Dominantes\n" +
                    "3 Dueño, Amante y lista blanca solamente\n" +
                    "4 Dueño y Amante solamente\n" +
                    "5 Solo el Dueño";
                infomsg(msg);
            } else {
                let perm = args * 1;
                if ((perm > -1) && (perm < 6)) {
                    Player.AllowedInteractions = perm;
                    ServerAccountUpdate.QueueData({
                        AllowedInteractions: Player.AllowedInteractions,
                        ItemPermission: Player.AllowedInteractions
                    }, true);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'pet',
        Description: "(objetivo): se convierte en una mascota totalmente restringida.",
        Action: (args) => {
            let target = Player;
            if (args != "") target = TargetSearch(args);
            if (!target) return;
            if (target == Player) {
                let msg = "" + tmpname + " se convierte en una linda mascota.";
                targetMessage(Pet, msg, 1);
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
                        let msg = "" + tgpname + " se convierte en una linda mascota.";
                        targetMessage(Tpet, msg, 2);
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
                ChatRoomSetTarget(-1);
            }
        }
    }])

    CommandCombine([{
        Tag: 'ping',
        Description: "(NumeroMiembro)(Mensaje): envía un pitido (beep) a un jugador.",
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
        Description: ": acceso directo al menú de Preferencias.",
        Action: () => {
            PrfClick();
        }
    }])

    CommandCombine([{
        Tag: 'poof',
        Description: "(accion): abandona el club muy rápido.",
        Action: (args) => {
            let message = "";
            if (args === "") {
                message = " desaparece de repente (poof)."
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
        Description: "(pose) (objetivo): cambia la pose de cualquier jugador.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando pose2 debe ir seguido de una pose y, opcionalmente, un objetivo.\n" +
                    " \n" +
                    "Poses disponibles:\n" +
                    "armsfree, belly, boxtied, cuffed, elbowtied,\n" +
                    "kneel1, kneel2, legsclosed, legsopen, pet,\n" +
                    "spreadarms1, spreadarms2, spreadeagle1\n" +
                    "spreadeagle2, spreadlegs, stand, suspension,\n" +
                    "tapedhands. Solo en ti mismo: exercise, jump.\n" +
                    "Usa <b>/pose2 reset</b> (objetivo) para volver a la pose neutral.\n" +
                    "Si WCE está activo, usa <b>/pose baseupper</b> solo en ti mismo cuando /pose2 reset falle.";
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
                        let msg = "" + tmpname + " relaja sus brazos.";
                        publicmsg(msg);
                    } else if ((pose == "belly") &&
                        (Player.ActivePose != 'Hogtied') &&
                        (PoseCanChangeUnaided(Player, 'Hogtied'))) {
                        PoseSetActive(Player, "Hogtied");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " se relaja sobre su vientre.";
                        publicmsg(msg);
                    } else if ((pose == "boxtied") &&
                        (Player.ActivePose != 'BackBoxTie') &&
                        (PoseCanChangeUnaided(Player, 'BackBoxTie'))) {
                        PoseSetActive(Player, "BackBoxTie");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " pone sus brazos detrás de la espalda.";
                        publicmsg(msg);
                    } else if ((pose == "cuffed") &&
                        (Player.ActivePose != 'BackCuffs') &&
                        (PoseCanChangeUnaided(Player, 'BackCuffs'))) {
                        PoseSetActive(Player, "BackCuffs");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " pone sus brazos como si estuviera esposada.";
                        publicmsg(msg);
                    } else if ((pose == "elbowtied") &&
                        (Player.ActivePose != 'BackElbowTouch') &&
                        (PoseCanChangeUnaided(Player, 'BackElbowTouch'))) {
                        PoseSetActive(Player, "BackElbowTouch");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " pone sus brazos tras la espalda, con los codos casi tocándose.";
                        publicmsg(msg);
                    } else if ((pose == "kneel1") &&
                        (Player.ActivePose != 'Kneel') &&
                        ((PoseCanChangeUnaided(Player, 'Kneel')) || (ChatRoomCanAttemptKneel(Player) == true))) {
                        PoseSetActive(Player, "Kneel");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " se arrodilla.";
                        publicmsg(msg);
                    } else if ((pose == "kneel2") &&
                        (Player.ActivePose != 'KneelingSpread') &&
                        (PoseCanChangeUnaided(Player, 'KneelingSpread'))) {
                        PoseSetActive(Player, "KneelingSpread");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " se arrodilla y abre sus piernas.";
                        publicmsg(msg);
                    } else if ((pose == "legsclosed") &&
                        (Player.ActivePose != 'LegsClosed') &&
                        (PoseCanChangeUnaided(Player, 'LegsClosed'))) {
                        PoseSetActive(Player, "LegsClosed");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " se pone de pie y cierra sus piernas.";
                        publicmsg(msg);
                    } else if ((pose == "legsopen") &&
                        (Player.ActivePose != 'LegsOpen') &&
                        (PoseCanChangeUnaided(Player, 'LegsOpen'))) {
                        PoseSetActive(Player, "LegsOpen");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " se pone de pie normalmente.";
                        publicmsg(msg);
                    } else if ((pose == "pet") &&
                        (Player.ActivePose != 'AllFours') &&
                        (PoseCanChangeUnaided(Player, 'AllFours'))) {
                        PoseSetActive(Player, "AllFours");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " se relaja a cuatro patas.";
                        publicmsg(msg);
                    } else if ((pose == "spreadarms1") &&
                        (Player.ActivePose != 'Yoked') &&
                        (PoseCanChangeUnaided(Player, 'Yoked'))) {
                        PoseSetActive(Player, "Yoked");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " levanta sus manos.";
                        publicmsg(msg);
                    } else if ((pose == "spreadarms2") &&
                        (Player.ActivePose != 'OverTheHead') &&
                        (PoseCanChangeUnaided(Player, 'OverTheHead'))) {
                        PoseSetActive(Player, "OverTheHead");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " levanta las manos por encima de su cabeza.";
                        publicmsg(msg);
                    } else if ((pose == "spreadeagle1") &&
                        ((Player.ActivePose == null) || (Player.ActivePose.includes('Yoked') == false) || (Player.ActivePose.includes('Spread') == false)) &&
                        (PoseCanChangeUnaided(Player, 'Yoked')) &&
                        (PoseCanChangeUnaided(Player, 'Spread'))) {
                        PoseSetActive(Player, "Yoked");
                        PoseSetActive(Player, "Spread")
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " levanta sus manos y abre sus piernas.";
                        publicmsg(msg);
                    } else if ((pose == "spreadeagle2") &&
                        ((Player.ActivePose == null) || (Player.ActivePose.includes('OverTheHead') == false) || (Player.ActivePose.includes('Spread') == false)) &&
                        (PoseCanChangeUnaided(Player, 'OverTheHead')) &&
                        (PoseCanChangeUnaided(Player, 'Spread'))) {
                        PoseSetActive(Player, "OverTheHead");
                        PoseSetActive(Player, "Spread")
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " levanta las manos sobre su cabeza y abre sus piernas.";
                        publicmsg(msg);
                    } else if ((pose == "spreadlegs") &&
                        (Player.ActivePose != 'Spread') &&
                        (PoseCanChangeUnaided(Player, 'Spread'))) {
                        PoseSetActive(Player, "Spread");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " abre sus piernas.";
                        publicmsg(msg);
                    } else if ((pose == "stand") &&
                        (Player.ActivePose != null) &&
                        ((PoseCanChangeUnaided(Player, null)) || (ChatRoomCanAttemptStand(Player) == true))) {
                        PoseSetActive(Player, null);
                        ChatRoomCharacterUpdate(Player);
                        CharacterRefresh(Player);
                        let msg = "" + tmpname + " se pone de pie.";
                        publicmsg(msg);
                    } else if ((pose == "suspension") &&
                        (Player.ActivePose != 'Suspension') &&
                        (PoseCanChangeUnaided(Player, 'Suspension'))) {
                        PoseSetActive(Player, "Suspension");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " está ahora en una pose acrobática en suspensión.";
                        publicmsg(msg);
                    } else if ((pose == "tapedhands") &&
                        (Player.ActivePose != 'TapedHands') &&
                        (PoseCanChangeUnaided(Player, 'TapedHands'))) {
                        PoseSetActive(Player, "TapedHands");
                        ChatRoomCharacterUpdate(Player);
                        let msg = "" + tmpname + " estira los brazos como si tuviera las manos encintadas.";
                        publicmsg(msg);
                        // Poses especiales
                    } else if (pose == "jump") {
                        let msg = "" + tmpname + " salta de alegría.";
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
                            msg1 = "Estás demasiado atada para hacer ejercicio.";
                            infomsg(msg1);
                        }
                        if (msg1 == "") {
                            let msg2 = "" + tmpname + " hace su entrenamiento.";
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
                                    let msg = "" + tmpname + " deja que " + tgpname + " relaje sus brazos.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "belly") {
                                if ((target.ActivePose != 'Hogtied') &&
                                    (PoseCanChangeUnaided(target, 'Hogtied'))) {
                                    PoseSetActive(target, "Hogtied");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " obliga a " + tgpname + " a quedarse sobre su vientre.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "boxtied") {
                                if ((target.ActivePose != 'BackBoxTie') &&
                                    (PoseCanChangeUnaided(target, 'BackBoxTie'))) {
                                    PoseSetActive(target, "BackBoxTie");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " obliga a " + tgpname + " a poner los brazos tras su espalda.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "cuffed") {
                                if ((target.ActivePose != 'BackCuffs') &&
                                    (PoseCanChangeUnaided(target, 'BackCuffs'))) {
                                    PoseSetActive(target, "BackCuffs");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " obliga a " + tgpname + " a estirar los brazos como si estuviera esposada.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "elbowtied") {
                                if ((target.ActivePose != 'BackElbowTouch') &&
                                    (PoseCanChangeUnaided(target, 'BackElbowTouch'))) {
                                    PoseSetActive(target, "BackElbowTouch");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " obliga a " + tgpname + " a poner los brazos tras su espalda, con los codos casi tocándose.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "kneel1") {
                                if ((target.ActivePose != 'Kneel') &&
                                    ((PoseCanChangeUnaided(target, 'Kneel')) || (ChatRoomCanAttemptKneel(target) == true))) {
                                    PoseSetActive(target, "Kneel");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " ayuda a " + tgpname + " a arrodillarse.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "kneel2") {
                                if ((target.ActivePose != 'KneelingSpread') &&
                                    (PoseCanChangeUnaided(target, 'KneelingSpread'))) {
                                    PoseSetActive(target, "KneelingSpread");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " ayuda a " + tgpname + " a arrodillarse, forzando sus piernas a abrirse.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "legsclosed") {
                                if ((target.ActivePose != 'LegsClosed') &&
                                    (PoseCanChangeUnaided(target, 'LegsClosed'))) {
                                    PoseSetActive(target, "LegsClosed");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " ayuda a " + tgpname + " a ponerse de pie con sus piernas cerradas.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "legsopen") {
                                if ((target.ActivePose != 'LegsOpen') &&
                                    (PoseCanChangeUnaided(target, 'LegsOpen'))) {
                                    PoseSetActive(target, "LegsOpen");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " ayuda a " + tgpname + " a ponerse de pie normalmente sobre sus pies.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "pet") {
                                if ((target.ActivePose != 'AllFours') &&
                                    (PoseCanChangeUnaided(target, 'AllFours'))) {
                                    PoseSetActive(target, "AllFours");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " obliga a " + tgpname + " a ponerse a cuatro patas.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "spreadarms1") {
                                if ((target.ActivePose != 'Yoked') &&
                                    (PoseCanChangeUnaided(target, 'Yoked'))) {
                                    PoseSetActive(target, "Yoked");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " ayuda a " + tgpname + " a levantar sus manos.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "spreadarms2") {
                                if ((target.ActivePose != 'OverTheHead') &&
                                    (PoseCanChangeUnaided(target, 'OverTheHead'))) {
                                    PoseSetActive(target, "OverTheHead");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " obliga a " + tgpname + " a levantar las manos por encima de su cabeza.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "spreadeagle1") {
                                if (((target.ActivePose == null) || (target.ActivePose.includes('Yoked') == false) || (target.ActivePose.includes('Spread') == false)) &&
                                    (PoseCanChangeUnaided(target, 'Yoked')) &&
                                    (PoseCanChangeUnaided(target, 'Spread'))) {
                                    PoseSetActive(target, "Yoked");
                                    PoseSetActive(target, "Spread");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " obliga a " + tgpname + " a levantar las manos y abrir las piernas.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "spreadeagle2") {
                                if (((target.ActivePose == null) || (target.ActivePose.includes('OverTheHead') == false) || (target.ActivePose.includes('Spread') == false)) &&
                                    (PoseCanChangeUnaided(target, 'OverTheHead')) &&
                                    (PoseCanChangeUnaided(target, 'Spread'))) {
                                    PoseSetActive(target, "OverTheHead");
                                    PoseSetActive(target, "Spread");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " obliga a " + tgpname + " a levantar las manos sobre la cabeza y abrir las piernas.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "spreadlegs") {
                                if ((target.ActivePose != 'Spread') &&
                                    (PoseCanChangeUnaided(target, 'Spread'))) {
                                    PoseSetActive(target, "Spread");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " obliga a " + tgpname + " a abrir sus piernas.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "stand") {
                                if ((target.ActivePose != null) &&
                                    ((PoseCanChangeUnaided(target, null)) || (ChatRoomCanAttemptStand(target) == true))) {
                                    PoseSetActive(target, null);
                                    ChatRoomCharacterUpdate(target);
                                    CharacterRefresh(target);
                                    let msg = "" + tmpname + " ayuda a " + tgpname + " a ponerse de pie.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "suspension") {
                                if ((target.ActivePose != 'Suspension') &&
                                    (PoseCanChangeUnaided(target, 'Suspension'))) {
                                    PoseSetActive(target, "Suspension");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " obliga a " + tgpname + " a ponerse en una pose acrobática en suspensión.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "tapedhands") {
                                if ((target.ActivePose != 'TapedHands') &&
                                    (PoseCanChangeUnaided(target, 'TapedHands'))) {
                                    PoseSetActive(target, "TapedHands");
                                    ChatRoomCharacterUpdate(target);
                                    let msg = "" + tmpname + " obliga a " + tgpname + " a estirar los brazos como si tuviera las manos encintadas.";
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
        Tag: 'prison',
        Description: "(minutos): permanece en la prisión online de Pandora.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando prison debe ir seguido de un número mayor a 0. Provocará un relog automático antes de enviarte a prisión.\n" +
                    "Si lo usas estando sola en una sala, se creará una nueva sala automáticamente.\n" +
                    "Se recomienda usarlo en una sala de Pandora existente en la que hayas entrado primero como jugador normal.\n" +
                    "Si lo usas en una sala que no sea de Pandora, no habrá temporizador, pero los guardias de Pandora estarán activos durante el tiempo solicitado.\n" +
                    "Para un funcionamiento correcto en todos los casos, asegúrate de tener activados los ajustes de Inmersión apropiados para la auto-recreación de salas."
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
        Description: "(accion): abandona la sala.",
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
        Description: "(objetivo): comandos naked + underwear + clothes + restrain combinados.",
        Action: (args) => {
            let target = Player;
            if (args != "") target = TargetSearch(args);
            if (!target) return;
            if (target == Player) {
                let msg = "Láseres mágicos aplican ropa y ataduras aleatorias en el cuerpo de " + tmpname + ".";
                targetMessage(Randomize, msg, 1);
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
                        let msg = "Láseres mágicos aplican ropa y ataduras aleatorias en el cuerpo de " + tgpname + ".";
                        targetMessage(Trandomize, msg, 2);
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
    }])

    CommandCombine([{
        Tag: 'relog',
        Description: ": reconecta (relog).",
        Action: () => {
            ServerSocket.close();
            ServerSocket.open();
        }
    }])

    CommandCombine([{
        Tag: 'removecollar',
        Description: ": quita temporalmente el collar de esclava/dueño.",
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
        Tag: 'resetdifficulty',
        Description: ": restablece la dificultad, abandonándola.",
        Action: (args) => {
            if (args === "") {
                let msg = "<b>Advertencia</b>: Restablecer la dificultad implicará un periodo de espera de 7 días para volver a cambiarla. Confirma escribiendo: <b>/resetdifficulty yes</b>";
                infomsg(msg);
            } else if (args === "yes") {
                Player.Difficulty = [];
                let msg = "Dificultad restablecida, selecciona una nueva en los ajustes.";
                infomsg(msg);
            }
        }
    }])

    CommandCombine([{
        Tag: 'resetinventory',
        Description: ": borra tu inventario.",
        Action: (args) => {
            if (args === "") {
                let msg = "<b>Advertencia</b>: Perderás mucha ropa y objetos, tendrás que comprarlos de nuevo. Confirma escribiendo: <b>/resetinventory yes</b>";
                infomsg(msg);
            } else if (args === "yes") {
                Player.Inventory = [];
                ServerPlayerInventorySync();
                let msg = "Logrado. Visita la tienda para comprar nueva ropa y objetos.";
                infomsg(msg);
            }
        }
    }])

    CommandCombine([{
        Tag: 'restrain',
        Description: "(objetivo): añade ataduras aleatorias.",
        Action: (args) => {
            let target = Player;
            if (args != "") target = TargetSearch(args);
            if (!target) return;
            if (target == Player) {
                let msg = "Láseres mágicos aplican ataduras aleatorias en el cuerpo de " + tmpname + ".";
                targetMessage(Restrain, msg, 1);
                CharacterFullRandomRestrain(Player, "ALL");
                ChatRoomCharacterUpdate(Player);
            } else {
                if ((target.AllowItem == true) && (target.OnlineSharedSettings.UBC != undefined)) {
                    tgpname = getNickname(target);
                    if (IsTargetProtected(target)) {
                        let msg = umsg1 + tgpname + umsg2;
                        infomsg(msg);
                    } else {
                        let msg = "Láseres mágicos aplican ataduras aleatorias en el cuerpo de " + tgpname + ".";
                        targetMessage(Trestrain, msg, 2);
                        CharacterFullRandomRestrain(target, "ALL");
                        ChatRoomCharacterUpdate(target);
                    }
                }
            }
            ChatRoomSetTarget(-1);
        }
    }])

    CommandCombine([{
        Tag: 'roleplay',
        Description: "(rol): comienza a jugar un rol específico.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando roleplay debe incluir un rol.\n" +
                    "Podrás verificar los cambios en tu perfil.\n" +
                    " \n" +
                    "Roles disponibles:\n" +
                    "doctor, headmaid, magician, magus,\n" +
                    "maid, nurse, oracle, patient,\n" +
                    "permanentpatient, sage, sorcerer, warlock, witch, wizard.\n";
                infomsg(msg);
            } else {
                let role = args;
                if (role == "doctor") {
                    LogAdd("Committed", "Asylum", CurrentTime);
                    ReputationChange('Asylum', 200);
                }
                if (role == "headmaid") LogAdd("LeadSorority", "Maid");
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
        Description: "(rol o área del club): deja de jugar un rol específico.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando rolequit debe incluir un rol o área del club.\n" +
                    "Podrás verificar los cambios en tu perfil.\n" +
                    " \n" +
                    "Roles o áreas disponibles:\n" +
                    "asylum para dejar de ser doctor, enfermera, paciente o paciente permanente.\n" +
                    "clubslave para romper el contrato de esclava del club.\n" +
                    "ggts para abandonar el entrenamiento ggts (volver al nivel 0).\n" +
                    "kidnapper para dejar de ser secuestradora o maestra secuestradora.\n" +
                    "magician para dejar uno de los 8 roles mágicos.\n" +
                    "management o mistress para dejar de ser mistress o mistress del club.\n" +
                    "sorority o maid para dejar de ser sirvienta o jefa de sirvientas.";
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
                    RoomToGame();
                    CommonSetScreen("Room", "AsylumEntrance");
                    AsylumGGTSLock(0);
                    Level = parseInt(0);
                    Player.Game.GGTS.Level = 0;
                    if (AsylumGGTSComputer != null) AsylumGGTSComputer.FixedImage = "Screens/Room/AsylumGGTS/Computer.png";
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
        Description: ": elimina un objeto específico.",
        Action: () => {
            let msg = "Tienes 5 segundos para hacer clic en el objetivo y seleccionar el área. Si tiene éxito, el objeto será retirado. Si no, reintenta.";
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
        Description: ": abre la búsqueda de chat en el lobby actual.",
        Action: () => {
            RoomToGame();
            CommonSetScreen("Online", "ChatSearch");
        }
    }])

    CommandCombine([{
        Tag: 'sfchaste',
        Description: "(modelo) (escudo frontal) (escudo trasero) (protección de manipulación) (modo orgasmo): cambia los ajustes del Cinturón de Castidad Futurista equipado.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando sfchaste debe ir seguido de 5 números para el modelo, escudo frontal, escudo trasero, protección de manipulación y modo de orgasmo.\n" +
                    " \n" +
                    "Modelos disponibles: \n" +
                    "0 Prototipo - 1 Alta Seguridad\n" +
                    "2 Entrenamiento - 3 Neo\n" +
                    " \n" +
                    "Escudos frontales:\n" +
                    "0 Abierto - 1 Bloqueado\n" +
                    " \n" +
                    "Escudos traseros:\n" +
                    "0 Abierto - 1 Bloqueado\n" +
                    " \n" +
                    "Protecciones de manipulación:\n" +
                    "0 Desactivado - 1 Cinturón - 2 Todos los objetos\n" +
                    " \n" +
                    "Modos de orgasmo:\n" +
                    "0 Permitir - 1 Castigar";
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
                            let msg = "Los ajustes de tu Cinturón de Castidad Futurista han sido modificados.";
                            infomsg(msg);
                        }
                    }
                }
            }
        }
    }])

   CommandCombine([{
        Tag: 'shock',
        Description: ": (espacio) (sensibilidad) (intensidad): cambia el modo de descarga del dispositivo equipado en un espacio específico.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando shock debe ir seguido de dos (o tres) números:\n" +
                    "- un número para el espacio afectado:\n" +
                    "0 = Brazos - 1 = Pecho - 2 = Trasero - 3 = Dispositivos - 4 = Cuello - 5 = Accesorios de Cuello - 6 = Pezones - 7 = Pelvis - 8 = Vulva\n" +
                    " \n" +
                    "- un número para la sensibilidad del dispositivo de descarga en este espacio:\n" +
                    "0 = Apagado - 1 = Baja - 2 = Media - 3 = Alta \n" +
                    "- un número para la intensidad de las descargas:\n" +
                    "1 = Baja - 2 = Media - 3 = Alta \n" +
                    "¡Ten en cuenta que la mayoría de los dispositivos no necesitan el último parámetro, ya que se refieren a un nivel que combina sensibilidad e intensidad!\n" +
                    "Varios dispositivos no pueden desactivarse. Para el Cinturón de Obediencia, usa 0 (desactivado) o 1 (activado).\n" +
                    "Este comando no es compatible con el Cinturón de Castidad Futurista ni con el Cinturón de Entrenamiento Futurista.";
                infomsg(msg);
            } else {
                let Target = "";
                let Item = "";
                let stringSol1 = args;
                let stringSol2 = stringSol1.split(/[ ,]+/);
                let slot = stringSol2[0];
                let ms = stringSol2[1];
                let mi = stringSol2[2];
                let msg = "¡Ajustes cambiados para uno de tus dispositivos de descarga!";
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
        Tag: 'sleep',
        Description: "(objetivo): usa la pastilla para dormir en ti mismo o en otro jugador.",
        Action: (args) => {
            let target = args !== "" ? TargetSearch(args) : Player;
            if (target) {
                if (target === Player) {
                    applySleepEffect(Player, tmpname, pronoun1);
                } else if (target.AllowItem === true && target.OnlineSharedSettings.UBC !== undefined) {
                    const tgpname = getNickname(target);
                    const tgpr2 = getPronoun2(target);
                    if (IsTargetProtected(target)) {
                        infomsg(umsg1 + tgpname + umsg2);
                    } else {
                        applySleepEffect(target, tgpname, tgpr2);
                    }
                }
                ChatRoomSetTarget(-1);
            }
        }
    }])

    CommandCombine([{
        Tag: 'slowleave',
        Description: "(accion): abandona la sala lentamente.",
        Action: (args) => {
            if (noescape) {
                let msg = umsg1 + umsg3;
                infomsg(msg);
            } else {
                let message = "";
                if (args === "") {
                    message = " se dirige lentamente hacia la puerta."
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
        Description: "(valor) (objetivo): cambia la solidez de la mayoría de las ataduras actuales.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando solidity debe ir seguido de un número entre 1 y 99, y opcionalmente un objetivo.\n" +
                    "Para escapar de restricciones especiales (Futuristic Crate, Wooden Rack, Armbinder Suit), usa el valor 1.";
                infomsg(msg);
            } else {
                let stringSol1 = args;
                let stringSol2 = stringSol1.split(/[ ,]+/);
                let solidity = stringSol2[0];
                let targetname = stringSol2[1];
                if ((solidity < 1) || (solidity > 99)) {
                    let msg = "El valor de solidez debe estar entre 1 y 99.";
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
                                let msg1 = "Láseres mágicos hacen desaparecer las restricciones especiales que mantenían prisionera a " + tmpname + ".";
                                targetMessage(Solidity, msg1, 1);
                            }
                            for (let A = 0; A < Player.Appearance.length; A++)
                                if (Player.Appearance[A].Asset.Group.Name != null) {
                                    if (Player.Appearance[A].Asset.Group.Name.startsWith("Item")) {
                                        Player.Appearance[A].Difficulty = solidity;
                                    }
                                }
                            ChatRoomCharacterUpdate(Player);
                            let msg2 = "La solidez de la mayoría de las ataduras actuales ha sido cambiada.";
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
                                    let msg1 = "Láseres mágicos hacen desaparecer las restricciones especiales que mantenían prisionera a " + tgpname + ".";
                                    targetMessage(Tsolidity, msg1, 2);
                                }
                                for (let A = 0; A < target.Appearance.length; A++)
                                    if (target.Appearance[A].Asset.Group.Name != null) {
                                        if (target.Appearance[A].Asset.Group.Name.startsWith("Item")) {
                                            target.Appearance[A].Difficulty = solidity;
                                        }
                                    }
                                let msg2 = "La solidez de la mayoría de las ataduras actuales de " + tgpname + " ha sido cambiada por " + tmpname + ".";
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
        Description: "(objetivo) (opcion): permite acceder a la rueda de la fortuna del objetivo, incluso si no se muestra.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando spin debe ir seguido del objetivo cuya rueda de la fortuna te interesa, y opcionalmente un modo.\n" +
                    "Modos disponibles:\n" +
                    "a = giro real automático (solo las opciones seleccionadas por el creador de la rueda)\n" +
                    "i = información sobre el máximo de opciones en la rueda\n" +
                    "r = giro aleatorio completo (incluye también las opciones no seleccionadas por el creador)\n" +
                    "Consejo: usa el modo i antes que el modo r, inicializará correctamente los mensajes.\n" +
                    "¡Ten en cuenta que el roleplay se desactiva con los modos a y r!";
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
                            let msg = "¡Mala suerte! Este jugador no tiene una rueda de la fortuna.";
                            infomsg(msg);
                        } else {
                            CurrentCharacter = target;
                            ChatRoomHideElements();
                            WheelFortuneReturnScreen = CommonGetScreen();
                            WheelFortuneBackground = ChatRoomData.Background;
                            WheelFortuneCharacter = CurrentCharacter;
                            DialogLeave();
                            WheelGame(option);
                        }
                    }
                }
                ChatRoomSetTarget(-1);
            }
        }
    }])

    CommandCombine([{
        Tag: 'stalk',
        Description: "(modo_tartamudeo) (palabras): habla una vez en un modo de tartamudeo especificado.",
        Action: (_, command, args) => {
            let help = "El comando stalk debe ir seguido de un número entre 1 y 4 para el modo de tartamudeo y las palabras que quieras decir.\n" +
                "Ten en cuenta que no se puede usar cuando estás en un modo de tartamudeo 'permanente'.\n" +
                " \n" +
                "Modos de tartamudeo disponibles:\n" +
                "1 tartamudeo ligero\n" +
                "2 tartamudeo normal\n" +
                "3 tartamudeo pesado\n" +
                "4 tartamudeo total";
            let [mode] = args;
            if (!mode || isNaN(mode) || mode < 1 || mode > 4) {
                infomsg(help);
                return;
            }
            if (st != 0) {
                infomsg("No puedes usar este comando porque estás en un modo de tartamudeo 'permanente'");
                return;
            }
            let [, , ...message] = command.split(" ");
            let msg = message?.join(" ");
            if (!msg) {
                infomsg("Por favor, incluye las palabras a decir después del modo de tartamudeo.");
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
        Description: ": abandona la sala, va a la tienda y muestra objetos ocultos.",
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
        Description: "(caras): lanza un superdado.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando superdice debe ir seguido de un número entre 2 y 999999999.";
                infomsg(msg);
            } else {
                let sides = args;
                if ((sides < 2) || (sides > 1000000000)) sides = 6;
                const Result = [];
                let Roll = Math.floor(Math.random() * sides) + 1;
                Result.push(Roll);
                let msg = "" + tmpname + " lanza un superdado de " + sides + " caras. El resultado es " + Result + ".";
                publicmsg(msg);
            }
        }
    }])

    CommandCombine([{
        Tag: 'theme',
        Description: "(numero): cambia el tema de color del chat.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando theme debe ir seguido de un número entre 0 y 3.";
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
        Description: "(opciones) muestra/oculta Créditos y/o NPCs en la pantalla de inicio, cuando se usa el mod Themed",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando thmlogin solo puede usarse si el mod Themed está activado.\n" +
                    "Debe ir seguido de un número entre 1 y 3.\n" +
                    "1 = Créditos - 2 = NPCs - 3 = 1 + 2.\n" +
                    "";
                if (Player.Themed != undefined) msg = msg + "Estado actual:";
                infomsg(msg);
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
                        let msg = "¡Ajustes de la pantalla de inicio modificados!";
                        infomsg(msg);
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'timercell',
        Description: "(minutos): permanece en la celda de aislamiento.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando timercell debe ir seguido de un número mayor a 0.";
                infomsg(msg);
            } else {
                let minutes = args;
                if (minutes > 0) {
                    let msg = "" + tmpname + " es agarrada por dos sirvientas y encerrada en una celda con temporizador por " + minutes + " minutos.";
                    publicmsg(msg);
                    DialogLentLockpicks = false;
                    RoomToGame();
                    CellLock(minutes);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'title1',
        Description: "(titulo): elige un nuevo título (de la A a la K).",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando title1 debe ir seguido de un título.\n" +
                    "También cambiará los parámetros necesarios para obtener el título.\n" +
                    "Podrás verificar los cambios en tu perfil.\n" +
                    " \n" +
                    "Títulos disponibles:\n" +
                    "admiral, agent, alien, angel, archbishop, archjudge,\n" +
                    "baby, bishop, bondagebaby, bondagemaid, brat, bunny,\n" +
                    "captain, champion, clubslave, coldbloodhorse,\n" +
                    "collegestudent, concubus, demon, diaperlover,\n" +
                    "doctor, doll, dragon, drone, drow, duchess, duke.";              
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
                if (title == "archbishop") {
                    let house = "";
                    if (ReputationGet("HouseAmplector") != 0) house = "HouseAmplector";
                    if (ReputationGet("HouseCorporis") != 0) house = "HouseCorporis";
                    if (ReputationGet("HouseMaiestas") != 0) house = "HouseMaiestas";
                    if (ReputationGet("HouseVincula") != 0) house = "HouseVincula";
                    if (ReputationGet(house) < 75) {
                        DialogSetReputation(house, 75);
                    }
                    TitleSet("Archbishop");
                }
                if (title == "archjudge") {
                    if (ReputationGet("Dominant") < 90) {
                        DialogSetReputation("Dominant", 90);
                    }
                    TitleSet("Archjudge");
                }
                if (title == "baby") {
                    if (ReputationGet("ABDL") < 1) {
                        DialogSetReputation("ABDL", 1);
                    }
                    TitleSet("Baby");
                }
                if (title == "bishop") {
                    let house = "";
                    if (ReputationGet("HouseAmplector") != 0) house = "HouseAmplector";
                    if (ReputationGet("HouseCorporis") != 0) house = "HouseCorporis";
                    if (ReputationGet("HouseMaiestas") != 0) house = "HouseMaiestas";
                    if (ReputationGet("HouseVincula") != 0) house = "HouseVincula";
                    if (ReputationGet(house) < 25) {
                        DialogSetReputation(house, 25);
                    }
                    TitleSet("Bishop");
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
                if (title == "champion") {
                    if (ReputationGet("LARP") < 100) {
                        DialogSetReputation("LARP", 100);
                    }
                    TitleSet("Champion");
                }
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
                if (title == "dragon") TitleSet("Dragon");
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
                if (title == "drow") TitleSet("Drow");
                if (title == "duchess") {
                    LogAdd("KidnapSophie", "Sarah");
                    TitleSet("Duchess");
                }
                if (title == "duke") {
                    LogAdd("KidnapSophie", "Sarah");
                    TitleSet("Duke");
                }      
            }
        }
    }])

    CommandCombine([{
        Tag: 'title2',
        Description: "(titulo): elige un nuevo título (de la E a la K).",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando title2 debe ir seguido de un título.\n" +
                    "También cambiará los parámetros necesarios para obtener el título.\n" +
                    "Podrás verificar los cambios en tu perfil.\n" +
                    " \n" +
                    "Títulos disponibles:\n" +
                    "elf, escapedpatient, farmhorse, femboy, flyingpegasus,\n" +
                    "foal, foxy, freeuse, god, goddess, goodboy, goodgirl,\n" +
                    "goodone, goodslave, goodslaveboy, goodslavegirl\n" +
                    "headmaid, hotbloodhorse, houdini, incubus, \n" +
                    "infiltrator, judge, kidnapper, king, kitten.";
                infomsg(msg);
            } else {
                let title = args;
                if (title == "elf") TitleSet("Elf");
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
                if (title == "freeuse") {
                    if (ReputationGet("Dominant") > -100) {
                        DialogSetReputation("Dominant", -100);
                    }
                    TitleSet("FreeUse");
                }
                if (title == "god") {
                    if (ReputationGet("Dominant") < 100) {
                        DialogSetReputation("Dominant", 100);
                    }
                    TitleSet("God");
                }
                if (title == "goddess") {
                    if (ReputationGet("Dominant") < 100) {
                        DialogSetReputation("Dominant", 100);
                    }
                    TitleSet("Goddess");
                }
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
                if (title == "goodone") TitleSet("Good One");
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
                if (title == "judge") {
                    if (ReputationGet("Dominant") < 50) {
                        DialogSetReputation("Dominant", 50);
                    }
                    TitleSet("Judge");
                }
                if (title == "kidnapper") {
                    if ((ReputationGet("Kidnap") < 50) || (ReputationGet("Kidnap") > 99)) {
                        DialogSetReputation("Kidnap", 50);
                    }
                    TitleSet("Kidnapper");
                }
                if (title == "king") {
                    if (ReputationGet("Dominant") < 75) {
                        DialogSetReputation("Dominant", 75);
                    }
                    TitleSet("King");
                }
                if (title == "kitten") TitleSet("Kitten");
            }
        }
    }])

    CommandCombine([{
        Tag: 'title3',
        Description: "(titulo): elige un nuevo título (de la L a la Q).",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando title3 debe ir seguido de un título.\n" +
                    "También cambiará los parámetros necesarios para obtener el título.\n" +
                    "Podrás verificar los cambios en tu perfil.\n" +
                    " \n" +
                    "Títulos disponibles:\n" +
                    "ladyluck, liege, littleone, lordfortune, magician, magus,\n" +
                    "maid, majesticalicorn, majesty, master, masterkidnapper,\n" +
                    "matron, missy, mistree, mistress, mole, nawashi, nurse,\n" +
                    "operative, oracle, patient, patriarch, patron,\n" +
                    "permanentpatient, pet, pixie, primaris, prince, princess,\n" +
                    "puppy, queen.";                 
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
                if (title == "matron") {
                    if (ReputationGet("Maid") < 50) {
                        DialogSetReputation("Maid", 50);
                    }
                    if (ReputationGet("Dominant") < 50) {
                        DialogSetReputation("Dominant", 50);
                    }
                    TitleSet("Matron");
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
                if (title == "patriarch") {
                    if (ReputationGet("Maid") < 50) {
                        DialogSetReputation("Maid", 50);
                    }
                    if (ReputationGet("Dominant") < 50) {
                        DialogSetReputation("Dominant", 50);
                    }
                    TitleSet("Patriarch");
                }
                if (title == "patron") TitleSet("Patron");
                if (title == "permanentpatient") {
                    if (ReputationGet("Asylum") > -100) {
                        DialogSetReputation("Asylum", -100);
                    }
                    TitleSet("PermanentPatient");
                }
                if (title == "pet") TitleSet("Pet");
                if (title == "pixie") TitleSet("Pixie");
                if (title == "primaris") {
                    if (ReputationGet("Asylum") < 50) {
                        DialogSetReputation("Asylum", 50);
                    }
                    if (ReputationGet("Dominant") < 50) {
                        DialogSetReputation("Dominant", 50);
                    }
                    TitleSet("Primaris");
                }
                if (title == "prince") TitleSet("Prince");
                if (title == "princess") TitleSet("Princess");
                if (title == "puppy") TitleSet("Puppy");
                if (title == "queen") {
                    if (ReputationGet("Dominant") < 75) {
                        DialogSetReputation("Dominant", 75);
                    }
                    TitleSet("Queen");
                }          
            }
        }
    }])

    CommandCombine([{
        Tag: 'title4',
        Description: "(titulo): elige un nuevo título (de la R a la Z).",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando title4 debe ir seguido de un título.\n" +
                    "También cambiará los parámetros necesarios para obtener el título.\n" +
                    "Podrás verificar los cambios en tu perfil.\n" +
                    " \n" +
                    "Títulos disponibles:\n" +
                    "sage, shiningunicorn, sissy, sorcerer,\n" +
                    "succubus, superhero, superheroine, superspy, switch,\n" +
                    "thing, tomboy, turtle, vampire, warlock,\n" +
                    "warmbloodhorse, wildmustang, witch, wizard.";
                infomsg(msg);
            } else {
                let title = args;
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
                if (title == "thing") TitleSet("Thing");
                if (title == "tomboy") TitleSet("Tomboy");
                if (title == "turtle") TitleSet("Turtle");
                if (title == "vampire") TitleSet("Vampire");
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
        Description: "(objetivo): retira todas las fijaciones, collar, arnés, castidad y accesorios.",
        Action: (args) => {
            let target = Player;
            if (args != "") target = TargetSearch(args);
            if (!target) return;
            if (target == Player) {
                if (noescape) {
                    let msg = umsg1 + umsg3;
                    infomsg(msg);
                } else {
                    let msg = "Láseres mágicos hacen desaparecer todas las fijaciones y accesorios del cuerpo de " + tmpname + ".";
                    targetMessage(Totalrelease, msg, 1);
                    SosClick();
                }
            } else {
                if ((target.AllowItem == true) && (target.OnlineSharedSettings.UBC != undefined)) {
                    tgpname = getNickname(target);
                    if (IsTargetProtected(target)) {
                        let msg = umsg1 + tgpname + umsg2;
                        infomsg(msg);
                    } else {
                        let msg = "Láseres mágicos hacen desaparecer todas las fijaciones y accesorios del cuerpo de " + tgpname + ".";
                        targetMessage(Ttotalrelease, msg, 2);
                        CharacterReleaseTotal(target);
                        ChatRoomCharacterUpdate(target);
                    }
                }
            }
            ChatRoomSetTarget(-1);
        }
    }])

    CommandCombine([{
        Tag: 'tplistadd',
        Description: "(número_miembro): añade a un jugador a la lista autorizada para teletransportarte.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando tplistadd debe ser seguido por el número de miembro del jugador al que se permite teletransportarte.";
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
        Description: "(número_miembro): elimina a un jugador de la lista autorizada para teletransportarte.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando tplistremove debe ser seguido por el número de miembro del jugador que ya no tiene permiso para teletransportarte.";
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
        Description: "muestra la lista de jugadores autorizados para teletransportarte.",
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
        Description: "(visor) (módulo de sordera) (barboquejo): cambia los ajustes de un Casco Tecno equipado.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando trsee debe ir seguido de 3 números para el visor, el módulo de sordera y el barboquejo.\n" +
                    " \n" +
                    "Visores disponibles:\n" +
                    "0 Sin visor - 1 transparente\n" +
                    "2 tinte ligero - 3 tinte fuerte\n" +
                    "4 opaco - 5 hipnótico\n" +
                    " \n" +
                    "Módulos de sordera disponibles:\n" +
                    "0 sin módulo\n" +
                    "1 ligero\n" +
                    "2 pesado\n" +
                    "3 cancelación de ruido\n" +
                    " \n" +
                    "Opciones disponibles para el barboquejo:\n" +
                    "0 Sin barboquejo\n" +
                    "1 con barboquejo";
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
                            let msg = "Los ajustes de tu Casco Tecno han sido modificados.";
                            infomsg(msg);
                        }
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'uhelp',
        Description: "(categoría): muestra los comandos de ULTRAbc.",
        Action: (args) => {
            if (args === "") {
                let msg = "El uhelp está organizado en categorías. Usa <b>/uhelp</b> (categoría). Lista de categorías:\n" +
                    "<b>admin</b> = comandos solo para administradores de la sala.\n" +
                    "<b>bondage</b> = comandos relacionados con restricciones.\n" +
                    "<b>character</b> = comandos relacionados con tu personaje.\n" +
                    "<b>chat</b> = comandos con funciones extra en la sala de chat.\n" +
                    "<b>clothing</b> = comandos relacionados con la ropa.\n" +
                    "<b>escape</b> = comandos relacionados con escapar.\n" +
                    "<b>fun</b> = comandos relacionados con diversión y efectos.\n" +
                    "<b>maps</b> = comandos relacionados con salas híbridas y de mapa.\n" +
                    "<b>misc</b> = comandos de ayuda, info, login y Ulist.\n" +
                    "<b>settings</b> = comandos para personalizar ULTRAbc.\n" +
                    "<b>talking</b> = comandos relacionados con hablar.\n" +
                    "<b>visual</b> = comandos relacionados con animaciones y fondos.\n" +
                    "<b>zones</b> = comandos relacionados con zonas de juego.\n" +
                    "Varios comandos requieren o permiten especificar un objetivo. Puede ser un nombre real, un apodo o un número de miembro.\n" +
                    "Visita también nuestra <a href='https://github.com/tetris245/ULTRAbc/wiki' target='_blank'>Wiki</a> y únete a nuestra <a href='https://steamcommunity.com/groups/ULTRAbc' target='_blank'>comunidad de Steam</a>";
                infomsg(msg);
            }
            if (args === "admin") {
                let msg = "Comandos de Admin\n" +
                    "<b>/autokick</b> = activa/desactiva la expulsión automática para cuentas de 0 días.\n" +
                    "<b>/bg1</b> = añade fondos ocultos a la pantalla de selección.\n" +
                    "<b>/bg2</b> (número) = cambia el fondo de la sala. /bg2 para ver la lista.\n" +
                    "<b>/bg3</b> (número) = utiliza un fondo personalizado. /bg3 para ver la lista.";
                infomsg(msg);
            }
            if (args === "bondage") {
                let msg = "Comandos de Restricción - * = más info al usar\n" +
                    "<b>/hint</b> (objetivo) (pista) = añade o cambia una pista para los candados con contraseña.\n" +
                    "<b>/lock</b> = añade candados a todos los objetos bloqueables. *.\n" +
                    "<b>/outfit</b> = restaura/guarda/carga vestimenta (incluyendo accesorios). *\n" +
                    "<b>/pet</b> (objetivo) = aplica restricciones totales de estado 'mascota'.\n" +
                    "<b>/randomize</b> (objetivo) = aplica una combinación aleatoria de ropa y restricciones.\n" +
                    "<b>/restrain</b> (objetivo) = añade restricciones aleatorias.\n" +
                    "<b>/solidity</b> (valor) (objetivo) = cambia la resistencia de las ataduras actuales (1-99).\n" +
                    "<b>/spin</b> (objetivo) (opción) = acceso a ruedas de la fortuna. *\n" +
                    "<b>/weaken</b> = debilita las habilidades por una hora.";
                infomsg(msg);
            }
            if (args === "character") {
                let msg = "Comandos de Personaje - * = más info al usar\n" +
                    "<b>/ctitle</b> (título) = crea un título personalizado. *\n" +
                    "<b>/difficulty</b> (número) = cambia la dificultad del juego. *\n" +
                    "<b>/maxstatistics</b> = maximiza las estadísticas.\n" +
                    "<b>/permission</b> (número) = cambia los permisos de objetos. *\n" +
                    "<b>/resetinventory</b> = borra el inventario.\n" +
                    "<b>/roleplay</b> (rol) = inicia un modo de rol. *\n" +
                    "<b>/rolequit</b> (rol) = finaliza un modo de rol. *\n" +
                    "<b>/title1</b> (nuevo título) = elige un nuevo título (A-D). *\n" +
                    "<b>/title2</b> (nuevo título) = elige un nuevo título (E-K). *\n" +
                    "<b>/title3</b> (nuevo título) = elige un nuevo título (L-Q). *\n" +
                    "<b>/title4</b> (nuevo título) = elige un nuevo título (R-Z). *";
                infomsg(msg);
            }
            if (args === "chat") {
                let msg = "Comandos de chat - * = más información al usar\n" +
                    "<b>/bio</b> (objetivo) = ve el perfil de cualquier jugador en la sala de chat.\n" +
                    "<b>/font</b> (nueva_fuente) (tamaño) = cambia la fuente en BC. *\n" +
                    "<b>/frlist</b> = da acceso a la lista de amigos en el lobby actual.\n" +
                    "<b>/search</b> = abre la búsqueda de chat en el lobby actual.\n" +
                    "<b>/theme</b> (número) = cambia el tema de color del chat. Número entre 0 y 3.";
                infomsg(msg);
            }
            if (args === "clothing") {
                let msg = "Comandos de ropa - * = más información al usar\n" +
                    "<b>/clothes</b> (objetivo) = cambia la ropa.\n" +
                    "<b>/naked</b> (objetivo) = quita la ropa.\n" +
                    "<b>/outfit</b> (opciones) = restaura/guarda/carga atuendos (incluyendo accesorios). *\n" +
                    "<b>/underwear</b> (objetivo) = cambia la ropa interior.\n" +
                    "<b>/wrobe</b> (objetivo) = abre completamente el guardarropa del objetivo.";
                infomsg(msg);
            }
            if (args === "escape") {
                let msg = "Comandos de escape - * = más información al usar\n" +
                    "<b>/boost</b> = potencia todas tus habilidades durante una hora.\n" +
                    "<b>/infolock</b> = da información extra (código, contraseña, tiempo restante) para el candado usado en el objeto equipado.\n" +
                    "<b>/quit</b> (acción) = abandona la sala.\n" +
                    "<b>/removecollar</b> = quita temporalmente el collar.\n" +
                    "<b>/resetdifficulty</b> = restablece la dificultad, saliendo de ella.\n" +
                    "<b>/safeworditem</b> = elimina un objeto específico. *\n" +
                    "<b>/solidity</b> (valor) (objetivo) = cambia la solidez de las ataduras actuales. ¡Usa valores bajos para escapar! Valor 1 para escapar de restricciones especiales.\n" +
                    "<b>/totalrelease</b> (objetivo) = elimina todas las ataduras y accesorios.\n" +
                    "<b>/unlock</b> (objetivo) (tipo_de_candado) = elimina todos los candados o solo un tipo específico. *\n" +
                    "<b>/untie</b> (objetivo) = elimina todas las ataduras.";
                infomsg(msg);
            }
            if (args === "fun") {
                let msg = "Comandos de diversión - * = más información al usar\n" +
                    "** = los scripts deben estar permitidos en la configuración de BC\n" +
                    "<b>/cum</b> = provoca un orgasmo.\n" +
                    "<b>/horny</b> = establece tu nivel de excitación. *\n" +
                    "<b>/invisible</b> (objetivo) = entra o envía al modo invisible. **\n" +
                    "<b>/poof</b> (acción) = abandona el club rápidamente. La acción es opcional.\n" +
                    "<b>/sfchaste</b> (opciones) = cambia la configuración del cinturón de castidad futurista. *\n" +
                    "<b>/shock</b> (ranura) (sensibilidad) (intensidad) = cambia el modo de descarga del dispositivo en una ranura específica. *\n" +
                    "<b>/sleep</b> (objetivo) = utiliza el efecto de sueño.\n" +
                    "<b>/slowleave</b> (acción) = abandona la sala lentamente.\n" +
                    "<b>/superdice</b> (lados) = lanza un super-dado. Los lados pueden estar entre 2 y 999999999.\n" +
                    "<b>/vibe</b> (ranura) (modo) = cambia el modo de vibración en una ranura específica. *\n" +
                    "<b>/visible</b> (objetivo) = vuelve al modo visible. **";
                infomsg(msg);
            }
            if (args === "maps") {
                let msg = "Comandos de mapas - * = más información al usar\n" +
                    "<b>/mapfog</b> = alterna la niebla en la sala de mapa actual.\n" +
                    "<b>/mapforce</b> = fuerza el acceso al mapa en la sala normal actual (solo para ti).\n" +
                    "<b>/mapkeys</b> (número_de_llave) (acción) = encuentra o pierde todas las llaves o una llave específica. *\n" +
                    "<b>/maproom</b> = da información sobre los jugadores en el mapa actual.\n" +
                    "<b>/mapx</b> (posición-x) = cambia tu coordenada X en el mapa.\n" +
                    "<b>/mapy</b> (posición-y) = cambia tu coordenada Y en el mapa.\n" +
                    "<b>/mapz</b> (objetivo) = da las coordenadas en el mapa.\n" +
                    "<b>/mapzoom</b> (valor) = cambia el nivel de zoom en las salas de mapa.\n" +
                    "<b>/tplistadd</b> (número_miembro) = añade a un jugador a la lista permitiendo que te teletransporte.\n" +
                    "<b>/tplistremove</b> (número_miembro) = elimina a un jugador de la lista.\n" +
                    "<b>/tplistshow</b> = muestra la lista de jugadores autorizados para teletransportarte.";
                infomsg(msg);
            }
            if (args === "misc") {
                let msg = "Comandos Varios - * = más info al usar\n" +
                    "<b>/callubc</b> = instala la interfaz UBC (usar si falló la inicialización).\n" +
                    "<b>/login</b> (cuenta) (contraseña) = inicia sesión en una cuenta nueva.\n" +
                    "<b>/mbsroom</b> = info sobre ruedas MBS en la sala actual.\n" +
                    "<b>/mstatus</b> = muestra el estado actual del moaner.\n" +
                    "<b>/pmenu</b> = acceso directo a la pantalla de Preferencias.\n" +
                    "<b>/relog</b> = reconecta el servidor.\n" +
                    "<b>/thmlogin</b> (opciones) muestra/oculta Créditos o NPCs en el login (con mod Themed). *\n" +
                    "<b>/uhelp</b> (categoría) = muestra los comandos de ULTRAbc. *\n" +
                    "<b>/ulistadd</b> (número) = añade un jugador a la lista para ignorar el Uwall.\n" +
                    "<b>/ulistremove</b> (número) = elimina un jugador de la lista del Uwall.\n" +
                    "<b>/ulistshow</b> = muestra tu lista de jugadores en Ulist.\n" +
                    "<b>/uroom</b> = info sobre usuarios de UBC/Uwall en la sala actual.\n" +
                    "<b>/xmenu</b> = acceso directo a la pantalla de Extensiones.";
                infomsg(msg);
            }
            if (args === "settings") {
                let msg = "Comandos de Configuración - * = más info al usar\n" +
                    "<b>/bg4</b> (pantalla) (fondo) = elige un fondo estándar para salas específicas de BC. *\n" +
                    "<b>/bglist</b> muestra la lista de todos los fondos estándar disponibles.\n" +
                    "<b>/bgshow1</b> (número) = muestra un enlace local y la imagen de un fondo estándar.\n" +
                    "<b>/bgshow2</b> (número) = envía al chat el enlace de un fondo estándar. (Clicable con WCE).\n" +
                    "<b>/killpar</b> = elimina los parámetros de UBC/Moaner guardados localmente.\n" +
                    "<b>/message</b> (opción) (mensaje) = crea mensajes personalizados para comandos específicos. *";
                infomsg(msg);
            }
            if (args === "talking") {
                let msg = "Comandos de Habla - * = más info al usar\n" +
                    "<b>/atalk</b> (texto) = habla una vez como un animal. *\n" +
                    "<b>/btalk</b> (texto) = habla una vez como un bebé.\n" +
                    "<b>/gtalk</b> (modo) (texto) = habla una vez con un nivel de mordaza específico. *\n" +
                    "<b>/murmur</b> (Número|Nombre|Apodo) (Mensaje) = envía un susurro persistente.\n" +
                    "<b>/ping</b> (Número) (Mensaje) = envía un pitido (beep) a un jugador.\n" +
                    "<b>/stalk</b> (modo) (texto) = habla una vez con un modo de tartamudeo específico. *";
                infomsg(msg);
            }
            if (args === "visual") {
                let msg = "Comandos Visuales - * = más info al usar\n" +
                    "<b>/allcolor</b> (color) (categoría) (objetivo) = cambia el color de elementos por categoría. *\n" +
                    "<b>/colorchanger</b> (anim) = animación con cambio de color constante. *\n" +
                    "<b>/itemcolor</b> (color) = cambia el color del objeto en el espacio seleccionado. *\n" +
                    "<b>/layerset</b> (capa) (color) = cambia el color de una capa en el espacio guardado. *\n" +
                    "<b>/layershow</b> = info de colores y guardado de espacio de objeto (Item Slot).\n" +
                    "<b>/pose2</b> (pose) (objetivo) = cambia la pose de cualquier jugador. *\n" +
                    "<b>/trsee</b> (opciones) = cambia los ajustes del Casco Tecno equipado. * \n" +
                    "<b>/vrsee</b> (fondo) (modo) (juego) = cambia los ajustes de las Gafas VR equipadas. *";
                infomsg(msg);
            }
            if (args === "zones") {
                let msg = "Comandos de Zonas - * = más info al usar\n" +
                    "<b>/asylum</b> (minutos) = entra al asilo omitiendo requisitos. Indica minutos si eres paciente.\n" +
                    "<b>/cgame</b> (zona) = inicia un juego de cartas con un NPC. *\n" +
                    "<b>/chess</b> (dificultad) = inicia una partida de ajedrez. *\n" +
                    "<b>/college</b> = entra a la universidad omitiendo requisitos.\n" +
                    "<b>/game</b> (minijuego) = lanza un minijuego específico. *\n" +
                    "<b>/ggts</b> (minutos) (nivel) = inicia entrenamiento GGTS en el asilo (Nivel 1-6).\n" +
                    "<b>/keydeposit</b> (horas) = guarda tus llaves en la bóveda (acepta más de 7 días).\n" +
                    "<b>/mission</b> (tipo) = fuerza una misión de infiltración específica. *\n" +
                    "<b>/npcprison</b> (minutos) = te envía a la prisión NPC de Pandora.\n" +
                    "<b>/prison</b> (minutos) = te envía a la prisión online de Pandora. *\n" +
                    "<b>/store</b> = va a la tienda y muestra objetos ocultos.\n" +
                    "<b>/timercell</b> (minutos) = te encierra en la celda de aislamiento.";
                infomsg(msg);
            }
        }
    }])

    CommandCombine([{
        Tag: 'ulistadd',
        Description: "(número_de_miembro): añade un jugador a la lista permitiéndole ignorar el Uwall.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando ulistadd debe ir seguido del número de miembro del jugador al que permite ignorar el Uwall.";
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
        Description: "(número_de_miembro): elimina a un jugador de la lista que permite ignorar el Uwall.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando ulistremove debe ir seguido del número de miembro del jugador que ya no tiene permitido ignorar el Uwall.";
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
        Description: "muestra la lista de jugadores permitidos para ignorar el Uwall.",
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
        Description: "(objetivo): cambia la ropa interior.",
        Action: (args) => {
            let target = Player;
            if (args != "") target = TargetSearch(args);
            if (!target) return;
            if (target == Player) {
                let msg = "Láseres mágicos ponen a " + tmpname + " ropa interior al azar.";
                targetMessage(Underwear, msg, 1);
                CharacterRandomUnderwear(Player);
                ChatRoomCharacterUpdate(Player);
            } else {
                if ((target.AllowItem == true) && (target.OnlineSharedSettings.UBC != undefined)) {
                    tgpname = getNickname(target);
                    if (IsTargetProtected(target)) {
                        let msg = umsg1 + tgpname + umsg2;
                        infomsg(msg);
                    } else {
                        let msg = "Láseres mágicos ponen a " + tgpname + " ropa interior al azar.";
                        targetMessage(Tunderwear, msg, 2);
                        CharacterRandomUnderwear(target);
                        ChatRoomCharacterUpdate(target);
                    }
                }
            }
            ChatRoomSetTarget(-1);
        }
    }])

    CommandCombine([{
        Tag: 'unlock',
        Description: "(objetivo) (tipo_candado): elimina todos los candados o solo un tipo específico en el objetivo indicado.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando unlock:\n" +
                    "<b>/unlock</b> (objetivo) (tipo_candado).\n" +
                    "Siempre se debe especificar el objetivo.\n" +
                    "Se eliminarán todos los candados si no especificas el tipo.\n" +
                    " \n" +
                    "Tipos de candado:\n" +
                    "1 Metal (por defecto) - 2 Exclusivo\n" +
                    "3 Intrincado - 4 Alta Seguridad - 5 Pandora\n" +
                    "6 Ama - 7 Amante - 8 Dueño - 9 Cinco Minutos\n" +
                    "10 Combinación - 11 Palabra de Seguridad - 12 Contraseña\n" +
                    "13 Temp. Ama - 14 Temp. Amante - 15 Temp. Dueño\n" +
                    "16 Contraseña con Tiempo - 17 Mejor Amigo - 18 Temp. Mejor Amigo\n" +
                    "19 Familiar - 20 Escudo Lúbrico - 21 Devious \n" +
                    "22 Enlace de Portal\n" +
                    "El candado 21 solo puede retirarse si se usa una versión modificada del mod DOGS.";
                infomsg(msg);
            } else {
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
                            let msg = "Láseres mágicos hacen desaparecer los candados del cuerpo de " + tgpname + ".";
                            targetMessage(Unlock, msg, 1);
                        }
                    } else {
                        if (IsTargetProtected(target)) {
                            uw = 1;
                            let msg = umsg1 + tgpname + umsg2;
                            infomsg(msg);
                        } else {
                            let msg = "Láseres mágicos hacen desaparecer los candados del cuerpo de " + tgpname + ".";
                            targetMessage(Tunlock, msg, 2);
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
                                    (target.Appearance[A].Property.LockedBy == "\u{6DEB}\u{7EB9}\u{9501}LuziPadlock"))
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
                                        (target.Appearance[A].Property.LockedBy == "\u{6DEB}\u{7EB9}\u{9501}LuziPadlock"))
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
        Description: "(objetivo): elimina todas las ataduras.",
        Action: (args) => {
            let target = Player;
            if (args != "") target = TargetSearch(args);
            if (!target) return;
            if (target == Player) {
                if (noescape) {
                    let msg = umsg1 + umsg3;
                    infomsg(msg);
                } else {
                    let msg = "Láseres mágicos hacen desaparecer las ataduras del cuerpo de " + tmpname + ".";
                    targetMessage(Untie, msg, 1);
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
                        let msg = "Láseres mágicos hacen desaparecer las ataduras del cuerpo de " + tgpname + ".";
                        targetMessage(Tuntie, msg, 2);
                        CharacterRelease(target);
                        ChatRoomCharacterUpdate(target);
                    }
                }
            }
            ChatRoomSetTarget(-1);
        }
    }])

    CommandCombine([{
        Tag: 'uroom',
        Description: ": da información sobre usuarios de UBC y protección Uwall en la sala de chat actual.",
        Action: () => {
            ChatRoomCharacter.forEach(character => {
                const command = "uroom";
                UBCinfo(character, command);
            });
        }
    }]);

    CommandCombine([{
        Tag: 'vibe',
        Description: ": (espacio) (modo): cambia el modo de vibración en un espacio específico.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando vibe debe ir seguido de dos números:\n" +
                    "- un número para el espacio afectado:\n" +
                    "0 = Botas - 1 = Pecho - 2 = Trasero - 3 = Clítoris/Glande\n" +
                    "4 = Dispositivos - 5 = Pies - 6 = Pezones\n" +
                    "7 = Piercings de Pezones - 8 = Pelvis - 9 = Vulva/Pene\n" +
                    " \n" +
                    "- un número para el modo de vibración en este espacio:\n" +
                    "0 = Apagado - 1 = Bajo - 2 = Medio - 3 = Alto - 4 = Máximo\n" +
                    "5 = Aleatorio - 6 = Escalar - 7 = Provocar - 8 = Denegar - 9 = Al Límite (Edge)\n" +
                    "¡Ten en cuenta que los modos 5 al 9 no están disponibles en algunos vibradores!\n" +
                    "Para el Cinturón de Alta Resistencia, Bragas de Placer Sci-Fi y el Frasco de Vidrio: 5, 6 o 7 = Permitir orgasmo\n" +
                    "Este comando no es compatible con el Cinturón de Entrenamiento Futurista ni el Escudo Lúbrico.";
                infomsg(msg);
            } else {
                let Target = "";
                let Item = "";
                let stringSol1 = args;
                let stringSol2 = stringSol1.split(/[ ,]+/);
                let slot = stringSol2[0];
                let mode = stringSol2[1];
                let msg = "¡Modo cambiado para uno de tus vibradores!";
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
        Description: ": (objetivo): vuelve o envía de vuelta al modo visible.",
        Action: (args) => {
            let target = Player;
            if (args != "") target = TargetSearch(args);
            if (!target) return;
            if (target == Player) {
                let msg = "" + tmpname + " de repente es visible para todos.";
                targetMessage(Visible, msg, 1);
                InventoryRemove(Player, "ItemScript");
                CurrentScreen === 'ChatRoom' ?
                    ChatRoomCharacterUpdate(Player) :
                    CharacterRefresh(Player);
            } else {
                if ((target.AllowItem == true) && (target.OnlineSharedSettings.UBC != undefined)) {
                    tgpname = getNickname(target);
                    if (target.OnlineSharedSettings.ScriptPermissions.Hide.permission == 0) {
                        let msg = "Para usar el comando visible en otros jugadores, ellos deben primero permitir Scripts en los ajustes de BC.";
                        infomsg(msg);
                        return;
                    }
                    if (IsTargetProtected(target)) {
                        let msg = umsg1 + tgpname + umsg2;
                        infomsg(msg);
                    } else {
                        let msg = "" + tgpname + " de repente es visible para todos.";
                        targetMessage(Tvisible, msg, 2);
                        InventoryRemove(target, "ItemScript");
                        CurrentScreen === 'ChatRoom' ?
                            ChatRoomCharacterUpdate(target) :
                            CharacterRefresh(target);
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'vrsee',
        Description: "(fondo) (modo) (juego): cambia los ajustes de unas Gafas VR equipadas.",
        Action: (args) => {
            if (args === "") {
                let msg = "El comando vrsee debe ir seguido de 3 números para el fondo, el modo y el juego.\n" +
                    " \n" +
                    "Fondos disponibles:\n" +
                    "0 Sin fondo - 1 Mundo Virtual\n" +
                    "2 Mazmorra - 3 Alta Tecnología\n" +
                    "4 Ruinas Antiguas - 5 Trance\n" +
                    " \n" +
                    "Modos disponibles:\n" +
                    "0 Passthrough (Transparente)\n" +
                    "1 VR apagado\n" +
                    "2 VR encendido\n" +
                    "3 VR encendido + Ocultar ataduras\n" +
                    " \n" +
                    "Juegos disponibles:\n" +
                    "0 Sin juego\n" +
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
                            let msg = "Los ajustes de tus Gafas VR han sido modificados.";
                            infomsg(msg);
                        }
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'weaken',
        Description: ": debilita todas tus habilidades durante una hora.",
        Action: () => {
            SkillSetModifier(Player, "Bondage", -5, 3600000);
            SkillSetModifier(Player, "Dressage", -5, 3600000);
            SkillSetModifier(Player, "Evasion", -5, 3600000);
            SkillSetModifier(Player, "Infiltration", -5, 3600000);
            SkillSetModifier(Player, "LockPicking", -5, 3600000);
            SkillSetModifier(Player, "SelfBondage", -5, 3600000);
            SkillSetModifier(Player, "Willpower", -5, 3600000);
            let msg = "Sientes todas tus habilidades debilitadas. Los cambios se pueden ver en el panel de información.";
            infomsg(msg);
        }
    }])

    CommandCombine([{
        Tag: 'wrobe',
        Description: "(objetivo): abre completamente el guardarropa del objetivo.",
        Action: (args) => {
            if (args === "") {
                ChatRoomAppearanceLoadCharacter(Player);
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
                        ChatRoomAppearanceLoadCharacter(target);
                    }
                }
                ChatRoomSetTarget(-1);
            }
        }
    }])

    CommandCombine([{
        Tag: 'xmenu',
        Description: ": acceso directo al menú de Extensiones.",
        Action: () => {
            ExtClick();
        }
    }])

})();
