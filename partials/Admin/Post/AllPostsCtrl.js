angular.module('myApp').controller('AllPostsCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Extention) {

    $scope.subjectButtonText = "انتخاب نشده";
    $scope.pagingController = {};
    $scope.posts = [];
    $scope.pagingParams = {};

    $scope.deletePost = function(post) {
        Extention.setBusy(true);
        Extention.post('deletePost', {PostID : post.ID }).then(function (res) {
            Extention.setBusy(false);
            if (res) {
                $scope.pagingController.update();
                Extention.toast({ status: 'success', message: 'پست با موفقیت حذف شد!' });
            }
            else
                Extention.toast({ status: 'error', message: 'مشکل در حذف پست ، لطفا دوباره امتحان کنید.' });
        });
    }
});