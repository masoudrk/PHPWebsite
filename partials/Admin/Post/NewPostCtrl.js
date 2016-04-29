angular.module('myApp').controller('NewPostCtrl', function ($scope, $rootScope, $routeParams, $state, $stateParams, $uibModal, hotkeys, Extention,ADMdtpConvertor) {

    $scope.subjectButtonText = "انتخاب نشده";
    $scope.isCollapsed = false;
    $scope.isCollapsedEN = false;
    $scope.post = {};

    $scope.subjects = [];
    $scope.authors = [];
    $scope.postID = $stateParams.id;
    $scope.editMode = $scope.postID !== "";
    $scope.asyncTasks = 2;

    $scope.select = {};

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

        //var getPersianDate = function (inputDate) {
        //    var date = moment(inputDate);
        //    jDate = ADMdtpConvertor.toJalali(date);
        //    return jDate.jYear() + '/' + jDate.jMonths() + '/' + jDate.jDates();
        //}

        if ($scope.editMode) {
            Extention.post("getPostByIDAdmin", { PostID: $scope.postID }).then(function (res) {

                //var date = getPersianDate(res.ReleaseDate);

                $scope.post.obj = res;
                $scope.post.postContent = res.Content;
                $scope.post.postBrief = res.BriefContent;
                $scope.post.title = res.Title;
                $scope.post.postContentEN = res.ContentEN;
                $scope.post.postBriefEN = res.BriefContentEN;
                $scope.post.titleEN = res.TitleEN;
                $scope.post.authors = res.Authors;
                $scope.post.subjects = res.Subjects;
                $scope.post.releaseDate = res.ReleaseDate.replace(/-/g, "/");
                $scope.post.writeDate = res.WriteDate.replace(/-/g, "/");
                $scope.post.hidden = (res.Hidden == 1) ? true : false;
                $scope.post.enableComment = (res.EnableComment == 1) ? true : false;
                $scope.post.enableEnglish = (res.EnableEnglish == 1) ? true : false;

                $scope.image = {};
                $scope.image.FullPath = res.FullPath;
                $scope.image.ID = res.ImageID;

                $scope.select.selectSubjects = $scope.post.subjects;
                $scope.select.selectAuthors = $scope.post.authors;
            });

        }
    }

    $scope.saveNewPost = function () {

        var format = function (input) {
            return ((input < 10) ? '0' + input : input);
        }

        var convertDateToISO = function (inputFullDate) {
            if (inputFullDate.calType == "jalali") {
                var t = ADMdtpConvertor.toGregorian(inputFullDate.year, inputFullDate.month, inputFullDate.day);

                return t.year + '-' + format(t.month) + '-' + format(t.day) + ' ' +
                    format(inputFullDate.hour) + ':' + format(inputFullDate.minute);
            } else {
                return inputFullDate.year + '-' + format(inputFullDate.month) + '-' + format(inputFullDate.day) + ' ' +
                    format(inputFullDate.hour) + ':' + format(inputFullDate.minute);
            }
        }

        var releaseDate, writeDate;
        releaseDate = convertDateToISO($scope.releaseDateFull);
        writeDate = convertDateToISO($scope.writeDateFull);
        
        if (!$scope.image || !$scope.image.ID) {
            Extention.toast({ status: 'error', message: 'خطا ! لطفا یک تصویر انتخاب کنید.' });
        }

        var post = {
            title: $scope.post.title,
            postContent: ($scope.post.postContent) ? $scope.post.postContent : "",
            postBrief: ($scope.post.postBrief) ? $scope.post.postBrief : "",
            titleEN: $scope.post.titleEN,
            postContentEN: ($scope.post.postContentEN) ? $scope.post.postContentEN : "",
            postBriefEN: ($scope.post.postBriefEN) ? $scope.post.postBriefEN : "",
            authors: $scope.select.selectAuthors,
            subjects: $scope.select.selectSubjects,
            releaseDate: releaseDate,
            writeDate: writeDate,
            imageID: $scope.image.ID,
            hidden: $scope.post.hidden,
            enableComment: $scope.post.enableComment,
            enableEnglish: $scope.post.enableEnglish
        };

        if ($scope.editMode)
            post.postID = $scope.postID;

        Extention.post("savePost",post).then(function (res) {
            if (res && res.Status == 'success') {
                Extention.toast({ status: 'success', message: 'پست با موفقیت ثبت شد!' });
                if(!$scope.editMode)
                    $state.go("admin_root.new_post", { id: res.PostID }, { reload: true });
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