PeliApp.controller('ShakkiController', function ($scope, ShakkiEngine) {

    $scope.message = "White starts";
    $scope.table = ShakkiEngine.table;
    $scope.turncolor = "white";

    $scope.activatedpiece = {};

    $scope.activateSquare = function(row, column) {
        if($scope.checkIfAvailableSquareClicked(row, column)) {
            $scope.movePiece(row, column);
        } else if ($scope.table[row][column].color===$scope.turncolor && $scope.table[row][column].occupier !== 'none') {
            if (ShakkiEngine.checks[$scope.turncolor+'-king1'].length!==0) {
                if ($scope.table[row][column].holder==='king') {

                } else {
                    return;
                }
            }
            if (typeof $scope.activatedpiece.y!== "undefined") {
                $scope.table[$scope.activatedpiece.y][$scope.activatedpiece.x].active = false;
                $scope.showOrHideMovesAndEdibles(false);
            }
            $scope.activatedpiece = ShakkiEngine.pieces[ShakkiEngine.table[row][column].occupier];
            $scope.table[row][column].active = true;
            $scope.showOrHideMovesAndEdibles(true);

        //} else if ($scope.table[row][column].occupier !== 'none' && $scope.table[row][column].color===$scope.turncolor) {
        //    if (typeof $scope.activatedpiece.y!== "undefined") {
        //        $scope.table[$scope.activatedpiece.y][$scope.activatedpiece.x].active = false;
        //        $scope.showOrHideMovesAndEdibles(false);
        //    }
        //    $scope.activatedpiece = ShakkiEngine.pieces[ShakkiEngine.table[row][column].occupier];
        //    $scope.table[row][column].active = true;
        //    $scope.showOrHideMovesAndEdibles(true);
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
        if (typeof $scope.activatedpiece.y !== 'undefined') {
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
    };

    // TODO
    // see if soldier can be promoted

    $scope.movePiece = function(row, column) {
        $scope.table[$scope.activatedpiece.y][$scope.activatedpiece.x].active = false;
        $scope.showOrHideMovesAndEdibles(false);

        ShakkiEngine.movePiece($scope.activatedpiece, row, column);
        $scope.calcAllMoves();
        //ShakkiEngine.checkForCheckMate();

        $scope.activatedpiece = {};
        var oldcolor = $scope.turncolor;
        $scope.turncolor = $scope.turncolor==='white' ? 'black' : 'white';
        $("."+oldcolor).removeClass(oldcolor).addClass($scope.turncolor);
    };

    $scope.calcAllMoves = function() {
        ShakkiEngine.checks['white-king1']=[];
        ShakkiEngine.checks['black-king1']=[];
        for(var name in ShakkiEngine.pieces) {
            ShakkiEngine.calculatePossibleMovesForPiece(name);
        }
    };

    $scope.calcAllMoves();
});