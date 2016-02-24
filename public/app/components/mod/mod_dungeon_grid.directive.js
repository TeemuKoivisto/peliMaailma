PeliApp.directive("modDungeonGrid", function(ModEngine) {
    return {
        restrict: "E",
        template: 	"<div class='mod-grid'>" +
						"<div class='mod-grid-row flex-row' ng-repeat='row in grid'>"+
							"<div class='mod-grid-col' ng-repeat='column in row' ng-click='activateSquare($parent.$index, $index)'>"+
								"<mod-dungeon-square type='column.type'></mod-dungeon-square>"+
							"</div>"+
						"</div>"+
					"</div>",
        scope: {
            grid: "="
        },
        link: function(scope, element, attrs) {
			var selected;
			
			scope.activateSquare = function(row, col) {
				if (scope.grid[row][col].type === "") {
					scope.grid[row][col].type = "tunnel";
				}
			}
        }
    };
});