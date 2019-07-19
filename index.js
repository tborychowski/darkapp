const {app, BrowserWindow} = require('electron');
const windowStateKeeper = require('electron-window-state');
const fs = require('fs');
const path = require('path');

let win;


function createWindow () {
	const mainWindowState = windowStateKeeper({ defaultWidth: 400, defaultHeight: 800 });

	win = new BrowserWindow({
		title: 'DarkApp',
		icon: __dirname + '/assets/icon.png',
		titleBarStyle: 'hiddenInset',
		x: mainWindowState.x,
		y: mainWindowState.y,
		width: mainWindowState.width,
		height: mainWindowState.height,
		show: false,
	});
	win.on('closed', () => win = undefined);
	win.webContents.on('crashed', () => { win.destroy(); createWindow(); });
	mainWindowState.manage(win);

	win.loadURL('https://web.whatsapp.com', {
		userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'
	});


	const css = fs.readFileSync(path.join(__dirname, 'darkapp.css'), 'utf8');
	const js = fs.readFileSync(path.join(__dirname, 'darkapp.js'), 'utf8');
	win.webContents.insertCSS(css);

	win.webContents.on('dom-ready', () => {
		setTimeout(() => {
			win.webContents.insertCSS(css);
			win.webContents.executeJavaScript(js, true).then(res => console.log(res));
			win.show();
		}, 500);
	});

	// win.webContents.openDevTools();
}

// Prevent multiple instances of the app
if (!app.requestSingleInstanceLock()) app.quit();


app.on('second-instance', () => {
	if (win) {
		if (win.isMinimized()) win.restore();
		win.show();
	}
});

app.on('window-all-closed', app.quit);
app.on('ready', createWindow);
