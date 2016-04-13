angular.module('myApp').controller('CommentCtrl',
    function ($scope, $rootScope, $routeParams, $location, $timeout, $uibModal, Extention, Upload) {
        $scope.uploading = false;
        $scope.pagingController = {};

        Extention.post("getUserProfile").then(function (res) {
            $scope.user = res;
        });

        var myWatcher = $scope.$watch('picFile', function () {
            if (!$scope.uploading && $scope.picFile) {
                $scope.changeAvatar();
            }
        }, true);

        $scope.changeAvatar = function () {
            myWatcher();
            Extention.setBusy(true);

            var file = $scope.picFile;
            file.upload = Upload.upload({
                url: 'api/v1/changeUserAvatar',
                data: {
                    file: file
                }
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    Extention.setBusy(false);
                    Extention.toast({ message: 'فایل با موفقیت آپلود شد!', status: 'success' });
                    Extention.post("getUserProfile").then(function (res) {
                        $scope.user = res;
                    });
                });
            }, function (response) {
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
            }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                if (file.progress == 100) {
                    //$scope.uploading = false;
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