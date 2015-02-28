(function($, window, document) {

	window.Config = {};

	window.Config.General = (function() {
			/**
			 * General App settings
			 */
		var ASSETS_PATH = 'assets/',

			ASSET_TYPES = {
				SPRITE: 'sprite',
				IMAGE: 'image'
			},
<<<<<<< .mine
			
			HOST		= '127.0.0.1:',
			PORT 		= '8080',
			SOCKET_PORT	= '80',
			SERVICE_URL = 'http://' + HOST + PORT + '/axis2/services/wservicejuego/',
			//SOCKET_URL 	= 'ws://' + HOST + '/servidor/wsocketjuego';
			SOCKET_URL	= 'ws://'+ HOST + PORT + '/servidor/wsocketjuego';
=======
			
			HOST		= 'localhost:8080',
			SERVICE_URL = 'http://' + HOST + '/axis2/services/wservicejuego/',
			//SOCKET_URL 	= 'ws://' + HOST + '/servidor/wsocketjuego';
			SOCKET_URL	= 'ws://127.0.0.1:8080/servidor/wsocketjuego';
>>>>>>> .r15

		return {
			
			getAssetsPath: function() {
				return ASSETS_PATH;
			},

			getAssetTypes: function() {
				return ASSET_TYPES;
			},

			getServiceURL: function() {
				return SERVICE_URL;
			},

			getSocketURL: function() {
				return SOCKET_URL;
			}

		}

	})();

})(jQuery, window, document);