qms.service('addAssigneeService', ['analystService','excelService',function(analystService, excelService){
    var self = this;

    self.selectedTaskIndex;
    self.currentSheet;

    self.addAssigneeCtrl = function($scope, $mdDialog){
        var currentTask = excelService.priority.tasks[self.currentSheet][self.selectedTaskIndex]
        currentTask.analysts = currentTask.analysts || [];

        $scope.analysts = analystService.analysts.registered;
        $scope.assignedAnalysts = currentTask.analysts;

        $scope.isSelected = function(analyst, list){
            return list.indexOf(analyst) > -1;
        }

        $scope.save = function(){
            currentTask.analysts = $scope.assignedAnalysts;
            $mdDialog.hide();
        }

        $scope.cancel = function(){
            $mdDialog.cancel();
        }

        $scope.toggle = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            }else {
                list.push(item);
            }
        };

        $scope.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };

        $scope.isIndeterminate = function() {
            return ($scope.assignedAnalysts.length !== 0 && $scope.assignedAnalysts.length !== $scope.analysts.length);
        };

        $scope.isChecked = function() {
            return $scope.assignedAnalysts.length === $scope.analysts.length;
        };

        $scope.isEmpty = function(){
            return $scope.assignedAnalysts.length == 0;
        };

        $scope.toggleAll = function() {
            if ($scope.assignedAnalysts.length === $scope.analysts.length) {
                $scope.assignedAnalysts = [];
            } else if ($scope.assignedAnalysts.length === 0 || $scope.assignedAnalysts.length > 0) {
                $scope.assignedAnalysts = [];
                for(analyst of $scope.analysts){
                     $scope.assignedAnalysts.push(analyst);
                }
            }
        };
    }

}]);