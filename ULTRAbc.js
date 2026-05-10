// ==UserScript==
// @name ULTRAbc
// @namespace https://www.bondageprojects.com/
// @version 6.0
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

(function() {
    const modApi = bcModSDK.registerMod({
        name: 'ULTRAbc-manager',
        fullName: 'Ultra Bondage Club',
        version: "6.0",
        repository: 'https://github.com/tetris245/ULTRAbc',
    });

    ULTRALoginClick();
    ULTRALoginRun();

    function ULTRALoginClick() {
        modApi.hookFunction('LoginClick', 4, (args, next) => {
            if (MouseIn(1810, 550, 90, 90)) {
                var newScript = document.createElement('script');
                newScript.type = 'text/javascript';
                newScript.src = "https://tetris245.github.io/ultrabc.github.io/ULTRAbc-en.js";
                newScript.crossorigin = "anonymous";
                document.getElementsByTagName('head')[0].appendChild(newScript); 
                const Name = ElementValue(LoginIDs.name);
		        const Password = ElementValue(LoginIDs.password);
		        LoginDoLogin(Name, Password);            
            }        
            if (MouseIn(1810, 670, 90, 90)) {
                var newScript = document.createElement('script');
                newScript.type = 'text/javascript';
                newScript.src = "https://tetris245.github.io/ultrabc.github.io/ULTRAbc-ch.js";
                newScript.crossorigin = "anonymous";
                document.getElementsByTagName('head')[0].appendChild(newScript); 
                const Name = ElementValue(LoginIDs.name);
		        const Password = ElementValue(LoginIDs.password);
		        LoginDoLogin(Name, Password);         
            }
            if (MouseIn(1810, 790, 90, 90)) {
                var newScript = document.createElement('script');
                newScript.type = 'text/javascript';
                newScript.src = "https://tetris245.github.io/ultrabc.github.io/ULTRAbc-es.js";
                newScript.crossorigin = "anonymous";
                document.getElementsByTagName('head')[0].appendChild(newScript);  
                const Name = ElementValue(LoginIDs.name);
		        const Password = ElementValue(LoginIDs.password);
		        LoginDoLogin(Name, Password);                  
            }
            return next(args);
        });
    }

    function ULTRALoginRun() {
        modApi.hookFunction('LoginRun', 4, (args, next) => {
            DrawText("UBC users", 1850, 400, "White", "Black");
            DrawText("need to click", 1850, 440, "White", "Black");
            DrawText("one of these", 1850, 480, "White", "Black");            
            DrawText("buttons", 1850, 520, "White", "Black");
            DrawButton(1810, 550, 90, 90, "UBC ENGLISH", "White", "", "");
            DrawButton(1810, 670, 90, 90, "UBC CHINESE", "White", "", "");
            DrawButton(1810, 790, 90, 90, "UBC SPANISH", "White", "", "");
            return next(args);
        });
    }

})();






