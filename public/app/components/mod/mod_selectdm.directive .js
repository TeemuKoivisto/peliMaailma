PeliApp.directive("modSelectDm", function(ModEngine) {
    return {
        restrict: "E",
        template: "<div class='mod-select flex-col'>" +
					"<div ng-repeat='dungeonmaster in dms'>"+
						"<mod-select-dm-item ng-click='select($index)' dm='dungeonmaster'></mod-select-dm-item>"+
					"</div>"+
					"<button ng-click='pick()'>Pick</button>"+
				  "</div>",
        scope: {
            type: "="
        },
        link: function(scope, element, attrs) {
			var selected;
			scope.dms = ModEngine.getDMs();
			
			scope.select = function(index) {
				// console.log("selected on " + selected);
				if (typeof selected === "number") {
					var old = element.find(".mod-select-dm-item-portrait")[selected];
					old.className = old.className.replace( /(?:^|\s)dm-selected(?!\S)/g , '' );
				}
				var div = element.find(".mod-select-dm-item-portrait")[index];
				div.className += " dm-selected";
				selected = index;
			}
			
			scope.pick = function() {
				ModEngine.pickDM(selected);
			}
        }
    };
});