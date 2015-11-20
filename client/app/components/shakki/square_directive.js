PeliApp.directive('square', function() {
    return {
        restrict: 'E',
        template: '<div class="square">{{data.color}} {{data.holder}} (x{{column}}:y{{row}})</span>',
        scope: {
            data: '=',
            row: '=',
            column: '='
        },
        link: function(scope, element, attrs) {
            var span = $(element).find('div')[0];
            var color = "";
            if ((scope.row + scope.column + 1)%2===0) {
                color = 'black';
//                $(span).addClass(color);
                $(span).css({'background-color:': 'black'});
            } else {
                color = 'white';
//                $(span).addClass(color);
                $(span).css({'background-color': 'white'});
            }
            
            scope.$watch('data', function(newVal, oldVal) {
                if (newVal.active) {
                    $(span).css({'background-color': 'red'});
                } else if (newVal.movable) {
                    $(span).css({'background-color': 'green'});
                } else if (newVal.edible) {
                    $(span).css({'background-color': 'orange'});
                } else {
                    $(span).css({'background-color': color});
                }
            }, true);
        }
    };
});