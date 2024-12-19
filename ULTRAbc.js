// ==UserScript==
// @name ULTRAbc
// @namespace https://www.bondageprojects.com/
// @version 4.1
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

    const UBCver = "4.1";
    const UBCver0 = "4.0";
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

    const M_MOANER_moanerKey = "bc_moaner_";
    let M_MOANER_scriptOn = false;
    let M_MOANER_cum = false;
    let profile;
    let profileName;
    let animal = 0;
    let bgall = false;
    let bl = 0;
    let ccname = "ClubCardPlayBoard1";
    let cdesk = 0;
    let cextra = false;
    let cfame = 200;
    let frname = "BrickWall";
    let gl = 0;
    let hearing = 0;
    let mgl = 0;
    let onegl = 0;
    let rsize = 20;
    let rtype = "ALL";
    let st = 0;
    let tcname = "Cell";

    let AutojoinOn;
    let DolltalkOn;
    let ExtbuttonsOn;
    let FixpermOn;
    let FrkeysOn;
    let FullseedOn;
    let HighfameOn;
    let HotkeysOn;
    let MagiccheatOn;
    let MagictoysOn;
    let MapfullOn = false;
    let MaptrapOn;
    let NogarbleOn;
    let NostruggleOn;
    let NotimeoutOn;
    let NowhisperOn = false;
    let NPCpunish = false;
    let OutbuttonsOn;
    let RglbuttonsOn;
    let RglsyncOn;
    let SlowleaveOn;
    let SosbuttonsOn;

    let blureffect;
    let notalk = 0;
    let reaction = 0;

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
    let M_MOANER_xvibratorActive = false;

    //BC Slots
    const body1 = ["Activity", "ArmsLeft", "ArmsRight", "Blush", "BodyLower", "BodyMarkings", "BodyUpper", "Emoticon", "Eyebrows", "Eyes", "Eyes2", "EyeShadow", "Face", "FacialHair", "Fluids", "HairBack", "HairFront", "HandsLeft", "HandsRight", "Head", "Height", "Mouth", "Nipples", "Pronouns", "Pussy"];

    const body2 = ["BodyMarkings2_Luzi", "\u{989D}\u{5916}\u{5934}\u{53D1}_Luzi", "\u{989D}\u{5916}\u{8EAB}\u{9AD8}_Luzi", "Liquid2_Luzi", "\u{65B0}\u{540E}\u{53D1}_Luzi", "\u{65B0}\u{524D}\u{53D1}_Luzi", "\u{8EAB}\u{4F53}\u{75D5}\u{8FF9}_Luzi"];

    const clothes1 = ["AnkletLeft", "AnkletRight", "Bra", "Bracelet", "Cloth", "ClothAccessory", "ClothLower", "Corset", "Garters", "Glasses", "Gloves", "HairAccessory3", "HandAccessoryLeft", "HandAccessoryRight", "Hat", "Jewelry", "Mask", "Necklace", "Panties", "Shoes", "Socks", "SocksLeft", "SocksRight", "Suit", "SuitLower"];

    const clothes2 = ["\u{52A8}\u{7269}\u{8EAB}\u{4F53}_Luzi", "Bra_\u{7B28}\u{7B28}\u{86CB}Luzi", "ClothAccessory_\u{7B28}\u{7B28}\u{86CB}Luzi", "Cloth_\u{7B28}\u{7B28}\u{86CB}Luzi", "Cloth_\u{7B28}\u{7B28}\u{7B28}\u{86CB}Luzi2", "ClothLower_\u{7B28}\u{7B28}\u{86CB}Luzi", "ClothLower_\u{7B28}\u{7B28}\u{7B28}\u{86CB}Luzi2", "Gloves_\u{7B28}\u{7B28}\u{86CB}Luzi", "Hat_\u{7B28}\u{7B28}\u{86CB}Luzi", "\u{957F}\u{8896}\u{5B50}_Luzi", "Mask_\u{7B28}\u{7B28}\u{86CB}Luzi", "Necklace_\u{7B28}\u{7B28}\u{86CB}Luzi", "Panties_\u{7B28}\u{7B28}\u{86CB}Luzi", "Shoes_\u{7B28}\u{7B28}\u{86CB}Luzi"];

    const cosplay1 = ["HairAccessory1", "HairAccessory2", "TailStraps", "Wings"];

    const cosplay2 = ["HairAccessory3_\u{7B28}\u{7B28}\u{86CB}Luzi", "Wings_\u{7B28}\u{7B28}\u{86CB}Luzi"];

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
    function M_MOANER_initControls() {
        let datas = JSON.parse(localStorage.getItem(M_MOANER_moanerKey + "_" + Player.MemberNumber));
        if (datas == null || datas == undefined) {
            M_MOANER_orgasmActive = true;
            M_MOANER_scriptOn = false;
            M_MOANER_spankActive = true;
            M_MOANER_talkActive = true;
            M_MOANER_tickleActive = true;
            M_MOANER_vibratorActive = true;
            M_MOANER_xvibratorActive = false;
            M_MOANER_cum = false;
            profile = 0;
            profileName = "default";
            tmpname = "";
            pronoun1 = "";
            pronoun2 = "";
            pronoun3 = "";
            pronoun4 = "";
            animal = 0;
            bgall = false;
	    bl = 0;
	    ccname = "ClubCardPlayBoard1";
            cdesk = 0;
            cextra = false;
            cfame = 200;
            frname = "BrickWall";
            gl = 0;
	    hearing = 0;
	    mgl = 0;
            onegl = 0;
            rsize = 20;
            rtype = "ALL";
            st = 0;
            tcname = "Cell";
            AutojoinOn = false;
            DolltalkOn = false;
            ExtbuttonsOn = false;
            FixpermOn = false;
            FrkeysOn = false;
            FullseedOn = false;
            HighfameOn = false;
            HotkeysOn = false;
            MagiccheatOn = false;
            MagictoysOn = false;
            MapfullOn = false;
            MaptrapOn = false;
            NogarbleOn = false;
            NostruggleOn = false;
            NotimeoutOn = false;
            NowhisperOn = false;
            NPCpunish = false;
            OutbuttonsOn = false;
            RglbuttonsOn = false;
	    RglsyncOn = false;
            SlowleaveOn = false;
            SosbuttonsOn = false;
            blureffect = false;
            notalk = 0;
            reaction = 0;
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
            M_MOANER_saveControls();
        } else {
            M_MOANER_orgasmActive = datas.orgasmMoan;
            M_MOANER_scriptOn = datas.script;
            M_MOANER_spankActive = datas.spankMoan;
            M_MOANER_talkActive = datas.talkMoan;
            M_MOANER_tickleActive = datas.tickleMoan;
            M_MOANER_vibratorActive = datas.vibeMoan;
            M_MOANER_xvibratorActive = datas.xvibeMoan;
            M_MOANER_cum = datas.cum;
            profile = datas.profile;
            profileName = datas.moanProfile;
            tmpname = datas.tmpname;
            pronoun1 = datas.pronoun1;
            pronoun2 = datas.pronoun2;
            pronoun3 = datas.pronoun3;
            pronoun4 = datas.pronoun4;
            animal = datas.animal;
            bgall = datas.bgall;
	    bl = datas.bl;
	    ccname = datas.ccname;
            cdesk = datas.cdesk;
            cextra = datas.cextra;
            cfame = datas.cfame;
            frname = datas.frname;
            gl = datas.gaglevel;  
	    hearing = 0;
	    mgl = 0;
            onegl = 0;
            rsize = datas.rsize;
            rtype = datas.rtype;
            st = datas.stutterlevel * 1;
            tcname = datas.tcname;
            AutojoinOn = datas.autojoin;
            DolltalkOn = datas.dolltalk;
            ExtbuttonsOn = datas.extbuttons;
            FixpermOn = datas.fixperm;
            FrkeysOn = datas.frkeys;
            FullseedOn = datas.fullseed;
            HighfameOn = datas.highfame;
            HotkeysOn = datas.hotkeys;
            MagiccheatOn = datas.magiccheat;
            MagictoysOn = datas.magictoys;
            MapfullOn = false;
            MaptrapOn = datas.maptrap;
            NogarbleOn = datas.nogarble;
            NostruggleOn = datas.nostruggle;
            NotimeoutOn = datas.notimeout;
            NowhisperOn = datas.nowhisper;
            NPCpunish = datas.npcpunish;
            OutbuttonsOn = datas.outbuttons;
            RglbuttonsOn = datas.rglbuttons;
	    RglsyncOn = datas.rglsync;
            SlowleaveOn = datas.slowleave;
            SosbuttonsOn = datas.sosbuttons;
            blureffect = false;
            notalk = datas.notalk;
            reaction = 0;
            Clothes = datas.clothes;
            Invisible = datas.invisible;
            Mlock = datas.mlock;
            Naked = datas.naked;
            Pet = datas.pet;
            Randomize = datas.randomize;
            Restrain = datas.restrain;
            Solidity = datas.solidity;
            Tclothes = datas.tclothes;
            Tinvisible = datas.tinvisible;
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
            Tvisible = datas.visible;
            Underwear = datas.underwear;
            Unlock = datas.unlock;
            Untie = datas.untie;
            Visible = datas.visible;
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
            "xvibeMoan": M_MOANER_xvibratorActive,
            "cum": M_MOANER_cum,
            "profile": profile,
            "moanProfile": profileName,
            "tmpname": tmpname,
            "pronoun1": pronoun1,
            "pronoun2": pronoun2,
            "pronoun3": pronoun3,
            "pronoun4": pronoun4,
            "animal": animal,
            "bgall": bgall,
            "bl": bl,
            "ccname": ccname,
            "cdesk": cdesk,
            "cextra": cextra,
            "cfame": cfame,
            "frname": frname,
            "gaglevel": gl,
            "rsize": rsize,
            "rtype": rtype,
            "stutterlevel": st,
            "tcname": tcname,
            "autojoin": AutojoinOn,
            "dolltalk": DolltalkOn,
            "extbuttons": ExtbuttonsOn,
            "fixperm": FixpermOn,
            "frkeys": FrkeysOn,
            "fullseed": FullseedOn,
            "highfame": HighfameOn,
            "hotkeys": HotkeysOn,
            "magiccheat": MagiccheatOn,
            "magictoys": MagictoysOn,
            "mapfull": MapfullOn,
            "maptrap": MaptrapOn,
            "nogarble": NogarbleOn,
            "nostruggle": NostruggleOn,
            "notimeout": NotimeoutOn,
            "nowhisper": NowhisperOn,
            "npcpunish": NPCpunish,
            "outbuttons": OutbuttonsOn,
            "rglbuttons": RglbuttonsOn,
            "rglsync": RglsyncOn,
            "slowleave": SlowleaveOn,
            "sosbuttons": SosbuttonsOn,
            "blureffect": blureffect,
            "notalk": notalk,
            "reaction": reaction,
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
                Player.OnlineSharedSettings.UBC = UBCver;
                Player.OnlineSharedSettings.Inmap = false;
                if (Player.OnlineSharedSettings.Ulist == undefined) {
                    Player.OnlineSharedSettings.Ulist = [];
                }
                ServerAccountUpdate.QueueData({
                    OnlineSharedSettings: Player.OnlineSharedSettings
                });
                if (MaptrapOn == null || MaptrapOn == undefined) {
                    MaptrapOn = false;
                    M_MOANER_saveControls();
                }
                if (animal == null || animal == undefined) animal = 0;
                if (animal == 1) AnimalTalk1On = true;
                if (animal == 2) AnimalTalk2On = true;
                if (animal == 3) AnimalTalk3On = true;
                if (animal == 4) AnimalTalk4On = true;
                if (animal == 5) AnimalTalk5On = true;
                if (animal == 6) AnimalTalk6On = true;
                if (animal == 7) AnimalTalk7On = true;
                if (animal == 8) AnimalTalk8On = true;
                if (animal == 9) AnimalTalk9On = true;
                if (bgall == null || bgall == undefined) bgall = false;
		if (bl == null || bl == undefined) bl = 0;
		if (ccname == null || ccname == undefined) ccname = "ClubCardPlayBoard1";
                if (cdesk == null || cdesk == undefined) cdesk = 0;
                if (cextra == null || cextra == undefined) cextra = false;
                if (cfame == null || cfame == undefined) cfame = 200;
		if (DolltalkOn == null || DolltalkOn == undefined) DolltalkOn = false;
                if (ExtbuttonsOn == null || ExtbuttonsOn == undefined) ExtbuttonsOn = false;
                if (FixpermOn == null || FixpermOn == undefined) FixpermOn = false;
                if (FullseedOn == null || FullseedOn == undefined) FullseedOn = false;
                if (FrkeysOn == null || FrkeysOn == undefined) FrkeysOn = false;
		if (frname == null || frname == undefined) frname = "BrickWall";
		if (gl == null || gl == undefined) gl = 0;
                if (gl == -1) gl = 11;
		if (hearing == null || hearing == undefined) hearing = 0;
                if (HighfameOn == null || HighfameOn == undefined) HighfameOn = false;
                if (HotkeysOn == null || HotkeysOn == undefined) HotkeysOn = false;
                if (MagiccheatOn == null || MagiccheatOn == undefined) MagiccheatOn = false;
		if (M_MOANER_cum == null || M_MOANER_cum == undefined || M_MOANER_cum == true) M_MOANER_cum = false;
                if (M_MOANER_orgasmActive == null || M_MOANER_orgasmActive == undefined) M_MOANER_orgasmActive = true;
                if (M_MOANER_scriptOn == null || M_MOANER_scriptOn == undefined) M_MOANER_scriptOn = false;
                if (M_MOANER_spankActive == null || M_MOANER_spankActive == undefined) M_MOANER_spankActive = true;
                if (M_MOANER_talkActive == null || M_MOANER_talkActive == undefined) M_MOANER_talkActive = true;
                if (M_MOANER_tickleActive == null || M_MOANER_tickleActive == undefined) M_MOANER_tickleActive = true;
                if (M_MOANER_vibratorActive == null || M_MOANER_vibratorActive == undefined) M_MOANER_vibratorActive = true;
                if (M_MOANER_xvibratorActive == null || M_MOANER_xvibratorActive == undefined) M_MOANER_xvibratorActive = false;
                if (M_MOANER_vibratorActive == false) M_MOANER_xvibratorActive = false;
                if (NogarbleOn == null || NogarbleOn == undefined) NogarbleOn = false;
                if (NostruggleOn == null || NostruggleOn == undefined) NostruggleOn = false;
		if (notalk == null || notalk == undefined) notalk = 0;
                if (NotimeoutOn == null || NotimeoutOn == undefined) NotimeoutOn = false;
		if (NowhisperOn == null || NowhisperOn == undefined) NowhisperOn = false;
                if (NPCpunish == null || NPCpunish == undefined) NPCpunish = false;
                if (OutbuttonsOn == null || OutbuttonsOn == undefined) OutbuttonsOn = false;
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
                if (RglbuttonsOn == null || RglbuttonsOn == undefined) RglbuttonsOn = false;
		if (RglsyncOn == null || RglsyncOn == undefined) RglsyncOn = false;
                if (SlowleaveOn == null || SlowleaveOn == undefined) SlowleaveOn = false;
                if (SosbuttonsOn == null || SosbuttonsOn == undefined) SosbuttonsOn = false;
		if (st == null || st == undefined) st = 0;
		if (tcname == null || tcname == undefined) tcname = "Cell";
                M_MOANER_saveControls();
                BabyTalkOn = false;
                GagTalkOn = false;
                if ((gl > 0) && (gl != 11)) GagTalkOn = true;
                if (gl == 11) BabyTalkOn = true;
                if (MagictoysOn == null || MagictoysOn == undefined) {
                    MagictoysOn = false;
                    M_MOANER_saveControls();
                }
                if (rsize == null || rsize == undefined) {
                    rsize = 20;
                    M_MOANER_saveControls();
                }
                if (rtype == null || rtype == undefined || rtype == "") {
                    rtype = "ALL";
                    M_MOANER_saveControls();
                }
                if (NPCpunish == true) {
                    Player.RestrictionSettings.BypassNPCPunishments = false;
                } else {
                    Player.RestrictionSettings.BypassNPCPunishments = true;
                }
                if (st == 0) StutterOn = false;
                if (st > 0) StutterOn = true;
                ini = 1;
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
            "Explore the brand new GUI of ULTRAbc!",
            "Tip: Use the /uhelp command in chat or explore the wiki to better know all the UBC commands.",
            "More options in next version of UBC!"
        ]

        const ubcSettingsKey = () => "bc_moaner_" + Player.MemberNumber;

        await ubcSettingsLoad();
        settingsPage();

        async function ubcSettingsLoad(reset = false) {
            await waitFor(() => !!Player?.AccountName);

            const UBC_DEFAULT_SETTINGS = {
		animal: 0,
                bgall: false,
		bl: 0,
                cdesk: 0,
                cextra: false,
                cfame: 200,
		cum: false,
		dolltalk: false,
                extbuttons: false,
                fixperm: false,
                frkeys: false,
                fullseed: false,
		gaglevel: 0,
		hearing: 0,
                highfame: false,
                hotkeys: false,
                magiccheat: false,
                nogarble: false,
                nostruggle: false,
		notalk: 0,
                notimeout: false,
		nowhisper: false,
                npcpunish: false,
                orgasmMoan: true,
                outbuttons: false,
                profile: 0,
		reaction: 0,
                rglbuttons: false,
		rglsync: false,
                script: false,
                slowleave: false,
                sosbuttons: false,
                spankMoan: true,
		stutterlevel: 0,
                talkMoan: true,
                tickleMoan: true,
                vibeMoan: true,
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
                "UBCCards",
                "UBCCheats",
                "UBCHotkeys",
                "UBCMisc",
                "UBCMoaner",
		"UBCTalking"
            ];
            const ubcSettingCategoryLabels = {
                UBCButtons: "Buttons",
                UBCCards: "Cards",
                UBCCheats: "Cheats",
                UBCHotkeys: "Hotkeys",
                UBCMisc: "Misc",
                UBCMoaner: "Moaner",
		UBCTalking: "Talking"
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
                if (PreferenceMessage != "") DrawText(PreferenceMessage, 1300, 125, "Red", "Black");
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
                DrawButton(1500, 550, 315, 90, "", "White", "", "Open UBC Changelog on GitHub");
                DrawImageResize("Icons/Changelog.png", 1510, 565, 60, 60);
                DrawTextFit("UBC Changes", 1685, 598, 308, "Black");
                DrawButton(1500, 655, 315, 90, "", "White", "", "Open UBC Wiki on GitHub");
                DrawImageResize("Icons/Introduction.png", 1510, 670, 60, 60);
                DrawTextFit("UBC Wiki", 1685, 703, 308, "Black");
                DrawText("/uhelp in chat", 1665, 770, "Black", "Gray");

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

                // Exit button
                if (MouseIn(1815, 75, 90, 90)) PreferenceSubscreenUBCSettingsExit();
                if (MouseIn(1450, 550, 400, 90)) window.open('https://github.com/tetris245/ULTRAbc/releases', '_blank');
                if (MouseIn(1450, 655, 400, 90)) window.open('https://github.com/tetris245/ULTRAbc/wiki', '_blank');
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
                let data = Player.UBC.ubcSettings;
		animal = data.animal * 1;
                bgall = data.bgall;
		bl = data.bl;
                cdesk = data.cdesk;
                cextra = data.cextra;
                cfame = data.cfame;
		DolltalkOn = data.dolltalk;
                ExtbuttonsOn = data.extbuttons;
                FixpermOn = data.fixperm;
                FullseedOn = data.fullseed;
                FrkeysOn = data.frkeys;
		gl = data.gaglevel * 1;
		hearing = data.hearing;
                HighfameOn = data.highfame;
                HotkeysOn = data.hotkeys;
                MagiccheatOn = data.magiccheat;
		M_MOANER_cum = data.cum;
                M_MOANER_orgasmActive = data.orgasmMoan;
                M_MOANER_scriptOn = data.script;
                M_MOANER_spankActive = data.spankMoan;
                M_MOANER_talkActive = data.talkMoan;
                M_MOANER_tickleActive = data.tickleMoan;
                M_MOANER_vibratorActive = data.vibeMoan;
                M_MOANER_xvibratorActive = data.xvibeMoan;
                NogarbleOn = data.nogarble;
                NostruggleOn = data.nostruggle;
		notalk = data.notalk;
                NotimeoutOn = data.notimeout;
		NowhisperOn = data.nowhisper;
                NPCpunish = data.npcpunish;
                OutbuttonsOn = data.outbuttons;
                profile = data.profile;
		reaction = data.reaction;
                RglbuttonsOn = data.rglbuttons;
		RglsyncOn = data.rglsync;
                SlowleaveOn = data.slowleave;
                SosbuttonsOn = data.sosbuttons;
		st = data.stutterlevel * 1; 
		AnimalTalk1On = false;
                AnimalTalk2On = false;
                AnimalTalk3On = false;
                AnimalTalk4On = false;
                AnimalTalk5On = false;
                AnimalTalk6On = false;
                AnimalTalk7On = false;
                AnimalTalk8On = false;
                AnimalTalk9On = false;
		BabyTalkOn = false;
                if (animal == 1) AnimalTalk1On = true;
                if (animal == 2) AnimalTalk2On = true;
                if (animal == 3) AnimalTalk3On = true;
                if (animal == 4) AnimalTalk4On = true;
                if (animal == 5) AnimalTalk5On = true;
                if (animal == 6) AnimalTalk6On = true;
                if (animal == 7) AnimalTalk7On = true;
                if (animal == 8) AnimalTalk8On = true;
                if (animal == 9) AnimalTalk9On = true;
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
                M_MOANER_saveControls();
                if (NogarbleOn == true) {
                    Player.RestrictionSettings.NoSpeechGarble = true;
                } else {
                    Player.RestrictionSettings.NoSpeechGarble = false;
                }
                if (NostruggleOn == true) {
                    Player.RestrictionSettings.BypassStruggle = true;
                } else {
                    Player.RestrictionSettings.BypassStruggle = false;
                }
                if (NPCpunish == true) {
                    Player.RestrictionSettings.BypassNPCPunishments = false;
                } else {
                    Player.RestrictionSettings.BypassNPCPunishments = true;
                }
                UBCPreferenceSubscreen = "";
                PreferenceMessage = "";
                PreferenceSubscreenExtensionsClear();
            }

            PreferenceSubscreenUBCButtonsLoad = function() {
                UBCPreferenceSubscreen = "UBCButtons";
                addMenuCheckbox(64, 64, "Enable EXT button in chat: ", "extbuttons",
                    "The EXT button gives direct access to the Extensions menu. It corresponds to the /xmenu command.", false, 150
                );
                addMenuCheckbox(64, 64, "Enable FREE buttons: ", "sosbuttons",
                    "The FREE button is added in the chat room, Pandora prison, photographic room and timer cell. It corresponds to the /totalrelease command, but only for yourself. The default message in chat rooms for this button can be replaced by a custom message or an absence of message - see the /message command.", false, 150
                );
                addMenuCheckbox(64, 64, "Enable OUT buttons: ", "outbuttons",
                    "The OUT button is added in the chat room, Pandora prison, photographic room and timer cell. It corresponds to the /quit command, but without a specific optional text.", false, 150
                );
                addMenuCheckbox(64, 64, "Slow exit with OUT button:", "slowleave",
                    "By default, you leave a chat room or another location with the OUT button in fast mode, even if you are bound. When you enable this option, you will exit in slow mode without a special icon under your character, what will surprise the other players!", false, 150
                );
                addMenuCheckbox(64, 64, "Enable RGL button in chat: ", "rglbuttons",
                    "The RGL button gives info about your current Real Garbling Level at any moment, by checking worn gags and other items restraining talking (also LSCG collar and spells). When using the buttons, hotkeys or commands to release yourself, this info is automatically given and synchronized with your forced gagtalk/whisper level as the result is 0. The RGL button can therefore be used as emergency when you can't talk while not being gagged, for example.",false, 150
                );               
                addMenuCheckbox(64, 64, "Extended synchronization with RGL button:", "rglsync",
                    "By default, the synchronization of RGL button with forced level of gagtalk/whisper is automatic when using the emergency buttons, hotkeys or commands to release yourself. This setting allows to extend it to all other situations. The detected level will be limited to 10 for gagtalk (11 is used for baby talk). When enabled, manual changes in your worn gags and other items restraining talking (including LSCG collar and spells) require to click the RGL button again.", false, 150
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

            PreferenceSubscreenUBCCardsLoad = function() {
                UBCPreferenceSubscreen = "UBCCards";
                addMenuInput(200, "Default card desk (0-8):", "cdesk", "InputDefaultDesk",
                    "Input a number between 0 and 8 to select one of these desks as default desk: 0 Original - 1 ABDL - 2 Asylum - 3 College - 4 Dominant - 5 Liability - 6 Maid - 7 Porn - 8 Extra."
                );
                addMenuCheckbox(64, 64, "Enable High Fame mode: ", "highfame",
                    "BC has fixed the fame you need to reach to win in the Bondage Club Card Game to 100. If you want to play longer and more adventurous games, enable this option, and optionnally set a High Fame level (200 by default)."
                );
                addMenuInput(200, "High Fame level (200-600):", "cfame", "InputHighFame",
                    "Input a number between 200 and 600 to set the High Fame level players need to reach to win the game!"
                );
                addMenuButton(150, 64, "Add/Remove Extra Cards:", "Toggle", function() {
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
                    "This setting is a toggle. You can add or remove all the reward extra cards. Note that also the extra cards you acquired by the normal way will be removed when this setting switches to the remove action."
                );
            }

            PreferenceSubscreenUBCCardsRun = function() {
                drawMenuElements();
            }

            PreferenceSubscreenUBCCardsClick = function() {
                handleMenuClicks();
            }

            PreferenceSubscreenUBCCardsExit = function() {
                let desk = ElementValue("InputDefaultDesk");
                let fame = ElementValue("InputHighFame");
                if ((CommonIsNumeric(desk)) && (desk > -1) && (desk < 9) && (CommonIsNumeric(fame)) && (fame > 199) && (fame < 601)) {
                    Player.UBC.ubcSettings.cdesk = desk;
                    Player.UBC.ubcSettings.cfame = fame;
                    ElementRemove("InputDefaultDesk");
                    ElementRemove("InputHighFame");
                    defaultExit();
                } else PreferenceMessage = "Put a valid number";
            }

            PreferenceSubscreenUBCCheatsLoad = function() {
                UBCPreferenceSubscreen = "UBCCheats";
                addMenuCheckbox(64, 64, "Enable Bondage Brawl/Magic School cheat: ", "magiccheat",
                    "With this option, you always be the winner in Bondage Brawl and the Magic School (only the Single Player part)!", false, 160
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
                    "These hotkeys are equivalent to the /quit command, but without a specific optional text, and the /totalrelease command, but only for yourself. Hotkeys on numeric pad: Divide = fast leave - Multiply = total release. If you don't have a numeric pad, use instead the similar command or an UBC button."
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

            PreferenceSubscreenUBCMiscLoad = function() {
                UBCPreferenceSubscreen = "UBCMisc";
                addMenuCheckbox(64, 64, "Access all backgrounds in Private Room: ", "bgall",
                    "With this option, you will not be limited to only 43 backgrounds when using the features in the Private Room to change the background of Friend List, Main Hall, Private Room and Timer Cell. You will have access to all standard backgrounds (more than 250!)", false, 120
                );
                addMenuCheckbox(64, 64, "No permission change after safeword: ", "fixperm",
                    "BC automatically changes your general item permission when you use the BC safeword command or the revert option in the safeword menu. If you don't like that, use this option and your general item permission will not be modified.", false, 120
                );
                addMenuCheckbox(64, 64, "No time out in help provided by TAB: ", "notimeout",
                    "When you use the TAB key to get help about BC commands, the displayed results are removed from the chat after some time. If you don't like that, use this option to prevent the disappearance of the help results.", false, 120
                );
                addMenuCheckbox(64, 64, "Enable punishments by NPC: ", "npcpunish",
                    "By default, UBC disables the automatic punishments by NPC (especially when you are bound in a room and call a maid for help). If you like these punishments, you can enable them again with this option.", false, 120
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
                addMenuCheckbox(64, 64, "Enable the orgasm moan: ", "orgasmMoan",
                    "When enabled, you will moan while cumming.", false, 140
                );
                addMenuCheckbox(64, 64, "Enable the spank moan: ", "spankMoan",
                    "When enabled, you will moan while being spanked. Also when bitten, kicked, pinched, shocked, slapped. In case of actions triggering a shock, it concerns only actions to punish orgasm, stand up or struggle. According your fetishes and your horny state, it can be pain or pleasure.", false, 140
                );
                addMenuCheckbox(64, 64, "Enable the talk moan: ", "talkMoan",
                    "When enabled, you will moan while speaking if you're vibed. The moans can interrupt your talking.", false, 140
                );
                addMenuCheckbox(64, 64, "Enable the tickle moan: ", "tickleMoan",
                    "When enabled, you will moan while being tickled. According your fetishes and your horny state, it can be pain or pleasure.", false, 140
                );
                addMenuCheckbox(64, 64, "Enable the vibes moan: ", "vibeMoan",
                    "When enabled, you will moan if your vibrator's settings change and your arousal level is higher or equal to 10. Also when fingered, fisted, masturbated, or when your ears are caressed, kissed, licked, nibbled, or when using LSCG aphrodisiac injector, drink, respirator. Note that when you disable this setting, it automatically disables the xvibes moan too.", false, 140
                );
                addMenuCheckbox(64, 64, "Also xvibes moan (if vibes moan enabled): ", "xvibeMoan",
                    "When enabled, you will moan when vibe settings of other players in the chat room change, even if you are not yourself vibed (the only condition is an arousal level higher or equal to 10). Note that this setting can't be enabled when the vibes moan is disabled.", false, 140
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

	    PreferenceSubscreenUBCTalkingLoad = function() {
                UBCPreferenceSubscreen = "UBCTalking";
                addMenuInput(200, "Animal talk/whisper mode (0-9):", "animal", "InputAnimalMode",
                    "Input a number between 0 and 9 to select one of these forced 'permanent' animal talk or whisper modes: 0 Human - 1 Bunny - 2 Cow - 3 Fox  - 4 Kitty - 5 Mouse - 6 Pig - 7 Pony - 8 Puppy - 9 Wolfy. If you want to only once talk in a specific talk mode, use the /atalk command after having selected here 0 (human talk).", -16
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
                addMenuCheckbox(64, 64, "Enable no-whisper mode: ", "nowhisper",
                    "When enabled, you can't use normal whispers. Only OOC and emote whispers are possible.", false, 120
                );
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
                Image: "",
                click: PreferenceSubscreenUBCSettingsClick,
                run: PreferenceSubscreenUBCSettingsRun,
                exit: PreferenceSubscreenUBCSettingsExit,
                load: PreferenceSubscreenUBCSettingsLoad,
            });
        }

    }
    // End of section under GPLv3 license

    //ModSDK Functions
    ULTRAActivityChatRoomArousalSync();
    ULTRAAppearanceClick();
    ULTRAAppearanceRun();
    ULTRACellClick();
    ULTRACellLoad();
    ULTRACellRun();
    ULTRAChatRoomClick();
    ULTRAChatRoomKeyDown();
    ULTRAChatRoomMapViewCalculatePerceptionMasks();
    ULTRAChatRoomMapViewMovementProcess();
    ULTRAChatRoomMenuDraw();
    ULTRAChatRoomSafewordRevert();
    ULTRAChatRoomSendChat();
    ULTRAChatSearchExit();
    ULTRAChatSearchJoin();
    ULTRAChatSearchParseResponse();
    ULTRAChatSearchRoomSpaceSelectClick();
    ULTRAChatSearchRoomSpaceSelectDraw();
    ULTRAChatSearchRun();
    ULTRAClubCardEndTurn();
    ULTRAClubCardGetReward();
    ULTRAClubCardLoadDeckNumber();
    ULTRAClubCardRenderBoard();
    UKTRACommandAutoComplete();
    ULTRADrawCharacter();
    ULTRADrawRoomBackground();
    ULTRAFriendListDraw();
    ULTRAFriendListKeyDown();
    ULTRAInfiltrationPrepareMission();
    ULTRAInformationSheetExit();
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
    ULTRAPreferenceClick();
    ULTRAPreferenceRun();
    ULTRAPrivateClick();
    ULTRAPrivateRun();
    ULTRAStruggleMinigameWasInterrupted();
    ULTRATitleExit();

    //Bondage Brawl
    async function ULTRAPlatformAttack() {
        modApi.hookFunction('PlatformAttack', 4, (args, next) => {
            if (MagiccheatOn == true) BrawlCheat();
            next(args);
        });
    }

    async function ULTRAPlatformDialogEvent() {
        modApi.hookFunction('PlatformDialogEvent', 4, (args, next) => {
            if (MagiccheatOn == true) BrawlCheat();
            next(args);
        });
    }

    //Chat Room (+ name/nickname/pronouns management for player)
    async function ULTRAChatRoomClick() {
        modApi.hookFunction('ChatRoomClick', 4, (args, next) => {
            if (ExtbuttonsOn == true) {
                if ((MouseX >= 955) && (MouseX < 1000) && (MouseY >= 0) && (MouseY < 45)) {
                    ExtClick();
                    return;
                }
            }
            if (SosbuttonsOn == true) {
                if ((MouseX >= 955) && (MouseX < 1000) && (MouseY >= 45) && (MouseY < 90)) {
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
            if (OutbuttonsOn == true) {
                if ((MouseX >= 955) && (MouseX < 1000) && (MouseY >= 90) && (MouseY < 135)) {
                    if (SlowleaveOn == true) {
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
            if (RglbuttonsOn == true) {
                if ((MouseX >= 955) && (MouseX < 1000) && (MouseY >= 135) && (MouseY < 180)) {
                    RealGarblingLevel();
                    return;
                }
            }
            next(args);
        });
    }

    async function ULTRAChatRoomKeyDown() {
        modApi.hookFunction('ChatRoomKeyDown', 4, (args, next) => {
            const inputChat = /** @type {HTMLTextAreaElement} */ (document.getElementById("InputChat"));
            const chatHasFocus = inputChat && document.activeElement === inputChat;
            if (chatHasFocus) {
                if (event.code === "Tab" && !event.shiftKey && inputChat.value.length !== 0) {
                    CommandAutoComplete(inputChat.value);
                    return true;
                } else if (event.key === "Enter" && !event.shiftKey) {
                    ChatRoomSendChat();
                    return true;
                } else if (event.key === "PageUp" || event.key === "PageDown") {
                    ChatRoomScrollHistory(event.key === "PageUp");
                    return true;
                } else if (event.key === "Escape" && !event.shiftKey) {
                    ElementFocus("MainCanvas");
                    return true;
                } else if (HotkeysOn == true) {
                    if (event.code === "NumpadDivide") {
                        OutChat();
                        return true;
                    }
                    if (event.code === "NumpadMultiply") {
                        SosClick();
                        return true;
                    }
                }
            } else if (ChatRoomCommonKeyDown(event)) {
                return true;
            } else if (ChatRoomActiveView.KeyDown && ChatRoomActiveView.KeyDown(event)) {
                return true;
            }
            if (event.key === "Escape" && event.shiftKey) {
                ChatRoomAttemptLeave();
            }
            if (document.activeElement === null || document.activeElement === document.body || document.activeElement.id === "MainCanvas") {
                const chatLog = /** @type {HTMLDivElement} */ (document.getElementById("TextAreaChatLog"));
                if (!chatLog) {
                    return false;
                }
                if (!(event.ctrlKey || event.altKey || event.shiftKey || event.metaKey)) {
                    switch (event.key) {
                        case "Home":
                            chatLog.scrollTop = 0;
                            return true;
                        case "End":
                            chatLog.scrollTop = chatLog.scrollHeight;
                            return true;
                        case "PageUp":
                            chatLog.scrollTop = Math.max(0, chatLog.scrollTop - chatLog.clientHeight);
                            return true;
                        case "PageDown":
                            chatLog.scrollTop = Math.min(chatLog.scrollHeight, chatLog.scrollTop + chatLog.clientHeight);
                            return true;
                        case "ArrowUp":
                            chatLog.scrollTop = Math.max(0, chatLog.scrollTop - chatLog.clientHeight * 0.05);
                            return true;
                        case "ArrowDown":
                            chatLog.scrollTop = Math.min(chatLog.scrollHeight, chatLog.scrollTop + chatLog.clientHeight * 0.05);
                            return true;
                    }
                }
                if ((event.key.length === 1 || event.key === "Enter") && !(event.altKey || event.metaKey || (event.ctrlKey && event.key !== "v"))) {
                    ElementFocus("InputChat");
                    return event.key === "Enter";
                }
            }
            return false;
            return;
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

    async function ULTRAChatRoomMapViewMovementProcess() {
        modApi.hookFunction('ChatRoomMapViewMovementProcess', 4, (args, next) => {
            if ((ChatRoomMapViewMovement == null) || (ChatRoomMapViewMovement.TimeEnd > CommonTime())) return;
            Player.MapData.Pos.X = ChatRoomMapViewMovement.X;
            Player.MapData.Pos.Y = ChatRoomMapViewMovement.Y;
            ChatRoomMapViewUpdatePlayerFlag(ChatRoomMapViewMovement.TimeStart - ChatRoomMapViewMovement.TimeEnd);
            ChatRoomMapViewMovement = null;
            ChatRoomMapViewCalculatePerceptionMasks();
            const newTile = ChatRoomMapViewGetTileAtPos(Player.MapData.Pos.X, Player.MapData.Pos.Y);
            const newObject = ChatRoomMapViewGetObjectAtPos(Player.MapData.Pos.X, Player.MapData.Pos.Y);
            if (MaptrapOn) {
                let item1 = newObject.Type;
                let item2 = newObject.Style;
                if ((item1 == "FloorItem") && (item2 != "Blank")) {
                    if (item2 == "BondageBench") {
                        BondagebenchTrap();
                        let msg = "" + tmpname + " is suddenly trapped on a Bondage Bench.";
                        publicmsg(msg);
                    }
                    if (item2 == "Kennel") {
                        KennelTrap();
                        let msg = "" + tmpname + " is suddenly trapped in a Kennel.";
                        publicmsg(msg);
                    }
                    if (item2 == "Locker") {
                        LockerTrap();
                        let msg = "" + tmpname + " is suddenly trapped in a Locker.";
                        publicmsg(msg);
                    }
                    if (item2 == "X-Cross") {
                        XcrossTrap();
                        let msg = "" + tmpname + " is suddenly trapped on an X-Cross.";
                        publicmsg(msg);
                    }
                }
            }
            if (newTile && newTile.OnEnter) newTile.OnEnter();
            if (newObject && newObject.OnEnter) newObject.OnEnter();
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
            if (ExtbuttonsOn == true) DrawButton(955, 0, 45, 45, "EXT", "White", "", "");
            if (SosbuttonsOn == true) SosButtons();
            if (OutbuttonsOn == true) OutButtons();
            if (RglbuttonsOn == true) DrawButton(955, 135, 45, 45, "RGL", "White", "", "");
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
                if ((Player.ItemPermission < 3) && (FixpermOn == false)) {
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
                if (!text1.startsWith("//")) {
                    tsp = 1;
                    ChatRoomSetTarget(-1); 
		    if (text1.startsWith("/whisper")) {
                        tsp = 0;
                        if (NowhisperOn == true) nw = 1;
                    }
                } else {
                    tsp = 2;
                    text2 = text1.replaceAt(0, "\u200b");
                }
            }
            if (text1.startsWith("\\")) {
                tsp = 2;
                text2 = text1.replaceAt(0, "\u200b");
            }
            if (tsp == 2) tsp = 1;
            let nm = 0;
            if (tsp == 0) {
                if (DolltalkOn == true) {
                    if (IsDollTalk(text1) == false) nm = 1;
                    if (nm == 1) {
                        text2 = "";
                        ElementValue("InputChat", "");
                        let msg = "Your message or whisper can't be sent because it does not respect the rules of doll talk.";
                        infomsg(msg);
                    }
                }
		if (NowhisperOn == true) {
                     if (ChatRoomTargetMemberNumber != -1) nw = 1;  
                     if (nw == 1) {
                        text2 = "";
                        ElementValue("InputChat", "");
                        let msg = "Your whisper can't be sent because you are in no-whisper mode.";
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
                    text4 = M_MOANER_applyMoanToMsg(Player, text3);
                } else {
                    text4 = text3;
                }
            }
            ElementValue("InputChat", text3.replace(text3, text4));
            let mb = 0;
            if (Player.ExtensionSettings.MBS != null) {
                let str = Player.ExtensionSettings.MBS;
                let d = LZString.decompressFromUTF16(str);
                let MBSdata = {};
                let decoded = JSON.parse(d);
                MBSdata = decoded;
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
                    if (this.AnimalTalk1On == true) texta = GarbleTalk(text6, animalmode1);
                    if (this.AnimalTalk2On == true) texta = GarbleTalk(text6, animalmode2);
                    if (this.AnimalTalk3On == true) texta = GarbleTalk(text6, animalmode3);
                    if (this.AnimalTalk4On == true) texta = GarbleTalk(text6, animalmode4);
                    if (this.AnimalTalk5On == true) texta = GarbleTalk(text6, animalmode5);
                    if (this.AnimalTalk6On == true) texta = GarbleTalk(text6, animalmode6);
                    if (this.AnimalTalk7On == true) texta = GarbleTalk(text6, animalmode7);
                    if (this.AnimalTalk8On == true) texta = GarbleTalk(text6, animalmode8);
                    if (this.AnimalTalk9On == true) texta = GarbleTalk(text6, animalmode9);
                }
                ElementValue("InputChat", text6.replace(text6, texta));
            } else {
                if (NowhisperOn == false) {
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
                        } else {
                            text7 = "*" + tmpname + text6.slice(1);
                        }
                    } else {
                        text7 = text6;
                    }
                    let texta = "";
                    if ((tsp == 1) || (notalk == 1) || (nm == 1)) {
                        texta = text7;
                    } else {
                        texta = text7;
                        if (this.AnimalTalk1On == true) texta = GarbleTalk(text7, animalmode1);
                        if (this.AnimalTalk2On == true) texta = GarbleTalk(text7, animalmode2);
                        if (this.AnimalTalk3On == true) texta = GarbleTalk(text7, animalmode3);
                        if (this.AnimalTalk4On == true) texta = GarbleTalk(text7, animalmode4);
                        if (this.AnimalTalk5On == true) texta = GarbleTalk(text7, animalmode5);
                        if (this.AnimalTalk6On == true) texta = GarbleTalk(text7, animalmode6);
                        if (this.AnimalTalk7On == true) texta = GarbleTalk(text7, animalmode7);
                        if (this.AnimalTalk8On == true) texta = GarbleTalk(text7, animalmode8);
                        if (this.AnimalTalk9On == true) texta = GarbleTalk(text7, animalmode9);
                    }
                    if (texta != "") {
                        targetNumber = ChatRoomTargetMemberNumber;
                        ChatRoomSendWhisper(targetNumber, texta);
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
            next(args);
        });
    }

    async function ULTRAChatSearchParseResponse() {
        modApi.hookFunction('ChatSearchParseResponse', 4, (args, next) => {
            if (!["ALL", "Always", "Hybrid", "Never"].includes(rtype)) return next(args);
            const ret = next(args);
            let NewResult = [];
            if (rtype == "ALL") {
                let rm = 0;
                while (rm < ret.length) {
                    if ((ret[rm].MemberLimit <= rsize) || (ret[rm].MapType == "Always")) {
                        NewResult.push(ret[rm]);
                    }
                    rm++;
                }
            }
            if (rtype == "Never") {
                let rm = 0;
                while (rm < ret.length) {
                    if ((ret[rm].MemberLimit <= rsize) && (ret[rm].MapType == "Never")) {
                        NewResult.push(ret[rm]);
                    }
                    rm++;
                }
            }
            if (rtype == "Hybrid") {
                let rm = 0;
                while (rm < ret.length) {
                    if ((ret[rm].MemberLimit <= rsize) && (ret[rm].MapType == "Hybrid")) {
                        NewResult.push(ret[rm]);
                    }
                    rm++;
                }
            }
            if (rtype == "Always") {
                let rm = 0;
                while (rm < ret.length) {
                    if (ret[rm].MapType == "Always") {
                        NewResult.push(ret[rm]);
                    }
                    rm++;
                }
            }
            return NewResult;
        });
    }

    async function ULTRAChatSearchRoomSpaceSelectClick() {
        modApi.hookFunction('ChatSearchRoomSpaceSelectClick', 4, (args, next) => {
            if ((MouseX >= 385) && (MouseX < 465) && (MouseY >= 885) && (MouseY < 975)) {
                rtype = "ALL";
                M_MOANER_saveControls();
                ChatSelectStartSearch(ChatRoomSpace);
            }
            if ((MouseX >= 495) && (MouseX < 575) && (MouseY >= 885) && (MouseY < 975)) {
                rtype = "Never";
                M_MOANER_saveControls();
                ChatSelectStartSearch(ChatRoomSpace);
            }
            if ((MouseX >= 605) && (MouseX < 685) && (MouseY >= 885) && (MouseY < 975)) {
                rtype = "Hybrid";
                M_MOANER_saveControls();
                ChatSelectStartSearch(ChatRoomSpace);
            }
            if ((MouseX >= 715) && (MouseX < 795) && (MouseY >= 885) && (MouseY < 975)) {
                rtype = "Always";
                M_MOANER_saveControls();
                ChatSelectStartSearch(ChatRoomSpace);
            }
            if ((MouseX >= 1515) && (MouseX < 1595) && (MouseY >= 885) && (MouseY < 975)) {
                if (IsFemale() == true) ChatSelectStartSearch(ChatRoomSpaceType.FEMALE_ONLY);
            }
            if ((MouseX >= 1625) && (MouseX < 1715) && (MouseY >= 885) && (MouseY < 975)) ChatSelectStartSearch(ChatRoomSpaceType.ASYLUM);
            if ((MouseX >= 1735) && (MouseX < 1825) && (MouseY >= 885) && (MouseY < 975)) ChatSelectStartSearch(ChatRoomSpaceType.MIXED);
            if ((MouseX >= 1845) && (MouseX < 1935) && (MouseY >= 885) && (MouseY < 975)) {
                if (IsMale() == true) ChatSelectStartSearch(ChatRoomSpaceType.MALE_ONLY);
            }
            return;
        });
    }

    async function ULTRAChatSearchRoomSpaceSelectDraw() {
        modApi.hookFunction('ChatSearchRoomSpaceSelectDraw', 4, (args, next) => {
            DrawButton(385, 885, 90, 90, "ALL", "White", "", "All Room Types");
            DrawButton(495, 885, 90, 90, "", "White", "", "Normal Rooms");
            DrawImageResize("Icons/Rectangle/CharacterView.png", 480, 900, 120, 60);
            DrawButton(605, 885, 90, 90, "", "White", "Icons/MapTypeHybrid.png", "Hybrid Rooms");
            DrawButton(715, 885, 90, 90, "", "White", "Icons/MapTypeAlways.png", "Map Rooms");
            DrawText("Lobbies", 1405, 940, "White", "Black");
            if (IsFemale() == true) {
                DrawButton(1515, 885, 90, 90, "", "White", "Screens/Online/ChatSelect/Female.png", "Only Female");
            } else {
                DrawButton(1515, 885, 90, 90, "", "Gray", "Screens/Online/ChatSelect/Female.png", "Only Female");
            }
            DrawButton(1625, 885, 90, 90, "", "White", "Icons/Asylum.png", "Asylum");
            DrawButton(1735, 885, 90, 90, "MIXED", "White", "", "Mixed");
            if (IsMale() == true) {
                DrawButton(1845, 885, 90, 90, "", "White", "Screens/Online/ChatSelect/Male.png", "Only Male");
            } else {
                DrawButton(1845, 885, 90, 90, "", "Gray", "Screens/Online/ChatSelect/Male.png", "Only Male");
            }
            return;
        });
    }

    async function ULTRAChatSearchRun() {
        modApi.hookFunction('ChatSearchRun', 4, (args, next) => {
            KidnapLeagueResetOnlineBountyProgress();
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
            ElementPositionFixed("InputSearch", 25, 45, 620);
            DrawTextFit(ChatSearchMessage != "" ? TextGet(ChatSearchMessage) : "", 1050, 935, 490, "White", "Gray");
            let ChatSearchPageCount = Math.floor((Result.length + ChatSearchRoomsPerPage - 1) / ChatSearchRoomsPerPage).toString();
            let ChatSearchCurrentPage = (ChatSearchResultOffset / ChatSearchRoomsPerPage + 1).toString();
            DrawTextFit(`${ChatSearchCurrentPage}/${ChatSearchPageCount}`, 1175, 75, 90, "White", "Gray");
            DrawButton(905, 25, 90, 90, "", ChatSearchMode != "Filter" ? "White" : "Lime", "Icons/Private.png", TextGet(ChatSearchMode != "Filter" ? "FilterMode" : "NormalMode"));
            DrawButton(25, 898, 350, 64, TextGet("Language" + ChatSearchLanguageTemp), "White");
            DrawButton(685, 25, 90, 90, "", "White", "Icons/Accept.png", ChatSearchMode == "" ? TextGet("SearchRoom") : TextGet("ApplyFilter"));
            DrawButton(795, 25, 90, 90, "", "White", "Icons/Cancel.png", ChatSearchMode == "" ? TextGet("ClearFilter") : TextGet("LoadFilter"));
            if (ChatSearchMode == "") {
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

    //Club Card Game
    async function ULTRAClubCardEndTurn(Draw = false) {
        modApi.hookFunction('ClubCardEndTurn', 4, (args, next) => {
            if (HighfameOn == true) {
                ClubCardFameGoal = cfame;
                let nmg = "";
                if (MouseIn(1705, 905, 90, 90) && (ClubCardPlayer[ClubCardTurnIndex].Control == "Player")) Draw = true;
                let CCPlayer = ClubCardPlayer[ClubCardTurnIndex];
                let Opponent = ClubCardGetOpponent(CCPlayer);
                let StartingFame = CCPlayer.Fame;
                let StartingMoney = CCPlayer.Money;
                let FameMoneyText = "";
                ClubCardRunTurnEndHandlers(CCPlayer, Opponent, true);
                if (CCPlayer.Board != null) {
                    for (const Card of CCPlayer.Board) {
                        if (Card.FamePerTurn != null) ClubCardPlayerAddFame(CCPlayer, Card.FamePerTurn);
                        if (Card.MoneyPerTurn != null) ClubCardPlayerAddMoney(CCPlayer, Card.MoneyPerTurn);
                    }
                }
                CCPlayer.LastFamePerTurn = CCPlayer.Fame - StartingFame;
                CCPlayer.LastMoneyPerTurn = CCPlayer.Money - StartingMoney;
                ClubCardRunTurnEndHandlers(CCPlayer, Opponent, false);
                if ((CCPlayer.Money < 0) && (CCPlayer.Fame > StartingFame)) {
                    CCPlayer.Fame = StartingFame;
                    CCPlayer.LastFamePerTurn = 0;
                }
                FameMoneyText = ((CCPlayer.LastFamePerTurn >= 0) ? "+" : "") + CCPlayer.LastFamePerTurn.toString() + " Fame, " + ((CCPlayer.LastMoneyPerTurn >= 0) ? "+" : "") + CCPlayer.LastMoneyPerTurn.toString() + " Money";
                if (CCPlayer.Fame >= ClubCardFameGoal) {
                    MiniGameVictory = (CCPlayer.Control == "Player");
                    MiniGameEnded = true;
                    const infoMessage = TextGet("EndTurnPlayer")
                        .replace("FAMEMONEY", FameMoneyText)
                        .replace("SOURCEPLAYER", CharacterNickname(CCPlayer.Character))
                        .replace("OPPONENTPLAYER", CharacterNickname(Opponent.Character));
                    ClubCardMessagePacketAdd(infoMessage, ClubCardMessageType.FAMEMONEYINFO);
                    let nmg = TextGet("VictoryFor" + CCPlayer.Control);
                    if (ClubCardIsOnline()) nmg = TextGet("VictoryOnline").replace("PLAYERNAME", CharacterNickname(CCPlayer.Character));
                    Msg = nmg.replace("100", cfame);
                    ClubCardCreatePopup("TEXT", Msg, TextGet("Return"), null, "ClubCardEndGame()", null);
                    ClubCardMessagePacketAdd(Msg, ClubCardMessageType.VICTORYINFO);
                    const messageVictoryTypesHeadPacker = [ClubCardMessageType.FAMEMONEYINFO, ClubCardMessageType.VICTORYINFO];
                    const victoryEndTurnPacket = ClubCardGetLogPacket(messageVictoryTypesHeadPacker);
                    ClubCardMessagePacketSend(victoryEndTurnPacket);
                    if (MiniGameVictory && (ClubCardReward != null)) ClubCardGetReward();
                    GameClubCardSyncOnlineData();
                    GameClubCardReset();
                    ClubCardFocus = null;
                    return;
                }
                ClubCardTurnEndDraw = Draw;
                if (Draw) {
                    const message = TextGet("EndTurnPlayer")
                        .replace("FAMEMONEY", FameMoneyText)
                        .replace("SOURCEPLAYER", CharacterNickname(CCPlayer.Character))
                        .replace("OPPONENTPLAYER", CharacterNickname(Opponent.Character));
                    ClubCardMessagePacketAdd(`${CharacterNickname(CCPlayer.Character)} draws a card.`, ClubCardMessageType.ACTION);
                    ClubCardMessagePacketAdd(message, ClubCardMessageType.FAMEMONEYINFO);
                    ClubCardPlayerDrawCard(ClubCardPlayer[ClubCardTurnIndex]);
                } else {
                    const message = TextGet("EndTurnPlayer")
                        .replace("FAMEMONEY", FameMoneyText)
                        .replace("SOURCEPLAYER", CharacterNickname(CCPlayer.Character))
                        .replace("OPPONENTPLAYER", CharacterNickname(Opponent.Character));
                    ClubCardMessagePacketAdd(message, ClubCardMessageType.FAMEMONEYINFO);
                }
                const messageTypesHeadPacker = [ClubCardMessageType.FAMEMONEYINFO, ClubCardMessageType.ACTION, ClubCardMessageType.CARDEFFECT];
                const endTurnPacket = ClubCardGetLogPacket(messageTypesHeadPacker);
                ClubCardMessagePacketSend(endTurnPacket);
                ClubCardTurnIndex++;
                CCPlayer.ClubCardTurnCounter++;
                if (ClubCardTurnIndex >= ClubCardPlayer.length) ClubCardTurnIndex = 0;
                ClubCardTurnCardPlayed = 0;
                ClubCardAIStart();
                ClubCardIsStartTurn = false;
                ClubCardStartTurn(ClubCardStartTurnType.ENDTURN);
                GameClubCardSyncOnlineData();
                return;
            }
            next(args);
        });
    }

    async function ULTRAClubCardGetReward() {
        modApi.hookFunction('ClubCardGetReward', 4, (args, next) => {
            if (HighfameOn == true) {
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
            let originaldesk = ClubCardBuilderDefaultDeck;
            let ClubCardBuilderExtraDeck = [1000, 1001, 1002, 1003, 1004, 1006, 1007, 1015, 1017, 2000, 3008, 5005, 6005, 7007, 8005, 11000, 11001, 11002, 11003, 11008, 11009, 11010, 12000, 12001, 12002, 12004, 30012, 30013, 30021, 30022];
            if (cdesk == 1) ClubCardBuilderDefaultDeck = ClubCardBuilderABDLDeck;
            if (cdesk == 2) ClubCardBuilderDefaultDeck = ClubCardBuilderAsylumDeck;
            if (cdesk == 3) ClubCardBuilderDefaultDeck = ClubCardBuilderCollegeDeck;
            if (cdesk == 4) ClubCardBuilderDefaultDeck = ClubCardBuilderDominantDeck;
            if (cdesk == 5) ClubCardBuilderDefaultDeck = ClubCardBuilderLiabilityDeck;
            if (cdesk == 6) ClubCardBuilderDefaultDeck = ClubCardBuilderMaidDeck;
            if (cdesk == 7) ClubCardBuilderDefaultDeck = ClubCardBuilderPornDeck;
            if (cdesk == 8) ClubCardBuilderDefaultDeck = ClubCardBuilderExtraDeck;
            if (cdesk == 0) ClubCardBuilderDefaultDeck = originaldesk;
            next(args);
        });
    }

    async function ULTRAClubCardRenderBoard() {
        modApi.hookFunction('ClubCardRenderBoard', 4, (args, next) => {
            ClubCardBackground = ccname;
            next(args);
        });
    }

    //Friendlist 
    async function ULTRAFriendListDraw() {
        modApi.hookFunction('FriendListDraw', 4, (args, next) => {
            FriendListBackground = frname;
            next(args);
        });
    }

    async function ULTRAFriendListKeyDown() {
        modApi.hookFunction('FriendListKeyDown', 4, (args, next) => {
            const searchInput = /** @type {HTMLTextAreaElement} */ (document.getElementById(FriendListIDs.searchInput));
            const searchInputHasFocus = searchInput && document.activeElement === searchInput;
            const beepTextArea = /** @type {HTMLTextAreaElement} */ (document.getElementById(FriendListIDs.beepTextArea));
            const beepTextAreaHasFocus = beepTextArea && document.activeElement === beepTextArea;
            if (FriendListBeepTarget !== -1 || beepTextArea) {
                if (event.key === 'Escape' && !event.shiftKey) {
                    FriendListBeepMenuClose();
                    return true;
                }
            }
            if (beepTextAreaHasFocus) {
                if (event.key === 'Enter' && event.ctrlKey) {
                    FriendListBeepMenuSend();
                    return true;
                }
            }
            if (FrkeysOn == true) {
                if ((FriendListModeIndex == 0) && (!searchInputHasFocus) && (!beepTextAreaHasFocus)) {
                    if (event.code === "KeyF") {
                        if (IsFemale() == true) {
                            ChatRoomSpace = "";
                            ServerSend("AccountQuery", {
                                Query: "OnlineFriends"
                            });
                            return true;
                        }
                    }
                    if (event.code === "KeyG") {
                        ChatRoomSpace = "X";
                        ServerSend("AccountQuery", {
                            Query: "OnlineFriends"
                        });
                        return true;
                    }
                    if (event.code === "KeyH") {
                        if (IsMale() == true) {
                            ChatRoomSpace = "M";
                            ServerSend("AccountQuery", {
                                Query: "OnlineFriends"
                            });
                            return true;
                        }
                    }
                    if (event.code === "KeyJ") {
                        ChatRoomSpace = "Asylum";
                        ServerSend("AccountQuery", {
                            Query: "OnlineFriends"
                        });
                        return true;
                    }
                }
            }
            return false;
            return;
        });
    }

    //Help
    async function UKTRACommandAutoComplete() {
        modApi.hookFunction('CommandAutoComplete', 4, (args, next) => {
            msg = ElementValue("InputChat");
            const low = msg.toLowerCase();
            if (!low || !low.startsWith(CommandsKey) || low.length <= CommandsKey.length) return;
            if (low.substring(CommandsKey.length).startsWith(CommandsKey)) return;
            const [key, ...forward] = low.replace(/\s{2,}/g, ' ').split(' ');
            const CS = GetCommands().filter(C => (CommandsKey + C.Tag).indexOf(key) == 0);
            if (CS.length == 0) return;
            if (CS.length == 1) {
                if (key != (CommandsKey + CS[0].Tag)) {
                    ElementValue("InputChat", CommandsKey + CS[0].Tag + " ");
                    ElementFocus("InputChat");
                } else if (CS[0].AutoComplete) {
                    CS[0].AutoComplete.call(CS[0], forward, low, msg);
                }
                return;
            }
            if (forward.length > 0) return;
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
                if (NotimeoutOn == true) {
                    CommandPrintHelpFor(CS);
                } else {
                    CommandPrintHelpFor(CS, 5000);
                }
            }
            return;
        });
    }

    //Lockpicking
    async function ULTRAStruggleMinigameWasInterrupted() {
        modApi.hookFunction('StruggleMinigameWasInterrupted', 4, (args, next) => {
            if (FullseedOn == true) {
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
                if (MiniGameEnded) MiniGameVictory = true;
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
    async function ULTRAMainHallClick() {
        modApi.hookFunction('MainHallClick', 4, (args, next) => {
            if (MouseIn(1645, 145, 90, 90)) MainHallMoveToChatSelect();
            if ((MouseX >= 240) && (MouseX < 330) && (MouseY >= 475) && (MouseY < 565)) {
                if (IsFemale() == true) ChatSelectStartSearch(ChatRoomSpaceType.FEMALE_ONLY);
            }
            if ((MouseX >= 350) && (MouseX < 440) && (MouseY >= 475) && (MouseY < 565)) ChatSelectStartSearch(ChatRoomSpaceType.ASYLUM);
            if ((MouseX >= 460) && (MouseX < 550) && (MouseY >= 475) && (MouseY < 565)) ChatSelectStartSearch(ChatRoomSpaceType.MIXED);
            if ((MouseX >= 570) && (MouseX < 660) && (MouseY >= 475) && (MouseY < 565)) {
                if (IsMale() == true) ChatSelectStartSearch(ChatRoomSpaceType.MALE_ONLY);
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
            DrawText("Chat Rooms", 130, 530, "White", "Black");
            if (IsFemale() == true) {
                DrawButton(240, 475, 90, 90, "", "White", "Screens/Online/ChatSelect/Female.png", "Only Female");
            } else {
                DrawButton(240, 475, 90, 90, "", "Gray", "Screens/Online/ChatSelect/Female.png", "Only Female");
            }
            DrawButton(350, 475, 90, 90, "", "White", "Icons/Asylum.png", "Asylum");
            DrawButton(460, 475, 90, 90, "MIXED", "White", "", "Mixed");
            if (IsMale() == true) {
                DrawButton(570, 475, 90, 90, "", "White", "Screens/Online/ChatSelect/Male.png", "Only Male");
            } else {
                DrawButton(570, 475, 90, 90, "", "Gray", "Screens/Online/ChatSelect/Male.png", "Only Male");
            }
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
            DrawButton(570, 695, 90, 90, "EXT", "White", "", "Extensions");
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
    async function ULTRAPandoraPrisonClick() {
        modApi.hookFunction('PandoraPrisonClick', 4, (args, next) => {
            if (SosbuttonsOn == true) {
                if ((MouseX >= 0) && (MouseX < 45) && (MouseY >= 45) && (MouseY < 90)) SosClick();
            }
            if (OutbuttonsOn == true) {
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
            if (SosbuttonsOn == true) SosButtons();
            if (OutbuttonsOn == true) OutButtons();
            return;
        });
    }

    //Photographic Room
    async function ULTRAPhotographicClick() {
        modApi.hookFunction('PhotographicClick', 4, (args, next) => {
            if (SosbuttonsOn == true) {
                if ((MouseX >= 0) && (MouseX < 45) && (MouseY >= 45) && (MouseY < 90)) SosClick();
            }
            if (OutbuttonsOn == true) {
                if ((MouseX >= 0) && (MouseX < 45) && (MouseY >= 90) && (MouseY < 135)) OutClick();
            }
            next(args);
        });
    }

    async function ULTRAPhotographicRun() {
        modApi.hookFunction('PhotographicRun', 4, (args, next) => {
            if (SosbuttonsOn == true) SosButtons();
            if (OutbuttonsOn == true) OutButtons();
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
            let backgrounds = "";
            if (MouseIn(1885, PrivateButtonTop(7), 90, 90) && LogQuery("RentRoom", "PrivateRoom")) {
                if (Player.VisualSettings == null) Player.VisualSettings = {};
                if (bgall == true) {
                    backgrounds = BackgroundsGenerateList(BackgroundsTagList);
                } else {
                    backgrounds = BackgroundsGenerateList(BackgroundsPrivateRoomTagList);
                }
                let index = backgrounds.indexOf(MainHallBackground);
                if (index < 0) index = 0;
                BackgroundSelectionMake(backgrounds, index, Name => {
                    Player.VisualSettings.MainHallBackground = Name;
                    ServerAccountUpdate.QueueData({
                        VisualSettings: Player.VisualSettings
                    });
                });
            }
            if (MouseIn(1885, PrivateButtonTop(8), 90, 90) && LogQuery("RentRoom", "PrivateRoom")) {
                if (Player.VisualSettings == null) Player.VisualSettings = {};
                if (bgall == true) {
                    backgrounds = BackgroundsGenerateList(BackgroundsTagList);
                } else {
                    backgrounds = BackgroundsGenerateList(BackgroundsPrivateRoomTagList);
                }
                let index = backgrounds.indexOf(PrivateBackground);
                if (index < 0) index = 0;
                BackgroundSelectionMake(backgrounds, index, Name => {
                    Player.VisualSettings.PrivateRoomBackground = Name;
                    PrivateBackground = Name;
                    ServerAccountUpdate.QueueData({
                        VisualSettings: Player.VisualSettings
                    });

                });
            }
            if (MouseIn(0, 900, 49, 49) && LogQuery("RentRoom", "PrivateRoom")) {
                if (bgall == true) {
                    backgrounds = BackgroundsGenerateList(BackgroundsTagList);
                } else {
                    backgrounds = BackgroundsGenerateList(BackgroundsPrivateRoomTagList);
                }
                let index = backgrounds.indexOf(frname);
                if (index < 0) index = 0;
                BackgroundSelectionMake(backgrounds, index, Name => {
                    frname = Name;
                    M_MOANER_saveControls();
                });
            }
            if (MouseIn(0, 950, 49, 49) && LogQuery("RentRoom", "PrivateRoom")) {
                if (bgall == true) {
                    backgrounds = BackgroundsGenerateList(BackgroundsTagList);
                } else {
                    backgrounds = BackgroundsGenerateList(BackgroundsPrivateRoomTagList);
                }
                let index = backgrounds.indexOf(tcname);
                if (index < 0) index = 0;
                BackgroundSelectionMake(backgrounds, index, Name => {
                    tcname = Name;
                    M_MOANER_saveControls();
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
                if ((MouseX >= 0) && (MouseX < 45) && (MouseY >= 45) && (MouseY < 90)) SosClick();
            }
            if (OutbuttonsOn == true) {
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
            if (SosbuttonsOn == true) SosButtons();
            if (OutbuttonsOn == true) OutButtons();
            next(args);
        });
    }

    //Vision
    async function ULTRADrawCharacter() {
        modApi.hookFunction('DrawCharacter', 4, (args, next) => {
            if (blureffect == true) BlurEffect();
            next(args);
        });
    }

    async function ULTRADrawRoomBackground() {
        modApi.hookFunction('DrawRoomBackground', 4, (args, next) => {
            if (blureffect == true) BlurEffect();
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
                            if ((tmpname != tgpname) &&
                                (C.OnlineSharedSettings.Uwall == true) &&
                                ((C.OnlineSharedSettings.Ulist == undefined) ||
                                    (!(C.OnlineSharedSettings.Ulist.includes(Player.MemberNumber))))) {
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
                        if ((tmpname != tgpname) &&
                            (C.OnlineSharedSettings.Uwall == true) &&
                            ((C.OnlineSharedSettings.Ulist == undefined) ||
                                (!(C.OnlineSharedSettings.Ulist.includes(Player.MemberNumber))))) {
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
                        if ((tmpname != tgpname) &&
                            (C.OnlineSharedSettings.Uwall == true) &&
                            ((C.OnlineSharedSettings.Ulist == undefined) ||
                                (!(C.OnlineSharedSettings.Ulist.includes(Player.MemberNumber))))) {
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
                        if ((tmpname != tgpname) &&
                            (C.OnlineSharedSettings.Uwall == true) &&
                            ((C.OnlineSharedSettings.Ulist == undefined) ||
                                (!(C.OnlineSharedSettings.Ulist.includes(Player.MemberNumber))))) {
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

    //Other functions

    //Background
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
    function showAnimalTypeStatus() {
        let msg = "Current Animal Type: " + BCARdata.animal;
        statusmsg(msg);
    }

    function showAnimationButtonsStatus() {
        let msg = "Animation Buttons disabled.";
        if (BCARdata.animationButtonsEnable) msg = "Animation Buttons enabled.";
        statusmsg(msg);
    }

    function showArousalManipulationStatus() {
        let msg = "Arousal Manipulation disabled.";
        if (BCARdata.arousalEnable) msg = "Arousal Manipulation enabled.";
        statusmsg(msg);
    }

    function showBCARExpressionsStatus() {
        let msg = "BCAR Expressions disabled.";
        if (BCARdata.expressionsEnable) msg = "BCAR Expressions enabled.";
        statusmsg(msg);
    }

    function showEarAnimationStatus() {
        let msg = "Ear Animation disabled.";
        if (BCARdata.earWigglingEnable) msg = "Ear Animation enabled.";
        statusmsg(msg);
    }

    function showEarEmoteStatus() {
        let msg = "Ear Emote disabled.";
        if (BCARdata.earEmoteEnable) msg = "Ear Emote enabled.";
        statusmsg(msg);
    }

    function showTailAnimationStatus() {
        let msg = "Tail Animation disabled.";
        if (BCARdata.tailWaggingEnable) msg = "Tail Animation enabled.";
        statusmsg(msg);
    }

    function showTailEmoteStatus() {
        let msg = "Tail Emote disabled.";
        if (BCARdata.tailEmoteEnable) msg = "Tail Emote enabled.";
        statusmsg(msg);
    }

    function showWingAnimationStatus() {
        let msg = "Wing Animation disabled.";
        if (BCARdata.wingFlappingEnable) msg = "Wing Animation enabled.";
        statusmsg(msg);
    }

    //BC Responsive Status	
    function showBCResponsiveStatus() {
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
    function showArousalErectionStatus() {
        let msg = "Arousal can't affect male erection.";
        if (BCTdata.arousalAffectsErection) msg = "Arousal can affect male erection.";
        statusmsg(msg);
    }

    function showArousalProgressStatus() {
        let msg = "Arousal can't affect orgasm progress.";
        if (BCTdata.arousalAffectsOrgasmProgress) msg = "Arousal can affect orgasm progress.";
        statusmsg(msg);
    }

    function showBCIconsStatus() {
        let msg = "BC Icons are always displayed.";
        if (BCTdata.allIconOnlyShowOnHover) msg = "BC Icons are displayed only when the mouse hovers above you.";
        statusmsg(msg);
    }

    function showBCTChangelogStatus() {
        let msg = "BCT Changelog feature is disabled.";
        if (BCTdata.showChangelog) msg = "BCT Changelog feature is enabled.";
        statusmsg(msg);
    }

    function showBCTIconStatus() {
        let msg = "BCT Icon is always displayed.";
        if (BCTdata.bctIconOnlyShowOnHover) msg = "BCT Icon is displayed only when the mouse hovers above you.";
        statusmsg(msg);
    }

    function showBestFriendsStatus() {
        let msg = "Best Friends feature is disabled.";
        if (BCTdata.bestFriendsEnabled) msg = "Best Friends feature is enabled.";
        statusmsg(msg);
    }

    function showFriendlistSlotsStatus() {
        let msg = "No extra infos in Friendlist.";
        if (BCTdata.friendlistSlotsEnabled) msg = "Extra infos in Friendlist.";
        statusmsg(msg);
    }

    function showLockConversionStatus() {
        let msg = "High security locks can't become Best Friend locks.";
        if (BCTdata.hsToBFLockconvert) msg = "High security locks can become Best Friend locks.";
        statusmsg(msg);
    }

    function showRoomShareStatus() {
        let msg = "Best Friends can't share private room names.";
        if (BCTdata.bestFriendsRoomShare) msg = "Best Friends can share private room names.";
        statusmsg(msg);
    }

    function showSplitStatus() {
        let msg = "Only the standard arousal + orgasm bar.";
        if (BCTdata.splitOrgasmArousal) msg = "Two bars for arousal and orgasm.";
        statusmsg(msg);
    }

    function showTailWaggingStatus() {
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
        if (window.CurrentScreen == "ChatRoom") {
            DrawButton(955, 90, 45, 45, "OUT", "White", "", "");
        } else {
            if (SlowleaveOn == true) {
                DrawButton(0, 90, 45, 45, "OUT", "White", "", "Slow Exit");
            } else {
                DrawButton(0, 90, 45, 45, "OUT", "White", "", "Fast Exit");
            }
        }
    }

    function OutChat() {
        ChatRoomSetLastChatRoom("");
        ServerSend("ChatRoomLeave", "");
        CommonSetScreen("Online", "ChatSearch");
        ChatRoomClearAllElements();
        OnlineGameName = "";
        ChatRoomGame = "";
        ChatRoomData = null;
    }

    function OutClick() {
        if (window.CurrentScreen == "Cell") CellLock(0);
        if (window.CurrentScreen == "PandoraPrison") PandoraPunishmentSentence(0);
        CharacterRefresh(Player);
        if (SlowleaveOn == true) {
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

    function PrfClick() {
        ChatRoomSetLastChatRoom("");
        ChatRoomHideElements();
        InformationSheetLoadCharacter(Player);
        PreferenceSubscreen = "Main";
        PreferenceRun();
        CommonSetScreen("Character", "Preference");
    }

    function SosButtons() {
        if (window.CurrentScreen == "ChatRoom") {
            DrawButton(955, 45, 45, 45, "FREE", "White", "", "");
        } else {
            DrawButton(0, 45, 45, 45, "FREE", "White", "", "Total Release");
        }
    }

    function SosClick() {
        CharacterReleaseTotal(Player);
        if (window.CurrentScreen == "ChatRoom") ChatRoomCharacterUpdate(Player);
        RealGarblingLevel();
    }

    //EBCH Status
    function showEbchLogStatus() {
        let msg = "Chatlogging is enabled.";
        if (EBCHdata[4] == 0) msg = "Chatlogging is disabled.";
        statusmsg(msg);
    }

    function showEbchNotificationStatus() {
        let msg = "Custom notifications are enabled.";
        if (EBCHdata[8] == 0) msg = "Custom notifications are disabled.";
        statusmsg(msg);
    }

    function showEbchPoseStatus() {
        let msg = "Pose menu is automatically displayed.";
        if (EBCHdata[6] == 0) msg = "Pose menu is not automatically displayed.";
        statusmsg(msg);
    }

    function showEbchUngarbleStatus() {
        let msg = "All messages are ungarbled.";
        if (EBCHdata[2] == 0) msg = "Messages are not ungarbled.";
        if (EBCHdata[2] == 1) msg = "Messages from white list are ungarbled.";
        statusmsg(msg);
    }

    function showEbchWelcomeStatus() {
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

    //LSCG Status
    function showBcLscgStatus() {
        let msg = "";
        let Activities = "";
        let Collar = "";
        let Chloroform = "";
        let Drugs = "";
        let Gagchoke = "";
        let Handchoke = "";
        let Hypnosis = "";
        let Leashing = "";
        let Magic = "";
        let msg1 = "LSCG is disabled.";
        if (LSCGdata.GlobalModule.enabled) msg1 = "LSCG is enabled.";
        if (LSCGdata.ActivityModule.enabled) Activities = "Activities - ";
        if (LSCGdata.CollarModule.enabled) Collar = "Breathplay (Collar) - ";
        if (LSCGdata.MiscModule.chloroformEnabled) Chloroform = "Chloroform - ";
        if (LSCGdata.InjectorModule.enabled) Drugs = "Drugs + Net Gun - ";
        if (LSCGdata.MiscModule.gagChokeEnabled) Gagchoke = "Gag Choking - ";
        if (LSCGdata.MiscModule.handChokeEnabled) Handchoke = "Hand Choking - ";
        if (LSCGdata.HypnoModule.enabled) Hypnosis = "Hypnosis - ";
        if (LSCGdata.LeashingModule.enabled) Leashing = "Leashing - ";
        if (LSCGdata.MagicModule.enabled) Magic = "Magic";
        msg = msg1 + " Features activated when LSCG is enabled: " + Activities + Collar + Chloroform + Drugs + Gagchoke + Handchoke + Hypnosis + Leashing + Magic
        statusmsg(msg);
    }

    function showBoopReactionsStatus() {
        let msg = "No auto-react when booped.";
        if (LSCGdata.BoopsModule.enabled) msg = "Auto-react when booped.";
        statusmsg(msg);
    }

    function showCheckRollsStatus() {
        let msg = "No display of attacker/defender roll values with some activities.";
        if (LSCGdata.GlobalModule.showCheckRolls) msg = "Display of attacker/defender roll values with some activities.";
        statusmsg(msg);
    }

    function showCraftingStatus() {
        let msg = "";
        let msg1 = "Your public craftings are not shared.";
        let msg2 = "Your shared public craftings are not displayed.";
        let msg3 = "Tamperproof features are disabled.";
        if (LSCGdata.GlobalModule.sharePublicCrafting) msg1 = "Your public craftings are shared and can be used by other LSCG players in the chat room.";
        if (LSCGdata.GlobalModule.seeSharedCrafts) msg2 = "Your shared public craftings are displayed.";
        if (LSCGdata.GlobalModule.tamperproofEnabled) msg3 = "Tamperproof features are enabled.";
        msg = msg1 + " " + msg2 + " " + msg3;
        statusmsg(msg);
    }

    function showEdgeBlurStatus() {
        let msg = "No blurring of the screen when you are on edge.";
        if (LSCGdata.GlobalModule.edgeBlur) msg = "Blurring of the screen when you are on edge.";
        statusmsg(msg);
    }

    function showErectionStatus() {
        let msg = "No private message when you feel an erection under your clothes.";
        if (LSCGdata.GlobalModule.erectionDetection) msg = "Private message when you feel an erection under your clothes.";
        statusmsg(msg);
    }

    function showLipstickStatus() {
        let msg = "";
        let msg1 = "No lipstick mark on your face or neck when someone kisses you.";
        let msg2 = "Lipstick marks possible when you kiss someone.";
        if (LSCGdata.LipstickModule.enabled) msg1 = "Other people can leave lipstick marks on your face or neck when kissing you.";
        if (LSCGdata.LipstickModule.dry) msg2 = "No lipstick marks when you kiss someone.";
        msg = msg1 + " " + msg2;
        statusmsg(msg);
    }

    function showOpacityStatus() {
        let msg = "";
        let msg1 = "Effects bypassing opacity are not applied.";
        let msg2 = "Other players can't change the opacity of your wardrobe items.";
        if (LSCGdata.OpacityModule.enabled) msg1 = "Effects bypassing opacity are applied.";
        if (LSCGdata.OpacityModule.preventExternalMod) msg2 = "Other players can change the opacity of your wardrobe items.";
        msg = msg1 + " " + msg2;
        statusmsg(msg);
    }

    function showRestrainedSettingsStatus() {
        let msg = "LSCG settings can be changed when you are restrained.";
        if (LSCGdata.GlobalModule.blockSettingsWhileRestrained) msg = "LSCG settings can't be changed when you are restrained.";
        statusmsg(msg);
    }

    function showResizingStatus() {
        let msg = "LSCG resizing effects will be displayed.";
        if (LSCGdata.GlobalModule.hideResizing) msg = "LSCG resizing effects will not be displayed.";
        statusmsg(msg);
    }

    //MBS Status
    function showGarblingStatus() {
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

    function showLockedMbsStatus() {
        let msg = "You can always change MBS settings, even when you are restrained.";
        if (MBSdata.LockedWhenRestrained) msg = "MBS settings are locked when you are restrained.";
        statusmsg(msg);
    }

    function showLockedWheelStatus() {
        let msg = "Wheel of fortune is locked when you are restrained.";
        if (MBSdata.RollWhenRestrained) msg = "You can always spin a wheel of fortune, even when you are restrained.";
        statusmsg(msg);
    }

    function showMbsChangeStatus() {
        let msg = "New MBS Version changelog is disabled.";
        if (MBSdata.ShowChangelog) msg = "New MBS Version changelog is enabled.";
        statusmsg(msg);
    }

    //Messages
    function infomsg(msg) {
        ChatRoomSendLocal(
            "<p style='background-color:#5fbd7a'>ULTRAbc: " + msg + "</p>"
        );
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
                NogarbleOn = false;
                M_MOANER_saveControls();
            }
            if (FBCdata.autoStruggle) {
                sbc = 1;
                Player.RestrictionSettings.BypassStruggle = false;
                NostruggleOn = false;
                M_MOANER_saveControls();
            }
        }
        if (gbc == 0) {
            if (NogarbleOn == null || NogarbleOn == undefined) {
                NogarbleOn = false;
                M_MOANER_saveControls();
            }
            if (NogarbleOn == true) {
                Player.RestrictionSettings.NoSpeechGarble = true;
            } else {
                Player.RestrictionSettings.NoSpeechGarble = false;
            }
        }
        if (sbc == 0) {
            if (NostruggleOn == null || NostruggleOn == undefined) {
                NostruggleOn = false;
                M_MOANER_saveControls();
            }
            if (NostruggleOn == true) {
                Player.RestrictionSettings.BypassStruggle = true;
            } else {
                Player.RestrictionSettings.BypassStruggle = false;
            }
        }
    }

    //Responsive Status
    function showResponsiveStatus() {
        let msg = "Responsive is disabled.";
        if (RSPdata.GlobalModule.ResponsiveEnabled) msg = "Responsive is enabled.";
        statusmsg(msg);
    }

    function showBcrResponsesStatus() {
        let msg = "Responses feature is disabled.";
        if (RSPdata.GlobalModule.responsesEnabled) msg = "Responses feature is enabled.";
        statusmsg(msg);
    }

    function showCharacterTalkStatus() {
        let msg = "Character Talk is disabled.";
        if (RSPdata.GlobalModule.CharTalkEnabled) msg = "Character Talk is enabled.";
        statusmsg(msg);
    }

    function showInterceptMessageStatus() {
        let msg = "Responses can't interrupt and send messages.";
        if (RSPdata.GlobalModule.doMessageInterruption) msg = "Responses can interrupt and send messages.";
        statusmsg(msg);
    }

    function showLeaveMessageStatus() {
        let msg = "The message being written is not sent when leashed out of the room.";
        if (RSPdata.GlobalModule.doLeaveMessage) msg = "The message being written is sent when leashed out of the room.";
        statusmsg(msg);
    }

    function showMoansStatus() {
        let msg = "Moans are not added to responses when highly aroused.";
        if (RSPdata.GlobalModule.doAddMoansOnHighArousal) msg = "Moans are added to responses when highly aroused.";
        statusmsg(msg);
    }

    function showNewVersionStatus() {
        let msg = "New Responsive Version feature is disabled.";
        if (RSPdata.GlobalModule.doShowNewVersionMessage) msg = "New Responsive Version feature is enabled.";
        statusmsg(msg);
    }

    function showRulesStatus() {
        let msg = "BCX rules can't prevent message sending.";
        if (RSPdata.GlobalModule.doPreventMessageIfBcxBlock) msg = "BCX rules can prevent message sending.";
        statusmsg(msg);
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
    function showButtonsStatus() {
        let msg = "";
        let EXT = "";
        let FREE = "";
        let OUT = "";
        let RGL = "";
        if (ExtbuttonsOn) EXT = "EXT - ";
        if (SosbuttonsOn) FREE = "FREE - ";
        if (OutbuttonsOn) OUT = "OUT - ";
        if (RglbuttonsOn) RGL = "RGL";
        msg = "Buttons activated: " + EXT + FREE + OUT + RGL;
        statusmsg(msg);
    }

    function showExitmodeStatus() {
        let msg = "Fast exit mode is activated.";
        if (SlowleaveOn) msg = "Slow exit mode is activated.";
        statusmsg(msg);
    }

    function showFeaturesStatus() {
        let msg = "";
        let Autojoin = "";
        let Fullseed = "";
        let Frkeys = "";
        let Hotkeys = "";
        if (AutojoinOn) Autojoin = "Auto-Join - ";
        if (FullseedOn) Fullseed = "Full solution for intricate/hs locks - ";
        if (FrkeysOn) Frkeys = "Hotkeys in friendlist - "
        if (HotkeysOn) Hotkeys = "Hotkeys on numeric pad"
        msg = "Features enabled: " + Autojoin + Fullseed + Frkeys + Hotkeys;
        statusmsg(msg);
    }

    function showHighfameStatus() {
        let msg = "";
        let msg1 = "High fame mode disabled in Bondage Club Card Game.";
        if (HighfameOn) msg1 = "High fame mode enabled in Bondage Club Card Game.";
        msg = msg1 + " Current high fame: " + cfame + ". Current default desk: " + cdesk + ".";
        statusmsg(msg);
    }

    function showMagiccheatStatus() {
        let msg = "Cheat mode disabled in B. Brawl and Magic School.";
        if (MagiccheatOn) msg = "Cheat mode enabled in B. Brawl and Magic School.";
        statusmsg(msg);
    }

    function showMaptrapStatus() {
        let msg = "";
        let msg1 = "No traps with devices in map rooms.";
        let msg2 = "No magic toys added under locked chastity for trap mode.";
        if (MaptrapOn) msg1 = "Traps in map rooms if you 'walk' on devices.";
        if (MagiccheatOn) msg2 = "Magic toys added under locked chastity for trap mode.";
        msg = msg1 + " " + msg2;
        statusmsg(msg);
    }

    function showMiscUbcStatus() {
        let msg = "";
        let msg1 = "Only 43 backgrounds usable in Private Room (SP). ";
        let msg2 = "Permission change after safeword. ";
        let msg3 = "Time-out enabled in TAB help. ";
        let msg4 = "NPC punishments disabled.";
        if (bgall) msg1 = "All standard backgrounds usable in Private Room (SP). ";
        if (FixpermOn) msg2 = "No permission change after safeword. ";
        if (NotimeoutOn) msg3 = "Time-out disabled in TAB help. ";
        if (NPCpunish) msg4 = "NPC punishments enabled.";
        msg = msg1 + msg2 + msg3 + msg4;
        statusmsg(msg);
    }

    function showNostruggleStatus() {
        let msg = "Automatic struggle in mini-games is disabled.";
        if (NostruggleOn) msg = "Automatic struggle in mini-games is enabled.";
        statusmsg(msg);
    }

    function showSearchRoomStatus() {
        let msg = "";
        let msg1 = "Chat Search type: ";
        let msg2 = "";
        if (rtype == "ALL") msg2 = "All rooms. ";
        if (rtype == "Never") msg2 = "Normal rooms. ";
        if (rtype == "Hybrid") msg2 = "Hybrid rooms. ";
        if (rtype == "Always") msg2 = "Mapped rooms. ";
        let msg3 = "Max players for normal/hybrid rooms: ";
        msg = msg1 + msg2 + msg3 + rsize + ".";
        statusmsg(msg);
    }

    function showTalkStatus() {
        let msg = "";
        let msg1 = "";
        if (animal == 0) msg1 = "Human talk mode";
        if (animal == 1) msg1 = "Bunny talk mode";
        if (animal == 2) msg1 = "Cow talk mode";
        if (animal == 3) msg1 = "Fox talk mode";
        if (animal == 4) msg1 = "Kitty talk mode";
        if (animal == 5) msg1 = "Mouse talk mode";
        if (animal == 6) msg1 = "Pig talk mode";
        if (animal == 7) msg1 = "Pony talk mode";
        if (animal == 8) msg1 = "Puppy talk mode";
        if (animal == 9) msg1 = "Wolfy talk mode";
        let msg2 = "Forced stuttering level: " + st;
        let msg3 = "Forced gag level: " + gl;
        let msg4 = "No-whisper mode disabled.";
        let msg5 = "Doll talk (and whisper) mode disabled.";
        let msg6 = "No ungarble with BC default talk mode.";
	let msg7 = "No extended synchronization with RGL button.";
        if (NowhisperOn) msg4 = "No-whisper mode enabled.";
        if (DolltalkOn) msg5 = "Doll talk (and whisper) mode enabled.";
        if (NogarbleOn) msg6 = "Ungarble with BC default talk mode.";
	if (RglsyncOn) msg7 = "Extended synchronization with RGL button.";
        msg = msg1 + " - " + msg2 + " - " + msg3 + " - " + msg4 + " " + msg5 + " " + msg6 + " " + msg7;
        statusmsg(msg);
    }

    //Talking
    function IsDollTalk(text) {
        let nn = 0;
        let segmenter = new Intl.Segmenter([], {
            granularity: 'word'
        });
        let segmentedText = segmenter.segment(text);
        let words = [...segmentedText].filter(s => s.isWordLike).map(s => s.segment);
        let ln = words.length;
        if (ln > 5) nn = 1;
        let i = 0;
        while (i < ln) {
            let lw = words[i].length;
            if (lw > 6) nn = 1;
            i++;
        }
        if (nn == 1) {
            return false;
        } else {
            return true;
        }
    }

    function GarbleRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function GarbleTalk(text, garbleWords) {
        let message = text;
        if (text.startsWith("/whisper")) {
            let [, ...parts] = text.split(" ");
	    let target = parts?.shift();
	    message = parts?.join(" ");
        }
        if (message != "") {
            let newmessage = "";
            let newText = "";
            const punctuation = ",.!?";
            for (const word of message.split(" ")) {
                const rword = word.split("").reverse().join("");
                let wordPunctuation = "";
                if (punctuation.includes(rword[0])) {
                    for (const c of rword.split("")) {
                        if (punctuation.includes(c)) wordPunctuation += c;
                    }
                    wordPunctuation = wordPunctuation.split("").reverse().join("");
                }
                newmessage += garbleWords[GarbleRandom(0, garbleWords.length - 1)] + wordPunctuation + " ";
                newText = newmessage;
                if (text.startsWith("/whisper")) {
                    let [, ...parts] = text.split(" ");
		    let target = parts?.shift();
                    newText = "/whisper " + target + " " + newmessage;
                }
           } 
           return newText.trim();
        }
        return text.trim();
    }

    function RealGarblingLevel() {
        let notalk = 0;
        let ntt = 0;
        ElementValue("InputChat", "");
        let bl = 0;
        let nbl = 0;
        let obl = Player.UBC.ubcSettings.bl; 
        let ogl = Player.UBC.ubcSettings.gaglevel; 
        let ont = Player.UBC.ubcSettings.notalk;
        if (Player.ExtensionSettings.LSCG != null) {
                let str = Player.ExtensionSettings.LSCG;
                let d = LZString.decompressFromBase64(str);
                let LSCGdata = {};
                let decoded = JSON.parse(d);
                LSCGdata = decoded;
                if (InventoryGet(Player, "ItemNeck") != null) {
                    if (LSCGdata.CollarModule.chokeLevel == 4) ntt = 1;
                }
                let type = '';
                let config = "";
                let states = LSCGdata.StateModule.states;
                type = 'asleep';
                config = states.find(s => s.type == type);
                if ((config != undefined) && (config.active == true)) ntt = 1;
                type = 'frozen';
                config = states.find(s => s.type == type);
                if ((config != undefined) && (config.active == true)) ntt = 1;
                type = 'gagged';
                config = states.find(s => s.type == type);
                if ((config != undefined) && (config.active == true)) ntt = 1;
                type = 'hypnotized';
                config = states.find(s => s.type == type);
                if ((config != undefined) && (config.active == true)) ntt = 1;
        }   
        if ((InventoryGet(Player, "ItemMouth") != null) && (InventoryGet(Player, "ItemMouth").Asset.Name == "RegressedMilk")) nbl = 1;         
        if ((InventoryGet(Player, "ItemMouth2") != null) && (InventoryGet(Player, "ItemMouth2").Asset.Name == "RegressedMilk")) nbl = 1;
        if ((InventoryGet(Player, "ItemMouth3") != null) && (InventoryGet(Player, "ItemMouth3").Asset.Name == "RegressedMilk")) nbl = 1;
        if (nbl == 1) {
            if (this.BabyTalkOn == false || this.BabyTalkOn == undefined) BabyTalkOn = true;
            if (this.GagTalkOn == true || this.GagTalkOn == undefined) GagTalkOn = false;  
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
            if (window.CurrentScreen == "ChatRoom") {
                let msg = "You are now in real baby talk mode.";
                infomsg(msg);
                if (ntt == 1) {
                    let msg = "Besides, your very tight collar or a LSCG spell prevents you to talk.";
                    infomsg(msg);
                }
            }
        } else {
            if (this.BabyTalkOn == true || this.BabyTalkOn == undefined) BabyTalkOn = false;
            if (this.GagTalkOn == false || this.GagTalkOn == undefined) GagTalkOn = true;
            let ngl = SpeechTransformGagGarbleIntensity(Player);
            mgl = ngl;
            if (Player.ExtensionSettings.MBS != null) {
                let str = Player.ExtensionSettings.MBS;
                let d = LZString.decompressFromUTF16(str);
                let MBSdata = {};
                let decoded = JSON.parse(d);
                MBSdata = decoded;
                if ((MBSdata.AlternativeGarbling) && (ChatRoomTargetMemberNumber == null)) {
                    ngl = 0;
                    mgl = SpeechTransformGagGarbleIntensity(Player);
                }
            }
            if (ngl < 0) ngl = 0;
            if (mgl < 0) mgl = 0;
            if (Player.ExtensionSettings.LSCG != null) {
                let str = Player.ExtensionSettings.LSCG;
                let d = LZString.decompressFromBase64(str);
                let LSCGdata = {};
                let decoded = JSON.parse(d);
                LSCGdata = decoded;
                if (InventoryGet(Player, "ItemNeck") != null) {           
                    if (LSCGdata.CollarModule.chokeLevel > 1) {
                        ngl = (LSCGdata.CollarModule.chokeLevel) * 2 + ngl;
                        mgl = ngl;
                    }                  
                }
            }
            if (mgl == 0) {
                bl = 0;
                gl = 0;           
                GagTalkOn = false;
                Player.UBC.ubcSettings.bl = 0;
                Player.UBC.ubcSettings.gaglevel = 0;
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
                M_MOANER_saveControls();
                if (window.CurrentScreen == "ChatRoom") {
                    let msg = "You are now in normal talk mode.";
                    infomsg(msg);
                    if (ntt == 1) {
                        let msg = "However, your very tight collar or a LSCG spell prevents you to talk.";
                        infomsg(msg);
                    }
                }                 
            } else {
                if (Player.UBC.ubcSettings.rglsync == true) {
                    bl = 0;
                    gl = mgl;
                    GagTalkOn = true;
                    Player.UBC.ubcSettings.bl = 0;
                    Player.UBC.ubcSettings.gaglevel = mgl;
                    if (mgl > 10) Player.UBC.ubcSettings.gaglevel = 10;               
                }  else  {  
                    bl = 0;
                    gl = ogl;   
                    Player.UBC.ubcSettings.bl = 0;
                    Player.UBC.ubcSettings.gaglevel = ogl;
                }
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
                M_MOANER_saveControls();
                if (window.CurrentScreen == "ChatRoom") {
                    let msg = "You are now in real gag talk mode. Your current garbling level is " + ngl + ".";
                    infomsg(msg);
                    if (ntt == 1) {
                        let msg = "Besides, your very tight collar or a LSCG spell prevents you to talk.";
                        infomsg(msg);
                    }
                }                
            }
        }
    }

    //Themed Status   
    function showBCThemedStatus() {
        let msg = "ThemedBC is disabled.";
        if (THMdata.GlobalModule.themedEnabled) msg = "Themed is enabled.";
        statusmsg(msg);
    }

    function showCharacterAbsenceStatus() {
        let msg = "Absence's indicator is disabled.";
        if (THMdata.GlobalModule.doIndicateCharacterAbsence) msg = "Absence's indicator is enabled.";
        statusmsg(msg);
    }

    function showAdvancedColoringStatus() {
        let msg = "Advanced coloring is disabled";
        if (THMdata.GlobalModule.doUseAdvancedColoring) msg = "Advanced coloring is enabled.";
        statusmsg(msg);
    }

    function showChatStatus() {
        let msg = "The chat uses the default BC colors.";
        if (THMdata.IntegrationModule.chat) msg = "The chat uses colors selected in Themed.";
        statusmsg(msg);
    }

    function showFlatColorStatus() {
        let msg = "Coloring sheet enabled in settings.";
        if (THMdata.GlobalModule.doUseFlatColor) msg = "Flat color enabled in settings.";
        statusmsg(msg);
    }

    function showFriendListStatus() {
        let msg = "";
        let msg1 = "The friend list uses the default BC colors.";
        let msg2 = "No blur effect on friend list background.";
        if (THMdata.IntegrationModule.friendList) msg1 = "The friend list uses colors selected in Themed.";
        if (THMdata.IntegrationModule.friendListBlur) msg2 = "Blur effect on friend list background.";
        msg = msg1 + " " + msg2;
        statusmsg(msg);
    }

    function showGuiOverhaulStatus() {
        let msg = "The interface uses the default BC colors.";
        if (THMdata.GlobalModule.doVanillaGuiOverhaul) msg = "The interface uses colors selected in Themed.";
        statusmsg(msg);
    }

    function showInputZonesStatus() {
        let msg = "The input zones use the default BC colors.";
        if (THMdata.IntegrationModule.inputs) msg = "The input zones use colors selected in Themed.";
        statusmsg(msg);
    }

    function showLocalTimeStatus() {
        let msg = "The time is displayed according your system settings.";
        if (THMdata.GlobalModule.doShowLocaleTime) msg = "The time is displayed according your locale settings.";
        statusmsg(msg);
    }

    function showMiscDetailsStatus() {
        let msg = "";
        let msg1 = "Scrollbar uses the default BC colors.";
        let msg2 = "Text selection is not colored.";
        if (THMdata.IntegrationModule.scrollbar) msg1 = "Scrollbar uses colors selected in Themed.";
        if (THMdata.IntegrationModule.selection) msg2 = "Text selection is colored.";
        msg = msg1 + " " + msg2;
        statusmsg(msg);
    }

    function showThemedVersionStatus() {
        let msg = "New Themed Version feature is disabled.";
        if (THMdata.GlobalModule.doShowNewVersionMessage) msg = "New Themed Version feature is enabled.";
        statusmsg(msg);
    }

    //Traps
    function BondagebenchTrap() {
        let Target = "";
        let Item = "";
        CharacterNaked(Player);
        InventoryWear(Player, "BondageBench", "ItemDevices");
        if ((InventoryGet(Player, "ItemPelvis") == null) ||
            (InventoryGet(Player, "ItemPelvis").Property == null) ||
            (InventoryGet(Player, "ItemPelvis").Property.LockedBy == null) ||
            (MagictoysOn == true)) {
            if ((InventoryGet(Player, "ItemVulva") == null) ||
                (InventoryGet(Player, "ItemVulva").Property == null) ||
                (InventoryGet(Player, "ItemVulva").Property.LockedBy == null)) {
                InventoryWear(Player, "VibratingLatexPanties", "ItemVulva");
            }
        }
        InventoryWear(Player, "SleepSac", "ItemArms");
        InventoryWear(Player, "HeavyDutyEarPlugs", "ItemEars");
        InventoryWear(Player, "FullBlindfold", "ItemHead");
        InventoryWear(Player, "DeepthroatGag", "ItemMouth");
        Target = "ItemDevices";
        Item = InventoryGet(Player, Target);
        if (Item.Asset.Name == "BondageBench") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                typed: 4,
            }, {
                push: true,
                refresh: true,
            });
        }
        Target = "ItemVulva";
        Item = InventoryGet(Player, Target);
        if (Item.Asset.Name == "VibratingLatexPanties") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                vibrating: 9,
            }, {
                push: true,
                refresh: true,
            });
        }
        setTimeout(function() {
            for (let A = 0; A < Player.Appearance.length; A++)
                if (Player.Appearance[A].Asset.AllowLock == true) {
                    if (((Player.Appearance[A].Property != null) && (Player.Appearance[A].Property.LockedBy == null)) ||
                        (Player.Appearance[A].Property == null)) {
                        InventoryLock(Player, Player.Appearance[A], "ExclusivePadlock", Player.MemberNumber, Update = true);
                    }
                }
        }, 2000);
        CharacterRefresh(Player);
        ChatRoomCharacterUpdate(Player);
    }

    function KennelTrap() {
        let Target = "";
        let Item = "";
        CharacterNaked(Player);
        InventoryWear(Player, "ShinyPetSuit", "ItemArms");
        if ((InventoryGet(Player, "ItemBreast") == null) ||
            (InventoryGet(Player, "ItemBreast").Property == null) ||
            (InventoryGet(Player, "ItemBreast").Property.LockedBy == null) ||
            (MagictoysOn == true)) {
            if ((InventoryGet(Player, "ItemNipples") == null) ||
                (InventoryGet(Player, "ItemNipples").Property == null) ||
                (InventoryGet(Player, "ItemNipples").Property.LockedBy == null)) {
                InventoryWear(Player, "VibeNippleClamp", "ItemNipples");
            }
        }
        InventoryWear(Player, "LeatherHarness", "ItemTorso");
        if ((InventoryGet(Player, "ItemPelvis") == null) ||
            (InventoryGet(Player, "ItemPelvis").Property == null) ||
            (InventoryGet(Player, "ItemPelvis").Property.LockedBy == null) ||
            (MagictoysOn == true)) {
            if ((InventoryGet(Player, "ItemVulva") == null) ||
                (InventoryGet(Player, "ItemVulva").Property == null) ||
                (InventoryGet(Player, "ItemVulva").Property.LockedBy == null)) {
                InventoryWear(Player, "ClitoralStimulator", "ItemVulva");
            }
        }
        InventoryWear(Player, "HeavyDutyEarPlugs", "ItemEars");
        InventoryWear(Player, "DildoPlugGag", "ItemMouth");
        InventoryWear(Player, "LeatherSlimMaskOpenMouth", "ItemHead");
        InventoryWear(Player, "Kennel", "ItemDevices");
        Target = "ItemNipples";
        Item = InventoryGet(Player, Target);
        if (Item.Asset.Name == "VibeNippleClamp") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                vibrating: 9,
            }, {
                push: true,
                refresh: true,
            });
        }
        Target = "ItemVulva";
        Item = InventoryGet(Player, Target);
        if (Item.Asset.Name == "ClitoralStimulator") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                vibrating: 9,
            }, {
                push: true,
                refresh: true,
            });
        }
        Target = "ItemMouth";
        Item = InventoryGet(Player, Target);
        if (Item.Asset.Name == "DildoPlugGag") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                typed: 1,
            }, {
                push: true,
                refresh: true,
            });
        }
        Target = "ItemDevices";
        Item = InventoryGet(Player, Target);
        if (Item.Asset.Name == "Kennel") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                d: 1,
                p: 1,
            }, {
                push: true,
                refresh: true,
            });
        }
        setTimeout(function() {
            for (let A = 0; A < Player.Appearance.length; A++)
                if (Player.Appearance[A].Asset.AllowLock == true) {
                    if (((Player.Appearance[A].Property != null) && (Player.Appearance[A].Property.LockedBy == null)) ||
                        (Player.Appearance[A].Property == null)) {
                        InventoryLock(Player, Player.Appearance[A], "ExclusivePadlock", Player.MemberNumber, Update = true);
                    }
                }
        }, 2000);
        CharacterRefresh(Player);
        ChatRoomCharacterUpdate(Player);
    }

    function LockerTrap() {
        let Target = "";
        let Item = "";
        CharacterNaked(Player);
        InventoryWear(Player, "SockStuffing", "ItemMouth");
        InventoryWear(Player, "PantiesMask", "ItemMouth2");
        InventoryWear(Player, "ShoeGag", "ItemMouth3");
        InventoryWear(Player, "HeavyDutyEarPlugs", "ItemEars");
        InventoryWear(Player, "Pantyhose", "ItemHead");
        if ((InventoryGet(Player, "ItemBreast") == null) ||
            (InventoryGet(Player, "ItemBreast").Property == null) ||
            (InventoryGet(Player, "ItemBreast").Property.LockedBy == null)) {
            InventoryWear(Player, "TickleBra", "ItemBreast");
        }
        InventoryWear(Player, "ToeTie", "ItemBoots");
        InventoryWear(Player, "HempRope", "ItemFeet");
        InventoryWear(Player, "HempRope", "ItemLegs");
        if ((InventoryGet(Player, "ItemPelvis") == null) ||
            (InventoryGet(Player, "ItemPelvis").Property == null) ||
            (InventoryGet(Player, "ItemPelvis").Property.LockedBy == null)) {
            InventoryWear(Player, "HempRope", "ItemPelvis");
        }
        InventoryWear(Player, "DuctTape", "ItemHands");
        InventoryWear(Player, "PantyhoseBodyOpen", "ItemArms");
        InventoryWear(Player, "Locker", "ItemDevices");
        Target = "ItemBreast";
        Item = InventoryGet(Player, Target);
        if (Item.Asset.Name == "TickleBra") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                vibrating: 9,
            }, {
                push: true,
                refresh: true,
            });
        }
        Target = "ItemDevices";
        Item = InventoryGet(Player, Target);
        if (Item.Asset.Name == "Locker") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                typed: 1,
            }, {
                push: true,
                refresh: true,
            });
            Item.Property.Opacity = 0.66;
        }
        setTimeout(function() {
            for (let A = 0; A < Player.Appearance.length; A++)
                if (Player.Appearance[A].Asset.AllowLock == true) {
                    if (((Player.Appearance[A].Property != null) && (Player.Appearance[A].Property.LockedBy == null)) ||
                        (Player.Appearance[A].Property == null)) {
                        InventoryLock(Player, Player.Appearance[A], "ExclusivePadlock", Player.MemberNumber, Update = true);
                    }
                }
        }, 2000);
        CharacterRefresh(Player);
        ChatRoomCharacterUpdate(Player);
    }

    function XcrossTrap() {
        let Target = "";
        let Item = "";
        CharacterNaked(Player);
        InventoryWear(Player, "LeatherDeluxeCuffs", "ItemArms");
        InventoryWear(Player, "LeatherDeluxeAnkleCuffs", "ItemFeet");
        InventoryWear(Player, "X-Cross", "ItemDevices");
        InventoryWear(Player, "PaddedLeatherMittens", "ItemHands");
        if ((InventoryGet(Player, "ItemBreast") == null) ||
            (InventoryGet(Player, "ItemBreast").Property == null) ||
            (InventoryGet(Player, "ItemBreast").Property.LockedBy == null) ||
            (MagictoysOn == true)) {
            if ((InventoryGet(Player, "ItemNipples") == null) ||
                (InventoryGet(Player, "ItemNipples").Property == null) ||
                (InventoryGet(Player, "ItemNipples").Property.LockedBy == null)) {
                InventoryWear(Player, "ChainClamp", "ItemNipples");
            }
        }
        if ((InventoryGet(Player, "ItemPelvis") == null) ||
            (InventoryGet(Player, "ItemPelvis").Property == null) ||
            (InventoryGet(Player, "ItemPelvis").Property.LockedBy == null) ||
            (MagictoysOn == true)) {
            if ((InventoryGet(Player, "ItemVulva") == null) ||
                (InventoryGet(Player, "ItemVulva").Property == null) ||
                (InventoryGet(Player, "ItemVulva").Property.LockedBy == null)) {
                InventoryWear(Player, "HempRopeBelt", "ItemVulva");
            }
        }
        InventoryWear(Player, "HarnessBallGag1", "ItemMouth");
        InventoryWear(Player, "HeavyDutyEarPlugs", "ItemEars");
        InventoryWear(Player, "PaddedBlindfold", "ItemHead");
        Target = "ItemVulva";
        Item = InventoryGet(Player, Target);
        if (Item.Asset.Name == "HempRopeBelt") {
            ExtendedItemSetOptionByRecord(Player, Item, {
                vibrating: 9,
            }, {
                push: true,
                refresh: true,
            });
        }
        setTimeout(function() {
            for (let A = 0; A < Player.Appearance.length; A++)
                if (Player.Appearance[A].Asset.AllowLock == true) {
                    if (((Player.Appearance[A].Property != null) && (Player.Appearance[A].Property.LockedBy == null)) ||
                        (Player.Appearance[A].Property == null)) {
                        InventoryLock(Player, Player.Appearance[A], "ExclusivePadlock", Player.MemberNumber, Update = true);
                    }
                }
        }, 2000);
        CharacterRefresh(Player);
        ChatRoomCharacterUpdate(Player);
    }

    //Vision
    function BlurEffect() {
        let BlurLevel = 0;
        if (Blur1On == true) BlurLevel = 3;
        if (Blur2On == true) BlurLevel = 8;
        if (Blur3On == true) BlurLevel = 20;
        if (Blur4On == true) BlurLevel = 50;
        MainCanvas.filter = `blur(${BlurLevel}px)`;
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

    //WCE Status 
    function showAnimationStatus() {
        let msg = "Animation Engine disabled.";
        if (WCEdata.animationEngine) msg = "Animation Engine enabled.";
        statusmsg(msg);
    }

    function showAntiCheatStatus() {
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

    function showArousalStatus() {
        let msg = "";
        let msg1 = "No alternate arousal system.";
        let msg2 = "No numeric arousal meter.";
        if (WCEdata.alternateArousal) msg1 = "Alternate arousal enabled.";
        if (WCEdata.numericArousalMeter) msg2 = "Numeric arousal meter.";
        msg = msg1 + " " + msg2;
        statusmsg(msg);
    }

    function showCheatStatus() {
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

    function showColorStatus() {
        let msg = "";
        let msg1 = "No copy color option.";
        let msg2 = "No improved colors in chat.";
        if (WCEdata.copyColor) msg1 = "Copy color option enabled.";
        if (WCEdata.chatColors) msg2 = "Improved colors in chat.";
        msg = msg1 + " " + msg2;
        statusmsg(msg);
    }

    function showEmbeddingStatus() {
        let msg = "No clickable links and image embeds.";
        if (WCEdata.augmentChat) msg = "Clickable links and image embeds.";
        statusmsg(msg);
    }

    function showImmersionStatus() {
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

    function showLayeringStatus() {
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

    function showMiscStatus() {
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

    function showPerformanceStatus() {
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

    function showWardrobeStatus() {
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

    function showWceTalkingStatus() {
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
        let msg = "Available moaning profiles: " + liste;
        statusmsg(msg);
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
            M_MOANER_vibratorActive = true;
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
        let msg = "The orgasm moan is not active. You will not moan while cumming anymore.";
        if (M_MOANER_orgasmActive) msg = "The orgasm moan is active. You will moan while cumming.";
        statusmsg(msg);
    }

    function showM_MOANER_spankStatus() {
        let msg = "The spank moan is not active. You will not moan while being spanked.";
        if (M_MOANER_spankActive) msg = "The spank moan is active. You will moan while being spanked.";
        statusmsg(msg);
    }

    function showM_MOANER_talkStatus() {
        let msg = "The talk moan is not active. If you're vibed, you will not moan while speaking anymore.";
        if (M_MOANER_talkActive) msg = "The talk moan is active. If you're vibed, you will moan while speaking.";
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
                if (Player.ExtensionSettings.MBS != null) {
                    let str = Player.ExtensionSettings.MBS;
                    let d = LZString.decompressFromUTF16(str);
                    let MBSdata = {};
                    let decoded = JSON.parse(d);
                    MBSdata = decoded;
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
                if (Player.UBC.ubcSettings.cum  == false) {
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
            if (Player.ExtensionSettings.LSCG != null) {
                let lvibe = 0;
                let str = Player.ExtensionSettings.LSCG;
                let d = LZString.decompressFromBase64(str);
                let LSCGdata = {};
                let decoded = JSON.parse(d);
                LSCGdata = decoded;
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
        if (Player.ExtensionSettings.MBS != null) {
            let str = Player.ExtensionSettings.MBS;
            let d = LZString.decompressFromUTF16(str);
            let MBSdata = {};
            let decoded = JSON.parse(d);
            MBSdata = decoded;
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
        if (Player.ExtensionSettings.LSCG != null) {
            let str = Player.ExtensionSettings.LSCG;
            let d = LZString.decompressFromBase64(str);
            let LSCGdata = {};
            let decoded = JSON.parse(d);
            LSCGdata = decoded;
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
        let finalTextList = [];
        //get the moans to apply
        //data to generate the moans
        let Factor = Math.floor(C.ArousalSettings.Progress / 20);
        while (currentIndex < CDList.length) {
            //if the next word contains a bracket, we stop the repartition of moans
            let currentWord = CDList[currentIndex++];
            let presenceParenthese = M_MOANER_detectParentheses(currentWord);
            if (presenceParenthese == 1) stop = true;
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
        if (Player.ExtensionSettings.LSCG != null) {
            let str = Player.ExtensionSettings.LSCG;
            let d = LZString.decompressFromBase64(str);
            let LSCGdata = {};
            let decoded = JSON.parse(d);
            LSCGdata = decoded;
            if (LSCGdata.InjectorModule.enableHorny == true) {
                if (LSCGdata.InjectorModule.hornyLevel >= 40) {
                    return true;
                }
            }
        }
        return false;
    }

    //////////////////////////////////////////////////////////
    //BC-Diaper-Wetter
    //////////////////////////////////////////////////////////	

    let diaperLoop = null; // Keeps a hold of the loop so it can be exited at any time easily
    let messChance;
    let wetChance;
    let diaperTimerBase;
    let regressionLevel;
    let desperationLevel;
    let diaperTimerModifier;
    let diaperTimer;
    let diaperRunning;

    // A simple table for the colors that the script will use.
    const DiaperUseLevels = [
        ["#808080", "#97916A", "#8B8D41"],
        ["#877C6C", "#7E774E"],
        ["#4C3017"]
    ];

    // Table to store all the default values for diaperWetter()
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
        let msg = "Say hello to the little baby " + tmpname + "!";
        publicmsg(msg);

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
        diaperTimerModifier = 1; // We will divide by the modifier (positive modifiers decrease the timer)
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
        if (delay < 2) delay = 2;
        if (delay > 60) delay = 60;
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
        let DiaperChangeMessages = {
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
                let msg = tmpname + DiaperChangeMessages["ChangeDiaperBoth"];
                publicmsg(msg);
            } else if ((checkForDiaper("Panties") && !checkForDiaper("ItemPelvis")) || (checkForDiaper("ItemPelvis") && !checkForDiaper("Panties"))) {
                let msg = tmpname + DiaperChangeMessages["ChangeDiaperOnly"];
                publicmsg(msg);
            }
        } else if (cdiaper === "chastity") {
            MessLevelChastity = inMessLevelChastity;
            WetLevelChastity = inWetLevelChastity;
            changeDiaperColor("ItemPelvis");
            if (checkForDiaper("ItemPelvis") && checkForDiaper("Panties")) {
                let msg = tmpname + DiaperChangeMessages["ChangeDiaperOuter"];
                publicmsg(msg);
            } else if (checkForDiaper("ItemPelvis") && !checkForDiaper("Panties")) {
                let msg = tmpname + DiaperChangeMessages["ChangeDiaperOnly"];
                publicmsg(msg);
            }
        } else if (cdiaper === "panties") {
            MessLevelPanties = inMessLevelPanties;
            WetLevelPanties = inWetLevelPanties;
            changeDiaperColor("Panties");
            if (checkForDiaper("ItemPelvis") && checkForDiaper("Panties")) {
                let msg = tmpname + DiaperChangeMessages["ChangeDiaperInner"];
                publicmsg(msg);
            } else if (checkForDiaper("Panties") && !checkForDiaper("ItemPelvis")) {
                let msg = tmpname + DiaperChangeMessages["ChangeDiaperOnly"];
                publicmsg(msg);
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
            let msg = "Awww, " + tmpname + " is all grown up!";
            publicmsg(msg);
        }
    }

    // Body function
    // If the baby uses their diaper, it will make the front of their diaper look like it's been used
    function diaperTick() {
        // Handle modifiers 
        let DiaperUseMessages = {
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
        diaperTimerModifier = 1; // We will divide by the modifier (positive modifiers decrease the timer)
        diaperTimerModifier = manageRegression(diaperTimerModifier);
        diaperTimerModifier = manageDesperation(diaperTimerModifier);
        diaperTimer = diaperTimerBase / diaperTimerModifier;
        let testMess = Math.random();
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
                let msg = tmpname + DiaperUseMessages["MessOnlyFully"];
                publicmsg(msg);
            } else if ((checkForDiaper("Panties") && !checkForDiaper("ItemPelvis")) || (checkForDiaper("ItemPelvis") && !checkForDiaper("Panties"))) {
                let msg = tmpname + DiaperUseMessages["MessOnly"];
                publicmsg(msg);
            } else if (MessLevelChastity === 0) {
                if (MessLevelPanties === 2) {
                    let msg = tmpname + DiaperUseMessages["MessInnerFully"];
                    publicmsg(msg);
                } else if (MessLevelPanties === 1) {
                    let msg = tmpname + DiaperUseMessages["MessInner"];
                    publicmsg(msg);
                }
            } else if (MessLevelChastity === 1) {
                let msg = mpname + DiaperUseMessages["MessOuter"];
                publicmsg(msg);
            } else if (MessLevelChastity === 2) {
                let msg = tmpname + DiaperUseMessages["MessOuterFully"];
                publicmsg(msg);
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
                let msg = tmpname + DiaperUseMessages["MessOnlyFully"];
                publicmsg(msg);
            } else if ((checkForDiaper("Panties") && !checkForDiaper("ItemPelvis")) || (checkForDiaper("ItemPelvis") && !checkForDiaper("Panties"))) {
                let msg = tmpname + DiaperUseMessages["WetOnly"];
                publicmsg(msg);
            } else if (WetLevelChastiy === 0) {
                if (WetLevelPanties === 2) {
                    let msg = tmpname + DiaperUseMessages["WetInnerFully"];
                    publicmsg(msg);
                } else if (WetLevelPanties === 1) {
                    let msg = tmpname + DiaperUseMessages["WetInner"];
                    publicmsg(msg);
                }
            } else if (WetLevelChastity === 1) {
                let msg = tmpname + DiaperUseMessages["WetOuter"];
                publicmsg(msg);
            } else if (WetLevelChastity === 2) {
                let msg = tmpname + DiaperUseMessages["WetOuterFully"];
                publicmsg(msg);
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
            let [mode] = args;
            if (!mode) {
                let msg = "The atalk command must be followed by a number between 1 and 9 for the animal and the words you want to say.\n" +
                    "Note that it can't be used when you are in a 'permanent' animal talk mode." +
                    " \n" +
                    "Available animals:\n" +
                    "1 bunny - 2 cow - 3 fox - 4 kitty - 5 mouse\n" +
                    "6 pig - 7 pony - 8 puppy - 9 wolfy";
                infomsg(msg);
            } else {
                if ((mode > 0) && (mode < 10)) {
                    let [, , ...message] = command.split(" ");
                    let msg = message?.join(" ");
                    let nm = 0;
                    if (DolltalkOn == true) {
                        if (IsDollTalk(msg) == false) nm = 1;
                        if (nm == 1) {
                            msg = "Your message can't be sent because it does not respect the rules of doll talk.";
                            infomsg(msg);
                        }
                    }
                    if (nm == 0) {
                        if (mode == 1) content = GarbleTalk(msg, animalmode1);
                        if (mode == 2) content = GarbleTalk(msg, animalmode2);
                        if (mode == 3) content = GarbleTalk(msg, animalmode3);
                        if (mode == 4) content = GarbleTalk(msg, animalmode4);
                        if (mode == 5) content = GarbleTalk(msg, animalmode5);
                        if (mode == 6) content = GarbleTalk(msg, animalmode6);
                        if (mode == 7) content = GarbleTalk(msg, animalmode7);
                        if (mode == 8) content = GarbleTalk(msg, animalmode8);
                        if (mode == 9) content = GarbleTalk(msg, animalmode9);
                        ElementValue("InputChat", content);
                        event.preventDefault();
                        ChatRoomSendChat();
                    }
                }
            }
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
            BackgroundsList.push({
                Name: "HypnoSpiral2",
                Tag: [BackgroundsTagIndoor]
            });
            BackgroundsList.push({
                Name: "HypnoticSpiral",
                Tag: [BackgroundsTagIndoor]
            });
            ChatCreateBackgroundList = BackgroundsGenerateList(BackgroundsTagList);
            let msg = "You can use more standard backgrounds now.";
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
                    "33, 34 Beach - 35, 36 Briefcase\n" +
                    "37, 38 Class - 39 Office";
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
                if (args == 37) bg = url3 + "Image/Background/TeacherClassStandingAlone.jpg";
                if (args == 38) bg = url3 + "Image/Background/TeacherClassStandingAloneCuffed.jpg";
                if (args == 39) bg = url3 + "Screen/Intro/FirstBossMeeting/Background/TeacherLookOffice.jpg";
                if ((args > 0) && (args < 40)) ChatAdminRoomCustomizationCommand("Image", bg);
            }
        }
    }])

    CommandCombine([{
        Tag: 'bg4',
        Description: "(screen) (background): selects a standard background for the Club Card Game, Friend List, Main Hall, Private Room (SP) or Timer Cell",
        Action: (args) => {
            if (args === "") {
                let msg = "The bg4 command must be followed by two numbers:\n" +
                    " \n" +
                    "- a number for the concerned screen:\n" +
                    "0 = Club Card Game\n" +
                    "1 = Friend List - 2 = Main Hall\n" +
                    "3 = Private Room (SP) - 4 = Timer Cell\n" +
                    " \n" +
                    "- a number between -1 and a maximum that can vary:\n" +
                    " \n" +
                    "If you don't use BCX: 0 to 164 for official BC backgrounds, 165 to 259 are added if you use the /bg1 command.\n" +
                    " \n" +
                    "If you use BCX: 0 to 164 for official BC backgrounds, 165 to 257 are added by BCX, 258 and 259 are added if you use the /bg1 command.\n" +
                    " \n" +
                    "Use -1 to go back to the default background. Tip: use </b>/bglist</b> to know which number corresponds to a specific background.";
                infomsg(msg);
            } else {
                let stringBg1 = args;
                let stringBg2 = stringBg1.split(/[ ,]+/);
                let screen = stringBg2[0];
                if ((screen > -1) && (screen < 5)) {
                    if (screen == 0) {
                        let ccbg = stringBg2[1];
                        let ccback = "";
                        if ((ccbg > -2) && (ccbg < (BackgroundsList.length - 1))) {
                            if (ccbg == -1) {
                                ccback = "ClubCardPlayBoard1";
                            } else {
                                ccback = BackgroundsList[ccbg].Name;
                            }
                            ccname = ccback;
                            M_MOANER_saveControls();
                            let msg = "The background of the Club Card Game is now: " + ccname + ".";
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
        Tag: 'bio',
        Description: "(target): gives direct access to the profile description of any player in the chat room.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSetLastChatRoom("");
                ChatRoomHideElements();
                InformationSheetLoadCharacter(Player);
                OnlineProfileRun();
                CommonSetScreen("Character", "OnlineProfile")
            } else {
                let targetname = args;
                let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    let targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if (target[0] != null) {
                    ChatRoomSetLastChatRoom("");
                    ChatRoomHideElements();
                    InformationSheetLoadCharacter(target[0]);
                    OnlineProfileRun();
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
                let msg = "The blur command must be followed by a number between 0 and 4.\n" +
                    " \n" +
                    "Available blur levels:\n" +
                    "0 no blur effect\n" +
                    "1 light blur effect\n" +
                    "2 normal blur effect\n" +
                    "3 heavy blur effect\n" +
                    "4 total blur effect";
                infomsg(msg);
            } else {
                let msg = "";
                Blur1On = false;
                Blur2On = false;
                Blur3On = false;
                Blur4On = false;
                blureffect = false;
                let brlevel = args;
                if (brlevel == 0) msg = "No any forced blur effect.";
                if (brlevel == 1) msg = "Light blur effect enabled.";
                if (brlevel == 2) msg = "Normal blur effect enabled.";
                if (brlevel == 3) msg = "Heavy blur effect enabled.";
                if (brlevel == 4) msg = "Total blur effect enabled.";
                if ((brlevel > 0) && (brlevel < 5)) blureffect = true;
                if (brlevel == 1) Blur1On = true;
                if (brlevel == 2) Blur2On = true;
                if (brlevel == 3) Blur3On = true;
                if (brlevel == 4) Blur4On = true;
                if ((brlevel > -1) && (brlevel < 5)) {
                    infomsg(msg);
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
            let msg = "You feel all your skills boosted. Changes can be seen in information panel.";
            infomsg(msg);
        }
    }])

    CommandCombine([{
        Tag: 'btalk',
        Description: "(words): speaks once as a baby.",
        Action: (args) => {
            if (args === "") {
                let msg = "The btalk command must be followed by the words you want to say.";
                infomsg(msg);
            } else {
                let text = args;
                let nm = 0;
                if (DolltalkOn == true) {
                    if (IsDollTalk(text) == false) nm = 1;
                    if (nm == 1) {
                        let msg = "Your message can't be sent because it does not respect the rules of doll talk";
                        infomsg(msg);
                    }
                }
                if (nm == 0) {
                    let text2 = SpeechTransformBabyTalk(text);
                    ElementValue("InputChat", text2);
                    let text3 = text2;
                    if (this.StutterOn == true) text3 = SpeechTransformStutter(text2, st);
                    ElementValue("InputChat", text2.replace(text2, text3));
                    let text4 = text3;
                    if (M_MOANER_talkActive && M_MOANER_scriptOn && IsStimulated(Player)) text4 = M_MOANER_applyMoanToMsg(Player, text3);
                    ElementValue("InputChat", text3.replace(text3, text4));
                    event.preventDefault();
                    ChatRoomSendChatMessage(text4);
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
            if (args === "") {
                let msg = "Magical lasers put random clothes on " + tmpname + "'s body.";
                if (Clothes != undefined) {
                    if (Clothes != "") {
                        if (Clothes.startsWith("\u0027")) {
                            msg = tmpname + Clothes;
                        } else {
                            msg = tmpname + ' '.repeat(1) + Clothes;
                        }
                    }
                }
                if (Clothes != "no message") publicmsg(msg);
                CharacterAppearanceFullRandom(Player, true);
                ChatRoomCharacterUpdate(Player);
            } else {
                let targetname = args;
                let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    let targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].AllowItem == true) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if ((target[0].OnlineSharedSettings.Uwall) && ((target[0].OnlineSharedSettings.Ulist == undefined) ||
                            (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber))))) {
                        let msg = umsg1 + tgpname + umsg2;
                        infomsg(msg);
                    } else {
                        let msg = "Magical lasers make disappear the clothes on " + tgpname + "'s body."
                        if (Tclothes != undefined) {
                            if (Tclothes != "") {
                                if (Tclothes.startsWith("\u0027")) {
                                    msg = tmpname + Tclothes + ' '.repeat(1) + tgpname;
                                } else {
                                    msg = tmpname + ' '.repeat(1) + Tclothes + ' '.repeat(1) + tgpname;
                                }
                            }
                        }
                        if (Tclothes != "no message") publicmsg(msg);
                        CharacterAppearanceFullRandom(target[0], true);
                        ChatRoomCharacterUpdate(target[0]);
                    }
                }
                ChatRoomSetTarget(-1);
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
                            let asset = Player.Appearance[A].Asset.Description;
                            let code = Player.Appearance[A].Property.CombinationNumber;
                            ChatRoomSendLocal("" + asset + " = " + code + "");
                        }
                    }
            } else {
                let targetname = args;
                let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    let targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if (target[0] != null) {
                    for (let A = 0; A < target[0].Appearance.length; A++)
                        if ((target[0].Appearance[A].Property != null) && (target[0].Appearance[A].Property.LockedBy != null)) {
                            if (target[0].Appearance[A].Property.LockedBy == "CombinationPadlock") {
                                let asset = target[0].Appearance[A].Asset.Description;
                                let code = target[0].Appearance[A].Property.CombinationNumber;
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
        Tag: 'diaper',
        Description: "(action) (target or value) = plays with diapers (ABDL game).",
        Action: (args) => {
            if (args === "") {
                let msg = "Welcome to Bondage Club Diaper Wetter! Where we make sure babies use their diapers!\n" +
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
                    "Use <b>/diaper custom</b> for detailed info";
                infomsg(msg);
            } else if (args === "custom") {
                let msg = "Diaper customisation (before using /diaper start):\n" +
                    "<b>/diaper setdesperation</b> (value between 0 and 3) for desperation level, normally controlled by having a milk bottle used on you\n" +
                    "<b>/diaper setregression</b> (value between 0 and 3) for regression level, normally controlled by wearing Nursery Milk for an extended period of time\n" +
                    "<b>/diaper settimer</b> (minutes) to change the wet/mess timer\n" +
                    "<b>/diaper setwetchance</b> (value between 0 and 1) to control how often you will wet\n" +
                    "<b>/diaper setmesschance</b> (value between 0 and 1) to control how often you will mess. Make sure this is lower than wetchance.\n" +
                    "<b>/diaper setwet1</b> (value)* for wet level of normal diapers\n" +
                    "<b>/diaper setwet2</b> (value)* for wet level of chastity diapers\n" +
                    "<b>/diaper setmess1</b> (value)* for mess level of normal diapers\n" +
                    "<b>/diaper setmess2</b> (value)* for mess level of chastity diapers - * = value between 0 and 2";
                infomsg(msg);
            } else if (args === "start") {
                diaperWetter();
            } else if (args === "stop") {
                stopWetting();
            } else if (args === "tick") {
                diaperTick();
            } else {
                let setchange = "";
                let stringDiaper1 = args;
                let stringDiaper2 = stringDiaper1.split(/[ ,]+/);
                let feature = stringDiaper2[0];
                if (feature == "change1") {
                    let targetname = stringDiaper2[1];
                    if (targetname == null) {
                        let info = "You don't have normal diapers!";
                        if (InventoryGet(Player, "Panties") == null) {
                            let msg = info;
                            infomsg(msg);
                        } else if (InventoryGet(Player, "Panties").Asset.Name == "BulkyDiaper" || InventoryGet(Player, "Panties").Asset.Name === "PoofyDiaper") {
                            refreshDiaper("panties");
                        } else {
                            let msg = info;
                            infomsg(msg);
                        }
                    } else {
                        let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                        if (target[0] == null) {
                            let targetnumber = parseInt(targetname);
                            target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                        }
                        if (target[0] != null) {
                            if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                                tgpname = target[0].Name;
                            } else {
                                tgpname = target[0].Nickname;
                            }
                            let info = ChatRoomHTMLEntities(tgpname) + " does not have normal diapers!";
                            if (InventoryGet(target[0], "Panties") == null) {
                                let msg = info;
                                infomsg(msg);
                            } else if (InventoryGet(target[0], "Panties").Asset.Name == "BulkyDiaper" || InventoryGet(target[0], "Panties").Asset.Name === "PoofyDiaper") {
                                ChatRoomTargetMemberNumber = target[0].MemberNumber;
                                let msg = "" + tmpname + " will change your normal diapers and allows you to use the /diaper change1 command.";
                                targetNumber = ChatRoomTargetMemberNumber;
                                ChatRoomSendWhisper(targetNumber, msg);
                            } else {
                                let msg = info;
                                infomsg(msg);
                            }
                            ChatRoomSetTarget(-1);
                        }
                    }
                }
                if (feature == "change2") {
                    let targetname = stringDiaper2[1];
                    if (targetname == null) {
                        let info = "You don't have chastity diapers!";
                        if (InventoryGet(Player, "ItemPelvis") == null) {
                            let msg = info;
                            infomsg(msg);
                        } else if (InventoryGet(Player, "ItemPelvis").Asset.Name == "BulkyDiaper" || InventoryGet(Player, "ItemPelvis").Asset.Name === "PoofyDiaper") {
                            refreshDiaper("chastity");
                        } else {
                            let msg = info;
                            infomsg(msg);
                        }
                    } else {
                        let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                        if (target[0] == null) {
                            let targetnumber = parseInt(targetname);
                            target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                        }
                        if (target[0] != null) {
                            if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                                tgpname = target[0].Name;
                            } else {
                                tgpname = target[0].Nickname;
                            }
                            let info = ChatRoomHTMLEntities(tgpname) + " does not have chastity diapers!";
                            if (InventoryGet(target[0], "ItemPelvis") == null) {
                                let msg = info;
                                infomsg(msg);
                            } else if (InventoryGet(target[0], "ItemPelvis").Asset.Name == "BulkyDiaper" || InventoryGet(target[0], "ItemPelvis").Asset.Name === "PoofyDiaper") {
                                ChatRoomTargetMemberNumber = target[0].MemberNumber;
                                let msg = "" + tmpname + " will change your chastity diapers and allows you to use the /diaper change2 command.";
                                targetNumber = ChatRoomTargetMemberNumber;
                                ChatRoomSendWhisper(targetNumber, msg);
                            } else {
                                let msg = info;
                                infomsg(msg);
                            }
                            ChatRoomSetTarget(-1);
                        }
                    }
                }
                if (feature == "change3") {
                    let targetname = stringDiaper2[1];
                    if (targetname == null) {
                        let info1 = "You don't have a diaper! Get one on you before you make a mess!";
                        let info2 = "You don't have two layers of diapers!";
                        if ((InventoryGet(Player, "Panties") == null) && (InventoryGet(Player, "ItemPelvis") == null)) {
                            let msg = info1;
                            infomsg(msg);
                        } else if ((InventoryGet(Player, "Panties") == null) && (InventoryGet(Player, "ItemPelvis") != null)) {
                            if (InventoryGet(Player, "ItemPelvis").Asset.Name == "BulkyDiaper" || InventoryGet(Player, "ItemPelvis").Asset.Name === "PoofyDiaper") {
                                let msg = info2;
                                infomsg(msg);
                            } else {
                                let msg = info1;
                                infomsg(msg);
                            }
                        } else if ((InventoryGet(Player, "Panties") != null) && (InventoryGet(Player, "ItemPelvis") == null)) {
                            if (InventoryGet(Player, "Panties").Asset.Name == "BulkyDiaper" || InventoryGet(Player, "Panties").Asset.Name === "PoofyDiaper") {
                                let msg = info2;
                                infomsg(msg);
                            } else {
                                let msg = info1;
                                infomsg(msg);
                            }
                        } else if ((InventoryGet(Player, "Panties") != null) && (InventoryGet(Player, "ItemPelvis") != null)) {
                            if ((InventoryGet(Player, "Panties").Asset.Name == "BulkyDiaper" || InventoryGet(Player, "Panties").Asset.Name === "PoofyDiaper") &&
                                (InventoryGet(Player, "ItemPelvis").Asset.Name == "BulkyDiaper" || InventoryGet(Player, "ItemPelvis").Asset.Name === "PoofyDiaper")) {
                                refreshDiaper("both");
                            } else {
                                let msg = info2;
                                infomsg(msg);
                            }
                        }
                    } else {
                        let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                        if (target[0] == null) {
                            let targetnumber = parseInt(targetname);
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
                            let info1 = ChatRoomHTMLEntities(tgpname) + " does not have a diaper! Get one on " + tgpr2 + " before " + tgpr4 + " makes a mess!";
                            let info2 = ChatRoomHTMLEntities(tgpname) + " does not have two layers of diapers!";
                            if ((InventoryGet(target[0], "Panties") == null) && (InventoryGet(target[0], "ItemPelvis") == null)) {
                                let msg = info1;
                                infomsg(msg);
                            } else if ((InventoryGet(target[0], "Panties") == null) && (InventoryGet(target[0], "ItemPelvis") != null)) {
                                if (InventoryGet(target[0], "ItemPelvis").Asset.Name == "BulkyDiaper" || InventoryGet(target[0], "ItemPelvis").Asset.Name === "PoofyDiaper") {
                                    let msg = info2;
                                    infomsg(msg);
                                } else {
                                    let msg = info1;
                                    infomsg(msg);
                                }
                            } else if ((InventoryGet(target[0], "Panties") != null) && (InventoryGet(target[0], "ItemPelvis") == null)) {
                                if (InventoryGet(target[0], "Panties").Asset.Name == "BulkyDiaper" || InventoryGet(target[0], "Panties").Asset.Name === "PoofyDiaper") {
                                    let msg = info2;
                                    infomsg(msg);
                                } else {
                                    let msg = info1;
                                    infomsg(msg);
                                }
                            } else if ((InventoryGet(target[0], "Panties") != null) && (InventoryGet(target[0], "ItemPelvis") != null)) {
                                if ((InventoryGet(target[0], "Panties").Asset.Name == "BulkyDiaper" || InventoryGet(target[0], "Panties").Asset.Name === "PoofyDiaper") &&
                                    (InventoryGet(target[0], "ItemPelvis").Asset.Name == "BulkyDiaper" || InventoryGet(target[0], "ItemPelvis").Asset.Name === "PoofyDiaper")) {
                                    ChatRoomTargetMemberNumber = target[0].MemberNumber;
                                    let msg = "" + tmpname + " will change all your diapers and allows you to use the /diaper change3 command.";
                                    targetNumber = ChatRoomTargetMemberNumber;
                                    ChatRoomSendWhisper(targetNumber, msg);
                                } else {
                                    let msg = info2;
                                    infomsg(msg);
                                }
                                ChatRoomSetTarget(-1);
                            }
                        }
                    }
                }
                if (feature == "setdesperation") {
                    setchange = stringDiaper2[1];
                    if ((setchange >= 0) && (setchange <= 3)) {
                        diaperDefaultValues.desperationLevel = setchange;
                        let msg = "Your desperation level has been changed";
                        infomsg(msg);
                    }
                }
                if (feature == "setmesschance") {
                    setchange = stringDiaper2[1];
                    if ((setchange >= 0) && (setchange <= 1)) {
                        diaperDefaultValues.messChance = setchange;
                        let msg = "Your chance to mess diapers has been changed";
                        infomsg(msg);
                    }
                }
                if (feature == "setmess1") {
                    if (InventoryGet(Player, "Panties") != null) {
                        if (InventoryGet(Player, "Panties").Asset.Name == "BulkyDiaper" || InventoryGet(Player, "Panties").Asset.Name === "PoofyDiaper") {
                            setchange = stringDiaper2[1];
                            if ((setchange >= 0) && (setchange <= 2)) {
                                if (setchange < diaperDefaultValues.wetLevelInner) {
                                    diaperDefaultValues.messLevelInner = setchange;
                                    let msg = "Your mess level for normal diapers has been changed";
                                    infomsg(msg);
                                }
                            }
                        }
                    }
                }
                if (feature == "setmess2") {
                    if (InventoryGet(Player, "ItemPelvis") != null) {
                        if (InventoryGet(Player, "ItemPelvis").Asset.Name == "BulkyDiaper" || InventoryGet(Player, "ItemPelvis").Asset.Name === "PoofyDiaper") {
                            setchange = stringDiaper2[1];
                            if ((setchange >= 0) && (setchange <= 2)) {
                                if (setchange < diaperDefaultValues.wetLevelOuter) {
                                    diaperDefaultValues.messLevelOuter = setchange;
                                    let msg = "Your mess level for chastity diapers has been changed";
                                    infomsg(msg);
                                }
                            }
                        }
                    }
                }
                if (feature == "setregression") {
                    setchange = stringDiaper2[1];
                    if ((setchange >= 0) && (setchange <= 3)) {
                        diaperDefaultValues.regressionLevel = setchange;
                        let msg = "Your regression level has been changed";
                        infomsg(msg);
                    }
                }
                if (feature == "settimer") {
                    setchange = stringDiaper2[1];
                    if (setchange >= 1) {
                        diaperDefaultValues.baseTimer = setchange;
                        let msg = "Your wet/mess timer has been changed";
                        infomsg(msg);
                    }
                }
                if (feature == "setwetchance") {
                    setchange = stringDiaper2[1];
                    if ((setchange >= 0) && (setchange <= 1)) {
                        diaperDefaultValues.wetChance = setchange;
                        let msg = "Your chance to wet diapers has been changed";
                        infomsg(msg);
                    }
                }
                if (feature == "setwet1") {
                    if (InventoryGet(Player, "Panties") != null) {
                        if (InventoryGet(Player, "Panties").Asset.Name == "BulkyDiaper" || InventoryGet(Player, "Panties").Asset.Name === "PoofyDiaper") {
                            setchange = stringDiaper2[1];
                            if ((setchange >= 0) && (setchange <= 2)) {
                                if (setchange > diaperDefaultValues.messLevelInner) {
                                    diaperDefaultValues.wetLevelInner = setchange;
                                    let msg = "Your wet level for normal diapers has been changed";
                                    infomsg(msg);
                                }
                            }
                        }
                    }
                }
                if (feature == "setwet2") {
                    if (InventoryGet(Player, "ItemPelvis") != null) {
                        if (InventoryGet(Player, "ItemPelvis").Asset.Name == "BulkyDiaper" || InventoryGet(Player, "ItemPelvis").Asset.Name === "PoofyDiaper") {
                            setchange = stringDiaper2[1];
                            if ((setchange >= 0) && (setchange <= 2)) {
                                if (setchange > diaperDefaultValues.messLevelOuter) {
                                    diaperDefaultValues.wetLevelOuter = setchange;
                                    let msg = "Your wet level for chastity diapers has been changed";
                                    infomsg(msg);
                                }
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
        Description: "(lobby): gives access to friendlist with clickable links in specified lobby during 15 seconds.",
        Action: (args) => {
            if (args === "") {
                let msg = "The frlist command must be followed by the lobby for which you want to have clickable links.\n" +
                    "Available options: asylum, fclub, mclub, xclub.";
                infomsg(msg);
            }
            if (args === "asylum") {
                setTimeout(function() {
                    ChatRoomSpace = "Asylum";
                    CommonSetScreen("Online", "ChatSearch");
                    ChatRoomSetLastChatRoom("");
                    document.getElementById("InputChat").style.display = "none";
                    document.getElementById("TextAreaChatLog").style.display = "none";
                    ElementRemove("InputSearch");
                    ChatRoomHideElements();
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
                if (IsFemale() == true) {
                    setTimeout(function() {
                        ChatRoomSpace = "";
                        CommonSetScreen("Online", "ChatSearch");
                        ChatRoomSetLastChatRoom("");
                        document.getElementById("InputChat").style.display = "none";
                        document.getElementById("TextAreaChatLog").style.display = "none";
                        ElementRemove("InputSearch");
                        ChatRoomHideElements();
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
                    let msg = "Only females have access to this lobby.";
                    infomsg(msg);
                }
            }
            if (args === "mclub") {
                if (IsMale() == true) {
                    setTimeout(function() {
                        ChatRoomSpace = "M";
                        CommonSetScreen("Online", "ChatSearch");
                        ChatRoomSetLastChatRoom("");
                        document.getElementById("InputChat").style.display = "none";
                        document.getElementById("TextAreaChatLog").style.display = "none";
                        ElementRemove("InputSearch");
                        ChatRoomHideElements();
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
                    let msg = "Only males have access to this lobby.";
                    infomsg(msg);
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
                    ChatRoomHideElements();
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
                let msg = "The game command must include a minigame.\n" +
                    "Available minigames:\n" +
                    "carrot, cleaning, dojo, drinks, hurdle, kidnap, movie1,\n" +
                    "movie2, puppy, rhythm, training, whippony.\n" +
                    "Training is the trainer version of the hurdle game.\n" +
                    "You need to click on the maid in the Maid Quarters for the cleaning, drinks and rhythm games.";
                infomsg(msg);
            } else {
                let minigame = args;
                if (minigame == "carrot") {
                    ServerSend("ChatRoomLeave", "");
                    ChatRoomSetLastChatRoom("");
                    OnlineGameName = "";
                    ChatRoomHideElements();
                    CommonSetScreen("Room", "Stable");
                    StableDressPonyStart();
                    StableWearPonyEquipment(Player);
                    MiniGameStart("HorseWalk", "Carrot", "StablePonyEnd");
                } else if (minigame == "cleaning") {
                    ServerSend("ChatRoomLeave", "");
                    ChatRoomSetLastChatRoom("");
                    OnlineGameName = "";
                    ChatRoomHideElements();
                    CommonSetScreen("Room", "MaidQuarters");
                    GameType = "MaidCleaning";
                    MaidQuartersMaid.Stage = "400";
                } else if (minigame == "dojo") {
                    ServerSend("ChatRoomLeave", "");
                    ChatRoomSetLastChatRoom("");
                    OnlineGameName = "";
                    ChatRoomHideElements();
                    CommonSetScreen("Room", "Introduction");
                    IntroductionJobStart("SubDojo", 0)
                    IntroductionJobDojoStart();
                } else if (minigame == "drinks") {
                    ServerSend("ChatRoomLeave", "");
                    ChatRoomSetLastChatRoom("");
                    OnlineGameName = "";
                    ChatRoomHideElements();
                    CommonSetScreen("Room", "MaidQuarters");
                    GameType = "MaidDrinks";
                    MaidQuartersMaid.Stage = "200";
                } else if (minigame == "hurdle") {
                    ServerSend("ChatRoomLeave", "");
                    ChatRoomSetLastChatRoom("");
                    OnlineGameName = "";
                    ChatRoomHideElements();
                    CommonSetScreen("Room", "Stable");
                    StableDressPonyStart();
                    StableWearPonyEquipment(Player);
                    MiniGameStart("HorseWalk", "Hurdle", "StablePonyEnd");
                } else if (minigame == "kidnap") {
                    ServerSend("ChatRoomLeave", "");
                    ChatRoomSetLastChatRoom("");
                    OnlineGameName = "";
                    ChatRoomHideElements();
                    CommonSetScreen("Room", "Introduction");
                    IntroductionJobStart("DomKidnap", 0)
                    IntroductionJobBouncerStart();
                } else if (minigame == "movie1") {
                    ServerSend("ChatRoomLeave", "");
                    ChatRoomSetLastChatRoom("");
                    OnlineGameName = "";
                    ChatRoomHideElements();
                    CommonSetScreen("Room", "MovieStudio");
                    MovieStudioDailyMovie = "Interview";
                } else if (minigame == "movie2") {
                    ServerSend("ChatRoomLeave", "");
                    ChatRoomSetLastChatRoom("");
                    OnlineGameName = "";
                    ChatRoomHideElements();
                    CommonSetScreen("Room", "MovieStudio");
                    MovieStudioDailyMovie = "OpenHouse";
                } else if (minigame == "puppy") {
                    ServerSend("ChatRoomLeave", "");
                    ChatRoomSetLastChatRoom("");
                    OnlineGameName = "";
                    ChatRoomHideElements();
                    CommonSetScreen("Room", "Introduction");
                    IntroductionJobStart("DomPuppy", 0)
                    IntroductionJobPuppyStart();
                } else if (minigame == "rhythm") {
                    ServerSend("ChatRoomLeave", "");
                    ChatRoomSetLastChatRoom("");
                    OnlineGameName = "";
                    ChatRoomHideElements();
                    CommonSetScreen("Room", "MaidQuarters");
                    GameType = "RhythmGame";
                    MaidQuartersMaid.Stage = "500";
                } else if (minigame == "training") {
                    ServerSend("ChatRoomLeave", "");
                    ChatRoomSetLastChatRoom("");
                    OnlineGameName = "";
                    ChatRoomHideElements();
                    CommonSetScreen("Room", "Stable");
                    StablePlayerAppearance = Player.Appearance.slice();
                    StableWearTrainerEquipment(Player);
                    MiniGameStart("HorseWalk", "HurdleTraining", "StableTrainerEnd");
                } else if (minigame == "whippony") {
                    ServerSend("ChatRoomLeave", "");
                    ChatRoomSetLastChatRoom("");
                    OnlineGameName = "";
                    ChatRoomHideElements();
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
        Action: (args) => {
            if (args === "") {
                let msg = "The gtalk command must be followed by a number between 0 and 10, then the words you want to say.\n" +
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
                infomsg(msg);
            } else {
                let stringGag1 = args;
                let stringGag2 = stringGag1.split(/[ ,]+/);
                let gaglevel = stringGag2[0];
                let nt = 0;
                if ((gaglevel > -1) && (gaglevel < 11)) {
                    if (gaglevel == 0) {
                        onegl = SpeechTransformGagGarbleIntensity(Player);
                        mgl = onegl;
                        if (Player.ExtensionSettings.MBS != null) {
                            let str = Player.ExtensionSettings.MBS;
                            let d = LZString.decompressFromUTF16(str);
                            let MBSdata = {};
                            let decoded = JSON.parse(d);
                            MBSdata = decoded;
                            if (MBSdata.AlternativeGarbling) {
                                onegl = 0;
                                mgl = SpeechTransformGagGarbleIntensity(Player);
                            }
                        }
                        if (Player.ExtensionSettings.LSCG != null) {
                            let str = Player.ExtensionSettings.LSCG;
                            let d = LZString.decompressFromBase64(str);
                            let LSCGdata = {};
                            let decoded = JSON.parse(d);
                            LSCGdata = decoded;
                            if (LSCGdata.CollarModule.chokeLevel > 1) onegl = (LSCGdata.CollarModule.chokeLevel) * 2 + onegl;
                            if (LSCGdata.CollarModule.chokeLevel == 4) nt = 1;
                            let type = '';
                            let config = "";
                            let states = LSCGdata.StateModule.states;
                            type = 'asleep';
                            config = states.find(s => s.type == type);
                            if ((config != undefined) && (config.active == true)) nt = 1;
                            type = 'frozen';
                            config = states.find(s => s.type == type);
                            if ((config != undefined) && (config.active == true)) nt = 1;
                            type = 'gagged';
                            config = states.find(s => s.type == type);
                            if ((config != undefined) && (config.active == true)) nt = 1;
                            type = 'hypnotized';
                            config = states.find(s => s.type == type);
                            if ((config != undefined) && (config.active == true)) nt = 1;
                        }
                    } else {
                        onegl = gaglevel;
                    }
                    let nm = 0;
                    if (DolltalkOn == true) {
                        let text = args.substring(2).trim();
                        if (IsDollTalk(text) == false) nm = 1;
                        if (nm == 1) {
                            let msg = "Your message can't be sent because it does not respect the rules of doll talk.";
                            infomsg(msg);
                        }
                    }
                    if (nm == 0) {
                        let content = SpeechTransformGagGarble(args.substring(2).trim(), onegl);
                        let content2 = "";
                        if (nt == 1) {
                            content2 = content;
                        } else {
                            if (onegl != 0) {
                                content2 = content;
                            } else {
                                content2 = args.substring(2).trim();
                            }
                        }
                        ElementValue("InputChat", content.replace(content, content2));
                        event.preventDefault();
                        ChatRoomSendChat();
                    }
                }
            }
        }
    }])
	
    CommandCombine([{
        Tag: 'hdvibe',
        Description: "(crotch shield) (back shield) (modules)(intensity) (orgasm mode): changes the settings of worn Heavy Duty Belt.",
        Action: (args) => {
            if (args === "") {
                let msg = "The hdvibe command must be followed by 5 numbers for crotch shield, back shield, modules, intensity and orgasm mode.\n" +
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
                    "0 Normal - 1 Edge - 2 Denial";
                infomsg(msg);
            } else {
                if (InventoryGet(Player, "ItemPelvis") != null) {
                    if (InventoryGet(Player, "ItemPelvis").Asset.Name == "HeavyDutyBelt") {
                        let stringHDbelt1 = args;
                        let stringHDbelt2 = stringHDbelt1.split(/[ ,]+/);
                        let chd = stringHDbelt2[0];
                        let bhd = stringHDbelt2[1];
                        let mhd = stringHDbelt2[2];
                        let ihd = stringHDbelt2[3];
                        let ohd = stringHDbelt2[4];
                        if ((chd > -1) && (chd < 3) && (bhd > -1) && (bhd < 2) && (mhd > -1) && (mhd < 4) && (ihd > -1) && (ihd < 5) && (ohd > -1) && (ohd < 3)) {
                            const HeavyDutyBelt = InventoryGet(Player, "ItemPelvis");
                            const HeavyDutyBeltConfig = ModularItemDataLookup.ItemPelvisHeavyDutyBelt;
                            HeavyDutyBelt.Property = ModularItemMergeModuleValues(HeavyDutyBeltConfig, [chd, bhd, mhd, ihd, ohd]);
                            ChatRoomCharacterUpdate(Player);
                            let msg = "The settings of your Heavy Duty Belt have been modified.";
                            infomsg(msg);
                        }
                    }
                }
            }
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
                let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    let targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && ((target[0] == Player) || (target[0].AllowItem == true)) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if ((target[0].OnlineSharedSettings.Uwall) && ((target[0].OnlineSharedSettings.Ulist == undefined) ||
                            (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber))))) {
                        let msg = umsg1 + tgpname + umsg2;
                        infomsg(msg);
                    } else {
                        if (hint != "") {
                            for (let A = 0; A < target[0].Appearance.length; A++)
                                if ((target[0].Appearance[A].Property != null) && (target[0].Appearance[A].Property.LockedBy != null)) {
                                    if ((target[0].Appearance[A].Property.LockedBy == "SafewordPadlock") ||
                                        (target[0].Appearance[A].Property.LockedBy == "PasswordPadlock") ||
                                        (target[0].Appearance[A].Property.LockedBy == "TimerPasswordPadlock")) {
                                        target[0].Appearance[A].Property.Hint = hint;
                                        let msg = "A hint has been added to " + tgpname + "'s locks with password.";
                                        publicmsg(msg);
                                    }
                                }
                            ChatRoomCharacterUpdate(Player);
                        }
                    }
                }
                ChatRoomSetTarget(-1);
            }
        }
    }])

    CommandCombine([{
        Tag: 'invisible',
        Description: "(target): goes or sends to invisible mode (scripts need to be allowed in BC settings).",
        Action: (args) => {
            if (args === "") {
                if (Player.OnlineSharedSettings.ScriptPermissions.Hide.permission == 0) {
                    let msg = "To use the invisible command on yourself, you need first to allow Scripts in BC settings.";
                    infomsg(msg);
                } else {
                    let msg = "Magical lasers make " + tmpname + " completely invisible.";
                    if (Invisible != undefined) {
                        if (Invisible != "") {
                            if (Invisible.startsWith("\u0027")) {
                                msg = tmpname + Invisible;
                            } else {
                                msg = tmpname + ' '.repeat(1) + Invisible;
                            }
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
                let targetname = args;
                let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    let targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].AllowItem == true) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if (target[0].OnlineSharedSettings.ScriptPermissions.Hide.permission == 0) {
                        let msg = "To use the invisible command on other players, they need first to allow Scripts in BC settings.";
                        infomsg(msg);
                    } else {
                        if ((target[0].OnlineSharedSettings.Uwall) && ((target[0].OnlineSharedSettings.Ulist == undefined) ||
                                (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber))))) {
                            let msg = umsg1 + tgpname + umsg2;
                            infomsg(msg);
                        } else {
                            let msg = "Magical lasers make " + tgpname + " completely invisible.";
                            if (Tinvisible != undefined) {
                                if (Tinvisible != "") {
                                    if (Tinvisible.startsWith("\u0027")) {
                                        msg = tmpname + Tinvisible + ' '.repeat(1) + tgpname;
                                    } else {
                                        msg = tmpname + ' '.repeat(1) + Tinvisible + ' '.repeat(1) + tgpname;
                                    }
                                }
                            }
                            if (Tinvisible != "no message") publicmsg(msg);
                            InventoryWear(target[0], "Script", "ItemScript");
                            InventoryGet(target[0], "ItemScript").Property = {
                                Hide: echolevel5
                            }
                            CurrentScreen === 'ChatRoom' ?
                                ChatRoomCharacterUpdate(target[0]) :
                                CharacterRefresh(target[0]);
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
                    let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                    if (target[0] == null) {
                        let targetnumber = parseInt(targetname);
                        target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                    }
                    if ((target[0] != null) && (target[0].AllowItem == true) && (color.startsWith("#")) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                        if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                            tgpname = target[0].Name;
                        } else {
                            tgpname = target[0].Nickname;
                        }
                        if ((target[0].OnlineSharedSettings.Uwall) && ((target[0].OnlineSharedSettings.Ulist == undefined) ||
                                (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber))))) {
                            let msg = umsg1 + tgpname + umsg2;
                            infomsg(msg);
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
                            let msg = "New colors are used on " + tgpname + "'s bindings.";
                            publicmsg(msg);
                            ChatRoomCharacterUpdate(target[0]);
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
                let msg = "KD Debug mode enabled";
                infomsg(msg);
            } else if (args === "devious") {
                if (this.DeviousOn == undefined || this.DeviousOn == false) {
                    DeviousOn = true;
                    ArcadeDeviousChallenge = true;
                    LogAdd("DeviousChallenge", "Arcade", 1, true);
                    let msg = "Devious Challenge enabled";
                    infomsg(msg);
                } else {
                    DeviousOn = false;
                    ArcadeDeviousChallenge = false;
                    LogDelete("DeviousChallenge", "Arcade", true);
                    let msg = "Devious Challenge disabled";
                    infomsg(msg);
                }
            } else {
                ServerSend("ChatRoomLeave", "");
                ChatRoomSetLastChatRoom("");
                OnlineGameName = "";
                ArcadeRun();
                ArcadeKinkyDungeonStart(ReputationChange("Gaming"));
                if (CurrentScreen != "ChatRoom") {
                    document.getElementById("InputChat").style.display = "none";
                    document.getElementById("TextAreaChatLog").style.display = "none";
                    ChatRoomHideElements();
                }
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
                    "The layerset1 command must be followed by an layer number (-1 for all layers) and a color code in the format #000000 for the worn item in the previously saved Item Slot.";
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
                        let msg = "Layer color changed.";
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
                    "The layerset2 command must be followed by a layer number and a priority number (between -99 and 99) for the worn item in the previously saved Item Slot.";
                infomsg(msg);
            } else {
                let stringLys3 = args;
                let stringLys4 = stringLys3.split(/[ ,]+/);
                let layer = stringLys4[0];
                let priority = stringLys4[1] * 1;
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
                        let Property = InventoryGet(Player, Target).Property;
                        let Name = "";
                        if (ak == 0) {
                            if (layer == 0) {
                                Name = InventoryGet(Player, Target).Asset.Name;
                            } else {
                                Name = Asset.Layer[layer].Name;
                            }
                            if ((Property == undefined) || (Property.OverridePriority == undefined)) {
                                Property = {};
                                let OverridePriority = {};
                                OverridePriority[Name] = priority;
                                Property.OverridePriority = OverridePriority;
                            } else {
                                Property.OverridePriority[Name] = priority;
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
                            } else {
                                Property.OverridePriority[Name] = priority;
                            }
                        }
                        if (ak == 2) {
                            let Name1 = InventoryGet(Player, Target).Asset.Layer[layer].ColorGroup;
                            let Name2 = InventoryGet(Player, Target).Asset.Layer[layer].Name;
                            InventoryGet(Player, Target).Property.OverridePriority[Name2] = priority;
                        }
                        ChatRoomCharacterUpdate(Player);
                        let msg = "Layer priority changed.";
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
                                let Priority = InventoryGet(Player, Target).Asset.Group.DrawingPriority;
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
                                let Priority = InventoryGet(Player, Target).Asset.Group.DrawingPriority;
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
                    "/lock (target) (locktype) for locks 1 to 8, 17, 19, 21, 22\n" +
                    "/lock (target) (locktype) (r) for lock 9\n" +
                    "/lock (target) (locktype) (code/ptcode) for locks 10 and 20\n" +
                    "/lock (target) (locktype) (password) (r) for locks 11 and 12\n" +
                    "/lock (target) (locktype) (minutes) (h) (i) (r) - locks 13 to 15, 18\n" +
                    "/lock (target) (locktype) (password) (minutes) (h) (i) (r) - lock 16\n" +
                    "ALWAYS SPECIFY THE TARGET. Lock types:\n" +
                    "1 Metal - 2 Exclusive - 3 Intricate - 4 High Security\n" +
                    "5 Pandora - 6 Mistress - 7 Lover - 8 Owner\n" +
                    "9 Five Minutes - 10 Combination - 11 Safeword\n" +
                    "12 Password - 13 Mistress Timer - 14 Lover Timer\n" +
                    "15 Owner Timer - 16 Timer Password - 17 Best Friend\n" +
                    "18 Best Friend Timer - 19 Family - 20 Portal Link\n" +
                    "21 Lewd Crest - 22 Devious (if enabled)\n" +
                    "Locks 17, 18, 21 and 22 require a specific mod\n" +
                    "Use <b>/lock par</b> for info about other parameters";
                infomsg(msg);
            } else if (args === "par") {
                let msg = "Special parameters of lock command:\n" +
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
                    "Tip: replace h and/or i by another character when you need to skip them.";
                infomsg(msg);
            } else {
                let code = 0;
                let dogs = 1;
                let enableinput = "";
                let hidetimer = "";
                let minutes = 0;
                let PS = "";
                let ptcode = "";
                let pw = "";
                let removeitem = "";
                let silent = 0;
                let time = 0;
                let uw = 0;
                let stringLock1 = args;
                let stringLock2 = stringLock1.split(/[ ,]+/);
                let lk = stringLock2[1];
                let Lock = "";
                if (lk == 1) Lock = "MetalPadlock";
                if (lk == 2) Lock = "ExclusivePadlock";
                if (lk == 3) Lock = "IntricatePadlock";
                if (lk == 4) Lock = "HighSecurityPadlock";
                if (lk == 5) Lock = "PandoraPadlock";
                if (lk == 6) Lock = "MistressPadlock";
                if (lk == 7) Lock = "LoversPadlock";
                if (lk == 8) Lock = "OwnerPadlock";
                if (lk == 9) {
                    Lock = "TimerPadlock";
                    removeitem = stringLock2[2];
                }
                if (lk == 10) {
                    Lock = "CombinationPadlock";
                    code = stringLock2[2];
                }
                if (lk == 11) {
                    Lock = "SafewordPadlock";
                    PS = /^[A-Z]+$/;
                    pw = "PLEASE";
                    if (stringLock2[2] != null) pw = stringLock2[2].toUpperCase();
                    removeitem = stringLock2[3];
                }
                if (lk == 12) {
                    Lock = "PasswordPadlock";
                    PS = /^[A-Z]+$/;
                    pw = "PASSWORD";
                    if (stringLock2[2] != null) pw = stringLock2[2].toUpperCase();
                    removeitem = stringLock2[3];
                }
                if (lk == 13) Lock = "MistressTimerPadlock";
                if (lk == 14) Lock = "LoversTimerPadlock";
                if (lk == 15) Lock = "OwnerTimerPadlock";
                if ((lk == 13) || (lk == 14) || (lk == 15)) {
                    minutes = stringLock2[2];
                    time = (minutes - 5);
                    hidetimer = stringLock2[3];
                    enableinput = stringLock2[4];
                    removeitem = stringLock2[5];
                }
                if (lk == 16) {
                    Lock = "TimerPasswordPadlock";
                    PS = /^[A-Z]+$/;
                    pw = "PASSWORD";
                    if (stringLock2[2] != null) pw = stringLock2[2].toUpperCase();
                    minutes = stringLock2[3];
                    time = (minutes - 5);
                    hidetimer = stringLock2[4];
                    enableinput = stringLock2[5];
                    removeitem = stringLock2[6];
                }
                if (lk == 17) Lock = "Best Friend Padlock";
                if (lk == 18) {
                    Lock = "Best Friend Timer Padlock";
                    if (stringLock2[2] == null) {
                        minutes = 1;
                    } else {
                        minutes = stringLock2[2];
                    }
                    if (minutes > 10080) {
                        time = 100800;
                    } else {
                        time = (minutes + 5);
                    }
                    hidetimer = stringLock2[3];
                    enableinput = stringLock2[4];
                    removeitem = stringLock2[5];
                }
                if (lk == 19) Lock = "FamilyPadlock";
                if (lk == 20) {
                    Lock = "PortalLinkPadlock";
                    PTS = /^[0-9a-f]+$/;
                    ptcode = stringLock2[2];
                }
                if (lk == 21) Lock = "\u{6DEB}\u{7EB9}\u{9501}_Luzi";
                if (lk == 22) Lock = "DeviousPadlock";
                if (lk != 22) dogs = 0;
                let targetname = stringLock2[0];
                let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    let targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (lk == 22)) {
                    if (target[0] == Player) {
                        if (Player.ExtensionSettings.DOGS != null) {
                            let str = Player.ExtensionSettings.DOGS;
                            let d = LZString.decompressFromBase64(str);
                            let DOGSdata = {};
                            let decoded = JSON.parse(d);
                            DOGSdata = decoded;
                            if (DOGSdata.deviousPadlock.state == true) dogs = 0;
                        }
                    } else {
                        if (target[0].DOGS != null) {
                            if (target[0].DOGS.deviousPadlock != undefined) {
                                if (target[0].DOGS.deviousPadlock.state == true) dogs = 0;
                            }
                        }
                    }
                }
                if ((target[0] != null) && ((target[0] == Player) || (target[0].AllowItem == true)) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if (dogs == 0) {
                        if (tmpname == tgpname) {
                            let msg = "Magical lasers make appear locks on " + tgpname + "'s body.";
                            if (Mlock != undefined) {
                                if (Mlock != "") {
                                    if (Mlock.startsWith("\u0027")) {
                                        msg = tmpname + Mlock;
                                    } else {
                                        msg = tmpname + ' '.repeat(1) + Mlock;
                                    }
                                }
                            }
                            if (Mlock == "no message") silent = 1;
                            if (silent == 0) publicmsg(msg);
                        } else {
                            if ((target[0].OnlineSharedSettings.Uwall) && ((target[0].OnlineSharedSettings.Ulist == undefined) ||
                                    (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber))))) {
                                uw = 1;
                                let msg = umsg1 + tgpname + umsg2;
                                infomsg(msg);
                            } else {
                                let msg = "Magical lasers make appear locks on " + tgpname + "'s body.";
                                if (Tlock != undefined) {
                                    if (Tlock != "") {
                                        if (Tlock.startsWith("\u0027")) {
                                            msg = tmpname + Tlock + ' '.repeat(1) + tgpname;
                                        } else {
                                            msg = tmpname + ' '.repeat(1) + Tlock + ' '.repeat(1) + tgpname;
                                        }
                                    }
                                }
                                if (Tlock == "no message") silent = 1;
                                if (silent == 0) publicmsg(msg);
                            }
                        }
                        if (uw == 0) {
                            let mn = Player.MemberNumber;
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
                                        if (hidetimer == "h") target[0].Appearance[A].Property.ShowTimer = false;
                                        if (enableinput == "i") target[0].Appearance[A].Property.EnableRandomInput = true;
                                        if ((lk == 10) && (code != null) && (code > -1) && (code < 10000)) target[0].Appearance[A].Property.CombinationNumber = code;
                                        if ((lk == 20) && (ptcode != null) && (ptcode.length == 8) && (ptcode.match(PTS))) target[0].Appearance[A].Property.PortalLinkCode = ptcode;
                                        if (((lk == 11) || (lk == 12) || (lk == 16)) && (pw != null) && (pw.length <= 8) && (pw.match(PS))) target[0].Appearance[A].Property.Password = pw;
                                        if ((lk == 17) || (lk == 18)) {
                                            target[0].Appearance[A].Property.LockedBy = "HighSecurityPadlock";
                                            target[0].Appearance[A].Property.LockPickSeed = "8,3,5,10,4,2,6,7,1,9,0,11";
                                            let listOwnerLovers = new Set();
                                            if (target[0].Ownership && target[0].Ownership.MemberNumber != null) listOwnerLovers.add(target[0].Ownership.MemberNumber);
                                            if (target[0].Lovership) {
                                                for (let L = 0; L < target[0].Lovership.length; L++) {
                                                    const lover = target[0].Lovership[L];
                                                    if (lover.MemberNumber != null) listOwnerLovers.add(target[0].Lovership[L].MemberNumber);
                                                }
                                            }
                                            target[0].Appearance[A].Property.MemberNumberListKeys = "-1," + Array.from(listOwnerLovers).join(",");
                                        }
                                        if (lk == 17) target[0].Appearance[A].Property.Name = "Best Friend Padlock";
                                        if (lk == 18) target[0].Appearance[A].Property.Name = "Best Friend Timer Padlock";
                                        if (lk == 21) target[0].Appearance[A].Property.LockedBy = "\u{6DEB}\u{7EB9}\u{9501}_Luzi";
                                        if (lk == 22) {
                                            target[0].Appearance[A].Property.LockedBy = "ExclusivePadlock";
                                            target[0].Appearance[A].Property.Name = "DeviousPadlock";
                                        }
                                    }
                                }
                        }
                        ChatRoomCharacterUpdate(target[0]);
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
            if ((ChatRoomData.MapData == null) || (ChatRoomData.MapData.Type == null) || (ChatRoomData.MapData.Type == "Never")) {
                let msg = "This room does not use the map feature.";
                infomsg(msg);
            } else {
                if ((ChatRoomData.MapData.Fog == true || ChatRoomData.MapData.Fog == undefined)) {
                    ChatRoomData.MapData.Fog = false;
                    let msg = "Fog in current mapped room is disabled. No visible effect if mapfull command has enabled full vision and hearing in mapped rooms.";
                    infomsg(msg);
                } else {
                    ChatRoomData.MapData.Fog = true;
                    let msg = "Fog in current mapped room is enabled. No visible effect if mapfull command has enabled full vision and hearing in mapped rooms.";
                    infomsg(msg);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'mapfull',
        Description: ": toggles full vision and hearing in mapped rooms.",
        Action: () => {
            if ((ChatRoomData.MapData == null) || (ChatRoomData.MapData.Type == null) || (ChatRoomData.MapData.Type == "Never")) {
                let msg = "This room does not use the map feature.";
                infomsg(msg);
            } else {
                if (MapfullOn == true) {
                    MapfullOn = false;
                    M_MOANER_saveControls();
                    let msg = "Full vision and hearing in mapped rooms is disabled. Fog is also back if not disabled with mapfog command";
                    infomsg(msg);
                } else {
                    MapfullOn = true;
                    M_MOANER_saveControls();
                    let msg = "Full vision and hearing in mapped rooms is enabled. Fog is also removed. Will be disabled if you use this toggle again or relog";
                    infomsg(msg);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'mapkeys',
        Description: ": gives all keys for current mapped chat room.",
        Action: () => {
            if ((ChatRoomData.MapData == null) || (ChatRoomData.MapData.Type == null) || (ChatRoomData.MapData.Type == "Never")) {
                let msg = "This room does not use the map feature.";
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
            if ((ChatRoomData.MapData == null) || (ChatRoomData.MapData.Type == null) || (ChatRoomData.MapData.Type == "Never")) {
                let msg = "This room does not use the map feature. Better use the <b>/uroom</b> command.";
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
                    let ubc1 = "";
                    let ubc2 = "";
                    if (ChatRoomCharacter[pl].OnlineSharedSettings.UBC == undefined) {
                        ubc1 = "Does not use ULTRAbc.";
                    } else {
                        if ((ChatRoomCharacter[pl].OnlineSharedSettings.UBC == UBCver) || (ChatRoomCharacter[pl].OnlineSharedSettings.UBC == UBCver0)) {
                            ubc1 = "Is an ULTRAbc user.";
                        } else {
                            ubc1 = "Does not use ULTRAbc";
                        }
                    }
                    if (ChatRoomCharacter[pl].OnlineSharedSettings.Uwall == undefined) {
                        ubc2 = "Does not use Uwall.";
                    } else {
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
        Tag: 'maptrap',
        Description: ": toggles traps with devices in map rooms.",
        Action: () => {
            if (MaptrapOn == true) {
                MaptrapOn = false;
                M_MOANER_saveControls();
                let msg = "No traps with devices in map rooms";
                infomsg(msg);
            } else {
                MaptrapOn = true;
                M_MOANER_saveControls();
                let msg = "Traps in map rooms if you 'walk' on devices";
                infomsg(msg);
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
                if ((ChatRoomData.MapData == null) || (ChatRoomData.MapData.Type == null) || (ChatRoomData.MapData.Type == "Never")) {
                    let msg = "This room does not use the map feature.";
                    infomsg(msg);
                } else {
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
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'mapy',
        Description: "(y-position): changes your Y coordinate in the map.",
        Action: (args) => {
            if (args === "") {
                let msg = "The mapy command must be followed by a number between 0 and 39.";
                infomsg(msg);
            } else {
                if ((ChatRoomData.MapData == null) || (ChatRoomData.MapData.Type == null) || (ChatRoomData.MapData.Type == "Never")) {
                    let msg = "This room does not use the map feature.";
                    infomsg(msg);
                } else {
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
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'mapz',
        Description: "(target): gives coordinates in the map.",
        Action: (args) => {
            if ((ChatRoomData.MapData == null) || (ChatRoomData.MapData.Type == null) || (ChatRoomData.MapData.Type == "Never")) {
                let msg = "This room does not use the map feature.";
                infomsg(msg);
            } else {
                if (args === "") {
                    if (Player.MapData != undefined) {
                        let exinfo = "";
                        if (ChatRoomData.MapData.Type == "Always") exinfo = "Real presence in map: YES";
                        if (ChatRoomData.MapData.Type == "Hybrid") {
                            if (Player.OnlineSharedSettings.Inmap != undefined) {
                                if (Player.OnlineSharedSettings.Inmap == true) {
                                    exinfo = "Real presence in map: YES";
                                } else {
                                    exinfo = "Real presence in map: NO";
                                }
                            } else {
                                exinfo = "Real presence in map: ?";
                            }
                        }
                        ChatRoomSendLocal("X = " + Player.MapData.Pos.X + " - Y = " + Player.MapData.Pos.Y + " - " + exinfo);
                        ChatRoomSendLocal(" ");
                    } else {
                        ChatRoomSendLocal("Does not have entered map");
                        ChatRoomSendLocal(" ");
                    }
                } else {
                    let targetname = args;
                    let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                    if (target[0] == null) {
                        let targetnumber = parseInt(targetname);
                        target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                    }
                    if (target[0] != null) {
                        if (target[0].MapData != undefined) {
                            let exinfo = "";
                            if (ChatRoomData.MapData.Type == "Always") exinfo = "Real presence in map: YES";
                            if (ChatRoomData.MapData.Type == "Hybrid") {
                                if (target[0].OnlineSharedSettings.Inmap != undefined) {
                                    if (target[0].OnlineSharedSettings.Inmap == true) {
                                        exinfo = "Real presence in map: YES";
                                    } else {
                                        exinfo = "Real presence in map: NO";
                                    }
                                } else {
                                    exinfo = "Real presence in map: ?";
                                }
                            }
                            ChatRoomSendLocal("X = " + target[0].MapData.Pos.X + " - Y = " + target[0].MapData.Pos.Y + " - " + exinfo);
                            ChatRoomSendLocal(" ");
                        } else {
                            ChatRoomSendLocal("Does not have entered map");
                            ChatRoomSendLocal(" ");
                        }
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
                let ubc1 = "";
                let ubc2 = "";
                if (ChatRoomCharacter[pl].OnlineSharedSettings.UBC == undefined) {
                    ubc1 = "Does not use ULTRAbc.";
                } else {
                    if ((ChatRoomCharacter[pl].OnlineSharedSettings.UBC == UBCver) || (ChatRoomCharacter[pl].OnlineSharedSettings.UBC == UBCver0)) {
                        ubc1 = "Is an ULTRAbc user.";
                    } else {
                        ubc1 = "Does not use ULTRAbc";
                    }
                }
                if (ChatRoomCharacter[pl].OnlineSharedSettings.Uwall == undefined) {
                    ubc2 = "Does not use Uwall.";
                } else {
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
                if (mission == "random") {
                    InfiltrationMissionType = ["Rescue", "Kidnap", "Retrieve", "CatBurglar", "ReverseMaid"];
                }
                if (mission == "burglar") {
                    InfiltrationMissionType = ["CatBurglar"];
                }
                if (mission == "kidnap") {
                    InfiltrationMissionType = ["Kidnap"];
                }
                if (mission == "rescue") {
                    InfiltrationMissionType = ["Rescue"];
                }
                if (mission == "retrieve") {
                    InfiltrationMissionType = ["Retrieve"];
                }
                if (mission == "sabotage") {
                    InfiltrationMissionType = ["ReverseMaid"];
                }
                InfiltrationMission = CommonRandomItemFromList(InfiltrationMission, InfiltrationMissionType);
                ServerSend("ChatRoomLeave", "");
                ChatRoomSetLastChatRoom("");
                OnlineGameName = "";
                ChatRoomhideElements();
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
        Tag: 'naked',
        Description: "(target): removes clothes.",
        Action: (args) => {
            if (args === "") {
                let msg = "Magical lasers make disappear the clothes on " + tmpname + "'s body.";
                if (Naked != undefined) {
                    if (Naked != "") {
                        if (Naked.startsWith("\u0027")) {
                            msg = tmpname + Naked;
                        } else {
                            msg = tmpname + ' '.repeat(1) + Naked;
                        }
                    }
                }
                if (Naked != "no message") publicmsg(msg);
                CharacterNaked(Player);
                ChatRoomCharacterUpdate(Player);
            } else {
                let targetname = args;
                let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    let targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].AllowItem == true) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if ((target[0].OnlineSharedSettings.Uwall) && ((target[0].OnlineSharedSettings.Ulist == undefined) ||
                            (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber))))) {
                        let msg = umsg1 + tgpname + umsg2;
                        infomsg(msg);
                    } else {
                        let msg = "Magical lasers make disappear the clothes on " + tgpname + "'s body.";
                        if (Tnaked != undefined) {
                            if (Tnaked != "") {
                                if (Tnaked.startsWith("\u0027")) {
                                    msg = tmpname + Tnaked + ' '.repeat(1) + tgpname;
                                } else {
                                    msg = tmpname + ' '.repeat(1) + Tnaked + ' '.repeat(1) + tgpname;
                                }
                            }
                        }
                        if (Tnaked != "no message") publicmsg(msg);
                        CharacterNaked(target[0]);
                        ChatRoomCharacterUpdate(target[0]);
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
                                if ((CurrentCharacter.OnlineSharedSettings.Uwall == true) && ((CurrentCharacter.OnlineSharedSettings.Ulist == undefined) ||
                                        (!(CurrentCharacter.OnlineSharedSettings.Ulist.includes(Player.MemberNumber))))) {
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
                            if ((CurrentCharacter.OnlineSharedSettings.Uwall == true) && ((CurrentCharacter.OnlineSharedSettings.Ulist == undefined) ||
                                    (!(CurrentCharacter.OnlineSharedSettings.Ulist.includes(Player.MemberNumber))))) {
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
            if (args === "") {
                let msg = "" + tmpname + " becomes a cute pet."
                if (Pet != undefined) {
                    if (Pet != "") {
                        if (Pet.startsWith("\u0027")) {
                            msg = tmpname + Pet;
                        } else {
                            msg = tmpname + ' '.repeat(1) + Pet;
                        }
                    }
                }
                if (Pet != "no message") publicmsg(msg);
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
                let targetname = args;
                let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    let targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].AllowItem == true) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if ((target[0].OnlineSharedSettings.Uwall) && ((target[0].OnlineSharedSettings.Ulist == undefined) ||
                            (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber))))) {
                        let msg = umsg1 + tgpname + umsg2;
                        infomsg(msg);
                    } else {
                        let msg = "" + tgpname + " becomes a cute pet.";
                        if (Tpet != undefined) {
                            if (Tpet != "") {
                                if (Tpet.startsWith("\u0027")) {
                                    msg = tmpname + Tpet + ' '.repeat(1) + tgpname;
                                } else {
                                    msg = tmpname + ' '.repeat(1) + Tpet + ' '.repeat(1) + tgpname;
                                }
                            }
                        }
                        if (Tpet != "no message") publicmsg(msg);
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
                ChatRoomSetTarget(-1);
            }
        }
    }])

    CommandCombine([{
        Tag: 'plvibe',
        Description: "(crotch shield) (intensity) (orgasm mode) (shock level): changes the settings of worn Sci-Fi Pleasure Panties.",
        Action: (args) => {
            if (args === "") {
                let msg = "The plvibe command must be followed by 4 numbers for crotch shield, intensity, orgasm mode and shock level.\n" +
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
                    "0 Low - 1 Medium - 2 High";
                infomsg(msg);
            } else {
                if (InventoryGet(Player, "ItemPelvis") != null) {
                    if (InventoryGet(Player, "ItemPelvis").Asset.Name == "SciFiPleasurePanties") {
                        let stringPLpanties1 = args;
                        let stringPLpanties2 = stringPLpanties1.split(/[ ,]+/);
                        let cpl = stringPLpanties2[0];
                        let ipl = stringPLpanties2[1];
                        let opl = stringPLpanties2[2];
                        let spl = stringPLpanties2[3];
                        if ((cpl > -1) && (cpl < 4) && (ipl > -1) && (ipl < 5) && (opl > -1) && (opl < 3) && (spl > -1) && (spl < 3)) {
                            const SciFiPleasurePanties = InventoryGet(Player, "ItemPelvis");
                            const SciFiPleasurePantiesConfig = ModularItemDataLookup.ItemPelvisSciFiPleasurePanties;
                            SciFiPleasurePanties.Property = ModularItemMergeModuleValues(SciFiPleasurePantiesConfig, [cpl, ipl, opl, spl]);
                            ChatRoomCharacterUpdate(Player);
                            let msg = "The settings of your Sci-Fi Pleasure Panties have been modified.";
                            infomsg(msg);
                        }
                    }
                }
            }
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
                    "tapedhands. Only on yourself: exercise, jump, roof.\n" +
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
                    } else if (pose == "roof") {
                        let msg1 = "" + tmpname + " jumps to the ceiling.";
                        publicmsg(msg1);
                        let msg2 = "To leave this position, use first /pose2 jump, then /pose2 reset (or /pose baseupper if WCE enabled).";
                        infomsg(msg2);
                        CharacterSetFacialExpression(Player, "Emoticon", "Annoyed", 1);
                        PoseSetActive(Player, null);
                        ChatRoomCharacterUpdate(Player);
                        setTimeout(function() {
                            PoseSetActive(Player, "OverTheHead");
                            ChatRoomCharacterUpdate(Player);
                        }, 500);
                        setTimeout(function() {
                            InventoryGet(Player, "Emoticon").Property.OverrideHeight = {
                                Height: -300
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
                                Height: 250
                            };
                            CurrentScreen === "ChatRoom" ?
                                ChatRoomCharacterUpdate(Player) :
                                CharacterRefresh(Player);
                        }, 3000);
                        // Workout
                    } else if (pose == "exercise") {
                        let Region = undefined;
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
                            let msg1 = "You're too heavily tied to exercise.";
                            infomsg(msg1);
                        }
                        let msg2 = "" + tmpname + " makes " + pronoun3 + " workout.";
                        publicmsg(msg2);
                        CurrentCharacter = Player;
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
                            DialogLeave();
                        }, 10000);
                        // reset	 
                    } else if (pose == "reset") {
                        PoseSetActive(Player, null);
                        ChatRoomCharacterUpdate(Player);
                        CharacterRefresh(Player);
                    }
                } else {
                    let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                    if (target[0] == null) {
                        let targetnumber = parseInt(targetname);
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
                        if ((target[0].OnlineSharedSettings.Uwall) && ((target[0].OnlineSharedSettings.Ulist == undefined) ||
                                (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber))))) {
                            let msg = umsg1 + tgpname + umsg2;
                            infomsg(msg);
                        } else {
                            if (pose == "armsfree") {
                                if ((target[0].AllowItem == true) &&
                                    (target[0].ActivePose != 'BaseUpper') &&
                                    (PoseCanChangeUnaided(target[0], 'BaseUpper'))) {
                                    PoseSetActive(target[0], "BaseUpper");
                                    ChatRoomCharacterUpdate(target[0]);
                                    let msg = "" + tmpname + " lets " + tgpname + " relax " + tgpr3 + " arms.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "belly") {
                                if ((target[0].AllowItem == true) &&
                                    (target[0].ActivePose != 'Hogtied') &&
                                    (PoseCanChangeUnaided(target[0], 'Hogtied'))) {
                                    PoseSetActive(target[0], "Hogtied");
                                    ChatRoomCharacterUpdate(target[0]);
                                    let msg = "" + tmpname + " forces " + tgpname + " to stay on " + tgpr3 + " belly.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "boxtied") {
                                if ((target[0].AllowItem == true) &&
                                    (target[0].ActivePose != 'BackBoxTie') &&
                                    (PoseCanChangeUnaided(target[0], 'BackBoxTie'))) {
                                    PoseSetActive(target[0], "BackBoxTie");
                                    ChatRoomCharacterUpdate(target[0]);
                                    let msg = "" + tmpname + " forces " + tgpname + " to put the arms behind " + tgpr3 + " back.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "cuffed") {
                                if ((target[0].AllowItem == true) &&
                                    (target[0].ActivePose != 'BackCuffs') &&
                                    (PoseCanChangeUnaided(target[0], 'BackCuffs'))) {
                                    PoseSetActive(target[0], "BackCuffs");
                                    ChatRoomCharacterUpdate(target[0]);
                                    let msg = "" + tmpname + " forces " + tgpname + " to put the arms out like " + tgpr4 + " handcuffed.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "elbowtied") {
                                if ((target[0].AllowItem == true) &&
                                    (target[0].ActivePose != 'BackElbowTouch') &&
                                    (PoseCanChangeUnaided(target[0], 'BackElbowTouch'))) {
                                    PoseSetActive(target[0], "BackElbowTouch");
                                    ChatRoomCharacterUpdate(target[0]);
                                    let msg = "" + tmpname + " forces " + tgpname + " to put the arms behind her back, elbows almost touching.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "kneel1") {
                                if ((target[0].AllowItem == true) &&
                                    (target[0].ActivePose != 'Kneel') &&
                                    ((PoseCanChangeUnaided(target[0], 'Kneel')) || (ChatRoomCanAttemptKneel(target[0]) == true))) {
                                    PoseSetActive(target[0], "Kneel");
                                    ChatRoomCharacterUpdate(target[0]);
                                    let msg = "" + tmpname + " helps " + tgpname + " to kneel down.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "kneel2") {
                                if ((target[0].AllowItem == true) &&
                                    (target[0].ActivePose != 'KneelingSpread') &&
                                    (PoseCanChangeUnaided(target[0], 'KneelingSpread'))) {
                                    PoseSetActive(target[0], "KneelingSpread");
                                    ChatRoomCharacterUpdate(target[0]);
                                    let msg = "" + tmpname + " helps " + tgpname + " to kneel down, forcing " + tgpr3 + " legs open.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "legsclosed") {
                                if ((target[0].AllowItem == true) &&
                                    (target[0].ActivePose != 'LegsClosed') &&
                                    (PoseCanChangeUnaided(target[0], 'LegsClosed'))) {
                                    PoseSetActive(target[0], "LegsClosed");
                                    ChatRoomCharacterUpdate(target[0]);
                                    let msg = "" + tmpname + " helps " + tgpname + " to stand up with " + tgpr3 + " legs closed.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "legsopen") {
                                if ((target[0].AllowItem == true) &&
                                    (target[0].ActivePose != 'LegsOpen') &&
                                    (PoseCanChangeUnaided(target[0], 'LegsOpen'))) {
                                    PoseSetActive(target[0], "LegsOpen");
                                    ChatRoomCharacterUpdate(target[0]);
                                    let msg = "" + tmpname + " helps " + tgpname + " to stand up normally on " + tgpr3 + " feet.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "pet") {
                                if ((target[0].AllowItem == true) &&
                                    (target[0].ActivePose != 'AllFours') &&
                                    (PoseCanChangeUnaided(target[0], 'AllFours'))) {
                                    PoseSetActive(target[0], "AllFours");
                                    ChatRoomCharacterUpdate(target[0]);
                                    let msg = "" + tmpname + " forces " + tgpname + " on all fours.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "spreadarms1") {
                                if ((target[0].AllowItem == true) &&
                                    (target[0].ActivePose != 'Yoked') &&
                                    (PoseCanChangeUnaided(target[0], 'Yoked'))) {
                                    PoseSetActive(target[0], "Yoked");
                                    ChatRoomCharacterUpdate(target[0]);
                                    let msg = "" + tmpname + " helps " + tgpname + " to raise " + tgpr3 + " hands.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "spreadarms2") {
                                if ((target[0].AllowItem == true) &&
                                    (target[0].ActivePose != 'OverTheHead') &&
                                    (PoseCanChangeUnaided(target[0], 'OverTheHead'))) {
                                    PoseSetActive(target[0], "OverTheHead");
                                    ChatRoomCharacterUpdate(target[0]);
                                    let msg = "" + tmpname + " forces " + tgpname + " to raise the hands above " + tgpr3 + " head.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "spreadeagle1") {
                                if ((target[0].AllowItem == true) &&
                                    ((target[0].ActivePose == null) || (target[0].ActivePose.includes('Yoked') == false) || (target[0].ActivePose.includes('Spread') == false)) &&
                                    (PoseCanChangeUnaided(target[0], 'Yoked')) &&
                                    (PoseCanChangeUnaided(target[0], 'Spread'))) {
                                    PoseSetActive(target[0], "Yoked");
                                    PoseSetActive(target[0], "Spread");
                                    ChatRoomCharacterUpdate(target[0]);
                                    let msg = "" + tmpname + " forces " + tgpname + " to raise the hands and spread the legs.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "spreadeagle2") {
                                if ((target[0].AllowItem == true) &&
                                    ((target[0].ActivePose == null) || (target[0].ActivePose.includes('OverTheHead') == false) || (target[0].ActivePose.includes('Spread') == false)) &&
                                    (PoseCanChangeUnaided(target[0], 'OverTheHead')) &&
                                    (PoseCanChangeUnaided(target[0], 'Spread'))) {
                                    PoseSetActive(target[0], "OverTheHead");
                                    PoseSetActive(target[0], "Spread");
                                    ChatRoomCharacterUpdate(target[0]);
                                    let msg = "" + tmpname + " forces " + tgpname + " to raise the hands above the head and spread the legs.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "spreadlegs") {
                                if ((target[0].AllowItem == true) &&
                                    (target[0].ActivePose != 'Spread') &&
                                    (PoseCanChangeUnaided(target[0], 'Spread'))) {
                                    PoseSetActive(target[0], "Spread");
                                    ChatRoomCharacterUpdate(target[0]);
                                    let msg = "" + tmpname + " forces " + tgpname + " to spread " + tgpr3 + " legs.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "stand") {
                                if ((target[0].AllowItem == true) &&
                                    (target[0].ActivePose != null) &&
                                    ((PoseCanChangeUnaided(target[0], null)) || (ChatRoomCanAttemptStand(target[0]) == true))) {
                                    PoseSetActive(target[0], null);
                                    ChatRoomCharacterUpdate(target[0]);
                                    CharacterRefresh(target[0]);
                                    let msg = "" + tmpname + " helps " + tgpname + " to stand up.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "suspension") {
                                if ((target[0].AllowItem == true) &&
                                    (target[0].ActivePose != 'Suspension') &&
                                    (PoseCanChangeUnaided(target[0], 'Suspension'))) {
                                    PoseSetActive(target[0], "Suspension");
                                    ChatRoomCharacterUpdate(target[0]);
                                    let msg = "" + tmpname + " forces " + tgpname + " in an acrobatic pose in suspension.";
                                    publicmsg(msg);
                                }
                            } else if (pose == "tapedhands") {
                                if ((target[0].AllowItem == true) &&
                                    (target[0].ActivePose != 'TapedHands') &&
                                    (PoseCanChangeUnaided(target[0], 'TapedHands'))) {
                                    PoseSetActive(target[0], "TapedHands");
                                    ChatRoomCharacterUpdate(target[0]);
                                    let msg = "" + tmpname + " forces " + tgpname + " to put the arms out like " + tgpr3 + " hands are taped.";
                                    publicmsg(msg);
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
                ChatRoomSetTarget(-1);
            }
        }
    }])

    CommandCombine([{
        Tag: 'prison',
        Description: "(minutes): stays in Pandora prison.",
        Action: (args) => {
            if (args === "") {
                let msg = "The prison command must be followed by a number higher than 0";
                infomsg(msg);
            } else {
                let minutes = args;
                if (minutes > 0) {
                    let msg = "" + tmpname + " gets grabbed by two maids and sent to Pandora prison for " + minutes + " minutes.";
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
        Tag: 'ptcode',
        Description: "(target): reveals codes used on items controlled by portal link.",
        Action: (args) => {
            if (args === "") {
                for (let A = 0; A < Player.Appearance.length; A++)
                    if ((Player.Appearance[A].Property != null) && (Player.Appearance[A].Property.Attribute != null)) {
                        if (Player.Appearance[A].Property.Attribute.includes("PortalLinkLockable")) {
                            let asset = Player.Appearance[A].Asset.Description;
                            let ptcode = Player.Appearance[A].Property.PortalLinkCode;
                            ChatRoomSendLocal("" + asset + " = " + ptcode + "");
                        }
                    }
            } else {
                let targetname = args;
                let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    let targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if (target[0] != null) {
                    for (let A = 0; A < target[0].Appearance.length; A++)
                        if ((target[0].Appearance[A].Property != null) && (target[0].Appearance[A].Property.Attribute != null)) {
                            if (target[0].Appearance[A].Property.Attribute.includes("PortalLinkLockable")) {
                                let asset = target[0].Appearance[A].Asset.Description;
                                let ptcode = target[0].Appearance[A].Property.PortalLinkCode;
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
                            let asset = Player.Appearance[A].Asset.Description;
                            let pw = Player.Appearance[A].Property.Password;
                            ChatRoomSendLocal("" + asset + " = " + pw + "");
                        }
                    }
            } else {
                let targetname = args;
                let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    let targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if (target[0] != null) {
                    for (let A = 0; A < target[0].Appearance.length; A++)
                        if ((target[0].Appearance[A].Property != null) && (target[0].Appearance[A].Property.LockedBy != null)) {
                            if ((target[0].Appearance[A].Property.LockedBy == "SafewordPadlock") || (target[0].Appearance[A].Property.LockedBy == "PasswordPadlock") || (target[0].Appearance[A].Property.LockedBy == "TimerPasswordPadlock")) {
                                let asset = target[0].Appearance[A].Asset.Description;
                                let pw = target[0].Appearance[A].Property.Password;
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
                OutChat();
            } else {
                let message = ' '.repeat(1) + args;
                let msg = "" + tmpname + message;
                publicmsg(msg);
                OutChat();
            }
        }
    }])

    CommandCombine([{
        Tag: 'randomize',
        Description: "(target): naked + underwear + clothes + restrain commands.",
        Action: (args) => {
            if (args === "") {
                let msg = "Magical lasers apply random clothes and bindings on " + tmpname + "'s body.";
                if (Randomize != undefined) {
                    if (Randomize != "") {
                        if (Randomize.startsWith("\u0027")) {
                            msg = tmpname + Randomize;
                        } else {
                            msg = tmpname + ' '.repeat(1) + Randomize;
                        }
                    }
                }
                if (Randomize != "no message") publicmsg(msg);
                CharacterNaked(Player);
                CharacterRandomUnderwear(Player);
                CharacterAppearanceFullRandom(Player, true);
                CharacterFullRandomRestrain(Player, "ALL");
                ChatRoomCharacterUpdate(Player);
            } else {
                let targetname = args;
                let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    let targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].AllowItem == true) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if ((target[0].OnlineSharedSettings.Uwall) && ((target[0].OnlineSharedSettings.Ulist == undefined) ||
                            (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber))))) {
                        let msg = umsg1 + tgpname + umsg2;
                        infomsg(msg);
                    } else {
                        let msg = "Magical lasers apply random clothes and bindings on " + tgpname + "'s body.";
                        if (Trandomize != undefined) {
                            if (Trandomize != "") {
                                if (Trandomize.startsWith("\u0027")) {
                                    msg = tmpname + Trandomize + ' '.repeat(1) + tgpname;
                                } else {
                                    msg = tmpname + ' '.repeat(1) + Trandomize + ' '.repeat(1) + tgpname;
                                }
                            }
                        }
                        if (Trandomize != "no message") publicmsg(msg);
                        CharacterNaked(target[0]);
                        CharacterRandomUnderwear(target[0]);
                        CharacterAppearanceFullRandom(target[0], true);
                        CharacterFullRandomRestrain(target[0], "ALL");
                        ChatRoomCharacterUpdate(target[0]);
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
            if (args === "") {
                let msg = "Magical lasers apply random restraints on " + tmpname + "'s body.";
                if (Restrain != undefined) {
                    if (Restrain != "") {
                        if (Restrain.startsWith("\u0027")) {
                            msg = tmpname + Restrain;
                        } else {
                            msg = tmpname + ' '.repeat(1) + Restrain;
                        }
                    }
                }
                if (Restrain != "no message") publicmsg(msg);
                CharacterFullRandomRestrain(Player, "ALL");
                ChatRoomCharacterUpdate(Player);
            } else {
                let targetname = args;
                let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    let targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].AllowItem == true) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if ((target[0].OnlineSharedSettings.Uwall) && ((target[0].OnlineSharedSettings.Ulist == undefined) ||
                            (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber))))) {
                        let msg = umsg1 + tgpname + umsg2;
                        infomsg(msg);
                    } else {
                        let msg = "Magical lasers apply random restraints on " + tgpname + "'s body.";
                        if (Trestrain != undefined) {
                            if (Trestrain != "") {
                                if (Trestrain.startsWith("\u0027")) {
                                    msg = tmpname + Trestrain + ' '.repeat(1) + tgpname;
                                } else {
                                    msg = tmpname + ' '.repeat(1) + Trestrain + ' '.repeat(1) + tgpname;
                                }
                            }
                        }
                        if (Trestrain != "no message") publicmsg(msg);
                        CharacterFullRandomRestrain(target[0], "ALL");
                        ChatRoomCharacterUpdate(target[0]);
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
                } else if (role == "clubslave") {
                    LogAdd("ClubSlave", "Management", CurrentTime);
                    LogAdd("BlockChange", "Rule", CurrentTime);
                    ManagementIsClubSlave = function() {
                        return false
                    }
                    ManagementClubSlaveDialog = function(Player) {}
                    ManagementFinishClubSlave()
                } else if (role == "ggts") {
                    ChatRoomHideElements();
                    ServerSend("ChatRoomLeave", "");
                    CharacterDeleteAllOnline();
                    AsylumGGTSLock(0);
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
        Tag: 'roomsize',
        Description: "(players): sets the maximum players per room in Chat Search for normal and hybrid rooms.",
        Action: (args) => {
            if (args === "") {
                let msg = "The roomsize command must be followed by a number between 2 and 20.";
                infomsg(msg);
            } else {
                let size = args;
                if ((size > 1) && (size < 21) && (size != rsize)) {
                    rsize = size * 1;
                    M_MOANER_saveControls();
                    let msg = "You have modified the maximum players per room in Chat Search for normal and hybrid rooms.";
                    infomsg(msg);
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'roomtype',
        Description: "(type): sets the room type you want to see in Chat Search.",
        Action: (args) => {
            if (args === "") {
                let msg = "The roomtype command must be followed by a number between 0 and 3.\n" +
                    " \n" +
                    " 0 = All room types\n" +
                    " 1 = Only normal rooms\n" +
                    " 2 = Only hybrid rooms\n" +
                    " 3 = Only map rooms";
                infomsg(msg);
            } else {
                let type = args;
                if ((type > -1) && (type < 4) && (type != rtype)) {
                    if (type == 0) rtype = "ALL";
                    if (type == 1) rtype = "Never";
                    if (type == 2) rtype = "Hybrid";
                    if (type == 3) rtype = "Always";
                    M_MOANER_saveControls();
                    let msg = "You have modified the room type you want to see in Chat Search.";
                    infomsg(msg);
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
                    if (CurrentCharacter.OnlineSharedSettings.UBC != undefined) {
                        let uw = 0;
                        CurrentCharacter.Appearance = CurrentCharacter.Appearance.filter(x => (CurrentCharacter.FocusGroup && CurrentCharacter.FocusGroup.Name) ? x.Asset.Group.Name !=
                            CurrentCharacter.FocusGroup.Name : true);
                        if ((CurrentCharacter.OnlineSharedSettings.Uwall == true) && ((CurrentCharacter.OnlineSharedSettings.Ulist == undefined) ||
                                (!(CurrentCharacter.OnlineSharedSettings.Ulist.includes(Player.MemberNumber))))) {
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
            }, 5000);
        }
    }])

    CommandCombine([{
        Tag: 'search',
        Description: "(lobby): opens room search for 15 seconds in specified lobby.",
        Action: (args) => {
            if (args === "") {
                let msg = "The search command must be followed by the lobby you want to explore.\n" +
                    "Available options: asylum, fclub, mclub, xclub.";
                infomsg(msg);
            }
            if (args === "asylum") {
                setTimeout(function() {
                    ChatRoomSpace = "Asylum";
                    ChatSearchLeaveRoom = "AsylumEntrance";
                    ChatSearchBackground = "AsylumEntrance";
                    ChatCreateBackgroundList = BackgroundsTagAsylum;
                    CommonSetScreen("Online", "ChatSearch");
                    ChatSelectStartSearch("Asylum");
                    ChatRoomSetLastChatRoom("");
                    document.getElementById("InputChat").style.display = "none";
                    document.getElementById("TextAreaChatLog").style.display = "none";
                    ChatRoomHideElements();
                    ChatSelectStartSearch("Asylum");
                    ChatRoomSetLastChatRoom("");
                }, 3000);
                setTimeout(function() {
                    CommonSetScreen("Online", "ChatRoom");
                    document.getElementById("InputChat").style.display = "inline";
                    document.getElementById("TextAreaChatLog").style.display = "inline";
                }, 15000);
            }
            if (args === "fclub") {
                if (IsFemale() == true) {
                    setTimeout(function() {
                        ChatSelectStartSearch("");
                        ChatRoomSetLastChatRoom("");
                        document.getElementById("InputChat").style.display = "none";
                        document.getElementById("TextAreaChatLog").style.display = "none";
                        ChatRoomHideElements();
                        ChatSelectStartSearch("");
                        ChatRoomSetLastChatRoom("");
                    }, 3000);
                    setTimeout(function() {
                        CommonSetScreen("Online", "ChatRoom");
                        document.getElementById("InputChat").style.display = "inline";
                        document.getElementById("TextAreaChatLog").style.display = "inline";
                    }, 15000);
                } else {
                    let msg = "Only females have access to this lobby.";
                    infomsg(msg);
                }
            }
            if (args === "mclub") {
                if (IsMale() == true) {
                    setTimeout(function() {
                        ChatSelectStartSearch("M");
                        ChatRoomSetLastChatRoom("");
                        document.getElementById("InputChat").style.display = "none";
                        document.getElementById("TextAreaChatLog").style.display = "none";
                        ChatRoomHideElements();
                        ChatSelectStartSearch("M");
                        ChatRoomSetLastChatRoom("");
                    }, 3000);
                    setTimeout(function() {
                        CommonSetScreen("Online", "ChatRoom");
                        document.getElementById("InputChat").style.display = "inline";
                        document.getElementById("TextAreaChatLog").style.display = "inline";
                    }, 15000);
                } else {
                    let msg = "Only males have access to this lobby.";
                    infomsg(msg);
                }
            }
            if (args === "xclub") {
                setTimeout(function() {
                    ChatSelectStartSearch("X");
                    ChatRoomSetLastChatRoom("");
                    document.getElementById("InputChat").style.display = "none";
                    document.getElementById("TextAreaChatLog").style.display = "none";
                    ChatRoomHideElements();
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
                let msg = "The see command must be followed by a vision mode number and optionally a blur level number.\n" +
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
                    "4 total blur effect";
                infomsg(msg);
            } else {
                let stringVision1 = args;
                let stringVision2 = stringVision1.split(/[ ,]+/);
                let bl = stringVision2[0];
                let br = stringVision2[1];
                if (bl == 0) {
                    GetBlindLevel0();
                    Player.GetBlindLevel = GetBlindLevel0;
                    let msg = "Back to normal vision mode.";
                    infomsg(msg);
                }
                if (bl == 1) {
                    GetBlindLevel1();
                    Player.GetBlindLevel = GetBlindLevel1;
                    let msg = "You are now in light blindness mode.";
                    infomsg(msg);
                }
                if (bl == 2) {
                    GetBlindLevel2();
                    Player.GetBlindLevel = GetBlindLevel2;
                    let msg = "You are now in normal blindness mode.";
                    infomsg(msg);
                }
                if (bl == 3) {
                    GetBlindLevel3();
                    Player.GetBlindLevel = GetBlindLevel3;
                    let msg = "You are now in heavy blindness mode.";
                    infomsg(msg);
                }
                if (br == 0) {
                    GetBlurLevel0();
                    Player.GetBlurLevel = GetBlurLevel0;
                    let msg = "Back to vision without blur effect.";
                    infomsg(msg);
                }
                if (br == 1) {
                    GetBlurLevel1();
                    Player.GetBlurLevel = GetBlurLevel1;
                    let msg = "A light blur effect is applied on your vision.";
                    infomsg(msg);
                }
                if (br == 2) {
                    GetBlurLevel2();
                    Player.GetBlurLevel = GetBlurLevel2;
                    let msg = "A normal blur effect is applied on your vision.";
                    infomsg(msg);
                }
                if (br == 3) {
                    GetBlurLevel3();
                    Player.GetBlurLevel = GetBlurLevel3;
                    let msg = "A heavy blur effect is applied on your vision.";
                    infomsg(msg);
                }
                if (br == 4) {
                    GetBlurLevel4();
                    Player.GetBlurLevel = GetBlurLevel4;
                    let msg = "A total blur effect is applied on your vision.";
                    infomsg(msg);
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
            if (args === "") {
                let msg = "" + tmpname + " swallows a sleeping pill and drinks a glass of water. " + pronoun1 + " falls asleep very quickly.";
                publicmsg(msg);
                InventoryWear(Player, "RegularSleepingPill", 'ItemMouth');
                CharacterSetFacialExpression(Player, "Eyes", "Closed");
                CharacterSetFacialExpression(Player, "Eyes2", "Closed");
                CharacterSetFacialExpression(Player, "Emoticon", "Sleep");
                ChatRoomCharacterUpdate(Player);
            } else {
                let targetname = args;
                let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    let targetnumber = parseInt(targetname);
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
                    if ((target[0].OnlineSharedSettings.Uwall) && ((target[0].OnlineSharedSettings.Ulist == undefined) ||
                            (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber))))) {
                        let msg = umsg1 + tgpname + umsg2;
                        infomsg(msg);
                    } else {
                        let msg = "" + tmpname + " feeds " + tgpname + " a sleeping pill and gives " + tgpr2 + " a glass of water. " + tgpname + " falls asleep very quickly.";
                        publicmsg(msg);
                        InventoryWear(target[0], "RegularSleepingPill", 'ItemMouth');
                        CharacterSetFacialExpression(target[0], "Eyes", "Closed");
                        CharacterSetFacialExpression(target[0], "Eyes2", "Closed");
                        CharacterSetFacialExpression(target[0], "Emoticon", "Sleep");
                        ChatRoomCharacterUpdate(target[0]);
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
    }])

    CommandCombine([{
        Tag: 'solidity',
        Description: "(value) (target): changes the solidity of most current bindings.",
        Action: (args) => {
            if (args === "") {
                let msg = "The solidity command must be followed by a number between 1 and 99, and optionally a target.";
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
                        if (InventoryGet(Player, "ItemDevices") != null) {
                            if ((InventoryGet(Player, "ItemDevices").Asset.Name == "FuturisticCrate") || (InventoryGet(Player, "ItemDevices").Asset.Name == "WoodenRack")) {
                                if (solidity == 1) {
                                    InventoryRemove(Player, "ItemDevices");
                                    let msg1 = "Magical lasers make disappear the device in which " + tmpname + " was prisoner.";
                                    if (Solidity != undefined) {
                                        if (Solidity != "") {
                                            if (Solidity.startsWith("\u0027")) {
                                                msg1 = tmpname + Solidity;
                                            } else {
                                                msg1 = tmpname + ' '.repeat(1) + Solidity;
                                            }
                                        }
                                    }
                                    if (Solidity != "no message") publicmsg(msg1);
                                }
                            }
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
                    } else {
                        let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                        if (target[0] == null) {
                            let targetnumber = parseInt(targetname);
                            target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                        }
                        if ((target[0] != null) && (target[0].AllowItem == true) && (solidity > 0) && (solidity < 100) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                            if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                                tgpname = target[0].Name;
                            } else {
                                tgpname = target[0].Nickname;
                            }
                            if ((target[0].OnlineSharedSettings.Uwall) && ((target[0].OnlineSharedSettings.Ulist == undefined) ||
                                    (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber))))) {
                                let msg = umsg1 + tgpname + umsg2;
                                infomsg(msg);
                            } else {
                                if (InventoryGet(target[0], "ItemDevices") != null) {
                                    if ((InventoryGet(target[0], "ItemDevices").Asset.Name == "FuturisticCrate") || (InventoryGet(target[0], "ItemDevices").Asset.Name == "WoodenRack")) {
                                        if (solidity == 1) {
                                            InventoryRemove(target[0], "ItemDevices");
                                            let msg1 = "Magical lasers make disappear the device in which " + tgpname + " was prisoner.";
                                            if (Tsolidity != undefined) {
                                                if (Tsolidity != "") {
                                                    if (Tsolidity.startsWith("\u0027")) {
                                                        msg1 = tmpname + Tsolidity + ' '.repeat(1) + tgpname;
                                                    } else {
                                                        msg1 = tmpname + ' '.repeat(1) + Tsolidity + ' '.repeat(1) + tgpname;
                                                    }
                                                }
                                            }
                                            if (Tsolidity != "no message") publicmsg(msg1);
                                        }
                                    }
                                }
                                for (let A = 0; A < target[0].Appearance.length; A++)
                                    if (target[0].Appearance[A].Asset.Group.Name != null) {
                                        if (target[0].Appearance[A].Asset.Group.Name.startsWith("Item")) {
                                            target[0].Appearance[A].Difficulty = solidity;
                                        }
                                    }
                                let msg2 = "The solidity of most current " + tgpname + "\u0027s bindings has been changed by " + tmpname + ".";
                                publicmsg(msg2);
                                ChatRoomCharacterUpdate(target[0]);
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
        Description: "(target): allows access to target's wheel of fortune, even when not displayed.",
        Action: (args) => {
            if (args === "") {
                let msg = "The spin command must be followed by the target whose wheel of fortune interests you.";
                infomsg(msg);
            } else {
                let targetname = args;
                let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    let targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if ((target[0].OnlineSharedSettings.Uwall) && ((target[0].OnlineSharedSettings.Ulist == undefined) ||
                            (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber))))) {
                        let msg = umsg1 + tgpname + umsg2;
                        infomsg(msg);
                    } else {
                        if (!InventoryAvailable(target[0], "WheelFortune", "ItemDevices")) {
                            let msg = "Bad luck! This player does not have a wheel of fortune.";
                            infomsg(msg);
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
                ChatRoomSetTarget(-1);
            }
        }
    }])

    CommandCombine([{
        Tag: 'stalk',
        Description: "(stuttermode) (words): speaks once in a specified stuttering mode.",
        Action: (_, command, args) => {
            var [mode] = args;
            if (!mode) {
                let msg = "The stalk command must be followed by a number between 1 and 4 for the stuttering mode and the words you want to say.\n" +
                    "Note that it can't be used when you are in a 'permanent' stuttering mode.\n" +
                    " \n" +
                    "Available stuttering modes:\n" +
                    "1 light stuttering\n" +
                    "2 normal stuttering\n" +
                    "3 heavy stuttering\n" +
                    "4 total stuttering";
                infomsg(msg);
            } else {
                if ((mode > 0) && (mode < 5) && (StutterOn == false)) {
                    let [, , ...message] = command.split(" ");
                    let msg = message?.join(" ");
                    let nm = 0;
                    if (DolltalkOn == true) {
                        if (IsDollTalk(msg) == false) nm = 1;
                        if (nm == 1) {
                            let msg = "Your message can't be sent because it does not respect the rules of doll talk.";
                            infomsg(msg);
                        }
                    }
                    if (nm == 0) {
                        if (mode == 1) content = SpeechTransformStutter(msg, 1);
                        if (mode == 2) content = SpeechTransformStutter(msg, 2);
                        if (mode == 3) content = SpeechTransformStutter(msg, 3);
                        if (mode == 4) content = SpeechTransformStutter(msg, 4);
                        ElementValue("InputChat", content);
                        event.preventDefault();
                        ChatRoomSendChat();
                    }
                }
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
        Tag: 'timeleft',
        Description: "(target): reveals remaining time on current timer locks.",
        Action: (args) => {
            if (args === "") {
                for (let A = 0; A < Player.Appearance.length; A++)
                    if ((Player.Appearance[A].Property != null) && (Player.Appearance[A].Property.LockedBy != null)) {
                        if ((Player.Appearance[A].Property.LockedBy == "TimerPadlock") || (Player.Appearance[A].Property.LockedBy == "MistressTimerPadlock") || (Player.Appearance[A].Property.LockedBy == "LoversTimerPadlock") || (Player.Appearance[A].Property.LockedBy == "OwnerTimerPadlock") || (Player.Appearance[A].Property.LockedBy == "TimerPasswordPadlock")) {
                            let asset = Player.Appearance[A].Asset.Description;
                            let time = Player.Appearance[A].Property.RemoveTimer;
                            let left = TimerToString(time - CurrentTime);
                            ChatRoomSendLocal("" + asset + " = " + left + "");
                        }
                        if (Player.Appearance[A].Property.Name == "Best Friend Timer Padlock") {
                            let asset = Player.Appearance[A].Asset.Description;
                            let time = Player.Appearance[A].Property.RemovalTime;
                            let left = TimerToString(time - CurrentTime);
                            ChatRoomSendLocal("" + asset + " = " + left + "");
                        }
                    }
            } else {
                let targetname = args;
                let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    let targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if (target[0] != null) {
                    for (let A = 0; A < target[0].Appearance.length; A++)
                        if ((target[0].Appearance[A].Property != null) && (target[0].Appearance[A].Property.LockedBy != null)) {
                            if ((target[0].Appearance[A].Property.LockedBy == "TimerPadlock") || (target[0].Appearance[A].Property.LockedBy == "MistressTimerPadlock") || (target[0].Appearance[A].Property.LockedBy == "LoversTimerPadlock") || (target[0].Appearance[A].Property.LockedBy == "OwnerTimerPadlock") || (target[0].Appearance[A].Property.LockedBy == "TimerPasswordPadlock")) {
                                let asset = target[0].Appearance[A].Asset.Description;
                                let time = target[0].Appearance[A].Property.RemoveTimer;
                                let left = TimerToString(time - CurrentTime);
                                ChatRoomSendLocal("" + asset + " = " + left + "");
                            }
                            if (target[0].Appearance[A].Property.Name == "Best Friend Timer Padlock") {
                                let asset = target[0].Appearance[A].Asset.Description;
                                let time = target[0].Appearance[A].Property.RemovalTime;
                                let left = TimerToString(time - CurrentTime);
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
                        DialogSetReputation("HouseAmplector", 0);
                        DialogSetReputation("HouseCorporis", 0);
                        DialogSetReputation("HouseMaiestas", 0);
                        LogDelete("Mastery", "MagicSchool");
                        DialogSetReputation("HouseVincula", 50);
                    }
                    TitleSet("MagicSchoolMagician");
                }
                if (title == "magus") {
                    if (ReputationGet("HouseMaiestas") < 100) {
                        DialogSetReputation("HouseAmplector", 0);
                        DialogSetReputation("HouseCorporis", 0);
                        DialogSetReputation("HouseVincula", 0);
                        LogDelete("Mastery", "MagicSchool");
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
                        DialogSetReputation("HouseCorporis", 0);
                        DialogSetReputation("HouseMaiestas", 0);
                        DialogSetReputation("HouseVincula", 0);
                        LogDelete("Mastery", "MagicSchool");
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
                        DialogSetReputation("HouseCorporis", 0);
                        DialogSetReputation("HouseMaiestas", 0);
                        DialogSetReputation("HouseVincula", 0);
                        LogDelete("Mastery", "MagicSchool");
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
                        DialogSetReputation("HouseAmplector", 0);
                        DialogSetReputation("HouseCorporis", 0);
                        DialogSetReputation("HouseMaiestas", 0);
                        LogDelete("Mastery", "MagicSchool");
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
                        DialogSetReputation("HouseAmplector", 0);
                        DialogSetReputation("HouseMaiestas", 0);
                        DialogSetReputation("HouseVincula", 0);
                        LogDelete("Mastery", "MagicSchool");
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
                        DialogSetReputation("HouseAmplector", 0);
                        DialogSetReputation("HouseMaiestas", 0);
                        DialogSetReputation("HouseVincula", 0);
                        LogDelete("Mastery", "MagicSchool");
                        DialogSetReputation("HouseCorporis", 50);
                    }
                    TitleSet("MagicSchoolWitch");
                }
                if (title == "wizard") {
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
            } else {
                let targetname = args;
                let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    let targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].AllowItem == true) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if ((target[0].OnlineSharedSettings.Uwall) && ((target[0].OnlineSharedSettings.Ulist == undefined) ||
                            (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber))))) {
                        let msg = umsg1 + tgpname + umsg2;
                        infomsg(msg);
                    } else {
                        let msg = "Magical lasers make disappear all bindings and toys on " + tgpname + "'s body.";
                        if (Ttotalrelease != undefined) {
                            if (Ttotalrelease != "") {
                                if (Ttotalrelease.startsWith("\u0027")) {
                                    msg = tmpname + Ttotalrelease + ' '.repeat(1) + tgpname;
                                } else {
                                    msg = tmpname + ' '.repeat(1) + Ttotalrelease + ' '.repeat(1) + tgpname;
                                }
                            }
                        }
                        if (Ttotalrelease != "no message") publicmsg(msg);
                        CharacterReleaseTotal(target[0]);
                        ChatRoomCharacterUpdate(target[0]);
                    }
                }
                ChatRoomSetTarget(-1);
            }
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
                    "<b>extra</b> = commands for info about other add-ons.\n" +
                    "<b>fun</b> = commands related to fun, pain and pleasure.\n" +
                    "<b>kd</b> = info about kd command (for Kinky Dungeon).\n" +
                    "<b>misc</b> = special commands.\n" +
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
                    "<b>/spin</b> (target) = access to any wheel of fortune, even hidden.";
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
                    "<b>/frlist</b> (lobby) = gives access to friendlist in specified lobby with clickable links during 15 seconds. *\n" +
                    "<b>/mapfog</b> = toggles fog in current map room.\n" +
                    "<b>/mapfull</b> = toggles full vision and hearing in map rooms.\n" +
                    "<b>/mapkeys</b> = gives all keys for current map room.\n" +
                    "<b>/maproom</b> = gives infos about players in current map.\n" +
                    "<b>/maptrap</b> = toggles traps with devices in map rooms.\n" +
                    "<b>/mapx</b> (x-position) = changes your X coordinate in the map.\n" +
                    "<b>/mapy</b> (y-position) = changes your Y coordinate in the map.\n" +
                    "<b>/mapz</b> (target) = gives coordinates in the map.\n" +
                    "<b>/search</b> (lobby) = opens room search for 15 seconds in specified lobby. *\n" +
                    "<b>/theme</b> (number) = changes chat color theme. Number between 0 and 3.";
                infomsg(msg);
            }
            if (args === "clothing") {
                let msg = "Clothing commands - * = more info when using\n" +
                    "<b>/clothes</b> (target) = changes clothes.\n" +
                    "<b>/diaper</b> (options) = plays with diapers (ABDL game). *\n" +
                    "<b>/naked</b> (target) = removes clothes.\n" +
                    "<b>/outfit</b> (options) = restores/saves/loads outfit (including restraints). *\n" +
                    "<b>/underwear</b> (target) = changes underwear.\n" +
                    "<b>/wrobe</b> (target) = opens target wardrobe.";
                infomsg(msg);
            }
            if (args === "escape") {
                let msg = "Escape commands - * = more info when using\n" +
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
                    "<b>/untie</b> (target) = removes all bindings.";
                infomsg(msg);
            }
            if (args === "extra") {
                let msg = "Extra commands:\n" +
                    "<b>/mbsroom</b> = gives infos about MBS wheels of fortune in current chat room.\n" +
                    "<b>/xmenu</b> = direct access to Extensions screen.\n" +
                    "<b>/xstatus</b> (add-on) = displays status of main settings for other add-ons. Available options with /xstatus.";
                infomsg(msg);
            }
            if (args === "fun") {
                let msg = "Fun commands - * = more info when using\n" +
                    "** = scripts must be allowed in BC settings\n" +
                    "<b>/cum</b> = causes an orgasm.\n" +
                    "<b>/hdvibe</b> (options) = changes settings of worn High Duty Belt. *\n" +
                    "<b>/invisible</b> (target) = goes or sends to invisible mode. **\n" +
                    "<b>/plvibe</b> (options) = changes settings of worn Sci-Fi Pleasure Panties. *\n" +
                    "<b>/poof</b> (action) = leaves the club very fast. Action is optional (default = poofs away).\n" +
                    "<b>/sfchaste</b> (options) = changes settings of worn Futuristic Chastity Belt. *\n" +
                    "<b>/sleep</b> (target) = uses the sleeping pill.\n" +
                    "<b>/slowleave</b> (action) = slowly leaves the room.\n" +
                    "<b>/superdice</b> (sides) = rolls a superdice. Sides can be between 2 and 999999999.\n" +
                    "<b>/visible</b> (target) = goes or sends back to visible mode. **";
                infomsg(msg);
            }
            if (args === "kd") {
                let msg = "How to use the kd command:\n" +
                    "1 - Optionally, use <b>/kd devious</b> to toggle the Devious Challenge and/or <b>/kd debug</b> to enable the Debug Mode\n" +
                    "2 - Use twice <b>/kd</b> without any option to launch the game without cheat\n" +
                    "3 - After launching and starting of the game, you can click on the Exit button to go back to the chatroom and use a command with cheat:\n" +
                    "<b>/kd maxstats</b> to get high stats and many potions\n" +
                    "<b>/kd moreitems</b> to get all extra items\n" +
                    "<b>/kd outfits</b> to get all outfits\n" +
                    "<b>/kd restraints</b> to get all restraints\n" +
                    "<b>/kd spells</b> to get special spells for extra slots and improved stats\n" +
                    "<b>/kd weapons</b> to get all weapons\n" +
                    " \n" +
                    "<b>/kd remove</b> to remove one layer of restraints\n" +
                    "4 - Check the cheat effect on the game before repeating step 3 for another cheat";
                infomsg(msg);
            }
            if (args === "misc") {
                let msg = "Misc commands - * = more info when using\n" +
                    "<b>/login</b> (accountname) (password) = logs in a new account.\n" +
                    "<b>/mstatus</b> = displays current status of the moaner.\n" +
                    "<b>/pmenu</b> = direct access to Preferences screen.\n" +
                    "<b>/relog</b> = relogs.\n" +
                    "<b>/uhelp</b> (category) = displays the ULTRAbc commands. *\n" +
                    "<b>/ulistadd</b> (membernumber) = adds a player to the list allowing to bypass Uwall.\n" +
                    "<b>/ulistremove</b> (membernumber) = removes a player from the list allowing to bypass Uwall.\n" +
                    "<b>/ulistshow</b> = displays the list of players allowed to bypass Uwall.\n" +
                    "<b>/unrestrict</b> =  partially removes restrictions from game. *\n" +
                    "<b>/uroom</b> = gives infos about UBC users and Uwall protection in current room.\n" +
                    "<b>/ustatus</b> = displays status of ULTRAbc settings.";
                infomsg(msg);
            }
            if (args === "settings") {
                let msg = "Settings commands - * = more info when using\n" +
                    "<b>/bg4</b> (screen) (background) = selects a standard background for the Club Card Game, Friend List, Main Hall, Private Room (SP) or Timer Cell. *\n" +
                    "<b>/bglist</b> displays the list of all available standard backgrounds.\n" +
                    "<b>/killpar</b> = kills UBC/Moaner parameters saved locally.\n" +
                    "<b>/message</b> (option) (message) = creates custom messages for specific command. *\n" +
                    "<b>/roomsize</b> (players) = sets maximum players per room in Chat Search for normal and hybrid rooms.\n" +
                    "<b>/roomtype</b> (type) = sets room type you want to see in Chat Search. *\n" +
                    "<b>/uset</b> (setting) = toggles a specific UBC setting. *";
                infomsg(msg);
            }
            if (args === "talking") {
                let msg = "Talking commands - * = more info when using\n" +
                    "<b>/atalk</b> (stuffhere) = speaks once as an animal. *\n" +
                    "<b>/btalk</b> (stuffhere) = speaks once as a baby.\n" +
                    "<b>/gtalk</b> (talkmode) (stuffhere) = speaks once in specified gag talk. *\n" +
                    "<b>/stalk</b> (stuttermode) (stuffhere) = speaks once in specified stuttering mode. *";
                infomsg(msg);
            }
            if (args === "visual") {
                let msg = "Visual commands - * = more info when using\n" +
                    "<b>/blur</b> (blurlevel) = forces a global blur level.\n" +
                    "<b>/colorchanger</b> (anim) =  animation with color change. *\n" +
                    "<b>/itemcolor2</b> (colorcode) = changes item color in selected slot. *\n" +
                    "<b>/itempriority</b> (priority) = changes item priority in selected slot. *\n" +
                    "<b>/layerset1</b> (layernumber) (colorcode) = changes layer color of item in saved Item Slot. *\n" +
                    "<b>/layerset2</b> (layernumber) (priority) = changes layer priority of item in saved Item Slot. *\n" +
                    "<b>/layershow1</b> = color info and saving of Item Slot.\n" +
                    "<b>/layershow2</b> = priority info + saving of Item Slot.\n" +
                    "<b>/pose2</b> (pose) (target) = changes pose of any player. *\n" +
                    "<b>/see</b> (visionmode) (blurlevel): forces a vision mode. *\n" +
                    "<b>/trsee</b> (visor) (deafening module) (chin strap) = changes the settings of a worn Techno Helmet. * \n" +
                    "<b>/vrsee</b> (background) (mode) (game) = changes the settings of a worn VR Headset. *";
                infomsg(msg);
            }
            if (args === "zones") {
                let msg = "Zones commands - * = more info when using\n" +
                    "<b>/asylum</b> (minutes) = enters asylum, bypasses requirements. Specify minutes if you are a patient.\n" +
                    "<b>/chess</b> (difficulty) = starts chess, must specify difficulty first (1 easy - 2 normal - 3 hard).\n" +
                    "<b>/college</b> = enters college, bypasses requirements.\n" +
                    "<b>/game</b> (minigame) = launches a minigame. *\n" +
                    "<b>/ggts</b> (minutes) (level) = enters ggts training in asylum for the specified time. Level must be between 1 and 6.\n" +
                    "<b>/keydeposit</b> (hours) = keeps your keys safe in the vault.\n" +
                    "<b>/mission</b> (missionhere) = forces a specific infiltration mission. *\n" +
                    "<b>/prison</b> (minutes) = stays in Pandora prison. More than 60 minutes is possible.\n" +
                    "<b>/store</b> = leaves chatroom, goes to store. Shows hidden items.\n" +
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
            if (args === "") {
                let msg = "Magical lasers put " + tmpname + " in random underwear.";
                if (Underwear != undefined) {
                    if (Underwear != "") {
                        if (Underwear.startsWith("\u0027")) {
                            msg = tmpname + Underwear;
                        } else {
                            msg = tmpname + ' '.repeat(1) + Underwear;
                        }
                    }
                }
                if (Underwear != "no message") publicmsg(msg);
                CharacterRandomUnderwear(Player);
                ChatRoomCharacterUpdate(Player);
            } else {
                let targetname = args;
                let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    let targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].AllowItem == true) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if ((target[0].OnlineSharedSettings.Uwall) && ((target[0].OnlineSharedSettings.Ulist == undefined) ||
                            (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber))))) {
                        let msg = umsg1 + tgpname + umsg2;
                        infomsg(msg);
                    } else {
                        let msg = "Magical lasers put " + tgpname + " in random underwear.";
                        if (Tunderwear != undefined) {
                            if (Tunderwear != "") {
                                if (Tunderwear.startsWith("\u0027")) {
                                    msg = tmpname + Tunderwear + ' '.repeat(1) + tgpname;
                                } else {
                                    msg = tmpname + ' '.repeat(1) + Tunderwear + ' '.repeat(1) + tgpname;
                                }
                            }
                        }
                        if (Tunderwear != "no message") publicmsg(msg);
                        CharacterRandomUnderwear(target[0]);
                        ChatRoomCharacterUpdate(target[0]);
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
                    "1 Metal - 2 Exclusive - 3 Intricate - 4 High Security\n" +
                    "5 Pandora - 6 Mistress - 7 Lover - 8 Owner\n" +
                    "9 Five Minutes - 10 Combination - 11 Safeword\n" +
                    "12 Password - 13 Mistress Timer - 14 Lover Timer\n" +
                    "15 Owner Timer - 16 Timer Password - 17 Best Friend\n" +
                    "18 Best Friend Timer - 19 Family - 20 Portal Link\n" +
                    "21 Lewd Crest - 22 Devious\n" +
                    "Lock 22 can be removed only if players use a modified version of the DOGS mod.";
                infomsg(msg);
            } else {
                let silent = 0;
                let uw = 0;
                let stringUnlock1 = args;
                let stringUnlock2 = stringUnlock1.split(/[ ,]+/);
                let lk = stringUnlock2[1];
                let targetname = stringUnlock2[0];
                let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    let targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && ((target[0] == Player) || (target[0].AllowItem == true)) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if (tmpname == tgpname) {
                        let msg = "Magical lasers make disappear locks on " + tgpname + "'s body.";
                        if (Unlock != undefined) {
                            if (Unlock != "") {
                                if (Unlock.startsWith("\u0027")) {
                                    msg = tmpname + Unlock;
                                } else {
                                    msg = tmpname + ' '.repeat(1) + Unlock;
                                }
                            }
                        }
                        if (Unlock == "no message") silent = 1;
                        if (silent == 0) publicmsg(msg);
                    } else {
                        if ((target[0].OnlineSharedSettings.Uwall) && ((target[0].OnlineSharedSettings.Ulist == undefined) ||
                                (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber))))) {
                            uw = 1;
                            let msg = umsg1 + tgpname + umsg2;
                            infomsg(msg);
                        } else {
                            let msg = "Magical lasers make disappear locks on " + tgpname + "'s body.";
                            if (Tunlock != undefined) {
                                if (Tunlock != "") {
                                    if (Tunlock.startsWith("\u0027")) {
                                        msg = tmpname + Tunlock + ' '.repeat(1) + tgpname;
                                    } else {
                                        msg = tmpname + ' '.repeat(1) + Tunlock + ' '.repeat(1) + tgpname;
                                    }
                                }
                            }
                            if (Tunlock == "no message") silent = 1;
                            if (silent == 0) publicmsg(msg);
                        }
                    }
                    if (uw == 0) {
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
                            for (let A = 0; A < target[0].Appearance.length; A++)
                                if ((target[0].Appearance[A].Property != null) &&
                                    (target[0].Appearance[A].Property.LockedBy == "\u{6DEB}\u{7EB9}\u{9501}_Luzi"))
                                    InventoryUnlock(target[0], target[0].Appearance[A]);
                        }
                        if (lk == 1) CharacterReleaseFromLock(target[0], "MetalPadlock");
                        if (lk == 2) CharacterReleaseFromLock(target[0], "ExclusivePadlock");
                        if (lk == 3) CharacterReleaseFromLock(target[0], "IntricatePadlock");
                        if (lk == 4) {
                            for (let A = 0; A < target[0].Appearance.length; A++)
                                if ((target[0].Appearance[A].Property != null) &&
                                    (target[0].Appearance[A].Property.LockedBy == "HighSecurityPadlock") &&
                                    (target[0].Appearance[A].Property.Name == undefined))
                                    InventoryUnlock(target[0], target[0].Appearance[A]);
                        }
                        if (lk == 5) CharacterReleaseFromLock(target[0], "PandoraPadlock");
                        if (lk == 6) CharacterReleaseFromLock(target[0], "MistressPadlock");
                        if (lk == 7) CharacterReleaseFromLock(target[0], "LoversPadlock");
                        if (lk == 8) CharacterReleaseFromLock(target[0], "OwnerPadlock");
                        if (lk == 9) CharacterReleaseFromLock(target[0], "TimerPadlock");
                        if (lk == 10) CharacterReleaseFromLock(target[0], "CombinationPadlock");
                        if (lk == 11) CharacterReleaseFromLock(target[0], "SafewordPadlock");
                        if (lk == 12) CharacterReleaseFromLock(target[0], "PasswordPadlock");
                        if (lk == 13) CharacterReleaseFromLock(target[0], "MistressTimerPadlock");
                        if (lk == 14) CharacterReleaseFromLock(target[0], "LoversTimerPadlock");
                        if (lk == 15) CharacterReleaseFromLock(target[0], "OwnerTimerPadlock");
                        if (lk == 16) CharacterReleaseFromLock(target[0], "TimerPasswordPadlock");
                        if (lk == 17) {
                            for (let A = 0; A < target[0].Appearance.length; A++)
                                if ((target[0].Appearance[A].Property != null) &&
                                    (target[0].Appearance[A].Property.LockedBy == "HighSecurityPadlock") &&
                                    (target[0].Appearance[A].Property.Name == "Best Friend Padlock"))
                                    InventoryUnlock(target[0], target[0].Appearance[A]);
                        }
                        if (lk == 18) {
                            for (let A = 0; A < target[0].Appearance.length; A++)
                                if ((target[0].Appearance[A].Property != null) &&
                                    (target[0].Appearance[A].Property.LockedBy == "HighSecurityPadlock") &&
                                    (target[0].Appearance[A].Property.Name == "Best Friend Timer Padlock"))
                                    InventoryUnlock(target[0], target[0].Appearance[A]);
                        }
                        if (lk == 19) CharacterReleaseFromLock(target[0], "FamilyPadlock");
                        if (lk == 20) CharacterReleaseFromLock(target[0], "PortalLinkPadlock");
                        if (lk == 21) {
                            for (let A = 0; A < target[0].Appearance.length; A++)
                                if ((target[0].Appearance[A].Property != null) &&
                                    (target[0].Appearance[A].Property.LockedBy == "\u{6DEB}\u{7EB9}\u{9501}_Luzi"))
                                    InventoryUnlock(target[0], target[0].Appearance[A]);
                        }
                        if (lk == 22) {
                            for (let A = 0; A < target[0].Appearance.length; A++)
                                if ((target[0].Appearance[A].Property != null) &&
                                    (target[0].Appearance[A].Property.LockedBy == "ExclusivePadlock") &&
                                    (target[0].Appearance[A].Property.Name == "DeviousPadlock"))
                                    InventoryUnlock(target[0], target[0].Appearance[A]);
                        }
                        ChatRoomCharacterUpdate(target[0]);
                    }
                }
                ChatRoomSetTarget(-1);
            }
        }
    }])

    CommandCombine([{
        Tag: 'unrestrict',
        Description: "(option): partially removes restrictions from game.",
        Action: (args) => {
            if (args === "") {
                let msg = "The unrestrict command partially removes restrictions from game. It must be followed by an option.\n" +
                    "Submissives: type <b>/unrestrict soft</b>\n" +
                    "Other players: type <b>/unrestrict total</b>\n" +
                    "Notes: \n" +
                    "- On request from BC main coder, and because some developers act like the BC 'asset' police, a feature removing conditions (except those related to gender) to use assets is no more included in this command.\n" +
                    "- The unrestrict total command can trigger a BCX warning. Just ignore it (close the breaking message) and enjoy your goddess powers!";
                infomsg(msg);
            } else if (args === "soft") {
                InventoryGroupIsBlocked = function(C, GroupName) {
                    return false;
                }
                Player.GameplaySettings.BlindDisableExamine = false;
                Asset.forEach(e => {
                    if (e.Value < 0) e.Value = 1;
                });
                Player.Inventory.forEach(item => item.Asset.Enable = true);
                ChatRoomMapViewCanEnterTile = function(X, Y) {
                    return 20;
                }
                let msg = "Unrestricted softly. Can do some things you couldn't do before.\n" +
                    "Store also includes hidden items. This can only be reset via a full relog.";
                infomsg(msg);
            } else if (args === "total") {
                let msg = "Unrestricted totally. Can do many things you couldn't do before.\n" +
                    "Store also includes hidden items. This can only be reset via a full relog.\n" +
                    "This command can trigger a BCX warning. Just ignore it (close the breaking message) and enjoy your goddess powers!";
                infomsg(msg);
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
                ChatRoomMapViewCanEnterTile = function(X, Y) {
                    return 20;
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
        }
    }])

    CommandCombine([{
        Tag: 'untie',
        Description: "(target): removes all bindings.",
        Action: (args) => {
            if (args === "") {
                let msg = "Magical lasers make disappear the bindings on " + tmpname + "'s body.";
                if (Untie != undefined) {
                    if (Untie != "") {
                        if (Untie.startsWith("\u0027")) {
                            msg = tmpname + Untie;
                        } else {
                            msg = tmpname + ' '.repeat(1) + Untie;
                        }
                    }
                }
                if (Untie != "no message") publicmsg(msg);
                CharacterRelease(Player);
                ChatRoomCharacterUpdate(Player);
                RealGarblingLevel();
            } else {
                let targetname = args;
                let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    let targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].AllowItem == true) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if ((target[0].OnlineSharedSettings.Uwall) && ((target[0].OnlineSharedSettings.Ulist == undefined) ||
                            (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber))))) {
                        let msg = umsg1 + tgpname + umsg2;
                        infomsg(msg);
                    } else {
                        let msg = "Magical lasers make disappear the bindings on " + tgpname + "'s body.";
                        if (Tuntie != undefined) {
                            if (Tuntie != "") {
                                if (Tuntie.startsWith("\u0027")) {
                                    msg = tmpname + Tuntie + ' '.repeat(1) + tgpname;
                                } else {
                                    msg = tmpname + ' '.repeat(1) + Tuntie + ' '.repeat(1) + tgpname;
                                }
                            }
                        }
                        if (Tuntie != "no message") publicmsg(msg);
                        CharacterRelease(target[0]);
                        ChatRoomCharacterUpdate(target[0]);
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
                let ubc1 = "";
                let ubc2 = "";
                if (ChatRoomCharacter[pl].OnlineSharedSettings.UBC == undefined) {
                    ubc1 = "Does not use ULTRAbc.";
                } else {
                    if ((ChatRoomCharacter[pl].OnlineSharedSettings.UBC == UBCver) || (ChatRoomCharacter[pl].OnlineSharedSettings.UBC == UBCver0)) {
                        ubc1 = "Is an ULTRAbc user.";
                    } else {
                        ubc1 = "Does not use ULTRAbc";
                    }
                }
                if (ChatRoomCharacter[pl].OnlineSharedSettings.Uwall == undefined) {
                    ubc2 = "Does not use Uwall.";
                } else {
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
        Tag: 'uset',
        Description: "(setting): toggles a specific UBC setting.",
        Action: (args) => {
            if (args === "") {
                let msg = "The uset command must be followed by an toggle option corresponding to an UBC setting:\n" +
                    "<b>autojoin</b> for chat room auto-join feature\n" +
                    "<b>magictoys</b> for toys under locked chastity in traps";
                infomsg(msg);
            } else {
                let setting = args;
                if (setting == "autojoin") {
                    if (AutojoinOn == true) {
                        AutojoinOn = false;
                        M_MOANER_saveControls();
                        let msg = "Auto-Join feature is disabled.";
                        infomsg(msg);
                    } else {
                        AutojoinOn = true;
                        M_MOANER_saveControls();
                        let msg = "Auto-Join feature is enabled.";
                        infomsg(msg);
                    }
                } else if (setting == "magictoys") {
                    if (MagictoysOn == true) {
                        MagictoysOn = false;
                        M_MOANER_saveControls();
                        let msg = "Toys can't be added under locked chastity for trap mode in map rooms.";
                        infomsg(msg);
                    } else {
                        MagictoysOn = true;
                        M_MOANER_saveControls();
                        let msg = "Toys can be added under locked chastity for trap mode in map rooms.";
                        infomsg(msg);
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'ustatus',
        Description: ": displays status of UBC settings.",
        Action: () => {
            showButtonsStatus();
            showExitmodeStatus();
            showFeaturesStatus();
            showHighfameStatus();
            showMagiccheatStatus();
            showMaptrapStatus();
	    showMiscUbcStatus();
            showNostruggleStatus();
            showSearchRoomStatus();
            showTalkStatus();
        }
    }])

    CommandCombine([{
        Tag: 'visible',
        Description: ": (target): goes back or sends back to visible mode.",
        Action: (args) => {
            if (args === "") {
                let msg = "" + tmpname + " suddenly is visible for everybody.";
                if (Visible != undefined) {
                    if (Visible != "") {
                        if (Visible.startsWith("\u0027")) {
                            msg = tmpname + Visible;
                        } else {
                            msg = tmpname + ' '.repeat(1) + Visible;
                        }
                    }
                }
                if (Visible != "no message") publicmsg(msg);
                InventoryRemove(Player, "ItemScript");
                CurrentScreen === 'ChatRoom' ?
                    ChatRoomCharacterUpdate(Player) :
                    CharacterRefresh(Player);
            } else {
                let targetname = args;
                let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    let targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].AllowItem == true) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if (target[0].OnlineSharedSettings.ScriptPermissions.Hide.permission == 0) {
                        let msg = "To use the visible command on other players, they need first to allow Scripts in BC settings.";
                        infomsg(msg);
                    } else {
                        if ((target[0].OnlineSharedSettings.Uwall) && ((target[0].OnlineSharedSettings.Ulist == undefined) ||
                                (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber))))) {
                            let msg = umsg1 + tgpname + umsg2;
                            infomsg(msg);
                        } else {
                            let msg = "" + tgpname + " suddenly is visible for everybody.";
                            if (Tvisible != undefined) {
                                if (Tvisible != "") {
                                    if (Tvisible.startsWith("\u0027")) {
                                        msg = tmpname + Tvisible + ' '.repeat(1) + tgpname;
                                    } else {
                                        msg = tmpname + ' '.repeat(1) + Tvisible + ' '.repeat(1) + tgpname;
                                    }
                                }
                            }
                            if (Tvisible != "no message") publicmsg(msg);
                            InventoryRemove(target[0], "ItemScript");
                            CurrentScreen === 'ChatRoom' ?
                                ChatRoomCharacterUpdate(target[0]) :
                                CharacterRefresh(target[0]);
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
                let targetname = args;
                let target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                if (target[0] == null) {
                    let targetnumber = parseInt(targetname);
                    target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                }
                if ((target[0] != null) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if ((target[0].OnlineSharedSettings.Uwall) && ((target[0].OnlineSharedSettings.Ulist == undefined) ||
                            (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber))))) {
                        let msg = umsg1 + tgpname + umsg2;
                        infomsg(msg);
                    } else {
                        target[0].OnlineSharedSettings.AllowFullWardrobeAccess = true;
                        target[0].OnlineSharedSettings.BlockBodyCosplay = false;
                        ChatRoomCharacterViewClickCharacter(target[0]);
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
                        showFriendlistSlotsStatus();
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
                        let MBSver = Player.OnlineSharedSettings.MBSVersion;
                        let stringMBSver1 = MBSver;
                        let stringMBSver2 = stringMBSver1.split(".");
                        let MBS1 = stringMBSver2[0];
                        let MBS2 = stringMBSver2[1];
                        let MBS3 = stringMBSver2[2];
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
                        showGarblingStatus();
                        showLockedMbsStatus();
                        showLockedWheelStatus();
			showMbsChangeStatus();
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
                        showCharacterAbsenceStatus();
                        showAdvancedColoringStatus();
                        showChatStatus();
                        showFlatColorStatus();
                        showFriendListStatus();
                        showGuiOverhaulStatus();
                        showInputZonesStatus();
                        showLocalTimeStatus();
                        showMiscDetailsStatus();
                        showThemedVersionStatus();
                    }
                } else if (addon == "wce") {
                    if (Player.ExtensionSettings.FBC != null) {
                        str = Player.ExtensionSettings.FBC;
                        d = LZString.decompressFromBase64(str);
                        WCEdata = {};
                        decoded = JSON.parse(d);
                        WCEdata = decoded;       
                        showAnimationStatus();
                        showAntiCheatStatus();
                        showArousalStatus();
                        showCheatStatus();
                        showColorStatus();
                        showEmbeddingStatus();
                        showImmersionStatus();
                        showLayeringStatus();
                        showMiscStatus();
                        showPerformanceStatus();
                        showWardrobeStatus();
                        showWceTalkingStatus();
                    }
                }
            }
        }
    }])

})();
 
