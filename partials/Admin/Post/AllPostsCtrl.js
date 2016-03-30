angular.module('myApp').controller('AllPostsCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data, AdminService, MainService) {

    $scope.subjectButtonText = "انتخاب نشده";

    $scope.posts = [];
    $scope.pagingParams = {};

    $scope.deletePost = function (post) {
        Data.setBusy(true);
        AdminService.deletePost(post.ID).then(function (res) {
            Data.setBusy(false);
            if (res) {
                $scope.pagingController.update();
                Data.toast({ status: 'success', message: 'پست با موفقیت حذف شد!' });
            }
            else
                Data.toast({ status: 'error', message: 'مشکل در حذف پست ، لطفا دوباره امتحان کنید.' });
        });
    }
});