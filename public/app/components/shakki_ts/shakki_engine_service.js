var PeliApp;
(function (PeliApp) {
    var Square = PeliApp.ShakkiSquare;
    var ShakkiEngine = (function () {
        function ShakkiEngine() {
            this.table = [
                [{}],
                [{}],
                [{}],
                [{}],
                [{}],
                [{}],
                [{}],
                [{}]
            ];
            this.pieces = {};
            this.quantity = {
                white: {
                    soldier: 0,
                    rook: 0,
                    knight: 0,
                    bishop: 0,
                    queen: 0,
                    king: 0
                },
                black: {
                    soldier: 0,
                    rook: 0,
                    knight: 0,
                    bishop: 0,
                    queen: 0,
                    king: 0
                }
            };
            this.squares = [
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                []
            ];
            this.types = ['soldier', 'rook', 'knight', 'bishop', 'queen', 'king'];
            this.initTable(this.table);
            this.initPieces(this.pieces);
            this.generateSquares(this.squares);
        }
        ShakkiEngine.prototype.initTable = function (table) {
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
        ShakkiEngine.prototype.initSpecialRow = function (row, color) {
            for (var column = 0; column < 8; column++) {
                switch (column) {
                    case (0):
                    case (7):
                        row[column] = {
                            holder: "rook",
                            color: color,
                            active: false
                        };
                        break;
                    case (1):
                    case (6):
                        row[column] = {
                            holder: "knight",
                            color: color,
                            active: false
                        };
                        break;
                    case (2):
                    case (5):
                        row[column] = {
                            holder: "bishop",
                            color: color,
                            active: false
                        };
                        break;
                    case (3):
                        row[column] = {
                            holder: "king",
                            color: color,
                            active: false
                        };
                        break;
                    case (4):
                        row[column] = {
                            holder: "queen",
                            color: color,
                            active: false
                        };
                        break;
                }
            }
        };
        ShakkiEngine.prototype.initRow = function (row, type, color) {
            for (var column = 0; column < 8; column++) {
                row[column] = {
                    holder: type,
                    color: color,
                    active: false
                };
            }
        };
        ShakkiEngine.prototype.initPieces = function (pieces) {
            for (var row = 0; row < 8; row++) {
                for (var column = 0; column < 8; column++) {
                    var holder = this.table[row][column].holder;
                    if (holder === 'empty')
                        continue;
                    var color = this.table[row][column].color;
                    var number = this.quantity[color][holder] + 1;
                    var name = color + "-" + holder + number;
                    pieces[name] = {
                        x: column,
                        y: row,
                        type: holder,
                        color: color
                    };
                    this.quantity[color][holder]++;
                }
            }
        };
        ShakkiEngine.prototype.calculatePossibleMovesForPiece = function (name) {
            var piece = this.pieces[name];
            if (typeof piece === "undefined")
                return { moves: [], eatings: [] };
            var x = piece.x;
            var y = piece.y;
            var available = {
                moves: [],
                eatings: []
            };
            if (piece.type !== 'soldier') {
                var moves = this.squares[piece.y][piece.x].moves[piece.type];
                for (var property in moves) {
                    //console.log("", moves);
                    //console.log(moves[property]);
                    //console.log(moves[property].horizontal);
                    if (moves[property]['horizontal']) {
                        this.loopUntilBorderOrPiece(piece, x - 1, y, -1, 0, available);
                        this.loopUntilBorderOrPiece(piece, x + 1, y, 1, 0, available);
                    }
                    else if (moves[property]['vertical']) {
                        this.loopUntilBorderOrPiece(piece, x, y - 1, 0, -1, available);
                        this.loopUntilBorderOrPiece(piece, x, y + 1, 0, 1, available);
                    }
                    else if (moves[property]['diagonal']) {
                        //available.moves.push({x: 666, y: 666});
                        this.loopUntilBorderOrPiece(piece, x - 1, y - 1, -1, -1, available);
                        this.loopUntilBorderOrPiece(piece, x - 1, y + 1, -1, 1, available);
                        this.loopUntilBorderOrPiece(piece, x + 1, y + 1, 1, 1, available);
                        this.loopUntilBorderOrPiece(piece, x + 1, y - 1, 1, -1, available);
                    }
                    else {
                        available.moves.push({ x: 100, y: 100 });
                        this.checkAndAddIfValidMove(piece, moves[property].x, moves[property].y, available);
                    }
                }
            }
            else {
                throw ('fug');
            }
            return available;
        };
        ShakkiEngine.prototype.loopUntilBorderOrPiece = function (piece, x, y, xdir, ydir, available) {
            console.log("tullaan " + x + ":" + y);
            while (x !== -1 && x !== 8 && y !== -1 && y !== 8) {
                //console.log("nyt x " + x + " ja y " + y);
                if (!this.checkAndAddIfValidMove(piece, x, y, available)) {
                    break;
                }
                //if (this.table[y][x].holder==='empty') {
                //    available.moves.push({x: x, y: y});
                //} else {
                //    if (this.table[y][x].color !== piece.color) {
                //        available.eatings.push({
                //            x: x,
                //            y: y
                //        });
                //    }
                //    break;
                //}
                x += xdir;
                y += ydir;
            }
        };
        ShakkiEngine.prototype.checkAndAddIfValidMove = function (piece, x, y, available) {
            if (this.table[y][x].holder === 'empty') {
                available.moves.push({ x: x, y: y });
                return true;
            }
            else {
                if (this.table[y][x].color !== piece.color) {
                    available.eatings.push({
                        x: x,
                        y: y
                    });
                }
                return false;
            }
        };
        ShakkiEngine.prototype.generateSquares = function (table) {
            for (var row = 0; row < 8; row++) {
                for (var column = 0; column < 8; column++) {
                    var sq = new Square(row, column);
                    this.generateMovesForSquare(sq, row, column);
                    //console.log("pushing " + row + ":" + column, sq);
                    table[row].push(sq);
                }
            }
        };
        ShakkiEngine.prototype.generateMovesForSquare = function (sq, y, x) {
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
        //
        //}
        ShakkiEngine.prototype.generateKingMoves = function (x, y) {
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
        ShakkiEngine.prototype.generateKnightMoves = function (x, y) {
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
        ShakkiEngine.prototype.checkAndPushCoords = function (x, y, list) {
            if (x !== -1 && x !== 8 && y !== -1 && y !== 8) {
                list.push({ x: x, y: y });
            }
        };
        return ShakkiEngine;
    })();
    PeliApp.ShakkiEngine = ShakkiEngine;
    angular.module('PeliApp').service('ShakkiEngine', ShakkiEngine);
})(PeliApp || (PeliApp = {}));
