(function($, window, document, Config, Engine, Map, General, undefined) {

	_.extend(window.Game, (function() {

			var instance,

				hasIsland 			= false,
				players 			= Engine.getPlayers(),
				bulletsQty 			= window.Config.Player.getBullets(),

				/**
				 * Keys controllers
				 */
				cursors,
				fireButton,
				changeCharacterButton,

				initControls = function(game) {
					cursors = game.input.keyboard.createCursorKeys();

					/**
					 * Prevents both the spacebar and tab keys
					 * to trigger the browsers default behavior
					 */
					game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.TAB]);
				    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
				    changeCharacterButton = game.input.keyboard.addKey(Phaser.Keyboard.TAB);
				},

				preload = function(game) {
					var images 	= Assets.getImages(),
						path 	= General.getAssetsPath();

					for(image in images) {
						var currentImage = images[image];
						game.load.image(currentImage.tag, path + currentImage.file);
					}
				},

				create = function(game) {
					game.physics.startSystem(Phaser.Physics.ARCADE);

					game = Map.addBackground(game, 'sea');

					/**
					 * To randomly add an island or not
					 */
					if((Math.random * 3) > 1) {
						var island = Map.addGroup(game, Config.Boat.getGroupConfig());
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
							group = Map.addGroup(game, Config.Boat.getGroupConfig());

						for(var j = 0, boat; boat = boats[j]; j++) {
							_.extend(boat,
								Map.addObject(
									game, 
									group, 
									{
										x: game.world.randomX, 
										y: Config.Player.isFreightBoat(boat.getType()) ?
											0 :
											game.world.randomY
									},
									player.getSprite(),
									Config.Boat.getPhysicsConfig()
								)
							);
						}
					}

					/**
					 * Adds the bullets
					 */
					var bullets = Map.addGroup(game, Config.Boat.getGroupConfig());
					for(var i = 0; i < bulletsQty; i++) {
						Map.addObject(
							game, 
							bullets, 
							{
								x: -10, 
								y: -10
							}
						);
					}

					initControls(game);
					currentlyControlled = players[0].getBoats()[0];
				},

				update = function(game) {
					currentlyControlled.body.velocity.x = 0;
				    currentlyControlled.body.velocity.y = 0;
				    currentlyControlled.body.angularVelocity = 0;

					/**
				     * To turn the boat around
				     */
				    if(cursors.left.isDown) {
				        currentlyControlled.body.angularVelocity = -200;
				    } else if(cursors.right.isDown) {
				        currentlyControlled.body.angularVelocity = 200;
				    } 

				    /**
				     * To move it back and forth
				     */
				    if(cursors.up.isDown) {
				        point = game.physics.arcade.velocityFromAngle(currentlyControlled.body.angle, 300, currentlyControlled.body.velocity);
				    } else if(cursors.down.isDown) {
				    	point = game.physics.arcade.velocityFromAngle(currentlyControlled.body.angle, -300, currentlyControlled.body.velocity);
				    }
				};

			return {
				init: function() {
					instance = new Phaser.Game(
						Config.Map.getWidth(), 
						Config.Map.getHeight(), 
						Config.Map.getRender(),
						Config.Map.getContainer(),
						{
							preload: preload,
							create: create,
							update: update
						}
					)
				},

				hasIsland: function() {
					return hasIsland;
				},

				getInstance: function() {
					return instance;
				},

				getCurrentlyControlled: function() {
					return currentlyControlled;
				}
			}

		})());

	/*SocketManager.init();
	SocketManager.startGame();*/

})(jQuery, window, document, window.Config, window.Engine, window.Game.Map, window.Config.General);