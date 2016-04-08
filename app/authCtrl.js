﻿app.controller('authCtrl', function ($scope, $rootScope,$state, $routeParams, $uibModalInstance, $location, $http, Extention) {
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
    $scope.signup = {};
    $scope.doLogin = function (user) {
        Extention.setBusy(true);
        Extention.post('login', {
            customer: user
        }).then(function (results) {
            Extention.setBusy(false);

            if (results.Status == "success") {
                Extention.authUser(results);
                $uibModalInstance.close(results);

                if (results.AdminID) {
                    Extention.toast({ status: "success", message: "ادمین گرامی به سایت خوش آمدید!" });
                    $state.go("admin_root.dashboard");
                }
                else  {
                    Extention.toast({ status: "success", message: "کاربر گرامی به سایت خوش آمدید!" });
                    $state.go("user_root.dashboard");
                }

            } else {
                Extention.toast({ status: "error", message: "خطا ، اطلاعات وارد شده نادرست است." });
            }

        });
    };
    $scope.signup = {email:'',password:'',name:'',phone:'',address:''};
    $scope.signUp = function (customer) {
        Extention.post('signUp', {
            customer: customer
        }).then(function (results) {
            if (results.status == "success") {
                Extention.toast({ status: "success", message: "ثبت نام با موفقیت انجام شد!" });
            } else {
                if(results.status == "error-exists")
                    Extention.toast({ status: "error", message: "کاربری با این مشخصات ثبت نام کرده است!" });
                else
                    Extention.toast({ status: "error", message: "خطا ، لطفا دوباره تلاش کنید." });
            }
        });
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});