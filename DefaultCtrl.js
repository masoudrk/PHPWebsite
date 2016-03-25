define(['app/app'], function (app) {
    app.controller('DefaultCtrl', function($scope, $rootScope, $routeParams, $location, $http, $timeout, $uibModal, Data, MainService) {

        $scope.images = [
            {
                src: 'content/img/img3.jpg',
                title: 'Pic 1'
            }, {
                src: 'content/img/img1.jpg',
                title: 'Pic 3'
            }
        ];

        $scope.user = undefined;

        $scope.subjects = [];

        $scope.getAllSubjects = function() {
            MainService.getAllSubjects()
                .then(function(result) {
                    $scope.subjects = result;
                });
        }

        $scope.getAllSubjects();

        $scope.openLoginModal = function() {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'partials/LoginTemplate.html',
                controller: 'authCtrl',
                size: 'md',
                resolve: {
                    items: function() {
                        return ['item1', 'item2', 'item3'];;
                    }
                }
            });

            modalInstance.result.then(function(user) {
                $scope.user = user;
            }, function() {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.openSignupModal = function() {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'partials/SignupTemplate.html',
                controller: 'authCtrl',
                size: 'md',
                resolve: {
                    items: function() {
                        return ['item1', 'item2', 'item3'];;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.logout = function() {
            Data.get('logout').then(function(results) {
                Data.toast(results);
                Data.unAuthUser();
                //$location.path('login');
            });
        }

    });
});