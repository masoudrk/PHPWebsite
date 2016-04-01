angular.module('myApp').controller('SliderCtrl',
    function ($scope, $rootScope, $routeParams, $location, $uibModal, Extention) {

        $scope.pagingController = {};

        $scope.deleteSlide = function(item) {
            Extention.post("deleteSlide", { slideID: item.ID }).then(function (res) {
                if (res && res.Status == "success") {
                    Extention.toast({ status: "success", message: "با موفقیت حذف شد!" });
                    $scope.pagingController.update();
                } else {
                    Extention.toast({ status: "error", message: "مشکل در حذف لطفا دوباره امتحان کنید." });
                }
            });
        }

        $scope.saveSlide = function (item) {

            if (!$scope.content || !$scope.title ||
                !$scope.image || !$scope.image.ID ||
                !$scope.order || !$scope.link) {
                Extention.toast({ status: "error", message: "لطفا تمامی فیلد ها را پر کنید" });
                return;
            }

            var slide = {
                Content: $scope.content,
                Title: $scope.title,
                ImageID: $scope.image.ID,
                Order: $scope.order,
                Link: $scope.link
            };

            Extention.post("saveSlide", slide).then(function (res) {
                if (res && res.Status == "success") {
                    Extention.toast({ status: "success", message: "با موفقیت اضافه شد!" });
                    $scope.pagingController.update();
                } else {
                    Extention.toast({ status: "error", message: "مشکل در اضافه کردن ، لطفا دوباره امتحان کنید." });
                }
            });
        }

        $scope.openGalleryModal = function () {

            var uibModalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'partials/Modals/Gallery/GalleryTemplate.html',
                controller: function ($uibModalInstance, $scope, mediaType) {
                    $scope.pagingParams = {
                        imageType: ""
                    }
                    $scope.selectMedia = function (item) {
                        $uibModalInstance.close(item);
                    };
                },
                size: 'lg',
                resolve: {
                    mediaType: function () {
                        return ["jpeg/jpg", "png"];
                    }
                }
            });

            uibModalInstance.result.then(function (image) {
                $scope.image = image;
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        }
});