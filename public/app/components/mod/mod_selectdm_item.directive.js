PeliApp.directive("modSelectDmItem", function(ModEngine) {
    return {
        restrict: "E",
        template: "<div class='mod-select-dm-item flex-col'>" +
          "<div class='mod-select-dm-item-portrait'>top dm</div>"+
          "<div class='mod-select-dm-item-stats'>"+
            "<div>name: {{ dm.name }}</div>"+
            // "<div>prestige: {{ dm.prestige }}</div>"+
            // "<div>health: {{ dm.health }}</div>"+
            // "<div>magic: {{ dm.magic }}</div>"+
            "<div>info: {{ dm.info }}</div>"+
          "</div>"+
          "</div>",
        scope: {
            dm: "="
        },
        link: function(scope, element, attrs) {
        }
    };
});