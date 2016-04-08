angular.module('myApp').controller('AllPagesCtrl',
function ($scope, $rootScope, $routeParams, $location, Extention) {
    $scope.pagingController = {};

    $scope.allPages = [];

    $scope.deletePage = function(item) {
        Extention.post('deletePage', item.ID).then(function(res) {
            if (res && res.Status == 'success') {
                Extention.popSuccess('صفحه با موفقیت حذف شد!');
                $scope.pagingController.update();
            } else {
                Extention.popError('مشکل در حذف صفحه ، لطفا دوباره امتحان کنید.');
            }
        });
    }
});