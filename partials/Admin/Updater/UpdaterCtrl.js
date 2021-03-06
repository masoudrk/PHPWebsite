﻿angular.module('myApp').controller('UpdaterCtrl',
    function ($scope, $rootScope, $routeParams, $location, $timeout, Extention, Upload, clipboard) {


        $scope.uploadPic = function (file) {

            file.upload = Upload.upload({
                url: 'api/v1/updateSystem',
                data: {
                    file: file
                }
            });
            Extention.setBusy(true);
            Extention.popInfo('لطفا تا پایان آپدیت صبر کنید.');
            file.upload.then(function (response) {
                Extention.setBusy(false);
                if (response.data) {
                    Extention.popSuccess('سایت با موفقیت آپدیت شد!');
                } else {
                    Extention.popError('مشکل در آپدیت سایت!');
                }
            }, function (response) {
                Extention.setBusy(false);
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
            }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                
            });
        }

    });