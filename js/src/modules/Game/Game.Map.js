(function($, window, document, Config, Engine, undefined) {

	window.Game = {};

	window.Game.Map = (function() {

			var setOptions = function(game, obj, options) {
					for(attr in options) {
						/**
						 * For the objects to have an angular velocity
						 * associated, the sprite must have an angle assigned
						 */
						if(attr == 'angle') {
							obj.angle = game.rnd.angle();
							obj.angle = options[attr];
						} else if(attr == 'anchor') {
							obj.anchor.setTo(options[attr].x, options[attr].y);
						} else {
							if(attr == 'body') {
								game.physics.arcade.enable(obj);
							}

							_.extend(obj[attr], options[attr]);
						}
					}

					return obj;
				}

			return {
				
				addBackground: function(game, sprite) {
					game.bkg = game.add.tileSprite(0, 0, game.world.width, game.world.height, sprite);
					game.bkg.fixedToCamera = true;

					map = game.add.group();
					map.enableBody = true;

					return game;
				},

				addGroup: function(game, options) {
					var newGroup = game.add.group();
					
					return options && !_.isEmpty(options) ?
							setOptions(game, newGroup, options) :
							newGroup;
				},

				addObject: function(game, group, coords, sprite, options) {
					var obj = group.create(coords.x, coords.y, sprite);
					game.physics.enable(obj, Phaser.Physics.ARCADE);

					return options && !_.isEmpty(options) ?
							setOptions(game, obj, options) :
							obj;
				}
			}

		})();

})(jQuery, window, document, window.Config.Map, window.Engine);