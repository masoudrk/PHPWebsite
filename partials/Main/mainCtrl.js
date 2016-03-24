app.controller('MainCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data, MainService) {

    $rootScope.progressbar.start();

    $scope.user = {};
    $scope.posts = [];

    $scope.subject = {};
    $scope.subject.bases = [];

    $scope.getAllPosts = function () {
        MainService.getAllPosts()
           .then(function (result) {
               $scope.posts = result;
           });
    }

    $scope.getAllPosts();

    $scope.postClicked = function (post) {
        Data.toast({ message: 'hellio', status: 'info' });
        $location.path("/post");
        $rootScope.post = post;
        //toaster.pop({
        //    type: 'error',
        //    title: 'Title text',
        //    body: 'Body text',
        //    showCloseButton: true,
        //    closeHtml: '<button>Close</button>'
        //});
    }

});