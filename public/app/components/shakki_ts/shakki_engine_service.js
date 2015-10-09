var PeliApp;
(function (PeliApp) {
    var Igniter = PeliApp.ShakkiIgniter;
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
            var igniter = new Igniter();
            igniter.initAll(this.table, this.pieces, this.quantity, this.squares);
            //igniter.initTable(this.table);
            //igniter.initPieces(this.pieces, this.table, this.quantity);
            //igniter.generateSquares(this.squares);
        }
        ShakkiEngine.prototype.movePiece = function (piece, row, column) {
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
            //this.checkForMateOrCheckMate();
        };
        //// TODO
        //checkForMateOrCheckMate() {
        //
        //}
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
            while (x !== -1 && x !== 8 && y !== -1 && y !== 8) {
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
