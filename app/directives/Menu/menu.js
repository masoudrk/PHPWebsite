angular.module('myApp').directive('menu', function () {
    return {
        restrict: 'EA',
        scope: {
            ngModel: '=',
            onPostMore:'&'
        },
        controller: ['$scope', 'Extention', function ($scope, Extention) {

            $scope.subjects = [];
            Extention.setBusy(true);
            Extention.post('getAllSubjects').then(function (result) {
                $scope.subjects = result;
                Extention.setBusy(false);
            });
        }],
        templateUrl: function (elem, attrs) {
            return "app/directives/Menu/MenuTemplate.html";
        }

    }
});