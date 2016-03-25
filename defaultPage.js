jQuery(function ($) {

    function stickyScroll(e) {
        var scroll_top = $(window).scrollTop();
        if (scroll_top < 5) {
            $("#top-menubar").css('background-color', 'rgba(0,0,0,0)');
        } else {
            var o = (scroll_top / 500);
            if (o > 0.5)
                o = 0.5;
            $("#top-menubar").css('background-color', 'rgba(0, 0, 0, ' + o + ')');
        }
    }

    stickyScroll();

    window.addEventListener('scroll', stickyScroll, false);
});