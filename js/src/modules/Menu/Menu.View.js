(function($, document, window, Actions, Templates, Validation, undefined) {

	window.Menu.View = (function() {

			var TPL_SUFFIX = '-tpl',

				actions = Actions.get(),
				actionsWrapper = $('#actions'),
				body = $('body'),

				showErrors = function() {

				},

				showStep = function(e) {
					var clicked = $(e.target),
						target 	= clicked.data('target'),
						type 	= clicked.data('type');

					$.modal(
							Templates.compileTemplate(
								target, 
								type ? 
									Menu.getMatches()[type] :
									null
							)
						);
				},

				create = function(e) {
					if(Validation.validate($.serializeForm($(e.target)), Engine.Events.CREATE)) {
						$.pubsub.publish(Engine.Events.NEW_PLAYER, {
							type: 'freightboat'
						});
					} else {
						showErrors();
					}
				},

				join = function(e) {

				},

				load = function(e) {

				},

				back = function(e) {
					$.modal.close();
				};

			return {

				bindEvents: function() {
					$('[data-action="showstep"]').on('click', showStep);
					
					body.on('click', '[data-action="create"]', create);
					body.on('click', '[data-action="join"]', join);
					body.on('click', '[data-action="load"]', load);
					body.on('click', '[data-action="back"]', back);
				}
			};

		})();

})(jQuery, document, window, Menu.Actions, Templates, Menu.Validation);