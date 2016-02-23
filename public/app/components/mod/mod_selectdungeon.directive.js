PeliApp.directive("modSelectDungeon", function(ModEngine) {
    return {
        restrict: "E",
        template: "<div class='mod-select-dungeon flex-col'>" +
					"<div ng-repeat='dungeon in dungeons'>"+
						"<mod-select-dungeon-item ng-click='select($index)' dungeon='dungeon'></mod-select-dungeon-item>"+
					"</div>"+
					"<button ng-click='pick()'>Pick</button>"+
				  "</div>",
        scope: {
            type: "="
        },
        link: function(scope, element, attrs) {
			var selected;
			scope.dungeons = ModEngine.getDungeons();
			
			scope.select = function(index) {
				// console.log("selected on " + selected);
				if (typeof selected === "number") {
					var old = element.find(".mod-select-dungeon-item-grid")[selected];
					old.className = old.className.replace( /(?:^|\s)dm-selected(?!\S)/g , '' );
				}
				var div = element.find(".mod-select-dungeon-item-grid")[index];
				div.className += " dm-selected";
				selected = index;
			}
			
			scope.pick = function() {
				ModEngine.pickDungeon(selected);
			}
        }
    };
});