//@charset UTF-8
Ext.define('iContract.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.MessageBox',

        'iContract.view.main.MainController'
    ],

    controller: 'main',

    tabBarPosition: 'bottom'

});
