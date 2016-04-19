 angular.module('myApp').controller('AboutCtrl',function ($scope, $rootScope, $routeParams, $location, $stateParams, Extention) {
     $scope.page = {};
     Extention.post('getAboutPage').then(function(res) {
         $scope.page = res;
     });
 });

    