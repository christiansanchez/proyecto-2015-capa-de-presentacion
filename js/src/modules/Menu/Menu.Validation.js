(function($, document, window, Events, undefined) {

	window.Menu.Validation = (function() {

			var errors = [],

				reset = function() {
					errors = [];
				},

				nameNotEmpty = function(data) {
					var valid = data.nombrePartida && data.nombrePartida.length > 0,
						message = valid ? '' : 'Por favor, ingresa un nombre para la partida.';

					return {
						valid: valid,
						message: message
					};

				},

				matchSelected = function(data) {
					var valid = data.nombrePartida && data.nombrePartida.length > 0,
						message = valid ? '' : 'Por favor, selecciona una partida.';

					return {
						valid: valid,
						message: message
					};
				};

			return {

				validate: function(data, evt) {
					var result;

					reset();

					switch(evt) {
						case Events.CREATE:
							result = nameNotEmpty(data);
							break;

						case Events.JOIN:
						case Events.LOAD:
							result = matchSelected(data);
							break;
					}

					if(!result.valid) {
						errors.push(result.message);
					}

					return !!result.valid;
				},

				getErrors: function() {
					return errors;
				}
			};

		})();

})(jQuery, document, window, Engine.Events);