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
				return _.map(_.isArray(data) ? data : data.split(OBJECT_SEPARATOR), function(obj) {
						obj = removeResult(obj);
						return JSON.parse(OBJECT_WRAPPER.replace(DATA_PLACEHOLDER, obj));
					});
			},

			setSocketString = function(data) {
				var str 	= '',
					counter = 0;

				data = _.isArray(data) ? data : [data];

				for(var i = 0, obj; obj = data[i]; i++) {
					for(attr in obj) {
						if(counter) {
							str += ATTR_SEPARATOR;
						}

						str += '"' + attr + '"' + KEY_ATTR_SEPARATOR + '"' + unescape(obj[attr]) + '"';
						counter++;
					}
				}

				return str;
			},

			removeResult = function(str) {
				var newStr = str;

				if(str.indexOf('"result":true') != -1) {
					newStr = str.replace('"result":true,', '');
				} else if(str.indexOf('"result":false,') != -1) {
					newStr = str.replace('"result":false,', '');
				} else if(str.indexOf('"result":,') != -1) {
					newStr = str.replace('"result":,', '');
				} else if(str.indexOf('"result":"n') != -1 || 
					str.indexOf('"result":,') != -1 || 
					str.indexOf('"result":"manguera') != -1) {
					newStr = str.replace('"result":', '');
				}

				return newStr;
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

				arr[1] = removeResult(arr[1]);
				var matchData = arr.length && arr.length < 2 ? [] : parseToObject(arr.slice(1));

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
				var obj = _.extend(match && match.match ?
							match.match :
							match, {
						posicionBarcoX: freightBoat.position.x.toFixed(2),
						posicionBarcoY: freightBoat.position.y.toFixed(2),
						anguloBarco: parseInt(freightBoat.angle)
					}),
					speedBoatsInfo = speedBoats.children;

				for(var i = 0; i < freightBoat.hoses.length; i++) {
					var hose = freightBoat.hoses[i];
					obj['manguera' + (i + 1)] = hose;
				}

				/**
				 * Data speedBoats
				 */
				for(var i = 0, speedBoat; speedBoat = speedBoatsInfo[i]; i++) {
					obj['posicionXLancha' + (i + 1)] = speedBoat.position.x.toFixed(2);
					obj['posicionYLancha' + (i + 1)] = speedBoat.position.y.toFixed(2);
					obj['energiaLancha' + (i + 1)] = speedBoat.health;
					obj['anguloLancha' + (i + 1)] = parseInt(speedBoat.angle);
				}

				return this.parseToSendWebSocketData('guardar', obj);

			},

			parseToObject: parseToObject,

			removeOwnMatches: function(data, ownData) {
				var newData = [];

				for(var x = 0, match2; match2 = data[x]; x++) {
					for(match in ownData) {
						var name = ownData[match].nombrePartida;
						if(match2.nombrePartida != name) {
							newData.push(match2);
						}
					}
				}

				return newData;
			}
		}

	})();

})(jQuery, window, document);