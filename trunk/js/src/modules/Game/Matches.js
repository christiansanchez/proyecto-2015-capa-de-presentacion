(function(window, document, pubsub, Util, undefined) {

	window.Matches = (function() {

		var matches = {};

		return {

			addMatch: function(match) {
				matches[match.nombrePartida] = _.extend(match, {
						players: []	
					});
			},

			getMatch: function(name) {
				return matches[name];
			},

			addPlayer: function(name, player) {
				var match = matches[name];
				match.players.push(player);
			},

			getPlayers: function(name) {
				return matches[name].players;
			},

			getMatches: function() {
				return matches;
			}
		}

	})();

})(window, document, jQuery.pubsub, window.Util);