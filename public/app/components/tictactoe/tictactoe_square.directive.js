PeliApp.directive("tictactoeSquare", function() {
    return {
        restrict: "E",
        template: "<div class=\"tictactoe-square\">" +
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
                } else if (newVal === "cross") {
                    $(span).css({"background-color": "red"});
                } else if (newVal === "circle") {
                    $(span).css({"background-color": "green"});
                } else {
                    $(span).css({"background-color": color});
                }
            }, true);
        }
    };
});