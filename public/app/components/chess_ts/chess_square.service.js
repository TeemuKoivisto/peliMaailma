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
