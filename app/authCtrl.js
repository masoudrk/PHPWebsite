app.controller('authCtrl', function ($scope, $rootScope, $routeParams, $uibModalInstance, $location, $http, Extention , items) {
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
    $scope.signup = {};
    $scope.doLogin = function (customer) {
        Extention.setBusy(true);
        Extention.post('login', {
            customer: customer
        }).then(function (results) {
            Extention.toast(results);
            Extention.setBusy(false);
            if (results.Status!="error")
                Extention.authUser(results);
            if (results.Status == "success") {
                //$location.path('dashboard');
                $uibModalInstance.close(results);
            }

            if (results.AdminID)
                $location.path("/admin");
        });
    };
    $scope.signup = {email:'',password:'',name:'',phone:'',address:''};
    $scope.signUp = function (customer) {
        Extention.post('signUp', {
            customer: customer
        }).then(function (results) {
            if (results.status == "success") {
                Extention.toast({ status: "success", message: "ثبت نام با موفقیت انجام شد!" });
                //$location.path('dashboard');
            } else {
                if(results.status == "error-exists")
                    Extention.toast({ status: "error", message: "کاربری با این مشخصات ثبت نام کرده است!" });
                else
                    Extention.toast({ status: "error", message: "خطا ، لطفا دوباره تلاش کنید." });
            }
        });
    };
    //$scope.logout = function () {
    //    Extention.get('logout').then(function (results) {
    //        Extention.toast(results);
    //        Extention.unAuthUser();
    //        //$location.path('login');
    //    });
    //}


    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});