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

			HOST		= document.location.host,
			SERVICE_URL = 'http://' + HOST + '/axis2/services/wservicejuego/',
			//SOCKET_URL 	= 'ws://' + HOST + '/servidor/wsocketjuego';
			SOCKET_URL	= 'ws://'+ HOST + '/servidor/wsocketjuego';

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