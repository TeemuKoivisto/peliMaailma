var PeliApp;
(function (PeliApp) {
    var Creator = PeliApp.ModCreator;
    var ModEngine = (function () {
        function ModEngine() {
            this.creator = new Creator();
            this.state = "pickDM";
            this.subscribers = [];
            this.init();
        }
        ModEngine.prototype.init = function () {
            this.playerDM = {};
            this.playerDungeon = [
                [{ type: "" }, { type: "" }, { type: "" }, { type: "" }, { type: "" }],
                [{ type: "" }, { type: "" }, { type: "" }, { type: "" }, { type: "" }],
                [{ type: "" }, { type: "" }, { type: "" }, { type: "" }, { type: "" }],
                [{ type: "" }, { type: "" }, { type: "" }, { type: "" }, { type: "" }],
                [{ type: "" }, { type: "" }, { type: "" }, { type: "" }, { type: "" }]
            ];
            this.playerBuildings = [];
            this.dungeonMasters = this.creator.generateDungeonMasters(); // use parameters?
            this.dungeons = this.creator.generateDungeons(5, 7);
            this.dungeonBuildings = [];
            this.selectedDungeon = "";
            this.selectedBuilding = "";
            this.enteredHeroParty = "";
        };
        ModEngine.prototype.subscribeToStateChange = function (subscriber) {
            this.subscribers.push(subscriber);
        };
        ModEngine.prototype.changeState = function (newstate) {
            console.log("state changed in mod engine " + newstate);
            this.state = newstate;
            for (var i = 0; i < this.subscribers.length; i++) {
                this.subscribers[i](this.state);
            }
        };
        ModEngine.prototype.getState = function () {
            return this.state;
        };
        ModEngine.prototype.getPlayerDM = function () {
            return this.playerDM;
        };
        ModEngine.prototype.getPlayerDungeon = function () {
            return this.playerDungeon;
        };
        ModEngine.prototype.getPlayerBuildings = function () {
            return this.playerBuildings;
        };
        ModEngine.prototype.getSelectedDungeon = function () {
            return this.selectedDungeon;
        };
        ModEngine.prototype.getDMs = function () {
            return this.dungeonMasters;
        };
        ModEngine.prototype.pickDM = function (index) {
            this.playerDM = this.dungeonMasters[index];
            this.changeState("pickDungeon");
        };
        ModEngine.prototype.getDungeons = function () {
            return this.dungeons;
        };
        ModEngine.prototype.selectDungeon = function (index) {
            debugger;
            this.selectedDungeon = this.dungeons[index].grid;
            this.changeState("changeDungeon");
        };
        ModEngine.prototype.pickDungeon = function () {
            // change playerDungeon
            // to the one found from purchasable dungeons
            // if enough money? no checks needed atm
            debugger;
            this.playerDungeon = this.selectedDungeon;
            this.dungeonBuildings = this.creator.generateBuildings(this.playerDungeon);
            this.changeState("buildDungeon");
        };
        ModEngine.prototype.getBuildings = function () {
            return this.dungeonBuildings;
        };
        ModEngine.prototype.selectBuilding = function (index) {
            if (index === -1) {
                // for unselecting current building and resetting the cursor
                this.selectedBuilding = "";
                return true;
            }
            else {
                // TODO check if sufficient funds and then change cursor to the building
                this.selectedBuilding = this.dungeonBuildings[index];
                return true;
            }
        };
        ModEngine.prototype.buildBuilding = function (y, x) {
            if (this.selectedBuilding !== "" && this.playerDungeon[y][x].type !== "" && this.playerDM.gold >= this.selectedBuilding.price) {
                if (this.playerDungeon[y][x].type !== "tunnel") {
                }
                this.playerDM.gold -= this.selectedBuilding.price;
                this.playerDungeon[y][x] = this.selectedBuilding;
                this.playerBuildings.push({
                    y: y,
                    x: x,
                    building: this.selectedBuilding
                });
            }
        };
        ModEngine.prototype.waitForHeroes = function () {
            this.enteredHeroParty = this.creator.generateHeroParty(this.playerDM, this.playerDungeon);
            this.changeState("enterHeroes");
        };
        ModEngine.prototype.moveHeroes = function () {
            console.log("moved!");
            var nextTile = ""; // get it
            if (nexTile.type === "tunnel") {
            }
            else if (nexTile.type === "lair") {
            }
            else if (nexTile.type === "dm") {
            }
            return;
            while (true) {
                var nextTile = ""; // get it
                if (nexTile.type === "tunnel") {
                }
                else if (nexTile.type === "lair") {
                }
                else if (nexTile.type === "dm") {
                }
            }
        };
        ModEngine.prototype.restart = function () {
            this.init();
            this.changeState("pickDM");
        };
        return ModEngine;
    })();
    PeliApp.ModEngine = ModEngine;
    angular.module("PeliApp").service("ModEngine", ModEngine);
})(PeliApp || (PeliApp = {}));
