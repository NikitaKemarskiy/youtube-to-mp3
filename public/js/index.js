window.onload = function() {
	// Libraries
	const path = require('path');
	const electron = require('electron');

	// Functions
	const functions = require(path.join(process.cwd(), 'public', 'js', 'functions.js'));

	// Initialization
	functions.buildSearchPage();

	// Electron
	const ipc = electron.ipcRenderer;

	// DOM elements
	let searchInput = document.querySelector('div.search-block input');
	let searchButton = document.querySelector('div.search-button');
	let videoPreviewButton = null;

	// Variables
	let url = null;

	// Listeners
	const handlers = {
		searchButtonClick: function(event) {
			url = searchInput.value;
			if (!!url) { // Url isn't empty / undefined
				ipc.send('searchUrl', url);
				searchButton.removeEventListener('click', handlers.searchButtonClick);
				if (searchInput.classList.contains('error')) {
					searchInput.classList.remove('error');
				}
			} else {
				url = null;
				searchInput.classList.add('error');
			}
		},
		videoPreviewButtonClick: function(event) {
			if (!!url) { // Current video url is defined
				ipc.send('downloadVideo', url);
				videoPreviewButton.removeEventListener('click', handlers.videoPreviewButtonClick);
			}
		}
	}

	// Click events
	searchButton.addEventListener('click', handlers.searchButtonClick);

	// IPC events
	ipc.on('searchUrlSuccess', function(event, data) {
		searchInput = null;
		searchButton = null;

		functions.clearBody();
		functions.buildVideoPreviewPage(data.img, data.title);
	
		videoPreviewButton = document.querySelector('div.video-preview-button');

		videoPreviewButton.addEventListener('click', handlers.videoPreviewButtonClick);
	});
	ipc.on('searchUrlError', function() {
		searchInput.classList.add('error');
		searchButton.addEventListener('click', handlers.searchButtonClick);
		url = null;
	});
}