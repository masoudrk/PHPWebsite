angular.module('myApp').factory("MainService", ['$http', 'toaster',
    function ($http, toaster) { // This service connects to our REST API

        var serviceBase = 'api/v1/';

        var obj = {};

        obj.toast = function (data) {
            toaster.pop(data.status, "", data.message, 10000, 'trustedHtml');
        }

        obj.getAllPosts = function (pageIndex,pageSize) {
            return $http.post(serviceBase + "getAllPosts", { pageIndex: pageIndex, pageSize: pageSize })
                .then(function (results) {
                return results.data;
            });
        };

        obj.getAllBaseSubjects = function (q) {
            return $http.get(serviceBase + "getAllBaseSubjects").then(function (results) {
                return results.data;
            });
        };
        obj.getAllSubjects = function (q) {
            return $http.get(serviceBase + "getAllSubjects").then(function (results) {
                return results.data;
            });
        };

        return obj;
}]);