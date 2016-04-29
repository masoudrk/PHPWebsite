 
angular.module('myApp').controller('MainCtrl', function ($scope, $rootScope, $routeParams, $state, $stateParams, $http, Extention) {

    //$scope.pagingParams = {};


    $scope.user = {};
    $scope.posts = [];

    $scope.subject = {};
    $scope.subject.bases = [];

    $scope.postMore = function (post) {

        $state.go("home.post" , { id : post.ID });
        Extention.scrollTo(0);
    }

});

    