angular.module('myApp').controller('ContactUsCtrlEn', function ($scope, $rootScope, $routeParams, $location, $stateParams, Extention) {
    $scope.EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    $scope.emailError = false;
    $scope.nameError = false;
    $scope.readOnly = false;
    $scope.contactUs = {};

    Extention.get('session').then(function (res) {
        if (res.UserID) {
            $scope.contactUs.name = res.FirstName + " " + res.LastName;
            $scope.contactUs.email = res.Email;
            $scope.readOnly = true;
        }
    });

    $scope.sendMessage = function () {
        if ($scope.contactUs) {
            if (!$scope.contactUs.name || !$scope.contactUs.name.length>0)
            { $scope.nameError = true; return }
            if ($scope.contactForm.$valid) {
                Extention.post('saveContactUs', $scope.contactUs).then(function(resp) {
                    if (resp && resp.Status == 'success') {
                        Extention.popSuccess('Your message has been sent');
                        $scope.contactUs.message = '';
                    } else {
                        Extention.popError('Error in sending message');
                    }
                });
            }
            else {
                Extention.popInfo('Please correctly fill the form');
            }

        } else {
            $scope.emailError = true;
            $scope.nameError = true;
        }
    }

    $scope.checkEmail = function(value) {
        if($scope.EMAIL_REGEXP.test(value))
            $scope.emailError = false;
        else
            $scope.emailError = true;
    };

    $scope.checkName = function (value) {
        if (value.length>0)
            $scope.nameError = false;
        else
            $scope.nameError = true;
    };
});

    