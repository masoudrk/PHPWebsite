var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster', 'ngProgress', 'ui.bootstrap', 'ui.router', 'oc.lazyLoad']);

app.config([
    '$stateProvider', '$urlRouterProvider','$ocLazyLoadProvider',
    function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: true,
            events: true
        });
        
        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "partials/HomeRoot.html",
                controller: 'DefaultCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'DefaultCtrl.js',
                            'partials/Main/MainService.js']);
                    }]
                }
            })
            .state("home.home", {
                url: "home",
                views: {
                    "viewContent": {
                        templateUrl: "partials/Main/Main.html",
                        controller: 'MainCtrl'
                    },
                    "viewSidebar": {
                        templateUrl: "partials/DefaultSidebar.html"
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'partials/Main/MainCtrl.js']);
                    }]
                }
            })
            .state("home.post", {
                url: "post",
                views: {
                    "viewContent": {
                        templateUrl: "partials/Post/Post.html",
                        controller: 'PostCtrl'
                    },
                    "viewSidebar": {
                        templateUrl: "partials/DefaultSidebar.html"
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('partials/Post/PostCtrl.js');
                    }]
                }
            })
            .state("admin_root", {
                url: "/admin",
                templateUrl: "partials/Admin/AdminRoot.html",
                controller: 'AdminCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'partials/Admin/AdminCtrl.js']);
                    }]
                }
            })
            .state("admin_root.dashboard", {
                url: "/dashboard",
                views: {
                    "viewContent": {
                        templateUrl: "partials/Admin/AdminDashboard.html",
                        controller: 'AdminCtrl'
                    },
                    "viewSidebar": {
                        templateUrl: "partials/Admin/Sidebar.html"
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'partials/Admin/AdminCtrl.js']);
                    }]
                }
            })
            .state("admin_root.new_post", {
                url: "/new_post",
                views: {
                    "viewContent": {
                        templateUrl: "partials/Admin/Post/NewPost.html",
                        controller: 'NewPostCtrl'
                    },
                    "viewSidebar": {
                        templateUrl: "partials/Admin/Sidebar.html"
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('partials/Admin/AdminCtrl.js');
                    }]
                }
            });

        $urlRouterProvider.otherwise("/");
    }
]).run(function($rootScope, $location, Data, ngProgressFactory) {
    
    $rootScope.progressbar = ngProgressFactory.createInstance();

    $rootScope.$on("$stateChangeSuccess", function() {
        Data.setBusy(false);
    });

    $rootScope.$on("$stateChangeStart", function (event, next, current) {
        Data.setBusy(true);
        $rootScope.authenticated = false;
        Data.get('session').then(function (results) {

            if (next.url == '/') {
                $location.path("/home");
                return;
            }

            if (next.url == '/post' && !$rootScope.post) {
                $location.path("/");
            }

            if (results.UserID) {
                $rootScope.authenticated = true;
                $rootScope.user = {};
                $rootScope.user.UserID = results.UserID;
                $rootScope.user.lastName = results.LastName;
                $rootScope.user.firstName = results.FirstName;
            }

            if (next.url == '/admin') {
                if (!results.AdminID)
                    $location.path('/home');
                else
                    $location.path('/admin/dashboard');
            }
        });
    });
});

    //return angular.bootstrap(app);
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
//});

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