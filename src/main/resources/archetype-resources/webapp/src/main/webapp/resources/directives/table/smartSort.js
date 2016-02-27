(function() {
	angular.module('webmodule')
    .directive('wmStSort', ['stConfig', '$parse', '$timeout', function (stConfig, $parse, $timeout) {
        return {
            restrict: 'A',
            require: '^stTable',
            scope: {
                multiSort: "="
            },
            link: function (scope, element, attr, ctrl) {

                var predicate = attr.wmStSort;
                var getter = $parse(predicate);
                var index = 0;

                $timeout(function(){
                    index = getDefaultIndex();
                });

                var classAscent = attr.stClassAscent || stConfig.sort.ascentClass;
                var classDescent = attr.stClassDescent || stConfig.sort.descentClass;
                var stateClasses = [classAscent, classDescent];
                var sortDefault;
                var skipNatural = attr.stSkipNatural !== undefined ? attr.stSkipNatural : stConfig.sort.skipNatural;

                if (attr.stSortDefault) {
                    sortDefault = scope.$eval(attr.stSortDefault) !== undefined ? scope.$eval(attr.stSortDefault) : attr.stSortDefault;
                }

                //view --> table state
                function sort () {
                    index++;
                    predicate = angular.isFunction(getter(scope)) ? getter(scope) : attr.wmStSort;
                    var reverse = null;
                    if (index % 3 === 0 && !!skipNatural !== true) {
                        //manual reset
                        index = 0;
                        //ctrl.tableState().sort = {};
                        //ctrl.tableState().pagination.start = 0;
                        //ctrl.pipe();
                        //reverse = 0;
                        //predicate = null;
                        ctrl.sortBy(null, 0);
                        if (angular.isFunction(scope.multiSort)) {
                            scope.multiSort(predicate, null);
                        }
                    } else {
                        ctrl.sortBy(predicate, index % 2 === 0);
                        if (angular.isFunction(scope.multiSort)) {
                            scope.multiSort(predicate, index % 2 === 0);
                        }
                        //reverse = index % 2 === 0;
                    }
                    //ctrl.sortBy(predicate, index % 2 === 0);
                    //scope.sort(predicate, reverse);
                }

                element.bind('click', function sortClick () {
                    if (predicate) {
                        scope.$apply(sort);
                    }
                });

                if (sortDefault) {
                    index = sortDefault === 'reverse' ? 1 : 0;
                    sort();
                }

                //table state --> view

                if (!angular.isFunction(scope.multiSort)) {
                    enableSingleSortWatch();
                }

                function enableSingleSortWatch() {
                    scope.$watch(function () {
                        return ctrl.tableState().sort;
                    }, function (newValue) {
                        if (newValue.predicate !== predicate) {
                            index = 0;
                            element
                                .removeClass(classAscent)
                                .removeClass(classDescent);
                        } else {
                            index = newValue.reverse === true ? 2 : 1;
                            element
                                .removeClass(stateClasses[index % 2])
                                .addClass(stateClasses[index - 1]);
                        }
                    }, true);
                }

                function getDefaultIndex() {
                    if (angular.element(element).hasClass("st-sort-ascent")) {
                        return 2;
                    }
                    if (angular.element(element).hasClass("st-sort-descent")) {
                        return 1;
                    }
                    return 0;
                }
            }
        };
    }]);

})();