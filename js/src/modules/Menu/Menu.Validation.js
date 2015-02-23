(function($, document, window, Events, undefined) {

	window.Menu.Validation = (function() {

			var nameNotEmpty = function(data) {
					return data.name && data.name.length > 0;
				},

				matchSelected = function(data) {
					return data.id;
				};

			return {

				validate: function(data, evt) {
					// var valid = false;

					// switch(evt) {
					// 	case Events.CREATE:
					// 		valid = nameNotEmpty(data);
					// 		break;

					// 	case Events.JOIN:
					// 	case Events.LOAD:
					// 		valid = matchSelected(data);
					// 		break;
					// }

					// return valid;
					return true;
				}
			};

		})();

})(jQuery, document, window, Engine.Events);