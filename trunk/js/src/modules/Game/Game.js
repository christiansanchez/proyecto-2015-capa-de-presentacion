(function($, window, document, Config, Engine, Map, undefined) {

	_.extend(window.Game, (function() {

			var hasIsland = false,
				players = Engine2.getPlayers(),
				bulletsQty = Config.Player.getBullets(),

				preload = function(game) {
					var images 	= Assets.getImages(),
						path 	= General.getAssetsPath();

					for(image in images) {
						var currentImage = images[image];
						game.load.image(currentImage.tag, path + currentImage.file);
					}
				},

				create = function(game) {
					game.sea = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'sea');
					game.sea.fixedToCamera = true;

					map = game.add.group();
					map.enableBody = true;

					/**
					 * To randomly add an island or not
					 */
					if(Math.random * 2 > 1) {
						var island = Map.addGroup(game);
						Map.addObject(game, island, {
							x: game.world.width / 3,
							x: game.world.heigth / 3
						}, 'island')
					}

					/**
					 * Adds the players
					 */
					for(var i = 0, player; player = players[i]; i++) {
						var boats = player.getBoats(), 
							group = Map.addGroup(game);

						for(var i = 0, boat; boat = boats[i]; i++) {
							Map.addObject(
								game, 
								group, 
								{
									x: game.world.randomX, 
									y: Config.Player.isFreightBoat(boat.getType()) ?
										0 :
										game.world.randomY
								},
								Config.Boat.getPhysicsConfig()
							);
						}
					}

					/**
					 * Adds the bullets
					 */
					var bullets = Map.addGroup(game);
					for(var i = 0; i < bulletsQty.length; i++) {
						Map.addObject(
							game, 
							bullets, 
							{
								x: -10, 
								y: -10
							}
						);
					}
				};

			return {
				init: function() {
					new Phaser.Game(
						Config.getWidth(), 
						Config.getHeight(), 
						Config.getRender(),
						Config.getContainer(),
						{
							preload: preload,
							create: create,
							update: update
						}
					)
				},

				hasIsland: function() {
					return hasIsland;
				}
			}

		})());

	/*SocketManager.init();
	SocketManager.startGame();*/

})(jQuery, window, document, window.Config.Map, window.Engine, window.Game.Map);