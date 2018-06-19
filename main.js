const {app, BrowserWindow} = require('electron');
const {protocol} = require('electron')
const url = require('url');
let mainWindow;
protocol.registerStandardSchemes(['cap']);
app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  SetupIntercept();
    global.Site = "cap://http://www.supremenewyork.com";
    LoadBrowserForCaptcha();


});

function OnCaptchaResponse(UrlObject,SiteKey){
    console.log(UrlObject);
    console.log(SiteKey);
}



function LoadBrowserForCaptcha(NewURL){
    global.SiteKey = "6LeoeSkTAAAAAA9rkZs5oS82l69OEYjKRZAiKdaF";
    mainWindow = new BrowserWindow({width: 1024, height: 768,show: false });
    mainWindow.loadURL('file://' + __dirname + '/browser.html?');
    setTimeout(()=>{
        mainWindow.show();
    },0)
}

function SetupIntercept(){

    protocol.registerBufferProtocol('cap', (request, callback) => {

        let ReUrl = url.parse(request.url, true);
        let Key = global.SiteKey;
        if(ReUrl.query.captchakey)
        {
            Key = ReUrl.query.captchakey;
        }
        if(ReUrl.query["g-recaptcha-response"])
        {
            OnCaptchaResponse(ReUrl,ReUrl.query["g-recaptcha-response"]);
        }


        callback({mimeType: 'text/html', data: Buffer.from(captchaPage.replace(/__SITEKEY__/,Key))})
    }, (error) => {
        if (error) console.error('Failed to register protocol')
    })
}

let captchaPage = '<html>\n' +
    '<head>\n' +
    '    <title>Captcha Harvester</title>\n' +
    '    <style type="text/css">\n' +
    '        body {\n' +
    '            margin: 1em 5em 0 5em;\n' +
    '            font-family: sans-serif;\n' +
    '        }\n' +
    '\n' +
    '        fieldset {\n' +
    '            display: inline;\n' +
    '            padding: 1em;\n' +
    '        }\n' +
    '    </style>\n' +
    '</head>\n' +
    '<body>\n' +
    '    <center>\n' +
    '        <h3>Captcha Destroyer</h3>\n' +
    '        <p> <p>\n' +
    '            <form action="/submit" method="get">\n' +
    '                <fieldset>\n' +
    '                    <div class="g-recaptcha" data-sitekey="__SITEKEY__" data-callback="sub"></div>\n' +
    '                    <script type="text/javascript" src="https://www.google.com/recaptcha/api.js"></script>\n' +
    '        <p>\n' +
    '            <input type="submit" value="Submit" id="submit" style="\n' +
    '            color: #ffffff;\n' +
    '            width: 100%;\n' +
    '            background-color: #3c3c3c;\n' +
    '            border-color: #3c3c3c;\n' +
    '            display: inline-block;\n' +
    '            margin-bottom: 0;\n' +
    '            font-weight: normal;\n' +
    '            text-align: center;\n' +
    '            vertical-align: middle;\n' +
    '            -ms-touch-action: manipulation;\n' +
    '            touch-action: manipulation;\n' +
    '            cursor: pointer;\n' +
    '            background-image: none;\n' +
    '            border: 1px solid transparent;\n' +
    '            white-space: nowrap;\n' +
    '            padding: 8px 12px;\n' +
    '            font-size: 15px;\n' +
    '            line-height: 1.4;\n' +
    '            border-radius: 0;\n' +
    '            -webkit-user-select: none;\n' +
    '            -moz-user-select: none;\n' +
    '            -ms-user-select: none;\n' +
    '            user-select: none;\n' +
    '        ">\n' +
    '        </p>\n' +
    '        </fieldset>\n' +
    '        </form>\n' +
    '        <fieldset>\n' +
    ' \n' +
    '            <h5 style="width: 41vh;"><a style="text-decoration: none;" href="/usable_tokens" target="_blank">Usable Tokens</a></h5>\n' +
    '\n' +
    '        </fieldset>\n' +
    '    </center>\n' +
    '    <script>\n' +
    '        function sub() {\n' +
    '            document.getElementById("submit").click();\n' +
    '        }\n' +
    '    </script>\n' +
    '</body>\n' +
    '</html>\n';
