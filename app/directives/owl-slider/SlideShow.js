app.directive('slideShow', function ($timeout) {
    return {
        restrict: 'AE',
        scope: {
            slides: '=',
            ngControl: '='
        },
        controller: function ($scope ,Extention) {

            Extention.post('getAllSlides').then(function(res) {
                $scope.slides = res.Items;
                $timeout($scope.displaySlides);
            });
            $scope.displaySlides = function () {

                angular.element(document).ready(function () {

                    var owl = jQuery('.owl-carousel');

                    owl.on('initialized.owl.carousel change.owl.carousel',function(elem){
                        var current = elem.item.index;
                        jQuery(elem.target).find(".owl-item").eq(current).find(".to-animate").removeClass('fadeInUp animated');
                        jQuery(elem.target).find(".owl-item").eq(current).find(".to-animate-2").removeClass('fadeInUp animated');

                    });

                    owl.on('initialized.owl.carousel changed.owl.carousel',function(elem){
                        setTimeout(function(){
                            var current = elem.item.index;
                            jQuery(elem.target).find(".owl-item").eq(current).find(".to-animate").addClass('fadeInUp animated');
                        }, 700);
                        setTimeout(function(){
                            var current = elem.item.index;
                            jQuery(elem.target).find(".owl-item").eq(current).find(".to-animate-2").addClass('fadeInUp animated');
                        }, 900);
                    });

                    owl.owlCarousel({
                        items: 1,
                        loop: true,
                        margin: 0,
                        responsiveClass: true,
                        nav: true,
                        dots: true,
                        autoHeight: true,
                        smartSpeed: 500,
                        autoplay: true,
                        autoplayTimeout: 5000,
                        autoplayHoverPause: true,
                        navText: [
                            "<i class='fa fa-angle-left fa-3x owl-direction'></i>",
                            "<i class='fa fa-angle-right fa-3x owl-direction'></i>"
                        ]
                    });

                });
            }
        },
        templateUrl: function () {
            return 'app/directives/owl-slider/SlideShowTemplate.html';
        }
    };
})