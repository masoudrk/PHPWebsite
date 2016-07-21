var slideHelper = {};
var bsHelper = {};

(function ($, viewport) {

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

    bsHelper.getViewPort = function() {
        return viewport.current();
    }

    $(window).resize(function () {
        $(".slider").each(slideHelper.resize);
    });

    //function stickyScroll(e) {
    //    //var scroll_top = $(window).scrollTop();
    //    //if (scroll_top < 5) {
    //    //    $("#top-menubar").css('background-color', 'rgba(0,0,0,0)');
    //    //} else {
    //    //    var o = (scroll_top / 500);
    //    //    if (o > 0.7)
    //    //        o = 0.7;
    //    //    $("#top-menubar").css('background-color', 'rgba(0, 0, 0, ' + o + ')');
    //    //}
        //}

    //stickyScroll();

    //window.addEventListener('scroll', stickyScroll, false);
})(jQuery,ResponsiveBootstrapToolkit);

var $ = jQuery;

//NavMenu
var v_NavMenu = function () {

    // Responsive Menu Events
    var addActiveClass = false;

    jQuery("#mainMenu li.dropdown > a, #mainMenu li.dropdown-submenu > a").on("click", function (e) {

        if (jQuery(window).width() > 979) return;

        e.preventDefault();

        addActiveClass = jQuery(this).parent().hasClass("resp-active");

        jQuery("#mainMenu").find(".resp-active").removeClass("resp-active");

        if (!addActiveClass) {
            jQuery(this).parents("li").addClass("resp-active");
        }

        return;

    });

    // Submenu Check Visible Space
    jQuery("#mainMenu li.dropdown-submenu").hover(function () {

        if (jQuery(window).width() < 767) return;

        var subMenu = jQuery(this).find("ul.dropdown-menu");

        if (!subMenu.get(0)) return;

        var screenWidth = jQuery(window).width(),
            subMenuOffset = subMenu.offset(),
            subMenuWidth = subMenu.width(),
            subMenuParentWidth = subMenu.parents("ul.dropdown-menu").width(),
            subMenuPosRight = subMenu.offset().left + subMenu.width();

        if (subMenuPosRight > screenWidth) {
            subMenu.css("margin-left", "-" + (subMenuParentWidth + subMenuWidth + 10) + "px");
        } else {
            subMenu.css("margin-left", 0);
        }

    });

    // Mega Menu
    jQuery(document).on("click", ".mega-menu .dropdown-menu", function (e) {
        e.stopPropagation()
    });

};
//End NavMenu

//HeaderSearch
var v_HeaderSearch = function () {

    var searchEl = jQuery("#headerSearch .search-input"),
        searchSubmit = searchEl.find("button");

    jQuery(document).on("click", function (e) {
        if (jQuery(e.target).closest("#headerSearch").length === 0) {
            searchEl.removeClass("active");
            setTimeout(function () {
                searchEl.hide();
            }, 250);
        }
    });

    jQuery("#headerSearchOpen").on("click", function (e) {
        e.preventDefault();

        searchEl.show();

        setTimeout(function () {
            searchEl.addClass("active");
        }, 50);

        setTimeout(function () {
            searchEl.find("input").focus();
        }, 250);
    });

    searchSubmit.on("click", function (e) {
        jQuery("#headerSearchForm").submit();
    });

};
//End HeaderSearch

var v_StickyMenu =  function () {

    //if($("body").hasClass("boxed"))
    //	return false;

    var body = $("body"),
        menuHeader = $("header .nav > li > a"),
        header = $("body header:first"),
        headerTop = $("header div.header-top"),
        logoImage = header.find(".logo img"),
        searchWrap = $("header div.search a"),
        logoSmallHeight = logoImage.attr("data-logo-height"),
        searchInput = $("#headerSearch .search-input"),
        $this = this;

    var stickyHeight = 60,
        stickyNormalHeight = 90;


    $this.checkStickyMenu = function (fixHeader) {

        if ($(window).scrollTop() > 60 && window.topNavSmall === true && $(window).width() > 980) {

            logoImage.stop(true, true);

            logoImage.animate({
                height: "auto",
                width: "auto"
            }, 10, function () {
                header.css({ top: "-40px" });
                header.find(".logo").css({ height: stickyHeight });
                searchInput.css({ top: stickyHeight });

                menuHeader.css("padding-top", "21px").css("padding-bottom", "21px");
                searchWrap.css("padding-top", "21px").css("padding-bottom", "19px");
                logoImage.css("height", logoSmallHeight);


                if (!body.hasClass("header-top")) {
                    header.css("top", "0px")
                }

                if (header.hasClass("transparent-header")) {
                    body.css("padding-top", "0px");
                    header.css("background", "white");
                    $("header.transparent-header nav ul.nav-main li a.dropdown-toggle").css("color", "#444444");
                    $("header nav ul.nav-main > li > a").css("color", "#444444");
                    $("header nav ul.nav-main > li > a").css("font-size", "13px");

                    var img = header.find(".logo").attr("data-normal-logo");
                    if(typeof (img) != "undefined")
                        header.find(".logo img").attr("src", img);
                    else
                        alert("Please enter the 'data-normal-logo' attr.");


                    $("#headerSearchOpen").css("color", "#444444");
                    $("header.transparent-header  ul.nav-pills > li.active > a").css("color", "#25CBF5");
                }
                else if (header.hasClass("semi-transparent-header")) {
                    body.css("padding-top", "0px");
                    header.css("background", "white");
                    $("header.transparent-header nav ul.nav-main li a.dropdown-toggle").css("color", "#444444");
                    $("header.semi-transparent-header nav ul.nav-main i.fa-caret-down").css("color", "#444444");
                    $("header.semi-transparent-header nav ul.nav-main > li > a").css("font-size", "13px");
                    $("header nav ul.nav-main > li > a").css("color", "#444444");

                    var img = header.find(".logo").attr("data-normal-logo");

                    if(typeof (img) != "undefined")
                        header.find(".logo img").attr("src", img);
                    else
                        alert("Please enter the 'data-normal-logo' attr.");


                    $("#headerSearchOpen").css("color", "#444444");
                    $("header.transparent-header  ul.nav-pills > li.active > a").css("color", "#25CBF5");
                }
            });

            window.topNavSmall = false;
        }


        if (window.topNavSmall === false && $(window).scrollTop() < 60 && $(window).width() > 980) {
            logoImage.animate({

            }, 0, function () {

                header.css({ top: "0px" });
                header.find(".logo").css({ height: stickyNormalHeight });
                searchInput.css({ top: stickyNormalHeight });

                menuHeader.css("padding-top", "35px").css("padding-bottom", "35px");
                searchWrap.css("padding-top", "35px").css("padding-bottom", "35px");
                logoImage.css("height", "auto").css("width", "auto");


                if (header.hasClass("transparent-header")) {
                    var fontColor = header.attr("data-font-color");

                    body.css("padding-top", "0px");
                    $("body header").css("background", "transparent");
                    $("header.transparent-header nav ul.nav-main li a.dropdown-toggle").css("color", "#fff");
                    $("header nav ul.nav-main > li > a").css("color", fontColor);
                    $("header nav ul.nav-main > li > a").css("font-size", "14px");

                    var img = header.find(".logo").attr("data-sticky-logo");
                    if(typeof (img) != "undefined")
                        header.find(".logo img").attr("src", img);
                    else
                        alert("Please enter the 'data-sticky-logo' attr.");

                    $("#headerSearchOpen").css("color", "#fff");
                }
                else if (header.hasClass("semi-transparent-header")) {
                    var bgColor = header.attr("data-bg-color"),
                        fontColor = header.attr("data-font-color");

                    body.css("padding-top", "0px");
                    header.css("background", bgColor);
                    $("header.transparent-header nav ul.nav-main li a.dropdown-toggle").css("color", "#fff");
                    $("header nav ul.nav-main > li > a").css("color", fontColor);
                    $("header.semi-transparent-header nav ul.nav-main > li > a").css("font-size", "14px");
                    $("header.semi-transparent-header nav ul.nav-main i.fa-caret-down").css("color", "#fff");

                    var img = header.find(".logo").attr("data-sticky-logo");
                    if(typeof (img) != "undefined")
                        header.find(".logo img").attr("src", img);
                    else
                        alert("Please enter the 'data-sticky-logo' attr.");

                    $("#headerSearchOpen").css("color", fontColor);
                }
            });

            window.topNavSmall = true;
        }

        // Fix Padding Top
        if (fixHeader) {
            setTimeout(function () {
                $("body").css("padding-top", $("body header:first").height() + 20);
            }, 900);
        }

    }

    $(window).on("scroll", function (e) {

        $this.checkStickyMenu(false);

    });

    $this.checkStickyMenu(false);
};


var fixMenuBar = function () {

    v_NavMenu();
    v_HeaderSearch();


    $(window).load(function () {

        //Sticky Menu
        if ($(window).scrollTop() > 60)
            window.topNavSmall = true;
        else
            window.topNavSmall = false;

        v_StickyMenu();
        //End Sticky Menu
    });
}

fixMenuBar();