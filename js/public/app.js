const {ipcRenderer, remote} = require('electron');
const fs = require("fs");
require('angular');
require('angular-material');
require('angular-ui-router');
const exceljs = require('exceljs');
var mailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
var camo = require('camo');
var Document = camo.Document;
var uri = "nedb://Test";
var db;
var Analyst;

/**
 * Angular module for Allocator Application
 * 
 * @module qmsAllocatorApp
 * @class qms
 */
var qms = angular.module('qmsAllocatorApp', ['ngMaterial','ui.router']);

/**
 * Defines the URL Routing
 * @method config
 * 
 */
qms.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/allocator');

     $stateProvider
        .state('allocator', {
            url: '/allocator',
            templateUrl: 'allocator.html',
            controller: 'allocatorCtrl'
        })
        .state('user-maintenance', {
            url: '/user-maintenance',
            templateUrl: 'user-maintenance.html',
            controller: 'userMaintenanceCtrl'
        })
});

