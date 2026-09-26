const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

for (const lang of ['ch', 'en', 'es']) {
 const source = fs.readFileSync(path.join(__dirname, '..', 'ULTRAbc-' + lang + '.js'), 'utf8');
 test(lang + ': every MBS settings read preserves the global LSCG API', () => {
  new vm.Script(source);
  const blocks = [...source.matchAll(/let MBS;\s*if \(Player\.(?:ExtensionSettings|OnlineSharedSettings)\.MBS != undefined\) [^;]+;/g)];
  assert.equal(blocks.length, 6);
  for (const [block] of blocks) {
   for (const settings of [{}, {MBS: 'encoded-settings'}]) {
    const api = {getModule: () => 'injector'};
    const context = vm.createContext({LSCG: api, Player: {ExtensionSettings: settings, OnlineSharedSettings: settings}});
    const result = vm.runInContext('(function () {' + block + '; return MBS;})()', context);
    assert.equal(result, settings.MBS);
    assert.equal(context.LSCG, api);
    assert.equal(vm.runInContext('globalThis.LSCG?.getModule("InjectorModule")', context), 'injector');
   }
  }
 });
 test(lang + ': actual moan callback does not corrupt LSCG when MBS data exists', () => {
  const start = source.indexOf('    function M_MOANER_miscReactions(data) {');
  assert(start >= 0);
  const end = source.indexOf('\n    }', start);
  assert(end > start);
  const fn = source.slice(start, end + 6);
  let input = '', decoded = 0;
  const api = {getModule: () => 'injector'};
  const context = vm.createContext({
   LSCG: api, Player: {ArousalSettings: {Progress: 20}, ExtensionSettings: {MBS: 'encoded-settings'}},
   reaction: 3, getMoan: () => 'test',
   ElementValue: (_id, value) => value === undefined ? input : (input = value),
   M_MOANER_isSimpleChat: () => true, M_MOANER_saveControls() {},
   ChatRoomTargetMemberNumber: null, notalk: 0, gl: 0, ChatRoomSendChat() {},
   LZString: {decompressFromUTF16(value) {assert.equal(value, 'encoded-settings'); decoded++; return '{"AlternativeGarbling":false}';}},
  });
  vm.runInContext(fn + '; M_MOANER_miscReactions({});', context);
  assert.equal(decoded, 1);
  assert.equal(context.LSCG, api);
  assert.equal(vm.runInContext('globalThis.LSCG?.getModule("InjectorModule")', context), 'injector');
 });
}
