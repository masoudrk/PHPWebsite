angular.module('myApp').controller('ContactUs',
    function ($scope, $rootScope, $routeParams, $location, $timeout, $uibModal, Extention) {
        $scope.pagingController = {};

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

        $scope.showContact = function(c) {

            $uibModal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: function ($scope,$uibModalInstance, contact) {
                    $scope.contact = contact;
                    $scope.close = function () {
                        $uibModalInstance.close();
                    }
                },
                size: 'md',
                resolve: {
                    contact: function () {
                        return c;
                    }
                }
            });
        }
});