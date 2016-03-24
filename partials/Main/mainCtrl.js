app.controller('MainCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data, MainService) {

    $scope.user = {};
    $scope.posts = [];

    $scope.images = [{
        src: 'content/img/img1.jpg',
        title: 'Pic 1'
    }, {
        src: 'content/img/img3.jpg',
        title: 'Pic 3'
    }, {
        src: 'content/img/img2.jpg',
        title: 'Pic 2'
    }];

    Data.get('session').then(function (results) {
        if (results.uid) {
            user = results;
            console.log("Authorized");
        } else {
            user = results;
            console.log("No Auth");
        }
    });


    $scope.getAllPosts = function () {
         MainService.getAllPosts()
            .then(function(result) {
                $scope.posts = result;
             });
    }
    $scope.getAllPosts();
});