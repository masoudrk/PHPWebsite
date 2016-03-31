angular.module('myApp').controller('PostCtrl', function ($scope, $rootScope, $routeParams, $location, $stateParams, Extention, PostService) {

    console.log($stateParams.id);

    PostService.getPostByID($stateParams.id).then(function (res) {
        $scope.post = res;
    });
});