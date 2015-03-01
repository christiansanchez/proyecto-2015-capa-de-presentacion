(function($, window, document, General, Player, Assets, Gateway, undefined) {

	window.Game = (function() {

		var GAME_ACTION = 'dibujar',
			instance,
			matchName,
			match,
			BarcoRadar = 400,
			RangoAtaque = BarcoRadar / 2,
			muelleLlegada,

			counter = 0,
			path 	= General.getAssetsPath(),
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
			island,
			island2,
			island3,
			island4,
			island5,
			island6,
			island7,
			island8,
			island9,
			island10,
			island11,
			island12,
			island13,
			island14,
			island15,

			costas,
			costa,
			costa2,
			costaDerecha,
			costaArriba,
			costaArriba2,
			costaAbajo,
			costaAbajo2,

			fireButton,
			changeCharacterButton,
			currentlyControlled,
			speedBoatIndex,

			/**
			 * To be checked why
			 */
			bulletTime = 0,
			gameStarted = false,
			playerData,

			initCurrentlyControlled = function(role, game) {
				if(!Config.Player.isFreightBoat(role)) {
					currentlyControlled = speedBoats.children[0];
				} else {
					currentlyControlled = freightBoat;
				}

				game.camera.follow(currentlyControlled);
			},

			loadImages = function(game) {
				game.world.setBounds(0, 0, 3000, 2000);

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

				costas = game.add.group();
				costas.create(0, 190, 'costa-izquierda');
				costas.create(0, 1200, 'costa-izquierda');
				costas.create(900, 0, 'costa-arriba');
				costas.create(1700, 0, 'costa-arriba');
				costas.create(600, 1820, 'costa-abajo');
				costas.create(1400, 1820, 'costa-abajo');
				costas.create(1400, 1820, 'costa-derecha');
				costas.create(2820, 400, 'costa-derecha');
				
				for(var i = 0, coast; coast = costas.children[i]; i++) {
					game.physics.arcade.enable(coast);
					coast.body.bounce.setTo(0, 0);
					coast.body.immovable = true;
				}

				if(match.tipoMapa == 'ISLAS') {
					island = game.add.group();
					//islandPiece = island.create(100, 400, 'isla');
					//game.physics.arcade.enable(islandPiece)
					//islandPiece.body.bounce.setTo(0, 0);
					//islandPiece.body.immovable = true;

					island.create(590, 50, 'isla');
					island.create(720, 380, 'isla');
					island.create(1100, 290, 'isla');
					island.create(1500, 240, 'isla');
					island.create(300, 720, 'isla');
					island.create(850, 790, 'isla');
					island.create(1400, 690, 'isla');
					island.create(400, 1220, 'isla');
					island.create(780, 1400, 'isla');
					island.create(1150, 1100, 'isla');
					island.create(1350, 1500, 'isla');
					island.create(2290, 120, 'isla');
					island.create(1890, 690, 'isla');
					island.create(2390, 980, 'isla');
					island.create(1890, 1550, 'isla');

					game.physics.arcade.enable(island);

					for(var i = 0, islandPiece; islandPiece = island.children[i]; i++) {
						game.physics.arcade.enable(islandPiece);
						islandPiece.body.bounce.setTo(0, 0);
						islandPiece.body.immovable = true;
					}

					// island = game.add.sprite(590, 50, 'isla');
					// island2 = game.add.sprite(720, 380, 'isla');
					// island3 = game.add.sprite(1100, 290, 'isla');
					// island4 = game.add.sprite(1500, 240, 'isla');
					
					// island5 = game.add.sprite(300, 720, 'isla');
					// island6 = game.add.sprite(850, 790, 'isla');
					// island7 = game.add.sprite(1400, 690, 'isla');
					
					// island8 = game.add.sprite(400, 1220, 'isla');
					// island9 = game.add.sprite(780, 1400, 'isla');
					// island10 = game.add.sprite(1150, 1100, 'isla');			
					// island11 = game.add.sprite(1350, 1500, 'isla');
					
					// island12 = game.add.sprite(2290, 120, 'isla');
					// island13 = game.add.sprite(1890, 690, 'isla');
					// island14 = game.add.sprite(2390, 980, 'isla');
					// island15 = game.add.sprite(1890, 1550, 'isla');
				}


			},

			fire = function(game, data) {
				var toMove = getToMove(data);

				//  To avoid them being allowed to fire too fast we set a time limit
				if(toMove.id == 'freightboat') {
				    if(game.time.now > bulletTime) {
				        //  Grab the first bullet we can from the pool
				        bullet = bullets.getFirstExists(false);

				        if(bullet) {
				            //  And fire it
				            bullet.reset(toMove.x, toMove.y + 8);
				            //bullet.body.velocity.y = -400;
				            game.physics.arcade.velocityFromAngle(toMove.angle + 90, 300, bullet.body.velocity);
				            bulletTime = game.time.now + 200;
				        }
				    }
			    } else {
			    	if(game.time.now > bulletTime) {
				        //  Grab the first bullet we can from the pool
				        bullet = bullets.getFirstExists(false);

				        if(bullet) {
				            //  And fire it
				            bullet.reset(toMove.x + 40, toMove.y + 22);
				            //bullet.body.velocity.y = -400;
				            game.physics.arcade.velocityFromAngle(toMove.angle, 300, bullet.body.velocity);
				            bulletTime = game.time.now + 200;
				        }
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
				freightBoat.health = Config.Boat.getDefaultConfig().stamina;

				game.physics.arcade.enable(freightBoat);

				freightBoat.body.bounce.y = 0;
			    freightBoat.body.gravity.y = 0;
			    freightBoat.body.collideWorldBounds = true;
			    freightBoat.body.drag.set(0.2);
			    freightBoat.index = 0;
			    freightBoat.id = 'freightboat';

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
					speedBoat.index = i;
					speedBoat.id = 'speedboat';

					game.physics.arcade.enable(speedBoat);

					speedBoat.body.bounce.y = 0;
				    speedBoat.body.gravity.y = 0;
				    speedBoat.body.collideWorldBounds = true;
				    speedBoat.body.drag.set(0.2);

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

			/**
			 * Returns the ship that's expected to be moved
			 */
			getToMove = function(data) {
				var toMove;

				if(data && data.id && data.index) {
					if(data.id == 'speedboat') {
						toMove = speedBoats.children[data.index];
					} else {
						toMove = freightBoat;
					}
				} else {
					toMove = currentlyControlled;
				}

				return toMove;
			},

			turn = function(data) {
				var toTurn = getToMove(data);
				toTurn.body.angularVelocity = data.forward == 'true'? 200 : -200;
			},

			move = function(game, data) {
				var toMove = getToMove(data);

				instance.physics.arcade.velocityFromAngle(
					toMove.angle, 
					data.forward == 'true' ? 300 : (-1 * 300),
					toMove.body.velocity
				);
			},

			changeCharacter = function(game) {
				
			},

			distanciaEntreSprites = function(obj1, obj2, game) {		
				if (game.physics.arcade.distanceBetween(obj1,obj2) < 560 && game.physics.arcade.distanceBetween(obj1,obj2) > 540){
					obj2.alpha = 0.1;				
				} else if (game.physics.arcade.distanceBetween(obj1,obj2) < 540 && game.physics.arcade.distanceBetween(obj1,obj2) > 520){
					obj2.alpha = 0.2;
				} else if (game.physics.arcade.distanceBetween(obj1,obj2) < 520 && game.physics.arcade.distanceBetween(obj1,obj2) > 500){
					obj2.alpha = 0.3;
				} else if (game.physics.arcade.distanceBetween(obj1,obj2) < 500 && game.physics.arcade.distanceBetween(obj1,obj2) > 480){
					obj2.alpha = 0.4;
				} else if (game.physics.arcade.distanceBetween(obj1,obj2) < 480 && game.physics.arcade.distanceBetween(obj1,obj2) > 460){
					obj2.alpha = 0.5;
				} else if (game.physics.arcade.distanceBetween(obj1,obj2) < 460 && game.physics.arcade.distanceBetween(obj1,obj2) > 440){
					obj2.alpha = 0.6;
				} else if (game.physics.arcade.distanceBetween(obj1,obj2) < 440 && game.physics.arcade.distanceBetween(obj1,obj2) > 420){
					obj2.alpha = 0.7;
				} else if (game.physics.arcade.distanceBetween(obj1,obj2) < 420 && game.physics.arcade.distanceBetween(obj1,obj2) > 400){
					obj2.alpha = 0.8;
				} else if (game.physics.arcade.distanceBetween(obj1,obj2) < 410 && game.physics.arcade.distanceBetween(obj1,obj2) > 400){
					obj2.alpha = 0.9;
				} else if (game.physics.arcade.distanceBetween(obj1,obj2) < 400){
					obj2.alpha = 1.0;
				} else if (game.physics.arcade.distanceBetween(obj1,obj2) > 560){
					obj2.alpha = 0.0;
				}
			
			},

			distanciaBarcoLanchas = function(obj1, obj2, game) {
				//solo si no hundimos la lancha (obj2)
				if(obj2.exists){	

					//radar barco
					if (game.physics.arcade.distanceBetween(obj1,obj2) < BarcoRadar && game.physics.arcade.distanceBetween(obj1,obj2) > RangoAtaque) { 
						obj2.alpha = 0.3;
						//lo ve y puede atacar
					}else if (game.physics.arcade.distanceBetween(obj1,obj2) < RangoAtaque){
						obj2.alpha = 1.0;				
						//no lo ve
					} else if (game.physics.arcade.distanceBetween(obj1, speedBoats.children[0]) > BarcoRadar
						&&
						game.physics.arcade.distanceBetween(obj1, speedBoats.children[1]) > BarcoRadar
						&&
						game.physics.arcade.distanceBetween(obj1, speedBoats.children[2]) > BarcoRadar
						){
							obj2.alpha = 0.0;
					}						
				}
			},

			handleArrival = function(muelle, freightBoat) {
				// Terminar partida
			};

		return {

			init: function(data) {
				var self = this;

				if(!gameStarted) {
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

					gameStarted = true;

					$('#menu-container').addClass('hidden');
					$('#game-wrapper').removeClass('hidden');

					playerData = data;
					matchName = data.nombrePartida;
					match = data;
				}
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

				muelleLlegada = game.add.sprite(2880, game.rnd.integerInRange(900, 1950), 'port');
				game.physics.arcade.enable(muelleLlegada);
				muelleLlegada.body.bounce.setTo(0, 0);
				muelleLlegada.body.immovable = true;

				game.physics.arcade.enable(muelleLlegada);
				initCurrentlyControlled(Engine.getRole(), game);
			},

			update: function(game) {
				motionData = {};

				currentlyControlled.body.velocity.x = 0;
			    currentlyControlled.body.velocity.y = 0;
			    currentlyControlled.body.angularVelocity = 0;

			    game.physics.arcade.overlap(freightBoats, speedBoats, collisionHandler, null, this);
			    game.physics.arcade.overlap(bullets, speedBoats, fireHandler, null, this);
			    game.physics.arcade.overlap(muelleLlegada, freightBoats, handleArrival, null, this);

			    game.physics.arcade.collide(costas, speedBoats);
			    game.physics.arcade.collide(costas, freightBoat);

			    distanciaBarcoLanchas(freightBoat, speedBoats.children[0], game);
			    distanciaBarcoLanchas(freightBoat, speedBoats.children[1], game);
			    distanciaBarcoLanchas(freightBoat, speedBoats.children[2], game);

			    if(match.tipoMapa == 'ISLAS') {
				    for(var i = 0, islandPiece; islandPiece = island.children[i]; i++) {
				    	distanciaEntreSprites(currentlyControlled, islandPiece, game);
				    }

				    game.physics.arcade.collide(freightBoats, island);
			    	game.physics.arcade.collide(speedBoats, island);
			    }

			    /**
			     * To turn the boat around
			     */
			    if(cursors.left.isDown) {
			    	motionData = {
			    		forward: false
			    	}

			    	turn(motionData);

			    	SocketManager.send(
				    	Util.parseToSendWebSocketData(
				    		GAME_ACTION, 
				    		_.extend(motionData, {
					    		evt: 'virar',
					    		id: currentlyControlled.id,
					    		index: currentlyControlled.index,
					    		nombrePartida: matchName
					    	})
				    	)
			    	);
			    } else if(cursors.right.isDown) {
			    	motionData = {
			    		forward: true
			    	}

			        turn(motionData);

			        SocketManager.send(
				    	Util.parseToSendWebSocketData(
				    		GAME_ACTION, 
				    		_.extend(motionData, {
					    		evt: 'virar',
					    		id: currentlyControlled.id,
					    		index: currentlyControlled.index,
					    		nombrePartida: matchName
					    	})
				    	)
			    	);
			    } 

			    /**
			     * To move it back and forth
			     */
			    if(cursors.up.isDown) {
			    	console.log('counter at update: ', counter++);

			    	motionData = {
			    		forward: true
			    	};

			    	move(game, motionData);

			    	SocketManager.send(
				    	Util.parseToSendWebSocketData(
				    		GAME_ACTION, 
				    		_.extend(motionData, {
					    		evt: 'mover',
					    		id: currentlyControlled.id,
					    		index: currentlyControlled.index,
					    		forward: true,
					    		nombrePartida: matchName
					    	})
				    	)
			    	);

			    } else if(cursors.down.isDown) {
			    	motionData = {
			    		forward: false
			    	};

			    	move(game, motionData);

			    	SocketManager.send(
					    	Util.parseToSendWebSocketData(GAME_ACTION, {
				    		evt: 'mover',
				    		forward: false,
				    		id: currentlyControlled.id,
				    		index: currentlyControlled.index,
				    		nombrePartida: matchName
				    	})
			    	);
			    }

			    if(fireButton.isDown) {
			    	fire(game, currentlyControlled);
			    	SocketManager.send('requestAction:dibujar;' + JSON.stringify({
			    		evt: 'fire',
			    		id: currentlyControlled.id,
			    		index: currentlyControlled.index,
			    		nombrePartida: matchName
			    	}))
			    }

			    if(changeCharacterButton.isDown) {
			    	/*changeCharacter(game, changeCharacterButton);
			    	SocketManager.send('requestAction:dibujar;' + JSON.stringify({
			    		turn: 'right'
			    	}))*/
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
			},

			getInstance: function() {
				return game;
			},

			getMatch: function() {
				return match;
			},

			move: move,
			turn: turn,
			fire: fire
		} 

	})();

})(jQuery, window, document, Config.General, Config.Player, Assets, Gateway);