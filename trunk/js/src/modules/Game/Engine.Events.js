(function(window, document) {

	window.Engine = {};

	window.Engine.Events = (function() {

		return {
			
			NEW_PLAYER: 'newplayer',
			SHOT_PLAYER: 'shotplayer',
			KILL_PLAYER: 'killplayer',
			MOVE_PLAYER: 'moveplayer',
			ABANDON_PLAYER: 'abandonplayer'
		}

	})()

})(window, document);