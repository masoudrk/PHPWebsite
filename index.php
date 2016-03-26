<!DOCTYPE html>
<!--<script src="Scripts/require.js" data-main="app/main.js"></script>-->
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
<!--
<script src="partials/Main/MainCtrl.js"></script>
<script src="partials/Post/PostCtrl.js"></script>
<script src="partials/Admin/AdminCtrl.js"></script>
<script src="partials/Main/MainService.js"></script>
<script src="DefaultCtrl.js"></script>-->



</html>

