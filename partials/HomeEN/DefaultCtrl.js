angular.module('myApp').controller('DefaultCtrlEN', function ($scope, $templateCache, $state, $rootScope, $routeParams, $uibModal, Extention) {

    $scope.switchLanguage = function () {
        Extention.switchLanguage('fa');
    }

    //$templateCache.removeAll();
    $scope.sliderController = {};

    Extention.post('getAllSlides').then(function(res) {
        $scope.slides = res.Items;
    });

    Extention.post('getHomePageData').then(function (res) {
        $scope.homePageData = res;
    });
    
    $scope.user = undefined;
    $scope.subjects = [];

    $scope.getAllSubjects = function () {
        Extention.setBusy(true);
        Extention.post('getAllSubjects').then(function (result) {
                $scope.subjects = result;
                Extention.setBusy(false);
            });
    }

    $scope.getAllSubjects();

    $scope.openLoginModal = function() {

        $uibModal.open({
            animation: true,
            templateUrl: 'partials/HomeEN/LoginTemplate.html',
            controller: 'authCtrl',
            size: 'md'
        });
    };

    $scope.openSignupModal = function() {

        $uibModal.open({
            animation: true,
            templateUrl: 'partials/HomeEN/SignupTemplate.html',
            controller: 'authCtrl',
            size: 'md'
        });
    };

    $scope.logout = function () {
        Extention.get('logout').then(function (results) {
            Extention.popInfo("شما با موفقیت خارج شدید!");
            Extention.unAuthUser();
        });
    }


});