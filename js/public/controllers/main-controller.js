/**
 * Main controller for the allocator.
 * 
 * @module qmsAllocatorApp
 * @class MainCtrl
 * 
 */
qms.controller('MainCtrl',['$scope','$state', 'analystService',function($scope,$state, analystService){
    analystService.getAnalysts();
}]);