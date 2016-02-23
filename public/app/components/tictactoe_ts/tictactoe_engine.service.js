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
