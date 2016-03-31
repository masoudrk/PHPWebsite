angular.module('myApp').controller('NewPostCtrl', function ($scope, $rootScope, $routeParams, $location, $stateParams, $http, Extention, AdminService, MainService,PostService) {

    $scope.subjectButtonText = "انتخاب نشده";

    $scope.subjects = [];
    $scope.authors = [];

    $scope.postID = $stateParams.id;
    $scope.editMode = $scope.postID !== "";

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

    if ($scope.editMode) {

        PostService.getPostByID($scope.postID).then(function (res) {
            $scope.post = res;
            $scope.postContent = res.Content;
            $scope.title = res.Title;
            $scope.postBrief = res.BriefContent;
            $scope.authors = res.Authors;
            $scope.subjects = res.Subjects;
            $scope.releaseDate = res.ReleaseDate;
            $scope.writeDate = res.WriteDate;
        });
    }

    $scope.getAllAuthors();
    $scope.getAllSubjects();

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

        if ($scope.editMode)
            post.postID = $scope.postID;

        AdminService.saveNewPost(post).then(function (res) {
            if (res) {
                Extention.toast({ status: 'success', message: 'پست با موفقیت ثبت شد!' });
            } else {
                Extention.toast({ status: 'error', message: 'مشکل در ثبت پست ، لطفا دوباره امتحان کنید.' });
            }
        });
    }
});