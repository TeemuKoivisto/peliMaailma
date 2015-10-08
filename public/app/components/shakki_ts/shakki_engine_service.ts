module PeliApp {
	
    import Square = PeliApp.ShakkiSquare;
    
	export class ShakkiEngine {
        //table:Array<Array<Object>>;
        table:[[Object]];
        pieces: {};
        quantity: {};
        types:[string];
        squares:any;

		constructor() {
            this.table = [
                [{}],
                [{}],
                [{}],
                [{}],
                [{}],
                [{}],
                [{}],
                [{}]
            ];
            this.pieces = {};
            this.quantity = {
                white: {
                    soldier: 0,
                    rook: 0,
                    knight: 0,
                    bishop: 0,
                    queen: 0,
                    king: 0
                    },
                black: {
                    soldier: 0,
                    rook: 0,
                    knight: 0,
                    bishop: 0,
                    queen: 0,
                    king: 0
                }
            };
            this.squares = [
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                []
            ];

            this.types= ['soldier', 'rook', 'knight', 'bishop', 'queen', 'king'];
			this.initTable(this.table);
            this.initPieces(this.pieces);
            this.generateSquares(this.squares);
		}
		
		initTable(table: Array<Array<Object>>): void {
			for(var row = 0; row < 8; row++) {
				switch(row) {
					case(0):
                        this.initSpecialRow(table[row], "black");
                        break;
                    case(1):
                        this.initRow(table[row], "soldier", "black");
                        break;
                    case(2):
                    case(3):
                    case(4):
                    case(5):
                        this.initRow(table[row], "empty", "white");
                        break;
                    case(6):
                        this.initRow(table[row], "soldier", "white");
                        break;
                    case(7):
                        this.initSpecialRow(table[row], "white");
                        break;
				}
			}
		}
	
        initSpecialRow(row: Object[], color:string): void {
            for (var column = 0; column < 8; column++) {
                switch (column) {
                    case(0):
                    case(7):
                        row[column] = {
                            holder: "rook",
                            color: color,
                            active: false
                        };
                        break;
                    case(1):
                    case(6):
                        row[column] = {
                            holder: "knight",
                            color: color,
                            active: false
                        };
                        break;
                    case(2):
                    case(5):
                        row[column] = {
                            holder: "bishop",
                            color: color,
                            active: false
                        };
                        break;
                    case(3):
                        row[column] = {
                            holder: "king",
                            color: color,
                            active: false
                        };
                        break;
                    case(4):
                        row[column] = {
                            holder: "queen",
                            color: color,
                            active: false
                        };
                        break;
                }
            }
        }
        
        initRow(row:Array<Object>, type:string, color:string) {
            for (var column = 0; column < 8; column++) {
                row[column] = {
                    holder: type,
                    color: color,
                    active: false
                };
            }
        }

        initPieces(pieces:{}) {
            for(var row = 0; row < 8; row++) {
                for(var column = 0; column < 8; column++) {
                    var holder = this.table[row][column].holder;
                    if (holder==='empty') continue;
                    var color = this.table[row][column].color;
                    var number = this.quantity[color][holder]+1;
                    var name = color + "-" + holder + number;
                    pieces[name] = {
                        x: column,
                        y: row,
                        type: holder
                    }
                    this.quantity[color][holder]++;
                }
            }
        }

        calculatePossibleMovesForPiece(name: string) {
            var piece = this.pieces[name];
            if (typeof piece === "undefined") return [];
            var x = piece.x;
            var y = piece.y;
            var availablemoves = [];
            if (piece.type!=='soldier') {
                var moves = this.squares[piece.y][piece.x].moves[piece.type];
                for(var property in moves) {
                    if (moves[property] === 'horizontal') {
                        for(var minusx = x-1; minusx >= 0; minusx--) {
                            if (this.table[y][minusx].holder==='empty') {
                                availablemoves.push({x: minusx, y: y});
                            } else {
                                break;
                            }
                        }
                        for(var plusx = x+1; plusx < 8; plusx++) {
                            if (this.table[y][plusx].holder==='empty') {
                                availablemoves.push({x: plusx, y: y});
                            } else {
                                break;
                            }
                        }
                    } else if (moves[property] === 'vertical') {
                        for(var minusy = y-1; minusy >= 0; minusy--) {
                            if (this.table[y][minusy].holder==='empty') {
                                availablemoves.push({x: x, y: minusy});
                            } else {
                                break;
                            }
                        }
                        for(var plusy = y+1; plusy < 8; plusy++) {
                            if (this.table[y][plusy].holder==='empty') {
                                availablemoves.push({x: x, y: plusy});
                            } else {
                                break;
                            }
                        }
                    } else if (moves[property] === 'diagonal') {
                        availablemoves.push({x: 666, y: 666});
                    } else {
                        availablemoves.push({x: 666, y: 666});
                    }
                }
            } else {
                throw('fug');
            }
            return availablemoves;
        }
        
        generateSquares(table:[[Square]]) {
            for(var row= 0; row < 8; row++) {
                for (var column = 0; column < 8; column++) {
                    var sq = new Square(row, column);
                    this.generateMovesForSquare(sq, row, column);
                    //console.log("pushing " + row + ":" + column, sq);
                    table[row].push(sq);
                }
            }
        }

        generateMovesForSquare(sq:Square, y:number, x:number){
            for (var index in this.types) {
                var type = this.types[index];
                switch(type) {
                    case('soldier'):
                        if (y!==0) sq.setMove(type, 'white', x, (y-1));
                        if (y!==7) sq.setMove(type, 'black', x, (y+1));
                        if (y===1) sq.setMove(type, 'black', x, (y+2));
                        if (y===6) sq.setMove(type, 'white', x, (y-2));
                        if (x!==0) {
                            sq.setAttack(type, 'white', (x-1), (y-1));
                            sq.setAttack(type, 'black', (x-1), (y+1));
                        }
                        if (x!==7) {
                            sq.setAttack(type, 'white', (x+1), (y-1));
                            sq.setAttack(type, 'black', (x+1), (y+1));
                        }
                        break;
                    case('rook'):
                        sq.setMove2(type, 'both', {horizontal: true});
                        sq.setMove2(type, 'both', {vertical: true});
                        break;
                    case('knight'):
                        // TODO
                        sq.setMove2(type, 'both', {horizontal: true});
                        sq.setMove2(type, 'both', {vertical: true});
                        break;
                    case('bishop'):
                        sq.setMove2(type, 'both', {diagonal: true});
                        break;
                    case('queen'):
                        sq.setMove2(type, 'both', {horizontal: true});
                        sq.setMove2(type, 'both', {vertical: true});
                        sq.setMove2(type, 'both', {diagonal: true});
                        break;
                    case('king'):
                        // TODO
                        sq.setMove2(type, 'both', {horizontal: true});
                        sq.setMove2(type, 'both', {vertical: true});
                        break;
                }
            }
        }
        //if (y!==0) sq.moves.soldier.white.push({x: x, y: y-1});
        //if (y!=7) sq.moves.soldier.black.push({x: x, Y: y+1});
        //if (y===1) sq.moves.soldier.black.push({x: x, y: y+2});
        //if (y==6) sq.moves.soldier.white.push({x: x, y: y-2});
        //if (x!=0) {
        //    sq.attacks.soldier.white.push({x: x-1, y: y-1});
        //    sq.attacks.soldier.black.push({x: x-1, y: y+1});
        //}
        //if (x!=7) {
        //    sq.attacks.soldier.white.push({x: x+1, y: y-1});
        //    sq.attacks.soldier.black.push({x: x+1, y: y+1});
        //}
        //break;
    }
    angular.module('PeliApp').service('ShakkiEngine', ShakkiEngine);
}