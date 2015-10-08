PeliApp.controller('ShakkiController', function ($scope, ShakkiFactory, ShakkiEngine) {

    $scope.game = {};

    $scope.name="";
    $scope.table = ShakkiEngine.table;

    $scope.activated = [0, 0];
    $scope.activateSquare = function(row, column) {
//        $scope.table[row][column].holder = "penis";
        $scope.table[$scope.activated[0]][$scope.activated[1]].active = false;        
        $scope.table[row][column].active = true;
        $scope.activated[0] = row;
        $scope.activated[1] = column;
    };

    $scope.logAll = function() {
        console.log("", ShakkiEngine.table);
        console.log("", ShakkiEngine.pieces);
        console.log("", ShakkiEngine.squares);
    }

    $scope.calcMovesFor = function() {
        var available = ShakkiEngine.calculatePossibleMovesForPiece($scope.name);
        console.log("moves", available.moves);
        console.log("eatings", available.eatings);
    }
});