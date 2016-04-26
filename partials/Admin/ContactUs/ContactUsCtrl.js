angular.module('myApp').controller('ContactUs',
    function ($scope, $rootScope, $routeParams, $location, $timeout, $uibModal, Extention) {
        $scope.pagingController = {};

        $scope.deleteContact = function (c) {

            Extention.post("deleteContact", { ID: c.ID}).then(function (res) {
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