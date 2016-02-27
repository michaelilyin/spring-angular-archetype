(function() {
    'use strict';

    angular.module('webmodule')
        .controller('TableMenuCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
            $scope.viewRowsOnPage = $scope.rowsOnPage;  // init
            $scope.pageRowsNum = [10, 50, 100, 250, 500, 1000];
            angular.element(".show-hide-grid-cols").tooltip({
                title : 'Скрыть/показать столбцы',
                placement: 'top',
                container: 'body'
            });
            angular.element(".grid-rows-on-page").tooltip({
                title : 'Сменить количество строк',
                placement: 'top',
                container: 'body'
            });
            $scope.selectPageRowsNum = function(pageRowsNum) {
                if ($scope.rowsOnPage == pageRowsNum && $scope.rowsOnPage != $scope.viewRowsOnPage) {
                    $scope.viewRowsOnPage = $scope.rowsOnPage;
                    $timeout(function(){
                        $scope.refreshAction();
                    });
                }
                $scope.rowsOnPage = pageRowsNum;
                $scope.viewRowsOnPage = pageRowsNum;
                return false;
            }
        }]);

    /**
     * @ngdoc directive
     * @name armada.directive:DateRange
     * @description
     * Директива для обработки диапазона дат
     */
    angular.module('webmodule').
    directive('wmTableMenu', ['$timeout', 'resourcesPrefix', function ($timeout, rp) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                refreshAction: '=',
                rowsOnPage: '=',
                headers: '=',
                viewRowsOnPage: '='
            },
            controller: 'TableMenuCtrl',
            templateUrl: rp + '/directives/table/tableMenu.html'
        }
    }]);
})();