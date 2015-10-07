module PeliApp {
	
	export class ShakkiSquare {
		public x:number;
		public y: number;
		public moves: {};
		public attacks: {};
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
			this.attacks={
				soldier: {
					white: [],
					black: []
				}
			}
		}

		public setMove(type:string, color:string, x:number, y:number) {
			if (type === 'soldier') {
				this.moves[type][color].push({x: x, y: y});
			} else {
				this.moves[type].push({x: x, y: y});
			}
		}

		public setMove2(type:string, color:string, move:{}) {
			if (type === 'soldier') {
				this.moves[type][color].push(move);
			} else {
				this.moves[type].push(move);
			}
		}

		public setAttack(type:string, color:string, x:number, y:number) {
			if (type === 'soldier') {
				this.attacks[type][color].push({x: x, y: y});
			//} else {
			//	this.attacks[type].push({x: x, y: y});
			}
		}
	}
	angular.module('PeliApp').service('ShakkiSquare', ShakkiSquare);
}