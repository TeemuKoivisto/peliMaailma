var PeliApp = angular.module('PeliApp', ['ui.router']);

PeliApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/chess");
  
    $stateProvider
    .state('chess', {
      url: '/chess',
      controller: 'ChessController',
      // controllerAs: 'game',
      templateUrl: 'app/components/chess/chess.html'
    })
    .state('tictactoe', {
      url: '/tictactoe',
      controller: 'TictactoeController',
      // controllerAs: 'game',
      templateUrl: 'app/components/tictactoe/tictactoe.html'
    })
    .state('mod', {
      url: '/mod',
      controller: 'ModController',
      // controllerAs: 'game',
      templateUrl: 'app/components/mod/mod.html'
    })
    });