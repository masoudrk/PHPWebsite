angular.module('myApp').controller('SettingCtrl',
    function ($scope, $rootScope, $routeParams, $location, Extention) {

        $scope.allPages = [];
        $scope.selectedFooterPage = [];
        $scope.selectedAboutPage = [];

        Extention.post('getAllPages').then(function (res) {
            $scope.allPages = res.Items;

            Extention.post('getSiteSettings').then(function (res1) {
                $scope.settings = res1;

                var p;
                for (var i = 0; i < $scope.allPages.length; i++) {
                    p = $scope.allPages[i];
                    if (p.ID == res1.AboutPageID) {
                        $scope.selectedAboutPage.push(p);
                        p.aboutCheck = true;
                    }
                    else if (p.ID == res1.FooterPageID) {
                        $scope.selectedFooterPage.push(p);
                        p.footerCheck = true;
                    }
                }
            });
        });


        $scope.saveSettings = function () {
            var obj = {
                FooterPageID: $scope.selectedFooterPage[0].ID,
                AboutPageID: $scope.selectedAboutPage[0].ID
            };

            Extention.post('saveSiteSettings', obj).then(function (res) {
                if (res && res.Status == 'success') {
                    Extention.popSuccess('با مو فقیت ذخیره شد!');
                } else {
                    Extention.popError('مشکل در ذخیره سازی ، لطفا دوباره تلاش کنید.');
                }
            });
        }
    });