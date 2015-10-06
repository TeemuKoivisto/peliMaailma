module peliApp {
	
	export class ShakkiEngine {
		table: [
            Array<Object>,
            Array<Object>,
            Array<Object>,
            Array<Object>,
            Array<Object>,
            Array<Object>,
            Array<Object>,
            Array<Object>
        ];
		
        hei: number[][];
        
		constructor() {
			this.initTable(this.table);
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
                            holder: "tower",
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
        };
    }
    angular.module('peliApp').factory('peliApp.ShakkiTsFactory', ShakkiEngine);
}