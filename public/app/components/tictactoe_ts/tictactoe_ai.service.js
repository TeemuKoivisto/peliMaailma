var PeliApp;
(function (PeliApp) {
    var Engine = PeliApp.TictactoeEngine;
    var TictactoeAI = (function () {
        function TictactoeAI() {
            this.engine = new Engine();
            this.looped = 0;
            this.nodes = 0;
        }
        TictactoeAI.prototype.createTree = function () {
            this.nodes = 0;
            var board = [
                [{ type: "", nodes: [] }, { type: "", nodes: [] }, { type: "", nodes: [] }],
                [{ type: "", nodes: [] }, { type: "", nodes: [] }, { type: "", nodes: [] }],
                [{ type: "", nodes: [] }, { type: "", nodes: [] }, { type: "", nodes: [] }],
            ];
            debugger;
            this.createTreeFrom(0, 4, board, true);
            console.log("board: ", board);
        };
        TictactoeAI.prototype.createTreeFrom = function (nowdepth, depth, board, iscircle) {
            this.nodes++;
            if (this.nodes > 10) {
                throw ("safffff ", board);
            }
            if (nowdepth === depth) {
                return;
            }
            nowdepth++;
            for (var row = 0; row < board.length; row++) {
                for (var col = 0; col < board[row].length; col++) {
                    if (board[row][col].type === "") {
                        var newboard = jQuery.extend(true, [], board);
                        newboard[row][col].type = iscircle;
                        this.createTreeFrom(nowdepth, depth, newboard, !iscircle);
                        board[row][col].nodes.push(newboard);
                    }
                }
            }
        };
        TictactoeAI.prototype.min_max = function () {
            this.looped = 0;
            var modboard = [
                [{ type: "circle" }, { type: "cross" }, { type: "circle" }],
                [{ type: "cross" }, { type: "circle" }, { type: "cross" }],
                [{ type: "" }, { type: "" }, { type: "" }]
            ];
            // var modboard = [
            // [{type: "circle"}, {type: "cross"}, {type: ""}],
            // [{type: ""}, {type: ""}, {type: ""}],
            // [{type: ""}, {type: ""}, {type: ""}]
            // ]
            var result = this.max_value(modboard);
            // var modboard = [
            // [{type: "circle"}, {type: "cross"}, {type: "circle"}],
            // [{type: "cross"}, {type: "circle"}, {type: "cross"}],
            // [{type: ""}, {type: "circle"}, {type: ""}]
            // ]
            // var modboard = [
            // [{type: "circle"}, {type: "cross"}, {type: "circle"}],
            // [{type: ""}, {type: ""}, {type: ""}],
            // [{type: ""}, {type: ""}, {type: ""}]
            // ]
            // var result = this.min_value(modboard);
            console.log("result was " + result);
            console.log("loops: " + this.looped);
        };
        TictactoeAI.prototype.min_value = function (board) {
            Logtic.start("min_value: board [alot]");
            this.looped++;
            if (this.looped > 30) {
                debugger;
                if (this.looped > 10000) {
                    throw ("fux");
                }
            }
            this.engine.setBoard(board);
            var result = this.engine.getResult();
            if (result === "") {
                // debugger;
                // var v = Number.MAX_VALUE;
                var v = 10;
                for (var row = 0; row < board.length; row++) {
                    for (var col = 0; col < board[row].length; col++) {
                        if (board[row][col].type === "") {
                            var newboard = jQuery.extend(true, [], board);
                            newboard[row][col].type = "cross";
                            v = Math.min(v, this.max_value(newboard));
                        }
                    }
                }
                // console.log("minvalue " + this.looped + " v " + v);
                Logtic.end("FROM min_value: board [alot] RETURN v " + v);
                return v;
            }
            else {
                var res = this.turnResultToNumeric(result);
                // console.log("minvalue " + this.looped + " result " + result);
                Logtic.end("FROM min_value: board [alot] RETURN res " + res);
                return res;
            }
        };
        TictactoeAI.prototype.max_value = function (board) {
            Logtic.start("max_value: board [alot]");
            this.looped++;
            this.engine.setBoard(board);
            var result = this.engine.getResult();
            if (result === "") {
                // var v = Number.MIN_VALUE;
                var v = -10;
                for (var row = 0; row < board.length; row++) {
                    for (var col = 0; col < board[row].length; col++) {
                        if (board[row][col].type === "") {
                            var newboard = jQuery.extend(true, [], board);
                            // this.engine.activateSquare(col, row);
                            newboard[row][col].type = "circle";
                            v = Math.max(v, this.min_value(newboard));
                        }
                    }
                }
                // console.log("maxvalue " + this.looped + " v " + v);
                Logtic.end("FROM max_value: board [alot] RETURN v " + v);
                return v;
            }
            else {
                var res = this.turnResultToNumeric(result);
                // console.log("maxvalue " + this.looped + " result " + result);
                Logtic.end("FROM max_value: board [alot] RETURN res " + res);
                return res;
            }
        };
        TictactoeAI.prototype.turnResultToNumeric = function (result) {
            if (result === "circle") {
                return 1;
            }
            else if (result === "cross") {
                return -1;
            }
            else if (result === "tie") {
                return 0;
            }
            else {
                throw ("wtf was result " + result);
            }
        };
        return TictactoeAI;
    })();
    PeliApp.TictactoeAI = TictactoeAI;
    angular.module("PeliApp").service("TictactoeAI", TictactoeAI);
})(PeliApp || (PeliApp = {}));
