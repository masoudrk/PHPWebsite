angular.module('myApp').controller('DefaultCtrl', function ($scope, $templateCache,$state, $rootScope, $routeParams, $uibModal, Extention, MainService) {

    $scope.switchLanguage = function () {
        Extention.switchLanguage('en');
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
        MainService.getAllSubjects().then(function(result) {
                $scope.subjects = result;
                Extention.setBusy(false);
            });
    }

    $scope.getAllSubjects();

    $scope.openLoginModal = function() {

        $uibModal.open({
            animation: true,
            templateUrl: 'partials/Home/LoginTemplate.html',
            controller: 'authCtrl',
            size: 'md'
        });
    };

    $scope.openSignupModal = function() {

        $uibModal.open({
            animation: true,
            templateUrl: 'partials/Home/SignupTemplate.html',
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

    $scope.switchLang = function (en) {
        if (en != 'en') {
            $state.go('home.home');
        }
        else
        {
            $state.go('homeEN.home');
        }
    }

});