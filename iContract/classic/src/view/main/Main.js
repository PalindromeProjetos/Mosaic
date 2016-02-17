//@charset UTF-8
Ext.define( 'iContract.view.main.Main', {
    extend: 'Smart.ux.main.Main',

    xtype: 'app-main',

    requires: [
        'Smart.ux.main.Main',
        'iContract.view.main.MainController',
        'iContract.store.module.ModuleMenuTree'
    ],

    controller: 'main',

    initComponent: function () {
        var me = this;

        Ext.create('iContract.store.module.ModuleMenuTree');

        me.callParent();
    }

});