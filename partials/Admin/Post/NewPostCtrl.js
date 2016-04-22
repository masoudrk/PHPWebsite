angular.module('myApp').controller('NewPostCtrl', function ($scope, $rootScope, $routeParams, $state, $stateParams, $uibModal, hotkeys, Extention) {

    $scope.subjectButtonText = "انتخاب نشده";

    $scope.post = {};

    $scope.subjects = [];
    $scope.authors = [];
    $scope.postID = $stateParams.id;
    $scope.editMode = $scope.postID !== "";
    $scope.asyncTasks = 2;

    hotkeys.bindTo($scope).add({
        combo: 'ctrl+shift+s',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function () {
            $scope.saveNewPost();
        }
    });

    Extention.post("getAllSubjects", { arrenged: true }).then(function (res) {
        $scope.subjects = res;
        $scope.getPost();
    });

    Extention.post("getAllAuthors").then(function (res) {
        $scope.authors = res;
        $scope.getPost();
    });

    $scope.getPost = function () {
        $scope.asyncTasks--;
        if ($scope.asyncTasks !== 0) {
            return;
        }
        if ($scope.editMode) {
            Extention.post("getPostByID", { PostID: $scope.postID }).then(function (res) {
                
                $scope.post.obj = res;
                $scope.post.postContent = res.Content;
                $scope.post.title = res.Title;
                $scope.post.postBrief = res.BriefContent;
                $scope.post.authors = res.Authors;
                $scope.post.subjects = res.Subjects;
                $scope.post.releaseDate = res.ReleaseDate;
                $scope.post.writeDate = res.WriteDate;
                $scope.post.hidden = (res.Hidden == 1) ? true : false;
                $scope.post.enableComment = (res.EnableComment == 1) ? true : false;

                $scope.image = {};
                $scope.image.FullPath = res.FullPath;
                $scope.image.ID = res.ImageID;

                var i, j;
                for (i = 0; i < $scope.post.authors.length; i++) {
                    for (j = 0; j < $scope.authors.length; j++) {
                        if ($scope.post.authors[i].AdminID === $scope.authors[j].AdminID) {
                            $scope.selectAuthors.push($scope.authors[j]);
                            $scope.authors[j].author = true;
                        }
                    }
                }
                for (i = 0; i < $scope.post.subjects.length; i++) {
                    for (j = 0; j < $scope.subjects.length; j++) {
                        if ($scope.post.subjects[i].ID === $scope.subjects[j].ID) {
                            $scope.selectAuthors.push($scope.subjects[j]);
                            $scope.subjects[j].subject = true;
                        }
                    }
                }
            });

        }
    }

    $scope.saveNewPost = function () {
        if (!$scope.image || !$scope.image.ID) {
            Extention.toast({ status: 'error', message: 'خطا ! لطفا یک تصویر انتخاب کنید.' });
        }

        var post = {
            title: $scope.post.title,
            postContent: ($scope.post.postContent) ? $scope.post.postContent : "",
            postBrief: ($scope.post.postBrief) ? $scope.post.postBrief : "",
            authors: $scope.selectAuthors,
            subjects: $scope.selectSubjects,
            releaseDate: $scope.releaseDateFull.gDate,
            writeDate: $scope.writeDateFull.gDate,
            imageID: $scope.image.ID,
            hidden: $scope.post.hidden,
            enableComment: $scope.post.enableComment
        };

        if ($scope.editMode)
            post.postID = $scope.postID;

        Extention.post("savePost",post).then(function (res) {
            if (res) {
                Extention.toast({ status: 'success', message: 'پست با موفقیت ثبت شد!' });
                if(!$scope.editMode)
                    $state.go("admin_root.new_post", { id: res }, { reload: true });
            } else {
                Extention.toast({ status: 'error', message: 'مشکل در ثبت پست ، لطفا دوباره امتحان کنید.' });
            }
        });
    }

    $scope.openGalleryModal = function() {

        var uibModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'partials/Admin/Modals/Gallery/GalleryTemplate.html',
            controller: 'GalleryModalCtrl',
            size: 'lg',
            resolve: {
                fileTypes: function () {
                    return "'jpg/jpeg','png'";
                },
                isMedia: function () {
                    return 1;
                },
                typesDesc: function() {
                    return "فایل تصویری";
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