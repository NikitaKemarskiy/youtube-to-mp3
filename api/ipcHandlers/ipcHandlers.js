// Libraries
const request = require('request');
const electron = require('electron');
const youtubedl = require('youtube-dl');

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
			youtubedl.getInfo(url, [], function(error, data) {
				if (error) {
					console.error(`Error: ${error.message}`);
					dialog.showErrorBox('Error', 'Invalid URL');
					event.sender.send('searchUrlError');
				} else {
					const buffer = {
						img: data.thumbnail,
						title: data.title,
						url: data.url
					}
					console.dir(buffer);
					event.sender.send('searchUrlSuccess', buffer);
				}
			});
		} else {
			dialog.showErrorBox('Error', 'Invalid URL');
			event.sender.send('searchUrlError');
		}
	}
};

// Exports
module.exports = handlers;