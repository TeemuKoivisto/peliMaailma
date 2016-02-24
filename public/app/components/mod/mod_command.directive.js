PeliApp.directive("modCommand", function(ModEngine) {
    return {
        restrict: "E",
        template: 	"<div class='flex-col'>"+
						"<button ng-click='restart()'>Restart</button>"+
						// "<button ng-click='save()'>Save</button>"+
						"<div class='white turnbox-outer'>"+
							"<div class='white turnbox-inner'>"+
								"{{ state }}"+
							"</div>"+
						"</div>"+
						"<div class='messagebox'>"+
							"{{ message }}"+
						"</div>"+
					"</div>",
        scope: {
            message: "=",
			state: "="
        },
        link: function(scope, element, attrs) {
			
			scope.restart = function() {
				ModEngine.restart();
			}
			
			scope.save = function() {
				
			}
        }
    };
});