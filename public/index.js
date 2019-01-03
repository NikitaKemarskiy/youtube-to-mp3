window.onload = function() {
	// Libraries
	const electron = require('electron');

	// Electron
	const ipc = electron.ipcRenderer;

	// DOM constants
	const searchInput = document.querySelector('div.search-block input');
	const searchButton = document.querySelector('div.search-button');

	// Click events
	searchButton.addEventListener('click', function(event) {
		const url = searchInput.value;
		if (!!url) { // If url is not empty / undefined
			ipc.send('searchUrl', url);
			if (searchInput.classList.contains('error')) {
				searchInput.classList.remove('error');
			}
		} else {
			searchInput.classList.add('error');
		}
	});

	// IPC events
}