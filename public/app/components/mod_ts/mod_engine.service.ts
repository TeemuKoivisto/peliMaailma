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
      var dungeonsize = 6, dungeonlength = 9;
      
      this.playerDM = {};
      this.playerDungeon = this.creator.generateEmptyDungeon(dungeonsize)
      this.playerBuildings = [];
      
      this.dungeonMasters = this.creator.generateDungeonMasters(); // use parameters?
      this.dungeons = this.creator.generateDungeons(dungeonsize, dungeonlength);
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
      this.selectedDungeon = this.dungeons[index];
      this.changeState("changeDungeon");
    }
    
    pickDungeon() {
      // TODO check if enough money
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
      if (this.selectedBuilding !== "" && this.playerDungeon.grid[y][x].type !== "" && this.playerDM.gold >= this.selectedBuilding.price) {
        if (this.playerDungeon.grid[y][x].type !== "tunnel") {
          // TODO ask for confirmation to overwrite existing lair
        }
        this.playerDM.gold -= this.selectedBuilding.price;
        this.playerDungeon.grid[y][x].type = this.selectedBuilding.type;
        this.playerDungeon.grid[y][x].name = this.selectedBuilding.name;
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
    
    // TODO fix last tile movement
    moveHeroes() {
      debugger;
      console.log("moved!");
      if (this.enteredHeroParty.pos.x === "") {
        var entrance = this.playerDungeon.entrance;
        this.enteredHeroParty.pos = entrance;
        this.playerDungeon.grid[entrance.y][entrance.x].occupier = this.enteredHeroParty;
      } else {
        // var x = this.enteredHeroParty.pos.x;
        // var y = this.enteredHeroParty.pos.y;
        this.playerDungeon.grid[this.enteredHeroParty.pos.y][this.enteredHeroParty.pos.x].occupier = "";
        var adjx = this.playerDungeon.grid[this.enteredHeroParty.pos.y][this.enteredHeroParty.pos.x].adjx;
        var adjy = this.playerDungeon.grid[this.enteredHeroParty.pos.y][this.enteredHeroParty.pos.x].adjy;
        this.enteredHeroParty.pos.x = adjx;
        this.enteredHeroParty.pos.y = adjy;
        this.playerDungeon.grid[this.enteredHeroParty.pos.y][this.enteredHeroParty.pos.x].occupier = this.enteredHeroParty;
      }
      
      return;
      
      var nextTile = ""; // get it
      if (nextTile.type === "tunnel") {
        // decrease food?
      } else if (nextTile.type === "lair") {
        // generate a battle?
      } else if (nextTile.type === "dm") {
        // fight against playerDM?
      }
    }
    
    restart() {
      this.init();
      this.changeState("pickDM");
    }
    }
  
    angular.module("PeliApp").service("ModEngine", ModEngine);
}