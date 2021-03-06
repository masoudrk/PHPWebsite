﻿angular.module('myApp').controller('GalleryCtrl',
    function ($scope, $rootScope, $routeParams, $location, $timeout, Extention, Upload, clipboard) {

        $scope.pagingCtrl = {};

        $scope.pagingParams = {
            fileTypes: "'jpg/jpeg','png'",
            isMedia:'1'
        };

        $scope.typeModel = {};

        $scope.uploadPic = function (file) {

            if (!$scope.description || $scope.description == undefined) {
                Extention.toast({ message: 'لطفا توضیحی برای فایل بنویسید.', status: 'error' });
                return;
            }

            if (!$scope.selectedFileType || $scope.selectedFileType.length == 0) {
                Extention.toast({ message: 'لطفا نوع فایل را انتخاب کنید.', status: 'error' });
                return;
            }

            file.upload = Upload.upload({
                url: 'api/v1/uploadFile',
                data: {
                    file: file,
                    fileTypeID: $scope.selectedFileType[0].ID,
                    description: $scope.description
                }
            });

            Extention.popInfo('لطفا تا پایان آپلود فایل صبر کنید.');
            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    $scope.pagingCtrl.update();
                    Extention.toast({ message: 'فایل با موفقیت آپلود شد!', status: 'success' });
                });
            }, function (response) {
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
            }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                
            });
        }

        Extention.post("getAllFileTypes").then(function (res) {

            $scope.fileTypes = res;
        });

        $scope.typeChanged = function () {
            $scope.pagingParams.fileTypes = "'" + $scope.typeModel.selected.Type + "'";
            $scope.pagingCtrl.update();
        }

        $scope.removeMedia = function (item) {
            Extention.post("deleteMedia", { mediaID: item.ID }).then(function (res) {
                if (res) {
                    Extention.toast({ message: 'فایل با موفقیت حذف شد!', status: 'success' });
                    $scope.pagingCtrl.update();
                }
                else
                    Extention.toast({ message: 'خطا در حذف ، لطفا دوباره امتحان کنید', status: 'error' });

            });
        }

        $scope.copyLink = function (item) {
            var absUrl = $location.absUrl();
            var i = absUrl.indexOf('#');
            var siteName = absUrl.substr(0,i);
            clipboard.copyText(siteName + item.FullPath);
            Extention.toast({ message: 'لینک فایل کپی شد.', status: 'success' });
        }
    });