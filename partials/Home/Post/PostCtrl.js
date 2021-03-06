﻿angular.module('myApp').controller('PostSingleCtrl', function ($scope, $rootScope, $routeParams, $location, $stateParams, Extention) {

    $scope.newComment = {};
    $scope.EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    Extention.post("getPostByID", { PostID: $stateParams.id }).then(function (res) {
        $scope.post = res;
    });

    Extention.post("getPostComments", { PostID: $stateParams.id }).then(function (res) {
        $scope.comments = res.Items;
    });
    
    $scope.gotAnswer = function(item) {
        Extention.scrollToElement('new-cm-form', -110);
        $scope.answerMode = true;
        $scope.commentParent = item;
        $scope.answerPersonName = (item.UserID) ? (item.FirstName + item.LastName) : item.Identity;
    }

    $scope.addComment = function () {
        if (!$rootScope.authenticated) {
            if (!$scope.newComment.userEmail) {
                Extention.popError('لطفا ایمیل خود را وارد کنید!');
                return;
            }
            if (!$scope.newComment.identity) {
                Extention.popError('لطفا نام خود را کامل تایپ کنید!');
                return;
            }
        }
        if ($scope.newComment.content.length < 2) {
            Extention.popError('طول نظر بایستی بزرگتر از 20 کاراکتر باشد !');
            return;
        }

        var httpBody = {
            PostID: $stateParams.id,
            Email: $scope.newComment.userEmail,
            Identity: $scope.newComment.identity,
            Content: $scope.newComment.content
        };

        if ($scope.answerMode) {
            httpBody.ParentID = $scope.commentParent.ID;
        }

        Extention.post("saveComment", httpBody).then(function (res) {
            if (res && res.Status == "success") {
                if (Extention.isAdmin()) {
                    Extention.popSuccess('نظر با موفقیت ثبت شد!');
                    Extention.post("getPostComments", { PostID: $stateParams.id }).then(function (res) {
                        $scope.comments = res.Items;
                    });
                }
                else
                    Extention.popSuccess('با تشکر از شما ، نظر شما پس از تایید نمایش داده خواهد شد.');
                $scope.newComment.content = "";
            } else {
                Extention.popError('خطا در سرور ، لطفا دوباره تلاش کنید');
            }
        });
    }
});