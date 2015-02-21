(function($, document, window, Actions, Templates, undefined) {

	window.Menu.View = (function() {

			var TPL_SUFFIX = '-tpl',

				actions = Actions.get(),
				actionsWrapper = $('#actions'),
				body = $('body'),

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
					actionsWrapper.on('click', '[data-action="showstep"]', showStep);
					
					body.on('click', '[data-action="create"]', create);
					body.on('click', '[data-action="join"]', join);
					body.on('click', '[data-action="load"]', load);
					body.on('click', '[data-action="back"]', back);
				}
			};

		})();

})(jQuery, document, window, Menu.Actions, Templates);