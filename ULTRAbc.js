// ==UserScript==
// @name ULTRAbc
// @namespace https://www.bondageprojects.com/
// @version 3.5.1
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
var bcModSDK=function(){"use strict";const o="1.2.0";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return!!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const i=new Map,a=new Set;function c(o){a.has(o)||(a.add(o),console.warn(o))}function s(o){const e=[],t=new Map,n=new Set;for(const r of f.values()){const i=r.patching.get(o.name);if(i){e.push(...i.hooks);for(const[e,a]of i.patches.entries())t.has(e)&&t.get(e)!==a&&c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${a}`),t.set(e,a),n.add(r.name)}}e.sort(((o,e)=>e.priority-o.priority));const r=function(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}(o.original,t);let i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,o.name,n),c=r.apply(this,e);return null==a||a(),c};for(let t=e.length-1;t>=0;t--){const n=e[t],r=i;i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,o.name,n.mod),c=n.hook.apply(this,[e,o=>{if(1!==arguments.length||!Array.isArray(e))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`);return r.call(this,o)}]);return null==a||a(),c}}return{hooks:e,patches:t,patchesSources:n,enter:i,final:r}}function l(o,e=!1){let r=i.get(o);if(r)e&&(r.precomputed=s(r));else{let e=window;const a=o.split(".");for(let t=0;t<a.length-1;t++)if(e=e[a[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const c=e[a[a.length-1]];if("function"!=typeof c)throw new Error(`ModSDK: Function ${o} to be patched not found`);const l=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o}return((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(c.toString().replaceAll("\r\n","\n")),d={name:o,original:c,originalHash:l};r=Object.assign(Object.assign({},d),{precomputed:s(d),router:()=>{},context:e,contextProperty:a[a.length-1]}),r.router=function(o){return function(...e){return o.precomputed.enter.apply(this,[e])}}(r),i.set(o,r),e[r.contextProperty]=r.router}return r}function d(){for(const o of i.values())o.precomputed=s(o)}function p(){const o=new Map;for(const[e,t]of i)o.set(e,{name:e,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const f=new Map;function u(o){f.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),f.delete(o.name),o.loaded=!1,d()}function g(o,t){o&&"object"==typeof o||e("Failed to register mod: Expected info object, got "+typeof o),"string"==typeof o.name&&o.name||e("Failed to register mod: Expected name to be non-empty string, got "+typeof o.name);let r=`'${o.name}'`;"string"==typeof o.fullName&&o.fullName||e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`),r=`'${o.fullName} (${o.name})'`,"string"!=typeof o.version&&e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`),o.repository||(o.repository=void 0),void 0!==o.repository&&"string"!=typeof o.repository&&e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`),null==t&&(t={}),t&&"object"==typeof t||e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`);const i=!0===t.allowReplace,a=f.get(o.name);a&&(a.allowReplace&&i||e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(a));const c=o=>{let e=g.patching.get(o.name);return e||(e={hooks:[],patches:new Map},g.patching.set(o.name,e)),e},s=(o,t)=>(...n)=>{var i,a;const c=null===(a=(i=m.errorReporterHooks).apiEndpointEnter)||void 0===a?void 0:a.call(i,o,g.name);g.loaded||e(`Mod ${r} attempted to call SDK function after being unloaded`);const s=t(...n);return null==c||c(),s},p={unload:s("unload",(()=>u(g))),hookFunction:s("hookFunction",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);"number"!=typeof t&&e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`);const s={mod:g.name,priority:t,hook:n};return a.hooks.push(s),d(),()=>{const o=a.hooks.indexOf(s);o>=0&&(a.hooks.splice(o,1),d())}})),patchFunction:s("patchFunction",((o,t)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);n(t)||e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`);for(const[n,i]of Object.entries(t))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`);d()})),removePatches:s("removePatches",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const t=l(o);c(t).patches.clear(),d()})),callOriginal:s("callOriginal",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`);const i=l(o);return Array.isArray(t)||e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`),i.original.apply(null!=n?n:globalThis,t)})),getOriginalHash:s("getOriginalHash",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`);return l(o).originalHash}))},g={name:o.name,fullName:o.fullName,version:o.version,repository:o.repository,allowReplace:i,api:p,loaded:!0,patching:new Map};return f.set(o.name,g),Object.freeze(p)}function h(){const o=[];for(const e of f.values())o.push({name:e.name,fullName:e.fullName,version:e.version,repository:e.repository});return o}let m;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:p,errorReporterHooks:Object.seal({apiEndpointEnter:null,hookEnter:null,hookChainExit:null})};return m=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}();
//SDKstuff end

(async function() {
    if (window.UBCver) {
        console.warn("ULTRAbc already loaded. No double loading");
        return;
    }

    const UBCver = "3.5.1";
    const UBCver0 = "3.5";
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

    var M_MOANER_moanerKey = "bc_moaner_";
    var M_MOANER_scriptOn = false;
    var M_MOANER_cum = false;
    let profileName;
    var animal = 0;
    var bgall = false;
    var cdesk = 0;
    var cfame = 200;
    var frname = "BrickWall";
    var gl = 0;
    var onegl = 0;
    var mgl = 0;
    var rsize = 20;
    let rtype = "ALL";
    var st = 0;
    var tcname = "Cell";

    let AutojoinOn;
    let DolltalkOn;
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
    var NowhisperOn = false;
    var NPCpunish = false;
    let OutbuttonsOn;
    let RglbuttonsOn;
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

    var M_MOANER_orgasmActive = true;
    var M_MOANER_spankActive = true;
    var M_MOANER_talkActive = true;
    var M_MOANER_tickleActive = true;
    var M_MOANER_vibratorActive = true;
    var M_MOANER_xvibratorActive = false;

    //Animal Talk Profiles
    var animalmode1 = ["hoo", "honk", "hooink", "hoink", "hoiink", "hum", "yum", "huumm", "yuuum"]; 
    var animalmode2 = ["mo", "moo", "mooo", "mu", "muu", "moooo"];
    var animalmode3 = ["wif", "yif", "wiif", "yiif", "wiff", "yiff", "aou", "waou", "awaou"];
    var animalmode4 =  ["meow", "meoow", "meooow", "meeow", "meeeow", "mnyaa", "mew", "meew", "meeew"]; 
    var animalmode5 = ["cou", "coui", "couic", "koui", "kouii", "scoui", "scouic"];
    var animalmode6 = ["gru", "grui", "gruik", "gruiik", "gruiii", "groi"];  
    var animalmode7 = ["nei", "neigh", "neighh", "neighhhh", "whin", "whinny", "whinney"];                 
    var animalmode8 = ["wof", "woof", "wuf", "wooof", "awo", "awoo", "woo"];   
    var animalmode9 = ["owo", "owoo", "whoo", "owoooo", "howl", "howll", "hoowl"];

    //Moaner Default Profile
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
        var datas = JSON.parse(localStorage.getItem(M_MOANER_moanerKey + "_" + Player.MemberNumber));
        if (datas == null || datas == undefined) {
            M_MOANER_orgasmActive = true;
            M_MOANER_scriptOn = false;
            M_MOANER_spankActive = true;
            M_MOANER_talkActive = true;
            M_MOANER_tickleActive = true;
            M_MOANER_vibratorActive = true;
            M_MOANER_xvibratorActive = false;
            M_MOANER_cum = false;
            profileName = "default";
            tmpname = "";
            pronoun1 = "";
            pronoun2 = "";
            pronoun3 = "";
            pronoun4 = "";
	    animal = 0;
	    bgall = false;
            cdesk = 0;
            cfame = 200;
	    frname = "BrickWall";
            gl = 0;
            onegl = 0;
            mgl = 0;
            rsize = 20;
            rtype = "ALL";
	    st = 0;
	    tcname = "Cell";
            AutojoinOn = false;
            DolltalkOn = false;
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
            Tinvisible = "",
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
	    animal = datas.animal;
	    bgall = datas.bgall;
            cdesk = datas.cdesk;
            cfame = datas.cfame;
	    frname = datas.frname;
            gl = datas.gaglevel;
            onegl = 0;
            mgl = 0;
            rsize = datas.rsize;
            rtype = datas.rtype;
	    st = datas.stutterlevel;
	    tcname = datas.tcname;
            AutojoinOn = datas.autojoin;
            DolltalkOn = datas.dolltalk;
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
            "animal": animal,
            "bgall" : bgall,	
            "cdesk": cdesk,
            "cfame": cfame,    
            "frname": frname,
            "gaglevel": gl,
            "rsize": rsize,
            "rtype": rtype,
            "stutterlevel": st,  
            "tcname": tcname,
            "autojoin": AutojoinOn,
            "dolltalk": DolltalkOn,
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
                if (NPCpunish == true) {
                    Player.RestrictionSettings.BypassNPCPunishments = false;
                } else {
                    Player.RestrictionSettings.BypassNPCPunishments = true;
                }
                if (DolltalkOn == null || DolltalkOn == undefined) {
                    DolltalkOn = false;
                    M_MOANER_saveControls();
                }
		if (animal == null || animal == undefined) {
                    animal = 0;
		    st = 0;
                    M_MOANER_saveControls();
                }
		if (animal == 1) AnimalTalk1On = true;
                if (animal == 2) AnimalTalk2On = true; 
                if (animal == 3) AnimalTalk3On = true;
                if (animal == 4) AnimalTalk4On = true;
                if (animal == 5) AnimalTalk5On = true;
                if (animal == 6) AnimalTalk6On = true;
                if (animal == 7) AnimalTalk7On = true;
                if (animal == 8) AnimalTalk8On = true;
		if (animal == 9) AnimalTalk9On = true;
		if (bgall == null || bgall == undefined) {
                    bgall = false;
                    M_MOANER_saveControls();
                }
		if (FrkeysOn == null || FrkeysOn == undefined) {
                    FrkeysOn = false;
                    M_MOANER_saveControls();
                }
		if (frname == null || frname == undefined) {
                    frname = "BrickWall";
		    tcname = "Cell";
                    M_MOANER_saveControls();
                }
                if (gl == null || gl == undefined) {
                    gl = 0;
                    notalk = 0;
                    M_MOANER_saveControls();
                }
                if (gl == -1) {
                    BabyTalkOn = true;
                    GagTalkOn = false;
                }
                if (gl == 0) {
                    BabyTalkOn = false;
                    GagTalkOn = false;
                }
                if (gl > 0) {
                    BabyTalkOn = false;
                    GagTalkOn = true;
                }
                if (MagictoysOn == null || MagictoysOn == undefined) {
                    MagictoysOn = false;
                    M_MOANER_saveControls();
                }
		if (NotimeoutOn == null || NotimeoutOn == undefined) {
                    NotimeoutOn = false;
                    M_MOANER_saveControls();
                }
                if (reaction == null || reaction == undefined) {
                    reaction = 0;
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
		if (st == 0) StutterOn = false;
                if (st > 0) StutterOn = true;
                ini = 1;
                FBCsettings();
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
    ULTRAChatRoomKeyDown();
    ULTRAChatRoomMapViewCalculatePerceptionMasks();
    ULTRAChatRoomMapViewMovementProcess();
    ULTRAChatRoomMenuDraw();
    ULTRAChatRoomSendChat();
    ULTRAChatSearchExit();
    ULTRAChatSearchJoin();
    ULTRAChatSearchParseResponse();
    ULTRAChatSearchRoomSpaceSelectClick();
    ULTRAChatSearchRoomSpaceSelectDraw();
    ULTRAChatSearchRun();
    ULTRAClubCardEndTurn();
    ULTRAClubCardLoadDeckNumber();
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
    ULTRAPrivateClick();
    ULTRAPrivateRun();
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
                if ((MouseX >= 955) && (MouseX < 1000) && (MouseY >= 45) && (MouseY < 90)) {
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
                    RealGarblingLevel();
                    return;
                }
            }
            if (OutbuttonsOn == true) {
                if ((MouseX >= 955) && (MouseX < 1000) && (MouseY >= 90) && (MouseY < 135)) {
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
            const inputChat = /** @type {HTMLTextAreaElement} */(document.getElementById("InputChat"));
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
                        ChatRoomSetLastChatRoom("");
                        ServerSend("ChatRoomLeave", "");
                        CommonSetScreen("Online", "ChatSearch");
                        ChatRoomClearAllElements();
                        OnlineGameName = "";
                        return true;
                    }
                    if (event.code === "NumpadMultiply") {
                        CharacterReleaseTotal(Player);
                        ChatRoomCharacterUpdate(Player);
                        RealGarblingLevel();
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
		const chatLog = /** @type {HTMLDivElement} */(document.getElementById("TextAreaChatLog"));
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
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " is suddenly trapped on a Bondage Bench."
                            }]
                        });
                    }
                    if (item2 == "Kennel") {
                        KennelTrap();
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " is suddenly trapped in a Kennel."
                            }]
                        });
                    }
                    if (item2 == "Locker") {
                        LockerTrap();
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " is suddenly trapped in a Locker."
                            }]
                        });
                    }
                    if (item2 == "X-Cross") {
                        XcrossTrap();
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: "" + tmpname + " is suddenly trapped on an X-Cross."
                            }]
                        });
                    }
                }
            }
            if (newTile && newTile.OnEnter) newTile.OnEnter();
            if (newObject && newObject.OnEnter) newObject.OnEnter();
            return;
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
                    if (ini == 1) {
                        M_MOANER_saveControls();
                    }
                } else {
                    if (Player.Nickname != '') {
                        if (tmpname != Player.Nickname) {
                            tmpname = Player.Nickname;
                            if (ini == 1) {
                                M_MOANER_saveControls();
                            }
                        }
                    } else {
                        if (tmpname != Player.Name) {
                            tmpname = Player.Name;
                            if (ini == 1) {
                                M_MOANER_saveControls();
                            }
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
                                if (ini == 1) {
                                    M_MOANER_saveControls();
                                }
                            } else if (chprn == "SheHer") {
                                pronoun1 = "She";
                                pronoun2 = "her";
                                pronoun3 = "her";
                                pronoun4 = "she";
                                if (ini == 1) {
                                    M_MOANER_saveControls();
                                }
                            } else {
                                pronoun1 = "They";
                                pronoun2 = "them";
                                pronoun3 = "their";
                                pronoun4 = "they";
                                if (ini == 1) {
                                    M_MOANER_saveControls();
                                }
                            }
                        }
                    }
                }
            }
            if (SosbuttonsOn == true) SosButtons(); 
            if (OutbuttonsOn == true) OutButtons(); 
            if (RglbuttonsOn == true) {
                DrawButton(955, 135, 45, 45, "RGL", "White", "", "");
            }
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

    async function ULTRAChatRoomSendChat() {
        modApi.hookFunction('ChatRoomSendChat', 4, (args, next) => {
           const inputChat = /** @type {null | HTMLTextAreaElement} */(document.getElementById("InputChat"));
           if (!inputChat) {
               return;
	   }
           let msg = inputChat.value.trim ();
	   if (!msg.length) return;
           var tsp = 0;
           if (msg.startsWith(",")) {
               var text1 = "(" + msg.slice(1) + ")";
	       ElementValue("InputChat", text1); 
           } else {
               var text1 = msg;
           }
           if ((text1.startsWith(".")) && (window.BCX_Loaded == true)) {
               var tsp = 1;
           }
           if ((text1.startsWith("!")) || (text1.startsWith("(")) || (text1.startsWith("*"))) var tsp = 1;
           if ((text1.startsWith(":")) && (Player.ChatSettings.MuStylePoses == true)) var tsp = 1;
           if (text1.startsWith("/")) {
               if (!text1.startsWith("//")) {
                   var tsp = 1;
                   ChatRoomSetTarget(-1);
               } else {
                   var tsp = 2;
                   var text2 = text1.replaceAt(0, "\u200b");
               }
           }
           if ((text1.startsWith("@")) && (window.MBCHC)) {
               var tsp = 1;
               ChatRoomSetTarget(-1);
           }
           if (text1.startsWith("\\")) {
               var tsp = 2;
               var text2 = text1.replaceAt(0, "\u200b");
           }
           if (tsp == 1) text2 = text1;
           if (tsp == 2) tsp = 1;
           if (tsp == 0) {
	       var nm = 0;
               if (DolltalkOn == true) {
                    if (IsDollTalk(text1) == false) {
                        var nm = 1;
                    } 
                    if (nm == 1) {
                        var text2 = "";
                        ElementValue("InputChat", ""); 
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Your message or whisper can't be sent because it does not respect the rules of doll talk.</p>"
                         );
                     } else {
                         var text2 = text1;
                     }
                } else {
                     var text2 = text1;
                }   
            } 
            if ((tsp == 1) || (nm == 1)) {
                var text3 = text2;
            } else {
                if (this.StutterOn == true) {
                    var text3 = SpeechTransformStutter(text2, st);       
                } else {
                    var text3 = text2;
                }
            }
	    ElementValue("InputChat", text2.replace(text2, text3));
            if ((tsp == 1) || (nm == 1)) {
                var text4 = text3;
            } else {
                if (M_MOANER_talkActive && M_MOANER_scriptOn && IsStimulated(Player)) {
                     var text4 = M_MOANER_applyMoanToMsg(Player, text3);
                 } else {
                     var text4 = text3;
                 }
            }
	    ElementValue("InputChat", text3.replace(text3, text4));
            mb = 0;
            if (Player.ExtensionSettings.MBS != null) {
                str = Player.ExtensionSettings.MBS;
                d = LZString.decompressFromUTF16(str);
                MBSdata = {};
                decoded = JSON.parse(d);
                MBSdata = decoded;
                if (MBSdata.AlternativeGarbling) {
                    mb = 1;
                }
            }
            if ((tsp == 1) || (nm == 1)) {
                var text5 = text4;
            } else {
                if (this.BabyTalkOn == true) {
                    var text5 = SpeechTransformBabyTalk(text4);
                } else if (this.GagTalkOn == true) {
                    if (mb == 1) {
                        if (ChatRoomTargetMemberNumber == null) {
                            var text5 = text4;
                        } else {
                            var text5 = SpeechTransformGagGarble(text4, gl);
                        }
                    } else {
                        var text5 = SpeechTransformGagGarble(text4, gl);
                    }
                } else {
                    var text5 = text4;
                }
            }
	    ElementValue("InputChat", text4.replace(text4, text5));
            if (ChatRoomTargetMemberNumber == -1) {
                if ((tsp == 1) || (notalk == 1) || (nm == 1)) {
                    var text6 = text5;
                } else {
                    if (gl != 0) {
                        var text6 = text5;
                    } else {
                         var text6 = text4;
                    }      
                }
                if (nm == 0) {
		    ElementValue("InputChat", text5.replace(text5, text6));
                    var text6 = text5; 
                }
                if (ac == 1) {
                    var ac = 0;
                    var texta = text6;
                } else {
                    if ((tsp == 1) || (notalk == 1) || (nm == 1)) {
                        var texta = text6;
                    } else {
                        if (this.AnimalTalk1On == true) {
                            var texta = GarbleTalk(text6, animalmode1);   
                        } else if (this.AnimalTalk2On == true) {
                            var texta = GarbleTalk(text6, animalmode2);
                        } else if (this.AnimalTalk3On == true) {
                            var texta = GarbleTalk(text6, animalmode3); 
                        } else if (this.AnimalTalk4On == true) {
                            var texta = GarbleTalk(text6, animalmode4); 
                        } else if (this.AnimalTalk5On == true) {
                            var texta = GarbleTalk(text6, animalmode5);
                        } else if (this.AnimalTalk6On == true) {
                            var texta = GarbleTalk(text6, animalmode6);
                        } else if (this.AnimalTalk7On == true) {
                            var texta = GarbleTalk(text6, animalmode7); 
                        } else if (this.AnimalTalk8On == true) {
                            var texta = GarbleTalk(text6, animalmode8);
			} else if (this.AnimalTalk9On == true) {
                            var texta = GarbleTalk(text6, animalmode9);
                        } else {
                            var texta = text6;
                        } 
                    } 
                ElementValue("InputChat", text6.replace(text6, texta));
	        }  
            } else {
                if (NowhisperOn == false) {
                    if ((tsp == 1) || (notalk == 1) || (nm == 1)) {
                        var text6 = text5;
                    } else {
                        if (gl != 0) {
                            if (Player.RestrictionSettings.NoSpeechGarble) {
                                var text6 = text5 + " (\u0022" + text4 + "\u0022)";
                            } else {            
                                var text6 = text5;
                            }
                        } else {
                            var text6 = text4; 
                        }
                    }
                    if (text6.startsWith("*")) {
                        if (text6.startsWith("**")) {
                            var text7 = text6.slice(1);
                        } else {
                            var text7 = "*" + tmpname + text6.slice(1);
                        }
                    } else {
                        var text7 = text6;
                    }  
                    if ((tsp == 1) || (notalk == 1) || (nm == 1)) {
                        var texta = text7;
                    } else {                       
                        if (this.AnimalTalk1On == true) {
                            var texta = GarbleTalk(text7, animalmode1);   
                        } else if (this.AnimalTalk2On == true) {
                            var texta = GarbleTalk(text7, animalmode2);
                        } else if (this.AnimalTalk3On == true) {
                            var texta = GarbleTalk(text7, animalmode3); 
                        } else if (this.AnimalTalk4On == true) {
                            var texta = GarbleTalk(text7, animalmode4); 
                        } else if (this.AnimalTalk5On == true) {
                            var texta = GarbleTalk(text7, animalmode5);
                        } else if (this.AnimalTalk6On == true) {
                            var texta = GarbleTalk(text7, animalmode6);
                        } else if (this.AnimalTalk7On == true) {
                            var texta = GarbleTalk(text7, animalmode7); 
                        } else if (this.AnimalTalk8On == true) {
                            var texta = GarbleTalk(text7, animalmode8);
			} else if (this.AnimalTalk9On == true) {
                            var texta = GarbleTalk(text7, animalmode9);
                        } else {
                            var texta = text7;
                        } 
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

    //Friend List
    async function ULTRAFriendListDraw() {
        modApi.hookFunction('FriendListDraw', 4, (args, next) => {
           FriendListBackground = frname;       
           next(args);
        });
    }

    async function ULTRAFriendListKeyDown() {
        modApi.hookFunction('FriendListKeyDown', 4, (args, next) => {
            const searchInput = /** @type {HTMLTextAreaElement} */(document.getElementById(FriendListIDs.searchInput));
            const searchInputHasFocus = searchInput && document.activeElement === searchInput;
            const beepTextArea = /** @type {HTMLTextAreaElement} */(document.getElementById(FriendListIDs.beepTextArea));
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
                        if ((InventoryGet(Player, "Pronouns").Asset.Name == "SheHer") &&
                            (InventoryGet(Player, "Pussy").Asset.Name != "Penis") &&
                            (InventoryGet(Player, "BodyUpper").Asset.Name != "FlatSmall") &&
                            (InventoryGet(Player, "BodyUpper").Asset.Name != "FlatMedium")) {
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
                        if ((InventoryGet(Player, "Pronouns").Asset.Name == "HeHim") &&
                            (InventoryGet(Player, "Pussy").Asset.Name == "Penis") &&
                            ((InventoryGet(Player, "BodyUpper").Asset.Name == "FlatSmall") || (InventoryGet(Player, "BodyUpper").Asset.Name == "FlatMedium"))) {
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
	    } if (forward.length > 0) return;
	       let complete = low; 
	       for (let I = low.length - CommandsKey.length; ; ++I) {
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
    async function ULTRAMainHallClick() {
        modApi.hookFuction('MainHallClick', 4, (args, next) => {
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
                if ((MouseX >= 0) && (MouseX < 45) && (MouseY >= 45) && (MouseY < 90)) {
                    CharacterReleaseTotal(Player);
                    RealGarblingLevel();
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
            if (SosbuttonsOn == true) SosButtons(); 
            if (OutbuttonsOn == true) OutButtons();   
            return;
        });
    }

    //Photographic Room
    async function ULTRAPhotographicClick() {
        modApi.hookFunction('PhotographicClick', 4, (args, next) => {
            if (SosbuttonsOn == true) {
                if ((MouseX >= 0) && (MouseX < 45) && (MouseY >= 45) && (MouseY < 90)) {
                    CharacterReleaseTotal(Player);
                    RealGarblingLevel();
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
	    if (MouseIn(1000, 0, 500, 1000) && !LogQuery("RentRoom", "PrivateRoom")) { NPCTraitDialog(PrivateVendor); CharacterSetCurrent(PrivateVendor); }
	    if (MouseIn(1885, PrivateButtonTop(0), 90, 90) && Player.CanWalk() && !Player.Cage) PrivateExit();
	    if (MouseIn(1885, PrivateButtonTop(1), 90, 90) && LogQuery("RentRoom", "PrivateRoom") && Player.CanKneel()) PoseSetActive(Player, Player.ActivePoseMapping.BodyLower !== "Kneel" ? "Kneel" : "BaseLower", true);
	    if (MouseIn(1885, PrivateButtonTop(2), 90, 90) && LogQuery("RentRoom", "PrivateRoom") && Player.CanWalk() && (!Player.Cage)) CharacterSetCurrent(PrivateVendor);
	    if (MouseIn(1885, PrivateButtonTop(3), 90, 90) && LogQuery("RentRoom", "PrivateRoom") && Player.CanChangeOwnClothes()) CharacterAppearanceLoadCharacter(Player);
	    if (MouseIn(1885, PrivateButtonTop(4), 90, 90) && LogQuery("RentRoom", "PrivateRoom") && Player.CanChangeOwnClothes() && LogQuery("Wardrobe", "PrivateRoom")) CommonSetScreen("Character", "Wardrobe");
	    if (MouseIn(1885, PrivateButtonTop(5), 90, 90) && LogQuery("RentRoom", "PrivateRoom") && (!Player.Cage) && PrivateBedActive()) CommonSetScreen("Room", "PrivateBed");
	    if (MouseIn(1885, PrivateButtonTop(6), 90, 90) && LogQuery("RentRoom", "PrivateRoom") && LogQuery("Expansion", "PrivateRoom")) PrivateCharacterOffset = (PrivateCharacterOffset + 4 == PrivateCharacterMax) ? 0 : PrivateCharacterOffset + 4;
	    if (MouseIn(1885, PrivateButtonTop(7), 90, 90) && LogQuery("RentRoom", "PrivateRoom")) {
		if (Player.VisualSettings == null) Player.VisualSettings = {};
                if (bgall == true) {
                    var backgrounds = BackgroundsGenerateList(BackgroundsTagList);
                } else {
                    var backgrounds = BackgroundsGenerateList(BackgroundsPrivateRoomTagList);
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
                    var backgrounds = BackgroundsGenerateList(BackgroundsTagList);
                } else {
                    var backgrounds = BackgroundsGenerateList(BackgroundsPrivateRoomTagList);
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
                    var backgrounds = BackgroundsGenerateList(BackgroundsTagList);
                } else {
                    var backgrounds = BackgroundsGenerateList(BackgroundsPrivateRoomTagList);
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
                    var backgrounds = BackgroundsGenerateList(BackgroundsTagList);
                } else {
                    var backgrounds = BackgroundsGenerateList(BackgroundsPrivateRoomTagList);
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
                if ((MouseX >= 0) && (MouseX < 45) && (MouseY >= 45) && (MouseY < 90)) {
                    CharacterReleaseTotal(Player);
                    RealGarblingLevel();
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
                            if ((tmpname != tgpname) &&
                                (C.OnlineSharedSettings.Uwall == true) &&
                                (!(C.OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
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
                        if ((tmpname != tgpname) &&
                            (C.OnlineSharedSettings.Uwall == true) &&
                            (!(C.OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
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
                        if ((tmpname != tgpname) &&
                            (C.OnlineSharedSettings.Uwall == true) &&
                            (!(C.OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
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
                        if ((tmpname != tgpname) &&
                            (C.OnlineSharedSettings.Uwall == true) &&
                            (!(C.OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
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
        msg = "Current Animal Type: "  + BCARdata.animal;
        M_MOANER_sendMessageToWearer(msg);
    }

    function showAnimationButtonsStatus() {
        let msg;
        if (BCARdata.animationButtonsEnable) {
            msg = "Animation Buttons enabled.";
        } else {
            msg = "Animation Buttons disabled.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showArousalManipulationStatus() {
        let msg;
        if (BCARdata.arousalEnable) {
            msg = "Arousal Manipulation enabled.";
        } else {
            msg = "Arousal Manipulation disabled.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showBCARExpressionsStatus() {
        let msg;
        if (BCARdata.expressionsEnable) {
            msg = "BCAR Expressions enabled.";
        } else {
            msg = "BCAR Expressions disabled.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showEarAnimationStatus() {
        let msg;
        if (BCARdata.earWigglingEnable) {
            msg = "Ear Animation enabled.";
        } else {
            msg = "Ear Animation disabled.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showEarEmoteStatus() {
        let msg;
        if (BCARdata.earEmoteEnable) {
            msg = "Ear Emote enabled.";
        } else {
            msg = "Ear Emote disabled.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showTailAnimationStatus() {
        let msg;
        if (BCARdata.tailWaggingEnable) {
            msg = "Tail Animation enabled.";
        } else {
            msg = "Tail Animation disabled.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showTailEmoteStatus() {
        let msg;
        if (BCARdata.tailEmoteEnable) {
            msg = "Tail Emote enabled.";
        } else {
            msg = "Tail Emote disabled.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showWingAnimationStatus() {
        let msg;
        if (BCARdata.wingFlappingEnable) {
            msg = "Wing Animation enabled.";
        } else {
            msg = "Wing Animation disabled."
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    //BC Responsive Status	
    function showBCResponsiveStatus() {
        let msg;
        if (BCRdata.settings.enabled) {
            msg1 = "BC Responsive is enabled.";
        } else {
            msg1 = "BC Responsive is disabled.";
        }
        active = BCRdata.active_personality;
        Personality = BCRdata.personalities[active].name;
        msg2 = "";
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
            M_MOANER_sendMessageToWearer(msg);
        }
    }

    //BCTweaks Status
    function showArousalErectionStatus() {
        let msg;
        if (BCTdata.arousalAffectsErection) {
            msg = "Arousal can affect male erection.";
        } else {
            msg = "Arousal can't affect male erection.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showArousalProgressStatus() {
        let msg;
        if (BCTdata.arousalAffectsOrgasmProgress) {
            msg = "Arousal can affect orgasm progress.";
        } else {
            msg = "Arousal can't affect orgasm progress.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showBCIconsStatus() {
        let msg;
        if (BCTdata.allIconOnlyShowOnHover) {
            msg = "BC Icons are displayed only when the mouse hovers above you.";
        } else {
            msg = "BC Icons are always displayed.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showBCTChangelogStatus() {
        let msg;
        if (BCTdata.showChangelog) {
            msg = "BCT Changelog feature is enabled.";
        } else {
            msg = "BCT Changelog feature is disabled.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showBCTIconStatus() {
        let msg;
        if (BCTdata.bctIconOnlyShowOnHover) {
            msg = "BCT Icon is displayed only when the mouse hovers above you.";
        } else {
            msg = "BCT Icon is always displayed.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showBestFriendsStatus() {
        let msg;
        if (BCTdata.bestFriendsEnabled) {
            msg = "Best Friends feature is enabled.";
        } else {
            msg = "Best Friends feature is disabled.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showFriendlistSlotsStatus() {
        let msg;
        if (BCTdata.friendlistSlotsEnabled) {
            msg = "Extra infos in Friendlist.";
        } else {
            msg = "No extra infos in Friendlist.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showLockConversionStatus() {
        let msg;
        if (BCTdata.hsToBFLockconvert) {
            msg = "High security locks can become Best Friend locks.";
        } else {
            msg = "High security locks can't become Best Friend locks.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showRoomShareStatus() {
        let msg;
        if (BCTdata.bestFriendsRoomShare) {
            msg = "Best Friends can share private room names.";
        } else {
            msg = "Best Friends can't share private room names.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showSplitStatus() {
        let msg;
        if (BCTdata.splitOrgasmArousal) {
            msg = "Two bars for arousal and orgasm.";
        } else {
            msg = "Only the standard arousal + orgasm bar.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showTailWaggingStatus() {
        let msg;
        if (BCTdata.tailWaggingEnable) {
            msg = "Tail Wagging feature is enabled.";
        } else {
            msg = "Tail Wagging feature is disabled.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    //Buttons
    function OutButtons() 
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

    function SosButtons() {
       if (window.CurrentScreen == "ChatRoom") {
           DrawButton(955, 45, 45, 45, "FREE", "White", "", "");
       } else {
           DrawButton(0, 45, 45, 45, "FREE", "White", "", "Total Release");
       }
    }

    //EBCH Status
    function showEbchLogStatus() {
        let msg;
        if (EBCHdata[4] == 0) {
            msg = "Chatlogging is disabled.";
        } else {
            msg = "Chatlogging is enabled.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showEbchNotificationStatus() {
        let msg;
        if (EBCHdata[8] == 0) {
            msg = "Custom notifications are disabled.";
        } else {
            msg = "Custom notifications are enabled.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showEbchPoseStatus() {
        let msg;
        if (EBCHdata[6] == 0) {
            msg = "Pose menu is not automatically displayed.";
        } else {
            msg = "Pose menu is automatically displayed.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showEbchUngarbleStatus() {
        let msg;
        if (EBCHdata[2] == 0) {
            msg = "Messages are not ungarbled.";
        } else if (EBCHdata[2] == 1) {
            msg = "Messages from white list are ungarbled.";
        } else {
            msg = "All messages are ungarbled.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showEbchWelcomeStatus() {
        let msg;
        if (EBCHdata[20] == 0) {
            msg = "No EBCH Welcome message.";
        } else {
            msg = "EBCH Welcome message.";
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
            msg1 = "LSCG is enabled.";
        } else {
            msg1 = "LSCG is disabled.";
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
        if (LSCGdata.LeashingModule.enabled) {
            Leashing = "Leashing - ";
        } else {
            Leashing = "";
        }
        if (LSCGdata.MagicModule.enabled) {
            Magic = "Magic";
        } else {
            Magic = "";
        }
        msg = msg1 + " Features activated when LSCG is enabled: " + Activities + Collar + Chloroform + Drugs + Gagchoke + Handchoke + Hypnosis + Leashing + Magic
        M_MOANER_sendMessageToWearer(msg);
    }

    function showBoopReactionsStatus() {
        let msg;
        if (LSCGdata.BoopsModule.enabled) {
            msg = "Auto-react when booped.";
        } else {
            msg = "No auto-react when booped.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showCheckRollsStatus() {
        let msg;
        if (LSCGdata.GlobalModule.showCheckRolls) {
            msg = "Display of attacker/defender roll values with some activities.";
        } else {
            msg = "No display of attacker/defender roll values with some activities.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showCraftingStatus() {
        let msg;
        if (LSCGdata.GlobalModule.sharePublicCrafting) {
            msg1 = "Your public craftings are shared and can be used by other LSCG players in the chat room.";
        } else {
            msg1 = "Your public craftings are not shared.";
        }
        if (LSCGdata.GlobalModule.seeSharedCrafts) {
            msg2 = "Your shared public craftings are displayed.";
        } else {
            msg2 = "Your shared public craftings are not displayed.";
        }
        msg = msg1 + " " + msg2;
        M_MOANER_sendMessageToWearer(msg);
    }

    function showEdgeBlurStatus() {
        let msg;
        if (LSCGdata.GlobalModule.edgeBlur) {
            msg = "Blurring of the screen when you are on edge.";
        } else {
            msg = "No blurring of the screen when you are on edge.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showErectionStatus() {
        let msg;
        if (LSCGdata.GlobalModule.erectionDetection) {
            msg = "Private message when you feel an erection under your clothes.";
        } else {
            msg = "No private message when you feel an erection under your clothes.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showLipstickStatus() {
        let msg;
        if (LSCGdata.LipstickModule.enabled) {
            msg1 = "Other people can leave lipstick marks on your face or neck when kissing you.";
        } else {
            msg1 = "No lipstick mark on your face or neck when someone kisses you.";
        }
        if (LSCGdata.LipstickModule.dry) {
            msg2 = "No lipstick marks when you kiss someone.";
        } else {
            msg2 = "Lipstick marks possible when you kiss someone.";
        }
        msg = msg1 + " " + msg2;
        M_MOANER_sendMessageToWearer(msg);
    }

    function showOpacityStatus() {
        let msg;
        if (LSCGdata.OpacityModule.enabled) {
            msg1 = "Effects bypassing opacity are applied.";
        } else {
            msg1 = "Effects bypassing opacity are not applied.";
        }
        if (LSCGdata.OpacityModule.preventExternalMod) {
            msg2 = "Other players can change the opacity of your wardrobe items.";
        } else {
            msg2 = "Other players can't change the opacity of your wardrobe items.";
        }
        msg = msg1 + " " + msg2;
        M_MOANER_sendMessageToWearer(msg);
    }

    function showRestrainedSettingsStatus() {
        let msg;
        if (LSCGdata.GlobalModule.blockSettingsWhileRestrained) {
            msg = "LSCG settings can't be changed when you are restrained.";
        } else {
            msg = "LSCG settings can be changed when you are restrained.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showResizingStatus() {
        let msg;
        if (LSCGdata.GlobalModule.hideResizing) {
            msg = "LSCG resizing effects will not be displayed.";
        } else {
            msg = "LSCG resizing effects will be displayed.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    //MBS Status
    function showGarblingStatus() {
        let msg;
        if (MBSdata.AlternativeGarbling) {
            msg1 = "Alternative garbling enabled.";
        } else {
            msg1 = "Alternative garbling disabled.";
        }
        if (MBSdata.DropTrailing) {
            msg2 = "Reduction of trailing characters with heavy gags is enabled.";
        } else {
            msg2 = "Reduction of trailing characters with heavy gags is disabled."
        }
        if (MBSdata.GarblePerSyllable) {
            msg3 = "Garbling per syllable is enabled.";
        } else {
            msg3 = "Garbling per syllable is disabled.";
        }
        msg = msg1 + " " + msg2 + " " + msg3;
        M_MOANER_sendMessageToWearer(msg);
    }

    function showLockedMbsStatus() {
        let msg;
        if (MBSdata.LockedWhenRestrained) {
            msg = "MBS settings are locked when you are restrained.";
        } else {
            msg =  "You can always change MBS settings, even when you are restrained.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showLockedWheelStatus() {
        let msg;
        if (MBSdata.RollWhenRestrained) {
            msg = "You can always spin a wheel of fortune, even when you are restrained.";
        } else {
            msg =  "Wheel of fortune is locked when you are restrained.";
        }
        M_MOANER_sendMessageToWearer(msg);
    } 

    function showMbsCraftingStatus() {
        let msg;
        if (MBSdata.ExtendedCraftingDescription) {
            msg = "You can use up to 398 characters to describe your crafted items.";
        } else {
            msg =  "You are limited to 200 characters to describe your crafted items.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    //Preferences 
    function FBCsettings() {
       if (Player.FBCOtherAddons == undefined) {
            var gbc = 0;
            var sbc = 0;
        } else {
            str = Player.ExtensionSettings.FBC;
            d = LZString.decompressFromBase64(str);
            FBCdata = {};
            decoded = JSON.parse(d);
            FBCdata = decoded;
            if (FBCdata.antiGarble) {
                var gbc = 1;
                Player.RestrictionSettings.NoSpeechGarble = false;
                NogarbleOn = false;
                M_MOANER_saveControls();
            }
            if (FBCdata.autoStruggle) {
                var sbc = 1;
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
        let msg;
        if (RSPdata.GlobalModule.ResponsiveEnabled) {
            msg = "Responsive is enabled.";
        } else {
            msg = "Responsive is disabled.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showBcrResponsesStatus() {
        let msg;
        if (RSPdata.GlobalModule.responsesEnabled) {
            msg = "Responses feature is enabled.";
        } else {
            msg = "Responses feature is disabled.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showCharacterTalkStatus() {
        let msg;
        if (RSPdata.GlobalModule.CharTalkEnabled) {
            msg = "Character Talk is enabled.";
        } else {
            msg = "Character Talk is disabled.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showInterceptMessageStatus() {
        let msg;
        if (RSPdata.GlobalModule.doMessageInterruption) {
            msg = "Responses can interrupt and send messages.";
        } else {
            msg = "Responses can interrupt and send messages.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showLeaveMessageStatus() {
        let msg;
        if (RSPdata.GlobalModule.doLeaveMessage) {
            msg = "The message being written is sent when leashed out of the room.";
        } else {
            msg = "The message being written is not sent when leashed out of the room.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showMoansStatus() {
        let msg;
        if (RSPdata.GlobalModule.doAddMoansOnHighArousal) {
            msg = "Moans are added to responses when highly aroused.";
        } else {
            msg = "Moans are not added to responses when highly aroused.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showNewVersionStatus() {
        let msg;
        if (RSPdata.GlobalModule.doShowNewVersionMessage) {
            msg = "New Responsive Version feature is enabled.";
        } else {
            msg = "New Responsive Version feature is disabled.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showRulesStatus() {
        let msg;
        if (RSPdata.GlobalModule.doPreventMessageIfBcxBlock) {
            msg = "BCX rules can prevent message sending.";
        } else {
            msg = "BCX rules can't prevent message sending.";
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
    function showButtonsStatus() {
        let msg;
        if (SosbuttonsOn) {
            FREE = "FREE - ";
        } else {
            FREE = "";
        }
        if (OutbuttonsOn) {
            OUT = "OUT - ";
        } else {
            OUT = "";
        }
        if (RglbuttonsOn) {
            RGL = "RGL";
        } else {
            RGL = "";
        }
        msg = "Buttons activated and displayed: " + FREE + OUT + RGL;
        M_MOANER_sendMessageToWearer(msg);
    }

    function showExitmodeStatus() {
        let msg;
        if (SlowleaveOn) {
            msg = "Slow exit mode is activated.";
        } else {
            msg = "Fast exit mode is activated.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showFeaturesStatus() {
        let msg;
        if (AutojoinOn) {
            Autojoin = "Auto-Join - ";
        } else {
            Autojoin = "";
        }
	if (bgall) {
            Background = "All standard backgrounds usable with the buttons in Private Room (SP) - ";
        } else {
            Background = "";
        }
        if (FullseedOn) {
            Fullseed = "Full solution for intricate/hs locks - ";
        } else {
            Fullseed = "";
        }
        if (FrkeysOn) {
            Frkeys = "Hotkeys in friendlist - "
        } else {
            Frkeys = "";
        }
        if (HotkeysOn) {
            Hotkeys = "Hotkeys on numeric pad"
        } else {
            Hotkeys = "";
        }
        msg = "Features enabled: " + Autojoin + Background + Fullseed + Frkeys + Hotkeys;
        M_MOANER_sendMessageToWearer(msg);
    }

    function showHighfameStatus() {
        let msg;
        if (HighfameOn) {
            msg = "High fame mode enabled in Bondage Club Card Game.";
        } else {
            msg = "High fame mode disabled in Bondage Club Card Game.";
        }
        msg = msg + " Current high fame: " + cfame + ". Current default desk: " + cdesk + ".";
        M_MOANER_sendMessageToWearer(msg);
    }

    function showMagiccheatStatus() {
        let msg;
        if (MagiccheatOn) {
            msg = "Cheat mode enabled in B. Brawl and Magic School.";
        } else {
            msg = "Cheat mode disabled in B. Brawl and Magic School.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showMaptrapStatus() {
        let msg;
        if (MaptrapOn) {
            msg1 = "Traps in map rooms if you 'walk' on devices.";
        } else {
            msg1 = "No traps with devices in map rooms.";
        }
        if (MagiccheatOn) {
            msg2 = "Magic toys added under locked chastity for trap mode.";
        } else {
            msg2 = "No magic toys added under locked chastity for trap mode.";
        }
        msg = msg1 + " " + msg2;
        M_MOANER_sendMessageToWearer(msg);
    }
	
    function showNostruggleStatus() {
        let msg;
        if (NostruggleOn) {
            msg = "Automatic struggle in mini-games is enabled.";
        } else {
            msg = "Automatic struggle in mini-games is disabled.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showNotimeoutStatus() {
        let msg;
        if (NotimeoutOn) {
            msg = "Time-out disabled in TAB help.";
        } else {
            msg = "Time-out enabled in TAB help.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showNpcpunishStatus() {
        let msg;
        if (NPCpunish) {
            msg = "NPC punishments enabled.";
        } else {
            msg = "NPC punishments disabled.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showSearchRoomStatus() {
        let msg;
        msg1 = "Chat Search type: ";
        if (rtype == "ALL") msg2 = "All rooms. ";
        if (rtype == "Never") msg2 = "Normal rooms. ";
        if (rtype == "Hybrid") msg2 = "Hybrid rooms. ";
        if (rtype == "Always") msg2 = "Mapped rooms. ";
        msg3 = "Max players for normal/hybrid rooms: ";
        msg = msg1 + msg2 + msg3 + rsize + ".";
        M_MOANER_sendMessageToWearer(msg);
    }

    function showTalkStatus() {
        let msg;
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
        msg2 = "Forced stuttering level: " + st;
        msg3 = "Forced gag level: " + gl;
        if (NowhisperOn) {
            msg4 = "No-whisper mode enabled.";
        } else {
            msg4 = "No-whisper mode disabled.";
        }
        if (DolltalkOn) {
            msg5 = "Doll talk (and whisper) mode enabled.";
        } else {
            msg5 = "Doll talk (and whisper) mode disabled.";
        }
        if (NogarbleOn) {
            msg6 = "Ungarble with BC default talk mode.";
        } else {
            msg6 = "No ungarble with BC default talk mode.";
        }
        msg = msg1 + " - " + msg2 + " - " + msg3 + " - " + msg4 + " " + msg5 + " " + msg6;
        M_MOANER_sendMessageToWearer(msg);
    } 

    //Talking
    function IsDollTalk(text) {
        var nn = 0;
        var segmenter = new Intl.Segmenter([], {
            granularity: 'word'
        });
        var segmentedText = segmenter.segment(text);
        var words = [...segmentedText].filter(s => s.isWordLike).map(s => s.segment);
        var ln = words.length;
        if (ln > 5) {
            var nn = 1;
        }
        let i = 0;
        while (i < ln) {
            var lw = words[i].length;
            if (lw > 6) {
                var nn = 1;
            }
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
        let newText = "";
	const punctuation = ",.!?";
	for (const word of text.split(" ")) {
	    const rword = word.split("").reverse().join("");
	    let wordPunctuation = "";
	    if (punctuation.includes(rword[0])) {
		for (const c of rword.split("")) {
		    if (punctuation.includes(c)) wordPunctuation += c;
		}
		wordPunctuation = wordPunctuation.split("").reverse().join("");
	    }
	    newText += garbleWords[GarbleRandom(0, garbleWords.length-1)] + wordPunctuation + " ";
	}
	return newText.trim();
    }
	
    function RealGarblingLevel() {
        notalk = 0;
        ElementValue("InputChat", "");
        var bl = 0;
        if ((InventoryGet(Player, "ItemMouth") != null) && (InventoryGet(Player, "ItemMouth").Asset.Name == "RegressedMilk")) {
            gl = SpeechTransformGagGarbleIntensity(Player);
            if (gl < 1) {
                bl = 1;
            }
        }
        if ((InventoryGet(Player, "ItemMouth2") != null) && (InventoryGet(Player, "ItemMouth2").Asset.Name == "RegressedMilk")) {
            gl = SpeechTransformGagGarbleIntensity(Player);
            if (gl < 1) {
                bl = 1;
            }
        }
        if ((InventoryGet(Player, "ItemMouth3") != null) && (InventoryGet(Player, "ItemMouth3").Asset.Name == "RegressedMilk")) {
            gl = SpeechTransformGagGarbleIntensity(Player);
            if (gl < 1) {
                bl = 1;
            }
        }
        if (bl == 1) {
            if (this.BabyTalkOn == false || this.BabyTalkOn == undefined) {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in real baby talk mode.</p>"
                );
                GagTalkOn = false;
                BabyTalkOn = true;
                gl = -1;
                M_MOANER_saveControls();
            }
        } else {
            if (this.GagTalkOn == false || this.GagTalkOn == undefined) {
                BabyTalkOn = false;
            } else {
                GagTalkOn = false;
            }
            mb = 0;
            if (Player.ExtensionSettings.MBS != -1) {
                str = Player.ExtensionSettings.MBS;
                d = LZString.decompressFromUTF16(str);
                MBSdata = {};
                decoded = JSON.parse(d);
                MBSdata = decoded;
                if (MBSdata.AlternativeGarbling) {
                    mb = 1;
                }
            }
            if (mb == 1) {
                if (ChatRoomTargetMemberNumber == null) {
                    gl = 0;
                    mgl = SpeechTransformGagGarbleIntensity(Player);
                } else {
                    gl = SpeechTransformGagGarbleIntensity(Player);
                    mgl = gl;
                }
            } else {
                gl = SpeechTransformGagGarbleIntensity(Player);
                mgl = gl;
            }
            if (gl < 0) gl = 0;
            if (mgl < 0) mgl = 0;
            if (Player.ExtensionSettings.LSCG != null) {
                str = Player.ExtensionSettings.LSCG;
                d = LZString.decompressFromBase64(str);
                LSCGdata = {};
                decoded = JSON.parse(d);
                LSCGdata = decoded;
                if (LSCGdata.CollarModule.chokeLevel > 1) {
                    mgl = (LSCGdata.CollarModule.chokeLevel) * 2 + mgl;
                }
                if (LSCGdata.CollarModule.chokeLevel == 4) {
                    notalk = 1;
                }
                let states = LSCGdata.StateModule.states;
                var type = 'asleep';
                var config = states.find(s => s.type == type);
                if ((config != undefined) && (config.active == true)) {
                    notalk = 1;
                }
                var type = 'frozen';
                var config = states.find(s => s.type == type);
                if ((config != undefined) && (config.active == true)) {
                    notalk = 1;
                }
                var type = 'gagged';
                var config = states.find(s => s.type == type);
                if ((config != undefined) && (config.active == true)) {
                    notalk = 1;
                }
                var type = 'hypnotized';
                var config = states.find(s => s.type == type);
                if ((config != undefined) && (config.active == true)) {
                    notalk = 1;
                }
            }
            if (mgl == 0) {
                GagTalkOn = false;
                M_MOANER_saveControls();
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in normal talk mode.</p>"
                );
            } else {
                GagTalkOn = true;
                M_MOANER_saveControls();
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in real gag talk mode. Your current garbling level is " + mgl + ".</p>"
                );
                if (notalk == 1) {
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>Your very tight collar or a LSCG spell prevents you to talk.</p>"
                    );
                }
            }
        }
    }

    //Themed Status
    function showBCThemedStatus() {
        let msg;
        if (THMdata.GlobalModule.themedEnabled) {
            msg = "Themed is enabled.";
        } else {
            msg = "ThemedBC is disabled.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showCharacterAbsenceStatus() {
        let msg;
        if (THMdata.GlobalModule.doIndicateCharacterAbsence) {
            msg = "Absence's indicator is enabled.";
        } else {
            msg = "Absence's indicator is disabled.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showChatInputStatus() {
        let msg;
        if (THMdata.IntegrationModule.BC_Chat) {
            msg = "The chat input zone uses colors selected in Themed.";
        } else {
            msg =  "The chat input zone uses the default BC colors.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }
    
    function showFlatColorStatus() {
        let msg;
        if (THMdata.GlobalModule.doUseFlatColor) {
            msg = "Flat color enabled in settings.";
        } else {
            msg = "Coloring sheet enabled in settings.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showFriendListStatus() {
        let msg;
        if (THMdata.IntegrationModule.BC_FriendList) {
            msg = "The friend list uses colors selected in Themed.";
        } else {
            msg = "The friend list uses the default BC colors.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showGuiOverhaulStatus() {
        let msg;
        if (THMdata.GlobalModule.doVanillaGuiOverhaul) {
            msg = "The interface uses colors selected in Themed.";
        } else {
            msg = "The interface uses the default BC colors.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showInputZonesStatus() {
        let msg;
        if (THMdata.IntegrationModule.BC) {
            msg = "Misc input zones use colors selected in Themed.";
        } else {
            msg = "Misc input zones use the default BC colors.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showLocalTimeStatus() {
        let msg;
        if (THMdata.GlobalModule.doShowLocaleTime) {
            msg = "The time is displayed according your locale settings.";
        } else {
            msg = "The time is displayed according your system settings.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showMiscDetailsStatus() {
        let msg;
        if (THMdata.IntegrationModule.BC_Other) {
            msg = "Misc details use colors selected in Themed.";
        } else {
            msg = "Misc details use the default BC colors.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showThemedVersionStatus() {
        let msg;
        if (THMdata.GlobalModule.doShowNewVersionMessage) {
            msg = "New Themed Version feature is enabled.";
        } else {
            msg = "New Themed Version feature is disabled.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    //Traps
    function BondagebenchTrap() {
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
            ExtendedItemSetOptionByRecord(Player, Item, { typed: 4, }, { push: true, refresh: true, }); 
        }
        Target = "ItemVulva";
        Item = InventoryGet(Player, Target);
        if (Item.Asset.Name == "VibratingLatexPanties") {
            ExtendedItemSetOptionByRecord(Player, Item, { vibrating: 9, }, { push: true, refresh: true, });      
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
            ExtendedItemSetOptionByRecord(Player, Item, { vibrating: 9, }, { push: true, refresh: true, });      
        }
        Target = "ItemVulva";
        Item = InventoryGet(Player, Target);
        if (Item.Asset.Name == "ClitoralStimulator") {
            ExtendedItemSetOptionByRecord(Player, Item, { vibrating: 9, }, { push: true, refresh: true, });      
        }
        Target = "ItemMouth";
        Item = InventoryGet(Player, Target);
        if (Item.Asset.Name == "DildoPlugGag") {
            ExtendedItemSetOptionByRecord(Player, Item, { typed: 1, }, { push: true, refresh: true, });      
        }
        Target = "ItemDevices";
        Item = InventoryGet(Player, Target);
        if (Item.Asset.Name == "Kennel") {
            ExtendedItemSetOptionByRecord(Player, Item, { d: 1, p: 1, }, { push: true, refresh: true, });      
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
              ExtendedItemSetOptionByRecord(Player, Item, { vibrating: 9, }, { push: true, refresh: true, });      
        }
        Target = "ItemDevices";
        Item = InventoryGet(Player, Target);
        if (Item.Asset.Name == "Locker") {
            ExtendedItemSetOptionByRecord(Player, Item, { typed: 1, }, { push: true, refresh: true, }); 
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
            ExtendedItemSetOptionByRecord(Player, Item, { vibrating: 9, }, { push: true, refresh: true, });
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
            msg = "The moaner is active.";
        } else {
            msg = "The moaner is not active.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showM_MOANER_profileStatus() {
        let msg;
        if (profileName == "default") {
            msg = "No custom profile loaded.";
        } else {
            msg = "Current moans profile: " + profileName;
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showM_MOANER_orgasmStatus() {
        let msg;
        if (M_MOANER_orgasmActive) {
            msg = "The orgasm moan is active. You will moan while cumming.";
        } else {
            msg = "The orgasm moan is not active. You will not moan while cumming anymore.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showM_MOANER_spankStatus() {
        let msg;
        if (M_MOANER_spankActive) {
            msg = "The spank moan is active. You will moan while being spanked.";
        } else {
            msg = "The spank moan is not active. You will not moan while being spanked.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showM_MOANER_talkStatus() {
        let msg;
        if (M_MOANER_talkActive) {
            msg = "The talk moan is active. If you're vibed, you will moan while speaking.";
        } else {
            msg = "The talk moan is not active. If you're vibed, you will not moan while speaking anymore.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showM_MOANER_tickleStatus() {
        let msg;
        if (M_MOANER_tickleActive) {
            msg = "The tickle moan is active. You will moan while being tickled.";
        } else {
            msg = "The tickle moan is not active. You will not moan while being tickled.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showM_MOANER_vibratorStatus() {
        let msg;
        if (M_MOANER_vibratorActive) {
            msg = "The vibes moan is active. If your vibrator's settings change, you will moan.";
        } else {
            msg = "The vibes moan is not active. If your vibrator's settings change, you will not moan.";
        }
        M_MOANER_sendMessageToWearer(msg);
    }

    function showM_MOANER_xvibratorStatus() {
        let msg;
        if (M_MOANER_xvibratorActive) {
            msg = "The xvibes moan is active. If vibrator's settings of other players change, you will moan.";
        } else {
            msg = "The xvibes moan is not active. If vibrator's settings of other players change, you will not moan.";
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

    //MoanerReactions in chat
    var M_MOANER_orgasmMoans = [];
    var M_MOANER_factor4Moans = [];
    var M_MOANER_factor3Moans = [];
    var M_MOANER_factor2Moans = [];
    var factor1Moans = [];
    var PROPORTION_MAX = 40;

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
                var backupChatRoomTargetMemberNumber = -1;
                // not in whisper mode
                // initially not as /me
                // only in normal talk mode
                msg = ElementValue("InputChat");
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
                if (this.StutterOn == true) {
                    var moan2 = SpeechTransformStutter(moan, st);            
                } else {
                    var moan2 = moan;
                }
                ElementValue("InputChat", moan.replace(moan, moan2));
                mb = 0;
                if (Player.ExtensionSettings.MBS != null) {
                    str = Player.ExtensionSettings.MBS;
                    d = LZString.decompressFromUTF16(str);
                    MBSdata = {};
                    decoded = JSON.parse(d);
                    MBSdata = decoded;
                    if (MBSdata.AlternativeGarbling) {
                        mb = 1;
                    }
                }
                if (this.BabyTalkOn == true) {
                    var moan3 = SpeechTransformBabyTalk(moan2);
                } else if (this.GagTalkOn == true) {
                    if (mb == 1) {
                        var moan3 = moan2;
                    } else {
                        var moan3 = SpeechTransformGagGarble(moan2, gl);
                    }
                } else {
                    var moan3 = moan2;
                }
                ElementValue("InputChat", moan2.replace(moan2, moan3));
                if (notalk == 1) {
                    var moan4 = moan3;
                } else {   
                    if (gl != 0) {
                        var moan4 = moan3;
                    } else {
                        var moan4 = moan2;
                    } 
                }
                ElementValue("InputChat", moan3.replace(moan3, moan4));
                msg = "";
                ActivityChatRoomArousalSync(Player);
                if (M_MOANER_cum == false) {
                    ChatRoomSendChat();
                    M_MOANER_cum = true;
                    M_MOANER_saveControls();
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
                if (M_MOANER_xvibratorActive == true) {
                    var msg = ElementValue("InputChat");
                    reaction = 3;
                    M_MOANER_miscReactions(data);
                } else {
                    if ((metadata != undefined) || (metadata != null)) {
                        if ((metadata.TargetCharacter != undefined) || (metadata.TargetCharacter != null)) {
                            if (metadata.TargetCharacter.IsPlayer()) {
                                var msg = ElementValue("InputChat");
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
                lvibe = 0;
                str = Player.ExtensionSettings.LSCG;
                d = LZString.decompressFromBase64(str);
                LSCGdata = {};
                decoded = JSON.parse(d);
                LSCGdata = decoded;
                if ((data.Content.includes("SipItem")) || (data.Content.includes("LSCG_FunnelPour"))) {
                    lvibe = 1;
                }
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
                    var msg = ElementValue("InputChat");
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
                    var msg = ElementValue("InputChat");
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
            var msg = ElementValue("InputChat");
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
        var Factor = Math.floor(Player.ArousalSettings.Progress / 20);
        //get the moan type to apply
        //data to generate the moans
        if (reaction == 1) {
            var moan = getPainMoan(Factor, Math.random() * 300);
        }
        if (reaction == 2) {
            var moan = getTickleMoan(Factor, Math.random() * 300);
        }
        if (reaction == 3) {
            var moan = getMoan(Factor, true, Math.random() * 300);
        }
        var msg = ElementValue("InputChat");
        if (M_MOANER_isSimpleChat(msg)) {
            if (msg != "") {
                moan = msg + "... " + moan;
            }
        }
        let backtarget = ChatRoomTargetMemberNumber;
        ChatRoomTargetMemberNumber = -1;
        ElementValue("InputChat", moan);
        if (this.StutterOn == true) {
            var moan2 = SpeechTransformStutter(moan, st);
        } else {
            var moan2 = moan;
        }
        ElementValue("InputChat", moan.replace(moan, moan2));
        mb = 0;
        if (Player.ExtensionSettings.MBS != null) {
            str = Player.ExtensionSettings.MBS;
            d = LZString.decompressFromUTF16(str);
            MBSdata = {};
            decoded = JSON.parse(d);
            MBSdata = decoded;
            if (MBSdata.AlternativeGarbling) {
                mb = 1;
            }
        }
        if (this.BabyTalkOn == true) {
            var moan3 = SpeechTransformBabyTalk(moan2);
        } else if (this.GagTalkOn == true) {
            if (mb == 1) {
                var moan3 = moan2;
            } else {
                var moan3 = SpeechTransformGagGarble(moan2, gl);
            }
        } else {
            var moan3 = moan2;
        }
        ElementValue("InputChat", moan2.replace(moan2, moan3));
        if (notalk == 1) {
            var moan4 = moan3;
        } else {
            if (gl != 0) {
                var moan4 = moan3;
            } else {
                var moan4 = moan2;
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
            str = Player.ExtensionSettings.LSCG;
            d = LZString.decompressFromBase64(str);
            LSCGdata = {};
            decoded = JSON.parse(d);
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

    function getPainMoan(Factor, seed) {
        let gemissement;
        //according level of spanking fetichism
        let ID = 26;
        let Taste = Player.ArousalSettings.Activity.charCodeAt(ID) - 100;
        if (Taste == 0 || Taste == 10 || Taste == 20 || Taste == 30 || Taste == 40) activitySelf = 0;
        if (Taste == 1|| Taste == 11|| Taste == 21|| Taste == 31|| Taste == 41) activitySelf = 1;
        if (Taste == 2|| Taste == 12|| Taste == 22|| Taste == 32|| Taste == 42) activitySelf = 2;
        if (Taste == 3|| Taste == 13|| Taste == 23|| Taste == 33|| Taste == 43) activitySelf = 3;
        if (Taste == 4|| Taste == 14|| Taste == 24|| Taste == 34|| Taste == 44) activitySelf = 4;
        let seuilDouleur = Math.min(10, (4 - activitySelf) * 25);
        let seuilPlaisir = seuilDouleur + 40
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
        if (Taste == 1|| Taste == 11|| Taste == 21|| Taste == 31|| Taste == 41) activitySelf = 1;
        if (Taste == 2|| Taste == 12|| Taste == 22|| Taste == 32|| Taste == 42) activitySelf = 2;
        if (Taste == 3|| Taste == 13|| Taste == 23|| Taste == 33|| Taste == 43) activitySelf = 3;
        if (Taste == 4|| Taste == 14|| Taste == 24|| Taste == 34|| Taste == 44) activitySelf = 4;
        let seuilDouleur = Math.min(10, (4 - activitySelf) * 25);
        let seuilPlaisir = seuilDouleur + 40
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
        moanProfile = M_MOANER_getMoans(profileName);
        let index = Math.floor(Math.random() * moanProfile.pain.length);
        return moanProfile.pain[index];
    }

    function getPtickle() {
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
        if (Player.ExtensionSettings.LSCG != null) {
            str = Player.ExtensionSettings.LSCG;
            d = LZString.decompressFromBase64(str);
            LSCGdata = {};
            decoded = JSON.parse(d);
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
        Tag: 'atalk',
        Description: "(animal) (words): speaks once as a specified animal.",
        Action: (_, command, args) => {
            var [mode] = args;
            if (!mode) {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The atalk command must be followed by a number between 1 and 9 for the animal and the words you want to say.\n" +
		    "Note that it is recommended to use it only when you are not in a 'permanent' animal talk mode, forced with the <b> /ptalk </b> command, that will not be overrided.\n" +
                    " \n" +
                    "Available animals:\n" +
                    "1 bunny - 2 cow - 3 fox - 4 kitty - 5 mouse\n" +
                    "6 pig - 7 pony - 8 puppy - 9 wolfy</p>"
                );
            } else {
                if ((mode > 0) && (mode < 10)) {
                    var [, , ...message] = command.split(" ");
                    var msg = message?.join(" ");
                    var nm = 0;
                    if (DolltalkOn == true) {
                        if (IsDollTalk(msg) == false) {
                            var nm = 1;
                        } 
                        if (nm == 1) {
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Your message can't be sent because it does not respect the rules of doll talk.</p>"
                            );
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
                var beta1 = BCver.slice(0, 4);
                var beta2 = beta1.slice(-3);
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
        Tag: 'bg4',
        Description: "(screen) (background): selects a standard background for the Friend List, the Main Hall, the Private Room (SP) or the Timer Cell",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The bg4 command must be followed by two numbers:\n" +
                    " \n" +  
                    "- a number for the concerned screen:\n" +
                    "0 = Friend List - 1 = Main Hall\n" +
                    "2 = Private Room (SP) - 3 = Timer Cell\n" 
                    " \n" +  
                    "- a number between -1 and a maximum that can vary:\n" +
                    " \n" +
                    "If you don't use BCX: 0 to 164 for official BC backgrounds, 165 to 259 are added if you use the /bg1 command.\n" + 
                    " \n" + 
                    "If you don't use BCX: 0 to 164 for official BC backgrounds, 165 for 257 are added by BCX, 258 and 259 are added if you use the /bg1 command.\n" +
                    " \n" +
                    "Use -1 to go back to the default background.</p>"   
                );
            } else {
                var stringBg1 = args;
                var stringBg2 = stringBg1.split(/[ ,]+/);
                var screen = stringBg2[0];
                if ((screen > -1) && (screen < 4)) {
                    if (screen == 0) {
                        var frbg = stringBg2[1];
                        if ((frbg > -2) && (frbg < (BackgroundsList.length - 1))) {
                            if (frbg == -1) {
                                var frback = "BrickWall";
                            } else {
                                var frback = BackgroundsList[frbg].Name;  
                            }   
                            frname = frback;
                            M_MOANER_saveControls();  
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: The background of the Friend List is now: " + frname + ".</p>"   
                            );
                        }
                    }
                    if (screen == 1) {
                        var mhbg = stringBg2[1];
                        if ((mhbg > -2) && (mhbg < (BackgroundsList.length - 1))) {
                            if (mhbg == -1) {
                                var mhback = "MainHall";
                            } else {
                                var mhback = BackgroundsList[mhbg].Name;  
                            }   
                            Player.VisualSettings.MainHallBackground = mhback;              
                            ServerAccountUpdate.QueueData({
                                VisualSettings: Player.VisualSettings
                            });
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: The background of the Main Hall is now: " + mhback + ".</p>"   
                            );
                        }
                    }
                    if (screen == 2) {
                        var prbg = stringBg2[1];
                        if ((prbg > -2) && (prbg < (BackgroundsList.length - 1))) {
                            if (prbg == -1) {
                                var prback = "Private";
                            } else {
                                var prback = BackgroundsList[prbg].Name;  
                            }   
                            Player.VisualSettings.PrivateRoomBackground = prback; 
                            PrivateBackground = prback;           
                            ServerAccountUpdate.QueueData({
                                VisualSettings: Player.VisualSettings
                            });
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: The background of your Private Room (SP) is now: " + prback + ".</p>"   
                            );
                        }
                    }
		    if (screen == 3) {
                        var tcbg = stringBg2[1];
                        if ((tcbg > -2) && (tcbg < (BackgroundsList.length - 1))) {
                            if (tcbg == -1) {
                                var tcback = "Cell";
                            } else {
                                var tcback = BackgroundsList[tcbg].Name;  
                            }   
                            tcname = tcback;
                            M_MOANER_saveControls();  
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: The background of the Timer Cell is now: " + tcname + ".</p>"   
                            );
                        }
                    }
                }
            }
        }
    }]) 

    CommandCombine([{
        Tag: 'bglist',
        Description:": displays list of all available standard backgrounds",
        Action: () => {
            for (let i = 0; i < BackgroundsList.length ; i++)
                ChatRoomSendLocal(i + " - " + BackgroundsList[i].Name);       
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
                var text = args;
                var nm = 0;
                if (DolltalkOn == true) { 
                    if (IsDollTalk(text) == false) {
                        var nm = 1;
                    }   
                    if (nm == 1) {
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Your message can't be sent because it does not respect the rules of doll talk.</p>"
                        );
                    }
                } 
                if (nm == 0) {
                    text2 = SpeechTransformBabyTalk(text);
                    ElementValue("InputChat", text2);
		    if (this.StutterOn == true) {
                        var text3 = SpeechTransformStutter(text2, st);             
                    } else {
                        var text3 = text2;
                    }
                    ElementValue("InputChat", text2.replace(text2, text3));
                    if (M_MOANER_talkActive && M_MOANER_scriptOn && IsStimulated(Player)) {
                         var text4 = M_MOANER_applyMoanToMsg(Player, text3);
                    } else {
                         var text4 = text3;
                    }
                    ElementValue("InputChat", text3.replace(text3, text4));
                    event.preventDefault();
                    ChatRoomSendChatMessage(text4);
                }                 
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
                    if ((target[0].OnlineSharedSettings.Uwall) &&
                        (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
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
                                targetNumber = ChatRoomTargetMemberNumber;
                                ChatRoomSendWhisper(targetNumber, msg);
                            } else {
                                ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: " + ChatRoomHTMLEntities(tgpname) + " does not have normal diapers!</p>"
                                );
                            }
                            ChatRoomSetTarget(-1);
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
                                targetNumber = ChatRoomTargetMemberNumber;
                                ChatRoomSendWhisper(targetNumber, msg);
                            } else {
                                ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: " + ChatRoomHTMLEntities(tgpname) + " does not have chastity diapers!</p>"
                                );
                            }
                            ChatRoomSetTarget(-1);
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
                                    targetNumber = ChatRoomTargetMemberNumber;
                                    ChatRoomSendWhisper(targetNumber, msg);
                                } else {
                                    ChatRoomSendLocal(
                                        "<p style='background-color:#5fbd7a'>ULTRAbc: " + ChatRoomHTMLEntities(tgpname) + " does not have two layers of diapers!</p>"

                                    );
                                }
                                ChatRoomSetTarget(-1);
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
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The gtalk command must be followed by a number between 0 and 9, then the words you want to say.\n" +
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
                    "8 very heavy gag talk\n" +
                    "9 total gag talk</p>"
                );
            } else {
                var stringGag1 = args;
                var stringGag2 = stringGag1.split(/[ ,]+/);
                var gaglevel = stringGag2[0];
                var nt = 0;
                if ((gaglevel > -1) && (gaglevel < 10)) {
                    if (gaglevel == 0) {
                        if (Player.ExtensionSettings.MBS != null) {
                            str = Player.ExtensionSettings.MBS;
                            d = LZString.decompressFromUTF16(str);
                            MBSdata = {};
                            decoded = JSON.parse(d);
                            MBSdata = decoded;
                            if (MBSdata.AlternativeGarbling) {
                                onegl = 0;
                                mgl = SpeechTransformGagGarbleIntensity(Player);
                            } else {
                                ongl = SpeechTransformGagGarbleIntensity(Player);
                                mgl = onegl;
                            }
                        } else {
                            onegl = SpeechTransformGagGarbleIntensity(Player);
                            mgl = onegl;
                        }
                        if (Player.ExtensionSettings.LSCG != null) {
                            str = Player.ExtensionSettings.LSCG;
                            d = LZString.decompressFromBase64(str);
                            LSCGdata = {};
                            decoded = JSON.parse(d);
                            LSCGdata = decoded;
                            if (LSCGdata.CollarModule.chokeLevel > 1) {
                                onegl = (LSCGdata.CollarModule.chokeLevel) * 2 + onegl;
                            }
                            if (LSCGdata.CollarModule.chokeLevel == 4) {
                                nt = 1;
                            }
                            let states = LSCGdata.StateModule.states;
                            var type = 'asleep';
                            var config = states.find(s => s.type == type);
                            if ((config != undefined) && (config.active == true)) {
                                nt = 1;
                            }
                            var type = 'frozen';
                            var config = states.find(s => s.type == type);
                            if ((config != undefined) && (config.active == true)) {
                                nt = 1;
                            }
                            var type = 'gagged';
                            var config = states.find(s => s.type == type);
                            if ((config != undefined) && (config.active == true)) {
                                nt = 1;
                            }
                            var type = 'hypnotized';
                            var config = states.find(s => s.type == type);
                            if ((config != undefined) && (config.active == true)) {
                                nt = 1;
                            }
                        }
                    } else {
                        if (gaglevel == 9) {
                            onegl = 10;
                        } else {
                            onegl = gaglevel;
                        }
                    }
                    var nm = 0;
                    if (DolltalkOn == true) {
                        var text = args.substring(2).trim();
                        if (IsDollTalk(text) == false) {
                            var nm = 1;
                        }
                        if (nm == 1) {
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Your message can't be sent because it does not respect the rules of doll talk.</p>"
                            );
                        }
                    }
                    if (nm == 0) {
                        content = SpeechTransformGagGarble(args.substring(2).trim(), onegl);
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
                    if ((target[0].OnlineSharedSettings.Uwall) &&
                        (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
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
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: To use the invisible command on yourself, you need first to allow Scripts in BC settings.<p>"
                    );
                } else {
                    if (Invisible == undefined) {
                        var message = "Magical lasers make " + tmpname + " completely invisible."
                    } else {
                        if (Invisible != "") {
                            if (Invisible.startsWith("\u0027")) {
                                var message = tmpname + Invisible;
                            } else {
                                var message = tmpname + ' '.repeat(1) + Invisible;
                            }
                        } else {
                            var message = "Magical lasers make " + tmpname + " completely invisible."
                        }
                    }
                    if (Invisible != "no message") {
                        ServerSend("ChatRoomChat", {
                            Content: "Beep",
                            Type: "Action",
                            Dictionary: [{
                                Tag: "Beep",
                                Text: message
                            }]
                        });
                    }
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
                    if (target[0].OnlineSharedSettings.ScriptPermissions.Hide.permission == 0) {
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: To use the invisible command on other players, they need first to allow Scripts in BC settings.<p>"
                        );
                    } else {
                        if ((target[0].OnlineSharedSettings.Uwall) &&
                            (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                            );
                        } else {
                            if (Tinvisible == undefined) {
                                var message = "Magical lasers make " + tgpname + " completely invisible."
                            } else {
                                if (Tinvisible != "") {
                                    if (Tinvisible.startsWith("\u0027")) {
                                        var message = tmpname + Tinvisible + ' '.repeat(1) + tgpname;
                                    } else {
                                        var message = tmpname + ' '.repeat(1) + Tinvisible + ' '.repeat(1) + tgpname;
                                    }
                                } else {
                                    var message = "Magical lasers make " + tgpname + " completely invisible."
                                }
                            }
                            if (Tinvisible != "no message") {
                                ServerSend("ChatRoomChat", {
                                    Content: "Beep",
                                    Type: "Action",
                                    Dictionary: [{
                                        Tag: "Beep",
                                        Text: message
                                    }]
                                });
                            }
                            InventoryWear(target[0], "Script", "ItemScript");
                            InventoryGet(target[0], "ItemScript").Property = {
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
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The itemcolor1 command must be followed by a color code in the format #000000 and optionally a target.</p>"
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
                        if ((target[0].OnlineSharedSettings.Uwall) &&
                            (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
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
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The itemcolor2 command needs to be followed by a color code in the format #000000to change the color of a worn item in a slot selected by mouse click.</p>"
                );
            } else {
                var color = args;
                if (color.startsWith("#")) {     
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: You have 5 seconds to click on yourself. If successful, the color of the worn item in selected slot will be changed. If not, retry.</p>"
                    );
                    setTimeout(function() {
                        if ((CurrentCharacter != null) && (CurrentCharacter == Player)) {
                            if (CurrentCharacter.FocusGroup.Name) { 
                                var Target = CurrentCharacter.FocusGroup.Name;
                                if (InventoryGet(Player, Target) != null) {
                                    ChatRoomSendLocal("AssetGroup = " + Target); 
                                    InventoryGet(Player, Target).Color = color;
                                    DialogLeave();
                                    ChatRoomCharacterUpdate(Player); 
                                    ChatRoomSendLocal(
                                        "<p style='background-color:#5fbd7a'>ULTRAbc: Item color changed.</p>"
                                    );
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
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The itempriority command needs to be followed by a number (between -99 and 99) to change the priority of a worn item in a slot selected by mouse click.</p>"
                );
            } else {
                var priority = args * 1;
                if (priority > 99) priority = 99;
                if (priority < -99) priority = -99;        
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: You have 5 seconds to click on yourself. If successful, the priority of the worn item in selected slot will be changed. If not, retry.</p>"
                );
                setTimeout(function() {
                    if ((CurrentCharacter != null) && (CurrentCharacter == Player)) {
                        if (CurrentCharacter.FocusGroup.Name) { 
                            var Target = CurrentCharacter.FocusGroup.Name;
                            if (InventoryGet(Player, Target) != null) {
                                ChatRoomSendLocal("AssetGroup = " + Target); 
                                var ak = 0;
                                if (InventoryGet(Player, Target).Asset.Archetype != undefined) {  
                                    Archetype = InventoryGet(Player, Target).Asset.Archetype; 
                                    if (Archetype == "typed") var ak = 1;
                                    if (Archetype == "modular") var ak = 2;
                                }                                                    
                                Property = InventoryGet(Player, Target).Property;
                                if (ak < 2) {
                                    if (Property == undefined){                           
                                        Property = {};
                                        OverridePriority = {};
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
                                ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ULTRAbc: Item priority changed.</p>"
                                );
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
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The keydeposit command must be followed by a number higher than 0.</p>"
                );
            } else {
                var hours = args;
                if (hours > 0) {
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
        Tag: 'layerset1',
        Description: "(layernumber) (colorcode) changes a layer color for worn item in saved Item Slot",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>First use the <b>/layershow1</b> command to click on worn item, get useful info about layer colors and save Item Slot.\n" +
                    "The layerset1 command must be followed by an layer number (-1 for all layers) and a color code in the format #000000 for the worn item in the previously saved Item Slot.</p>"
                );
            } else {
                var stringLys1 = args;
                var stringLys2 = stringLys1.split(/[ ,]+/);
                var layer = stringLys2[0];
                var color = stringLys2[1]; 
                if (this.saveditemslot == undefined) {
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'><b>Warning</b>: First use the <b>/layershow1</b> command to get useful info and save Item Slot.</p>"
                    );
                } else {
                    var Target = this.saveditemslot.slice(0);
                    if ((InventoryGet(Player, Target) != null) && (color.startsWith("#"))) {
                        var ak = 0;                      
                        if (InventoryGet(Player, Target).Asset.Archetype != undefined) {  
                            Archetype = InventoryGet(Player, Target).Asset.Archetype; 
                            if (Archetype == "typed") var ak = 1;
                            if (Archetype == "modular") var ak = 2;
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
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Layer color changed.</p>"
                        );
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
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><First use the <b>/layershow2</b> command to click on worn item, get useful info about layer priorities and save Item Slot.\n" +
                    "The layerset2 command must be followed by a layer number and a priority number (between -99 and 99) for the worn item in the previously saved Item Slot.</p>"
                );
            } else {
                var stringLys3 = args;
                var stringLys4 = stringLys3.split(/[ ,]+/);
                var layer = stringLys4[0];
                var priority = stringLys4[1] * 1;
                if (priority > 99) priority = 99;
                if (priority < -99) priority = -99;
                if (this.saveditemslot == undefined) {
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'><b>Warning</b>: First use the <b>/layershow2</b> command to get useful info and save Item Slot.</p>"
                    );
                } else {
                    var Target = this.saveditemslot.slice(0);
                    if (InventoryGet(Player, Target) != null) {
                        var ak = 0;                      
                        if (InventoryGet(Player, Target).Asset.Archetype != undefined) {  
                            Archetype = InventoryGet(Player, Target).Asset.Archetype; 
                            if (Archetype == "typed") var ak = 1;
                            if (Archetype == "modular") var ak = 2;
                        }
                        Asset.Layer = InventoryGet(Player, Target).Asset.Layer;
                        Property = InventoryGet(Player, Target).Property;                    
                        if (ak == 0) {
                            if (layer == 0) { 
                                Name = InventoryGet(Player, Target).Asset.Name;                                 
                            } else {
                                 Name = Asset.Layer[layer].Name;
                            }
                            if ((Property == undefined) || (Property.OverridePriority == undefined)) {                           
                                 Property = {};
                                 OverridePriority = {};
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
                            if (Property.OverridePriority == undefined){                           
                                 OverridePriority = {};
                                 OverridePriority[Name] = priority;
                                 Property.OverridePriority = OverridePriority; 
                            } else {
                                 Property.OverridePriority[Name] = priority;
                            }
                        }
                        if (ak == 2) {
                            Name1 = InventoryGet(Player, Target).Asset.Layer[layer].ColorGroup;
                            Name2 = InventoryGet(Player, Target).Asset.Layer[layer].Name;
                            InventoryGet(Player, Target).Property.OverridePriority[Name2] = priority;
                        }
                        ChatRoomCharacterUpdate(Player);
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Layer priority changed.</p>"
                        );
                    }
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'layershow1',
        Description: "gives info about layer colors of a specific worn item + saves Item Slot",
        Action: () => {
            ChatRoomSendLocal(
                "<p style='background-color:#5fbd7a'>ULTRAbc: You have 5 seconds to click on yourself. If successful, you will get infos and the Item Slot will be saved. If not, retry.</p>"
            );
            setTimeout(function() {
                if ((CurrentCharacter != null) && (CurrentCharacter == Player)) {
                    if (CurrentCharacter.FocusGroup.Name) { 
                        var Target = CurrentCharacter.FocusGroup.Name;                   
                        if (InventoryGet(Player, Target) != null) {   
                            ChatRoomSendLocal("AssetGroup = " + Target);                           
                            Asset.Layer = InventoryGet(Player, Target).Asset.Layer;
                            var ak = 0;                      
                            if (InventoryGet(Player, Target).Asset.Archetype != undefined) {  
                                Archetype = InventoryGet(Player, Target).Asset.Archetype; 
                                if (Archetype == "typed") var ak = 1;
                                if (Archetype == "modular") var ak = 2;
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
                                        Color2 =  InventoryGet(Player, Target).Color[ly];                                             
                                    } else {
                                        Color2 = "No way to change color"; 
                                    }                                                                                                              
                                    ChatRoomSendLocal("Layer " + ly  + " = " + Name + " - " + Color2);
                                    ly++; 
                                }
                            }
                            if (ak == 2) {
                                let ly = 0;
                                while (ly < Asset.Layer.length) {
                                    //if (InventoryGet(Player, Target).Asset.Layer[ly].ColorGroup != null) {
                                        Name1 = InventoryGet(Player, Target).Asset.Layer[ly].ColorGroup;
                                        Name2 = Asset.Layer[ly].Name;
                                        Index = InventoryGet(Player, Target).Asset.Layer[ly].ColorIndex;
                                        Color2 = InventoryGet(Player, Target).Color[Index];
                                        ChatRoomSendLocal("Layer " + ly  + " = " + Name1 + " - " + Name2 + " - " + Color2);  
                                    //}
                                    ly++;
                                } 
                            }
                            this.saveditemslot = Target;      
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Item Slot saved.</p>"
                            );
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
            ChatRoomSendLocal(
                "<p style='background-color:#5fbd7a'>ULTRAbc: You have 5 seconds to click on yourself. If successful, you will get infos and the Item Slot will be saved. If not, retry.</p>"
            );
            setTimeout(function() {
                if ((CurrentCharacter != null) && (CurrentCharacter == Player)) {
                    if (CurrentCharacter.FocusGroup.Name) { 
                        var Target = CurrentCharacter.FocusGroup.Name;
                        if (InventoryGet(Player, Target) != null) {
                            ChatRoomSendLocal("AssetGroup = " + Target); 
                            var ak = 0;
                            if (InventoryGet(Player, Target).Asset.Archetype != undefined) {  
                                Archetype = InventoryGet(Player, Target).Asset.Archetype; 
                                if (Archetype == "typed") var ak = 1;
                                if (Archetype == "modular") var ak = 2;
                            }                      
                            Asset.Layer = InventoryGet(Player, Target).Asset.Layer;
                            Property = InventoryGet(Player, Target).Property;                                                   
                            if (ak == 0) {  
                                Priority = InventoryGet(Player, Target).Asset.Group.DrawingPriority;                         
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
                                        layerPriority = Property.OverridePriority[Name];     
                                        if (layerPriority == null) {                              
                                            Priority2 = Priority;
                                        } else {
                                            Priority2 = layerPriority;                                        
                                        }
                                    }
                                    ChatRoomSendLocal("Layer " + ly  + " = " + Name + " - " + Priority2);  
                                    ly++; 
                                }                        
                            }                        
                            if (ak == 1) {
                                Priority = InventoryGet(Player, Target).Asset.Group.DrawingPriority;
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
                                        layerPriority = Property.OverridePriority?.[Name] ?? Priority;              
                                        if (layerPriority == null) {
                                            Priority2 = InventoryGet(Player, Target).Asset.Layer[ly].Priority;
                                        } else {
                                            Priority2 = layerPriority;
                                        }
                                    }
                                    ChatRoomSendLocal("Layer " + ly  + " = " + Name + " - " + Priority2);  
                                    ly++; 
                                }
                            }
                            if (ak == 2) {
                                let ly = 0;
                                while (ly < Asset.Layer.length) {
                                    //if (InventoryGet(Player, Target).Asset.Layer[ly].ColorGroup != null) {
                                        Name1 = InventoryGet(Player, Target).Asset.Layer[ly].ColorGroup;
                                        Name2 = Asset.Layer[ly].Name;
                                        Priority = Asset.Layer[ly].Priority;
                                        layerPriority = Property.OverridePriority?.[Name2] ?? Priority;       
                                        if (layerPriority == null) {
                                            Priority2 = Priority;
                                        } else {
                                            Priority2 = layerPriority;
                                        }
                                        ChatRoomSendLocal("Layer " + ly  + " = " + Name1 + " - " + Name2 + " - " + Priority2);  
                                    //}
                                    ly++;
                                }
                            } 
                            this.saveditemslot = Target;
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Item Slot saved.</p>"     
                            );
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
                        if ((target[0].OnlineSharedSettings.Uwall) &&
                            (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
                            var uw = 1;
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                            );
                        } else {
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
                ChatRoomSetTarget(-1);
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
                        "<p style='background-color:#5fbd7a'>ULTRAbc: You don't have entered the map.</p>"
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
                    "<p style='background-color:#5fbd7a'>ULTRAbc: This room does not use the map feature. Better use the <b>/uroom</b> command.</p>"
                );
            } else {
                let pl = 0;
                while (pl < ChatRoomCharacter.length) {
                    if ((ChatRoomCharacter[pl].Nickname == '') || (ChatRoomCharacter[pl].Nickname == undefined)) {
                        var name = ChatRoomCharacter[pl].Name;
                        var aka = "";
                    } else {
                        var name = ChatRoomCharacter[pl].Nickname;
                        var aka = ChatRoomCharacter[pl].Name;
                    }
                    var number = ChatRoomCharacter[pl].MemberNumber;
                    ChatRoomSendLocal(name + " (" + aka + ") - " + number);
                    if (ChatRoomCharacter[pl].OnlineSharedSettings.UBC == undefined) {
                        var ubc1 = "Does not use ULTRAbc.";
                    } else {
                        if ((ChatRoomCharacter[pl].OnlineSharedSettings.UBC == UBCver) || (ChatRoomCharacter[pl].OnlineSharedSettings.UBC == UBCver0))  {
                            var ubc1 = "Is an ULTRAbc user."; 
                        } else {         
                            var ubc1 = "Does not use ULTRAbc";
                        } 
                    }
                    if (ChatRoomCharacter[pl].OnlineSharedSettings.Uwall == undefined) {
                        var ubc2 = "Does not use Uwall.";
                    } else {
                        if (ChatRoomCharacter[pl].OnlineSharedSettings.Uwall == true) {
                            var ubc2 = "Has enabled Uwall.";
                        } else {
                            var ubc2 = "Has disabled Uwall.";
                        }
                    }
                    ChatRoomSendLocal(ubc1 + " - " + ubc2);
                    if (ChatRoomCharacter[pl].MapData != undefined) {
                        if (ChatRoomData.MapData.Type == "Always") {
                            var exinfo = "Real presence in map: YES";
                        }
                        if (ChatRoomData.MapData.Type == "Hybrid") {
                            if (ChatRoomCharacter[pl].OnlineSharedSettings.Inmap != undefined) {
                                if (ChatRoomCharacter[pl].OnlineSharedSettings.Inmap == true) {
                                    var exinfo = "Real presence in map: YES";
                                } else {
                                    var exinfo = "Real presence in map: NO";
                                }
                            } else {
                                var exinfo = "Real presence in map: ?";
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
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: No traps with devices in map rooms.</p>"
                );
            } else {
                MaptrapOn = true;
                M_MOANER_saveControls();
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: Traps in map rooms if you 'walk' on devices.</p>"
                );
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
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'>ULTRAbc: This room does not use the map feature.</p>"
                );
            } else {
                if (args === "") {
                    if (Player.MapData != undefined) {
                        if (ChatRoomData.MapData.Type == "Always") {
                            var exinfo = "Real presence in map: YES";
                        }
                        if (ChatRoomData.MapData.Type == "Hybrid") {
                            if (Player.OnlineSharedSettings.Inmap != undefined) {
                                if (Player.OnlineSharedSettings.Inmap == true) {
                                    var exinfo = "Real presence in map: YES";
                                } else {
                                    var exinfo = "Real presence in map: NO";
                                }
                            } else {
                                var exinfo = "Real presence in map: ?";
                            }
                        }
                        ChatRoomSendLocal("X = " + Player.MapData.Pos.X + " - Y = " + Player.MapData.Pos.Y + " - " + exinfo);
                        ChatRoomSendLocal(" ");
                    } else {
                        ChatRoomSendLocal("Does not have entered map");
                        ChatRoomSendLocal(" ");
                    }
                } else {
                    var targetname = args;
                    var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
                    if (target[0] == null) {
                        var targetnumber = parseInt(targetname);
                        target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
                    }
                    if (target[0] != null) {
                        if (target[0].MapData != undefined) {
                            if (ChatRoomData.MapData.Type == "Always") {
                                var exinfo = "Real presence in map: YES";
                            }
                            if (ChatRoomData.MapData.Type == "Hybrid") {
                                if (target[0].OnlineSharedSettings.Inmap != undefined) {
                                    if (target[0].OnlineSharedSettings.Inmap == true) {
                                        var exinfo = "Real presence in map: YES";
                                    } else {
                                        var exinfo = "Real presence in map: NO";
                                    }
                                } else {
                                    var exinfo = "Real presence in map: ?";
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
                    var aka = ChatRoomCharacter[pl].Name;
                }
                var number = ChatRoomCharacter[pl].MemberNumber;
                ChatRoomSendLocal(name + " (" + aka + ") - " + number);
                if (ChatRoomCharacter[pl].OnlineSharedSettings.UBC == undefined) {
                    var ubc1 = "Does not use ULTRAbc.";
                } else {
                    if ((ChatRoomCharacter[pl].OnlineSharedSettings.UBC == UBCver) || (ChatRoomCharacter[pl].OnlineSharedSettings.UBC == UBCver0))  {
                        var ubc1 = "Is an ULTRAbc user."; 
                    } else {         
                        var ubc1 = "Does not use ULTRAbc";
                    }
                }
                if (ChatRoomCharacter[pl].OnlineSharedSettings.Uwall == undefined) {
                    var ubc2 = "Does not use Uwall.";
                } else {
                    if (ChatRoomCharacter[pl].OnlineSharedSettings.Uwall == true) {
                        var ubc2 = "Has enabled Uwall.";
                    } else {
                        var ubc2 = "Has disabled Uwall.";
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
                        var mes1 = "Has a MBS wheel of fortune.";
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
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The message command must be followed by a command and the message you want instead of the default message.\n" +
                    "Options on yourself: clothes, invisible, lock, naked, pet, randomize, restrain, solidity, totalrelease, underwear, unlock, untie, visible\n" +
                    "Options on other players: tclothes, tinvisible, tlock, tnaked, tpet, trandomize, trestrain, tsolidity, ttotalrelease, tunderwear, tunlock, tuntie, tvisible\n" +
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
                    if ((option.startsWith("t")) && (option != "totalrelease")) {
                        var option2 = option.slice(1);
                    }
                    var msg1 = "<p style='background-color:#5fbd7a'>ULTRAbc: Silent mode saved for " + option + " command on yourself.</p>";
                    var msg2 = "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for " + option + " command on yourself.</p>"
                    var msg3 = "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for " + option + " command on yourself.</p>"
                    var msg4 = "<p style='background-color:#5fbd7a'>ULTRAbc: Silent mode saved for " + option2 + " command on other players.</p>";
                    var msg5 = "<p style='background-color:#5fbd7a'>ULTRAbc: Back to default message for " + option2 + " command on other players.</p>";
                    var msg6 = "<p style='background-color:#5fbd7a'>ULTRAbc: New message saved for " + option2 + " command on other players.</p>";
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
                    if ((target[0].OnlineSharedSettings.Uwall) &&
                        (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
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
                ChatRoomSetTarget(-1);
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
                            if ((CurrentCharacter.OnlineSharedSettings.Uwall == true) &&
                                (!(CurrentCharacter.OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
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
                            if ((CurrentCharacter.OnlineSharedSettings.Uwall == true) &&
                                (!(CurrentCharacter.OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
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
                            if ((CurrentCharacter.OnlineSharedSettings.Uwall == true) &&
                                (!(CurrentCharacter.OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
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
                            if ((CurrentCharacter.OnlineSharedSettings.Uwall == true) &&
                                (!(CurrentCharacter.OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
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
                            if ((CurrentCharacter.OnlineSharedSettings.Uwall == true) &&
                                (!(CurrentCharacter.OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
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
                            if ((CurrentCharacter.OnlineSharedSettings.Uwall == true) &&
                                (!(CurrentCharacter.OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
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
                if ((target[0] != null) && (target[0].AllowItem == true) && (target[0].OnlineSharedSettings.UBC != undefined)) {
                    if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
                        tgpname = target[0].Name;
                    } else {
                        tgpname = target[0].Nickname;
                    }
                    if ((target[0].OnlineSharedSettings.Uwall) &&
                        (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
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
                ChatRoomSetTarget(-1);
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
                    "If WCE is enabled, use <b>/pose baseupper</b> only on yourself when /pose2 reset fails.</p>"
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
                            "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: To leave this position, use first /pose2 jump, then /pose2 reset (or /pose baseupper if WCE enabled).</p>"
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
                        if ((target[0].OnlineSharedSettings.Uwall) &&
                            (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
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
                ChatRoomSetTarget(-1);
            }
        }
    }])

    CommandCombine([{
        Tag: 'prison',
        Description: "(minutes): stays in Pandora prison.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The prison command must be followed by a number higher than 0.</p>"
                );
            } else {
                var minutes = args;
                if (minutes > 0) {
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
            }
        }
    }])

    CommandCombine([{
        Tag: 'ptalk',
        Description: "(animal): forces a specific animal talk mode",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The ptalk command must be followed by a number between 0 and 9.\n" +
                    "Note about whispers in animal talk mode: you need to click on the character OR set the target with <b>/whisper</b> without words OR use the FBC/WCE <b>/w</b> command.\n" + 
                    " \n" +
                    "Available animals:\n" +        
                    "0 human talk\n" +                 
                    "1 bunny - 2 cow - 3 fox - 4 kitty - 5 mouse\n" +
                    "6 pig - 7 pony - 8 puppy - 9 wolfy</p>"
                );
            } else {
                var pmode = args * 1;
                if ((pmode > -1) && (pmode < 10)) {
                    AnimalTalk1On = false;
                    AnimalTalk2On = false;
                    AnimalTalk3On = false;
                    AnimalTalk4On = false;
                    AnimalTalk5On = false;
                    AnimalTalk6On = false;
                    AnimalTalk7On = false;
                    AnimalTalk8On = false;
		    AnimalTalk9On = false;
                    animal = pmode;
                    M_MOANER_saveControls();
                }
                if (pmode == 0) {
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in human talk mode.</p>"
                    );
                } else if (pmode == 1) {
                    AnimalTalk1On = true;         
                    animal = pmode;
                    M_MOANER_saveControls();
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in bunny talk mode.</p>"
                    );
                } else if (pmode == 2) {
                    AnimalTalk2On = true;
                    animal = pmode;
                    M_MOANER_saveControls();
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in cow talk mode.</p>"
                    );
                } else if (pmode == 3) {
                    AnimalTalk3On = true;         
                    animal = pmode;
                    M_MOANER_saveControls();
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in fox talk mode.</p>"
                    );
                } else if (pmode == 4) {                
                    AnimalTalk4On = true;
                    animal = pmode;
                    M_MOANER_saveControls();
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in kitty talk mode.</p>"
                    );
                } else if (pmode == 5) {
                    AnimalTalk5On = true;      
                    animal = pmode;
                    M_MOANER_saveControls();
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in mouse talk mode.</p>"
                    );
                } else if (pmode == 6) {
                    AnimalTalk6On = true;          
                    animal = pmode;
                    M_MOANER_saveControls();
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in pig talk mode.</p>"
                    );
                } else if (pmode == 7) {          
                    AnimalTalk7On = true;
                    animal = pmode;
                    M_MOANER_saveControls();
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in pony talk mode.</p>"
                    );
                } else if (pmode == 8) {
                    AnimalTalk8On = true;
                    animal = pmode;
                    M_MOANER_saveControls();
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in puppy talk mode.</p>"
                    );
		} else if (pmode == 9) {
                    AnimalTalk9On = true;
                    animal = pmode;
                    M_MOANER_saveControls();
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in wolfy talk mode.</p>"
                    );
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
                    if ((target[0].OnlineSharedSettings.Uwall) &&
                        (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
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
                    if ((target[0].OnlineSharedSettings.Uwall) &&
                        (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
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
                ChatRoomSetTarget(-1);
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
        Tag: 'roomsize',
        Description: "(players): sets the maximum players per room in Chat Search for normal and hybrid rooms.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The roomsize command must be followed by a number between 2 and 20.</p>"
                );
            } else {
                var size = args;
                if ((size > 1) && (size < 21) && (size != rsize)) {
                    rsize = size * 1;
                    M_MOANER_saveControls();
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: You have modified the maximum players per room in Chat Search for normal and hybrid rooms.</p>"
                    );
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'roomtype',
        Description: "(type): sets the room type you want to see in Chat Search.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The roomtype command must be followed by a number between 0 and 3.\n" +
                    " \n" +
                    " 0 = All room types\n" +
                    " 1 = Only normal rooms\n" +
                    " 2 = Only hybrid rooms\n" +
                    " 3 = Only map rooms</p>"

                );
            } else {
                var type = args;
                if ((type > -1) && (type < 4) && (type != rtype)) {
                    if (type == 0) {
                        rtype = "ALL";
                    }
                    if (type == 1) {
                        rtype = "Never";
                    }
                    if (type == 2) {
                        rtype = "Hybrid";
                    }
                    if (type == 3) {
                        rtype = "Always";
                    }
                    M_MOANER_saveControls();
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: You have modified the room type you want to see in Chat Search.</p>"
                    );
                }
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
                        if ((CurrentCharacter.OnlineSharedSettings.Uwall == true) &&
                            (!(CurrentCharacter.OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
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
                if ((InventoryGet(Player, "Pronouns").Asset.Name == "SheHer") &&
                    (InventoryGet(Player, "Pussy").Asset.Name != "Penis") &&
                    (InventoryGet(Player, "BodyUpper").Asset.Name != "FlatSmall") &&
                    (InventoryGet(Player, "BodyUpper").Asset.Name != "FlatMedium")) {
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
                    if ((target[0].OnlineSharedSettings.Uwall) &&
                        (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
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
                ChatRoomSetTarget(-1);
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
                if ((solidity < 1) || (solidity > 99)) {
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The solidity value must be between 1 and 99. </p>"
                    );
                } else {
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
                            if (Player.Appearance[A].Asset.Group.Name != null) {
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
                            if ((target[0].OnlineSharedSettings.Uwall) &&
                            (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
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
                    if ((target[0].OnlineSharedSettings.Uwall) &&
                        (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
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
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The stalk command must be followed by a number between 1 and 4 for the stuttering mode and the words you want to say.\n" +   
		    "Note that it can't be used when you are in a 'permanent' stuttering mode, forced with the <b> /stutter </b> command.\n" +
                    " \n" +
                    "Available stuttering modes:\n" +
                    "1 light stuttering\n" +
                    "2 normal stuttering\n" +
                    "3 heavy stuttering\n" +
                    "4 total stuttering</p>"
                );
            } else {
                if ((mode > 0) && (mode < 5) && (StutterOn == false)) {
                    var [, , ...message] = command.split(" ");
                    var msg = message?.join(" ");
                    var nm = 0;
                    if (DolltalkOn == true) {
                        if (IsDollTalk(msg) == false) {
                            var nm = 1;
                        }
                        if (nm == 1) {
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Your message can't be sent because it does not respect the rules of doll talk.</p>"
                            );
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
                var stlevel = args * 1;
                ElementValue("InputChat", "");
                if (stlevel == 0) {
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: No more stuttering.</p>"
                    );
                    StutterOn = false;
                    st = stlevel;
                    M_MOANER_saveControls();
                } else if ((stlevel > 0) && (stlevel < 5)) {
                    var msg1 = "ULTRAbc:You are now in ";
                    if (stlevel == 1) msg2 = "light ";
                    if (stlevel == 2) msg2 = "normal ";
                    if (stlevel == 3) msg2 = "heavy ";
                    if (stlevel == 4) msg2 = "total ";
                    var msg3 = "stuttering mode."
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>" + msg1 + msg2 + msg3 + "</p>"
                    );
                    StutterOn = true;
                    st = stlevel;
                    M_MOANER_saveControls();             
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
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The talk command must be followed by a number between -2 and 9.\n" +
                    " \n" +
                    "Available talk modes:\n" +
                    "-2 real baby/gag talk (based on currently worn gags and other items restraining talking)\n" +
                    "-1 baby talk\n" +
                    "0 normal talk\n" +
                    "1 almost no gag talk\n" +
                    "2 very light gag talk\n" +
                    "3 light gag talk\n" +
                    "4 easy gag talk\n" +
                    "5 normal gag talk\n" +
                    "6 medium gag talk\n" +
                    "7 heavy gag talk\n" +
                    "8 very heavy gag talk\n" +
                    "9 total gag talk</p>"
                );
            } else {
                var gaglevel = args * 1;
                notalk = 0;
                ElementValue("InputChat", "");
                if (gaglevel == -1) {
                    if (this.BabyTalkOn == false || this.BabyTalkOn == undefined) {
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in baby talk mode.</p>"
                        );
                        GagTalkOn = false;
                        BabyTalkOn = true;
                        gl = gaglevel;
                        M_MOANER_saveControls();
                    }
                }
                if (gaglevel == 0) {
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ULTRAbc: You are now in normal talk mode.</p>"
                    );
                    BabyTalkOn = false;
                    GagTalkOn = false;
                    gl = gaglevel;
                    M_MOANER_saveControls();
                }
                if ((gaglevel > 0) && (gaglevel < 10)) {
                    if (gaglevel == 9) {
                        gl = 10;
                    } else {
                        gl = gaglevel;
                    }
                    if (this.GagTalkOn == false || this.GagTalkOn == undefined) {
                        BabyTalkOn = false;
                        gl = gaglevel;
                        GagTalkOn = true;
                        M_MOANER_saveControls();
                    } else {
                        GagTalkOn = false;
                        gl = gaglevel;
                        GagTalkOn = true;
                        M_MOANER_saveControls();
                    }
		    var msg1 = "ULTRAbc: You are now in ";
                    if (gaglevel == 1) msg2 = "almost no ";
                    if (gaglevel == 2) msg2 = "very light ";
                    if (gaglevel == 3) msg2 = "light ";
                    if (gaglevel == 4) msg2 = "easy ";
                    if (gaglevel == 5) msg2 = "normal ";
                    if (gaglevel == 6) msg2 = "medium ";
                    if (gaglevel == 7) msg2 = "heavy ";
                    if (gaglevel == 8) msg2 = "very heavy ";
                    if (gaglevel == 9) msg2 = "total ";
                    var msg3 = "gag talk mode.";
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>" + msg1 + msg2 + msg3 + "</p>"
                    );
                }
                if (gaglevel == -2) {
                    RealGarblingLevel();
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'theme',
        Description: "(number): changes chat color theme.",
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
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The timercell command must be followed by a number higher than 0.</p>"
                );
            } else {
                var minutes = args;
                if (minutes > 0) {
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
            }
        }
    }])

    CommandCombine([{
        Tag: 'title1',
        Description: "(title): chooses a new title (from A to K).",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The title1 command must be followed by a title.\n" +
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
                    "houdin, incubus, infiltrator, kidnapper, kitten.</p>"
                );
            } else {
                var title = args;
                if (title == "admiral") {
                    TitleSet("Admiral");
                } else if (title == "agent") {
                    if ((SkillGetLevel(Player, "Infiltration") < 6) || (SkillGetLevel(Player, "Infiltration") > 7)) {
                        SkillChange(Player, "Infiltration", 6);
                    }
                    TitleSet("InfilrationAgent");
                } else if (title == "alien") {
                    TitleSet("Alien");
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
                } else if (title == "brat") {
                    TitleSet("Brat");
                } else if (title == "bunny") {
                    TitleSet("Bunny");
                } else if (title == "captain") {
                    TitleSet("Captain");
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
                } else if (title == "concubus") {
                    TitleSet("Concubus");
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
                } else if (title == "duke") {
                    LogAdd("KidnapSophie", "Sarah");
                    TitleSet("Duke");
                } else if (title == "escapedpatient") {
                    LogAdd("Escaped", "Asylum", CurrentTime + 86400000);
                } else if (title == "farmhorse") {
                    if ((SkillGetLevel(Player, "Dressage") < 2) || (SkillGetLevel(Player, "Infiltration") > 2)) {
                        SkillChange(Player, "Dressage", 2);
                    }
                    TitleSet("PonyFarm");
                } else if (title == "femboy") {
                    TitleSet("Femboy");
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
                } else if (title == "goodboy") {
                    if (AsylumGGTSGetLevel(Player) < 4) {
                        Level = parseInt(4);
                        Player.Game.GGTS.Level = 4;
                        ServerAccountUpdate.QueueData({
                            Game: Player.Game
                        });
                    }
                    TitleSet("GoodBoy");
                } else if (title == "goodone") {
                    TitleSet("Good One");
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
                } else if (title == "goodslaveboy") {
                    if (AsylumGGTSGetLevel(Player) < 5) {
                        Level = parseInt(5);
                        Player.Game.GGTS.Level = 5;
                        ServerAccountUpdate.QueueData({
                            Game: Player.Game
                        });
                    }
                    TitleSet("GoodSlaveBoy");
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
                } else if (title == "incubus") {
                    TitleSet("Incubus");
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
                }
            }
        }
    }])

    CommandCombine([{
        Tag: 'title2',
        Description: "(title): chooses a new title (from L to Z).",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The title2 command must be followed by a title.\n" +
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
                    "wildmustang, witch, wizard.</p>"
                );
            } else {
                var title = args;
                if (title == "ladyluck") {
                    if (ReputationGet("Gambling") < 100) {
                        DialogSetReputation("Gambling", 100);
                    }
                    TitleSet("LadyLuck");
                } else if (title == "liege") {
                    TitleSet("Liege");
                } else if (title == "littleone") {
                    if (ReputationGet("ABDL") < 1) {
                        DialogSetReputation("ABDL", 1);
                    }
                    TitleSet("LittleOne");
                } else if (title == "lordfortune") {
                    if (ReputationGet("Gambling") < 100) {
                        DialogSetReputation("Gambling", 100);
                    }
                    TitleSet("Lord Fortune");
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
                } else if (title == "majesty") {
                    TitleSet("Majesty");
                } else if (title == "master") {
                    LogAdd("ClubMistress", "Management");
                    TitleSet("Master");
                } else if (title == "masterkidnapper") {
                    if (ReputationGet("Kidnap") < 100) {
                        DialogSetReputation("Kidnap", 100);
                    }
                    TitleSet("MasterKidnapper");
                } else if (title == "missy") {
                    TitleSet("Missy");
                } else if (title == "mistree") {
                    LogAdd("ClubMistress", "Management");
                    TitleSet("Mistree");
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
                } else if (title == "pet") {
                    TitleSet("Pet");
                } else if (title == "prince") {
                    TitleSet("Prince");
                } else if (title == "princess") {
                    TitleSet("Princess");
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
                } else if (title == "sissy") {
                    TitleSet("Sissy");
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
		} else if (title == "superhero") {
                    InventoryAdd(Player, "AnimeGirl", "Cloth"),
                    TitleSet("AnimeBoy");
                } else if (title == "superheroine") {
                    InventoryAdd(Player, "AnimeGirl", "Cloth");
                    TitleSet("AnimeGirl");	
                } else if (title == "superspy") {
                    if (SkillGetLevel(Player, "Infiltration") < 10) {
                        SkillChange(Player, "Infiltration", 10);
                    }
                    TitleSet("InfilrationSuperspy");
                } else if (title == "switch") {
                    TitleSet("Switch");
                } else if (title == "tomboy") {
                    TitleSet("Tomboy");
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
                RealGarblingLevel();
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
                    if ((target[0].OnlineSharedSettings.Uwall) &&
                        (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
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
                ChatRoomSetTarget(-1);
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
                    "Visit also our <a href='https://github.com/tetris245/ULTRAbc/wiki' target='_blank'>Wiki</a> and join this <a href='https://discord.gg/JUvYfSpCmN' target='_blank'>Discord</a></p>"
                );
            }
            if (args === "admin") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Admin commands\n" +
                    "<b>/autokick</b> = toggles on auto kick for 0 day old accounts.\n" +
                    "<b>/bg1</b> = adds hidden backgrounds to the selection screen.\n" +
                    "<b>/bg2</b> (number) = uses a Bondage Brawl background as standard background. /bg2 to get the list.\n" +
                    "<b>/bg3</b> (number) = uses a Bondage College background as custom background. /bg3 to get the list.</p>"
                );
            }
            if (args === "bondage") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Bondage commands - * = more info when using\n" +
                    "<b>/hint</b> (target) (hint) = adds or changes a hint for all current locks with password.\n" +
                    "<b>/itemcolor1</b> (colorcode) (target) = changes color on all current bindings. Color code must be in the format #000000\n" +
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
                    "<b>/title1</b> (newtitlehere) = chooses a new title (from A to K). *\n" +
                    "<b>/title2</b> (newtitlehere) = chooses a new title (from L to Z). *</p>"
                );
            }
            if (args === "chat") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Chat commands - * = more info when using\n" +
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
                    "<b>/theme</b> (number) = changes chat color theme. Number between 0 and 3.</p>"
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
                    "** = scripts must be allowed in BC settings\n" +
                    "<b>/cum</b> = causes an orgasm.\n" +
                    "<b>/hdvibe</b> (options) = changes settings of worn High Duty Belt. *\n" +
                    "<b>/invisible</b> (target) = goes or sends to invisible mode. **\n" +
                    "<b>/moaner</b> (options) = moans when horny and stimulated. *.\n" +
                    "<b>/plvibe</b> (options) = changes settings of worn Sci-Fi Pleasure Panties. *\n" +
                    "<b>/poof</b> (action) = leaves the club very fast. Action is optional (default = poofs away).\n" +
                    "<b>/sfchaste</b> (options) = changes settings of worn Futuristic Chastity Belt. *\n" +
                    "<b>/sleep</b> (target) = uses the sleeping pill.\n" +
                    "<b>/slowleave</b> (action) = slowly leaves the room.\n" +
                    "<b>/superdice</b> (sides) = rolls a superdice. Sides can be between 2 and 999999999.\n" +
                    "<b>/visible</b> (target) = goes or sends back to visible mode. **</p>"
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
                    "<b>/ulistadd</b> (membernumber) = adds a player to the list allowing to bypass Uwall.\n" +
                    "<b>/ulistremove</b> (membernumber) = removes a player from the list allowing to bypass Uwall.\n" +
                    "<b>/ulistshow</b> = displays the list of players allowed to bypass Uwall.\n" +
                    "<b>/unrestrict</b> =  partially removes restrictions from game. *\n" +
                    "<b>/uroom</b> = gives infos about UBC users and Uwall protection in current room.\n" +
                    "<b>/ustatus</b> = displays status of ULTRAbc settings.</p>"
                );
            }
            if (args === "settings") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Settings commands - * = more info when using\n" +
		    "<b>/bg4</b> (screen) (background) = selects a standard background for the Friend List, the Main Hall, the Private Room (SP) or the Timer Cell. *\n" + 
		    "<b>/bglist</b> displays the list of all available standard backgrounds.\n" +
                    "<b>/carddesk</b> (desk) = changes default desk for Card Game.\n" +
                    "<b>/cardextra</b> = gives all extra cards.\n" +
                    "<b>/cardfame</b> (fame) = sets high fame level for Card Game.\n" +
                    "<b>/cardnoextra</b> = removes all extra cards.\n" +
                    "<b>/killpar</b> = kills UBC/Moaner parameters saved locally.\n" +
                    "<b>/message</b> (option) (message) = creates custom messages for specific command. *\n" +
                    "<b>/roomsize</b> (players) = sets maximum players per room in Chat Search for normal and hybrid rooms.\n" +
                    "<b>/roomtype</b> (type) = sets room type you want to see in Chat Search. *\n" +
                    "<b>/uset</b> (setting) = toggles a specific UBC setting *.</p>"
                );
            }
            if (args === "talking") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Talking commands - * = more info when using\n" +
		    "<b>/atalk</b> (stuffhere) = speaks once as an animal. *\n" +
                    "<b>/btalk</b> (stuffhere) = speaks once as a baby.\n" +
                    "<b>/gtalk</b> (talkmode) (stuffhere) = speaks once in specified gag talk. *\n" +
                    "<b>/hear</b> (hearingmode) = forces a specific hearing mode. *\n" +
                    "<b>/moaner</b> = moans when horny and stimulated. *\n" +
		    "<b>/ptalk</b> (animal) = forces a specific animal talk mode. *\n" +
                    "<b>/stalk</b> (stuttermode) (stuffhere) = speaks once in specified stuttering mode. *\n" +
                    "<b>/stutter</b> (stuttermode) = forces a specific stuttering mode. *\n" +
                    "<b>/talk</b> (talkmode) = forces a specific talk mode. *</p>"
                );
            }
            if (args === "visual") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Visual commands - * = more info when using\n" +
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
        Tag: 'ulistadd',
        Description: "(membernumber): adds a player to the list allowing to bypass Uwall.",
        Action: (args) => {
            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The ulistadd command must be followed by the member number of the player that you allow to bypass Uwall.<p>"
                );
            } else {
                var member = args * 1;
                if (Player.OnlineSharedSettings.Ulist == undefined) {
                    List = [];
                } else {
                    List = Player.OnlineSharedSettings.Ulist;
                }
                if ((member > 0) && (member != Player.MemberNumber) && (!isNaN(member))) { 
                    List.push (member);
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
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The ulistremove command must be followed by the member number of the player who is no more allowed to bypass Uwall.<p>"
                );
            } else {
                var member = args * 1;
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
                    if ((target[0].OnlineSharedSettings.Uwall) &&
                        (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
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
                ChatRoomSetTarget(-1);
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
                        if ((target[0].OnlineSharedSettings.Uwall) &&
                            (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
                            var uw = 1;
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                            );
                        } else {
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
                            CharacterReleaseFromLock(target[0], "MistressPadlock");
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
                ChatRoomSetTarget(-1);
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
                ChatRoomMapViewCanEnterTile = function(X, Y) {
                    return 20;
                }
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
                ChatRoomMapViewCanEnterTile = function(X, Y) {
                    return 20;
                }
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
                RealGarblingLevel();
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
                    if ((target[0].OnlineSharedSettings.Uwall) &&
                        (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
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
                if ((ChatRoomCharacter[pl].Nickname == '') || (ChatRoomCharacter[pl].Nickname == undefined)) {
                    var name = ChatRoomCharacter[pl].Name;
                    var aka = "";
                } else {
                    var name = ChatRoomCharacter[pl].Nickname;
                    var aka = ChatRoomCharacter[pl].Name;
                }
                var number = ChatRoomCharacter[pl].MemberNumber;
                ChatRoomSendLocal(name + " (" + aka + ") - " + number);
                if (ChatRoomCharacter[pl].OnlineSharedSettings.UBC == undefined) {
                    var mes1 = "Does not use ULTRAbc.";
                } else {
                    if ((ChatRoomCharacter[pl].OnlineSharedSettings.UBC == UBCver) || (ChatRoomCharacter[pl].OnlineSharedSettings.UBC == UBCver0))  {
                        var mes1 = "Is an ULTRAbc user."; 
                    } else {         
                        var mes1 = "Does not use ULTRAbc";
                    } 
                }
                if (ChatRoomCharacter[pl].OnlineSharedSettings.Uwall == undefined) {
                    var mes2 = "Does not use Uwall.";
                } else {
                    if (ChatRoomCharacter[pl].OnlineSharedSettings.Uwall == true) {
                        var mes2 = "Has enabled Uwall.";
                    } else {
                        var mes2 = "Has disabled Uwall.";
                    }
                }
                ChatRoomSendLocal(mes1 + " - " + mes2);
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
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The uset command must be followed by an toggle option corresponding to an UBC setting:\n" +
                    "<b>autojoin</b> for chat room auto-join feature\n" +
		    "<b>bgall</b> for bgs usable with the buttons in Private Room\n" 
                    "<b>dolltalk</b> for doll talk (and whisper) mode\n" +
                    "<b>exitmode</b> for exit mode with OUT button \n" +
		    "<b>frkeys</b> for hotkeys in friendlist \n" +
                    "<b>fullseed</b> for full solution with intricate and hs locks\n" +
                    "<b>highfame</b> for high fame mode in Club Card Game\n" +
                    "<b>hotkeys</b> for hotkeys on numeric pad \n" +
                    "<b>magiccheat</b> for Bondage Brawl/Magic School cheat\n" +
                    "<b>magictoys</b> for toys under locked chastity in traps\n" +
                    "<b>nogarble</b> for ungarble in default BC talk mode\n" +
                    "<b>nostruggle</b> for automatic struggle in mini-games\n" +
		    "<b>notimeout</b> for toggle time-out in BC TAB help\n" +         
                    "<b>nowhisper</b> for no-whisper mode\n" +
                    "<b>npcpunish</b> for NPC punishments\n" +
                    "<b>outbuttons</b> for OUT buttons\n" +
                    "<b>rglbuttons</b> for RGL buttons\n" +
                    "<b>sosbuttons</b> for emergency buttons (FREE)</p>"
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
                } else if (setting == "bgall") {
                    if (bgall == true) {
                        bgall = false;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Only 43 standard backgrounds can be used with the buttons in Private Room (SP).</p>"
                        );
                    } else {
                        bgall = true;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: All standard backgrounds can be used with the buttons in Private Room.</p>"
                        );
                    }	
                } else if (setting == "dolltalk") {
                    if (DolltalkOn == true) {
                        DolltalkOn = false;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Doll talk (and whisper) mode disabled.</p>"
                        );
                    } else {
                        DolltalkOn = true;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Doll talk (and whisper) mode enabled. Maximum 5 words by message or whisper, and you can't use words with more than 6 characters.</p>"
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
		} else if (setting == "frkeys") {
                    if (FrkeysOn == true) {
                        FrkeysOn = false;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Hotkeys in friendlist are disabled.</p>"
                        );
                    } else {
                        FrkeysOn = true;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Hotkeys in friendlist are enabled:\n" +
                            "They allow to get clickable links in another lobby you have access if you are in a lobby (not in a room).\n " +
                            "You can use them only on the list of current online friends AND if you are not in the search input or send beep zone.\n" +
                            "F = female club\n" +
                            "G = mixed club\n" +
                            "H = male club\n" +
                            "J = asylum</p>"
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
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Hotkeys on numeric pad are enabled: Divide = fast leave - Multiply = Total Release</p>"
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
                } else if (setting == "magictoys") {
                    if (MagictoysOn == true) {
                        MagictoysOn = false;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Toys can't be added under locked chastity for trap mode in map rooms.</p>"
                        );
                    } else {
                        MagictoysOn = true;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Toys can be added under locked chastity for trap mode in map rooms.</p>"
                        );
                    }
                } else if (setting == "nogarble") {
                   if (Player.FBCOtherAddons == undefined) {
                       var gbc = 0;                    
                    } else {
                        str = Player.ExtensionSettings.FBC;
                        d = LZString.decompressFromBase64(str);
                        FBCdata = {};
                        decoded = JSON.parse(d);
                        FBCdata = decoded;
                        if (FBCdata.antiGarble) {
                        var gbc = 1;
                            Player.RestrictionSettings.NoSpeechGarble = false;
                            NogarbleOn = false;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: BC default talk mode can ungarble messages and whispers according your WCE settings.</p>"
                            );
                        }             
                    }
                    if (gbc == 0) {
                        if (Player.RestrictionSettings.NoSpeechGarble == true) {
                            Player.RestrictionSettings.NoSpeechGarble = false;
                            NogarbleOn = false;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: BC default talk mode will not ungarble messages and whispers.</p>"
                            );
                        } else {
                            Player.RestrictionSettings.NoSpeechGarble = true;
                            NogarbleOn = true;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: BC default talk mode will ungarble messages and whispers.</p>"
                            );
                        }
                    }
                } else if (setting == "nostruggle") {
                    if (Player.FBCOtherAddons == undefined) {
                       var sbc = 0;                   
                    } else {
                        str = Player.ExtensionSettings.FBC;
                        d = LZString.decompressFromBase64(str);
                        FBCdata = {};
                        decoded = JSON.parse(d);
                        FBCdata = decoded;
                        if (FBCdata.autoStruggle) {
                            var sbc = 1;
                            Player.RestrictionSettings.BypassStruggle = false;
                            NostruggleOn = false;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Automatic struggle in mini-games is enabled according your WCE setting.\n" +
                                "If the autostruggle fails, you need to change solidity of current worn items with the <b>/solidity</b> command.</p>"
                            );
                        }             
                    }
                    if (sbc == 0) {
                        if (Player.RestrictionSettings.BypassStruggle == true) {
                            Player.RestrictionSettings.BypassStruggle = false;
                            NostruggleOn = false;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Automatic struggle in mini-games is disabled.</p>"
                            );
                        } else {
                            Player.RestrictionSettings.BypassStruggle = true;
                            NostruggleOn = true;
                            M_MOANER_saveControls();
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Automatic struggle in mini-games is enabled.\n" +
                                "If the autostruggle fails, you need to change solidity of current worn items with the <b>/solidity</b> command.</p>"
                            );
                        }
                    }
		} else if (setting == "notimeout") {
                    if (NotimeoutOn == true) {
                        NotimeoutOn = false;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Time-out for BC help provided by TAB key is activated.</p>"
                        );
                    } else {
                        NotimeoutOn = true;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Time-out for BC help provided by TAB key is disabled.</p>"
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
                } else if (setting == "rglbuttons") {
                    if (RglbuttonsOn == true) {
                        RglbuttonsOn = false;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: RGL buttons hidden and disabled.</p>"
                        );
                    } else {
                        RglbuttonsOn = true;
                        M_MOANER_saveControls();
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: RGL buttons displayed and enabled.</p>"
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
            showButtonsStatus();
            showExitmodeStatus();
            showFeaturesStatus();
            showHighfameStatus();
            showMagiccheatStatus(); 
            showMaptrapStatus();
            showNostruggleStatus();
	    showNotimeoutStatus();
            showNpcpunishStatus();
            showSearchRoomStatus(); 
	    showTalkStatus();
        }
    }])

    CommandCombine([{
        Tag: 'visible',
        Description: ": (target): goes back or sends back to visible mode.",
        Action: (args) => {
            if (args === "") {
                if (Visible == undefined) {
                    var message = "" + tmpname + " suddenly is visible for everybody."
                } else {
                    if (Visible != "") {
                        if (Visible.startsWith("\u0027")) {
                            var message = tmpname + Visible;
                        } else {
                            var message = tmpname + ' '.repeat(1) + Visible;
                        }
                    } else {
                        var message = "" + tmpname + " suddenly is visible for everybody."
                    }
                }
                if (Visible != "no message") {
                    ServerSend("ChatRoomChat", {
                        Content: "Beep",
                        Type: "Action",
                        Dictionary: [{
                            Tag: "Beep",
                            Text: message
                        }]
                    });
                }
                InventoryRemove(Player, "ItemScript");
                CurrentScreen === 'ChatRoom' ?
                    ChatRoomCharacterUpdate(Player) :
                    CharacterRefresh(Player);
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
                    if (target[0].OnlineSharedSettings.ScriptPermissions.Hide.permission == 0) {
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: To use the visible command on other players, they need first to allow Scripts in BC settings.<p>"
                        );
                    } else {
                        if ((target[0].OnlineSharedSettings.Uwall) &&
                            (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                            );
                        } else {
                            if (Tvisible == undefined) {
                                var message = "" + tgpname + " suddenly is visible for everybody."
                            } else {
                                if (Tvisible != "") {
                                    if (Tvisible.startsWith("\u0027")) {
                                        var message = tmpname + Tvisible + ' '.repeat(1) + tgpname;
                                    } else {
                                        var message = tmpname + ' '.repeat(1) + Tvisible + ' '.repeat(1) + tgpname;
                                    }
                                } else {
                                    var message = "" + tgpname + " suddenly is visible for everybody."
                                }
                            }
                            if (Tvisible != "no message") {
                                ServerSend("ChatRoomChat", {
                                    Content: "Beep",
                                    Type: "Action",
                                    Dictionary: [{
                                        Tag: "Beep",
                                        Text: message
                                    }]
                                });
                            }
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
                        showGarblingStatus();
                        showLockedMbsStatus();
                        showLockedWheelStatus();
			showMbsCraftingStatus();
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
                        showChatInputStatus();
                        showFlatColorStatus();
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
                    if ((target[0].OnlineSharedSettings.Uwall) &&
                        (!(target[0].OnlineSharedSettings.Ulist.includes(Player.MemberNumber)))) {
                        ChatRoomSendLocal(
                            "<p style='background-color:#5fbd7a'>ULTRAbc: Your command can't be executed because " + tgpname + " has enabled the Uwall protection.</p>"
                        );
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

})();
