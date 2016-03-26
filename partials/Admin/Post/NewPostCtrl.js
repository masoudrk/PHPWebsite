angular.module('myApp').controller('NewPostCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data, AdminService, MainService) {

    $scope.subjectButtonText = "انتخاب نشده";

    $scope.subjects = [];
    $scope.authors = [];

    $scope.saveNewPost = function () {
        var post = {
            title: $scope.title,
            postContent: ($scope.postContent) ? $scope.postContent : "",
            postBrief: ($scope.postBrief) ? $scope.postBrief : "",
            authors: $scope.authors,
            subjects: $scope.subjects,
            releaseDate: $scope.releaseDateFull.gDate,
            writeDate: $scope.writeDateFull.gDate
        };
        AdminService.saveNewPost(post).then(function(res) {
            if (res) {
                Data.toast({ status: 'success', message: 'پست با موفقیت ثبت شد!' });
            } else {
                Data.toast({ status: 'error', message: 'مشکل در ثبت پست ، لطفا دوباره امتحان کنید.' });
            }
        });
    }

    $scope.getAllSubjects = function () {
        MainService.getAllSubjects().then(function (res) {
            $scope.subjects = res;
        });
    }
    $scope.getAllAuthors = function () {
        AdminService.getAllAuthors().then(function (res) {
            $scope.authors = res;
        });
    }

    $scope.getAllAuthors();
    $scope.getAllSubjects();
});