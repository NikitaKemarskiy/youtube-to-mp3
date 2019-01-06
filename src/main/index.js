// Libraries
const path = require('path');
const url = require('url');
const electron = require('electron');

// Handlers
const ipcHandlers = require(path.join(__dirname, '..', 'api', 'ipcHandlers', 'ipcHandlers.js'));

// Constants
const icon64x64 = path.join(__dirname, '..', 'icons', 'png', '64x64.png');

// Electron
const app = electron.app;
const ipc = electron.ipcMain;
const Tray = electron.Tray;
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;

// Main window variable
let mainWindow = null;

// Functions
const createWindow = function() {
	mainWindow = new BrowserWindow({ 
		width: 600, 
		height: 700,
		center: true,
		frame: true, 
		show: false,
		icon: icon64x64,
		title: 'YouTube to mp3' 
	});

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, '..', 'renderer', 'html', 'index.html'),
		protocol: 'file',
		slashes: true
	}));

	mainWindow.once('ready-to-show', function() {
		mainWindow.show();
	});

	mainWindow.on('closed', function() {
		mainWindow = null;
	});
}

// Electron events
app.on('ready', function() {
	const menu = Menu.buildFromTemplate(mainMenuTemplate); // Build an application menu
	Menu.setApplicationMenu(menu); // Set this menu as an application menu
	new Tray(icon64x64); // Set an application tray

	createWindow(); // Create an application window
});

app.on('window-all-closed', function() {
	app.quit();
});

// IPC events
ipc.on('searchUrl', ipcHandlers.searchUrl);
ipc.on('downloadVideo', ipcHandlers.downloadVideo);

// Main application menu template
const mainMenuTemplate = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Quit',
				click: function() {
					app.quit();
				},
				accelerator: 'CmdOrCtrl + Q'
			}
		]
	},
	{
		label: 'Edit',
		submenu: [
			{ role: 'undo' }, 
			{ role: 'redo' }, 
			{ type: 'separator' }, 
			{ role: 'cut' }, 
			{ role: 'copy' }, 
			{ role: 'paste' }, 
			{ role: 'pasteandmatchstyle' }, 
			{ role: 'delete' }, 
			{ role: 'selectall' }, 
		]
	},
	{
		label: 'Help',
		submenu: [
			{ role: 'toggleDevTools' },
			{
				label: 'About electron',
				click: function() {
					electron.shell.openExternal('https://electronjs.org/');
				},
				accelerator: 'CmdOrCtrl + Shift + H'
			}
		]
	}
];