PeliApp.controller('ShakkiController', function ($scope, ShakkiFactory, ShakkiEngine) {

    $scope.game = {};
    //$scope.shakki = ShakkiFactory;
    //$scope.shakki_ts = ShakkiEngine;

    //console.log("", $scope.shakki);
	//console.log("", $scope.shakki_ts);

    //$scope.table = [
    //    [],
    //    [],
    //    [],
    //    [],
    //    [],
    //    [],
    //    [],
    //    []
    //];

    $scope.table = ShakkiEngine.table;

    $scope.activated = [0, 0];
    $scope.activateSquare = function(row, column) {
//        $scope.table[row][column].holder = "penis";
        $scope.table[$scope.activated[0]][$scope.activated[1]].active = false;        
        $scope.table[row][column].active = true;
        $scope.activated[0] = row;
        $scope.activated[1] = column;
    };
});