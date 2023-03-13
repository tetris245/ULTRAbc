var s = document.createElement('script');
s.src = chrome.runtime.getURL('ULTRAbc.js');
(document.head || document.documentElement).appendChild(s);
 s.onload = function () {
   s.parentNode.removeChild(s);
 };

document.addEventListener('BCCheatsResponce', function (e) {
  sendToExtension(e.detail);
});

chrome.runtime.onMessage.addListener(function (request) {
  if (request.action === 'AddMoney' && request.money != null) {
    injectCode(`Player.Money += ${request.money};ServerPlayerSync();`);
  } else if (request.action === 'CheckForDisabledUI') {
    injectCode(`getStateForUI()`);
  } else if (request.action === 'Safeword') {
    injectCode(`Player.Appearance=Player.Appearance.filter(x => !x.Asset.Group.Name.match(/Item.*/));CurrentScreen === 'ChatRoom'
    ? ChatRoomCharacterUpdate(Player)
    : CharacterRefresh(Player);`);
  } else if (request.action === 'Execute') {
    injectCode(request.code);
  } else if (request.action === 'AutoRelog') {
    injectCode(`window.LoginDoLogin = function () {
        // Ensure the login request is not sent twice
        if (!LoginSubmitted && ServerIsConnected) {
          var Name = ElementValue('InputName');
          var Password = ElementValue('InputPassword');
          var letters = /^[a-zA-Z0-9]+$/;
          if (Name.match(letters) && Password.match(letters) && Name.length > 0 && Name.length <= 20 && Password.length > 0 && Password.length <= 20) {
            LoginSetSubmitted();
            ServerSend('AccountLogin', { AccountName: Name, Password: Password });
            ServerSocket.on('connect', function () {
              if (CurrentScreen === 'Relog') {
                ElementValue('InputPassword', Password);
                RelogSend();
              }
            });
          } else LoginStatusReset('InvalidNamePassword');
        }
        LoginUpdateMessage();
      };
      window.autoRelog = true`);
  }
});

function injectCode(code) {
  document.dispatchEvent(
    new CustomEvent('BCCheats', {
      detail: { code: code },
    })
  );
}

function sendToExtension(data) {
  chrome.runtime.sendMessage(data);
}
