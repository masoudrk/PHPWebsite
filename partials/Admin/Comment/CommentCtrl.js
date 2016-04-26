angular.module('myApp').controller('CommentCtrl',
    function ($scope, $rootScope, $routeParams, $location, $timeout, $uibModal, Extention) {
        
        $scope.pagingController = {};

        $scope.deleteComment = function (c) {

            Extention.post("deleteComment", { ID: c.ID }).then(function (res) {
                if (res) {
                    if (res.Status == "success") {
                        Extention.toast({ status: 'success', message: 'با موفقیت حذف شد!' });
                        $scope.pagingController.update();
                    } else {
                        Extention.toast({ status: 'error', message: 'خطا در سرور ، دوباره تلاش کنید' });
                    }
                }
            });
        }

        $scope.acceptComment = function (c,accept) {

            Extention.post("acceptComment", { CommentID: c.ID, Accepted: accept }).then(function (res) {
                if (res) {
                    if (res.Status == "success") {
                        Extention.toast({ status: 'success', message: 'با موفقیت تغییر کرد!' });
                        $scope.pagingController.update();
                    } else {
                        Extention.toast({ status: 'error', message: 'خطا در سرور ، دوباره تلاش کنید' });
                    }
                } 
            });
        }
});