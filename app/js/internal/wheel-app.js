var wheelCalculator = angular.module('wheelCalculator', []);

wheelCalculator.controller('mainController', ['$scope', function mainController($scope) {
    $scope.firstWheel = {
        tyreWidth: 200,
        tyreProfile: 50,
        tyreDiameter: 15,
        wheelWidth: 6,
        offset: 30,
        color: '#E9DE30'
    };
    $scope.secondWheel = {
        tyreWidth: 240,
        tyreProfile: 55,
        tyreDiameter: 16,
        wheelWidth: 6,
        offset: 0,
        color: '#28CA28'
    };

    $scope.increase = function(wheel) {
    	if (wheel.wheelWidth < 100){
    		wheel.wheelWidth += 0.5;
    	}
    };

    $scope.decrease = function(wheel) {
    	if (wheel.wheelWidth > 0){
    		wheel.wheelWidth -= 0.5;
    	}
    };
}]);

wheelCalculator.directive('wheelCanvas', function() {
    return {
        restrict: 'E',
        scope: {
            firstWheel: '=firstWheel',
            secondWheel: '=secondWheel',
            backgroundImage: '@'
        },
        template: '<canvas id="board"></canvas>',
        link: function(scope, element, attrs) {
            var canvas = angular.element('#board')[0];
            var context = canvas.getContext('2d');

            scope.$watchCollection(
            	'firstWheel', 
            	collectionChanged,
                true
            );
            scope.$watchCollection(
            	'secondWheel', 
            	collectionChanged,
                true
            );

	        function collectionChanged(newValue, oldValue) {
                    clearCanvas();
                    drawScene(newValue);
            }

            function drawWheel(wheel) {
                context.beginPath();
                context.lineWidth = "3";
                context.strokeStyle = wheel.color;

                var baseX = 140;
                var baseY = 220;
                var x = baseX - (Number(wheel.wheelWidth) * 25.4 / 2 - Number(wheel.offset)) / 2;
                var y = baseY - ((Number(wheel.tyreDiameter) * 25.4) / 2) / 2;

                context.rect(x, y, Number(wheel.wheelWidth) * 25.4 / 2 , Number(wheel.tyreDiameter) * 25.4 / 2);
                context.stroke();

                
                // Top tyre	
				context.beginPath();
				context.strokeStyle = 'black';
				context.lineWidth = "1";
			    context.lineTo(x, y);
			    context.lineTo(x + Number(wheel.wheelWidth) * 25.4 / 2 , y  );
			    context.lineTo(x + Number(wheel.wheelWidth) * 25.4 / 4 + Number(wheel.tyreWidth) / 4 ,  
			    	y - (Number(wheel.tyreWidth) * Number(wheel.tyreProfile) / 100) / 2 );
			    context.lineTo(x + Number(wheel.wheelWidth) * 25.4 / 4 - Number(wheel.tyreWidth) / 4 ,  
			    	y - (Number(wheel.tyreWidth) * Number(wheel.tyreProfile) / 100) / 2 );
			    context.lineTo(x, y);
				context.stroke();

				// Bottom tyre
				context.beginPath();
				context.strokeStyle = 'black';
				context.lineWidth = "1";
			    context.lineTo(x, y + Number(wheel.tyreDiameter) * 25.4 / 2);
			    context.lineTo(x + Number(wheel.wheelWidth) * 25.4 / 2 , y + Number(wheel.tyreDiameter) * 25.4  / 2  );
			    context.lineTo(x + Number(wheel.wheelWidth) * 25.4 / 4 + Number(wheel.tyreWidth) / 4 ,  
			    	y + (Number(wheel.tyreWidth) * Number(wheel.tyreProfile) / 100) / 2 + Number(wheel.tyreDiameter) * 25.4  / 2);
			    context.lineTo(x + Number(wheel.wheelWidth) * 25.4 / 4 - Number(wheel.tyreWidth) / 4 ,  
			    	y + (Number(wheel.tyreWidth) * Number(wheel.tyreProfile) / 100) / 2 + Number(wheel.tyreDiameter) * 25.4 / 2 );
			    context.lineTo(x, y + Number(wheel.tyreDiameter) * 25.4 /2 );
				context.stroke();

            }

            function clearCanvas() {
                context.clearRect(0, 0, canvas.width, canvas.height);
            }

            function drawScene(wheel) {
            	var c=document.getElementById("myCanvas");
                baseImage = new Image();
                baseImage.src = scope.backgroundImage;
                baseImage.onload = function() {
                    canvas.width = baseImage.naturalWidth;
                    canvas.height = baseImage.naturalHeight;
                    context.drawImage(baseImage, 0, 0, baseImage.naturalWidth, baseImage.naturalHeight);

                    drawWheel(scope.firstWheel);
                    drawWheel(scope.secondWheel);
                };
            }
        }
    };
});
