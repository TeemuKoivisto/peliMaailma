PeliApp.directive("modDungeonTile", function() {
    return {
        restrict: "E",
        template: "<div class='mod-dungeon-tile'>" +
					"{{ tile.type }}" +
					"{{ tile.name }}" +
				  "</span>",
        scope: {
            tile: "="
        },
        link: function(scope, element, attrs) {
            var span = $(element).find("div")[0];
            var color = "brown";
            
            scope.$watch("tile", function(newVal, oldVal) {
                if (newVal.type === "") {
                    $(span).css({"background-color": "orange"});
                } else if (newVal.type === "tunnel") {
                    $(span).css({"background-color": "gray"});
                } else if (newVal.type === "lair") {
                    $(span).css({"background-color": "green"});
                } else {
                    $(span).css({"background-color": color});
                }
            }, true);
        }
    };
});