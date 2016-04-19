angular.module('myApp').factory("MainService", ['$http', 'toaster',
    function ($http, toaster) { // This service connects to our REST API

        var serviceBase = 'api/v1/';

        var obj = {};

        obj.toast = function (data) {
            toaster.pop(data.status, "", data.message, 10000, 'trustedHtml');
        }

        obj.getAllBaseSubjects = function (q) {
            return $http.get(serviceBase + "getAllBaseSubjects").then(function (results) {
                return results.data;
            });
        };
        obj.getAllSubjects = function (q) {
            return $http.post(serviceBase + "getAllSubjects").then(function (results) {
                return results.data;
            });
        };

        return obj;
}]);