(function($, document, window, General, undefined) {

	window.Gateway = {};

	window.Gateway.Methods = (function() {

			var methods = {
					CREATE: 'setPartida', 
					GET_JOIN: 'getUnirsePartida',
					GET_LOAD: 'getCargarPartida',
					SET_JOIN: 'setUnirsePartida',
					SET_LOAD: 'setCargarPartida'
				};

			return {

				getCreateMethod: function() {
					return methods.CREATE;
				},

				getJoinMethod: function () {
					return methods.GET_JOIN;
				},

				getLoadMethod: function() {
					return methods.GET_LOAD;
				},

				getSetJoinMethod: function () {
					return methods.SET_JOIN;
				},

				getSetLoadMethod: function() {
					return methods.SET_LOAD;
				}
			}

		})();

})(jQuery, document, window, window.Config.General);