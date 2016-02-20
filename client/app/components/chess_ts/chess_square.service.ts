module PeliApp {
	
	export class ChessSquare {
	
		public x: number;
		public y: number;
		public moves: {};
		public edibles: {};
		
		constructor(row:number, column:number) {
			this.x=column;
			this.y=row;
			
			this.moves={
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
			this.edibles={
				soldier: {
					white: [],
					black: []
				}
			}
		}

		public setMove(type:string, color:string, move:{}) {
			if (type === 'soldier') {
				this.moves[type][color].push(move);
			} else {
				this.moves[type].push(move);
			}
		}

		public setManyMoves(type:string, color:string, newmoves:[{}]) {
			if (type === 'soldier') {
				this.moves[type][color].push.apply(newmoves);
			} else {
				//console.log('tulee', newmoves);
				//this.moves[type].push.apply(newmoves);
				Array.prototype.push.apply(this.moves[type], newmoves);
				//console.log("meni sisälle", this.moves[type]);
			}
		}

		public setAttack(type:string, color:string, x:number, y:number) {
			if (type === 'soldier') {
				this.edibles[type][color].push({x: x, y: y});
			}
		}
	}
	angular.module('PeliApp').service('ChessSquare', ChessSquare);
}