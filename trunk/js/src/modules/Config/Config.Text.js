(function(document, window, undefined) {

	Config.Text = (function() {

		var config = {
				freightBoat: {
					x: 15
				},
				speedBoat: {
					x: 870
				},
				style: {
					font: '12px Arial',
			        fill: '#ffffff',
			        align: 'left'
				}
			};

		return {
			get: function() {
				return config;
			}
		}

	})();

})(document, window);