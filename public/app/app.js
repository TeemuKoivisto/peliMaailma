var PeliApp = angular.module('PeliApp', ['ngRoute']);

PeliApp.config(function($routeProvider) {
    $routeProvider
            .when('/game', {
                controller: 'GameController',
                templateUrl: 'app/components/game/game_index.html'
    });
});