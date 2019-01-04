// Libraries
const path = require('path');
const fs = require('fs');
const request = require('request');
const electron = require('electron');
const youtubedl = require('youtube-dl');

// Electron
const app = electron.app;
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
	},
	downloadVideo: function(event, url) {
		const downloadPath = app.getPath('downloads');

		const video = youtubedl(url, ['--format=140'], { cwd: process.cwd() });

		// Will be called when the download starts.
		video.on('info', function(info) {
			console.log('Download started');
			console.log('filename:', info._filename);
			console.log('size:', info.size);
		});

		video.pipe(fs.createWriteStream(path.join(downloadPath, 'track.m4a')));

		video.on('end', function() {
			console.log('Finish');
		});
	}
};

// Exports
module.exports = handlers;