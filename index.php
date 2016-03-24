<!DOCTYPE html>
<html lang="fa" ng-app="myApp">
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

  <body ng-controller="DefaultCtrl">
    <div id="top-menubar" class="navbar navbar-inverse navbar-fixed-top" role="navigation" style="background-color: rgba(245, 245, 245, 0.59);border:none">
      <div class="container">
          <div class="row col-md-12 no-padding">
              <div id='cssmenu' class="align-right">
                  <ul>
                      <li><a href='#/' class="yekan-font">خانه<div class="glyphicon glyphicon-home" style="margin-left:8px;line-height:0"></div></a></li>
                      <li class='active has-sub'>
                          <a href='#'>موضوعات</a>
                          <ul>
                              <li class='has-sub' ng-repeat="s in subject.bases">
                                  <a href='#'>{{s["1"]}}</a>
                                  <ul>
                                      <li><a href='#' ng-repeat="sub in s.sub">{{sub["1"]}}</a></li>
                                  </ul>
                              </li>
                          </ul>
                      </li>
                      <li><a href='#'>درباره ما<div class="glyphicon glyphicon-globe" style="margin-left:8px;line-height:0"></div></a></li>
                      <li><a href='#'>تماس با ما<div class="glyphicon glyphicon-earphone" style="margin-left:8px;line-height:0"></div></a></li>
                      
                      <li><a ng-click="openLoginModal()">ورود<div class="glyphicon glyphicon-user" style="margin-left:8px;line-height:0"></div></a></li>
                      <li><a ng-click="openSignupModal()">ثبت نام<div class="glyphicon glyphicon-user" style="margin-left:8px;line-height:0"></div></a></li>
                      <li ng-if="authenticated"><a  ng-click="logout()">خروج<div class="glyphicon glyphicon-user" style="margin-left:8px;line-height:0"></div></a></li>
                  </ul>
              </div>
          </div>
      </div>
    </div>
    <div style="margin-top:-51px" >
      <div class="container">
        <slide-show class="col-md-12 slider no-padding" images="images"></slide-show>

        <div data-ng-view="" id="ng-view" class="slide-animation"></div>

      </div>
    </div>
    </body>
  <toaster-container toaster-options="{'time-out': 10000}"></toaster-container>

  <!-- Libs -->
<script src="js/jquery.js" type="text/javascript"></script>
<script src="js/menubar.js"></script>
<script src="js/main.js" ></script>
<script src="Scripts/angular.js"></script>
<script src="Scripts/angular-route.min.js"></script>
<script src="Scripts/angular-animate.min.js" ></script>
<script src="app/app.js"></script>
<script src="js/toaster.js"></script>
<script src="js/ngprogress.js"></script>

<script src="js/ui-bootstrap-tpls-1.2.5.js"></script>

<script src="app/data.js"></script>
<script src="app/directives.js"></script>
<script src="app/directives/SlideShow.js"></script>
<script src="app/authCtrl.js"></script>
<script src="partials/Main/MainCtrl.js"></script>
<script src="partials/Post/PostCtrl.js"></script>
<script src="partials/Main/MainService.js"></script>
<script src="DefaultCtrl.js"></script>

</html>

