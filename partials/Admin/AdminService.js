angular.module('myApp').factory("AdminService", ['$http',
    function ($http) { // This service connects to our REST API

        var serviceBase = 'api/v1/';

        var obj = {};

        obj.saveNewPost = function (post) {
            return $http.post(serviceBase + "savePost", post).then(function (results) {
                return results.data;
            });
        };

        obj.getAllAuthors = function () {
            return $http.post(serviceBase + "getAllAuthors").then(function (results) {
                return results.data;
            });
        };

        return obj;
}]);