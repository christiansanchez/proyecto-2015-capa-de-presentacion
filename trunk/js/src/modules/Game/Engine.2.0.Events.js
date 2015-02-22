(function(window, document) {

	window.Engine2 = {};

	window.Engine2.Events = (function() {

		return {
			
			NEW_PLAYER: 'newplayer',
			SHOT_PLAYER: 'shotplayer',
			KILL_PLAYER: 'killplayer',
			MOVE_PLAYER: 'moveplayer'
		}

	})()

})(window, document);