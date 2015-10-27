var PeliApp = angular.module('PeliApp', ['ngRoute']);

PeliApp.config(function($routeProvider) {
    $routeProvider
            .when('/shakki', {
                controller: 'ShakkiController',
                templateUrl: 'app/components/shakki/shakki_index.html'
            })
            .when('/ristinolla', {
                controller: 'RistinollaController',
                templateUrl: 'app/components/ristinolla/ristinolla_index.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });