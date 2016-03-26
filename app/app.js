var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster', 'ngProgress', 'ui.bootstrap', 'ui.router', 'oc.lazyLoad', 'textAngular']);

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
                            'partials/Admin/AdminCtrl.js',
                            'partials/Admin/AdminService.js']);
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
                        return $ocLazyLoad.load('partials/Admin/Post/NewPostCtrl.js');
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
