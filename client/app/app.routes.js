var PeliApp = angular.module('PeliApp', ['ngRoute']);

PeliApp.config(function($routeProvider) {
    $routeProvider
            .when('/chess', {
                controller: 'ChessController',
                templateUrl: 'app/components/chess/chess.html'
            })
            .when('/ristinolla', {
                controller: 'RistinollaController',
                templateUrl: 'app/components/ristinolla/ristinolla_index.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });