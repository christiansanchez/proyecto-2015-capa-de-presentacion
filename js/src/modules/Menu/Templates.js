/**
 * The current module takes care of caching and compiling the templates
 * for showing the corresponding modal for each of the menu options
 */
(function($, document, window, undefined) {

	window.Templates = (function() {

			var templates = {},

				DEFAULT_WRAPPER = '#tpl-wrapper',
				selector 		= 'script',
				dataAttribute 	= 'action',

				cacheTemplates = function(wrapper) {
					var templateWrapper = wrapper || DEFAULT_WRAPPER;

					$(templateWrapper).find(selector).each(function() {
						var currentTpl = $(this);
						templates[currentTpl.data(dataAttribute)] = _.template($.trim(currentTpl.html()));
					});
				};

			return {
				
				init: function(wrapper) {
					cacheTemplates(wrapper);
				},

				compileTemplate: function(action, data) {
					return templates[action](data);
				},

				/**
				 * For debugging purposes only
				 * @return {[type]} [description]
				 */
				getTemplates: function() {
					return templates;
				}
			}

		})();

})(jQuery, document, window);