angular.module('myApp').controller('MainCtrlEN', function ($scope, $state, $rootScope, $routeParams, $location, $stateParams, $http, Extention) {

    $scope.pagingParams =
    {
    };

    $scope.user = {};
    $scope.posts = [];

    $scope.subject = {};
    $scope.subject.bases = [];

    $scope.postMore = function (post) {
        $state.go("homeEN.post", { id: post.ID });
        Extention.scrollTo(0);
    }

});

    