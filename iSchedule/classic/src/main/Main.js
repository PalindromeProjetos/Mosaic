//@charset UTF-8
Ext.define( 'iSchedule.view.main.Main', {
    extend: 'Smart.ux.main.Main',

    xtype: 'app-main',

    requires: [
        'Smart.ux.main.Main',
        'iSchedule.view.main.MainController',
        'iContract.store.module.ModuleMenuTree'
    ],

    controller: 'main',

    initComponent: function () {
        var me = this;

        Ext.create('iContract.store.module.ModuleMenuTree');

        me.callParent();
    }

});