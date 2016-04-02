angular.module('myApp').controller('NewPostCtrl', function ($scope, $rootScope, $routeParams, $location, $stateParams, $uibModal, Extention, AdminService, MainService,PostService) {

    $scope.subjectButtonText = "انتخاب نشده";

    $scope.subjects = [];
    $scope.authors = [];

    $scope.postID = $stateParams.id;
    $scope.editMode = $scope.postID !== "";

    $scope.getAllSubjects = function () {
        Extention.post("getAllSubjects",{arrenged: true}).then(function (res) {
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
            authors: $scope.selectAuthors,
            subjects: $scope.selectSubjects,
            releaseDate: $scope.releaseDateFull.gDate,
            writeDate: $scope.writeDateFull.gDate,
            imageID : $scope.image.ID
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

    $scope.openGalleryModal = function() {

        var uibModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'partials/Modals/Gallery/GalleryTemplate.html',
            controller: function ($uibModalInstance, $scope, mediaType) {

                $scope.pagingParams = {
                    imageType : ""
                }

                $scope.selectMedia = function (item) {
                    $uibModalInstance.close(item);
                };
            },
            size: 'lg',
            resolve: {
                mediaType: function () {
                    return ["jpeg/jpg","png"];
                }
            }
        });

        uibModalInstance.result.then(function (image) {
            $scope.image  = image;
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    }
});