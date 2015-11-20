PeliApp.factory('ShakkiFactory', function () {
    var shakki = (function (_) {
        var shakkitable = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ];

        function initSpecialRow(row, color) {
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
        };

        function initRow(row, type, color) {
            for (var column = 0; column < 8; column++) {
                row[column] = {
                    holder: type,
                    color: color,
                    active: false
                };
            }
        };

        function initTable(table) {
            for (var row = 0; row < 8; row++) {
                switch (row) {
                    case(0):
                        initSpecialRow(table[row], "black");
                        break;
                    case(1):
                        initRow(table[row], "soldier", "black");
                        break;
                    case(2):
                    case(3):
                    case(4):
                    case(5):
                        initRow(table[row], "empty", "white");
                        break;
                    case(6):
                        initRow(table[row], "soldier", "white");
                        break;
                    case(7):
                        initSpecialRow(table[row], "white");
                        break;
                }
            }
        };
        return {
            init: function() {
                initTable(shakkitable);
            }
        };
    })();
    shakki.init();
    return shakki;
});