app.directive('slideShow', function ($timeout) {
    return {
        restrict: 'AE',
        scope: {
            slides: '=',
            ngControl: '='
        },
        link: function (scope, elem, attrs) {
            scope.currentIndex = 0; // Initially the index is at the first image

            scope.update = function () {
                //$timeout(function () {
                //    scope.currentIndex = 0;
                //}, 600);
            };
            scope.next = function () {
                scope.currentIndex < scope.slides.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
            };

            scope.prev = function () {
                scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.slides.length - 1;
            };
            scope.$watch('currentIndex', function () {
                if (!scope.slides)
                    return;
                scope.slides.forEach(function (image) {
                    image.visible = false; // make every image invisible
                });

                scope.slides[scope.currentIndex].visible = true; // make the current image visible
            });
            scope.$watch('slides', function () {
                if (!scope.slides)
                    return;
                scope.slides.forEach(function (image) {
                    image.visible = false; // make every image invisible
                });

                scope.slides[scope.currentIndex].visible = true; // make the current image visible
            });

            var timer;
            var sliderFunc = function () {
                timer = $timeout(function () {
                    scope.next();
                    timer = $timeout(sliderFunc, 5000);
                }, 5000);
            };

            sliderFunc();

            scope.$on('$destroy', function () {
                $timeout.cancel(timer); // when the scope is getting destroyed, cancel the timer
            });

            scope.internalControl = scope.ngControl || {};

            scope.internalControl.update = function () {
                scope.update();
            }
        },
        templateUrl: function () {
            return 'app/directives/SlideShowTemplate.html';
        }
    };
})