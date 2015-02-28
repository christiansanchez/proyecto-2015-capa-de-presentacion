(function() {

	window.Test = (function() {

//		Engine.init();

		return {

			startGame: function() {
				$.pubsub.publish(Engine.Events.NEW_PLAYER, {type: 'freightBoat'})
				$.pubsub.publish(Engine.Events.NEW_PLAYER, {type: 'speedBoat'})
			}

		}

	})();

})();