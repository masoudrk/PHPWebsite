app.controller('authCtrl', function ($scope, $rootScope, $routeParams, $uibModalInstance, $location, $http, Data , items) {
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
    $scope.signup = {};
    $scope.doLogin = function (customer) {
        Data.setBusy(true);
        Data.post('login', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            Data.setBusy(false);
            Data.authUser(results);
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
        Data.post('signUp', {
            customer: customer
        }).then(function (results) {
            if (results.status == "success") {
                Data.toast({ status: "success", message: "ثبت نام با موفقیت انجام شد!" });
                //$location.path('dashboard');
            } else {
                if(results.status == "error-exists")
                    Data.toast({ status: "error", message: "کاربری با این مشخصات ثبت نام کرده است!" });
                else
                    Data.toast({ status: "error", message: "خطا ، لطفا دوباره تلاش کنید." });
            }
        });
    };
    //$scope.logout = function () {
    //    Data.get('logout').then(function (results) {
    //        Data.toast(results);
    //        Data.unAuthUser();
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