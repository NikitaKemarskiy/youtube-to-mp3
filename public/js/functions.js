// DOM constants
const body = document.querySelector('body');

// Functions
const functions = {
	// Function that clears body
	clearBody: function() {
		while (body.firstChild) {
    		body.removeChild(body.firstChild);
		}
	},
	// Function that builds search page
	buildSearchPage: function() {
		// Main search block
		const search = document.createElement('div');
		search.className = 'search';

		// Blocks inside the main search block
		const searchWrapper = document.createElement('div');
		searchWrapper.className = 'search-block';
		const searchButton = document.createElement('div');
		searchButton.className = 'search-button';

		// Input inside the search wrapper
		const searchInput = document.createElement('input');
		searchInput.placeholder = 'Input the video link here';

		// Icon inside the search button
		const searchIcon = document.createElement('div');
		searchIcon.className = 'search-icon';

		searchWrapper.append(searchInput);
		searchButton.append(searchIcon);
		search.append(searchWrapper);
		search.append(searchButton);

		body.append(search);
	},
	// Function that builds video preview page
	buildVideoPreviewPage: function(img, title) {
		// Return to search page button
		const returnToSearchButton = document.createElement('div');
		returnToSearchButton.className = 'return-to-search-button';

		// Main video preview block
		const videoPreview = document.createElement('div');
		videoPreview.className = 'video-preview';

		// Blocks inside the video preview block
		const videoPreviewImg = document.createElement('img');
		videoPreviewImg.className = 'video-preview-img';
		videoPreviewImg.src = img;
		const videoPreviewTitle = document.createElement('div');
		videoPreviewTitle.className = 'video-preview-title';
		videoPreviewTitle.textContent = title;
		const videoPreviewButton = document.createElement('div');
		videoPreviewButton.className = 'video-preview-button';
		videoPreviewButton.textContent = 'Download mp3';
	
		videoPreview.append(returnToSearchButton);
		videoPreview.append(videoPreviewImg);
		videoPreview.append(videoPreviewTitle);
		videoPreview.append(videoPreviewButton);

		body.append(videoPreview);
	},
	// Function that adds absolute wait wrapper
	addWaitWrapper: function() {
		// Wait absolute wrapper
		const waitWrapper = document.createElement('div');
		waitWrapper.className = 'wait-wrapper';

		body.append(waitWrapper);
	},
	// Function that removes absolute wait wrapper
	removeWaitWrapper: function() {
		const waitWrapper = document.querySelector('div.wait-wrapper');
		if (!!waitWrapper) {
			waitWrapper.remove();
		}
	}
};

// Exports
module.exports = functions;