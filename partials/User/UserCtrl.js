angular.module('myApp').controller('UserCtrl', function ($scope, $rootScope, $routeParams, $state, $location, Extention) {

    $scope.logout = function () {
        Extention.setBusy(true);
        Extention.get('logout').then(function (results) {
            Extention.popInfo('��� �� ����?� ���� ��?�!');
            Extention.unAuthUser();
            $state.go('home.home');
            Extention.setBusy(true);
        });
    }
});