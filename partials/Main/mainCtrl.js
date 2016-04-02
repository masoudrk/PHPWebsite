 
angular.module('myApp').controller('MainCtrl', function ($scope, $rootScope, $routeParams, $location, $stateParams, $http, Extention) {

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
        Extention.scrollTo(500);
    }
    $scope.likePost = function (post) {
        if (!post.liked) {
            post.liked = true;
        } else {
            post.liked = !post.liked;
        }
        if (post.liked == true) {
            post.class = 'hvr-pop my-red';
        } else {
            post.class = 'hvr-push my-gray';
        }
    }
    $scope.starPost = function (post) {
        if (!post.starred) {
            post.starred = true;
        } else {
            post.starred = !post.starred;
        }
        if (post.starred == true) {
            post.class_star = 'hvr-pop my-carrot';
        } else {
            post.class_star = 'hvr-push my-gray';
        }
    }
});

    