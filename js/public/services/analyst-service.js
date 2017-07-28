qms.service('analystService', ['$rootScope',function($rootScope){
    var self = this;

    self.analysts = {
        registered: [],
    };

    self.getAnalysts = function(){
        ipcRenderer.send('get-all-analyst');
    }

    self.saveAnalyst = function(analyst){
        ipcRenderer.send('save-analyst', analyst);
    }

    self.deleteAnalyst = function(analyst){
        ipcRenderer.send('delete-analyst', analyst);
    }

    ipcRenderer.on('loaded-analysts', function (event, analysts) {
        $rootScope.$apply(function(){
            self.analysts.registered = analysts;
        });
    });

    ipcRenderer.on('saving-success', function (event, analysts) {
        console.log("Saved analysts", analysts);
        self.getAnalysts();
    });

    ipcRenderer.on('delete-success', function (event, analyst) {
        console.log("Deleted analysts", analyst);
        self.getAnalysts();
    });
    
}]);