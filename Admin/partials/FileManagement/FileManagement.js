angular.module(appName).controller('FileManagementCtrl', function ($scope, ADMdtpConvertor, $rootScope, Extention,
                                                                   $state, $timeout , Upload ,$uibModal) {

    $scope.pagingParams= {};

    $scope.openUploadModal = function () {
        $uibModal.open({
            animation: true,
            templateUrl: 'modals/UploadFile/template.html',
            controller: 'uploadFileCtrl',
            size: 'lg'
        });
    } 

    activeElement('#SFileManagement');
});