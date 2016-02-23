PeliApp.controller("ModController", function($scope, ModEngine) {
	
	$scope.message = "Pick a DM";
	$scope.state = ModEngine.getState();
	
	$scope.grid = ModEngine.getGrid();
	
	$scope.changeView = function(newState) {
		console.log("change view " + newState);
		if (newState === "pickDM") {
			$scope.state = newState;
			$scope.message = "Pick a DM";
		} else if (newState === "pickDungeon") {
			$scope.state = newState;
			$scope.message = "Pick a dungeon";
		} else if (newState === "buildDungeon") {
			$scope.state = newState;
			$scope.message = "Build dungeon";
		} else if (newState === "waitHeroes") {
			
		} else if (newState === "killHeroes") {
			
		}
	}
	
	ModEngine.subscribeToStateChange($scope.changeView);
});