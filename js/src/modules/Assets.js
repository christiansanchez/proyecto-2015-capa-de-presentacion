(function($, window, document, General, undefined) {

	window.Assets = (function() {

		var types = General.getAssetTypes(),
			images = [
				{
					tag: 'sea', 
					file: 'sea-pattern.jpg',
					type: types.SPRITE
				},
				{
					tag: 'freightboat',
					file: 'freight-boat.png'
				},
				{
					tag: 'speedboat',
					file: 'speedboat.png'
				},
				{
					tag: 'savebutton',
					file: 'save-button.jpg'
				},
				{
					tag: 'loadbutton',
					file: 'load-button.jpg'
				},
				{
					tag: 'water',
					file: 'water.png'
				},
				{
					bullet: 'bullet',
					file: 'bullet.png'
				}

			];

		return {

			getImages: function() {
				return images;
			}

		} 

	})();

})(jQuery, window, document, Config.General);