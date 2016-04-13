angular.module('myApp').directive('menu', function () {
    return {
        restrict: 'EA',
        scope: {
            ngModel: '=',
            onPostMore:'&'
        },
        controller: ['$scope', 'Extention', function ($scope, Extention) {

            $scope.subjects = [];
            Extention.post('getAllSubjects').then(function (result) {
                $scope.subjects = result;
            });
        }],
        templateUrl: function (elem, attrs) {
            return "app/directives/Menu/MenuTemplate.html";
        }

    }
});