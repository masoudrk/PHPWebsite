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


    $scope.savePage = function () {
        if ($scope.selectedType.length < 1) {
            Extention.popError('لطفا نوع صفحه را انتخاب کنید!');
            return;
        }

        var page = {
            Name: $scope.page.Name,
            HtmlContent: ($scope.page.HtmlContent) ? $scope.page.HtmlContent : "",
            NameEN: ($scope.page.NameEN) ? $scope.page.NameEN : "",
            HtmlContentEN: ($scope.page.HtmlContentEN) ? $scope.page.HtmlContentEN : "",
            PageTypeID: $scope.selectedType[0].ID
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