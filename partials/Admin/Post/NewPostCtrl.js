angular.module('myApp').controller('NewPostCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data, AdminService) {

    $scope.saveNewPost = function() {
        var post = {
            title: $scope.title,
            postContent: $scope.postContent,
            postBrief : $scope.postBrief,
        };
        AdminService.saveNewPost(post);
    }
});