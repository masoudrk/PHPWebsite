angular.module(appName).controller('SlideShowCtrl', function ($scope, ADMdtpConvertor, $rootScope, Extention, $state, $timeout) {

    $scope.newSlide = {};
    $scope.image = {};
    $scope.image.ValidBg = false;
    $scope.image.ValidFront = false;

    $scope.bgImageChanged = function ($files, $file, $newFiles, $duplicateFiles, $invalidFiles, $event) {
        if($file)
            $scope.image.ValidBg = true;
    }
    $scope.frontImageChanged = function ($files, $file, $newFiles, $duplicateFiles, $invalidFiles, $event) {
        if($file)
            $scope.image.ValidFront = true;
    }

    activeElement('#SSlideShow');
});