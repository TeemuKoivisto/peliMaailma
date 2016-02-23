PeliApp.directive("modGrid", function(ModEngine) {
    return {
        restrict: "E",
        template: 	"<div class='mod-grid'>" +
						"<div class='mod-grid-row flex-row' ng-repeat='row in grid'>"+
							"<div class='mod-grid-col' ng-repeat='column in row' ng-click='activateSquare($parent.$index, $index)'>"+
								"<mod-square type='column.type'></mod-square>"+
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