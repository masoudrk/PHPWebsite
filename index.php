<!DOCTYPE html>
<html lang="fa" ng-app="myApp">
<style>
</style>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>AngularJS Authentication App</title>
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/font-awesome.css" rel="stylesheet">
    <link href="css/custom.css" rel="stylesheet">
    <link href="css/toaster.css" rel="stylesheet">
    <link href="css/menubar-styles.css" rel="stylesheet">
</head>

  <body ng-cloak="">
    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation" style="background-color: rgba(245, 245, 245, 0.59);border:none">
      <div class="container">
          <div class="row col-md-12 no-padding">
              <div id='cssmenu' class="align-right">
                  <ul>
                      <li><a href='#' class="yekan-font">خانه<div class="glyphicon glyphicon-home" style="margin-left:8px;line-height:0"></div></a></li>
                      <li class='active has-sub'>
                          <a href='#'>موضوعات</a>
                          <ul>
                              <li class='has-sub'>
                                  <a href='#'>موضوع اول</a>
                                  <ul>
                                      <li><a href='#'>زیر موضوع اول</a></li>
                                      <li><a href='#'>زیر موضوع دوم</a></li>
                                  </ul>
                              </li>
                              <li class='has-sub'>
                                  <a href='#'>موضوع دوم</a>
                                  <ul>
                                      <li><a href='#'>زیر موضوع اول</a></li>
                                      <li><a href='#'>زیر موضوع دوم</a></li>
                                  </ul>
                              </li>
                          </ul>
                      </li>
                      <li><a href='#'>درباره ما</a></li>
                      <li><a href='#'>تماس با ما</a></li>
                  </ul>
              </div>
          </div>
        <!--<div class="">
            <div class="pull-right">
                <div class="navbar-header menu-item">
                    <a class="navbar-brand ">درباره ما
                        <span class="glyphicon glyphicon-globe link"></span>
                    </a>
                </div>
                <div class="navbar-header menu-item ">
                    <a class="navbar-brand " >ارتباط با ما
                        <span class="glyphicon glyphicon-earphone link"></span>
                    </a>
                </div>
                <div class="navbar-header menu-item">
                    <a class="navbar-brand">موضوعات
                        <span class="glyphicon glyphicon-list link"></span>
                    </a>
                </div>
                <div class="navbar-header menu-item ">
                    <a class="navbar-brand"> خانه
                        <span class="glyphicon glyphicon-home link"></span>
                    </a>
                </div>
            </div>
        </div>-->
      </div>
    </div>
    <div >
      <div class="container" style="margin-top:2px">

        <div data-ng-view="" id="ng-view" class="slide-animation"></div>

      </div>
    </div>
    </body>
  <toaster-container toaster-options="{'time-out': 3000}"></toaster-container>
  <!-- Libs -->
<script src="js/jquery.js" type="text/javascript"></script>
<script src="js/menubar.js"></script>
<script src="js/angular.min.js"></script>
<script src="js/angular-route.min.js"></script>
<script src="js/angular-animate.min.js" ></script>
<script src="js/toaster.js"></script>
<script src="app/app.js"></script>
<script src="app/data.js"></script>
<script src="app/directives.js"></script>
<script src="app/authCtrl.js"></script>
<script src="partials/Main/MainCtrl.js"></script>
<script src="partials/Main/MainService.js"></script>
</html>

