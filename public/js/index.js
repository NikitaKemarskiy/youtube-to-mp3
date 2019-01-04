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

	// Listeners
	const handlers = {
		searchButtonClick: function(event) {
			const url = searchInput.value;
			if (!!url) { // If url is not empty / undefined
				ipc.send('searchUrl', url);
				searchButton.removeEventListener('click', handlers.searchButtonClick);
				if (searchInput.classList.contains('error')) {
					searchInput.classList.remove('error');
				}
			} else {
				searchInput.classList.add('error');
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
	});
	ipc.on('searchUrlError', function() {
		searchInput.classList.add('error');
		searchButton.addEventListener('click', handlers.searchButtonClick);
	});
}