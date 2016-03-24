var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster' ,'ngProgress' ,'ui.bootstrap']); 

app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
            when('/login', {
                title: 'Login',
                templateUrl: 'partials/login.html',
                controller: 'authCtrl'
            })
            .when('/logout', {
                title: 'Logout',
                templateUrl: 'partials/login.html',
                controller: 'logoutCtrl'
            })
            .when('/signup', {
                title: 'Signup',
                templateUrl: 'partials/signup.html',
                controller: 'authCtrl'
            })
            .when('/dashboard', {
                title: 'Dashboard',
                templateUrl: 'partials/dashboard.html',
                controller: 'authCtrl'
            })
            .when('/', {
                title: 'Main',
                templateUrl: 'partials/Main/Main.html',
                controller: 'MainCtrl',
                role: '0'
            })
            .when('/post', {
                title: 'Post',
                templateUrl: 'partials/Post/Post.html'
            })
            .otherwise({
                redirectTo: '/'
            });
  }])
    .run(function ($rootScope, $location, Data, ngProgressFactory) {

        $rootScope.progressbar = ngProgressFactory.createInstance();

        $rootScope.$on("$routeChangeSuccess", function () {
            Data.setBusy(false);
        });

        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            Data.setBusy(true);
            $rootScope.authenticated = false;
            Data.get('session').then(function (results) {
                var nextUrl = next.$$route.originalPath;
                if (nextUrl == '/post' && !$rootScope.post) {
                    $location.path("/");
                }

                if (results.UserID) {
                    $rootScope.authenticated = true;
                    $rootScope.user = {};
                    $rootScope.user.UserID = results.UserID;
                    $rootScope.user.lastName = results.LastName;
                    $rootScope.user.firstName = results.FirstName;
                } 
                //else {
                //    var nextUrl = next.$$route.originalPath;
                //    if (nextUrl == '/signup' || nextUrl == '/login') {

                //    } else {
                //        $location.path("/login");
                //    }
                //}
            });
        });
    });