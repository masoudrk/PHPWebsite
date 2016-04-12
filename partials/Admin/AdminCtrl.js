angular.module('myApp').controller('AdminCtrl', function ($scope, $rootScope, $routeParams, $state, $location, Extention) {

    Extention.post('getAdminHeaderData').then(function (res) {
        $scope.commentsTree = res;
    });

    $scope.logout = function() {
        Extention.get('logout').then(function(results) {
            Extention.toast(results);
            Extention.unAuthUser();

            $state.go('home.home');
        });
    }

});