//@charset UTF-8
Ext.define('iSchedule.view.main.Main', {
    extend: 'Ext.Panel',

    xtype: 'app-main',

    requires: [
        'iSchedule.view.main.MainController'
    ],

    controller: 'main'

});