define(["angularAMD", "angular", "ng-route", "ui-router", "ng-animate", "toaster", "ng-progress", "ui-bootstrap"], function (angularAMD) {
    var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster', 'ngProgress', 'ui.bootstrap', 'ui.router']);

    app.config([
        '$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state("root", {
                    url: "/",
                    views:  {
                        "viewContent" : angularAMD.route( {
                            templateUrl: "partials/Main/Main.html",
                            controllerUrl: 'MainCtrl'
                        }),
                        "viewSidebar" : angularAMD.route( {
                            templateUrl: "partials/DefaultSidebar.html",
                            controllerUrl: 'DefaultCtrl'
                        })
                    }
                });

            $urlRouterProvider.otherwise("/");
        }
    ]);
    return angularAMD.bootstrap(app);
    //app.config(function($stateProvider, $urlRouterProvider) {
    //    //
    //    // For any unmatched url, redirect to /state1
    //    $urlRouterProvider.otherwise("/");
    //    //
    //    // Now set up the states
    //    $stateProvider
    //        .state('main', {
    //            url: "/",
    //            views: {
    //                "viewContent": {
    //                    templateUrl: "partials/Main/Main.html",
    //                    controller: 'MainCtrl'
    //                },
    //                "viewSidebar": {
    //                    templateUrl: "partials/DefaultSidebar.html"
    //                }
    //            }
    //        }).state('post', {
    //            url: "/post",
    //            views: {
    //                "viewContent": {
    //                    templateUrl: "partials/Post/Post.html",
    //                    controller: 'PostCtrl'
    //                },
    //                "viewSidebar": {
    //                    templateUrl: "partials/DefaultSidebar.html"
    //                }
    //            }
    //        }).state('admin', {
    //            url: "/admin",
    //            views: {
    //                "viewContent": {
    //                    templateUrl: "partials/Admin/Admin.html",
    //                    controller: 'AdminCtrl'
    //                },
    //                "viewSidebar": {
    //                    templateUrl: "partials/Admin/Sidebar.html"
    //                }
    //            }
    //        }).state('admin_post', {
    //            url: "/admin/new_post",
    //            views: {
    //                "viewContent": {
    //                    templateUrl: "partials/Admin/Admin.html",
    //                    controller: 'AdminCtrl'
    //                },
    //                "viewSidebar": {
    //                    templateUrl: "partials/Admin/Sidebar.html"
    //                }
    //            }
    //        });
    //}).run(function($rootScope, $location, Data, ngProgressFactory) {

    //    $rootScope.progressbar = ngProgressFactory.createInstance();

    //    $rootScope.$on("$routeChangeSuccess", function() {
    //        Data.setBusy(false);
    //    });

    //    $rootScope.$on("$routeChangeStart", function(event, next, current) {
    //        Data.setBusy(true);
    //        $rootScope.authenticated = false;
    //        Data.get('session').then(function(results) {
    //            var nextUrl = next.$$route.originalPath;
    //            if (nextUrl == '/post' && !$rootScope.post) {
    //                $location.path("/");
    //            }

    //            if (results.UserID) {
    //                $rootScope.authenticated = true;
    //                $rootScope.user = {};
    //                $rootScope.user.UserID = results.UserID;
    //                $rootScope.user.lastName = results.LastName;
    //                $rootScope.user.firstName = results.FirstName;
    //            }

    //            var nextUrl = next.$$route.originalPath;
    //            if (nextUrl == '/admin' && !results.AdminID) {
    //                $location.path("/");
    //            }
    //        });
    //    });
    //});
});

//app.config(['$routeProvider',
//  function ($routeProvider) {
//        $routeProvider.
//            when('/login', {
//                title: 'Login',
//                templateUrl: 'partials/login.html',
//                controller: 'authCtrl'
//            })
//            .when('/logout', {
//                title: 'Logout',
//                templateUrl: 'partials/login.html',
//                controller: 'logoutCtrl'
//            })
//            .when('/signup', {
//                title: 'Signup',
//                templateUrl: 'partials/signup.html',
//                controller: 'authCtrl'
//            })
//            .when('/dashboard', {
//                title: 'Dashboard',
//                templateUrl: 'partials/dashboard.html',
//                controller: 'authCtrl'
//            })
//            .when('/admin', {
//                title: 'Admin',
//                templateUrl: 'partials/Admin/Admin.html',
//                controller: 'AdminCtrl'
//            })
//            .when('/', {
//                title: 'Main',
//                templateUrl: 'partials/Main/Main.html',
//                controller: 'MainCtrl',
//                role: '0'
//            })
//            .when('/post', {
//                title: 'Post',
//                templateUrl: 'partials/Post/Post.html'
//                //resolve: resolveController('partials/Post/PostCtrl.js')
//            })
//            .otherwise({
//                redirectTo: '/'
//            });
//  }])