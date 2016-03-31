 
angular.module('myApp').controller('MainCtrl', function ($scope, $rootScope, $routeParams, $location, $stateParams, $http, Extention, MainService) {

    $scope.pagingParams =
    {
        filter: "hey"
    };

    $scope.user = {};
    $scope.posts = [];

    $scope.subject = {};
    $scope.subject.bases = [];

    $scope.postMore = function (post) {

        $location.path("/post/" + post.ID);
        //$rootScope.post = post;
        Extention.scrollTo(500);

        //$location.url("#/post/" + post.ID);
    }

});

    