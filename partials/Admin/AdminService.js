angular.module('myApp').factory("AdminService", ['$http', 'Extention',
    function ($http, Extention) { // This service connects to our REST API

        var serviceBase = 'api/v1/';

        var obj = {};

        obj.saveNewPost = function (post) {
            Extention.setBusy(true);
            return $http.post(serviceBase + "savePost", post).then(function (results) {
                Extention.setBusy(false);
                return results.data;
            },
            function (err) {
                Extention.setBusy(false);
                return null;
            });
        };
        obj.deletePost = function (ID) {
            return $http.post(serviceBase + "deletePost", ID).then(function (results) {
                return results.data;
            });
        };

        obj.getAllAuthors = function () {
            Extention.setBusy(true);
            return $http.post(serviceBase + "getAllAuthors").then(function (results) {
                Extention.setBusy(false);
                return results.data;
            });
        };

        return obj;
}]);