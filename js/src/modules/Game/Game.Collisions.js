(function(window, document, undefined) {

	window.Collisions = (function() {

		var boardingPossibilities = {
					plus: 20,
					minus: 20
				},

			aboardAlowedConditions = {
				left: [
					[0, 1],
					[1, 2],
					[2, 3]
				],
				right: [
					[4, 5],
					[5, 6],
					[6, 7]
				]
			},

			freeOfHoses = function(freightBoat, combinations) {
				var free 	= false,
					i 		= 0;

				do {
					free = !freightBoat.hoses[combinations[i][0]] &&
							!freightBoat.hoses[combinations[i][0]];
					i++;
				} while(!free && i < combinations.length);

				return free;
			};

		return {
			isBoarding: function(freightBoat, speedBoat) {
				return Math.abs(freightBoat.angle - boardingPossibilities.minus) <= Math.abs(speedBoat.angle) && 
						Math.abs(freightBoat.angle + boardingPossibilities.plus) >= Math.abs(speedBoat.angle) 
			},

			aboardAllowed: function(freightBoat, speedBoat) {
				var pointingDown 	= freightBoat.angle > 0 && freightBoat.angle <= 180,
					aboardAllowed 	= false;

				if(pointingDown) {
					if(speedBoat.body.touching.down) {
						aboardAllowed = freeOfHoses(freightBoat, aboardAlowedConditions.right);
					} else if(speedBoat.body.touching.up) {
						aboardAllowed = freeOfHoses(freightBoat, aboardAlowedConditions.left);
					}
				} else {
					if(speedBoat.body.touching.down) {
						aboardAllowed = freeOfHoses(freightBoat, aboardAlowedConditions.left);
					} else if(speedBoat.body.touching.up) {
						aboardAllowed = freeOfHoses(freightBoat, aboardAlowedConditions.right);
					}
				}

				return aboardAllowed;
			}
		};

	})();

})(window, document);