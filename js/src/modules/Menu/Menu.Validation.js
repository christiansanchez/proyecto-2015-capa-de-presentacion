(function($, document, window, Events, undefined) {

	window.Menu.Validation = (function() {

			var errors = [],
				errorTpl = _.template($('#error-tpl').html()),

				reset = function() {
					errors = [];
					$('.error').remove();
				},

				nameNotEmpty = function(data) {
					var valid = data.nombrePartida && data.nombrePartida.length > 0 && /^[a-zA-Z0-9 ]*$/.test(data.nombrePartida),
						message = valid ? '' : 'Por favor, ingresa un nombre para la partida (sólamente letras, números y espacios).';

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
				}, 

				applyTemplate = function(message) {
					return errorTpl({
							message: message
						});
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
						errors.push(applyTemplate(result.message));
					}

					return !!result.valid;
				},

				getErrors: function() {
					return errors;
				}
			};

		})();

})(jQuery, document, window, Engine.Events);