/*
دایرکتیو دروپ دان با قابلیت انتخاب چند آیتم و یک آیتم و یا حالت رادیو باتن
نمونه استفاده به صورت زیر است : 

<multi-select-drop-down 
    items="drugTypeDropDownItems" 
    selected-list="selectedDrugTypes"
    ng-button-text="drugTypeButtonText" 
    multi-select-mode="false" 
    radio-button-behaviour="false"
    max-button-titles-show="3" />

آیتم هایی که میخواهد نمایش دهد باید دارای مقدار
title
باشند ، نمونه : 

$scope.drugTypeDropDownItems = [
{
    title: 'کمبود کشوری' 
}, 
{
    title: 'سیار'
}, 
{
    title:'یخچال' 
}];

لیست مورد های انتخاب شده در پروپرتی دوطرفه 
selectedList 
می باشند.
selected-list=""
*/
angular.module('myApp').directive('multiSelectDropDown', function () {
    return {
        restrict: 'EA',
        scope: {
            ngService: '@',
            ngModel: '=',
            items: '=',
            ngButtonText: '=',
            multiSelectMode: '=',
            radioButtonBehaviour: '=',
            maxButtonTitlesShow:'=',
            selectedList: '=',
            remoteMode: '=',
            serviceName: '=',
            actionName: '=',
            titleFeildName:'='
        },
        controller: ['$scope', '$http','$element' ,'$attrs','$window', function ($scope, $http,$element, $attrs,$window) {

            $scope.selectedList = [];
            $scope.buttonText = "";
            $scope.showList = false;

            $scope.getRemoteData = function() {
                if ($scope.remoteMode) {
                    abp.ui.setBusy(null, $http({
                        method: 'post',
                        url: BaseUrl + 'api/services/app/' + scope.serviceName + '/' + scope.actionName,
                        data: JSON.stringify(data)
                    }).success(function (data) {
                        if (data.result != null){
                            items = data.result;
                        }
                    }));
                }
            }

            $scope.onSelectItem = function (item) {
                if ($scope.multiSelectMode) {
                    if (item.checked == undefined || item.checked == false) {
                        item.checked = true;
                        $scope.selectedList.push(item);
                    } else {
                        var index = $scope.selectedList.indexOf(item);
                        item.checked = false;
                        $scope.selectedList.splice(index, 1);
                    }
                } else {
                    if ($scope.selectedList.length > 0) {
                        $scope.selectedList[0].checked = false;
                        if (!$scope.radioButtonBehaviour) {
                            if ($scope.selectedList[0] != item) {
                                $scope.selectedList.push(item);
                                $scope.selectedList.splice(0, 1);
                                item.checked = true;
                            }
                            else {
                                item.checked = false;
                                $scope.selectedList.splice(0, 1);
                            }
                        } else {
                            item.checked = true;
                            $scope.selectedList.push(item);
                            $scope.selectedList.splice(0, 1);
                        }
                    } else {
                        item.checked = true;
                        $scope.selectedList.push(item);
                    }
                }
                $scope.getButtonText();
            }

            $scope.getButtonText = function () {
                if ($scope.selectedList.length != 0) {
                    var text = "";
                    var feild = $scope.titleFeildName;
                    for (var i = 0 ; i < $scope.selectedList.length && i < $scope.maxButtonTitlesShow ; i++) {
                        if (i == $scope.maxButtonTitlesShow - 1 || i == $scope.selectedList.length - 1)
                            text += $scope.selectedList[i][feild];
                        else
                            text += $scope.selectedList[i][feild] + " , ";
                    }
                    if ($scope.selectedList.length > $scope.maxButtonTitlesShow)
                        text += " , "+"..."
                    $scope.buttonText = text;
                } else {
                    $scope.buttonText = $scope.ngButtonText;
                }
            }

            $scope.toggleDropDown = function ($event) {

                $window.onclick = null;
                $scope.showList = !$scope.showList;

                if ($scope.showList) {
                    $window.onclick = function (event) {
                        var isClickedElementChildOfPopup = $element.find(event.target).length > 0;

                        if (isClickedElementChildOfPopup)
                            return;

                        $scope.showList = false;
                        $scope.$apply();
                    };
                }
                $event.stopPropagation();
            }

            $scope.getButtonText();
        }],
        templateUrl: function (elem, attrs) {
            return "app/MultiSelectDropDown/Template/MultiSelectTemplate.html";
        }

    }
});