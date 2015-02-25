(function($, document, window, Actions, Templates, Validation, Gateway, Methods, Util, undefined) {

	window.Menu.View = (function() {

			var TPL_SUFFIX = '-tpl',

				actions = Actions.get(),
				actionsWrapper = $('#actions'),
				body = $('body'),

				showErrors = function() {
					alert('There was an error.');
				},

				showModal = function(target, data) {
					$.modal(
							Templates.compileTemplate(
								target, 
								data
							)
						);
				},

				showStep = function(e) {
					var clicked = $(e.target),
						data 	= clicked.data(),
						deferred;

					if(data.method) {
						Gateway.request(null, data.method).then(function(response) {
							response = Util.getResponseText(response);

							if(response) {
								showModal(data.target, {
									partidas: Util.parseWebServiceData(response)
								});
							} else {
								alert('No hay partidas a las que unirse.');
							}
						});
					} else {
						showModal(data.target, null);
					}
				},

				create = function(e) {
					var data = $(e.target).serializeForm();

					if(Validation.validate(data, Engine.Events.CREATE)) {
						Gateway.request({
								nombrePartida: data.nombrePartida,
								rolPartida: data.rolPartida,
								tipoMapa: data.tipoMapa
							},
							Methods.getCreateMethod()
						).then(function(data) {
							data = Util.getResponseText(data);

							if(data) {
								$.pubsub.publish(Engine.Events.NEW_PLAYER, {
									type: 'freightBoat'
								});
							}
						});
					} else {
						showErrors();
					}
				},

				join = function(e) {
					var data = $(e.target).serializeForm();

					if(Validation.validate(data, Engine.Events.JOIN)) {
						Gateway.request(
							data, 
							Methods.getSetJoinMethod()
						).then(function(response) {
							response = Util.getResponseText(response);

							if(response) {
								$.pubsub.publish(
										Engine.Events.NEW_PLAYER, 
										_.extend(data, Util.parseWebServiceData(response))
									);
							}
						});
					} else {
						showErrors();
					}
				},

				load = function(e) {
					var data = $(e.target).serializeForm();

					if(Validation.validate(data, Engine.Events.LOAD)) {
						Gateway.request(
							data,
							Methods.getSetLoadMethod()
						).then(function(response) {
							response = Util.getResponseText(response);

							if(response) {
								$.pubsub.publish(
										Engine.Events.NEW_PLAYER, 
										_.extend(data, Util.parseWebServiceData(response))
									);
							}
						});
					} else {
						showErrors();
					}
				},

				back = function(e) {
					$.modal.close();
				},
				
				save = function(e) {
					var freightBoat = Game.getFreightBoat(),
						speedBoats 	= Game.getSpeedBoats();


				};

			return {

				bindEvents: function() {
					$('[data-action="showstep"]').on('click', showStep);
					
					body.on('submit', '[data-action="create"]', create);
					body.on('submit', '[data-action="join"]', join);
					body.on('submit', '[data-action="load"]', load);
					body.on('click', '[data-action="back"]', back);

					body.on('save', '[data-action="save"]', save);
				}
			};

		})();

})(jQuery, document, window, Menu.Actions, Templates, Menu.Validation, Gateway, Gateway.Methods, window.Util);