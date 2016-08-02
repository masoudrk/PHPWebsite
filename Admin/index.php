<!DOCTYPE html>
<html ng-app="adminApp" ng-controller="MainCtrl as vm" style="background-color: #ECF0F5;">
<head>
    <?php
        require_once  '../cms/functions.php';
        require_once  '../cms/session_generator.php';

        if (!isset($_SESSION)) {
            session_start();
            if(!hasInfo()){?>
        <script>
            var session = {};
                //window.location ="../";
        </script>
        <?php
            }else{
                generateSessionAsJavascriptVariable();
            }
        }
        generateMetas();
        generateRequiredCMSCssFiles();
        ?>

    <title ng-bind="($title || 'Loading ...')">Loading ...</title>
    <link rel="icon" href="images/title.png" />
    <link rel="icon" href="{{titleIcon}}" />
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport" />
</head>
<body class="hold-transition skin-blue sidebar-mini vazir-font">
    <div class="wrapper">

        <header class="main-header">
            <!-- Logo -->
            <a class="logo">
                <!-- mini logo for sidebar mini 50x50 pixels -->
                <span class="logo-mini">
                    <b>M</b>
                    S
                </span>
                <!-- logo for regular state and mobile devices -->
                <span class="logo-lg vazir-font">پنل مدیریت</span>
            </a>
            <!-- Header Navbar: style can be found in header.less -->
            <nav class="navbar navbar-static-top" role="navigation">
                <!-- Sidebar toggle button-->
                <a class="sidebar-toggle" data-toggle="offcanvas" role="button">
                    <span class="sr-only">Toggle navigation</span>
                </a>
                <div class="navbar-custom-menu">
                    <ul class="nav navbar-nav">
                        <!-- Control Sidebar Toggle Button -->
                        <li>
                            <a class="link" data-toggle="control-sidebar">
                                <i class="fa fa-gears"></i>
                            </a>
                        </li>
                        <!-- Messages: style can be found in dropdown.less-->
                        <li class="dropdown messages-menu">
                            <a class="dropdown-toggle link" data-toggle="dropdown">
                                <i class="fa fa-envelope-o"
                                    ng-class="(messages && messages.Total != '0' )?'faa-horizontal animated':''"></i>
                                <span class="label label-warning" ng-bind="messages.Total || '0'| pNumber"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li class="header">
                                    شما
                                    <span>{{messages.Total ||'0'| pNumber}}</span>
                                    پیام جدید دارید
                                </li>
                                <li>
                                    <!-- inner menu: contains the actual data -->
                                    <ul class="menu">
                                        <li ng-repeat="item in messages.All" ng-hide="notificationsUpdating"
                                            class="fx-bounce-normal fx-dur-50 fx-ease-none fx-stagger-50">
                                            <!-- start
                                    event -->
                                            <a>
                                                <div class="pull-right link" ui-sref="messages({id:item.ID})">
                                                    <img err-src="../images/User.png" ng-src="{{item.Image}}"
                                                        class="img-circle"
                                                        alt="User Image"
                                                        style="border: solid 2px #f1c40f" />
                                                    <div class="text-center" style="margin: auto auto auto 10px;">
                                                        <i class="fa fa-envelope  palette-sun-flower" style="font-size: 19px;"></i>
                                                    </div>
                                                </div>
                                                <h4>
                                                    <span class="link" ui-sref="messages({id:item.ID})"
                                                        style="color:#3c8dbc;">
                                                        {{item.FullName}}
                                                    </span>
                                                    <small class="persian-rtl" style="margin-top: 2px;margin-left: 20px;">
                                                        <i class="fa fa-clock-o"></i>
                                                        {{item.MessageDate | fromNow |pNumber}}
                                                    </small>
                                                    <small class="persian-rtl">
                                                        <i class="fa fa-times link palette-alizarin faa-pulse animated-hover"
                                                            style="font-size: 16px;"
                                                            ng-click="markAsReadMessage($event, item)"></i>
                                                    </small>
                                                </h4>
                                                <h5 class="text-right link" ui-sref="messages({id:item.ID})"
                                                    style="margin-top: 0px;margin-bottom: 5px;">
                                                    {{item.EventUser|pNumber}}
                                                </h5>
                                                <p class="text-right text-info "
                                                    style="margin-top: 5px;">
                                                    <p class="link" style="font-size: 14px" ui-sref="messages({id:item.ID})">
                                                        <span class="palette-concrete">
                                                            موضوع :
                                                        </span>
                                                        {{item.MessageTitle | subString :30|pNumber}}
                                                    </p>
                                                    <p class="link" style="padding-right: 5px" ui-sref="messages({id:item.ID})">
                                                        <span class="palette-concrete">متن پیام :</span>
                                                        <span compile="item.Message | subString :100|pNumber"></span>
                                                    </p>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- end event -->
                                    </ul>
                                </li>
                                <li class="footer">
                                    <a class="link faa-parent animated-hover" ng-click="updateMessages($event)"
                                        ng-class="(messagesUpdating)? 'text-muted unlink':''"
                                        style="border-bottom-left-radius: 0;border-bottom-right-radius: 0;">
                                        بروزرسانی
                                        <i
                                            class="fa fa-refresh faa-spin animated-hover"
                                            ng-class="(messagesUpdating)? 'fa-spin ':''"></i>
                                    </a>
                                    <a class="link faa-parent animated-hover" ui-sref="messages">
                                        نمایش همه پیام ها
                                        <i class="fa fa-paper-plane-o faa-burst animated-hover"></i>
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <!-- Notifications: style can be found in dropdown.less -->
                        <li class="dropdown messages-menu">
                            <a class="dropdown-toggle link" data-toggle="dropdown">
                                <i class="fa fa-bell-o"
                                    ng-class="(notifications && notifications.Total != '0' )?'faa-shake animated':''"></i>
                                <span class="label label-danger"
                                    ng-bind="notifications.Total || '0' | pNumber"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li class="header">
                                    شما
                                    <span>{{notifications.Total| pNumber}} </span>
                                    اعلان جدید دارید!
                                </li>
                                <li>
                                    <!-- inner menu: contains the actual data -->
                                    <ul class="menu">
                                        <li ng-repeat="item in notifications.All"
                                            class="fx-bounce-normal fx-dur-50 fx-ease-none fx-stagger-150"
                                            ng-hide="notificationsUpdating">
                                            <!-- start
                                    event -->
                                            <a>
                                                <div class="pull-right link" ui-sref="question({id:item.QuestionID})">
                                                    <img err-src="../images/User.png" ng-src="{{ou.FullPath}}"
                                                        class="img-circle"
                                                        alt="User Image"
                                                        style="border: solid 2px #1abc9c;margin-top: " />
                                                    <div class="text-center" style="margin: -12px -15px auto 10px;">
                                                        <i class="fa fa-bell palette-sun-flower" style="font-size: 19px;"></i>
                                                    </div>
                                                </div>
                                                <h4>
                                                    <span class="link" ui-sref="question({id:item.QuestionID})">
                                                        {{item.FullName}}
                                                    </span>
                                                    <small class="persian-rtl" style="margin-top: 2px;margin-left: 20px;">
                                                        <i class="fa fa-clock-o"></i>
                                                        {{item.EventDate | fromNow |pNumber}}
                                                    </small>
                                                    <small class="persian-rtl">
                                                        <i class="fa fa-times link palette-alizarin faa-pulse animated-hover"
                                                            style="font-size: 16px;"
                                                            ng-click="markAsReadNotification($event, item)"></i>
                                                    </small>
                                                </h4>
                                                <p class="text-right persian-rtl link"
                                                    ui-sref="question({id:item.QuestionID})"
                                                    style="margin-top: 8px;margin-bottom:5px;">
                                                    <span class="palette-turquoise"
                                                        ng-bind="item.EventTypeFA"></span>
                                                </p>
                                                <p class="text-right text-info link"
                                                    ui-sref="question({id:item.QuestionID})"
                                                    style="margin-top: 5px;" ng-if="item.HasQuestion">
                                                    <span class="persian-rtl">
                                                        سرتیتر سوال : {{item.Title | subString :100|pNumber}}
                                                    </span>
                                                </p>
                                            </a>
                                        </li>
                                        <!-- end event -->
                                    </ul>
                                </li>
                                <li class="footer">
                                    <a class="link col-xs-6 faa-parent animated-hover"
                                        ui-sref="profile({action:'Timeline'})"
                                        style="border-bottom-left-radius: 0;border-bottom-right-radius: 0;clear: initial;
                                   ">
                                        تایم لاین
                                        <i class="fa fa-clock-o faa-spin"></i>
                                    </a>
                                    <a class="link col-xs-6 faa-parent animated-hover" ng-click="updateNotifications($event)"
                                        style="border-bottom-left-radius: 0;border-bottom-right-radius: 0;clear: initial;"
                                        ng-class="(notificationsUpdating)? 'text-muted unlink':''">
                                        بروزرسانی
                                        <i class="fa fa-refresh faa-spin"
                                            ng-class="(notificationsUpdating)? 'fa-spin ':''"></i>
                                    </a>

                                    <a class="link faa-parent animated-hover" ng-click="markLastNotifications($event)">
                                        علامت زدن اعلان های نمایشی
                                        <i class="fa fa-check faa-flash animated-hover"></i>
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <!-- User Account: style can be found in dropdown.less -->
                        <li class="dropdown user user-menu">
                            <a class="dropdown-toggle link" data-toggle="dropdown">
                                <img ng-src="{{session.Image}}" src="../images/User.png" class="user-image" alt="User Image" />
                                <span class="hidden-xs" ng-bind="session.FullName"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <!-- User image -->
                                <li class="user-header">
                                    <img ng-src="{{session.Image}}" src="../images/User.png" class="img-circle link"
                                        alt="User Image" />
                                    <p>
                                        <span ng-bind="session.FullName"></span>
                                        - ادمین
                                        <small class="vazir-font">
                                            عضویت در سال {{userSession.SignupDate |  jalaliDateSimple:'jYYYY'}}
                                        </small>
                                    </p>
                                </li>
                                <!-- Menu Footer-->
                                <li class="user-footer">
                                    <div class="pull-left">
                                        <a  href="../Forum/#/Profile/Info" class="btn btn-default btn-flat">پروفایل</a>
                                    </div>
                                    <div class="pull-right">
                                        <a ng-click="logout()" class="btn btn-default btn-flat">خروج</a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <!-- Left side column. contains the logo and sidebar -->
        <aside class="main-sidebar">
            <!-- sidebar: style can be found in sidebar.less -->
            <section class="sidebar">
                <!-- Sidebar user panel -->
                <div class="user-panel">
                    <div class="pull-right image">
                        <img ng-src="{{session.Image}}" src="../images/User.png" class="img-circle" alt="User Image" />
                    </div>
                    <div class="pull-left info">
                        <p ng-bind="session.FullName"></p>
                        <a>
                            آنلاین
                            <i class="fa fa-circle text-success"></i>
                        </a>
                    </div>
                </div>
                <ul class="sidebar-menu">
                    <li class="treeview" id="SDashboard">
                        <a ui-sref="dashboard">
                            <i class="fa fa-tachometer"></i>
                            <span>داشبورد</span>
                        </a>
                    </li>
                    <li class="treeview" id="SProdocts">
                        <a>
                            <i class="fa fa-glass"></i>
                            <span>محصولات</span>
                            <i class="fa fa-angle-right pull-right"></i>
                        </a>
                        <ul class="treeview-menu">
                            <li id="SNewProduct">
                                <a ui-sref="new_product">
                                    <i class="fa fa-circle-o"></i>
                                    افزودن محصول
                                </a>
                            </li>
                            <li id="SAllProducts">
                                <a ui-sref="all_products">
                                    <i class="fa fa-circle-o"></i>
                                    لیست محصولات
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="treeview" id="SGroups">
                        <a>
                            <i class="fa fa-cubes"></i>
                            <span>مدیریت دسته ها</span>
                        </a>
                    </li>
                    <li class="treeview" id="SSlideShow">
                        <a ui-sref="slideshow">
                            <i class="fa fa-picture-o"></i>
                            <span>مدیریت اسلاید شو</span>
                        </a>
                    </li>
                    <li class="treeview" id="SFileManagement">
                        <a ui-sref="file_management">
                            <i class="fa fa-file-o"></i>
                            <span>مدیریت فایل ها</span>
                        </a>
                    </li>
                    <li class="treeview" id="SProdocts">
                        <a>
                            <i class="fa fa-users"></i>
                            <span>مدیریت اعضا</span>
                        </a>
                    </li>
                    <li class="treeview" id="SProdocts">
                        <a>
                            <i class="fa fa-cog"></i>
                            <span>تنظیمات سایت</span>
                        </a>
                    </li>
                    <li class="treeview">
                        <a class="link" ng-click="logout()">
                            <i class="fa fa-power-off"></i>
                            <span>خروج</span>
                        </a>
                    </li>
                </ul>
            </section>
            <!-- /.sidebar -->
        </aside>

        <script id="notifyModal.html" type="text/ng-template">
        <div class="modal-header">
          <h3 class="modal-title">Error in XHR request </h3>
        </div>
        <div class="modal-body">
          <data compile="data"></data>
        </div>
        </script>

        <toaster-container toaster-options="{'time-out': 10000, 'position-class': 'toast-bottom-right', 'close-button':true, 'animation-class': 'toast-bottom-right'}"></toaster-container>

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">

            <treasure-overlay-spinner active='spinner.active' spinner-storke-width="3" spinner-size="60"></treasure-overlay-spinner>
            <!-- Content Wrapper. Contains page content -->
            <div ui-view ng-hide="globalSearchActive" id="mainContent" data-anim-speed="600"
                class="anim-in-out anim-slide-below-fade" data-anim-sync="false" style="min-height: 600px;"></div>
            <!--        <div ng-show="globalSearchActive" ng-include src="'partials/GlobalSearch.html'" id="searchContent" ></div>-->
            <!-- /.content-wrapper -->
        </div>
        <?php generateFooter(); ?>

        <!-- Control Sidebar -->
        <aside class="control-sidebar control-sidebar-dark">
            <!-- Create the tabs -->
            <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
            </ul>
            <!-- Tab panes -->
            <div class="tab-content">
                <!-- Home tab content -->
                <div class="tab-pane" id="control-sidebar-home-tab">
                    <h3 class="control-sidebar-heading">Recent Activity</h3>
                    <ul class="control-sidebar-menu">
                        <li>
                            <a href="javascript::;">
                                <i class="menu-icon fa fa-birthday-cake bg-red"></i>
                                <div class="menu-info">
                                    <h4 class="control-sidebar-subheading">Langdon's Birthday</h4>
                                    <p>Will be 23 on April 24th</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="javascript::;">
                                <i class="menu-icon fa fa-user bg-yellow"></i>
                                <div class="menu-info">
                                    <h4 class="control-sidebar-subheading">Frodo Updated His Profile</h4>
                                    <p>New phone +1(800)555-1234</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="javascript::;">
                                <i class="menu-icon fa fa-envelope-o bg-light-blue"></i>
                                <div class="menu-info">
                                    <h4 class="control-sidebar-subheading">Nora Joined Mailing List</h4>
                                    <p>nora@example.com</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="javascript::;">
                                <i class="menu-icon fa fa-file-code-o bg-green"></i>
                                <div class="menu-info">
                                    <h4 class="control-sidebar-subheading">Cron Job 254 Executed</h4>
                                    <p>Execution time 5 seconds</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <!-- /.control-sidebar-menu -->

                    <h3 class="control-sidebar-heading">Tasks Progress</h3>
                    <ul class="control-sidebar-menu">
                        <li>
                            <a href="javascript::;">
                                <h4 class="control-sidebar-subheading">
                                    Custom Template Design
                                    <span class="label label-danger pull-right">70%</span>
                                </h4>
                                <div class="progress progress-xxs">
                                    <div class="progress-bar progress-bar-danger" style="width: 70%"></div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="javascript::;">
                                <h4 class="control-sidebar-subheading">
                                    Update Resume
                                    <span class="label label-success pull-right">95%</span>
                                </h4>
                                <div class="progress progress-xxs">
                                    <div class="progress-bar progress-bar-success" style="width: 95%"></div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="javascript::;">
                                <h4 class="control-sidebar-subheading">
                                    Laravel Integration
                                    <span class="label label-warning pull-right">50%</span>
                                </h4>
                                <div class="progress progress-xxs">
                                    <div class="progress-bar progress-bar-warning" style="width: 50%"></div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="javascript::;">
                                <h4 class="control-sidebar-subheading">
                                    Back End Framework
                                    <span class="label label-primary pull-right">68%</span>
                                </h4>
                                <div class="progress progress-xxs">
                                    <div class="progress-bar progress-bar-primary" style="width: 68%"></div>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <!-- /.control-sidebar-menu -->

                </div>
                <!-- /.tab-pane -->
                <!-- Stats tab content -->
                <div class="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>
                <!-- /.tab-pane -->
                <!-- Settings tab content -->
                <div class="tab-pane" id="control-sidebar-settings-tab">
                    <form method="post">
                        <h3 class="control-sidebar-heading">General Settings</h3>
                        <div class="form-group">
                            <label class="control-sidebar-subheading">
                                Report panel usage
                                <input type="checkbox" class="pull-right" checked />
                            </label>
                            <p>
                                Some information about this general settings option
                            </p>
                        </div>
                        <!-- /.form-group -->

                        <div class="form-group">
                            <label class="control-sidebar-subheading">
                                Allow mail redirect
                                <input type="checkbox" class="pull-right" checked />
                            </label>
                            <p>
                                Other sets of options are available
                            </p>
                        </div>
                        <!-- /.form-group -->

                        <div class="form-group">
                            <label class="control-sidebar-subheading">
                                Expose author name in posts
                                <input type="checkbox" class="pull-right" checked />
                            </label>
                            <p>
                                Allow the user to show his name in blog posts
                            </p>
                        </div>
                        <!-- /.form-group -->

                        <h3 class="control-sidebar-heading">Chat Settings</h3>

                        <div class="form-group">
                            <label class="control-sidebar-subheading">
                                Show me as online
                                <input type="checkbox" class="pull-right" checked />
                            </label>
                        </div>
                        <!-- /.form-group -->

                        <div class="form-group">
                            <label class="control-sidebar-subheading">
                                Turn off notifications
                                <input type="checkbox" class="pull-right" />
                            </label>
                        </div>
                        <!-- /.form-group -->

                        <div class="form-group">
                            <label class="control-sidebar-subheading">
                                Delete chat history
                                <a href="javascript::;" class="text-red pull-right">
                                    <i class="fa fa-trash-o"></i>
                                </a>
                            </label>
                        </div>
                        <!-- /.form-group -->
                    </form>
                </div>
                <!-- /.tab-pane -->
            </div>
        </aside>
        <!-- /.control-sidebar -->
        <!-- Add the sidebar's background. This div must be placed
           immediately after the control sidebar -->
        <div class="control-sidebar-bg"></div>
    </div>
    <!-- ./wrapper -->

    <?php generateRequiredCMSJavaFiles() ?>
    <script src="angular/admin-app.js"></script>
    <script src="partials/MainCtrl.js"></script>
    <script src="../cms/directives/auto-pagination.js"></script>

</body>
</html>
