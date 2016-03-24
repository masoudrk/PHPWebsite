app.controller('PostCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data, MainService) {

    $scope.user = {};
    $scope.posts = [];

    $scope.subject = {};
    $scope.subject.bases = [];

    $scope.post = $rootScope.post;

    Data.get('session').then(function (results) {
        if (results.uid) {
            user = results;
            console.log("Authorized");
        } else {
            user = results;
            console.log("No Auth");
        }
    });

    
});