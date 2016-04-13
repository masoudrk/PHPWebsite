<!DOCTYPE html>
<html lang="fa">
<style>
    .slider {
        height: 500px;
        background-color: gray;
    }
</style>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title></title>
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <link href="css/select.css" rel="stylesheet">
    
    <link href="css/hover-min.css" rel="stylesheet">
    <link href="css/treasure-overlay-spinner.css" rel="stylesheet">

    <link href="css/ADM-dateTimePicker.css " rel="stylesheet">
    <link href='css/textAngular.css' rel='stylesheet'>

    <link href="css/font-awesome.css" rel="stylesheet">
    <link href="css/custom.css" rel="stylesheet">
    <link href="css/toaster.css" rel="stylesheet">
    <link href="css/menubar-styles.css" rel="stylesheet">
    <link href="css/ngProgress.css" rel="stylesheet">
    <link href="css/sortable/ng-sortable.css" rel="stylesheet">

    <link href="css/angular-tooltips.css" rel="stylesheet" type="text/css" />

    <link href="css/ui-navbar.css" rel="stylesheet">
</head>

<body ng-app="myApp">
    <treasure-overlay-spinner active='spinner.active'>
    </treasure-overlay-spinner>

    <div ui-view></div>
</body>

<toaster-container toaster-options="{'time-out': 10000}"></toaster-container>

<!-- jqurey libs -->
<script src="js/jquery.js" type="text/javascript"></script>
<script src="js/menubar.js"></script>
<script src="defaultPage.js" ></script>

<!-- Libs -->
<script src="Scripts/angular.js"></script>
<script src="Scripts/angular-sanitize.js"></script>
<script src="Scripts/angular-route.min.js"></script>
<script src="Scripts/angular-animate.min.js" ></script>
<script src="Scripts/angular-ui-router.js"></script>

<script src="js/toaster.js"></script>
<script src="js/ngprogress.js"></script>
<script src="js/ui-bootstrap-tpls-1.2.5.js"></script>

<script src="Scripts/lazyLoad/ocLazyLoad.js" type="text/javascript" ></script>
<script src="js/ng-file-upload-shim.min.js"></script>
<script src="js/ng-file-upload.min.js"></script>
<script src="js/angular-tooltips.min.js"></script>
<script src="js/select.min.js"></script>
<script src='js/bootstrap-plus.min.js'></script>

<script src="js/editor/ckeditor/ckeditor.js"></script>
<script src='js/editor/ng-ckeditor.js'></script>

<script src="js/ng-sortable.js" type="text/javascript" ></script>
<script src="js/ui-navbar.js" type="text/javascript"></script>

<script src="js/treasure-overlay-spinner.js" type="text/javascript"></script>

<script src="app/app.js"></script>
<script src="js/angular-clipboard.js"></script>
<script src="app/Extention.js"></script>
<script src="app/authCtrl.js"></script>
<script src="app/directives/auto-pagination.js"></script>

<script src="app/directives/directives.js"></script>
<script src="app/directives/SlideShow/SlideShow.js"></script>
<script src="app/directives/Menu/menu.js"></script>

<script type="text/javascript" src="js/moment.js"></script>
<script type="text/javascript" src="js/moment-jalaali.js"></script>
<script type="text/javascript" src="js/angular-confirm.min.js"></script>
<script type="text/javascript" src="js/ADM-dateTimePicker.js"></script>
</html>

