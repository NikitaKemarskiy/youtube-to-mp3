// Libraries
const path = require('path');
const fs = require('fs');
const request = require('request');
const electron = require('electron');
const youtubedl = require('youtube-dl');
const cheerio = require('cheerio');

// Electron
const app = electron.app;
const shell = electron.shell;
const dialog = electron.dialog;

// Handlers
const handlers = {
	searchUrl: function(event, url) {
		if (url.startsWith('youtube.com/watch?v=')) {
			url = 'https://www.' + url;
		}
		if (url.startsWith('https://www.youtube.com/watch?v=')) {
			const videoId = url.substr(url.indexOf('?v=') + 3, 11);
			const img = `http://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

			request.get(url, function(error, res, body) {
				if (error) {
					console.error(`Error: ${error.message}`);
					dialog.showErrorBox('Error', 'Invalid URL');
					event.sender.send('searchUrlError');
				} else {
					const $ = cheerio.load(body);
					let title = $('title').text();
					title = title.substr(0, title.length - 10);

					const buffer = {
						img,
						title
					};
					console.dir(buffer);
					event.sender.send('searchUrlSuccess', buffer);
				}
			});
		} else {
			dialog.showErrorBox('Error', 'Invalid URL');
			event.sender.send('searchUrlError');
		}
	},
	downloadVideo: function(event, data) {
		const downloadPath = path.join(app.getPath('downloads'), `${data.title}.mp3`);

		const video = youtubedl(data.url, ['-x', '--format=bestaudio', '--audio-format=mp3'], { cwd: process.cwd() });

		video.on('info', function(info) {
			console.log('Download started');
			console.log('filename:', info._filename);
			console.log('size:', info.size);
		});

		video.pipe(fs.createWriteStream(downloadPath));

		video.on('end', function() {
			event.sender.send('downloadVideoSuccess');
		});
	}
};

// Exports
module.exports = handlers;