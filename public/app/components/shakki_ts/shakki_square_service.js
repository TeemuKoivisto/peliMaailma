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
        ShakkiSquare.prototype.setMove = function (type, color, x, y) {
            if (type === 'soldier') {
                this.moves[type][color].push({ x: x, y: y });
            }
            else {
                this.moves[type].push({ x: x, y: y });
            }
        };
        ShakkiSquare.prototype.setMove2 = function (type, color, move) {
            if (type === 'soldier') {
                this.moves[type][color].push(move);
            }
            else {
                this.moves[type].push(move);
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
