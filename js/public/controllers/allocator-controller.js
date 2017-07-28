/**
 * Controller for Allocator Page
 * 
 * @module qmsAllocatorApp
 * @class allocatorCtrl
 * 
 */
qms.controller('allocatorCtrl',['$scope','$mdDialog', 'utilService', 'analystService', 'excelService', 'addAssigneeService',function($scope, $mdDialog, utilService, analystService, excelService, addAssigneeService){
    
    $scope.openFileExplorer = openFileExplorer;
    $scope.addToPriority = addToPriority;
    $scope.removeFromPriority = removeFromPriority;
    $scope.addAssignee = addAssignee;
    $scope.loadedExcel = excelService.loadedExcel;
    $scope.priority = excelService.priority;
    $scope.taskCount = excelService.taskCount;
    $scope.generateReport = generateReport;
    $scope.analysts = analystService.analysts;
    $scope.assignedTotal = 0;

    function addToPriority(){
        var self = this;

        $scope.priority.tasks[self.sheet] = $scope.priority.tasks[self.sheet] || [];
        $scope.priority.tasks[self.sheet].push(self.task);

        $scope.loadedExcel.tasks[self.sheet].splice(self.$index, 1);
        excelService.countTasks($scope.loadedExcel.tasks, $scope.priority.tasks);
    }

    function removeFromPriority(){
        var self = this;
        delete self.task.analysts;
        $scope.loadedExcel.tasks[self.sheet] = $scope.loadedExcel.tasks[self.sheet] || [];
        $scope.loadedExcel.tasks[self.sheet].push(self.task);
        $scope.priority.tasks[self.sheet].splice(self.$index, 1);
        excelService.countTasks($scope.loadedExcel.tasks, $scope.priority.tasks);
    }

    function openFileExplorer(){
        ipcRenderer.send('open-file-dialog');
    };

    function addAssignee(ev){
        addAssigneeService.selectedTaskIndex = this.$index;
        addAssigneeService.currentSheet = this.sheet;
        openAddAssigneeDialog(ev);
    }

    function openAddAssigneeDialog(ev){
        $mdDialog.show({
            controller: addAssigneeService.addAssigneeCtrl,
            templateUrl: 'add-assignee-form.html',
            targetEvent: ev,
            clickOutsideToClose:true
        })
        .then(function() {
            console.log("Closed", $scope.priority);
        }, function() {
            console.log("Cancelled");
        });
    }

    function generateReport(){
        for(sheet in $scope.priority.tasks){
            $scope.priority.tasks[sheet].forEach(function(priorityTask) {
                console.log(priorityTask, priorityTask.analysts);
            });
        }

        for(sheet in $scope.loadedExcel.tasks){
            $scope.loadedExcel.tasks[sheet].forEach(function(task) {
                console.log(task);
            });
        }
    }

    function distribute(){
        /**
         * 
         */
        taskCount.total
    }

}]);