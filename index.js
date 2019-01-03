// Libraries
const path = require('path');
const url = require('url');
const electron = require('electron');

// Handlers
const ipcHandlers = require(path.join(process.cwd(), 'api', 'ipcHandlers', 'ipcHandlers.js'));

// Electron
const app = electron.app;
const ipc = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;

let win = null;

// Functions
const createWindow = function() {
	win = new BrowserWindow({ 
		width: 600, 
		height: 700,  
		frame: true, 
		show: false,
		title: 'YouTube to mp3' 
	});

	win.loadURL(url.format({
		pathname: path.join(__dirname, 'public', 'index.html'),
		protocol: 'file',
		slashes: true
	}));

	win.once('ready-to-show', function() {
		win.show();
	});

	win.on('closed', function() {
		win = null;
	});
}

// Electron events
app.on('ready', function() {
	createWindow();
});

app.on('window-all-closed', function() {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function() {
	if (window === null) {
		createWindow();
	}
});

// IPC events
ipc.on('searchUrl', ipcHandlers.searchUrl);