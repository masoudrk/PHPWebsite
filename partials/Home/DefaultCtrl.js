angular.module('myApp').controller('DefaultCtrl', function ($scope, $templateCache,$state, $rootScope, $routeParams, $uibModal, Extention, MainService) {

    $scope.tgState = false;

    $scope.switchLanguage = function () {
        Extention.switchLanguage('en');
    }

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

    $scope.openModal = function (name) {
        if (name == 'signin')
            Extention.openSigninPanel();
        else
            Extention.openSignupPanel();
    }

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