angular.module('myApp').factory("AdminService", ['$http','Data',
    function ($http,Data) { // This service connects to our REST API

        var serviceBase = 'api/v1/';

        var obj = {};

        obj.saveNewPost = function (post) {
            Data.setBusy(true);
            return $http.post(serviceBase + "savePost", post).then(function (results) {
                Data.setBusy(false);
                return results.data;
            });
        };

        obj.getAllAuthors = function () {
            Data.setBusy(true);
            return $http.post(serviceBase + "getAllAuthors").then(function (results) {
                Data.setBusy(false);
                return results.data;
            });
        };

        return obj;
}]);