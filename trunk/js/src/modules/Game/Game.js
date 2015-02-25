(function($, window, document, General, Player, Assets, Gateway, undefined) {

	window.Game = (function() {

		var path 	= General.getAssetsPath(),
			types 	= General.getAssetTypes(),
			players	= Player.getPlayers(),
			coords  = {},

			map,
			freightBoat,
			speedBoats,
			cannons,
			cursors,
			bullets, 
			island,
			islandPiece,

			fireButton,
			changeCharacterButton,
			controllingFreightBoat = true,
			currentlyControlled,
			speedBoatIndex,

			/**
			 * To be checked why
			 */
			bulletTime = 0,

			loadImages = function(game) {
				var images = Assets.getImages();

				for(image in images) {
					var currentImage = images[image];
					game.load.image(currentImage.tag, path + currentImage.file);
				}
			},

			initMap = function(game) {
				/**
				 * Generates the background
				 */
				game.sea = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'sea');
				game.sea.fixedToCamera = true;

				map = game.add.group();
				map.enableBody = true;

				island = game.add.group();
				islandPiece = island.create(game.world.width / 2, game.world.height / 2, 'island');
				game.physics.arcade.enable(islandPiece)
				islandPiece.body.bounce.setTo(0, 0);
				islandPiece.body.immovable = true;
				
			},

			fire = function(game) {
				//  To avoid them being allowed to fire too fast we set a time limit
			    if(game.time.now > bulletTime) {
			        //  Grab the first bullet we can from the pool
			        bullet = bullets.getFirstExists(false);

			        if(bullet) {
			            //  And fire it
			            bullet.reset(currentlyControlled.x, currentlyControlled.y + 8);
			            //bullet.body.velocity.y = -400;
			            game.physics.arcade.velocityFromAngle(currentlyControlled.angle + 90, 300, bullet.body.velocity);
			            bulletTime = game.time.now + 200;
			        }
			    }

			},

			initCannons = function(game) {
				var cannonsQty = players.freightBoat.cannons,
					coords = {
						x: freightBoat.body.x + 5,
						y: freightBoat.body.y + 5
					};

				cannons = game.add.group();

				for(var i = 0; i < cannonsQty; i++) {

				    var currentCannon = cannons.create(coords.x, coords.y, 'bullet');
				    game.physics.arcade.enable(currentCannon);

				    coords.x += 5;
				    coords.y += 5;
			    }
			},

			initfreightBoats = function(game) {
				/**
				 * Adding freight boat
				 */
				
				freightBoats = game.add.group();
				freightBoats.name = 'freightboats';

				freightBoat = freightBoats.create(50, 0, players.freightBoat.sprite)
				freightBoat.anchor.setTo(0.5, 0.5);
				freightBoat.angle = game.rnd.angle();
				freightBoat.angle = 90;

				game.physics.arcade.enable(freightBoat);

				freightBoat.body.bounce.y = 0;
			    freightBoat.body.gravity.y = 0;
			    freightBoat.body.collideWorldBounds = true;
			    freightBoat.body.drag.set(0.2);

			    currentlyControlled = freightBoat;
			    cursors = game.input.keyboard.createCursorKeys();
			},

			addSpeedBoats = function(game, speedBoats) {
				var separationCoef = 200,
					health = Config.Boat.getSpeedBoatConfig().stamina;

				for(var i = 0; i < players.speedBoat.qty; i++) {
					var speedBoat = speedBoats.create(separationCoef, 0, players.speedBoat.sprite);
					speedBoat.health = health;

					speedBoat.anchor.setTo(0.5, 0.5)
					speedBoat.angle = game.rnd.angle();
					speedBoat.angle = 90;

					game.physics.arcade.enable(speedBoat);

					speedBoat.body.bounce.y = 0;
				    speedBoat.body.gravity.y = 0;
				    speedBoat.body.collideWorldBounds = true;
				    freightBoat.body.drag.set(0.2);

					separationCoef += 100;
				}

				return speedBoats;
			},

			initSpeedboats = function(game) {
				speedBoats = game.add.group();
				speedBoats.name = 'speedboats';
				speedBoats.enableBody = true;
				speedBoats.physicsBodyType = Phaser.Physics.ARCADE;

				speedBoats = addSpeedBoats(game, speedBoats);
			},

			initBullets = function(game) {
				var bulletQty = Player.getBullets();

				bullets = game.add.group();
			    bullets.enableBody = true;
			    bullets.physicsBodyType = Phaser.Physics.ARCADE;

			    for(var i = 0; i < bulletQty; i++) {
				    var currentBullet = bullets.create(-20, -20, 'bullet');

				    currentBullet.anchor.x = 0.5;
				    currentBullet.anchor.y = 0.5;
				    currentBullet.outOfBoundsKill = true;
				    currentBullet.checkWorldBounds = true;
				    currentBullet.angle = game.rnd.angle();
				    
				    game.physics.arcade.enable(currentBullet);
			    }
			},

			collisionHandler = function(fb, sb) {
				sb.kill();
			},

			stopGoing = function(fb, i) {
				fb.body.angularVelocity = 0;
			},

			computeDamage = function(sb) {
				sb.health--;
			},

			fireHandler = function(b, sb) {
				b.kill();
				computeDamage(sb);

				if(sb.health == 0) {
					sb.kill();
				}

				if(!speedBoats.getFirstAlive()) {
					alert('The freightboat won.');
				}
			},

			addActions = function(game) {
				/**
			     * Prevents the space from working in the browser
			     * Only works for the game
			     */
			    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.TAB]);
			    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			    changeCharacterButton = game.input.keyboard.addKey(Phaser.Keyboard.TAB);
			},

			changeCharacter = function(game) {
				if(changeCharacterButton._justDown) {
					if(controllingFreightBoat) {
						controllingFreightBoat = false;
						speedBoatIndex = 0;
						currentlyControlled = speedBoats.children[speedBoatIndex];
					} else if(speedBoatIndex < speedBoats.children.length - 1) {
						speedBoatIndex++;
						currentlyControlled = speedBoats.children[speedBoatIndex];
					} else {
						currentlyControlled = freightBoat;
						controllingFreightBoat = true;
						speedBoatIndex = 0;
					}
				}
			};

		return {

			init: function() {
				var self = this;

				instance = new Phaser.Game(
					Config.Map.getWidth(), 
					Config.Map.getHeight(), 
					Config.Map.getRender(),
					Config.Map.getContainer(),
					{
						preload: self.preload,
						create: self.create,
						update: self.update
					}
				)

				$('#menu-container').addClass('hidden');
				$('#game-wrapper').removeClass('hidden');
			},

			preload: function(game) {
				loadImages(game);
			},

			create: function(game) {
				game.physics.startSystem(Phaser.Physics.ARCADE);

				initMap(game);
				initfreightBoats(game);
				initSpeedboats(game);
				initBullets(game);
				addActions(game);
			},

			update: function(game) {
				currentlyControlled.body.velocity.x = 0;
			    currentlyControlled.body.velocity.y = 0;
			    currentlyControlled.body.angularVelocity = 0;

			    game.physics.arcade.overlap(freightBoats, speedBoats, collisionHandler, null, this);
			    game.physics.arcade.overlap(bullets, speedBoats, fireHandler, null, this);
			    game.physics.arcade.collide(freightBoats, islandPiece);
			    game.physics.arcade.collide(speedBoats, islandPiece);

			    /**
			     * To turn the boat around
			     */
			    if(cursors.left.isDown) {
			        currentlyControlled.body.angularVelocity = -200;
			    } else if (cursors.right.isDown) {
			        currentlyControlled.body.angularVelocity = 200;
			    } 

			    /**
			     * To move it back and forth
			     */
			    if(cursors.up.isDown) {
			        game.physics.arcade.velocityFromAngle(currentlyControlled.angle, 300, currentlyControlled.body.velocity);
			    } else if(cursors.down.isDown) {
			    	game.physics.arcade.velocityFromAngle(currentlyControlled.angle, -300, currentlyControlled.body.velocity);
			    }

			    if(fireButton.isDown) {
			    	fire(game, currentlyControlled);
			    }

			    if(changeCharacterButton.isDown) {
			    	changeCharacter(game, changeCharacterButton);
			    }
			},

			getFreightBoat: function() {
				return freightBoat;
			},

			getSpeedBoats: function() {
				return speedBoats;
			},

			setFreightBoat: function(currentFreightboat) {
				freightBoat = currentFreightboat;
			},

			setSpeedboats: function(currentSpeedBoats) {
				speedBoats = currentSpeedBoats;
			},

			getChangeCharacterButton: function() {
				return changeCharacterButton;
			},

			getCurrentlyControlled: function() {
				return currentlyControlled;
			}
		} 

	})();

})(jQuery, window, document, Config.General, Config.Player, Assets, Gateway);