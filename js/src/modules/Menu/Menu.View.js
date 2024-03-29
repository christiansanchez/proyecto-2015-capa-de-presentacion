(function($, document, window, Actions, Templates, Validation, Gateway, Methods, Util, undefined) {

	window.Menu.View = (function() {

			var TPL_SUFFIX 			= '-tpl',
				IMAGE_PLACEHOLDER 	= '{{=image}}',
				IMG_FREIGHTBOAT 	= 'assets/vistaLateralCarguero.gif',
				IMG_SPEEDBOAT 		= 'assets/vistaLateralLancha.gif',
				
				img 			= '<img src="' + IMAGE_PLACEHOLDER + '">',
				actions 		= Actions.get(),
				actionsWrapper 	= $('#actions'),
				body 			= $('body'),
				saveButton 		= $('[data-action="save"]'),
				winnerBanner 	= $('.winner-banner'),

				getImage = function(id) {
					return id == 'freightboat' ?
							img.replace(IMAGE_PLACEHOLDER, IMG_FREIGHTBOAT) :
							img.replace(IMAGE_PLACEHOLDER, IMG_SPEEDBOAT);
				},

				showErrors = function() {
					var errors = Validation.getErrors();

					$('.actions-modal').after(errors[0]);
				},

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

				showWaiting = function(nombrePartida) {
					var tpl = _.template($('#waiting-tpl').html());
					
					$.modal(
						tpl({
							partida: nombrePartida
						})
					);
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
					data = Util.parseToObject([data.nombrePartida])[0];

					if(Validation.validate(data, Engine.Events.JOIN)) {
						SocketManager.send(
							Util.parseToSendWebSocketData(
								SocketManager.Methods.getJoinMethod(),
								_.extend(data, {
									type: 'speedBoat'
								})
							)
						);
					} else {
						showErrors();
					}
				},

				load = function(e) {
					var data = $(e.target).serializeForm();
					data = Util.parseToObject([data.nombrePartida])[0];

					if(Validation.validate(data, Engine.Events.LOAD)) {
						SocketManager.send(
								Util.parseToSendWebSocketData(
									Methods.getLoadMethod(),
									_.extend(data, {
										type: 'freightboat'
									})
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

				showSaveConfirmation = function() {
					saveButton
						.addClass('clear')
						.html('Partida guardada');

					setTimeout(function() {
						saveButton
							.removeClass('clear')
							.html('Guardar partida');
					}, 3000);
				},

				initGame = function() {
					$('#menu-container').addClass('hidden');
					$('.game-actions').removeClass('hidden');
				},

				endGame = function() {
					$('.game-actions').addClass('hidden');
					$('[data-action="restart"]').removeClass('hidden');
				},

				showWinner = function(id) {
					$('#' + Game.getInstance().parent).hide();

					$(getImage(id)).load(function() {
						winnerBanner
							.html($(this))
							.removeClass('hidden');

						endGame();
					});
				},

				showAbandon = function(e) {
					$.modal($('#abandon-tpl').html());
				},

				abandon = function(e) {
					$.modal.close();

					var match 	= Game.getMatch(),
						data 	= $(e.target).data();

					/**
					 * For the case when the user creates a match and then
					 * clicks on "Cancelar"
					 */
					if(!match) {
						match = Matches.getMatches()[data.partida];
					}

					if(Game.isStarted()) {
						var currentlyControlled = Game.getCurrentlyControlled();

						SocketManager.send(
								Util.parseToSendWebSocketData(
									'abandonar',
									{
										nombrePartida: match.match ? 
														match.match.nombrePartida :
														match.nombrePartida,
										endMatch: true,
										winner: currentlyControlled.id == 'freightboat' ?
													'speedboat' :
													'freightboat'
									}
								)
							);
					} else if(match) {
						SocketManager.send(
								Util.parseToSendWebSocketData(
									'abandonar',
									{
										nombrePartida: match.nombrePartida
									}
								)
							);

						Engine.resetRole();
					}
				},

				handleVolume = function(e) {
					Game.manageVolume($(e.target).data('volume'));
				},

				restart = function() {
					document.location.reload();
				},

				showHelp = function() {
					$.modal($('#help-tpl').html(), {
						overlayClose: true
					});
				};

			return {

				bindEvents: function() {
					$('[data-action="showstep"]').on('click', showStep);
					
					body.on('submit', '[data-action="create"]', create);
					body.on('submit', '[data-action="join"]', join);
					body.on('submit', '[data-action="load"]', load);
					body.on('click', '[data-action="showabandon"]', showAbandon);
					body.on('submit', '[data-action="confirm-abandon"]', abandon);
					body.on('click', '[data-action="save"]', save);
					body.on('click', '[data-action="restart"]', restart);
					body.on('click', '[data-action="show-help"]', showHelp);
					
					body.on('click', '[data-action="back"]', back);
					body.on('click', '[data-volume="off"]', handleVolume);
					body.on('click', '[data-volume="on"]', handleVolume);
				},

				showModal: showModal,
				showWaiting: showWaiting,
				initGame: initGame,
				showSaveConfirmation: showSaveConfirmation,
				showWinner: showWinner
			};

		})();

})(jQuery, document, window, Menu.Actions, Templates, Menu.Validation, Gateway, SocketManager.Methods, window.Util);