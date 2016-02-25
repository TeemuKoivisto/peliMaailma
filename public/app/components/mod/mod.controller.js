PeliApp.controller("ModController", function($scope, ModEngine) {
	
	$scope.init = function() {
		$scope.message = "Pick a DM";
		$scope.state = ModEngine.getState();
		$scope.dungeon = ModEngine.getPlayerDungeon();
		$scope.dm = ModEngine.getPlayerDM();
	}
	
	$scope.changeView = function(newState) {
		console.log("change view " + newState);
		if (newState === "pickDM") {
			$scope.init();
		} else if (newState === "pickDungeon") {
			$scope.dm = ModEngine.getPlayerDM();
			$scope.state = newState;
			$scope.message = "Pick a dungeon";
		} else if (newState === "changeDungeon") {
			$scope.dungeon = ModEngine.getSelectedDungeon();
		} else if (newState === "buildDungeon") {
			$scope.dungeon = ModEngine.getPlayerDungeon();
			$scope.state = newState;
			$scope.message = "Build dungeon";
		} else if (newState === "waitHeroes") {
			
		} else if (newState === "enterHeroes") {
			$scope.state = newState;
			$scope.message = "Kill heroes!";
		}
	}
	
	ModEngine.subscribeToStateChange($scope.changeView);
	// ModEngine.start(); ?? rather than call init() here?
	
	$scope.init();
});