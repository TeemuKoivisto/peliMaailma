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
