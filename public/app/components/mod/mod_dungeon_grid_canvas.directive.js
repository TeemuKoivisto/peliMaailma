PeliApp.directive("modDungeonGridCanvas", function(ModEngine) {
    return {
        restrict: "E",
        template: 	"<div class='mod-dungeon-grid flex-col'>" +
						"<canvas id='dungeonCanvas' width='{{ width }}' height='{{ height }}' class='mod-dungeon-canvas'></canvas>"+
						"<button ng-click='draw()'>Draw</button>"+
						// "<div class='mod-grid-row flex-row' ng-repeat='row in grid'>"+
							// "<div class='mod-grid-col' ng-repeat='column in row track by $index' ng-click='activateSquare($parent.$index, $index)'>"+
								// "<mod-dungeon-tile tile='column'></mod-dungeon-tile>"+
							// "</div>"+
						// "</div>"+
					"</div>",
        scope: {
            grid: "="
        },
        link: function(scope, element, attrs) {
			scope.width = 250; 
			scope.height = 250;
			
			var selected;
			
			var canvas = element.find("canvas")[0];
			
			var drawSquare = function(x, y, color) {
				debugger;
				var ctx = canvas.getContext("2d");
				ctx.fillStyle = color;
				ctx.fillRect(x, y, 50, 50);
			}
			
			scope.activateSquare = function(row, col) {
				var state = ModEngine.getState();
				if (state === "buildDungeon") {
					// should trigger update inside modController which updates this view
					ModEngine.buildBuilding(row, col);
				}
			}
			
			scope.draw = function() {
				// debugger;
				for(var y = 0; y < scope.grid.length; y++) {
					for(var x = 0; x < scope.grid[y].length; x++) {
						
						if (scope.grid[y][x].type === "") {
							drawSquare(x*50, y*50, "orange");
						} else if (scope.grid[y][x].type === "tunnel") {
							drawSquare(x*50, y*50, "gray");
						} else if (scope.grid[y][x].type === "lair") {
							drawSquare(x*50, y*50, "green");
						}
					}
				}
			}
			
			scope.$watch("grid", function(newVal, oldVal) {
				scope.draw();
			}, true)
        }
    };
});