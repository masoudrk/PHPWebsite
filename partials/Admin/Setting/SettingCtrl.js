angular.module('myApp').controller('SettingCtrl',
    function ($scope, $rootScope, $routeParams, $location, hotkeys, Extention) {

        $scope.select = {};
        $scope.module = {};

        hotkeys.bindTo($scope).add({
            combo: 'ctrl+shift+s',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function () {
                $scope.saveSettings();
            }
        });

        Extention.post('getAllModulesSorted').then(function (res) {
            $scope.rightBarModules = res.RightBarModules;
            $scope.headerModules = res.HeaderModules;
            $scope.footerModules = res.FooterModules;
        });


        Extention.post('getAllPositions').then(function (res) {
            $scope.allPositions = res;
        });


        $scope.allPages = [];
        $scope.select.selectedFooterPage = [];
        $scope.select.selectedAboutPage = [];
        
        $scope.removeSidebar = function (item) {
            $scope.rightBarModules.splice(item, 1);
        }
        $scope.removeHeader = function (item) {
            $scope.headerModules.splice(item, 1);
        }
        $scope.removeFooter = function (item) {
            $scope.footerModules.splice(item, 1);
        }

        $scope.insertModule = function() {
            var pos = $scope.module.selectedPosition;
            var page = $scope.module.selectedPage;

            if (!page) {
                Extention.popError('خطا ، لطفا صفحه مورد نظر را انتخاب کنید.');
                return;
            }

            if (!pos) {
                Extention.popError('خطا ، لطفا محل قرار گیری صفحه مورد نظر را انتخاب کنید.');
                return;
            }

            switch (pos.Position) {
                case "RightBar":
                    Extention.post('getPageByID', { PageID: page.ID }).then(function (res) {
                        $scope.addToModules($scope.rightBarModules, res);
                    });
                    break;
                case "Footer":
                    Extention.post('getPageByID', { PageID: page.ID }).then(function (res) {
                        $scope.addToModules($scope.footerModules, res);
                    });
                    break;
                case "Header":
                    Extention.post('getPageByID', { PageID: page.ID }).then(function (res) {
                        $scope.addToModules($scope.headerModules,res);
                    });
                    break;
            }
        }

        $scope.addToModules = function (moduleList, page) {
            moduleList.push(page);
            $scope.module.selectedPage = undefined;
        }

        Extention.post('getAllPageNames').then(function (res) {
            $scope.allPages = res;

            Extention.post('getSiteSettings').then(function (res1) {
                $scope.settings = res1;
                var p;
                for (var i = 0; i < $scope.allPages.length; i++) {
                    p = $scope.allPages[i];
                    if (p.ID == res1.AboutPageID) {
                        $scope.select.selectedAboutPage = p;
                    }
                    else if (p.ID == res1.FooterPageID) {
                        $scope.select.selectedFooterPage = p;
                    }
                }
            });
        });


        $scope.saveSettings = function () {
            var allModulesArray = [];
            $scope.createModulesArray(allModulesArray, $scope.rightBarModules, 3);
            $scope.createModulesArray(allModulesArray, $scope.headerModules, 2);
            $scope.createModulesArray(allModulesArray, $scope.footerModules, 1);

            var obj = {
                FooterPageID: $scope.select.selectedFooterPage.ID,
                AboutPageID: $scope.select.selectedAboutPage.ID,
                Modules: allModulesArray,
                SiteName : $scope.settings.SiteName,
                SiteNameEN: $scope.settings.SiteNameEN,
                SiteTitleIcon: $scope.settings.SiteTitleIcon
            };

            Extention.post('saveSiteSettings', obj).then(function (res) {
                if (res && res.Status == 'success') {
                    Extention.popSuccess('با مو فقیت ذخیره شد!');
                } else {
                    Extention.popError('مشکل در ذخیره سازی ، لطفا دوباره تلاش کنید.');
                }
            });
        }

        $scope.createModulesArray = function(sArray,array,posID) {
            var order = 1;
            array.forEach(function(item,index) {
                var module = {
                    PageID: item.PageID || item.ID,
                    ModulePositionID: posID,
                    SortOrder: order++
                };
                sArray.push(module);
            });
        }
    });