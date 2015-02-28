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
			},

			setSocketString = function(data) {
				var str 	= '',
					counter = 0;

				for(attr in data) {
					if(counter) {
						str += ATTR_SEPARATOR;
					}

					str += attr + KEY_ATTR_SEPARATOR + data[attr];
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
				} else if(arr[1].indexOf('"result":') != -1) {
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

			parseToSaveMatch: function(freightBoat, speedBoat) {

			},

			parseBoatsData: function(data) {
				var parsedData = {
						freightBoat: {
							x: 0,
							y: 0,
							hoses: []
						},
						speedBoats: []
					};

				/*for(attr in data) {
					var currentData = data[attr];

					if(attr.indexOf('manguera') != -1) {
						var numHose = attr.split('manguera')[1];

						if(numHose > 0) {
							for(var i = 0; i < (numHose - 1); i++) {
								parsedData.freightBoat.hoses.push(false);
							}

							parsedData.freightBoat.hoses[i] = currentData;
						}
					} else if(attr.indexOf('Barco') != -1) {
						var posData = attr.split('Barco')[0];
					} else if(attr.indexOf('Lancha') != -1) {

					}
				}*/	

				return parsedData;
			},

			parseToObject: parseToObject,

			parseToSendWebSocketData: function(action, data) {
				return ACTION.replace(ACTION_PLACEHOLDER, action) +
						OBJECT_SEPARATOR + 
						setSocketString(data);
			},

			parseToSaveMatch: function(freightBoat, speedBoat) {

			},

			parseBoatsData: function(data) {
				var parsedData = {
						freightBoat: {
							x: 0,
							y: 0,
							hoses: []
						},
						speedBoats: []
					};

				/*for(attr in data) {
					var currentData = data[attr];

					if(attr.indexOf('manguera') != -1) {
						var numHose = attr.split('manguera')[1];

						if(numHose > 0) {
							for(var i = 0; i < (numHose - 1); i++) {
								parsedData.freightBoat.hoses.push(false);
							}

							parsedData.freightBoat.hoses[i] = currentData;
						}
					} else if(attr.indexOf('Barco') != -1) {
						var posData = attr.split('Barco')[0];
					} else if(attr.indexOf('Lancha') != -1) {

					}
				}*/	

				return parsedData;
			}
		}

	})();

})(jQuery, window, document);