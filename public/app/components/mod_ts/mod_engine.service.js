var PeliApp;
(function (PeliApp) {
    var Creator = PeliApp.ModCreator;
    var ModEngine = (function () {
        function ModEngine() {
            this.state = "pickDM";
            this.subscribers = [];
            this.dungeonGrid = [
                [{ type: "" }, { type: "" }, { type: "" }, { type: "" }, { type: "" }],
                [{ type: "" }, { type: "" }, { type: "" }, { type: "" }, { type: "" }],
                [{ type: "" }, { type: "" }, { type: "" }, { type: "" }, { type: "" }],
                [{ type: "" }, { type: "" }, { type: "" }, { type: "" }, { type: "" }],
                [{ type: "" }, { type: "" }, { type: "" }, { type: "" }, { type: "" }]
            ];
            this.dungeonMasters = [
                {
                    name: "Sorcerer's apprentice",
                    prestige: 100,
                    health: 6,
                    magic: 10,
                    info: "Twisted minded pupil of a master wizard, cast away from his peers. Given the proper education and equipment might become a world-renowed sorcerer. No special abilities."
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
            this.dungeons = [
                {
                    name: "hei"
                },
                {
                    name: "hoi"
                },
            ];
            this.init();
            this.playerDM = {};
        }
        ModEngine.prototype.init = function () {
            var creator = new Creator();
            this.generatedDungeons = creator.createDungeonCombinations(5, 7);
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
        ModEngine.prototype.getGrid = function () {
            return this.dungeonGrid;
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
        ModEngine.prototype.pickDungeon = function (index) {
            // change dungeonGrid
            // to the one found from purchasable dungeons
            // if enough money? no checks needed atm
            this.changeState("buildDungeon");
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
