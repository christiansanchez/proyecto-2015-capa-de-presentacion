(function($, window, document, undefined) {

	window.Menu = {};

	window.Menu.Actions = (function() {

			var CLICK = 'click',
				SUBMIT = 'submit',

				ACTION_PLACEHOLDER = '{{=action}}',
				SELECTOR = '[data-action="' + ACTION_PLACEHOLDER + '"]',

				actions = [
					{
						selector: 'showstep',
						evt: CLICK,
						callback: 'showStep'
					},
					{
						selector: 'create',
						evt: SUBMIT,
						callback: 'create'
					},
					{
						selector: 'join',
						evt: SUBMIT,
						callback: 'join'
					},
					{
						selector: 'load',
						evt: SUBMIT,
						callback: 'load'
					},
					{
						selector: 'back',
						evt: CLICK,
						callback: 'back'
					}
				];

			return {

				get: function() {
					return actions;
				},

				setSelector: function(action) {
					return SELECTOR.replace(ACTION_PLACEHOLDER, action);
				}

			}

		})();

})(jQuery, window, document);