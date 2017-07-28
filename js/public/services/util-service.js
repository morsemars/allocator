qms.service('utilService', [function(){

    var self = this;

    self.addInput = function(){
        if(!this.includes("")) this.push("");
    }

    self.removeFromList = function(index){
        this.splice(index, 1);
    }

    self.clearEntries = function(){
        var obj = this;
        for(prop in obj){
            if(Object.prototype.toString.call(obj[prop]) == '[object Array]' ){
                obj[prop] = [];
            }else if(Object.prototype.toString.call(obj[prop]) == '[object Object]'){
                //TODO
            }else if(prop != '_id' && prop != '__v'){
                obj[prop] = '';
            }else{
                delete obj[prop];
            }
        }
    }
    
}]);