angular.module('myApp').controller('AllPostsCtrl', function ($scope, $rootScope, $timeout, $routeParams, $location, $http, Extention, ADMdtpConvertor) {

    $scope.pagingController = {};
    $scope.search = {};
    $scope.subjectButtonText = "انتخاب نشده";
    $scope.pagingController = {};
    $scope.posts = [];
    $scope.pagingParams = {};

    Extention.post("getAllSubjects", { arrenged: true }).then(function (res) {

        $scope.subjects = res;
    });

    $scope.trim = function (input) {
        var str = "";
        for (var i = 0; i < input.length; i++) {
            if (i === input.length - 1)
                str += (input[i].ID);
            else
                str += (input[i].ID + ',');
        }
        return str;
    }

    $scope.getTagsSearchResult = function () {
        $timeout(function () {
            if ($scope.search.searchTags && $scope.search.searchTags.length != 0)
                $scope.pagingParams.searchTags = $scope.trim($scope.search.searchTags);
            else
                $scope.pagingParams.searchTags = undefined;

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

            $scope.pagingParams.fromDate = $scope.pagingParams.fromDate = undefined;

            if ($scope.fromDateFull)
                $scope.pagingParams.fromDate = convertDateToISO($scope.fromDateFull);

            if ($scope.toDateFull)
                $scope.pagingParams.toDate = convertDateToISO($scope.toDateFull);

            $scope.pagingController.update();
        },400);
    }


    $scope.deletePost = function(post) {
        Extention.setBusy(true);
        Extention.post('deletePost', {PostID : post.ID }).then(function (res) {
            Extention.setBusy(false);
            if (res) {
                $scope.pagingController.update();
                Extention.toast({ status: 'success', message: 'پست با موفقیت حذف شد!' });
            }
            else
                Extention.toast({ status: 'error', message: 'مشکل در حذف پست ، لطفا دوباره امتحان کنید.' });
        });
    }
});