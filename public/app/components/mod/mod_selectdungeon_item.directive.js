PeliApp.directive("modSelectDungeonItem", function(ModEngine) {
    return {
        restrict: "E",
        template: "<div class='mod-select-dungeon-item flex-col'>" +
					"<div class='mod-select-dungeon-item-grid'>"+
						"dungeon here"+
						// "<div>name: {{ dm.name }}</div>"+
						// "<div>prestige: {{ dm.prestige }}</div>"+
						// "<div>health: {{ dm.health }}</div>"+
						// "<div>magic: {{ dm.magic }}</div>"+
						// "<div>info: {{ dm.info }}</div>"+
					"</div>"+
				  "</div>",
        scope: {
            dungeon: "="
        },
        link: function(scope, element, attrs) {
        }
    };
});