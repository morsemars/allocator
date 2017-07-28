/**
 * Controller for User Maintenance Page
 * 
 * @module qmsAllocatorApp
 * @class userMaintenanceCtrl
 * 
 */
qms.controller('userMaintenanceCtrl',['$scope','$mdDialog', 'utilService', 'analystService',function($scope, $mdDialog, utilService, analystService){
    $scope.save = save;
    $scope.edit = edit;
    $scope.cancel = clearEntries;
    $scope.deleteAnalyst = deleteAnalyst;
    $scope.analysts = analystService.analysts;

    $scope.currentAnalyst = {
        firstName: '',
        lastName: '',
        email:''
    }

    function save(){
        analystService.saveAnalyst($scope.currentAnalyst);
        clearEntries()
    }

    function edit(){
        $scope.currentAnalyst = JSON.parse(angular.toJson(this.analyst));
    }

    function deleteAnalyst(){
        var selectedAnalyst = this.analyst;
        analystService.deleteAnalyst(selectedAnalyst);
    }

    function clearEntries(){
        utilService.clearEntries.call($scope.currentAnalyst);
    }

    function loadData(){
        $scope.analysts = analystService.analysts;
    }

}]);