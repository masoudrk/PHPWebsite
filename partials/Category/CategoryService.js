angular.module('myApp').factory("CategoryService", ['$http', 'toaster',
    function ($http, toaster) { // This service connects to our REST API

        var serviceBase = 'api/v1/';

        var obj = {};

        obj.getPostByID = function (postID) {
            return $http.post(serviceBase + "getPostByID", { PostID: postID }).then(function (results) {
                return results.data;
            });
        };

        obj.getCategoryByID = function (catID) {
            return $http.post(serviceBase + "getSubjectByID", { CatID: catID }).then(function (results) {
                return results.data;
            });
        };


        return obj;
}]);