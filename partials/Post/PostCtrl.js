angular.module('myApp').controller('PostCtrl', function ($scope, $rootScope, $routeParams, $location, $stateParams, Extention) {

    Extention.post("getPostByID", { PostID: $stateParams.id }).then(function (res) {
        $scope.post = res;
    });
});