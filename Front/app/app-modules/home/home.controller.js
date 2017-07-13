angular
	.module('app.core')
	.controller('HomeController', function ($scope, $location, HomeService, toastr, GameService, $localStorage,$timeout,$interval) {
	  
		loadUser();
		let textAnimationClasses;
		let textAnimationCounter;
		let	textAnimationInterval;

		$scope.start = () => {
			$scope.friends = $localStorage.FriendsData;			 
			if(typeof $scope.friends === 'undefined' || $scope.friends === null){
				turnOnLoadingScreen();
				startTextAnimation(500);
				$timeout($scope.start,500);
				$timeout(logout,5000);
			}else if($scope.friends.length < 150){
				toastr.error('Você precisa de pelo menos 150 amigos para jogar.');
				$location.path('/home');
				return;
		 	}else{
				stopTextAnimation();
				turnOffLoadingScreen();
				$location.path('/game');
			}
		}

		GameService.getFriends().then( response=>{
				$localStorage.FriendsData = response.data;
		});

		function logout(){
			$location.path('/login');
		}
		function loadUser() {
			HomeService.getUser()
				.then(response => $scope.user = response.data);
		}

		function turnOnLoadingScreen(){
			$scope.loadingClass = 'loadingScreenOn';
		}

		function turnOffLoadingScreen(){
			$scope.loadingClass = 'loadingScreenOff';
		}

		function startTextAnimation(delay){
			textAnimationClasses = ['loadingTextStep1','loadingTextStep2','loadingTextStep3','loadingTextStep4'];
			textAnimationCounter = 0;
			textAnimationInterval = $interval(loadingTextAnimation,delay);
		}
		
		function loadingTextAnimation(){
			if(textAnimationCounter < textAnimationClasses.length){
				$scope.loadingText = textAnimationClasses[textAnimationCounter];
				textAnimationCounter++;
			}else{
				textAnimationCounter = 0;
			}
		}
		function stopTextAnimation(){
			$interval.cancel(textAnimationInterval);
		}

	});