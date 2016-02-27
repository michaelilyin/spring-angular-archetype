(function() {
	'use strict';
	var module = angular.module('webmodule');
	module.controller('DemoTableCtrl',
			[ '$scope', 'DemoService', '$state', 'GridService', 'ModalService',
				function($scope, DemoService, $state, GridService, ModalService) {

					function getFilter() {
						return {};
					}

					$scope.demoConfig = {
						title: "Table of Demos",
						columns: [{
							id: "rnum",
							label: "№",
							visible: true,
							disableSort: true,
							width: 5
						}, {
							id: "login",
							label: "Login",
							visible: true,
							width: 30
						}, {
							id: "name",
							label: "Name",
							visible: true,
							width: 10
						}, {
							id: "email",
							label: "Email",
							visible: true,
							width: 20
						}, {
							id: "birthday",
							label: "Birthday",
							visible: true,
							width: 20
						}],
						getData: DemoService.getDemos,
						filter: getFilter

					};

					$scope.createDemo = function() {
						ModalService.open({
							template: 'content/demo/editDemoDlg.html',
							controller: 'EditDemoCtrl',
							size: 'md',
							data: {
								title: "Create Demo"
							}
						}).result.then(function() {
							$scope.getDemos();
						});
					};

					$scope.editDemo = function(id) {
						ModalService.open({
							template: 'content/demo/editDemoDlg.html',
							controller: 'EditDemoCtrl',
							size: 'md',
							data: {
								title: "Edit Demo",
								id: id
							}
						}).result.then(function() {
							$scope.getDemos();
						});
					};

					$scope.removeDemo = function(id) {
						DemoService.deleteDemo(id).then(function() {
							$scope.getDemos();
						});
					};

					$scope.getIndex = function(index) {
						if (!$scope.tableState || $scope.tableState == null)
							return index;
						return $scope.tableState.pagination.start + index + 1;
					}

				} ]);
})();