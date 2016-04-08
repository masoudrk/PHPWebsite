angular.module('myApp').directive('post', function () {
    return {
        restrict: 'EA',
        scope: {
            ngModel: '=',
            onPostMore:'&'
        },
        controller: ['$scope', 'Extention', '$element', '$attrs', '$window', function ($scope, Extention, $element, $attrs, $window) {

            $scope.postMore = function () {
                $scope.onPostMore();
            }

            $scope.likePost = function () {
                var post = $scope.ngModel;
                if (!post.Liked) {
                    post.Liked = true;
                    post.class = 'hvr-pop my-red';
                } else {
                    post.Liked = !post.Liked;
                    if (post.Liked != true) {
                        post.class = 'hvr-push my-gray';
                    }
                }

                Extention.post("likePost", { PostID: post.ID, Like: post.Liked }).then(function (res) {
                    $scope.ngModel.Liked = res.Liked;
                });
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
        }],
        templateUrl: function (elem, attrs) {
            return "app/directives/Post/PostTemplate.html";
        }

    }
});