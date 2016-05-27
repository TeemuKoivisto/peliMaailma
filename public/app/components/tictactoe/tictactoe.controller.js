PeliApp.controller("TictactoeController", function($scope, TictactoeEngine, TictactoeAI) {
	
	$scope.tree_depth = 5;
	$scope.statistics = [
		{ empty: 9, factorial: 362880, minmax_loops: "n/a", alphabeta_loops: ""},
		{ empty: 8, factorial: 40320, minmax_loops: "n/a", alphabeta_loops: ""},
		{ empty: 7, factorial: 5040, minmax_loops: "8232", alphabeta_loops: ""},
		{ empty: 6, factorial: 720, minmax_loops: "1349", alphabeta_loops: ""},
		{ empty: 5, factorial: 120, minmax_loops: "234", alphabeta_loops: ""},
		{ empty: 4, factorial: 24, minmax_loops: "41", alphabeta_loops: ""},
		{ empty: 3, factorial: 6, minmax_loops: "8", alphabeta_loops: ""},
		{ empty: 2, factorial: 2, minmax_loops: "5", alphabeta_loops: ""},
		{ empty: 1, factorial: 1, minmax_loops: "2", alphabeta_loops: ""},
	];
	
	$scope.init = function() {
		$scope.message = "Circle starts";
		$scope.result = "";
		$scope.nextInTurn = "circle";
		
		$scope.board = [
			[{type: ""}, {type: ""}, {type: ""}],
			[{type: ""}, {type: ""}, {type: ""}],
			[{type: ""}, {type: ""}, {type: ""}],
		];
	}
	
	$scope.activateSquare = function(row, col) {
		TictactoeEngine.activateSquare(row, col);
		
		$scope.board = TictactoeEngine.board;
		$scope.result = TictactoeEngine.result;
		$scope.message = TictactoeEngine.message;
		$scope.nextInTurn = TictactoeEngine.nextInTurn;
	}
	
	$scope.reset = function() {
		$scope.init();
		TictactoeEngine.init();
	}
	
	$scope.init();
	
	$scope.createTree = function() {
		TictactoeAI.createTree();
	}
	
	$scope.initAI = function() {
		TictactoeAI.min_max();
	}
});