angular.module('myApp').controller('DefaultCtrl', function ($scope, $rootScope, $routeParams, $location, $http, $uibModal, Extention, MainService) {

    $scope.sliderController = {};

    Extention.post('getAllSlides').then(function(res) {
        $scope.slides = res.Items;
        // $scope.sliderController.update();
    });

    $scope.user = undefined;

    $scope.subjects = [];

    $scope.getAllSubjects = function () {
        Extention.setBusy(true);
        MainService.getAllSubjects()
            .then(function(result) {
                $scope.subjects = result;
                Extention.setBusy(false);
            });
    }

    $scope.getAllSubjects();

    $scope.openLoginModal = function() {

        $uibModal.open({
            animation: true,
            templateUrl: 'partials/LoginTemplate.html',
            controller: 'authCtrl',
            size: 'md'
        });
    };
    $scope.openSignupModal = function() {

        $uibModal.open({
            animation: true,
            templateUrl: 'partials/SignupTemplate.html',
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