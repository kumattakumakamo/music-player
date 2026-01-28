const { app, BrowserWindow, session } = require('electron');
const path = require('path');
const http = require('http');
const fs = require('fs');

let server;

function createWindow() {
    // 1. ローカルサーバーを起動 (ポート 3000)
    server = http.createServer((req, res) => {
        let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end();
                return;
            }
            res.writeHead(200);
            res.end(data);
        });
    }).listen(3000);

    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true
        }
    });

    // 2. YouTubeへの紹介状(Referer)をlocalhostにする
    session.defaultSession.webRequest.onBeforeSendHeaders(
        { urls: ['https://www.youtube.com/*', 'https://*.youtube.com/*'] },
        (details, callback) => {
            details.requestHeaders['Referer'] = 'http://localhost:3000/';
            callback({ cancel: false, requestHeaders: details.requestHeaders });
        }
    );

    // 3. 起動URLを http://localhost に変更
    win.loadURL('http://localhost:3000/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (server) server.close();
    if (process.platform !== 'darwin') app.quit();
});
