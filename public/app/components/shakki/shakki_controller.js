PeliApp.controller('ShakkiController', function ($scope, ShakkiFactory, ShakkiEngine) {

    $scope.game = {};

    $scope.name="";
    $scope.table = ShakkiEngine.table;
    $scope.turncolor = "white";

    $scope.activatedpiece = {};
    $scope.activated = [0, 0];

    $scope.activateSquare = function(row, column) {
        if($scope.checkIfAvailableSquareClicked(row, column)) {
            $scope.movePiece(row, column);
        } else if ($scope.table[row][column].occupier !== 'none' && $scope.table[row][column].color===$scope.turncolor) {
            $scope.table[$scope.activated[0]][$scope.activated[1]].active = false;
            $scope.showOrHideMovesAndEdibles(false);

            //console.log("who", ShakkiEngine.table[row][column].occupier);
            $scope.activatedpiece = ShakkiEngine.pieces[ShakkiEngine.table[row][column].occupier];
            //console.log("piece ", $scope.activatedpiece);
            $scope.table[row][column].active = true;
            $scope.showOrHideMovesAndEdibles(true);

            $scope.activated[0] = row;
            $scope.activated[1] = column;
        }
    };

    $scope.showOrHideMovesAndEdibles = function(type) {
        //console.log("what ", $scope.activatedpiece.moves);
        for(var index in $scope.activatedpiece.moves) {
            //console.log("what is this ", $scope.activatedpiece.moves[index]);
            var coords = $scope.activatedpiece.moves[index];
            //$scope.table[coords.y][coords.x].movable = type;
            ShakkiEngine.table[coords.y][coords.x].movable = type;
        }
        for(var index in $scope.activatedpiece.edibles) {
            var coords = $scope.activatedpiece.edibles[index];
            //$scope.table[coords.y][coords.x].edible = type;
            ShakkiEngine.table[coords.y][coords.x].edible = type;
            //console.log("mikä on edibl" + ShakkiEngine.table[coords.y][coords.x].edible);
        }
    };

    $scope.logAll = function() {
        console.log("", ShakkiEngine.table);
        console.log("", ShakkiEngine.pieces);
        console.log("", ShakkiEngine.squares);
    };

    $scope.checkIfAvailableSquareClicked = function(row, column) {
        if (typeof $scope.activatedpiece !== 'undefined') {
            for(var index in $scope.activatedpiece.moves) {
                var coords = $scope.activatedpiece.moves[index];
                if (row === coords.y && column === coords.x) {
                    return true;
                }
            }
            for(var index in $scope.activatedpiece.edibles) {
                var coords = $scope.activatedpiece.edibles[index];
                if (row === coords.y && column === coords.x) {
                    return true;
                }
            }
        }
        return false;
    }

    $scope.movePiece = function(row, column) {
        $scope.table[$scope.activated[0]][$scope.activated[1]].active = false;
        $scope.showOrHideMovesAndEdibles(false);

        ShakkiEngine.movePiece($scope.activatedpiece, row, column);
        $scope.calcAllMoves();

        $scope.activatedpiece = {};
        var oldcolor = $scope.turncolor;
        $scope.turncolor = $scope.turncolor==='white' ? 'black' : 'white';
        $("."+oldcolor).addClass($scope.turncolor);
        $("."+oldcolor).removeClass(oldcolor);
    };

    $scope.calcMovesFor = function() {
        var available = ShakkiEngine.calculatePossibleMovesForPiece($scope.name);
        //console.log("moves", available.moves);
        //console.log("eatings", available.eatings);
    };

    $scope.calcAllMoves = function() {
        for(var name in ShakkiEngine.pieces) {
            ShakkiEngine.calculatePossibleMovesForPiece(name);
        }
    };

    $scope.calcAllMoves();
});