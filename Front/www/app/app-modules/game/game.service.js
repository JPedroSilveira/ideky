angular
    .module('app.core')
    .factory('GameService', function ($rootScope, $http, $q, AppConstants) {
        const urlGame = `${AppConstants.url}/api/game`;
        const urlLevel = `${AppConstants.url}/api/level`;

        return {
            getFriends: getFriends,
            getLevels: getLevels,
        }

        function getFriends() {
            const deffered = $q.defer();
            let friends;
            $rootScope.sdkLoad
				.then(response => {
                FB.api('/me/invitable_friends?fields=name,picture.width(200)&limit=999999,friends?fields=name,picture.width(200)&limit=999999', response => {
                    deffered.resolve({ data: response.data })
                });
            });

            return deffered.promise;
        }

        function getLevels(){
            return $http({
            url: `${urlLevel}/get`,
            method: 'GET',
          });
        }
    });