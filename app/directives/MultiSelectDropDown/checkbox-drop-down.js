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
            maxButtonTitlesShow: '=',
            selectedList: '=',
            remoteMode: '=',
            serviceName: '=',
            actionName: '=',
            titleFeildName: '=',
            checkFeildName: '=',
            closeOnSelect : '=',
            selectChanged: '&',
            watchOnItems: '=',
            ngId:'@'
        },
        controller: ['$scope', '$http','$element' ,'$attrs','$window', function ($scope, $http,$element, $attrs,$window) {

            $scope.selectedList = [];
            if ($scope.hasFixedItems)
                $scope.selectedFixedList = [];
            $scope.buttonText = "";
            $scope.showList = false;

            if ($scope.watchOnItems)
            $scope.$watch('[items]', function () {
                if ($scope.items && $scope.items.length > 0) {
                    $scope.checkSelectedItems();
                    $scope.getButtonText();
                }
            }, true);

            $scope.onSelectItem = function (item) {
                var checkFeildName = $scope.checkFeildName;

                if ($scope.multiSelectMode) {
                    if (item[checkFeildName] == undefined || item[checkFeildName] == false) {
                        item[checkFeildName] = true;
                        $scope.selectedList.push(item);
                    } else {
                        var index = $scope.selectedList.indexOf(item);
                        item[checkFeildName] = false;
                        $scope.selectedList.splice(index, 1);
                    }
                } else {
                    if ($scope.selectedList.length > 0) {
                        $scope.selectedList[0][checkFeildName] = false;
                        if (!$scope.radioButtonBehaviour) {
                            if ($scope.selectedList[0] != item) {
                                $scope.selectedList.push(item);
                                $scope.selectedList.splice(0, 1);
                                item[checkFeildName] = true;
                            }
                            else {
                                item[checkFeildName] = false;
                                $scope.selectedList.splice(0, 1);
                            }
                        } else {
                            item[checkFeildName] = true;
                            $scope.selectedList.push(item);
                            $scope.selectedList.splice(0, 1);
                        }
                    } else {
                        item[checkFeildName] = true;
                        $scope.selectedList.push(item);
                    }
                }
                $scope.getButtonText();
                $scope.selectChanged();
            }

            $scope.checkSelectedItems = function () {
                $scope.selectedList = [];
                for (var i = 0; i < $scope.items.length; i++) {
                    if ($scope.items[i][$scope.checkFeildName])
                        $scope.selectedList.push($scope.items[i]);
                }
            }
            $scope.getButtonText = function () {
                var arr = $scope.selectedList;
                if (arr.length != 0) {
                    var text = "";
                    var feild = $scope.titleFeildName;
                    for (var i = 0 ; i < arr.length && i < $scope.maxButtonTitlesShow ; i++) {
                        if (i == $scope.maxButtonTitlesShow - 1 || i == arr.length - 1)
                            text += arr[i][feild];
                        else
                            text += arr[i][feild] + " , ";
                    }
                    if (arr.length > $scope.maxButtonTitlesShow)
                        text += " , ...";
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
                        console.log(event.target);
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
            return "app/directives/MultiSelectDropDown/MultiSelectTemplate.html";
        }

    }
});