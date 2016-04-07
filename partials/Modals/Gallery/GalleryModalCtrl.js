angular.module('myApp').controller('GalleryModalCtrl', ['$scope', '$uibModalInstance', 'Extention', 'typesDesc', 'fileTypes', 'isMedia', function ($scope, $uibModalInstance, Extention, typesDesc, fileTypes, isMedia) {

    $scope.pagingParams = {
        fileTypes: fileTypes,
        isMedia: isMedia
    }

    $scope.typesDesc = typesDesc;

    Extention.post("getAllFileTypes").then(function (res) {
        $scope.fileTypes = res;
    });

    $scope.getSearchResult = function () {
        $scope.pagingParams.searchValue = $scope.searchValue;
    }
    
    $scope.searchItems = [{ Title: "جدیدترین ها", ID: 1 }, { Title: "پروفایل", ID: 1 }];

    $scope.selectMedia = function (item) {
        $uibModalInstance.close(item);
    }

    $scope.close = function () {
        $uibModalInstance.close();
    }

}]);

    