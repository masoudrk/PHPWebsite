angular.module('myApp').controller('AllPostsCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data, AdminService, MainService) {

    $scope.subjectButtonText = "انتخاب نشده";

    $scope.posts = [];

    $scope.deletePost = function (post) {
        Data.setBusy(true);
        AdminService.deletePost(post.ID).then(function (res) {
            Data.setBusy(false);
            if (res) {
                $scope.getAllPosts();
                Data.toast({ status: 'success', message: 'پست با موفقیت حذف شد!' });
            }
            else
                Data.toast({ status: 'error', message: 'مشکل در حذف پست ، لطفا دوباره امتحان کنید.' });
        });
    }

    $scope.getAllPosts = function () {
        Data.setBusy(true);
        MainService.getAllPosts().then(function (res) {
            $scope.posts = res;
            Data.setBusy(false);
        });
    }

    $scope.getAllPosts();
});