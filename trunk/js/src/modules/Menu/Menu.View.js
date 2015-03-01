(function($, document, window, Actions, Templates, Validation, Gateway, Methods, Util, undefined) {

	window.Menu.View = (function() {

			var TPL_SUFFIX = '-tpl',

				actions = Actions.get(),
				actionsWrapper = $('#actions'),
				body = $('body'),

				showErrors = function() {
					var errors = Validation.getErrors();

					$('.actions-modal').after(errors[0]);
				},

				/*showModal = function(target, data) {
					$.modal(
							Templates.compileTemplate(
								target, 
								data
							)
						);
				},*/

				showModal = function(evt, data) {
					if(evt == Methods.getGetJoinMethod()) {
						var currentMatches = Matches.getMatches();

						if(currentMatches && !_.isEmpty(currentMatches)) {
							data = Util.removeOwnMatches(data, currentMatches);
						}
					}

					$.modal(
							Templates.compileTemplate(
								evt,
								data && data.length && data[0].nombrePartida ?
									{ 
										partidas: data
									} :
									{
										partidas: []
									}
							)
						);
				},

				showStep = function(e) {
					var clicked = $(e.target),
						data 	= clicked.data(),
						deferred;

					if(data.method) {
						SocketManager.send(
								Util.parseToSendWebSocketData(
										data.method,
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

				create = function(e) {
					var data = $(e.target).serializeForm();

					if(Validation.validate(data, Engine.Events.CREATE)) {
						Matches.addMatch(data);
						SocketManager.send(
							Util.parseToSendWebSocketData(
								SocketManager.Methods.getCreateMethod(),
								data	
							)
						);
					} else {
						showErrors();
					}
				},

				join = function(e) {
					var data = $(e.target).serializeForm();
					data = Util.parseToObject(data.nombrePartida)[0];

					if(Validation.validate(data, Engine.Events.JOIN)) {
						SocketManager.send(
							Util.parseToSendWebSocketData(
								SocketManager.Methods.getJoinMethod(),
								{
									nombrePartida: data.nombrePartida,
									rolPartida: data.rolPartida,
									tipoMapa: data.tipoMapa,
									type: 'speedBoat'
								}	
							)
						);
					} else {
						showErrors();
					}
				},

				load = function(e) {
					var data = $(e.target).serializeForm();

					if(Validation.validate(data, Engine.Events.LOAD)) {
						SocketManager.send(
								Util.parseToSendWebSocketData(
									Methods.getLoadMethod(),
									data
								)
							);

					} else {
						showErrors();
					}
				},

				back = function(e) {
					$.modal.close();
				},
				
				save = function(e) {
					var freightBoat = Game.getFreightBoat(),
						speedBoats 	= Game.getSpeedBoats(),
						match 		= Game.getMatch(),
						dataToSave  = Util.parseToSaveMatch(freightBoat, speedBoats, match);

					SocketManager.send(dataToSave);
				},

				abandon = function(e) {
					$.modal.close();

					var match = Game.getMatch();

					/**
					 * For the case when the user creates a match and then
					 * click on "Cancelar"
					 */
					if(match) {
						match = Matches.getMatches()[0];
					}

					SocketManager.send(
							Util.parseToSendWebSocketData(
								'abandonar',
								match
							)
						);
				};

			return {

				bindEvents: function() {
					$('[data-action="showstep"]').on('click', showStep);
					
					body.on('submit', '[data-action="create"]', create);
					body.on('submit', '[data-action="join"]', join);
					body.on('submit', '[data-action="load"]', load);
					body.on('click', '[data-action="abandon"]', abandon);
					body.on('click', '[data-action="save"]', save);
					
					body.on('click', '[data-action="back"]', back);
				},

				showModal: showModal,

				showWaiting: showWaiting
			};

		})();

})(jQuery, document, window, Menu.Actions, Templates, Menu.Validation, Gateway, SocketManager.Methods, window.Util);