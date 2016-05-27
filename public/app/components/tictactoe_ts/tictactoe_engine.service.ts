module PeliApp {

	export class TictactoeEngine {

    board: [[{}]];
		nextInTurn: string;
		message: string;
		result: string;

		constructor() {
            this.init();
		}

		init() {
			this.board = [
				[{type: ""}, {type: ""}, {type: ""}],
				[{type: ""}, {type: ""}, {type: ""}],
				[{type: ""}, {type: ""}, {type: ""}]
			];
			this.nextInTurn = "circle";
			this.message = "Circle starts";
			this.result = "";
		}

		activateSquare(row:number, col:number) {
			if (this.board[row][col].type === "" && this.result === "") {
				this.board[row][col].type = this.nextInTurn;
				this.nextInTurn = this.nextInTurn === "circle" ? "cross" : "circle";
				this.result = this.getResult();
				if (this.result !== "") {
					this.message = this.result + " wins";
					this.nextInTurn = "";
				} else if (this.checkIfTie()) {
					this.message = "Tie";
					this.nextInTurn = "";
				} else {
					this.message = this.nextInTurn + " turn";
				}
			}
		}

		checkHorizontal() {
			for(var row = 0; row < this.board.length; row++) {
				var firstType = this.board[row][0].type;
				for(var col = 1; col < this.board[row].length; col++) {
					if (firstType !== this.board[row][col].type) {
						firstType = "";
					}
				}
				if (firstType !== "") {
					return firstType;
				}
			}
			return "";
		}

		checkVertical() {
			for(var col = 0; col < this.board[0].length; col++) {
				var firstType = this.board[0][col].type;
				for(var row = 1; row < this.board.length; row++) {
					if (firstType !== this.board[row][col].type) {
						firstType = "";
					}
				}
				if (firstType !== "") {
					return firstType;
				}
			}
			return "";
		}

		checkDiagonal() {
			var firstType = this.board[0][0].type;
			for(var i = 1; i < 3; i++) {
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
		}

		checkIfTie() {
			var count = 0;
			for(var row = 0; row < this.board.length; row++) {
				for(var col = 0; col < this.board.length; col++) {
					if (this.board[row][col].type !== "") {
						count++;
					}
				}
			}
			return count === 9;
		}

		checkResult() {
			var horz = this.checkHorizontal();
			var ver = this.checkVertical();
			var diag = this.checkDiagonal();
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

		setBoard(board: [[{}]]) {
			this.board = board;
		}

		getResult() {
			var horz = this.checkHorizontal();
			var ver = this.checkVertical();
			var diag = this.checkDiagonal();
			var tie = this.checkIfTie();
			// console.log("horz " + horz + " ver " + ver + " diag " + diag)
			if (horz !== "") {
				return horz;
			} else if (ver !== "") {
				return ver;
			} else if (diag !== "") {
				return diag;
			} else if (tie) {
				console.log("yo tie");
				return "tie";
			} else {
				return "";
			}
		}
    }
    angular.module('PeliApp').service('TictactoeEngine', TictactoeEngine);
}
