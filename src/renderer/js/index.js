window.onload = function() {
	// Libraries
	const path = require('path');
	const electron = require('electron');

	// Functions
	const functions = require(path.join(__dirname, '..', 'js', 'functions.js'));

	// Initialization
	functions.buildSearchPage();

	// Electron
	const ipc = electron.ipcRenderer;

	// DOM elements
	let searchInput = document.querySelector('div.search-block input');
	let searchButton = document.querySelector('div.search-button');
	let videoPreviewButton = null;
	let returnToSearchButton = null;

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
				const title = document.querySelector('div.video-preview-title').textContent;
				ipc.send('downloadVideo', {
					url,
					title
				});
				videoPreviewButton.removeEventListener('click', handlers.videoPreviewButtonClick);
			}
		},
		returnToSearchButtonClick: function(event) {
			returnToSearchButton.removeEventListener('click', handlers.returnToSearchButtonClick);
			videoPreviewButton.removeEventListener('click', handlers.videoPreviewButtonClick);

			videoPreviewButton = null;
			returnToSearchButton = null;

			functions.clearBody();
			functions.buildSearchPage();

			searchInput = document.querySelector('div.search-block input');
			searchButton = document.querySelector('div.search-button');

			searchButton.addEventListener('click', handlers.searchButtonClick);
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
		returnToSearchButton = document.querySelector('div.return-to-search-button');

		videoPreviewButton.addEventListener('click', handlers.videoPreviewButtonClick);
		returnToSearchButton.addEventListener('click', handlers.returnToSearchButtonClick);
	});
	ipc.on('searchUrlError', function(event) {
		searchInput.classList.add('error');
		searchButton.addEventListener('click', handlers.searchButtonClick);
		url = null;
	});
	ipc.on('downloadVideoWait', function(event) {
		functions.addWaitWrapper();
	});
	ipc.on('downloadVideoSuccess', function(event) {
		functions.removeWaitWrapper();
	});
}