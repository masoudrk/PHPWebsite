app.controller('MainCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data, MainService) {

    $scope.user = {};
    $scope.posts = [];

    Data.get('session').then(function (results) {
        if (results.uid) {
            user = results;
            console.log("Authorized");
        } else {
            user = results;
            console.log("No Auth");
        }
    });


    $scope.getAllPosts = function () {
         MainService.getAllPosts()
            .then(function(result) {
                $scope.posts = result;
             });
    }
    $scope.getAllPosts();
});