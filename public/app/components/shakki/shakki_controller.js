PeliApp.controller('ShakkiController', function ($scope, ShakkiFactory) {

    $scope.game = {};
    $scope.shakki = ShakkiFactory;

    console.log("", $scope.shakki);

    $scope.table = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];

    $scope.initSpecialRow = function(row, color) {
        for(var column = 0; column < 8; column++) {
            switch(column) {
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
    };

    $scope.initRow = function(row, type, color) {
        for(var column = 0; column < 8; column++) {
            row[column] = {
                holder: type,
                color: color,
                active: false
            };
        }
    };

    $scope.initTable = function (table) {
        for (var row = 0; row < 8; row++) {
            switch(row) {
                case(0):
                    $scope.initSpecialRow(table[row], "black");
                    break;
                case(1):
                    $scope.initRow(table[row], "soldier", "black");
                    break;
                case(2):
                case(3):
                case(4):
                case(5):
                    $scope.initRow(table[row], "empty", "white");
                    break;
                case(6):
                    $scope.initRow(table[row], "soldier", "white");
                    break;
                case(7):
                    $scope.initSpecialRow(table[row], "white");
                    break;
            }
        }
    };
    
    $scope.initTable($scope.table);
    console.log("", $scope.table);
    
    $scope.testa = function() {
        $scope.table[0][0].holder = "penis";
    };
    
    $scope.activated = [0, 0];
    $scope.activateSquare = function(row, column) {
//        $scope.table[row][column].holder = "penis";
        $scope.table[$scope.activated[0]][$scope.activated[1]].active = false;        
        $scope.table[row][column].active = true;
        $scope.activated[0] = row;
        $scope.activated[1] = column;
    };
});