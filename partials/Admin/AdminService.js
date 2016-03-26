angular.module('myApp').factory("AdminService", ['$http', 'toaster',
    function ($http, toaster) { // This service connects to our REST API

        var serviceBase = 'api/v1/';

        var obj = {};
        obj.saveNewPost = function (post) {
            return $http.post(serviceBase + "savePost", post).then(function (results) {
                return results.data;
            });
        };
        return obj;
}]);