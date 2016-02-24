PeliApp.directive("modBuildDungeon", function(ModEngine) {
    return {
        restrict: "E",
        template: "<div class='mod-build-dungeon flex-col'>" +
					"<div ng-repeat='item in buildable'>"+
						"buildable"+
						// "<mod-build-dungeon-item ng-click='select($index)' building='item'></mod-build-dungeon-item>"+
					"</div>"+
				  "</div>",
        scope: {
            type: "="
        },
        link: function(scope, element, attrs) {
			var selected;
			scope.buildable = ModEngine.getBuildings();
			
			scope.select = function(index) {
				// console.log("selected on " + selected);
				if (typeof selected === "number") {
					var old = element.find(".mod-build-dungeon")[selected];
					old.className = old.className.replace( /(?:^|\s)dm-selected(?!\S)/g , '' );
				}
				var div = element.find(".mod-build-dungeon")[index];
				div.className += " dm-selected";
				selected = index;
			}
			
			scope.pick = function() {
				// ModEngine.pickDungeon(selected);
			}
        }
    };
});