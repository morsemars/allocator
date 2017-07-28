/**
 * Main Entry point for Electron Applications.
 * Contains all procedures related to desktop operations.
 * 
 * @module main
 * @class main
 */

const electron = require('electron')
const app = electron.app
const dialog = electron.dialog
const BrowserWindow = electron.BrowserWindow
const {ipcMain} = require('electron');
var camo = require('camo');
var Analysts;
var uri = "nedb://Test";
var db;

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({show: false});
  mainWindow.isResizable(true);
  mainWindow.once('ready-to-show', function(){
    mainWindow.show();
  });

  mainWindow.loadURL(`file://${__dirname}/views/index.html`)
  mainWindow.webContents.openDevTools();

  ipcMain.on('open-file-dialog', function (event) {
    dialog.showOpenDialog({
      properties: ['openFile','multiSelections'],
      filters: [{name: 'XLSX', extensions: ['csv','xlsx']}]
    }, function (files) {
      if (files) event.sender.send('selected-directory', files)
    })
  });

  ipcMain.on('get-all-analyst', function (event) {
    Analysts.find({}).then(function(analysts){
      event.sender.send('loaded-analysts', analysts)
    });
  });

  ipcMain.on('save-analyst', function (event, analyst) {
    if(analyst._id){
      Analysts.findOneAndUpdate({_id: analyst._id}, {
        firstName: analyst.firstName,
        lastName: analyst.lastName,
        email: analyst.email
      }).then(function(analyst){
        event.sender.send('saving-success', analyst)
      })
    }else{
        var newAnalyst = Analysts.create(analyst);
        newAnalyst.save().then(function(analyst){
          event.sender.send('saving-success', analyst)
        });
    }
  });

  ipcMain.on('delete-analyst', function (event, analyst) {
    Analysts.deleteOne({_id: analyst._id})
    .then(function(analyst){
      event.sender.send('delete-success', analyst)
    });
  });


  mainWindow.on('closed', function () {
    mainWindow = null
  })

}

app.on('ready', function(){
    camo.connect(uri).then(function(db){ 
      Analysts = require('./js/model/analystModel');
      createWindow();
    });
});
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
