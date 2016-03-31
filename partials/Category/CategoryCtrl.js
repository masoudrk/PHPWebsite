angular.module('myApp').controller('CategoryCtrl', function ($scope, $rootScope, $routeParams, $location, $stateParams, Extention, CategoryService) {

    $scope.CatID = $stateParams.id;
    $scope.pagingParams = {
        catID: $stateParams.id
    };

    CategoryService.getCategoryByID($scope.CatID).then(function (res) {
        $scope.category = res;
    });
});