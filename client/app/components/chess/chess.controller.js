PeliApp.controller('ChessController', function ($scope, ChessEngine) {

    $scope.message = "White starts";
    $scope.table = ChessEngine.table;
    $scope.turncolor = "white";

    $scope.activatedpiece = {};

    $scope.activateSquare = function(row, column) {
        if($scope.checkIfAvailableSquareClicked(row, column)) {
            $scope.movePiece(row, column);
        } else if ($scope.table[row][column].color===$scope.turncolor && $scope.table[row][column].occupier !== 'none') {
            if (ChessEngine.checks[$scope.turncolor+'-king1'].length!==0) {
                if ($scope.table[row][column].holder==='king') {

                } else {
                    return;
                }
            }
            if (typeof $scope.activatedpiece.y!== "undefined") {
                $scope.table[$scope.activatedpiece.y][$scope.activatedpiece.x].active = false;
                $scope.showOrHideMovesAndEdibles(false);
            }
            $scope.activatedpiece = ChessEngine.pieces[ChessEngine.table[row][column].occupier];
            $scope.table[row][column].active = true;
            $scope.showOrHideMovesAndEdibles(true);

        //} else if ($scope.table[row][column].occupier !== 'none' && $scope.table[row][column].color===$scope.turncolor) {
        //    if (typeof $scope.activatedpiece.y!== "undefined") {
        //        $scope.table[$scope.activatedpiece.y][$scope.activatedpiece.x].active = false;
        //        $scope.showOrHideMovesAndEdibles(false);
        //    }
        //    $scope.activatedpiece = ChessEngine.pieces[ChessEngine.table[row][column].occupier];
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
            ChessEngine.table[coords.y][coords.x].movable = type;
        }
        for(var index in $scope.activatedpiece.edibles) {
            var coords = $scope.activatedpiece.edibles[index];
            //$scope.table[coords.y][coords.x].edible = type;
            ChessEngine.table[coords.y][coords.x].edible = type;
            //console.log("mikä on edibl" + ChessEngine.table[coords.y][coords.x].edible);
        }
    };

    $scope.logAll = function() {
        console.log("", ChessEngine.table);
        console.log("", ChessEngine.pieces);
        console.log("", ChessEngine.squares);
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

        ChessEngine.movePiece($scope.activatedpiece, row, column);
        $scope.calcAllMoves();
        //ChessEngine.checkForCheckMate();

        $scope.activatedpiece = {};
        var oldcolor = $scope.turncolor;
        $scope.turncolor = $scope.turncolor==='white' ? 'black' : 'white';
        $("."+oldcolor).removeClass(oldcolor).addClass($scope.turncolor);
    };

    $scope.calcAllMoves = function() {
        ChessEngine.checks['white-king1']=[];
        ChessEngine.checks['black-king1']=[];
        for(var name in ChessEngine.pieces) {
            ChessEngine.calculatePossibleMovesForPiece(name);
        }
    };

    $scope.calcAllMoves();
});