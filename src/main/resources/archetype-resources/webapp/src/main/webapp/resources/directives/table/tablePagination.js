(function() {
	'use strict';

	/**
	 * @ngdoc directive
	 * @name webmodule.directive:wmGridPagination
	 * @description
	 *
	 * Директива для управления пагинацией грида.
	 */
	angular.module('webmodule').
	    directive('wmGridPagination', ['resourcesPrefix', function (rp) {
	        var templateUrl = rp + '/directives/table/tablePagination.html';
	        return {
	            restrict: 'A',
	            scope: {
	                rowsOnPage: '='
	            },
	            template: "<div st-items-by-page='rowsOnPage' st-pagination='' st-template='" + templateUrl + "'></div>"
	        }
	    }]);

	/**
	 * @ngdoc directive
	 * @name webmodule.directive:arGridPaginationPageSelect
	 * @description
	 *
	 * Вспомогательная директива, для отображение инпута с текущей страницей.
	 */
	angular.module('webmodule').
	    directive('wmGridPaginationPageSelect', ['resourcesPrefix', function (rp) {
	        function isNormalInteger(str) {
	            var n = ~~Number(str);
	            return String(n) === str && n >= 0;
	        }
	        return {
	            restrict: 'E',
	            templateUrl: rp + '/directives/table/tablePaginationPageSelect.html',
	            link: function(scope, element, attrs) {
	                scope.isValidNumberOfPage = true;
	                scope.selectPageWithValidation = function() {
	                    scope.isValidNumberOfPage = !isNaN(scope.inputPage);
	                    if (scope.isValidNumberOfPage) {
	                        scope.isValidNumberOfPage = isNormalInteger(scope.inputPage) && parseInt(scope.inputPage) <= scope.numPages;
	                    }
	                    scope.selectPage(scope.inputPage);
	                };

	                scope.$watch('currentPage', function(c) {
	                    scope.inputPage = c;
	                });
	            }
	        }
	    }]);

	/**
	 * @ngdoc directive
	 * @name webmodule.directive:arGridPaginationRowsSet
	 * @description
	 *
	 * Вспомогательная директива, для отображения кнопки добавления записей в грид.
	 */
	angular.module('webmodule').
	    directive('wmGridPaginationRowsSet', ['$timeout', function ($timeout) {
	        return {
	            restrict: 'E',
	            template: '<button class="btn btn-primary" ng-disabled="isEndOfCollection()" ng-click="plusPage()">+ {{stItemsByPage}}</button>',
	            link: function(scope, element, attrs) {
	                var currentColOfAddedPages = 0;
	                var setColOnPage = null;
	                scope.$on('gridInfoForPagination', function (event, data) {
	                    currentColOfAddedPages = data.currentColOfAddedPages;
	                    setColOnPage = data.setColOnPage;
	                });
	                scope.plusPage = function() {
	                    if (setColOnPage != null) {
	                        setColOnPage(scope.stItemsByPage);
	                    }
	                };
	                scope.isEndOfCollection = function() {
	                    return scope.numPages == scope.currentPage || scope.currentPage + currentColOfAddedPages >= scope.numPages;
	                };
	            }
	        }
	    }]);

	/**
	 * @ngdoc directive
	 * @name webmodule.directive:arGridPaginationPaginationInfo
	 * @description
	 *
	 * Вспомогательная директива, для отображения количества записей.
	 */
	angular.module('webmodule').
	    directive('wmGridPaginationPaginationInfo', [function () {
	        return {
	            restrict: 'E',
	            template: 'c {{getNumOfFirstRecordOnPage()}} по {{getNumOfLastRecordOnPage()}} из {{getColOfRecords()}}',
	            link: function(scope, element, attrs) {
	                var colOfRecords = 0;
	                scope.plusPages = 1;
	                scope.$on('gridInfoForPagination', function (event, data) {
	                    colOfRecords = data.colOfRecords;
	                    scope.plusPages = data.currentColOfAddedPages;
	                });

	                scope.getColOfRecords = function() {
	                    return colOfRecords;
	                };
	                scope.getNumOfLastRecordOnPage = function() {
	                    var numPages = scope.currentPage*scope.stItemsByPage;
	                    // если находимся не на последней странице, увеличиваем счетчик
	                    if ((scope.currentPage+scope.plusPages)*scope.stItemsByPage<colOfRecords) {
	                        numPages = numPages + scope.plusPages*scope.stItemsByPage;
	                    } else {
	                        numPages = colOfRecords;
	                    }
	                    return numPages;
	                };
	                scope.getNumOfFirstRecordOnPage = function() {
	                    return (scope.currentPage-1)*scope.stItemsByPage+1;
	                    //return scope.numPages == scope.currentPage ? colOfRecords : scope.currentPage*scope.stItemsByPage;
	                };
	            }
	        }
	    }]);

})();