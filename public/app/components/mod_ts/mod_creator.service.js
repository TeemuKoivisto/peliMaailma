var PeliApp;
(function (PeliApp) {
    var ModCreator = (function () {
        function ModCreator() {
        }
        ModCreator.prototype.createRandomDMs = function () {
        };
        ModCreator.prototype.createRandomDungeons = function () {
        };
        ModCreator.prototype.createEmptyDungeon = function (size) {
            var grid = [];
            for (var y = 0; y < size; y++) {
                grid.push([]);
                for (var x = 0; x < size; x++) {
                    grid[y].push({
                        type: ""
                    });
                }
            }
            // DONE
            // console.log("created grid ", grid);
            return grid;
        };
        ModCreator.prototype.createDungeonCombinations = function (gridsize, tunnelsize) {
            // LogmodEng.start("createDungeonCombinations: gridsize " + gridsize + " tunnelsize " + tunnelsize);
            var direction = Math.floor(Math.random() * 4); // 0 = north, 1 = south, 2 = west, 3 = east
            var entrance = Math.floor(Math.random() * (gridsize - 2) + 1); // anything but the corner square
            // console.log("dir is " + direction + " and entrance " + entrance);
            // LogmodEng.append("dir is " + direction + " and entrance " + entrance);
            var grid = this.createEmptyDungeon(gridsize);
            // debugger;
            // should be in own method
            var start = {};
            var next = {};
            if (direction === 0) {
                // north
                start.y = 0;
                start.x = entrance;
                next.y = 1;
                next.x = entrance;
            }
            else if (direction === 1) {
                // south
                start.y = gridsize - 1;
                start.x = entrance;
                next.y = gridsize - 2;
                next.x = entrance;
            }
            else if (direction === 2) {
                // east
                start.y = entrance;
                start.x = 0;
                next.y = entrance;
                next.x = 1;
            }
            else if (direction === 3) {
                // west
                start.y = entrance;
                start.x = gridsize - 1;
                next.y = entrance;
                next.x = gridsize - 2;
            }
            grid[start.y][start.x].type = "tunnel";
            grid[next.y][next.x].type = "tunnel";
            var dungeons = [];
            this.createDungeonsOfSize(next.x, next.y, 1, tunnelsize, grid, dungeons);
            console.log("dungeons are ", dungeons);
            // LogmodEng.end("FROM createDungeonCombinations: gridsize " + gridsize + " tunnelsize " + tunnelsize + " RETURN dungeons " + dungeons);
            return dungeons;
        };
        ModCreator.prototype.createDungeonsOfSize = function (x, y, currentsize, wantedsize, grid, combinations) {
            // LogmodEng.start("createDungeonsOfSize: x " + x + " y " + y + " currentsize " + currentsize + " wantedsize " + wantedsize + " grid " + grid + " combinations " + combinations);
            // console.log("creating dungeons x: " + x + " y: " + y + " csize: " + currentsize + " wsize: " + wantedsize);
            if (currentsize === wantedsize) {
                combinations.push({ grid: grid, size: currentsize });
                return;
            }
            var available = this.getAvailable(x, y, grid);
            for (var c = 0; c < available.length; c++) {
                var now = available[c];
                var newgrid = jQuery.extend(true, {}, grid); // deep copy
                newgrid[now.y][now.x].type = "tunnel";
                this.createDungeonsOfSize(now.x, now.y, currentsize + 1, wantedsize, newgrid, combinations);
            }
            // LogmodEng.end("FROM createDungeonsOfSize: x " + x + " y " + y + " currentsize " + currentsize + " wantedsize " + wantedsize + " grid " + grid + " combinations " + combinations);
        };
        ModCreator.prototype.getAvailable = function (x, y, grid) {
            // LogmodEng.start("getAvailable: x " + x + " y " + y + " grid ", grid);
            var available = [];
            for (var iy = y - 1; iy <= y + 1; iy++) {
                for (var ix = x - 1; ix <= x + 1; ix++) {
                    // console.log("looping iy: " + iy + " ix: " + ix);
                    // check if inside the grid
                    // and also not directly adjancent to border
                    // |x|x|x|x|x|
                    // |x|0|0|0|x|
                    // |x|0|0|0|x|
                    // |x|0|0|0|0|
                    // |x|x|x|x|x|
                    if (iy > 0 && iy < 4 && ix > 0 && ix < 4) {
                        // if (iy > 0 && iy < grid.length-1 && ix > 0 && ix < grid[iy].length-1) {
                        // console.log("inside grid ");
                        // available squares:
                        // x|0|x
                        // 0|1|0
                        // x|0|x
                        if (iy !== y && ix === x) {
                            // console.log("top or bottom row");
                            // checks first if top or bottom row, then only one directly adjancent square
                            this.addIfAvailable(ix, iy, grid, available);
                        }
                        else if (iy === y && ix !== x) {
                            // console.log("middle row");
                            this.addIfAvailable(ix, iy, grid, available);
                        }
                    }
                }
            }
            // console.log("available is ", available);
            // LogmodEng.end("FROM getAvailable: x " + x + " y " + y + " grid " + grid + " RETURN available " + available);
            return available;
        };
        ModCreator.prototype.addIfAvailable = function (x, y, grid, list) {
            // LogmodEng.start("addIfAvailable: x " + x + " y " + y + " grid [big] list " + list);
            // console.log("grid is ", grid);
            if (grid[y][x].type === "") {
                // console.log("square is empty");
                // adds to list if only one adjancent square
                if (grid[y + 1][x].type !== "" && grid[y - 1][x].type === "" && grid[y][x - 1].type === "" && grid[y][x + 1].type === "") {
                    // console.log("adjancent is top square");
                    list.push({ x: x, y: y });
                }
                else if (grid[y - 1][x].type !== "" && grid[y + 1][x].type === "" && grid[y][x - 1].type === "" && grid[y][x + 1].type === "") {
                    // console.log("adjancent is bottom square");
                    list.push({ x: x, y: y });
                }
                else if (grid[y][x - 1].type !== "" && grid[y + 1][x].type === "" && grid[y - 1][x].type === "" && grid[y][x + 1].type === "") {
                    // console.log("adjancent is left square");
                    list.push({ x: x, y: y });
                }
                else if (grid[y][x + 1].type !== "" && grid[y + 1][x].type === "" && grid[y - 1][x].type === "" && grid[y][x - 1].type === "") {
                    // console.log("adjancent is right square");
                    list.push({ x: x, y: y });
                }
            }
            // console.log("list is ", list);
            // LogmodEng.end("FROM addIfAvailable: x " + x + " y " + y + " grid [big] list " + list);
        };
        return ModCreator;
    })();
    PeliApp.ModCreator = ModCreator;
    angular.module("PeliApp").service("ModCreator", ModCreator);
})(PeliApp || (PeliApp = {}));
