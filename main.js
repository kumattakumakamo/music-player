const { app, BrowserWindow, screen } = require('electron');

function createWindow() {

    const win = new BrowserWindow({
        width: 300,
        height: 100,
        x: 0,
        y: 0,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.setAlwaysOnTop(true, 'screen-saver');// さらに最前面に設定
    win.loadFile('index.html');//index.htmlを読み込む
}

app.whenReady().then(createWindow);//アプリ起動時にウィンドウを作成