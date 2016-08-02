<?php
/**
 * Created by PhpStorm.
 * User: -MR-
 * Date: 17/05/2016
 * Time: 11:16 PM
 */
function generateRequiredCMSJavaFiles(){
?>

    <!-- jQuery 2.1.4 -->
    <script src="../cms/js/jQuery/jQuery-2.1.4.min.js"></script>
    <!-- jQuery UI 1.11.4 -->
    <script src="../cms/js/jQueryUI/jquery-ui.min.js"></script>
    <!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
    <script>
        $.widget.bridge('uibutton', $.ui.button);
    </script>
    <!-- Bootstrap 3.3.5 -->
    <script src="../cms/js/bootstrap.min.js"></script>
    <!-- Bootstrap WYSIHTML5
    <script src="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>-->
    <!-- Slimscroll -->
    <script src="../cms/js/slimScroll/jquery.slimscroll.min.js"></script>
    <!-- FastClick -->
    <script src="../cms/js/fastclick/fastclick.min.js"></script>
    <!-- AdminLTE App -->
    <script src="../cms/js/app.js"></script>
    <!-- AdminLTE dashboard demo (This is only for demo purposes)
    <script src="dist/js/pages/dashboard.js"></script> -->
    <!-- AdminLTE for demo purposes -->
    <script src="../cms/js/demo.js"></script>

    <script src="../cms/js-module/am-charts/amcharts.js" type="text/javascript"></script>
    <script src="../cms/js-module/am-charts/themes/dark.js" type="text/javascript"></script>
    <script src="../cms/js-module/am-charts/serial.js" type="text/javascript"></script>
    <script src="../cms/js-module/am-charts/pie.js" type="text/javascript"></script>
    <script src="../cms/js-module/am-charts/radar.js" type="text/javascript"></script>

    <script src="../cms/js-module/am-charts/plugins/export/export.min.js" type="text/javascript"></script>

    <script src="../cms/js-module/persian.min.js"></script>

    <script src="../cms/js-module/angular.js"></script>
    <script src="../cms/js-module/angular-route.min.js"></script>
    <script src="../cms/js-module/angular-animate.min.js" ></script>
    <script src="../cms/js-module/angular-sanitize.min.js" ></script>
    <script src="../cms/js-module/angular-ui-router.js"></script>

    <script src="../cms/js-module/ng-img-crop.js"></script>
    <script src="../cms/js-module/ng-fx/ng-fx.min.js"></script>
<!--    <script src="../cms/js/angular-notification-icons.min.js"></script>-->
    <script src="../cms/js-module/ADM-dateTimePicker.min.js"></script>
    <script src="../cms/js-module/ng-file-upload-shim.min.js"></script>
    <script src="../cms/js-module/anim-in-out.js"></script>
    <script src="../cms/js-module/ng-file-upload.min.js"></script>
    <script src="../cms/js-module/angularpersian.min.js"></script>
    <script src="../cms/js/treasure-overlay-spinner.js" type="text/javascript"></script>
    <script src="../cms/js-module/lazyLoad/ocLazyLoad.min.js" type="text/javascript"></script>
    <script src="../cms/js-module/toaster.js" type="text/javascript"></script>
    <script src="../cms/js-module/ui-bootstrap-tpls-1.2.5.min.js" type="text/javascript"></script>
    <script src="../cms/js/select/select.min.js" type="text/javascript"></script>

    <script src='../cms/js-module/text-angular/textAngular-rangy.min.js'></script>
    <script src='../cms/js-module/text-angular/textAngular-sanitize.min.js'></script>
    <script src='../cms/js-module/text-angular/textAngular.min.js'></script>

    <script type="text/javascript" src="../cms/js-module/moment.js"></script>
    <script type="text/javascript" src="../cms/js-module/moment-jalaali.js"></script>
    <script type="text/javascript" src="../cms/js-module/angular-confirm.min.js"></script>

    <script type="text/javascript" src="../cms/directives/serial-chart-directive.js"></script>
    <script type="text/javascript" src="../cms/directives/pie-chart-directive.js"></script>
    <script type="text/javascript" src="../cms/directives/radar-chart-directive.js"></script>

<?php
}

function generateRequiredCMSCssFiles(){
    ?>
    <link href="../cms/js-module/am-charts/plugins/export/export.css" rel="stylesheet" type="text/css">
    <link rel='stylesheet' href='../cms/css-module/textAngular.css'>
    <link rel="stylesheet" href="../cms/css-module/ADM-dateTimePicker.css" type="text/css">
    <link rel="stylesheet" href="../cms/css-module/ng-img-crop.min.css" type="text/css">
    <link rel="stylesheet" href="../cms/css-module/anim-in-out.css">
    <link rel="stylesheet" href="../cms/css-module/toaster.css">
    <link rel="stylesheet" href="../cms/css/treasure-overlay-spinner.min.css">
    <link rel="stylesheet" href="../cms/css/select/select.css">
<!--    <link rel="stylesheet" href="../cms/css/angular-notification-icons.min.css">-->
    <link rel="stylesheet" href="../cms/css-module/font-awesome-animation.min.css">

    <link rel="stylesheet" href="../cms/css-module/hover-min.css">

    <!-- Bootstrap 3.3.5 -->
    <link rel="stylesheet" href="../cms/css/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="../css/font-awesome.min.css">
    <!-- Ionicons -->
    <!--<link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">-->
    <!-- Theme style -->
    <link rel="stylesheet" href="../cms/css-module/site-styles.css">

    <link rel="stylesheet" href="../cms/css/pallete.css">
    <link rel="stylesheet" href="../cms/css/AdminLTE-rtl.css">
    <link rel="stylesheet" href="../cms/css/AdminLTE-rtl-fix.css">
    <!-- AdminLTE Skins. Choose a skin from the css/skins
         folder instead of downloading all of them to reduce the load. -->
    <link rel="stylesheet" href="../cms/css/skins/_all-skins-srtl.css">

    <?php
}


function generateMetas(){
    ?>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Language" content="fa" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <?php
}

function generateFooter(){
    ?>

    <footer class="main-footer persian-rtl" style="">
        <div class="pull-left hidden-xs">
            <b>نسخه</b> {{websiteInfo.Version| pNumber}}
        </div>
        <strong class="persian-rtl"></strong>
        <span ng-bind="websiteInfo.CopyrightText | pNumber"></span>

            <span class="text-muted">

              Copyright &copy;
                <span ng-bind="nowDate() | jalaliDateSimple : 'YYYY' "></span>
            -
            <span ng-bind="websiteInfo.CopyrightStartDate | jalaliDateSimple : 'YYYY' "></span>
            </span>

    </footer>
    <?php
}
?>