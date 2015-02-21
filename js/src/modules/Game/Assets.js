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
					file: 'freightboat.png'
				},
				{
					tag: 'speedboat',
					file: 'speedboat.png'
				},
				{
					tag: 'bullet',
					file: 'bullet.png'
				},
				{
					tag: 'island',
					file: 'island.png'
				}

			];

		return {

			getImages: function() {
				return images;
			}

		} 

	})();

})(jQuery, window, document, Config.General);