app.factory("MainService", ['$http', 'toaster',
    function ($http, toaster) { // This service connects to our REST API

        var serviceBase = 'api/v1/';

        var obj = {};

        obj.toast = function (data) {
            toaster.pop(data.status, "", data.message, 10000, 'trustedHtml');
        }

        obj.getAllPosts = function (q) {
            return $http.get(serviceBase + "getAllPosts").then(function (results) {
                return results.data;
            });
        };

        return obj;
}]);