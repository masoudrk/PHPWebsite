angular.module('myApp').controller('ProfileCtrl',
    function ($scope, $rootScope, $routeParams, $location, $timeout, $uibModal, Extention, Upload) {
        $scope.uploading = false;

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

        $scope.changePass = function () {

            if ($scope.newPass.length < 6) {
                Extention.toast({ status: 'error', message: 'طول حروف رمز بایستی بزرگتر از 6 حرف باشد!' });
                return;
            }

            if ($scope.newPass != $scope.verifyPass) {
                Extention.toast({ status: 'error', message: 'رمز های جدید یکسان نیستند!' });
                return;
            }

            var obj = {
                oldPassword: $scope.currentPass,
                newPassword: $scope.newPass
            }

            Extention.post("changeUserPassword", obj).then(function (res) {
                if (res) {
                    if (res.Status == "success") {
                        Extention.toast({ status: 'success', message: 'رمز با موفقیت تغییر یافت!' });
                        return;
                    } else {
                        if (res.Message == "PasswordNotMatch") {
                            Extention.toast({ status: 'error', message: 'خطا! رمز قبلی صحیح نیست.' });
                            return;
                        }
                        if (res.Message == "PasswordIsShort") {
                            Extention.toast({ status: 'error', message: 'خطا ، طول رمز کمتر از 6 کاراکتر است!' });
                            return;
                        }
                    }
                    Extention.toast({ status: 'error', message: 'خطا در سرور ! لطفا دوباره تلاش کنید.' });
                } 
            });
        }
});