PeliApp.controller("TictactoeController", function($scope) {
	
	$scope.message = "Circle starts";
	$scope.result = "";
	$scope.nextInTurn = "circle";
	
	$scope.board = [
		[{type: ""}, {type: ""}, {type: ""}],
		[{type: ""}, {type: ""}, {type: ""}],
		[{type: ""}, {type: ""}, {type: ""}],
	];
	
	$scope.activateSquare = function(row, col) {
		if ($scope.board[row][col].type === "" && $scope.result === "") {
			$scope.board[row][col].type = $scope.nextInTurn;
			$scope.nextInTurn = $scope.nextInTurn === "circle" ? "cross" : "circle";
			$scope.result = $scope.checkResult();
			if ($scope.result !== "") {
				$scope.message = $scope.result + " wins";
				$scope.nextInTurn = "";
			} else if ($scope.checkIfTie()) {
				$scope.message = "Tie";
				$scope.nextInTurn = "";
			} else {
				$scope.message = $scope.nextInTurn + " turn";
			}
		}
	}
	
	$scope.checkHorizontal = function() {
		for(var row = 0; row < $scope.board.length; row++) {
			var firstType = $scope.board[row][0].type;
			for(var col = 1; col < $scope.board[row].length; col++) {
				if (firstType !== $scope.board[row][col].type) {
					firstType = "";
				}
			}
			if (firstType !== "") {
				return firstType;
			}
		}
		return "";
	}
	
	$scope.checkVertical = function() {
		for(var col = 0; col < $scope.board[0].length; col++) {
			var firstType = $scope.board[0][col].type;
			for(var row = 1; row < $scope.board.length; row++) {
				if (firstType !== $scope.board[row][col].type) {
					firstType = "";
				}
			}
			if (firstType !== "") {
				return firstType;
			}
		}
		return "";
	}
	
	$scope.checkDiagonal = function() {
		var firstType = $scope.board[0][0].type;
		for(var i = 1; i < 3; i++) {
			if (firstType !== $scope.board[i][i].type) {
				firstType = "";
			}
		}
		if (firstType !== "") {
			return firstType;
		}
		firstType = $scope.board[2][0].type;
		if (firstType !== $scope.board[1][1].type) {
			firstType = "";
		}
		if (firstType !== $scope.board[0][2].type) {
			firstType = "";
		}
		return firstType;
	}
	
	$scope.checkIfTie = function() {
		var count = 0;
		for(var row = 0; row < $scope.board.length; row++) {
			for(var col = 0; col < $scope.board.length; col++) {
				if ($scope.board[row][col].type !== "") {
					count++;
				}
			}
		}
		return count === 9;
	}
	
	$scope.checkResult = function() {
		var horz = $scope.checkHorizontal();
		var ver = $scope.checkVertical();
		var diag = $scope.checkDiagonal();
		// console.log("horz " + horz + " ver " + ver + " diag " + diag)
		if (horz !== "") {
			return horz;
		} else if (ver !== "") {
			return ver;
		} else if (diag !== "") {
			return diag;
		} else {
			return "";
		}
	}
	
	$scope.reset = function() {
		for(var row = 0; row < $scope.board.length; row++) {
			for(var col = 0; col < $scope.board.length; col++) {
				$scope.board[row][col].type = "";
			}
		}
		$scope.result = "";
		$scope.nextInTurn = "circle";
	}
});