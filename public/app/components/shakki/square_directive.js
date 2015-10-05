PeliApp.directive('square', function() {
    return {
        restrict: 'E',
        template: '<div class="square">{{holder}}</span>',
//        replace: true,
        scope: {
            holder: '=',
            row: '=',
            column: '='
        },
        link: function(scope, element, attrs) {
            var span = $(element).find('div')[0];
            if ((scope.row + scope.column + 1)%2===0) {
                $(span).addClass('black');
//                $(span).css({'background-color:': 'black'});
            } else {
                $(span).addClass('white');
//                $(span).css({'background-color': 'white'});
            }
        }
    };
});