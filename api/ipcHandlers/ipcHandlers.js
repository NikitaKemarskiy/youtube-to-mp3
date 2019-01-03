// Libraries
const request = require('request');
const electron = require('electron');

// Functions

// Electron
const shell = electron.shell;
const dialog = electron.dialog;

// Handlers
const handlers = {
	searchUrl: function(event, url) {
		if (url.startsWith('youtube.com/watch?')) {
			url = 'https://www.' + url;
		}
		if (url.startsWith('https://www.youtube.com/watch?')) {
			/*request.get(url, function(error, res, body) {
				if (error) {
					event.sender.send('searchUrlError', 'Error: invalid URL');
					dialog.showErrorBox('Error', 'Invalid URL');
				} else if (!body) {
					event.sender.send('searchUrlError', 'Error: invalid URL');
					dialog.showErrorBox('Error', 'Invalid URL');
				} else {
					console.log(body);
				}
			});*/
		}
	}
};

// Exports
module.exports = handlers;