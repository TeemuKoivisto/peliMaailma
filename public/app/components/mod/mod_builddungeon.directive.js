PeliApp.directive("modBuildDungeon", function(ModEngine) {
    return {
        restrict: "E",
        template: "<div class='mod-build-dungeon flex-col'>" +
					"<div ng-repeat='building in buildings'>"+
						"<div ng-click='select($index)' class='mod-build-dungeon-item flex-row'>"+
							"<div class='mod-build-dungeon-item-portrait'>picture</div>"+
							"<div class='mod-build-dungeon-item-info flex-col'>"+
								"<p>name: {{ building.name }}</p>"+
								"<p>type: {{ building.type }}</p>"+
								"<p>price: {{ building.price }}</p>"+
							"</div>"+
						"</div>"+
						// "<mod-build-dungeon-item ng-click='select($index)' building='item'></mod-build-dungeon-item>"+
					"</div>"+
				  "</div>",
        scope: {
            type: "="
        },
        link: function(scope, element, attrs) {
			var selected;
			scope.buildings = [];
			
			scope.refreshBuildings = function(state) {
				if (state === "buildDungeon") {
					scope.buildings = ModEngine.getBuildings();
				}
			}
			
			scope.select = function(index) {
				// console.log("selected on " + selected);
				// check if possible the build
				if (ModEngine.selectBuilding(index)) {
					if (typeof selected === "number") {
						var old = element.find(".mod-build-dungeon-item")[selected];
						old.className = old.className.replace( /(?:^|\s)dm-selected(?!\S)/g , '' );
					}
					var div = element.find(".mod-build-dungeon-item")[index];
					div.className += " dm-selected";
					selected = index;
				}
			}
			
			ModEngine.subscribeToStateChange(scope.refreshBuildings);
        }
    };
});