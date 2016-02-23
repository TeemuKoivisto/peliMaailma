module PeliApp {

	import Engine = PeliApp.TictactoeEngine;

	export class TictactoeAI {
	
        board: [[{}]];
		nextInTurn: string;
		result: string;
		
		constructor() {
            this.this.board = [
				[{type: ""}, {type: ""}, {type: ""}],
				[{type: ""}, {type: ""}, {type: ""}],
				[{type: ""}, {type: ""}, {type: ""}]
			];
			this.nextInTurn = "circle";
			this.result = "";
		}
		
		min_max() {
			Engine.reset();
			
		}
		
		max_value(depth: number) {
			depth++;
			var result = Engine.getResult();
			if(result === "") {
				var v = Number.MIN_VALUE;
				var nodes = Engine.getAvailableMoves();
				for(var i = 0; i < nodes.length; i++) {
					Engine.move(nodes[i].x, nodes[i].y);
					v = Math.max(v, min_value(nodes));
				}
			}
		}
		
		estimateBestMove(which: string, board: [{}]) {
		
		}
		
		activateSquare(row:number, col:number) {
			if (this.board[row][col].type === "" && this.result === "") {
				this.board[row][col].type = this.nextInTurn;
				this.nextInTurn = this.nextInTurn === "circle" ? "cross" : "circle";
				this.result = this.checkResult();
				if (this.result !== "") {
					message = this.result + " wins";
					this.nextInTurn = "";
				} else if (this.checkIfTie()) {
					message = "Tie";
					this.nextInTurn = "";
				} else {
					message = this.nextInTurn + " turn";
				}
			}
		}
    }
    angular.module('PeliApp').service('TictactoeAI', TictactoeAI);
}