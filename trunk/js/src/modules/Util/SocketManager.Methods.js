(function(window, document, pubsub, Util, undefined) {

	window.SocketManager = {}

	window.SocketManager.Methods = (function() {

		var CREATE 		= 'setPartida',
			GET_JOIN 	= 'getUnirsePartida',
			JOIN 		= 'unirse',
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

})(window, document, jQuery.pubsub, window.Util);=======
(function(window, document, pubsub, Util, undefined) {

	window.SocketManager = {}

	window.SocketManager.Methods = (function() {

		var JOIN 	= 'unirse',
			SHOOT 	= 'disparar',
			KILL 	= 'matar',
			ARRIVE 	= 'llegar';

		return {

			getJoinMethod: function() {
				return JOIN;
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
