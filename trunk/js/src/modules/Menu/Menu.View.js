(function($, document, window, Actions, Templates, Validation, Gateway, Methods, Util, undefined) {

	window.Menu.View = (function() {

			var TPL_SUFFIX = '-tpl',

				actions = Actions.get(),
				actionsWrapper = $('#actions'),
				body = $('body'),

				showErrors = function() {
					alert('There was an error.');
				},

<<<<<<< .mine
				/*showModal = function(target, data) {
=======
				showModal = function(target, data) {
>>>>>>> .r15
					$.modal(
							Templates.compileTemplate(
								target, 
								data
							)
						);
				},*/

				showModal = function(evt, data) {
					$.modal(
							Templates.compileTemplate(
								evt,
								{ 
									partidas: data
								}
							)
						);
				},

<<<<<<< .mine
				showStep = function(e) {
					var clicked = $(e.target),
						data 	= clicked.data(),
						deferred;

					if(data.method) {
						SocketManager.send(
								Util.parseToSendWebSocketData(
										SocketManager.Methods.getGetJoinMethod(),
										data
									)
							);
					} else {
						showModal(data, null);
					}
				},

				showWaiting = function() {
					$.modal($('#waiting-tpl').html());
				},

=======
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

>>>>>>> .r15
				create = function(e) {
<<<<<<< .mine
					var data = $(e.target).serializeForm();

					if(Validation.validate(data, Engine.Events.CREATE)) {
						SocketManager.send(
							Util.parseToSendWebSocketData(
								SocketManager.Methods.getCreateMethod(),
								{
									nombrePartida: data.nombrePartida,
									rolPartida: data.rolPartida,
									tipoMapa: data.tipoMapa
								}	
							)
						);

=======
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
>>>>>>> .r15
					} else {
						showErrors();
					}
				},

				join = function(e) {
<<<<<<< .mine
					var data = $(e.target).serializeForm();
					data = Util.parseToObject(data.nombrePartida);
=======
					var data = $(e.target).serializeForm();
>>>>>>> .r15

<<<<<<< .mine
					if(Validation.validate(data[0], Engine.Events.JOIN)) {
						SocketManager.send(
							Util.parseToSendWebSocketData(
								SocketManager.Methods.getJoinMethod(),
								{
									nombrePartida: data[0].nombrePartida,
									rolPartida: data[0].rolPartida,
									tipoMapa: data[0].tipoMapa
								}	
							)
						);

						$.pubsub.publish(Engine.Events.NEW_PLAYER, {
							type: 'speedBoat'
						});
					} else {
						showErrors();
					}
=======
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
>>>>>>> .r15
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
<<<<<<< .mine

					body.on('save', '[data-action="save"]', save);
				},

				showModal: showModal,

				showWaiting: showWaiting
=======

					body.on('save', '[data-action="save"]', save);
				}
>>>>>>> .r15
			};

		})();

})(jQuery, document, window, Menu.Actions, Templates, Menu.Validation, Gateway, Gateway.Methods, window.Util);