angular.module('myApp').controller('UsersCtrl',
function ($scope, $rootScope, $routeParams, $uibModal,$location, Extention) {
    $scope.pagingController = {};

    Extention.post("getAllPrivileges").then(function (res) {
        res.push({ PrivilegeID: "-1", Privilege: "None" ,Description:"Remove from Admins and stay only normal user." });
        $scope.privileges = res;
    });

    $scope.changePrivilege = function (item) {
        Extention.post("saveAdminPrivilege",
            {UserID : item.ID ,
            AdminID : item.AdminID ,
            PrivilegeID: item.Privilege.PrivilegeID
            }).then(function (res) {
            if (res) {
                if (res.Status == "success") {
                    Extention.toast({ status: "success", message: "با موفقیت تغییر کرد!" });
                    $scope.pagingController.update();
                }
                else if (res.Status == "error") {
                    if (res.Message == "NoPrivilege") {
                        Extention.toast({ status: "error", message: "شما اجازه تغییر دسترسی ندارید!" });
                        $scope.pagingController.update();
                    }
                    else
                        Extention.toast({ status: "error", message: "خطا!" });
                }
            }
        });
    }
    $scope.showLocation = function (c) {
        //'http://freegeoip.net/json/'
        //'http://www.ip2location.com/'
        //'http://www.telize.com/'
        Extention.getExternal('http://geoip.nekudo.com/api/' + c.IP).then(function (resLocation) {
            $uibModal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: function ($scope, $uibModalInstance, user, location) {
                    $scope.user = user;
                    $scope.location = location;
                    $scope.close = function () {
                        $uibModalInstance.close();
                    }
                },
                size: 'md',
                resolve: {
                    user: function () {
                        return c;
                    },
                    location : function() {
                        return resLocation.location;
                    }
                }
            });
        });

    }

    $scope.deleteUser = function(item) {
        Extention.post("deleteUser",
            {
                UserID: item.ID
            }).then(function (res) {
                if (res) {
                    if (res.Status == "success") {
                        Extention.toast({ status: "success", message: "با موفقیت حذف شد!" });
                        $scope.pagingController.update();
                    }
                    else if (res.Status == "error") {
                        if (res.Message == "NoPrivilege") {
                            Extention.toast({ status: "error", message: "شما اجازه حذف کاربران را ندارید!" });
                            $scope.pagingController.update();
                        }
                        else
                            Extention.toast({ status: "error", message: "خطا!" });
                    }
                }
            });
    }
});