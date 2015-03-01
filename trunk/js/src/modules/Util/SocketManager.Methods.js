(function(window, document, pubsub, Util, undefined) {

	window.SocketManager = {}

	window.SocketManager.Methods = (function() {

		var CREATE 		= 'setPartida',
			GET_JOIN 	= 'getUnirsePartida',
			JOIN 		= 'unirse',
			GET_LOAD 	= 'getCargarPartida',
			SET_LOAD	= 'setCargarPartida',
			SHOOT 		= 'disparar',
			KILL 		= 'matar',
			ARRIVE 		= 'llegar';

		return {

			getCreateMethod: function() {
				return CREATE;
			},

			getGetJoinMethod: function() {
				return GET_JOIN;
			},

			getJoinMethod: function() {
				return JOIN;
			},

			getGetLoadMethod: function() {
				return GET_LOAD;
			},

			getLoadMethod: function() {
				return SET_LOAD;
			},

			getShootMethod: function() {
				return SHOOT;
			},

			getKillMethod: function() {
				return KILL;
			},

			getArriveMethod: function() {
				return ARRIVE;
			}
		}

	})();

})(window, document, jQuery.pubsub, window.Util);