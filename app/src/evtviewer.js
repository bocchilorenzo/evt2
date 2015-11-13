'use strict';

/**
 * @ngdoc overview
 * @name evtviewer
 * @description
 * # evtviewer
 *
 * Main module of the application.
 */
angular
  .module('evtviewer', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'templates-main',
    'xml',
    'evtviewer.core',
    'evtviewer.communication',
    'evtviewer.dataHandler',
    'evtviewer.interface',
    'evtviewer.box',
    'evtviewer.select',
    'evtviewer.buttonSwitch',
    'evtviewer.popover',
    'evtviewer.mobile',
    'evtviewer.reading'
  ]);