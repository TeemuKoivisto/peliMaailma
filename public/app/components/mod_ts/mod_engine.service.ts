module PeliApp {

	import Creator = PeliApp.ModCreator;

	export class ModEngine {
	
		creator: {};
		state: string;
		subscribers: [{}];
	
		dungeonMasters: [{}];
		dungeons: [[[{}]]];
		dungeonBuildings: [{}];
		
		playerDM: {};
		playerDungeon: [[{}]];
		playerBuildings: [{}];
		
		selectedDungeon: [[{}]];
		selectedBuilding: {};
		
		enteredHeroParty: [];
		
		constructor() {
			this.creator = new Creator();
			this.state = "pickDM";
			this.subscribers = [];
			this.init();
		}
		
		init() {
			this.playerDM = {};
			this.playerDungeon = [
				[{type: ""}, {type: ""}, {type: ""}, {type: ""}, {type: ""}],
				[{type: ""}, {type: ""}, {type: ""}, {type: ""}, {type: ""}],
				[{type: ""}, {type: ""}, {type: ""}, {type: ""}, {type: ""}],
				[{type: ""}, {type: ""}, {type: ""}, {type: ""}, {type: ""}],
				[{type: ""}, {type: ""}, {type: ""}, {type: ""}, {type: ""}]
			];
			this.playerBuildings = [];
			
			this.dungeonMasters = this.creator.generateDungeonMasters(); // use parameters?
			this.dungeons = this.creator.generateDungeons(5, 7);
			this.dungeonBuildings = [];
			
			this.selectedDungeon = "";
			this.selectedBuilding = "";
			
			this.enteredHeroParty = "";
		}
		
		subscribeToStateChange(subscriber: {}) {
			this.subscribers.push(subscriber);
		}
		
		changeState(newstate: string) {
			console.log("state changed in mod engine " + newstate);
			this.state = newstate;
			for(var i = 0; i < this.subscribers.length; i++) {
				this.subscribers[i](this.state);
			}
		}
		
		getState() {
			return this.state;
		}
		
		getPlayerDM() {
			return this.playerDM;
		}
		
		getPlayerDungeon() {
			return this.playerDungeon;
		}
		
		getPlayerBuildings() {
			return this.playerBuildings;
		}
		
		getSelectedDungeon() {
			return this.selectedDungeon;
		}
		
		getDMs() {
			return this.dungeonMasters;
		}
		
		pickDM(index: number) {
			this.playerDM = this.dungeonMasters[index];
			this.changeState("pickDungeon");
		}
		
		getDungeons() {
			return this.dungeons;
		}
		
		selectDungeon(index: number) {
			debugger;
			this.selectedDungeon = this.dungeons[index].grid;
			this.changeState("changeDungeon");
		}
		
		pickDungeon() {
			// change playerDungeon
			// to the one found from purchasable dungeons
			// if enough money? no checks needed atm
			debugger;
			this.playerDungeon = this.selectedDungeon;
			this.dungeonBuildings = this.creator.generateBuildings(this.playerDungeon);
			this.changeState("buildDungeon");
		}
		
		getBuildings() {
			return this.dungeonBuildings;
		}
		
		selectBuilding(index: number) {
			if (index === -1) {
				// for unselecting current building and resetting the cursor
				this.selectedBuilding = "";
				return true;
			} else {
				// TODO check if sufficient funds and then change cursor to the building
				this.selectedBuilding = this.dungeonBuildings[index];
				return true;
			}
		}
		
		buildBuilding(y: number, x: number) {
			if (this.selectedBuilding !== "" && this.playerDungeon[y][x].type !== "" && this.playerDM.gold >= this.selectedBuilding.price) {
				if (this.playerDungeon[y][x].type !== "tunnel") {
					// TODO ask for confirmation to overwrite existing lair
				}
				this.playerDM.gold -= this.selectedBuilding.price;
				this.playerDungeon[y][x] = this.selectedBuilding;
				this.playerBuildings.push({
					y: y,
					x: x,
					building: this.selectedBuilding
				});
			}
		}
		
		waitForHeroes() {
			this.enteredHeroParty = this.creator.generateHeroParty(this.playerDM, this.playerDungeon);
			this.changeState("enterHeroes");
		}
		
		moveHeroes() {
			console.log("moved!");
			var nextTile = ""; // get it
			if (nexTile.type === "tunnel") {
				// decrease food?
			} else if (nexTile.type === "lair") {
				// generate a battle?
			} else if (nexTile.type === "dm") {
				// fight against playerDM?
			}
			
			return;
			while(true) {
				var nextTile = ""; // get it
				if (nexTile.type === "tunnel") {
					// decrease food?
				} else if (nexTile.type === "lair") {
					// generate a battle?
				} else if (nexTile.type === "dm") {
					// fight against playerDM?
				}
			}
		}
		
		restart() {
			this.init();
			this.changeState("pickDM");
		}
    }
	
    angular.module("PeliApp").service("ModEngine", ModEngine);
}