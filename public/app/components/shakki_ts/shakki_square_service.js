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
            this.attacks = {
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
                this.attacks[type][color].push({ x: x, y: y });
            }
        };
        return ShakkiSquare;
    })();
    PeliApp.ShakkiSquare = ShakkiSquare;
    angular.module('PeliApp').service('ShakkiSquare', ShakkiSquare);
})(PeliApp || (PeliApp = {}));
