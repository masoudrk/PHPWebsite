angular.module('myApp').controller('SubjectCtrl',
    function ($scope, $rootScope, $routeParams, $location, Extention) {

        $scope.p1 = $scope.p2 = $scope.p3 = $scope.p4 = false;
        $scope.showPanel = function (p1, p2, p3, p4) {
            $scope.p1 = p1;
            $scope.p2 = p2;
            $scope.p3 = p3;
            $scope.p4 = p4;
        }
        $scope.showPanel();

        $scope.getAllSubjects = function () {
            Extention.post("getAllSubjects").then(function (res) {
                $scope.subjects = res;
            });
        }

        $scope.showAddChildPanel = function (item) {
            $scope.selectedSubject = item;
            $scope.showPanel(false,true);
        }

        $scope.showSubject = function (item) {
            $scope.selectedSubject = item;
            $scope.selectedSubjectTitle = item.Title;
            $scope.showPanel(true);
        }

        $scope.saveSubjectChild = function () {
            Extention.post("saveSubject", { ParentID: $scope.selectedSubject.ID, Title: $scope.newChildSubjectTitle })
                .then(function (res) {
                    if (res && res.Status == "success") {
                        Extention.toast({ status: "success", message: "با موفقیت اضافه شد!" });
                        $scope.getAllSubjects();
                    } else {
                        Extention.toast({ status: "error", message: "مشکل در اضافه کردن لطفا دوباره امتحان کنید." });
                    }
                });
        }
        $scope.updateSubject = function (subjectID, title) {
            Extention.post("updateSubject", { ID: subjectID, Title: title })
                .then(function (res) {
                    if (res && res.Status == "success") {
                        Extention.toast({ status: "success", message: "با موفقیت ویرایش شد!" });
                        $scope.getAllSubjects();
                    } else {
                        Extention.toast({ status: "error", message: "مشکل در ویرایش کردن لطفا دوباره امتحان کنید." });
                    }
                });
        }
        $scope.deleteSubject = function (subjectID) {
            Extention.post("deleteSubject", { ID: subjectID })
                .then(function (res) {
                    if (res && res.Status == "success") {
                        Extention.toast({ status: "success", message: "با موفقیت حذف شد!" });
                        $scope.getAllSubjects();
                    } else {
                        Extention.toast({ status: "error", message: "مشکل در حذف کردن لطفا دوباره امتحان کنید." });
                    }
                });
        }

        $scope.getAllSubjects();
    });