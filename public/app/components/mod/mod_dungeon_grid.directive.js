PeliApp.directive("modDungeonGrid", function(ModEngine) {
    return {
        restrict: "E",
        template:   "<div class='mod-dungeon-grid'>" +
            "<div class='mod-grid-row flex-row' ng-repeat='row in grid'>"+
              "<div class='mod-grid-col' ng-repeat='column in row track by $index' ng-click='activateSquare($parent.$index, $index)'>"+
                "<mod-dungeon-tile tile='column'></mod-dungeon-tile>"+
              "</div>"+
            "</div>"+
          "</div>",
        scope: {
            grid: "="
        },
        link: function(scope, element, attrs) {
      var selected;
      
      scope.activateSquare = function(row, col) {
        var state = ModEngine.getState();
        if (state === "buildDungeon") {
          // should trigger update inside modController which updates this view
          ModEngine.buildBuilding(row, col);
        }
      }
        }
    };
});