PeliApp.directive("modHeroPanel", function(ModEngine) {
    return {
        restrict: "E",
        template: "<div class='mod-hero-panel flex-col'>" +
          "<button ng-click='wait()'>Wait for heroes</button>"+
          "<button ng-click='move()'>Move heroes</button>"+
          // "<button ng-click='pause()'>Pause</button>"+
          // "<button ng-click='surrend()'>Surrend</button>"+
          "</div>",
        scope: {
            dm: "="
        },
        link: function(scope, element, attrs) {
      scope.wait = function() {
        ModEngine.waitForHeroes();
      }
      
      scope.move = function() {
        ModEngine.moveHeroes();
      }
        }
    };
});