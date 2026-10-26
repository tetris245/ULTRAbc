// Run with BC_TEXT_SOURCE pointing to an actual BC Scripts/Text.js file.
// Set BC_EXPECT_NATIVE_FIX=1 when checking BC with the upstream fix applied.
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const { test } = require("node:test");

const bcPath = process.env.BC_TEXT_SOURCE;
const expectedNativeFix = process.env.BC_EXPECT_NATIVE_FIX === "1";
const ubc = fs.readFileSync(path.join(__dirname, "../ULTRAbc.js"), "utf8");
const start = ubc.indexOf("    async function ubcProtectBCTextCache() {");
const end = ubc.indexOf("    await ubcProtectBCTextCache();", start);
assert.ok(start >= 0 && end > start, "UBC compatibility guard is present");
const guard = ubc.slice(start, end);
const csvPath = "Screens/Character/Login/Text_Login.csv";
const screenStart = ubc.indexOf("    function ubcOpenLanguageScreen() {");
const screenEnd = ubc.indexOf("    const UBC_BC_LANGUAGES", screenStart);
const languageScreen = ubc.slice(screenStart, screenEnd);

function deferred() {
    let resolve;
    const promise = new Promise(r => { resolve = r; });
    return { promise, resolve };
}

function harness() {
    let fetches = 0;
    const requests = new Map();
    const sandbox = {
        console,
        TranslationLanguage: "EN",
        CurrentModule: "Character",
        CurrentScreen: "Login",
        CommonCSVCache: { [csvPath]: [["Greeting", "Hello"]] },
        TranslationCache: {},
        TranslationAvailable: url => url.startsWith(csvPath.replace(".csv", "_")),
        TranslationParseTXT: text => text.split("\n"),
        TranslationString: (key, lines) => {
            const index = lines.indexOf(key);
            return index < 0 ? key : lines[index + 1];
        },
        CommonFetch: url => {
            fetches++;
            const language = url.match(/_([A-Z]+)\.txt$/)[1];
            const request = requests.get(language);
            request.started.resolve();
            return request.response.promise;
        },
    };
    const context = vm.createContext(sandbox);
    const Cache = vm.runInContext(fs.readFileSync(bcPath, "utf8") + "\nTextCache;", context);
    vm.runInContext(guard, context);
    vm.runInContext(languageScreen, context);
    sandbox.CommonSetScreen = (module, screen) => {
        sandbox.CurrentModule = module;
        sandbox.CurrentScreen = screen;
        return vm.runInContext("TextLoad().loadedPromise", context);
    };
    return {
        sandbox, Cache,
        protect: async () => {
            const installed = await vm.runInContext("ubcProtectBCTextCache()", context);
            vm.runInContext("TextPrefetchFile = (native => (...args) => ubcRefreshBCTextCache(args, input => native(...input)))(TextPrefetchFile);", context);
            return installed;
        },
        load: () => vm.runInContext("TextLoad()", context),
        openLanguage: () => vm.runInContext("ubcOpenLanguageScreen()", context),
        setBuildSource(source) {
            vm.runInContext("TextCache.prototype.buildCache = ({" + source + "}).buildCache;", context);
        },
        get fetches() { return fetches; },
        delay(language) {
            const request = { started: deferred(), response: deferred() };
            requests.set(language, request);
            return {
                started: request.started.promise,
                finish(text) { request.response.resolve({ status: 200, text: async () => text }); },
            };
        },
    };
}

const options = { skip: !bcPath && "Set BC_TEXT_SOURCE to test against an actual BC checkout" };

test("only vulnerable BC is patched; fixed BC retains the exact native method", options, async () => {
    const h = harness();
    const before = h.Cache.prototype.buildCache;
    assert.equal(await h.protect(), !expectedNativeFix);
    if (expectedNativeFix) assert.equal(h.Cache.prototype.buildCache, before);
    else assert.notEqual(h.Cache.prototype.buildCache, before);
    assert.equal(h.fetches, 0, "feature probe never fetches or changes a real screen");
    const installed = h.Cache.prototype.buildCache;
    assert.equal(await h.protect(), false, "repeated loading does not wrap again");
    assert.equal(h.Cache.prototype.buildCache, installed);
});

test("delayed FR/CN responses cannot leave foreign text after switching back to EN", options, async () => {
    const h = harness();
    await h.protect();
    const cache = new h.Cache(csvPath);
    await cache.loadedPromise;
    let notifications = 0;
    cache.onRebuild(() => notifications++, false);
    const fr = h.delay("FR");
    const cn = h.delay("CN");
    h.sandbox.TranslationLanguage = "FR";
    cache.get("Greeting");
    const first = cache.loadedPromise;
    await fr.started;
    h.sandbox.TranslationLanguage = "CN";
    cache.get("Greeting");
    const second = cache.loadedPromise;
    await cn.started;
    h.sandbox.TranslationLanguage = "EN";
    cache.get("Greeting");
    await cache.loadedPromise;
    cn.finish("Greeting\n你好");
    await second;
    fr.finish("Greeting\nBonjour");
    await first;
    assert.equal(cache.get("Greeting"), "Hello");
    assert.equal(cache.language, "EN");
    assert.equal(notifications, 1, "obsolete builds do not notify UI listeners");
});

test("a language change while loading recovers even without another lookup", options, async () => {
    const h = harness();
    await h.protect();
    const fr = h.delay("FR");
    h.sandbox.TranslationLanguage = "FR";
    const cache = new h.Cache(csvPath);
    const initial = cache.loadedPromise;
    await fr.started;
    h.sandbox.TranslationLanguage = "EN";
    fr.finish("Greeting\nBonjour");
    await initial;
    assert.equal(cache.get("Greeting"), "Hello");
    assert.equal(cache.loaded, true);
});

test("an unfamiliar BC implementation is not replaced", options, async () => {
    const h = harness();
    const custom = async function() { return this; };
    h.Cache.prototype.buildCache = custom;
    assert.equal(await h.protect(), false);
    assert.equal(h.Cache.prototype.buildCache, custom);
});

test("a native fix retaining the old translate call is recognized by behavior", {
    skip: options.skip || !expectedNativeFix,
}, async () => {
    const h = harness();
    const source = h.Cache.prototype.buildCache.toString().replace("this.translate(lines, language)", "this.translate(lines)");
    assert.ok(source.includes("this.translate(lines)"));
    h.setBuildSource(source);
    const before = h.Cache.prototype.buildCache;
    assert.equal(await h.protect(), false);
    assert.equal(h.Cache.prototype.buildCache, before);
    assert.equal(h.fetches, 0);
});

test("first German selection and returning to English refresh before labels are read", options, async () => {
    const h = harness();
    await h.protect();
    await h.load().loadedPromise;
    const de = h.delay("DE");
    h.sandbox.TranslationLanguage = "DE";
    const label = (async () => {
        const cache = h.load();
        await cache.loadedPromise;
        return cache.get("Greeting");
    })();
    await de.started;
    de.finish("Greeting\nHallo");
    assert.equal(await label, "Hallo");
    h.sandbox.TranslationLanguage = "EN";
    const english = h.load();
    await english.loadedPromise;
    assert.equal(english.get("Greeting"), "Hello");
});

test("prefetch refresh starts exactly one build, including on native-fixed BC", options, async () => {
    const h = harness();
    await h.protect();
    const cache = h.load();
    await cache.loadedPromise;
    const build = cache.buildCache;
    let builds = 0;
    cache.buildCache = function(...args) { builds++; return build.apply(this, args); };
    const de = h.delay("DE");
    h.sandbox.TranslationLanguage = "DE";
    h.load();
    h.load();
    await de.started;
    de.finish("Greeting\nHallo");
    await cache.loadedPromise;
    assert.equal(builds, 1);
    assert.equal(cache.get("Greeting"), "Hallo");
});

test("the UBC language screen uses a real empty cache and never fetches a screen CSV", options, async () => {
    const h = harness();
    await h.protect();
    await h.openLanguage();
    const cache = h.load();
    assert.ok(cache instanceof h.Cache);
    h.sandbox.TranslationLanguage = "DE";
    h.load();
    await cache.loadedPromise;
    assert.equal(cache.language, "DE");
    assert.equal(cache.loaded, true);
    assert.equal(h.fetches, 0);
});
