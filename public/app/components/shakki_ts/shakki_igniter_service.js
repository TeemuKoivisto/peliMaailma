var PeliApp;
(function (PeliApp) {
    var Square = PeliApp.ShakkiSquare;
    var ShakkiIgniter = (function () {
        function ShakkiIgniter() {
            this.types = ['soldier', 'rook', 'knight', 'bishop', 'queen', 'king'];
        }
        ShakkiIgniter.prototype.initAll = function (table, pieces, quantity, squares) {
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
                        if (x !== 0) {
                            sq.setAttack(type, 'white', (x - 1), (y - 1));
                            sq.setAttack(type, 'black', (x - 1), (y + 1));
                        }
                        if (x !== 7) {
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
