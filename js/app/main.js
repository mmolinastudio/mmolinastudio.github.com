define(["jquery"], function($) {

	(function() {
		var canvas = document.getElementById('headerCanvas'),
			context = canvas.getContext('2d');

		function drawLine(x1, y1, x2, y2) {
			context.beginPath();
			context.moveTo(x1, y1);
			context.lineTo(x2, y2);
			context.stroke();
		}

		function drawBackground(){
			// clear the canvas
			context.clearRect(0, 0, canvas.width, canvas.height);
			// Draw the black background
			context.fillStyle = 'black';
			context.fillRect(0, 0, canvas.width, canvas.height);
		}

		function drawSimpleGrid() {
			var intGridWidth = 20;
			context.strokeStyle = "#BB0000";
			// Vertical lines
			for (var i = 1; i < canvas.width / intGridWidth; i++ ){
				var x = Math.floor(i*intGridWidth)+0.5;
				drawLine(x, 0, x, canvas.height);
			}
			// Horizontal lines
			for (var i = 1; i < canvas.height / intGridWidth; i++){
				var y = Math.floor(i*intGridWidth)+0.5
				drawLine(0, y, canvas.width, y);
			}
		}

		function draw3DGrid() {
			var intGridWidthX = 20;
			var dispersionX = 5;			
			var centerX = canvas.width / 2;
			var startY = -40;
			context.strokeStyle = "#BB0000";

			// Draw Vertical lines
			var numVerticalLines = Math.floor(canvas.width / intGridWidthX);
			console.log("Vertical Lines: " + numVerticalLines);
			for (var i = 0; i < numVerticalLines; i++ ){
				var x = (i * intGridWidthX - intGridWidthX / 2) * dispersionX;
				var xRight = x + centerX;
				var xLeft = -1 * x + centerX;
				drawLine(centerX, startY, xRight, canvas.height);
				drawLine(centerX, startY, xLeft, canvas.height);
			}

			// Draw Horizontal lines
			var i = 0
			for (var y = 0; y < canvas.height; i++) {
				console.log(Math.exp(i));
				y = Math.floor((i * (i * 0.4) + i * (i * 0.6) + i * (i * 0.8)) / 2);
				drawLine(0, y, canvas.width, y);
				horizontalLinesCounter++;
			}
			console.log("horizontal Lines: " + i);
		}

		function drawVerticalLines_Recursive(i, numVerticalLines, intGridWidthX, dispersionX, centerX, startY) {
			if (i < numVerticalLines){
				var x = (i * intGridWidthX - intGridWidthX / 2) * dispersionX;
				var xRight = x + centerX;
				var xLeft = -1 * x + centerX;
				drawLine(centerX, startY, xRight, canvas.height);
				drawLine(centerX, startY, xLeft, canvas.height);
				i++;
				setTimeout(function() {
					drawVerticalLines_Recursive(i, numVerticalLines, intGridWidthX, dispersionX, centerX, startY);
				}, 25);
			} else {
				console.log("Vertical Lines: " + numVerticalLines);
			}
		}

		function drawHorizontalLines_Recursive(i, y) {
			if (y < canvas.height) {
				y = Math.floor((i * (i * 0.4) + i * (i * 0.6) + i * (i * 0.8)) / 2);
				drawLine(0, y, canvas.width, y);
				i++;
				setTimeout(function() {
					drawHorizontalLines_Recursive(i, y);
				}, 50);
			} else {
				console.log("Horizontal Lines: " + i);
			}
		}

		function draw3DGrid_Recursive() {
			var intGridWidthX = 20;
			var numVerticalLines = Math.floor(canvas.width / intGridWidthX);
			var dispersionX = 5;
			var centerX = canvas.width / 2;
			var startY = -50;
			context.strokeStyle = "#AA0000";
			drawVerticalLines_Recursive(0, numVerticalLines, intGridWidthX, dispersionX, centerX, startY);
			drawHorizontalLines_Recursive(0, 0);
		}

		function drawStuff() {
			drawBackground();
			//drawSimpleGrid();
			//draw3DGrid();
			draw3DGrid_Recursive();
		}

		function resizeCanvas() {
			canvas.width = window.innerWidth;
			//canvas.height = window.outerHeight;
			canvas.height = parseInt($(".header-wrapper").css("height"));

			/**
			 * Your drawings need to be inside this function otherwise they will be reset when 
			 * you resize the browser window and the canvas goes will be cleared.
			 */
			drawStuff(); 
		}

		resizeCanvas();

		// resize the canvas to fill browser window dynamically
		var isDrawing = false;
		window.addEventListener('resize', function (e) {
			currentEventTimestamp = e.timestamp;
			if(!isDrawing){
				isDrawing = true;
				setTimeout(function(){
					resizeCanvas();
					isDrawing = false;
				}, 1000);
			}
		}, false);

	})();

	
	if (document.URL.split('/')[3] === "portfolio") {
		//require(["classie", "modernizr", "helperGrid3D", "grid3d"], function (classie) {
		require(["grid3d"], function () {
			// classie is the only one that uses AMD definition
			// window.modernizr, window.helper and window.grid3d are already defined
			//window.classie = classie;

			new grid3D(document.getElementById('grid3d'));
			//new grid3D($('#grid3d'));
		});
	}

});