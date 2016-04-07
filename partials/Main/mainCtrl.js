 
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
        if (!post.Liked) {
            post.Liked = true;
            post.class = 'hvr-pop my-red';
        } else {
            post.Liked = !post.Liked;
            if (post.Liked != true) {
                post.class = 'hvr-push my-gray';
            }
        }

        Extention.post("likePost", { PostID: post.ID, Like: post.Liked }).then((function(post) {
            return function(res) {
                post.Liked = res.Liked;
            }
        })(post));
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

    