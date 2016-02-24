module PeliApp {

	import Creator = PeliApp.ModCreator;

	export class ModEngine {
	
		state: string;
		subscribers: [{}];
	
		dungeonMasters: [{}];
		dungeons: [[[{}]]];
		
		playerDM: {};
		playerDungeon: [[{}]];
		
		selectedDungeon: [[{}]];
		
		constructor() {
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
			
			var creator = new Creator();
			this.dungeonMasters = [
				{
					name: "Sorcerer's apprentice",
					prestige: 100,
					health: 6,
					magic: 10,
					info: "Twisted minded pupil of a master wizard, cast away from his peers. Given the proper education and equipment might become a world-renowed sorcerer. No special abilities.",
				},
				{
					name: "Baby beholder",
					prestige: 180,
					health: 4,
					magic: 8,
					info: "Small beholder, a size of a human head. Grows into a massive monster that can disintegrate people at will. Unable to equip items."
				},
				{
					name: "Hydra pup",
					prestige: 150,
					health: 8,
					magic: 4,
					info: "Cutish little hydra pup, size of a dog. Grows into an enormous beast that is almost impossible to kill due to regeneration. Unable to equip items except trinkets."
				},
			];
			this.dungeons = creator.createDungeonCombinations(5, 7);
			
			this.selectedDungeon = this.playerDungeon;
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
			this.selectedDungeon = this.dungeons[index].grid;
			this.changeState("changeDungeon");
		}
		
		pickDungeon() {
			// change playerDungeon
			// to the one found from purchasable dungeons
			// if enough money? no checks needed atm
			this.playerDungeon = this.selectedDungeon;
			this.changeState("buildDungeon");
		}
		
		getBuildings() {
			return ["1", "2", "3"];
		}
		
		restart() {
			this.init();
			this.changeState("pickDM");
		}
    }
	
    angular.module("PeliApp").service("ModEngine", ModEngine);
}