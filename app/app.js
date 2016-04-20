var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster', 'ui.bootstrap', 'ui.router', 'oc.lazyLoad', 'angular-confirm', 'ADM-dateTimePicker', 'ngFileUpload', 'ui.select', '720kb.tooltips', 'ngCkeditor', 'as.sortable', 'ui.navbar', 'treasure-overlay-spinner']);
//, 'angular-imagefit'
app.config([
    '$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', 'tooltipsConfProvider', 'ADMdtpProvider',
    function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, tooltipsConfProvider, ADMdtp) {

        tooltipsConfProvider.configure({
            'smart': true,
            'size': 'small',
            'speed': 'fast'
        });

        ADMdtp.setOptions({
            calType: 'jalali',
            format: 'YYYY/MM/DD hh:mm',
            default: 'today'
        });

        $ocLazyLoadProvider.config({
            debug: true,
            events: true
        });
        
        $stateProvider
            // Home persian states
            .state("home", {
                url: "/",
                templateUrl: "partials/Home/HomeRoot.html",
                controller: 'DefaultCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'partials/Home/DefaultCtrl.js',
                            'partials/Home/Main/MainService.js']);
                    }]
                }
            })
            .state("home.home", {
                url: "home",
                views: {
                    "viewContent": {
                        templateUrl: "partials/Home/Main/Main.html",
                        controller: 'MainCtrl'
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'partials/Home/Main/MainCtrl.js',
                            'app/directives/Post/post.js'
                        ]);
                    }]
                }
            })
            .state("home.about", {
                url: "about",
                views: {
                    "viewContent": {
                        templateUrl: "partials/Home/About/About.html",
                        controller: 'AboutCtrl'
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'partials/Home/About/AboutCtrl.js']);
                    }]
                }
            })
            .state("home.contact_us", {
                url: "contact_us",
                views: {
                    "viewContent": {
                        templateUrl: "partials/Home/About/About.html",
                        controller: 'AboutCtrl'
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'partials/Home/About/AboutCtrl.js']);
                    }]
                }
            })
            .state("home.post", {
                url: "post/:id",
                views: {
                    "viewContent": {
                        templateUrl: "partials/Home/Post/Post.html",
                        controller: 'PostCtrl'
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['partials/Home/Post/PostCtrl.js']);
                    }]
                }
            })
            .state("home.cat", {
                url: "cat/:id",
                views: {
                    "viewContent": {
                        templateUrl: "partials/Home/Category/Category.html",
                        controller: 'CategoryCtrl'
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'partials/Home/Category/CategoryCtrl.js',
                            'app/directives/Post/post.js',
                            'partials/Home/Category/CategoryService.js']);
                    }]
                }
            })
            // Home english states
            .state("homeEN", {
                url: "/en/",
                templateUrl: "partials/HomeEN/HomeRootEN.html",
                controller: 'DefaultCtrlEN',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'partials/HomeEN/DefaultCtrl.js', 'app/directives/MenuEN/menu.js']);
                    }]
                }
            })
            .state("homeEN.home", {
                url: "home",
                views: {
                    "viewContent": {
                        templateUrl: "partials/HomeEN/Main/Main.html",
                        controller: 'MainCtrlEN'
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'partials/HomeEN/Main/MainCtrl.js',
                            'app/directives/Post/post.js'
                        ]);
                    }]
                }
            })
            .state("homeEN.about", {
                url: "about",
                views: {
                    "viewContent": {
                        templateUrl: "partials/HomeEN/About/About.html",
                        controller: 'AboutCtrl'
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'partials/HomeEN/About/AboutCtrl.js']);
                    }]
                }
            })
            .state("homeEN.contact_us", {
                url: "contact_us",
                views: {
                    "viewContent": {
                        templateUrl: "partials/HomeEN/About/About.html",
                        controller: 'AboutCtrl'
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'partials/HomeEN/About/AboutCtrl.js']);
                    }]
                }
            })
            .state("homeEN.post", {
                url: "post/:id",
                views: {
                    "viewContent": {
                        templateUrl: "partials/HomeEN/Post/Post.html",
                        controller: 'PostCtrl'
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['partials/HomeEN/Post/PostCtrl.js']);
                    }]
                }
            })
            .state("homeEN.cat", {
                url: "cat/:id",
                views: {
                    "viewContent": {
                        templateUrl: "partials/HomeEN/Category/Category.html",
                        controller: 'CategoryCtrl'
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'partials/HomeEN/Category/CategoryCtrl.js',
                            'partials/HomeEN/Category/CategoryService.js',
                            'app/directives/Post/post.js']);
                    }]
                }
            })
            // User persian states
            .state("user_root", {
                url: "/user",
                templateUrl: "partials/User/UserRoot.html",
                controller: 'UserCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['partials/User/UserCtrl.js']);
                    }]
                }
            })
            .state("user_root.dashboard", {
                url: "/dashboard",
                views: {
                    "viewContent": {
                        templateUrl: "partials/User/UserDashboard.html",
                        controller: 'UserCtrl'
                    },
                    "viewSidebar": {
                        templateUrl: "partials/User/Sidebar.html"
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'partials/User/UserCtrl.js']);
                    }]
                }
            })
            .state("user_root.profile", {
                url: "/profile",
                views: {
                    "viewContent": {
                        templateUrl: "partials/User/Profile/Profile.html",
                        controller: 'ProfileCtrl'
                    },
                    "viewSidebar": {
                        templateUrl: "partials/User/Sidebar.html"
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['partials/User/Profile/ProfileCtrl.js']);
                    }]
                }
            })
            // Admin states
            .state("admin_root", {
                url: "/admin",
                templateUrl: "partials/Admin/AdminRoot.html",
                controller: 'AdminCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['partials/Admin/AdminCtrl.js']);
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
                url: "/new_post/:id",
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
                        return $ocLazyLoad.load([
                            'partials/Admin/Post/NewPostCtrl.js',
                            'partials/Modals/Gallery/GalleryModalCtrl.js',
                            'app/directives/MultiSelectDropDown/checkbox-drop-down.js']);
                    }]
                }
            })
            .state("admin_root.all_posts", {
                url: "/all_posts",
                views: {
                    "viewContent": {
                        templateUrl: "partials/Admin/Post/AllPosts.html",
                        controller: 'AllPostsCtrl'
                    },
                    "viewSidebar": {
                        templateUrl: "partials/Admin/Sidebar.html"
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'partials/Admin/Post/AllPostsCtrl.js']);
                    }]
                }
            })
            .state("admin_root.new_page", {
                url: "/new_page/:id",
                views: {
                    "viewContent": {
                        templateUrl: "partials/Admin/Page/NewPage.html",
                        controller: 'NewPageCtrl'
                    },
                    "viewSidebar": {
                        templateUrl: "partials/Admin/Sidebar.html"
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'partials/Admin/Page/NewPageCtrl.js',
                            'partials/Modals/Gallery/GalleryModalCtrl.js',
                            'app/directives/MultiSelectDropDown/checkbox-drop-down.js']);
                    }]
                }
            })
            .state("admin_root.all_pages", {
                url: "/all_pages",
                views: {
                    "viewContent": {
                        templateUrl: "partials/Admin/Page/AllPages.html",
                        controller: 'AllPagesCtrl'
                    },
                    "viewSidebar": {
                        templateUrl: "partials/Admin/Sidebar.html"
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'partials/Admin/Page/AllPagesCtrl.js',
                            'app/directives/MultiSelectDropDown/checkbox-drop-down.js']);
                    }]
                }
            })
            .state("admin_root.gallery", {
                url: "/gallery",
                views: {
                    "viewContent": {
                        templateUrl: "partials/Admin/Gallery/Gallery.html",
                        controller: 'GalleryCtrl'
                    },
                    "viewSidebar": {
                        templateUrl: "partials/Admin/Sidebar.html"
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'partials/Admin/Gallery/GalleryCtrl.js',
                            //'js/ng-file-upload.min.js',
                            'js/angular-clipboard.js',
                            'app/directives/MultiSelectDropDown/checkbox-drop-down.js']);
                    }]
                }
            })
            .state("admin_root.subjects", {
                url: "/subjects",
                views: {
                    "viewContent": {
                        templateUrl: "partials/Admin/Subject/Subject.html",
                        controller: 'SubjectCtrl'
                    },
                    "viewSidebar": {
                        templateUrl: "partials/Admin/Sidebar.html"
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'partials/Admin/Subject/SubjectCtrl.js',
                            'app/directives/MultiSelectDropDown/checkbox-drop-down.js']);
                    }]
                }
            })
            .state("admin_root.comment", {
                url: "/comments",
                views: {
                    "viewContent": {
                        templateUrl: "partials/Admin/Comment/Comment.html",
                        controller: 'CommentCtrl'
                    },
                    "viewSidebar": {
                        templateUrl: "partials/Admin/Sidebar.html"
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'partials/Admin/Comment/CommentCtrl.js',
                            'app/directives/MultiSelectDropDown/checkbox-drop-down.js']);
                    }]
                }
            })
            .state("admin_root.users", {
                url: "/users",
                views: {
                    "viewContent": {
                        templateUrl: "partials/Admin/Users/Users.html",
                        controller: 'UsersCtrl'
                    },
                    "viewSidebar": {
                        templateUrl: "partials/Admin/Sidebar.html"
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'partials/Admin/Users/UsersCtrl.js',
                            'app/directives/MultiSelectDropDown/checkbox-drop-down.js']);
                    }]
                }
            })
            .state("admin_root.setting", {
                url: "/setting",
                views: {
                    "viewContent": {
                        templateUrl: "partials/Admin/Setting/Setting.html",
                        controller: 'SettingCtrl'
                    },
                    "viewSidebar": {
                        templateUrl: "partials/Admin/Sidebar.html"
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'partials/Admin/Setting/SettingCtrl.js',
                            'app/directives/MultiSelectDropDown/checkbox-drop-down.js']);
                    }]
                }
            })
            .state("admin_root.slider", {
                url: "/slider",
                views: {
                    "viewContent": {
                        templateUrl: "partials/Admin/Slider/Slider.html",
                        controller: 'SliderCtrl'
                    },
                    "viewSidebar": {
                        templateUrl: "partials/Admin/Sidebar.html"
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'partials/Admin/Slider/SliderCtrl.js',
                            'partials/Modals/Gallery/GalleryModalCtrl.js',
                            'app/directives/MultiSelectDropDown/checkbox-drop-down.js']);
                    }]
                }
            })
            .state("admin_root.profile", {
                url: "/profile",
                views: {
                    "viewContent": {
                        templateUrl: "partials/Admin/Profile/Profile.html",
                        controller: 'ProfileCtrl'
                    },
                    "viewSidebar": {
                        templateUrl: "partials/Admin/Sidebar.html"
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'partials/Admin/Profile/ProfileCtrl.js',
                            'partials/Modals/Gallery/GalleryModalCtrl.js',
                            'app/directives/MultiSelectDropDown/checkbox-drop-down.js']);
                    }]
                }
            });

        $urlRouterProvider.when('', '/home');
       // $urlRouterProvider.otherwise("/");
    }
]).run(function ($rootScope, $state, $location, Extention) {


    $rootScope.spinner = { active: false };

    $rootScope.$on("$stateChangeSuccess", function() {
        Extention.setBusy(false);
    });

    $rootScope.$on("$stateChangeStart", function (event, next, current) {
        Extention.setBusy(true);
        $rootScope.authenticated = false;
        Extention.get('session').then(function (results) {

            //if (next.url == '/') {
            //    $state.go("home.home");
            //    return;
            //}

            if (next.url == '/admin') {
                $state.go("admin_root.dashboard");
                return;
            }

            if (results.UserID) {
                $rootScope.authenticated = true;
                $rootScope.user = {};
                $rootScope.user.UserID = results.UserID;
                $rootScope.user.lastName = results.LastName;
                $rootScope.user.firstName = results.FirstName;
                
                if (results.AdminID)
                    $rootScope.isAdmin = true;
            }

            if (next.name.indexOf("en") > -1) {
                $rootScope.lang = 'en';
            } else {
                $rootScope.lang = 'fa';
            }
            
            if (next.name.indexOf("admin_root") > -1) {
                if (!results.AdminID)
                    $state.go("home.home");

            }else if (next.name.indexOf("user_root") > -1) {
                if (!results.UserID)
                    $state.go("home.home");
            }
        });
    });
});

app.filter('jalaliDate', function () {
    return function (inputDate, format) {
        var date = moment(inputDate);
        return date.fromNow() + " " + date.format(format);
    }
});

app.filter('subString', function () {
    return function (text, length) {
        if (text&&text.length > length) {
            return text.substr(0, length) + "...";
        }
        return text;
    }
});

app.filter('split', function() {
    return function (input, splitChar, feildName) {
        if (!input)
            return "";
        var str = "";
        for (var i = 0; i < input.length; i++) {
            if (i === input.length-1)
                str += (input[i][feildName]);
            else
                str += (input[i][feildName] + splitChar);
        }
        return str;
    }
});

app.directive('slideable', function () {
    return {
        restrict: 'C',
        compile: function (element, attr) {
            // wrap tag
            var contents = element.html();
            element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

            return function postLink(scope, element, attrs) {
                // default properties

                attrs.duration = (!attrs.duration) ? '1s' : attrs.duration;
                attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                element.css({
                    'overflow': 'hidden',
                    'height': '0px',
                    'transitionProperty': 'height',
                    'transitionDuration': attrs.duration,
                    'transitionTimingFunction': attrs.easing
                });
            };
        }
    };
})
.directive('slideToggle', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var target = document.querySelector(attrs.slideToggle);
            attrs.expanded = false;
            element.bind('click', function () {
                var content = target.querySelector('.slideable_content');
                if (!attrs.expanded) {
                    content.style.border = '1px solid rgba(0,0,0,0)';
                    var y = content.clientHeight;
                    content.style.border = 0;
                    target.style.height = y + 'px';
                } else {
                    target.style.height = '0px';
                }
                attrs.expanded = !attrs.expanded;
            });
        }
    }
});

app.directive('compile', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
        scope.$watch(
            function(scope) {
                // watch the 'compile' expression for changes
                return scope.$eval(attrs.compile);
            },
            function(value) {
                // when the 'compile' expression changes
                // assign it into the current DOM
                element.html(value);

                // compile the new DOM and link it to the current
                // scope.
                // NOTE: we only compile .childNodes so that
                // we don't get into infinite loop compiling ourselves
                $compile(element.contents())(scope);
            }
        );
    };
}])
function getFile() {
    document.getElementById("upfile").click();
}

function sub(obj) {
    var file = obj.value;
    var fileName = file.split("\\");
    document.getElementById("yourBtn").innerHTML = fileName[fileName.length - 1];
    document.myForm.submit();
    event.preventDefault();
}