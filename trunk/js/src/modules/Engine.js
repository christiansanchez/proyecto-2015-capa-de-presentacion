(function($, window, document, General, Player, Assets, Gateway, undefined) {

	window.Engine = (function() {

		var path 	= General.getAssetsPath(),
			types 	= General.getAssetTypes(),
			players	= Player.getPlayers(),
			coords  = {},

			map,
			freightBoat,
			cannons,
			cursors,
			speedBoats,
			bullets, 

			fireButton,
			changeCharacterButton,

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
			},

			fire = function(game) {
				//  To avoid them being allowed to fire too fast we set a time limit
			    if(game.time.now > bulletTime) {
			        //  Grab the first bullet we can from the pool
			        bullet = bullets.getFirstExists(false);

			        if(bullet) {
			            //  And fire it
			            bullet.reset(freightBoat.x, freightBoat.y + 8);
			            //bullet.body.velocity.y = -400;
			            game.physics.arcade.velocityFromAngle(freightBoat.angle + 90, 300, bullet.body.velocity);
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

				freightBoat = freightBoats.create(50, 0, players.freightBoat.sprite)
				freightBoat.anchor.setTo(0.5, 0.5)
				freightBoat.angle = game.rnd.angle();
				freightBoat.angle = 90;

				game.physics.arcade.enable(freightBoat);

				freightBoat.body.bounce.y = 0;
			    freightBoat.body.gravity.y = 0;
			    freightBoat.body.collideWorldBounds = true;
			    freightBoat.body.drag.set(0.2);

			    cursors = game.input.keyboard.createCursorKeys();
			},

			addSpeedBoats = function(game, speedBoats) {
				var separationCoef = players.speedBoat.distance;

				for(var i = 0; i < players.speedBoat.qty; i++) {
					speedBoats.create(separationCoef, 0, players.speedBoat.sprite);
					speedBoats.getAt(i).damage = 0;
					separationCoef += players.speedBoat.distance;
				}

				return speedBoats;
			},

			initSpeedboats = function(game) {
				speedBoats = game.add.group();
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

			computeDamage = function(sb) {
				sb.damage++;
			},

			fireHandler = function(b, sb) {
				b.kill();
				computeDamage(sb);

				if(sb.damage == players.speedBoat.damageLimit) {
					sb.kill();
				}

				if(!speedBoats.getFirstAlive()) {
					alert('The freightboat won.');
				}
			},

			save = function() {
				Gateway.request({
					/**
					 * Both have to be Strings according to the
					 * wsdl definition
					 */
					posX: freightBoat.body.x.toFixed(2),
					posY: freightBoat.body.y.toFixed(2)
				}, 
				'setCoordenadas').then(function(data) {
					console.log('Saved.');
				});
			},

			load = function() {
				Gateway.request(
				{}, 
				'getCoordenadas').then(function(data) {
					data = $(data).find('return').text().split(',');

					freightBoat.position.x = parseFloat(data[0]);
					freightBoat.position.y = parseFloat(data[1]);
					freightBoat.angle = 90;
				});
			},

			addActions = function(game) {
				game.add.button(0, game.world.height - 50, 'savebutton', save, this);
				game.add.button(200, game.world.height - 50, 'loadbutton', load, this);

				/**
			     * Prevents the space from working in the browser
			     * Only works for the game
			     */
			    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.TAB]);
			    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			    changeCharacterButton = game.input.keyboard.addKey(Phaser.Keyboard.TAB);
			};

		return {

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
				freightBoat.body.velocity.x = 0;
			    freightBoat.body.velocity.y = 0;
			    freightBoat.body.angularVelocity = 0;

			    game.physics.arcade.overlap(freightBoats, speedBoats, collisionHandler, null, this);
			    game.physics.arcade.overlap(bullets, speedBoats, fireHandler, null, this);

			    /**
			     * To turn the boat around
			     */
			    if(cursors.left.isDown) {
			        freightBoat.body.angularVelocity = -200;
			    } else if (cursors.right.isDown) {
			        freightBoat.body.angularVelocity = 200;
			    } 

			    /**
			     * To move it back and forth
			     */
			    if(cursors.up.isDown) {
			        game.physics.arcade.velocityFromAngle(freightBoat.angle, 300, freightBoat.body.velocity);
			    } else if(cursors.down.isDown) {
			    	game.physics.arcade.velocityFromAngle(freightBoat.angle, -300, freightBoat.body.velocity);
			    }

			    if(fireButton.isDown) {
			    	fire(game);
			    }
			},

			/**
			 * For debugging purposes.
			 * To be removed.
			 */
			getFreightBoat: function() {
				return freightBoat;
			}
		} 

	})();

})(jQuery, window, document, Config.General, Config.Player, Assets, Gateway);