app.controller('DefaultCtrl', function ($scope, $rootScope, $routeParams, $location, $http, $timeout , $uibModal, Data, MainService) {

    
    $scope.images = [{
        src: 'content/img/img3.jpg',
        title: 'Pic 1'
    }, {
        src: 'content/img/img1.jpg',
        title: 'Pic 3'
    }];

    $scope.user = undefined;

    $scope.subject = {};
    $scope.subject.bases = [];
    $scope.subject.sub = [];

    $scope.getAllBaseSubjects = function () {
        $rootScope.progressbar.start();
        MainService.getAllBaseSubjects()
           .then(function (result) {
               $scope.subject.bases = result;
               $scope.getAllSubjects();
           });
    }

    $scope.getAllSubjects = function () {
        MainService.getAllSubjects()
           .then(function (result) {
                var bases = $scope.subject.bases;
                for (var i = 0; i < bases.length; i++) {
                    $scope.subject.bases[i].sub = [];
                    for (var j = 0; j < result.length; j++) {
                        var b = bases[i];
                        var s = result[j];
                        if (b.ID == s.ParentID)
                           $scope.subject.bases[i].sub.push(s);
                   } 
                }
                $rootScope.progressbar.start();
           });
    }

    $scope.getAllBaseSubjects();

    $scope.openLoginModal = function () {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'partials/LoginTemplate.html',
            controller: 'authCtrl',
            size: 'md',
            resolve: {
                items: function () {
                    return ['item1', 'item2', 'item3'];;
                }
            }
        });

        modalInstance.result.then(function (user) {
            $scope.user = user;
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };
    $scope.openSignupModal = function () {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'partials/SignupTemplate.html',
            controller: 'authCtrl',
            size: 'md',
            resolve: {
                items: function () {
                    return ['item1', 'item2', 'item3'];;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
            Data.unAuthUser();
            //$location.path('login');
        });
    }

});