PeliApp.controller('ShakkiController', function ($scope) {

    $scope.game = "vähän tyhjältä näyttää";

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
                        color: color
                    };
                    break;
                case(1):
                case(6):
                    row[column] = {
                        holder: "knight",
                        color: color
                    };
                    break;
                case(2):
                case(5):
                    row[column] = {
                        holder: "bishop",
                        color: color
                    };
                    break;
                case(3):
                    row[column] = {
                        holder: "king",
                        color: color
                    };
                    break;
                case(4):
                    row[column] = {
                        holder: "queen",
                        color: color
                    };
                    break;
            }
        }
    };

    $scope.initRow = function(row, type, color) {
        for(var column = 0; column < 8; column++) {
            row[column] = {
                holder: type,
                color: color
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
});