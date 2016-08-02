﻿var appName = 'adminApp';
var uploadURL = '../api/upload/';
var serviceBaseURL = '../api/admin/';
var debugMode = true;

var app = angular.module(appName, ['ngRoute', 'treasure-overlay-spinner', 'ui.router', 'angular-confirm',
    'oc.lazyLoad', 'ngAnimate', 'toaster', 'ui.bootstrap', 'ui.router.title', 'ui.select',  'ngPersian',
    'ngFileUpload','anim-in-out','am-charts' ,'ADM-dateTimePicker','ngSanitize',
    'textAngular' ]);

app.config([
    '$provide', '$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider','ADMdtpProvider',
function ($provide, $stateProvider, $urlRouterProvider, $ocLazyLoadProvider,ADMdtp) {
    // Add nested user links to the "foo" menu.
    $ocLazyLoadProvider.config({
        debug: debugMode,
        events: true
    });
    ADMdtp.setOptions({
        calType: 'jalali',
        format: 'YYYY/MM/DD hh:mm',
       // default: 'today'
    });

    $stateProvider
        // Admin states
        .state("dashboard", {
            url: "/dashboard",
            templateUrl: "partials/Dashboard/Dashboard.html",
            controller: 'DashboardCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['partials/Dashboard/DashboardCtrl.js']);
                }],
                $title: function () {
                    return 'داشبورد';
                }
            }
        })
        .state("new_product", {
            url: "/Product",
            templateUrl: "partials/NewProduct/NewProduct.html",
            controller: 'NewProductCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['partials/NewProduct/NewProductCtrl.js']);
                }],
                $title: function () {
                    return 'مدیریت محصول';
                }
            }
        })
        .state("all_products", {
            url: "/AllProducts",
            templateUrl: "partials/AllProducts/AllProducts.html",
            controller: 'AllProductsCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['partials/AllProducts/AllProductsCtrl.js']);
                }],
                $title: function () {
                    return 'همه محصولات';
                }
            }
        })
        .state("slideshow", {
            url: "/Slideshow",
            templateUrl: "partials/SlideShow/SlideShow.html",
            controller: 'SlideShowCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['partials/SlideShow/SlideShowCtrl.js']);
                }],
                $title: function () {
                    return 'مدیریت اسلایدشو';
                }
            }
        })
        .state("file_management", {
            url: "/FileManagement",
            templateUrl: "partials/FileManagement/FileManagement.html",
            controller: 'FileManagementCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['partials/FileManagement/FileManagement.js',
                        'modals/UploadFile/UploadFileCtrl.js']);
                }],
                $title: function () {
                    return 'مدیریت فایل ها';
                }
            }
        });


    $provide.decorator('taOptions', ['taRegisterTool', '$uibModal' , '$delegate',
        function(taRegisterTool,$uibModal, taOptions) {

            taOptions.toolbar = [
                ['h1', 'h4', 'h6', 'p', 'pre', 'quote'],
                ['html', 'customInsertImage','insertLink', 'wordcount', 'charcount'],
                ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
                ['justifyLeft', 'justifyCenter', 'justifyRight'],
                ['dirLtr','dirRtl']
            ];

            taRegisterTool('dirLtr', {
                iconclass: "fa fa-indent",
                action: function(){
                    return this.$editor().wrapSelection("formatBlock", '<P style="direction:ltr">');
                }
            });
            taRegisterTool('dirRtl', {
                iconclass: "fa fa-dedent",
                action: function(){
                    return this.$editor().wrapSelection("formatBlock", '<P style="direction:rtl">');
                }
            });

            // Create our own insertImage button
            taRegisterTool('customInsertImage', {
                iconclass: "fa fa-picture-o",
                action: function($deferred) {
                    var textAngular = this;
                    var savedSelection = rangy.saveSelection();
                    var modalInstance = $uibModal.open({
                        // Put a link to your template here or whatever
                        templateUrl: '../js/text-angular/CustomSelectImageModal.tmpl.html',
                        size: 'md',
                        controller: ['$uibModalInstance', '$scope', 'Upload', '$state',
                            function($uibModalInstance, $scope , Upload , state) {
                                $scope.activeTab = 0;
                                $scope.img = {
                                    url: ''
                                };
                                $scope.submit = function() {
                                    $uibModalInstance.close($scope.img.url);
                                };
                                $scope.cancel = function() {
                                    $uibModalInstance.close();
                                };

                                $scope.getTab= function (tabId) {
                                    $scope.activeTab = tabId;
                                }

                                $scope.addImageLink= function (link) {
                                    $uibModalInstance.close(link);
                                }

                                $scope.filesChanged = function (files, file) {
                                    var url = uploadURL;
                                    url += 'upload_inline_attachment.php';
                                    var data = {file : file};
                                    data.Type = state.current.name;

                                    file.uploader = Upload.upload({
                                        url:  url ,
                                        data: data
                                    });

                                    file.uploader.then(function (resp) {

                                        $uibModalInstance.close(resp.data);
                                        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                                    }, function (resp) {
                                        console.log('Error status: ' + resp.status);
                                    }, function (evt) {
                                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                                        evt.config.data.file.percent = progressPercentage;
                                        // evt.config.data.file.loaded = $scope.sizeFilter(evt.loaded);
                                        //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                                    });
                                }

                                $scope.stopUploadImage = function (file) {
                                    file.uploader.abort();
                                }
                            }
                        ]
                    });

                    modalInstance.result.then(function(imgUrl) {
                        if(!imgUrl)
                            return;

                        rangy.restoreSelection(savedSelection);

                        var embed = '<a href="'+imgUrl+'" target="_blank">' +
                            '<img class="img-responsive link attachment-inline-img" '
                            + ' src="'+imgUrl+'"  /></a>';
                        // insert
                        textAngular.$editor().wrapSelection('insertHtml', embed);

                        //textAngular.$editor().wrapSelection('insertImage', imgUrl);
                        $deferred.resolve();
                    });
                    return false;
                },
                //     // activeState: function(commonElement) {
                //     // return angular.element(taSelection.getSelectionElement()).attr('ng-click');
                // }
            });

            // Now add the button to the default toolbar definition
            // Note: It'll be the last button
            //taOptions.toolbar[3].push('customInsertImage');
            return taOptions;
        }]
    );

    $urlRouterProvider.otherwise(function ($injector, $location) {
        var $state = $injector.get('$state');
        //$state.go('home.home');
        $state.go('dashboard');
    });
}
]);

var activeElement = function (parent , name) {
    if(name){
        var elem = $(name);
        elem.addClass('active').siblings().removeClass('active');
    }
    var elemP = $(parent);
    elemP.addClass('active').siblings().removeClass('active');
}

app.directive('masonry', function() {
    return {
        restrict: 'AC',
        controller: function ($scope) {
            return $scope.$watch(function (e) {
                $scope.masonry.reloadItems();
                return $scope.masonry.layout();
            });
        },
        link: function (scope, elem, attrs) {
            var container = elem[0];
            var options = '';
            return scope.masonry = new Masonry(container, options);
        }
    };
});

app.factory("Extention", ['$http', '$timeout', '$rootScope', '$state', '$stateParams', 'toaster', '$uibModal',
    function ($http, $timeout, $rootScope, $state, $stateParams, toaster, $uibModal) { // This service connects to our REST API

        $rootScope.logout = function () {
            obj.post('logout').then(function (res) {
                if(res&&res.Status=='success'){
                    window.location = "../";
                }else{
                    obj.popError('مشکل ، لطفا دوباره امتحان کنید.');
                }
            });
        }

        $rootScope.session = session;

        $rootScope.spinner = {};
        var obj = {};
        obj.workers = 0;
        obj.serviceBase = serviceBaseURL;
        obj.debugMode = debugMode;

        obj.noImageClass = 'fa fa-2x fa-user';

        obj.setBusy = function (en) {
            if (en) {
                if (obj.workers === 0)
                    $rootScope.spinner.active = true;
                //$rootScope.progressbar.start();
                obj.workers++;
            } else {
                obj.workers--;
                if (obj.workers === 0)
                    $timeout(obj.disableLoading, 500);
                //$rootScope.progressbar.complete();
            }
        };

        obj.toast = function (data) {
            toaster.pop(data.status, "", data.message, 10000, 'trustedHtml');
        }

        obj.pop = function (status, msg, delay) {
            if (!delay)
                delay = 7000;
            toaster.pop(status, "", msg, delay, 'trustedHtml');
        }

        obj.popError = function (msg, delay) {
            if (!delay)
                delay = 7000;
            toaster.pop('error', "", msg, delay, 'trustedHtml');
        }
        obj.popSuccess = function (msg, delay) {
            if (!delay)
                delay = 7000;
            toaster.pop('success', "", msg, delay, 'trustedHtml');
        }
        obj.popInfo = function (msg, delay) {
            if (!delay)
                delay = 7000;
            toaster.pop('info', "", msg, delay, 'trustedHtml');
        }

        obj.get = function (q) {
            obj.setBusy(true);
            return $http.get(obj.serviceBase + q).then(function (results) {
                obj.setBusy(false);
                return results.data;
            }, function (err) {
                obj.setBusy(false);
                return err;
            });
        };

        obj.getExternal = function (q) {
            obj.setBusy(true);
            return $http.get(q).then(function (results) {
                obj.setBusy(false);
                return results.data;
            }, function (err) {
                obj.setBusy(false);
                return err;
            });
        };

        obj.post = function (q, object) {
            obj.setBusy(true);
            return $http.post(obj.serviceBase + q, object).then(function (results) {

                if(obj.debugMode ){
                    console.log(results.data);

                    if(results.status != 200)
                        obj.popModal(results);
                }
                obj.setBusy(false);

                if(results.data.AuthState && results.data.AuthState == 'UN_AUTH'){
                    console.log('State : UN_AUTHORIZED_USER');
                    window.location = '../';
                }

                return results.data;
            }, function (err) {

                if(obj.debugMode){
                    console.log(err.data);
                    obj.popModal(err.data);
                }

                if(err.data.AuthState && err.data.AuthState == 'UN_AUTH'){
                    console.log('State : UN_AUTHORIZED_USER');
                    window.location = '../';
                }

                obj.setBusy(false);
                return err;
            });
        };

        obj.postAsync = function (q, object) {
            return $http.post(obj.serviceBase + q, object).then(function (results) {

                if(obj.debugMode && results.status != 200){
                    obj.popModal(results);
                }
                return results.data;
            }, function (err) {
                if(obj.debugMode)
                    obj.popModal(err.data);
                return err;
            });
        };

        obj.disableLoading = function () {
            $rootScope.spinner.active = false;
        }


        obj.authUser = function (user) {
            $rootScope.authenticated = true;
            $rootScope.user = {};
            $rootScope.user.UserID = user.UserID;
            $rootScope.user.lastName = user.LastName;
            $rootScope.user.firstName = user.FirstName;
        }

        obj.unAuthUser = function () {
            $rootScope.authenticated = false;
            $rootScope.isAdmin = false;
            $rootScope.user = {};
        }

        obj.isAdmin = function () {
            return $rootScope.isAdmin;
        }

        obj.getAuth = function () {
            return { authenticated: $rootScope.authenticated, isAdmin: $rootScope.isAdmin };
        }

        obj.openSignupPanel = function (lang) {
            var template;
            if (lang == 'en')
                template = 'partials/HomeEN/SignupTemplate.html';
            else
                template = 'partials/Home/SignupTemplate.html';

            $uibModal.open({
                animation: true,
                templateUrl: template,
                controller: 'authCtrl',
                size: 'md'
            });
        }

        obj.openSigninPanel = function (lang) {
            var template;
            if (lang == 'en')
                template = 'partials/HomeEN/LoginTemplate.html';
            else
                template = 'partials/Home/LoginTemplate.html';

            $uibModal.open({
                animation: true,
                templateUrl: template,
                controller: 'authCtrl',
                size: 'md'
            });
        }

        obj.scrollTo = function (y) {

            var startY = currentYPosition();
            var stopY = y;//elmYPosition(eID);
            var distance = stopY > startY ? stopY - startY : startY - stopY;
            if (distance < 100) {
                scrollTo(0, stopY); return;
            }
            var speed = Math.round(distance / 10);
            if (speed >= 5) speed = 5;
            var step = Math.round(distance / 25);
            var leapY = stopY > startY ? startY + step : startY - step;
            var timer = 0;
            if (stopY > startY) {
                for (var i = startY; i < stopY; i += step) {
                    setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                    leapY += step; if (leapY > stopY) leapY = stopY; timer++;
                } return;
            }
            for (var i = startY; i > stopY; i -= step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
            }

            function currentYPosition() {
                // Firefox, Chrome, Opera, Safari
                if (self.pageYOffset) return self.pageYOffset;
                // Internet Explorer 6 - standards mode
                if (document.documentElement && document.documentElement.scrollTop)
                    return document.documentElement.scrollTop;
                // Internet Explorer 6, 7 and 8
                if (document.body.scrollTop) return document.body.scrollTop;
                return 0;
            }
        };
        obj.scrollToElement = function (element, offsetY) {
            if (!offsetY)
                offsetY = 0;
            var startY = currentYPosition();
            var stopY = elmYPosition(element) + offsetY;
            var distance = stopY > startY ? stopY - startY : startY - stopY;
            if (distance < 100) {
                scrollTo(0, stopY); return;
            }
            var speed = Math.round(distance / 10);
            if (speed >= 5) speed = 5;
            var step = Math.round(distance / 25);
            var leapY = stopY > startY ? startY + step : startY - step;
            var timer = 0;
            if (stopY > startY) {
                for (var i = startY; i < stopY; i += step) {
                    setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                    leapY += step; if (leapY > stopY) leapY = stopY; timer++;
                } return;
            }
            for (var i = startY; i > stopY; i -= step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
            }

            function currentYPosition() {
                // Firefox, Chrome, Opera, Safari
                if (self.pageYOffset) return self.pageYOffset;
                // Internet Explorer 6 - standards mode
                if (document.documentElement && document.documentElement.scrollTop)
                    return document.documentElement.scrollTop;
                // Internet Explorer 6, 7 and 8
                if (document.body.scrollTop) return document.body.scrollTop;
                return 0;
            }

            function elmYPosition(eID) {
                var elm = document.getElementById(eID);
                var y = elm.offsetTop;
                var node = elm;
                while (node.offsetParent && node.offsetParent != document.body) {
                    node = node.offsetParent;
                    y += node.offsetTop;
                } return y;
            }

        };

        return obj;
    }]);

app.directive('errSrc', function () {
    return {
        link: function (scope, element, attrs) {
            element.bind('error', function () {
                if (attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    }
});

app.run(function ($rootScope, $templateCache, $state, $location, Extention) {

    $rootScope.spinner ={};

    $rootScope.$on("$stateChangeSuccess", function () {
        Extention.setBusy(false);
    });
    $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error){
            Extention.setBusy(false);
        });
    $rootScope.$on('$stateNotFound',
        function(event, unfoundState, fromState, fromParams){
            Extention.setBusy(false);
        })

    $rootScope.$on("$stateChangeStart", function (event, next, current) {
        Extention.setBusy(true);
        $rootScope.globalSearchActive = false;
    });

});

app.filter('fileSizeFilter', function() {
    return function(bytes, precision) {
        if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
        if (typeof precision === 'undefined') precision = 1;
        var units = ['بایت', 'کیلوبایت', 'مگابایت', 'گیگابایت', 'ترابایت', 'پتابایت'],
            number = Math.floor(Math.log(bytes) / Math.log(1024));
        return persianJs((bytes / Math.pow(1024, Math.floor(number))).toFixed(precision)).englishNumber().toString() +
            ' '+units[number] ;
    }
});
app.filter('fileSizeFilterEnglish', function() {
    return function(bytes, precision) {
        if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
        if (typeof precision === 'undefined') precision = 1;
        var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PT'],
            number = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + ' '+units[number] ;
    }
});

app.filter('jalaliDate', function () {
    return function (inputDate, format) {
        var date = moment(inputDate);
        return date.fromNow() + " " + date.format(format);
    }
});

app.filter('jalaliDateSimple', function () {
    return function (inputDate, format) {
        var date = moment(inputDate);
        return date.format(format);
    }
});

app.filter('moment', function () {
    return function (inputDate, format) {
        return moment(inputDate).format(format);
    }
});

app.filter('subString', function () {
    return function (text, length) {
        if (text && text.length > length) {
            return text.substr(0, length) + "...";
        }
        return text;
    }
});
app.filter('fromNow', function () {
    return function (inputDate) {
        var date = moment(inputDate);
        return date.fromNow();
    }
});

app.filter('split', function () {
    return function (input, splitChar, feildName) {
        if (!input)
            return "";
        var str = "";
        for (var i = 0; i < input.length; i++) {
            if (i === input.length - 1)
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
});

app.directive('slideToggle', function () {
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

app.directive('compile', [
    '$compile', function ($compile) {
        return function (scope, element, attrs) {
            scope.$watch(
                function (scope) {
                    // watch the 'compile' expression for changes
                    return scope.$eval(attrs.compile);
                },
                function (value) {
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
    }
]);

angular.module("ui.router.title", ["ui.router"])
	.run(["$rootScope", "$timeout", "$state", "Extention", function ($rootScope, $timeout, $state, Extention) {

	    $rootScope.$on("$stateChangeSuccess", function () {
	        var title = $state.$current.locals.globals.$title;
	        var isAsync = $state.$current.locals.globals.$isAsyncTitle;
	        if (isAsync) {
	            Extention.post(title).then(function (res) {
	                $timeout(function () {
	                    $rootScope.$title = res.SiteName;
	                });

	                $rootScope.$breadcrumbs = [];
	                var state = $state.$current;
	                while (state) {
	                    if (state.resolve && state.resolve.$title) {
	                        $rootScope.$breadcrumbs.unshift({
	                            title: getTitleValue(state.locals.globals.$title),
	                            state: state.self.name,
	                            stateParams: state.locals.globals.$stateParams
	                        });
	                    }
	                    state = state.parent;
	                }
	            });
	        } else {
	            var t = getTitleValue(title);
	            $timeout(function () {
	                $rootScope.$title = t;
	            });

	            $rootScope.$breadcrumbs = [];
	            var state = $state.$current;
	            while (state) {
	                if (state.resolve && state.resolve.$title) {
	                    $rootScope.$breadcrumbs.unshift({
	                        title: getTitleValue(state.locals.globals.$title),
	                        state: state.self.name,
	                        stateParams: state.locals.globals.$stateParams
	                    });
	                }
	                state = state.parent;
	            }
	        }
	    });

	    function getTitleValue(title) {
	        return angular.isFunction(title) ? title() : title;
	    }

	}]);