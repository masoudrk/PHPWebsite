angular.module('myApp').directive('menuEn', function () {
    return {
        restrict: 'EA',
        scope: {
            ngModel: '=',
            onPostMore:'&'
        },
        controller: ['$scope', '$rootScope', 'Extention', function ($scope, $rootScope, Extention) {

            $scope.auth = {};

            $scope.$watch('$root.authenticated', function () {
                $scope.auth.authenticated = $rootScope.authenticated;
            });
            $scope.$watch('$root.isAdmin', function () {
                $scope.auth.isAdmin = $rootScope.isAdmin;
            });

            $scope.subjects = [];
            Extention.post('getAllSubjects').then(function (result) {
                $scope.subjects = result;
            });

            $scope.openModal = function (name) {
                if(name == 'signin')
                    Extention.openSigninPanel('en');
                else
                    Extention.openSignupPanel('en');
            }
        }],
        templateUrl: function (elem, attrs) {
            return "app/directives/MenuEN/MenuTemplate.html";
        }

    }
});