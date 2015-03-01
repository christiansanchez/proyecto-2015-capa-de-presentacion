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
					tag: 'isla',
					file: 'isla.png'
				},
				{
					tag: 'costa-izquierda',
					file: 'costa-izquierda.png'
				},
				{
					tag: 'costa-derecha',
					file: 'costa-derecha.png'
				},
				{
					tag: 'costa-arriba',
					file: 'costa-arriba.png'
				},
				{
					tag: 'costa-abajo',
					file: 'costa-abajo.png'
				},
				{
					tag: 'port',
					file: 'port.png'
				}

			];

		return {

			getImages: function() {
				return images;
			}

		} 

	})();

})(jQuery, window, document, Config.General);