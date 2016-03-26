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

    <link href="css/ADM-dateTimePicker.css " rel="stylesheet">
    <link rel='stylesheet' href='css/textAngular.css'>

    <link href="css/font-awesome.css" rel="stylesheet">
    <link href="css/custom.css" rel="stylesheet">
    <link href="css/toaster.css" rel="stylesheet">
    <link href="css/menubar-styles.css" rel="stylesheet">
    <link rel="stylesheet" href="css/ngProgress.css">
</head>

<body ng-app="myApp">
    <div ui-view=""></div>
</body>
<toaster-container toaster-options="{'time-out': 10000}"></toaster-container>

  <!-- Libs -->
  
<script src="Scripts/angular.js"></script>
<script src="Scripts/angular-route.min.js"></script>
<script src="Scripts/angular-animate.min.js" ></script>
<script src="Scripts/angular-ui-router.js"></script>
<script src="js/toaster.js"></script>
<script src="js/ngprogress.js"></script>
<script src="js/ui-bootstrap-tpls-1.2.5.js"></script>

<!-- jqurey libs -->
<script src="js/jquery.js" type="text/javascript"></script>
<script src="js/menubar.js"></script>
<script src="defaultPage.js" ></script>
<script src="Scripts/lazyLoad/ocLazyLoad.js" type="text/javascript" ></script>

<script src="app/app.js"></script>

<script src="app/data.js"></script>

<script src="app/directives.js"></script>
<script src="app/directives/SlideShow.js"></script>
<script src="app/authCtrl.js"></script>

<script src='js/editor/textAngular-rangy.min.js'></script>
<script src='js/editor/textAngular-sanitize.min.js'></script>
<script src='js/editor/textAngular.min.js'></script>
<script src='js/editor/textAngular-sanitize.min.js'></script>

<script type="text/javascript" src="js/moment.js"></script>
<script type="text/javascript" src="js/moment-jalaali.js"></script>
<script type="text/javascript" src="js/angular-confirm.min.js"></script>
<script type="text/javascript" src="js/ADM-dateTimePicker.js"></script>
<script type="text/javascript" src="js/AutoPagination.js"></script>

</html>

