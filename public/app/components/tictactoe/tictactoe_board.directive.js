PeliApp.directive('tictactoeBoard', function() {
    return {
        restrict: 'E',
        template: '<div class="square">{{data.color}} {{data.holder}} (x{{column}}:y{{row}})</span>',
        scope: {
            data: '='
        },
        link: function(scope, element, attrs) {
			
        }
    };
});