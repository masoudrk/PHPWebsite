 
angular.module('myApp').controller('MainCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data, MainService) {

    $scope.pagingParams =
    {
        filter: "hey"
    };

    $scope.user = {};
    $scope.posts = [];

    $scope.subject = {};
    $scope.subject.bases = [];

    //$scope.getAllPosts = function () {
    //    Data.setBusy(true);
    //    MainService.getAllPosts(3,10)
    //    .then(function (result) {
    //        $scope.posts = result.Items;
    //        Data.setBusy(false);
    //    });
    //}

    //$scope.getAllPosts();

    $scope.postMore = function (post) {
        //Data.toast({ message: 'hellio', status: 'info' });
        $location.path("/post");
        $rootScope.post = post;
        Data.scrollTo(500);
        //toaster.pop({
        //    type: 'error',
        //    title: 'Title text',
        //    body: 'Body text',
        //    showCloseButton: true,
        //    closeHtml: '<button>Close</button>'
        //});
    }

});

    