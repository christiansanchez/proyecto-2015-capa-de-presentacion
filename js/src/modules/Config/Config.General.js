(function($, window, document) {

	window.Config.General = (function() {
			/**
			 * General App settings
			 */
		var ASSETS_PATH = 'assets/',

			ASSET_TYPES = {
				SPRITE: 'sprite',
				IMAGE: 'image'
			},

			//SERVICE_URL = 'http://localhost:8080/axis2/services/WsFactibilidad/',
			SERVICE_URL = 'http://localhost:8080/axis2/services/wservicejuego';
			SOCKET_URL 	= 'ws://localhost:8080/examples/websocket/chat';
			//SERVICE_URL = 'http://192.168.43.249/axis2/services/WsFactibilidad/';

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