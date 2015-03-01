(function($, window, document, undefined) {

	window.Util = (function() {

		var KEY_ATTR_SEPARATOR = ':',
			OBJECT_SEPARATOR = ';',

			/**
			 * Constants used for the Web Service
			 * requests
			 */
			RESULTS_NODE 		= 'return',
			DATA_PLACEHOLDER 	= '{{=data}}',
			OBJECT_WRAPPER 		= '{' + DATA_PLACEHOLDER + '}',

			/**
			 * Constants used for Web Sockets messaging
			 */
			ACTION_PLACEHOLDER 	= '{{=action}}',
			ACTION 				= 'requestAction:' + ACTION_PLACEHOLDER,
			ATTR_SEPARATOR 		= ',',

			parseToObject = function(data) {
				return _.map(data.split(OBJECT_SEPARATOR), function(obj) {
						return JSON.parse(OBJECT_WRAPPER.replace(DATA_PLACEHOLDER, obj));
					});
			},

			setSocketString = function(data) {
				var str 	= '',
					counter = 0;

				for(attr in data) {
					if(counter) {
						str += ATTR_SEPARATOR;
					}

					str += '"' + attr + '"' + KEY_ATTR_SEPARATOR + '"' + data[attr] + '"';
					counter++;
				}

				return str;
			};

		return {
			
			getResponseText: function(data) {
				return unescape($(data).find(RESULTS_NODE).text());
			},

			parseWebServiceData: function(data) {
				return parseToObject(data);
			},

			parseWebSocketData: function(data) {
				var arr = data.split(';'),
					action = arr[0].split('responseAction:')[1];

				if(arr[1].indexOf('"result":true') != -1) {
					arr[1] = arr[1].replace('"result":true,', '');
				} else if(arr[1].indexOf('"result":false,') != -1) {
					arr[1] = arr[1].replace('"result":false,', '');
				} else if(arr[1].indexOf('"result":,') != -1) {
					arr[1] = arr[1].replace('"result":,', '');
				} else if(arr[1].indexOf('"result":"n') != -1 || arr[1].indexOf('"result":,') != -1) {
					arr[1] = arr[1].replace('"result":', '');
				}

				var matchData = parseToObject(unescape(arr[1]));

				return {
					evt: action, 
					data: matchData
				}
			},

			parseToSendWebSocketData: function(action, data) {
				return ACTION.replace(ACTION_PLACEHOLDER, action) +
						OBJECT_SEPARATOR + 
						setSocketString(data);
			},

			parseToSaveMatch: function(freightBoat, speedBoats, match) {
				var obj = _.extend(match, {
						posicionBarcoX: freightBoat.position.x,
						posicionBarcoY: freightBoat.position.y,
						anguloBarco: freightBoat.angle
					}),
					speedBoatsInfo = speedBoats.children;

				for(var i = 1; i <= freightBoat.health; i++) {
					obj['manguera' + i] = true;
				}

				var deadHose = Config.Boat.getDefaultConfig().stamina - (i - 1);

				if(deadHose > 0) {
					for(i = i - 1; i <= deadHose; i++) {
						obj['manguera' + i] = false;
					}
				}


				/**
				 * Data speedBoats
				 */
				for(var i = 0, speedBoat; speedBoat = speedBoatsInfo[i]; i++) {
					obj['posicionXLancha' + (i + 1)] = speedBoat.position.x;
					obj['posicionYLancha' + (i + 1)] = speedBoat.position.y;
					obj['energiaLancha' + (i + 1)] = speedBoat.health;
					obj['anguloLancha' + (i + 1)] = speedBoat.angle;
				}

				return this.parseToSendWebSocketData('guardar', obj);

			},

			parseToObject: parseToObject
		}

	})();

})(jQuery, window, document);