//@charset UTF-8
Ext.define( 'iSterilization.view.main.Main', {
    extend: 'Smart.ux.main.Main',

    xtype: 'app-main',

    requires: [
        'Smart.ux.main.Main',
        'iSterilization.view.main.MainController',
        'iSterilization.store.module.ModuleMenuTree'
    ],

    controller: 'main',

    initComponent: function () {
        var me = this;

        Ext.create('iSterilization.store.module.ModuleMenuTree');

        me.callParent();
    }

});