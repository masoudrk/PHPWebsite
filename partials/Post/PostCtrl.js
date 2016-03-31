angular.module('myApp').controller('PostCtrl', function ($scope, $rootScope, $routeParams, $location, $stateParams, $http, Data, PostService) {

    console.log($stateParams.id);

    PostService.getPostByID($stateParams.id).then(function (res) {
        $scope.post = res;
    });
});