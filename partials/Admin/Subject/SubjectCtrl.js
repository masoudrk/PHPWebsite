﻿angular.module('myApp').controller('SubjectCtrl',
    function ($scope, $rootScope, $routeParams,$timeout, $location, Extention) {

        $scope.subject = {};

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
            $scope.subjectParent = item;
            $scope.subject = {};
            $scope.insertChild = true;
            $scope.showPanel(false, false, true);

            $scope.scrollToEditPanel();
        }

        $scope.showChilds = function (item) {
            $scope.subject = item;
            $scope.showPanel(true);

            $scope.scrollToEditPanel();
        }

        $scope.editSubject = function (item) {
            $scope.subjectParent = {};
            $scope.subject = item;
            $scope.insertChild = false;
            $scope.showPanel(false, false, true);

            $scope.scrollToEditPanel();
        }

        $scope.editChildSubject = function (item) {
            $scope.childSubject = item;
            $scope.showPanel(true, true ,false ,true);

            $scope.scrollToEditPanel();
        }
        
        $scope.newSubject = function () {
            $scope.subjectParent = {};
            $scope.subject = {};
            $scope.showPanel(false, false, true);

            $scope.scrollToEditPanel();
        }

        $scope.scrollToEditPanel = function () {
            //$timeout(function () {
            //}, 80);
            Extention.scrollToElement('bottom');
        }

        $scope.saveSubject = function () {

            var subjectValid = $scope.subject.Title && $scope.subject.Title.length > 1;
            var subjectENValid = $scope.subject.TitleEN && $scope.subject.TitleEN.length > 1;

            $scope.subject.newSubjectError = !subjectValid;
            $scope.subject.newSubjectErrorEN = !subjectENValid;

            if (!subjectValid)
            { return }

            if (!subjectENValid)
            { return }

            if (!$scope.newSubjectForm || !$scope.newSubjectForm.$valid) {
                Extention.popError("لطفا اطلاعات موضوع جدید را به درستی وارد کنید.");
                return;
            }

            var data = { ParentID: -1, ID: $scope.subject.ID, Title: $scope.subject.Title, TitleEN: $scope.subject.TitleEN };
            if ($scope.subjectParent) {
                data.ParentID = $scope.subjectParent.ID;
            }

            Extention.post("saveSubject", data)
                .then(function (res) {
                    if (res && res.Status == "success") {
                        Extention.toast({ status: "success", message: "با موفقیت ثبت شد!" });
                        $scope.subject = {};
                        $scope.showPanel();
                        $scope.getAllSubjects();
                    } else {
                        Extention.toast({ status: "error", message: "مشکل در ثبت کردن لطفا دوباره امتحان کنید." });
                    }
                });
        }

        $scope.saveChildSubject = function () {

            var subjectValid = $scope.childSubject.Title && $scope.childSubject.Title.length > 1;
            var subjectENValid = $scope.childSubject.TitleEN && $scope.childSubject.TitleEN.length > 1;

            $scope.childSubject.newSubjectError = !subjectValid;
            $scope.childSubject.newSubjectErrorEN = !subjectENValid;

            if (!subjectValid)
            { return }

            if (!subjectENValid)
            { return }

            if (!$scope.newChildSubjectForm || !$scope.newChildSubjectForm.$valid) {
                Extention.popError("لطفا اطلاعات موضوع زیر شاخه را به درستی وارد کنید.");
                return;
            }

            var data = { ParentID: $scope.subject.ID, ID: $scope.childSubject.ID, Title: $scope.childSubject.Title, TitleEN: $scope.childSubject.TitleEN };

            Extention.post("saveSubject", data)
                .then(function (res) {
                    if (res && res.Status == "success") {
                        Extention.toast({ status: "success", message: "با موفقیت ثبت شد!" });
                        $scope.childSubject = {};
                        $scope.showPanel();
                        $scope.getAllSubjects();
                    } else {
                        Extention.toast({ status: "error", message: "مشکل در ثبت کردن لطفا دوباره امتحان کنید." });
                    }
                });
        }

        $scope.deleteSubject = function (subjectID) {
            $scope.showPanel();
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