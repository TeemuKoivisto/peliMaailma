PeliApp.directive("modDungeonSquare", function() {
    return {
        restrict: "E",
        template: "<div class=\"mod-square\">" +
					"{{ type }}" +
				  "</span>",
        scope: {
            type: "="
        },
        link: function(scope, element, attrs) {
            var span = $(element).find("div")[0];
            var color = "";
            
            scope.$watch("type", function(newVal, oldVal) {
                if (newVal === "") {
                    $(span).css({"background-color": "orange"});
                } else if (newVal === "tunnel") {
                    $(span).css({"background-color": "gray"});
                } else if (newVal === "lair") {
                    $(span).css({"background-color": "green"});
                } else {
                    $(span).css({"background-color": color});
                }
            }, true);
        }
    };
});