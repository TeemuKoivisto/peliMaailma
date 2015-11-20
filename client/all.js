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
PeliApp.controller('RistinollaController', function($scope) {
    $scope.hei = "ristinolla yo";
    $scope.peli = [
        ['a', 's', 'd'],
        ['f', 'g', 'h'],
        ['c', 'b', 'n']
    ];
});
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
PeliApp.directive('square', function() {
    return {
        restrict: 'E',
        template: '<div class="square">{{data.color}} {{data.holder}} (x{{column}}:y{{row}})</span>',
        scope: {
            data: '=',
            row: '=',
            column: '='
        },
        link: function(scope, element, attrs) {
            var span = $(element).find('div')[0];
            var color = "";
            if ((scope.row + scope.column + 1)%2===0) {
                color = 'black';
//                $(span).addClass(color);
                $(span).css({'background-color:': 'black'});
            } else {
                color = 'white';
//                $(span).addClass(color);
                $(span).css({'background-color': 'white'});
            }
            
            scope.$watch('data', function(newVal, oldVal) {
                if (newVal.active) {
                    $(span).css({'background-color': 'red'});
                } else if (newVal.movable) {
                    $(span).css({'background-color': 'green'});
                } else if (newVal.edible) {
                    $(span).css({'background-color': 'orange'});
                } else {
                    $(span).css({'background-color': color});
                }
            }, true);
        }
    };
});
var PeliApp;
(function (PeliApp) {
    var Igniter = PeliApp.ShakkiIgniter;
    var ShakkiEngine = (function () {
        function ShakkiEngine() {
            this.table = [];
            this.pieces = {};
            this.quantity = {};
            this.squares = [];
            this.checks = { 'white-king1': [], 'black-king1': [] };
            this.edibleby = {
                white: {},
                black: {}
            };
            var igniter = new Igniter();
            igniter.initAll(this.table, this.pieces, this.quantity, this.squares);
        }
        ShakkiEngine.prototype.movePiece = function (piece, row, column) {
            var target = this.table[row][column];
            if (target.occupier !== "none") {
                // eat
                // vois myï¿½s hakee pieces objektista tyypin eikï¿½ tarvis holderia
                this.quantity[target.color][target.holder]--;
            }
            this.table[row][column].holder = piece.type;
            this.table[row][column].occupier = piece.name;
            this.table[row][column].color = piece.color;
            this.table[piece.y][piece.x].holder = "empty";
            this.table[piece.y][piece.x].occupier = "none";
            this.pieces[piece.name].x = column;
            this.pieces[piece.name].y = row;
        };
        //// TODO
        //checkForCheckMate() {
        //
        //}
        ShakkiEngine.prototype.checkIfEdible = function () {
        };
        ShakkiEngine.prototype.calculatePossibleMovesForPiece = function (name) {
            var piece = this.pieces[name];
            if (typeof piece === "undefined")
                return { moves: [], edibles: [] };
            var x = piece.x;
            var y = piece.y;
            var available = {
                moves: [],
                edibles: []
            };
            if (piece.type !== 'soldier') {
                var moves = this.squares[piece.y][piece.x].moves[piece.type];
                for (var property in moves) {
                    if (moves[property]['horizontal']) {
                        this.loopUntilBorderOrPiece(piece, x - 1, y, -1, 0, available);
                        this.loopUntilBorderOrPiece(piece, x + 1, y, 1, 0, available);
                    }
                    else if (moves[property]['vertical']) {
                        this.loopUntilBorderOrPiece(piece, x, y - 1, 0, -1, available);
                        this.loopUntilBorderOrPiece(piece, x, y + 1, 0, 1, available);
                    }
                    else if (moves[property]['diagonal']) {
                        this.loopUntilBorderOrPiece(piece, x - 1, y - 1, -1, -1, available);
                        this.loopUntilBorderOrPiece(piece, x - 1, y + 1, -1, 1, available);
                        this.loopUntilBorderOrPiece(piece, x + 1, y + 1, 1, 1, available);
                        this.loopUntilBorderOrPiece(piece, x + 1, y - 1, 1, -1, available);
                    }
                    else {
                        this.checkAndAddIfValidMove(piece, moves[property].x, moves[property].y, available);
                    }
                }
            }
            else {
                var moves = this.squares[y][x].moves[piece.type][piece.color];
                for (var property in moves) {
                    if (this.table[moves[property].y][moves[property].x].holder === 'empty') {
                        available.moves.push({ x: moves[property].x, y: moves[property].y });
                    }
                }
                var edibles = this.squares[piece.y][piece.x].edibles[piece.type][piece.color];
                for (var property in edibles) {
                    if (this.table[edibles[property].y][edibles[property].x].holder !== 'empty' && this.table[edibles[property].y][edibles[property].x].color !== piece.color) {
                        available.edibles.push({ x: edibles[property].x, y: edibles[property].y });
                    }
                }
            }
            this.pieces[name].moves = available.moves;
            this.pieces[name].edibles = available.edibles;
            return available;
        };
        ShakkiEngine.prototype.loopUntilBorderOrPiece = function (piece, x, y, xdir, ydir, available) {
            //console.log("tullaan " + x + ":" + y);
            while (x >= 0 && x < 8 && y >= 0 && y < 8) {
                //console.log("nyt x " + x + " ja y " + y);
                if (!this.checkAndAddIfValidMove(piece, x, y, available)) {
                    break;
                }
                x += xdir;
                y += ydir;
            }
        };
        //checkValidMove(piece:{}, x:number, y:number, available:{}) {
        //    if (this.table[y][x].holder==='empty') {
        //        available.moves.push({x: x, y: y});
        //    }
        //}
        //
        //checkValidAttack(piece:{}, x:number, y:number, available:{}) {
        //    if (this.table[y][x].holder!=='empty' && this.table[y][x].color !== piece.color) {
        //        available.edibles.push({x: x, y: y});
        //    }
        //}
        ShakkiEngine.prototype.checkAndAddIfValidMove = function (piece, x, y, available) {
            if (this.table[y][x].holder === 'empty') {
                available.moves.push({ x: x, y: y });
                return true;
            }
            else {
                if (this.table[y][x].color !== piece.color) {
                    if (this.table[y][x].holder === 'king') {
                        this.checks[this.table[y][x].occupier].push(piece);
                    }
                    available.edibles.push({
                        x: x,
                        y: y
                    });
                }
                return false;
            }
        };
        return ShakkiEngine;
    })();
    PeliApp.ShakkiEngine = ShakkiEngine;
    angular.module('PeliApp').service('ShakkiEngine', ShakkiEngine);
})(PeliApp || (PeliApp = {}));

var PeliApp;
(function (PeliApp) {
    var Square = PeliApp.ShakkiSquare;
    var ShakkiIgniter = (function () {
        function ShakkiIgniter() {
            this.types = ['soldier', 'rook', 'knight', 'bishop', 'queen', 'king'];
        }
        ShakkiIgniter.prototype.initAll = function (table, pieces, quantity, squares) {
            for (var i = 0; i < 8; i++) {
                table.push([{}]);
                squares.push([]);
            }
            //table = [
            //    [{}],
            //    [{}],
            //    [{}],
            //    [{}],
            //    [{}],
            //    [{}],
            //    [{}],
            //    [{}]
            //];
            quantity['white'] = {
                soldier: 0,
                rook: 0,
                knight: 0,
                bishop: 0,
                queen: 0,
                king: 0
            };
            quantity['black'] = {
                soldier: 0,
                rook: 0,
                knight: 0,
                bishop: 0,
                queen: 0,
                king: 0
            };
            //quantity = {
            //    white: {
            //        soldier: 0,
            //        rook: 0,
            //        knight: 0,
            //        bishop: 0,
            //        queen: 0,
            //        king: 0
            //    },
            //    black: {
            //        soldier: 0,
            //        rook: 0,
            //        knight: 0,
            //        bishop: 0,
            //        queen: 0,
            //        king: 0
            //    }
            //};
            //squares = [
            //    [],
            //    [],
            //    [],
            //    [],
            //    [],
            //    [],
            //    [],
            //    []
            //];
            this.initTable(table);
            this.initPieces(pieces, table, quantity);
            this.generateSquares(squares);
        };
        ShakkiIgniter.prototype.initTable = function (table) {
            for (var row = 0; row < 8; row++) {
                switch (row) {
                    case (0):
                        this.initSpecialRow(table[row], "black");
                        break;
                    case (1):
                        this.initRow(table[row], "soldier", "black");
                        break;
                    case (2):
                    case (3):
                    case (4):
                    case (5):
                        this.initRow(table[row], "empty", "white");
                        break;
                    case (6):
                        this.initRow(table[row], "soldier", "white");
                        break;
                    case (7):
                        this.initSpecialRow(table[row], "white");
                        break;
                }
            }
        };
        ShakkiIgniter.prototype.initSpecialRow = function (row, color) {
            for (var column = 0; column < 8; column++) {
                switch (column) {
                    case (0):
                    case (7):
                        row[column] = {
                            holder: "rook",
                            occupier: "none",
                            color: color,
                            active: false,
                            movable: false,
                            edible: false
                        };
                        break;
                    case (1):
                    case (6):
                        row[column] = {
                            holder: "knight",
                            occupier: "none",
                            color: color,
                            active: false,
                            movable: false,
                            edible: false
                        };
                        break;
                    case (2):
                    case (5):
                        row[column] = {
                            holder: "bishop",
                            occupier: "none",
                            color: color,
                            active: false,
                            movable: false,
                            edible: false
                        };
                        break;
                    case (3):
                        row[column] = {
                            holder: "king",
                            occupier: "none",
                            color: color,
                            active: false,
                            movable: false,
                            edible: false
                        };
                        break;
                    case (4):
                        row[column] = {
                            holder: "queen",
                            occupier: "none",
                            color: color,
                            active: false,
                            movable: false,
                            edible: false
                        };
                        break;
                }
            }
        };
        ShakkiIgniter.prototype.initRow = function (row, type, color) {
            for (var column = 0; column < 8; column++) {
                row[column] = {
                    holder: type,
                    occupier: "none",
                    color: color,
                    active: false,
                    movable: false,
                    edible: false
                };
            }
        };
        ShakkiIgniter.prototype.initPieces = function (pieces, table, quantity) {
            for (var row = 0; row < 8; row++) {
                for (var column = 0; column < 8; column++) {
                    var holder = table[row][column].holder;
                    if (holder === 'empty')
                        continue;
                    var color = table[row][column].color;
                    quantity[color][holder]++;
                    var number = quantity[color][holder];
                    var name = color + "-" + holder + number;
                    pieces[name] = {
                        name: name,
                        x: column,
                        y: row,
                        type: holder,
                        color: color,
                        moves: [],
                        edibles: []
                    };
                    table[row][column].occupier = name;
                }
            }
        };
        ShakkiIgniter.prototype.generateSquares = function (table) {
            for (var row = 0; row < 8; row++) {
                for (var column = 0; column < 8; column++) {
                    var sq = new Square(row, column);
                    this.generateMovesForSquare(sq, row, column);
                    //console.log("pushing " + row + ":" + column, sq);
                    table[row].push(sq);
                }
            }
        };
        ShakkiIgniter.prototype.generateMovesForSquare = function (sq, y, x) {
            for (var index in this.types) {
                var type = this.types[index];
                switch (type) {
                    case ('soldier'):
                        if (y !== 0)
                            sq.setMove(type, 'white', { x: x, y: (y - 1) });
                        if (y !== 7)
                            sq.setMove(type, 'black', { x: x, y: (y + 1) });
                        if (y === 1)
                            sq.setMove(type, 'black', { x: x, y: (y + 2) });
                        if (y === 6)
                            sq.setMove(type, 'white', { x: x, y: (y - 2) });
                        if (x !== 0 && y !== 0 && y !== 7) {
                            sq.setAttack(type, 'white', (x - 1), (y - 1));
                            sq.setAttack(type, 'black', (x - 1), (y + 1));
                        }
                        if (x !== 7 && y !== 0 && y !== 7) {
                            sq.setAttack(type, 'white', (x + 1), (y - 1));
                            sq.setAttack(type, 'black', (x + 1), (y + 1));
                        }
                        break;
                    case ('rook'):
                        sq.setMove(type, 'both', { horizontal: true });
                        sq.setMove(type, 'both', { vertical: true });
                        break;
                    case ('knight'):
                        sq.setManyMoves(type, 'both', this.generateKnightMoves(x, y));
                        break;
                    case ('bishop'):
                        sq.setMove(type, 'both', { diagonal: true });
                        break;
                    case ('queen'):
                        sq.setMove(type, 'both', { horizontal: true });
                        sq.setMove(type, 'both', { vertical: true });
                        sq.setMove(type, 'both', { diagonal: true });
                        break;
                    case ('king'):
                        sq.setManyMoves(type, 'both', this.generateKingMoves(x, y));
                        break;
                }
            }
        };
        //// TODO
        //generateSoldierMoves(x:number, y:number) {
        //    var moves = [];
        //    this.checkAndPushCoords(x, y-1, moves);
        //    this.checkAndPushCoords(x, y+1, moves);
        //    this.checkAndPushCoords(x, y, moves);
        //    this.checkAndPushCoords(x, y+1, moves);
        //    return moves;
        //}
        ShakkiIgniter.prototype.generateKingMoves = function (x, y) {
            var moves = [];
            // left side
            this.checkAndPushCoords(x, y - 1, moves);
            this.checkAndPushCoords(x - 1, y - 1, moves);
            this.checkAndPushCoords(x - 1, y, moves);
            this.checkAndPushCoords(x - 1, y + 1, moves);
            // right side
            this.checkAndPushCoords(x, y + 1, moves);
            this.checkAndPushCoords(x + 1, y + 1, moves);
            this.checkAndPushCoords(x + 1, y, moves);
            this.checkAndPushCoords(x + 1, y - 1, moves);
            return moves;
        };
        ShakkiIgniter.prototype.generateKnightMoves = function (x, y) {
            var moves = [];
            // left side
            this.checkAndPushCoords(x - 1, y - 2, moves);
            this.checkAndPushCoords(x - 2, y - 1, moves);
            this.checkAndPushCoords(x - 2, y + 1, moves);
            this.checkAndPushCoords(x - 1, y + 2, moves);
            // right side
            this.checkAndPushCoords(x + 1, y + 2, moves);
            this.checkAndPushCoords(x + 2, y + 1, moves);
            this.checkAndPushCoords(x + 2, y - 1, moves);
            this.checkAndPushCoords(x + 1, y - 2, moves);
            return moves;
        };
        ShakkiIgniter.prototype.checkAndPushCoords = function (x, y, list) {
            if (x >= 0 && x < 8 && y >= 0 && y < 8) {
                list.push({ x: x, y: y });
            }
        };
        return ShakkiIgniter;
    })();
    PeliApp.ShakkiIgniter = ShakkiIgniter;
    angular.module('PeliApp').service('ShakkiIgniter', ShakkiIgniter);
})(PeliApp || (PeliApp = {}));

var PeliApp;
(function (PeliApp) {
    var ShakkiSquare = (function () {
        function ShakkiSquare(row, column) {
            this.x = column;
            this.y = row;
            this.moves = {
                soldier: {
                    white: [],
                    black: []
                },
                rook: [],
                knight: [],
                bishop: [],
                queen: [],
                king: []
            };
            this.edibles = {
                soldier: {
                    white: [],
                    black: []
                }
            };
        }
        ShakkiSquare.prototype.setMove = function (type, color, move) {
            if (type === 'soldier') {
                this.moves[type][color].push(move);
            }
            else {
                this.moves[type].push(move);
            }
        };
        ShakkiSquare.prototype.setManyMoves = function (type, color, newmoves) {
            if (type === 'soldier') {
                this.moves[type][color].push.apply(newmoves);
            }
            else {
                //console.log('tulee', newmoves);
                //this.moves[type].push.apply(newmoves);
                Array.prototype.push.apply(this.moves[type], newmoves);
            }
        };
        ShakkiSquare.prototype.setAttack = function (type, color, x, y) {
            if (type === 'soldier') {
                this.edibles[type][color].push({ x: x, y: y });
            }
        };
        return ShakkiSquare;
    })();
    PeliApp.ShakkiSquare = ShakkiSquare;
    angular.module('PeliApp').service('ShakkiSquare', ShakkiSquare);
})(PeliApp || (PeliApp = {}));
