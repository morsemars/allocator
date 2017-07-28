qms.service('excelService', ['$rootScope','analystService', function($rootScope, analystService){

    var self = this;

    self.loadedExcel = {
        tasks: {}
    };

    self.taskCount = {
        tasks:{},
        priority:{}
    }

    self.priority = {
        tasks:{}
    }

    self.saveToExcel = function(filename, reportContents){

        options = {
            filename: filename
        };

        workbook = new exceljs.stream.xlsx.WorkbookWriter(options);
        workbook.creator = 'Allocator';
        workbook.created = new Date();

        for(report of reportContents){
            sheet = workbook.addWorksheet(report.name);
            excelHeaders = [];

            if(report.headers){
                for(header of report.headers){
                    excelHeaders.push({
                        header: header,
                        key: header,
                        width: 20,
                    })
                }
            }else{
                for(header in report.contents[0]){
                    excelHeaders.push({
                        header: header,
                        key: header,
                        width: 20,
                    })
                }
            }

            sheet.columns = excelHeaders;
            for(content of report.contents){
                sheet.addRow(content);
            }
        }

        return workbook.commit();
    }

    self.readExcel = function(filename){
        var workbook = new exceljs.Workbook();
        return workbook.xlsx.readFile(filename);
    }

    self.ExcelToObject = function(workbook, headerIndex){

        headerIndex = headerIndex || 1;

        var 
            headers = [],
            excelContents = {};

        workbook.eachSheet(function(worksheet, sheetId) {
            excelContents[worksheet.name] = [];
            worksheet.eachRow(function(row, rowNumber) {
                if(rowNumber >= headerIndex){
                    excelContents[worksheet.name].push(
                        JSON.parse(JSON.stringify(row.values))
                        .filter(function(col){
                            return col;
                        })
                    );
                }
            });
        });

        for(worksheet in excelContents){
            headers = excelContents[worksheet][0];
            excelContents[worksheet] = excelContents[worksheet]
            .filter(function(row, index){
                return index != 0;
            });
            excelContents[worksheet] = excelContents[worksheet].map(function(row){
                var rowObj = {};
                row.forEach(function(col, index){
                    return rowObj[headers[index]] = col;
                })
                return rowObj;
            });
        }
        return excelContents;
    }

    self.countTasks = function(tasks, priority){
        var totalCount = 0;
        var count;
        for(sheet in tasks){
            count = 0;
            tasks[sheet].forEach(function(task){
                count += task.TOTAL;
                totalCount += task.TOTAL;
            });
            self.taskCount.tasks[sheet] = count;
        }
        
        for(sheet in priority){
            count = 0;
            priority[sheet].forEach(function(task){
                count += task.TOTAL;
                totalCount += task.TOTAL;
            });
            self.taskCount.priority[sheet] = count;
        }
        self.taskCount.total = totalCount;
    }

    self.distribute = function(){

    }

    function resetCount(){
        for(type in self.taskCount){
            for(sheet in self.taskCount[type]){
                self.taskCount[type][sheet] = 0;
            }
        }
    }

    ipcRenderer.on('selected-directory', function (event, files) {
        self.readExcel(files[0]).then(function(workbook){
            $rootScope.$apply(function(){
                resetCount();
                self.priority.tasks = {};
                self.loadedExcel.tasks = self.ExcelToObject(workbook);
                self.countTasks(self.loadedExcel.tasks, self.priority.tasks)
            })
        });
    })

}]);