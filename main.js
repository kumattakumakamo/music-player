const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    // ウィンドウの作成
    const win = new BrowserWindow({
        width: 600,
        height: 400,
        frame: false, // ★ここでウィンドウ枠を消しています（フレームレス）
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false // 学習用に簡易化していますが、本番ではtrue推奨
        }
    });

    // HTMLを読み込む
    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});