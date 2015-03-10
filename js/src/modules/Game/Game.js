(function($, window, document, General, Player, Assets, Gateway, undefined) {

	window.Game = (function() {

		var counter = 0,
			GAME_ACTION = 'dibujar',
			END_ACTION = 'abandonar',
			DEFAULT_SPEED = Config.Player.getDefaultSpeed(),
			instance,
			matchName,
			match,
			barcoRadar = 600,
			rangoAtaque = barcoRadar / 2,
			muelleLlegada,
			scoreFreightBoat,
			scoreSpeedBoat,
			scorePositionSet = false,
			somethingHapenned = false,
			
			endMatch = false,
			winner,

			counter 	= 0,
			path 		= General.getAssetsPath(),
			types 		= General.getAssetTypes(),
			players		= Player.getPlayers(),
			textConfig 	= Config.Text.get(),
			coords  	= {},

			sonidoDisparo,
			sonidoDisparoBarco,
			backgroundMusic,
			radar,

			map,
			freightBoat,
			speedBoats,
			cannons,
			cursors,
			bulletsFreightBoat,
			bulletsSpeedBoat, 
			island,
			islandPiece,
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
			bulletTime 	= 0,
			tabTime 	= 0,
			fireTime 	= 0,
			gameStarted = false,
			playerData,

			setAlpha = function(index) {
				for(var i = 0, speedBoat; speedBoat = speedBoats.children[i]; i++) {
					if(speedBoat.index == index) {
						speedBoat.alpha = 1;
						speedBoat.body.immovable = false;
					} else {
						speedBoat.alpha = 0.5;
						speedBoat.body.immovable = true;
					}
				}
			},

			initCurrentlyControlled = function(role, game) {
				if(!Config.Player.isFreightBoat(role)) {
					currentlyControlled = speedBoats.children[0];
					setAlpha(0);
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

				game.load.audio('disparo', 'assets/disparo.ogg');
				game.load.audio('disparoBarco', 'assets/sonidoDisparoBarco.ogg');
				game.load.audio('backgroundMusic', 'assets/backgroundMusic.ogg');
				game.load.audio('radar', 'assets/radar.ogg');
			},

			initSounds = function(game) {
				backgroundMusic = game.add.audio('backgroundMusic');
				backgroundMusic.volume = 0.1;
				backgroundMusic.loop = true;
				backgroundMusic.play();

				sonidoDisparo = game.add.audio('disparo');
				sonidoDisparo.volume = 0.9; //Cambiar el volumen  
				sonidoDisparo.allowMultiple = true;

				sonidoDisparoBarco = game.add.audio('disparoBarco');
				sonidoDisparo.volume = 0.9; //Cambiar el volumen  
				sonidoDisparo.allowMultiple = true;
				
				radar = game.add.audio('radar');
				radar.volume = 1.0; //Cambiar el volumen 
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

				if(match.tipoMapa == 'ISLAS' || (match.match && match.match.tipoMapa == 'ISLAS')) {
					island = game.add.group();

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
				}


			},

			fireFreightBoat = function (paDonde, derecha) {
				var bullet = bulletsFreightBoat.getFirstExists(false);
				
				if(bullet) {
					if(derecha) {
						bullet.rotation = freightBoat.rotation + 3;
					} else {
						bullet.rotation = freightBoat.rotation;
					}

					sonidoDisparoBarco.play();
					bullet.reset(freightBoat.x, freightBoat.y);	
					instance.physics.arcade.velocityFromRotation(freightBoat.rotation + paDonde, 300, bullet.body.velocity);
					bulletTime = instance.time.now + 350;
					bullet.lifespan = 400;
				}

			},

			fire = function(game, data) {
				var toMove = getToMove(data),
					range = barcoRadar,
			    	bullet = bulletsSpeedBoat.getFirstExists(false),
					angle = toMove.angle;

			    if(game.time.now > bulletTime) {
			        if(bullet) {
			        	sonidoDisparo.play();
			            bullet.reset(toMove.x, toMove.y);
			            bullet.lifespan = range;
			            game.physics.arcade.velocityFromAngle(angle, 300, bullet.body.velocity);
			            bulletTime = game.time.now + 200;
			        }
			    }

			},

			initfreightBoats = function(game) {
				/**
				 * Adding freight boat
				 */
				freightBoats = game.add.group();
				freightBoats.name = 'freightboats';

				freightBoat = match.freightBoat ?
								freightBoats.create(match.freightBoat.x, match.freightBoat.y, players.freightBoat.sprite) :
								freightBoats.create(50, 0, players.freightBoat.sprite);

				freightBoat.anchor.setTo(0.5, 0.5);
				freightBoat.angle = game.rnd.angle();
				freightBoat.angle = match.freightBoat ?
										match.freightBoat.angle :
										90;

				freightBoat.health = match.freightBoat ? 
										match.freightBoat.health : 
										Config.Boat.getDefaultConfig().stamina;

				freightBoat.hoses = match.freightBoat ?
										match.freightBoat.hoses :
										[true, true, true, true, true, true, true, true];

				game.physics.arcade.enable(freightBoat);

				freightBoat.enableBody = true;
				freightBoat.body.bounce.y = 0;
			    freightBoat.body.gravity.y = 0;
			    freightBoat.body.collideWorldBounds = true;
			    freightBoat.body.drag.set(0.2);
			    freightBoat.index = 0;
			    freightBoat.id = 'freightboat';

			    cursors = game.input.keyboard.createCursorKeys();
			},

			addSpeedBoats = function(game, speedBoats) {
				var separationCoef = 0,
					health = Config.Boat.getSpeedBoatConfig().stamina;

				for(var i = 0; i < players.speedBoat.qty; i++) {
					var currentSpeedBoatData = match.speedBoats ? match.speedBoats[i] : null;

					if(!currentSpeedBoatData || currentSpeedBoatData.health > 0) {
						var speedBoat = speedBoats.create(
											currentSpeedBoatData ? currentSpeedBoatData.x : 1450 + separationCoef, 
											currentSpeedBoatData ? currentSpeedBoatData.y : 1811,
											/*currentSpeedBoatData ? currentSpeedBoatData.x : 300 + separationCoef, 
											currentSpeedBoatData ? currentSpeedBoatData.y : 300, */
											players.speedBoat.sprite
										);
					
						
						speedBoat.health = currentSpeedBoatData ? currentSpeedBoatData.health : health;

						speedBoat.anchor.setTo(0.5, 0.5)
						speedBoat.angle = game.rnd.angle();
						speedBoat.angle = currentSpeedBoatData ? currentSpeedBoatData.angle : -90;
						speedBoat.index = speedBoats.children.length - 1;
						speedBoat.id = 'speedboat';

						game.physics.arcade.enable(speedBoat);

						speedBoat.enableBody = true;
						speedBoat.body.bounce.y = 0;
					    speedBoat.body.gravity.y = 0;
					    speedBoat.body.collideWorldBounds = true;
					    speedBoat.body.drag.set(0.2);

						separationCoef += 200;
					}
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

				bulletsFreightBoat = game.add.group();
			    bulletsFreightBoat.enableBody = true;
			    bulletsFreightBoat.physicsBodyType = Phaser.Physics.ARCADE;

			    for(var i = 0; i < bulletQty; i++) {
				    var currentBullet = bulletsFreightBoat.create(-20, -20, 'bullet-freightboat');

				    currentBullet.anchor.x = 0.5;
				    currentBullet.anchor.y = 0.5;
				    currentBullet.outOfBoundsKill = true;
				    currentBullet.checkWorldBounds = true;
				    currentBullet.angle = game.rnd.angle();
				    
				    game.physics.arcade.enable(currentBullet);
			    }

			    bulletsSpeedBoat = game.add.group();
			    bulletsSpeedBoat.enableBody = true;
			    bulletsSpeedBoat.physicsBodyType = Phaser.Physics.ARCADE;

			    for(var i = 0; i < bulletQty; i++) {
				    var currentBullet = bulletsSpeedBoat.create(-20, -20, 'bullet-speedboat');

				    currentBullet.anchor.x = 0.5;
				    currentBullet.anchor.y = 0.5;
				    currentBullet.outOfBoundsKill = true;
				    currentBullet.checkWorldBounds = true;
				    currentBullet.angle = game.rnd.angle();
				    
				    game.physics.arcade.enable(currentBullet);
			    }
			},

			getScoreFreightBoat = function(game) {
				var score = 'Carguero: \n';

				for(var x = 0; x < freightBoat.hoses.length; x++) {
					score += '| ' + (freightBoat.hoses[x] ? 'O ' : 'X ');

					if(x == (freightBoat.hoses.length / 2 - 1)) {
						score += '|\n';
					}
				}

				return score + '|';
			},

			getScoreSpeedBoat = function(game) {
				var score = '\nLanchas: \n';

				for(var i = 0, speedBoat; speedBoat = speedBoats.children[i]; i++) {
					score += 'Lancha ' + (i + 1) + ': ' + speedBoat.health + '\n';
				}

				return score;
			},

			updateScore = function(game) {
				if(!scoreFreightBoat) {	
					scoreFreightBoat = game.add.text(textConfig.freightBoat.x, 0, '', textConfig.style);
				}

				if(!scoreSpeedBoat) {
					scoreSpeedBoat = game.add.text(textConfig.speedBoat.x, 0, '', textConfig.style);
				}

				scoreFreightBoat.setText(getScoreFreightBoat(game));
				scoreSpeedBoat.setText(getScoreSpeedBoat(game));

				if(!scorePositionSet) {
					scoreFreightBoat.position.y = game.camera.height - scoreFreightBoat.height;
					scoreSpeedBoat.position.y = game.camera.height - scoreSpeedBoat.height;

					scoreFreightBoat.fixedToCamera = true;
					scoreSpeedBoat.fixedToCamera = true;

					scorePositionSet = true;
				}
			},

			/*collisionHandler = function(fb, sb) {
				if(Collisions.isBoarding(fb, sb)) {
					if(Collisions.aboardAllowed(fb, sb)) {
						endMatch = true;
						winner = 'speedboat';
					}
				} else {
					console.log('Mata la lancha: ', sb.index);
					/*sb.kill();
					sb.health = 0;
					sb.alive = false;

					if(currentlyControlled && 
						currentlyControlled.id == 'speedboat' &&
						currentlyControlled.index == sb.index) {
						currentlyControlled = speedBoats.getFirstAlive();

						if(currentlyControlled) {
							setAlpha(currentlyControlled.index);
							instance.camera.follow(currentlyControlled);
						} else {
							instance.camera.follow(freightBoat);
						}
					}
				}

				updateScore(instance);
			},*/


			/*collisionHandler = function(fb, sb) {
				if(Collisions.aboardAllowed(fb, sb, instance)) {
					endMatch = true;
					winner = 'speedboat';
				} else {
					console.log('Mata la lancha: ', sb.index);
					sb.kill();
					sb.health = 0;
					sb.alive = false;

					if(currentlyControlled && 
						currentlyControlled.id == 'speedboat' &&
						currentlyControlled.index == sb.index) {
						currentlyControlled = speedBoats.getFirstAlive();

						if(currentlyControlled) {
							setAlpha(currentlyControlled.index);
							instance.camera.follow(currentlyControlled);
						} else {
							instance.camera.follow(freightBoat);
						}
					}
				}

				updateScore(instance);
			},*/

			collisionHandler = function(fb, sb) {
				fb.body.velocity.x = 0;
				fb.body.velocity.y = 0;
				fb.body.angularVelocity = 0;
				sb.body.velocity.x = 0;
				sb.body.velocity.y = 0;
				sb.body.angularVelocity = 0;

				if(Collisions.freeOfHoses(freightBoat)) {
					endMatch = true;
					winner = true;
				} else {
					sb.kill();
					sb.health = 0;
					sb.alive = false;

					if(currentlyControlled && 
						currentlyControlled.id == 'speedboat' &&
						currentlyControlled.index == sb.index) {
						currentlyControlled = speedBoats.getFirstAlive();

						if(currentlyControlled) {
							setAlpha(currentlyControlled.index);
							instance.camera.follow(currentlyControlled);
						} else {
							instance.camera.follow(freightBoat);
						}
					}
				}

				updateScore(instance);
				somethingHapenned = true;
			},

			computeDamage = function(boat) {
				boat.health--;

				if(boat.id == 'freightboat' && boat.health >= 0) {
					boat.hoses[freightBoat.health] = false;
				}

				updateScore(instance);
			},

			fireHandler = function(bullet, boat) {
				bullet.kill();
				computeDamage(boat);

				boat.body.velocity.x = 0;
				boat.body.velocity.y = 0;
				boat.body.angularVelocity = 0;

				if(boat.health == 0 && 
					boat.id == 'speedboat') {
					boat.kill();

					if(currentlyControlled.id == boat.id && 
						currentlyControlled.index == boat.index) {
						currentlyControlled = speedBoats.getFirstAlive();

						if(currentlyControlled) {
							setAlpha(currentlyControlled.index);
							instance.camera.follow(currentlyControlled);
						} else {
							instance.camera.follow(freightBoat);
						}
					}
				}
			},

			killBullet = function(island, bullet) {
				bullet.kill();
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

				if(data && data.id) {
					if(data.id == 'speedboat') {
						toMove = speedBoats.children[data.index];
						var i = 0;

						if(toMove && !toMove.alive) {
							toMove = speedBoats.getFirstAlive();
						}

					} else {
						toMove = freightBoat;
					}
				} else {
					toMove = currentlyControlled;
				}

				return toMove;
			},

			turn = function(evt, data) {
				var toTurn = getToMove(data);
				toTurn.body.angularVelocity = data.forward == 'true' || data.forward == true ? 100 : -100;
			},

			move = function(data) {
				var toMove = getToMove(data),
					speed = toMove.id == 'speedboat' ?
								DEFAULT_SPEED * 1.3 :
								DEFAULT_SPEED;

				instance.physics.arcade.velocityFromAngle(
					toMove.angle, 
					data.forward == 'true' || data.forward == true ? 200 : (-1 * 200),
					toMove.body.velocity
				);
			},

			changeCharacter = function(game, data) {
				currentlyControlled = getToMove(data);
				setAlpha(data.index);
				game.camera.follow(currentlyControlled);
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
				if(obj2.exists) {

					//radar barco
					if (game.physics.arcade.distanceBetween(obj1,obj2) < barcoRadar && 
						game.physics.arcade.distanceBetween(obj1,obj2) > rangoAtaque) { 

						obj2.alpha = 0.3;

						if(obj2.scale.x > 0.9 && obj2.scale.x < 1.1){
							game.add.tween(obj2.scale).to( { x: 1.15, y: 1.15 }, 5, Phaser.Easing.Linear.None, true);
							obj2.alpha = 0.3;
						}else if(obj2.scale.x > 1.1){
							game.add.tween(obj2.scale).to( { x: 1, y: 1 }, 10, Phaser.Easing.Linear.None, true);
							obj2.alpha = 0.2;
						}

						//lo ve y puede atacar
					} else if(game.physics.arcade.distanceBetween(obj1,obj2) < rangoAtaque) {
						obj2.alpha = 1.0;		
						//no lo ve
					} else if(game.physics.arcade.distanceBetween(obj1, speedBoats.children[0]) > barcoRadar ||
						game.physics.arcade.distanceBetween(obj1, speedBoats.children[1]) > barcoRadar ||
						game.physics.arcade.distanceBetween(obj1, speedBoats.children[2]) > barcoRadar) {
							obj2.alpha = 0.0;
					}
				}
			},

			distanciaLanchaBarco = function(obj1, obj2, game) {
				if(obj2.exists) {
					if(game.physics.arcade.distanceBetween(obj1, obj2) < rangoAtaque) {
						obj2.alpha = 1.0;
					} else if(game.physics.arcade.distanceBetween(obj1, obj2) > rangoAtaque) {
						obj2.alpha = 0.0;
					}
				}
			},

			updateBoat = function(data) {
				var toMove = getToMove(data);

				if(toMove) {
					toMove.angle = parseFloat(data.angle);
					toMove.position.x = parseFloat(data.x);
					toMove.position.y = parseFloat(data.y);

					if(data.shoot == 'true' || data.shoot ==  true) {
						if(toMove.id == 'speedboat') {
				    		fire(instance, toMove);
				    	} else {
				    		//solo para barco carguero					
							if (instance.time.now > bulletTime) {						
								var paDonde = -1.9, 
									derecha = true;
								
								for (var i = 0; i < 4; i++) {
									if(freightBoat.hoses[i]) {
										fireFreightBoat(paDonde, derecha);
									}
									paDonde += 0.2;
								}
								
								paDonde = 1.9;
								derecha = false;

								for (var i = 0; i < 4; i++) {
									if(freightBoat.hoses[i + 4]) {
										fireFreightBoat(paDonde, derecha);	
									}

									paDonde -= 0.2;
								}
									
								bulletTime = instance.time.now + 400;						
							}
				    	}
					}

					instance.physics.arcade.collide(freightBoat, speedBoats, collisionHandler, null, this);
				    instance.physics.arcade.collide(bulletsFreightBoat, speedBoats, fireHandler, null, this);
				    instance.physics.arcade.collide(bulletsSpeedBoat, freightBoats, fireHandler, null, this);
				    instance.physics.arcade.collide(muelleLlegada, freightBoats, handleArrival, null, this);

				    instance.physics.arcade.collide(costas, speedBoats);
				    instance.physics.arcade.collide(costas, freightBoat);
				    instance.physics.arcade.collide(costas, bulletsSpeedBoat, killBullet, null, this);
				    instance.physics.arcade.collide(costas, bulletsFreightBoat, killBullet, null, this);
				    instance.physics.arcade.collide(island, bulletsSpeedBoat, killBullet, null, this);
				    instance.physics.arcade.collide(island, bulletsFreightBoat, killBullet, null, this);
				    instance.physics.arcade.collide(speedBoats, speedBoats);
				}
			},

			handleArrival = function(muelle, freightBoat) {
				endMatch = true;
				winner = 'freightboat';
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

					Menu.View.initGame();

					gameStarted = true;
					playerData = data;
					matchName = data.nombrePartida;

					if(!match) {
						match = data;
					}
				}
			},

			preload: function(game) {
				loadImages(game);
			},

			create: function(game) {
				game.physics.startSystem(Phaser.Physics.ARCADE);

				initMap(game);
				initSounds(game);
				initfreightBoats(game);
				initSpeedboats(game);
				initBullets(game);
				addActions(game);
				updateScore(game);

				muelleLlegada = game.add.sprite(2880, 1950, 'port');
				game.physics.arcade.enable(muelleLlegada);
				muelleLlegada.body.bounce.setTo(0, 0);
				muelleLlegada.body.immovable = true;

				game.physics.arcade.enable(muelleLlegada);
				initCurrentlyControlled(Engine.getRole(), game);
			},

			update: function(game) {
				motionData = {};
				somethingHapenned = false;
				shoot = false;
				change = false;

				instance.physics.arcade.collide(freightBoat, speedBoats, collisionHandler, null, this);
			    instance.physics.arcade.collide(bulletsFreightBoat, speedBoats, fireHandler, null, this);
			    instance.physics.arcade.collide(bulletsSpeedBoat, freightBoats, fireHandler, null, this);
			    instance.physics.arcade.collide(muelleLlegada, freightBoats, handleArrival, null, this);

			    instance.physics.arcade.collide(costas, speedBoats);
			    instance.physics.arcade.collide(costas, freightBoat);
			    instance.physics.arcade.collide(costas, bulletsSpeedBoat, killBullet, null, this);
			    instance.physics.arcade.collide(costas, bulletsFreightBoat, killBullet, null, this);
			    instance.physics.arcade.collide(island, bulletsSpeedBoat, killBullet, null, this);
			    instance.physics.arcade.collide(island, bulletsFreightBoat, killBullet, null, this);
			    instance.physics.arcade.collide(speedBoats, speedBoats);

			    if(!endMatch && currentlyControlled && currentlyControlled.alive) {
				    if(currentlyControlled.id == 'freightboat') {
				    	for(var i = 0, currentSpeedBoat; currentSpeedBoat = speedBoats.children[i]; i++) {
				    		distanciaBarcoLanchas(currentlyControlled, currentSpeedBoat, game);
				    	}
				    } else {
				    	distanciaLanchaBarco(currentlyControlled, freightBoat, game);
				    }

				    if(match.tipoMapa == 'ISLAS' || (match.match && match.match.tipoMapa == 'ISLAS')) {
					    for(var i = 0, islandPiece; islandPiece = island.children[i]; i++) {
					    	distanciaEntreSprites(currentlyControlled, islandPiece, game);
					    }

					    game.physics.arcade.collide(freightBoats, island);
				    	game.physics.arcade.collide(speedBoats, island);
				    }

				    currentlyControlled.body.velocity.x = 0;
					currentlyControlled.body.velocity.y = 0;
					currentlyControlled.body.angularVelocity = 0;

				    /**
				     * To move it back and forth
				     */
				    if(cursors.up.isDown) {
				    	motionData = {
				    		forward: true
				    	};

				    	move(motionData);

				    	/**
					     * To turn the boat around
					     */
					    if(cursors.left.isDown) {
					    	motionData = {
					    		forward: false
					    	}

					    	turn(null, motionData);
					    } else if(cursors.right.isDown) {
					    	motionData = {
					    		forward: true
					    	}

					        turn(null, motionData);
					    }
					    somethingHapenned = true;

				    } else if(currentlyControlled.id == 'freightboat' && cursors.down.isDown) {
				    	motionData = {
				    		forward: false
				    	};

				    	move(motionData);
				    	/**
					     * To turn the boat around
					     */
					    if(cursors.left.isDown) {
					    	motionData = {
					    		forward: false
					    	}

					    	turn(null, motionData);
					    } else if(cursors.right.isDown) {
					    	motionData = {
					    		forward: true
					    	}

					        turn(null, motionData);
					    }
					    somethingHapenned = true;
				    }

				    if(fireButton.isDown) {
				    	if(currentlyControlled.id == 'speedboat') {
				    		fire(game, currentlyControlled);
				    	} else {
				    		//solo para barco carguero					
							if (game.time.now > bulletTime) {						
								var paDonde = -1.9, 
									derecha = true;
								
								for (var i = 0; i < 4; i++) {
									if(freightBoat.hoses[i]) {
										fireFreightBoat(paDonde, derecha);
									}
									paDonde += 0.2;
								}
								
								paDonde = 1.9;
								derecha = false;

								for (var i = 0; i < 4; i++) {
									if(freightBoat.hoses[i + 4]) {
										fireFreightBoat(paDonde, derecha);	
									}

									paDonde -= 0.2;
								}
									
								bulletTime = game.time.now + 400;						
							}
				    	}
						somethingHapenned = true;
						shoot = true;
				    }

				    if(currentlyControlled.id == 'speedboat' && changeCharacterButton.isDown) {
				    	if(game.time.now > tabTime) {

				    		currentlyControlled.body.velocity.x = 0;
							currentlyControlled.body.velocity.y = 0;
							currentlyControlled.body.angularVelocity = 0;

							if(speedBoats.children[currentlyControlled.index + 1] &&
								speedBoats.children[currentlyControlled.index + 1].alive) {
								changeCharacter(game, {
						    		id: currentlyControlled.id,
						    		index: currentlyControlled.index + 1
						    	});
							} else if(currentlyControlled.index + 1 == speedBoats.children.length &&
								speedBoats.children[0].alive) {
								changeCharacter(game, {
						    		id: currentlyControlled.id,
						    		index: 0
						    	});
							} else if(currentlyControlled.index + 1 == speedBoats.children.length &&
								speedBoats.children[1].alive) {
								changeCharacter(game, {
						    		id: currentlyControlled.id,
						    		index: 1
						    	});
							} else if(currentlyControlled.index == 1  && !speedBoats.children[2].alive &&
								speedBoats.children[0].alive) {
								changeCharacter(game, {
						    		id: currentlyControlled.id,
						    		index: 0
						    	});
							}

					    	tabTime = game.time.now + 300;
							somethingHappened = true;
				    	}
				    }
			    } else {
			    	somethingHapenned = true;
			    }

			    if(somethingHapenned) {
			    	if(currentlyControlled) {
				    	SocketManager.send(
					    	Util.parseToSendWebSocketData(
					    		endMatch ?
					    			END_ACTION :
					    			GAME_ACTION,
					    		_.extend(motionData, {
						    		id: currentlyControlled.id,
						    		index: currentlyControlled.index,
						    		x: currentlyControlled.position.x,
						    		y: currentlyControlled.position.y,			    		
						    		angle: currentlyControlled.angle,
						    		nombrePartida: matchName, 
						    		shoot: shoot,
						    		change: change,
						    		endMatch: endMatch,
						    		winner: winner,
						    		hoses: JSON.stringify(freightBoat.hoses)
						    	})
					    	)
				    	);
			    	}

			    	if(endMatch) {
			    		Menu.View.showWinner(winner);
			    	} else {
			    		updateScore(instance);
			    	}
		    	}
			},

			getFreightBoat: function() {
				return freightBoat;
			},

			getSpeedBoats: function() {
				return speedBoats;
			},

			getCurrentlyControlled: function() {
				return currentlyControlled;
			},

			getInstance: function() {
				return instance;
			},

			getMatch: function() {
				return match;
			},

			move: move,
			turn: turn,
			fire: fire,
			updateBoat: updateBoat,

			setMatchData: function(data) {
				var hoseCounter = 0,
					dataSpeedBoats = [{}, {}, {}],
					dataFreightBoat = {
						hoses: [false, false, false, false, false, false, false, false],
						x: 0,
						y: 0,
						health: 0,
						angle: 0
					},
					matchData = {};

				for(var i = 0, obj; obj = data[i]; i++) {
					for(attr in obj) {

						if(~attr.indexOf('manguera')) {
							var hoseNumber = attr.split('manguera')[1],
								availability = obj[attr];
							
							dataFreightBoat.hoses[hoseNumber - 1] = availability;
							hoseCounter++;

						} else if(~attr.indexOf('posicion')) {
							if(~attr.indexOf('Barco')) {
								if(~attr.indexOf('X')) {
									dataFreightBoat.x = obj[attr];
								} else {
									dataFreightBoat.y = obj[attr];
								}
							} else if(~attr.indexOf('Lancha')) {
								var positionValue 	= attr.split('Lancha'),
									coordinate 		= ~positionValue[0].indexOf('X') ? 'x' : 'y';

								dataSpeedBoats[parseInt(positionValue[1]) - 1][coordinate] = obj[attr];
							}
						} else if(~attr.indexOf('angulo')) {
							if(~attr.indexOf('Barco')) {
								dataFreightBoat.angle = obj[attr]; 
							} else if(~attr.indexOf('Lancha')) {
								var positionValue = attr.split('Lancha');
								dataSpeedBoats[parseInt(positionValue[1]) - 1].angle = obj[attr];
							}
						} else if(~attr.indexOf('energia')) {
							var positionValue = attr.split('Lancha');
							dataSpeedBoats[parseInt(positionValue[1]) - 1].health = obj[attr];
						} else {
							matchData[attr] = obj[attr];
						}
					}
				}

				dataFreightBoat.health = hoseCounter;

				match = {
					speedBoats: dataSpeedBoats,
					freightBoat: dataFreightBoat,
					match: matchData
				}

				return match;
			},

			getCounter: function() {
				return counter;
			},

			manageVolume: function(onOrOff) {
				if(onOrOff == 'off') {
					backgroundMusic.stop();
					$('.glyphicon-volume-off').hide();
					$('.glyphicon-volume-up').show()
				} else {
					backgroundMusic.stop();
					$('.glyphicon-volume-off').show();
					$('.glyphicon-volume-up').hide();
				}
			},

			endMatch: function(role) {
				endMatch = true;
				winner = role;
			},

			isStarted: function() {
				return gameStarted;
			}
		} 

	})();

})(jQuery, window, document, Config.General, Config.Player, Assets, Gateway);