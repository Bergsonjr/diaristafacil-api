global.Promise = require('bluebird');
global._ = require('lodash')
global.moment = require('moment')
global.momentDurationFormatSetup = require('moment-duration-format');

require('./routes.js')

// Module name, array of required modules
var app = angular.module('app', [
    'ngAnimate',
    'ngSanitize',
    'LocalStorageModule', // Local storage
    'ui.router', // Router
    'ui.router.state.events', // Router Events
    'ui.utils.masks', // Mask
    'ui.bootstrap', // Bootstrap v4
    'ngFileUpload', // File upload
    'bw.paging', // Paginate
    'uiSwitch', // Switch Button
    'ngDialog', // Dialog
    'angularjs-dropdown-multiselect',
    'toastr',
    'daterangepicker', //'moment-picker',
    'app.constant',
    'app.controllers',
    'app.factories',
    'app.directives',
    'app.services',
    'app.routes',
    'app.filters',
    'rzModule',
    'angular-clipboard',
    'ngQuill',
    'angular.filter'
])

app.config(['$httpProvider', '$sceDelegateProvider', '$qProvider', 'ENV', 'localStorageServiceProvider',
    function ($httpProvider, $sceDelegateProvider, $qProvider, ENV, localStorageServiceProvider) {

        $httpProvider.interceptors.push('httpFactory')
        $httpProvider.interceptors.push('jwtFactory')

        // Set default local storage prefix
        localStorageServiceProvider.setPrefix('diaristafacil')

    }])