//@charset UTF-8
Ext.define( 'iContract.view.contract.ContractList', {
    extend: 'Smart.ux.contract.ContractList',

    xtype: 'contractlist',

    requires: [
        'Smart.ux.contract.ContractList',
        'iContract.store.contract.Contract',
        'iContract.view.contract.ContractController'
    ],

    controller: 'contract',

    initComponent: function () {
        var me = this;

        Ext.create('iContract.store.contract.Contract');

        me.callParent();
    }

});