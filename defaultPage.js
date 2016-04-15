var slideHelper = {};
jQuery(function ($) {

    slideHelper.resize = function() {
        var w = $(window).width();
        var h = 0;
        if (w > 1300) {
            h = 500;
        } else {
            h = w - 500;
        }

        if (h > 500)
            h = 500;

        var leftArrow = $("#slide-arrow-left");
        var rightArrow = $("#slide-arrow-right");
        var mainSlider = $("#main-slider");
        var slider = $(".slider");

        mainSlider.css("height", h);
        slider.css("height", h);

        leftArrow.css("top", (h - leftArrow.height()) / 2);
        rightArrow.css("top", (h - rightArrow.height()) / 2);

        if (h < 150) {
            mainSlider.css("visibility", "collapse");
            mainSlider.css("height", 0);
            slider.css("height", 0);
        } else {
            mainSlider.css("visibility", "visible");
        }
    }

    $(window).resize(function () {
        $(".slider").each(slideHelper.resize);
    });

    function stickyScroll(e) {
        //var scroll_top = $(window).scrollTop();
        //if (scroll_top < 5) {
        //    $("#top-menubar").css('background-color', 'rgba(0,0,0,0)');
        //} else {
        //    var o = (scroll_top / 500);
        //    if (o > 0.7)
        //        o = 0.7;
        //    $("#top-menubar").css('background-color', 'rgba(0, 0, 0, ' + o + ')');
        //}
    }

    stickyScroll();

    window.addEventListener('scroll', stickyScroll, false);
});
