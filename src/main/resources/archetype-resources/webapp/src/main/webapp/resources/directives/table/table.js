 (function() {
    'use strict';

    angular.module('webmodule').controller('TableCtrl',
			[ '$scope', '$log', 'resourcesPrefix',
			  function($scope, $log, rp) {
				
				var config = $scope.config;
				
				function getPageNumber(start, number) {
					if (!start || !number) {
						return 1;
					}
					return Math.round(start / number) + 1;
				}
				
				var page = 1;
				var number = 10;
				var predicate = 'id';
				var reverse = false;
				
				$scope.colRowsOnPage = 10;
				
				$scope.rowCollection = [];
				$scope.data = [].concat($scope.rowCollection);
				$scope.loadData = function(tableState) {
					$log.debug("Fetching data . . .");
					
					if (tableState && tableState != null) {
//		                GridService.setGridTableStateParams($scope.tableState, predicate, reverse); // установка параметров пагинации по умолчанию
//		                var pagination = $scope.tableState.pagination;
//		                if (!isFirstPage) {
//		                    start = typeof  pagination.start == 'number' ? pagination.start : start;
//		                } else {
//		                    $scope.tableState.pagination.start = 0;
//		                }
//		                number = typeof  pagination.number == 'number' ? pagination.number : number;
		                predicate = tableState.sort.predicate;
		                reverse = tableState.sort.reverse;
		            }
					
					var params = {
	            			page: getPageNumber(page, number),
	            			rows: number,
	            			sidx: predicate, 
	            			sord: reverse ? "desc" : "asc"
		            };
					if (angular.isDefined(config.filter)) {
						if (angular.isFunction(config.filter)) {
							 angular.forEach($scope.config.filter(), function (value, name) {
								 params[name] = value;
							 });
						} else {
							throw "Filter must be a function";
						}
					}
					
					var promise = null;
					if (angular.isDefined(config.loadParams)) {
						var type = typeof config.loadParams;
						if (type === "function")
							promise = config.getData(params, config.loadParams());
						else if (type === "object")
							promise = config.getData(params, config.loadParams);
						else
							throw "Additional parameters must be a function or an object";
					} else {
						promise = config.getData(params);
					}
					promise.then(function(result) {
						angular.forEach(result.rows, function(v, k) {
							//do nothing
						});
						$scope.data = result.rows;
						$log.debug("New table data was loaded");
					})
				};
				
				$scope.refreshData = function() {
					if (angular.isDefined($scope.viewRowsOnPage)) {
		                if ($scope.colRowsOnPage != $scope.viewRowsOnPage) {
		                    $scope.colRowsOnPage = $scope.viewRowsOnPage;
		                } else {
		                	$scope.loadData();
		                }
		            }
				}
				
				$scope.getIndex = function(index) {
		            if (!$scope.tableState || $scope.tableState == null)
		                return index + 1;
		            return $scope.tableState.pagination.start + index + 1;
		        };
		        
		        $scope.getTemplateUrl = function() {
					return rp + ($scope.config.rowTemplate ? $scope.config.rowTemplate : '/directives/table/tableRowDefault.html');
				};
				
				$scope.isShowColumn = function (index) {
		            return config.columns[index].visible;
		        };
			}]);
    
    angular.module('webmodule').controller('tableRowCtrl',
			[ '$scope', 'resourcesPrefix',
			  function($scope, rp) {
				$scope.getTemplateUrl = function() {
					return rp + ($scope.template ? $scope.template : '/directives/table/tableRowDefault.html');
				}
			}]);
    
    /**
     * @ngdoc directive
     * @name armada.directive:DateRange
     * @description
     * Директива для обработки диапазона дат
     */
    angular.module('webmodule').
        directive('wmTable', ['$timeout', 'resourcesPrefix', function ($timeout, rp) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    id: '=',
                    config: '=',
//                    rowsOnPage: '=',
//                    headers: '=',
//                    viewRowsOnPage: '='
                },
                controller: 'TableCtrl',
                templateUrl: rp + '/directives/table/table.html'
            }
        }]);
    
    /**
     * @ngdoc directive
     * @name armada.directive:DateRange
     * @description
     * Директива для обработки диапазона дат
     */
    angular.module('webmodule').
        directive('wmTableRow', ['$timeout', 'resourcesPrefix', function ($timeout, rp) {
            return {
                restrict: 'E',
                replace: true,
                require: '^tbody',
                scope: {
                    data: '=',
                    template: '='
                },
                controller: 'TableRowCtrl',
                template: "<tr ng-include='getTemplateUrl()'></tr>"
            }
        }]);
})();