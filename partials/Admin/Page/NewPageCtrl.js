﻿angular.module('myApp').controller('NewPageCtrl', function ($scope, $rootScope, $routeParams, $location, $stateParams, $uibModal,hotkeys, Extention) {

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