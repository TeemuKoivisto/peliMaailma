PeliApp.directive("modDungeonGridCanvas", function(ModEngine) {
    return {
        restrict: "E",
        template:   "<div class='mod-dungeon-grid flex-col'>" +
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
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 50, 50);
      }
      
      var drawHeroes = function(x, y, heroesObj) {
        var ctx = canvas.getContext("2d");
        for(var h = 0; h < heroesObj.heroes.length; h++) {
          ctx.fillStyle = "blue";
          ctx.fillRect(x+h*20, y+10, 10, 10);
        }
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
            
            if (typeof scope.grid[y][x].occupier !== "undefined" && scope.grid[y][x].occupier !== "") {
              drawHeroes(x*50, y*50, scope.grid[y][x].occupier);
            }
          }
        }
      }
      
      scope.$watch("grid", function(newVal, oldVal) {
        scope.width = scope.grid[0].length*50; 
        scope.height = scope.grid.length*50; 
        scope.draw();
      }, true)
        }
    };
});