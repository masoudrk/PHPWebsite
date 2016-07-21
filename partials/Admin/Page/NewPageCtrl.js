angular.module('myApp').controller('NewPageCtrl', function ($scope, $rootScope, $routeParams, $location, $stateParams, $uibModal,hotkeys, Extention) {

    $scope.pageID = $stateParams.id;
    $scope.editMode = $scope.pageID !== "";

    $scope.page = {};
    $scope.allPageTypes = [];

    hotkeys.bindTo($scope).add({
        combo: 'ctrl+shift+s',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function () {
            $scope.savePage();
        }
    });


    $scope.openGoogleMapModal = function (lang) {

        var uibModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'googleMapModal.html',
            controller: function ($scope, $uibModalInstance, Extention, lang) {
                $scope.zoom = 16;
                $scope.insertMapScript = function () {
                    var code =
                    "\n<div map-lazy-load=\"https://maps.google.com/maps/api/js\">\n" +
                        "\t<ng-map center=\"[" + $scope.longitude + ", " + $scope.latitude + "]\" zoom=\"" + $scope.zoom + "\">" +
                        "\n\t\t<marker position=\"[" + $scope.mLongitude + ", " + $scope.mLatitude + "]\">" +
                        "\n\t</ng-map>\n" +
                    "</div>";

                    $uibModalInstance.close({ htmlCodeEN: code, htmlCode: code, lang: lang });
                }
            },
            size: 'md',
            resolve: {
                lang: function () {
                    return lang;
                }
            }
        });

        uibModalInstance.result.then(function (html) {
            if (lang == 'en') {
                if (!$scope.page.HtmlContentEN)
                    $scope.page.HtmlContentEN = html.htmlCodeEN;
                else
                    $scope.page.HtmlContentEN += html.htmlCodeEN;
            }
            else {
                if (!$scope.page.HtmlContent)
                    $scope.page.HtmlContent = html.htmlCode;
                else
                    $scope.page.HtmlContent += html.htmlCode;
            }
        });
    }

    $scope.insertWhitePanel = function (lang) {
        if (lang == 'en') {
            $scope.page.HtmlContentEN +=
                "\n<div class=\"white-panel english-text\">" +
                "\n\t<div class=\"col-xs-12 text-center top-padding-20 bottom-padding-20\">\n\t</div>" +
                "\n</div>";
        } else {
            $scope.page.HtmlContent += "\n<div class=\"white-panel persian-rtl yekan-font\">" +
                "\n\t<div class=\"col-xs-12 text-center top-padding-20 bottom-padding-20\">\n\t</div>" +
                "\n</div>";
        }
    }

    $scope.insert4SectionHeader = function (lang) {

        var uibModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'headerModal.html',
            controller: function ($scope, $uibModalInstance, Extention, lang) {
                $scope.sections = [];
                for (var i = 0; i < 4; i++) {
                    var item = {};
                    item.link = '#';
                    $scope.sections.push(item);
                }

                $scope.insertHeaderScript = function () {

                    var str = "<div class=\"white-panel persian-rtl yekan-font\">" +
                        "\n\t<div class=\"col-xs-12 text-center bottom-padding-20\">";

                    for (var i = 0; i < 4; i++) {
                        var iconStyle = "font-size:100px;" + (($scope.sections[i].iconColor) ? 'color:' + $scope.sections[i].iconColor : '');
                        var iconCssClass = "bottom-buffer fa " + $scope.sections[i].icon;

                        str += "\n\t\t<div class=\"col-md-3 col-sm-6 col-xs-12 top-padding-20\">" +
                            "\n\t\t\t<i class=\"" + iconCssClass + "\" style=\"" + iconStyle + "\"></i>" +
                            "\n\t\t\t<div class=\"col-xs-12\" style=\"height:100px\">" + $scope.sections[i].text +
                            "\n\t\t\t</div>" +
                            "\n\t\t\t<div class=\"col-xs-12 top-buffer\">" + (($scope.sections[i].link) ?
                            "\n\t\t\t\t<button class=\"btn btn-success\" ><a class=\"my-white special-link\" href=\"" + $scope.sections[i].link+ "\">ادامه</a></button>" : "") +
                            "\n\t\t\t</div>" +
                            "\n\t\t</div>";
                    }
                    str +=  "\n\t</div>" +
                            "\n</div>";

                    $uibModalInstance.close({ htmlCodeEN: str, htmlCode: str, lang: lang });
                }
            },
            size: 'md',
            resolve: {
                lang: function () {
                    return lang;
                }
            }
        });

        uibModalInstance.result.then(function (html) {
            if (lang == 'en') {
                if (!$scope.page.HtmlContentEN)
                    $scope.page.HtmlContentEN = html.htmlCodeEN;
                else
                    $scope.page.HtmlContentEN += html.htmlCodeEN;
            }
            else {
                if (!$scope.page.HtmlContent)
                    $scope.page.HtmlContent = html.htmlCode;
                else
                    $scope.page.HtmlContent += html.htmlCode;
            }
        });
    }


    $scope.savePage = function () {
        var page = {
            Name: $scope.page.Name,
            HtmlContent: ($scope.page.HtmlContent) ? $scope.page.HtmlContent : "",
            NameEN: ($scope.page.NameEN) ? $scope.page.NameEN : "",
            HtmlContentEN: ($scope.page.HtmlContentEN) ? $scope.page.HtmlContentEN : ""
        };

        if ($scope.editMode) {
            page.PageID = $scope.page.ID;
        }

        Extention.post("savePage", page).then(function (res) {
            if (res && res.Status == "success") {
                Extention.popSuccess('صفحه با موفقیت ثبت شد!');
            } else {
                Extention.popError('مشکل در ثبت صفحه ، لطفا دوباره امتحان کنید.');
            }
        });
    }

    Extention.post("getAllPageTypes").then(function(res) {
        $scope.allPageTypes = res;

        if ($scope.editMode) {
            Extention.post('getPageByID', { PageID: $scope.pageID }).then(function (res) {
                $scope.page = res;

                for (var i = 0; i < $scope.allPageTypes.length; i++) {
                    if (res.PageTypeID == $scope.allPageTypes[i].ID) {
                        $scope.selectedType.push($scope.allPageTypes[i]);
                        $scope.allPageTypes[i].typeCheck = true;
                    }
                }
            });
        }
    });
});