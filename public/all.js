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
var PeliApp;
(function (PeliApp) {
    var ChessSquare = (function () {
        function ChessSquare(row, column) {
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
        ChessSquare.prototype.setMove = function (type, color, move) {
            if (type === 'soldier') {
                this.moves[type][color].push(move);
            }
            else {
                this.moves[type].push(move);
            }
        };
        ChessSquare.prototype.setManyMoves = function (type, color, newmoves) {
            if (type === 'soldier') {
                this.moves[type][color].push.apply(newmoves);
            }
            else {
                //console.log('tulee', newmoves);
                //this.moves[type].push.apply(newmoves);
                Array.prototype.push.apply(this.moves[type], newmoves);
            }
        };
        ChessSquare.prototype.setAttack = function (type, color, x, y) {
            if (type === 'soldier') {
                this.edibles[type][color].push({ x: x, y: y });
            }
        };
        return ChessSquare;
    })();
    PeliApp.ChessSquare = ChessSquare;
    angular.module('PeliApp').service('ChessSquare', ChessSquare);
})(PeliApp || (PeliApp = {}));

var PeliApp;
(function (PeliApp) {
    var Square = PeliApp.ChessSquare;
    var ChessIgniter = (function () {
        function ChessIgniter() {
            this.types = ['soldier', 'rook', 'knight', 'bishop', 'queen', 'king'];
        }
        ChessIgniter.prototype.initAll = function (table, pieces, quantity, squares) {
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
            this.initTable(table);
            this.initPieces(pieces, table, quantity);
            this.generateSquares(squares);
        };
        ChessIgniter.prototype.initTable = function (table) {
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
        ChessIgniter.prototype.initSpecialRow = function (row, color) {
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
        ChessIgniter.prototype.initRow = function (row, type, color) {
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
        ChessIgniter.prototype.initPieces = function (pieces, table, quantity) {
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
        ChessIgniter.prototype.generateSquares = function (table) {
            for (var row = 0; row < 8; row++) {
                for (var column = 0; column < 8; column++) {
                    var sq = new Square(row, column);
                    this.generateMovesForSquare(sq, row, column);
                    //console.log("pushing " + row + ":" + column, sq);
                    table[row].push(sq);
                }
            }
        };
        ChessIgniter.prototype.generateMovesForSquare = function (sq, y, x) {
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
        ChessIgniter.prototype.generateKingMoves = function (x, y) {
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
        ChessIgniter.prototype.generateKnightMoves = function (x, y) {
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
        ChessIgniter.prototype.checkAndPushCoords = function (x, y, list) {
            if (x >= 0 && x < 8 && y >= 0 && y < 8) {
                list.push({ x: x, y: y });
            }
        };
        return ChessIgniter;
    })();
    PeliApp.ChessIgniter = ChessIgniter;
    angular.module('PeliApp').service('ChessIgniter', ChessIgniter);
})(PeliApp || (PeliApp = {}));

var PeliApp;
(function (PeliApp) {
    var Igniter = PeliApp.ChessIgniter;
    var ChessEngine = (function () {
        function ChessEngine() {
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
        ChessEngine.prototype.movePiece = function (piece, row, column) {
            var target = this.table[row][column];
            if (target.occupier !== "none") {
                // eat
                // vois my�s hakee pieces objektista tyypin eik� tarvis holderia
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
        ChessEngine.prototype.checkIfEdible = function () {
        };
        ChessEngine.prototype.calculatePossibleMovesForPiece = function (name) {
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
        ChessEngine.prototype.loopUntilBorderOrPiece = function (piece, x, y, xdir, ydir, available) {
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
        ChessEngine.prototype.checkAndAddIfValidMove = function (piece, x, y, available) {
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
        return ChessEngine;
    })();
    PeliApp.ChessEngine = ChessEngine;
    angular.module('PeliApp').service('ChessEngine', ChessEngine);
})(PeliApp || (PeliApp = {}));

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
            //console.log("mik� on edibl" + ChessEngine.table[coords.y][coords.x].edible);
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
/*
PeliApp.directive('chessBoard', function() {
    return {
        restrict: 'E',
        template: 
				'<button ng-click="logAll()">log</button>',
				'<div class="shakki-container">',
					'<div class="shakki-table">',
						'<div ng-repeat="row in table">',
							'<div ng-repeat="column in row" ng-click="activateSquare($parent.$index, $index)">',
								'<square data="table[$parent.$index][$index]" row="$parent.$index" column="$index"></square>',
							'</div>',
						'</div>',
					'</div>',
				'</div>',
        scope: {
            data: '=',
            row: '=',
            column: '='
        },
        link: function(scope, element, attrs) {
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
		}
	};
});*/
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
    var TictactoeEngine = (function () {
        function TictactoeEngine() {
            this.this.board = [
                [{ type: "" }, { type: "" }, { type: "" }],
                [{ type: "" }, { type: "" }, { type: "" }],
                [{ type: "" }, { type: "" }, { type: "" }]
            ];
            this.nextInTurn = "circle";
            this.result = "";
        }
        TictactoeEngine.prototype.activateSquare = function (row, col) {
            if (this.board[row][col].type === "" && this.result === "") {
                this.board[row][col].type = this.nextInTurn;
                this.nextInTurn = this.nextInTurn === "circle" ? "cross" : "circle";
                this.result = this.checkResult();
                if (this.result !== "") {
                    message = this.result + " wins";
                    this.nextInTurn = "";
                }
                else if (this.checkIfTie()) {
                    message = "Tie";
                    this.nextInTurn = "";
                }
                else {
                    message = this.nextInTurn + " turn";
                }
            }
        };
        TictactoeEngine.prototype.checkHorizontal = function () {
            for (var row = 0; row < this.board.length; row++) {
                var firstType = this.board[row][0].type;
                for (var col = 1; col < this.board[row].length; col++) {
                    if (firstType !== this.board[row][col].type) {
                        firstType = "";
                    }
                }
                if (firstType !== "") {
                    return firstType;
                }
            }
            return "";
        };
        TictactoeEngine.prototype.checkVertical = function () {
            for (var col = 0; col < this.board[0].length; col++) {
                var firstType = this.board[0][col].type;
                for (var row = 1; row < this.board.length; row++) {
                    if (firstType !== this.board[row][col].type) {
                        firstType = "";
                    }
                }
                if (firstType !== "") {
                    return firstType;
                }
            }
            return "";
        };
        TictactoeEngine.prototype.checkDiagonal = function () {
            var firstType = this.board[0][0].type;
            for (var i = 1; i < 3; i++) {
                if (firstType !== this.board[i][i].type) {
                    firstType = "";
                }
            }
            if (firstType !== "") {
                return firstType;
            }
            firstType = this.board[2][0].type;
            if (firstType !== this.board[1][1].type) {
                firstType = "";
            }
            if (firstType !== this.board[0][2].type) {
                firstType = "";
            }
            return firstType;
        };
        TictactoeEngine.prototype.checkIfTie = function () {
            var count = 0;
            for (var row = 0; row < this.board.length; row++) {
                for (var col = 0; col < this.board.length; col++) {
                    if (this.board[row][col].type !== "") {
                        count++;
                    }
                }
            }
            return count === 9;
        };
        TictactoeEngine.prototype.checkResult = function () {
            var horz = this.checkHorizontal();
            var ver = this.checkVertical();
            var diag = this.checkDiagonal();
            // console.log("horz " + horz + " ver " + ver + " diag " + diag)
            if (horz !== "") {
                return horz;
            }
            else if (ver !== "") {
                return ver;
            }
            else if (diag !== "") {
                return diag;
            }
            else {
                return "";
            }
        };
        TictactoeEngine.prototype.reset = function () {
            for (var row = 0; row < this.board.length; row++) {
                for (var col = 0; col < this.board.length; col++) {
                    this.board[row][col].type = "";
                }
            }
            this.result = "";
            this.nextInTurn = "circle";
        };
        return TictactoeEngine;
    })();
    PeliApp.TictactoeEngine = TictactoeEngine;
    angular.module('PeliApp').service('TictactoeEngine', TictactoeEngine);
})(PeliApp || (PeliApp = {}));

var PeliApp;
(function (PeliApp) {
    var Engine = PeliApp.TictactoeEngine;
    var TictactoeAI = (function () {
        function TictactoeAI() {
            this.this.board = [
                [{ type: "" }, { type: "" }, { type: "" }],
                [{ type: "" }, { type: "" }, { type: "" }],
                [{ type: "" }, { type: "" }, { type: "" }]
            ];
            this.nextInTurn = "circle";
            this.result = "";
        }
        TictactoeAI.prototype.min_max = function () {
            Engine.reset();
        };
        TictactoeAI.prototype.max_value = function (depth) {
            depth++;
            var result = Engine.getResult();
            if (result === "") {
                var v = Number.MIN_VALUE;
                var nodes = Engine.getAvailableMoves();
                for (var i = 0; i < nodes.length; i++) {
                    Engine.move(nodes[i].x, nodes[i].y);
                    v = Math.max(v, min_value(nodes));
                }
            }
        };
        TictactoeAI.prototype.estimateBestMove = function (which, board) {
        };
        TictactoeAI.prototype.activateSquare = function (row, col) {
            if (this.board[row][col].type === "" && this.result === "") {
                this.board[row][col].type = this.nextInTurn;
                this.nextInTurn = this.nextInTurn === "circle" ? "cross" : "circle";
                this.result = this.checkResult();
                if (this.result !== "") {
                    message = this.result + " wins";
                    this.nextInTurn = "";
                }
                else if (this.checkIfTie()) {
                    message = "Tie";
                    this.nextInTurn = "";
                }
                else {
                    message = this.nextInTurn + " turn";
                }
            }
        };
        return TictactoeAI;
    })();
    PeliApp.TictactoeAI = TictactoeAI;
    angular.module('PeliApp').service('TictactoeAI', TictactoeAI);
})(PeliApp || (PeliApp = {}));

PeliApp.controller("TictactoeController", function($scope) {
	
	$scope.message = "Circle starts";
	$scope.result = "";
	$scope.nextInTurn = "circle";
	
	$scope.board = [
		[{type: ""}, {type: ""}, {type: ""}],
		[{type: ""}, {type: ""}, {type: ""}],
		[{type: ""}, {type: ""}, {type: ""}],
	];
	
	$scope.activateSquare = function(row, col) {
		if ($scope.board[row][col].type === "" && $scope.result === "") {
			$scope.board[row][col].type = $scope.nextInTurn;
			$scope.nextInTurn = $scope.nextInTurn === "circle" ? "cross" : "circle";
			$scope.result = $scope.checkResult();
			if ($scope.result !== "") {
				$scope.message = $scope.result + " wins";
				$scope.nextInTurn = "";
			} else if ($scope.checkIfTie()) {
				$scope.message = "Tie";
				$scope.nextInTurn = "";
			} else {
				$scope.message = $scope.nextInTurn + " turn";
			}
		}
	}
	
	$scope.checkHorizontal = function() {
		for(var row = 0; row < $scope.board.length; row++) {
			var firstType = $scope.board[row][0].type;
			for(var col = 1; col < $scope.board[row].length; col++) {
				if (firstType !== $scope.board[row][col].type) {
					firstType = "";
				}
			}
			if (firstType !== "") {
				return firstType;
			}
		}
		return "";
	}
	
	$scope.checkVertical = function() {
		for(var col = 0; col < $scope.board[0].length; col++) {
			var firstType = $scope.board[0][col].type;
			for(var row = 1; row < $scope.board.length; row++) {
				if (firstType !== $scope.board[row][col].type) {
					firstType = "";
				}
			}
			if (firstType !== "") {
				return firstType;
			}
		}
		return "";
	}
	
	$scope.checkDiagonal = function() {
		var firstType = $scope.board[0][0].type;
		for(var i = 1; i < 3; i++) {
			if (firstType !== $scope.board[i][i].type) {
				firstType = "";
			}
		}
		if (firstType !== "") {
			return firstType;
		}
		firstType = $scope.board[2][0].type;
		if (firstType !== $scope.board[1][1].type) {
			firstType = "";
		}
		if (firstType !== $scope.board[0][2].type) {
			firstType = "";
		}
		return firstType;
	}
	
	$scope.checkIfTie = function() {
		var count = 0;
		for(var row = 0; row < $scope.board.length; row++) {
			for(var col = 0; col < $scope.board.length; col++) {
				if ($scope.board[row][col].type !== "") {
					count++;
				}
			}
		}
		return count === 9;
	}
	
	$scope.checkResult = function() {
		var horz = $scope.checkHorizontal();
		var ver = $scope.checkVertical();
		var diag = $scope.checkDiagonal();
		// console.log("horz " + horz + " ver " + ver + " diag " + diag)
		if (horz !== "") {
			return horz;
		} else if (ver !== "") {
			return ver;
		} else if (diag !== "") {
			return diag;
		} else {
			return "";
		}
	}
	
	$scope.reset = function() {
		for(var row = 0; row < $scope.board.length; row++) {
			for(var col = 0; col < $scope.board.length; col++) {
				$scope.board[row][col].type = "";
			}
		}
		$scope.result = "";
		$scope.nextInTurn = "circle";
	}
});
PeliApp.directive('tictactoeBoard', function() {
    return {
        restrict: 'E',
        template: '<div class="square">{{data.color}} {{data.holder}} (x{{column}}:y{{row}})</span>',
        scope: {
            data: '='
        },
        link: function(scope, element, attrs) {
			
        }
    };
});
PeliApp.directive("tictactoeSquare", function() {
    return {
        restrict: "E",
        template: "<div class=\"tictactoe-square\">" +
					"{{ type }}" +
				  "</span>",
        scope: {
            type: "="
        },
        link: function(scope, element, attrs) {
            var span = $(element).find("div")[0];
            var color = "";
            
            scope.$watch("type", function(newVal, oldVal) {
                if (newVal === "") {
                    $(span).css({"background-color": "orange"});
                } else if (newVal === "cross") {
                    $(span).css({"background-color": "red"});
                } else if (newVal === "circle") {
                    $(span).css({"background-color": "green"});
                } else {
                    $(span).css({"background-color": color});
                }
            }, true);
        }
    };
});
var PeliApp;
(function (PeliApp) {
    var ModCreator = (function () {
        function ModCreator() {
        }
        ModCreator.prototype.createRandomDMs = function () {
        };
        ModCreator.prototype.createRandomDungeons = function () {
        };
        ModCreator.prototype.createEmptyDungeon = function (size) {
            var grid = [];
            for (var y = 0; y < size; y++) {
                grid.push([]);
                for (var x = 0; x < size; x++) {
                    grid[y].push({
                        type: ""
                    });
                }
            }
            // DONE
            // console.log("created grid ", grid);
            return grid;
        };
        ModCreator.prototype.createDungeonCombinations = function (gridsize, tunnelsize) {
            // LogmodEng.start("createDungeonCombinations: gridsize " + gridsize + " tunnelsize " + tunnelsize);
            var direction = Math.floor(Math.random() * 4); // 0 = north, 1 = south, 2 = west, 3 = east
            var entrance = Math.floor(Math.random() * (gridsize - 2) + 1); // anything but the corner square
            // console.log("dir is " + direction + " and entrance " + entrance);
            // LogmodEng.append("dir is " + direction + " and entrance " + entrance);
            var grid = this.createEmptyDungeon(gridsize);
            // debugger;
            // should be in own method
            var start = {};
            var next = {};
            if (direction === 0) {
                // north
                start.y = 0;
                start.x = entrance;
                next.y = 1;
                next.x = entrance;
            }
            else if (direction === 1) {
                // south
                start.y = gridsize - 1;
                start.x = entrance;
                next.y = gridsize - 2;
                next.x = entrance;
            }
            else if (direction === 2) {
                // east
                start.y = entrance;
                start.x = 0;
                next.y = entrance;
                next.x = 1;
            }
            else if (direction === 3) {
                // west
                start.y = entrance;
                start.x = gridsize - 1;
                next.y = entrance;
                next.x = gridsize - 2;
            }
            grid[start.y][start.x].type = "tunnel";
            grid[next.y][next.x].type = "tunnel";
            var dungeons = [];
            this.createDungeonsOfSize(next.x, next.y, 1, tunnelsize, grid, dungeons);
            console.log("dungeons are ", dungeons);
            // LogmodEng.end("FROM createDungeonCombinations: gridsize " + gridsize + " tunnelsize " + tunnelsize + " RETURN dungeons " + dungeons);
            return dungeons;
        };
        ModCreator.prototype.createDungeonsOfSize = function (x, y, currentsize, wantedsize, grid, combinations) {
            // LogmodEng.start("createDungeonsOfSize: x " + x + " y " + y + " currentsize " + currentsize + " wantedsize " + wantedsize + " grid " + grid + " combinations " + combinations);
            // console.log("creating dungeons x: " + x + " y: " + y + " csize: " + currentsize + " wsize: " + wantedsize);
            if (currentsize === wantedsize) {
                combinations.push({ grid: grid, size: currentsize });
                return;
            }
            var available = this.getAvailable(x, y, grid);
            for (var c = 0; c < available.length; c++) {
                var now = available[c];
                var newgrid = jQuery.extend(true, {}, grid); // deep copy
                newgrid[now.y][now.x].type = "tunnel";
                this.createDungeonsOfSize(now.x, now.y, currentsize + 1, wantedsize, newgrid, combinations);
            }
            // LogmodEng.end("FROM createDungeonsOfSize: x " + x + " y " + y + " currentsize " + currentsize + " wantedsize " + wantedsize + " grid " + grid + " combinations " + combinations);
        };
        ModCreator.prototype.getAvailable = function (x, y, grid) {
            // LogmodEng.start("getAvailable: x " + x + " y " + y + " grid ", grid);
            var available = [];
            for (var iy = y - 1; iy <= y + 1; iy++) {
                for (var ix = x - 1; ix <= x + 1; ix++) {
                    // console.log("looping iy: " + iy + " ix: " + ix);
                    // check if inside the grid
                    // and also not directly adjancent to border
                    // |x|x|x|x|x|
                    // |x|0|0|0|x|
                    // |x|0|0|0|x|
                    // |x|0|0|0|0|
                    // |x|x|x|x|x|
                    if (iy > 0 && iy < 4 && ix > 0 && ix < 4) {
                        // if (iy > 0 && iy < grid.length-1 && ix > 0 && ix < grid[iy].length-1) {
                        // console.log("inside grid ");
                        // available squares:
                        // x|0|x
                        // 0|1|0
                        // x|0|x
                        if (iy !== y && ix === x) {
                            // console.log("top or bottom row");
                            // checks first if top or bottom row, then only one directly adjancent square
                            this.addIfAvailable(ix, iy, grid, available);
                        }
                        else if (iy === y && ix !== x) {
                            // console.log("middle row");
                            this.addIfAvailable(ix, iy, grid, available);
                        }
                    }
                }
            }
            // console.log("available is ", available);
            // LogmodEng.end("FROM getAvailable: x " + x + " y " + y + " grid " + grid + " RETURN available " + available);
            return available;
        };
        ModCreator.prototype.addIfAvailable = function (x, y, grid, list) {
            // LogmodEng.start("addIfAvailable: x " + x + " y " + y + " grid [big] list " + list);
            // console.log("grid is ", grid);
            if (grid[y][x].type === "") {
                // console.log("square is empty");
                // adds to list if only one adjancent square
                if (grid[y + 1][x].type !== "" && grid[y - 1][x].type === "" && grid[y][x - 1].type === "" && grid[y][x + 1].type === "") {
                    // console.log("adjancent is top square");
                    list.push({ x: x, y: y });
                }
                else if (grid[y - 1][x].type !== "" && grid[y + 1][x].type === "" && grid[y][x - 1].type === "" && grid[y][x + 1].type === "") {
                    // console.log("adjancent is bottom square");
                    list.push({ x: x, y: y });
                }
                else if (grid[y][x - 1].type !== "" && grid[y + 1][x].type === "" && grid[y - 1][x].type === "" && grid[y][x + 1].type === "") {
                    // console.log("adjancent is left square");
                    list.push({ x: x, y: y });
                }
                else if (grid[y][x + 1].type !== "" && grid[y + 1][x].type === "" && grid[y - 1][x].type === "" && grid[y][x - 1].type === "") {
                    // console.log("adjancent is right square");
                    list.push({ x: x, y: y });
                }
            }
            // console.log("list is ", list);
            // LogmodEng.end("FROM addIfAvailable: x " + x + " y " + y + " grid [big] list " + list);
        };
        return ModCreator;
    })();
    PeliApp.ModCreator = ModCreator;
    angular.module("PeliApp").service("ModCreator", ModCreator);
})(PeliApp || (PeliApp = {}));

var PeliApp;
(function (PeliApp) {
    var Creator = PeliApp.ModCreator;
    var ModEngine = (function () {
        function ModEngine() {
            this.state = "pickDM";
            this.subscribers = [];
            this.init();
        }
        ModEngine.prototype.init = function () {
            this.playerDM = {};
            this.playerDungeon = [
                [{ type: "" }, { type: "" }, { type: "" }, { type: "" }, { type: "" }],
                [{ type: "" }, { type: "" }, { type: "" }, { type: "" }, { type: "" }],
                [{ type: "" }, { type: "" }, { type: "" }, { type: "" }, { type: "" }],
                [{ type: "" }, { type: "" }, { type: "" }, { type: "" }, { type: "" }],
                [{ type: "" }, { type: "" }, { type: "" }, { type: "" }, { type: "" }]
            ];
            var creator = new Creator();
            this.dungeonMasters = [
                {
                    name: "Sorcerer's apprentice",
                    prestige: 100,
                    health: 6,
                    magic: 10,
                    info: "Twisted minded pupil of a master wizard, cast away from his peers. Given the proper education and equipment might become a world-renowed sorcerer. No special abilities."
                },
                {
                    name: "Baby beholder",
                    prestige: 180,
                    health: 4,
                    magic: 8,
                    info: "Small beholder, a size of a human head. Grows into a massive monster that can disintegrate people at will. Unable to equip items."
                },
                {
                    name: "Hydra pup",
                    prestige: 150,
                    health: 8,
                    magic: 4,
                    info: "Cutish little hydra pup, size of a dog. Grows into an enormous beast that is almost impossible to kill due to regeneration. Unable to equip items except trinkets."
                },
            ];
            this.dungeons = creator.createDungeonCombinations(5, 7);
            this.selectedDungeon = this.playerDungeon;
        };
        ModEngine.prototype.subscribeToStateChange = function (subscriber) {
            this.subscribers.push(subscriber);
        };
        ModEngine.prototype.changeState = function (newstate) {
            console.log("state changed in mod engine " + newstate);
            this.state = newstate;
            for (var i = 0; i < this.subscribers.length; i++) {
                this.subscribers[i](this.state);
            }
        };
        ModEngine.prototype.getState = function () {
            return this.state;
        };
        ModEngine.prototype.getPlayerDM = function () {
            return this.playerDM;
        };
        ModEngine.prototype.getPlayerDungeon = function () {
            return this.playerDungeon;
        };
        ModEngine.prototype.getSelectedDungeon = function () {
            return this.selectedDungeon;
        };
        ModEngine.prototype.getDMs = function () {
            return this.dungeonMasters;
        };
        ModEngine.prototype.pickDM = function (index) {
            this.playerDM = this.dungeonMasters[index];
            this.changeState("pickDungeon");
        };
        ModEngine.prototype.getDungeons = function () {
            return this.dungeons;
        };
        ModEngine.prototype.selectDungeon = function (index) {
            this.selectedDungeon = this.dungeons[index].grid;
            this.changeState("changeDungeon");
        };
        ModEngine.prototype.pickDungeon = function () {
            // change playerDungeon
            // to the one found from purchasable dungeons
            // if enough money? no checks needed atm
            this.playerDungeon = this.selectedDungeon;
            this.changeState("buildDungeon");
        };
        ModEngine.prototype.getBuildings = function () {
            return ["1", "2", "3"];
        };
        ModEngine.prototype.restart = function () {
            this.init();
            this.changeState("pickDM");
        };
        return ModEngine;
    })();
    PeliApp.ModEngine = ModEngine;
    angular.module("PeliApp").service("ModEngine", ModEngine);
})(PeliApp || (PeliApp = {}));

PeliApp.controller("ModController", function($scope, ModEngine) {
	
	$scope.init = function() {
		$scope.message = "Pick a DM";
		$scope.state = ModEngine.getState();
		$scope.dungeon = ModEngine.getPlayerDungeon();
		$scope.dm = ModEngine.getPlayerDM();
	}
	
	$scope.changeView = function(newState) {
		console.log("change view " + newState);
		if (newState === "pickDM") {
			$scope.init();
		} else if (newState === "pickDungeon") {
			$scope.dm = ModEngine.getPlayerDM();
			$scope.state = newState;
			$scope.message = "Pick a dungeon";
		} else if (newState === "changeDungeon") {
			$scope.dungeon = ModEngine.getSelectedDungeon();
		} else if (newState === "buildDungeon") {
			$scope.dungeon = ModEngine.getPlayerDungeon();
			$scope.state = newState;
			$scope.message = "Build dungeon";
		} else if (newState === "waitHeroes") {
			
		} else if (newState === "killHeroes") {
			
		}
	}
	
	ModEngine.subscribeToStateChange($scope.changeView);
	// ModEngine.start(); ?? rather than call init() here?
	
	$scope.init();
});
PeliApp.directive("modBuildDungeon", function(ModEngine) {
    return {
        restrict: "E",
        template: "<div class='mod-build-dungeon flex-col'>" +
					"<div ng-repeat='item in buildable'>"+
						"buildable"+
						// "<mod-build-dungeon-item ng-click='select($index)' building='item'></mod-build-dungeon-item>"+
					"</div>"+
				  "</div>",
        scope: {
            type: "="
        },
        link: function(scope, element, attrs) {
			var selected;
			scope.buildable = ModEngine.getBuildings();
			
			scope.select = function(index) {
				// console.log("selected on " + selected);
				if (typeof selected === "number") {
					var old = element.find(".mod-build-dungeon")[selected];
					old.className = old.className.replace( /(?:^|\s)dm-selected(?!\S)/g , '' );
				}
				var div = element.find(".mod-build-dungeon")[index];
				div.className += " dm-selected";
				selected = index;
			}
			
			scope.pick = function() {
				// ModEngine.pickDungeon(selected);
			}
        }
    };
});
PeliApp.directive("modBuildDungeonItem", function(ModEngine) {
    return {
        restrict: "E",
        template: "<div class='mod-select-dungeon-item flex-col'>" +
					"<div class='mod-select-dungeon-item-grid'>"+
						"dungeon here"+
						// "<div>name: {{ dm.name }}</div>"+
						// "<div>prestige: {{ dm.prestige }}</div>"+
						// "<div>health: {{ dm.health }}</div>"+
						// "<div>magic: {{ dm.magic }}</div>"+
						// "<div>info: {{ dm.info }}</div>"+
					"</div>"+
				  "</div>",
        scope: {
            building: "="
        },
        link: function(scope, element, attrs) {
        }
    };
});
PeliApp.directive("modCommand", function(ModEngine) {
    return {
        restrict: "E",
        template: 	"<div class='flex-col'>"+
						"<button ng-click='restart()'>Restart</button>"+
						// "<button ng-click='save()'>Save</button>"+
						"<div class='white turnbox-outer'>"+
							"<div class='white turnbox-inner'>"+
								"{{ state }}"+
							"</div>"+
						"</div>"+
						"<div class='messagebox'>"+
							"{{ message }}"+
						"</div>"+
					"</div>",
        scope: {
            message: "=",
			state: "="
        },
        link: function(scope, element, attrs) {
			
			scope.restart = function() {
				ModEngine.restart();
				// for(var row = 0; row < scope.grid.length; row++) {
					// for(var col = 0; col < scope.grid.length; col++) {
						// scope.grid[row][col].type = "";
					// }
				// }
				// scope.message = "Start the game";
			}
			
			scope.save = function() {
				
			}
        }
    };
});
PeliApp.directive("modDmPanel", function(ModEngine) {
    return {
        restrict: "E",
        template: "<div class='flex-col'>" +
					"I am {{ dm.name }}"+
				  "</div>",
        scope: {
            dm: "="
        },
        link: function(scope, element, attrs) {
			// var selected;
			// scope.dms = ModEngine.getDMs();
			
			// scope.select = function(index) {
				// // console.log("selected on " + selected);
				// if (typeof selected === "number") {
					// var old = element.find(".mod-select-dm-item-portrait")[selected];
					// old.className = old.className.replace( /(?:^|\s)dm-selected(?!\S)/g , '' );
				// }
				// var div = element.find(".mod-select-dm-item-portrait")[index];
				// div.className += " dm-selected";
				// selected = index;
			// }
			
			// scope.pick = function() {
				// ModEngine.pickDM(selected);
			// }
        }
    };
});
PeliApp.directive("modDungeonGrid", function(ModEngine) {
    return {
        restrict: "E",
        template: 	"<div class='mod-grid'>" +
						"<div class='mod-grid-row flex-row' ng-repeat='row in grid'>"+
							"<div class='mod-grid-col' ng-repeat='column in row' ng-click='activateSquare($parent.$index, $index)'>"+
								"<mod-dungeon-square type='column.type'></mod-dungeon-square>"+
							"</div>"+
						"</div>"+
					"</div>",
        scope: {
            grid: "="
        },
        link: function(scope, element, attrs) {
			var selected;
			
			scope.activateSquare = function(row, col) {
				if (scope.grid[row][col].type === "") {
					scope.grid[row][col].type = "tunnel";
				}
			}
        }
    };
});
PeliApp.directive("modDungeonSquare", function() {
    return {
        restrict: "E",
        template: "<div class=\"mod-square\">" +
					"{{ type }}" +
				  "</span>",
        scope: {
            type: "="
        },
        link: function(scope, element, attrs) {
            var span = $(element).find("div")[0];
            var color = "";
            
            scope.$watch("type", function(newVal, oldVal) {
                if (newVal === "") {
                    $(span).css({"background-color": "orange"});
                } else if (newVal === "tunnel") {
                    $(span).css({"background-color": "gray"});
                } else if (newVal === "lair") {
                    $(span).css({"background-color": "green"});
                } else {
                    $(span).css({"background-color": color});
                }
            }, true);
        }
    };
});
PeliApp.directive("modSelectDm", function(ModEngine) {
    return {
        restrict: "E",
        template: "<div class='mod-select flex-col'>" +
					"<div ng-repeat='dungeonmaster in dms'>"+
						"<mod-select-dm-item ng-click='select($index)' dm='dungeonmaster'></mod-select-dm-item>"+
					"</div>"+
					"<button ng-click='pick()'>Pick</button>"+
				  "</div>",
        scope: {
            type: "="
        },
        link: function(scope, element, attrs) {
			var selected;
			scope.dms = ModEngine.getDMs();
			
			scope.select = function(index) {
				// console.log("selected on " + selected);
				if (typeof selected === "number") {
					var old = element.find(".mod-select-dm-item-portrait")[selected];
					old.className = old.className.replace( /(?:^|\s)dm-selected(?!\S)/g , '' );
				}
				var div = element.find(".mod-select-dm-item-portrait")[index];
				div.className += " dm-selected";
				selected = index;
			}
			
			scope.pick = function() {
				ModEngine.pickDM(selected);
			}
        }
    };
});
PeliApp.directive("modSelectDmItem", function(ModEngine) {
    return {
        restrict: "E",
        template: "<div class='mod-select-dm-item flex-col'>" +
					"<div class='mod-select-dm-item-portrait'>top dm</div>"+
					"<div class='mod-select-dm-item-stats'>"+
						"<div>name: {{ dm.name }}</div>"+
						// "<div>prestige: {{ dm.prestige }}</div>"+
						// "<div>health: {{ dm.health }}</div>"+
						// "<div>magic: {{ dm.magic }}</div>"+
						"<div>info: {{ dm.info }}</div>"+
					"</div>"+
				  "</div>",
        scope: {
            dm: "="
        },
        link: function(scope, element, attrs) {
        }
    };
});
PeliApp.directive("modSelectDungeon", function(ModEngine) {
    return {
        restrict: "E",
        template: "<div class='mod-select-dungeon flex-col'>" +
					"<div ng-repeat='dungeon in dungeons'>"+
						"<div ng-click='select($index)' class='mod-select-dungeon-item'>"+
							"I am a dungeon!"+
						"</div>"+
						// "<mod-select-dungeon-item ng-click='select($index)' dungeon='dungeon'></mod-select-dungeon-item>"+
					"</div>"+
					"<button ng-click='pick()'>Pick</button>"+
				  "</div>",
        scope: {
            type: "="
        },
        link: function(scope, element, attrs) {
			var selected;
			scope.dungeons = ModEngine.getDungeons();
			
			scope.select = function(index) {
				// console.log("selected on " + selected);
				if (typeof selected === "number") {
					var old = element.find(".mod-select-dungeon-item")[selected];
					old.className = old.className.replace( /(?:^|\s)dm-selected(?!\S)/g , '' );
				}
				var div = element.find(".mod-select-dungeon-item")[index];
				div.className += " dm-selected";
				selected = index;
				// debugger;
				ModEngine.selectDungeon(index);
			}
			
			scope.pick = function() {
				ModEngine.pickDungeon();
			}
        }
    };
});
PeliApp.directive("modSelectDungeonItem", function(ModEngine) {
    return {
        restrict: "E",
        template: "<div class='mod-select-dungeon-item flex-col'>" +
					// "<div class='mod-select-dungeon-item-grid'>"+
						"dungeon here"+
					// "</div>"+
				  "</div>",
        scope: {
            dungeon: "="
        },
        link: function(scope, element, attrs) {
        }
    };
});