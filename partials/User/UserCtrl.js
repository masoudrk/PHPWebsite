angular.module('myApp').controller('UserCtrl', function ($scope, $rootScope, $routeParams, $state, $location, Extention) {

    $scope.logout = function () {
        Extention.get('logout').then(function (results) {
            Extention.popInfo('شما با موفقیت خارج شدید!');
            Extention.unAuthUser();
            $state.go('home.home');
        });
    }
});