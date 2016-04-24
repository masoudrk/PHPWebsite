app.controller('authCtrl', function ($scope, $rootScope,$state, $routeParams, $uibModalInstance, $location, $http, Extention) {
    //initially set those objects to null to avoid undefined error

    $scope.login = {};
    $scope.signup = {};
    $scope.doLogin = function (user) {
        Extention.post('login', {
            customer: user
        }).then(function (results) {

            if (results.Status == "success") {
                Extention.authUser(results);
                $uibModalInstance.close(results);

                if (results.IsAdmin) {
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
            customer: customer,
            recaptchaResponse: $scope.myRecaptchaResponse
        }).then(function (results) {
            if (results.Status == "success") {
                $uibModalInstance.close(results);
                Extention.toast({ status: "success", message: "ثبت نام با موفقیت انجام شد! لطفا وارد سایت شوید." });
            } else {
                if (results.Status == "error-exists")
                    Extention.toast({ status: "error", message: "کاربری با این مشخصات ثبت نام کرده است!" });
                else if (results.Status == "error-captcha")
                    Extention.toast({ status: "error", message: "هویت شما شناخته نشد ، لطفا دوباره امتحان کنید." });
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