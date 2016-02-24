PeliApp.directive("modSelectDungeonItem", function(ModEngine) {
    return {
        restrict: "E",
        template: "<div class='mod-select-dungeon-item flex-col'>" +
					// "<div class='mod-select-dungeon-item-grid'>"+
						"dungeon here"+
					// "</div>"+
				  "</div>",
        scope: {
            dungeon: "="
        },
        link: function(scope, element, attrs) {
        }
    };
});